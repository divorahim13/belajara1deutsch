"use client";

import React, { useState } from 'react';

export function UebungInteraktiv4() {
  const [inputText, setInputText] = useState("");
  const [evaluation, setEvaluation] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const evaluateText = async () => {
    if (!inputText.trim()) return;
    setIsEvaluating(true);
    setEvaluation(null);
    try {
      const response = await fetch('/api/evaluateSchreiben', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: inputText, 
          topic: "Einladung absagen - Schreiben Sie eine Nachricht an einen Freund, dass Sie nicht zur Party kommen können und gratulieren Sie ihm." 
        })
      });
      const data = await response.json();
      setEvaluation(data);
    } catch (error) {
      console.error(error);
      alert("Gagal mengevaluasi teks.");
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black text-slate-900">✍️ Schreiben</h2>
        <p className="text-slate-600 mt-2 text-lg">Schreiben Sie eine Nachricht oder Karte.</p>
      </div>

      <div className="clay-card p-8 bg-white border-4 border-amber-200 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-bl-full opacity-50 -mr-10 -mt-10"></div>
        <h3 className="text-2xl font-black text-amber-900 mb-2 relative z-10">Aufgabe: Einladung absagen</h3>
        <p className="text-slate-700 mb-6 text-lg relative z-10">Ein Freund (Jan) hat Sie zu seiner Geburtstagsparty eingeladen, aber Sie können leider nicht kommen. Schreiben Sie eine kurze Nachricht.</p>
        
        <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-300 mb-6 shadow-inner relative z-10">
          <p className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-3">Beispielstruktur:</p>
          <div className="text-slate-600 font-mono text-sm leading-relaxed space-y-1">
            <p>Lieber Jan,</p>
            <p>vielen Dank für die Einladung...</p>
            <p>Leider kann ich nicht kommen, weil...</p>
            <p>Ich wünsche dir viel Spaß und alles Gute!</p>
            <p>Liebe Grüße</p>
            <p>[Dein Name]</p>
          </div>
        </div>

        <textarea 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full p-6 rounded-2xl border-4 border-slate-300 focus:border-amber-400 focus:ring-8 focus:ring-amber-100 outline-none transition-all resize-y min-h-[200px] text-lg font-medium text-slate-800 shadow-inner relative z-10"
          placeholder="Schreiben Sie Ihre Nachricht hier..."
          spellCheck="false"
        />
        
        <div className="mt-6 flex justify-end relative z-10">
          <button 
            onClick={evaluateText}
            disabled={isEvaluating || !inputText.trim()}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white font-black rounded-2xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-105 active:scale-95"
          >
            {isEvaluating ? 'Mengevaluasi...' : 'Cek dengan AI ✨'}
          </button>
        </div>

        {evaluation && (
          <div className="mt-8 p-8 bg-slate-900 rounded-3xl border-4 border-amber-400 text-white shadow-2xl animate-in slide-in-from-bottom-4 relative z-10">
            <h4 className="text-2xl font-black text-amber-400 mb-6 flex items-center gap-3">
              <span>🤖</span> AI Evaluation
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                <p className="text-amber-300 text-sm font-bold uppercase tracking-widest mb-2">Grammatik</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black">{evaluation.grammarScore}</span>
                  <span className="text-slate-600 font-bold mb-1">/100</span>
                </div>
              </div>
              <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                <p className="text-amber-300 text-sm font-bold uppercase tracking-widest mb-2">Wortschatz</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black">{evaluation.vocabScore}</span>
                  <span className="text-slate-600 font-bold mb-1">/100</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20">
                <h5 className="font-bold text-emerald-400 mb-2 uppercase tracking-widest text-sm">Feedback</h5>
                <p className="text-slate-300 leading-relaxed">{evaluation.feedback}</p>
              </div>

              {evaluation.corrections && evaluation.corrections.length > 0 && (
                <div className="bg-rose-500/10 p-6 rounded-2xl border border-rose-500/20">
                  <h5 className="font-bold text-rose-400 mb-4 uppercase tracking-widest text-sm">Koreksi</h5>
                  <ul className="space-y-4">
                    {evaluation.corrections.map((c: any, i: number) => (
                      <li key={i} className="text-slate-300 bg-white/5 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2 text-lg">
                          <span className="line-through text-rose-400 opacity-70 font-mono">{c.original}</span>
                          <span className="text-slate-700">➔</span>
                          <span className="text-emerald-400 font-bold font-mono">{c.corrected}</span>
                        </div>
                        <p className="text-sm text-slate-600">{c.reason}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
