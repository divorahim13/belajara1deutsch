import fs from 'fs';
import path from 'path';

function walkDir(dir: string, callback: (filePath: string) => void) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        walkDir(fullPath, callback);
      }
    } else {
      if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
        callback(fullPath);
      }
    }
  }
}

const replacements = [
  // Slate/Gray 400 and 500 to darker shades for readability on light bgs
  { regex: /text-slate-400/g, replacement: 'text-slate-600' },
  { regex: /text-slate-500/g, replacement: 'text-slate-700' },
  { regex: /text-gray-400/g, replacement: 'text-gray-600' },
  { regex: /text-gray-500/g, replacement: 'text-gray-700' },
  
  // Indigo text
  { regex: /text-indigo-400/g, replacement: 'text-indigo-600' },
  { regex: /text-indigo-500/g, replacement: 'text-indigo-700' },
  
  // Disabled states opacity
  { regex: /disabled:opacity-50/g, replacement: 'disabled:opacity-75 disabled:cursor-not-allowed' },
  
  // Background contrasts
  { regex: /bg-slate-50 text-slate-500/g, replacement: 'bg-slate-100 text-slate-700' },
  { regex: /bg-indigo-50 text-indigo-600/g, replacement: 'bg-indigo-100 text-indigo-800' },
  { regex: /bg-emerald-50 text-emerald-600/g, replacement: 'bg-emerald-100 text-emerald-800' },
  { regex: /bg-rose-50 text-rose-600/g, replacement: 'bg-rose-100 text-rose-800' },
  
  // Specific border improvements
  { regex: /border-slate-200/g, replacement: 'border-slate-300' },
  { regex: /border-gray-200/g, replacement: 'border-gray-300' },
];

let changedFiles = 0;

walkDir(path.join(process.cwd(), 'app'), (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  replacements.forEach(r => {
    content = content.replace(r.regex, r.replacement);
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    changedFiles++;
    console.log(`Updated contrast in: ${filePath}`);
  }
});

console.log(`Contrast improvements applied to ${changedFiles} files.`);
