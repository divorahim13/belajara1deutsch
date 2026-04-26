const fs = require('fs');
const content = fs.readFileSync('app/dashboard/kapitel-2/page.tsx', 'utf8');
const lines = content.split('\n');
const importLine = `import ChapterTemplate from '../components/ChapterTemplate';`;
let importsAdded = false;
let resultLines = [];
for (let i = 0; i < 338; i++) {
  resultLines.push(lines[i]);
  if (!importsAdded && lines[i].includes(`import { GrammatikInteraktiv2 }`)) {
    resultLines.push(importLine);
    importsAdded = true;
  }
}
const newContent = `

// ============================================================
// MAIN PAGE
// ============================================================

const miniQuiz = [
  { frage: 'Letztes Jahr ___ ich in Berlin.', options: ['bin', 'war', 'hatte'], besteAntwort: 1 },
  { frage: 'Wir ___ gestern keine Zeit.', options: ['waren', 'sind', 'hatten'], besteAntwort: 2 },
  { frage: 'Er hilft ___ bei den Hausaufgaben.', options: ['dem Kind', 'das Kind', 'den Kind'], besteAntwort: 0 },
  { frage: 'Können Sie ___ bitte den Weg zeigen?', options: ['mich', 'mir', 'ich'], besteAntwort: 1 },
];

export default function KapitelZweiPage() {
  return (
    <ChapterTemplate
      kapitelId="kapitel2"
      kapitel={kapitel}
      wortschatz={wortschatz}
      partizipZwei={partizipZwei}
      grammatik={grammatik}
      goetheTasks={goetheTasks}
      lernTipps={lernTipps}
      miniQuiz={miniQuiz}
      LesenComponent={<LesenInteraktiv2 />}
      HorenComponent={<HorenInteraktiv2 />}
      SchreibenComponent={<UebungInteraktiv2 />}
      GrammatikInteraktivComponent={<GrammatikInteraktiv2 />}
      TestComponent={<KapitelTest2 />}
    />
  );
}
`;
fs.writeFileSync('app/dashboard/kapitel-2/page.tsx', resultLines.join('\n') + newContent, 'utf8');
