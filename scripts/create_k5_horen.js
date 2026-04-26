const fs = require('fs');
const path = require('path');

let content = `
"use client";

import React, { useState, useEffect } from 'react';

type DialogueLine = { speaker: string; text: string; voice: string; };

export function HorenInteraktiv5() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [audioElements, setAudioElements] = useState<HTMLAudioElement[]>([]);
  
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const dialogue: DialogueLine[] = [
    { speaker: "Reiseleiterin", voice: "nova", text: "Herzlich willkommen in Wien! Wir starten unsere Tour am Ring. An der Ringstraße gibt es Kunst, Kultur und Politik." },
    { speaker: "Tourist", voice: "onyx", text: "Entschuldigung, wo sind wir jetzt genau?" },
    { speaker: "Reiseleiterin", voice: "nova", text: "Wir stehen jetzt vor dem Burgtheater. Das ist das wichtigste Theater in Österreich. Über 100 Schauspielerinnen und Schauspieler arbeiten dort. Dazu kommen ungefähr 300 Angestellte in Verwaltung und Technik." },
    { speaker: "Tourist", voice: "onyx", text: "Wahnsinn, so viele! Und was ist das große Gebäude da drüben?" },
    { speaker: "Reiseleiterin", voice: "nova", text: "Das ist das Rathaus von Wien. Es steht direkt neben dem Parlament. Politiker machen dort neue Gesetze." },
    { speaker: "Tourist", voice: "onyx", text: "Gibt es hier auch einen Park zum Entspannen?" },
    { speaker: "Reiseleiterin", voice: "nova", text: "Ja, natürlich. Direkt hier ist der Volksgarten. Wiener und Touristen finden dort Ruhe und Entspannung. Im Sommer kann man in Lokalen Pause machen, und nachts gibt es dort die Volksgarten Clubdisco." },
    { speaker: "Tourist", voice: "onyx", text: "Und wo finde ich Kunst?" },
    { speaker: "Reiseleiterin", voice: "nova", text: "Hinter den alten Museen an der Ringstraße liegt das Museumsquartier. Moderne Kunst findet man im mumok und im Museum Leopold. Dort gibt es viele berühmte Bilder." }
  ];

  useEffect(() => {
    let isMounted = true;
    const elements = dialogue.map(line => {
      const url = \`/api/tts?text=\${encodeURIComponent(line.text)}&voice=\${line.voice}\`;
      const audio = new Audio(url);
      audio.preload = "auto";
      return audio;
    });
    setAudioElements(elements);

    const totalChars = dialogue.reduce((acc, line) => acc + line.text.length, 0);
    setDuration(totalChars * 0.08);

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
      elements.forEach(a => { a.pause(); a.src = ""; });
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioElements.forEach(a => { a.pause(); a.ontimeupdate = null; });
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
    if (index >= dialogue.length) {
      setIsPlaying(false);
      setProgress(duration);
      return;
    }
    setCurrentLineIndex(index);
    const audio = audioElements[index];
    
    audio.ontimeupdate = () => {
      let previousDuration = 0;
      for (let i = 0; i < index; i++) previousDuration += (audioElements[i].duration || 0);
      setProgress(previousDuration + audio.currentTime);
    };

    audio.onended = () => {
      audio.ontimeupdate = null;
      playLine(index + 1);
    };
    
    audio.play().catch(e => {
      console.error(e);
      setTimeout(() => playLine(index + 1), dialogue[index].text.length * 80);
    });
  };

  const correctAnswers = {
    "q1": "Volksgarten",
    "q2": "Museumsquartier",
    "q3": "Rathaus",
    "q4": "Volksgarten Clubdisco",
    "q5": "Burgtheater"
  };

  const handleInputChange = (id: string, val: string) => {
    setAnswers(prev => ({...prev, [id]: val}));
  };

  const numBars = 50;
  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black text-slate-900">Rund um den Ring</h2>
        <p className="text-slate-600 mt-2 font-medium">Hören Sie die Stadt-Tour in Wien.</p>
      </div>

      <div className="clay-card p-8 bg-[#0b0b14] border-[#181825] border-b-8 flex flex-col items-center">
        <p className="text-pink-400 font-bold mb-6 text-sm tracking-[0.2em] uppercase">
          {isPlaying ? 'Audio läuft...' : 'Jetzt anhören'}
        </p>

        <div className="w-full flex flex-col md:flex-row items-center gap-8 max-w-4xl bg-[#11111a] p-6 rounded-3xl border border-white/5 shadow-2xl">
          <button 
            onClick={togglePlay}
            className={\`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white shadow-[0_0_20px_rgba(200,50,200,0.4)] bg-gradient-to-br from-[#c130b0] to-[#7b2cbf] hover:scale-105 transition-all z-10 \${isPlaying ? 'animate-pulse' : ''}\`} 
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          
          <div className="flex-1 w-full relative h-16 flex items-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-between gap-[2px] w-full opacity-30">
              {Array.from({ length: numBars }).map((_, i) => (
                <div key={\`bg-\${i}\`} className="w-full bg-slate-600 rounded-full h-full"></div>
              ))}
            </div>
            <div 
              className="absolute inset-0 flex items-center justify-between gap-[2px] w-full"
              style={{ clipPath: \`inset(0 \${100 - progressPercentage}% 0 0)\` }}
            >
              {Array.from({ length: numBars }).map((_, i) => (
                <div key={\`fg-\${i}\`} className="w-full bg-pink-500 rounded-full h-full shadow-[0_0_10px_rgba(236,72,153,0.8)]"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-white/5 w-full mt-8 max-h-64 overflow-y-auto">
          <div className="space-y-4 text-slate-300 font-medium">
            {dialogue.map((line, index) => (
              <p key={index} className={\`transition-all \${isPlaying && index === currentLineIndex ? 'text-white bg-white/10 p-2 rounded-lg' : ''}\`}>
                <strong className={line.speaker === 'Reiseleiterin' ? 'text-pink-400' : 'text-sky-400'}>{line.speaker}: </strong> 
                {line.text}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="clay-card p-8 bg-white border-2 border-slate-200">
        <h3 className="text-xl font-black mb-6">Wer geht wohin? Ordnen Sie zu.</h3>
        <div className="space-y-4">
          {[
            { id: "q1", text: "Nadja geht am Ring spazieren und braucht eine Pause." },
            { id: "q2", text: "Francisco möchte mehr über moderne Kunst wissen." },
            { id: "q3", text: "Aysu interessiert sich für Politik und Gesetze." },
            { id: "q4", text: "Steffi möchte nachts tanzen gehen." },
            { id: "q5", text: "Oscar und Claas sehen gerne Dramen und Schauspieler." }
          ].map(q => (
            <div key={q.id} className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <span className="flex-1 font-medium text-slate-700">{q.text}</span>
              <select 
                value={answers[q.id] || ""}
                onChange={(e) => handleInputChange(q.id, e.target.value)}
                className={\`p-3 border-2 rounded-xl font-bold outline-none \${showResult ? (answers[q.id] === correctAnswers[q.id as keyof typeof correctAnswers] ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-rose-500 bg-rose-50 text-rose-700') : 'border-slate-300 bg-slate-50 text-slate-700'}\`}
              >
                <option value="">-- Ort wählen --</option>
                <option value="Volksgarten">Volksgarten</option>
                <option value="Museumsquartier">Museumsquartier</option>
                <option value="Rathaus">Rathaus / Parlament</option>
                <option value="Volksgarten Clubdisco">Volksgarten Clubdisco</option>
                <option value="Burgtheater">Burgtheater</option>
              </select>
            </div>
          ))}
        </div>
        <button onClick={() => setShowResult(true)} className="mt-8 px-8 py-3 bg-slate-900 text-white font-black rounded-xl">Prüfen</button>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, '../app/dashboard/HorenInteraktiv5.tsx'), content, 'utf8');
console.log("Created HorenInteraktiv5.tsx");
