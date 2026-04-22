'use server';

import { createServerClient } from '@supabase/ssr'
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createCompany(formData: FormData) {
  const name = formData.get('name') as string;
  const tier = formData.get('tier') as string;
  const status = formData.get('status') === 'active';

  if (!name || !tier) {
    return { error: 'Name and Tier are required' };
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  );

  const { error } = await supabase
    .from('companies')
    .insert([
      { 
        name, 
        subscription_tier: tier, 
        is_active: status 
      }
    ]);

  if (error) {
    console.error('Error creating company:', error);
    return { error: error.message };
  }

  revalidatePath('/superadmin/companies');
  revalidatePath('/superadmin');
  return { success: true };
}

// Helper to generate random alphanumeric string
function generateRandomCode(length: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function allocateBatch(formData: FormData) {
  const companyId = formData.get('companyId') as string;
  const level = formData.get('level') as string;
  const totalLicenses = parseInt(formData.get('totalLicenses') as string);

  if (!companyId || !level || isNaN(totalLicenses) || totalLicenses <= 0) {
    return { error: 'Invalid input data' };
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  );

  // Get current user to set created_by
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  // Get company name to create prefix
  const { data: company } = await supabase
    .from('companies')
    .select('name')
    .eq('id', companyId)
    .single();

  if (!company) {
    return { error: 'Company not found' };
  }

  const companyPrefix = company.name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 4).toUpperCase() || 'CODE';

  // 1. Insert Batch
  const { data: batchData, error: batchError } = await supabase
    .from('license_batches')
    .insert([
      {
        company_id: companyId,
        level,
        total_licenses: totalLicenses,
        used_licenses: 0,
        created_by: user.id
      }
    ])
    .select('id')
    .single();

  if (batchError || !batchData) {
    console.error('Error allocating batch:', batchError);
    return { error: batchError?.message || 'Failed to create batch' };
  }

  // 2. Generate and Insert License Keys
  const keysToInsert = Array.from({ length: totalLicenses }).map(() => ({
    batch_id: batchData.id,
    code: `${companyPrefix}-${level}-${generateRandomCode(5)}`,
    status: 'available'
  }));

  const { error: keysError } = await supabase
    .from('license_keys')
    .insert(keysToInsert);

  if (keysError) {
    console.error('Error generating keys:', keysError);
    // Note: in a robust system we'd use a transaction, but Supabase standard JS client 
    // doesn't support interactive transactions over the data API.
    // If keys fail, the batch exists but is empty.
    return { error: 'Batch created, but failed to generate keys: ' + keysError.message };
  }

  revalidatePath('/superadmin/batches');
  revalidatePath('/superadmin');
  return { success: true };
}
