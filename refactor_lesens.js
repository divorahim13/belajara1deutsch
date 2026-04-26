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

const lesenTemplate = `  const currentStory = typeof stories !== 'undefined' ? stories[activeTab] : exercises[activeTab];

  const handleCheck = (qIndex: number, optIndex: number) => {
    setSelectedAnswers(prev => ({...prev, [qIndex]: optIndex}));
    const qObj = currentStory.questions[qIndex];
    const correct = typeof qObj.correct !== 'undefined' ? qObj.correct : qObj.correctAnswer;
    setIsCorrect(prev => ({...prev, [qIndex]: optIndex === correct}));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {(typeof stories !== 'undefined' ? stories : exercises).map((story, idx) => (
          <button
            key={story.id || idx}
            onClick={() => handleTabChange(idx)}
            className={\`px-6 py-3 rounded-2xl font-bold transition-all shadow-sm \${
              activeTab === idx 
                ? 'bg-amber-500 text-white shadow-amber-500/30 scale-105' 
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-amber-300 hover:text-amber-600'
            }\`}
          >
            {story.title}
          </button>
        ))}
      </div>

      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-900">{currentStory.title}</h2>
        <p className="text-slate-600 mt-2">{currentStory.desc}</p>
      </div>

      <div className="bg-white/5 p-6 rounded-2xl border border-amber-200 w-full mb-8 bg-amber-50 shadow-inner">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">Lesetext (Interaktif)</p>
          <span className="text-[10px] bg-amber-200 text-amber-800 px-2 py-1 rounded-md uppercase tracking-wider font-bold">Arahkan kursor ke kata</span>
        </div>
        {currentStory.content ? currentStory.content : (
          <p className="text-amber-900 font-medium leading-relaxed text-lg">
             {renderInteractiveText(currentStory.text)}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {currentStory.questions.map((item, qIndex) => (
          <div key={qIndex} className="clay-card p-8 bg-white border-slate-200">
            <h4 className="text-xl font-bold text-slate-800 mb-6">{item.q || item.question}</h4>
            <div className="space-y-4">
              {item.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleCheck(qIndex, index)}
                  className={\`w-full text-left p-4 rounded-xl border-2 font-bold transition-all \${
                    selectedAnswers[qIndex] === index
                      ? isCorrect[qIndex]
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                        : 'bg-rose-100 border-rose-500 text-rose-900'
                      : 'bg-slate-50 border-slate-300 text-slate-700 hover:border-amber-400 hover:bg-amber-50'
                  }\`}
                >
                  <span className="mr-3 text-lg">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>
            {typeof isCorrect[qIndex] === 'boolean' && (
              <div className={\`mt-6 p-4 rounded-xl font-bold \${isCorrect[qIndex] ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}\`}>
                {isCorrect[qIndex] ? '🎉 Richtig! Jawaban kamu benar.' : '❌ Falsch! Coba baca teksnya lagi.'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
`;

const files = findFiles(dashboardDir, /LesenInteraktiv(?:[2-9]|1[0-2])\.tsx$/);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  
  const returnRegex = /return\s*\(\s*<div[^>]*>[\s\S]*\}\s*$/;
  
  content = content.replace(/const currentStory\s*=[^;]+;/g, '');
  content = content.replace(/const handleCheck\s*=\s*\([^)]+\)\s*=>\s*{[^}]+};\n?/g, '');
  content = content.replace(/const handleCheck\s*=\s*\([^)]+\)\s*=>\s*{[\s\S]*?};\n?/g, '');
  
  content = content.replace(returnRegex, lesenTemplate);
  
  const renderTextRegex = /const renderInteractiveText = \([\s\S]*?return <span key=\{index\} className="mx-\[2px\]">\{word\} <\/span>;\s*}\);\s*};/g;
  
  // Use a simple string replace for the classNames of the interactive dictionary.
  // In the original, the styling might have been hover:opacity-100, we update it to activeWord logic.
  // Actually, wait, it's safer to just replace the inner span if it exists. Let's skip modifying renderInteractiveText for now and ONLY update the layout if they already have renderInteractiveText.
  // The user mainly complained about the "layout structure" and "tabs". The dictionary was fixed in previous iteration!
  
  fs.writeFileSync(file, content);
  console.log('Updated LesenInteraktiv:', file);
});
