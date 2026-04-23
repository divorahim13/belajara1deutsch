"use client";

import React, { useState, useEffect, useRef } from 'react';

export function HorenInteraktiv2() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [isCorrect, setIsCorrect] = useState<Record<number, boolean | null>>({});

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
    
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
  }, [activeTab]);

  const dictionary: Record<string, { meaning: string, type: string }> = {
    // Übung 1
    "was": { meaning: "Apa", type: "Kata Tanya" },
    "möchtest": { meaning: "ingin (dari möchten)", type: "Kata Kerja (Modal)" },
    "du": { meaning: "kamu", type: "Kata Ganti" },
    "nach": { meaning: "setelah", type: "Preposisi" },
    "der": { meaning: "itu (Artikel Dativ untuk die)", type: "Artikel" },
    "schule": { meaning: "sekolah", type: "Kata Benda" },
    "machen": { meaning: "melakukan / membuat", type: "Kata Kerja" },
    "ich": { meaning: "Saya", type: "Kata Ganti" },
    "weiß": { meaning: "tahu (dari wissen)", type: "Kata Kerja" },
    "es": { meaning: "itu (kata ganti netral)", type: "Kata Ganti" },
    "noch": { meaning: "masih", type: "Adverbia" },
    "nicht": { meaning: "tidak", type: "Partikel Negatif" },
    "genau": { meaning: "tepat / pasti", type: "Kata Sifat / Adverbia" },
    "früher": { meaning: "dulu / sebelumnya", type: "Adverbia" },
    "wollte": { meaning: "ingin (bentuk lampau dari wollen)", type: "Kata Kerja (Modal Präteritum)" },
    "medizin": { meaning: "kedokteran", type: "Kata Benda" },
    "studieren": { meaning: "kuliah / studi", type: "Kata Kerja" },
    "aber": { meaning: "tetapi", type: "Konjungsi" },
    "jetzt": { meaning: "sekarang", type: "Adverbia" },
    "denke": { meaning: "berpikir (dari denken)", type: "Kata Kerja" },
    "über": { meaning: "tentang", type: "Preposisi" },
    "eine": { meaning: "sebuah", type: "Artikel" },
    "ausbildung": { meaning: "pendidikan vokasi / magang", type: "Kata Benda" },
    "nachdenken": { meaning: "memikirkan", type: "Kata Kerja (Separable)" },
    "warum": { meaning: "kenapa", type: "Kata Tanya" },
    "weil": { meaning: "karena", type: "Konjungsi" },
    "praktisch": { meaning: "secara praktis", type: "Kata Sifat / Adverbia" },
    "arbeiten": { meaning: "bekerja", type: "Kata Kerja" },
    "durfte": { meaning: "diizinkan (bentuk lampau dari dürfen)", type: "Kata Kerja (Modal Präteritum)" },
    "letztes": { meaning: "terakhir / lalu", type: "Kata Sifat" },
    "jahr": { meaning: "tahun", type: "Kata Benda" },
    "ein": { meaning: "sebuah", type: "Artikel" },
    "praktikum": { meaning: "magang / praktik", type: "Kata Benda" },
    "im": { meaning: "di dalam (in + dem)", type: "Preposisi" },
    "krankenhaus": { meaning: "rumah sakit", type: "Kata Benda" },
    "war": { meaning: "adalah (bentuk lampau dari sein)", type: "Kata Kerja (To Be Präteritum)" },
    "toll": { meaning: "hebat / luar biasa", type: "Kata Sifat" },
    "studium": { meaning: "studi / perkuliahan", type: "Kata Benda" },
    "ist": { meaning: "adalah", type: "Kata Kerja (To Be)" },
    "mir": { meaning: "bagiku / kepadaku", type: "Kata Ganti (Dativ)" },
    "vielleicht": { meaning: "mungkin", type: "Adverbia" },
    "zu": { meaning: "terlalu", type: "Adverbia" },
    "theoretisch": { meaning: "teoretis", type: "Kata Sifat" },
    
    // Übung 2
    "guten": { meaning: "Selamat (seperti Selamat Pagi)", type: "Kata Sifat" },
    "tag": { meaning: "hari", type: "Kata Benda" },
    "herr": { meaning: "Tuan / Bapak", type: "Kata Benda" },
    "sie": { meaning: "Anda", type: "Kata Ganti (Formal)" },
    "interessieren": { meaning: "tertarik (sich interessieren)", type: "Kata Kerja Refleksif" },
    "sich": { meaning: "diri sendiri (refleksif)", type: "Kata Ganti" },
    "für": { meaning: "untuk", type: "Preposisi" },
    "das": { meaning: "itu (Artikel Netral)", type: "Artikel" },
    "in": { meaning: "di / ke dalam", type: "Preposisi" },
    "unserer": { meaning: "kita punya (Dativ Feminin)", type: "Kata Ganti Kepemilikan" },
    "it-abteilung": { meaning: "Departemen IT", type: "Kata Benda" },
    "ja": { meaning: "Ya", type: "Kata Seru" },
    "habe": { meaning: "memiliki (dari haben)", type: "Kata Kerja (Auxiliary)" },
    "gerade": { meaning: "baru saja", type: "Adverbia" },
    "mein": { meaning: "punyaku", type: "Kata Ganti Kepemilikan" },
    "abitur": { meaning: "Ijazah SMA Jerman (Abitur)", type: "Kata Benda" },
    "gemacht": { meaning: "melakukan / membuat (Partizip II)", type: "Kata Kerja" },
    "und": { meaning: "dan", type: "Konjungsi" },
    "informatik": { meaning: "Informatika", type: "Kata Benda" },
    "vor": { meaning: "sebelum", type: "Preposisi" },
    "dem": { meaning: "itu (Artikel Dativ)", type: "Artikel" },
    "praktische": { meaning: "praktis", type: "Kata Sifat" },
    "erfahrungen": { meaning: "pengalaman (Plural)", type: "Kata Benda" },
    "sammeln": { meaning: "mengumpulkan / mencari", type: "Kata Kerja" },
    "sehr": { meaning: "sangat", type: "Adverbia" },
    "gut": { meaning: "baik / bagus", type: "Kata Sifat" },
    "haben": { meaning: "mempunyai", type: "Kata Kerja" },
    "denn": { meaning: "lalu / sebab", type: "Partikel / Konjungsi" },
    "schon": { meaning: "sudah", type: "Adverbia" },
    "programmierkenntnisse": { meaning: "Pengetahuan Pemrograman", type: "Kata Benda" },
    "mit": { meaning: "dengan", type: "Preposisi" },
    "python": { meaning: "Python (Bahasa Pemrograman)", type: "Kata Benda" },
    "java": { meaning: "Java (Bahasa Pemrograman)", type: "Kata Benda" },
    "gearbeitet": { meaning: "bekerja (Partizip II dari arbeiten)", type: "Kata Kerja" },

    // Übung 3
    "morgen": { meaning: "pagi", type: "Kata Benda" },
    "fehlt": { meaning: "kurang / sakit (Was fehlt Ihnen?)", type: "Kata Kerja" },
    "ihnen": { meaning: "Anda (Dativ)", type: "Kata Ganti" },
    "doktor": { meaning: "dokter", type: "Kata Benda" },
    "hals": { meaning: "leher / tenggorokan", type: "Kata Benda" },
    "tut": { meaning: "melakukan / membuat (wehtun = sakit)", type: "Kata Kerja" },
    "weh": { meaning: "sakit", type: "Kata Sifat" },
    "husten": { meaning: "batuk", type: "Kata Benda" },
    "verschreibe": { meaning: "meresepkan", type: "Kata Kerja" },
    "einen": { meaning: "sebuah (Akkusativ Maskulin)", type: "Artikel" },
    "sirup": { meaning: "sirup", type: "Kata Benda" },
    "dürfen": { meaning: "diizinkan / boleh", type: "Kata Kerja (Modal)" },
    "drei": { meaning: "tiga", type: "Angka" },
    "tage": { meaning: "hari-hari", type: "Kata Benda" },
    "lang": { meaning: "selama / panjang", type: "Adverbia" },
    "kalt": { meaning: "dingin", type: "Kata Sifat" },
    "trinken": { meaning: "minum", type: "Kata Kerja" },
    "muss": { meaning: "harus", type: "Kata Kerja (Modal)" },
    "bett": { meaning: "tempat tidur", type: "Kata Benda" },
    "bleiben": { meaning: "tinggal / diam", type: "Kata Kerja" },
    "sollten": { meaning: "seharusnya", type: "Kata Kerja (Modal Präteritum)" },
    "ausruhen": { meaning: "beristirahat (sich ausruhen)", type: "Kata Kerja" },
    "gute": { meaning: "baik", type: "Kata Sifat" },
    "besserung": { meaning: "kesembuhan", type: "Kata Benda" }
  };

  const [activeWord, setActiveWord] = useState<string | null>(null);

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
      title: "Übung 1: Nach der Schule",
      desc: "Dengarkan wawancara berikut und jawab pertanyaannya.",
      audioSrc: "/audio/kapitel-2-horen.mp3",
      transcriptRaw: "Lena, was möchtest du nach der Schule machen? Ich weiß es noch nicht genau. Früher wollte ich Medizin studieren. Aber jetzt denke ich über eine Ausbildung nach. Warum eine Ausbildung? Weil ich praktisch arbeiten möchte. Ich durfte letztes Jahr ein Praktikum im Krankenhaus machen. Es war toll, aber ein Studium ist mir vielleicht zu theoretisch.",
      transcriptUI: (
        <>
          <p><strong className="text-white mr-2">Interviewer:</strong> {renderInteractiveText("Lena, was möchtest du nach der Schule machen?")}</p>
          <p><strong className="text-white mr-2">Lena:</strong> {renderInteractiveText("Ich weiß es noch nicht genau. Früher wollte ich Medizin studieren. Aber jetzt denke ich über eine Ausbildung nach.")}</p>
          <p><strong className="text-white mr-2">Interviewer:</strong> {renderInteractiveText("Warum eine Ausbildung?")}</p>
          <p><strong className="text-white mr-2">Lena:</strong> {renderInteractiveText("Weil ich praktisch arbeiten möchte. Ich durfte letztes Jahr ein Praktikum im Krankenhaus machen. Es war toll, aber ein Studium ist mir vielleicht zu theoretisch.")}</p>
        </>
      ),
      questions: [
        {
          q: "1. Warum möchte Lena vielleicht eine Ausbildung machen?",
          options: [
            "Weil sie Ärztin werden will.",
            "Weil sie lieber praktisch arbeiten möchte.",
            "Weil sie kein Praktikum machen durfte."
          ],
          correct: 1
        },
        {
          q: "2. Was wollte Lena früher machen?",
          options: [
            "Eine Ausbildung machen.",
            "Im Krankenhaus arbeiten.",
            "Medizin studieren."
          ],
          correct: 2
        },
        {
          q: "3. Warum findet Lena ein Studium vielleicht nicht so gut?",
          options: [
            "Es ist zu teuer.",
            "Es ist zu theoretisch.",
            "Es dauert zu lange."
          ],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: "Übung 2: Praktikum in der IT",
      desc: "Dengarkan percakapan tentang lowongan magang.",
      audioSrc: "/audio/kapitel-2-horen-2.mp3",
      transcriptRaw: "Guten Tag, Herr Weber. Sie interessieren sich für das Praktikum in unserer IT-Abteilung? Ja, genau. Ich habe gerade mein Abitur gemacht und möchte Informatik studieren. Vor dem Studium möchte ich aber praktische Erfahrungen sammeln. Sehr gut. Haben Sie denn schon Programmierkenntnisse? Ja, ich habe in der Schule schon mit Python und Java gearbeitet.",
      transcriptUI: (
        <>
          <p><strong className="text-white mr-2">Interviewer:</strong> {renderInteractiveText("Guten Tag, Herr Weber. Sie interessieren sich für das Praktikum in unserer IT-Abteilung?")}</p>
          <p><strong className="text-white mr-2">Herr Weber:</strong> {renderInteractiveText("Ja, genau. Ich habe gerade mein Abitur gemacht und möchte Informatik studieren. Vor dem Studium möchte ich aber praktische Erfahrungen sammeln.")}</p>
          <p><strong className="text-white mr-2">Interviewer:</strong> {renderInteractiveText("Sehr gut. Haben Sie denn schon Programmierkenntnisse?")}</p>
          <p><strong className="text-white mr-2">Herr Weber:</strong> {renderInteractiveText("Ja, ich habe in der Schule schon mit Python und Java gearbeitet.")}</p>
        </>
      ),
      questions: [
        {
          q: "1. Wofür interessiert sich Herr Weber?",
          options: [
            "Für ein Studium in Medizin",
            "Für ein Praktikum in der IT-Abteilung",
            "Für einen Job als Lehrer"
          ],
          correct: 1
        },
        {
          q: "2. Was möchte Herr Weber in der Zukunft machen?",
          options: [
            "Informatik studieren",
            "Abitur machen",
            "Im Krankenhaus arbeiten"
          ],
          correct: 0
        },
        {
          q: "3. Welche Programmiersprachen kennt er schon?",
          options: [
            "C++ und HTML",
            "Python und Java",
            "JavaScript und Ruby"
          ],
          correct: 1
        }
      ]
    },
    {
      id: 3,
      title: "Übung 3: Beim Arzt",
      desc: "Dengarkan percakapan pasien dengan dokter.",
      audioSrc: "/audio/kapitel-2-horen-3.mp3",
      transcriptRaw: "Guten Morgen. Was fehlt Ihnen? Guten Morgen, Herr Doktor. Mein Hals tut mir weh und ich habe Husten. Ich verschreibe Ihnen einen Sirup. Sie dürfen drei Tage lang nicht kalt trinken. Muss ich im Bett bleiben? Ja, Sie sollten sich ausruhen. Gute Besserung!",
      transcriptUI: (
        <>
          <p><strong className="text-white mr-2">Arzt:</strong> {renderInteractiveText("Guten Morgen. Was fehlt Ihnen?")}</p>
          <p><strong className="text-white mr-2">Patient:</strong> {renderInteractiveText("Guten Morgen, Herr Doktor. Mein Hals tut mir weh und ich habe Husten.")}</p>
          <p><strong className="text-white mr-2">Arzt:</strong> {renderInteractiveText("Ich verschreibe Ihnen einen Sirup. Sie dürfen drei Tage lang nicht kalt trinken.")}</p>
          <p><strong className="text-white mr-2">Patient:</strong> {renderInteractiveText("Muss ich im Bett bleiben?")}</p>
          <p><strong className="text-white mr-2">Arzt:</strong> {renderInteractiveText("Ja, Sie sollten sich ausruhen. Gute Besserung!")}</p>
        </>
      ),
      questions: [
        {
          q: "1. Was fehlt dem Patienten?",
          options: [
            "Er hat Bauchschmerzen.",
            "Er hat Halsschmerzen und Husten.",
            "Er hat Fieber."
          ],
          correct: 1
        },
        {
          q: "2. Was darf der Patient drei Tage lang nicht machen?",
          options: [
            "Er darf nicht kalt trinken.",
            "Er darf nicht schlafen.",
            "Er darf nicht essen."
          ],
          correct: 0
        },
        {
          q: "3. Muss der Patient im Bett bleiben?",
          options: [
            "Nein, er kann zur Arbeit gehen.",
            "Ja, er sollte sich ausruhen.",
            "Nur am Abend."
          ],
          correct: 1
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
