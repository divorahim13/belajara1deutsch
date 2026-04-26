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
      return NextResponse.json({ feedback: `<p>${quotaCheck.error || 'Akses ditolak.'}</p>` });
    }

    const body = await req.json();
    const mistakes = body?.mistakes;

    if (!mistakes || !Array.isArray(mistakes) || mistakes.length === 0) {
      return NextResponse.json({ feedback: '<p>Hebat! Kamu tidak memiliki kesalahan.</p>' });
    }

    if (mistakes.length > 50) {
      return NextResponse.json({ error: 'Terlalu banyak kesalahan untuk dianalisis sekaligus.' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Server tidak terkonfigurasi dengan benar.' }, { status: 500 });
    }

    const promptMessage = `
Kamu adalah tutor bahasa Jerman yang ramah dan suportif bernama "Deutsch AI".
Murid ini (level A2) baru saja mengambil tes "Kapiteltest" dan melakukan beberapa kesalahan.
Berikut adalah daftar kesalahan murid tersebut:
${JSON.stringify(mistakes, null, 2)}

Tugasmu:
- Jelaskan secara singkat dan mudah dimengerti mengapa jawaban murid salah.
- Berikan penjelasan berdasarkan aturan tata bahasa (grammar) atau kosakata (vocabulary) yang relevan (seperti Partizip II, Genitiv, atau kalimat dengan 'weil').
- Gunakan bahasa Indonesia yang santai tapi mendidik.

Berikan jawabanmu dalam format HTML yang bersih (gunakan <b>, <ul>, <li>, <p>) tanpa tag <html> atau <body> agar bisa langsung ditampilkan di web. 
Penting: Jangan menyebutkan "berdasarkan JSON" atau kata teknis lainnya.
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
          { role: 'system', content: 'You are a helpful A2 German tutor.' },
          { role: 'user', content: promptMessage }
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI Error (Evaluation Test)');
      return NextResponse.json({ error: 'Gagal menghubungi server kecerdasan buatan.' }, { status: 500 });
    }

    const data = await response.json();
    const rawFeedback = data.choices[0].message.content;
    const cleanFeedback = DOMPurify.sanitize(rawFeedback);

    return NextResponse.json({ feedback: cleanFeedback });
  } catch (error) {
    console.error('Evaluation Route Error');
    return NextResponse.json({ error: 'Terjadi kesalahan internal server.' }, { status: 500 });
  }
}
