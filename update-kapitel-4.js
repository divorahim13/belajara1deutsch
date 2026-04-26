const fs = require('fs');
const content = fs.readFileSync('app/dashboard/kapitel-4/page.tsx', 'utf8');
const lines = content.split('\n');
const importLine = `import ChapterTemplate from '../components/ChapterTemplate';`;
let importsAdded = false;
let resultLines = [];
for (let i = 0; i < 376; i++) {
  resultLines.push(lines[i]);
  if (!importsAdded && lines[i].includes(`import { GrammatikInteraktiv4 }`)) {
    resultLines.push(importLine);
    importsAdded = true;
  }
}
const newContent = `

// ============================================================
// MAIN PAGE
// ============================================================

const miniQuiz = [
  { frage: 'Ich freue mich ___, dass du kommst.', options: ['darüber', 'darauf', 'daran'], besteAntwort: 0 },
  { frage: 'Hast du Angst ___ Spinnen?', options: ['von', 'vor', 'für'], besteAntwort: 1 },
  { frage: 'Er ärgert sich ___ das schlechte Wetter.', options: ['über', 'auf', 'um'], besteAntwort: 0 },
];

export default function KapitelVierPage() {
  return (
    <ChapterTemplate
      kapitelId="kapitel4"
      kapitel={kapitel}
      wortschatz={wortschatz}
      partizipZwei={partizipZwei}
      grammatik={grammatik}
      goetheTasks={goetheTasks}
      lernTipps={lernTipps}
      miniQuiz={miniQuiz}
      LesenComponent={<LesenInteraktiv4 />}
      HorenComponent={<HorenInteraktiv4 />}
      SchreibenComponent={<UebungInteraktiv4 />}
      GrammatikInteraktivComponent={<GrammatikInteraktiv4 />}
      TestComponent={<KapitelTest4 />}
    />
  );
}
`;
fs.writeFileSync('app/dashboard/kapitel-4/page.tsx', resultLines.join('\n') + newContent, 'utf8');
