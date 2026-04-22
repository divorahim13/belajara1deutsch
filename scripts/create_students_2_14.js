const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase URL or Service Key");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createStudents() {
  console.log("Starting to create students 2 to 14...");
  
  // Try to find an existing company ID to assign the students to
  const { data: companies } = await supabaseAdmin.from('companies').select('id').limit(1);
  const companyId = companies && companies.length > 0 ? companies[0].id : null;
  
  for (let i = 2; i <= 14; i++) {
    const email = `student${i}@divo.com`;
    const password = 'password123';
    const fullName = `Student ${i}`;
    
    // Create user in auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName
      }
    });

    if (authError) {
      console.error(`Error creating auth user ${email}:`, authError.message);
      continue;
    }
    
    if (authData.user) {
      // Create profile
      const { error: profileError } = await supabaseAdmin.from('profiles').upsert({
        id: authData.user.id,
        role: 'student',
        company_id: companyId,
        full_name: fullName
      });
      
      if (profileError) {
        console.error(`Error creating profile for ${email}:`, profileError.message);
      } else {
        console.log(`Successfully created student ${i} - ${email}`);
      }
    }
  }
  
  console.log("Finished creating students.");
}

createStudents();
