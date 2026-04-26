const fs = require('fs');

let content = `
"use client";

import React, { useState } from 'react';

export function KapitelTest4() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isEvaluatingText, setIsEvaluatingText] = useState(false);
  const [textFeedback, setTextFeedback] = useState<any>(null);

  const correctAnswers = {
    // Ex 1
    "ex1_1": "Schultag",
    "ex1_2": "Geburt",
    "ex1_3": "Führerschein",
    "ex1_4": "Hochzeit",
    "ex1_5": "Prüfung", // Added just in case, but test says 4 items (1 to 4)
    // Wait, the test has 1 to 4. 1. die Schultüte 2. der Storch 3. das Auto 4. die Ringe
    
    // Ex 2
    "ex2_1": "Dank",
    "ex2_2": "Einladung",
    "ex2_3": "Hochzeit",
    "ex2_4": "sehr",
    "ex2_5": "können",
    "ex2_6": "weil",
    "ex2_7": "Urlaub",
    "ex2_8": "gratulieren",
    "ex2_9": "herzlich",
    "ex2_10": "euch",
    "ex2_11": "Hochzeit",
    "ex2_12": "schöne",

    // Ex 3
    "ex3_1": "b", // Wirklich? Oh, wie schön!
    "ex3_2": "c", // Das macht doch nichts.
    "ex3_3": "a", // So ein Glück!
    "ex3_4": "b", // Das tut mir leid.

    // Ex 4
    "ex4_1": "dass",
    "ex4_2": "wenn",
    "ex4_3": "dass",
    "ex4_4": "weil",

    // Ex 6
    "ex6_1": "mich",
    "ex6_2": "mich",
    "ex6_3": "sich",
    "ex6_4": "uns",
    "ex6_5": "euch",
    "ex6_6": "euch"
  };

  const handleInputChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const calculateScore = async () => {
    let totalScore = 0;
    
    // Ex 1 (4 pts)
    ['1', '2', '3', '4'].forEach(num => {
      if (answers[\`ex1_\${num}\`]?.trim().toLowerCase() === correctAnswers[\`ex1_\${num}\` as keyof typeof correctAnswers].toLowerCase()) {
        totalScore += 1;
      }
    });

    // Ex 2 (12 pts, but test says / 6, maybe 0.5 per item)
    let ex2Correct = 0;
    for (let i = 1; i <= 12; i++) {
      if (answers[\`ex2_\${i}\`]?.trim().toLowerCase() === correctAnswers[\`ex2_\${i}\` as keyof typeof correctAnswers].toLowerCase()) {
        ex2Correct += 0.5;
      }
    }
    totalScore += ex2Correct;

    // Ex 3 (4 pts)
    ['1', '2', '3', '4'].forEach(num => {
      if (answers[\`ex3_\${num}\`] === correctAnswers[\`ex3_\${num}\` as keyof typeof correctAnswers]) {
        totalScore += 1;
      }
    });

    // Ex 4 (2 pts - 4 items, 0.5 each)
    let ex4Correct = 0;
    ['1', '2', '3', '4'].forEach(num => {
      if (answers[\`ex4_\${num}\`] === correctAnswers[\`ex4_\${num}\` as keyof typeof correctAnswers]) {
        ex4Correct += 0.5;
      }
    });
    totalScore += ex4Correct;

    // Ex 6 (6 pts)
    ['1', '2', '3', '4', '5', '6'].forEach(num => {
      if (answers[\`ex6_\${num}\`]?.trim().toLowerCase() === correctAnswers[\`ex6_\${num}\` as keyof typeof correctAnswers].toLowerCase()) {
        totalScore += 1;
      }
    });

    setScore(totalScore);

    // AI Check for Exercise 5
    const ex5Text = [
      "1. Ich bin nervös, wenn " + (answers.ex5_1 || ""),
      "2. Ich finde es wunderbar, wenn " + (answers.ex5_2 || ""),
      "3. Wenn " + (answers.ex5_3 || "") + ", bin ich traurig.",
      "4. Wenn " + (answers.ex5_4 || "") + ", freue ich mich."
    ].join("\\n");

    if (answers.ex5_1 || answers.ex5_2 || answers.ex5_3 || answers.ex5_4) {
      setIsEvaluatingText(true);
      try {
        const response = await fetch('/api/evaluateSchreiben', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            text: ex5Text, 
            topic: "Schreiben Sie die wenn-Sätze zu Ende. (Grammar check for Nebensatz word order with 'wenn')" 
          })
        });
        const data = await response.json();
        setTextFeedback(data);
        // Add up to 8 points based on grammar score (since Ex 5 is 8 points)
        setScore(prev => prev + Math.round((data.grammarScore / 100) * 8));
      } catch (error) {
        console.error(error);
      } finally {
        setIsEvaluatingText(false);
      }
    }

    setShowResult(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetTest = () => {
    setAnswers({});
    setShowResult(false);
    setScore(0);
    setTextFeedback(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusColor = (id: string) => {
    if (!showResult) return "border-slate-300";
    const answer = answers[id]?.trim().toLowerCase();
    const correct = correctAnswers[id as keyof typeof correctAnswers].toLowerCase();
    return answer === correct ? "border-emerald-500 bg-emerald-50 text-emerald-900" : "border-rose-500 bg-rose-50 text-rose-900";
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-slate-900">Test zu Kapitel 4</h2>
        <p className="text-slate-600 mt-2 font-bold">Netzwerk neu A2</p>
      </div>

      {showResult && (
        <div className="clay-card p-8 bg-slate-900 text-white border-4 border-emerald-500 shadow-2xl animate-in slide-in-from-top-4 mb-12">
          <h3 className="text-3xl font-black text-emerald-400 mb-2">Testergebnis</h3>
          <div className="flex items-end gap-2 mb-6">
            <span className="text-6xl font-black">{score}</span>
            <span className="text-2xl font-bold text-slate-400 mb-1">/ 30 Punkte</span>
          </div>
          
          {textFeedback && (
            <div className="bg-white/10 p-6 rounded-2xl border border-white/20 mt-6">
              <h4 className="text-amber-400 font-bold mb-2">AI Feedback (Aufgabe 5)</h4>
              <p className="text-slate-300 text-sm mb-4">{textFeedback.feedback}</p>
              {textFeedback.corrections && textFeedback.corrections.length > 0 && (
                <ul className="space-y-2 text-sm">
                  {textFeedback.corrections.map((c: any, i: number) => (
                    <li key={i} className="bg-black/30 p-3 rounded-lg">
                      <div className="text-rose-400 line-through mb-1">{c.original}</div>
                      <div className="text-emerald-400">{c.corrected}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <button onClick={resetTest} className="mt-8 px-6 py-3 bg-white text-slate-900 font-black rounded-xl hover:bg-slate-200 transition-colors">
            Test wiederholen
          </button>
        </div>
      )}

      {/* Aufgabe 1 */}
      <section className="clay-card p-8 bg-white border-2 border-slate-200">
        <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-4">
          <span className="bg-emerald-500 text-white w-10 h-10 flex items-center justify-center rounded-xl">1</span>
          Welche Ereignisse finden Sie? Ordnen Sie die Wörter den Ereignissen zu.
        </h3>
        
        <div className="bg-slate-100 p-6 rounded-2xl font-mono font-bold text-slate-700 tracking-widest text-center leading-loose border-2 border-slate-200 mb-8">
          EIN | SCHUL | STAND | TAG | HOCH | PRÜ | SCHEIN | ZEIT | GE | FÜH | BURT | RER | FUNG
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-slate-500">
              <span className="font-bold w-4">0.</span>
              <span className="w-32 line-through">das Gebäck</span>
              <span className="font-mono text-emerald-600 font-bold border-b-2 border-emerald-500">Einstand</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold w-4">1.</span>
              <span className="w-32 font-medium">die Schultüte</span>
              <input type="text" value={answers.ex1_1 || ''} onChange={e => handleInputChange('ex1_1', e.target.value)} className={\`flex-1 p-2 border-b-2 bg-transparent outline-none font-mono font-bold transition-colors \${getStatusColor('ex1_1')}\`} placeholder="..." />
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold w-4">2.</span>
              <span className="w-32 font-medium">der Storch</span>
              <input type="text" value={answers.ex1_2 || ''} onChange={e => handleInputChange('ex1_2', e.target.value)} className={\`flex-1 p-2 border-b-2 bg-transparent outline-none font-mono font-bold transition-colors \${getStatusColor('ex1_2')}\`} placeholder="..." />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-bold w-4">3.</span>
              <span className="w-32 font-medium">das Auto</span>
              <input type="text" value={answers.ex1_3 || ''} onChange={e => handleInputChange('ex1_3', e.target.value)} className={\`flex-1 p-2 border-b-2 bg-transparent outline-none font-mono font-bold transition-colors \${getStatusColor('ex1_3')}\`} placeholder="..." />
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold w-4">4.</span>
              <span className="w-32 font-medium">die Ringe</span>
              <input type="text" value={answers.ex1_4 || ''} onChange={e => handleInputChange('ex1_4', e.target.value)} className={\`flex-1 p-2 border-b-2 bg-transparent outline-none font-mono font-bold transition-colors \${getStatusColor('ex1_4')}\`} placeholder="..." />
            </div>
          </div>
        </div>
        <div className="text-right mt-4 font-bold text-slate-400">____ / 4</div>
      </section>

      {/* Aufgabe 2 */}
      <section className="clay-card p-8 bg-white border-2 border-slate-200">
        <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-4">
          <span className="bg-emerald-500 text-white w-10 h-10 flex items-center justify-center rounded-xl">2</span>
          Ergänzen Sie die Lücken.
        </h3>
        
        <div className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-200 text-lg leading-loose shadow-inner relative">
          <div className="absolute top-4 right-4 text-slate-300">✉️</div>
          <p className="mb-4">Liebe Julia, lieber Thorsten,</p>
          <p>
            wie schön, ihr <span className="font-mono text-emerald-600 font-bold border-b-2 border-emerald-500 px-2 mx-1">heiratet</span>! 
            Tausend <input type="text" value={answers.ex2_1 || ''} onChange={e => handleInputChange('ex2_1', e.target.value)} className={\`w-24 text-center p-1 border-b-2 bg-transparent outline-none font-bold text-indigo-700 \${getStatusColor('ex2_1')}\`} placeholder="D_ _ _" /> 
            für die <input type="text" value={answers.ex2_2 || ''} onChange={e => handleInputChange('ex2_2', e.target.value)} className={\`w-32 text-center p-1 border-b-2 bg-transparent outline-none font-bold text-indigo-700 \${getStatusColor('ex2_2')}\`} placeholder="Ein_ _ _ _ _ _" /> 
            zu eurer <input type="text" value={answers.ex2_3 || ''} onChange={e => handleInputChange('ex2_3', e.target.value)} className={\`w-32 text-center p-1 border-b-2 bg-transparent outline-none font-bold text-indigo-700 \${getStatusColor('ex2_3')}\`} placeholder="Ho_ _ _ _ _ _" />. 
            Wir haben uns <input type="text" value={answers.ex2_4 || ''} onChange={e => handleInputChange('ex2_4', e.target.value)} className={\`w-20 text-center p-1 border-b-2 bg-transparent outline-none font-bold text-indigo-700 \${getStatusColor('ex2_4')}\`} placeholder="s_ _ _" /> gefreut.
          </p>
          <p className="mt-2">
            Leider <input type="text" value={answers.ex2_5 || ''} onChange={e => handleInputChange('ex2_5', e.target.value)} className={\`w-24 text-center p-1 border-b-2 bg-transparent outline-none font-bold text-indigo-700 \${getStatusColor('ex2_5')}\`} placeholder="k_ _ _ _ _" /> wir nicht kommen, 
            <input type="text" value={answers.ex2_6 || ''} onChange={e => handleInputChange('ex2_6', e.target.value)} className={\`w-20 text-center mx-2 p-1 border-b-2 bg-transparent outline-none font-bold text-indigo-700 \${getStatusColor('ex2_6')}\`} placeholder="w_ _ _" /> wir im 
            <input type="text" value={answers.ex2_7 || ''} onChange={e => handleInputChange('ex2_7', e.target.value)} className={\`w-24 text-center ml-2 p-1 border-b-2 bg-transparent outline-none font-bold text-indigo-700 \${getStatusColor('ex2_7')}\`} placeholder="Ur_ _ _ _" /> sind.
          </p>
          <p className="mt-2">
            Wir <input type="text" value={answers.ex2_8 || ''} onChange={e => handleInputChange('ex2_8', e.target.value)} className={\`w-40 text-center p-1 border-b-2 bg-transparent outline-none font-bold text-indigo-700 \${getStatusColor('ex2_8')}\`} placeholder="gra_ _ _ _ _ _ _ _ _" /> euch sehr 
            <input type="text" value={answers.ex2_9 || ''} onChange={e => handleInputChange('ex2_9', e.target.value)} className={\`w-32 text-center mx-2 p-1 border-b-2 bg-transparent outline-none font-bold text-indigo-700 \${getStatusColor('ex2_9')}\`} placeholder="herz_ _ _ _" /> und wünschen 
            <input type="text" value={answers.ex2_10 || ''} onChange={e => handleInputChange('ex2_10', e.target.value)} className={\`w-20 text-center mx-2 p-1 border-b-2 bg-transparent outline-none font-bold text-indigo-700 \${getStatusColor('ex2_10')}\`} placeholder="e_ _ _" /> alles Liebe zu eurer 
            <input type="text" value={answers.ex2_11 || ''} onChange={e => handleInputChange('ex2_11', e.target.value)} className={\`w-32 text-center mx-2 p-1 border-b-2 bg-transparent outline-none font-bold text-indigo-700 \${getStatusColor('ex2_11')}\`} placeholder="Ho_ _ _ _ _ _" /> und eine sehr 
            <input type="text" value={answers.ex2_12 || ''} onChange={e => handleInputChange('ex2_12', e.target.value)} className={\`w-24 text-center mx-2 p-1 border-b-2 bg-transparent outline-none font-bold text-indigo-700 \${getStatusColor('ex2_12')}\`} placeholder="sch_ _ _" /> Feier!
          </p>
          <p className="mt-6">Herzliche Grüße<br/>Pia und Jan</p>
        </div>
        <div className="text-right mt-4 font-bold text-slate-400">____ / 6</div>
      </section>

      {/* Aufgabe 3 */}
      <section className="clay-card p-8 bg-white border-2 border-slate-200">
        <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-4">
          <span className="bg-emerald-500 text-white w-10 h-10 flex items-center justify-center rounded-xl">3</span>
          Welche Antwort passt? Kreuzen Sie an.
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              id: '1',
              q: "1. Wir wollen im Mai heiraten.",
              opts: [
                { id: 'a', text: "Hauptsache, wir feiern jetzt." },
                { id: 'b', text: "Wirklich? Oh, wie schön!" },
                { id: 'c', text: "Schade!" }
              ]
            },
            {
              id: '2',
              q: "2. Alles Gute zum Geburtstag! Tut mir leid, ich habe dein Geschenk zu Hause vergessen.",
              opts: [
                { id: 'a', text: "Das gibt's doch nicht!" },
                { id: 'b', text: "Ich freue mich riesig." },
                { id: 'c', text: "Das macht doch nichts." }
              ]
            },
            {
              id: '3',
              q: "3. Ich habe 1.000 € gewonnen!",
              opts: [
                { id: 'a', text: "So ein Glück!" },
                { id: 'b', text: "Oh, ist das peinlich!" },
                { id: 'c', text: "Es ist alles okay." }
              ]
            },
            {
              id: '4',
              q: "4. Ich kann dieses Jahr nicht zur Kieler Woche fahren.",
              opts: [
                { id: 'a', text: "Das ist mir so unangenehm!" },
                { id: 'b', text: "Das tut mir leid." },
                { id: 'c', text: "Das ist ja toll!" }
              ]
            }
          ].map(item => (
            <div key={item.id} className="space-y-3">
              <p className="font-bold text-slate-800">{item.q}</p>
              {item.opts.map(opt => (
                <label key={opt.id} className={\`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all \${answers[\`ex3_\${item.id}\`] === opt.id ? 'border-sky-500 bg-sky-50' : 'border-slate-200 hover:bg-slate-50'}\`}>
                  <input type="radio" name={\`ex3_\${item.id}\`} value={opt.id} checked={answers[\`ex3_\${item.id}\`] === opt.id} onChange={e => handleInputChange(\`ex3_\${item.id}\`, e.target.value)} className="w-5 h-5 accent-sky-600" />
                  <span className="font-medium text-slate-700">{opt.text}</span>
                </label>
              ))}
              {showResult && (
                <div className={\`text-sm font-bold \${answers[\`ex3_\${item.id}\`] === correctAnswers[\`ex3_\${item.id}\` as keyof typeof correctAnswers] ? 'text-emerald-500' : 'text-rose-500'}\`}>
                  {answers[\`ex3_\${item.id}\`] === correctAnswers[\`ex3_\${item.id}\` as keyof typeof correctAnswers] ? '✓ Richtig' : \`❌ Falsch (Richtig: \${correctAnswers[\`ex3_\${item.id}\` as keyof typeof correctAnswers]})\`}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-right mt-4 font-bold text-slate-400">____ / 4</div>
      </section>

      {/* Aufgabe 4 */}
      <section className="clay-card p-8 bg-white border-2 border-slate-200">
        <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-4">
          <span className="bg-emerald-500 text-white w-10 h-10 flex items-center justify-center rounded-xl">4</span>
          <span className="italic font-normal">weil, dass</span> oder <span className="italic font-normal">wenn</span>? Kreuzen Sie an.
        </h3>

        <div className="space-y-4">
          {[
            { id: '1', start: "1. Wir haben gedacht,", opts: ["wenn", "dass"], end: "in Deutschland alles ordentlich ist." },
            { id: '2', start: "2. Sie findet es schlimm,", opts: ["weil", "wenn"], end: "er mal wieder zu spät kommt." },
            { id: '3', start: "3. Wir haben die Erfahrung gemacht,", opts: ["dass", "weil"], end: "nicht alle Deutschen pünktlich sind." },
            { id: '4', start: "4. Sie geht abends gerne aus,", opts: ["dass", "weil"], end: "sie dann ihre Freunde trifft." }
          ].map(item => (
            <div key={item.id} className="flex flex-wrap items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="font-medium text-slate-700 w-full md:w-auto md:flex-1">{item.start}</span>
              <div className="flex gap-2">
                {item.opts.map(opt => (
                  <label key={opt} className={\`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all \${answers[\`ex4_\${item.id}\`] === opt ? 'border-sky-500 bg-sky-100 text-sky-900 font-bold' : 'border-slate-300 bg-white text-slate-600'}\`}>
                    <input type="radio" name={\`ex4_\${item.id}\`} value={opt} checked={answers[\`ex4_\${item.id}\`] === opt} onChange={e => handleInputChange(\`ex4_\${item.id}\`, e.target.value)} className="hidden" />
                    {opt}
                  </label>
                ))}
              </div>
              <span className="font-medium text-slate-700 w-full md:w-auto md:flex-1">{item.end}</span>
              {showResult && (
                <div className={\`w-full text-right text-sm font-bold \${answers[\`ex4_\${item.id}\`] === correctAnswers[\`ex4_\${item.id}\` as keyof typeof correctAnswers] ? 'text-emerald-500' : 'text-rose-500'}\`}>
                  {answers[\`ex4_\${item.id}\`] === correctAnswers[\`ex4_\${item.id}\` as keyof typeof correctAnswers] ? '✓ Richtig' : \`❌ Richtig: \${correctAnswers[\`ex4_\${item.id}\` as keyof typeof correctAnswers]}\`}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-right mt-4 font-bold text-slate-400">____ / 2</div>
      </section>

      {/* Aufgabe 5 */}
      <section className="clay-card p-8 bg-white border-2 border-slate-200">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-4">
            <span className="bg-emerald-500 text-white w-10 h-10 flex items-center justify-center rounded-xl">5</span>
            Und Sie? Schreiben Sie die wenn-Sätze zu Ende.
          </h3>
          <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <span>🤖</span> AI Evaluated
          </span>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="font-medium text-slate-700 w-64">1. Ich bin nervös, wenn</span>
            <input type="text" value={answers.ex5_1 || ''} onChange={e => handleInputChange('ex5_1', e.target.value)} className="flex-1 p-3 border-b-2 border-slate-300 bg-slate-50 outline-none focus:border-amber-500 focus:bg-amber-50 transition-colors rounded-t-lg" placeholder="..." />
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="font-medium text-slate-700 w-64">2. Ich finde es wunderbar, wenn</span>
            <input type="text" value={answers.ex5_2 || ''} onChange={e => handleInputChange('ex5_2', e.target.value)} className="flex-1 p-3 border-b-2 border-slate-300 bg-slate-50 outline-none focus:border-amber-500 focus:bg-amber-50 transition-colors rounded-t-lg" placeholder="..." />
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="font-medium text-slate-700 w-16">3. Wenn</span>
            <input type="text" value={answers.ex5_3 || ''} onChange={e => handleInputChange('ex5_3', e.target.value)} className="flex-1 p-3 border-b-2 border-slate-300 bg-slate-50 outline-none focus:border-amber-500 focus:bg-amber-50 transition-colors rounded-t-lg" placeholder="..." />
            <span className="font-medium text-slate-700">, bin ich traurig.</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <span className="font-medium text-slate-700 w-16">4. Wenn</span>
            <input type="text" value={answers.ex5_4 || ''} onChange={e => handleInputChange('ex5_4', e.target.value)} className="flex-1 p-3 border-b-2 border-slate-300 bg-slate-50 outline-none focus:border-amber-500 focus:bg-amber-50 transition-colors rounded-t-lg" placeholder="..." />
            <span className="font-medium text-slate-700">, freue ich mich.</span>
          </div>
        </div>
        <div className="text-right mt-4 font-bold text-slate-400">____ / 8</div>
      </section>

      {/* Aufgabe 6 */}
      <section className="clay-card p-8 bg-white border-2 border-slate-200">
        <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-4">
          <span className="bg-emerald-500 text-white w-10 h-10 flex items-center justify-center rounded-xl">6</span>
          Ergänzen Sie die Reflexivpronomen.
        </h3>
        
        <div className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-200 text-lg leading-loose shadow-inner">
          <p className="mb-4">Hallo Ronald,</p>
          <p>
            wie geht es dir in Indien? Hast du dich schon an das scharfe Essen gewöhnt? Vielen Dank für die Fotos. Die sind ja echt super! 
            Ich habe <input type="text" value={answers.ex6_1 || ''} onChange={e => handleInputChange('ex6_1', e.target.value)} className={\`w-24 text-center p-1 border-b-2 bg-transparent outline-none font-bold text-indigo-700 \${getStatusColor('ex6_1')}\`} placeholder="(1)" /> sehr gefreut.
          </p>
          <p className="mt-2">
            Übrigens, ich treffe <input type="text" value={answers.ex6_2 || ''} onChange={e => handleInputChange('ex6_2', e.target.value)} className={\`w-24 text-center p-1 border-b-2 bg-transparent outline-none font-bold text-indigo-700 \${getStatusColor('ex6_2')}\`} placeholder="(2)" /> gleich mit Elena. 
            Nach drei Jahren hat sie <input type="text" value={answers.ex6_3 || ''} onChange={e => handleInputChange('ex6_3', e.target.value)} className={\`w-24 text-center p-1 border-b-2 bg-transparent outline-none font-bold text-indigo-700 \${getStatusColor('ex6_3')}\`} placeholder="(3)" /> an mich erinnert. 
            Warum so plötzlich? Keine Ahnung. Ich bin echt neugierig. Wir haben <input type="text" value={answers.ex6_4 || ''} onChange={e => handleInputChange('ex6_4', e.target.value)} className={\`w-24 text-center p-1 border-b-2 bg-transparent outline-none font-bold text-indigo-700 \${getStatusColor('ex6_4')}\`} placeholder="(4)" /> noch nicht für einen Treffpunkt entschieden.
          </p>
          <p className="mt-2">
            Du und Karin, ihr langweilt <input type="text" value={answers.ex6_5 || ''} onChange={e => handleInputChange('ex6_5', e.target.value)} className={\`w-24 text-center p-1 border-b-2 bg-transparent outline-none font-bold text-indigo-700 \${getStatusColor('ex6_5')}\`} placeholder="(5)" /> in Indien sicher auch nicht, was? 
            Ich hoffe, dass ihr <input type="text" value={answers.ex6_6 || ''} onChange={e => handleInputChange('ex6_6', e.target.value)} className={\`w-24 text-center p-1 border-b-2 bg-transparent outline-none font-bold text-indigo-700 \${getStatusColor('ex6_6')}\`} placeholder="(6)" /> auch manchmal ausruht. 
            Schick mal mehr Fotos!
          </p>
          <p className="mt-6">Liebe Grüße<br/>Konrad</p>
        </div>
        <div className="text-right mt-4 font-bold text-slate-400">____ / 6</div>
      </section>

      <div className="flex justify-center mt-12">
        <button 
          onClick={calculateScore}
          disabled={isEvaluatingText}
          className="px-12 py-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-2xl rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
          {isEvaluatingText ? 'Wird geprüft... 🤖' : 'Test Auswerten'}
        </button>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('app/dashboard/KapitelTest4.tsx', content, 'utf8');
console.log("Updated KapitelTest4.tsx");
