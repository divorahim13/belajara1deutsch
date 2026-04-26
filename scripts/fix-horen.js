const fs = require('fs');
const path = require('path');

const files = [
  'app/dashboard/HorenInteraktiv1.tsx',
  'app/dashboard/kapitel-2/HorenInteraktiv2.tsx',
  'app/dashboard/HorenInteraktiv3.tsx',
  'app/dashboard/HorenInteraktiv4.tsx',
  'app/dashboard/HorenInteraktiv5.tsx',
  'app/dashboard/HorenInteraktiv6.tsx'
];

files.forEach(file => {
  const fullPath = path.join(__dirname, '..', file);
  if (!fs.existsSync(fullPath)) {
    console.log(`Not found: ${fullPath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');

  // Look for `const exercises: Exercise[] = [`
  // We want to replace it with `const exercises: Exercise[] = React.useMemo(() => [`
  // And we need to find the matching `];` and replace it with `], []);`

  if (content.includes('const exercises: Exercise[] = [')) {
    if (!content.includes('React.useMemo')) {
      content = content.replace('const exercises: Exercise[] = [', 'const exercises: Exercise[] = React.useMemo(() => [');
      
      // To replace the closing array bracket, we look for `  ];\n\n  const currentExercise`
      // which is typically right after the exercises array.
      content = content.replace('  ];\n\n  const currentExercise', '  ], []);\n\n  const currentExercise');
      content = content.replace('  ];\n  const currentExercise', '  ], []);\n  const currentExercise'); // fallback

      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Patched useMemo in ${file}`);
    } else {
      console.log(`Already patched ${file}`);
    }
  } else {
    console.log(`Could not find exercises array in ${file}`);
  }
});
