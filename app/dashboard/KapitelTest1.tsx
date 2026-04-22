'use client';

import { useState } from 'react';

export default function KapitelTestEins() {
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
    
    // Teil 1 (3 points / 6 = 0.5 per item)
    pts += log('t1_1', answers.t1_1 === 'der Flohmarkt' ? 0.5 : 0, 0.5, answers.t1_1, 'der Flohmarkt', 'Welches Wort passt nicht: mieten, das Stadtzentrum, renovieren, der Flohmarkt');
    pts += log('t1_2', answers.t1_2 === 'lecker' ? 0.5 : 0, 0.5, answers.t1_2, 'lecker', 'Welches Wort passt nicht: bitter, lecker, salzig, scharf');
    pts += log('t1_3', answers.t1_3 === 'bestellen' ? 0.5 : 0, 0.5, answers.t1_3, 'bestellen', 'Welches Wort passt nicht: die Rechnung, bezahlen, bestellen, das Trinkgeld');
    pts += log('t1_4', answers.t1_4 === 'gemeinsam' ? 0.5 : 0, 0.5, answers.t1_4, 'gemeinsam', 'Welches Wort passt nicht: gemeinsam, verheiratet, ledig, geschieden');
    pts += log('t1_5', answers.t1_5 === 'rufen' ? 0.5 : 0, 0.5, answers.t1_5, 'rufen', 'Welches Wort passt nicht: die Sprache, rufen, sprechen, fließend');
    pts += log('t1_6', answers.t1_6 === 'lesen' ? 0.5 : 0, 0.5, answers.t1_6, 'lesen', 'Welches Wort passt nicht: joggen, lesen, reiten, Basketball spielen');

    // Teil 2 (2 points / 4 = 0.5 per item)
    pts += log('t2_1', answers.t2_1 === 'abschließen' ? 0.5 : 0, 0.5, answers.t2_1, 'abschließen', 'eine Ausbildung ...');
    pts += log('t2_2', answers.t2_2 === 'leben' ? 0.5 : 0, 0.5, answers.t2_2, 'leben', 'auf dem Land ...');
    pts += log('t2_3', answers.t2_3 === 'sprechen' ? 0.5 : 0, 0.5, answers.t2_3, 'sprechen', 'Englisch und Deutsch ...');
    pts += log('t2_4', answers.t2_4 === 'reservieren' ? 0.5 : 0, 0.5, answers.t2_4, 'reservieren', 'einen Tisch ...');

    // Teil 3 (5 points / 5 = 1 per item)
    const t3_1 = (answers.t3_1 || '').trim().toLowerCase();
    pts += log('t3_1', t3_1.includes("yannis'") || t3_1.includes("yannis klasse") ? 1 : 0, 1, answers.t3_1, "Frau Yannis' Klasse", 'die Klasse von Frau Yannis? Wen?');
    const t3_2 = (answers.t3_2 || '').trim().toLowerCase();
    pts += log('t3_2', t3_2.includes("groß'") || t3_2.includes("groß chef") || t3_2.includes("gross'") ? 1 : 0, 1, answers.t3_2, "Frau Groß' Chef", 'den Chef von Frau Groß? Wen?');
    const t3_3 = (answers.t3_3 || '').trim().toLowerCase();
    pts += log('t3_3', t3_3.includes("theos") ? 1 : 0, 1, answers.t3_3, "Theos Kollege", 'der Kollege von Theo? Wer?');
    const t3_4 = (answers.t3_4 || '').trim().toLowerCase();
    pts += log('t3_4', t3_4.includes("franz'") || t3_4.includes("franz bruder") ? 1 : 0, 1, answers.t3_4, "Franz' Bruder", 'mit dem Bruder von Franz gesprochen? Mit wem?');
    const t3_5 = (answers.t3_5 || '').trim().toLowerCase();
    pts += log('t3_5', t3_5.includes("max'") || t3_5.includes("max buch") ? 1 : 0, 1, answers.t3_5, "Max' Buch", 'wo das Buch von Max ist? Was?');

    // Teil 4 (6 points / 6 = 1 per item)
    pts += log('t4_1', answers.t4_1 === 'B' ? 1 : 0, 1, answers.t4_1, 'B', '1. Das ist ...');
    pts += log('t4_2', answers.t4_2 === 'A' ? 1 : 0, 1, answers.t4_2, 'A', '2. Hast du am ...');
    pts += log('t4_3', answers.t4_3 === 'F' ? 1 : 0, 1, answers.t4_3, 'F', '3. Schade, da kann ...');
    pts += log('t4_4', answers.t4_4 === 'D' ? 1 : 0, 1, answers.t4_4, 'D', '4. Um wie viel Uhr ...');
    pts += log('t4_5', answers.t4_5 === 'G' ? 1 : 0, 1, answers.t4_5, 'G', '5. Ich möchte gern, ...');
    pts += log('t4_6', answers.t4_6 === 'E' ? 1 : 0, 1, answers.t4_6, 'E', '6. Geht es auch ...');

    // Teil 5
    const checkT5 = (id: string, h: string, p: string, q: string) => {
      const v = (answers[id] || '').trim().toLowerCase();
      let e = 0;
      if (v.includes(h) && v.includes(p)) e = 1;
      else if (v.includes(p)) e = 0.5;
      return log(id, e, 1, answers[id], `${h} ${p}`, q);
    };
    pts += checkT5('t5_1', 'habe', 'eingekauft', '1. Danke, gut! Ich ________ gerade. Ich koche heute.');
    pts += checkT5('t5_2', 'habe', 'eingeladen', '2. Ja, ich ________ Saskia und Thomas.');
    pts += checkT5('t5_3', 'sind', 'zurückgekommen', '3. Die beiden ________ gestern aus Italien.');
    pts += checkT5('t5_4', 'habe', 'telefoniert', '4. Toll! Ich ________ gestern mit Klara.');
    pts += checkT5('t5_5', 'haben', 'studiert', '5. Klar! Wir ________ doch zusammen Jura.');
    pts += checkT5('t5_6', 'hat', 'beendet', '6. Stimmt! Sie ________ ihr Studium und feiert am Samstag.');

    // Teil 6
    const checkT6 = (id: string, req: string[], q: string) => {
      const v = (answers[id] || '').trim().toLowerCase();
      const hits = req.filter(k => v.includes(k)).length;
      let e = 0;
      if (hits === req.length) e = 2;
      else if (hits > 0) e = 1;
      return log(id, e, 2, answers[id], req.join(' '), q);
    };
    pts += checkT6('t6_1', ['weil', 'gäste', 'kommen'], '1. Wir müssen uns beeilen, ... (die Gäste | kommen | bald)');
    pts += checkT6('t6_2', ['weil', 'vater', 'krank', 'ist'], '2. Lea bleibt heute zu Hause, ... (krank | ihr Vater | sein)');
    pts += checkT6('t6_3', ['weil', 'gelernt', 'hat'], '3. Ben kann gut kochen, ... (er | das | gelernt | haben | von seiner Oma)');
    pts += checkT6('t6_4', ['weil', 'hund', 'mitbringen', 'will'], '4. Er freut sich, ... (seinen Hund | wollen | Marvin | mitbringen)');

    // Evaluate T7 (Schreiben)
    let writingScore = 0;
    let wFeedback = '';
    const writingText = answers.t7_schreiben || '';
    
    if (writingText.trim().length > 0) {
      try {
        const res = await fetch('/api/evaluateSchreiben', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: writingText })
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
        setAiFeedback('Maaf, AI gagal memproses koreksi. Silakan periksa kunci API Anda.');
      }
    } catch (err) {
      setAiFeedback('Terjadi kesalahan koneksi saat memanggil AI.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      
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
        <h2 className="text-3xl font-extrabold text-slate-900">Test zu Kapitel 1</h2>
        <p className="text-slate-600 text-sm mt-1">Lengkapilah semua pertanyaan di bawah dan tekan "Kumpulkan" di bagian terbawah.</p>
      </div>

      {/* TEIL 1 */}
      <div className="clay-card p-6 bg-white border-2 border-indigo-100">
        <h3 className="text-xl font-black text-slate-800 mb-4">1. Welches Wort passt nicht in die Reihe? (3 Poin)</h3>
        <p className="text-sm text-slate-500 mb-4 border-l-4 border-amber-400 pl-3">Contoh: 0. der Bankkaufmann | <del className="text-slate-400">der Rentner</del> | der Optiker | der Kellner</p>
        
        <div className="space-y-4">
          {[
            { id: 't1_1', words: ['mieten', 'das Stadtzentrum', 'renovieren', 'der Flohmarkt'] },
            { id: 't1_2', words: ['bitter', 'lecker', 'salzig', 'scharf'] },
            { id: 't1_3', words: ['die Rechnung', 'bezahlen', 'bestellen', 'das Trinkgeld'] },
            { id: 't1_4', words: ['gemeinsam', 'verheiratet', 'ledig', 'geschieden'] },
            { id: 't1_5', words: ['die Sprache', 'rufen', 'sprechen', 'fließend'] },
            { id: 't1_6', words: ['joggen', 'lesen', 'reiten', 'Basketball spielen'] }
          ].map((q, i) => (
            <div key={q.id} className="flex flex-col sm:flex-row sm:items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-400 w-6">{i + 1}.</span>
              <div className="flex flex-wrap gap-2 flex-1">
                {q.words.map(w => (
                  <button
                    key={w}
                    onClick={() => setAns(q.id, w)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${answers[q.id] === w ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-indigo-50 border border-slate-300'}`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TEIL 2 */}
      <div className="clay-card p-6 bg-white border-2 border-emerald-100">
        <h3 className="text-xl font-black text-slate-800 mb-4">2. Ordnen Sie die Verben zu. (2 Poin)</h3>
        <p className="text-sm text-slate-500 mb-4 border-l-4 border-amber-400 pl-3">Verben: renovieren | abschließen | reservieren | leben | sprechen<br/>0. eine Wohnung {'->'} <em>renovieren</em></p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 't2_1', label: '1. eine Ausbildung' },
            { id: 't2_2', label: '2. auf dem Land' },
            { id: 't2_3', label: '3. Englisch und Deutsch' },
            { id: 't2_4', label: '4. einen Tisch' },
          ].map((q) => (
            <div key={q.id} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-700 flex-1">{q.label}</span>
              <select 
                value={answers[q.id] || ''} 
                onChange={(e) => setAns(q.id, e.target.value)}
                className="p-2 border-2 border-emerald-200 rounded-lg bg-white font-bold text-emerald-800 outline-none focus:border-emerald-500"
              >
                <option value="">- Pilih -</option>
                <option value="abschließen">abschließen</option>
                <option value="leben">leben</option>
                <option value="reservieren">reservieren</option>
                <option value="sprechen">sprechen</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* TEIL 3 */}
      <div className="clay-card p-6 bg-white border-2 border-sky-100">
        <h3 className="text-xl font-black text-slate-800 mb-4">3. Ergänzen Sie die Antworten (Genitiv). (5 Poin)</h3>
        <p className="text-sm text-slate-500 mb-4 border-l-4 border-amber-400 pl-3">0. Ich habe gestern die Freundin von Lea getroffen? Wen? $\rightarrow$ <em>Leas Freundin.</em></p>
        
        <div className="space-y-4">
          {[
            { id: 't3_1', frage: '1. Ich unterrichte heute die Klasse von Frau Yannis? Wen?' },
            { id: 't3_2', frage: '2. Kennst du den Chef von Frau Groß? Wen?' },
            { id: 't3_3', frage: '3. Wie heißt der Kollege von Theo? Wer?' },
            { id: 't3_4', frage: '4. Hast du mit dem Bruder von Franz gesprochen? Mit wem?' },
            { id: 't3_5', frage: '5. Weißt du, wo das Buch von Max ist? Was?' },
          ].map(q => (
            <div key={q.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="text-slate-700 font-medium mb-2">{q.frage}</p>
              <input
                type="text"
                placeholder="Jawaban (contoh: Leas Freundin)"
                value={answers[q.id] || ''}
                onChange={e => setAns(q.id, e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-slate-300 focus:border-sky-500 outline-none font-bold text-slate-800"
              />
            </div>
          ))}
        </div>
      </div>

      {/* TEIL 4 */}
      <div className="clay-card p-6 bg-white border-2 border-rose-100">
        <h3 className="text-xl font-black text-slate-800 mb-4">4. Eine Verabredung. Verbinden Sie. (6 Poin)</h3>
         <p className="text-sm text-slate-500 mb-4 border-l-4 border-amber-400 pl-3">0. Gehen wir zusammen $\rightarrow$ <em>C. ein Eis essen?</em></p>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            {[
              { id: 't4_1', label: '1. Das ist' },
              { id: 't4_2', label: '2. Hast du am' },
              { id: 't4_3', label: '3. Schade, da kann' },
              { id: 't4_4', label: '4. Um wie viel Uhr' },
              { id: 't4_5', label: '5. Ich möchte gern,' },
              { id: 't4_6', label: '6. Geht es auch' },
            ].map(q => (
              <div key={q.id} className="flex gap-2 items-center">
                <span className="font-bold text-slate-700 w-32">{q.label}</span>
                <select value={answers[q.id] || ''} onChange={e => setAns(q.id, e.target.value)} className="flex-1 p-2 border-2 border-rose-200 rounded-lg focus:border-rose-500 font-bold outline-none text-rose-800 bg-white">
                  <option value="">--</option>
                  <option value="A">A (Freitag Zeit?)</option>
                  <option value="B">B (eine gute Idee.)</option>
                  <option value="D">D (geht es los?)</option>
                  <option value="E">E (ein bisschen später?)</option>
                  <option value="F">F (ich leider nicht.)</option>
                  <option value="G">G (aber ich muss lernen.)</option>
                </select>
              </div>
            ))}
          </div>
          {/* Options Cheat Sheet */}
          <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 text-sm text-rose-800 font-medium space-y-1">
            <p><strong>A</strong> Freitag Zeit?</p>
            <p><strong>B</strong> eine gute Idee.</p>
            <p className="line-through text-slate-400"><strong>C</strong> ein Eis essen?</p>
            <p><strong>D</strong> geht es los?</p>
            <p><strong>E</strong> ein bisschen später?</p>
            <p><strong>F</strong> ich leider nicht.</p>
            <p><strong>G</strong> aber ich muss lernen.</p>
          </div>
         </div>
      </div>

      {/* TEIL 5 */}
      <div className="clay-card p-6 bg-white border-2 border-amber-100">
        <h3 className="text-xl font-black text-slate-800 mb-4">5. Ergänzen Sie die Verben im Perfekt. (6 Poin)</h3>
        <p className="text-sm text-slate-500 mb-4 border-l-4 border-amber-400 pl-3">Verben: sehen | einkaufen | zurückkommen | beenden | telefonieren | einladen | studieren<br/>0. Hallo Flo. Wir <em>haben</em> uns ja schon lange nicht mehr <em>gesehen</em>.</p>
        
        <div className="space-y-4">
          <p className="text-amber-800 font-bold bg-amber-50 p-3 rounded-lg border border-amber-200 text-sm">💡 Ketik HILFSVERB dan PARTIZIP II bersamaan (contoh: "habe eingekauft" atau "sind zurückgekommen").</p>
          
          {[
            { id: 't5_1', frage: '1. Danke, gut! Ich ________ gerade. Ich koche heute.' },
            { id: 't5_2', frage: '2. Ja, ich ________ Saskia und Thomas.' },
            { id: 't5_3', frage: '3. Die beiden ________ gestern aus Italien.' },
            { id: 't5_4', frage: '4. Toll! Ich ________ gestern mit Klara.' },
            { id: 't5_5', frage: '5. Klar! Wir ________ doch zusammen Jura.' },
            { id: 't5_6', frage: '6. Stimmt! Sie ________ ihr Studium und feiert am Samstag.' },
          ].map((q) => (
            <div key={q.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="text-slate-700 font-medium mb-3">{q.frage}</p>
              <input
                type="text"
                placeholder="habe/ist + Partizip II"
                value={answers[q.id] || ''}
                onChange={e => setAns(q.id, e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-slate-300 focus:border-amber-500 outline-none font-bold text-slate-800"
              />
            </div>
          ))}
        </div>
      </div>

      {/* TEIL 6 */}
      <div className="clay-card p-6 bg-white border-2 border-fuchsia-100">
        <h3 className="text-xl font-black text-slate-800 mb-4">6. Schreiben Sie Nebensätze mit 'weil'. (8 Poin)</h3>
        <p className="text-sm text-slate-500 mb-4 border-l-4 border-amber-400 pl-3">0. Ich kann leider nichts kochen, <em>weil der Kühlschrank leer ist.</em> (der Kühlschrank | sein | leer)</p>
        
        <div className="space-y-4">
          {[
            { id: 't6_1', frage: '1. Wir müssen uns beeilen, ... (die Gäste | kommen | bald)' },
            { id: 't6_2', frage: '2. Lea bleibt heute zu Hause, ... (krank | ihr Vater | sein)' },
            { id: 't6_3', frage: '3. Ben kann gut kochen, ... (er | das | gelernt | haben | von seiner Oma)' },
            { id: 't6_4', frage: '4. Er freut sich, ... (seinen Hund | wollen | Marvin | mitbringen)' },
          ].map(q => (
            <div key={q.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <p className="text-slate-700 font-medium mb-3">{q.frage}</p>
              <input
                type="text"
                placeholder="weil ..."
                value={answers[q.id] || ''}
                onChange={e => setAns(q.id, e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-slate-300 focus:border-fuchsia-500 outline-none font-bold text-slate-800"
              />
            </div>
          ))}
        </div>
      </div>

      {/* TEIL 7 */}
      <div className="clay-card p-6 bg-white border-2 border-teal-100">
        <h3 className="text-xl font-black text-slate-800 mb-4">7. Schreiben (SMS) (10 Poin)</h3>
        <p className="text-sm text-slate-500 mb-4 border-l-4 border-amber-400 pl-3">
          Anda mendapat pesan SMS dari teman Anda, Thomas:<br/><br/>
          <em>"Hallo! Wollen wir am Samstagabend ins Kino gehen? Ich habe zwei Karten für einen tollen Film!"</em><br/><br/>
          Balas pesan Thomas (30-40 kata) dengan mencakup poin-poin berikut:<br/>
          - <b>Salam pembuka</b> (Anrede)<br/>
          - <b>Absagen & Begründen</b> (Tolak ajakannya hari Sabtu dan berikan alasan mengapa Anda tidak bisa)<br/>
          - <b>Vorschlag ändern</b> (Usulkan hari lain, misalnya hari Minggu)<br/>
          - <b>Etwas vorschlagen</b> (Ajak dia melakukan aktivitas lain, misalnya minum kopi atau berolahraga)<br/>
          - <b>Salam penutup</b> (Gruß)
        </p>
        
        <textarea
          value={answers.t7_schreiben || ''}
          onChange={e => setAns('t7_schreiben', e.target.value)}
          placeholder="Hallo Thomas, &#10;&#10;..."
          rows={6}
          className="w-full p-4 rounded-xl border-2 border-slate-300 focus:border-teal-500 outline-none font-medium text-slate-800 resize-y"
        />
      </div>

      <div className="pt-8 pb-12">
        <button 
          onClick={check}
          disabled={isSubmitting}
          className="w-full py-5 flex items-center justify-center gap-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 border-b-4 border-indigo-900 text-white font-black text-2xl transition-all active:border-b-0 active:translate-y-1 shadow-xl"
        >
          {isSubmitting ? '🤖 AI Sedang Menilai...' : '📝 Kumpulkan & Hitung Skor'}
        </button>
      </div>
    </div>
  );
}
