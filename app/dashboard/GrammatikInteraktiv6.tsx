"use client";

import React, { useState } from 'react';

export function GrammatikInteraktiv6() {
  const [activeTab, setActiveTab] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (id: string, val: string) => {
    setAnswers(prev => ({...prev, [id]: val}));
  };

  const correctAnswers = {
    // Adjektivendungen nach unbestimmtem Artikel
    "adj_1": "er", // ein schönER
    "adj_2": "en", // keinen günstigEN
    "adj_3": "es", // ein aktuellES
    "adj_4": "en", // einem aktuellEN
    "adj_5": "e",  // eine großE
    "adj_6": "en", // einen schönEN
    // Das Verb werden
    "wer_1": "wird",
    "wer_2": "wurde",
    "wer_3": "ist",
    "wer_4": "geworden",
    "wer_5": "werden"
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
        <button onClick={() => { setActiveTab(0); setShowResult(false); }} className={`px-6 py-2 rounded-xl font-bold ${activeTab === 0 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'}`}>Adjektivendungen</button>
        <button onClick={() => { setActiveTab(1); setShowResult(false); }} className={`px-6 py-2 rounded-xl font-bold ${activeTab === 1 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'}`}>Verb: werden</button>
      </div>

      {activeTab === 0 && (
        <div className="clay-card p-8 bg-white border-2 border-slate-300">
          <h3 className="text-2xl font-black mb-4">Adjektive nach dem unbestimmten Artikel</h3>
          <div className="bg-emerald-50 p-6 rounded-2xl border-2 border-emerald-200 mb-8 text-slate-700">
            <p className="font-bold mb-2">Regel:</p>
            <p>Nach ein/eine/kein/mein bekommen Adjektive bestimmte Endungen.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Nominativ:</strong> ein schön<strong>er</strong> Tisch (Maskulin), ein groß<strong>es</strong> Haus (Neutral), eine nett<strong>e</strong> Frau (Feminin)</li>
              <li><strong>Akkusativ:</strong> einen schön<strong>en</strong> Tisch (Maskulin) - <em>Neutral und Feminin wie Nominativ</em></li>
              <li><strong>Dativ:</strong> immer <em>-en</em> (z.B. in einem schön<strong>en</strong> Hotel)</li>
              <li><strong>Plural:</strong> Nach <em>keine</em> / <em>meine</em> immer <em>-en</em> (z.B. keine günstig<strong>en</strong> Preise)</li>
            </ul>
          </div>
          
          <h4 className="font-bold text-lg mb-4">Ergänzen Sie die Endungen:</h4>
          <div className="space-y-4">
            {[
              { id: "adj_1", text: "Das ist ein schön___ Tag! (Nominativ, Maskulin)" },
              { id: "adj_2", text: "Sie haben keine günstig___ Preise. (Plural, Akkusativ)" },
              { id: "adj_3", text: "Das ist ein aktuell___ Thema. (Nominativ, Neutral)" },
              { id: "adj_4", text: "Er arbeitet in einem bekannt___ Restaurant. (Dativ, Neutral)" },
              { id: "adj_5", text: "Das ist eine groß___ Chance. (Nominativ, Feminin)" },
              { id: "adj_6", text: "Ich suche einen gut___ Job. (Akkusativ, Maskulin)" }
            ].map(q => (
              <div key={q.id} className="flex gap-4 items-center">
                <span className="w-80 font-medium">{q.text.split('___')[0]}</span>
                <input type="text" value={answers[q.id] || ""} onChange={e => handleInputChange(q.id, e.target.value)} className={`w-20 p-3 border-2 rounded-xl outline-none font-bold text-center ${getStatus(q.id)}`} placeholder="..." />
                <span className="font-medium">{q.text.split('___')[1]}</span>
                {showResult && <span className="text-sm font-bold text-slate-600">({correctAnswers[q.id as keyof typeof correctAnswers]})</span>}
              </div>
            ))}
          </div>
          <button onClick={() => setShowResult(true)} className="mt-8 px-8 py-3 bg-emerald-500 text-white font-black rounded-xl hover:bg-emerald-600 transition-colors">Prüfen</button>
        </div>
      )}

      {activeTab === 1 && (
        <div className="clay-card p-8 bg-white border-2 border-slate-300">
          <h3 className="text-2xl font-black mb-4">Das Verb: werden</h3>
          <div className="bg-sky-50 p-6 rounded-2xl border-2 border-sky-200 mb-8 text-slate-700">
            <p className="font-bold mb-2">Regel:</p>
            <p><strong>werden</strong> bedeutet eine Veränderung oder einen Prozess.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Präsens:</strong> ich werde, du wirst, er/sie/es wird, wir werden...</li>
              <li><strong>Präteritum:</strong> ich wurde, du wurdest, er wurde, wir wurden...</li>
              <li><strong>Perfekt:</strong> ich bin geworden, er ist geworden (Hilfsverb <em>sein</em>!)</li>
            </ul>
          </div>
          
          <h4 className="font-bold text-lg mb-4">Ergänzen Sie das richtige Wort:</h4>
          <div className="space-y-4">
            {[
              { id: "wer_1", text: "Er ___ bald Arzt. (Präsens)" },
              { id: "wer_2", text: "Sie ___ gestern 30 Jahre alt. (Präteritum)" },
              { id: "wer_3", text: "Es ___ kälter geworden. (Perfekt Hilfsverb)" },
              { id: "wer_4", text: "Ich bin arbeitslos ___. (Perfekt Partizip)" },
              { id: "wer_5", text: "Wir ___ bald nach Hause gehen. (Präsens)" }
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
