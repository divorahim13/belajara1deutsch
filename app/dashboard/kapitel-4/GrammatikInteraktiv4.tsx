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
      { type: 'text', val: '1. Ich bin glücklich, ' },
      { type: 'input', id: 'q1_1', ans: 'wenn', width: 'w-20' },
      { type: 'text', val: ' ich mit Freunden feiern ' },
      { type: 'input', id: 'q1_2', ans: 'kann', width: 'w-20' },
      { type: 'text', val: '.' },
    ]
  },
  {
    id: 2,
    segments: [
      { type: 'text', val: '2. ' },
      { type: 'input', id: 'q2_1', ans: 'Wenn', width: 'w-20' },
      { type: 'text', val: ' ich Zeit habe, ' },
      { type: 'input', id: 'q2_2', ans: 'mache', width: 'w-20' },
      { type: 'text', val: ' ich Sport.' },
    ]
  },
  {
    id: 3,
    segments: [
      { type: 'text', val: '3. Mona, warum ärgerst du ' },
      { type: 'input', id: 'q3_1', ans: 'dich', width: 'w-20' },
      { type: 'text', val: '?' },
    ]
  },
  {
    id: 4,
    segments: [
      { type: 'text', val: '4. Wir treffen ' },
      { type: 'input', id: 'q4_1', ans: 'uns', width: 'w-20' },
      { type: 'text', val: ' um acht Uhr.' },
    ]
  },
  {
    id: 5,
    segments: [
      { type: 'text', val: '5. Ich freue ' },
      { type: 'input', id: 'q5_1', ans: 'mich', width: 'w-20' },
      { type: 'text', val: ' schon auf die Party.' },
    ]
  }
];

export function GrammatikInteraktiv4() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleChange = (id: string, val: string) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
    setShowResult(false);
  };

  const checkAnswers = () => {
    let pts = 0;
    questions.forEach(q => {
      q.segments.forEach(seg => {
        if (seg.type === 'input') {
          if ((answers[seg.id] || '').trim().toLowerCase() === seg.ans.toLowerCase()) {
            pts++;
          }
        }
      });
    });
    setScore(pts);
    setShowResult(true);
  };

  const totalInputs = questions.reduce((acc, q) => acc + q.segments.filter(s => s.type === 'input').length, 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-emerald-100">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>📝</span> Grammatik Übung: Nebensatz mit "wenn" & Reflexive Verben
        </h3>
        <p className="text-slate-600 mb-6">
          Ergänze <i>wenn</i>, die passenden Verben am Ende, und die richtigen <i>Reflexivpronomen</i> (mich, dich, sich, uns, euch).
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
