"use client";

import React, { useState } from 'react';

export default function LesenInteraktiv12() {
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
    "serie": { meaning: "serial", type: "Kata Benda" },
    "gesellschaft": { meaning: "masyarakat", type: "Kata Benda" },
    "kultur": { meaning: "budaya", type: "Kata Benda" },
    "gewalt": { meaning: "kekerasan", type: "Kata Benda" },
    "kriminalität": { meaning: "kriminalitas", type: "Kata Benda" },
    "teure": { meaning: "mahal", type: "Kata Sifat" },
    "schauspieler": { meaning: "aktor", type: "Kata Benda" },
    "bilder": { meaning: "gambar/lukisan", type: "Kata Benda" },
    "passende": { meaning: "cocok/pas", type: "Kata Sifat" },
    "kunstmuseum": { meaning: "museum seni", type: "Kata Benda" },
    "werke": { meaning: "karya", type: "Kata Benda" },
    "jahrhunderten": { meaning: "abad", type: "Kata Benda" },
    "besucher": { meaning: "pengunjung", type: "Kata Benda" },
    "berühmt": { meaning: "terkenal", type: "Kata Sifat" },
    "synchronsprecher": { meaning: "dubber/pengisi suara", type: "Kata Benda" },
    "schloss": { meaning: "istana", type: "Kata Benda" },
    "könig": { meaning: "raja", type: "Kata Benda" },
    "realität": { meaning: "realitas", type: "Kata Benda" },
    "touristen": { meaning: "turis", type: "Kata Benda" },
    "märchenschloss": { meaning: "istana dongeng", type: "Kata Benda" },
    "roman": { meaning: "novel", type: "Kata Benda" },
    "bestseller-liste": { meaning: "daftar penjualan terbaik", type: "Kata Benda" },
    "sprachen": { meaning: "bahasa", type: "Kata Benda" },
    "übersetzt": { meaning: "diterjemahkan", type: "Kata Kerja (Partizip II)" },
    "verfilmung": { meaning: "adaptasi film", type: "Kata Benda" },
    "radiosprecher": { meaning: "penyiar radio", type: "Kata Benda" },
    "stille": { meaning: "keheningan", type: "Kata Benda" },
    "eingeschlafen": { meaning: "tertidur", type: "Kata Kerja (Partizip II)" },
    "nachrichten": { meaning: "berita", type: "Kata Benda" },
    "verpasst": { meaning: "melewatkan", type: "Kata Kerja (Partizip II)" },
    "sammler": { meaning: "kolektor", type: "Kata Benda" },
    "flohmarkt": { meaning: "pasar loak", type: "Kata Benda" },
    "schnäppchen": { meaning: "barang murah/diskon", type: "Kata Benda" },
    "kunstexpertin": { meaning: "pakar seni (perempuan)", type: "Kata Benda" },
    "wertvoll": { meaning: "berharga", type: "Kata Sifat" },
    "wert": { meaning: "nilai", type: "Kata Benda" },
    "bühne": { meaning: "panggung", type: "Kata Benda" },
    "stimme": { meaning: "suara", type: "Kata Benda" },
    "stimmung": { meaning: "suasana", type: "Kata Benda" }
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
      title: "Gute Unterhaltung!",
      desc: "Lies die kurzen Texte über Medien und Kultur in Deutschland.",
      content: (
        <div className="space-y-6 text-slate-800 font-medium leading-relaxed text-lg">
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-sm">
              <h5 className="font-black text-indigo-600 mb-2">Babylon Berlin</h5>
              <p>{renderInteractiveText("Die Serie zeigt Berlin im Jahr 1929. Es ist eine wilde Zeit. Politik, Gesellschaft, Kultur, Gewalt und Kriminalität nehmen zu. Die Serie ist eine sehr teure deutsche Produktion. Sie hat gute Schauspieler, starke Bilder und passende Musik.")}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-sm">
              <h5 className="font-black text-indigo-600 mb-2">Hamburger Kunsthalle</h5>
              <p>{renderInteractiveText("Sie ist das größte Kunstmuseum in Norddeutschland und zeigt Werke aus über acht Jahrhunderten. Besucher können mehr als 700 Werke sehen. Jährlich kommen knapp 400.000 Besucherinnen und Besucher.")}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-sm">
              <h5 className="font-black text-indigo-600 mb-2">Ein Schloss wie sein König</h5>
              <p>{renderInteractiveText("Über König Ludwig II. gibt es viele Geschichten. Er lebte eher in seinen Träumen als in der Realität. Schloss Neuschwanstein passt zu dieser Geschichte. Heute besuchen jährlich über 1,5 Millionen Touristen das Märchenschloss.")}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-sm">
              <h5 className="font-black text-indigo-600 mb-2">Die unendliche Geschichte</h5>
              <p>{renderInteractiveText("Der Roman von Michael Ende war lange Nummer 1 auf der Bestseller-Liste. Das Buch wurde in etwa 40 Sprachen übersetzt. Es gibt eine berühmte Verfilmung von Wolfgang Petersen.")}</p>
            </div>
          </div>
        </div>
      ),
      questions: [
        {
          id: 1,
          question: "Wann spielt die Serie Babylon Berlin?",
          options: ["Im Jahr 1929.", "Im Jahr 2029.", "Im 19. Jahrhundert."],
          correctAnswer: 0,
          explanation: "Die Serie zeigt Berlin im Jahr 1929."
        },
        {
          id: 2,
          question: "Was ist Schloss Neuschwanstein?",
          options: ["Ein Kunstmuseum in Hamburg.", "Ein Märchenschloss, das über 1,5 Millionen Touristen besuchen.", "Ein Bestseller von Michael Ende."],
          correctAnswer: 1,
          explanation: "Schloss Neuschwanstein ist ein Märchenschloss von König Ludwig II., das viele Touristen besuchen."
        },
        {
          id: 3,
          question: "Was wurde in etwa 40 Sprachen übersetzt?",
          options: ["Die Serie Babylon Berlin.", "Die Bilder der Hamburger Kunsthalle.", "Der Roman 'Die unendliche Geschichte'."],
          correctAnswer: 2,
          explanation: "Der Roman von Michael Ende wurde in etwa 40 Sprachen übersetzt."
        }
      ]
    },
    {
      id: 2,
      title: "Kurz gemeldet",
      desc: "Lies die kurzen Meldungen aus dem Radio und der Zeitung.",
      content: (
        <div className="space-y-6 text-slate-800 font-medium leading-relaxed text-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border-l-4 border-l-rose-500 shadow-sm">
              <h5 className="font-black text-slate-900 mb-2">Radiosprecher verschläft Nachrichten</h5>
              <p className="text-slate-600 text-sm">{renderInteractiveText("Peter Veit ist ein bekannter Radiosprecher. Am Morgen war er sehr müde. Im Studio wartete er auf seinen Einsatz. Im Radio waren zwei Minuten Stille. Er ist eingeschlafen und hat die Nachrichten verpasst.")}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border-l-4 border-l-amber-500 shadow-sm">
              <h5 className="font-black text-slate-900 mb-2">Schnäppchen auf dem Flohmarkt</h5>
              <p className="text-slate-600 text-sm">{renderInteractiveText("Karl T. ist Sammler. Er kaufte auf einem Flohmarkt in Wien ein kleines Bild. Es kostete nur 8 Euro. Eine Kunstexpertin bestätigte, dass das Bild sehr alt und wertvoll ist. Der Wert liegt bei über 8.000 Euro.")}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border-l-4 border-l-sky-500 shadow-sm">
              <h5 className="font-black text-slate-900 mb-2">Sängerin ohne Stimme</h5>
              <p className="text-slate-600 text-sm">{renderInteractiveText("Bei einem Konzert hatte eine Sängerin auf der Bühne plötzlich keine Stimme mehr. Die Band spielte weiter. Die Fans sangen viele Lieder selbst. Die Stimmung war trotzdem gut.")}</p>
            </div>
          </div>
        </div>
      ),
      questions: [
        {
          id: 1,
          question: "Warum gab es im Radio zwei Minuten Stille?",
          options: [
            "Das Radio war kaputt.",
            "Der Radiosprecher ist eingeschlafen.",
            "Die Nachrichten waren zu Ende."
          ],
          correctAnswer: 1,
          explanation: "Der Radiosprecher war müde, ist eingeschlafen und hat die Nachrichten verpasst."
        },
        {
          id: 2,
          question: "Was passierte mit dem Bild vom Flohmarkt?",
          options: [
            "Es war eine billige Kopie.",
            "Der Sammler hat es verloren.",
            "Eine Expertin bestätigte, dass es sehr wertvoll ist."
          ],
          correctAnswer: 2,
          explanation: "Das Bild kostete nur 8 Euro, ist aber über 8.000 Euro wert."
        },
        {
          id: 3,
          question: "Wer sang die Lieder beim Konzert?",
          options: [
            "Die Fans.",
            "Die Sängerin.",
            "Die Band."
          ],
          correctAnswer: 0,
          explanation: "Da die Sängerin plötzlich keine Stimme mehr hatte, sangen die Fans die Lieder selbst."
        }
      ]
    }
  ];

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const checkAnswer = (questionId: number, correctAnswer: number) => {
    const selected = selectedAnswers[questionId];
    if (selected === undefined || selected === null) return;
    
    setIsCorrect(prev => ({
      ...prev,
      [questionId]: selected === correctAnswer
    }));
  };

    

  
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
