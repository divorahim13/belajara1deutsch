import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase URL or Service Role Key in .env.local');
  process.exit(1);
}

// Initialize Supabase admin client (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const DEFAULT_PASSWORD = 'password123';

async function main() {
  console.log('🌱 Starting B2B Demo Data Seed...');

  // 1. CREATE INSTITUTION
  console.log('1. Creating Institution: Makna Education Demo');
  const { data: institution, error: instError } = await supabase
    .from('institutions')
    .upsert({
      name: 'Makna Education Demo',
      slug: 'makna-education-demo',
      status: 'active',
    }, { onConflict: 'slug' })
    .select()
    .single();

  if (instError) throw instError;
  const institutionId = institution.id;

  // Helper to create users
  async function createDemoUser(email: string, fullName: string, role: string) {
    console.log(`   Creating User: ${email} (${role})`);
    
    // Check if user exists first to avoid errors
    const { data: existingUser } = await supabase.auth.admin.listUsers();
    const existing = existingUser?.users.find((u) => u.email === email);
    
    let userId;
    if (existing) {
      userId = existing.id;
      // Ensure profile role and institution is set correctly
      await supabase.from('profiles').upsert({
        id: userId,
        email,
        full_name: fullName,
        role: role,
        institution_id: institutionId
      });
    } else {
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password: DEFAULT_PASSWORD,
        email_confirm: true,
        user_metadata: { full_name: fullName, role: role },
      });
      if (authError) throw authError;
      userId = authData.user.id;
      
      // Wait a moment for trigger to create profile, then update institution
      await new Promise(res => setTimeout(res, 500));
      await supabase.from('profiles').update({ institution_id: institutionId, role: role }).eq('id', userId);
    }
    return userId;
  }

  // 2. CREATE TEACHERS & ADMIN
  console.log('2. Creating Staff Users');
  const adminId = await createDemoUser('admin_demo@makna.edu', 'Admin Makna', 'admin');
  const teacherLinaId = await createDemoUser('frau.lina@makna.edu', 'Frau Lina', 'teacher');
  const teacherBudiId = await createDemoUser('herr.budi@makna.edu', 'Herr Budi', 'teacher');

  // 3. CREATE CLASSES
  console.log('3. Creating Classes');
  const { data: classRegular, error: clsRegErr } = await supabase
    .from('classes')
    .insert({
      institution_id: institutionId,
      name: 'A2 Regular Class',
      level: 'A2',
      description: 'Standard A2 curriculum class',
      created_by: teacherLinaId,
    })
    .select().single();
  if (clsRegErr) console.error('Class creation error:', clsRegErr);

  const { data: classWeekend, error: clsWkndErr } = await supabase
    .from('classes')
    .insert({
      institution_id: institutionId,
      name: 'A2 Weekend Class',
      level: 'A2',
      description: 'Intensive weekend class',
      created_by: teacherBudiId,
    })
    .select().single();

  const classRegId = classRegular?.id;
  const classWkndId = classWeekend?.id;

  // Add teachers to classes
  if (classRegId) {
    await supabase.from('class_memberships').insert({
      class_id: classRegId,
      user_id: teacherLinaId,
      role_in_class: 'teacher'
    });
  }
  if (classWkndId) {
    await supabase.from('class_memberships').insert({
      class_id: classWkndId,
      user_id: teacherBudiId,
      role_in_class: 'teacher'
    });
  }

  // 4. CREATE STUDENTS
  console.log('4. Creating 12 Students & Memberships');
  const studentIds = [];
  for (let i = 1; i <= 12; i++) {
    const sId = await createDemoUser(`student${i}_demo@makna.edu`, `Student Demo ${i}`, 'student');
    studentIds.push(sId);
    
    // Assign 6 to Regular, 6 to Weekend
    const targetClassId = i <= 6 ? classRegId : classWkndId;
    if (targetClassId) {
      await supabase.from('class_memberships').insert({
        class_id: targetClassId,
        user_id: sId,
        role_in_class: 'student'
      }).select(); // select avoids empty error handling sometimes
    }
  }

  // 5. MOCK WEAKNESS TRACKER DATA (Question Attempts)
  console.log('5. Generating Weakness Data (Konjunktiv II, etc.)');
  const weaknesses = [
    { chapter_id: 11, category: 'Grammatik', skill: 'Konjunktiv II', module_id: 'kapitel-11-grammatik', failCount: 8 },
    { chapter_id: 10, category: 'Grammatik', skill: 'Wechselpräpositionen', module_id: 'kapitel-10-grammatik', failCount: 6 },
    { chapter_id: 7, category: 'Grammatik', skill: 'Indirekte Fragen', module_id: 'kapitel-7-grammatik', failCount: 5 },
    { chapter_id: 5, category: 'Grammatik', skill: 'Adjektivendungen', module_id: 'kapitel-5-grammatik', failCount: 4 },
  ];

  for (const w of weaknesses) {
    for (let i = 0; i < w.failCount; i++) {
      // Pick random student from regular class
      const studentId = studentIds[i % 6]; 
      await supabase.from('question_attempts').insert({
        user_id: studentId,
        class_id: classRegId,
        chapter_id: w.chapter_id,
        question_id: `q_weak_${w.chapter_id}_${i}`,
        module_id: w.module_id,
        category: w.category,
        skill: w.skill,
        correction_mode: 'template',
        question_type: 'multiple_choice',
        is_correct: false,
        score: 0,
        max_score: 1,
      });
    }
  }

  // 6. MOCK QUIZ ATTEMPTS (For average score & completion)
  console.log('6. Generating Progress and Quiz Data');
  for (let i = 0; i < 6; i++) {
    const studentId = studentIds[i];
    // Give each student between 50 and 95 score randomly
    const score = Math.floor(Math.random() * 45) + 50; 
    await supabase.from('quiz_attempts').insert({
      user_id: studentId,
      class_id: classRegId,
      chapter_id: 1,
      quiz_id: 'kapitel-1-final',
      score: score,
      max_score: 100,
      percentage: score,
      passed: score >= 70,
    });
    
    await supabase.from('kapitel_progress').insert({
       user_id: studentId,
       class_id: classRegId,
       chapter_id: 1,
       progress_percent: score >= 70 ? 100 : 80,
       completed_modules: 3,
       total_modules: 3
    });
  }

  // 7. MOCK ASSIGNMENTS & AI GRADING RESULTS
  console.log('7. Generating Assignments and AI Grades');
  const { data: assignment } = await supabase.from('assignments').insert({
    institution_id: institutionId,
    class_id: classRegId,
    created_by: teacherLinaId,
    title: 'Wünsche und Ratschläge (Konjunktiv II)',
    description: 'Schreiben Sie 5 Sätze mit Konjunktiv II.',
    chapter_id: 11,
    assignment_type: 'writing',
    ai_grading_enabled: true
  }).select().single();

  if (assignment) {
    // Generate some submissions
    for (let i = 0; i < 3; i++) {
      const studentId = studentIds[i];
      const answer = "Ich würde gerne nach Deutschland reisen. Wenn ich Zeit hätte, lernte ich mehr Deutsch.";
      
      const { data: aiResult } = await supabase.from('ai_grading_results').insert({
        user_id: studentId,
        class_id: classRegId,
        chapter_id: 11,
        question_id: `assignment_${assignment.id}`,
        answer_hash: 'mock_hash_' + i,
        score: 85,
        is_acceptable_a2: true,
        task_completion: 90,
        grammar: 80,
        vocabulary: 85,
        coherence: 85,
        a2_level: 85,
        corrected_text: "Ich würde gerne nach Deutschland reisen. Wenn ich Zeit hätte, würde ich mehr Deutsch lernen.",
        feedback_indonesian: "Penggunaan 'würde gerne' sudah sangat bagus! Hati-hati dengan bentuk Konjunktiv II dari lernen, lebih umum menggunakan 'würde + lernen'.",
        strengths: ["Penggunaan Konjunktiv II dengan sein/haben"],
        mistakes: ["Penggunaan bentuk präteritum untuk regular verbs alih-alih würde-form"],
        suggestions: ["Pelajari kembali kapan menggunakan würde-form vs Präteritum form untuk Konjunktiv II."]
      }).select().single();

      if (aiResult) {
        await supabase.from('assignment_submissions').insert({
          assignment_id: assignment.id,
          user_id: studentId,
          class_id: classRegId,
          answer_text: answer,
          ai_grading_result_id: aiResult.id,
          status: 'submitted' // Needs review by teacher
        });
      }
    }
  }

  console.log('✅ B2B Demo Data Seed Completed Successfully!');
  console.log('\n--- DEMO ACCOUNTS ---');
  console.log('Admin: admin_demo@makna.edu / password123');
  console.log('Teacher: frau.lina@makna.edu / password123');
  console.log('Student 1: student1_demo@makna.edu / password123');
}

main().catch(console.error);
