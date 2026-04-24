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
      { type: 'text', val: '1. Gestern ' },
      { type: 'input', id: 'q1_1', ans: 'habe', width: 'w-20' },
      { type: 'text', val: ' ich Fußball ' },
      { type: 'input', id: 'q1_2', ans: 'gespielt', width: 'w-32' },
      { type: 'text', val: ', ' },
      { type: 'input', id: 'q1_3', ans: 'aber', width: 'w-20' },
      { type: 'text', val: ' heute bin ich zu müde.' },
    ]
  },
  {
    id: 2,
    segments: [
      { type: 'text', val: '2. Wir ' },
      { type: 'input', id: 'q2_1', ans: 'sind', width: 'w-20' },
      { type: 'text', val: ' nach Berlin ' },
      { type: 'input', id: 'q2_2', ans: 'gefahren', width: 'w-32' },
      { type: 'text', val: ', ' },
      { type: 'input', id: 'q2_3', ans: 'denn', width: 'w-20' },
      { type: 'text', val: ' wir haben dort Urlaub gemacht.' },
    ]
  },
  {
    id: 3,
    segments: [
      { type: 'text', val: '3. Hast du den Film ' },
      { type: 'input', id: 'q3_1', ans: 'gesehen', width: 'w-32' },
      { type: 'text', val: ' ' },
      { type: 'input', id: 'q3_2', ans: 'oder', width: 'w-20' },
      { type: 'text', val: ' das Buch gelesen?' },
    ]
  },
  {
    id: 4,
    segments: [
      { type: 'text', val: '4. Er ' },
      { type: 'input', id: 'q4_1', ans: 'hat', width: 'w-20' },
      { type: 'text', val: ' einen Kaffee ' },
      { type: 'input', id: 'q4_2', ans: 'getrunken', width: 'w-32' },
      { type: 'text', val: ' ' },
      { type: 'input', id: 'q4_3', ans: 'und', width: 'w-20' },
      { type: 'text', val: ' ein Brötchen gegessen.' },
    ]
  },
  {
    id: 5,
    segments: [
      { type: 'text', val: '5. Ich ' },
      { type: 'input', id: 'q5_1', ans: 'bin', width: 'w-20' },
      { type: 'text', val: ' gestern früh ' },
      { type: 'input', id: 'q5_2', ans: 'aufgestanden', width: 'w-40' },
      { type: 'text', val: ', ' },
      { type: 'input', id: 'q5_3', ans: 'denn', width: 'w-20' },
      { type: 'text', val: ' ich musste arbeiten.' },
    ]
  }
];

export function GrammatikInteraktiv1() {
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
      <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-indigo-100">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>📝</span> Grammatik Übung: Perfekt & Konnektoren (und, oder, aber, denn)
        </h3>
        <p className="text-slate-600 mb-6">
          Ergänze das Perfekt (haben/sein + Partizip II) und den richtigen Konnektor!
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
                    inputClass += "border-indigo-300 text-indigo-900 focus:border-indigo-600 focus:bg-indigo-50";
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
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-500 transition-colors"
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
