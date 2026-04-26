import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anon Key');
  process.exit(1);
}

const DEFAULT_PASSWORD = 'password123';

async function createClientForUser(email: string) {
  const client = createClient(supabaseUrl!, supabaseAnonKey!);
  const { error } = await client.auth.signInWithPassword({
    email,
    password: DEFAULT_PASSWORD,
  });
  if (error) throw new Error(`Could not sign in as ${email}: ${error.message}`);
  return client;
}

async function runTests() {
  console.log('🛡️ Starting RLS Security Validation...');

  console.log('1. Signing in as Student 1');
  const studentClient = await createClientForUser('student1_demo@makna.edu');

  console.log('2. Signing in as Teacher Lina');
  const teacherClient = await createClientForUser('frau.lina@makna.edu');

  console.log('3. Signing in as Admin Makna');
  const adminClient = await createClientForUser('admin_demo@makna.edu');

  // --- STUDENT TESTS ---
  console.log('\n--- Testing STUDENT Restrictions ---');
  // 1. Should only see their own profile
  const { data: pStudent, error: pStudentErr } = await studentClient.from('profiles').select('*');
  if (pStudentErr) console.error(pStudentErr);
  if (pStudent?.length !== 1) {
    console.error('PROFILES SEEN:', pStudent);
    throw new Error('Student can see multiple profiles! RLS failed.');
  }
  console.log('✅ Student can only see their own profile');

  // 2. Should only see their own classes
  const { data: cStudent } = await studentClient.from('classes').select('*');
  if (cStudent?.length !== 1) throw new Error(`Student should see 1 class, saw ${cStudent?.length}. RLS failed.`);
  console.log('✅ Student can only see their enrolled classes');

  // 3. Should not see other students' progress
  const { data: kpStudent } = await studentClient.from('kapitel_progress').select('*');
  if (kpStudent?.length !== 1) throw new Error('Student can see other students progress! RLS failed.');
  console.log('✅ Student can only see their own kapitel_progress');

  // --- TEACHER TESTS ---
  console.log('\n--- Testing TEACHER Restrictions ---');
  // 1. Should see profiles of their students + themselves
  const { data: pTeacher } = await teacherClient.from('profiles').select('*');
  if (!pTeacher || pTeacher.length <= 1) throw new Error('Teacher cannot see their students! RLS failed.');
  console.log(`✅ Teacher can see their students (Total profiles visible: ${pTeacher.length})`);

  // 2. Should see classes they teach
  const { data: cTeacher } = await teacherClient.from('classes').select('*');
  if (cTeacher?.length !== 1) throw new Error(`Teacher should see 1 class, saw ${cTeacher?.length}. RLS failed.`);
  console.log(`✅ Teacher can only see their assigned classes (Total classes visible: ${cTeacher.length})`);

  // 3. Should see progress of their students
  const { data: kpTeacher } = await teacherClient.from('kapitel_progress').select('*');
  if (!kpTeacher || kpTeacher.length <= 1) throw new Error('Teacher cannot see their students progress! RLS failed.');
  console.log(`✅ Teacher can see their students kapitel_progress (Total records: ${kpTeacher.length})`);

  // --- ADMIN TESTS ---
  console.log('\n--- Testing ADMIN Restrictions ---');
  // 1. Should see all profiles in institution
  const { data: pAdmin } = await adminClient.from('profiles').select('*');
  if (!pAdmin || pAdmin.length <= 10) throw new Error('Admin cannot see all institution profiles! RLS failed.');
  console.log(`✅ Admin can see all profiles in their institution (Total profiles visible: ${pAdmin.length})`);

  // 2. Should see all classes in institution
  const { data: cAdmin } = await adminClient.from('classes').select('*');
  if (!cAdmin || cAdmin.length < 2) throw new Error('Admin cannot see all institution classes! RLS failed.');
  console.log(`✅ Admin can see all classes in their institution (Total classes visible: ${cAdmin.length})`);

  console.log('\n🎉 ALL RLS TESTS PASSED!');
}

runTests().catch(err => {
  console.error('\n❌ VALIDATION FAILED:', err.message);
  process.exit(1);
});
