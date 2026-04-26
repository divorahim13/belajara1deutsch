-- B2B Dashboard Schema V2

-- 0. DROP EXISTING TABLES AND ENUMS (Clean Slate)
-- WARNING: This will drop the tables and data.
DROP TABLE IF EXISTS active_licenses CASCADE;
DROP TABLE IF EXISTS license_batches CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS license_status CASCADE;

-- 1. INSTITUTIONS
CREATE TABLE institutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROFILES
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    institution_id UUID REFERENCES institutions(id) ON DELETE SET NULL,
    full_name TEXT,
    email TEXT,
    role TEXT CHECK (role IN ('student','teacher','admin','super_admin')) DEFAULT 'student',
    avatar_url TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CLASSES
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID REFERENCES institutions(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    level TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'active',
    start_date DATE,
    end_date DATE,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CLASS MEMBERSHIPS
CREATE TABLE class_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role_in_class TEXT CHECK (role_in_class IN ('student','teacher','assistant')) DEFAULT 'student',
    status TEXT DEFAULT 'active',
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(class_id, user_id)
);

-- 5. KAPITEL PROGRESS
CREATE TABLE kapitel_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    chapter_id INT NOT NULL,
    completed_modules INT DEFAULT 0,
    total_modules INT DEFAULT 0,
    progress_percent NUMERIC DEFAULT 0,
    mastery_score NUMERIC,
    last_opened_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, class_id, chapter_id)
);

-- 6. QUIZ ATTEMPTS
CREATE TABLE quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
    chapter_id INT NOT NULL,
    quiz_id TEXT NOT NULL,
    score NUMERIC DEFAULT 0,
    max_score NUMERIC DEFAULT 0,
    percentage NUMERIC DEFAULT 0,
    passed BOOLEAN DEFAULT FALSE,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    duration_seconds INT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. QUESTION ATTEMPTS
CREATE TABLE question_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_attempt_id UUID REFERENCES quiz_attempts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
    chapter_id INT NOT NULL,
    question_id TEXT NOT NULL,
    module_id TEXT,
    category TEXT NOT NULL,
    skill TEXT NOT NULL,
    correction_mode TEXT CHECK (correction_mode IN ('template','hybrid','ai')) NOT NULL,
    question_type TEXT NOT NULL,
    user_answer JSONB,
    correct_answer JSONB,
    is_correct BOOLEAN,
    score NUMERIC DEFAULT 0,
    max_score NUMERIC DEFAULT 0,
    ai_feedback_id UUID, -- Will reference ai_grading_results(id)
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. AI GRADING RESULTS
CREATE TABLE ai_grading_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
    chapter_id INT,
    module_id TEXT,
    question_id TEXT NOT NULL,
    answer_hash TEXT NOT NULL,
    prompt_type TEXT,
    score NUMERIC DEFAULT 0,
    is_acceptable_a2 BOOLEAN DEFAULT FALSE,
    task_completion NUMERIC DEFAULT 0,
    grammar NUMERIC DEFAULT 0,
    vocabulary NUMERIC DEFAULT 0,
    coherence NUMERIC DEFAULT 0,
    a2_level NUMERIC DEFAULT 0,
    corrected_text TEXT,
    feedback_indonesian TEXT,
    strengths JSONB,
    mistakes JSONB,
    suggestions JSONB,
    raw_result JSONB,
    teacher_override_score NUMERIC,
    teacher_feedback TEXT,
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, question_id, answer_hash)
);

-- ADD FOREIGN KEY FOR QUESTION ATTEMPTS TO AI GRADING
ALTER TABLE question_attempts 
ADD CONSTRAINT fk_ai_feedback 
FOREIGN KEY (ai_feedback_id) REFERENCES ai_grading_results(id) ON DELETE SET NULL;

-- 9. ASSIGNMENTS
CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID REFERENCES institutions(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    chapter_id INT,
    module_id TEXT,
    assignment_type TEXT CHECK (assignment_type IN ('writing','speaking_transcript','quiz','mixed')) NOT NULL,
    due_date TIMESTAMPTZ,
    status TEXT DEFAULT 'active',
    ai_grading_enabled BOOLEAN DEFAULT TRUE,
    rubric JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. ASSIGNMENT SUBMISSIONS
CREATE TABLE assignment_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    answer_text TEXT,
    attachment_url TEXT,
    ai_grading_result_id UUID REFERENCES ai_grading_results(id) ON DELETE SET NULL,
    teacher_score NUMERIC,
    teacher_feedback TEXT,
    status TEXT DEFAULT 'submitted',
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    graded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(assignment_id, user_id)
);

-- 11. ACTIVITY EVENTS
CREATE TABLE activity_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID REFERENCES institutions(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. AI USAGE LOGS
CREATE TABLE ai_usage_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID REFERENCES institutions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
    feature TEXT NOT NULL,
    provider TEXT DEFAULT 'openai',
    model TEXT NOT NULL,
    input_tokens INT,
    output_tokens INT,
    estimated_cost NUMERIC,
    request_hash TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- HELPER FUNCTIONS
-- ==========================================
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_user_institution()
RETURNS UUID AS $$
  SELECT institution_id FROM public.profiles WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_teacher_of_class(target_class_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.class_memberships 
    WHERE class_id = target_class_id 
    AND user_id = auth.uid() 
    AND role_in_class = 'teacher'
  );
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_admin_of_institution(target_inst_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND institution_id = target_inst_id 
    AND role IN ('admin', 'super_admin')
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- ==========================================
-- ENABLE RLS
-- ==========================================
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE kapitel_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_grading_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_logs ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- RLS POLICIES
-- ==========================================

-- 1. INSTITUTIONS
CREATE POLICY "Institutions: super_admin can do all" ON institutions FOR ALL USING (get_user_role() = 'super_admin');
CREATE POLICY "Institutions: users can view own institution" ON institutions FOR SELECT USING (id = get_user_institution());

-- 2. PROFILES
CREATE POLICY "Profiles: super_admin can do all" ON profiles FOR ALL USING (get_user_role() = 'super_admin');
CREATE POLICY "Profiles: users can read own profile" ON profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "Profiles: users can update own profile" ON profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Profiles: admin can manage profiles in same institution" ON profiles FOR ALL USING (is_admin_of_institution(institution_id));
CREATE POLICY "Profiles: teacher can read students in their classes" ON profiles FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM class_memberships cm1
    JOIN class_memberships cm2 ON cm1.class_id = cm2.class_id
    WHERE cm1.user_id = profiles.id AND cm2.user_id = auth.uid() AND cm2.role_in_class = 'teacher'
  )
);

-- 3. CLASSES
CREATE POLICY "Classes: super_admin can do all" ON classes FOR ALL USING (get_user_role() = 'super_admin');
CREATE POLICY "Classes: admin can manage classes in same institution" ON classes FOR ALL USING (is_admin_of_institution(institution_id));
CREATE POLICY "Classes: members can view their classes" ON classes FOR SELECT USING (
  EXISTS (SELECT 1 FROM class_memberships WHERE class_id = classes.id AND user_id = auth.uid())
);

-- 4. CLASS MEMBERSHIPS
CREATE POLICY "Memberships: super_admin can do all" ON class_memberships FOR ALL USING (get_user_role() = 'super_admin');
CREATE POLICY "Memberships: users view own memberships" ON class_memberships FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Memberships: admin manage institution memberships" ON class_memberships FOR ALL USING (
  is_admin_of_institution((SELECT institution_id FROM classes WHERE id = class_memberships.class_id))
);
CREATE POLICY "Memberships: teacher can view students in their class" ON class_memberships FOR SELECT USING (is_teacher_of_class(class_id));

-- 5. KAPITEL PROGRESS
CREATE POLICY "Progress: super_admin can do all" ON kapitel_progress FOR ALL USING (get_user_role() = 'super_admin');
CREATE POLICY "Progress: users manage own progress" ON kapitel_progress FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Progress: admin views institution progress" ON kapitel_progress FOR SELECT USING (
  is_admin_of_institution((SELECT institution_id FROM classes WHERE id = kapitel_progress.class_id))
);
CREATE POLICY "Progress: teacher views class progress" ON kapitel_progress FOR SELECT USING (is_teacher_of_class(class_id));

-- 6. QUIZ ATTEMPTS
CREATE POLICY "QuizAttempts: super_admin can do all" ON quiz_attempts FOR ALL USING (get_user_role() = 'super_admin');
CREATE POLICY "QuizAttempts: users manage own attempts" ON quiz_attempts FOR ALL USING (user_id = auth.uid());
CREATE POLICY "QuizAttempts: admin views institution attempts" ON quiz_attempts FOR SELECT USING (
  is_admin_of_institution((SELECT institution_id FROM classes WHERE id = quiz_attempts.class_id))
);
CREATE POLICY "QuizAttempts: teacher views class attempts" ON quiz_attempts FOR SELECT USING (is_teacher_of_class(class_id));

-- 7. QUESTION ATTEMPTS
CREATE POLICY "QuestionAttempts: super_admin can do all" ON question_attempts FOR ALL USING (get_user_role() = 'super_admin');
CREATE POLICY "QuestionAttempts: users manage own attempts" ON question_attempts FOR ALL USING (user_id = auth.uid());
CREATE POLICY "QuestionAttempts: admin views institution attempts" ON question_attempts FOR SELECT USING (
  is_admin_of_institution((SELECT institution_id FROM classes WHERE id = question_attempts.class_id))
);
CREATE POLICY "QuestionAttempts: teacher views class attempts" ON question_attempts FOR SELECT USING (is_teacher_of_class(class_id));

-- 8. AI GRADING RESULTS
CREATE POLICY "AIGrading: super_admin can do all" ON ai_grading_results FOR ALL USING (get_user_role() = 'super_admin');
CREATE POLICY "AIGrading: users read own results" ON ai_grading_results FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "AIGrading: admin views institution results" ON ai_grading_results FOR SELECT USING (
  is_admin_of_institution((SELECT institution_id FROM classes WHERE id = ai_grading_results.class_id))
);
CREATE POLICY "AIGrading: teacher views and updates class results" ON ai_grading_results FOR ALL USING (is_teacher_of_class(class_id));

-- 9. ASSIGNMENTS
CREATE POLICY "Assignments: super_admin can do all" ON assignments FOR ALL USING (get_user_role() = 'super_admin');
CREATE POLICY "Assignments: admin manage institution assignments" ON assignments FOR ALL USING (is_admin_of_institution(institution_id));
CREATE POLICY "Assignments: teacher manage class assignments" ON assignments FOR ALL USING (is_teacher_of_class(class_id));
CREATE POLICY "Assignments: students view class assignments" ON assignments FOR SELECT USING (
  EXISTS (SELECT 1 FROM class_memberships WHERE class_id = assignments.class_id AND user_id = auth.uid())
);

-- 10. ASSIGNMENT SUBMISSIONS
CREATE POLICY "Submissions: super_admin can do all" ON assignment_submissions FOR ALL USING (get_user_role() = 'super_admin');
CREATE POLICY "Submissions: users manage own submissions" ON assignment_submissions FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Submissions: admin views institution submissions" ON assignment_submissions FOR SELECT USING (
  is_admin_of_institution((SELECT institution_id FROM classes WHERE id = assignment_submissions.class_id))
);
CREATE POLICY "Submissions: teacher manage class submissions" ON assignment_submissions FOR ALL USING (is_teacher_of_class(class_id));

-- 11. ACTIVITY EVENTS
CREATE POLICY "Activity: super_admin can do all" ON activity_events FOR ALL USING (get_user_role() = 'super_admin');
CREATE POLICY "Activity: users manage own events" ON activity_events FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Activity: admin views institution events" ON activity_events FOR SELECT USING (is_admin_of_institution(institution_id));
CREATE POLICY "Activity: teacher views class events" ON activity_events FOR SELECT USING (is_teacher_of_class(class_id));

-- 12. AI USAGE LOGS
CREATE POLICY "AIUsage: super_admin can do all" ON ai_usage_logs FOR ALL USING (get_user_role() = 'super_admin');
CREATE POLICY "AIUsage: admin views institution usage" ON ai_usage_logs FOR SELECT USING (is_admin_of_institution(institution_id));

-- ==========================================
-- TRIGGERS
-- ==========================================
-- Trigger to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', COALESCE(new.raw_user_meta_data->>'role', 'student'));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Trigger to updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_institutions_modtime BEFORE UPDATE ON institutions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_classes_modtime BEFORE UPDATE ON classes FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_kapitel_progress_modtime BEFORE UPDATE ON kapitel_progress FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_assignments_modtime BEFORE UPDATE ON assignments FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_assignment_submissions_modtime BEFORE UPDATE ON assignment_submissions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
