const fs = require('fs');
let content = fs.readFileSync('app/dashboard/data/k5.ts', 'utf8');
content = content.replace(/category: '([^']+)',/g, (match, p1) => {
  return `category: '${p1}',\n    chapterId: 5,\n    skill: '${p1}',`;
});
fs.writeFileSync('app/dashboard/data/k5.ts', content);
console.log('Fixed k5.ts');
