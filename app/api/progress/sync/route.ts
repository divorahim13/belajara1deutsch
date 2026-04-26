import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { kapitelId, completedSteps, totalSteps } = body;

    if (!kapitelId || !Array.isArray(completedSteps) || typeof totalSteps !== 'number') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Hitung progress
    const progressPercent = totalSteps > 0 
      ? Math.min(100, Math.round((completedSteps.length / totalSteps) * 100))
      : 0;

    // Bersihkan kapitelId jika ada prefix "kapitel-"
    const cleanChapterId = kapitelId.replace('kapitel-', '').replace('kapitel', '');

    // Dapatkan class_id untuk user ini
    const { data: memberData } = await supabase
      .from('class_memberships')
      .select('class_id')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    const classId = memberData?.class_id || null;
    const chapterIdInt = parseInt(cleanChapterId) || 0;

    // Cek apakah data sudah ada
    const { data: existingProgress } = await supabase
      .from('kapitel_progress')
      .select('id')
      .eq('user_id', user.id)
      .eq('chapter_id', chapterIdInt)
      .single();

    let error;

    if (existingProgress) {
      // Update
      const { error: updateError } = await supabase
        .from('kapitel_progress')
        .update({
          progress_percent: progressPercent,
          completed_modules: completedSteps.length,
          total_modules: totalSteps,
          completed_steps_details: completedSteps,
          updated_at: new Date().toISOString(),
          last_opened_at: new Date().toISOString(),
          class_id: classId // pastikan class_id selalu valid
        })
        .eq('id', existingProgress.id);
      error = updateError;
    } else {
      // Insert
      const { error: insertError } = await supabase
        .from('kapitel_progress')
        .insert({
          user_id: user.id,
          class_id: classId,
          chapter_id: chapterIdInt,
          progress_percent: progressPercent,
          completed_modules: completedSteps.length,
          total_modules: totalSteps,
          completed_steps_details: completedSteps,
          last_opened_at: new Date().toISOString()
        });
      error = insertError;
    }

    if (error) {
      console.error('Error upserting kapitel_progress:', error);
      return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
    }

    return NextResponse.json({ success: true, progressPercent });
  } catch (error) {
    console.error('Progress sync error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
