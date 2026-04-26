"use client";

import React, { useState, useEffect, useRef } from 'react';
import { hoerenData } from './data/hoeren-data';
// We'll fetch the manifest on the client instead of importing to avoid build issues if it's generated post-build
// Or we can import it since it's generated pre-build. Let's import it to ensure type safety and bundling.
import audioManifest from '../../public/audio/audio-manifest.json';

type HorenInteraktivTemplateProps = {
  kapitelId: number;
  dictionary: Record<string, { meaning: string, type: string }>;
};

export function HorenInteraktivTemplate({ kapitelId, dictionary }: HorenInteraktivTemplateProps) {
  const exercises = hoerenData[kapitelId] || [];
  
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [isCorrect, setIsCorrect] = useState<Record<number, boolean | null>>({});
  const [activeWord, setActiveWord] = useState<string | null>(null);

  const currentExercise = exercises[activeTab];

  // Prefetch audio and load manifest data
  useEffect(() => {
    if (!currentExercise) return;

    const trackId = currentExercise.trackId;
    const manifestData = (audioManifest as any)[trackId];

    if (!manifestData) {
      console.warn(`No audio manifest found for track ${trackId}`);
      return;
    }

    const audio = new Audio(manifestData.audioUrl);
    audio.preload = "auto";
    audioRef.current = audio;
    
    // Set duration from manifest immediately
    setDuration(manifestData.durationMs / 1000);

    const handleTimeUpdate = () => {
      const currentTimeMs = audio.currentTime * 1000;
      setProgress(audio.currentTime);
      
      const segments = manifestData.segments || [];
      const activeSegmentIndex = segments.findIndex(
        (s: any) => currentTimeMs >= s.startMs && currentTimeMs <= s.endMs
      );
      
      if (activeSegmentIndex !== -1) {
        setCurrentLineIndex(activeSegmentIndex);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(manifestData.durationMs / 1000);
      setCurrentLineIndex(currentExercise.dialogue.length - 1);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.src = "";
      audioRef.current = null;
    };
  }, [activeTab, currentExercise]);

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
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (progress >= duration && duration > 0) {
        audioRef.current.currentTime = 0;
      }
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.error("Playback error:", e));
    }
  };

  const handleCheck = (qIndex: number, optIndex: number) => {
    setSelectedAnswers(prev => ({...prev, [qIndex]: optIndex}));
    const qObj = currentExercise.questions[qIndex];
    const correct = typeof qObj.correct !== 'undefined' ? qObj.correct : (qObj as any).correctAnswer;
    setIsCorrect(prev => ({...prev, [qIndex]: optIndex === correct}));
  };

  const renderInteractiveText = (text: string) => {
    if (!text) return null;
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

  if (!currentExercise) {
    return <div className="text-white text-center py-20">Keine Daten verfügbar.</div>;
  }

  const numBars = 50;
  const waveformHeights = [
    20, 30, 45, 60, 80, 100, 85, 70, 50, 40,
    30, 25, 40, 55, 75, 95, 80, 60, 45, 35,
    30, 45, 65, 85, 100, 90, 75, 55, 40, 30,
    25, 35, 50, 70, 90, 100, 85, 65, 50, 40,
    30, 45, 60, 80, 95, 75, 55, 40, 30, 20
  ];

  const progressPercentage = duration > 0 ? Math.min(100, Math.max(0, (progress / duration) * 100)) : 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {exercises.map((ex, idx) => (
          <button
            key={ex.id || idx}
            onClick={() => setActiveTab(idx)}
            className={`px-6 py-3 rounded-2xl font-bold transition-all shadow-sm ${
              activeTab === idx 
                ? 'bg-violet-600 text-white shadow-violet-500/30 scale-105' 
                : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50 hover:border-violet-300 hover:text-violet-600'
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
            {currentExercise.dialogue ? currentExercise.dialogue.map((line, index) => {
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
            }) : <p className="text-slate-600 italic">No dialogue transcript available.</p>}
          </div>
        </div>
      </div>

      <div className="space-y-6 mt-10">
        {currentExercise.questions.map((item, qIndex) => (
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
