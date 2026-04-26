const fs = require('fs');
const content = fs.readFileSync('app/dashboard/kapitel-5/page.tsx', 'utf8');
const lines = content.split('\n');
const importLine = `import ChapterTemplate from '../components/ChapterTemplate';`;
let importsAdded = false;
let resultLines = [];
for (let i = 0; i < 224; i++) {
  resultLines.push(lines[i]);
  if (!importsAdded && lines[i].includes(`import { GrammatikInteraktiv5 }`)) {
    resultLines.push(importLine);
    importsAdded = true;
  }
}
const newContent = `

// ============================================================
// MAIN PAGE
// ============================================================

const miniQuiz = [
  { frage: 'Welcher Artikel: ___ Ampel?', options: ['der', 'die', 'das'], besteAntwort: 1 },
  { frage: 'Wo ist der Bahnhof? ___ Sie geradeaus!', options: ['Gehen', 'Gehst', 'Geht'], besteAntwort: 0 },
  { frage: 'Ich warte ___ dich an der Ecke.', options: ['auf', 'für', 'an'], besteAntwort: 0 },
];

export default function KapitelFuenfPage() {
  return (
    <ChapterTemplate
      kapitelId="kapitel5"
      kapitel={kapitel}
      wortschatz={wortschatz}
      partizipZwei={partizipZwei}
      grammatik={grammatik}
      goetheTasks={goetheTasks}
      lernTipps={lernTipps}
      miniQuiz={miniQuiz}
      LesenComponent={<LesenInteraktiv5 />}
      HorenComponent={<HorenInteraktiv5 />}
      SchreibenComponent={<UebungInteraktiv5 />}
      GrammatikInteraktivComponent={<GrammatikInteraktiv5 />}
      TestComponent={<KapitelTest5 />}
    />
  );
}
`;
fs.writeFileSync('app/dashboard/kapitel-5/page.tsx', resultLines.join('\n') + newContent, 'utf8');
