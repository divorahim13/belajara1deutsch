const fs = require('fs');

const k4Path = 'app/dashboard/kapitel-4/page.tsx';
let k4Content = fs.readFileSync(k4Path, 'utf8');

// 1. Extract Partizip II items from wortschatz array
const regex = /\{\s*de:\s*'([^']+) ➔ ([^']+)',\s*plural:\s*'[^']*',\s*id:\s*'([^']+)',\s*beispiel:\s*'[^']*',\s*kategorie:\s*'Partizip II'\s*\},\n?/g;

const partizipItems = [];
k4Content = k4Content.replace(regex, (match, infinitiv, partizip, id) => {
    let hilfsverb = 'haben';
    const seinVerbs = ['sein', 'kommen', 'fahren', 'laufen', 'mitlaufen', 'werden', 'bleiben', 'fallen', 'zurückkommen', 'abfahren', 'wegfahren'];
    if (seinVerbs.includes(infinitiv)) {
        hilfsverb = 'sein';
    }
    partizipItems.push({ infinitiv, partizip, id, hilfsverb });
    return ''; // Remove from wortschatz
});

if (partizipItems.length === 0) {
    console.log("No partizip items found to extract. Perhaps already extracted.");
} else {
    // 2. Create the partizipZwei array
    let partizipZweiStr = 'const partizipZwei: { infinitiv: string; partizip: string; hilfsverb: \'haben\' | \'sein\'; id: string }[] = [\n';
    partizipItems.forEach(item => {
        partizipZweiStr += `  { infinitiv: '${item.infinitiv}', partizip: '${item.partizip}', hilfsverb: '${item.hilfsverb}', id: '${item.id}' },\n`;
    });
    partizipZweiStr += '];\n';

    // Insert it after wortschatz array
    k4Content = k4Content.replace(/(const wortschatz:.*?\n];\n)/s, `$1\n${partizipZweiStr}\n`);

    // 3. Add PartizipZweiGame Component
    const partizipZweiGameComponent = `
function PartizipZweiGame({ customList }: { customList?: typeof partizipZwei }) {
  const [question, setQuestion] = useState<(typeof partizipZwei)[0] | null>(null);
  const [hilfsverbInput, setHilfsverbInput] = useState<'haben' | 'sein' | ''>('');
  const [partizipInput, setPartizipInput] = useState('');
  const [mistakes, setMistakes] = useState<(typeof partizipZwei)[]>([]);
  const [score, setScore] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const newQuestion = useCallback(() => {
    const source = customList || partizipZwei;
    const q = source[Math.floor(Math.random() * source.length)];
    setQuestion(q);
    setHilfsverbInput('');
    setPartizipInput('');
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [customList]);

  useEffect(() => {
    newQuestion();
  }, [newQuestion]);

  const handleKeyboardClick = (char: string) => {
    setPartizipInput(prev => prev + char);
    inputRef.current?.focus();
  };

  const checkAnswer = () => {
    if (!question) return;
    if (!hilfsverbInput || !partizipInput.trim()) return;

    const isHCorrect = hilfsverbInput === question.hilfsverb;
    const isPCorrect = partizipInput.trim().toLowerCase() === question.partizip.toLowerCase();

    if (isHCorrect && isPCorrect) {
      setScore(s => s + 10);
      newQuestion();
    } else {
      if (!mistakes.find(m => m.infinitiv === question.infinitiv)) {
        setMistakes(prev => [...prev, question]);
      }
      alert(\`Salah! Jawaban yang benar: \${question.hilfsverb} \${question.partizip}\`);
      newQuestion();
    }
  };

  if (!question) return null;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-black text-orange-100 italic">⏳ Partizip II Recall</h3>
        <span className="text-xl font-bold text-orange-200">Skor: {score}</span>
      </div>

      <div className="clay-card p-8 bg-white border-4 border-slate-900 text-center relative overflow-hidden">
        <p className="text-xs font-bold text-orange-300 uppercase tracking-widest mb-2">Tulis Partizip II dari:</p>
        <h4 className="text-4xl font-black text-slate-900 mb-2">{question.infinitiv}</h4>
        <p className="text-slate-500 font-bold">({question.id})</p>

        <div className="mt-8 space-y-4">
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => setHilfsverbInput('haben')}
              className={\`px-6 py-3 rounded-xl font-bold border-2 transition-all \${hilfsverbInput === 'haben' ? 'bg-orange-500 text-white border-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200'}\`}
            >haben</button>
            <button 
              onClick={() => setHilfsverbInput('sein')}
              className={\`px-6 py-3 rounded-xl font-bold border-2 transition-all \${hilfsverbInput === 'sein' ? 'bg-orange-500 text-white border-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200'}\`}
            >sein</button>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={partizipInput}
            onChange={(e) => setPartizipInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
            placeholder="Ketik Partizip II..."
            className="w-full text-center text-3xl font-black p-4 bg-slate-50 border-b-4 border-slate-300 focus:outline-none focus:border-orange-500 focus:bg-white rounded-t-xl"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />

          <div className="flex justify-center gap-2 mt-4">
            {['ä', 'ö', 'ü', 'ß'].map(char => (
              <button 
                key={char} 
                onClick={() => handleKeyboardClick(char)}
                className="w-12 h-12 bg-slate-800 text-white rounded-lg font-bold text-xl hover:bg-slate-700 active:translate-y-1 transition-all"
              >
                {char}
              </button>
            ))}
          </div>

          <button
            onClick={checkAnswer}
            disabled={!hilfsverbInput || !partizipInput}
            className="w-full py-4 mt-6 bg-slate-900 text-white font-black text-xl rounded-2xl hover:bg-slate-800 active:translate-y-1 disabled:opacity-50 transition-all border-b-4 border-slate-950 active:border-b-0"
          >
            Cek Jawaban
          </button>
        </div>
      </div>

      {mistakes.length > 0 && (
        <div className="mt-8 clay-card p-6 bg-rose-50 border-rose-200">
          <h4 className="text-rose-900 font-bold mb-4">Perlu Diulang ({mistakes.length}):</h4>
          <div className="flex flex-wrap gap-2">
            {mistakes.map(m => (
              <span key={m.infinitiv} className="bg-white border border-rose-200 text-rose-700 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                {m.infinitiv} ➔ {m.hilfsverb} {m.partizip}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
`;

    // Insert the component right before `export default function KapitelVierPage()`
    k4Content = k4Content.replace('export default function KapitelVierPage() {', `${partizipZweiGameComponent}\nexport default function KapitelVierPage() {`);

    // 4. Modify steps array
    // find: { id: 'wortschatz',   label: 'Wortschatz',    icon: '📝', phase: 1 as const, count: wortschatz.length },
    // add partizip step after it.
    k4Content = k4Content.replace(/(\{ id: 'wortschatz',.*?\},\n)/, `$1    { id: 'partizip',   label: 'Partizip II',   icon: '⏳', phase: 1 as const, count: partizipZwei.length },\n`);

    // 5. Modify activeTab types
    // const [activeTab, setActiveTab] = useState<'wortschatz' | 'grammatik' | 'lesen' | 'horen' | 'uebung' | 'strategie' | 'game' | 'test'>('wortschatz');
    k4Content = k4Content.replace(/useState<'wortschatz' \| 'grammatik'/, `useState<'wortschatz' | 'partizip' | 'grammatik'`);

    // 6. Add pagination states
    k4Content = k4Content.replace(/const \[activeTab, setActiveTab\] =.*?\n/, (match) => {
        return match + `
  // Partizip Pagination
  const [partizipPage, setPartizipPage] = useState<number>(1);
  const partizipItemsPerPage = 8;
  const totalPartizipPages = Math.ceil(partizipZwei.length / partizipItemsPerPage);
  const currentPartizipItems = partizipZwei.slice((partizipPage - 1) * partizipItemsPerPage, partizipPage * partizipItemsPerPage);
`;
    });

    // 7. Add partizip GameMode state type
    k4Content = k4Content.replace(/const \[activeGameMode, setActiveGameMode\] = useState<'wortschatz' \| null>\(null\);/, `const [activeGameMode, setActiveGameMode] = useState<'wortschatz' | 'partizip' | null>(null);`);

    // 8. Add Partizip Tab Render Block
    const partizipTabRender = `
        {/* ── PARTIZIP II TAB ── */}
        {activeTab === 'partizip' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Verbformen: Partizip II</h2>
              <p className="text-slate-600 text-sm mt-1">Bentuk Partizip II (Perfekt) dari kata kerja di Kapitel 4.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentPartizipItems.map((item, i) => (
                <div key={i} className="clay-card bg-orange-50 border-orange-200 p-6 flex flex-col items-center justify-center text-center relative group overflow-hidden">
                   <div className="absolute top-0 right-0 w-16 h-16 bg-orange-200 rounded-bl-full opacity-50 -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500" />
                   <span className="text-xs font-black text-orange-400 uppercase tracking-widest mb-2">{item.infinitiv}</span>
                   <p className="text-xl font-black text-slate-900">{item.partizip}</p>
                   <p className="text-sm font-bold text-slate-500 mt-2">({item.hilfsverb})</p>
                   <div className="mt-4 pt-3 border-t-2 border-orange-100 w-full">
                     <p className="text-orange-800 font-bold text-sm">{item.id}</p>
                   </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPartizipPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button 
                  onClick={() => setPartizipPage(p => Math.max(1, p - 1))}
                  disabled={partizipPage === 1}
                  className="p-3 rounded-xl bg-white border-2 border-slate-200 font-bold text-slate-600 hover:border-slate-400 hover:text-slate-900 disabled:opacity-50 transition-all"
                >
                  ← Prev
                </button>
                <span className="font-black text-slate-400">
                  Halaman {partizipPage} dari {totalPartizipPages}
                </span>
                <button 
                  onClick={() => setPartizipPage(p => Math.min(totalPartizipPages, p + 1))}
                  disabled={partizipPage === totalPartizipPages}
                  className="p-3 rounded-xl bg-white border-2 border-slate-200 font-bold text-slate-600 hover:border-slate-400 hover:text-slate-900 disabled:opacity-50 transition-all"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        )}
`;

    // Insert before {/* ── GRAMMATIK TAB ── */}
    k4Content = k4Content.replace(/\{\/\* ── GRAMMATIK TAB ── \*\/\}/, partizipTabRender + '\n        {/* ── GRAMMATIK TAB ── */}');

    // 9. Update Game tab to add PartizipZweiGame
    const partizipGameButton = `
                  {/* Mode Partizip */}
                  <button 
                    onClick={() => setActiveGameMode('partizip')}
                    className="clay-card p-8 bg-orange-50 border-orange-200 border-b-8 text-left hover:translate-y-1 hover:border-b-4 transition-all group cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm border border-orange-100 group-hover:scale-110 transition-transform">⏳</div>
                    <h3 className="text-2xl font-black text-orange-950">Partizip II Recall</h3>
                    <p className="text-orange-900 mt-2 text-sm font-bold leading-relaxed">Tebak bentuk Partizip II dan Auxiliar verb (haben/sein) yang benar.</p>
                  </button>
`;

    // Insert game button after Wortschatz Recall button
    k4Content = k4Content.replace(/(<h3 className="text-2xl font-black text-indigo-950">Wortschatz Recall<\/h3>.*?(<\/button>\s*)+)/s, `$1${partizipGameButton}`);
    // Change game grid back to 2 columns if it was 1
    k4Content = k4Content.replace(/grid-cols-1 md:grid-cols-1 max-w-md mx-auto/, 'grid-cols-1 md:grid-cols-2');

    // Update the game tab rendering logic
    k4Content = k4Content.replace(/\{activeGameMode === 'wortschatz' \? \([\s\S]*?<\/WortschatzGame>[\s\S]*?<\/div>\s*\) : \(/, `
            {activeGameMode === 'wortschatz' ? (
              <div>
                <button onClick={() => setActiveGameMode(null)} className="mb-6 flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors">
                  ← Kembali ke Menu
                </button>
                <WortschatzGame />
              </div>
            ) : activeGameMode === 'partizip' ? (
              <div className="bg-orange-600 rounded-3xl p-8 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-3xl opacity-50 -mr-20 -mt-20" />
                <button onClick={() => setActiveGameMode(null)} className="mb-6 flex items-center gap-2 text-white/80 font-bold hover:text-white transition-colors relative z-10">
                  ← Kembali ke Menu
                </button>
                <div className="relative z-10">
                  <PartizipZweiGame />
                </div>
              </div>
            ) : (`);

    // Save
    fs.writeFileSync(k4Path, k4Content, 'utf8');
    console.log("Successfully extracted Partizip II into its own tab and game!");
}
