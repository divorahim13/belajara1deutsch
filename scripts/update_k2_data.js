const fs = require('fs');
const path = 'app/dashboard/kapitel-2/page.tsx';
let content = fs.readFileSync(path, 'utf-8');

const newWortschatz = `const wortschatz: { de: string; plural?: string; id: string; beispiel: string; kategorie: string }[] = [
  // Sprachen
  { de: 'die Muttersprache', plural: '-n', id: 'bahasa ibu', beispiel: 'Ich habe zwei Muttersprachen.', kategorie: 'Sprachen' },
  { de: 'die Fremdsprache', plural: '-n', id: 'bahasa asing', beispiel: 'Er spricht drei Fremdsprachen.', kategorie: 'Sprachen' },
  { de: 'fließend', id: 'lancar / fasih', beispiel: 'Ich spreche Deutsch fließend.', kategorie: 'Sprachen' },
  { de: 'ein bisschen', id: 'sedikit', beispiel: 'Französisch spreche ich nur ein bisschen.', kategorie: 'Sprachen' },
  
  // Beruf & Studium
  { de: 'die Ausbildung', plural: '-en', id: 'pendidikan vokasi', beispiel: 'Nach der Schule habe ich eine Ausbildung gemacht.', kategorie: 'Beruf' },
  { de: 'abschließen', id: 'menyelesaikan / lulus', beispiel: 'Sie hat ihre Ausbildung abgeschlossen.', kategorie: 'Beruf' },
  { de: 'der Kollege / die Kollegin', plural: '-n / -nen', id: 'rekan kerja', beispiel: 'Ich habe nette Kollegen.', kategorie: 'Beruf' },
  { de: 'das Studium', plural: 'Studien', id: 'studi universitas', beispiel: 'Im Herbst habe ich mein Studium angefangen.', kategorie: 'Beruf' },
  { de: 'die Überstunde', plural: '-n', id: 'lembur', beispiel: 'Ich muss heute Überstunden machen.', kategorie: 'Beruf' },
  { de: 'das Praktikum', plural: 'Praktika', id: 'magang', beispiel: 'Ich mache ein Praktikum.', kategorie: 'Beruf' },
  { de: 'jobben', id: 'bekerja paruh waktu', beispiel: 'Der Student jobbt am Wochenende.', kategorie: 'Beruf' },
  { de: 'die Firma', plural: 'Firmen', id: 'perusahaan', beispiel: 'Er arbeitet in einer Firma im Zentrum.', kategorie: 'Beruf' },
  { de: 'die Prüfung', plural: '-en', id: 'ujian', beispiel: 'Ich habe meine Prüfung gut gemacht.', kategorie: 'Beruf' },
  { de: 'die Note', plural: '-n', id: 'nilai / angka', beispiel: 'Ich habe eine gute Note bekommen.', kategorie: 'Beruf' },
  { de: 'die Präsentation', plural: '-en', id: 'presentasi', beispiel: 'Ich muss eine Präsentation vorbereiten.', kategorie: 'Beruf' },
  { de: 'der Beruf', plural: '-e', id: 'pekerjaan / profesi', beispiel: 'Was ist dein Beruf?', kategorie: 'Beruf' },
  { de: 'das Gehalt', plural: '"-er', id: 'gaji', beispiel: 'Das Gehalt ist sehr gut.', kategorie: 'Beruf' },
  { de: 'verdienen', id: 'menghasilkan (uang)', beispiel: 'Sie verdient viel Geld.', kategorie: 'Beruf' },
  { de: 'die Lehre', plural: '-n', id: 'magang profesi', beispiel: 'Er macht eine Lehre als Elektriker.', kategorie: 'Beruf' },
  { de: 'die Vorlesung', plural: '-en', id: 'kuliah (mata kuliah)', beispiel: 'Die Vorlesung beginnt um 8 Uhr.', kategorie: 'Beruf' },

  // Schule
  { de: 'die Schulzeit', id: 'masa sekolah', beispiel: 'Die Schulzeit war eine schöne Zeit.', kategorie: 'Schule' },
  { de: 'die Schuluniform', plural: '-en', id: 'seragam sekolah', beispiel: 'Wir mussten eine Schuluniform tragen.', kategorie: 'Schule' },
  { de: 'das Fach', plural: '"-er', id: 'mata pelajaran', beispiel: 'Mathe war mein Lieblingsfach.', kategorie: 'Schule' },
  { de: 'der Schulweg', plural: '-e', id: 'perjalanan ke sekolah', beispiel: 'Mein Schulweg war nicht weit.', kategorie: 'Schule' },
  { de: 'die Grundschule', plural: '-n', id: 'sekolah dasar', beispiel: 'Die Grundschule dauert vier Jahre.', kategorie: 'Schule' },
  { de: 'die Hauptschule', plural: '-n', id: 'sekolah menengah (Hauptschule)', beispiel: 'Er war in der Hauptschule.', kategorie: 'Schule' },
  { de: 'die Realschule', plural: '-n', id: 'sekolah menengah (Realschule)', beispiel: 'Sie hat den Realschulabschluss gemacht.', kategorie: 'Schule' },
  { de: 'das Gymnasium', plural: 'Gymnasien', id: 'sekolah menengah (Gymnasium)', beispiel: 'Nach dem Gymnasium mache ich Abitur.', kategorie: 'Schule' },
  { de: 'die Gesamtschule', plural: '-n', id: 'sekolah menengah gabungan', beispiel: 'In der Gesamtschule gibt es alle Abschlüsse.', kategorie: 'Schule' },
  { de: 'das Abitur', id: 'ijazah SMA (Jerman)', beispiel: 'Mit dem Abitur kann man studieren.', kategorie: 'Schule' },
  { de: 'der Abschluss', plural: '"-e', id: 'kelulusan', beispiel: 'Welchen Abschluss machst du?', kategorie: 'Schule' },
  { de: 'streng', id: 'tegas / galak', beispiel: 'Der Lehrer war sehr streng.', kategorie: 'Schule' },

  // Weitere Begriffe
  { de: 'die Erfahrung', plural: '-en', id: 'pengalaman', beispiel: 'Ich sammle viele Erfahrungen.', kategorie: 'Weitere Begriffe' },
  { de: 'unabhängig', id: 'mandiri', beispiel: 'Ich möchte unabhängig von meinen Eltern sein.', kategorie: 'Weitere Begriffe' },
  { de: 'erwachsen', id: 'dewasa', beispiel: 'Ich wollte immer erwachsen sein.', kategorie: 'Weitere Begriffe' },
  { de: 'die Pause', plural: '-n', id: 'istirahat', beispiel: 'Wir haben jetzt eine Pause.', kategorie: 'Weitere Begriffe' },
  { de: 'die Erinnerung', plural: '-en', id: 'kenangan', beispiel: 'Ich habe gute Erinnerungen an die Schule.', kategorie: 'Weitere Begriffe' }
]`;

const newGrammatik = `const grammatik = [
  {
    titel: 'Modalverben im Präteritum',
    erklaerung: 'Modal verbs in the simple past (Präteritum) are formed by removing the umlaut (if any) and adding the past endings.',
    beispiele: [
      'ich musste (müssen) / ich konnte (können)',
      'du musstest / du konntest',
      'er/es/sie musste / er/es/sie konnte',
      'wir mussten / wir konnten',
      'ihr musstet / ihr konntet',
      'sie/Sie mussten / sie/Sie konnten',
      'wollen -> wollte / dürfen -> durfte / sollen -> sollte'
    ],
    warnung: 'Remember: In Präteritum, the modal verbs lose their umlauts (z.B. können -> konnte, müssen -> musste, dürfen -> durfte).'
  },
  {
    titel: 'Dativ (Bestimmter, Unbestimmter, Possessivartikel)',
    erklaerung: 'In the Dative case, articles change to show the indirect object or after certain prepositions (z.B. mit, nach, bei).',
    beispiele: [
      'der/das -> dem / einem / keinem / meinem',
      'die -> der / einer / keiner / meiner',
      'die (Plural) -> den / - / keinen / meinen (+ -n am Nomen)',
      'Possessivartikel im Dativ: mit ihrem Job, nach seinem Praktikum, in deiner Schule, mit euren Freunden.'
    ]
  }
]`;

const newGoetheTasks = `const goetheTasks = [
  {
    id: 'lesen-teil1',
    typ: 'Lesen',
    titel: 'Schultypen in Deutschland',
    anweisung: 'Lesen Sie die Texte über verschiedene Schulabschlüsse. Sind die Aussagen Richtig oder Falsch?',
    text: 'Sebastian war in der Realschule. Dort hat es ihm gut gefallen. Mathe war für ihn ziemlich schwer. Er hat seinen Realschulabschluss geschafft und beginnt jetzt eine Ausbildung zum Physiotherapeuten.\\n\\nVanessa war fünf Jahre in der Hauptschule. Die Vorbereitung auf die Arbeitswelt war besonders wichtig. Jetzt ist sie Azubi in einer Arztpraxis.',
    fragen: [
      { 
        frage: 'Sebastian fand Mathe sehr einfach.', 
        optionen: ['Richtig', 'Falsch'], 
        korrekt: 1,
        erklaerung: 'Er sagt: "Mathe war für mich ziemlich schwer."'
      },
      { 
        frage: 'Vanessa macht eine Ausbildung in einer Arztpraxis.', 
        optionen: ['Richtig', 'Falsch'], 
        korrekt: 0,
        erklaerung: 'Sie sagt: "Seit dem Hauptschulabschluss bin ich Azubi in einer Arztpraxis."'
      }
    ]
  },
  {
    id: 'hoeren-teil1',
    typ: 'Hören',
    titel: 'Radiosendung "Schule aus - und nun?"',
    anweisung: 'Was machen Maike, Sara und Vida? Richtig oder Falsch?',
    text: 'Audio Transkript (Simulation):\\n\\nMaike: "Seit einem Jahr bin ich mit der Schule fertig. Ich wohne nicht mehr bei meinen Eltern."\\nSara: "Ich wollte eine Pause vom Lernen haben und helfe einer Familie mit einem Kind als Au-pair."\\nVida: "Vor zwei Jahren habe ich mit meinem Job angefangen. Meine Eltern zahlen meine Miete nicht mehr."',
    fragen: [
      { 
        frage: 'Maike wohnt noch bei ihren Eltern.', 
        optionen: ['Richtig', 'Falsch'], 
        korrekt: 1,
        erklaerung: 'Maike sagt, sie wohnt nicht mehr bei ihren Eltern.'
      },
      { 
        frage: 'Sara macht eine Pause vom Lernen.', 
        optionen: ['Richtig', 'Falsch'], 
        korrekt: 0,
        erklaerung: 'Sara sagt: "Ich wollte eine Pause vom Lernen haben."'
      }
    ]
  },
  {
    id: 'schreiben-teil1',
    typ: 'Schreiben',
    titel: 'Kommentar im Schulforum',
    anweisung: 'Schreiben Sie einen Kommentar (ca. 20-30 Wörter) über Ihre Schulzeit. Was war gut, was war schlecht?',
    text: '',
    fragen: [
      { 
        frage: 'Nutzen Sie Redemittel wie "Ich war in der...", "Das war super...", "Ich mochte / musste..."', 
        optionen: ['Verstanden'], 
        korrekt: 0,
        erklaerung: 'Beispiel: Ich war im Gymnasium. Das war eine schöne Zeit. Ich hatte viele Freunde. Ich mochte meine Lehrer, aber ich musste viele Hausaufgaben machen.'
      }
    ]
  },
  {
    id: 'sprechen-teil1',
    typ: 'Sprechen',
    titel: 'Erfahrungen austauschen',
    anweisung: 'Stellen Sie sich vor und sprechen Sie über Ihre Schulzeit. Was haben Sie nach der Schule gemacht?',
    text: '',
    fragen: [
      { 
        frage: 'Sprechen Sie über: Schule, Abschluss, Pläne, Ausbildung/Studium.', 
        optionen: ['Verstanden'], 
        korrekt: 0,
        erklaerung: 'Verwenden Sie Modalverben im Präteritum: "Ich musste viele Hausaufgaben machen...", "Ich wollte studieren..."'
      }
    ]
  }
]`;

function replaceBlock(content, blockStart, blockEndMatcher, newBlock) {
  const startIdx = content.indexOf(blockStart);
  if (startIdx === -1) return content;
  
  // Find the exact close of the array logic
  const matchRegex = new RegExp(blockEndMatcher.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'));
  const match = content.slice(startIdx).match(matchRegex);
  
  if (!match) return content;
  const endIdx = startIdx + match.index + match[0].length;
  
  return content.slice(0, startIdx) + newBlock + content.slice(endIdx);
}

// 1. Replace wortschatz
content = replaceBlock(content, 'const wortschatz', '];', newWortschatz + ';');

// 2. Replace grammatik
content = replaceBlock(content, 'const grammatik', '];', newGrammatik + ';');

// 3. Replace goetheTasks
content = replaceBlock(content, 'const goetheTasks', '];', newGoetheTasks + ';');

fs.writeFileSync(path, content, 'utf-8');
console.log('Update complete.');
