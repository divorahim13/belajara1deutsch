"use client";

import React, { useState } from 'react';

type Segment = 
  | { type: 'text'; val: string }
  | { type: 'input'; id: string; ans: string; width: string };

type Question = {
  id: number;
  segments: Segment[];
};

const questions: Question[] = [
  {
    id: 1,
    segments: [
      { type: 'text', val: '1. E-Books sind viel ' },
      { type: 'input', id: 'q1_1', ans: 'besser', width: 'w-24' },
      { type: 'text', val: ' (gut) als Bücher.' },
    ]
  },
  {
    id: 2,
    segments: [
      { type: 'text', val: '2. Auf dem E-Book-Reader kann man viele Bücher haben - das ist viel ' },
      { type: 'input', id: 'q2_1', ans: 'praktischer', width: 'w-32' },
      { type: 'text', val: ' (praktisch).' },
    ]
  },
  {
    id: 3,
    segments: [
      { type: 'text', val: '3. Ein Buch ist viel ' },
      { type: 'input', id: 'q3_1', ans: 'schöner', width: 'w-24' },
      { type: 'text', val: ' (schön), ich liebe Papier.' },
    ]
  },
  {
    id: 4,
    segments: [
      { type: 'text', val: '4. Ein E-Book ist meistens ' },
      { type: 'input', id: 'q4_1', ans: 'billiger', width: 'w-24' },
      { type: 'text', val: ' (billig) als ein Buch.' },
    ]
  },
  {
    id: 5,
    segments: [
      { type: 'text', val: '5. Ich gehe gern ins Kino, aber ' },
      { type: 'input', id: 'q5_1', ans: 'am', width: 'w-16' },
      { type: 'text', val: ' ' },
      { type: 'input', id: 'q5_2', ans: 'liebsten', width: 'w-24' },
      { type: 'text', val: ' (gern) schaue ich Serien zu Hause.' },
    ]
  },
  {
    id: 6,
    segments: [
      { type: 'text', val: '6. Meine Informatik-Professorin finde ich ' },
      { type: 'input', id: 'q6_1', ans: 'am', width: 'w-16' },
      { type: 'text', val: ' ' },
      { type: 'input', id: 'q6_2', ans: 'interessantesten', width: 'w-40' },
      { type: 'text', val: ' (interessant).' },
    ]
  },
  {
    id: 7,
    segments: [
      { type: 'text', val: '7. Was stört dich an Social Media ' },
      { type: 'input', id: 'q7_1', ans: 'am', width: 'w-16' },
      { type: 'text', val: ' ' },
      { type: 'input', id: 'q7_2', ans: 'meisten', width: 'w-24' },
      { type: 'text', val: ' (viel)?' },
    ]
  },
  {
    id: 8,
    segments: [
      { type: 'text', val: '8. Ich finde es sehr gut, ' },
      { type: 'input', id: 'q8_1', ans: 'dass', width: 'w-20' },
      { type: 'text', val: ' man immer Kontakt mit Freunden ' },
      { type: 'input', id: 'q8_2', ans: 'hat', width: 'w-20' },
      { type: 'text', val: '.' },
    ]
  },
  {
    id: 9,
    segments: [
      { type: 'text', val: '9. Meine Schwester sagt, ' },
      { type: 'input', id: 'q9_1', ans: 'dass', width: 'w-20' },
      { type: 'text', val: ' sie ihr Smartphone immer ' },
      { type: 'input', id: 'q9_2', ans: 'mitnimmt', width: 'w-28' },
      { type: 'text', val: '.' },
    ]
  },
  {
    id: 10,
    segments: [
      { type: 'text', val: '10. Ich mag es nicht, ' },
      { type: 'input', id: 'q10_1', ans: 'dass', width: 'w-20' },
      { type: 'text', val: ' meine Freunde so viele Fotos ' },
      { type: 'input', id: 'q10_2', ans: 'posten', width: 'w-28' },
      { type: 'text', val: '.' },
    ]
  }
];

export function UebungInteraktiv3() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'checked'>('idle');

  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  const [schreibenText, setSchreibenText] = useState('');
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const checkAnswers = () => {
    setStatus('checked');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reset = () => {
    setStatus('idle');
    setAnswers({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (id: string, val: string) => {
    if (status === 'checked') return;
    setAnswers(prev => ({ ...prev, [id]: val }));
  };

  const handleEvaluateSchreiben = async () => {
    if (!schreibenText.trim()) return;
    setIsEvaluating(true);
    setAiFeedback(null);
    try {
      const res = await fetch('/api/evaluateSchreiben', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: schreibenText })
      });
      const data = await res.json();
      setAiFeedback(data.feedback || "Maaf, AI gagal memproses evaluasi.");
    } catch (e) {
      setAiFeedback("Terjadi kesalahan jaringan.");
    } finally {
      setIsEvaluating(false);
    }
  };

  let totalInputs = 0;
  let correctInputs = 0;

  if (status === 'checked') {
    questions.forEach(q => {
      q.segments.forEach(seg => {
        if (seg.type === 'input') {
          totalInputs++;
          const userAns = (answers[seg.id] || '').trim().toLowerCase();
          if (userAns === seg.ans.toLowerCase()) {
            correctInputs++;
          }
        }
      });
    });
  }

  const allCorrect = status === 'checked' && correctInputs === totalInputs;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-black text-slate-900">Schreiben & Übung</h2>
        <p className="text-slate-600 mt-2">Pilih mode latihan menulis di bawah ini.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {[
          { id: 1, label: 'Teil 1: Lückentext' },
          { id: 2, label: 'Teil 2: Freies Schreiben' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as 1 | 2)}
            className={`px-6 py-3 rounded-xl font-black transition-all ${
              activeTab === t.id
                ? 'bg-emerald-600 text-white shadow-lg -translate-y-1'
                : 'bg-white text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 border-2 border-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 1 && (
        <div className="clay-card p-8 bg-emerald-50 border-emerald-200 border-b-8">
          <h3 className="text-2xl font-black text-emerald-950 mb-2">Cloze Test (10 Soal)</h3>
          <p className="text-emerald-800 mb-6 font-bold">Lengkapi kalimat rumpang dengan Komparativ, Superlativ, atau Nebensatz mit "dass".</p>
          
          {status === 'checked' && (
            <div className={`p-8 rounded-2xl border-4 text-center mb-6 ${allCorrect ? 'bg-emerald-100 border-emerald-500' : 'bg-rose-100 border-rose-500'}`}>
              <h2 className={`text-4xl font-black mb-2 ${allCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                {allCorrect ? '🎉 SEMPURNA!' : '❌ ADA YANG SALAH'}
              </h2>
              <p className="text-xl font-bold text-slate-700">Skor Anda: <span className="text-3xl font-black">{Math.round((correctInputs / totalInputs) * 100)}</span> / 100</p>
              <p className="text-sm mt-2 text-slate-500">Benar {correctInputs} dari {totalInputs} isian.</p>
            </div>
          )}

          <div className="space-y-6 text-lg font-medium text-slate-800">
            {questions.map(q => {
              let isQuestionFullyCorrect = true;
              const expectedAnswers: string[] = [];

              if (status === 'checked') {
                q.segments.forEach(seg => {
                  if (seg.type === 'input') {
                    expectedAnswers.push(seg.ans);
                    const userAns = (answers[seg.id] || '').trim().toLowerCase();
                    if (userAns !== seg.ans.toLowerCase()) {
                      isQuestionFullyCorrect = false;
                    }
                  }
                });
              }

              return (
                <div key={q.id} className="flex flex-col gap-2 bg-white p-5 rounded-xl border-2 border-emerald-100 shadow-sm">
                  <div className="flex flex-wrap items-center gap-y-3 gap-x-1.5 leading-10">
                    {q.segments.map((seg, idx) => {
                      if (seg.type === 'text') {
                        return <span key={idx}>{seg.val}</span>;
                      }

                      const userAns = (answers[seg.id] || '').trim().toLowerCase();
                      const isCorrect = userAns === seg.ans.toLowerCase();
                      
                      let inputClass = `text-center px-2 py-1 rounded-lg border-b-4 outline-none font-bold transition-colors ${seg.width} `;
                      
                      if (status === 'checked') {
                        inputClass += isCorrect 
                          ? 'border-emerald-500 bg-emerald-100 text-emerald-900' 
                          : 'border-rose-500 bg-rose-100 text-rose-900';
                      } else {
                        inputClass += 'border-slate-300 bg-slate-50 focus:border-emerald-400 focus:bg-emerald-50';
                      }

                      return (
                        <input 
                          key={seg.id}
                          type="text" 
                          className={inputClass}
                          value={answers[seg.id] || ''}
                          onChange={e => handleInputChange(seg.id, e.target.value)}
                          disabled={status === 'checked'}
                          placeholder="..."
                        />
                      );
                    })}
                  </div>
                  
                  {status === 'checked' && !isQuestionFullyCorrect && (
                    <div className="mt-2 text-sm font-bold text-rose-600 bg-rose-50 p-2 rounded-lg border border-rose-200">
                      💡 Jawaban yang benar: {expectedAnswers.join(' / ')}
                    </div>
                  )}
                  {status === 'checked' && isQuestionFullyCorrect && (
                    <div className="mt-2 text-sm font-bold text-emerald-600 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                      ✅ Benar semua!
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex gap-4">
            {status === 'idle' ? (
              <button 
                onClick={checkAnswers}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl shadow-lg border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 transition-all text-xl"
              >
                Cek Jawaban
              </button>
            ) : (
              <button 
                onClick={reset}
                className="w-full bg-slate-600 hover:bg-slate-500 text-white font-black py-4 rounded-2xl shadow-lg border-b-4 border-slate-800 active:border-b-0 active:translate-y-1 transition-all text-xl"
              >
                Ulangi Latihan
              </button>
            )}
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div className="clay-card p-8 bg-sky-50 border-sky-200 border-b-8">
          <h3 className="text-2xl font-black text-sky-950 mb-4">Freies Schreiben (Goethe-Task)</h3>
          
          <div className="bg-white p-5 rounded-xl border-2 border-sky-100 mb-6">
            <h4 className="font-bold text-slate-800 mb-2">Soal:</h4>
            <p className="text-slate-600 italic border-l-4 border-sky-400 pl-3">
              Dein Freund fragt dich, welchen Film ihr am Wochenende im Kino sehen sollt ("Welchen Film sollen wir schauen?").<br/><br/>
              Schreibe eine Nachricht (30–40 Wörter):<br/>
              1. Schlage einen Film vor (Komödie oder Action).<br/>
              2. Begründe, warum dieser Film <strong>besser</strong> oder <strong>spannender</strong> ist als ein anderer.<br/>
              3. Sage, wann und wo ihr euch trefft.
            </p>
          </div>

          <textarea
            value={schreibenText}
            onChange={(e) => setSchreibenText(e.target.value)}
            disabled={isEvaluating || !!aiFeedback}
            placeholder="Hallo! Wir können am Wochenende..."
            className="w-full h-48 p-4 rounded-xl border-2 border-slate-300 focus:border-sky-500 outline-none resize-none mb-4 font-medium text-slate-800"
          />

          <button 
            onClick={handleEvaluateSchreiben}
            disabled={isEvaluating || !schreibenText.trim() || !!aiFeedback}
            className="w-full bg-sky-600 hover:bg-sky-500 disabled:bg-slate-400 text-white font-black py-4 rounded-2xl shadow-lg border-b-4 border-sky-800 active:border-b-0 active:translate-y-1 transition-all text-xl flex items-center justify-center gap-2"
          >
            {isEvaluating ? '🤖 AI sedang mengoreksi...' : '✨ Evaluasi dengan AI'}
          </button>

          {aiFeedback && (
            <div className="mt-8 bg-white p-6 rounded-2xl border-2 border-purple-200 shadow-inner">
              <h4 className="text-purple-800 font-black mb-4 flex items-center gap-2">
                <span className="text-2xl">🤖</span> Hasil Evaluasi AI
              </h4>
              <div 
                className="prose prose-sm text-slate-700 max-w-none" 
                dangerouslySetInnerHTML={{ __html: aiFeedback }} 
              />
              <button 
                onClick={() => { setAiFeedback(null); setSchreibenText(''); }}
                className="mt-6 font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-2 rounded-xl border border-slate-300 transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
