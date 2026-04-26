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

  // Fix item.q
  content = content.replace(/item\.q \|\|/g, "(item as any).q ||");

  fs.writeFileSync(file, content);
  console.log('Fixed item.q in:', file);
});
