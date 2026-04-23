"use client";

import React, { useState, useEffect, useRef } from 'react';

export function HorenInteraktiv1() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [isCorrect, setIsCorrect] = useState<Record<number, boolean | null>>({});

  const [activeWord, setActiveWord] = useState<number | null>(null);

  // Reset state when switching tabs
  useEffect(() => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) clearInterval(timerRef.current);
    
    setIsPlaying(false);
    setProgress(0);
    setDuration(0);
    setSelectedAnswers({});
    setIsCorrect({});
    setActiveWord(null);
    
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
  }, [activeTab]);

  const dictionary: Record<string, { meaning: string, type: string }> = {
    // Übung 1
    "hallo": { meaning: "Halo", type: "Kata Seru" },
    "tut": { meaning: "Melakukan / Membuat", type: "Kata Kerja" },
    "mir": { meaning: "kepadaku (Dativ)", type: "Kata Ganti" },
    "leid": { meaning: "sedih / menyesal", type: "Kata Sifat" },
    "dass": { meaning: "bahwa", type: "Konjungsi" },
    "ich": { meaning: "Saya", type: "Kata Ganti" },
    "zu": { meaning: "terlalu / ke", type: "Preposisi / Adverbia" },
    "spät": { meaning: "terlambat", type: "Kata Sifat" },
    "bin": { meaning: "adalah (dari kata kerja 'sein')", type: "Kata Kerja (To Be)" },
    "kein": { meaning: "tidak ada / bukan", type: "Artikel Negatif" },
    "problem": { meaning: "masalah", type: "Kata Benda" },
    "was": { meaning: "Apa", type: "Kata Tanya" },
    "ist": { meaning: "adalah (dari kata kerja 'sein')", type: "Kata Kerja (To Be)" },
    "passiert": { meaning: "terjadi", type: "Kata Kerja (Partizip II)" },
    "mit": { meaning: "dengan", type: "Preposisi (Dativ)" },
    "dem": { meaning: "itu (Artikel Dativ untuk der/das)", type: "Artikel" },
    "bus": { meaning: "Bus", type: "Kata Benda" },
    "gefahren": { meaning: "mengendarai / bepergian", type: "Kata Kerja (Partizip II)" },
    "aber": { meaning: "tetapi", type: "Konjungsi" },
    "es": { meaning: "itu (kata ganti netral)", type: "Kata Ganti" },
    "gab": { meaning: "ada (dari 'es gibt' masa lampau)", type: "Kata Kerja (Präteritum)" },
    "einen": { meaning: "sebuah (Akkusativ)", type: "Artikel" },
    "stau": { meaning: "kemacetan", type: "Kata Benda" },
    "weil": { meaning: "karena", type: "Konjungsi" },
    "unfall": { meaning: "kecelakaan", type: "Kata Benda" },
    "gegeben": { meaning: "memberikan / ada", type: "Kata Kerja (Partizip II)" },
    "hat": { meaning: "memiliki", type: "Kata Kerja (Auxiliary)" },
    "oh": { meaning: "Oh", type: "Kata Seru" },
    "nein": { meaning: "Tidak", type: "Kata Seruan" },
    "hast": { meaning: "memiliki", type: "Kata Kerja (Auxiliary)" },
    "du": { meaning: "Kamu", type: "Kata Ganti" },
    "schon": { meaning: "sudah", type: "Adverbia" },
    "gegessen": { meaning: "makan", type: "Kata Kerja (Partizip II)" },
    "ja": { meaning: "Ya", type: "Kata Seruan" },
    "habe": { meaning: "memiliki", type: "Kata Kerja (Auxiliary)" },
    "hause": { meaning: "rumah", type: "Kata Benda" },
    "pizza": { meaning: "Pizza", type: "Kata Benda" },
    
    // Übung 2
    "entschuldigung": { meaning: "Permisi / Maaf", type: "Kata Seru / Kata Benda" },
    "haben": { meaning: "mempunyai", type: "Kata Kerja" },
    "sie": { meaning: "Anda (Formal)", type: "Kata Ganti" },
    "noch": { meaning: "masih", type: "Adverbia" },
    "käsekuchen": { meaning: "Kue Keju (Cheesecake)", type: "Kata Benda" },
    "der": { meaning: "itu (Artikel Maskulin)", type: "Artikel" },
    "leider": { meaning: "sayangnya", type: "Adverbia" },
    "aus": { meaning: "habis / dari", type: "Preposisi / Adverbia" },
    "wir": { meaning: "kita / kami", type: "Kata Ganti" },
    "apfelstrudel": { meaning: "Kue Apel (Apfelstrudel)", type: "Kata Benda" },
    "gut": { meaning: "baik", type: "Kata Sifat" },
    "dann": { meaning: "kalau begitu / kemudian", type: "Adverbia" },
    "nehme": { meaning: "mengambil (dari nehmen)", type: "Kata Kerja" },
    "ein": { meaning: "sebuah", type: "Artikel" },
    "stück": { meaning: "potong / bagian", type: "Kata Benda" },
    "und": { meaning: "dan", type: "Konjungsi" },
    "kaffee": { meaning: "Kopi", type: "Kata Benda" },
    "bitte": { meaning: "tolong", type: "Kata Seru" },
    "milch": { meaning: "Susu", type: "Kata Benda" },
    "zucker": { meaning: "Gula", type: "Kata Benda" },
    "nur": { meaning: "hanya", type: "Adverbia" },

    // Übung 3
    "zug": { meaning: "Kereta", type: "Kata Benda" },
    "münchen": { meaning: "Munich (Kota)", type: "Kata Benda" },
    "abgefahren": { meaning: "berangkat (Partizip II)", type: "Kata Kerja" },
    "minuten": { meaning: "menit", type: "Kata Benda" },
    "verspätung": { meaning: "keterlambatan", type: "Kata Benda" },
    "signal": { meaning: "sinyal", type: "Kata Benda" },
    "wissen": { meaning: "tahu", type: "Kata Kerja" },
    "wo": { meaning: "dimana", type: "Kata Tanya" },
    "gleis": { meaning: "peron / jalur kereta", type: "Kata Benda" },
    "müssen": { meaning: "harus", type: "Kata Kerja (Modal)" },
    "treppe": { meaning: "tangga", type: "Kata Benda" },
    "runter": { meaning: "turun (ke bawah)", type: "Adverbia" },
    "gleich": { meaning: "langsung / segera", type: "Adverbia" },
    "rechts": { meaning: "kanan", type: "Adverbia" }
  };

  const renderInteractiveText = (text: string) => {
    return text.split(' ').map((word, index) => {
      const cleanWord = word.replace(/[.,?!:;]/g, '').toLowerCase();
      const punctuationMatch = word.match(/[.,?!:;]+$/);
      const punctuation = punctuationMatch ? punctuationMatch[0] : '';
      const baseWord = word.replace(/[.,?!:;]+$/, '');
      
      const entry = dictionary[cleanWord];

      if (entry) {
        const isActive = activeWord === index;
        return (
          <span 
            key={index} 
            className="group relative inline-block mx-[2px] cursor-help"
            onClick={() => setActiveWord(isActive ? null : index)}
            onMouseEnter={() => setActiveWord(index)}
            onMouseLeave={() => setActiveWord(null)}
          >
            <span className={`border-b border-dashed transition-colors duration-200 ${isActive ? 'border-pink-400 text-pink-400' : 'border-slate-500 hover:border-pink-400 hover:text-pink-400'}`}>
              {baseWord}
            </span>
            {punctuation}
            <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-slate-900 border border-slate-700 text-white text-xs px-3 py-2 rounded-xl transition-all duration-200 pointer-events-none z-20 shadow-xl shadow-black/50 ${isActive ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-0'}`}>
              <span className="block font-black text-pink-400 mb-1 text-[10px] tracking-wider uppercase">{entry.type}</span>
              <span className="block font-medium">{entry.meaning}</span>
              {/* Arrow */}
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></span>
            </span>
          </span>
        );
      }
      return <span key={index} className="mx-[2px]">{word} </span>;
    });
  };

  const exercises = [
    {
      id: 1,
      title: "Übung 1: Der Termin",
      desc: "Dengarkan percakapan berikut und jawab pertanyaannya.",
      audioSrc: "/audio/kapitel-1-horen.mp3",
      transcriptRaw: "Hallo Maria! Tut mir leid, dass ich zu spät bin. Kein Problem. Was ist passiert? Ich bin mit dem Bus gefahren, aber es gab einen Stau, weil es einen Unfall gegeben hat. Oh nein! Hast du schon gegessen? Ja, ich habe zu Hause Pizza gegessen.",
      transcriptUI: (
        <>
          <p><strong className="text-white mr-2">Lukas:</strong> {renderInteractiveText("Hallo Maria! Tut mir leid, dass ich zu spät bin.")}</p>
          <p><strong className="text-white mr-2">Maria:</strong> {renderInteractiveText("Kein Problem. Was ist passiert?")}</p>
          <p><strong className="text-white mr-2">Lukas:</strong> {renderInteractiveText("Ich bin mit dem Bus gefahren, aber es gab einen Stau, weil es einen Unfall gegeben hat.")}</p>
          <p><strong className="text-white mr-2">Maria:</strong> {renderInteractiveText("Oh nein! Hast du schon gegessen?")}</p>
          <p><strong className="text-white mr-2">Lukas:</strong> {renderInteractiveText("Ja, ich habe zu Hause Pizza gegessen.")}</p>
        </>
      ),
      questions: [
        {
          q: "1. Warum ist Lukas zu spät?",
          options: [
            "Weil es einen Stau und einen Unfall gab.",
            "Weil er zu Hause Pizza gegessen hat.",
            "Weil er den Bus verpasst hat."
          ],
          correct: 0
        },
        {
          q: "2. Womit ist Lukas gefahren?",
          options: [
            "Mit dem Zug.",
            "Mit dem Bus.",
            "Mit dem Auto."
          ],
          correct: 1
        },
        {
          q: "3. Was hat Lukas vor dem Treffen gemacht?",
          options: [
            "Er hat Pizza gegessen.",
            "Er hat Maria angerufen.",
            "Er hat den Arzt besucht."
          ],
          correct: 0
        }
      ]
    },
    {
      id: 2,
      title: "Übung 2: Im Café",
      desc: "Dengarkan pesanan pelanggan di sebuah kafe.",
      audioSrc: "/audio/kapitel-1-horen-2.mp3",
      transcriptRaw: "Entschuldigung, haben Sie noch Käsekuchen? Tut mir leid, der Käsekuchen ist leider aus. Aber wir haben noch Apfelstrudel. Gut, dann nehme ich ein Stück Apfelstrudel und einen Kaffee, bitte. Mit Milch und Zucker? Nur Milch, bitte.",
      transcriptUI: (
        <>
          <p><strong className="text-white mr-2">Kunde:</strong> {renderInteractiveText("Entschuldigung, haben Sie noch Käsekuchen?")}</p>
          <p><strong className="text-white mr-2">Kellner:</strong> {renderInteractiveText("Tut mir leid, der Käsekuchen ist leider aus. Aber wir haben noch Apfelstrudel.")}</p>
          <p><strong className="text-white mr-2">Kunde:</strong> {renderInteractiveText("Gut, dann nehme ich ein Stück Apfelstrudel und einen Kaffee, bitte.")}</p>
          <p><strong className="text-white mr-2">Kellner:</strong> {renderInteractiveText("Mit Milch und Zucker?")}</p>
          <p><strong className="text-white mr-2">Kunde:</strong> {renderInteractiveText("Nur Milch, bitte.")}</p>
        </>
      ),
      questions: [
        {
          q: "1. Was möchte der Kunde zuerst bestellen?",
          options: [
            "Apfelstrudel",
            "Käsekuchen",
            "Schokoladenkuchen"
          ],
          correct: 1
        },
        {
          q: "2. Was nimmt der Kunde am Ende?",
          options: [
            "Apfelstrudel und Tee",
            "Apfelstrudel und Kaffee",
            "Käsekuchen und Kaffee"
          ],
          correct: 1
        },
        {
          q: "3. Wie trinkt der Kunde seinen Kaffee?",
          options: [
            "Mit Milch und Zucker",
            "Schwarz",
            "Nur mit Milch"
          ],
          correct: 2
        }
      ]
    },
    {
      id: 3,
      title: "Übung 3: Verspätung am Bahnhof",
      desc: "Dengarkan percakapan di stasiun kereta.",
      audioSrc: "/audio/kapitel-1-horen-3.mp3",
      transcriptRaw: "Entschuldigung, ist der Zug nach München schon abgefahren? Nein, er hat 20 Minuten Verspätung, weil es ein Problem mit dem Signal gab. Oh, danke. Wissen Sie, wo Gleis 5 ist? Ja, Sie müssen die Treppe runter und dann gleich rechts.",
      transcriptUI: (
        <>
          <p><strong className="text-white mr-2">Frau:</strong> {renderInteractiveText("Entschuldigung, ist der Zug nach München schon abgefahren?")}</p>
          <p><strong className="text-white mr-2">Mann:</strong> {renderInteractiveText("Nein, er hat 20 Minuten Verspätung, weil es ein Problem mit dem Signal gab.")}</p>
          <p><strong className="text-white mr-2">Frau:</strong> {renderInteractiveText("Oh, danke. Wissen Sie, wo Gleis 5 ist?")}</p>
          <p><strong className="text-white mr-2">Mann:</strong> {renderInteractiveText("Ja, Sie müssen die Treppe runter und dann gleich rechts.")}</p>
        </>
      ),
      questions: [
        {
          q: "1. Wohin fährt der Zug?",
          options: [
            "Nach Berlin",
            "Nach München",
            "Nach Hamburg"
          ],
          correct: 1
        },
        {
          q: "2. Warum hat der Zug Verspätung?",
          options: [
            "Weil es viel Schnee gibt.",
            "Weil der Zugführer krank ist.",
            "Weil es ein Problem mit dem Signal gab."
          ],
          correct: 2
        },
        {
          q: "3. Wo ist Gleis 5?",
          options: [
            "Die Treppe runter und gleich rechts.",
            "Die Treppe rauf und gleich links.",
            "Gleich hier rechts."
          ],
          correct: 0
        }
      ]
    }
  ];

  const currentExercise = exercises[activeTab];

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) clearInterval(timerRef.current);
      setIsPlaying(false);
      return;
    }

    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.error("Audio playback failed, falling back to SpeechSynthesis", e);
        fallbackToSpeechSynthesis();
      });
    } else {
      fallbackToSpeechSynthesis();
    }
  };

  const fallbackToSpeechSynthesis = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentExercise.transcriptRaw);
      utterance.lang = 'de-DE';
      utterance.rate = 0.9;
      
      const estimatedDuration = currentExercise.transcriptRaw.length * 0.08; 
      setDuration(estimatedDuration);
      setProgress(0);
      
      const startTime = Date.now();
      timerRef.current = setInterval(() => {
        let elapsed = (Date.now() - startTime) / 1000;
        if (elapsed >= estimatedDuration) {
          elapsed = estimatedDuration;
          if (timerRef.current) clearInterval(timerRef.current);
        }
        setProgress(elapsed);
      }, 50);

      utterance.onend = () => {
        setIsPlaying(false);
        setProgress(estimatedDuration);
        if (timerRef.current) clearInterval(timerRef.current);
      };
      utterance.onerror = () => {
        setIsPlaying(false);
        if (timerRef.current) clearInterval(timerRef.current);
      };
      
      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Maaf, audio gagal diputar.");
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(duration);
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
      
      {/* Tab Navigation */}
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
        <audio 
          key={currentExercise.id}
          ref={audioRef} 
          src={currentExercise.audioSrc} 
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onLoadedMetadata={handleTimeUpdate}
          preload="auto"
        />

        <p className="text-pink-400 font-bold mb-6 text-sm tracking-[0.2em] uppercase">
          {isPlaying ? 'Audio läuft...' : 'Jetzt anhören'}
        </p>

        {/* Play Button and Progress Waveform Container */}
        <div className="w-full flex flex-col md:flex-row items-center gap-8 max-w-4xl bg-[#11111a] p-6 rounded-3xl border border-white/5 shadow-2xl">
          
          <button 
            onClick={togglePlay}
            className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white shadow-[0_0_20px_rgba(200,50,200,0.4)] bg-gradient-to-br from-[#c130b0] to-[#7b2cbf] hover:scale-105 transition-all z-10 ${isPlaying ? 'animate-pulse shadow-[0_0_40px_rgba(200,50,200,0.6)]' : ''}`} 
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          
          {/* Smooth Soundwave Progress Animation */}
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
        
        {/* Interactive Transcript */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 w-full mt-8 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-violet-400 uppercase tracking-widest">Audio Transcript (Interaktif)</p>
            <span className="text-[10px] bg-white/10 text-slate-300 px-2 py-1 rounded-md uppercase tracking-wider font-bold">Arahkan kursor ke kata</span>
          </div>
          <div className="space-y-4 text-slate-300 font-medium leading-relaxed text-lg">
            {currentExercise.transcriptUI}
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
