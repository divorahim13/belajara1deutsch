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
      { type: 'text', val: '1. Ein Laptop ist ' },
      { type: 'input', id: 'q1_1', ans: 'teurer', width: 'w-24' },
      { type: 'text', val: ' (teuer) ' },
      { type: 'input', id: 'q1_2', ans: 'als', width: 'w-16' },
      { type: 'text', val: ' ein Buch, aber ein Auto ist am ' },
      { type: 'input', id: 'q1_3', ans: 'teuersten', width: 'w-32' },
      { type: 'text', val: '.' },
    ]
  },
  {
    id: 2,
    segments: [
      { type: 'text', val: '2. Ich finde den Film gut, aber das Buch ist ' },
      { type: 'input', id: 'q2_1', ans: 'besser', width: 'w-24' },
      { type: 'text', val: ' (gut).' },
    ]
  },
  {
    id: 3,
    segments: [
      { type: 'text', val: '3. Lisa läuft genauso ' },
      { type: 'input', id: 'q3_1', ans: 'schnell', width: 'w-24' },
      { type: 'text', val: ' (schnell) ' },
      { type: 'input', id: 'q3_2', ans: 'wie', width: 'w-16' },
      { type: 'text', val: ' Max.' },
    ]
  },
  {
    id: 4,
    segments: [
      { type: 'text', val: '4. Ich hoffe, ' },
      { type: 'input', id: 'q4_1', ans: 'dass', width: 'w-20' },
      { type: 'text', val: ' du morgen Zeit ' },
      { type: 'input', id: 'q4_2', ans: 'hast', width: 'w-20' },
      { type: 'text', val: '.' },
    ]
  },
  {
    id: 5,
    segments: [
      { type: 'text', val: '5. Er sagt, ' },
      { type: 'input', id: 'q5_1', ans: 'dass', width: 'w-20' },
      { type: 'text', val: ' der Film sehr spannend ' },
      { type: 'input', id: 'q5_2', ans: 'ist', width: 'w-20' },
      { type: 'text', val: '.' },
    ]
  }
];

export function GrammatikInteraktiv3() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleChange = (id: string, val: string) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
    setShowResult(false);
  };

  const checkAnswers = () => {
    let pts = 0;
    const attemptsPayload: { questionId: string, isCorrect: boolean, userAnswer: string }[] = [];

    questions.forEach(q => {
      q.segments.forEach(seg => {
        if (seg.type === 'input') {
          const userAnswer = (answers[seg.id] || '').trim().toLowerCase();
          const isCorrect = userAnswer === seg.ans.toLowerCase();
          if (isCorrect) {
            pts++;
          }
          attemptsPayload.push({
            questionId: `g3_${seg.id}`,
            isCorrect,
            userAnswer: answers[seg.id] || ''
          });
        }
      });
    });
    
    setScore(pts);
    setShowResult(true);

    // Sync to DB
    if (attemptsPayload.length > 0) {
      fetch('/api/questions/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapterId: 3,
          attempts: attemptsPayload
        })
      }).catch(err => console.error('Failed to sync question attempts:', err));
    }
  };

  const totalInputs = questions.reduce((acc, q) => acc + q.segments.filter(s => s.type === 'input').length, 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-emerald-100">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>📝</span> Grammatik Übung: Komparativ, Superlativ & dass-Sätze
        </h3>
        <p className="text-slate-600 mb-6">
          Ergänze die Adjektive (Komparativ/Superlativ), <i>als</i> oder <i>wie</i>, und den Konnektor <i>dass</i>.
        </p>

        <div className="space-y-4">
          {questions.map(q => (
            <div key={q.id} className="p-4 bg-slate-50 rounded-xl border border-slate-300 text-lg leading-relaxed">
              {q.segments.map((seg, i) => {
                if (seg.type === 'text') {
                  return <span key={i} className="text-slate-700">{seg.val}</span>;
                } else {
                  const isCorrect = (answers[seg.id] || '').trim().toLowerCase() === seg.ans.toLowerCase();
                  let inputClass = "mx-1 px-2 py-1 border-b-2 bg-transparent outline-none font-bold text-center transition-colors ";
                  if (showResult) {
                    inputClass += isCorrect ? "border-emerald-500 text-emerald-700" : "border-rose-500 text-rose-700";
                  } else {
                    inputClass += "border-emerald-300 text-emerald-900 focus:border-emerald-600 focus:bg-emerald-50";
                  }

                  return (
                    <span key={i} className="relative inline-block">
                      <input
                        type="text"
                        className={`${seg.width} ${inputClass}`}
                        value={answers[seg.id] || ''}
                        onChange={(e) => handleChange(seg.id, e.target.value)}
                        placeholder="..."
                      />
                      {showResult && !isCorrect && (
                        <span className="absolute -bottom-6 left-0 w-full text-center text-xs font-bold text-emerald-600">
                          {seg.ans}
                        </span>
                      )}
                    </span>
                  );
                }
              })}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <button 
            onClick={checkAnswers}
            className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-md hover:bg-emerald-500 transition-colors"
          >
            Antworten prüfen
          </button>
          
          {showResult && (
            <div className={`text-xl font-bold px-4 py-2 rounded-xl ${score === totalInputs ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
              Ergebnis: {score} / {totalInputs}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
