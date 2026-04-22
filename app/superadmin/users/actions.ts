'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

export async function createClientOwnerAccount(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;
  const companyId = formData.get('companyId') as string;

  if (!email || !password || !fullName || !companyId) {
    return { error: "Missing required fields" };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { error: "Server configuration error. Missing Supabase keys." };
  }

  // Use service_role key to bypass RLS and avoid overriding the current super_admin session
  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  try {
    // 1. Create the user in auth.users
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // auto-confirm email for client owners
      user_metadata: {
        full_name: fullName,
      }
    });

    if (authError) {
      console.error("Error creating auth user:", authError);
      return { error: authError.message };
    }

    const newUserId = authData.user.id;

    // 3. Insert the newly created profile with the correct role and company
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: newUserId,
        role: 'client_owner',
        company_id: companyId,
        full_name: fullName
      });

    if (profileError) {
      console.error("Error updating profile:", profileError);
      // In a real scenario, you might want to delete the auth user here to rollback
      return { error: profileError.message };
    }

    revalidatePath('/superadmin/users');
    return { success: true };
    
  } catch (error: any) {
    console.error("Unexpected error in createClientOwnerAccount:", error);
    return { error: error.message || "An unexpected error occurred" };
  }
}

export async function updateClientOwnerAccount(formData: FormData) {
  const userId = formData.get('userId') as string;
  const fullName = formData.get('fullName') as string;
  const companyId = formData.get('companyId') as string;
  const password = formData.get('password') as string;

  if (!userId || !fullName || !companyId) {
    return { error: "Missing required fields" };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { error: "Server configuration error. Missing Supabase keys." };
  }

  const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });

  try {
    // 1. Update Profile (Name and Company)
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({
        full_name: fullName,
        company_id: companyId
      })
      .eq('id', userId);

    if (profileError) {
      console.error("Error updating profile:", profileError);
      return { error: profileError.message };
    }

    // 2. Update Password if provided
    if (password && password.trim() !== '') {
      const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        password: password,
        user_metadata: { full_name: fullName }
      });
      
      if (authError) {
        console.error("Error updating password:", authError);
        return { error: authError.message };
      }
    } else {
      // Just update metadata if no password
      await supabaseAdmin.auth.admin.updateUserById(userId, {
        user_metadata: { full_name: fullName }
      });
    }

    revalidatePath('/superadmin/users');
    return { success: true };
    
  } catch (error: any) {
    console.error("Unexpected error in updateClientOwnerAccount:", error);
    return { error: error.message || "An unexpected error occurred" };
  }
}
