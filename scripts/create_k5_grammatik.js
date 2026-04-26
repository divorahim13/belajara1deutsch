const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../app/dashboard/kapitel-5');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

let content = `
"use client";

import React, { useState } from 'react';

export function GrammatikInteraktiv5() {
  const [activeTab, setActiveTab] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (id: string, val: string) => {
    setAnswers(prev => ({...prev, [id]: val}));
  };

  const correctAnswers = {
    // Adjektivendungen
    "adj_1": "neuen",
    "adj_2": "netten",
    "adj_3": "bekannten",
    "adj_4": "berühmten",
    "adj_5": "richtige",
    "adj_6": "weiße",
    "adj_7": "ganzen",
    // Mit/Ohne
    "praep_1": "Ohne",
    "praep_2": "Ohne",
    "praep_3": "mit",
    "praep_4": "Ohne",
    "praep_5": "mit",
    // Konjunktiv II
    "konj_1": "Könnten Sie meine Bankkarte sperren?",
    "konj_2": "Könntest du für mich einkaufen?",
    "konj_3": "Könntet ihr mir helfen, bitte?",
    "konj_4": "Könnte ich bitte einen Kaffee haben?"
  };

  const getStatus = (id: string) => {
    if (!showResult) return "border-slate-300";
    return answers[id]?.trim().toLowerCase() === correctAnswers[id as keyof typeof correctAnswers].toLowerCase()
      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
      : "border-rose-500 bg-rose-50 text-rose-900";
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-8">
      <div className="flex gap-4 border-b-2 border-slate-200 pb-4">
        <button onClick={() => { setActiveTab(0); setShowResult(false); }} className={\`px-6 py-2 rounded-xl font-bold \${activeTab === 0 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}\`}>Adjektivendungen</button>
        <button onClick={() => { setActiveTab(1); setShowResult(false); }} className={\`px-6 py-2 rounded-xl font-bold \${activeTab === 1 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}\`}>mit & ohne</button>
        <button onClick={() => { setActiveTab(2); setShowResult(false); }} className={\`px-6 py-2 rounded-xl font-bold \${activeTab === 2 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}\`}>Konjunktiv II</button>
      </div>

      {activeTab === 0 && (
        <div className="clay-card p-8 bg-white border-2 border-slate-200">
          <h3 className="text-2xl font-black mb-4">Adjektive nach dem bestimmten Artikel</h3>
          <div className="bg-emerald-50 p-6 rounded-2xl border-2 border-emerald-200 mb-8 text-slate-700">
            <p className="font-bold mb-2">Regel:</p>
            <p>Nach dem bestimmten Artikel (der/das/die) bekommen Adjektive bestimmte Endungen (-e oder -en).</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Nominativ/Akkusativ:</strong> das weiße T-Shirt, die weiße Bluse (aber Akkusativ Maskulin: <em>den</em> schwarzen Rock)</li>
              <li><strong>Dativ:</strong> immer <em>-en</em> (z.B. mit dem schwarzen Rock, in den schönen Geschäften)</li>
              <li><strong>Plural:</strong> immer <em>-en</em> (z.B. die bequemen Schuhe)</li>
            </ul>
          </div>
          
          <h4 className="font-bold text-lg mb-4">Ergänzen Sie die Endungen:</h4>
          <div className="space-y-4">
            {[
              { id: "adj_1", text: "den neu___ Job" },
              { id: "adj_2", text: "die nett___ Kollegen (Plural)" },
              { id: "adj_3", text: "den bekannt___ Koch" },
              { id: "adj_4", text: "den berühmt___ Schokokuchen" },
              { id: "adj_5", text: "die richtig___ Kleidung" },
              { id: "adj_6", text: "das weiß___ Hemd" },
              { id: "adj_7", text: "der ganz___ Welt (Dativ)" }
            ].map(q => (
              <div key={q.id} className="flex gap-4 items-center">
                <span className="w-64 font-medium">{q.text}</span>
                <input type="text" value={answers[q.id] || ""} onChange={e => handleInputChange(q.id, e.target.value)} className={\`w-32 p-3 border-2 rounded-xl outline-none font-bold \${getStatus(q.id)}\`} placeholder="Endung..." />
                {showResult && <span className="text-sm font-bold text-slate-400">({correctAnswers[q.id as keyof typeof correctAnswers]})</span>}
              </div>
            ))}
          </div>
          <button onClick={() => setShowResult(true)} className="mt-8 px-8 py-3 bg-emerald-500 text-white font-black rounded-xl hover:bg-emerald-600 transition-colors">Prüfen</button>
        </div>
      )}

      {activeTab === 1 && (
        <div className="clay-card p-8 bg-white border-2 border-slate-200">
          <h3 className="text-2xl font-black mb-4">Präpositionen: mit und ohne</h3>
          <div className="bg-sky-50 p-6 rounded-2xl border-2 border-sky-200 mb-8 text-slate-700">
            <p className="font-bold mb-2">Regel:</p>
            <p><strong>ohne</strong> + Akkusativ (z.B. Ohne meinen Pass...)</p>
            <p><strong>mit</strong> + Dativ (z.B. Mit einem Pass...)</p>
          </div>
          
          <h4 className="font-bold text-lg mb-4">Ergänzen Sie 'mit' oder 'ohne':</h4>
          <div className="space-y-4">
            {[
              { id: "praep_1", text: "_______ seinen Führerschein darf Lars nicht Auto fahren." },
              { id: "praep_2", text: "_______ seine Geldbörse kann er kein Ticket kaufen." },
              { id: "praep_3", text: "Er ruft _______ seinem Handy einen Freund an." },
              { id: "praep_4", text: "_______ einen Job kann Valentina nicht studieren." },
              { id: "praep_5", text: "Valentina macht _______ ihrem Handy viele Fotos." }
            ].map(q => (
              <div key={q.id} className="flex gap-4 items-center flex-wrap">
                <input type="text" value={answers[q.id] || ""} onChange={e => handleInputChange(q.id, e.target.value)} className={\`w-24 p-2 border-2 rounded-xl outline-none font-bold text-center \${getStatus(q.id)}\`} placeholder="..." />
                <span className="font-medium flex-1">{q.text.replace('_______', '')}</span>
                {showResult && <span className="text-sm font-bold text-slate-400">({correctAnswers[q.id as keyof typeof correctAnswers]})</span>}
              </div>
            ))}
          </div>
          <button onClick={() => setShowResult(true)} className="mt-8 px-8 py-3 bg-emerald-500 text-white font-black rounded-xl hover:bg-emerald-600 transition-colors">Prüfen</button>
        </div>
      )}

      {activeTab === 2 && (
        <div className="clay-card p-8 bg-white border-2 border-slate-200">
          <h3 className="text-2xl font-black mb-4">Höflich um etwas bitten (Konjunktiv II)</h3>
          <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200 mb-8 text-slate-700">
            <p className="font-bold mb-2">Regel:</p>
            <p>Mit <strong>könnte</strong> machen Sie Bitten viel höflicher.</p>
            <p><em>Sperren Sie bitte meine Karte. ➔ Könnten Sie bitte meine Karte sperren?</em></p>
          </div>
          
          <h4 className="font-bold text-lg mb-4">Schreiben Sie die Sätze höflich mit Konjunktiv II:</h4>
          <div className="space-y-6">
            {[
              { id: "konj_1", text: "Sperren Sie meine Bankkarte." },
              { id: "konj_2", text: "Kannst du für mich einkaufen?" },
              { id: "konj_3", text: "Helft mir, bitte." },
              { id: "konj_4", text: "Kann ich bitte einen Kaffee haben?" }
            ].map(q => (
              <div key={q.id} className="space-y-2">
                <div className="font-medium text-slate-500">{q.text}</div>
                <input type="text" value={answers[q.id] || ""} onChange={e => handleInputChange(q.id, e.target.value)} className={\`w-full p-3 border-2 rounded-xl outline-none font-medium \${getStatus(q.id)}\`} placeholder="Könnten..." />
                {showResult && <div className="text-sm font-bold text-emerald-500">Lösung: {correctAnswers[q.id as keyof typeof correctAnswers]}</div>}
              </div>
            ))}
          </div>
          <button onClick={() => setShowResult(true)} className="mt-8 px-8 py-3 bg-emerald-500 text-white font-black rounded-xl hover:bg-emerald-600 transition-colors">Prüfen</button>
        </div>
      )}
    </div>
  );
}
`;

fs.writeFileSync(path.join(dir, 'GrammatikInteraktiv5.tsx'), content, 'utf8');
console.log("Created kapitel-5/GrammatikInteraktiv5.tsx");
