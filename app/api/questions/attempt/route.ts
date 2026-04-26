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
    const { chapterId, attempts } = body;

    if (!chapterId || !Array.isArray(attempts)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Get student's class_id
    const { data: membership } = await supabase
      .from('class_memberships')
      .select('class_id')
      .eq('user_id', user.id)
      .single();

    const classId = membership?.class_id || null;

    // Insert attempts
    const payload = attempts.map(attempt => ({
      user_id: user.id,
      class_id: classId,
      chapter_id: chapterId,
      question_id: attempt.questionId.toString(),
      user_answer: attempt.userAnswer?.toString() || '',
      is_correct: attempt.isCorrect
    }));

    const { error } = await supabase
      .from('question_attempts')
      .insert(payload);

    if (error) {
      console.error('Error inserting question_attempts:', error);
      return NextResponse.json({ error: 'Failed to record attempts' }, { status: 500 });
    }

    return NextResponse.json({ success: true, inserted: payload.length });
  } catch (error) {
    console.error('Question attempt sync error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
