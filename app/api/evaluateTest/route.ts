import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { mistakes } = await req.json();

    if (!mistakes || mistakes.length === 0) {
      return NextResponse.json({ feedback: 'Hebat! Kamu tidak memiliki kesalahan.' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OPENAI_API_KEY tidak ditemukan di server.' }, { status: 500 });
    }

    const promptMessage = `
Kamu adalah tutor bahasa Jerman yang ramah dan suportif bernama "Deutsch AI".
Murid ini (level A2) baru saja mengambil tes "Kapiteltest 1" dan melakukan beberapa kesalahan.
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
      const errorText = await response.text();
      console.error('OpenAI Error:', errorText);
      return NextResponse.json({ error: 'Gagal menghubungi OpenAI.' }, { status: 500 });
    }

    const data = await response.json();
    const feedback = data.choices[0].message.content;

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error('Evaluation Route Error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan internal server.' }, { status: 500 });
  }
}
