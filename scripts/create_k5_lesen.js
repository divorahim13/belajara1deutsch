const fs = require('fs');
const path = require('path');

let content = `
"use client";

import React, { useState } from 'react';

export function LesenInteraktiv5() {
  const [activeTab, setActiveTab] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const correctAnswers = {
    "ex1_1": "D", "ex1_2": "E", "ex1_3": "C", "ex1_4": "B", "ex1_5": "F", "ex1_6": "A",
    "ex2_1": "D", "ex2_2": "F", "ex2_3": "A", "ex2_4": "E", "ex2_5": "C", "ex2_6": "B"
  };

  const handleInputChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const checkResults = () => setShowResult(true);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-8">
      <div className="flex gap-4 border-b-2 border-slate-200 pb-4">
        <button onClick={() => { setActiveTab(0); setShowResult(false); }} className={\`px-6 py-2 rounded-xl font-bold \${activeTab === 0 ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-500'}\`}>Text lesen</button>
        <button onClick={() => { setActiveTab(1); setShowResult(false); }} className={\`px-6 py-2 rounded-xl font-bold \${activeTab === 1 ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-500'}\`}>Übung 1</button>
        <button onClick={() => { setActiveTab(2); setShowResult(false); }} className={\`px-6 py-2 rounded-xl font-bold \${activeTab === 2 ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-500'}\`}>Übung 2</button>
      </div>

      {activeTab === 0 && (
        <div className="clay-card p-8 bg-white border-2 border-slate-200 shadow-sm">
          <h3 className="text-3xl font-black text-slate-800 mb-6">Neu in Wien</h3>
          <div className="bg-amber-50 p-6 rounded-2xl border-2 border-amber-200 text-lg leading-relaxed text-slate-700">
            <p>Valentina ist seit vorgestern in Wien. Sie findet Wien sehr schön. Ihre Vermieterin ist nett und hat ihr viel über Wien erzählt. Ihr Zimmer ist klein, aber hell und schön.</p>
            <p className="mt-4">Sie hat den Stephansdom gesehen und im Zentrum einen Spaziergang gemacht. Außerdem hat sie in Restaurants und Cafés nach einem Job als Aushilfe gefragt. Sie hat einen Termin für ein Vorstellungsgespräch in einem Restaurant. Danach muss sie noch Dinge erledigen, zum Beispiel bei der Bank ein Konto für ihren Lohn eröffnen.</p>
          </div>
        </div>
      )}

      {activeTab === 1 && (
        <div className="clay-card p-8 bg-white border-2 border-slate-200">
          <h3 className="text-xl font-black mb-6">Was passt zusammen? (Vorstellungsgespräch)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { id: '1', text: "1. Sag mal, hast du eigentlich einen Job neben dem Studium?" },
                { id: '2', text: "2. Wie hast du den Job gefunden?" },
                { id: '3', text: "3. Hast du früher schon in Restaurants gearbeitet?" },
                { id: '4', text: "4. Musst du auch Fremdsprachen sprechen?" },
                { id: '5', text: "5. Musstest du zum Vorstellungsgespräch deine Zeugnisse mitbringen?" },
                { id: '6', text: "6. Und wie oft arbeitest du?" }
              ].map(q => (
                <div key={q.id} className="flex gap-4 items-center">
                  <div className="flex-1 font-medium">{q.text}</div>
                  <input type="text" maxLength={1} value={answers[\`ex1_\${q.id}\`] || ''} onChange={e => handleInputChange(\`ex1_\${q.id}\`, e.target.value.toUpperCase())} className="w-12 h-12 text-center text-xl font-bold border-2 border-slate-300 rounded-xl uppercase" />
                  {showResult && (
                    <span className={answers[\`ex1_\${q.id}\`] === correctAnswers[\`ex1_\${q.id}\` as keyof typeof correctAnswers] ? "text-emerald-500" : "text-rose-500"}>
                      {answers[\`ex1_\${q.id}\`] === correctAnswers[\`ex1_\${q.id}\` as keyof typeof correctAnswers] ? '✓' : correctAnswers[\`ex1_\${q.id}\` as keyof typeof correctAnswers]}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <p><strong>A.</strong> Ich arbeite Teilzeit, meistens drei Abende in der Woche.</p>
              <p><strong>B.</strong> Ja. Es ist gut, dass ich Englisch spreche und auch Italienisch-Kenntnisse habe.</p>
              <p><strong>C.</strong> Ja, ich habe schon Erfahrung mit der Arbeit in Restaurants.</p>
              <p><strong>D.</strong> Ja, ich arbeite in einem Restaurant. Ich habe mich da vor drei Wochen beworben.</p>
              <p><strong>E.</strong> Ich habe eine Stellenanzeige im Internet gelesen.</p>
              <p><strong>F.</strong> Ja, natürlich, da muss man alle Unterlagen mitbringen.</p>
            </div>
          </div>
          <button onClick={checkResults} className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold">Prüfen</button>
        </div>
      )}

      {activeTab === 2 && (
        <div className="clay-card p-8 bg-white border-2 border-slate-200">
          <h3 className="text-xl font-black mb-6">Valentinas Tag in Wien</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[
                { id: '1', text: "1. Morgen habe ich ..." },
                { id: '2', text: "2. Meine Vermieterin ..." },
                { id: '3', text: "3. Sie hat mir schon ..." },
                { id: '4', text: "4. Heute habe ich im Zentrum ..." },
                { id: '5', text: "5. Ich hoffe, dass ich ..." },
                { id: '6', text: "6. Bei der Bank muss ich noch ..." }
              ].map(q => (
                <div key={q.id} className="flex gap-4 items-center">
                  <div className="flex-1 font-medium">{q.text}</div>
                  <input type="text" maxLength={1} value={answers[\`ex2_\${q.id}\`] || ''} onChange={e => handleInputChange(\`ex2_\${q.id}\`, e.target.value.toUpperCase())} className="w-12 h-12 text-center text-xl font-bold border-2 border-slate-300 rounded-xl uppercase" />
                  {showResult && (
                    <span className={answers[\`ex2_\${q.id}\`] === correctAnswers[\`ex2_\${q.id}\` as keyof typeof correctAnswers] ? "text-emerald-500" : "text-rose-500"}>
                      {answers[\`ex2_\${q.id}\`] === correctAnswers[\`ex2_\${q.id}\` as keyof typeof correctAnswers] ? '✓' : correctAnswers[\`ex2_\${q.id}\` as keyof typeof correctAnswers]}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <p><strong>A.</strong> ganz viel über Wien erzählt.</p>
              <p><strong>B.</strong> ein Konto eröffnen.</p>
              <p><strong>C.</strong> in einem Restaurant arbeiten kann.</p>
              <p><strong>D.</strong> einen Termin für ein Vorstellungsgespräch.</p>
              <p><strong>E.</strong> den Stephansdom besichtigt.</p>
              <p><strong>F.</strong> ist sehr nett.</p>
            </div>
          </div>
          <button onClick={checkResults} className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold">Prüfen</button>
        </div>
      )}
    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, '../app/dashboard/LesenInteraktiv5.tsx'), content, 'utf8');
console.log("Created LesenInteraktiv5.tsx");
