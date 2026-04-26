"use client";

import React, { useState } from 'react';
import { Brain, CheckCircle2, AlertCircle } from 'lucide-react';

type Question = {
  id: number;
  q: string;
  options: string[];
  correct: number;
  explanation: string;
};

const GRAMMAR_QUESTIONS: Record<'indefinit' | 'relativ_nom' | 'relativ_akk', Question[]> = {
  indefinit: [
    {
      id: 1,
      q: "Kann mir bitte ___ helfen?",
      options: ["jemand", "niemand", "alles"],
      correct: 0,
      explanation: "'jemand' bedeutet 'seseorang'. (Bisakah seseorang membantu saya?)"
    },
    {
      id: 2,
      q: "Ich habe ___ verstanden.",
      options: ["jemand", "nichts", "alles"],
      correct: 2,
      explanation: "'alles' bedeutet 'semua'. 'Ich habe alles verstanden' (Saya mengerti semuanya). Alternativ: 'nichts' ist grammatikalisch auch möglich, aber hier ist 'alles' gemeint."
    },
    {
      id: 3,
      q: "Hier hat ___ mehr Platz, es ist so voll.",
      options: ["jemand", "niemand", "etwas"],
      correct: 1,
      explanation: "'niemand' bedeutet 'tidak seorang pun'. (Tidak ada orang yang punya tempat lagi)."
    },
    {
      id: 4,
      q: "Hast du ___ vergessen?",
      options: ["nichts", "niemand", "wer"],
      correct: 0,
      explanation: "'nichts' für Sachen. (Apakah kamu tidak melupakan apa-apa?)"
    }
  ],
  relativ_nom: [
    {
      id: 1,
      q: "Peter Veit ist ein Radiosprecher, ___ eingeschlafen ist.",
      options: ["der", "das", "die"],
      correct: 0,
      explanation: "Radiosprecher = maskulin (der). Im Relativsatz Nominativ bleibt es 'der'."
    },
    {
      id: 2,
      q: "Das ist das Kind, ___ sehr nett ist.",
      options: ["der", "das", "die"],
      correct: 1,
      explanation: "Kind = neutral (das)."
    },
    {
      id: 3,
      q: "Auf der Bühne war eine Sängerin, ___ keine Stimme mehr hatte.",
      options: ["der", "das", "die"],
      correct: 2,
      explanation: "Sängerin = feminin (die)."
    },
    {
      id: 4,
      q: "Es waren die Fans, ___ fast alle Lieder gesungen haben.",
      options: ["der", "das", "die"],
      correct: 2,
      explanation: "Fans = Plural (die)."
    }
  ],
  relativ_akk: [
    {
      id: 1,
      q: "Peter Veit ist ein Radiosprecher, ___ viele Leute kennen.",
      options: ["der", "den", "das"],
      correct: 1,
      explanation: "Radiosprecher = maskulin. Subjekt im Relativsatz ist 'viele Leute', also ist der Radiosprecher das Akkusativ-Objekt -> 'den'."
    },
    {
      id: 2,
      q: "Das ist das Bild, ___ ich gekauft habe.",
      options: ["der", "den", "das"],
      correct: 2,
      explanation: "Bild = neutral (das). Im Akkusativ bleibt es 'das'."
    },
    {
      id: 3,
      q: "Die Sängerin, ___ wir gestern gehört haben, war fantastisch.",
      options: ["der", "den", "die"],
      correct: 2,
      explanation: "Sängerin = feminin (die). Im Akkusativ bleibt es 'die'."
    },
    {
      id: 4,
      q: "Das ist der Mann, ___ ich oft treffe.",
      options: ["der", "den", "das"],
      correct: 1,
      explanation: "Mann = maskulin. 'treffen' braucht Akkusativ -> 'den'."
    }
  ]
};

export default function GrammatikInteraktiv12() {
  const [activeTab, setActiveTab] = useState<'indefinit' | 'relativ_nom' | 'relativ_akk'>('indefinit');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qId: number, optIdx: number) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const reset = () => {
    setAnswers({});
    setShowResults(false);
  };

  const currentQuestions = GRAMMAR_QUESTIONS[activeTab];
  const allAnswered = currentQuestions.every(q => answers[q.id] !== undefined);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-wrap gap-4 border-b-2 border-slate-300 pb-4">
        <button
          onClick={() => { setActiveTab('indefinit'); reset(); }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'indefinit' ? 'bg-amber-100 text-amber-900 border-2 border-amber-400' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Brain className="w-5 h-5" />
          Indefinitpronomen
        </button>
        <button
          onClick={() => { setActiveTab('relativ_nom'); reset(); }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'relativ_nom' ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-400' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Brain className="w-5 h-5" />
          Relativsatz Nominativ
        </button>
        <button
          onClick={() => { setActiveTab('relativ_akk'); reset(); }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'relativ_akk' ? 'bg-sky-100 text-sky-900 border-2 border-sky-400' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Brain className="w-5 h-5" />
          Relativsatz Akkusativ
        </button>
      </div>

      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 mb-8">
        {activeTab === 'indefinit' ? (
          <div>
            <p className="font-bold text-amber-900 mb-2">Regel: Indefinitpronomen</p>
            <p className="text-amber-800">
              Für Personen: <strong>man</strong> (orang umum), <strong>jemand</strong> (seseorang), <strong>niemand</strong> (tak seorang pun).<br/>
              Für Sachen: <strong>alles</strong> (semuanya), <strong>etwas / was</strong> (sesuatu), <strong>nichts</strong> (tidak ada/apa-apa).
            </p>
          </div>
        ) : activeTab === 'relativ_nom' ? (
          <div>
            <p className="font-bold text-amber-900 mb-2">Regel: Relativsätze im Nominativ</p>
            <p className="text-amber-800">
              Relativsätze geben genauere Informationen. Die Relativpronomen im Nominativ sind wie die bestimmten Artikel:<br/>
              Maskulin: <strong>der</strong>, Neutral: <strong>das</strong>, Feminin: <strong>die</strong>, Plural: <strong>die</strong>.
            </p>
          </div>
        ) : (
          <div>
            <p className="font-bold text-amber-900 mb-2">Regel: Relativsätze im Akkusativ</p>
            <p className="text-amber-800">
              Wenn das Relativpronomen das Objekt im Satz ist, steht es im Akkusativ:<br/>
              Maskulin: <strong>den</strong>, Neutral: <strong>das</strong>, Feminin: <strong>die</strong>, Plural: <strong>die</strong>.<br/>
              Beispiel: Der Mann, <strong>den</strong> ich kenne. (Ich kenne den Mann).
            </p>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {currentQuestions.map((q, idx) => {
          const userAnswer = answers[q.id];
          const isCorrect = userAnswer === q.correct;
          const showExplanation = showResults && !isCorrect;

          return (
            <div key={q.id} className="clay-card p-6 bg-white border-slate-300">
              <h4 className="text-xl font-bold text-slate-800 mb-4">{idx + 1}. {q.q}</h4>
              <div className="flex gap-4">
                {q.options.map((opt, oIdx) => {
                  let btnClass = "flex-1 p-4 rounded-xl font-bold border-2 transition-all text-center ";
                  
                  if (!showResults) {
                    btnClass += userAnswer === oIdx 
                      ? "bg-amber-100 border-amber-500 text-amber-900 scale-[1.02] shadow-md" 
                      : "bg-slate-50 border-slate-300 text-slate-600 hover:border-amber-300 hover:bg-amber-50";
                  } else {
                    if (oIdx === q.correct) {
                      btnClass += "bg-emerald-100 border-emerald-500 text-emerald-900";
                    } else if (userAnswer === oIdx) {
                      btnClass += "bg-rose-100 border-rose-500 text-rose-900";
                    } else {
                      btnClass += "bg-slate-50 border-slate-300 text-slate-600 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelect(q.id, oIdx)}
                      disabled={showResults}
                      className={btnClass}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              
              {showExplanation && (
                <div className="mt-4 p-4 bg-rose-50 rounded-xl border border-rose-100 flex items-start gap-3 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-rose-900 mb-1">Nicht ganz richtig</p>
                    <p className="text-rose-700">{q.explanation}</p>
                  </div>
                </div>
              )}
              {showResults && isCorrect && (
                <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-emerald-900 mb-1">Richtig!</p>
                    <p className="text-emerald-700">{q.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        {!showResults ? (
          <button
            onClick={checkAnswers}
            disabled={!allAnswered}
            className="px-8 py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white rounded-xl font-bold flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            <CheckCircle2 className="w-5 h-5" />
            Antworten prüfen
          </button>
        ) : (
          <button
            onClick={reset}
            className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold transition-all hover:scale-105"
          >
            Nochmal üben
          </button>
        )}
      </div>
    </div>
  );
}
