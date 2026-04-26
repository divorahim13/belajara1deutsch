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

const allGrammatik = findFiles(dashboardDir, /GrammatikInteraktiv(?:[1-9]|1[0-2])\.tsx$/);

allGrammatik.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');

  // Convert older wrappers (1, 2, 3, 4) to Neo-Brutalist standard container
  content = content.replace(/<div className="space-y-6 max-w-4xl mx-auto">/g, '<div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">');
  
  // Convert older cards (1, 2, 3, 4) to clay-card
  content = content.replace(/<div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-indigo-100">/g, '<div className="clay-card p-6 md:p-10 bg-white border-b-8 border-indigo-200">');

  // Convert older buttons to Neo-brutalist buttons
  content = content.replace(/className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-500 transition-colors"/g, 'className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl shadow-lg border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1 transition-all text-xl"');

  // For 5-12, update the clay-card if needed
  content = content.replace(/<div className="clay-card p-6 bg-white border-slate-200">/g, '<div className="clay-card p-6 md:p-8 bg-white border-slate-200 hover:border-indigo-300 transition-colors">');

  fs.writeFileSync(file, content);
  console.log('Fixed Grammatik styling in:', file);
});
