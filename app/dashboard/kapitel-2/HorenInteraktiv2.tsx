"use client";

import React, { useState, useEffect } from 'react';

export function HorenInteraktiv2() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({
    0: null, 1: null, 2: null
  });
  const [isCorrect, setIsCorrect] = useState<Record<number, boolean | null>>({
    0: null, 1: null, 2: null
  });

  const transcript = "Interviewer: Lena, was möchtest du nach der Schule machen? Lena: Ich weiß es noch nicht genau. Früher wollte ich Medizin studieren. Aber jetzt denke ich über eine Ausbildung nach. Interviewer: Warum eine Ausbildung? Lena: Weil ich praktisch arbeiten möchte. Ich durfte letztes Jahr ein Praktikum im Krankenhaus machen. Es war toll, aber ein Studium ist mir vielleicht zu theoretisch.";

  const togglePlay = () => {
    if (!('speechSynthesis' in window)) {
      alert("Maaf, browser Anda tidak mendukung fitur Text-to-Speech.");
      return;
    }
    
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(transcript);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9;
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const questions = [
    {
      q: "1. Warum möchte Lena vielleicht eine Ausbildung machen?",
      options: [
        "Weil sie Ärztin werden will.",
        "Weil sie lieber praktisch arbeiten möchte.",
        "Weil sie kein Praktikum machen durfte."
      ],
      correct: 1
    },
    {
      q: "2. Was wollte Lena früher machen?",
      options: [
        "Eine Ausbildung machen.",
        "Im Krankenhaus arbeiten.",
        "Medizin studieren."
      ],
      correct: 2
    },
    {
      q: "3. Warum findet Lena ein Studium vielleicht nicht so gut?",
      options: [
        "Es ist zu teuer.",
        "Es ist zu theoretisch.",
        "Es dauert zu lange."
      ],
      correct: 1
    }
  ];

  const handleCheck = (qIndex: number, optIndex: number) => {
    setSelectedAnswers(prev => ({...prev, [qIndex]: optIndex}));
    setIsCorrect(prev => ({...prev, [qIndex]: optIndex === questions[qIndex].correct}));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-900">Hören: Nach der Schule</h2>
        <p className="text-slate-600 mt-2">Dengarkan wawancara berikut dan jawab pertanyaannya.</p>
      </div>

      <div className="clay-card p-8 bg-indigo-50 border-indigo-200 border-b-8 flex flex-col items-center">
        {/* Play Button and Animation */}
        <div className="relative mb-6">
          <div 
            className={`w-28 h-28 bg-indigo-600 rounded-full flex items-center justify-center text-5xl text-white shadow-xl cursor-pointer hover:scale-105 transition-transform z-10 relative ${isPlaying ? 'ring-4 ring-indigo-300 ring-offset-4' : ''}`} 
            onClick={togglePlay}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </div>
          
          {/* Soundwave Animation */}
          {isPlaying && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 flex items-center justify-between px-2 z-0 opacity-50 pointer-events-none">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div 
                  key={i} 
                  className="w-3 bg-indigo-400 rounded-full animate-pulse"
                  style={{ 
                    height: `${Math.random() * 60 + 20}%`, 
                    animationDuration: `${Math.random() * 0.5 + 0.3}s`,
                    animationIterationCount: 'infinite',
                    animationDirection: 'alternate'
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>

        <p className="text-indigo-900 font-bold mb-4 text-lg">
          {isPlaying ? 'Sedang memutar audio...' : 'Klik tombol play untuk memulai'}
        </p>
        
        {/* Transcript */}
        <div className="bg-white p-6 rounded-2xl border-2 border-indigo-100 w-full mt-4">
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Audio Transcript (Simulasi)</p>
          <div className="space-y-3 text-indigo-950 font-medium">
            <p><strong>Interviewer:</strong> Lena, was möchtest du nach der Schule machen?</p>
            <p><strong>Lena:</strong> Ich weiß es noch nicht genau. Früher <strong>wollte</strong> ich Medizin studieren. Aber jetzt denke ich über eine Ausbildung nach.</p>
            <p><strong>Interviewer:</strong> Warum eine Ausbildung?</p>
            <p><strong>Lena:</strong> Weil ich praktisch arbeiten möchte. Ich <strong>durfte</strong> letztes Jahr ein Praktikum im Krankenhaus machen. Es war toll, aber ein Studium ist mir vielleicht zu theoretisch.</p>
          </div>
        </div>
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
                      : 'bg-slate-50 border-slate-300 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50'
                  }`}
                >
                  <span className="mr-3 text-lg">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>
            {isCorrect[qIndex] !== null && (
              <div className={`mt-6 p-4 rounded-xl font-bold ${isCorrect[qIndex] ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                {isCorrect[qIndex] ? '🎉 Richtig! Jawaban kamu benar.' : '❌ Falsch! Coba dengarkan lagi.'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
