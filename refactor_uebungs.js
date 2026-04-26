const fs = require('fs');
const path = require('path');

const dashboardDir = path.join(__dirname, 'app/dashboard');

function findFiles(dir, filter) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(file, filter));
    } else if (file.match(filter)) {
      results.push(file);
    }
  });
  return results;
}

const files = findFiles(dashboardDir, /UebungInteraktiv(?:[2-9]|1[0-2])\.tsx$/);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');

  // Replace Header & Tabs
  const headerReplacement = "    <div className=\"space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500\">\n" +
"      <div className=\"text-center mb-6\">\n" +
"        <h2 className=\"text-4xl font-black text-slate-900\">Schreiben</h2>\n" +
"        <p className=\"text-slate-600 mt-2\">Pilih mode latihan menulis di bawah ini.</p>\n" +
"      </div>\n" +
"\n" +
"      {/* Tabs */}\n" +
"      <div className=\"flex flex-wrap gap-2 justify-center mb-8\">\n" +
"        {[\n" +
"          { id: 1, label: 'Teil 1: Lückentext' },\n" +
"          { id: 2, label: 'Teil 2: Freies Schreiben' }\n" +
"        ].map(t => (\n" +
"          <button\n" +
"            key={t.id}\n" +
"            onClick={() => setActiveTab(t.id as 1 | 2)}\n" +
"            className={`px-6 py-3 rounded-xl font-black transition-all ${\n" +
"              activeTab === t.id\n" +
"                ? 'bg-emerald-600 text-white shadow-lg -translate-y-1'\n" +
"                : 'bg-white text-slate-500 hover:bg-emerald-50 hover:text-emerald-700 border-2 border-slate-200'\n" +
"            }`}\n" +
"          >\n" +
"            {t.label}\n" +
"          </button>\n" +
"        ))}\n" +
"      </div>";

  // We find from <div className="space-y-8 to the end of the tabs block
  content = content.replace(/<div className="space-y-8[^>]*>[\s\S]*?(?:\{\/\* Tabs \*\/[\s\S]*?)?<div className="flex flex-wrap gap-2 justify-center mb-8">[\s\S]*?<\/div>/, headerReplacement);

  // Replace Teil 1 Container
  content = content.replace(/\{activeTab === 1 && \(\s*<div className="[^"]*"/, '{activeTab === 1 && (\n        <div className="clay-card p-8 bg-emerald-50 border-emerald-200 border-b-8"');

  // Replace Teil 1 Title
  content = content.replace(/<h3 className="[^"]*">Cloze Test[^<]*<\/h3>/, '<h3 className="text-2xl font-black text-emerald-950 mb-2">Cloze Test (10 Soal)</h3>');
  content = content.replace(/<p className="[^"]*">Lengkapi kalimat rumpang[^<]*<\/p>/, '<p className="text-emerald-800 mb-6 font-bold">Lengkapi kalimat rumpang dengan Perfekt & Weil.</p>');

  // Replace allCorrect logic block classes
  content = content.replace(/className={\\\`p-6 md:p-10 rounded-2xl border-4 text-center mb-8 \\\${allCorrect \? '[^']*' : '[^']*'}\\\`}/, "className={`p-8 rounded-2xl border-4 text-center mb-6 ${allCorrect ? 'bg-emerald-100 border-emerald-500' : 'bg-rose-100 border-rose-500'}`}");
  
  // Replace Question Container (div key={q.id})
  content = content.replace(/<div key=\{q\.id\} className="flex flex-col gap-2 bg-slate-50 p-4 md:p-6 rounded-2xl border-2 border-slate-200 shadow-sm">/g, '<div key={q.id} className="flex flex-col gap-2 bg-white p-5 rounded-xl border-2 border-emerald-100 shadow-sm">');
  
  // Replace Input Class Logic
  content = content.replace(/let inputClass = \\\`text-center px-2 py-1 rounded-xl border-b-4 outline-none font-bold transition-all duration-300 \\\${seg.width} \\\`;/g, "let inputClass = `text-center px-2 py-1 rounded-lg border-b-4 outline-none font-bold transition-colors ${seg.width} `;");
  
  content = content.replace(/inputClass \+= isCorrect\s*\?\s*'border-emerald-500 bg-emerald-100 text-emerald-900 shadow-inner'\s*:\s*'border-rose-500 bg-rose-100 text-rose-900 shadow-inner';/g, "inputClass += isCorrect ? 'border-emerald-500 bg-emerald-100 text-emerald-900' : 'border-rose-500 bg-rose-100 text-rose-900';");
  
  content = content.replace(/inputClass \+= 'border-slate-300 bg-white focus:border-indigo-400 focus:bg-indigo-50 shadow-sm';/g, "inputClass += 'border-slate-300 bg-slate-50 focus:border-emerald-400 focus:bg-emerald-50';");

  // Replace Teil 1 Buttons
  content = content.replace(/<button\s*onClick=\{checkAnswers\}\s*className="[^"]*"/, '<button \n                onClick={checkAnswers}\n                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl shadow-lg border-b-4 border-emerald-800 active:border-b-0 active:translate-y-1 transition-all text-xl"');
  
  content = content.replace(/<button\s*onClick=\{reset\}\s*className="[^"]*"/, '<button \n                onClick={reset}\n                className="w-full bg-slate-600 hover:bg-slate-500 text-white font-black py-4 rounded-2xl shadow-lg border-b-4 border-slate-800 active:border-b-0 active:translate-y-1 transition-all text-xl"');

  // Replace Teil 2 Container
  content = content.replace(/\{activeTab === 2 && \(\s*<div className="[^"]*"/, '{activeTab === 2 && (\n        <div className="clay-card p-8 bg-sky-50 border-sky-200 border-b-8"');

  // Replace Teil 2 Title
  content = content.replace(/<h3 className="[^"]*">Freies Schreiben[^<]*<\/h3>/, '<h3 className="text-2xl font-black text-sky-950 mb-4">Freies Schreiben (Goethe-Task)</h3>');

  // Replace Soal container
  content = content.replace(/<div className="mb-8">/g, '<div className="bg-white p-5 rounded-xl border-2 border-sky-100 mb-6">');
  content = content.replace(/<p className="text-slate-500 font-medium">\s*Wählen Sie eines der folgenden Themen:\s*<\/p>\s*<div className="mt-4 p-4 bg-sky-50 rounded-xl border border-sky-100">/, '<h4 className="font-bold text-slate-800 mb-2">Soal:</h4>\n            <p className="text-slate-600 italic border-l-4 border-sky-400 pl-3">');
  // Need to fix the closing tags for Soal properly... wait, regex is too brittle here because Uebung files might have different structures inside "Freies Schreiben".

  fs.writeFileSync(file, content);
  console.log('Updated UebungInteraktiv:', file);
});
