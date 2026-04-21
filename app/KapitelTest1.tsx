'use client';

import { useState } from 'react';

export default function KapitelTestEins() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [scoreData, setScoreData] = useState({ total: 0, max: 30, passed: false });

  const setAns = (id: string, val: string) => setAnswers(p => ({ ...p, [id]: val }));

  const check = () => {
    let pts = 0;
    
    // Teil 1 (3 points / 6 = 0.5 per item)
    if (answers.t1_1 === 'der Flohmarkt') pts += 0.5;
    if (answers.t1_2 === 'lecker') pts += 0.5;
    if (answers.t1_3 === 'bestellen') pts += 0.5;
    if (answers.t1_4 === 'gemeinsam') pts += 0.5;
    if (answers.t1_5 === 'rufen') pts += 0.5;
    if (answers.t1_6 === 'lesen') pts += 0.5;

    // Teil 2 (2 points / 4 = 0.5 per item)
    if (answers.t2_1 === 'abschließen') pts += 0.5;
    if (answers.t2_2 === 'leben') pts += 0.5;
    if (answers.t2_3 === 'sprechen') pts += 0.5;
    if (answers.t2_4 === 'reservieren') pts += 0.5;

    // Teil 3 (5 points / 5 = 1 per item)
    const t3_1 = (answers.t3_1 || '').trim().toLowerCase();
    if (t3_1.includes("yannis'") || t3_1.includes("yannis klasse")) pts += 1;
    const t3_2 = (answers.t3_2 || '').trim().toLowerCase();
    if (t3_2.includes("groß'") || t3_2.includes("groß chef") || t3_2.includes("gross'")) pts += 1;
    const t3_3 = (answers.t3_3 || '').trim().toLowerCase();
    if (t3_3.includes("theos")) pts += 1;
    const t3_4 = (answers.t3_4 || '').trim().toLowerCase();
    if (t3_4.includes("franz'") || t3_4.includes("franz bruder")) pts += 1;
    const t3_5 = (answers.t3_5 || '').trim().toLowerCase();
    if (t3_5.includes("max'") || t3_5.includes("max buch")) pts += 1;

    // Teil 4 (6 points / 6 = 1 per item)
    if (answers.t4_1 === 'B') pts += 1;
    if (answers.t4_2 === 'A') pts += 1;
    if (answers.t4_3 === 'F') pts += 1;
    if (answers.t4_4 === 'D') pts += 1;
    if (answers.t4_5 === 'G') pts += 1;
    if (answers.t4_6 === 'E') pts += 1;

    // Teil 5 (6 points = 1 per item)
    const checkT5 = (val: string, h: string, p: string) => {
      const v = (val || '').trim().toLowerCase();
      if (v.includes(h) && v.includes(p)) return 1;
      if (v.includes(p)) return 0.5;
      return 0;
    };
    pts += checkT5(answers.t5_1, 'habe', 'eingekauft');
    pts += checkT5(answers.t5_2, 'habe', 'eingeladen');
    pts += checkT5(answers.t5_3, 'sind', 'zurückgekommen');
    pts += checkT5(answers.t5_4, 'habe', 'telefoniert');
    pts += checkT5(answers.t5_5, 'haben', 'studiert');
    pts += checkT5(answers.t5_6, 'hat', 'beendet');

    // Teil 6 (8 points = 2 per item)
    const checkT6 = (val: string, req: string[]) => {
      const v = (val || '').trim().toLowerCase();
      const hits = req.filter(k => v.includes(k)).length;
      if (hits === req.length) return 2;
      if (hits > 0) return 1;
      return 0;
    };
    pts += checkT6(answers.t6_1, ['weil', 'gäste', 'kommen']);
    pts += checkT6(answers.t6_2, ['weil', 'vater', 'krank', 'ist']);
    pts += checkT6(answers.t6_3, ['weil', 'gelernt', 'hat']);
    pts += checkT6(answers.t6_4, ['weil', 'hund', 'mitbringen', 'will']);

    setScoreData({ total: Math.round(pts * 10) / 10, max: 30, passed: pts >= 18 });
    setShowResult(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      
      {showResult && (
        <div className={`p-8 rounded-2xl border-4 text-center ${scoreData.passed ? 'bg-emerald-100 border-emerald-500' : 'bg-rose-100 border-rose-500'}`}>
          <h2 className={`text-4xl font-black mb-2 ${scoreData.passed ? 'text-emerald-700' : 'text-rose-700'}`}>
            {scoreData.passed ? '🎉 BESTANDEN!' : '❌ NICHT BESTANDEN'}
          </h2>
          <p className="text-xl font-bold text-slate-700">Skor Anda: <span className="text-3xl font-black">{scoreData.total}</span> / 30</p>
          <p className="text-sm mt-2 text-slate-500">(Batas lulus: 18 Poin / 60%)</p>
          <button onClick={() => { setShowResult(false); setAnswers({}); }} className="mt-6 font-bold bg-white text-slate-800 px-6 py-2 rounded-xl shadow border-2">Coba Lagi</button>
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

      <div className="pt-8 pb-12">
        <button 
          onClick={check}
          className="w-full py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 border-b-4 border-indigo-900 text-white font-black text-2xl transition-all active:border-b-0 active:translate-y-1 shadow-xl"
        >
          📝 Kumpulkan & Hitung Skor
        </button>
      </div>
    </div>
  );
}
