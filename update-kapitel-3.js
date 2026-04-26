const fs = require('fs');
const content = fs.readFileSync('app/dashboard/kapitel-3/page.tsx', 'utf8');
const lines = content.split('\n');
const importLine = `import ChapterTemplate from '../components/ChapterTemplate';`;
let importsAdded = false;
let resultLines = [];
for (let i = 0; i < 296; i++) {
  resultLines.push(lines[i]);
  if (!importsAdded && lines[i].includes(`import { GrammatikInteraktiv3 }`)) {
    resultLines.push(importLine);
    importsAdded = true;
  }
}
const newContent = `

// ============================================================
// MAIN PAGE
// ============================================================

const miniQuiz = [
  { frage: '___ du mir dein Handy leihen?', options: ['Könntest', 'Könnte', 'Konntest'], besteAntwort: 0 },
  { frage: 'Ich frage mich, ___ er morgen kommt.', options: ['dass', 'ob', 'weil'], besteAntwort: 1 },
  { frage: 'Weißt du, ___ Film das ist?', options: ['was für ein', 'welcher', 'was für'], besteAntwort: 0 },
];

export default function KapitelDreiPage() {
  return (
    <ChapterTemplate
      kapitelId="kapitel3"
      kapitel={kapitel}
      wortschatz={wortschatz}
      partizipZwei={partizipZwei}
      grammatik={grammatik}
      goetheTasks={goetheTasks}
      lernTipps={lernTipps}
      miniQuiz={miniQuiz}
      LesenComponent={<LesenInteraktiv3 />}
      HorenComponent={<HorenInteraktiv3 />}
      SchreibenComponent={<UebungInteraktiv3 />}
      GrammatikInteraktivComponent={<GrammatikInteraktiv3 />}
      TestComponent={<KapitelTest3 />}
    />
  );
}
`;
fs.writeFileSync('app/dashboard/kapitel-3/page.tsx', resultLines.join('\n') + newContent, 'utf8');
