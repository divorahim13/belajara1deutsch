"use client";

import React, { useState } from 'react';

export function LesenInteraktiv6() {
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
    "traumberuf": { meaning: "profesi impian", type: "Kata Benda" },
    "arzt": { meaning: "dokter", type: "Kata Benda" },
    "helfen": { meaning: "membantu", type: "Kata Kerja" },
    "programmierer": { meaning: "programmer", type: "Kata Benda" },
    "geld": { meaning: "uang", type: "Kata Benda" },
    "verdienen": { meaning: "menghasilkan (uang)", type: "Kata Kerja" },
    "arbeitsklima": { meaning: "suasana kerja", type: "Kata Benda" },
    "kollegen": { meaning: "rekan kerja", type: "Kata Benda" },
    "chef": { meaning: "bos", type: "Kata Benda" },
    "freizeit": { meaning: "waktu luang", type: "Kata Benda" },
    "flexible": { meaning: "fleksibel", type: "Kata Sifat" },
    "arbeitszeiten": { meaning: "jam kerja", type: "Kata Benda" },
    "moderne": { meaning: "modern", type: "Kata Sifat" },
    "arbeitswelt": { meaning: "dunia kerja", type: "Kata Benda" },
    "verändert": { meaning: "berubah", type: "Kata Kerja" },
    "schnell": { meaning: "cepat", type: "Kata Sifat" },
    "digitalisierung": { meaning: "digitalisasi", type: "Kata Benda" },
    "möglichkeiten": { meaning: "kemungkinan / peluang", type: "Kata Benda" },
    "mobil": { meaning: "berpindah-pindah / mobile", type: "Kata Sifat" },
    "bedeutet": { meaning: "berarti", type: "Kata Kerja" },
    "büro": { meaning: "kantor", type: "Kata Benda" },
    "videokonferenzen": { meaning: "konferensi video", type: "Kata Benda" },
    "ersetzen": { meaning: "menggantikan", type: "Kata Kerja" },
    "besprechungen": { meaning: "rapat", type: "Kata Benda" },
    "nachteile": { meaning: "kerugian", type: "Kata Benda" },
    "erreichbar": { meaning: "dapat dihubungi", type: "Kata Sifat" },
    "wochenende": { meaning: "akhir pekan", type: "Kata Benda" },
    "schwierig": { meaning: "sulit", type: "Kata Sifat" },
    "privatleben": { meaning: "kehidupan pribadi", type: "Kata Benda" },
    "trennen": { meaning: "memisahkan", type: "Kata Kerja" }
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
      title: "Text 1: Traumberuf",
      desc: "Lies den Text über den Traumberuf.",
      content: (
        <div className="space-y-4 text-slate-800 font-medium leading-relaxed text-lg">
          <p>{renderInteractiveText("Für viele Menschen ist der Beruf sehr wichtig. Aber was ist ein Traumberuf? Manche Leute wollen Arzt oder Ärztin werden, weil sie anderen Menschen helfen wollen. Andere möchten lieber als Programmierer arbeiten und viel Geld verdienen.")}</p>
          <p>{renderInteractiveText("Ein Traumberuf macht Spaß und man geht jeden Tag gerne zur Arbeit. Oft ist das Arbeitsklima wichtig. Wenn die Kollegen nett sind und der Chef freundlich ist, arbeitet man besser. Für manche Menschen ist auch die Freizeit wichtig: Sie suchen einen Job mit flexiblen Arbeitszeiten.")}</p>
        </div>
      ),
      questions: [
        {
          q: "1. Viele wollen Arzt werden, ...",
          options: [
            "weil es leicht ist.",
            "weil sie kranken Menschen helfen möchten.",
            "weil sie viel Geld verdienen."
          ],
          correct: 1
        },
        {
          q: "2. Ein Traumberuf bedeutet, ...",
          options: [
            "dass man jeden Tag gerne arbeitet.",
            "dass man nicht arbeiten muss.",
            "dass man immer zu Hause ist."
          ],
          correct: 0
        },
        {
          q: "3. Ein gutes Arbeitsklima heißt, ...",
          options: [
            "dass die Kollegen und der Chef nett sind.",
            "dass es kalt ist.",
            "dass man wenig arbeitet."
          ],
          correct: 0
        },
        {
          q: "4. Manche Leute suchen einen Job, ...",
          options: [
            "der gefährlich ist.",
            "der flexible Arbeitszeiten hat.",
            "der keine Freizeit lässt."
          ],
          correct: 1
        },
        {
          q: "5. Programmierer wollen oft ...",
          options: [
            "in Krankenhäusern arbeiten.",
            "viel Geld verdienen.",
            "kein Geld verdienen."
          ],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: "Text 2: Arbeitswelt",
      desc: "Lies den Text über die moderne Arbeitswelt.",
      content: (
        <div className="space-y-4 text-slate-800 font-medium leading-relaxed text-lg">
          <p>{renderInteractiveText("Die moderne Arbeitswelt verändert sich sehr schnell. Die Digitalisierung bringt neue Möglichkeiten. Viele Menschen arbeiten heute mobil. Das bedeutet, sie müssen nicht jeden Tag ins Büro fahren. Sie arbeiten zu Hause oder in einem Café. Videokonferenzen ersetzen normale Besprechungen.")}</p>
          <p>{renderInteractiveText("Aber es gibt auch Nachteile. Wer mobil arbeitet, ist oft immer erreichbar. Man liest E-Mails auch am Abend oder am Wochenende. Es ist manchmal schwierig, Arbeit und Privatleben zu trennen.")}</p>
        </div>
      ),
      questions: [
        {
          q: "1. Durch die Digitalisierung gibt es neue Möglichkeiten.",
          options: ["Richtig", "Falsch"],
          correct: 0
        },
        {
          q: "2. Alle Menschen müssen heute jeden Tag ins Büro fahren.",
          options: ["Richtig", "Falsch"],
          correct: 1
        },
        {
          q: "3. Videokonferenzen sind heute normal.",
          options: ["Richtig", "Falsch"],
          correct: 0
        },
        {
          q: "4. Mobil arbeiten hat nur Vorteile.",
          options: ["Richtig", "Falsch"],
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
