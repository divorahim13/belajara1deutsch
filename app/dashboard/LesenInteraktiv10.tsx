"use client";

import React, { useState } from 'react';

export default function LesenInteraktiv10() {
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
    "zimmer": { meaning: "kamar", type: "Kata Benda" },
    "frei": { meaning: "bebas/kosong", type: "Kata Sifat" },
    "möbliert": { meaning: "berperabot", type: "Kata Sifat" },
    "nebenkosten": { meaning: "biaya tambahan", type: "Kata Benda" },
    "monat": { meaning: "bulan", type: "Kata Benda" },
    "lage": { meaning: "lokasi", type: "Kata Benda" },
    "außerhalb": { meaning: "di luar", type: "Preposisi" },
    "wohl": { meaning: "nyaman", type: "Adverbia" },
    "ausgepackt": { meaning: "membongkar", type: "Kata Kerja (Partizip II)" },
    "vorbereitet": { meaning: "mempersiapkan", type: "Kata Kerja (Partizip II)" },
    "kisten": { meaning: "kotak", type: "Kata Benda" },
    "gepackt": { meaning: "mengepak", type: "Kata Kerja (Partizip II)" },
    "gekündigt": { meaning: "berhenti/membatalkan", type: "Kata Kerja (Partizip II)" },
    "verabschiedet": { meaning: "berpamitan", type: "Kata Kerja (Partizip II)" },
    "anmelden": { meaning: "mendaftar", type: "Kata Kerja" },
    "zeugnis": { meaning: "sertifikat/nilai", type: "Kata Benda" },
    "gefehlt": { meaning: "kurang", type: "Kata Kerja (Partizip II)" },
    "zulassung": { meaning: "penerimaan", type: "Kata Benda" },
    "studium": { meaning: "studi", type: "Kata Benda" },
    "unterhalten": { meaning: "berbincang", type: "Kata Kerja (Partizip II)" },
    "verirrt": { meaning: "tersesat", type: "Kata Kerja (Partizip II)" },
    "zentrum": { meaning: "pusat kota", type: "Kata Benda" },
    "auskennen": { meaning: "mengenal/paham tempat", type: "Kata Kerja" },
    "gespannt": { meaning: "penasaran/tegang", type: "Kata Sifat" },
    "briefkasten": { meaning: "kotak surat", type: "Kata Benda" },
    "bauernhof": { meaning: "peternakan", type: "Kata Benda" },
    "schafe": { meaning: "domba", type: "Kata Benda" },
    "hunde": { meaning: "anjing", type: "Kata Benda" },
    "tierheim": { meaning: "penampungan hewan", type: "Kata Benda" },
    "weggelaufen": { meaning: "kabur", type: "Kata Kerja (Partizip II)" },
    "plötzlich": { meaning: "tiba-tiba", type: "Adverbia" }
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
      title: "Zimmer frei & Umzug",
      desc: "Lies die Nachrichten über Wohnungssuche und Umzug.",
      content: (
        <div className="space-y-6 text-slate-800 font-medium leading-relaxed text-lg">
          <div className="bg-white p-4 rounded-xl border border-slate-300">
            <h5 className="font-bold text-sky-700 mb-1">E-Mail von Laura an Clara:</h5>
            <p>{renderInteractiveText("Hallo Clara, endlich habe ich ein Zimmer für das Erasmus-Semester gefunden! Es ist möbliert und die Nebenkosten sind im Preis für den Monat. Die Lage ist etwas außerhalb, aber ich fühle mich wohl. Ich habe schon Kisten gepackt und meinen Job gekündigt. Hast du dich schon an der Uni anmelden können? Als mir ein Zeugnis gefehlt hat, habe ich sofort eine E-Mail geschrieben. Zum Glück habe ich die Zulassung für das Studium bekommen!")}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-300">
            <h5 className="font-bold text-sky-700 mb-1">Nachricht von Tim an Max:</h5>
            <p>{renderInteractiveText("Hey Max, ich bin in der neuen WG! Wir haben gestern alle zusammen gegessen und uns super unterhalten. Ich habe mich am ersten Tag verirrt, weil ich mich im Zentrum noch nicht so gut auskennen kann. Alle Studierende sind nett. Ich bin gespannt auf die erste Vorlesung. Hast du schon Post im Briefkasten gehabt?")}</p>
          </div>
        </div>
      ),
      questions: [
        {
          q: "1. Wo befindet sich Lauras neues Zimmer?",
          options: [
            "Direkt im Stadtzentrum.",
            "Etwas außerhalb der Stadt.",
            "Auf einem Bauernhof."
          ],
          correct: 1
        },
        {
          q: "2. Was hat Laura gemacht, als ihr ein Zeugnis gefehlt hat?",
          options: [
            "Sie hat sofort eine E-Mail geschrieben.",
            "Sie hat sich verabschiedet.",
            "Sie hat das Studium abgebrochen."
          ],
          correct: 0
        },
        {
          q: "3. Warum hat Tim sich verirrt?",
          options: [
            "Weil die WG sehr groß ist.",
            "Weil es nachts dunkel war.",
            "Weil er sich im Zentrum noch nicht gut auskennt."
          ],
          correct: 2
        }
      ]
    },
    {
      id: 2,
      title: "Tiergeschichten",
      desc: "Lies die kurzen Geschichten über Haustiere.",
      content: (
        <div className="space-y-6 text-slate-800 font-medium leading-relaxed text-lg">
          <div className="bg-white p-4 rounded-xl border border-slate-300">
            <p>{renderInteractiveText("Als ich ein Kind war, haben wir auf einem Bauernhof gelebt. Wir hatten viele Schafe und auch zwei Hunde. Immer wenn einer der Hunde weggelaufen ist, haben wir ihn schnell wiedergefunden. Plötzlich war einer der Hunde krank. Wir haben ihn ins Tierheim gebracht, weil wir ihm nicht helfen konnten.")}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-300">
            <p>{renderInteractiveText("Wenn ich abends nach Hause komme, freut sich meine Katze immer. Als sie letzte Woche krank war, bin ich sofort zum Tierarzt gefahren. Jetzt geht es ihr wieder gut, und sie spielt im Garten.")}</p>
          </div>
        </div>
      ),
      questions: [
        {
          q: "1. Welche Tiere gab es auf dem Bauernhof?",
          options: [
            "Kühe und Pferde.",
            "Schafe und Hunde.",
            "Katzen und Vögel."
          ],
          correct: 1
        },
        {
          q: "2. Was ist passiert, wenn ein Hund weggelaufen ist?",
          options: [
            "Er wurde nie wiedergefunden.",
            "Sie haben ihn schnell wiedergefunden.",
            "Er wurde ins Tierheim gebracht."
          ],
          correct: 1
        },
        {
          q: "3. Was hat die Person gemacht, als die Katze krank war?",
          options: [
            "Sie ist sofort zum Tierarzt gefahren.",
            "Sie hat die Katze verkauft.",
            "Sie hat nichts gemacht."
          ],
          correct: 0
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
