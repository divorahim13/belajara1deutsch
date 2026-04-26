'use server';

import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function registerStudent(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;
  const licenseCode = formData.get('licenseCode') as string;

  if (!email || !password || !fullName || !licenseCode) {
    return { error: "Semua kolom harus diisi." };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
    return { error: "Konfigurasi server tidak lengkap." };
  }

  // Admin client for secure backend checks and updates (bypasses RLS)
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  try {
    // 1. Verify the license key
    const { data: licenseKey, error: licenseError } = await supabaseAdmin
      .from('license_keys')
      .select('id, status, institution_id, class_id, level_access')
      .eq('code', licenseCode)
      .single();

    if (licenseError || !licenseKey) {
      return { error: "Kode lisensi tidak valid atau tidak ditemukan." };
    }

    if (licenseKey.status !== 'available') {
      return { error: "Kode lisensi ini sudah digunakan." };
    }

    const companyId = licenseKey.institution_id;

    // 2. Create the user explicitly with admin bypass (auto confirms email)
    const { data: authData, error: signUpError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
      }
    });

    if (signUpError) {
      return { error: signUpError.message };
    }

    if (!authData.user) {
       return { error: "Gagal membuat akun." };
    }

    const newUserId = authData.user.id;

    // 2.1 Set cookies by signing in with the newly created account
    const cookieStore = await cookies();
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
               // @ts-ignore
              cookieStore.set(name, value, options)
            })
          } catch (error) {}
        },
      },
    });

    await supabase.auth.signInWithPassword({ email, password });

    // 3. Update the profile (which is auto-created by DB trigger)
    const { error: profileUpdateError } = await supabaseAdmin
      .from('profiles')
      .update({
        role: 'student',
        institution_id: companyId,
        full_name: fullName
      })
      .eq('id', newUserId);

    if (profileUpdateError) {
       console.error("Profile update error:", profileUpdateError);
    }

    // 3.1. Insert into class_memberships if class_id is present
    if (licenseKey.class_id) {
      await supabaseAdmin
        .from('class_memberships')
        .insert({
          class_id: licenseKey.class_id,
          user_id: newUserId,
          role_in_class: 'student',
          status: 'active'
        });
    }

    // 3.2. Insert into user_level_access if level_access is present
    if (licenseKey.level_access) {
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1); // 1 year access
      
      await supabaseAdmin
        .from('user_level_access')
        .insert({
          user_id: newUserId,
          level: licenseKey.level_access,
          status: 'active',
          expires_at: expiryDate.toISOString()
        });
    }

    // 4. Use Admin client to mark the license key as used
    const { error: keyUpdateError } = await supabaseAdmin
      .from('license_keys')
      .update({
        status: 'used',
        used_by: newUserId
      })
      .eq('id', licenseKey.id);

    if (keyUpdateError) {
       console.error("License key update error:", keyUpdateError);
    }

    return { success: true };

  } catch (error: any) {
    console.error("Unexpected registration error:", error);
    return { error: "Terjadi kesalahan yang tidak terduga." };
  }
}
