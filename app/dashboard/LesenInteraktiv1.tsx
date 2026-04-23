"use client";

import React, { useState } from 'react';

export function LesenInteraktiv1() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({
    0: null, 1: null, 2: null
  });
  const [isCorrect, setIsCorrect] = useState<Record<number, boolean | null>>({
    0: null, 1: null, 2: null
  });

  const questions = [
    {
      q: "1. Warum ist Anna am Samstag in den Supermarkt gefahren?",
      options: [
        "Weil sie ihre Freunde treffen wollte.",
        "Weil sie Lebensmittel kaufen musste.",
        "Weil sie einen Kuchen backen wollte."
      ],
      correct: 1
    },
    {
      q: "2. Warum ist der Bus spät gekommen?",
      options: [
        "Weil es einen Unfall gab.",
        "Weil der Busfahrer krank war.",
        "Weil es stark geregnet hat."
      ],
      correct: 2
    },
    {
      q: "3. Was hat Anna am Sonntag gemacht?",
      options: [
        "Sie hat den ganzen Tag für ihre Prüfung gelernt.",
        "Sie hat ihre Wohnung aufgeräumt.",
        "Sie hat Kaffee getrunken und gelacht."
      ],
      correct: 0
    }
  ];

  const handleCheck = (qIndex: number, optIndex: number) => {
    setSelectedAnswers(prev => ({...prev, [qIndex]: optIndex}));
    setIsCorrect(prev => ({...prev, [qIndex]: optIndex === questions[qIndex].correct}));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-900">Lesen: Mein Wochenende</h2>
        <p className="text-slate-600 mt-2">Bacalah teks di bawah ini dan jawab pertanyaannya.</p>
      </div>

      <div className="clay-card p-8 bg-amber-50 border-amber-200 border-b-8">
        <h3 className="text-2xl font-black text-amber-950 mb-4">Ein stressiges Wochenende</h3>
        <p className="text-amber-900 font-medium leading-relaxed text-lg">
          Hallo! Ich bin Anna. Letztes Wochenende war sehr stressig. Am Samstagmorgen <strong>habe</strong> ich meine Wohnung <strong>aufgeräumt</strong>. 
          Danach <strong>bin</strong> ich in den Supermarkt <strong>gefahren</strong>, weil ich Lebensmittel kaufen musste. 
          Am Nachmittag <strong>habe</strong> ich meine Freunde im Café <strong>getroffen</strong>. Wir <strong>haben</strong> Kaffee <strong>getrunken</strong> und viel <strong>gelacht</strong>. 
          Leider <strong>ist</strong> mein Bus spät <strong>gekommen</strong>, weil es stark geregnet hat. Am Abend war ich dann extrem müde.
          Am Sonntag <strong>habe</strong> ich den ganzen Tag für meine Prüfung <strong>gelernt</strong>, denn am Montag schreibe ich einen wichtigen Test.
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
                {isCorrect[qIndex] ? '🎉 Richtig! Jawaban kamu benar.' : '❌ Falsch! Coba baca lagi teksnya dengan teliti.'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
