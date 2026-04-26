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
      { type: 'text', val: '1. Kann mir bitte ' },
      { type: 'input', id: 'q1_1', ans: 'jemand', width: 'w-24' },
      { type: 'text', val: ' helfen? Niemand hat Zeit für mich.' }
    ]
  },
  {
    id: 2,
    segments: [
      { type: 'text', val: '2. Hast du ' },
      { type: 'input', id: 'q2_1', ans: 'alles', width: 'w-20' },
      { type: 'text', val: ' für das Festival gepackt? Nein, ich habe ' },
      { type: 'input', id: 'q2_2', ans: 'nichts', width: 'w-24' },
      { type: 'text', val: ' verstanden.' }
    ]
  },
  {
    id: 3,
    segments: [
      { type: 'text', val: '3. Namika spielt auf dem Festival. - ' },
      { type: 'input', id: 'q3_1', ans: 'Wer', width: 'w-20' },
      { type: 'text', val: ' spielt da? Namika.' }
    ]
  },
  {
    id: 4,
    segments: [
      { type: 'text', val: '4. Peter Veit ist ein Radiosprecher, ' },
      { type: 'input', id: 'q4_1', ans: 'der', width: 'w-16' },
      { type: 'text', val: ' vor den Nachrichten eingeschlafen ist.' }
    ]
  },
  {
    id: 5,
    segments: [
      { type: 'text', val: '5. Das ist das Bild, ' },
      { type: 'input', id: 'q5_1', ans: 'das', width: 'w-16' },
      { type: 'text', val: ' ich auf dem Flohmarkt gekauft habe.' }
    ]
  },
  {
    id: 6,
    segments: [
      { type: 'text', val: '6. Der Radiosprecher, ' },
      { type: 'input', id: 'q6_1', ans: 'den', width: 'w-16' },
      { type: 'text', val: ' viele Leute kennen, heißt Peter Veit.' }
    ]
  }
];

export default function UebungInteraktiv12() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'checked'>('idle');

  const [activeTab, setActiveTab] = useState<1 | 2>(1);
  const [schreibenText, setSchreibenText] = useState('');
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const checkAnswers = () => {
    setStatus('checked');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const reset = () => {
    setStatus('idle');
    setAnswers({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (id: string, val: string) => {
    if (status === 'checked') return;
    setAnswers(prev => ({ ...prev, [id]: val }));
  };

  const handleEvaluateSchreiben = async () => {
    if (!schreibenText.trim()) return;
    setIsEvaluating(true);
    setAiFeedback(null);
    try {
      const res = await fetch('/api/evaluateSchreiben', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: schreibenText,
          topic: "Planen Sie einen Festivalbesuch ODER stellen Sie eine Band vor ODER beschreiben Sie ein Bild. Achten Sie auf Grammatik (Relativsätze) und Wortschatz (Kapitel 12)."
        })
      });
      const data = await res.json();
      setAiFeedback(data.feedback || "Maaf, AI gagal memproses evaluasi.");
    } catch (e) {
      setAiFeedback("Terjadi kesalahan jaringan.");
    } finally {
      setIsEvaluating(false);
    }
  };

  let totalInputs = 0;
  let correctInputs = 0;

  if (status === 'checked') {
    questions.forEach(q => {
      q.segments.forEach(seg => {
        if (seg.type === 'input') {
          totalInputs++;
          const userAns = (answers[seg.id] || '').trim().toLowerCase();
          if (userAns === seg.ans.toLowerCase()) {
            correctInputs++;
          }
        }
      });
    });
  }

  const allCorrect = status === 'checked' && correctInputs === totalInputs;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-black text-slate-900">Schreiben</h2>
        <p className="text-slate-600 mt-2">Pilih mode latihan menulis di bawah ini.</p>
      </div>

      <div className="flex bg-slate-100 p-2 rounded-2xl max-w-sm mx-auto shadow-inner border border-slate-300">
        <button
          onClick={() => setActiveTab(1)}
          className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all text-sm ${
            activeTab === 1 
              ? 'bg-white text-indigo-600 shadow-sm border border-slate-300' 
              : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
          }`}
        >
          Teil 1: Lückentext
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all text-sm ${
            activeTab === 2 
              ? 'bg-white text-indigo-600 shadow-sm border border-slate-300' 
              : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-50'
          }`}
        >
          Teil 2: Freies Schreiben
        </button>
      </div>

      {activeTab === 1 && (
        <div className="clay-card p-8 bg-emerald-50 border-emerald-200 border-b-8">
          <div className="bg-white p-5 rounded-xl border-2 border-sky-100 mb-6">
            <h3 className="text-2xl font-black text-slate-800 mb-2">Lückentext</h3>
            <p className="text-slate-700 font-medium">Ergänzen Sie die Sätze mit Indefinitpronomen (jemand, niemand, alles, etwas, nichts), Rückfragen (Wer, Was, Wo) oder Relativpronomen (der, das, die, den).</p>
          </div>

          {status === 'checked' && (
            <div className={`mb-8 p-6 rounded-2xl border-2 ${
              allCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
            }`}>
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0 ${
                  allCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                }`}>
                  {allCorrect ? '🎉' : '💪'}
                </div>
                <div>
                  <h3 className={`text-xl font-black ${
                    allCorrect ? 'text-emerald-800' : 'text-rose-800'
                  }`}>
                    {allCorrect ? 'Perfekt!' : 'Noch nicht ganz richtig'}
                  </h3>
                  <p className={`font-medium ${
                    allCorrect ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    Du hast {correctInputs} von {totalInputs} Feldern richtig ausgefüllt.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {questions.map((q) => (
              <div key={q.id} className="p-5 md:p-6 bg-slate-50 rounded-2xl border border-slate-300 hover:border-indigo-300 transition-colors">
                <div className="text-lg md:text-xl font-medium text-slate-700 leading-loose">
                  {q.segments.map((seg, i) => {
                    if (seg.type === 'text') {
                      return <span key={i}>{seg.val}</span>;
                    } else if (seg.type === 'input') {
                      const userAns = (answers[seg.id] || '').trim();
                      const isChecked = status === 'checked';
                      const isCorrect = isChecked && userAns.toLowerCase() === seg.ans.toLowerCase();
                      
                      return (
                        <span key={i} className="inline-block mx-1">
                          <input
                            type="text"
                            value={answers[seg.id] || ''}
                            onChange={(e) => handleInputChange(seg.id, e.target.value)}
                            disabled={isChecked}
                            className={`${seg.width} h-10 px-3 text-center font-bold rounded-lg border-2 transition-all outline-none focus:ring-4 ${
                              isChecked
                                ? isCorrect
                                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                                  : 'bg-rose-50 border-rose-500 text-rose-700'
                                : 'bg-white border-slate-300 focus:border-indigo-500 focus:ring-indigo-100 text-slate-800'
                            }`}
                          />
                        </span>
                      );
                    }
                  })}
                </div>
                {status === 'checked' && (
                  <div className="mt-4 pt-4 border-t border-slate-300">
                    <p className="text-sm font-bold text-slate-700 mb-1 tracking-wider uppercase">Lösung:</p>
                    <p className="text-emerald-700 font-medium">
                      {q.segments.map(seg => seg.type === 'input' ? seg.ans : seg.val).join('')}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 flex gap-4">
            {status === 'idle' ? (
              <button 
                onClick={checkAnswers}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl shadow-lg border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 transition-all text-xl"
              >
                Prüfen
              </button>
            ) : (
              <button 
                onClick={reset}
                className="w-full bg-slate-600 hover:bg-slate-500 text-white font-black py-4 rounded-2xl shadow-lg border-b-4 border-slate-800 active:border-b-0 active:translate-y-1 transition-all text-xl"
              >
                Noch einmal üben
              </button>
            )}
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div className="clay-card p-8 bg-sky-50 border-sky-200 border-b-8">
          <div className="bg-white p-5 rounded-xl border-2 border-sky-100 mb-6">
            <h3 className="text-2xl font-black text-sky-950 mb-4">Freies Schreiben (Goethe-Task)</h3>
            <h4 className="font-bold text-slate-800 mb-2">Soal:</h4>
            <div className="text-slate-600 italic border-l-4 border-sky-400 pl-3">
              <ul className="list-disc list-inside text-sm text-sky-700 space-y-2">
                <li><strong>Thema 1:</strong> Planen Sie einen Festivalbesuch (Tickets, Fahrt, Unterkunft, Verpflegung).</li>
                <li><strong>Thema 2:</strong> Stellen Sie eine Band oder einen Musiker/eine Musikerin vor.</li>
                <li><strong>Thema 3:</strong> Beschreiben Sie ein Bild (Titel, Farben, Vordergrund/Hintergrund, Meinung).</li>
              </ul>
            </div>
          </div>

          <textarea
            value={schreibenText}
            onChange={(e) => setSchreibenText(e.target.value)}
            disabled={isEvaluating}
            placeholder="Schreibe hier deinen Text..."
            className="w-full h-48 p-4 bg-slate-50 border-2 border-slate-300 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all resize-none text-slate-700 font-medium"
          />

          <button
            onClick={handleEvaluateSchreiben}
            disabled={isEvaluating || !schreibenText.trim()}
            className="w-full mt-6 bg-indigo-600 text-white font-bold text-lg py-4 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all shadow-lg disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isEvaluating ? 'AI evaluiert...' : 'Zur Bewertung abgeben'}
          </button>

          {aiFeedback && (
            <div className="mt-8 p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-600">
                  🤖
                </div>
                <h4 className="text-white font-bold text-lg tracking-wide">AI Feedback</h4>
              </div>
              <div 
                className="prose prose-invert prose-indigo max-w-none text-slate-300 text-[15px] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: aiFeedback }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
