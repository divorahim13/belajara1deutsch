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

const GRAMMAR_QUESTIONS: Record<'wechsel' | 'als_wenn', Question[]> = {
  wechsel: [
    {
      id: 1,
      q: "Das Kissen liegt ___ Stuhl.",
      options: ["auf dem", "auf den"],
      correct: 0,
      explanation: "Wo? + Dativ (liegen). Der Stuhl -> dem Stuhl."
    },
    {
      id: 2,
      q: "Sie legt das Kissen ___ Stuhl.",
      options: ["auf dem", "auf den"],
      correct: 1,
      explanation: "Wohin? + Akkusativ (legen). Der Stuhl -> den Stuhl."
    },
    {
      id: 3,
      q: "Der Müll steht ___ Garage.",
      options: ["neben der", "neben die"],
      correct: 0,
      explanation: "Wo? + Dativ (stehen). Die Garage -> der Garage."
    },
    {
      id: 4,
      q: "Sie stellen das Fahrrad ___ Garage.",
      options: ["in der", "in die"],
      correct: 1,
      explanation: "Wohin? + Akkusativ (stellen). Die Garage -> die Garage."
    }
  ],
  als_wenn: [
    {
      id: 1,
      q: "___ Melly ein Zeugnis gefehlt hat, hat ihre Mutter es geschickt.",
      options: ["Als", "Wenn"],
      correct: 0,
      explanation: "'Als' für ein einmaliges Ereignis in der Vergangenheit."
    },
    {
      id: 2,
      q: "Immer ___ Melly Zeit hatte, waren Lena und Noah nicht da.",
      options: ["Als", "Wenn"],
      correct: 1,
      explanation: "'Immer wenn' für wiederholte Ereignisse in der Vergangenheit."
    },
    {
      id: 3,
      q: "___ sie das erste Mal in Heidelberg war, hat es ihr super gefallen.",
      options: ["Als", "Wenn"],
      correct: 0,
      explanation: "'Als' für 'das erste Mal' in der Vergangenheit (einmalig)."
    },
    {
      id: 4,
      q: "___ Vera Fragen hat, helfen ihr andere Studierende.",
      options: ["Als", "Wenn"],
      correct: 1,
      explanation: "'Wenn' für die Gegenwart / eine Bedingung."
    }
  ]
};

export default function GrammatikInteraktiv10() {
  const [activeTab, setActiveTab] = useState<'wechsel' | 'als_wenn'>('wechsel');
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
      <div className="flex gap-4 border-b-2 border-slate-300 pb-4">
        <button
          onClick={() => { setActiveTab('wechsel'); reset(); }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'wechsel' ? 'bg-amber-100 text-amber-900 border-2 border-amber-400' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Brain className="w-5 h-5" />
          Wechselpräpositionen
        </button>
        <button
          onClick={() => { setActiveTab('als_wenn'); reset(); }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'als_wenn' ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-400' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Brain className="w-5 h-5" />
          als / wenn
        </button>
      </div>

      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 mb-8">
        {activeTab === 'wechsel' ? (
          <div>
            <p className="font-bold text-amber-900 mb-2">Regel: Wo? (Dativ) vs Wohin? (Akkusativ)</p>
            <p className="text-amber-800">
              Verwende den <strong>Dativ</strong>, wenn es um eine Position geht (Wo? / liegen, stehen, hängen). <br/>
              Verwende den <strong>Akkusativ</strong>, wenn es um eine Richtung geht (Wohin? / legen, stellen, hängen).
            </p>
          </div>
        ) : (
          <div>
            <p className="font-bold text-amber-900 mb-2">Regel: als vs wenn</p>
            <p className="text-amber-800">
              Verwende <strong>als</strong> für ein einmaliges Ereignis in der Vergangenheit. <br/>
              Verwende <strong>wenn</strong> für mehrmalige Ereignisse in der Vergangenheit ("immer wenn") oder für die Gegenwart.
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
