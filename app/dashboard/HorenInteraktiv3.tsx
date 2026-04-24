"use client";

import React, { useState, useEffect, useRef } from 'react';

type DialogueLine = {
  speaker: string;
  text: string;
  voice: string; // 'nova' (female), 'onyx' (male)
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

export function HorenInteraktiv3() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [audioElements, setAudioElements] = useState<HTMLAudioElement[]>([]);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [isCorrect, setIsCorrect] = useState<Record<number, boolean | null>>({});
  const [activeWord, setActiveWord] = useState<string | null>(null);

  const dictionary: Record<string, { meaning: string, type: string }> = {
    // Übung 1
    "jugendliche": { meaning: "remaja-remaja", type: "Kata Benda" },
    "leben": { meaning: "kehidupan", type: "Kata Benda / Kata Kerja" },
    "probleme": { meaning: "masalah-masalah", type: "Kata Benda" },
    "sorgen": { meaning: "kekhawatiran", type: "Kata Benda" },
    "normal": { meaning: "normal", type: "Kata Sifat" },
    "anfang": { meaning: "pada mulanya / awal", type: "Kata Benda" },
    "kennen": { meaning: "mengenal", type: "Kata Kerja" },
    "verschieden": { meaning: "berbeda-beda", type: "Kata Sifat" },
    "warum": { meaning: "mengapa / kenapa", type: "Kata Tanya" },
    "freunde": { meaning: "teman-teman", type: "Kata Benda" },
    "schicksal": { meaning: "takdir / nasib", type: "Kata Benda" },
    "krankheit": { meaning: "penyakit", type: "Kata Benda" },
    "unfall": { meaning: "kecelakaan", type: "Kata Benda" },
    "plötzlich": { meaning: "tiba-tiba", type: "Adverbia" },
    "alles": { meaning: "segalanya", type: "Kata Ganti" },
    "krankenhaus": { meaning: "rumah sakit", type: "Kata Benda" },
    "club": { meaning: "klub", type: "Kata Benda" },
    "bänder": { meaning: "pita-pita", type: "Kata Benda" },
    "serie": { meaning: "serial", type: "Kata Benda" },
    "emotional": { meaning: "emosional", type: "Kata Sifat" },
    "schweres": { meaning: "berat / sulit", type: "Kata Sifat" },
    "gegenseitig": { meaning: "satu sama lain", type: "Adverbia" },

    // Übung 2
    "lehrerin": { meaning: "guru (perempuan)", type: "Kata Benda" },
    "wohnt": { meaning: "tinggal (dari wohnen)", type: "Kata Kerja" },
    "freund": { meaning: "pacar (laki-laki) / teman", type: "Kata Benda" },
    "mag": { meaning: "menyukai (dari mögen)", type: "Kata Kerja (Modal)" },
    "merkt": { meaning: "menyadari / memperhatikan", type: "Kata Kerja" },
    "träume": { meaning: "mimpi-mimpi", type: "Kata Benda" },
    "findet": { meaning: "merasa / menemukan", type: "Kata Kerja" },
    "langweilig": { meaning: "membosankan", type: "Kata Sifat" },
    "oma": { meaning: "nenek", type: "Kata Benda" },
    "krank": { meaning: "sakit", type: "Kata Sifat" },
    "weiß": { meaning: "tahu (dari wissen)", type: "Kata Kerja" },
    "machen": { meaning: "melakukan / membuat", type: "Kata Kerja" },
    "soll": { meaning: "seharusnya (dari sollen)", type: "Kata Kerja (Modal)" },
    "reise": { meaning: "perjalanan", type: "Kata Benda" },
    "tschechien": { meaning: "Republik Ceko", type: "Kata Benda" },
    "hauptperson": { meaning: "pemeran utama", type: "Kata Benda" },
    "entscheidung": { meaning: "keputusan", type: "Kata Benda" },
    "gestresst": { meaning: "stres", type: "Kata Sifat" },

    // Übung 3
    "entertainer": { meaning: "penghibur / entertainer", type: "Kata Benda" },
    "film": { meaning: "film", type: "Kata Benda" },
    "beschreibt": { meaning: "mendeskripsikan", type: "Kata Kerja" },
    "kindheit": { meaning: "masa kecil", type: "Kata Benda" },
    "talente": { meaning: "bakat-bakat", type: "Kata Benda" },
    "familie": { meaning: "keluarga", type: "Kata Benda" },
    "lacht": { meaning: "tertawa", type: "Kata Kerja" },
    "witze": { meaning: "lelucon", type: "Kata Benda" },
    "mutter": { meaning: "ibu", type: "Kata Benda" },
    "glücklich": { meaning: "bahagia", type: "Kata Sifat" },
    "humor": { meaning: "humor", type: "Kata Benda" },
    "stirbt": { meaning: "meninggal (dari sterben)", type: "Kata Kerja" },
    "jung": { meaning: "muda", type: "Kata Sifat" },
    "zeigt": { meaning: "menunjukkan", type: "Kata Kerja" },
    "wichtig": { meaning: "penting", type: "Kata Sifat" },
    "denkst": { meaning: "berpikir (dari denken)", type: "Kata Kerja" },
    "berühmter": { meaning: "terkenal", type: "Kata Sifat" },
    "schafft": { meaning: "berhasil (dari schaffen)", type: "Kata Kerja" },
    "zeiten": { meaning: "waktu / masa", type: "Kata Benda" }
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
            <span className={`border-b border-dashed transition-colors duration-200 ${isActive ? 'border-pink-400 text-pink-400' : 'border-slate-500 hover:border-pink-400 hover:text-pink-400'}`}>
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

  const exercises: Exercise[] = [
    {
      id: 1,
      title: "Audio 1: Club der roten Bänder",
      desc: "Dengarkan wawancara tentang serial drama ini.",
      dialogue: [
        { speaker: "Tim", voice: "onyx", text: "Hallo Vira, du hast gestern die Serie 'Club der roten Bänder' gesehen. Wie war sie?" },
        { speaker: "Vira", voice: "nova", text: "Hallo Tim! Ja, ich fand die Serie wirklich toll und sehr emotional." },
        { speaker: "Tim", voice: "onyx", text: "Worum geht es in der Geschichte genau?" },
        { speaker: "Vira", voice: "nova", text: "Es geht um sechs Jugendliche. Sie haben alle ein schweres Schicksal, wie zum Beispiel eine Krankheit." },
        { speaker: "Tim", voice: "onyx", text: "Ach so. Und sie treffen sich im Krankenhaus, richtig?" },
        { speaker: "Vira", voice: "nova", text: "Genau. Am Anfang kennen sie sich nicht und ihre Leben sind sehr verschieden." },
        { speaker: "Tim", voice: "onyx", text: "Das klingt spannend. Werden sie dann gute Freunde?" },
        { speaker: "Vira", voice: "nova", text: "Ja, plötzlich ist alles anders. Zusammen gründen sie den 'Club der roten Bänder' und helfen sich gegenseitig." }
      ],
      questions: [
        {
          q: "1. Wo lernen sich die Jugendlichen kennen?",
          options: [
            "In der Schule.",
            "Im Krankenhaus.",
            "Auf einer Party."
          ],
          correct: 1
        },
        {
          q: "2. Was haben alle Jugendlichen gemeinsam?",
          options: [
            "Sie haben alle viel Geld.",
            "Sie haben alle das gleiche Hobby.",
            "Sie haben alle ein Schicksal (Krankheit oder Unfall)."
          ],
          correct: 2
        },
        {
          q: "3. Wie ist das Leben der Jugendlichen am Anfang?",
          options: [
            "Alle haben genau das gleiche Leben.",
            "Ihre Leben sind sehr verschieden.",
            "Sie sind von Anfang an beste Freunde."
          ],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: "Audio 2: Rückenwind von vorn",
      desc: "Dengarkan percakapan tentang film 'Rückenwind von vorn'.",
      dialogue: [
        { speaker: "Felix", voice: "onyx", text: "Sag mal Vira, kennst du den Film 'Rückenwind von vorn'? Wer ist da eigentlich die Hauptperson?" },
        { speaker: "Vira", voice: "nova", text: "Ja klar! Das ist Charlie. Sie arbeitet als Lehrerin und wohnt mit ihrem Freund Marco in Berlin." },
        { speaker: "Felix", voice: "onyx", text: "Sind die beiden glücklich zusammen?" },
        { speaker: "Vira", voice: "nova", text: "Eigentlich schon. Sie mag Marco sehr, aber sie merkt, dass sie ganz andere Träume hat." },
        { speaker: "Felix", voice: "onyx", text: "Was ist ihr Problem?" },
        { speaker: "Vira", voice: "nova", text: "Sie findet ihr Leben langweilig. Und dann wird leider auch noch ihre Oma sehr krank." },
        { speaker: "Felix", voice: "onyx", text: "Das ist traurig. Was macht Charlie in dieser Situation?" },
        { speaker: "Vira", voice: "nova", text: "Sie ist gestresst und weiß nicht, was sie tun soll. Plötzlich macht sie einfach eine Reise nach Tschechien." },
        { speaker: "Felix", voice: "onyx", text: "Wow, das ist eine große Entscheidung!" }
      ],
      questions: [
        {
          q: "1. Was ist Charlies Beruf?",
          options: [
            "Sie ist Ärztin.",
            "Sie ist Lehrerin.",
            "Sie ist Schauspielerin."
          ],
          correct: 1
        },
        {
          q: "2. Warum ist Charlie unzufrieden?",
          options: [
            "Weil sie andere Träume hat als ihr Freund und ihr Leben langweilig findet.",
            "Weil sie keine Arbeit hat.",
            "Weil ihr Freund nach Tschechien reisen möchte."
          ],
          correct: 0
        },
        {
          q: "3. Wer wird im Film krank?",
          options: [
            "Ihr Freund Marco.",
            "Charlie selbst.",
            "Ihre Oma."
          ],
          correct: 2
        }
      ]
    },
    {
      id: 3,
      title: "Audio 3: Der Junge muss an die frische Luft",
      desc: "Dengarkan diskusi tentang masa kecil Hape Kerkeling.",
      dialogue: [
        { speaker: "Lukas", voice: "onyx", text: "Hast du schon den Film über Hape Kerkeling gesehen? Er ist ja ein sehr berühmter Entertainer." },
        { speaker: "Anna", voice: "nova", text: "Ja, genau! Der Film beschreibt seine Kindheit. Hans-Peter hat schon mit neun Jahren viele besondere Talente." },
        { speaker: "Lukas", voice: "onyx", text: "Hat er schon als Kind immer Witze gemacht?" },
        { speaker: "Anna", voice: "nova", text: "Oh ja! Seine Familie lacht sehr oft über seine tollen Witze." },
        { speaker: "Lukas", voice: "onyx", text: "Aber es gibt auch ein trauriges Thema im Film, oder?" },
        { speaker: "Anna", voice: "nova", text: "Ja, seine Mutter ist sehr krank. Hans-Peter möchte sie mit seinem Humor unbedingt glücklich machen." },
        { speaker: "Lukas", voice: "onyx", text: "Schafft er das?" },
        { speaker: "Anna", voice: "nova", text: "Oft ja. Aber leider stirbt seine Mutter zu jung. Der Film zeigt, wie wichtig die Familie in schweren Zeiten ist." }
      ],
      questions: [
        {
          q: "1. Worüber handelt der Film?",
          options: [
            "Über die Kindheit des Entertainers Hape Kerkeling.",
            "Über einen Urlaub in Spanien.",
            "Über ein Krankenhaus in Berlin."
          ],
          correct: 0
        },
        {
          q: "2. Was macht Hans-Peter, um seine Mutter glücklich zu machen?",
          options: [
            "Er kauft ihr Blumen.",
            "Er macht Witze (Humor).",
            "Er singt Lieder."
          ],
          correct: 1
        },
        {
          q: "3. Was ist die Hauptaussage des Films?",
          options: [
            "Dass man immer lachen muss.",
            "Dass die Familie wichtig ist.",
            "Dass Fernsehen schlecht ist."
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
      const url = `/api/tts?text=${encodeURIComponent(line.text)}&voice=${line.voice}`;
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
  }, [activeTab]);

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
            className={`px-6 py-3 rounded-2xl font-bold transition-all shadow-sm ${
              activeTab === idx 
                ? 'bg-violet-600 text-white shadow-violet-500/30 scale-105' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-violet-300 hover:text-violet-600'
            }`}
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
            className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white shadow-[0_0_20px_rgba(200,50,200,0.4)] bg-gradient-to-br from-[#c130b0] to-[#7b2cbf] hover:scale-105 transition-all z-10 ${isPlaying ? 'animate-pulse shadow-[0_0_40px_rgba(200,50,200,0.6)]' : ''}`} 
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          
          <div className="flex-1 w-full relative h-20 flex items-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-between gap-[2px] w-full">
              {Array.from({ length: numBars }).map((_, i) => (
                <div 
                  key={`bg-${i}`} 
                  className="w-full bg-[#1e1e2d] rounded-full"
                  style={{ height: `${waveformHeights[i]}%` }}
                ></div>
              ))}
            </div>
            
            <div 
              className="absolute inset-0 flex items-center justify-between gap-[2px] w-full"
              style={{ clipPath: `inset(0 ${100 - progressPercentage}% 0 0)` }}
            >
              {Array.from({ length: numBars }).map((_, i) => {
                const hue = 50 + (i / numBars) * 190; 
                return (
                  <div 
                    key={`fg-${i}`} 
                    className="w-full rounded-full"
                    style={{ 
                      height: `${waveformHeights[i]}%`,
                      backgroundColor: `hsl(${hue}, 100%, 65%)`,
                      boxShadow: `0 0 10px hsl(${hue}, 100%, 65%)`
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 w-full mt-8 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-violet-400 uppercase tracking-widest">Audio Transcript (Interaktif)</p>
            <span className="text-[10px] bg-white/10 text-slate-300 px-2 py-1 rounded-md uppercase tracking-wider font-bold">Arahkan kursor ke kata</span>
          </div>
          <div className="space-y-4 text-slate-300 font-medium leading-relaxed text-lg">
            {currentExercise.dialogue.map((line, index) => {
              const isCurrent = isPlaying && index === currentLineIndex;
              return (
                <p 
                  key={index} 
                  className={`transition-all duration-300 ${isCurrent ? 'bg-white/10 p-2 rounded-lg border-l-4 border-violet-500' : 'p-2 border-l-4 border-transparent'}`}
                >
                  <strong className={`${line.voice === 'onyx' ? 'text-sky-400' : 'text-pink-400'} mr-2`}>
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
                  className={`w-full text-left p-4 rounded-xl border-2 font-bold transition-all ${
                    selectedAnswers[qIndex] === index
                      ? isCorrect[qIndex]
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                        : 'bg-rose-100 border-rose-500 text-rose-900'
                      : 'bg-slate-50 border-slate-300 text-slate-700 hover:border-violet-400 hover:bg-violet-50'
                  }`}
                >
                  <span className="mr-3 text-lg">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>
            {typeof isCorrect[qIndex] === 'boolean' && (
              <div className={`mt-6 p-4 rounded-xl font-bold ${isCorrect[qIndex] ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                {isCorrect[qIndex] ? '🎉 Richtig! Jawaban kamu benar.' : '❌ Falsch! Coba dengarkan lagi.'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
