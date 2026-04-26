"use client";

import React, { useState } from 'react';

export function LesenInteraktiv3() {
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
    "studiere": { meaning: "belajar (di universitas)", type: "Kata Kerja" },
    "professorin": { meaning: "dosen perempuan", type: "Kata Benda" },
    "interessantesten": { meaning: "paling menarik", type: "Kata Sifat (Superlativ)" },
    "langweilig": { meaning: "membosankan", type: "Kata Sifat" },
    "projekt": { meaning: "proyek", type: "Kata Benda" },
    "entwickeln": { meaning: "mengembangkan", type: "Kata Kerja" },
    "studierende": { meaning: "mahasiswa", type: "Kata Benda" },
    "günstig": { meaning: "murah / terjangkau", type: "Kata Sifat" },
    "umfrage": { meaning: "survei / jajak pendapat", type: "Kata Benda" },
    "programmieren": { meaning: "memprogram", type: "Kata Kerja" },
    "später": { meaning: "nanti / kelak", type: "Adverbia" },
    "start-up": { meaning: "perusahaan rintisan", type: "Kata Benda" },
    "gründen": { meaning: "mendirikan", type: "Kata Kerja" },
    "wichtigsten": { meaning: "paling penting", type: "Kata Sifat (Superlativ)" },
    "freizeit": { meaning: "waktu luang", type: "Kata Benda" },
    "weniger": { meaning: "lebih sedikit", type: "Kata Sifat (Komparativ)" },
    "liebsten": { meaning: "paling suka", type: "Kata Sifat (Superlativ)" },
    "draußen": { meaning: "di luar", type: "Adverbia" },
    "natur": { meaning: "alam", type: "Kata Benda" },
    "menschen": { meaning: "orang-orang", type: "Kata Benda" },
    "schönsten": { meaning: "paling indah", type: "Kata Sifat (Superlativ)" },
    "ideen": { meaning: "ide-ide", type: "Kata Benda" },

    // Übung 2
    "unbedingt": { meaning: "mutlak / harus", type: "Adverbia" },
    "fotograf": { meaning: "fotografer", type: "Kata Benda" },
    "liebe": { meaning: "mencintai", type: "Kata Kerja" },
    "kind": { meaning: "anak-anak", type: "Kata Benda" },
    "fotografiert": { meaning: "memotret (Partizip II)", type: "Kata Kerja" },
    "ausbildung": { meaning: "pendidikan vokasi / magang", type: "Kata Benda" },
    "spannender": { meaning: "lebih menegangkan/menarik", type: "Kata Sifat (Komparativ)" },
    "anfang": { meaning: "awal", type: "Kata Benda" },
    "gefallen": { meaning: "menyenangkan / disukai", type: "Kata Kerja" },
    "studio": { meaning: "studio", type: "Kata Benda" },
    "tieren": { meaning: "hewan-hewan", type: "Kata Benda" },
    "vorbereitung": { meaning: "persiapan", type: "Kata Benda" },
    "dauert": { meaning: "berlangsung (durasi)", type: "Kata Kerja" },
    "perfekt": { meaning: "sempurna", type: "Kata Sifat" },
    "glücklich": { meaning: "bahagia", type: "Kata Sifat" },
    "glücklichsten": { meaning: "paling bahagia", type: "Kata Sifat (Superlativ)" },

    // Übung 3
    "praktisch": { meaning: "praktis", type: "Kata Sifat" },
    "nervt": { meaning: "menyebalkan / mengganggu", type: "Kata Kerja" },
    "aktivitäten": { meaning: "aktivitas", type: "Kata Benda" },
    "teilen": { meaning: "membagikan", type: "Kata Kerja" },
    "käsebrot": { meaning: "roti keju", type: "Kata Benda" },
    "berg": { meaning: "gunung", type: "Kata Benda" },
    "anruft": { meaning: "menelepon (dari anrufen)", type: "Kata Kerja" },
    "erzählt": { meaning: "bercerita", type: "Kata Kerja" },
    "schicken": { meaning: "mengirim", type: "Kata Kerja" },
    "konzert": { meaning: "konser", type: "Kata Benda" },
    "gepostet": { meaning: "diposting (Partizip II)", type: "Kata Kerja" },
    "sofort": { meaning: "segera / langsung", type: "Adverbia" },
    "bekannte": { meaning: "kenalan", type: "Kata Benda" },
    "informieren": { meaning: "memberi informasi", type: "Kata Kerja" },
    "eingeschaltet": { meaning: "dinyalakan (Partizip II)", type: "Kata Kerja" },
    "peinlich": { meaning: "memalukan", type: "Kata Sifat" },
    "kollege": { meaning: "rekan kerja", type: "Kata Benda" },
    "krank": { meaning: "sakit", type: "Kata Sifat" },
    "gemeldet": { meaning: "melaporkan (Partizip II)", type: "Kata Kerja" },
    "chef": { meaning: "bos / atasan", type: "Kata Benda" },
    "dumm": { meaning: "bodoh", type: "Kata Sifat" },
    "kritisch": { meaning: "kritis", type: "Kata Sifat" },
    "kinder": { meaning: "anak-anak", type: "Kata Benda" },
    "vorsichtiger": { meaning: "lebih berhati-hati", type: "Kata Sifat (Komparativ)" },
    "hochlädt": { meaning: "mengunggah (dari hochladen)", type: "Kata Kerja" },
    "schlafe": { meaning: "tidur (dari schlafen)", type: "Kata Kerja" }
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
      title: "Text 1: Gloria Rubens, Informatik-Studentin",
      desc: "Bacalah teks tentang Gloria dan aktivitasnya di universitas.",
      content: (
        <p className="text-amber-900 font-medium leading-relaxed text-lg">
          {renderInteractiveText("Ich studiere seit drei Jahren an der Uni. Meine Informatik-Professorin finde ich am interessantesten, weil es bei ihr nie langweilig ist. Wir machen jetzt zum Beispiel ein Projekt: Wir entwickeln eine App für Studierende zum Thema „Günstig leben“. Zuerst haben wir eine Umfrage gemacht, jetzt programmieren wir die App. Später möchte ich mit zwei Freunden ein Start-Up gründen. Wir wollen Apps mit Tipps für das normale Leben entwickeln und so Menschen helfen, denn das finde ich am wichtigsten. In meiner Freizeit bin ich weniger online als meine Freunde. Ich bin am liebsten draußen in der Natur und treffe Menschen. Das ist für mich am schönsten und so bekomme ich auch wieder Ideen für Projekte.")}
        </p>
      ),
      questions: [
        {
          q: "1. Warum findet Gloria ihre Professorin interessant?",
          options: [
            "Weil sie viele Hausaufgaben gibt.",
            "Weil es bei ihr nie langweilig ist.",
            "Weil sie ein Start-Up hat."
          ],
          correct: 1
        },
        {
          q: "2. Was machen Gloria und ihre Freunde für das Projekt?",
          options: [
            "Sie entwickeln eine App.",
            "Sie schreiben ein Buch.",
            "Sie machen einen Film."
          ],
          correct: 0
        },
        {
          q: "3. Was macht Gloria am liebsten in ihrer Freizeit?",
          options: [
            "Sie programmiert Apps.",
            "Sie ist am liebsten draußen in der Natur.",
            "Sie ist immer online."
          ],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: "Text 2: Lars Brinkhoff, Fotograf",
      desc: "Bacalah tentang profesi Lars dan pekerjaannya sebagai fotografer.",
      content: (
        <p className="text-amber-900 font-medium leading-relaxed text-lg">
          {renderInteractiveText("Ich wollte unbedingt Fotograf werden, weil ich Fotos liebe und schon als Kind gern fotografiert habe. Nach der Schule habe ich eine Ausbildung zum Fotografen gemacht - das war viel spannender als die Schule. Am Anfang hat mir die Ausbildung nicht gefallen, weil ich vieles noch nicht konnte. Jetzt habe ich schon lange ein Studio und mache am liebsten Fotos von Tieren. Für so ein Foto brauche ich viel Vorbereitung und natürlich auch nach dem Shooting viel Zeit am Computer. Das dauert manchmal lang, aber ich mache das total gern. Meine Fotos sollen perfekt sein und die Menschen glücklich machen - dann bin ich selbst am glücklichsten!")}
        </p>
      ),
      questions: [
        {
          q: "1. Warum wollte Lars Fotograf werden?",
          options: [
            "Weil seine Eltern auch Fotografen sind.",
            "Weil er schon als Kind gern fotografiert hat.",
            "Weil er am Computer arbeiten wollte."
          ],
          correct: 1
        },
        {
          q: "2. Wovon macht Lars am liebsten Fotos?",
          options: [
            "Von der Natur.",
            "Von Menschen.",
            "Von Tieren."
          ],
          correct: 2
        },
        {
          q: "3. Was macht Lars glücklich?",
          options: [
            "Wenn er viel Freizeit hat.",
            "Wenn seine Fotos perfekt sind und die Menschen glücklich machen.",
            "Wenn er nicht am Computer arbeiten muss."
          ],
          correct: 1
        }
      ]
    },
    {
      id: 3,
      title: "Text 3: Meinungen zu Social Media",
      desc: "Bacalah pendapat Nadica dan Ferdinand tentang memposting foto di internet.",
      content: (
        <div className="space-y-4">
          <p className="text-amber-900 font-medium leading-relaxed text-lg border-l-4 border-amber-400 pl-4">
            <span className="font-bold block mb-1">Nadica Horvat:</span>
            {renderInteractiveText("Ich finde es toll, dass wir Freunde und Bekannte schnell und einfach informieren können. Aber ich finde, das Handy muss nicht immer eingeschaltet sein und wir müssen nicht jede Party posten. Das ist oft peinlich! Ein Kollege von mir hat zum Beispiel in der Firma angerufen und sich krank gemeldet. Am Abend hat er ein Foto gepostet: Er war mit Freunden auf einer Party... Er hat vergessen, dass seine Kollegen und sein Chef das Foto sehen können. Jetzt sucht er eine neue Arbeit. Dumm, oder?")}
          </p>
          <p className="text-amber-900 font-medium leading-relaxed text-lg border-l-4 border-emerald-400 pl-4 mt-6">
            <span className="font-bold block mb-1">Ferdinand Weisensee:</span>
            {renderInteractiveText("Ich sehe das sehr kritisch. Ich finde es okay, wenn man Fotos und Videos postet. Aber ich finde es gar nicht gut, wenn viele Leute Fotos von ihren Kindern posten. Kinder können nicht sagen, ob sie das wollen oder nicht. Ich denke, da müssen die Leute vorsichtiger sein. Ich möchte auch nicht, dass jemand ein Foto hochlädt, wenn ich schlafe!")}
          </p>
        </div>
      ),
      questions: [
        {
          q: "1. Warum sucht Nadicas Kollege eine neue Arbeit?",
          options: [
            "Weil er sich krank gemeldet hat, aber Party-Fotos gepostet hat.",
            "Weil er sein Handy verloren hat.",
            "Weil er keine Fotos von sich gepostet hat."
          ],
          correct: 0
        },
        {
          q: "2. Was findet Nadica peinlich?",
          options: [
            "Wenn Leute keine Fotos posten.",
            "Dass man nicht jede Party posten muss.",
            "Wenn das Handy immer eingeschaltet ist."
          ],
          correct: 1
        },
        {
          q: "3. Was ist die Hauptsorge von Ferdinand?",
          options: [
            "Dass man zu viele Videos postet.",
            "Dass Eltern Fotos von ihren Kindern posten.",
            "Dass man das Internet nicht gut nutzen kann."
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
