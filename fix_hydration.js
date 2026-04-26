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

const uebungFiles = findFiles(dashboardDir, /UebungInteraktiv(?:[1-9]|1[0-2])\.tsx$/);

uebungFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');

  // Change <p> to <div> for the Soal container
  content = content.replace(/<p className="text-slate-600 italic border-l-4 border-sky-400 pl-3">/g, '<div className="text-slate-600 italic border-l-4 border-sky-400 pl-3">');
  
  // Need to be careful with replacing the closing </p>. We can just replace the specific block.
  // The easiest way is to use regex targeting the specific container contents.
  // Actually, since I did this replacement exactly, I can just find matching blocks.

  // Let's just use a more targeted replacement:
  const targetRegex = /<h4 className="font-bold text-slate-800 mb-2">Soal:<\/h4>\s*<p className="text-slate-600 italic border-l-4 border-sky-400 pl-3">([\s\S]*?)<\/p>/g;
  
  content = content.replace(targetRegex, '<h4 className="font-bold text-slate-800 mb-2">Soal:</h4>\n            <div className="text-slate-600 italic border-l-4 border-sky-400 pl-3">$1</div>');

  fs.writeFileSync(file, content);
  console.log('Fixed Uebung p tag nesting in:', file);
});
