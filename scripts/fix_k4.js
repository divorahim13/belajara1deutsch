const fs = require('fs');
const path = 'app/dashboard/kapitel-4/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Rename Component
content = content.replace(/KapitelDreiPage/g, 'KapitelVierPage');

// 2. Remove komparativZwei data
content = content.replace(/const komparativZwei:[\s\S]*?\];/g, '');

// 3. Remove KomparativGame component
content = content.replace(/function KomparativGame\(\) \{[\s\S]*?\/\/ ============================================================/g, '// ============================================================');

// 4. Fix steps array
content = content.replace(/\{ id: 'komparativ',[\s\S]*?\},/g, '');
content = content.replace(/\{ id: 'wiederholung',[\s\S]*?\},/g, '');
content = content.replace(/Kapiteltest 3/g, 'Kapiteltest 4');

// 5. Update activeTab initial state and types
content = content.replace(/const \[activeTab, setActiveTab\] = useState<'wortschatz' \| 'grammatik' \| 'komparativ' \| 'lesen' \| 'horen' \| 'uebung' \| 'wiederholung' \| 'strategie' \| 'game' \| 'test'>\('wortschatz'\);/, `const [activeTab, setActiveTab] = useState<'wortschatz' | 'grammatik' | 'lesen' | 'horen' | 'uebung' | 'strategie' | 'game' | 'test'>('wortschatz');`);

// 6. Update activeGameMode type
content = content.replace(/const \[activeGameMode, setActiveGameMode\] = useState<'wortschatz' \| 'komparativ' \| null>\(null\);/, `const [activeGameMode, setActiveGameMode] = useState<'wortschatz' | null>(null);`);

// 7. Remove komparativ pagination logic
content = content.replace(/const \[komparativPage[\s\S]*?currentKomparativItems = komparativZwei[\s\S]*?\* komparativItemsPerPage\);/g, '');

// 8. Fix ProgressTracker
content = content.replace(/kapitelId="kapitel3"/g, 'kapitelId="kapitel4"');
content = content.replace(/totalSteps={10}/g, 'totalSteps={8}');

// 9. Fix header texts
content = content.replace(/Kapitel 3/g, 'Kapitel 4');
content = content.replace(/Belajar tentang perangkat digital, memberikan opini di media sosial, dan membahas film. Penguasaan Komparativ, Superlativ, dan penggunaan Nebensatz dengan "dass"./g, 'Belajar berbicara tentang perasaan, mengucapkan selamat, berterima kasih, mengungkapkan kegembiraan atau penyesalan, berbicara tentang acara, serta memahami dan menulis blog.');

// 10. Fix Lernplan
content = content.replace(/<strong className="text-white">Hari 1 \(Pagi\):<\/strong> Flashcard Wortschatz Media & Perangkat · &nbsp;/g, '<strong className="text-white">Hari 1 (Pagi):</strong> Flashcard Wortschatz Gefühle & Ereignisse · &nbsp;');
content = content.replace(/<strong className="text-white">Hari 1 \(Sore\):<\/strong> Grammatik Komparativ & Superlativ · \{' '\}/g, '<strong className="text-white">Hari 1 (Sore):</strong> Grammatik Nebensatz mit "wenn" & Reflexive Verben · {\' \'}');
content = content.replace(/<strong className="text-white">Hari 2 \(Pagi\):<\/strong> Menulis opini film dengan "dass" · \{' '\}/g, '<strong className="text-white">Hari 2 (Pagi):</strong> Menulis email/kartu acara & Blogs · {\' \'}');
content = content.replace(/<strong className="text-white">Hari 2 \(Sore\):<\/strong> Latihan Grammatik Game & Review./g, '<strong className="text-white">Hari 2 (Sore):</strong> Review & Kapiteltest 4.');

// 11. Remove Wiederholung tab block
content = content.replace(/\{\/\* ── WIEDERHOLUNG TAB ── \*\/\}[\s\S]*?\{\/\* ── KOMPARATIV TAB ── \*\/\}/g, '{/* ── GRAMMATIK INTERAKTIV ── */}');

// 12. Remove Komparativ tab block
content = content.replace(/\{activeTab === 'komparativ' && \([\s\S]*?\{\/\* INTERAKTIVE GRAMMATIK ÜBUNG \*\/\}/g, '');
// Now the trailing part of the komparativ tab is `</div>\n        )}\n\n        {/* ── GAME TAB ── */}`
// Wait, replacing up to `INTERAKTIVE GRAMMATIK ÜBUNG` will leave the GrammatikInteraktiv4 component.
// I should extract the GrammatikInteraktiv4 and put it inside the grammatik tab.

// First, find the grammatik tab block
content = content.replace(/\{\/\* ── GRAMMATIK TAB ── \*\/\}[\s\S]*?\{\/\* ── STRATEGIE TAB ── \*\/\}/, function(match) {
    // Add GrammatikInteraktiv4 at the bottom of the grammatik tab
    return match.replace(/<\/div>\n        \)\}/, `    <div className="mt-12">\n              <GrammatikInteraktiv4 />\n            </div>\n          </div>\n        )}`);
});

// Now fully remove the leftover komparativ block (including the GrammatikInteraktiv4 we just copied)
content = content.replace(/\{\/\* ── GRAMMATIK INTERAKTIV ── \*\/\}[\s\S]*?\{\/\* ── GAME TAB ── \*\/\}/, '{/* ── GAME TAB ── */}');


// 13. Fix Game tab UI
// Remove the komparativ button
content = content.replace(/\{\/\* Mode Grammatik \*\/\}(.|\n)*?<\/button>/, '');
// Fix grid cols
content = content.replace(/<div className="grid grid-cols-1 md:grid-cols-2 gap-6">/, '<div className="grid grid-cols-1 md:grid-cols-1 max-w-md mx-auto gap-6">');

// 14. Add unique keys
// "kapitel-4" is used as the unique prefix. The wortschatz and grammatik and goetheTasks are local to the file, so they don't clash with global state unless they use the same localStorage keys.
// The WortschatzGame uses internal state, no localStorage.
// Let's ensure no syntax errors.

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed kapitel 4 page');
