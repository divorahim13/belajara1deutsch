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
      .select('id, status, batch_id, license_batches(company_id)')
      .eq('code', licenseCode)
      .single();

    if (licenseError || !licenseKey) {
      return { error: "Kode lisensi tidak valid atau tidak ditemukan." };
    }

    if (licenseKey.status !== 'available') {
      return { error: "Kode lisensi ini sudah digunakan." };
    }

    // Safely extract company_id from the joined batch data
    const companyId = Array.isArray(licenseKey.license_batches) 
      ? licenseKey.license_batches[0]?.company_id 
      : (licenseKey.license_batches as any)?.company_id;

    if (!companyId) {
       return { error: "Data batch untuk kode ini tidak valid." };
    }

    // 2. Initialize SSR client to sign up the user AND set their session in cookies
    const cookieStore = await cookies();
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    });

    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });

    if (signUpError) {
      return { error: signUpError.message };
    }

    if (!authData.user) {
       return { error: "Gagal membuat akun." };
    }

    const newUserId = authData.user.id;

    // 3. Use Admin client to insert the profile securely
    const { error: profileUpdateError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: newUserId,
        role: 'student',
        company_id: companyId,
        full_name: fullName
      });

    if (profileUpdateError) {
       console.error("Profile update error:", profileUpdateError);
       // Return success anyway as the user is created, but log error
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
