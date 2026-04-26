"use client";

import React, { useState } from 'react';

export default function LesenInteraktiv9() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [isCorrect, setIsCorrect] = useState<Record<number, boolean | null>>({});
  const [activeWord, setActiveWord] = useState<string | null>(null);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setSelectedAnswers({});
    setIsCorrect({});
    setActiveWord(null);
  };

  const dictionary: Record<string, { meaning: string, type: string }> = {
    "kommentar": { meaning: "komentar", type: "Kata Benda" },
    "fit": { meaning: "bugar/sehat", type: "Kata Sifat" },
    "trotzdem": { meaning: "meskipun begitu", type: "Kata Penghubung" },
    "deshalb": { meaning: "karena itu", type: "Kata Penghubung" },
    "langweilig": { meaning: "membosankan", type: "Kata Sifat" },
    "berühmt": { meaning: "terkenal", type: "Kata Sifat" },
    "vorbild": { meaning: "panutan", type: "Kata Benda" },
    "großartig": { meaning: "hebat / luar biasa", type: "Kata Sifat" },
    "nationalpark": { meaning: "taman nasional", type: "Kata Benda" },
    "wanderwege": { meaning: "jalur hiking", type: "Kata Benda" },
    "seilbahn": { meaning: "kereta gantung", type: "Kata Benda" },
    "strecke": { meaning: "rute / jalur", type: "Kata Benda" },
    "eishöhle": { meaning: "gua es", type: "Kata Benda" },
    "temperatur": { meaning: "suhu", type: "Kata Benda" },
    "grenze": { meaning: "perbatasan", type: "Kata Benda" },
    "pflanzen": { meaning: "tanaman-tanaman", type: "Kata Benda" },
    "tiere": { meaning: "hewan-hewan", type: "Kata Benda" },
    "leuchtturm": { meaning: "mercusuar", type: "Kata Benda" },
    "strände": { meaning: "pantai-pantai", type: "Kata Benda" },
    "bedingungen": { meaning: "kondisi-kondisi", type: "Kata Benda" }
  };

  const renderInteractiveText = (text: string) => {
    return text.split(' ').map((word, index) => {
      const cleanWord = word.replace(/[.,?!:;]/g, '').toLowerCase();
      const punctuationMatch = word.match(/[.,?!:;]+$/);
      const punctuation = punctuationMatch ? punctuationMatch[0] : '';
      const baseWord = word.replace(/[.,?!:;]+$/, '');
      
      const entry = dictionary[cleanWord];

      if (entry) {
        const wordId = `${text.substring(0,10).replace(/\s/g,'')}-${index}`;
        const isActive = activeWord === wordId;
        return (
          <span 
            key={index} 
            className="group relative inline-block mx-[2px] cursor-pointer"
            onClick={() => setActiveWord(isActive ? null : wordId)}
            onMouseEnter={() => setActiveWord(wordId)}
            onMouseLeave={() => setActiveWord(null)}
          >
            <span className={`border-b border-dashed transition-colors duration-200 ${isActive ? 'border-sky-500 text-sky-600 bg-sky-50' : 'border-amber-500 hover:border-sky-500 hover:text-sky-600 hover:bg-sky-50'} rounded-sm px-0.5`}>
              {baseWord}
            </span>
            {punctuation}
            <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[250px] bg-slate-900 border border-slate-700 text-white text-xs px-3 py-2 rounded-xl transition-all duration-200 pointer-events-none z-20 shadow-xl shadow-black/50 ${isActive ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-0'}`}>
              <span className="block font-black text-sky-400 mb-1 text-[10px] tracking-wider uppercase">{entry.type}</span>
              <span className="block font-medium whitespace-normal">{entry.meaning}</span>
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></span>
            </span>
          </span>
        );
      }
      return <span key={index} className="mx-[2px]">{word} </span>;
    });
  };

  const stories = [
    {
      id: 1,
      title: "Text 1: Fanseite",
      desc: "Lies die Kommentare der Fans nach einem Spiel.",
      content: (
        <div className="space-y-6 text-slate-800 font-medium leading-relaxed text-lg">
          <div className="bg-white p-4 rounded-xl border border-slate-300">
            <p className="font-bold text-sky-700 mb-1">@Mike07:</p>
            <p>{renderInteractiveText("Das letzte Spiel war super. Der Spieler war noch nicht ganz fit. Trotzdem hat er gut gespielt. Deshalb hat sein Team gewonnen.")}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-300">
            <p className="font-bold text-sky-700 mb-1">@Bällchen:</p>
            <p>{renderInteractiveText("Das Spiel war langweilig. Fast alle haben schlecht gespielt. Trotzdem hat das Team gewonnen. Nur ein Tor war schön.")}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-300">
            <p className="font-bold text-sky-700 mb-1">@Tor3000:</p>
            <p>{renderInteractiveText("Der Spieler ist berühmt. Trotzdem bleibt er freundlich und nett zu den Fans.")}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-300">
            <p className="font-bold text-sky-700 mb-1">@LeoB:</p>
            <p>{renderInteractiveText("Der Spieler spielt großartig. Deshalb ist er ein Vorbild. Die Mannschaft und Fans brauchen ihn.")}</p>
          </div>
        </div>
      ),
      questions: [
        {
          q: "1. Warum hat das Team laut Mike07 gewonnen?",
          options: [
            "Weil der Gegner schlecht war.",
            "Weil der Spieler gut gespielt hat, obwohl er nicht fit war.",
            "Weil es ein Heimspiel war."
          ],
          correct: 1
        },
        {
          q: "2. Wie fand Bällchen das Spiel?",
          options: [
            "Es war langweilig, aber das Team hat gewonnen.",
            "Es war sehr spannend.",
            "Es war eine Katastrophe und sie haben verloren."
          ],
          correct: 0
        },
        {
          q: "3. Warum ist der Spieler laut LeoB ein Vorbild?",
          options: [
            "Weil er berühmt ist.",
            "Weil er reich ist.",
            "Weil er großartig spielt."
          ],
          correct: 2
        }
      ]
    },
    {
      id: 2,
      title: "Text 2: Reiseziele für Sport",
      desc: "Lies die kurzen Texte über Orte für den Sport.",
      content: (
        <div className="space-y-6 text-slate-800 font-medium leading-relaxed text-lg">
          <div className="bg-white p-4 rounded-xl border border-slate-300">
            <h5 className="font-bold text-lg text-emerald-700 mb-2">Es müssen nicht immer die Alpen sein</h5>
            <p>{renderInteractiveText("Nationalpark Sächsische Schweiz: Viele Wanderwege an der Elbe, durch Wälder und über Berge. Mit richtiger Kleidung kann man das ganze Jahr wandern. Dresden ist nur 40 Kilometer entfernt.")}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-300">
            <h5 className="font-bold text-lg text-emerald-700 mb-2">Nur Fliegen ist schöner</h5>
            <p>{renderInteractiveText("Hoch-Ybrig: Mit der Seilbahn zur Bergstation. Die Strecke vom Flying Fox ist 2,3 km lang. Die Fahrt dauert etwas mehr als zwei Minuten. Im Sommer kann man wandern, im Winter Ski fahren.")}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-300">
            <h5 className="font-bold text-lg text-emerald-700 mb-2">Wenn der Sommer wieder heiß ist</h5>
            <p>{renderInteractiveText("Eisriesenwelt Werfen: Eine Eishöhle in Salzburg. Die Temperatur ist fast immer unter null Grad. Man wandert mit einem Führer. Im Winter ist sie geschlossen.")}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-300">
            <h5 className="font-bold text-lg text-emerald-700 mb-2">Radtour durch die deutsche Geschichte</h5>
            <p>{renderInteractiveText("Das Grüne Band: Bis 1989 war dies die Grenze zwischen DDR und BRD. Heute ist es ein Lebensraum für seltene Pflanzen und Tiere. Man kann dort wandern und Rad fahren.")}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-300">
            <h5 className="font-bold text-lg text-emerald-700 mb-2">Sankt Peter-Ording</h5>
            <p>{renderInteractiveText("Ein Urlaubsort an der Nordsee. Das Symbol ist ein Leuchtturm. Bekannt für viele Strände und gute Bedingungen für Kitesurfer.")}</p>
          </div>
        </div>
      ),
      questions: [
        {
          q: "1. Wo gibt es im Sommer Eis und man braucht warme Kleidung?",
          options: [
            "In der Sächsischen Schweiz.",
            "In Sankt Peter-Ording.",
            "In der Eisriesenwelt Werfen."
          ],
          correct: 2
        },
        {
          q: "2. Wo verlief früher eine Grenze und heute gibt es seltene Pflanzen und Tiere?",
          options: [
            "Das Grüne Band.",
            "Hoch-Ybrig.",
            "Sankt Peter-Ording."
          ],
          correct: 0
        },
        {
          q: "3. Was ist das Wahrzeichen (Symbol) von Sankt Peter-Ording?",
          options: [
            "Eine Eishöhle.",
            "Ein Leuchtturm.",
            "Eine Seilbahn."
          ],
          correct: 1
        }
      ]
    }
  ];

  

  
    

  
      const currentStory = stories[activeTab];

  const handleCheck = (qIndex: number, optIndex: number) => {
    setSelectedAnswers(prev => ({...prev, [qIndex]: optIndex}));
    const qObj = currentStory.questions[qIndex];
    const correct = typeof (qObj as any).correct !== 'undefined' ? (qObj as any).correct : (qObj as any).correctAnswer;
    setIsCorrect(prev => ({...prev, [qIndex]: optIndex === correct}));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {stories.map((story, idx) => (
          <button
            key={story.id || idx}
            onClick={() => handleTabChange(idx)}
            className={`px-6 py-3 rounded-2xl font-bold transition-all shadow-sm ${
              activeTab === idx 
                ? 'bg-amber-500 text-white shadow-amber-500/30 scale-105' 
                : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50 hover:border-amber-300 hover:text-amber-600'
            }`}
          >
            {story.title}
          </button>
        ))}
      </div>

      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-900">{currentStory.title}</h2>
        <p className="text-slate-600 mt-2">{currentStory.desc}</p>
      </div>

      <div className="bg-white/5 p-6 rounded-2xl border border-amber-200 w-full mb-8 bg-amber-50 shadow-inner">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">Lesetext (Interaktif)</p>
          <span className="text-[10px] bg-amber-200 text-amber-800 px-2 py-1 rounded-md uppercase tracking-wider font-bold">Arahkan kursor ke kata</span>
        </div>
        {currentStory.content ? currentStory.content : (
          <p className="text-amber-900 font-medium leading-relaxed text-lg">
             {renderInteractiveText((currentStory as any).text)}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {currentStory.questions.map((item, qIndex) => (
          <div key={qIndex} className="clay-card p-8 bg-white border-slate-300">
            <h4 className="text-xl font-bold text-slate-800 mb-6">{(item as any).q || (item as any).question}</h4>
            <div className="space-y-4">
              {item.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleCheck(qIndex, index)}
                  className={`w-full text-left p-4 rounded-xl border-2 font-bold transition-all ${
                    selectedAnswers[qIndex] === index
                      ? isCorrect[qIndex]
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                        : 'bg-rose-100 border-rose-500 text-rose-900'
                      : 'bg-slate-50 border-slate-300 text-slate-700 hover:border-amber-400 hover:bg-amber-50'
                  }`}
                >
                  <span className="mr-3 text-lg">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>
            {typeof isCorrect[qIndex] === 'boolean' && (
              <div className={`mt-6 p-4 rounded-xl font-bold ${isCorrect[qIndex] ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                {isCorrect[qIndex] ? '🎉 Richtig! Jawaban kamu benar.' : '❌ Falsch! Coba baca teksnya lagi.'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
