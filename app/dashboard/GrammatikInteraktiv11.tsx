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

const GRAMMAR_QUESTIONS: Record<'konjunktiv2' | 'praeposition' | 'w_fragen', Question[]> = {
  konjunktiv2: [
    {
      id: 1,
      q: "Ich ___ gern mehr Zeit für meine Hobbys.",
      options: ["hätte", "wäre", "würde"],
      correct: 0,
      explanation: "'hätte' kommt von haben (Ich möchte Zeit haben)."
    },
    {
      id: 2,
      q: "Wir ___ gern öfter zu Hause.",
      options: ["hätten", "wären", "würden"],
      correct: 1,
      explanation: "'wären' kommt von sein (Wir möchten zu Hause sein)."
    },
    {
      id: 3,
      q: "Er ___ gern mehr lesen.",
      options: ["hätte", "wäre", "würde"],
      correct: 2,
      explanation: "Für andere Verben (wie lesen) benutzt man 'würde' + Infinitiv."
    },
    {
      id: 4,
      q: "Jana und Eva ___ gern berühmt.",
      options: ["hätten", "wären", "würden"],
      correct: 1,
      explanation: "'wären' (sein) -> Sie möchten berühmt sein."
    }
  ],
  praeposition: [
    {
      id: 1,
      q: "Wir freuen uns ___ den Ausflug.",
      options: ["auf", "über", "an"],
      correct: 0,
      explanation: "sich freuen auf + Akk. (für etwas in der Zukunft)."
    },
    {
      id: 2,
      q: "Er erinnert sich ___ seine Schulzeit.",
      options: ["an", "über", "auf"],
      correct: 0,
      explanation: "sich erinnern an + Akk."
    },
    {
      id: 3,
      q: "Thilo kümmert sich ___ die Tickets.",
      options: ["über", "um", "auf"],
      correct: 1,
      explanation: "sich kümmern um + Akk."
    },
    {
      id: 4,
      q: "Mereth wartet ___ Milan.",
      options: ["auf", "an", "mit"],
      correct: 0,
      explanation: "warten auf + Akk."
    }
  ],
  w_fragen: [
    {
      id: 1,
      q: "___ ärgert sich Milan? – Über die Prüfung.",
      options: ["Über wen", "Worüber", "Worum"],
      correct: 1,
      explanation: "'Die Prüfung' ist eine Sache -> worüber."
    },
    {
      id: 2,
      q: "___ hat Mereth gesprochen? – Mit Ben.",
      options: ["Mit wem", "Womit", "Mit wen"],
      correct: 0,
      explanation: "'Ben' ist eine Person, und 'mit' verlangt Dativ -> Mit wem."
    },
    {
      id: 3,
      q: "___ kümmert sich Thilo? – Um die Tickets.",
      options: ["Um wen", "Worum", "Woran"],
      correct: 1,
      explanation: "'Tickets' sind Sachen -> worum."
    },
    {
      id: 4,
      q: "___ wartet Pia? – Auf Ben.",
      options: ["Worauf", "Auf wem", "Auf wen"],
      correct: 2,
      explanation: "'Ben' ist eine Person, und 'auf' verlangt hier Akkusativ -> Auf wen."
    }
  ]
};

export default function GrammatikInteraktiv11() {
  const [activeTab, setActiveTab] = useState<'konjunktiv2' | 'praeposition' | 'w_fragen'>('konjunktiv2');
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
          onClick={() => { setActiveTab('konjunktiv2'); reset(); }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'konjunktiv2' ? 'bg-amber-100 text-amber-900 border-2 border-amber-400' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Brain className="w-5 h-5" />
          Konjunktiv II
        </button>
        <button
          onClick={() => { setActiveTab('praeposition'); reset(); }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'praeposition' ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-400' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Brain className="w-5 h-5" />
          Verben mit Präp.
        </button>
        <button
          onClick={() => { setActiveTab('w_fragen'); reset(); }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'w_fragen' ? 'bg-sky-100 text-sky-900 border-2 border-sky-400' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Brain className="w-5 h-5" />
          W-Fragen
        </button>
      </div>

      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 mb-8">
        {activeTab === 'konjunktiv2' ? (
          <div>
            <p className="font-bold text-amber-900 mb-2">Regel: Konjunktiv II</p>
            <p className="text-amber-800">
              Man benutzt den Konjunktiv II, um Wünsche zu äußern.<br/>
              Für 'haben' {"->"} <strong>hätte</strong>.<br/>
              Für 'sein' {"->"} <strong>wäre</strong>.<br/>
              Für andere Verben {"->"} <strong>würde</strong> + Infinitiv.
            </p>
          </div>
        ) : activeTab === 'praeposition' ? (
          <div>
            <p className="font-bold text-amber-900 mb-2">Regel: Verben mit Präposition</p>
            <p className="text-amber-800">
              Lerne diese Verben immer zusammen mit ihrer Präposition:<br/>
              - sich freuen <strong>auf</strong><br/>
              - sich kümmern <strong>um</strong><br/>
              - sich erinnern <strong>an</strong>
            </p>
          </div>
        ) : (
          <div>
            <p className="font-bold text-amber-900 mb-2">Regel: W-Fragen mit Präposition</p>
            <p className="text-amber-800">
              Bei Sachen/Dingen: <strong>wo(r)</strong> + Präposition (z.B. worauf, worüber).<br/>
              Bei Personen: <strong>Präposition</strong> + Fragewort (z.B. auf wen, über wen, mit wem).
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
