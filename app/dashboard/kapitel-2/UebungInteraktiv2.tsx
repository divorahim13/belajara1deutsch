"use client";

import React, { useState } from 'react';

export function UebungInteraktiv2() {
  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: ''
  });
  const [status, setStatus] = useState<'idle' | 'checked'>('idle');

  const checkAnswers = () => {
    setStatus('checked');
  };

  const isQ1Correct = answers.q1.toLowerCase() === 'musste';
  const isQ2Correct = answers.q2.toLowerCase() === 'durfte';
  const isQ3Correct = answers.q3.toLowerCase() === 'dem';
  const isQ4Correct = answers.q4.toLowerCase() === 'wollte';

  const allCorrect = status === 'checked' && isQ1Correct && isQ2Correct && isQ3Correct && isQ4Correct;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-900">Übung: Präteritum Modalverben & Dativ</h2>
        <p className="text-slate-600 mt-2">Lengkapi kalimat rumpang di bawah ini dengan kata yang tepat.</p>
      </div>

      <div className="clay-card p-8 bg-emerald-50 border-emerald-200 border-b-8">
        <h3 className="text-2xl font-black text-emerald-950 mb-6">Cloze Test</h3>
        
        <div className="space-y-6 text-xl font-medium text-slate-800">
          <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border-2 border-emerald-100 shadow-sm">
            <span>1. Als Kind</span>
            <input 
              type="text" 
              className={`w-24 text-center p-2 rounded-lg border-b-4 outline-none font-bold ${
                status === 'checked' 
                  ? isQ1Correct ? 'border-emerald-500 bg-emerald-100 text-emerald-900' : 'border-rose-500 bg-rose-100 text-rose-900'
                  : 'border-slate-300 bg-slate-50 focus:border-emerald-400'
              }`}
              value={answers.q1}
              onChange={e => setAnswers({...answers, q1: e.target.value})}
              disabled={status === 'checked'}
              placeholder="müssen"
            />
            <span>ich jeden Tag um 20 Uhr schlafen gehen.</span>
            {status === 'checked' && (
              <span className="ml-auto font-bold">{isQ1Correct ? '✅' : '❌ (Jawaban: musste)'}</span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border-2 border-emerald-100 shadow-sm">
            <span>2. Mit 16 Jahren</span>
            <input 
              type="text" 
              className={`w-24 text-center p-2 rounded-lg border-b-4 outline-none font-bold ${
                status === 'checked' 
                  ? isQ2Correct ? 'border-emerald-500 bg-emerald-100 text-emerald-900' : 'border-rose-500 bg-rose-100 text-rose-900'
                  : 'border-slate-300 bg-slate-50 focus:border-emerald-400'
              }`}
              value={answers.q2}
              onChange={e => setAnswers({...answers, q2: e.target.value})}
              disabled={status === 'checked'}
              placeholder="dürfen"
            />
            <span>ich endlich Moped fahren.</span>
            {status === 'checked' && (
              <span className="ml-auto font-bold">{isQ2Correct ? '✅' : '❌ (Jawaban: durfte)'}</span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border-2 border-emerald-100 shadow-sm">
            <span>3. Das Buch gehört</span>
            <input 
              type="text" 
              className={`w-20 text-center p-2 rounded-lg border-b-4 outline-none font-bold ${
                status === 'checked' 
                  ? isQ3Correct ? 'border-emerald-500 bg-emerald-100 text-emerald-900' : 'border-rose-500 bg-rose-100 text-rose-900'
                  : 'border-slate-300 bg-slate-50 focus:border-emerald-400'
              }`}
              value={answers.q3}
              onChange={e => setAnswers({...answers, q3: e.target.value})}
              disabled={status === 'checked'}
              placeholder="Artikel"
            />
            <span>Lehrer (der).</span>
            {status === 'checked' && (
              <span className="ml-auto font-bold">{isQ3Correct ? '✅' : '❌ (Jawaban: dem)'}</span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border-2 border-emerald-100 shadow-sm">
            <span>4. Früher</span>
            <input 
              type="text" 
              className={`w-24 text-center p-2 rounded-lg border-b-4 outline-none font-bold ${
                status === 'checked' 
                  ? isQ4Correct ? 'border-emerald-500 bg-emerald-100 text-emerald-900' : 'border-rose-500 bg-rose-100 text-rose-900'
                  : 'border-slate-300 bg-slate-50 focus:border-emerald-400'
              }`}
              value={answers.q4}
              onChange={e => setAnswers({...answers, q4: e.target.value})}
              disabled={status === 'checked'}
              placeholder="wollen"
            />
            <span>ich Medizin studieren.</span>
            {status === 'checked' && (
              <span className="ml-auto font-bold">{isQ4Correct ? '✅' : '❌ (Jawaban: wollte)'}</span>
            )}
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          {status === 'idle' ? (
            <button 
              onClick={checkAnswers}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl shadow-lg border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 transition-all"
            >
              Cek Jawaban
            </button>
          ) : (
            <button 
              onClick={() => {
                setStatus('idle');
                setAnswers({q1: '', q2: '', q3: '', q4: ''});
              }}
              className="w-full bg-slate-600 hover:bg-slate-500 text-white font-black py-4 rounded-2xl shadow-lg border-b-4 border-slate-800 active:border-b-0 active:translate-y-1 transition-all"
            >
              Ulangi Latihan
            </button>
          )}
        </div>
        
        {allCorrect && (
          <div className="mt-6 bg-emerald-100 text-emerald-900 p-4 rounded-xl border-2 border-emerald-400 text-center font-black animate-bounce">
            🎉 Sempurna! Kamu memahami tata bahasa ini dengan baik.
          </div>
        )}
      </div>
    </div>
  );
}
