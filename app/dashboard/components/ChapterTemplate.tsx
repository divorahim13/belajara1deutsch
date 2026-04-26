'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import ProgressTracker, { MarkCompleteButton } from '../ProgressTracker';

// ============================================================
// TYPES
// ============================================================
export interface WortschatzItem {
  de: string;
  plural?: string;
  id: string;
  beispiel: string;
  kategorie: string;
}

export interface PartizipZweiItem {
  infinitiv: string;
  partizip: string;
  hilfsverb: 'haben' | 'sein' | 'hat' | 'ist' | string;
  id: string;
  praesens?: string[];
  beispiel?: string;
}

export interface GrammatikItem {
  titel?: string;
  name?: string;
  farbe: string;
  erklaerung?: string;
  erklärung?: string;
  tiefenErklaerung?: string;
  struktur: string;
  konjugationsTabelle: any | null;
  beispiele: any[];
  mehrBeispiele?: any[];
  falle?: string;
}

export interface GoetheTaskItem {
  skill: string;
  icon: string;
  farbe: string;
  tasks: any[];
}

export interface LernTippItem {
  nummer: number;
  titel: string;
  icon: string;
  farbe: string;
  beschreibung: string;
  tag: string;
}

export interface MiniQuizItem {
  frage: string;
  options: string[];
  besteAntwort: number;
}

export interface KapitelData {
  nummer: number;
  titel: string;
  untertitel: string;
  level: string;
  goetheFokus: string[];
  beschreibung?: string;
}

export interface ChapterTemplateProps {
  kapitelId: string; // e.g. "kapitel1"
  kapitel: KapitelData;
  wortschatz: WortschatzItem[];
  partizipZwei?: PartizipZweiItem[];
  grammatik: GrammatikItem[];
  goetheTasks?: GoetheTaskItem[];
  lernTipps: LernTippItem[];
  miniQuiz?: MiniQuizItem[];
  
  LesenComponent?: React.ReactNode;
  HorenComponent?: React.ReactNode;
  SchreibenComponent?: React.ReactNode;
  GrammatikInteraktivComponent?: React.ReactNode;
  TestComponent?: React.ReactNode;
}

// ============================================================
// STYLES
// ============================================================
const kategorieStyles: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  'Sprachen': { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-300', dot: 'bg-blue-500' },
  'Beruf': { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-300', dot: 'bg-amber-500' },
  'Familie & Wohnen': { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-300', dot: 'bg-purple-500' },
  'Freizeit': { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-300', dot: 'bg-rose-500' },
  'Essen': { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-300', dot: 'bg-orange-500' },
  'Kommunikation': { bg: 'bg-cyan-50', text: 'text-cyan-800', border: 'border-cyan-300', dot: 'bg-cyan-500' },
  'Alltag': { bg: 'bg-teal-50', text: 'text-teal-800', border: 'border-teal-300', dot: 'bg-teal-500' },
  'Stadtservice': { bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-300', dot: 'bg-indigo-500' },
  'Behörde': { bg: 'bg-slate-50', text: 'text-slate-800', border: 'border-slate-300', dot: 'bg-slate-500' },
  'Bank': { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-300', dot: 'bg-emerald-500' },
};

const grammatikStyles: Record<string, { header: string; card: string; accent: string }> = {
  indigo: { header: 'bg-indigo-600 text-white', card: 'bg-indigo-50 border-indigo-200', accent: 'bg-indigo-600' },
  violet: { header: 'bg-violet-600 text-white', card: 'bg-violet-50 border-violet-200', accent: 'bg-violet-600' },
  blue: { header: 'bg-blue-600 text-white', card: 'bg-blue-50 border-blue-200', accent: 'bg-blue-600' },
  amber: { header: 'bg-amber-600 text-white', card: 'bg-amber-50 border-amber-200', accent: 'bg-amber-600' },
  emerald: { header: 'bg-emerald-600 text-white', card: 'bg-emerald-50 border-emerald-200', accent: 'bg-emerald-600' },
  rose: { header: 'bg-rose-600 text-white', card: 'bg-rose-50 border-rose-200', accent: 'bg-rose-600' },
  sky: { header: 'bg-sky-600 text-white', card: 'bg-sky-50 border-sky-200', accent: 'bg-sky-600' },
};

const goetheStyles: Record<string, { header: string; border: string; bg: string; btn: string }> = {
  amber: { header: 'bg-amber-500 text-white', border: 'border-amber-300', bg: 'bg-amber-50', btn: 'text-amber-700' },
  emerald: { header: 'bg-emerald-600 text-white', border: 'border-emerald-300', bg: 'bg-emerald-50', btn: 'text-emerald-700' },
  sky: { header: 'bg-sky-500 text-white', border: 'border-sky-300', bg: 'bg-sky-50', btn: 'text-sky-700' },
  rose: { header: 'bg-rose-500 text-white', border: 'border-rose-300', bg: 'bg-rose-50', btn: 'text-rose-700' },
  violet: { header: 'bg-violet-500 text-white', border: 'border-violet-300', bg: 'bg-violet-50', btn: 'text-violet-700' },
  indigo: { header: 'bg-indigo-500 text-white', border: 'border-indigo-300', bg: 'bg-indigo-50', btn: 'text-indigo-700' },
};

const lernTippStyles: Record<string, string> = {
  indigo: 'from-indigo-500 to-indigo-600',
  violet: 'from-violet-500 to-violet-600',
  emerald: 'from-emerald-500 to-emerald-600',
  rose: 'from-rose-500 to-rose-600',
  amber: 'from-amber-500 to-amber-600',
  sky: 'from-sky-500 to-sky-600',
};

// ============================================================
// SHARED COMPONENTS
// ============================================================

function FlashCard({ wort }: { wort: WortschatzItem }) {
  const [flipped, setFlipped] = useState(false);
  const style = kategorieStyles[wort.kategorie] || kategorieStyles['Alltag'] || kategorieStyles['Sprachen'];

  return (
    <div className="relative" style={{ perspective: '1000px', height: '190px' }}>
      <div
        className="w-full h-full transition-transform duration-500 cursor-pointer flip-card-inner"
        style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)', position: 'relative' }}
        onClick={() => setFlipped(!flipped)}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 clay-card p-5 flex flex-col justify-between bg-white flip-card-face`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className="flex justify-between items-start gap-2">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg border ${style.bg} ${style.text} ${style.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
              {wort.kategorie}
            </span>
            <span className="text-xs text-slate-600 font-medium flex-shrink-0">Klik balik →</span>
          </div>
          <div className="text-center px-2 flex-1 flex flex-col justify-center items-center">
            <p className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">{wort.de}</p>
            {wort.plural && (
              <p className="text-[11px] font-bold text-slate-700 mt-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-300 shadow-sm leading-none">
                Pl: {wort.plural}
              </p>
            )}
          </div>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 clay-card p-5 flex flex-col justify-center flip-card-face ${style.bg}`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center">
            <p className={`text-xs font-bold uppercase tracking-widest ${style.text} opacity-80`}>{wort.de}</p>
            <p className={`text-xl font-extrabold ${style.text}`}>{wort.id}</p>
            <div className={`mt-2 pt-2 border-t w-full ${style.border}`}>
              <p className={`text-xs italic opacity-85 ${style.text} leading-relaxed`}>„{wort.beispiel}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GrammatikKarte({ gram }: { gram: GrammatikItem }) {
  const [showFalle, setShowFalle] = useState(false);
  const [showTiefe, setShowTiefe] = useState(false);
  const [showMehr, setShowMehr] = useState(false);
  const s = grammatikStyles[gram.farbe] || grammatikStyles.indigo;

  return (
    <div className="clay-card overflow-hidden">
      <div className={`p-5 ${s.header}`}>
        <h3 className="text-xl font-extrabold">{gram.name || gram.titel}</h3>
        <p className="text-sm mt-1 opacity-90">{gram.erklärung || gram.erklaerung}</p>
      </div>
      <div className="p-5 space-y-4 bg-white">
        {gram.tiefenErklaerung && (
          <>
            <button
              onClick={() => setShowTiefe(!showTiefe)}
              className={`w-full text-left p-3 bg-white border-2 border-slate-300 rounded-xl text-slate-700 font-bold text-sm cursor-pointer hover:bg-slate-50 transition-colors flex justify-between items-center`}
            >
              <span>🧠 Penjelasan Mendalam (Linguistik)</span>
              <span className="text-xl leading-none">{showTiefe ? '−' : '+'}</span>
            </button>
            {showTiefe && (
              <div className="p-4 bg-slate-50 rounded-xl border-2 border-slate-300 text-sm text-slate-800 leading-relaxed shadow-inner">
                <span className="font-extrabold text-indigo-700 block mb-2">Menggali Lebih Dalam:</span>
                {gram.tiefenErklaerung}
              </div>
            )}
          </>
        )}

        {gram.struktur && (
          <div className={`rounded-xl border-2 p-3 font-mono text-sm ${s.card} text-slate-800`}>
            <span className="text-xs font-bold text-slate-700 block mb-1 uppercase tracking-wide">Struktur</span>
            {gram.struktur}
          </div>
        )}
        
        {gram.konjugationsTabelle && (
          <div className="overflow-x-auto rounded-xl border border-slate-300 shadow-sm mt-4">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-xs">
                <tr>
                  {gram.konjugationsTabelle.headers.map((h: string, i: number) => (
                    <th key={i} className="px-4 py-3 border-b border-slate-300">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {gram.konjugationsTabelle.rows.map((row: string[], i: number) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    {row.map((cell: string, j: number) => (
                      <td key={j} className={`px-4 py-3 ${j === 0 ? 'font-bold text-slate-800' : 'text-slate-600'}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="space-y-2 mt-4">
          <span className="text-xs font-bold text-slate-700 block uppercase tracking-wide mb-2">Contoh Kalimat</span>
          {gram.beispiele.map((b: any, i: number) => (
            <div key={i} className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl border border-slate-300">
              <span className={`w-6 h-6 rounded-full ${s.accent} text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5`}>{i + 1}</span>
              <div>
                <p className="font-bold text-slate-900 text-sm">{b.satz}</p>
                <p className="text-xs text-slate-600 mt-0.5">{b.terjemahan}</p>
              </div>
            </div>
          ))}
          
          {gram.mehrBeispiele && gram.mehrBeispiele.length > 0 && (
            <>
              {showMehr && gram.mehrBeispiele.map((b: any, i: number) => (
                <div key={`mehr-${i}`} className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl border border-slate-300 animate-in fade-in duration-300">
                  <span className={`w-6 h-6 rounded-full ${s.accent} text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 opacity-60`}>{gram.beispiele.length + i + 1}</span>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{b.satz}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{b.terjemahan}</p>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => setShowMehr(!showMehr)}
                className="w-full py-2 text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors mt-2"
              >
                {showMehr ? 'Sembunyikan Contoh Tambahan ▲' : 'Lihat Lebih Banyak Contoh ▼'}
              </button>
            </>
          )}
        </div>
        
        {gram.falle && (
          <>
            <button
              onClick={() => setShowFalle(!showFalle)}
              className="w-full text-left p-3 bg-red-50 border-2 border-red-300 rounded-xl text-red-700 font-bold text-sm cursor-pointer hover:bg-red-100 transition-colors mt-4"
            >
              ⚠️ Häufige Fehler {showFalle ? '▲' : '▼'}
            </button>
            {showFalle && (
              <div className="p-3 bg-red-50 rounded-xl border-2 border-red-300 text-sm text-red-800">
                {gram.falle}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function GoetheTaskKarte({ task }: { task: GoetheTaskItem }) {
  const [showAntwort, setShowAntwort] = useState(false);
  const s = goetheStyles[task.farbe] || goetheStyles.amber;

  if (!task.tasks || task.tasks.length === 0) return null;

  return (
    <div className={`clay-card bg-white overflow-hidden border-2 ${s.border}`}>
      <div className={`p-4 flex items-center gap-3 ${s.header}`}>
        <span className="text-2xl">{task.icon}</span>
        <div>
          <p className="font-extrabold text-lg">{task.skill}</p>
          <p className="text-xs opacity-90">{task.tasks[0].typ}</p>
        </div>
        <span className="ml-auto text-xs font-bold opacity-80 bg-white/20 px-2 py-1 rounded-lg">Goethe A2</span>
      </div>
      <div className={`p-5 space-y-4 ${s.bg}`}>
        <p className="text-sm text-slate-700">{task.tasks[0].beschreibung}</p>
        <div className="bg-white rounded-xl border-2 border-slate-300 p-4 text-sm text-slate-800 whitespace-pre-line leading-relaxed font-mono">
          {task.tasks[0].text}
        </div>
        <div className="p-3 bg-white rounded-xl border-2 border-slate-300 text-sm font-bold text-slate-800">
          ❓ {task.tasks[0].frage}
        </div>
        <button
          onClick={() => setShowAntwort(!showAntwort)}
          className="clay-button clay-button-secondary w-full text-center cursor-pointer"
        >
          {showAntwort ? '▲ Sembunyikan Jawaban' : '▼ Lihat Jawaban / Tips'}
        </button>
        {showAntwort && (
          <div className="p-4 bg-green-50 rounded-xl border-2 border-green-300 text-sm text-green-900">
            <span className="font-extrabold text-green-700 block mb-1">✅ Contoh Jawaban:</span>
            {task.tasks[0].antwort}
          </div>
        )}
      </div>
    </div>
  );
}

function MiniQuizFrage({ frage, options, besteAntwort, index }: MiniQuizItem & { index: number }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-300">
      <p className="font-bold text-slate-900 text-sm">{index + 1}. {frage}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === besteAntwort;
          const showResult = selected !== null;

          let cls = 'px-3 py-2 rounded-xl border-2 font-semibold text-sm cursor-pointer transition-all ';
          if (!showResult) cls += 'bg-white border-slate-300 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50';
          else if (isCorrect) cls += 'bg-green-100 border-green-400 text-green-800';
          else if (isSelected) cls += 'bg-red-100 border-red-400 text-red-800';
          else cls += 'bg-white border-slate-300 text-slate-600';

          return (
            <button key={i} onClick={() => { if (selected === null) setSelected(i); }} className={cls}>
              {String.fromCharCode(65 + i)}) {opt}
            </button>
          );
        })}
        {selected !== null && (
          <button onClick={() => setSelected(null)} className="px-3 py-2 rounded-xl border-2 border-indigo-300 bg-indigo-50 text-indigo-700 font-bold text-sm cursor-pointer hover:bg-indigo-100">
            ↺ Reset
          </button>
        )}
      </div>
      {selected !== null && (
        <p className={`text-xs font-bold mt-1 ${selected === besteAntwort ? 'text-green-700' : 'text-red-700'}`}>
          {selected === besteAntwort ? '🎉 Benar! Jawaban tepat.' : `✗ Salah. Jawaban benar: ${String.fromCharCode(65 + besteAntwort)}) ${options[besteAntwort]}`}
        </p>
      )}
    </div>
  );
}

function WortschatzGame({ wortschatz }: { wortschatz: WortschatzItem[] }) {
  const [queue, setQueue] = useState<any[]>([]);
  const [question, setQuestion] = useState<any>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const inputRef = useRef<any>(null);

  const startGame = useCallback(() => {
    const shuffled = [...wortschatz].sort(() => Math.random() - 0.5);
    setQueue(shuffled);
    setQuestion(shuffled[0]);
    setCorrectCount(0);
    setWrongCount(0);
    setStreak(0);
    setInputVal('');
    setStatus('idle');
    setIsFinished(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [wortschatz]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  const handleCheck = () => {
    if (!inputVal.trim()) return;
    const isCorrect = inputVal.trim().toLowerCase() === question.de.toLowerCase();
    
    if (isCorrect) {
      setStatus('correct');
      setCorrectCount(c => c + 1);
      setStreak(s => s + 1);
    } else {
      setStatus('wrong');
      setWrongCount(c => c + 1);
      setStreak(0);
      setQueue(q => [...q, question]);
    }
  };

  const handleNext = () => {
    const nextQ = queue[1];
    setQueue(q => q.slice(1));
    if (nextQ) {
      setQuestion(nextQ);
      setInputVal('');
      setStatus('idle');
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="clay-card p-10 bg-indigo-50 border-indigo-200 text-center space-y-6">
        <h3 className="text-3xl font-extrabold text-indigo-900">Latihan Selesai! 🎉</h3>
        <div className="flex justify-center gap-6">
          <div className="bg-white p-4 rounded-xl border-2 border-green-200">
            <p className="text-sm font-bold text-slate-700 uppercase">Benar</p>
            <p className="text-3xl font-black text-green-600">{correctCount}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border-2 border-red-200">
            <p className="text-sm font-bold text-slate-700 uppercase">Salah</p>
            <p className="text-3xl font-black text-red-600">{wrongCount}</p>
          </div>
        </div>
        <button onClick={startGame} className="clay-button clay-button-primary px-8 cursor-pointer">
          Ulangi Latihan ↺
        </button>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="clay-card p-6 md:p-8 bg-indigo-600 text-white max-w-2xl mx-auto border-4 border-indigo-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-black text-indigo-100 flex items-center gap-2">
          <span>💬</span> Wortschatz Recall
        </h3>
        <div className="flex gap-3">
          <span className="text-sm font-bold bg-indigo-500 px-3 py-1 rounded-full border border-indigo-400 shadow-inner">
            Sisa: {queue.length}
          </span>
          {streak > 2 && (
            <span className="text-sm font-bold bg-amber-500 px-3 py-1 rounded-full border border-amber-400 text-amber-50 shadow-[0_0_15px_rgba(245,158,11,0.5)] animate-pulse">
              🔥 Streak: {streak}
            </span>
          )}
        </div>
      </div>

      <div className="bg-indigo-700/50 rounded-2xl p-8 text-center border-b-4 border-indigo-800 mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <p className="text-indigo-200 font-bold uppercase tracking-widest text-xs mb-3">Apa bahasa Jermannya:</p>
        <h4 className="text-3xl md:text-4xl font-black text-white leading-tight">{question.id}</h4>
        {question.plural && (
          <p className="text-indigo-300 mt-3 text-sm font-medium">Kategori: {question.kategorie}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={status !== 'idle'}
            placeholder="Ketik bahasa Jermannya..."
            className="w-full bg-white text-indigo-950 font-black text-xl p-5 rounded-2xl outline-none text-center shadow-inner placeholder-slate-300"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (status === 'idle') handleCheck();
                else handleNext();
              }
            }}
          />
          {status === 'idle' && inputVal && (
            <button 
              onClick={handleCheck}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-500 transition-colors"
            >
              ↵
            </button>
          )}
        </div>

        {status !== 'idle' && (
          <div className={`p-5 rounded-2xl border-b-4 animate-in zoom-in duration-200 ${status === 'correct' ? 'bg-emerald-100 border-emerald-400 text-emerald-900' : 'bg-rose-100 border-rose-400 text-rose-900'}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-black text-lg flex items-center gap-2">
                  {status === 'correct' ? '🎉 Tepat Sekali!' : '❌ Ops, belum tepat!'}
                </p>
                <p className="text-2xl font-black mt-1">{question.de}</p>
                {question.plural && (
                  <p className="text-sm font-bold mt-1 opacity-80">Plural: {question.plural}</p>
                )}
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t-2 border-current/20">
              <p className="text-sm font-medium italic opacity-90">„{question.beispiel}“</p>
            </div>

            <button 
              onClick={handleNext} 
              className={`mt-5 w-full py-3.5 rounded-xl font-black text-white text-lg transition-all active:translate-y-1 shadow-md ${status === 'correct' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-rose-600 hover:bg-rose-500'}`}
            >
              Lanjut (Enter)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MistakeBadge({ type, kapitelId }: { type: 'perfekt', kapitelId: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const saved = localStorage.getItem(`${type}_mistakes:${kapitelId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCount(parsed.length);
      } catch (e) {}
    }
  }, [type, kapitelId]);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem(`${type}_mistakes:${kapitelId}`);
    setCount(0);
  };

  if (count === 0) return null;
  return (
    <div className="flex flex-col items-end gap-1">
      <div className="bg-rose-500 text-white text-[10px] font-black px-2 py-1 rounded-full border-2 border-white shadow-lg animate-bounce cursor-default">
        {count} KATA SULIT
      </div>
      <button 
        onClick={handleClear}
        className="text-[10px] font-bold bg-slate-800 text-white px-2 py-0.5 rounded-full hover:bg-rose-600 transition-colors shadow-md border border-slate-700"
      >
        Hapus 🗑️
      </button>
    </div>
  );
}

function PartizipZweiGame({ partizipZwei, kapitelId }: { partizipZwei: PartizipZweiItem[], kapitelId: string }) {
  const [queue, setQueue] = useState<any[]>([]);
  const [question, setQuestion] = useState<any>(null);
  const [masteredCount, setMasteredCount] = useState(0);
  const [mistakes, setMistakes] = useState<any[]>([]);
  const [hilfsverbInput, setHilfsverbInput] = useState<'haben' | 'sein' | ''>('');
  const [partizipInput, setPartizipInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  const totalWords = partizipZwei.length;
  
  const inputRef = useRef<any>(null);

  const umlauts = ['ä', 'ö', 'ü', 'ß'];

  // Load mistakes logic isolated per kapitel
  useEffect(() => {
    const saved = localStorage.getItem(`perfekt_mistakes:${kapitelId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setMistakes(parsed);
      } catch (e) {}
    }
  }, [kapitelId]);

  const saveMistake = (word: any) => {
    const saved = localStorage.getItem(`perfekt_mistakes:${kapitelId}`);
    let currentMistakes = [];
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) currentMistakes = parsed;
      } catch (e) {}
    }
    if (!currentMistakes.find((m: any) => m.infinitiv === word.infinitiv)) {
      currentMistakes.push(word);
      try {
        localStorage.setItem(`perfekt_mistakes:${kapitelId}`, JSON.stringify(currentMistakes));
      } catch (err) {}
      setMistakes(currentMistakes);
    }
  };

  const clearMistakes = () => {
    localStorage.removeItem(`perfekt_mistakes:${kapitelId}`);
    setMistakes([]);
  };

  const startGame = useCallback((customQueue?: any[]) => {
    const source = customQueue && customQueue.length > 0 ? customQueue : partizipZwei;
    const shuffled = [...source].sort(() => Math.random() - 0.5);
    setQueue(shuffled);
    setQuestion(shuffled[0]);
    setMasteredCount(0);
    setHilfsverbInput('');
    setPartizipInput('');
    setStatus('idle');
    setIsFinished(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [partizipZwei]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  const handleUmlaut = (u: string) => {
    if (inputRef.current) {
      const start = inputRef.current.selectionStart || 0;
      const end = inputRef.current.selectionEnd || 0;
      const newVal = partizipInput.substring(0, start) + u + partizipInput.substring(end);
      setPartizipInput(newVal);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(start + 1, start + 1);
        }
      }, 0);
    } else {
      setPartizipInput(prev => prev + u);
      inputRef.current?.focus();
    }
  };

  const handleCheck = () => {
    if (!partizipInput.trim() || !hilfsverbInput) return;
    const isHilfCorrect = hilfsverbInput === question.hilfsverb;
    const isPartCorrect = partizipInput.trim().toLowerCase() === question.partizip.toLowerCase();
    
    if (isHilfCorrect && isPartCorrect) {
      setStatus('correct');
      setMasteredCount(c => c + 1);
    } else {
      setStatus('wrong');
      saveMistake(question);
      setQueue(q => [...q, question]); // requeue at the end
    }
  };

  const handleNext = () => {
    const nextQ = queue[1];
    setQueue(q => q.slice(1));
    if (nextQ) {
      setQuestion(nextQ);
      setHilfsverbInput('');
      setPartizipInput('');
      setStatus('idle');
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="clay-card p-10 bg-orange-950 border-4 border-orange-900 max-w-2xl mx-auto">
        {mistakes.length > 0 ? (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-3xl font-black text-orange-100">Selesai!</h3>
              <p className="text-orange-300 mt-2">Tapi ada beberapa kata yang perlu kamu latih lagi.</p>
            </div>
            
            <div className="bg-orange-900 rounded-2xl p-6 border-b-4 border-orange-950">
              <h4 className="font-bold text-orange-200 mb-4 flex items-center gap-2">
                <span>📝</span> Daftar Kata yang Perlu Diperbaiki:
              </h4>
              <div className="grid gap-2 text-sm">
                {mistakes.map((m, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-orange-800 last:border-0">
                    <div>
                      <span className="font-black text-white">{m.infinitiv}</span>
                      <span className="text-orange-400 ml-2">({m.id})</span>
                    </div>
                    <div className="font-bold text-orange-200">
                      {m.hilfsverb} {m.partizip}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => startGame(mistakes)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-4 rounded-2xl shadow-lg transition-all active:translate-y-1 cursor-pointer"
              >
                🛠️ Latih Kata Salah ({mistakes.length})
              </button>
              <button 
                onClick={clearMistakes}
                className="bg-slate-700 hover:bg-slate-600 text-white font-black px-6 py-4 rounded-2xl shadow-lg transition-all active:translate-y-1 cursor-pointer"
              >
                🗑️ Hapus Kesalahan
              </button>
            </div>
            <button 
                onClick={() => startGame()}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black px-6 py-4 rounded-2xl shadow-lg transition-all active:translate-y-1 cursor-pointer"
              >
                🔄 Main dari Awal
              </button>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="bg-emerald-500/20 border-2 border-emerald-500 p-6 rounded-2xl">
              <p className="text-xl font-black text-emerald-400">✨ SEMPURNA! ✨</p>
              <p className="text-sm text-emerald-100 mt-1">Tidak ada kesalahan. Kamu sudah menguasai materi ini dengan sangat baik!</p>
            </div>
            <button 
              onClick={() => startGame()}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black px-10 py-5 rounded-2xl shadow-lg transition-all cursor-pointer"
            >
              🔄 Main Lagi
            </button>
          </div>
        )}
      </div>
    );
  }

  if (!question) return null;

  const progressPercent = totalWords > 0 ? Math.round((masteredCount / totalWords) * 100) : 0;

  return (
    <div className="clay-card p-6 bg-orange-950 text-white max-w-2xl mx-auto space-y-6 border-4 border-orange-900">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-black text-orange-100 italic">⏳ Partizip II Recall</h3>
        <div className="flex gap-2">
          {mistakes.length > 0 && (
            <span className="text-xs font-bold bg-rose-600 border border-rose-400 px-3 py-1 rounded-full text-white shadow shadow-rose-900/50">
              Sulit: {mistakes.length}
            </span>
          )}
          <span className="text-xs font-bold bg-orange-800 border border-orange-700 px-3 py-1 rounded-full text-orange-200">
            Dikuasai: {masteredCount}/{totalWords}
          </span>
        </div>
      </div>

      <div className="w-full bg-orange-900 rounded-full h-3 border border-orange-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="py-10 bg-orange-900 rounded-3xl text-center border-b-4 border-orange-950">
        <p className="text-xs font-bold text-orange-300 uppercase tracking-widest mb-2">Tulis Partizip II dari:</p>
        <h4 className="text-4xl font-black">{question.infinitiv}</h4>
        <p className="text-orange-200 mt-1 font-medium italic">({question.id})</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {(['haben', 'sein'] as const).map(h => (
            <button
              key={h}
              disabled={status !== 'idle'}
              onClick={() => setHilfsverbInput(h)}
              className={`py-3 rounded-xl font-black text-lg transition-all border-b-4 cursor-pointer disabled:cursor-not-allowed ${
                hilfsverbInput === h 
                  ? 'bg-orange-500 border-orange-700 text-white shadow-inner scale-95' 
                  : 'bg-orange-800 border-orange-900 text-orange-300 hover:bg-orange-700'
              }`}
            >
              {h}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-1.5 sm:gap-2 flex-wrap">
          {umlauts.map(u => (
            <button 
              key={u}
              type="button"
              onClick={() => handleUmlaut(u)}
              disabled={status !== 'idle'}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-800 hover:bg-orange-700 disabled:opacity-30 border-b-4 border-orange-900 rounded-xl text-lg sm:text-xl font-bold transition-all active:border-b-0 active:translate-y-1 shadow-sm text-orange-100 cursor-pointer disabled:cursor-not-allowed"
            >
              {u}
            </button>
          ))}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={partizipInput}
          onChange={(e) => setPartizipInput(e.target.value)}
          disabled={status !== 'idle'}
          placeholder="Ketik Partizip II..."
          className="w-full bg-white text-orange-950 font-black text-2xl p-5 rounded-2xl outline-none text-center shadow-inner"
          onKeyDown={(e) => e.key === 'Enter' && status === 'idle' ? handleCheck() : e.key === 'Enter' && handleNext()}
        />

        {status === 'idle' ? (
          <button
            onClick={handleCheck}
            disabled={!hilfsverbInput || !partizipInput}
            className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-75 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl border-b-4 border-orange-800 transition-all active:border-b-0 active:translate-y-1 cursor-pointer disabled:cursor-not-allowed"
          >
            Cek Jawaban
          </button>
        ) : (
          <div className={`p-6 rounded-2xl border-b-4 ${status === 'correct' ? 'bg-emerald-100 border-emerald-400 text-emerald-900' : 'bg-rose-100 border-rose-400 text-rose-900'}`}>
            <div className="text-center mb-6">
              <p className="font-black text-xl mb-2">{status === 'correct' ? '🎉 BENAR!' : '❌ SALAH!'}</p>
              <p className="text-3xl font-black">{question.hilfsverb} {question.partizip}</p>
              <p className="text-lg font-bold mt-1 opacity-80">{question.id}</p>
              {question.beispiel && (
                <div className="mt-4 pt-4 border-t-2 border-current/20">
                  <p className="text-sm md:text-base font-semibold italic leading-relaxed">
                    "{question.beispiel}"
                  </p>
                </div>
              )}
            </div>

            {question.praesens && (
              <div className="mt-6 bg-white/60 rounded-xl p-4 border border-current/20 shadow-inner overflow-hidden">
                <p className="text-xs font-black uppercase tracking-widest mb-3 opacity-70 text-center">Tabel Konjugasi (Präsens)</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  {['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'].map((pronoun, idx) => (
                    <div key={pronoun} className="flex flex-col bg-white/80 p-2 rounded-lg border border-current/10">
                      <span className="text-[10px] uppercase font-bold opacity-60">{pronoun}</span>
                      <span className="font-black">{question.praesens![idx]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button onClick={handleNext} className={`mt-6 w-full py-4 rounded-xl font-black text-white text-lg ${status === 'correct' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-rose-600 hover:bg-rose-500'} transition-all active:translate-y-1 shadow-md cursor-pointer`}>
              Lanjut (Enter)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// MAIN TEMPLATE
// ============================================================

export default function ChapterTemplate({
  kapitelId,
  kapitel,
  wortschatz,
  partizipZwei,
  grammatik,
  goetheTasks,
  lernTipps,
  miniQuiz,
  LesenComponent,
  HorenComponent,
  SchreibenComponent,
  GrammatikInteraktivComponent,
  TestComponent
}: ChapterTemplateProps) {
  
  const hasPartizip = partizipZwei && partizipZwei.length > 0;
  
  const [activeTab, setActiveTab] = useState<'wortschatz' | 'partizip' | 'grammatik' | 'lesen' | 'horen' | 'uebung' | 'strategie' | 'game' | 'test'>('wortschatz');
  const [katFilter, setKatFilter] = useState<string>('Alle');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const kategorien = ['Alle', ...Array.from(new Set(wortschatz.map(w => w.kategorie)))];
  const filteredWords = katFilter === 'Alle' ? wortschatz : wortschatz.filter(w => w.kategorie === katFilter);
  const totalPages = Math.ceil(filteredWords.length / itemsPerPage);
  const currentWords = filteredWords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const [partizipPage, setPartizipPage] = useState<number>(1);
  const partizipItemsPerPage = 8;
  const totalPartizipPages = hasPartizip ? Math.ceil(partizipZwei!.length / partizipItemsPerPage) : 0;
  const currentPartizipItems = hasPartizip ? partizipZwei!.slice((partizipPage - 1) * partizipItemsPerPage, partizipPage * partizipItemsPerPage) : [];

  // Steps ordered by learning science (Input → Practice → Evaluation)
  let stepsBase = [
    { id: 'wortschatz', label: 'Wortschatz', icon: '💬', phase: 1 as const, count: wortschatz.length },
    { id: 'grammatik',  label: 'Grammatik',  icon: '📐', phase: 1 as const, count: grammatik.length },
  ];
  
  if (hasPartizip) {
    stepsBase.push({ id: 'partizip', label: 'Partizip II', icon: '⏳', phase: 1 as const, count: partizipZwei!.length });
  }
  
  const stepsTail = [
    { id: 'lesen',     label: 'Lesen',       icon: '📖', phase: 2 as const, count: null },
    { id: 'horen',     label: 'Hören',       icon: '🎧', phase: 2 as const, count: null },
    { id: 'uebung',    label: 'Schreiben',   icon: '✍️', phase: 2 as const, count: null },
    { id: 'game',      label: 'Mini Game',   icon: '🎮', phase: 2 as const, count: null },
    { id: 'test',      label: `Kapiteltest`, icon: '📝', phase: 3 as const, count: null },
    { id: 'strategie', label: 'Strategie',   icon: '🧠', phase: 3 as const, count: null },
  ];
  
  const steps = [...stepsBase, ...stepsTail] as const;

  const [activeGameMode, setActiveGameMode] = useState<'wortschatz' | 'partizip' | null>(null);

  return (
    <div className="relative">
      {/* Decorative Blobs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-indigo-200/30 blur-[120px] -z-10 rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-violet-200/30 blur-[120px] -z-10 rounded-full pointer-events-none" />

      {/* ── HERO HEADER ── */}
      <header className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <span className="clay-badge bg-emerald-100 text-emerald-800 border-emerald-300">Level {kapitel.level}</span>
              <span className="clay-badge bg-violet-100 text-violet-800 border-violet-300">Kapitel {kapitel.nummer}</span>
              <span className="clay-badge bg-amber-100 text-amber-800 border-amber-300">Netzwerk Neu</span>
              <span className="clay-badge bg-rose-100 text-rose-800 border-rose-300">Goethe Ready</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
              {kapitel.nummer}. {kapitel.titel}
              <span className="block text-2xl md:text-3xl font-semibold text-indigo-600 mt-2">{kapitel.untertitel}</span>
            </h1>
            <p className="text-base text-slate-600 font-medium max-w-lg leading-relaxed">
              {kapitel.beschreibung || `Belajar berkomunikasi dan struktur gramatikal untuk Kapitel ${kapitel.nummer}. Dirancang untuk ujian Goethe-Zertifikat ${kapitel.level}.`}
            </p>
            {/* Goethe Skills */}
            <div className="grid grid-cols-4 gap-2">
              {kapitel.goetheFokus.map((skill, idx) => (
                <div key={`${skill}-${idx}`} className="clay-card p-2.5 text-center bg-white flex items-center justify-center">
                  <p className="text-xs font-extrabold text-indigo-700">{skill}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Vokabeln', count: wortschatz.length, icon: '💬', bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-300', num: 'text-amber-600' },
              { label: 'Grammatik', count: grammatik.length, icon: '📐', bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-300', num: 'text-indigo-600' },
              { label: 'Goethe Tasks', count: goetheTasks ? goetheTasks.length : 0, icon: '🎯', bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-300', num: 'text-rose-600' },
              { label: 'Lern-Tipps', count: lernTipps.length, icon: '🧠', bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-300', num: 'text-emerald-600' },
            ].map((stat, idx) => (
              <div key={`${stat.label}-${idx}`} className={`clay-card p-5 text-center ${stat.bg} border-2 ${stat.border}`}>
                <p className="text-3xl mb-1">{stat.icon}</p>
                <p className={`text-4xl font-extrabold ${stat.num}`}>{stat.count}</p>
                <p className={`text-sm font-bold mt-1 ${stat.text}`}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6">
        <ProgressTracker kapitelId={kapitelId} totalSteps={steps.length} currentStepId={activeTab} />
      </div>

      {/* ── LERNPLAN BANNER ── */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div
          className="rounded-[20px] p-5 border-4 border-indigo-900"
          style={{ background: 'linear-gradient(to right, #4F46E5, #7C3AED)', boxShadow: '6px 6px 0 0 rgba(30,27,75,0.3)' }}
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="text-4xl flex-shrink-0">📅</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-extrabold text-lg text-white">Rencana Belajar 2 Hari — Kapitel {kapitel.nummer} (Scientifically Backed)</h2>
              <p className="text-indigo-100 text-sm mt-1">
                <strong className="text-white">Hari 1 (Pagi):</strong> Flashcard Wortschatz {wortschatz.length} kosakata · &nbsp;
                <strong className="text-white">Hari 1 (Sore):</strong> Grammatik &amp; Partizip II ·{' '}
                <strong className="text-white">Hari 2 (Pagi):</strong> Goethe Tasks Lesen &amp; Schreiben ·{' '}
                <strong className="text-white">Hari 2 (Sore):</strong> Spaced Repetition Review
              </p>
            </div>
            <div className="flex-shrink-0 text-center bg-white/10 rounded-xl px-5 py-3 border border-white/20">
              <p className="text-4xl font-black text-white">2</p>
              <p className="text-xs text-indigo-200 font-bold">HARI TARGET</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── LEARNING PATH STEPPER ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        {/* Phase Labels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
          {[
            { label: '📥 Fase 1 · Input', color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
            { label: '✏️ Fase 2 · Latihan', color: 'bg-amber-50 border-amber-200 text-amber-700' },
            { label: '📊 Fase 3 · Evaluasi', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
          ].map(f => (
            <div key={f.label} className={`text-center py-1.5 rounded-xl border-2 text-[11px] font-black uppercase tracking-wide ${f.color}`}>
              {f.label}
            </div>
          ))}
        </div>
        {/* Steps */}
        <div className="overflow-x-auto custom-scrollbar pb-2">
          <div className="flex items-center min-w-max gap-0">
            {steps.map((step, i) => {
              const isActive = activeTab === step.id;
              const phaseBtn = ({
                1: isActive ? 'bg-indigo-600 border-indigo-900 text-white shadow-[0_4px_0_0_#312E81]' : 'bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-50 hover:border-indigo-500 shadow-[0_3px_0_0_#a5b4fc]',
                2: isActive ? 'bg-amber-500 border-amber-800 text-white shadow-[0_4px_0_0_#92400e]' : 'bg-white text-amber-700 border-amber-300 hover:bg-amber-50 hover:border-amber-500 shadow-[0_3px_0_0_#fcd34d]',
                3: isActive ? 'bg-emerald-600 border-emerald-900 text-white shadow-[0_4px_0_0_#064e3b]' : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50 hover:border-emerald-500 shadow-[0_3px_0_0_#6ee7b7]',
              } as Record<number,string>)[step.phase];
              const phaseNum = ({
                1: isActive ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700',
                2: isActive ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700',
                3: isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700',
              } as Record<number,string>)[step.phase];
              const connectorColor = step.phase === 1 ? 'bg-indigo-200' : step.phase === 2 ? 'bg-amber-200' : 'bg-emerald-200';
              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setActiveTab(step.id as any)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-2xl font-extrabold text-sm whitespace-nowrap cursor-pointer transition-all duration-200 border-2 ${phaseBtn}`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0 ${phaseNum}`}>{i + 1}</span>
                    <span>{step.icon}</span>
                    <span className="hidden sm:inline">{step.label}</span>
                    {step.count !== null && (
                      <span className={`px-1.5 py-0.5 rounded-full text-[11px] font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>{step.count}</span>
                    )}
                  </button>
                  {i < steps.length - 1 && (
                    <div className={`h-0.5 w-5 flex-shrink-0 ${connectorColor}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* Step Progress Banner */}
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-700 font-semibold">
          <span>📍 Step {steps.findIndex(s => s.id === activeTab) + 1} dari {steps.length} · {steps.find(s => s.id === activeTab)?.label}</span>
          {steps.findIndex(s => s.id === activeTab) < steps.length - 1 && (
            <button
              onClick={() => { const idx = steps.findIndex(s => s.id === activeTab); setActiveTab(steps[idx + 1].id as any); }}
              className="ml-auto text-xs font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer border border-indigo-200 px-3 py-1 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Lanjut: {steps[steps.findIndex(s => s.id === activeTab) + 1]?.label} →
            </button>
          )}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-7xl mx-auto px-6 pb-24">

        {/* ── WORTSCHATZ TAB ── */}
        {activeTab === 'wortschatz' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900">Wortschatz-Flashcards</h2>
                <p className="text-slate-600 text-sm mt-1">Klik kartu untuk lihat terjemahan + kalimat contoh. Sistem Leitner Box aktif.</p>
              </div>
              <div className="flex flex-wrap gap-2 sm:max-w-xs">
                {kategorien.map(k => {
                  const s = kategorieStyles[k];
                  return (
                    <button
                      key={k}
                      onClick={() => { setKatFilter(k); setCurrentPage(1); }}
                      className={`px-3 py-1.5 rounded-xl text-sm font-bold cursor-pointer transition-all border-2 ${
                        katFilter === k
                          ? 'bg-indigo-600 text-white border-indigo-900 shadow-[0_2px_0_0_#312E81]'
                          : s
                            ? `${s.bg} ${s.text} ${s.border} hover:opacity-80`
                            : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-400'
                      }`}
                    >
                      {k}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Leitner System Info */}
            <div className="clay-card p-4 bg-indigo-50 border-indigo-300">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black flex-shrink-0 text-lg">🗂️</div>
                <div>
                  <p className="font-extrabold text-indigo-900">Sistem Leitner Box (Spaced Repetition)</p>
                  <p className="text-sm text-indigo-700 mt-0.5">
                    <strong>Box 1:</strong> Ulangi tiap hari ·{' '}
                    <strong>Box 2:</strong> Tiap 3 hari ·{' '}
                    <strong>Box 3:</strong> Tiap 7 hari ·{' '}
                    <strong>Box 4:</strong> Tiap 14 hari ·{' '}
                    <strong>Box 5:</strong> ✅ Hafal permanen
                  </p>
                </div>
              </div>
            </div>

            {filteredWords.length === 0 ? (
              <p className="text-center text-slate-700 py-10">Tidak ada kosakata untuk kategori ini.</p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {currentWords.map((wort, i) => (
                    <FlashCard key={`${wort.de}-${i}`} wort={wort} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center items-center gap-4">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 text-slate-700 font-bold flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed disabled:cursor-not-allowed hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 transition-all cursor-pointer shadow-[0_2px_0_0_rgba(203,213,225,1)] active:translate-y-0.5 active:shadow-none"
                    >
                      ←
                    </button>
                    <span className="font-bold text-slate-600 text-sm">
                      Halaman {currentPage} dari {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 text-slate-700 font-bold flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed disabled:cursor-not-allowed hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 transition-all cursor-pointer shadow-[0_2px_0_0_rgba(203,213,225,1)] active:translate-y-0.5 active:shadow-none"
                    >
                      →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ── PARTIZIP II TAB ── */}
        {activeTab === 'partizip' && hasPartizip && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Partizip II (Perfekt Form)</h2>
              <p className="text-slate-600 text-sm mt-1">Daftar kata kerja penting dengan bentuk lampau dan kata kerja bantu (haben/sein).</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentPartizipItems.map((item, i) => (
                <div key={i} className="clay-card p-5 bg-white border-2 border-orange-100 hover:border-orange-300 transition-all group">
                   <div className="flex justify-between items-start mb-3">
                     <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${item.hilfsverb === 'sein' || item.hilfsverb === 'ist' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                       {item.hilfsverb}
                     </span>
                     <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">★</span>
                   </div>
                   <p className="text-xs font-bold text-slate-600 uppercase tracking-tighter">{item.infinitiv}</p>
                   <p className="text-xl font-black text-slate-900">{item.partizip}</p>
                   <p className="text-xs text-slate-700 font-medium italic mt-1">{item.id}</p>
                </div>
              ))}
            </div>

            {totalPartizipPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-4">
                <button
                  onClick={() => setPartizipPage(p => Math.max(1, p - 1))}
                  disabled={partizipPage === 1}
                  className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 text-slate-700 font-bold flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed disabled:cursor-not-allowed hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600 transition-all cursor-pointer shadow-[0_2px_0_0_rgba(203,213,225,1)] active:translate-y-0.5 active:shadow-none"
                >
                  ←
                </button>
                <span className="font-bold text-slate-600 text-sm">
                  Halaman {partizipPage} dari {totalPartizipPages}
                </span>
                <button
                  onClick={() => setPartizipPage(p => Math.min(totalPartizipPages, p + 1))}
                  disabled={partizipPage === totalPartizipPages}
                  className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 text-slate-700 font-bold flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed disabled:cursor-not-allowed hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600 transition-all cursor-pointer shadow-[0_2px_0_0_rgba(203,213,225,1)] active:translate-y-0.5 active:shadow-none"
                >
                  →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── GRAMMATIK TAB ── */}
        {activeTab === 'grammatik' && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Grammatik</h2>
              <p className="text-slate-600 text-sm mt-1">Aturan tata bahasa yang harus kamu pahami di Kapitel {kapitel.nummer}.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                {grammatik.map((gram, i) => (
                  <GrammatikKarte key={i} gram={gram} />
                ))}
              </div>
              
              <div className="space-y-6">
                {goetheTasks && goetheTasks.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-extrabold text-slate-900 border-b-2 border-slate-100 pb-2">🎯 Goethe-Zertifikat Tasks</h3>
                    {goetheTasks.map((task, i) => (
                      <GoetheTaskKarte key={i} task={task} />
                    ))}
                  </div>
                )}
                
                {miniQuiz && miniQuiz.length > 0 && (
                  <div className="clay-card p-6 bg-white space-y-4">
                    <h3 className="text-xl font-extrabold text-slate-900 mb-2">🧩 Mini-Quiz: Pilih yang Benar</h3>
                    <p className="text-slate-600 text-sm mb-5">Klik jawaban untuk mengecek kebenarannya.</p>
                    <div className="space-y-4">
                      {miniQuiz.map((q, qi) => (
                        <MiniQuizFrage key={qi} {...q} index={qi} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* INTERAKTIVE GRAMMATIK ÜBUNG */}
            {GrammatikInteraktivComponent && (
              <div className="mt-12">
                {GrammatikInteraktivComponent}
              </div>
            )}
          </div>
        )}

        {/* ── LESEN TAB ── */}
        {activeTab === 'lesen' && LesenComponent && (
          <div className="animate-in fade-in slide-in-from-bottom-4">{LesenComponent}</div>
        )}

        {/* ── HÖREN TAB ── */}
        {activeTab === 'horen' && HorenComponent && (
          <div className="animate-in fade-in slide-in-from-bottom-4">{HorenComponent}</div>
        )}

        {/* ── ÜBUNG TAB ── */}
        {activeTab === 'uebung' && SchreibenComponent && (
          <div className="animate-in fade-in slide-in-from-bottom-4">{SchreibenComponent}</div>
        )}

        {/* ── GAME TAB ── */}
        {activeTab === 'game' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {!activeGameMode ? (
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-black text-slate-900">Pilih Mode Latihan</h2>
                  <p className="text-slate-600 mt-2">Uji kemampuanmu dengan mode yang berbeda!</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mode Wortschatz */}
                  <button 
                    onClick={() => setActiveGameMode('wortschatz')}
                    className="clay-card p-8 bg-indigo-50 border-indigo-200 border-b-8 text-left hover:translate-y-1 hover:border-b-4 transition-all group cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm border border-indigo-100 group-hover:scale-110 transition-transform">💬</div>
                    <h3 className="text-2xl font-black text-indigo-950">Wortschatz Recall</h3>
                    <p className="text-indigo-900 mt-2 text-sm font-bold leading-relaxed">Ketikan bahasa Jerman dari kosakata harian. Fokus pada artikulasi dan ejaan tepat.</p>
                    <div className="mt-6 flex items-center text-indigo-600 font-black text-sm uppercase tracking-wider">Main Sekarang →</div>
                  </button>

                  {/* Mode Partizip (if available) */}
                  {hasPartizip ? (
                    <button 
                      onClick={() => setActiveGameMode('partizip')}
                      className="clay-card p-8 bg-orange-50 border-orange-200 border-b-8 text-left hover:translate-y-1 hover:border-b-4 transition-all group cursor-pointer relative"
                    >
                      <div className="absolute top-4 right-4"><MistakeBadge type="perfekt" kapitelId={kapitelId} /></div>
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm border border-orange-100 group-hover:scale-110 transition-transform">⏳</div>
                      <h3 className="text-2xl font-black text-orange-950">Perfekt Builder</h3>
                      <p className="text-orange-900 mt-2 text-sm font-bold leading-relaxed">Latih konjugasi Partizip II dan kata kerja bantu (haben/sein).</p>
                      <div className="mt-6 flex items-center text-orange-600 font-black text-sm uppercase tracking-wider">Main Sekarang →</div>
                    </button>
                  ) : (
                    <div className="clay-card p-8 bg-slate-50 border-slate-300 border-b-8 text-left opacity-60">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm border border-slate-100 grayscale">⏳</div>
                      <h3 className="text-2xl font-black text-slate-700">Perfekt Builder</h3>
                      <p className="text-slate-700 mt-2 text-sm font-bold leading-relaxed">Mode ini tidak tersedia untuk Kapitel ini.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <button 
                  onClick={() => setActiveGameMode(null)}
                  className="mb-6 font-bold text-slate-700 hover:text-slate-800 flex items-center gap-2 cursor-pointer bg-white px-4 py-2 rounded-xl border-2 border-slate-300 hover:border-slate-300 transition-all shadow-sm"
                >
                  ← Kembali ke Menu
                </button>
                {activeGameMode === 'wortschatz' && <WortschatzGame wortschatz={wortschatz} />}
                {activeGameMode === 'partizip' && hasPartizip && <PartizipZweiGame partizipZwei={partizipZwei!} kapitelId={kapitelId} />}
              </div>
            )}
          </div>
        )}

        {/* ── TEST TAB ── */}
        {activeTab === 'test' && TestComponent && (
          <div className="animate-in fade-in slide-in-from-bottom-4">{TestComponent}</div>
        )}

        {/* ── STRATEGIE TAB ── */}
        {activeTab === 'strategie' && (
          <div className="space-y-8 animate-in fade-in">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Lernstrategie</h2>
              <p className="text-slate-600 text-sm mt-1">Metode belajar berbasis jurnal ilmiah untuk retensi jangka panjang.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lernTipps.map((tip, i) => (
                <div key={i} className="clay-card p-6 bg-white space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${lernTippStyles[tip.farbe] || lernTippStyles.indigo} rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-inner border border-white/20`}>
                      {tip.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900">{tip.titel}</h3>
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">{tip.tag}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{tip.beschreibung}</p>
                </div>
              ))}
            </div>

            {/* Jadwal Belajar */}
            <div className="clay-card p-6 bg-white space-y-4">
              <h3 className="text-xl font-extrabold text-slate-900">📅 Jadwal Super-Fokus Kapitel {kapitel.nummer} (2 Hari)</h3>
              <div className="overflow-x-auto rounded-xl border-2 border-slate-300">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-indigo-600 text-white">
                      <th className="text-left py-3 px-4 font-bold text-xs uppercase tracking-wide w-20">Hari</th>
                      <th className="text-left py-3 px-4 font-bold text-xs uppercase tracking-wide">Kegiatan (Berbasis Jurnal)</th>
                      <th className="text-left py-3 px-4 font-bold text-xs uppercase tracking-wide w-24">Durasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { hari: '1', kegiatan: '🌅 Pagi: Wortschatz Flashcards (Fokus Spaced Repetition Box 1)', durasi: '45 mnt', stripe: false },
                      { hari: '1', kegiatan: '☀️ Siang: Grammatik & Latihan Formasi Kata (Interleaving Practice)', durasi: '35 mnt', stripe: true },
                      { hari: '1', kegiatan: '🌙 Malam: Goethe Terserap (Lesen & Hören) + Mini-Quiz', durasi: '40 mnt', stripe: false },
                      { hari: '2', kegiatan: '🌅 Pagi: Goethe Aktif (Schreiben & Sprechen) via Dual Coding', durasi: '45 mnt', stripe: true },
                      { hari: '2', kegiatan: '☀️ Siang: Spaced Repetition Box 2 (Pengulangan Cepat Tepat)', durasi: '30 mnt', stripe: false },
                      { hari: '2', kegiatan: '🌙 Malam: Full Mock Test A2 & Final Review (Testing Effect)', durasi: '45 mnt', stripe: true },
                    ].map((row, i) => (
                      <tr key={i} className={`${row.stripe ? 'bg-slate-50' : 'bg-white'} hover:bg-indigo-50 transition-colors`}>
                        <td className="py-3 px-4 font-extrabold text-indigo-700">Hari {row.hari}</td>
                        <td className="py-3 px-4 text-slate-800">{row.kegiatan}</td>
                        <td className="py-3 px-4 font-bold text-slate-600">{row.durasi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Referensi Jurnal */}
            <div className="clay-card p-6 dark-card border-indigo-700">
              <h3 className="font-extrabold text-lg dark-card-title mb-4">📚 Referensi Jurnal Ilmiah</h3>
              <ul className="space-y-3 text-sm">
                <li className="dark-card-muted"><span className="dark-card-accent font-bold">Spaced Repetition:</span> Cepeda et al. (2006). "Distributed Practice in Verbal Recall Tasks." <em>Psychological Bulletin</em>, 132(3), 354–380.</li>
                <li className="dark-card-muted"><span className="dark-card-accent font-bold">Dual Coding:</span> Paivio, A. (1991). "Dual coding theory: Retrospect and current status." <em>Canadian Journal of Psychology</em>, 45(3), 255–287.</li>
                <li className="dark-card-muted"><span className="dark-card-accent font-bold">Interleaving:</span> Kornell, N., & Bjork, R.A. (2008). "Learning concepts and categories." <em>Psychological Science</em>, 19(6), 585–592.</li>
                <li className="dark-card-muted"><span className="dark-card-accent font-bold">Vocabulary in Context:</span> Nation, I.S.P. (2001). <em>Learning Vocabulary in Another Language.</em> Cambridge University Press.</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* ── MARK COMPLETE BUTTON ── */}
      <div className="pb-12 max-w-7xl mx-auto px-6">
        <MarkCompleteButton stepId={activeTab} kapitelId={kapitelId} />
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t-2 border-slate-300 bg-white py-8 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="clay-badge bg-emerald-100 text-emerald-800 border-emerald-300">A2 · Kapitel {kapitel.nummer}</span>
            <span className="clay-badge bg-indigo-100 text-indigo-800 border-indigo-300">Netzwerk Neu {kapitel.level}</span>
            <span className="clay-badge bg-violet-100 text-violet-800 border-violet-300">{wortschatz.length} Vokabeln</span>
          </div>
          <p className="text-slate-700 text-xs font-medium">© 2026 BelajarA2Deutsch · Goethe-Zertifikat {kapitel.level} Preparation. Dibuat oleh Cipta Web Cibubur.</p>
        </div>
      </footer>
    </div>
  );
}
