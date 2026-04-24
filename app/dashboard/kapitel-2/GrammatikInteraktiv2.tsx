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
      { type: 'text', val: '1. Früher ' },
      { type: 'input', id: 'q1_1', ans: 'wollte', width: 'w-24' },
      { type: 'text', val: ' ich Astronaut werden, aber ich ' },
      { type: 'input', id: 'q1_2', ans: 'musste', width: 'w-24' },
      { type: 'text', val: ' viel lernen.' },
    ]
  },
  {
    id: 2,
    segments: [
      { type: 'text', val: '2. ' },
      { type: 'input', id: 'q2_1', ans: 'Konntest', width: 'w-28' },
      { type: 'text', val: ' du als Kind schon schwimmen?' },
    ]
  },
  {
    id: 3,
    segments: [
      { type: 'text', val: '3. Wir ' },
      { type: 'input', id: 'q3_1', ans: 'durften', width: 'w-24' },
      { type: 'text', val: ' gestern nicht lange fernsehen, weil wir schlafen ' },
      { type: 'input', id: 'q3_2', ans: 'sollten', width: 'w-24' },
      { type: 'text', val: '.' },
    ]
  },
  {
    id: 4,
    segments: [
      { type: 'text', val: '4. Ist das ' },
      { type: 'input', id: 'q4_1', ans: 'dein', width: 'w-20' },
      { type: 'text', val: ' (du) Buch? Nein, das ist ' },
      { type: 'input', id: 'q4_2', ans: 'sein', width: 'w-20' },
      { type: 'text', val: ' (er) Buch.' },
    ]
  },
  {
    id: 5,
    segments: [
      { type: 'text', val: '5. ' },
      { type: 'input', id: 'q5_1', ans: 'Unsere', width: 'w-24' },
      { type: 'text', val: ' (wir) Lehrerin ist sehr nett. Wie heißt ' },
      { type: 'input', id: 'q5_2', ans: 'eure', width: 'w-20' },
      { type: 'text', val: ' (ihr) Lehrerin?' },
    ]
  }
];

export function GrammatikInteraktiv2() {
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
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-fuchsia-100">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>📝</span> Grammatik Übung: Modalverben (Präteritum) & Possessivartikel
        </h3>
        <p className="text-slate-600 mb-6">
          Ergänze die Modalverben im Präteritum (konnte, musste, durfte, wollte, sollte) oder die passenden Possessivartikel.
        </p>

        <div className="space-y-4">
          {questions.map(q => (
            <div key={q.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-lg leading-relaxed">
              {q.segments.map((seg, i) => {
                if (seg.type === 'text') {
                  return <span key={i} className="text-slate-700">{seg.val}</span>;
                } else {
                  const isCorrect = (answers[seg.id] || '').trim().toLowerCase() === seg.ans.toLowerCase();
                  let inputClass = "mx-1 px-2 py-1 border-b-2 bg-transparent outline-none font-bold text-center transition-colors ";
                  if (showResult) {
                    inputClass += isCorrect ? "border-emerald-500 text-emerald-700" : "border-rose-500 text-rose-700";
                  } else {
                    inputClass += "border-fuchsia-300 text-fuchsia-900 focus:border-fuchsia-600 focus:bg-fuchsia-50";
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
            className="px-6 py-3 bg-fuchsia-600 text-white font-bold rounded-xl shadow-md hover:bg-fuchsia-500 transition-colors"
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
