const fs = require('fs');
const path = require('path');

let content = `
"use client";

import React, { useState } from 'react';

export default function KapitelTest5() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const totalQuestions = 10;

  const handleInputChange = (id: string, val: string) => {
    setAnswers(prev => ({...prev, [id]: val}));
  };

  const calculateScore = () => {
    let s = 0;
    // 1. Lesen (W/F)
    if (answers['t1'] === 'Richtig') s++;
    if (answers['t2'] === 'Falsch') s++;
    // 2. Wortschatz (Orte)
    if (answers['w1']?.toLowerCase() === 'restaurant') s++;
    if (answers['w2']?.toLowerCase() === 'polizei') s++;
    // 3. Adjektivendungen
    if (answers['a1']?.toLowerCase() === 'neuen') s++;
    if (answers['a2']?.toLowerCase() === 'weiße') s++;
    if (answers['a3']?.toLowerCase() === 'netten') s++;
    // 4. Mit/Ohne
    if (answers['p1']?.toLowerCase() === 'ohne') s++;
    if (answers['p2']?.toLowerCase() === 'mit') s++;
    // 5. Konjunktiv II
    if (answers['k1']?.toLowerCase().includes('könnten') || answers['k1']?.toLowerCase().includes('könntest')) s++;

    setScore(Math.round((s / totalQuestions) * 100));
    setIsFinished(true);
  };

  if (isFinished) {
    return (
      <div className="clay-card p-12 bg-white text-center border-2 border-slate-200">
        <div className="text-8xl mb-6">{score >= 85 ? '🏆' : score >= 60 ? '👍' : '💪'}</div>
        <h2 className="text-4xl font-black text-slate-800 mb-4">Kapiteltest 5 Abgeschlossen!</h2>
        <p className="text-xl text-slate-600 mb-8 font-medium">Dein Ergebnis: <span className={\`font-black text-3xl \${score >= 85 ? 'text-emerald-500' : 'text-amber-500'}\`}>{score}%</span></p>
        
        {score < 85 && (
          <p className="text-rose-500 font-bold mb-8">Du brauchst 85% für Mastery. Bitte versuche es noch einmal!</p>
        )}

        <button 
          onClick={() => { setIsFinished(false); setScore(0); setCurrentStep(0); setAnswers({}); }}
          className="px-8 py-4 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 transition-all"
        >
          Test wiederholen
        </button>
      </div>
    );
  }

  return (
    <div className="clay-card p-8 bg-white border-2 border-slate-200 animate-in slide-in-from-bottom-8">
      <div className="flex justify-between items-center mb-8 border-b-2 border-slate-100 pb-4">
        <h2 className="text-2xl font-black text-slate-800">Kapiteltest 5: Leben in der Stadt</h2>
        <span className="bg-slate-100 text-slate-500 font-bold px-4 py-2 rounded-xl">Teil {currentStep + 1} / 5</span>
      </div>

      <div className="space-y-8">
        {currentStep === 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">1. Lesen: Richtig oder Falsch?</h3>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-700 italic">
              "Liebe Maria, ich bin jetzt in Wien. Die Stadt ist super! Ich habe schon ein Konto bei der Bank eröffnet. Morgen habe ich ein Vorstellungsgespräch im Restaurant 'Zum Schnitzel'. Ich hoffe, ich bekomme den Job!"
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
                <span className="font-medium">1. Die Person ist in Berlin.</span>
                <select value={answers['t1'] || ''} onChange={e => handleInputChange('t1', e.target.value)} className="p-2 border rounded-lg bg-slate-50 outline-none">
                  <option value="">Wählen...</option>
                  <option value="Richtig">Richtig</option>
                  <option value="Falsch">Falsch</option>
                </select>
              </div>
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
                <span className="font-medium">2. Sie sucht Arbeit in einer Bank.</span>
                <select value={answers['t2'] || ''} onChange={e => handleInputChange('t2', e.target.value)} className="p-2 border rounded-lg bg-slate-50 outline-none">
                  <option value="">Wählen...</option>
                  <option value="Richtig">Richtig</option>
                  <option value="Falsch">Falsch</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">2. Wortschatz: Orte in der Stadt</h3>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="font-medium">1. Man kann dort essen und trinken:</label>
                <input type="text" value={answers['w1'] || ''} onChange={e => handleInputChange('w1', e.target.value)} className="p-3 border-2 border-slate-200 rounded-xl outline-none focus:border-sky-400" placeholder="das R..." />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">2. Man ruft sie, wenn es einen Unfall oder Gefahr gibt:</label>
                <input type="text" value={answers['w2'] || ''} onChange={e => handleInputChange('w2', e.target.value)} className="p-3 border-2 border-slate-200 rounded-xl outline-none focus:border-sky-400" placeholder="die P..." />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">3. Grammatik: Adjektivendungen</h3>
            <p className="text-slate-500 font-medium">Ergänzen Sie die Endungen.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium w-48">1. Ich habe den neu___ Job.</span>
                <input type="text" value={answers['a1'] || ''} onChange={e => handleInputChange('a1', e.target.value)} className="w-24 p-2 border-2 border-slate-200 rounded-xl text-center outline-none focus:border-emerald-400" />
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium w-48">2. das weiß___ Hemd</span>
                <input type="text" value={answers['a2'] || ''} onChange={e => handleInputChange('a2', e.target.value)} className="w-24 p-2 border-2 border-slate-200 rounded-xl text-center outline-none focus:border-emerald-400" />
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium w-48">3. mit den nett___ Kollegen</span>
                <input type="text" value={answers['a3'] || ''} onChange={e => handleInputChange('a3', e.target.value)} className="w-24 p-2 border-2 border-slate-200 rounded-xl text-center outline-none focus:border-emerald-400" />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">4. Grammatik: mit oder ohne?</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input type="text" value={answers['p1'] || ''} onChange={e => handleInputChange('p1', e.target.value)} className="w-24 p-2 border-2 border-slate-200 rounded-xl text-center outline-none focus:border-sky-400" />
                <span className="font-medium">... seinen Pass kann er nicht reisen.</span>
              </div>
              <div className="flex items-center gap-4">
                <input type="text" value={answers['p2'] || ''} onChange={e => handleInputChange('p2', e.target.value)} className="w-24 p-2 border-2 border-slate-200 rounded-xl text-center outline-none focus:border-sky-400" />
                <span className="font-medium">... dem Bus fahre ich zur Arbeit.</span>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">5. Kommunikation: Höfliche Bitten</h3>
            <p className="text-slate-500 font-medium">Formulieren Sie den Satz höflich mit "Könnten/Könntest".</p>
            <div className="space-y-2">
              <div className="font-medium text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">Sperren Sie meine Karte!</div>
              <input type="text" value={answers['k1'] || ''} onChange={e => handleInputChange('k1', e.target.value)} className="w-full p-4 border-2 border-slate-200 rounded-xl outline-none focus:border-amber-400" placeholder="Könnten..." />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-12 pt-6 border-t-2 border-slate-100">
        <button 
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 disabled:opacity-30 transition-all"
        >
          Zurück
        </button>
        {currentStep < 4 ? (
          <button 
            onClick={() => setCurrentStep(prev => prev + 1)}
            className="px-8 py-3 bg-sky-500 text-white font-black rounded-xl hover:bg-sky-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Weiter
          </button>
        ) : (
          <button 
            onClick={calculateScore}
            className="px-8 py-3 bg-emerald-500 text-white font-black rounded-xl hover:bg-emerald-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Test Beenden
          </button>
        )}
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, '../app/dashboard/KapitelTest5.tsx'), content, 'utf8');
console.log("Created KapitelTest5.tsx");
