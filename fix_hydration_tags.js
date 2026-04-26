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

  // Fix the mismatched </p> to </div>
  content = content.replace(/<\/p>\s*<\/div>\s*<textarea/g, '</div>\n          </div>\n\n          <textarea');

  fs.writeFileSync(file, content);
  console.log('Fixed mismatched </p> in:', file);
});
