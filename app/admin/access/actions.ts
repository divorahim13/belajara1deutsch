'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateUserAccess(
  userId: string, 
  action: 'activate' | 'deactivate' | 'extend_30' | 'extend_60' | 'set_expiry',
  notes: string,
  customExpiry?: string
) {
  const supabase = await createClient()
  
  // Verify admin access
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    throw new Error("Forbidden")
  }

  // Fetch current access record to decide insert or update
  const { data: currentAccess } = await supabase
    .from('user_level_access')
    .select('*')
    .eq('user_id', userId)
    .eq('level', 'A2')
    .single()

  let status = currentAccess?.status || 'inactive'
  let expiresAt = currentAccess?.expires_at ? new Date(currentAccess.expires_at) : new Date()
  let activatedAt = currentAccess?.activated_at ? new Date(currentAccess.activated_at) : new Date()

  if (action === 'activate') {
    status = 'active'
    // Default 30 days if never set
    if (!currentAccess?.expires_at || expiresAt < new Date()) {
      expiresAt = new Date()
      expiresAt.setDate(expiresAt.getDate() + 30)
    }
  } else if (action === 'deactivate') {
    status = 'inactive'
  } else if (action === 'extend_30') {
    status = 'active'
    expiresAt = expiresAt > new Date() ? expiresAt : new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)
  } else if (action === 'extend_60') {
    status = 'active'
    expiresAt = expiresAt > new Date() ? expiresAt : new Date()
    expiresAt.setDate(expiresAt.getDate() + 60)
  } else if (action === 'set_expiry' && customExpiry) {
    status = 'active'
    expiresAt = new Date(customExpiry)
  }

  // Upsert user_level_access
  const { error: accessErr } = await supabase
    .from('user_level_access')
    .upsert({
      id: currentAccess?.id,
      user_id: userId,
      level: 'A2',
      status,
      activated_by: user.id,
      activated_at: activatedAt.toISOString(),
      expires_at: expiresAt.toISOString(),
      notes,
    }, { onConflict: 'user_id,level' })

  if (accessErr) {
    console.error(accessErr)
    throw new Error("Failed to update access")
  }

  // Record action in manual_sales_notes
  await supabase
    .from('manual_sales_notes')
    .insert({
      user_id: userId,
      level: 'A2',
      note: `Action: ${action}. Admin Notes: ${notes}. New Expiry: ${expiresAt.toISOString()}`,
      recorded_by: user.id
    })

  revalidatePath('/admin/access')
}
