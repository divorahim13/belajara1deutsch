const fs = require('fs');

const path = 'app/dashboard/kapitel-4/page.tsx';
let content = fs.readFileSync(path, 'utf-8');

// Replace imports
content = content.replace(/KapitelTest3/g, 'KapitelTest4');
content = content.replace(/LesenInteraktiv3/g, 'LesenInteraktiv4');
content = content.replace(/HorenInteraktiv3/g, 'HorenInteraktiv4');
content = content.replace(/UebungInteraktiv3/g, 'UebungInteraktiv4');
content = content.replace(/GrammatikInteraktiv3/g, 'GrammatikInteraktiv4');

// Replace kapitel data
const newKapitel = `const kapitel = {
  nummer: 4,
  titel: 'Große und kleine Gefühle',
  untertitel: 'Gefühle, Glückwünsche, Dank, Feiern und Blogtexte',
  level: 'A2',
  goetheFokus: ['Lesen', 'Hören', 'Schreiben', 'Sprechen'],
};`;

content = content.replace(/const kapitel = \{[\s\S]*?\};/, newKapitel);

// Replace wortschatz data
const newWortschatz = `const wortschatz: { de: string; plural?: string; id: string; beispiel: string; kategorie: string }[] = [
  // Besondere Ereignisse
  { de: 'die Hochzeit', plural: '-en', id: 'pernikahan', beispiel: 'Meine Schwester hat im Juli geheiratet.', kategorie: 'Alltag' },
  { de: 'das Fest', plural: '-e', id: 'pesta / perayaan', beispiel: 'Wir machen ein großes Fest.', kategorie: 'Alltag' },
  { de: 'das Brautpaar', plural: '-e', id: 'pasangan pengantin', beispiel: 'Das Brautpaar sieht toll aus.', kategorie: 'Alltag' },
  { de: 'die Geburt', plural: '-en', id: 'kelahiran', beispiel: 'Wir gratulieren zur Geburt von Leon.', kategorie: 'Alltag' },
  { de: 'gratulieren', id: 'memberi selamat', beispiel: 'Wir gratulieren euch herzlich zur Hochzeit.', kategorie: 'Alltag' },
  { de: 'der Führerschein', plural: '-e', id: 'SIM', beispiel: 'Endlich habe ich den Führerschein.', kategorie: 'Alltag' },
  { de: 'bestehen', id: 'lulus ujian', beispiel: 'Ich habe die Prüfung bestanden.', kategorie: 'Alltag' },
  { de: 'die Medaille', plural: '-n', id: 'medali', beispiel: 'Ich habe beim Marathon eine Medaille bekommen.', kategorie: 'Alltag' },
  { de: 'die Schultüte', plural: '-n', id: 'kerucut hadiah sekolah', beispiel: 'Das Kind hat eine Schultüte.', kategorie: 'Alltag' },

  // Gefühle
  { de: 'glücklich', id: 'bahagia', beispiel: 'Ich bin glücklich, wenn ich meine Freunde treffe.', kategorie: 'Gefühle' },
  { de: 'stolz', id: 'bangga', beispiel: 'Ich bin stolz auf dich.', kategorie: 'Gefühle' },
  { de: 'traurig', id: 'sedih', beispiel: 'Ich bin traurig, wenn du gehst.', kategorie: 'Gefühle' },
  { de: 'nervös', id: 'gugup', beispiel: 'Ich bin nervös, wenn ich eine Prüfung habe.', kategorie: 'Gefühle' },
  { de: 'genervt', id: 'kesal / terganggu', beispiel: 'Ich bin genervt, wenn ich lange warten muss.', kategorie: 'Gefühle' },
  { de: 'sich freuen', id: 'merasa senang', beispiel: 'Ich freue mich auf die Party.', kategorie: 'Gefühle' },
  { de: 'Angst haben', id: 'takut', beispiel: 'Ich habe Angst, wenn ich einen Horrorfilm sehe.', kategorie: 'Gefühle' },
  { de: 'peinlich', id: 'memalukan', beispiel: 'Oh, ist das peinlich!', kategorie: 'Gefühle' },
  
  // Andere
  { de: 'unpünktlich', id: 'tidak tepat waktu', beispiel: 'Der Bus war heute unpünktlich.', kategorie: 'Weitere Begriffe' },
  { de: 'hilfsbereit', id: 'suka menolong', beispiel: 'Die Leute hier sind sehr hilfsbereit.', kategorie: 'Weitere Begriffe' },
  { de: 'überrascht', id: 'terkejut', beispiel: 'Ich war sehr überrascht.', kategorie: 'Weitere Begriffe' }
];`;

function replaceBlockString(content, startString, endString, newString) {
  const start = content.indexOf(startString);
  if (start === -1) return content;
  const end = content.indexOf(endString, start);
  if (end === -1) return content;
  return content.substring(0, start) + newString + content.substring(end + endString.length);
}

content = replaceBlockString(content, 'const wortschatz: {', '];', newWortschatz);

const newGrammatik = `const grammatik = [
  {
    titel: 'Nebensatz mit "wenn"',
    farbe: 'indigo',
    erklaerung: 'Digunakan untuk menyatakan "jika/ketika". Kata kerja berada di akhir Nebensatz.',
    tiefenErklaerung: 'Dalam bahasa Jerman, "wenn" digunakan untuk menyatakan kondisi atau situasi. Seperti konjungsi subordinatif lainnya (weil, dass), "wenn" memaksa kata kerja terkonjugasi untuk berada di akhir kalimat (Verb-Ende).',
    struktur: 'Hauptsatz, wenn + Subjekt + ... + Verb.',
    konjugationsTabelle: null,
    beispiele: [
      { satz: 'Ich bin nervös, wenn ich eine Prüfung habe.', terjemahan: 'Saya gugup ketika saya ada ujian.' },
      { satz: 'Wenn ich Zeit habe, gehe ich ins Kino.', terjemahan: 'Jika saya punya waktu, saya pergi ke bioskop.' }
    ],
    falle: 'Jangan lupa bahwa kata kerja harus selalu di akhir Nebensatz. Dan jika Nebensatz di awal, Hauptsatz harus diawali dengan kata kerja.'
  },
  {
    titel: 'Reflexive Verben',
    farbe: 'emerald',
    erklaerung: 'Kata kerja refleksif menggunakan Reflexivpronomen (sich, mich, dich, dll).',
    tiefenErklaerung: 'Kata kerja refleksif adalah kata kerja yang subjek dan objeknya adalah orang yang sama. Contoh: sich freuen (merasa senang), sich ärgern (merasa kesal).',
    struktur: 'Subjekt + Verb + Reflexivpronomen + ...',
    konjugationsTabelle: {
      headers: ['Person', 'Reflexivpronomen'],
      rows: [
        ['ich', 'mich'],
        ['du', 'dich'],
        ['er/es/sie', 'sich'],
        ['wir', 'uns'],
        ['ihr', 'euch'],
        ['sie/Sie', 'sich']
      ]
    },
    beispiele: [
      { satz: 'Ich freue mich auf die Feier.', terjemahan: 'Saya menantikan perayaan itu.' },
      { satz: 'Er ärgert sich, wenn wir laut sind.', terjemahan: 'Dia marah ketika kami berisik.' }
    ],
    falle: 'Ingatlah bahwa "sich" adalah untuk orang ketiga tunggal dan jamak (er/sie/es/Sie/sie), sedangkan untuk ich (mich) dan du (dich).'
  }
];`;

content = replaceBlockString(content, 'const grammatik = [', '];', newGrammatik);

const newGoetheTasks = `const goetheTasks = [
  {
    skill: 'Lesen',
    icon: '📖',
    farbe: 'sky',
    tasks: [
      {
        typ: 'Blogbeiträge verstehen',
        beschreibung: 'Lesen Sie die Blogbeiträge von Leuten im Ausland.',
        übung: 'Lesen Sie den Text und antworten Sie.',
        text: 'Paula ist seit zwei Monaten in Argentinien. Am Anfang war sie sauer, weil ihre Freunde oft nicht pünktlich waren.',
        frage: '1. Paula war sauer, weil...',
        antwort: '... ihre Freunde oft nicht pünktlich waren.',
      },
    ],
  },
  {
    skill: 'Schreiben',
    icon: '✍️',
    farbe: 'amber',
    tasks: [
      {
        typ: 'Einladung absagen',
        beschreibung: 'Schreiben Sie eine kurze Mail.',
        übung: 'Nutzen Sie die Redemittel.',
        text: 'Ein Freund hat Sie eingeladen, aber Sie können nicht kommen.',
        frage: 'Schreiben Sie Ihre Antwort.',
        antwort: 'Vielen Dank für die Einladung. Leider kann ich nicht kommen, weil ich arbeiten muss. Alles Gute zum Geburtstag!',
      },
    ],
  }
];`;

content = replaceBlockString(content, 'const goetheTasks = [', '];', newGoetheTasks);

// Remove KomparativGame entirely and replace it with a simple div or just remove it from render
content = content.replace(/<KomparativGame \/>/g, '{/* KomparativGame Removed */}');

fs.writeFileSync(path, content, 'utf-8');
console.log('Script done');
