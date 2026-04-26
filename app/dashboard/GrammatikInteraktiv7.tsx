"use client";

import React, { useState } from 'react';

export function GrammatikInteraktiv7() {
  const [activeTab, setActiveTab] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (id: string, val: string) => {
    setAnswers(prev => ({...prev, [id]: val}));
  };

  const correctAnswers = {
    // Indirekte Fragesätze
    "ind_1": "abfährt", // wann der Zug abfährt
    "ind_2": "ob",      // ob der Zug Verspätung hat
    "ind_3": "wo",      // wo das Bordbistro ist
    "ind_4": "braucht", // ob man einen Führerschein braucht
    "ind_5": "kann",    // ob ich mit Kreditkarte zahlen kann
    "ind_6": "ob",      // ob hier frei ist
    // Lokale Präpositionen
    "lok_1": "am",       // am Kaufhaus vorbei
    "lok_2": "durch",    // durch den Park
    "lok_3": "zur",      // bis zur Kirche
    "lok_4": "vom",      // gegenüber vom Bahnhof
    "lok_5": "an",       // an der Post vorbei
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
        <button onClick={() => { setActiveTab(0); setShowResult(false); }} className={`px-6 py-2 rounded-xl font-bold ${activeTab === 0 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'}`}>Indirekte Fragesätze</button>
        <button onClick={() => { setActiveTab(1); setShowResult(false); }} className={`px-6 py-2 rounded-xl font-bold ${activeTab === 1 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'}`}>Lokale Präpositionen</button>
      </div>

      {activeTab === 0 && (
        <div className="clay-card p-8 bg-white border-2 border-slate-300">
          <h3 className="text-2xl font-black mb-4">Indirekte Fragesätze (W-Fragen & ob)</h3>
          <div className="bg-sky-50 p-6 rounded-2xl border-2 border-sky-200 mb-8 text-slate-700">
            <p className="font-bold mb-2">Regel:</p>
            <p>Indirekte Fragen sind oft höflicher. Das Verb steht immer am <strong>Ende</strong> des Satzes!</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>W-Fragen:</strong> Das W-Wort (wo, wie, wann...) verbindet die Sätze.<br/><em>"Wann kommt der Zug?" ➡️ "Er fragt, wann der Zug kommt."</em></li>
              <li><strong>Ja/Nein-Fragen:</strong> Man benutzt <strong>ob</strong>, wenn es kein W-Wort gibt.<br/><em>"Kommt der Zug?" ➡️ "Er fragt, ob der Zug kommt."</em></li>
            </ul>
          </div>
          
          <h4 className="font-bold text-lg mb-4">Ergänzen Sie die Sätze:</h4>
          <div className="space-y-4">
            {[
              { id: "ind_1", text: "Wann fährt der Zug ab? ➡️ Ich möchte wissen, wann der Zug ___." },
              { id: "ind_2", text: "Hat der Zug Verspätung? ➡️ Können Sie mir sagen, ___ der Zug Verspätung hat?" },
              { id: "ind_3", text: "Wo ist das Bordbistro? ➡️ Er fragt, ___ das Bordbistro ist." },
              { id: "ind_4", text: "Braucht man einen Führerschein? ➡️ Weißt du, ob man einen Führerschein ___?" },
              { id: "ind_5", text: "Kann ich mit Kreditkarte zahlen? ➡️ Ich frage, ob ich mit Kreditkarte zahlen ___." },
              { id: "ind_6", text: "Ist hier frei? ➡️ Entschuldigung, darf ich fragen, ___ hier frei ist?" }
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
          <h3 className="text-2xl font-black mb-4">Lokale Präpositionen (Wegbeschreibung)</h3>
          <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200 mb-8 text-slate-700">
            <p className="font-bold mb-2">Regel:</p>
            <p>Für die Wegbeschreibung benutzt man spezielle Präpositionen mit dem Dativ oder Akkusativ.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>an ... vorbei</strong> (+ Dativ): Geh <em>am</em> Kaufhaus vorbei.</li>
              <li><strong>durch</strong> (+ Akkusativ): Geh <em>durch</em> den Park.</li>
              <li><strong>bis zu</strong> (+ Dativ): Geh <em>bis zur</em> Kirche.</li>
              <li><strong>gegenüber von</strong> (+ Dativ): Das Café ist <em>gegenüber vom</em> Bahnhof.</li>
            </ul>
          </div>
          
          <h4 className="font-bold text-lg mb-4">Ergänzen Sie die richtige Präposition (mit Artikel):</h4>
          <div className="space-y-4">
            {[
              { id: "lok_1", text: "Gehen Sie zuerst ___ (an dem) Kaufhaus vorbei." },
              { id: "lok_2", text: "Dann gehen Sie ___ den Park." },
              { id: "lok_3", text: "Gehen Sie weiter ___ (bis zu der) Apotheke." },
              { id: "lok_4", text: "Die Bank ist gegenüber ___ (von dem) Bahnhof." },
              { id: "lok_5", text: "Fahren Sie ___ der Post vorbei." }
            ].map(q => (
              <div key={q.id} className="flex gap-4 items-center flex-wrap">
                <span className="font-medium">{q.text.split('___')[0]}</span>
                <input type="text" value={answers[q.id] || ""} onChange={e => handleInputChange(q.id, e.target.value)} className={`w-32 p-2 border-2 rounded-xl outline-none font-bold text-center ${getStatus(q.id)}`} placeholder="..." />
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
