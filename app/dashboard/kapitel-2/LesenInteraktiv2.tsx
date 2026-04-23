"use client";

import React, { useState } from 'react';

export function LesenInteraktiv2() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({
    0: null, 1: null, 2: null
  });
  const [isCorrect, setIsCorrect] = useState<Record<number, boolean | null>>({
    0: null, 1: null, 2: null
  });

  const questions = [
    {
      q: "1. Wo hat Tobias sein Praktikum gemacht?",
      options: [
        "In einem Krankenhaus.",
        "In einer Schule.",
        "In einer IT-Firma."
      ],
      correct: 2
    },
    {
      q: "2. Was war am Anfang schwierig für Tobias?",
      options: [
        "Die Arbeit war neu und er konnte nicht alles verstehen.",
        "Die Kollegen waren sehr unfreundlich zu ihm.",
        "Er musste jeden Tag sehr lange arbeiten."
      ],
      correct: 0
    },
    {
      q: "3. Wie fand Tobias das Praktikum am Ende?",
      options: [
        "Er fand es langweilig, weil er nichts verstanden hat.",
        "Er fand es zu anstrengend und wollte sofort nach Hause gehen.",
        "Er fand es sehr gut und es hat ihm geholfen, seinen Traumberuf zu finden."
      ],
      correct: 2
    }
  ];

  const handleCheck = (qIndex: number, optIndex: number) => {
    setSelectedAnswers(prev => ({...prev, [qIndex]: optIndex}));
    setIsCorrect(prev => ({...prev, [qIndex]: optIndex === questions[qIndex].correct}));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-900">Lesen: Mein Praktikum</h2>
        <p className="text-slate-600 mt-2">Bacalah teks di bawah ini dan jawab pertanyaannya.</p>
      </div>

      <div className="clay-card p-8 bg-amber-50 border-amber-200 border-b-8">
        <h3 className="text-2xl font-black text-amber-950 mb-4">Erfahrungen im Praktikum</h3>
        <p className="text-amber-900 font-medium leading-relaxed text-lg">
          Hallo, ich bin Tobias! Letztes Jahr habe ich ein Praktikum in einer IT-Firma gemacht. 
          Das Praktikum war sehr interessant, aber auch anstrengend. Ich <strong>musste</strong> jeden Morgen um 8 Uhr im Büro sein. 
          Meine Kollegen waren sehr nett. Ich <strong>durfte</strong> bei vielen Projekten mithelfen und habe viel gelernt. 
          Am Anfang <strong>konnte</strong> ich nicht alles verstehen, weil die Arbeit neu für mich war. 
          Aber nach zwei Wochen <strong>wollte</strong> ich gar nicht mehr gehen, weil das Team super war. Das Praktikum hat mir sehr geholfen, meinen Traumberuf zu finden. Jetzt bin ich sicher, dass ich Informatik studieren will.
        </p>
      </div>

      <div className="space-y-6">
        {questions.map((item, qIndex) => (
          <div key={qIndex} className="clay-card p-8 bg-white border-slate-200">
            <h4 className="text-xl font-bold text-slate-800 mb-6">{item.q}</h4>
            <div className="space-y-4">
              {item.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleCheck(qIndex, index)}
                  className={`w-full text-left p-4 rounded-xl border-2 font-bold transition-all ${
                    selectedAnswers[qIndex] === index
                      ? isCorrect[qIndex]
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                        : 'bg-rose-100 border-rose-500 text-rose-900'
                      : 'bg-slate-50 border-slate-300 text-slate-700 hover:border-amber-400 hover:bg-amber-50'
                  }`}
                >
                  <span className="mr-3 text-lg">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>
            {isCorrect[qIndex] !== null && (
              <div className={`mt-6 p-4 rounded-xl font-bold ${isCorrect[qIndex] ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                {isCorrect[qIndex] ? '🎉 Richtig! Jawaban kamu benar.' : '❌ Falsch! Coba baca teksnya lagi.'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
