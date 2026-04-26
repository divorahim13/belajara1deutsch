"use client";

import React, { useState } from 'react';

export function LesenInteraktiv8() {
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
    "gebärdendolmetscher": { meaning: "juru bahasa isyarat laki-laki", type: "Kata Benda" },
    "kommunikation": { meaning: "komunikasi", type: "Kata Benda" },
    "klappt": { meaning: "berhasil / berjalan lancar", type: "Kata Kerja" },
    "dolmetscht": { meaning: "menerjemahkan lisan", type: "Kata Kerja" },
    "behörden": { meaning: "kantor pemerintahan", type: "Kata Benda" },
    "gehörlosen": { meaning: "orang tunarungu", type: "Kata Benda" },
    "mündlich": { meaning: "secara lisan", type: "Kata Sifat" },
    "sprachwissenschaften": { meaning: "linguistik", type: "Kata Benda" },
    "vollzeit": { meaning: "penuh waktu", type: "Kata Benda" },
    "programmiererin": { meaning: "programmer perempuan", type: "Kata Benda" },
    "aufgaben": { meaning: "tugas-tugas", type: "Kata Benda" },
    "nutzer": { meaning: "pengguna", type: "Kata Benda" },
    "feedback": { meaning: "umpan balik", type: "Kata Benda" },
    "freiberuflich": { meaning: "pekerja lepas (freelance)", type: "Kata Sifat" },
    "übersetzerin": { meaning: "penerjemah perempuan", type: "Kata Benda" },
    "dokumente": { meaning: "dokumen-dokumen", type: "Kata Benda" },
    "verträge": { meaning: "kontrak-kontrak", type: "Kata Benda" },
    "prospekte": { meaning: "brosur-brosur", type: "Kata Benda" },
    "aufträge": { meaning: "tugas / proyek pesanan", type: "Kata Benda" },
    "sorgen": { meaning: "kekhawatiran", type: "Kata Benda" },
    "verein": { meaning: "organisasi / perkumpulan", type: "Kata Benda" },
    "nachbarn": { meaning: "tetangga-tetangga", type: "Kata Benda" },
    "viertel": { meaning: "lingkungan perumahan", type: "Kata Benda" },
    "freiwillige": { meaning: "relawan", type: "Kata Benda" },
    "talente": { meaning: "bakat", type: "Kata Benda" },
    "helfen": { meaning: "membantu", type: "Kata Kerja" },
    "projekte": { meaning: "proyek-proyek", type: "Kata Benda" },
    "garten": { meaning: "kebun", type: "Kata Benda" },
    "dankeschön": { meaning: "ucapan terima kasih", type: "Kata Benda" },
    "einladung": { meaning: "undangan", type: "Kata Benda" },
    "reparieren": { meaning: "memperbaiki", type: "Kata Kerja" },
    "experten": { meaning: "para ahli", type: "Kata Benda" },
    "kaputte": { meaning: "rusak", type: "Kata Sifat" },
    "dinge": { meaning: "barang-barang", type: "Kata Benda" },
    "teuer": { meaning: "mahal", type: "Kata Sifat" }
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
      title: "Text 1: Mit Sprache arbeiten",
      desc: "Lies den Text über Berufe, die mit Sprachen zu tun haben.",
      content: (
        <div className="space-y-4 text-slate-800 font-medium leading-relaxed text-lg">
          <p>{renderInteractiveText("Tom Dahl ist Gebärdendolmetscher. Er sorgt dafür, dass die Kommunikation zwischen Menschen klappt. Er dolmetscht in Behörden, bei privaten Festen und beim Arzt. Er kommuniziert mit Gehörlosen über Video und gibt die Informationen mündlich weiter.")}</p>
          <p>{renderInteractiveText("Carina Holst hat Sprachwissenschaften studiert. Jetzt arbeitet sie in Vollzeit als Programmiererin für eine Sprachlern-App. Sie programmiert Aufgaben und Übungen. Die App soll den Nutzern sinnvolles Feedback geben.")}</p>
          <p>{renderInteractiveText("Magdalena Duda arbeitet freiberuflich als Übersetzerin. Sie übersetzt Dokumente, Verträge, Prospekte und Filme. Filme übersetzen macht ihr am meisten Spaß. Manchmal hat sie aber wenige Aufträge und macht sich Sorgen.")}</p>
        </div>
      ),
      questions: [
        {
          q: "1. Was macht Tom Dahl beruflich?",
          options: [
            "Er ist Gebärdendolmetscher.",
            "Er ist Programmierer.",
            "Er ist Übersetzer."
          ],
          correct: 0
        },
        {
          q: "2. Wo arbeitet Carina Holst jetzt?",
          options: [
            "In einer Schule als Lehrerin.",
            "Für eine Sprachlern-App als Programmiererin.",
            "In einer Behörde."
          ],
          correct: 1
        },
        {
          q: "3. Was übersetzt Magdalena Duda am liebsten?",
          options: [
            "Verträge.",
            "Dokumente.",
            "Filme."
          ],
          correct: 2
        }
      ]
    },
    {
      id: 2,
      title: "Text 2: Voneinander lernen",
      desc: "Lies den Text über soziale Projekte in einem Viertel.",
      content: (
        <div className="space-y-4 text-slate-800 font-medium leading-relaxed text-lg">
          <p>{renderInteractiveText("Der Verein 'Nachbarn für Nachbarn' macht das Leben im Viertel besser. Er existiert seit 10 Jahren und hat über 50 Freiwillige. Die Idee ist einfach: Jede Person hat Talente. Menschen können voneinander lernen und sich helfen.")}</p>
          <p>{renderInteractiveText("Es gibt viele Projekte. Beim Projekt 'Tausche Essen für Hilfe' hilft man im Garten oder am Computer. Als Dankeschön bekommt man eine Einladung zum Essen. Beim 'Repair-Café' reparieren Experten kaputte Dinge, weil Reparaturen oft zu teuer sind.")}</p>
        </div>
      ),
      questions: [
        {
          q: "1. Wie lange existiert der Verein 'Nachbarn für Nachbarn'?",
          options: [
            "Seit 5 Jahren.",
            "Seit 10 Jahren.",
            "Seit 20 Jahren."
          ],
          correct: 1
        },
        {
          q: "2. Was bekommt man beim Projekt 'Tausche Essen für Hilfe' als Dankeschön?",
          options: [
            "Geld.",
            "Neues Werkzeug.",
            "Eine Einladung zum Essen."
          ],
          correct: 2
        },
        {
          q: "3. Warum bringen Menschen kaputte Dinge ins Repair-Café?",
          options: [
            "Weil sie dort etwas spenden müssen.",
            "Weil neue Dinge sehr billig sind.",
            "Weil Reparaturen oft zu teuer sind."
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
