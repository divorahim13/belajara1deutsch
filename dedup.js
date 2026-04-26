const fs = require('fs');
const path = require('path');

const files = [
  'app/dashboard/page.tsx',
  'app/dashboard/kapitel-2/page.tsx',
  'app/dashboard/kapitel-3/page.tsx',
  'app/dashboard/kapitel-4/page.tsx',
  'app/dashboard/kapitel-5/page.tsx',
  'app/dashboard/kapitel-6/page.tsx',
  'app/dashboard/kapitel-7/page.tsx',
  'app/dashboard/kapitel-8/page.tsx',
  'app/dashboard/kapitel-9/page.tsx',
  'app/dashboard/kapitel-10/page.tsx',
  'app/dashboard/kapitel-11/page.tsx',
  'app/dashboard/kapitel-12/page.tsx'
];

const seenWords = new Set();
const seenPartizip = new Set();
const deRegex = /\{\s*de:\s*['"]([^'"]+)['"]/;
const infRegex = /\{\s*infinitiv:\s*['"]([^'"]+)['"]/;

console.log("Starting Deduplication...");

let totalRemoved = 0;
let totalPartizipRemoved = 0;

for (const relPath of files) {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${fullPath}`);
    continue;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');
  const newLines = [];
  let removedInFile = 0;
  let removedPartizipInFile = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const matchDe = line.match(deRegex);
    const matchInf = line.match(infRegex);
    
    if (matchDe) {
      const word = matchDe[1].trim().toLowerCase();
      
      if (seenWords.has(word)) {
        console.log(`[${relPath}] Removing duplicate Wortschatz: ${word}`);
        removedInFile++;
        totalRemoved++;
        continue;
      } else {
        seenWords.add(word);
        newLines.push(line);
      }
    } else if (matchInf) {
      const verb = matchInf[1].trim().toLowerCase();
      
      if (seenPartizip.has(verb)) {
        console.log(`[${relPath}] Removing duplicate Partizip: ${verb}`);
        removedPartizipInFile++;
        totalPartizipRemoved++;
        continue;
      } else {
        seenPartizip.add(verb);
        newLines.push(line);
      }
    } else {
      newLines.push(line);
    }
  }

  if (removedInFile > 0 || removedPartizipInFile > 0) {
    fs.writeFileSync(fullPath, newLines.join('\n'), 'utf8');
    console.log(`Updated ${relPath} - removed ${removedInFile} Wortschatz, ${removedPartizipInFile} Partizip duplicates.`);
  } else {
    console.log(`${relPath} - no duplicates found.`);
  }
}

console.log(`\nDeduplication complete! Total Wortschatz duplicates removed: ${totalRemoved}`);
console.log(`Total Partizip II duplicates removed: ${totalPartizipRemoved}`);
