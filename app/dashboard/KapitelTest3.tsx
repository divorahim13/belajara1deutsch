'use client';

import { useState } from 'react';

const t6_data = [
  { id: 'Video', art: 'das', cat: 'andere' },
  { id: 'Komödie', art: 'die', cat: 'filmtyp' },
  { id: 'Filmmusik', art: 'die', cat: 'andere' },
  { id: 'Handlung', art: 'die', cat: 'andere' },
  { id: 'Autobiografie', art: 'die', cat: 'filmtyp' },
  { id: 'Schauspieler', art: 'der', cat: 'andere' },
  { id: 'Fernseher', art: 'der', cat: 'andere' },
  { id: 'Liebesfilm', art: 'der', cat: 'filmtyp' },
  { id: 'Geschichte', art: 'die', cat: 'andere' },
  { id: 'Hauptperson', art: 'die', cat: 'andere' },
  { id: 'Thriller', art: 'der', cat: 'filmtyp' },
  { id: 'Trailer', art: 'der', cat: 'andere' }
];

export default function KapitelTest3() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [scoreData, setScoreData] = useState({ total: 0, max: 30, passed: false });
  const [mistakes, setMistakes] = useState<any[]>([]);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setAns = (id: string, val: string) => setAnswers(p => ({ ...p, [id]: val }));

  const check = () => {
    setIsSubmitting(true);
    let pts = 0;
    const errs: any[] = [];
    const log = (id: string, e: number, m: number, ans: string, exp: string, q: string) => {
      if (e < m) errs.push({ q, userAnswer: ans || '(kosong)', expected: exp });
      return e;
    };
    
    const checkSimple = (id: string, exp: string | string[], q: string, weight: number = 1) => {
      let v = (answers[id] || '').trim().toLowerCase();
      v = v.replace(/\.$/, ''); // Remove trailing dot just in case
      const expectedArray = Array.isArray(exp) ? exp : [exp];
      const correct = expectedArray.some(e => v === e.toLowerCase().replace(/\.$/, ''));
      return log(id, correct ? weight : 0, weight, answers[id], expectedArray[0], q);
    };

    // Teil 1: 8 Medien (8 x 0.5 = 4 pts)
    const t1_expected = [
      'der computer', 'die zeitung', 'das radio', 'die smartwatch', 
      'der e-book-reader', 'der fernseher', 'der laptop', 'das tablet'
    ];
    let t1_score = 0;
    const usedIndices = new Set<number>();
    
    for (let i = 1; i <= 8; i++) {
      const v = (answers[`t1_${i}`] || '').trim().toLowerCase();
      let matched = false;
      for (let j = 0; j < t1_expected.length; j++) {
        if (v === t1_expected[j] && !usedIndices.has(j)) {
          usedIndices.add(j);
          t1_score += 0.5;
          matched = true;
          break;
        }
      }
      if (!matched && v) {
        errs.push({ q: `1. Medien Wort ${i}`, userAnswer: v, expected: 'Salah satu dari: der Computer, die Zeitung, das Radio, die Smartwatch, der E-Book-Reader, der Fernseher, der Laptop, das Tablet' });
      } else if (!matched && !v) {
        errs.push({ q: `1. Medien Wort ${i}`, userAnswer: '(kosong)', expected: 'Kata media beserta artikelnya' });
      }
    }
    pts += t1_score;

    // Teil 2: Was kann man nicht...? (4 x 1 = 4 pts)
    pts += checkSimple('t2_1', 'kameras', '2.1 Kameras | Fotos | E-Mails -> senden', 1);
    pts += checkSimple('t2_2', 'papier', '2.2 Dateien | E-Mails | Papier -> anklicken', 1);
    pts += checkSimple('t2_3', 'tablets', '2.3 Musik | Tablets | E-Books -> runterladen', 1);
    pts += checkSimple('t2_4', 'vr-brillen', '2.4 Links | Rezepte | VR-Brillen -> kopieren', 1);

    // Teil 3: Komparativ / Superlativ (5 x 1 = 5 pts)
    pts += checkSimple('t3_1', 'lieber', '3.1 Magst du auch E-Books ___ als normale Bücher? (gern)', 1);
    pts += checkSimple('t3_2', 'am besten', '3.2 Welcher Film gefällt dir ___? (gut)', 1);
    pts += checkSimple('t3_3', 'länger', '3.3 Rico ist jeden Tag viel ___ im Internet als ich. (lang)', 1);
    pts += checkSimple('t3_4', 'am wichtigsten', '3.4 Was ist dir bei der Arbeit ___? (wichtig)', 1);
    pts += checkSimple('t3_5', 'am sympathischsten', '3.5 Welche Schauspielerin findest du ___? (sympathisch)', 1);

    // Teil 4: als oder wie? (6 x 0.5 = 3 pts)
    pts += checkSimple('t4_1', 'wie', '4.1 Ich lese Zeitschriften genauso gern ___ Bücher.', 0.5);
    pts += checkSimple('t4_2', 'als', '4.2 Ich arbeite lieber an einem Computer ___ an einem Laptop.', 0.5);
    pts += checkSimple('t4_3', 'wie', '4.3 Die Schauspieler sind mir nicht so wichtig ___ die Geschichte.', 0.5);
    pts += checkSimple('t4_4', 'wie', '4.4 Sport im Fernsehen finde ich so langweilig ___ Liebesfilme.', 0.5);
    pts += checkSimple('t4_5', 'als', '4.5 Heute verbringen die Menschen mehr Zeit mit Medien ___ früher.', 0.5);
    pts += checkSimple('t4_6', 'wie', '4.6 Wir benutzen die Spielekonsole genauso selten ___ die VR-Brille.', 0.5);

    // Teil 5: dass-Sätze (4 x 2 = 8 pts)
    pts += checkSimple('t5_1', ['dass er bald wieder in einem film mitspielt'], '5.1 Ich hoffe, ... (Er spielt bald wieder in einem Film mit.)', 2);
    pts += checkSimple('t5_2', ['dass ich dann sofort ins kino gehe'], '5.2 Ich bin sicher, ... (Ich gehe dann sofort ins Kino.)', 2);
    pts += checkSimple('t5_3', ['dass filme nicht immer spannend sein müssen', 'dass filme immer nicht spannend sein müssen'], '5.3 Ich denke, ... (Filme müssen nicht immer spannend sein.)', 2);
    pts += checkSimple('t5_4', ['dass ich den film auf deutsch verstehe'], '5.4 Ich bin glücklich, ... (Ich verstehe den Film auf Deutsch.)', 2);

    // Teil 6: Film Wörter zuordnen (12 Wörter x 0.5 = 6 pts)
    for (let i = 0; i < t6_data.length; i++) {
      const item = t6_data[i];
      const ansArt = answers[`t6_art_${i}`] || '';
      const ansCat = answers[`t6_cat_${i}`] || '';
      let score = 0;
      if (ansArt === item.art) score += 0.25;
      if (ansCat === item.cat) score += 0.25;
      
      if (score < 0.5) {
        errs.push({ q: `6. ${item.id}`, userAnswer: `${ansArt} ${item.id} (${ansCat})`, expected: `${item.art} ${item.id} (${item.cat})` });
      }
      pts += score;
    }

    setMistakes(errs);
    setScoreData({ total: Math.round(pts * 10) / 10, max: 30, passed: pts >= 18 });
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
          <p className="text-xl font-bold text-slate-700">Skor Anda: <span className="text-4xl font-black">{scoreData.total}</span> / 30</p>
          <p className="text-sm mt-2 text-slate-500">(Batas lulus: 18 Poin / 60%)</p>

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

          <button onClick={() => { setShowResult(false); setAnswers({}); setMistakes([]); setAiFeedback(null); }} className="mt-6 font-bold bg-white text-slate-800 px-6 py-2 rounded-xl shadow border-2">Ulangi Tes</button>
        </div>
      )}

      <div>
        <h2 className="text-3xl font-extrabold text-slate-900">Kapiteltest 3: Immer online?</h2>
        <p className="text-slate-600 text-sm mt-1">Netzwerk neu A2 - Kerjakan semua soal di bawah ini.</p>
      </div>

      {/* TEIL 1 */}
      <div className="clay-card p-6 bg-white border-2 border-indigo-100">
        <h3 className="text-xl font-black text-slate-800 mb-2">1. Finden Sie acht Medien und notieren Sie sie mit Artikel. (4 Poin)</h3>
        <div className="mb-4 text-slate-600 bg-slate-50 p-4 rounded-xl font-mono text-center tracking-widest leading-loose">
          Han | Com | Zei | Ra | dy | Smart | der | er | Fern | tung | Lap | Tab | E-Book | pu | watch | Rea | seh | top | dio | let | ter
        </div>
        <p className="text-sm font-bold text-slate-500 mb-2">Beispiel: 0. das Handy</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1,2,3,4,5,6,7,8].map(num => (
            <div key={num} className="flex items-center gap-2">
              <span className="font-bold text-slate-400 w-4">{num}.</span>
              <input type="text" className="flex-1 p-2 border-b-2 border-indigo-200 outline-none focus:border-indigo-500 font-bold text-indigo-800 bg-transparent" value={answers[`t1_${num}`] || ''} onChange={e => setAns(`t1_${num}`, e.target.value)} placeholder="Artikel + Wort (z.B. der Computer)" />
            </div>
          ))}
        </div>
      </div>

      {/* TEIL 2 */}
      <div className="clay-card p-6 bg-white border-2 border-emerald-100">
        <h3 className="text-xl font-black text-slate-800 mb-2">2. Was kann man nicht ...? Streichen Sie durch. (4 Poin)</h3>
        <p className="text-sm font-bold text-slate-500 mb-4">Beispiel: 0. Computer | Spielekonsolen | <del className="text-rose-500">Zeitungen</del> -{'>'} anmachen</p>
        <p className="text-sm text-slate-600 mb-4 italic">Pilih satu kata yang TIDAK bisa dilakukan oleh kata kerja di sebelah kanan.</p>
        <div className="space-y-3">
          {[
            { id: 't2_1', words: ['Kameras', 'Fotos', 'E-Mails'], verb: 'senden' },
            { id: 't2_2', words: ['Dateien', 'E-Mails', 'Papier'], verb: 'anklicken' },
            { id: 't2_3', words: ['Musik', 'Tablets', 'E-Books'], verb: 'runterladen' },
            { id: 't2_4', words: ['Links', 'Rezepte', 'VR-Brillen'], verb: 'kopieren' },
          ].map((item, idx) => (
            <div key={item.id} className="flex flex-col md:flex-row md:items-center gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-400">{idx + 1}.</span>
              <div className="flex-1 flex flex-wrap gap-2">
                {item.words.map(w => (
                  <label key={w} className={`px-3 py-1 rounded cursor-pointer border-2 transition-all ${answers[item.id] === w.toLowerCase() ? 'bg-rose-100 border-rose-500 text-rose-800 line-through' : 'bg-white border-slate-200 hover:border-rose-200'}`}>
                    <input type="radio" name={item.id} value={w.toLowerCase()} checked={answers[item.id] === w.toLowerCase()} onChange={() => setAns(item.id, w.toLowerCase())} className="hidden" />
                    {w}
                  </label>
                ))}
              </div>
              <span className="font-black text-slate-700 w-32 md:text-right mt-2 md:mt-0">-&gt; {item.verb}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TEIL 3 */}
      <div className="clay-card p-6 bg-white border-2 border-sky-100">
        <h3 className="text-xl font-black text-slate-800 mb-2">3. Komparativ oder Superlativ? Ergänzen Sie die Adjektive in der richtigen Form. (5 Poin)</h3>
        <p className="text-sm font-bold text-slate-500 mb-4">Beispiel: 0. Wer kann <u>schneller</u> laufen? Erika oder Lisa? (schnell) - Sie sind gleich schnell.</p>
        <div className="space-y-4">
          {[
            { id: 't3_1', text1: 'Magst du auch E-Books', text2: 'als normale Bücher? (gern)', ans: 'Ja.' },
            { id: 't3_2', text1: 'Welcher Film gefällt dir', text2: '? (gut)', ans: 'Rückenwind von vorn.' },
            { id: 't3_3', text1: 'Rico ist jeden Tag viel', text2: 'im Internet als ich. (lang)', ans: 'Wirklich?' },
            { id: 't3_4', text1: 'Was ist dir bei der Arbeit', text2: '? (wichtig)', ans: 'Ähm, dass die Kollegen nett sind.' },
            { id: 't3_5', text1: 'Welche Schauspielerin findest du', text2: '? (sympathisch)', ans: 'Nora Tschirner.' },
          ].map((item, idx) => (
            <div key={item.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 leading-loose">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-bold text-slate-400">{idx + 1}.</span>
                <span>{item.text1}</span>
                <input type="text" className="w-32 p-1 border-b-2 border-sky-300 bg-transparent outline-none focus:border-sky-600 text-sky-800 font-bold text-center" value={answers[item.id] || ''} onChange={e => setAns(item.id, e.target.value)} />
                <span>{item.text2}</span>
              </div>
              <p className="text-slate-500 italic md:ml-6 mt-1">- {item.ans}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TEIL 4 */}
      <div className="clay-card p-6 bg-white border-2 border-amber-100">
        <h3 className="text-xl font-black text-slate-800 mb-2">4. <i>als</i> oder <i>wie</i>? Kreuzen Sie an. (3 Poin)</h3>
        <p className="text-sm font-bold text-slate-500 mb-4">Beispiel: 0. Ich finde Actionfilme viel spannender [als] Fantasy-Filme.</p>
        <div className="space-y-3">
          {[
            { id: 't4_1', text1: 'Ich lese Zeitschriften genauso gern', text2: 'Bücher.' },
            { id: 't4_2', text1: 'Ich arbeite lieber an einem Computer', text2: 'an einem Laptop.' },
            { id: 't4_3', text1: 'Die Schauspieler sind mir nicht so wichtig', text2: 'die Geschichte.' },
            { id: 't4_4', text1: 'Sport im Fernsehen finde ich so langweilig', text2: 'Liebesfilme.' },
            { id: 't4_5', text1: 'Heute verbringen die Menschen mehr Zeit mit Medien', text2: 'früher.' },
            { id: 't4_6', text1: 'Wir benutzen die Spielekonsole genauso selten', text2: 'die VR-Brille.' },
          ].map((item, idx) => (
            <div key={item.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-bold text-slate-400 w-4">{idx + 1}.</span>
              <span>{item.text1}</span>
              <select value={answers[item.id] || ''} onChange={e => setAns(item.id, e.target.value)} className="p-1 border-2 border-amber-200 rounded font-bold text-amber-800 outline-none bg-white focus:border-amber-500">
                <option value="">-</option>
                <option value="als">als</option>
                <option value="wie">wie</option>
              </select>
              <span>{item.text2}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TEIL 5 */}
      <div className="clay-card p-6 bg-white border-2 border-fuchsia-100">
        <h3 className="text-xl font-black text-slate-800 mb-2">5. Schreiben Sie Sätze mit <i>dass</i>. (8 Poin)</h3>
        <p className="text-sm font-bold text-slate-500 mb-4">Beispiel: 0. Ich finde, <u>dass Hape Kerkeling lustig ist.</u> (Hape Kerkeling ist lustig.)</p>
        <div className="space-y-4">
          {[
            { id: 't5_1', start: 'Ich hoffe,', hint: 'Er spielt bald wieder in einem Film mit.' },
            { id: 't5_2', start: 'Ich bin sicher,', hint: 'Ich gehe dann sofort ins Kino.' },
            { id: 't5_3', start: 'Ich denke,', hint: 'Filme müssen nicht immer spannend sein.' },
            { id: 't5_4', start: 'Ich bin glücklich,', hint: 'Ich verstehe den Film auf Deutsch.' },
          ].map((item, idx) => (
            <div key={item.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-slate-400">{idx + 1}.</span>
                <span className="font-bold">{item.start}</span>
                <input type="text" className="flex-1 min-w-[200px] p-2 border-b-2 border-fuchsia-300 bg-transparent outline-none focus:border-fuchsia-500 text-fuchsia-800 font-bold" value={answers[item.id] || ''} onChange={e => setAns(item.id, e.target.value)} placeholder="dass ..." />
              </div>
              <p className="text-sm text-slate-500 md:ml-8">({item.hint})</p>
            </div>
          ))}
        </div>
      </div>

      {/* TEIL 6 */}
      <div className="clay-card p-6 bg-white border-2 border-teal-100">
        <h3 className="text-xl font-black text-slate-800 mb-2">6. Ordnen Sie die Wörter zum Thema Film mit Artikel zu. (6 Poin)</h3>
        <p className="text-sm font-bold text-slate-500 mb-4">Beispiel: 0. Krimi -&gt; der (Filmtyp)</p>
        <div className="mb-4 text-slate-600 bg-slate-50 p-4 rounded-xl font-bold flex flex-wrap gap-2">
          {t6_data.map(w => <span key={w.id} className="bg-white px-3 py-1 rounded border shadow-sm text-teal-800">{w.id}</span>)}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t6_data.map((item, idx) => (
            <div key={item.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-wrap items-center gap-2">
              <span className="font-bold text-slate-700 w-28 md:w-32 truncate" title={item.id}>{item.id}</span>
              <select value={answers[`t6_art_${idx}`] || ''} onChange={e => setAns(`t6_art_${idx}`, e.target.value)} className="p-1 border-2 border-teal-200 rounded font-bold text-teal-800 bg-white focus:border-teal-500">
                <option value="">Artikel</option>
                <option value="der">der</option>
                <option value="die">die</option>
                <option value="das">das</option>
              </select>
              <select value={answers[`t6_cat_${idx}`] || ''} onChange={e => setAns(`t6_cat_${idx}`, e.target.value)} className="p-1 border-2 border-teal-200 rounded font-bold text-teal-800 bg-white flex-1 focus:border-teal-500">
                <option value="">Kategorie</option>
                <option value="filmtyp">Filmtyp</option>
                <option value="andere">Andere Wörter</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8 pb-12">
        <button onClick={check} disabled={isSubmitting} className="w-full py-5 flex items-center justify-center gap-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 border-b-4 border-indigo-900 text-white font-black text-2xl transition-all active:border-b-0 active:translate-y-1 shadow-xl">
          {isSubmitting ? '🤖 Sedang Menilai...' : '📝 Kumpulkan & Hitung Skor'}
        </button>
      </div>
    </div>
  );
}
