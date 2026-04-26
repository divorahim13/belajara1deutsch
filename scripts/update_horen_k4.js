const fs = require('fs');

let content = `
"use client";

import React, { useState, useEffect, useRef } from 'react';

type DialogueLine = {
  speaker: string;
  text: string;
  voice: string; // 'nova' (female), 'onyx' (male), 'alloy' (neutral), 'shimmer' (female)
};

type Exercise = {
  id: number;
  title: string;
  desc: string;
  dialogue: DialogueLine[];
  questions: {
    q: string;
    options: string[];
    correct: number;
  }[];
};

export function HorenInteraktiv4() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [audioElements, setAudioElements] = useState<HTMLAudioElement[]>([]);
  
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [isCorrect, setIsCorrect] = useState<Record<number, boolean | null>>({});
  const [activeWord, setActiveWord] = useState<string | null>(null);

  const dictionary: Record<string, { meaning: string, type: string }> = {
    "genervt": { meaning: "kesal / sebal", type: "Kata Sifat" },
    "abschlussprüfung": { meaning: "ujian akhir", type: "Kata Benda" },
    "furchtbar": { meaning: "sangat / mengerikan", type: "Adjektiv" },
    "bestimmt": { meaning: "pasti", type: "Adverbia" },
    "bestanden": { meaning: "lulus (Partizip II)", type: "Kata Kerja" },
    "reg": { meaning: "reg dich auf = marah / kesal", type: "Kata Kerja" },
    "schlimm": { meaning: "buruk / parah", type: "Kata Sifat" },
    "wochenlang": { meaning: "berminggu-minggu", type: "Adverbia" },
    "gelernt": { meaning: "belajar (Partizip II)", type: "Kata Kerja" },
    "diskussion": { meaning: "diskusi / perdebatan", type: "Kata Benda" },
    "chefin": { meaning: "bos (perempuan)", type: "Kata Benda" },
    "arbeitszeiten": { meaning: "jam kerja", type: "Kata Benda" },
    "anstrengend": { meaning: "melelahkan", type: "Kata Sifat" },
    "geärgert": { meaning: "merasa kesal (sich ärgern - Partizip II)", type: "Kata Kerja" },
    "handy": { meaning: "HP", type: "Kata Benda" },
    "nirgendwo": { meaning: "tidak di mana pun", type: "Adverbia" },
    "gesucht": { meaning: "mencari (Partizip II)", type: "Kata Kerja" },
    "u-bahn": { meaning: "kereta bawah tanah", type: "Kata Benda" },
    "verloren": { meaning: "kehilangan (Partizip II)", type: "Kata Kerja" },
    "schlechter": { meaning: "lebih buruk / buruk", type: "Kata Sifat" },
    "tag": { meaning: "hari", type: "Kata Benda" },
    "pech": { meaning: "kesialan", type: "Kata Benda" },
    "gehabt": { meaning: "memiliki (Partizip II)", type: "Kata Kerja" },
    "laune": { meaning: "suasana hati / mood", type: "Kata Benda" },
    "verbessern": { meaning: "memperbaiki", type: "Kata Kerja" },
    "gemeinsam": { meaning: "bersama-sama", type: "Adverbia" },
    "aufräumen": { meaning: "merapikan", type: "Kata Kerja" },
    "besser": { meaning: "lebih baik", type: "Kata Sifat" },
    "putze": { meaning: "membersihkan", type: "Kata Kerja" },
    "küche": { meaning: "dapur", type: "Kata Benda" },
    "müll": { meaning: "sampah", type: "Kata Benda" },
    "idee": { meaning: "ide", type: "Kata Benda" },
    "bewegung": { meaning: "gerakan", type: "Kata Benda" },
    "bücher": { meaning: "buku-buku (Plural)", type: "Kata Benda" },
    "zeitschriften": { meaning: "majalah", type: "Kata Benda" },
    "wohnzimmer": { meaning: "ruang tamu", type: "Kata Benda" },
    "helfe": { meaning: "membantu", type: "Kata Kerja" },
    "boden": { meaning: "lantai", type: "Kata Benda" },
    "saugen": { meaning: "menyedot (debu)", type: "Kata Kerja" },
    "geschirr": { meaning: "piring kotor / peralatan makan", type: "Kata Benda" },
    "gespült": { meaning: "mencuci (Partizip II dari spülen)", type: "Kata Kerja" },
    "fertig": { meaning: "selesai", type: "Kata Sifat" },
    "supermarkt": { meaning: "supermarket", type: "Kata Benda" },
    "zutaten": { meaning: "bahan-bahan", type: "Kata Benda" },
    "abendessen": { meaning: "makan malam", type: "Kata Benda" },
    "schaut": { meaning: "melihat", type: "Kata Kerja" },
    "nachricht": { meaning: "pesan", type: "Kata Benda" },
    "bekommen": { meaning: "mendapatkan", type: "Kata Kerja" },
    "schreibt": { meaning: "menulis", type: "Kata Kerja" },
    "getroffen": { meaning: "bertemu (Partizip II)", type: "Kata Kerja" },
    "geburtstag": { meaning: "ulang tahun", type: "Kata Benda" },
    "party": { meaning: "pesta", type: "Kata Benda" },
    "einladen": { meaning: "mengundang", type: "Kata Kerja" },
    "spontan": { meaning: "spontan", type: "Adjektiv" },
    "entschieden": { meaning: "memutuskan (sich entscheiden - Partizip II)", type: "Kata Kerja" },
    "überraschung": { meaning: "kejutan", type: "Kata Benda" },
    "ewig": { meaning: "selamanya / waktu yang lama", type: "Adverbia" },
    "gefeiert": { meaning: "merayakan (Partizip II)", type: "Kata Kerja" },
    "fängt": { meaning: "mulai (anfangen)", type: "Kata Kerja" },
    "nachmittag": { meaning: "sore hari", type: "Kata Benda" },
    "garten": { meaning: "taman / kebun", type: "Kata Benda" },
    "getränke": { meaning: "minuman", type: "Kata Benda" },
    "gekauft": { meaning: "membeli (Partizip II)", type: "Kata Kerja" },
    "schenken": { meaning: "memberi hadiah", type: "Kata Kerja" }
  };

  const renderInteractiveText = (text: string) => {
    return text.split(' ').map((word, index) => {
      const cleanWord = word.replace(/[.,?!:;]/g, '').toLowerCase();
      const punctuationMatch = word.match(/[.,?!:;]+$/);
      const punctuation = punctuationMatch ? punctuationMatch[0] : '';
      const baseWord = word.replace(/[.,?!:;]+$/, '');
      
      const entry = dictionary[cleanWord];

      if (entry) {
        const wordId = \`\${text.substring(0,10)}-\${index}\`;
        const isActive = activeWord === wordId;
        return (
          <span 
            key={index} 
            className="group relative inline-block mx-[2px] cursor-help"
            onClick={() => setActiveWord(isActive ? null : wordId)}
            onMouseEnter={() => setActiveWord(wordId)}
            onMouseLeave={() => setActiveWord(null)}
          >
            <span className={\`border-b border-dashed transition-colors duration-200 \${isActive ? 'border-pink-400 text-pink-400' : 'border-slate-500 hover:border-pink-400 hover:text-pink-400'}\`}>
              {baseWord}
            </span>
            {punctuation}
            <span className={\`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-slate-900 border border-slate-700 text-white text-xs px-3 py-2 rounded-xl transition-all duration-200 pointer-events-none z-20 shadow-xl shadow-black/50 \${isActive ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-0'}\`}>
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

  const exercises: Exercise[] = [
    {
      id: 1,
      title: "Teil 1: Schlechte Laune",
      desc: "Warum haben Bea, Max, Luca und Anna schlechte Laune?",
      dialogue: [
        { speaker: "Max", voice: "onyx", text: "Hallo zusammen. Oh Mann, ich bin heute so genervt! Meine Abschlussprüfung heute Morgen war furchtbar schwer. Ich habe so viel dafür gelernt, aber ich habe bestimmt nicht bestanden." },
        { speaker: "Bea", voice: "nova", text: "Ach Max, reg dich nicht auf. Es wird schon nicht so schlimm sein. Du hast doch wochenlang dafür gelernt! Bei mir lief es heute aber auch schlecht. Ich hatte eine lange Diskussion mit meiner Chefin über meine Arbeitszeiten. Das war wirklich anstrengend und ich habe mich sehr geärgert." },
        { speaker: "Anna", voice: "shimmer", text: "Leute, ihr glaubt es nicht. Ich kann mein Handy nirgendwo finden! Ich habe schon überall gesucht, aber ich denke, es ist nicht mehr da. Ich habe es bestimmt in der U-Bahn verloren!" },
        { speaker: "Luca", voice: "alloy", text: "Puh, was für ein schlechter Tag für uns alle. Wir haben wohl heute alle Pech gehabt. Wir sollten etwas tun, um unsere Laune zu verbessern." }
      ],
      questions: [
        {
          q: "1. Wer hatte eine Diskussion mit der Chefin?",
          options: ["Bea", "Max", "Anna", "Luca"],
          correct: 0
        },
        {
          q: "2. Wer hatte eine schwere Prüfung?",
          options: ["Max", "Bea", "Anna", "Luca"],
          correct: 0
        },
        {
          q: "3. Wer denkt, dass das Handy nicht mehr da ist?",
          options: ["Luca", "Anna", "Max", "Bea"],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: "Teil 2: Alles wieder gut",
      desc: "Was machen Anna, Max und Bea? Was machen sie nicht?",
      dialogue: [
        { speaker: "Max", voice: "onyx", text: "So, Leute, wir können nicht den ganzen Tag traurig sein. Jetzt räumen wir mal gemeinsam auf. Danach kochen wir etwas Leckeres, dann geht es uns bestimmt besser. Ich putze die Küche und bringe den Müll raus." },
        { speaker: "Anna", voice: "shimmer", text: "Das ist eine gute Idee, Max. Bewegung hilft immer gegen Stress. Ich räume die Bücher und Zeitschriften im Wohnzimmer auf. Die liegen überall herum." },
        { speaker: "Bea", voice: "nova", text: "Und ich helfe dir dabei, Anna. Ich kann auch den Boden saugen. Das Geschirr haben wir zum Glück gestern schon gespült, das müssen wir heute nicht mehr machen. So sind wir schnell fertig." },
        { speaker: "Luca", voice: "alloy", text: "Super! Und ich gehe schnell in den Supermarkt und kaufe die Zutaten für unser Abendessen ein. Was möchtet ihr essen?" }
      ],
      questions: [
        {
          q: "1. Wer putzt die Küche?",
          options: ["Max", "Bea", "Anna"],
          correct: 0
        },
        {
          q: "2. Wer räumt die Bücher auf?",
          options: ["Anna", "Max", "Bea"],
          correct: 0
        },
        {
          q: "3. Was machen sie NICHT?",
          options: ["Das Geschirr spülen", "Die Küche putzen", "Die Bücher aufräumen"],
          correct: 0
        }
      ]
    },
    {
      id: 3,
      title: "Teil 3: Die Nachricht",
      desc: "Welche Nachricht bekommen die Freunde? Was machen sie dann?",
      dialogue: [
        { speaker: "Luca", voice: "alloy", text: "Hey Leute, schaut mal schnell auf mein Handy! Ich habe gerade eine total schöne Nachricht von Jan bekommen." },
        { speaker: "Max", voice: "onyx", text: "Ach, wirklich? Was schreibt er denn? Habt ihr euch nicht gestern erst getroffen?" },
        { speaker: "Luca", voice: "alloy", text: "Ja, aber hört mal zu: 'Hey zusammen! Ich habe morgen Geburtstag und möchte euch alle zu meiner Party einladen! Ich habe mich spontan dazu entschieden.'" },
        { speaker: "Bea", voice: "nova", text: "Toll! Das ist ja eine super Überraschung. Wir haben ewig nicht mehr zusammen gefeiert. Wann fängt die Party denn an?" },
        { speaker: "Luca", voice: "alloy", text: "Er schreibt weiter: 'Die Party ist morgen Nachmittag um 16 Uhr in meinem Garten. Ich habe schon Getränke gekauft. Bringt gute Laune mit!'" },
        { speaker: "Anna", voice: "shimmer", text: "Super! Dann müssen wir heute Abend überlegen, was wir ihm schenken." }
      ],
      questions: [
        {
          q: "1. Welche Nachricht ist richtig?",
          options: [
            "Hallo! Jan hat morgen Geburtstag. Was schenken wir ihm?",
            "Hey! Ich habe Geburtstag und möchte euch zu meiner Party einladen!",
            "Hi! Ich kann leider nicht zu eurer Party kommen."
          ],
          correct: 1
        },
        {
          q: "2. Wann ist die Party?",
          options: [
            "Heute Abend um 20 Uhr.",
            "Morgen Nachmittag.",
            "Am Wochenende."
          ],
          correct: 1
        }
      ]
    }
  ];

  const currentExercise = exercises[activeTab];

  // Prefetch audio elements to eliminate gap
  useEffect(() => {
    let isMounted = true;
    const elements = currentExercise.dialogue.map(line => {
      const url = \`/api/tts?text=\${encodeURIComponent(line.text)}&voice=\${line.voice}\`;
      const audio = new Audio(url);
      audio.preload = "auto";
      return audio;
    });
    setAudioElements(elements);

    // Initial fallback estimation
    const totalChars = currentExercise.dialogue.reduce((acc, line) => acc + line.text.length, 0);
    setDuration(totalChars * 0.08);

    // Calculate exact duration once audio metadata is loaded
    const checkDurations = setInterval(() => {
      if (!isMounted) return;
      let allLoaded = true;
      let total = 0;
      for (const a of elements) {
        if (isNaN(a.duration) || a.duration === 0) {
          allLoaded = false;
          break;
        }
        total += a.duration;
      }
      if (allLoaded && total > 0) {
        setDuration(total);
        clearInterval(checkDurations);
      }
    }, 200);

    return () => {
      isMounted = false;
      clearInterval(checkDurations);
      elements.forEach(a => {
        a.pause();
        a.src = "";
      });
    };
  }, [activeTab]); // ONLY activeTab

  // Reset when tab changes
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentLineIndex(0);
    setSelectedAnswers({});
    setIsCorrect({});
    setActiveWord(null);
  }, [activeTab]);

  const togglePlay = () => {
    if (isPlaying) {
      audioElements.forEach(a => {
        a.pause();
        a.ontimeupdate = null;
      });
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (progress >= duration && duration > 0) {
        setProgress(0);
        playLine(0);
      } else {
        playLine(currentLineIndex);
      }
    }
  };

  const playLine = (index: number) => {
    if (index >= currentExercise.dialogue.length) {
      setIsPlaying(false);
      setProgress(duration);
      return;
    }

    setCurrentLineIndex(index);
    const audio = audioElements[index];
    
    // Exact progress tracking
    audio.ontimeupdate = () => {
      let previousDuration = 0;
      for (let i = 0; i < index; i++) {
        previousDuration += (audioElements[i].duration || 0);
      }
      setProgress(previousDuration + audio.currentTime);
    };

    // Gapless playback sequence
    audio.onended = () => {
      audio.ontimeupdate = null;
      playLine(index + 1);
    };
    
    audio.play().catch(e => {
      console.error("Audio playback error:", e);
      // Fallback delay if API fails
      setTimeout(() => playLine(index + 1), currentExercise.dialogue[index].text.length * 80);
    });
  };

  const handleCheck = (qIndex: number, optIndex: number) => {
    setSelectedAnswers(prev => ({...prev, [qIndex]: optIndex}));
    setIsCorrect(prev => ({...prev, [qIndex]: optIndex === currentExercise.questions[qIndex].correct}));
  };

  const numBars = 50;
  const waveformHeights = [
    20, 30, 45, 60, 80, 100, 85, 70, 50, 40,
    30, 25, 40, 55, 75, 95, 80, 60, 45, 35,
    30, 45, 65, 85, 100, 90, 75, 55, 40, 30,
    25, 35, 50, 70, 90, 100, 85, 65, 50, 40,
    30, 45, 60, 80, 95, 75, 55, 40, 30, 20
  ];

  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {exercises.map((ex, idx) => (
          <button
            key={ex.id}
            onClick={() => setActiveTab(idx)}
            className={\`px-6 py-3 rounded-2xl font-bold transition-all shadow-sm \${
              activeTab === idx 
                ? 'bg-rose-600 text-white shadow-rose-500/30 scale-105' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-rose-300 hover:text-rose-600'
            }\`}
          >
            {ex.title}
          </button>
        ))}
      </div>

      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-900">{currentExercise.title}</h2>
        <p className="text-slate-600 mt-2">{currentExercise.desc}</p>
      </div>

      <div className="clay-card p-8 bg-[#0b0b14] border-[#181825] border-b-8 flex flex-col items-center">
        
        <p className="text-pink-400 font-bold mb-6 text-sm tracking-[0.2em] uppercase">
          {isPlaying ? 'Audio läuft...' : 'Jetzt anhören'}
        </p>

        <div className="w-full flex flex-col md:flex-row items-center gap-8 max-w-4xl bg-[#11111a] p-6 rounded-3xl border border-white/5 shadow-2xl">
          <button 
            onClick={togglePlay}
            className={\`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white shadow-[0_0_20px_rgba(200,50,200,0.4)] bg-gradient-to-br from-[#c130b0] to-[#7b2cbf] hover:scale-105 transition-all z-10 \${isPlaying ? 'animate-pulse shadow-[0_0_40px_rgba(200,50,200,0.6)]' : ''}\`} 
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          
          <div className="flex-1 w-full relative h-20 flex items-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-between gap-[2px] w-full">
              {Array.from({ length: numBars }).map((_, i) => (
                <div 
                  key={\`bg-\${i}\`} 
                  className="w-full bg-[#1e1e2d] rounded-full"
                  style={{ height: \`\${waveformHeights[i]}%\` }}
                ></div>
              ))}
            </div>
            
            <div 
              className="absolute inset-0 flex items-center justify-between gap-[2px] w-full"
              style={{ clipPath: \`inset(0 \${100 - progressPercentage}% 0 0)\` }}
            >
              {Array.from({ length: numBars }).map((_, i) => {
                const hue = 50 + (i / numBars) * 190; 
                return (
                  <div 
                    key={\`fg-\${i}\`} 
                    className="w-full rounded-full"
                    style={{ 
                      height: \`\${waveformHeights[i]}%\`,
                      backgroundColor: \`hsl(\${hue}, 100%, 65%)\`,
                      boxShadow: \`0 0 10px hsl(\${hue}, 100%, 65%)\`
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 w-full mt-8 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-rose-400 uppercase tracking-widest">Audio Transcript (Interaktif)</p>
            <span className="text-[10px] bg-white/10 text-slate-300 px-2 py-1 rounded-md uppercase tracking-wider font-bold">Arahkan kursor ke kata</span>
          </div>
          <div className="space-y-4 text-slate-300 font-medium leading-relaxed text-lg">
            {currentExercise.dialogue.map((line, index) => {
              const isCurrent = isPlaying && index === currentLineIndex;
              return (
                <p 
                  key={index} 
                  className={\`transition-all duration-300 \${isCurrent ? 'bg-white/10 p-2 rounded-lg border-l-4 border-rose-500' : 'p-2 border-l-4 border-transparent'}\`}
                >
                  <strong className={\`\${line.speaker === 'Max' || line.speaker === 'Luca' ? 'text-sky-400' : 'text-pink-400'} mr-2\`}>
                    {line.speaker}:
                  </strong> 
                  {renderInteractiveText(line.text)}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {currentExercise.questions.map((item, qIndex) => (
          <div key={qIndex} className="clay-card p-8 bg-white border-slate-200">
            <h4 className="text-xl font-bold text-slate-800 mb-6">{item.q}</h4>
            <div className="space-y-4">
              {item.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleCheck(qIndex, index)}
                  className={\`w-full text-left p-4 rounded-xl border-2 font-bold transition-all \${
                    selectedAnswers[qIndex] === index
                      ? isCorrect[qIndex]
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                        : 'bg-rose-100 border-rose-500 text-rose-900'
                      : 'bg-slate-50 border-slate-300 text-slate-700 hover:border-rose-400 hover:bg-rose-50'
                  }\`}
                >
                  <span className="mr-3 text-lg">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>
            {typeof isCorrect[qIndex] === 'boolean' && (
              <div className={\`mt-6 p-4 rounded-xl font-bold \${isCorrect[qIndex] ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}\`}>
                {isCorrect[qIndex] ? '🎉 Richtig! Jawaban kamu benar.' : '❌ Falsch! Coba dengarkan lagi.'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
`;

fs.writeFileSync('app/dashboard/HorenInteraktiv4.tsx', content, 'utf8');
console.log("Updated HorenInteraktiv4.tsx");
