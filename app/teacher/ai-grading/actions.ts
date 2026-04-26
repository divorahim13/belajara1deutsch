'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function approveGrade(gradeId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('ai_grading_results')
    .update({ reviewed_by: user.id })
    .eq('id', gradeId)

  if (error) {
    console.error('Error approving grade:', error)
    return { error: 'Failed to approve grade.' }
  }

  revalidatePath('/teacher/ai-grading')
  return { success: true }
}

export async function rejectGrade(gradeId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  // Rejecting might mean resetting the submission or marking it for manual grade
  // For now, let's just delete the AI grading result so it can be re-graded or manually graded
  const { error } = await supabase
    .from('ai_grading_results')
    .delete()
    .eq('id', gradeId)

  if (error) {
    console.error('Error rejecting grade:', error)
    return { error: 'Failed to reject grade.' }
  }

  revalidatePath('/teacher/ai-grading')
  return { success: true }
}
