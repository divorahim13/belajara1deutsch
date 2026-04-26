const fs = require('fs');
const content = fs.readFileSync('app/dashboard/page.tsx', 'utf8');
const lines = content.split('\n');
const importLine = `import ChapterTemplate from './components/ChapterTemplate';`;
let importsAdded = false;
let resultLines = [];
for (let i = 0; i < 448; i++) {
  resultLines.push(lines[i]);
  if (!importsAdded && lines[i].includes(`import { GrammatikInteraktiv1 }`)) {
    resultLines.push(importLine);
    importsAdded = true;
  }
}
const newContent = `

// ============================================================
// MAIN PAGE
// ============================================================

const miniQuiz = [
  { frage: 'Er bleibt zu Hause, ___ er krank ___.', options: ['weil … ist', 'weil … sein', 'dass … ist'], besteAntwort: 0 },
  { frage: 'Ich weiß nicht, ___ der Zug kommt.', options: ['ob', 'wann', 'dass'], besteAntwort: 1 },
  { frage: 'Sie ___ mit der Bahn ___.', options: ['hat ... gefahren', 'ist ... gefahren', 'ist ... gefahrt'], besteAntwort: 1 },
  { frage: 'Das Verb "passieren" im Perfekt: Es ___ viel ___!', options: ['hat ... passiert', 'ist ... gepassiert', 'hat ... gepassiert'], besteAntwort: 0 },
];

export default function KapitelEinsPage() {
  return (
    <ChapterTemplate
      kapitelId="kapitel1"
      kapitel={kapitel}
      wortschatz={wortschatz}
      partizipZwei={partizipZwei}
      grammatik={grammatik}
      goetheTasks={goetheTasks}
      lernTipps={lernTipps}
      miniQuiz={miniQuiz}
      LesenComponent={<LesenInteraktiv1 />}
      HorenComponent={<HorenInteraktiv1 />}
      SchreibenComponent={<UebungInteraktiv1 />}
      GrammatikInteraktivComponent={<GrammatikInteraktiv1 />}
      TestComponent={<KapitelTest1 />}
    />
  );
}
`;
fs.writeFileSync('app/dashboard/page.tsx', resultLines.join('\n') + newContent, 'utf8');
