"use client";

import React, { useState } from 'react';

export function HorenInteraktiv1() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real app, you would play/pause the audio element here
  };

  const handleCheck = (index: number) => {
    setSelectedAnswer(index);
    if (index === 0) { // Jawaban benar: A
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-900">Hören: Der Termin</h2>
        <p className="text-slate-600 mt-2">Dengarkan percakapan berikut dan jawab pertanyaannya.</p>
      </div>

      <div className="clay-card p-8 bg-indigo-50 border-indigo-200 border-b-8 flex flex-col items-center">
        <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-4xl text-white shadow-lg mb-6 cursor-pointer hover:scale-105 transition-transform" onClick={togglePlay}>
          {isPlaying ? '⏸️' : '▶️'}
        </div>
        <p className="text-indigo-900 font-bold mb-4">
          {isPlaying ? 'Sedang memutar audio simulasi...' : 'Klik tombol play untuk memulai'}
        </p>
        
        {/* Transcript (Usually hidden in real test, but shown here for context) */}
        <div className="bg-white p-6 rounded-2xl border-2 border-indigo-100 w-full mt-4">
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Audio Transcript (Simulasi)</p>
          <div className="space-y-3 text-indigo-950 font-medium">
            <p><strong>Lukas:</strong> Hallo Maria! Tut mir leid, dass ich zu spät bin.</p>
            <p><strong>Maria:</strong> Kein Problem. Was ist passiert?</p>
            <p><strong>Lukas:</strong> Ich bin mit dem Bus gefahren, aber es gab einen Stau, <strong>weil</strong> es einen Unfall gegeben hat.</p>
            <p><strong>Maria:</strong> Oh nein! Hast du schon gegessen?</p>
            <p><strong>Lukas:</strong> Ja, ich habe zu Hause Pizza gegessen.</p>
          </div>
        </div>
      </div>

      <div className="clay-card p-8 bg-white border-slate-200">
        <h4 className="text-xl font-bold text-slate-800 mb-6">Frage: Warum ist Lukas zu spät?</h4>
        <div className="space-y-4">
          {[
            "Weil es einen Stau und einen Unfall gab.",
            "Weil er zu Hause Pizza gegessen hat.",
            "Weil er den Bus verpasst hat."
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
            {isCorrect ? '🎉 Richtig! Jawaban kamu benar.' : '❌ Falsch! Coba dengarkan lagi.'}
          </div>
        )}
      </div>
    </div>
  );
}
