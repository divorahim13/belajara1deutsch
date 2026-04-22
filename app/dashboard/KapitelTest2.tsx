'use client';

import { useState } from 'react';

export default function KapitelTestZwei() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [scoreData, setScoreData] = useState({ total: 0, max: 40, passed: false });
  const [mistakes, setMistakes] = useState<any[]>([]);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [schreibenFeedback, setSchreibenFeedback] = useState<string | null>(null);

  const setAns = (id: string, val: string) => setAnswers(p => ({ ...p, [id]: val }));

  const check = async () => {
    setIsSubmitting(true);
    let pts = 0;
    const errs: any[] = [];
    const log = (id: string, e: number, m: number, ans: string, exp: string, q: string) => {
      if (e < m) errs.push({ q, userAnswer: ans || '(kosong)', expected: exp });
      return e;
    };
    
    const checkSimple = (id: string, exp: string, q: string, weight: number = 1) => {
      const v = (answers[id] || '').trim().toLowerCase();
      const correct = Array.isArray(exp) 
        ? exp.some(e => v === e.toLowerCase())
        : v === exp.toLowerCase();
      return log(id, correct ? weight : 0, weight, answers[id], Array.isArray(exp) ? exp[0] : exp, q);
    };

    // Teil 1: Wortschatz Dialog (10 blanks x 0.5 = 5 pts)
    pts += checkSimple('t1_1', 'Stundenplan', 'Ex 1: Unser (1) ________ ist ganz schön voll.', 0.5);
    pts += checkSimple('t1_2', 'Lieblingsfach', 'Ex 1: Was ist denn dein (2) ________?', 0.5);
    pts += checkSimple('t1_3', 'Biologie', 'Ex 1: Ähm, (3) ________. Das kann ich gut.', 0.5);
    pts += checkSimple('t1_4', 'Zeugnis', 'Ex 1: Wann bekommst du wieder ein (4) ________?', 0.5);
    pts += checkSimple('t1_5', 'Sommerferien', 'Ex 1: Dann haben wir endlich (5) ________.', 0.5);
    pts += checkSimple('t1_6', 'Klasse', 'Ex 1: In welche (6) ________ kommst du?', 0.5);
    pts += checkSimple('t1_7', 'Abschluss', 'Ex 1: Machst du bald deinen (7) ________?', 0.5);
    pts += checkSimple('t1_8', 'Gymnasium', 'Ex 1: Ich gehe doch ins (8) ________.', 0.5);
    pts += checkSimple('t1_9', 'Abitur', 'Ex 1: Mache mein (9) ________ erst in 3 Jahren.', 0.5);
    pts += checkSimple('t1_10', 'Hausaufgaben', 'Ex 1: Jetzt muss ich (10) ________ machen.', 0.5);

    // Teil 2: Zuordnung (4 x 1 = 4 pts)
    pts += checkSimple('t2_1', 'D', 'Ex 2: Was hast du danach gemacht? (Matching)', 1);
    pts += checkSimple('t2_2', 'A', 'Ex 2: Und was machst du jetzt? (Matching)', 1);
    pts += checkSimple('t2_3', 'C', 'Ex 2: Macht dir die Arbeit keinen Spaß? (Matching)', 1);
    pts += checkSimple('t2_4', 'E', 'Ex 2: Was sind deine Pläne für die Zukunft? (Matching)', 1);

    // Teil 3: Modalverben im Präteritum (6 x 1 = 6 pts)
    pts += checkSimple('t3_1', 'konnte', 'Ex 3: (1) ________ ich tidak, weil meine Noten...', 1);
    pts += checkSimple('t3_2', 'musste', 'Ex 3: Also (2) ________ ich eine Ausbildung machen.', 1);
    pts += checkSimple('t3_3', 'wolltet', 'Ex 3: Was (3) ________ ihr nach der Schule machen?', 1);
    pts += checkSimple('t3_4', 'wollten', 'Ex 3: Wir (4) ________ auf die Uni gehen.', 1);
    pts += checkSimple('t3_5', 'sollten', 'Ex 3: Aber wir (5) ________ zuerst Ausbildung machen.', 1);
    pts += checkSimple('t3_6', 'durften', 'Ex 3: Wir (6) ________ nicht das machen, was wir wollten.', 1);

    // Teil 4: Artikel (5 x 1 = 5 pts)
    pts += checkSimple('t4_1', 'dem', 'Ex 4: Ich fange mit (1) ________ Studium an.', 1);
    pts += checkSimple('t4_2', 'eine', 'Ex 4: Er denkt an (2) ________ Schule zurück.', 1);
    pts += checkSimple('t4_3', 'deinem', 'Ex 4: Nach (3) ________ Schulabschluss?', 1);
    pts += checkSimple('t4_4', 'den', 'Ex 4: Nützlich für (4) ________ Beruf.', 1);
    pts += checkSimple('t4_5', 'meinen', 'Ex 4: Von (5) ________ Eltern unabhängig.', 1);

    // Teil 5: Possessiv im Dativ (6 x 1 = 6 pts)
    pts += checkSimple('t5_1', 'ihrem', 'Ex 5: Sabrina hat nach (1) ________ Studium...', 1);
    pts += checkSimple('t5_2', 'deinen', 'Ex 5: Hast du (2) ________ Großeltern geschrieben?', 1);
    pts += checkSimple('t5_3', 'ihrem', 'Ex 5: Sie lernen an (3) ________ Schreibtisch.', 1);
    pts += checkSimple('t5_4', 'eurer', 'Ex 5: Was macht ihr in (4) ________ Freizeit?', 1);
    pts += checkSimple('t5_5', 'unserem', 'Ex 5: Wir gehen mit (5) ________ Freund Olli...', 1);
    pts += checkSimple('t5_6', 'meinen', 'Ex 5: Ich verstehe mich gut mit (6) ________ Kollegen.', 1);

    // Teil 6: Antwort finden (4 x 1 = 4 pts)
    pts += checkSimple('t6_1', 'A', 'Ex 6: Mungkin saya nanti mau ambil Abitur.', 1);
    pts += checkSimple('t6_2', 'A', 'Ex 6: Pelatihan guru TK butuh 3 tahun.', 1);
    pts += checkSimple('t6_3', 'B', 'Ex 6: Saya belajar Jerman dalam 3 minggu.', 1);
    pts += checkSimple('t6_4', 'A', 'Ex 6: Habis sekolah saya kerja dulu.', 1);

    // Teil 7: Schreiben (Bonus/Consistent with K1) - 10 Poin
    let writingScore = 0;
    let wFeedback = '';
    const writingText = answers.t7_schreiben || '';
    
    if (writingText.trim().length > 0) {
      try {
        const res = await fetch('/api/evaluateSchreiben', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: writingText, topic: 'Masa sekolah dan rencana setelah sekolah (Kapitel 2)' })
        });
        const data = await res.json();
        if (data.score !== undefined) {
          writingScore = data.score;
          wFeedback = data.feedback;
        } else {
          wFeedback = '<p>Gagal memproses skor dari AI.</p>';
        }
      } catch (e) {
        wFeedback = '<p>Terjadi kesalahan jaringan saat menilai teks Schreiben.</p>';
      }
    } else {
      wFeedback = '<p>Anda tidak menulis apapun. Skor 0.</p>';
    }

    pts += writingScore;

    setMistakes(errs);
    setSchreibenFeedback(wFeedback);
    setScoreData({ total: Math.round(pts * 10) / 10, max: 40, passed: pts >= 24 });
    setShowResult(true);
    setAiFeedback(null);
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getAiCorrection = async () => {
    if (mistakes.length === 0) return;
    setIsLoadingAi(true);
    setAiFeedback(null);
    try {
      const res = await fetch('/api/evaluateTest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mistakes })
      });
      const data = await res.json();
      if (data.feedback) {
        setAiFeedback(data.feedback);
      } else {
        setAiFeedback('Maaf, AI gagal memproses koreksi.');
      }
    } catch (err) {
      setAiFeedback('Terjadi kesalahan koneksi.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pb-20">
      
      {showResult && (
        <div className={`p-8 rounded-2xl border-4 text-center ${scoreData.passed ? 'bg-emerald-100 border-emerald-500' : 'bg-rose-100 border-rose-500'}`}>
          <h2 className={`text-4xl font-black mb-2 ${scoreData.passed ? 'text-emerald-700' : 'text-rose-700'}`}>
            {scoreData.passed ? '🎉 BESTANDEN!' : '❌ NICHT BESTANDEN'}
          </h2>
          <p className="text-xl font-bold text-slate-700">Skor Anda: <span className="text-3xl font-black">{scoreData.total}</span> / 40</p>
          <p className="text-sm mt-2 text-slate-500">(Batas lulus: 24 Poin / 60%)</p>

          {schreibenFeedback && (
            <div className="mt-6 border-t-2 border-dashed border-slate-300 pt-6 text-left">
              <h4 className="text-slate-800 font-black mb-3">📝 Evaluasi Schreiben (Teil 7):</h4>
              <div className="bg-white p-4 rounded-xl border border-slate-200 prose prose-sm text-slate-700" dangerouslySetInnerHTML={{ __html: schreibenFeedback }} />
            </div>
          )}

          {mistakes.length > 0 && (
            <div className="mt-6 border-t-2 border-dashed border-slate-300 pt-6">
              <p className="text-slate-600 font-bold mb-4">Ingin tahu detail kesalahanmu?</p>
              
              {!aiFeedback ? (
                <button 
                  onClick={getAiCorrection}
                  disabled={isLoadingAi}
                  className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold shadow-md flex items-center justify-center mx-auto gap-2 disabled:opacity-50 transition-all"
                >
                  {isLoadingAi ? '🤖 AI Sedang Menganalisa...' : '🤖 Tanya AI Kenapa Salah'}
                </button>
              ) : (
                <div className="bg-white p-6 rounded-xl border border-purple-200 mt-4 text-left shadow-inner">
                  <h4 className="text-purple-800 font-black mb-3">🤓 Feedback dari Deutsch AI:</h4>
                  <div className="prose prose-sm text-slate-700" dangerouslySetInnerHTML={{ __html: aiFeedback }} />
                </div>
              )}
            </div>
          )}

          <button onClick={() => { setShowResult(false); setAnswers({}); setMistakes([]); setAiFeedback(null); setSchreibenFeedback(null); }} className="mt-6 font-bold bg-white text-slate-800 px-6 py-2 rounded-xl shadow border-2">Coba Lagi</button>
        </div>
      )}

      <div>
        <h2 className="text-3xl font-extrabold text-slate-900">Kapiteltest 2: Nach der Schulzeit</h2>
        <p className="text-slate-600 text-sm mt-1">Lengkapilah semua pertanyaan berdasarkan materi yang telah dipelajari.</p>
      </div>

      {/* TEIL 1 */}
      <div className="clay-card p-6 bg-white border-2 border-indigo-100">
        <h3 className="text-xl font-black text-slate-800 mb-2">1. Ergänzen Sie das Gespräch (5 Poin)</h3>
        <p className="text-sm text-slate-500 mb-4 italic">Pilihan: Gymnasium, Abschluss, Abitur, Hausaufgaben, Sommerferien, Biologie, Klasse, Zeugnis, Stundenplan, Lieblingsfach</p>
        <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 font-medium text-slate-700 leading-loose">
          <p>Opa: Hallo Alexandra. Na? Wie läuft es denn in der Schule?</p>
          <p>Alexandra: Ach, Opa. Wie immer. Unser (1) <input type="text" className="border-b-2 border-indigo-300 bg-transparent outline-none w-32 px-1 text-indigo-700 font-bold" value={answers.t1_1 || ''} onChange={e => setAns('t1_1', e.target.value)} /> ist ganz schön voll.</p>
          <p>Opa: So, so. Was ist denn dein (2) <input type="text" className="border-b-2 border-indigo-300 bg-transparent outline-none w-32 px-1 text-indigo-700 font-bold" value={answers.t1_2 || ''} onChange={e => setAns('t1_2', e.target.value)} />?</p>
          <p>Alexandra: Ähm, (3) <input type="text" className="border-b-2 border-indigo-300 bg-transparent outline-none w-32 px-1 text-indigo-700 font-bold" value={answers.t1_3 || ''} onChange={e => setAns('t1_3', e.target.value)} />. Das kann ich besonders gut.</p>
          <p>Opa: Und wann bekommst du wieder ein (4) <input type="text" className="border-b-2 border-indigo-300 bg-transparent outline-none w-32 px-1 text-indigo-700 font-bold" value={answers.t1_4 || ''} onChange={e => setAns('t1_4', e.target.value)} />?</p>
          <p>Alexandra: In zwei Wochen. Dann haben wir endlich (5) <input type="text" className="border-b-2 border-indigo-300 bg-transparent outline-none w-32 px-1 text-indigo-700 font-bold" value={answers.t1_5 || ''} onChange={e => setAns('t1_5', e.target.value)} />.</p>
          <p>Opa: Ach so. Und in welche (6) <input type="text" className="border-b-2 border-indigo-300 bg-transparent outline-none w-32 px-1 text-indigo-700 font-bold" value={answers.t1_6 || ''} onChange={e => setAns('t1_6', e.target.value)} /> kommst du dann?</p>
          <p>Alexandra: In die 10.</p>
          <p>Opa: Dann machst du ja bald deinen (7) <input type="text" className="border-b-2 border-indigo-300 bg-transparent outline-none w-32 px-1 text-indigo-700 font-bold" value={answers.t1_7 || ''} onChange={e => setAns('t1_7', e.target.value)} />.</p>
          <p>Alexandra: Was? Nein, Opa. Ich gehe doch ins (8) <input type="text" className="border-b-2 border-indigo-300 bg-transparent outline-none w-32 px-1 text-indigo-700 font-bold" value={answers.t1_8 || ''} onChange={e => setAns('t1_8', e.target.value)} /> und mache mein (9) <input type="text" className="border-b-2 border-indigo-300 bg-transparent outline-none w-32 px-1 text-indigo-700 font-bold" value={answers.t1_9 || ''} onChange={e => setAns('t1_9', e.target.value)} /> erst in drei Jahren.</p>
          <p>Alexandra: Jetzt muss ich aber los und (10) <input type="text" className="border-b-2 border-indigo-300 bg-transparent outline-none w-32 px-1 text-indigo-700 font-bold" value={answers.t1_10 || ''} onChange={e => setAns('t1_10', e.target.value)} /> machen. Tschüs Opa!</p>
        </div>
      </div>

      {/* TEIL 2 */}
      <div className="clay-card p-6 bg-white border-2 border-emerald-100">
        <h3 className="text-xl font-black text-slate-800 mb-4">2. Ordnen Sie die Antworten zu (4 Poin)</h3>
        <div className="space-y-4">
          {[
            { id: 't2_1', q: '1. Was hast du danach gemacht?', opts: ['A. Ich jobbe in einem Café.', 'B. Ich bin als Au-pair in die USA gegangen.', 'C. Es geht. Manchmal ist sie langweilig.', 'D. Ich bin weiter nach Südamerika gereist.', 'E. Ich fange Ausbildung Hotelkaufmann an.'] },
            { id: 't2_2', q: '2. Und was machst du jetzt?', opts: ['A. Ich jobbe in einem Café.', 'B. Ich bin als Au-pair in die USA gegangen.', 'C. Es geht. Manchmal ist sie langweilig.', 'D. Ich bin weiter nach Südamerika gereist.', 'E. Ich fange Ausbildung Hotelkaufmann an.'] },
            { id: 't2_3', q: '3. Macht dir die Arbeit keinen Spaß?', opts: ['A. Ich jobbe in einem Café.', 'B. Ich bin als Au-pair in die USA gegangen.', 'C. Es geht. Manchmal ist sie langweilig.', 'D. Ich bin weiter nach Südamerika gereist.', 'E. Ich fange Ausbildung Hotelkaufmann an.'] },
            { id: 't2_4', q: '4. Was sind deine Pläne für die Zukunft?', opts: ['A. Ich jobbe in einem Café.', 'B. Ich bin als Au-pair in die USA gegangen.', 'C. Es geht. Manchmal ist sie langweilig.', 'D. Ich bin weiter nach Südamerika gereist.', 'E. Ich fange Ausbildung Hotelkaufmann an.'] },
          ].map(item => (
            <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="flex-1 font-bold text-slate-700">{item.q}</p>
              <select value={answers[item.id] || ''} onChange={e => setAns(item.id, e.target.value)} className="p-2 border-2 border-emerald-200 rounded-lg font-bold text-emerald-800 outline-none focus:border-emerald-500 bg-white">
                <option value="">- Pilih Jawaban -</option>
                <option value="A">A. Jobbe in Café</option>
                <option value="B">B. Au-pair in USA (Beispiel)</option>
                <option value="C">C. Es geht... langweilig</option>
                <option value="D">D. Reise nach Südamerika</option>
                <option value="E">E. Ausbildung Hotelkaufmann</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* TEIL 3 */}
      <div className="clay-card p-6 bg-white border-2 border-sky-100">
        <h3 className="text-xl font-black text-slate-800 mb-2">3. Modalverben im Präteritum (6 Poin)</h3>
        <p className="text-sm text-slate-500 mb-4 italic">Pilihan: wollen (3x), sollen, müssen, können, dürfen</p>
        <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-700 font-medium leading-relaxed">
          <p>
            Nach der Schule <b>wollte</b> ich Medizin studieren, aber das (1) <input type="text" className="w-24 border-b-2 border-sky-300 bg-transparent px-1 font-bold text-sky-700 outline-none" value={answers.t3_1 || ''} onChange={e => setAns('t3_1', e.target.value)} /> ich nicht, 
            weil meine Noten nicht so gut waren. Also (2) <input type="text" className="w-24 border-b-2 border-sky-300 bg-transparent px-1 font-bold text-sky-700 outline-none" value={answers.t3_2 || ''} onChange={e => setAns('t3_2', e.target.value)} /> ich eine Ausbildung machen.
          </p>
          <p>
            Und was (3) <input type="text" className="w-24 border-b-2 border-sky-300 bg-transparent px-1 font-bold text-sky-700 outline-none" value={answers.t3_3 || ''} onChange={e => setAns('t3_3', e.target.value)} /> ihr nach der Schule machen?
          </p>
          <p>
            Wir (4) <input type="text" className="w-24 border-b-2 border-sky-300 bg-transparent px-1 font-bold text-sky-700 outline-none" value={answers.t3_4 || ''} onChange={e => setAns('t3_4', e.target.value)} /> auf die Universität gehen, aber wir 
            (5) <input type="text" className="w-24 border-b-2 border-sky-300 bg-transparent px-1 font-bold text-sky-700 outline-none" value={answers.t3_5 || ''} onChange={e => setAns('t3_5', e.target.value)} /> zuerst eine Ausbildung machen. 
            Unsere Eltern haben das gesagt. Wir (6) <input type="text" className="w-24 border-b-2 border-sky-300 bg-transparent px-1 font-bold text-sky-700 outline-none" value={answers.t3_6 || ''} onChange={e => setAns('t3_6', e.target.value)} /> nicht das machen, was wir wollten.
          </p>
        </div>
      </div>

      {/* TEIL 4 */}
      <div className="clay-card p-6 bg-white border-2 border-rose-100">
        <h3 className="text-xl font-black text-slate-800 mb-4">4. Welcher Artikel passt? (5 Poin)</h3>
        <div className="space-y-4">
          {[
            { id: 't4_1', q: '1. Ich fange im Herbst mit ... Studium an.', opts: ['seinem', 'dem'] },
            { id: 't4_2', q: '2. Er denkt tidak gern an ... Schule zurück.', opts: ['die', 'eine'] },
            { id: 't4_3', q: '3. Was machst du nach ... Schulabschluss?', opts: ['keinem', 'deinem'] },
            { id: 't4_4', q: '4. Sprachen sind nützlich für ... Beruf.', opts: ['keinen', 'den'] },
            { id: 't4_5', q: '5. Ich möchte von ... Eltern unabhängig sein.', opts: ['meinen', 'einen'] },
          ].map(item => (
            <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="flex-1 font-bold text-slate-700">{item.q}</p>
              <div className="flex gap-2">
                {item.opts.map(opt => (
                  <button key={opt} onClick={() => setAns(item.id, opt)} className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${answers[item.id] === opt ? 'bg-rose-600 text-white shadow-md' : 'bg-white text-rose-800 border-2 border-rose-100 hover:bg-rose-50'}`}>{opt}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TEIL 5 */}
      <div className="clay-card p-6 bg-white border-2 border-amber-100">
        <h3 className="text-xl font-black text-slate-800 mb-4">5. Possessivartikel im Dativ (6 Poin)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 't5_1', q: '1. Sabrina hat nach ... Studium eine Reise gemacht.', h: 'ihr' },
            { id: 't5_2', q: '2. Hast du ... Großeltern eine Postkarte geschrieben?', h: 'dein' },
            { id: 't5_3', q: '3. Sie lernen an ... Schreibtisch.', h: 'ihr (Plural)' },
            { id: 't5_4', q: '4. Was macht ihr gern in ... Freizeit?', h: 'euer' },
            { id: 't5_5', q: '5. Wir gehen hari ini mit ... Freund Olli ins Kino.', h: 'unser' },
            { id: 't5_6', q: '6. Ich verstehe mich super mit ... Kollegen.', h: 'mein (Plural)' },
          ].map(item => (
            <div key={item.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <p className="text-sm font-bold text-slate-700">{item.q}</p>
              <input type="text" placeholder={`Dativ: ${item.h}`} value={answers[item.id] || ''} onChange={e => setAns(item.id, e.target.value)} className="w-full p-2.5 rounded-lg border-2 border-amber-200 focus:border-amber-500 outline-none font-bold text-amber-900" />
            </div>
          ))}
        </div>
      </div>

      {/* TEIL 6 */}
      <div className="clay-card p-6 bg-white border-2 border-fuchsia-100">
        <h3 className="text-xl font-black text-slate-800 mb-4">6. Welche Antwort passt? (4 Poin)</h3>
        <div className="space-y-4">
          {[
            { id: 't6_1', q: '1. Vielleicht mache ich später noch das Abitur.', opts: [{v:'A', l:'Das ist eine super Idee!'}, {v:'B', l:'Die Schule ist schwer, finde ich.'}] },
            { id: 't6_2', q: '2. Eine Ausbildung zur Erzieherin dauert drei Jahre.', opts: [{v:'A', l:'Das ist richtig.'}, {v:'B', l:'Ich denke, das geht tidak.'}] },
            { id: 't6_3', q: '3. Ich lerne in drei Wochen Deutsch.', opts: [{v:'A', l:'Genau.'}, {v:'B', l:'So einfach ist das tidak.'}] },
            { id: 't6_4', q: '4. Nach der Schule jobbe ich erst mal.', opts: [{v:'A', l:'Ich finde eine Pause gut.'}, {v:'B', l:'Das stimmt tidak.'}] },
          ].map(item => (
            <div key={item.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="font-bold text-slate-700 mb-3">{item.q}</p>
              <div className="flex flex-col gap-2">
                {item.opts.map(opt => (
                  <label key={opt.v} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${answers[item.id] === opt.v ? 'bg-fuchsia-100 border-fuchsia-500 text-fuchsia-900' : 'bg-white border-slate-100 hover:border-fuchsia-200'}`}>
                    <input type="radio" name={item.id} value={opt.v} checked={answers[item.id] === opt.v} onChange={() => setAns(item.id, opt.v)} className="w-5 h-5 accent-fuchsia-600" />
                    <span className="font-bold">{opt.l}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TEIL 7 */}
      <div className="clay-card p-6 bg-white border-2 border-teal-100">
        <h3 className="text-xl font-black text-slate-800 mb-4">7. Schreiben (Schulzeit & Pläne) (10 Poin)</h3>
        <p className="text-sm text-slate-500 mb-4 border-l-4 border-amber-400 pl-3">
          Tulis cerita singkat (30-50 kata) tentang masa sekolah dan rencana Anda:<br/>
          - Di mana Anda sekolah? / Apa mata pelajaran favorit Anda?<br/>
          - Apa yang harus/boleh dilakukan di sekolah? (Gunakan <i>musste/durfte</i>)<br/>
          - Apa rencana Anda setelah sekolah?
        </p>
        <textarea value={answers.t7_schreiben || ''} onChange={e => setAns('t7_schreiben', e.target.value)} placeholder="Früher war ich in..." rows={6} className="w-full p-4 rounded-xl border-2 border-slate-300 focus:border-teal-500 outline-none font-medium text-slate-800 resize-y" />
      </div>

      <div className="pt-8 pb-12">
        <button onClick={check} disabled={isSubmitting} className="w-full py-5 flex items-center justify-center gap-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 border-b-4 border-indigo-900 text-white font-black text-2xl transition-all active:border-b-0 active:translate-y-1 shadow-xl">
          {isSubmitting ? '🤖 AI Sedang Menilai...' : '📝 Kumpulkan & Hitung Skor'}
        </button>
      </div>
    </div>
  );
}
