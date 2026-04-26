"use client";

import React, { useState } from 'react';

export default function LesenInteraktiv11() {
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
    "bauernhof": { meaning: "rumah pertanian", type: "Kata Benda" },
    "schwarzwald": { meaning: "Black Forest", type: "Tempat" },
    "einsamen": { meaning: "kesepian/terpencil", type: "Kata Sifat" },
    "dorf": { meaning: "desa", type: "Kata Benda" },
    "entschieden": { meaning: "memutuskan", type: "Kata Kerja (Partizip II)" },
    "bereuen": { meaning: "menyesal", type: "Kata Kerja" },
    "produzieren": { meaning: "memproduksi", type: "Kata Kerja" },
    "obst": { meaning: "buah", type: "Kata Benda" },
    "gemüse": { meaning: "sayuran", type: "Kata Benda" },
    "kutsche": { meaning: "kereta kuda", type: "Kata Benda" },
    "räume": { meaning: "ruangan", type: "Kata Benda" },
    "niedrig": { meaning: "rendah", type: "Kata Sifat" },
    "möbel": { meaning: "perabot", type: "Kata Benda" },
    "altmodisch": { meaning: "kuno", type: "Kata Sifat" },
    "heizen": { meaning: "memanaskan", type: "Kata Kerja" },
    "holz": { meaning: "kayu", type: "Kata Benda" },
    "notfall": { meaning: "keadaan darurat", type: "Kata Benda" },
    "anstrengend": { meaning: "melelahkan", type: "Kata Sifat" },
    "genießen": { meaning: "menikmati", type: "Kata Kerja" },
    "sprichwort": { meaning: "peribahasa", type: "Kata Benda" },
    "besorgen": { meaning: "mengurus/melakukan", type: "Kata Kerja" },
    "verschiebe": { meaning: "menunda", type: "Kata Kerja" },
    "effektiv": { meaning: "efektif", type: "Kata Sifat" },
    "enttäuschungen": { meaning: "kekecewaan", type: "Kata Benda" },
    "heilt": { meaning: "menyembuhkan", type: "Kata Kerja" },
    "wunden": { meaning: "luka", type: "Kata Benda" },
    "weile": { meaning: "beberapa waktu", type: "Kata Benda" }
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
      title: "Leben wie damals",
      desc: "Lies den Text über das Leben von Familie Ketterer.",
      content: (
        <div className="space-y-6 text-slate-800 font-medium leading-relaxed text-lg">
          <div className="bg-white p-4 rounded-xl border border-slate-300">
            <p>{renderInteractiveText("Familie Ketterer lebt auf einem einsamen Bauernhof im Schwarzwald. Das Leben dort ist einfacher als das moderne Leben. Der Hof liegt weit weg vom nächsten Dorf. Das letzte Stück kann man nicht mit dem Auto fahren, man muss zu Fuß gehen. Die Familie hat sich vor sechs Jahren für dieses Leben entschieden und bereut die Entscheidung nicht. Sie produzieren Obst, Gemüse, Fleisch und Brot selbst. Sie haben kein Auto, nur zwei Pferde. Zum Einkaufen fahren sie mit der Kutsche oder mit dem Fahrrad. Das Haus ist alt, die Räume sind niedrig, die Möbel sind altmodisch. Eine Waschmaschine haben sie nicht. Sie machen Feuer und heizen mit Holz. Sie haben keinen Fernseher und keine Handys, aber einen alten Telefonapparat für Notfälle. Das Leben ist anstrengend, aber nicht stressig. Sie genießen es.")}</p>
          </div>
        </div>
      ),
      questions: [
        {
          id: 1,
          question: "Wo liegt der Bauernhof von Familie Ketterer?",
          options: ["In einem großen Dorf.", "In einer Stadt.", "Einsam im Schwarzwald."],
          correctAnswer: 2,
          explanation: "Der Bauernhof liegt einsam im Schwarzwald, weit weg vom nächsten Dorf."
        },
        {
          id: 2,
          question: "Was produziert die Familie selbst?",
          options: ["Autos und Fahrräder.", "Obst, Gemüse, Fleisch und Brot.", "Holz und Möbel."],
          correctAnswer: 1,
          explanation: "Sie produzieren Obst, Gemüse, Fleisch und Brot selbst."
        },
        {
          id: 3,
          question: "Wie fahren sie zum Einkaufen?",
          options: ["Mit dem Auto.", "Mit dem Zug.", "Mit der Kutsche oder dem Fahrrad."],
          correctAnswer: 2,
          explanation: "Sie haben kein Auto, sie fahren mit der Kutsche oder mit dem Fahrrad."
        },
        {
          id: 4,
          question: "Was haben sie NICHT im Haus?",
          options: ["Einen alten Telefonapparat.", "Holz.", "Einen Fernseher und eine Waschmaschine."],
          correctAnswer: 2,
          explanation: "Eine Waschmaschine haben sie nicht, und sie haben keinen Fernseher und keine Handys."
        }
      ]
    },
    {
      id: 2,
      title: "Sprichwörter zum Thema Zeit",
      desc: "Lies die deutschen Sprichwörter und finde ihre Bedeutung heraus.",
      content: (
        <div className="space-y-6 text-slate-800 font-medium leading-relaxed text-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border-l-4 border-l-blue-500 shadow-sm">
              <h5 className="font-black text-slate-900 mb-2">1. Morgenstund' hat Gold im Mund.</h5>
              <p className="text-slate-600 text-sm">{renderInteractiveText("Bedeutung: Am Morgen kann man besonders gut arbeiten und viel schaffen.")}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border-l-4 border-l-blue-500 shadow-sm">
              <h5 className="font-black text-slate-900 mb-2">2. Zeit ist Geld.</h5>
              <p className="text-slate-600 text-sm">{renderInteractiveText("Bedeutung: Man sollte seine Zeit effektiv nutzen.")}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border-l-4 border-l-blue-500 shadow-sm">
              <h5 className="font-black text-slate-900 mb-2">3. Was du heute kannst besorgen, das verschiebe nicht auf morgen.</h5>
              <p className="text-slate-600 text-sm">{renderInteractiveText("Bedeutung: Man soll Dinge am besten sofort erledigen.")}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border-l-4 border-l-blue-500 shadow-sm">
              <h5 className="font-black text-slate-900 mb-2">4. Die Zeit heilt alle Wunden.</h5>
              <p className="text-slate-600 text-sm">{renderInteractiveText("Bedeutung: Wenn viel Zeit vergangen ist, vergisst man auch Enttäuschungen und Schmerzen.")}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border-l-4 border-l-blue-500 shadow-sm">
              <h5 className="font-black text-slate-900 mb-2">5. Kommt Zeit, kommt Rat.</h5>
              <p className="text-slate-600 text-sm">{renderInteractiveText("Bedeutung: Man findet die Lösung für ein Problem, wenn man wartet.")}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border-l-4 border-l-blue-500 shadow-sm">
              <h5 className="font-black text-slate-900 mb-2">6. Gut Ding will Weile haben.</h5>
              <p className="text-slate-600 text-sm">{renderInteractiveText("Bedeutung: Wenn etwas gut werden soll, braucht man Zeit.")}</p>
            </div>
          </div>
        </div>
      ),
      questions: [
        {
          id: 1,
          question: "Welches Sprichwort bedeutet, dass man Dinge sofort erledigen soll?",
          options: [
            "Morgenstund' hat Gold im Mund.",
            "Was du heute kannst besorgen, das verschiebe nicht auf morgen.",
            "Gut Ding will Weile haben."
          ],
          correctAnswer: 1,
          explanation: "Dieses Sprichwort warnt davor, Aufgaben aufzuschieben (verschieben)."
        },
        {
          id: 2,
          question: "Sie sind sehr traurig nach einer Trennung. Ihre Freundin sagt:",
          options: [
            "Zeit ist Geld.",
            "Die Zeit heilt alle Wunden.",
            "Morgenstund' hat Gold im Mund."
          ],
          correctAnswer: 1,
          explanation: "\"Die Zeit heilt alle Wunden\" bedeutet, dass man Schmerzen und Enttäuschungen nach einiger Zeit vergisst."
        },
        {
          id: 3,
          question: "Sie bauen ein Haus und es dauert sehr lange. Ihr Freund sagt:",
          options: [
            "Gut Ding will Weile haben.",
            "Zeit ist Geld.",
            "Kommt Zeit, kommt Rat."
          ],
          correctAnswer: 0,
          explanation: "\"Gut Ding will Weile haben\" bedeutet, dass Qualität Zeit braucht (Weile = waktu)."
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
