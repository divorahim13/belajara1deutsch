import { NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized access.' }, { status: 401 });
    }

    const { consumeAiQuota } = await import('@/lib/aiQuota');
    const quotaCheck = await consumeAiQuota(user.id);
    if (!quotaCheck.allowed) {
      return NextResponse.json({ error: quotaCheck.error || 'Akses ditolak.' }, { status: 403 });
    }

    if (!OPENAI_API_KEY) {
      return NextResponse.json({ error: "Server AI tidak dikonfigurasi dengan benar." }, { status: 500 });
    }

    const body = await req.json();
    const { chapterId, moduleId, questionId, answer, correctionMode, rubric, questionText } = body;

    if (!answer || answer.trim().length === 0) {
      return NextResponse.json({ error: "Jawaban tidak boleh kosong." }, { status: 400 });
    }

    if (correctionMode !== 'ai' && correctionMode !== 'hybrid') {
      return NextResponse.json({ error: "Mode koreksi ini tidak diizinkan menggunakan AI." }, { status: 400 });
    }

    if (answer.length > 4000) {
      return NextResponse.json({ error: "Jawaban terlalu panjang." }, { status: 400 });
    }

    const systemPrompt = `You are a German A2 learning evaluator. Evaluate the learner's German answer according to the provided task, chapter context, and rubric. Do not be overly strict if the answer is understandable at A2 level. Focus on grammar, vocabulary, task completion, coherence, and whether the answer fits A2. Return only valid JSON in the requested schema. Feedback must be in Indonesian. Corrected text must be in German.

Required JSON Schema:
{
  "score": 0,
  "isAcceptableA2": true,
  "taskCompletion": 0,
  "grammar": 0,
  "vocabulary": 0,
  "coherence": 0,
  "a2Level": 0,
  "correctedText": "string",
  "feedbackIndonesian": "string",
  "strengths": ["string"],
  "mistakes": [
    {
      "original": "string",
      "correction": "string",
      "reason": "string"
    }
  ],
  "suggestions": ["string"]
}

Base Score out of 100 based on the rubric.
`;

    const userMessage = `
Context: Chapter ${chapterId}
Task/Question: ${questionText}
Rubric: ${JSON.stringify(rubric || { taskCompletion: 25, grammar: 25, vocabulary: 20, coherence: 20, a2Level: 10 })}
User Answer: "${answer}"
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        response_format: { type: "json_object" },
        temperature: 0.2
      })
    });

    if (!response.ok) {
      console.error("OpenAI API Error", await response.text());
      return NextResponse.json({ error: "Gagal memproses penilaian AI." }, { status: 500 });
    }

    const data = await response.json();
    const resultJson = JSON.parse(data.choices[0].message.content);

    return NextResponse.json(resultJson);

  } catch (error) {
    console.error("AI Correction API Error", error);
    return NextResponse.json({ error: "Terjadi kesalahan internal server." }, { status: 500 });
  }
}
