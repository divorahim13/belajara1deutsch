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

  // Change <p> to <div> for the Soal container regardless of the border color
  content = content.replace(/<p className="text-slate-600 italic border-l-4 border-[a-z]+-400 pl-3">/g, '<div className="text-slate-600 italic border-l-4 border-sky-400 pl-3">');

  // We already changed the closing tag to </div> in the previous script.
  // But let's double check if there are any remaining </p> right before </div>
  content = content.replace(/<\/p>\s*<\/div>\s*<textarea/g, '</div>\n          </div>\n\n          <textarea');

  fs.writeFileSync(file, content);
  console.log('Fixed final Uebung p tag nesting in:', file);
});
