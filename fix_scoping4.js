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

const lesenFiles = findFiles(dashboardDir, /LesenInteraktiv(?:[2-9]|1[0-2])\.tsx$/);

lesenFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');

  let arrayName = 'stories';
  if (!content.includes('const stories =') && !content.includes('const stories:')) {
    arrayName = 'exercises';
  }

  // Also replace `currentStory` declaration again just to be safe
  content = content.replace(/const currentStory = typeof stories !== 'undefined' \? stories\[activeTab\] : exercises\[activeTab\];/g, `const currentStory = ${arrayName}[activeTab];`);

  // Replace the map loop
  content = content.replace(/\(typeof stories !== 'undefined' \? stories : exercises\)/g, arrayName);

  fs.writeFileSync(file, content);
  console.log('Fixed LesenInteraktiv array reference 2:', file);
});
