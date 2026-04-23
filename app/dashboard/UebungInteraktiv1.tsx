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
      { type: 'text', val: '1. Ich bleibe zu Hause, ' },
      { type: 'input', id: 'q1_1', ans: 'weil', width: 'w-24' },
      { type: 'text', val: ' ich krank ' },
      { type: 'input', id: 'q1_2', ans: 'bin', width: 'w-20' },
      { type: 'text', val: '. Gestern ' },
      { type: 'input', id: 'q1_3', ans: 'bin', width: 'w-20' },
      { type: 'text', val: ' ich nicht in die Schule ' },
      { type: 'input', id: 'q1_4', ans: 'gegangen', width: 'w-32' },
      { type: 'text', val: '.' },
    ]
  },
  {
    id: 2,
    segments: [
      { type: 'text', val: '2. Lukas ist satt, ' },
      { type: 'input', id: 'q2_1', ans: 'weil', width: 'w-24' },
      { type: 'text', val: ' er Pizza bestellt ' },
      { type: 'input', id: 'q2_2', ans: 'hat', width: 'w-20' },
      { type: 'text', val: '. Er ' },
      { type: 'input', id: 'q2_3', ans: 'hat', width: 'w-20' },
      { type: 'text', val: ' zu Hause Pizza ' },
      { type: 'input', id: 'q2_4', ans: 'gegessen', width: 'w-32' },
      { type: 'text', val: '.' },
    ]
  },
  {
    id: 3,
    segments: [
      { type: 'text', val: '3. Anna kommt spät, ' },
      { type: 'input', id: 'q3_1', ans: 'weil', width: 'w-24' },
      { type: 'text', val: ' der Bus Verspätung ' },
      { type: 'input', id: 'q3_2', ans: 'hatte', width: 'w-24' },
      { type: 'text', val: '. Der Bus ' },
      { type: 'input', id: 'q3_3', ans: 'ist', width: 'w-20' },
      { type: 'text', val: ' sehr spät ' },
      { type: 'input', id: 'q3_4', ans: 'gekommen', width: 'w-32' },
      { type: 'text', val: '.' },
    ]
  },
  {
    id: 4,
    segments: [
      { type: 'text', val: '4. Wir lernen Deutsch, ' },
      { type: 'input', id: 'q4_1', ans: 'weil', width: 'w-24' },
      { type: 'text', val: ' wir in Berlin arbeiten ' },
      { type: 'input', id: 'q4_2', ans: 'wollen', width: 'w-28' },
      { type: 'text', val: '. Wir ' },
      { type: 'input', id: 'q4_3', ans: 'haben', width: 'w-24' },
      { type: 'text', val: ' einen Intensivkurs ' },
      { type: 'input', id: 'q4_4', ans: 'gemacht', width: 'w-32' },
      { type: 'text', val: '.' },
    ]
  },
  {
    id: 5,
    segments: [
      { type: 'text', val: '5. Er trinkt Wasser, ' },
      { type: 'input', id: 'q5_1', ans: 'weil', width: 'w-24' },
      { type: 'text', val: ' er großen Durst ' },
      { type: 'input', id: 'q5_2', ans: 'hat', width: 'w-20' },
      { type: 'text', val: '. Er ' },
      { type: 'input', id: 'q5_3', ans: 'hat', width: 'w-20' },
      { type: 'text', val: ' seinen Kaffee nicht ' },
      { type: 'input', id: 'q5_4', ans: 'getrunken', width: 'w-32' },
      { type: 'text', val: '.' },
    ]
  },
  {
    id: 6,
    segments: [
      { type: 'text', val: '6. Maria ist müde, ' },
      { type: 'input', id: 'q6_1', ans: 'weil', width: 'w-24' },
      { type: 'text', val: ' sie so lange ' },
      { type: 'input', id: 'q6_2', ans: 'gearbeitet', width: 'w-32' },
      { type: 'text', val: ' ' },
      { type: 'input', id: 'q6_3', ans: 'hat', width: 'w-20' },
      { type: 'text', val: '. Sie ' },
      { type: 'input', id: 'q6_4', ans: 'hat', width: 'w-20' },
      { type: 'text', val: ' das ganze Wochenende im Büro ' },
      { type: 'input', id: 'q6_5', ans: 'gesessen', width: 'w-32' },
      { type: 'text', val: '.' },
    ]
  },
  {
    id: 7,
    segments: [
      { type: 'text', val: '7. Ich freue mich, ' },
      { type: 'input', id: 'q7_1', ans: 'weil', width: 'w-24' },
      { type: 'text', val: ' ich eine gute Note ' },
      { type: 'input', id: 'q7_2', ans: 'bekommen', width: 'w-32' },
      { type: 'text', val: ' ' },
      { type: 'input', id: 'q7_3', ans: 'habe', width: 'w-24' },
      { type: 'text', val: '. Ich ' },
      { type: 'input', id: 'q7_4', ans: 'habe', width: 'w-24' },
      { type: 'text', val: ' viel für die Prüfung ' },
      { type: 'input', id: 'q7_5', ans: 'gelernt', width: 'w-32' },
      { type: 'text', val: '.' },
    ]
  },
  {
    id: 8,
    segments: [
      { type: 'text', val: '8. Ben kocht nicht, ' },
      { type: 'input', id: 'q8_1', ans: 'weil', width: 'w-24' },
      { type: 'text', val: ' er keine Zeit ' },
      { type: 'input', id: 'q8_2', ans: 'hat', width: 'w-20' },
      { type: 'text', val: '. Er ' },
      { type: 'input', id: 'q8_3', ans: 'ist', width: 'w-20' },
      { type: 'text', val: ' heute ins Restaurant ' },
      { type: 'input', id: 'q8_4', ans: 'gegangen', width: 'w-32' },
      { type: 'text', val: '.' },
    ]
  },
  {
    id: 9,
    segments: [
      { type: 'text', val: '9. Wir bleiben hier, ' },
      { type: 'input', id: 'q9_1', ans: 'weil', width: 'w-24' },
      { type: 'text', val: ' es stark ' },
      { type: 'input', id: 'q9_2', ans: 'regnet', width: 'w-28' },
      { type: 'text', val: '. Wir ' },
      { type: 'input', id: 'q9_3', ans: 'haben', width: 'w-24' },
      { type: 'text', val: ' unsere Regenschirme ' },
      { type: 'input', id: 'q9_4', ans: 'vergessen', width: 'w-32' },
      { type: 'text', val: '.' },
    ]
  },
  {
    id: 10,
    segments: [
      { type: 'text', val: '10. Er spricht gut Spanisch, ' },
      { type: 'input', id: 'q10_1', ans: 'weil', width: 'w-24' },
      { type: 'text', val: ' er in Madrid ' },
      { type: 'input', id: 'q10_2', ans: 'gelebt', width: 'w-28' },
      { type: 'text', val: ' ' },
      { type: 'input', id: 'q10_3', ans: 'hat', width: 'w-20' },
      { type: 'text', val: '. Er ' },
      { type: 'input', id: 'q10_4', ans: 'hat', width: 'w-20' },
      { type: 'text', val: ' dort viele Freunde ' },
      { type: 'input', id: 'q10_5', ans: 'gefunden', width: 'w-32' },
      { type: 'text', val: '.' },
    ]
  }
];

export function UebungInteraktiv1() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'checked'>('idle');

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
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-900">Schreiben: Perfekt & Weil</h2>
        <p className="text-slate-600 mt-2">Lengkapi kalimat rumpang di bawah ini dengan kata yang tepat.</p>
      </div>

      {status === 'checked' && (
        <div className={`p-8 rounded-2xl border-4 text-center ${allCorrect ? 'bg-emerald-100 border-emerald-500' : 'bg-rose-100 border-rose-500'}`}>
          <h2 className={`text-4xl font-black mb-2 ${allCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
            {allCorrect ? '🎉 SEMPURNA!' : '❌ ADA YANG SALAH'}
          </h2>
          <p className="text-xl font-bold text-slate-700">Skor Anda: <span className="text-3xl font-black">{Math.round((correctInputs / totalInputs) * 100)}</span> / 100</p>
          <p className="text-sm mt-2 text-slate-500">Benar {correctInputs} dari {totalInputs} isian.</p>
        </div>
      )}

      <div className="clay-card p-8 bg-emerald-50 border-emerald-200 border-b-8">
        <h3 className="text-2xl font-black text-emerald-950 mb-6">Cloze Test (10 Soal)</h3>
        
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
    </div>
  );
}
