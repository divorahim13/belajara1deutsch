"use client";

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function GrammatikInteraktiv9() {
  const [activeTab, setActiveTab] = useState(0);

  // Tab 1: deshalb & trotzdem
  const [deshalbAnswers, setDeshalbAnswers] = useState<Record<number, string>>({});
  const [deshalbFeedback, setDeshalbFeedback] = useState<Record<number, boolean | null>>({});

  const deshalbQuiz = [
    {
      q: "Das Wetter war sehr schlecht. ___ sind wir wandern gegangen.",
      options: ["Deshalb", "Trotzdem"],
      correct: "Trotzdem",
      explanation: "Trotzdem zeigt einen Gegensatz: Cuaca buruk, tapi tetap pergi."
    },
    {
      q: "Er hat jeden Tag trainiert. ___ hat er eine Medaille gewonnen.",
      options: ["Deshalb", "Trotzdem"],
      correct: "Deshalb",
      explanation: "Deshalb zeigt eine logische Folge: Karena berlatih tiap hari, dia menang."
    },
    {
      q: "Der Spieler war verletzt. ___ hat sein Team das Finale verloren.",
      options: ["Deshalb", "Trotzdem"],
      correct: "Deshalb",
      explanation: "Deshalb: Karena cedera, timnya kalah."
    },
    {
      q: "Sie hat große Höhenangst. ___ möchte sie klettern lernen.",
      options: ["Deshalb", "Trotzdem"],
      correct: "Trotzdem",
      explanation: "Trotzdem: Meskipun takut ketinggian, dia ingin memanjat."
    }
  ];

  const handleDeshalbCheck = (index: number, answer: string) => {
    setDeshalbAnswers(prev => ({ ...prev, [index]: answer }));
    setDeshalbFeedback(prev => ({ ...prev, [index]: answer === deshalbQuiz[index].correct }));
  };

  // Tab 2: Dativ und Akkusativ
  const [daAnswers, setDaAnswers] = useState<Record<number, number>>({});
  const [daFeedback, setDaFeedback] = useState<Record<number, boolean | null>>({});

  const daQuiz = [
    {
      q: "Ich gebe ___ (der Trainer - Dativ) ___ (der Ball - Akkusativ).",
      options: [
        "den Trainer dem Ball",
        "dem Trainer den Ball",
        "dem Trainer der Ball"
      ],
      correct: 1,
      explanation: "Person (Dativ) kommt vor Sache (Akkusativ): dem Trainer (Dativ) den Ball (Akkusativ)."
    },
    {
      q: "Wir erklären ___ (die Gäste - Dativ) ___ (die Regeln - Akkusativ).",
      options: [
        "den Gästen die Regeln",
        "die Gästen die Regeln",
        "den Gäste die Regeln"
      ],
      correct: 0,
      explanation: "Dativ Plural ist 'den ...-n'. Also: den Gästen."
    },
    {
      q: "Erklärt ihr ___ (die Regeln - Pronomen: sie) ___ (die Gäste - Dativ)?",
      options: [
        "den Gästen sie",
        "sie den Gästen",
        "ihnen sie"
      ],
      correct: 1,
      explanation: "Wenn das Akkusativobjekt ein Pronomen (sie) ist, steht es VOR dem Dativobjekt."
    },
    {
      q: "Ich schenke ___ (mein Bruder) ___ (ein Buch).",
      options: [
        "mein Bruder ein Buch",
        "meinem Bruder ein Buch",
        "meinen Bruder ein Buch"
      ],
      correct: 1,
      explanation: "Bruder ist maskulin. Dativ: meinem Bruder. Buch ist neutral. Akkusativ: ein Buch."
    }
  ];

  const handleDaCheck = (index: number, answerIndex: number) => {
    setDaAnswers(prev => ({ ...prev, [index]: answerIndex }));
    setDaFeedback(prev => ({ ...prev, [index]: answerIndex === daQuiz[index].correct }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black text-slate-900 mb-4">Grammatik Training</h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Latih pemahamanmu tentang kata hubung dan aturan objek ganda.
        </p>
      </div>

      <div className="flex justify-center mb-8 bg-slate-100 p-1.5 rounded-2xl w-fit mx-auto">
        <button
          onClick={() => setActiveTab(0)}
          className={`px-8 py-3 rounded-xl font-bold transition-all ${
            activeTab === 0 
              ? 'bg-white text-emerald-600 shadow-sm' 
              : 'text-slate-700 hover:text-slate-700 hover:bg-slate-200/50'
          }`}
        >
          deshalb & trotzdem
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`px-8 py-3 rounded-xl font-bold transition-all ${
            activeTab === 1 
              ? 'bg-white text-emerald-600 shadow-sm' 
              : 'text-slate-700 hover:text-slate-700 hover:bg-slate-200/50'
          }`}
        >
          Dativ & Akkusativ
        </button>
      </div>

      {activeTab === 0 && (
        <div className="clay-card p-8 bg-white border-emerald-100">
          <div className="mb-6 flex items-start gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Übung 1: deshalb oder trotzdem?</h3>
              <p className="text-slate-600">Pilih kata hubung yang tepat berdasarkan konteks kalimat.</p>
            </div>
          </div>

          <div className="space-y-6">
            {deshalbQuiz.map((item, idx) => (
              <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-300">
                <p className="text-lg font-bold text-slate-800 mb-4">{item.q}</p>
                <div className="flex gap-4">
                  {item.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleDeshalbCheck(idx, opt)}
                      className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${
                        deshalbAnswers[idx] === opt
                          ? deshalbFeedback[idx]
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-700'
                            : 'bg-rose-100 border-rose-500 text-rose-700'
                          : 'bg-white border-slate-300 text-slate-600 hover:border-emerald-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {deshalbFeedback[idx] && (
                  <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="font-medium">{item.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 1 && (
        <div className="clay-card p-8 bg-white border-emerald-100">
          <div className="mb-6 flex items-start gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Übung 2: Position der Objekte</h3>
              <p className="text-slate-600">Pilih susunan Dativ dan Akkusativ yang benar dalam kalimat.</p>
            </div>
          </div>

          <div className="space-y-6">
            {daQuiz.map((item, idx) => (
              <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-300">
                <p className="text-lg font-bold text-slate-800 mb-4">{item.q}</p>
                <div className="flex flex-col gap-3">
                  {item.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => handleDaCheck(idx, optIdx)}
                      className={`w-full text-left px-6 py-4 rounded-xl font-bold border-2 transition-all ${
                        daAnswers[idx] === optIdx
                          ? daFeedback[idx]
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-700'
                            : 'bg-rose-100 border-rose-500 text-rose-700'
                          : 'bg-white border-slate-300 text-slate-600 hover:border-emerald-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {daFeedback[idx] && (
                  <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p className="font-medium">{item.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
