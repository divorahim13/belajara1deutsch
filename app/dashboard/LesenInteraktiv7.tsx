"use client";

import React, { useState } from 'react';

export function LesenInteraktiv7() {
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
    "verkehr": { meaning: "lalu lintas", type: "Kata Benda" },
    "stadt": { meaning: "kota", type: "Kata Benda" },
    "menschen": { meaning: "orang-orang", type: "Kata Benda" },
    "nutzen": { meaning: "menggunakan", type: "Kata Kerja" },
    "auto": { meaning: "mobil", type: "Kata Benda" },
    "stau": { meaning: "kemacetan", type: "Kata Benda" },
    "nervig": { meaning: "menjengkelkan", type: "Kata Sifat" },
    "alternativen": { meaning: "alternatif", type: "Kata Benda" },
    "fahrrad": { meaning: "sepeda", type: "Kata Benda" },
    "e-scooter": { meaning: "skuter listrik", type: "Kata Benda" },
    "öffentliche": { meaning: "umum", type: "Kata Sifat" },
    "verkehrsmittel": { meaning: "alat transportasi", type: "Kata Benda" },
    "umweltfreundlich": { meaning: "ramah lingkungan", type: "Kata Sifat" },
    "gesund": { meaning: "sehat", type: "Kata Sifat" },
    "app": { meaning: "aplikasi", type: "Kata Benda" },
    "mieten": { meaning: "menyewa", type: "Kata Kerja" },
    "bequem": { meaning: "nyaman", type: "Kata Sifat" },
    "arbeitsweg": { meaning: "perjalanan ke tempat kerja", type: "Kata Benda" },
    "dach": { meaning: "atap", type: "Kata Benda" },
    "idee": { meaning: "ide", type: "Kata Benda" },
    "pendler": { meaning: "komuter", type: "Kata Benda" },
    "fahren": { meaning: "pergi/berkendara", type: "Kata Kerja" },
    "schnell": { meaning: "cepat", type: "Kata Sifat" },
    "staufrei": { meaning: "bebas macet", type: "Kata Sifat" },
    "zukunft": { meaning: "masa depan", type: "Kata Benda" },
    "luft": { meaning: "udara", type: "Kata Benda" },
    "sauber": { meaning: "bersih", type: "Kata Sifat" }
  };

  const renderInteractiveText = (text: string) => {
    return text.split(' ').map((word, index) => {
      const cleanWord = word.replace(/[.,?!:;]/g, '').toLowerCase();
      const punctuationMatch = word.match(/[.,?!:;]+$/);
      const punctuation = punctuationMatch ? punctuationMatch[0] : '';
      const baseWord = word.replace(/[.,?!:;]+$/, '');
      
      const entry = dictionary[cleanWord];

      if (entry) {
        const wordId = `${text.substring(0,10)}-${index}`;
        const isActive = activeWord === wordId;
        return (
          <span 
            key={index} 
            className="group relative inline-block mx-[2px] cursor-help"
            onClick={() => setActiveWord(isActive ? null : wordId)}
            onMouseEnter={() => setActiveWord(wordId)}
            onMouseLeave={() => setActiveWord(null)}
          >
            <span className={`border-b border-dashed transition-colors duration-200 ${isActive ? 'border-sky-500 text-sky-600' : 'border-amber-500 hover:border-sky-500 hover:text-sky-600'}`}>
              {baseWord}
            </span>
            {punctuation}
            <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-slate-900 border border-slate-700 text-white text-xs px-3 py-2 rounded-xl transition-all duration-200 pointer-events-none z-20 shadow-xl shadow-black/50 ${isActive ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-0'}`}>
              <span className="block font-black text-sky-400 mb-1 text-[10px] tracking-wider uppercase">{entry.type}</span>
              <span className="block font-medium">{entry.meaning}</span>
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
      title: "Text 1: Neue Wege in der Stadt",
      desc: "Lies den Text über den Stadtverkehr.",
      content: (
        <div className="space-y-4 text-slate-800 font-medium leading-relaxed text-lg">
          <p>{renderInteractiveText("Der Verkehr in der Stadt ist oft ein Problem. Viele Menschen nutzen das Auto und stehen im Stau. Das ist nervig und kostet Zeit. Deshalb suchen viele Leute nach Alternativen.")}</p>
          <p>{renderInteractiveText("Das Fahrrad und der E-Scooter sind sehr beliebt. Sie sind umweltfreundlich, gesund und oft schneller als das Auto in der Stadt. Man kann über eine App einfach ein Fahrzeug mieten. Auch öffentliche Verkehrsmittel wie Bus und Bahn sind bequem.")}</p>
        </div>
      ),
      questions: [
        {
          q: "1. Warum ist der Verkehr in der Stadt ein Problem?",
          options: [
            "Weil es zu viele Fahrräder gibt.",
            "Weil viele Menschen im Stau stehen.",
            "Weil die Busse langsam sind."
          ],
          correct: 1
        },
        {
          q: "2. Welche Verkehrsmittel sind umweltfreundlich?",
          options: [
            "Fahrrad und E-Scooter.",
            "Alte Autos.",
            "Flugzeuge."
          ],
          correct: 0
        },
        {
          q: "3. Wie kann man einen E-Scooter mieten?",
          options: [
            "Im Reisezentrum.",
            "Über eine App.",
            "Am Fahrkartenschalter."
          ],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: "Text 2: Arbeitsweg auf dem Dach",
      desc: "Lies den Text über Pendler und die Zukunft.",
      content: (
        <div className="space-y-4 text-slate-800 font-medium leading-relaxed text-lg">
          <p>{renderInteractiveText("Ein Arbeitsweg auf dem Dach? Das klingt komisch, aber es ist eine neue Idee für Pendler. Anstatt auf der Straße zu stehen, sollen Menschen mit speziellen Fahrzeugen über den Dächern fahren.")}</p>
          <p>{renderInteractiveText("Das ist schnell, staufrei und gut für die Zukunft. Die Luft in der Stadt bleibt sauber. Aber diese Idee kostet viel Geld. Wir müssen sehen, ob das wirklich möglich ist.")}</p>
        </div>
      ),
      questions: [
        {
          q: "1. Was ist die Idee für Pendler?",
          options: [
            "Sie sollen zu Hause bleiben.",
            "Sie sollen über den Dächern fahren.",
            "Sie sollen nur noch U-Bahn fahren."
          ],
          correct: 1
        },
        {
          q: "2. Warum ist die Idee gut?",
          options: [
            "Weil es sehr billig ist.",
            "Weil man schnell und staufrei reist.",
            "Weil es keine Autos mehr gibt."
          ],
          correct: 1
        },
        {
          q: "3. Was ist der Nachteil dieser Idee?",
          options: [
            "Sie ist langsam.",
            "Sie ist laut.",
            "Sie kostet viel Geld."
          ],
          correct: 2
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
