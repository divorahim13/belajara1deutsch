import { createClient } from '@/lib/supabase/server'

export async function consumeAiQuota(userId: string): Promise<{ allowed: boolean, error?: string }> {
  const supabase = await createClient()

  // Admins and teachers bypass quota for testing
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()

  if (profile?.role === 'admin' || profile?.role === 'super_admin' || profile?.role === 'teacher') {
    return { allowed: true }
  }

  const { data: access } = await supabase
    .from('user_level_access')
    .select('*')
    .eq('user_id', userId)
    .eq('level', 'A2')
    .single()

  if (!access) {
    return { allowed: false, error: 'Access not found.' }
  }

  const isExpired = access.expires_at && new Date(access.expires_at) < new Date()
  if (access.status !== 'active' || isExpired) {
    return { allowed: false, error: 'Access is inactive or expired.' }
  }

  if (access.ai_quota_used >= access.ai_quota_limit) {
    return { allowed: false, error: 'Kuota AI feedback Anda sudah habis. Hubungi admin untuk tambahan kuota.' }
  }

  // Increment quota
  const { error: updateErr } = await supabase
    .from('user_level_access')
    .update({ ai_quota_used: access.ai_quota_used + 1 })
    .eq('id', access.id)

  if (updateErr) {
    console.error('Failed to update AI quota', updateErr)
    return { allowed: false, error: 'Internal error updating quota.' }
  }

  return { allowed: true }
}
