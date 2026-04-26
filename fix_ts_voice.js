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

const allInteraktivs = findFiles(dashboardDir, /HorenInteraktiv(?:[2-9]|1[0-2])\.tsx$/);

allInteraktivs.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');

  // Fix line.voice
  content = content.replace(/line\.voice/g, '(line as any).voice');

  fs.writeFileSync(file, content);
  console.log('Fixed TS voice in:', file);
});
