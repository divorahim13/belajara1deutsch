"use client";

import React, { useState } from 'react';

export function GrammatikInteraktiv8() {
  const [activeTab, setActiveTab] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (id: string, val: string) => {
    setAnswers(prev => ({...prev, [id]: val}));
  };

  const correctAnswers = {
    // Konjunktiv II: sollte
    "sollte_1": "solltest",
    "sollte_2": "solltet",
    "sollte_3": "sollte",
    "sollte_4": "sollten",
    "sollte_5": "sollten",
    "sollte_6": "sollte",
    // Fragewort: Was für ein
    "was_1": "Was für ein",
    "was_2": "Was für einen",
    "was_3": "Was für eine",
    "was_4": "Was für",
    "was_5": "Was für einen",
  };

  const getStatus = (id: string) => {
    if (!showResult) return "border-slate-300";
    return answers[id]?.trim().toLowerCase() === correctAnswers[id as keyof typeof correctAnswers].toLowerCase()
      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
      : "border-rose-500 bg-rose-50 text-rose-900";
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-8">
      <div className="flex gap-4 border-b-2 border-slate-300 pb-4">
        <button onClick={() => { setActiveTab(0); setShowResult(false); }} className={`px-6 py-2 rounded-xl font-bold ${activeTab === 0 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'}`}>Konjunktiv II: sollte</button>
        <button onClick={() => { setActiveTab(1); setShowResult(false); }} className={`px-6 py-2 rounded-xl font-bold ${activeTab === 1 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'}`}>Fragewort: Was für ein</button>
      </div>

      {activeTab === 0 && (
        <div className="clay-card p-8 bg-white border-2 border-slate-300">
          <h3 className="text-2xl font-black mb-4">Konjunktiv II: Ratschläge mit "sollte"</h3>
          <div className="bg-sky-50 p-6 rounded-2xl border-2 border-sky-200 mb-8 text-slate-700">
            <p className="font-bold mb-2">Regel:</p>
            <p>Man benutzt <strong>"sollte"</strong> für Ratschläge, Tipps oder Empfehlungen. Es ist höflicher als der Imperativ.</p>
            <div className="grid grid-cols-2 gap-4 mt-4 bg-white p-4 rounded-xl border border-sky-100">
              <div>
                <ul className="space-y-1">
                  <li>ich <strong>sollte</strong></li>
                  <li>du <strong>solltest</strong></li>
                  <li>er/sie/es <strong>sollte</strong></li>
                </ul>
              </div>
              <div>
                <ul className="space-y-1">
                  <li>wir <strong>sollten</strong></li>
                  <li>ihr <strong>solltet</strong></li>
                  <li>sie/Sie <strong>sollten</strong></li>
                </ul>
              </div>
            </div>
          </div>
          
          <h4 className="font-bold text-lg mb-4">Ergänzen Sie die richtige Form von "sollte":</h4>
          <div className="space-y-4">
            {[
              { id: "sollte_1", text: "Ich habe Kopfschmerzen. ➡️ Du ___ Wasser trinken." },
              { id: "sollte_2", text: "Wir sind oft müde. ➡️ Ihr ___ früher schlafen gehen." },
              { id: "sollte_3", text: "Paul hat schlechte Noten. ➡️ Er ___ mehr lernen." },
              { id: "sollte_4", text: "Ich möchte Deutsch lernen. (formal) ➡️ Sie ___ einen Sprachkurs besuchen." },
              { id: "sollte_5", text: "Anna und Maria wollen fit werden. ➡️ Sie ___ Sport machen." },
              { id: "sollte_6", text: "Das Auto ist kaputt. ➡️ Man ___ es reparieren." }
            ].map(q => (
              <div key={q.id} className="flex gap-4 items-center flex-wrap">
                <span className="font-medium">{q.text.split('___')[0]}</span>
                <input type="text" value={answers[q.id] || ""} onChange={e => handleInputChange(q.id, e.target.value)} className={`w-32 p-3 border-2 rounded-xl outline-none font-bold text-center ${getStatus(q.id)}`} placeholder="..." />
                <span className="font-medium flex-1">{q.text.split('___')[1]}</span>
                {showResult && <span className="text-sm font-bold text-slate-600">({correctAnswers[q.id as keyof typeof correctAnswers]})</span>}
              </div>
            ))}
          </div>
          <button onClick={() => setShowResult(true)} className="mt-8 px-8 py-3 bg-emerald-500 text-white font-black rounded-xl hover:bg-emerald-600 transition-colors">Prüfen</button>
        </div>
      )}

      {activeTab === 1 && (
        <div className="clay-card p-8 bg-white border-2 border-slate-300">
          <h3 className="text-2xl font-black mb-4">Fragewort: Was für ein/eine...?</h3>
          <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200 mb-8 text-slate-700">
            <p className="font-bold mb-2">Regel:</p>
            <p><strong>Was für ein...?</strong> fragt nach der Art oder Eigenschaft von einer Person oder Sache.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Nominativ:</strong> was für ein (m/n), was für eine (f), was für (Plural)</li>
              <li><strong>Akkusativ:</strong> was für einen (m), was für ein (n), was für eine (f), was für (Plural)</li>
            </ul>
            <p className="mt-4 italic">Beispiel: "Was für ein Auto hast du?" – "Ein schnelles Auto."</p>
          </div>
          
          <h4 className="font-bold text-lg mb-4">Ergänzen Sie: Was für ein / Was für eine / Was für einen / Was für</h4>
          <div className="space-y-4">
            {[
              { id: "was_1", text: "Ich suche ein Auto. ➡️ ___ Auto suchst du? (Ein großes Auto.)" },
              { id: "was_2", text: "Er hat einen neuen Hund. ➡️ ___ Hund hat er? (Einen Dackel.)" },
              { id: "was_3", text: "Wir kaufen eine Wohnung. ➡️ ___ Wohnung kauft ihr? (Eine helle Wohnung.)" },
              { id: "was_4", text: "Ich brauche neue Schuhe. (Plural) ➡️ ___ Schuhe brauchst du? (Sportschuhe.)" },
              { id: "was_5", text: "Wir haben gestern einen Film gesehen. ➡️ ___ Film habt ihr gesehen? (Einen Actionfilm.)" }
            ].map(q => (
              <div key={q.id} className="flex gap-4 items-center flex-wrap">
                <span className="font-medium">{q.text.split('___')[0]}</span>
                <input type="text" value={answers[q.id] || ""} onChange={e => handleInputChange(q.id, e.target.value)} className={`w-40 p-2 border-2 rounded-xl outline-none font-bold text-center ${getStatus(q.id)}`} placeholder="..." />
                <span className="font-medium flex-1">{q.text.split('___')[1]}</span>
                {showResult && <span className="text-sm font-bold text-slate-600">({correctAnswers[q.id as keyof typeof correctAnswers]})</span>}
              </div>
            ))}
          </div>
          <button onClick={() => setShowResult(true)} className="mt-8 px-8 py-3 bg-emerald-500 text-white font-black rounded-xl hover:bg-emerald-600 transition-colors">Prüfen</button>
        </div>
      )}
    </div>
  );
}
