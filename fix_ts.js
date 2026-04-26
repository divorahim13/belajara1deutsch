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

const allInteraktivs = findFiles(dashboardDir, /(?:Horen|Lesen)Interaktiv(?:[2-9]|1[0-2])\.tsx$/);

allInteraktivs.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');

  // Fix qObj.correctAnswer
  content = content.replace(/qObj\.correctAnswer/g, '(qObj as any).correctAnswer');

  // Fix item.question
  content = content.replace(/item\.question\}/g, '(item as any).question}');

  fs.writeFileSync(file, content);
  console.log('Fixed TS in:', file);
});
