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

const horenFiles = findFiles(dashboardDir, /HorenInteraktiv(?:[2-9]|1[0-2])\.tsx$/);

horenFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');

  // Remove currentExercise from the top
  content = content.replace(/const \[activeTab, setActiveTab\] = useState\(0\);\n  const currentExercise = exercises\[activeTab\];/g, 'const [activeTab, setActiveTab] = useState(0);');

  // Add currentExercise back before handleCheck
  content = content.replace(/  const handleCheck/g, '  const currentExercise = exercises[activeTab];\n\n  const handleCheck');

  // Fix useEffect dependency
  content = content.replace(/\[currentExercise\]/g, '[activeTab]');

  fs.writeFileSync(file, content);
  console.log('Fixed HorenInteraktiv scoping:', file);
});

const lesenFiles = findFiles(dashboardDir, /LesenInteraktiv(?:[2-9]|1[0-2])\.tsx$/);

lesenFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');

  content = content.replace(/const \[activeTab, setActiveTab\] = useState\(0\);\n  const currentStory = typeof stories !== 'undefined' \? stories\[activeTab\] : exercises\[activeTab\];/g, 'const [activeTab, setActiveTab] = useState(0);');

  content = content.replace(/  const handleCheck/g, "  const currentStory = typeof stories !== 'undefined' ? stories[activeTab] : exercises[activeTab];\n\n  const handleCheck");

  content = content.replace(/\[currentStory\]/g, '[activeTab]');

  fs.writeFileSync(file, content);
  console.log('Fixed LesenInteraktiv scoping:', file);
});
