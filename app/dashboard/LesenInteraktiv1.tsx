"use client";

import React, { useState } from 'react';

export function LesenInteraktiv1() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleCheck = (index: number) => {
    setSelectedAnswer(index);
    if (index === 1) { // Jawaban benar: B
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
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
          Leider <strong>ist</strong> mein Bus spät <strong>gekommen</strong>, weil es stark geregnet hat. 
          Am Sonntag <strong>habe</strong> ich den ganzen Tag für meine Prüfung <strong>gelernt</strong>.
        </p>
      </div>

      <div className="clay-card p-8 bg-white border-slate-200">
        <h4 className="text-xl font-bold text-slate-800 mb-6">Frage: Warum ist Anna zu spät gekommen?</h4>
        <div className="space-y-4">
          {[
            "Weil sie ihre Freunde getroffen hat.",
            "Weil der Bus spät gekommen ist und es geregnet hat.",
            "Weil sie für ihre Prüfung gelernt hat."
          ].map((option, index) => (
            <button
              key={index}
              onClick={() => handleCheck(index)}
              className={`w-full text-left p-4 rounded-xl border-2 font-bold transition-all ${
                selectedAnswer === index
                  ? isCorrect
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                    : 'bg-rose-100 border-rose-500 text-rose-900'
                  : 'bg-slate-50 border-slate-300 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50'
              }`}
            >
              <span className="mr-3 text-lg">{String.fromCharCode(65 + index)}.</span>
              {option}
            </button>
          ))}
        </div>
        {isCorrect !== null && (
          <div className={`mt-6 p-4 rounded-xl font-bold ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
            {isCorrect ? '🎉 Richtig! Jawaban kamu benar.' : '❌ Falsch! Coba baca lagi teksnya dengan teliti.'}
          </div>
        )}
      </div>
    </div>
  );
}
