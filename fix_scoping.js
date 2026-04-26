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

const files = findFiles(dashboardDir, /HorenInteraktiv(?:[2-9]|1[0-2])\.tsx$/);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');

  // Remove the one we injected before handleCheck
  content = content.replace(/const currentExercise = exercises\[activeTab\];\n\n  const handleCheck/g, '  const handleCheck');

  // Inject at the beginning of the component, right after state declarations (e.g. activeTab)
  // We can look for "const [activeTab, setActiveTab] = useState(0);"
  content = content.replace(/const \[activeTab, setActiveTab\] = useState\(0\);/, "const [activeTab, setActiveTab] = useState(0);\n  const currentExercise = exercises[activeTab];");

  fs.writeFileSync(file, content);
  console.log('Fixed HorenInteraktiv:', file);
});

// We must also do this for LesenInteraktiv where we injected currentStory!
const lesenFiles = findFiles(dashboardDir, /LesenInteraktiv(?:[2-9]|1[0-2])\.tsx$/);

lesenFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');

  content = content.replace(/const currentStory = typeof stories !== 'undefined' \? stories\[activeTab\] : exercises\[activeTab\];\n\n  const handleCheck/g, '  const handleCheck');

  content = content.replace(/const \[activeTab, setActiveTab\] = useState\(0\);/, "const [activeTab, setActiveTab] = useState(0);\n  const currentStory = typeof stories !== 'undefined' ? stories[activeTab] : exercises[activeTab];");

  fs.writeFileSync(file, content);
  console.log('Fixed LesenInteraktiv:', file);
});
