"use client";

import React, { useState } from 'react';

export function LesenInteraktiv1() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [isCorrect, setIsCorrect] = useState<Record<number, boolean | null>>({});

  const [activeWord, setActiveWord] = useState<string | null>(null);

  // Reset state on tab change
  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setSelectedAnswers({});
    setIsCorrect({});
    setActiveWord(null);
  };

  const dictionary: Record<string, { meaning: string, type: string }> = {
    // Übung 1
    "stressig": { meaning: "penuh stres", type: "Kata Sifat" },
    "wochenende": { meaning: "akhir pekan", type: "Kata Benda" },
    "samstagmorgen": { meaning: "Sabtu pagi", type: "Kata Benda" },
    "wohnung": { meaning: "apartemen / tempat tinggal", type: "Kata Benda" },
    "aufgeräumt": { meaning: "merapikan (Partizip II)", type: "Kata Kerja" },
    "danach": { meaning: "setelah itu", type: "Adverbia" },
    "supermarkt": { meaning: "supermarket", type: "Kata Benda" },
    "gefahren": { meaning: "pergi / mengendarai (Partizip II)", type: "Kata Kerja" },
    "weil": { meaning: "karena", type: "Konjungsi" },
    "lebensmittel": { meaning: "bahan makanan", type: "Kata Benda" },
    "kaufen": { meaning: "membeli", type: "Kata Kerja" },
    "musste": { meaning: "harus (Präteritum)", type: "Kata Kerja (Modal)" },
    "nachmittag": { meaning: "sore hari", type: "Kata Benda" },
    "freunde": { meaning: "teman-teman", type: "Kata Benda" },
    "café": { meaning: "kafe", type: "Kata Benda" },
    "getroffen": { meaning: "bertemu (Partizip II)", type: "Kata Kerja" },
    "kaffee": { meaning: "kopi", type: "Kata Benda" },
    "getrunken": { meaning: "minum (Partizip II)", type: "Kata Kerja" },
    "viel": { meaning: "banyak", type: "Adjektiva" },
    "gelacht": { meaning: "tertawa (Partizip II)", type: "Kata Kerja" },
    "leider": { meaning: "sayangnya", type: "Adverbia" },
    "spät": { meaning: "terlambat / telat", type: "Kata Sifat" },
    "gekommen": { meaning: "datang (Partizip II)", type: "Kata Kerja" },
    "stark": { meaning: "kuat / deras", type: "Kata Sifat" },
    "geregnet": { meaning: "hujan (Partizip II)", type: "Kata Kerja" },
    "abend": { meaning: "malam hari", type: "Kata Benda" },
    "extrem": { meaning: "sangat / ekstrem", type: "Adverbia" },
    "müde": { meaning: "lelah", type: "Kata Sifat" },
    "sonntag": { meaning: "Minggu", type: "Kata Benda" },
    "ganzen": { meaning: "seluruh / sepanjang", type: "Kata Sifat" },
    "tag": { meaning: "hari", type: "Kata Benda" },
    "prüfung": { meaning: "ujian", type: "Kata Benda" },
    "gelernt": { meaning: "belajar (Partizip II)", type: "Kata Kerja" },
    "denn": { meaning: "karena / sebab", type: "Konjungsi" },
    "montag": { meaning: "Senin", type: "Kata Benda" },
    "wichtigen": { meaning: "penting", type: "Kata Sifat" },
    "test": { meaning: "tes / ujian", type: "Kata Benda" },

    // Übung 2
    "letzter": { meaning: "terakhir", type: "Kata Sifat" },
    "urlaub": { meaning: "liburan", type: "Kata Benda" },
    "berlin": { meaning: "Berlin", type: "Kata Benda (Nama Kota)" },
    "schön": { meaning: "indah / bagus", type: "Kata Sifat" },
    "besucht": { meaning: "mengunjungi (Partizip II)", type: "Kata Kerja" },
    "museum": { meaning: "museum", type: "Kata Benda" },
    "gesehen": { meaning: "melihat (Partizip II)", type: "Kata Kerja" },
    "restaurant": { meaning: "restoran", type: "Kata Benda" },
    "gegessen": { meaning: "makan (Partizip II)", type: "Kata Kerja" },
    "wetter": { meaning: "cuaca", type: "Kata Benda" },
    "kalt": { meaning: "dingin", type: "Kata Sifat" },
    "jacke": { meaning: "jaket", type: "Kata Benda" },
    "gekauft": { meaning: "membeli (Partizip II)", type: "Kata Kerja" },
    "hotel": { meaning: "hotel", type: "Kata Benda" },
    "teuer": { meaning: "mahal", type: "Kata Sifat" },
    "zimmer": { meaning: "kamar", type: "Kata Benda" },
    "klein": { meaning: "kecil", type: "Kata Sifat" },

    // Übung 3
    "kranker": { meaning: "sakit", type: "Kata Sifat" },
    "hund": { meaning: "anjing", type: "Kata Benda" },
    "party": { meaning: "pesta", type: "Kata Benda" },
    "kommen": { meaning: "datang", type: "Kata Kerja" },
    "tierarzt": { meaning: "dokter hewan", type: "Kata Benda" },
    "gegangen": { meaning: "pergi (Partizip II)", type: "Kata Kerja" },
    "schmerzen": { meaning: "rasa sakit", type: "Kata Benda" },
    "gehabt": { meaning: "memiliki (Partizip II dari haben)", type: "Kata Kerja" },
    "medikamente": { meaning: "obat-obatan", type: "Kata Benda" },
    "gegeben": { meaning: "memberikan (Partizip II)", type: "Kata Kerja" },
    "jetzt": { meaning: "sekarang", type: "Adverbia" },
    "schläft": { meaning: "tidur (dari schlafen)", type: "Kata Kerja" },
    "besser": { meaning: "lebih baik", type: "Kata Sifat" }
  };

  const renderInteractiveText = (text: string) => {
    return text.split(' ').map((word, index) => {
      const cleanWord = word.replace(/[.,?!:;]/g, '').toLowerCase();
      const punctuationMatch = word.match(/[.,?!:;]+$/);
      const punctuation = punctuationMatch ? punctuationMatch[0] : '';
      const baseWord = word.replace(/[.,?!:;]+$/, '');
      
      const entry = dictionary[cleanWord];

      if (entry) {
        const wordId = `${text}-${index}`;
        const isActive = activeWord === wordId;
        return (
          <span 
            key={index} 
            className="group relative inline-block mx-[2px] cursor-help"
            onClick={() => setActiveWord(isActive ? null : wordId)}
            onMouseEnter={() => setActiveWord(wordId)}
            onMouseLeave={() => setActiveWord(null)}
          >
            <span className={`border-b border-dashed transition-colors duration-200 ${isActive ? 'border-pink-500 text-pink-600' : 'border-amber-500 hover:border-pink-500 hover:text-pink-600'}`}>
              {baseWord}
            </span>
            {punctuation}
            <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-slate-900 border border-slate-700 text-white text-xs px-3 py-2 rounded-xl transition-all duration-200 pointer-events-none z-20 shadow-xl shadow-black/50 ${isActive ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-0'}`}>
              <span className="block font-black text-pink-400 mb-1 text-[10px] tracking-wider uppercase">{entry.type}</span>
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
      title: "Übung 1: Ein stressiges Wochenende",
      desc: "Bacalah teks tentang akhir pekan Anna dan jawab pertanyaannya.",
      content: (
        <p className="text-amber-900 font-medium leading-relaxed text-lg">
          {renderInteractiveText("Hallo! Ich bin Anna. Letztes Wochenende war sehr stressig. Am Samstagmorgen habe ich meine Wohnung aufgeräumt. Danach bin ich in den Supermarkt gefahren, weil ich Lebensmittel kaufen musste. Am Nachmittag habe ich meine Freunde im Café getroffen. Wir haben Kaffee getrunken und viel gelacht. Leider ist mein Bus spät gekommen, weil es stark geregnet hat. Am Abend war ich dann extrem müde. Am Sonntag habe ich den ganzen Tag für meine Prüfung gelernt, denn am Montag schreibe ich einen wichtigen Test.")}
        </p>
      ),
      questions: [
        {
          q: "1. Warum ist Anna am Samstag in den Supermarkt gefahren?",
          options: [
            "Weil sie ihre Freunde treffen wollte.",
            "Weil sie Lebensmittel kaufen musste.",
            "Weil sie einen Kuchen backen wollte."
          ],
          correct: 1
        },
        {
          q: "2. Warum ist der Bus spät gekommen?",
          options: [
            "Weil es einen Unfall gab.",
            "Weil der Busfahrer krank war.",
            "Weil es stark geregnet hat."
          ],
          correct: 2
        },
        {
          q: "3. Was hat Anna am Sonntag gemacht?",
          options: [
            "Sie hat den ganzen Tag für ihre Prüfung gelernt.",
            "Sie hat ihre Wohnung aufgeräumt.",
            "Sie hat Kaffee getrunken und gelacht."
          ],
          correct: 0
        }
      ]
    },
    {
      id: 2,
      title: "Übung 2: Mein letzter Urlaub",
      desc: "Bacalah cerita liburan ke Berlin ini dengan teliti.",
      content: (
        <p className="text-amber-900 font-medium leading-relaxed text-lg">
          {renderInteractiveText("Mein letzter Urlaub war sehr schön. Ich bin nach Berlin gefahren. Am ersten Tag habe ich viele Museen besucht und ich habe das Brandenburger Tor gesehen. Am Abend habe ich in einem guten Restaurant gegessen, weil ich großen Hunger hatte. Leider war das Wetter sehr kalt. Ich habe eine neue Jacke gekauft, weil ich meine Jacke zu Hause vergessen habe. Das Hotel war leider sehr teuer und das Zimmer war zu klein.")}
        </p>
      ),
      questions: [
        {
          q: "1. Wohin ist die Person gefahren?",
          options: [
            "Nach München.",
            "Nach Berlin.",
            "Nach Hamburg."
          ],
          correct: 1
        },
        {
          q: "2. Warum hat die Person im Restaurant gegessen?",
          options: [
            "Weil sie das Essen im Hotel nicht mochte.",
            "Weil sie großen Hunger hatte.",
            "Weil das Wetter kalt war."
          ],
          correct: 1
        },
        {
          q: "3. Warum hat sie eine neue Jacke gekauft?",
          options: [
            "Weil die alte Jacke kaputt war.",
            "Weil sie Jacken liebt.",
            "Weil sie ihre Jacke vergessen hat und es kalt war."
          ],
          correct: 2
        }
      ]
    },
    {
      id: 3,
      title: "Übung 3: Der kranke Hund",
      desc: "Pahami alasan kenapa Lukas tidak datang ke pesta.",
      content: (
        <p className="text-amber-900 font-medium leading-relaxed text-lg">
          {renderInteractiveText("Hallo Thomas! Es tut mir leid, aber ich konnte gestern nicht zu deiner Party kommen. Mein Hund Max war plötzlich sehr krank. Ich bin schnell zum Tierarzt gegangen, weil Max Schmerzen gehabt hat. Der Tierarzt hat ihm Medikamente gegeben. Ich bin den ganzen Abend bei ihm geblieben. Jetzt schläft Max und es geht ihm viel besser. Ich hoffe, deine Party war schön!")}
        </p>
      ),
      questions: [
        {
          q: "1. Warum ist Lukas nicht zur Party gekommen?",
          options: [
            "Weil er arbeiten musste.",
            "Weil sein Hund krank war.",
            "Weil er keine Zeit hatte."
          ],
          correct: 1
        },
        {
          q: "2. Was hat der Tierarzt gemacht?",
          options: [
            "Er hat Max operiert.",
            "Er hat Max Medikamente gegeben.",
            "Er hat Lukas nach Hause geschickt."
          ],
          correct: 1
        },
        {
          q: "3. Wie geht es dem Hund jetzt?",
          options: [
            "Er schläft und es geht ihm besser.",
            "Er ist noch beim Tierarzt.",
            "Er spielt im Garten."
          ],
          correct: 0
        }
      ]
    }
  ];

  const currentStory = stories[activeTab];

  const handleCheck = (qIndex: number, optIndex: number) => {
    setSelectedAnswers(prev => ({...prev, [qIndex]: optIndex}));
    setIsCorrect(prev => ({...prev, [qIndex]: optIndex === currentStory.questions[qIndex].correct}));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {stories.map((story, idx) => (
          <button
            key={story.id}
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
        {currentStory.content}
      </div>

      <div className="space-y-6">
        {currentStory.questions.map((item, qIndex) => (
          <div key={qIndex} className="clay-card p-8 bg-white border-slate-300">
            <h4 className="text-xl font-bold text-slate-800 mb-6">{item.q}</h4>
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
