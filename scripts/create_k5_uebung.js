const fs = require('fs');
const path = require('path');

let content = `
"use client";

import React, { useState } from 'react';

export function UebungInteraktiv5() {
  const [text, setText] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);

  const handleEvaluate = async () => {
    if (!text.trim()) return;
    setIsEvaluating(true);
    setFeedback(null);
    try {
      const response = await fetch('/api/evaluateSchreiben', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text, 
          topic: "Schreiben Sie einen Text über Ihre Stadt. (Einwohner, Lage, was wichtig ist, was schön ist, was nicht so gut ist)" 
        })
      });
      const data = await response.json();
      setFeedback(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-8">
      <div className="clay-card p-8 bg-white border-2 border-slate-200">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-black text-slate-800">Eine Stadt beschreiben</h3>
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <span>🤖</span> AI Evaluated
          </span>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-6 text-slate-700">
          <p className="font-bold mb-2">Aufgabe: Schreiben Sie einen kurzen Text über Ihre Stadt (mind. 6 Sätze).</p>
          <ul className="list-disc pl-5 space-y-1 text-sm font-medium">
            <li>Wie groß ist die Stadt und wo liegt sie?</li>
            <li>Was ist Ihnen wichtig? ("Mir ist wichtig, dass...")</li>
            <li>Was finden Sie schön? ("Ich finde schön, dass...")</li>
            <li>Was gefällt Ihnen nicht? ("nicht so gut finde ich, weil...")</li>
          </ul>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-48 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl outline-none focus:border-amber-400 focus:bg-white transition-all resize-none text-slate-800 leading-relaxed font-medium"
          placeholder="Meine Stadt ist nicht so groß..."
        />

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleEvaluate}
            disabled={isEvaluating || !text.trim()}
            className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl transition-all disabled:opacity-50"
          >
            {isEvaluating ? 'Wird geprüft...' : 'Text überprüfen'}
          </button>
        </div>

        {feedback && (
          <div className="mt-8 bg-slate-900 text-white p-6 rounded-2xl border-2 border-slate-800 animate-in fade-in zoom-in duration-300">
            <h4 className="text-xl font-black text-emerald-400 mb-4">AI Feedback</h4>
            
            <div className="flex gap-4 mb-6">
              <div className="bg-white/10 p-4 rounded-xl flex-1 text-center">
                <div className="text-3xl font-black text-amber-400 mb-1">{feedback.grammarScore}</div>
                <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">Grammatik</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl flex-1 text-center">
                <div className="text-3xl font-black text-amber-400 mb-1">{feedback.vocabScore}</div>
                <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">Wortschatz</div>
              </div>
            </div>

            <p className="text-slate-300 mb-6 leading-relaxed font-medium">{feedback.feedback}</p>

            {feedback.corrections && feedback.corrections.length > 0 && (
              <div>
                <h5 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-3">Korrekturen:</h5>
                <ul className="space-y-3">
                  {feedback.corrections.map((c: any, i: number) => (
                    <li key={i} className="bg-black/30 p-4 rounded-xl border border-white/5">
                      <div className="text-rose-400 line-through mb-1 font-medium">{c.original}</div>
                      <div className="text-emerald-400 font-medium mb-2">{c.corrected}</div>
                      <div className="text-xs text-slate-400 italic bg-white/5 p-2 rounded-lg">{c.explanation}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, '../app/dashboard/UebungInteraktiv5.tsx'), content, 'utf8');
console.log("Created UebungInteraktiv5.tsx");
