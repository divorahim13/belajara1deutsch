import { NextResponse } from 'next/server';
import DOMPurify from 'isomorphic-dompurify';
import { createClient } from '@/lib/supabase/server';

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
      return NextResponse.json({ score: 0, feedback: `<p>${quotaCheck.error || 'Akses ditolak.'}</p>` });
    }

    const body = await req.json();
    const text = body?.text;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json({ score: 0, feedback: '<p>Anda tidak menulis apapun pada bagian ini.</p>' });
    }

    if (text.length > 2000) {
      return NextResponse.json({ error: 'Teks terlalu panjang (maks. 2000 karakter).' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Server tidak terkonfigurasi dengan benar.' }, { status: 500 });
    }

    const promptMessage = `
Kamu adalah penguji ujian bahasa Jerman A2 (seperti Goethe-Zertifikat A2).
Murid menulis pesan SMS berikut sebagai jawaban dari soal:
"Anda mendapat pesan dari Thomas yang mengajak Anda ke bioskop hari Sabtu malam. Balas pesan tersebut dengan mencakup poin: (1) Salam pembuka, (2) Tolak ajakan hari Sabtu dan beri alasan (absagen & begründen), (3) Usulkan hari lain (Vorschlag ändern), (4) Ajak melakukan aktivitas lain (etwas vorschlagen), (5) Salam penutup."


Teks tulisan murid:
"""
${text}
"""

Tugasmu:
1. Berikan nilai (Score) murni berupa angka dari 0 sampai 10 (10 berarti sempurna sesuai A2).
2. Berikan "Feedback" berupa analisis singkat dalam bahasa Indonesia mengapa nilai tersebut diberikan. Tunjukkan jika ada grammar (seperti salah konyugasi, Partizip II, posisi kata kerja) atau ejaan yang salah dan berikan versi perbaikannya. Formatlah menggunakan HTML dasar yang rapi (gunakan <b>, <ul>, <li>, <p>) tanpa tag <html> atau <body>.

Respons Anda HARUS berbentuk JSON persis dengan format ini:
{
  "score": <angka_0_sampai_10>,
  "feedback": "<html_string>"
}
HANYA kembalikan JSON, jangan kembalikan teks lain agar dapat di-parse sistem.
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an A2 German exam evaluator. Return ONLY valid JSON.' },
          { role: 'user', content: promptMessage }
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      }),
    });

    if (!response.ok) {
      console.error('OpenAI Error (Evaluation Schreiben)');
      return NextResponse.json({ error: 'Gagal menghubungi server kecerdasan buatan.' }, { status: 500 });
    }

    const data = await response.json();
    const resultObj = JSON.parse(data.choices[0].message.content);
    
    const cleanFeedback = DOMPurify.sanitize(resultObj.feedback);

    return NextResponse.json({ 
      score: resultObj.score, 
      feedback: cleanFeedback 
    });

  } catch (error) {
    console.error('Schreiben Evaluation Error');
    return NextResponse.json({ error: 'Terjadi kesalahan internal server.' }, { status: 500 });
  }
}
