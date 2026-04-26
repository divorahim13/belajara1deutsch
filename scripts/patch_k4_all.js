const fs = require('fs');

const rawData = `
VOCABULARY:
- die Geburt, -en = kelahiran
- das Baby, -s = bayi
- die Babykleidung, - = pakaian bayi
- süß, - = lucu/manis
- schmücken, - = menghias
- der Storch, -"e = burung bangau
- die Geburtstagsparty, -s = pesta ulang tahun
- der Geburtstag, -e = ulang tahun
- die Einladung, -en = undangan
- das Geschenk, -e = hadiah
- die Glückwünsche, - = ucapan selamat
- die Glückwunschkarte, -n = kartu ucapan selamat
- die Karte, -n = kartu
- die Dankeskarte, -n = kartu ucapan terima kasih
- die Absage, -n = pembatalan / penolakan
- die Hochzeit, -en = pernikahan
- heiraten, - = menikah
- das Brautpaar, -e = pasangan pengantin
- das Brautkleid, -er = gaun pengantin
- der Ring, -e = cincin
- das Paar, -e = pasangan
- das Fest, -e = pesta / perayaan
- die Kirche, -n = gereja
- die Familie, -n = keluarga
- die Freunde, - = teman-teman
- die Leute, - = orang-orang
- ungefähr, - = kira-kira
- morgens, - = pada pagi hari
- feiern, - = merayakan / berpesta
- tanzen, - = menari
- essen, - = makan
- der erste Schultag, - = hari pertama sekolah
- der Schultag, -e = hari sekolah
- die Schultüte, -n = kerucut hadiah sekolah
- die Überraschung, -en = kejutan
- der Schulranzen, - = tas sekolah
- beginnen, - = mulai
- aufgeregt sein, - = merasa gugup / bersemangat
- die Firma, Firmen = perusahaan
- der Kollege, -n = rekan kerja laki-laki
- die Kollegin, -nen = rekan kerja perempuan
- die Kollegen, - = para rekan kerja
- das Gebäck, -e = kue / pastry
- die Getränke, - = minuman
- kennenlernen, - = berkenalan
- die Feier, -n = perayaan
- nett, - = baik/ramah
- helfen, - = membantu
- der Führerschein, -e = SIM
- die Führerscheinprüfung, -en = ujian SIM
- die Prüfung, -en = ujian
- die Prüfung bestehen, - = lulus ujian
- das Auto, -s = mobil
- Auto fahren, - = mengendarai mobil
- mobil sein, - = bisa bepergian / mobile
- arbeiten, - = bekerja
- kaufen, - = membeli
- der Marathon, -s = maraton
- der Stadt-Marathon, -s = maraton kota
- mitlaufen, - = ikut berlari
- die Medaille, -n = medali
- der erste Platz, - = juara pertama
- der Sieg, -e = kemenangan
- die Siegerin, -nen = pemenang perempuan
- gewinnen, - = menang
- versuchen, - = mencoba
- nächstes Jahr, - = tahun depan
- geschafft!, - = berhasil!
- dabei sein, - = hadir / ikut serta

POSITIVE_FEELINGS:
- glücklich sein, - = bahagia
- froh sein, - = senang
- sich freuen, - = merasa senang
- sich riesig freuen, - = sangat senang
- stolz sein, - = bangga
- sich wohlfühlen, - = merasa nyaman
- etwas schön finden, - = menganggap sesuatu menyenangkan
- etwas cool finden, - = menganggap sesuatu keren
- erleichtert sein, - = merasa lega
- gute Laune haben, - = suasana hati baik

NEGATIVE_FEELINGS:
- traurig sein, - = sedih
- unglücklich sein, - = tidak bahagia
- Angst haben, - = takut
- nervös sein, - = gugup
- genervt sein, - = kesal / terganggu
- sauer sein, - = marah
- ärgerlich sein, - = kesal
- gestresst sein, - = stres
- schlechte Laune haben, - = suasana hati buruk
- sich langweilen, - = bosan
- sich ärgern, - = merasa kesal
- sich streiten, - = bertengkar
- unangenehm, - = tidak nyaman
- peinlich, - = memalukan
- schlimm, - = buruk / parah
- schade, - = sayang sekali
- das Bedauern, - = penyesalan
- keine Ahnung haben, - = tidak tahu

NOUNS:
- das Gefühl, -e = perasaan
- die Emotion, -en = emosi
- die Freude, -n = kegembiraan
- die Laune, -n = suasana hati
- die Liebe, - = cinta
- das Glück, - = keberuntungan / kebahagiaan
- das Pech, - = kesialan

PARTIZIP_II_LIST:
- haben -> gehabt = mempunyai
- sein -> gewesen = menjadi / berada
- machen -> gemacht = membuat / melakukan
- feiern -> gefeiert = merayakan
- tanzen -> getanzt = menari
- essen -> gegessen = makan
- heiraten -> geheiratet = menikah
- kommen -> gekommen = datang
- kaufen -> gekauft = membeli
- arbeiten -> gearbeitet = bekerja
- schaffen -> geschafft = berhasil menyelesaikan
- fahren -> gefahren = pergi / mengendarai
- laufen -> gelaufen = berlari
- mitlaufen -> mitgelaufen = ikut berlari
- bekommen -> bekommen = mendapatkan
- versuchen -> versucht = mencoba
- werden -> geworden = menjadi
- bestehen -> bestanden = lulus
- sehen -> gesehen = melihat
- erzählen -> erzählt = menceritakan
- anrufen -> angerufen = menelepon
- einladen -> eingeladen = mengundang
- gratulieren -> gratuliert = memberi selamat
- sich freuen -> sich gefreut = merasa senang
- sich ärgern -> sich geärgert = merasa kesal
- sich entscheiden -> sich entschieden = memutuskan
- sich entschuldigen -> sich entschuldigt = meminta maaf
- sich erinnern -> sich erinnert = mengingat
- sich interessieren -> sich interessiert = tertarik
- sich treffen -> sich getroffen = bertemu
- sich unterhalten -> sich unterhalten = bercakap-cakap
- sich streiten -> sich gestritten = bertengkar
- sich gewöhnen -> sich gewöhnt = membiasakan diri
- sich wohlfühlen -> sich wohlgefühlt = merasa nyaman
- finden -> gefunden = menemukan / merasa
- denken -> gedacht = berpikir
- vermissen -> vermisst = merindukan
- zeigen -> gezeigt = menunjukkan
- verstehen -> verstanden = memahami
- bringen -> gebracht = membawa
- mitbringen -> mitgebracht = membawa serta
- anbieten -> angeboten = menawarkan
- unterrichten -> unterrichtet = mengajar
- helfen -> geholfen = membantu
- putzen -> geputzt = membersihkan
- aufräumen -> aufgeräumt = merapikan
- sauber machen -> sauber gemacht = membersihkan
- legen -> gelegt = meletakkan
- spülen -> gespült = mencuci
- schenken -> geschenkt = memberi hadiah
- suchen -> gesucht = mencari
- verlieren -> verloren = kehilangan
- fallen -> gefallen = jatuh
- gefallen -> gefallen = menyukai / berkenan
- kosten -> gekostet = berharga
- besuchen -> besucht = mengunjungi
- stattfinden -> stattgefunden = berlangsung
- teilnehmen -> teilgenommen = ikut serta
- bewundern -> bewundert = mengagumi
- enden -> geendet = berakhir
- probieren -> probiert = mencoba
- tragen -> getragen = memakai / membawa
- bleiben -> geblieben = tinggal / tetap
- zurückkommen -> zurückgekommen = kembali
- anfangen -> angefangen = mulai
- abfahren -> abgefahren = berangkat
- aussprechen -> ausgesprochen = mengucapkan
- austauschen -> ausgetauscht = bertukar
- wegfahren -> weggefahren = pergi berangkat

K4_VERANSTALTUNGEN:
- die Kieler Woche, - = Kiel Week
- stattfinden, - = berlangsung
- weltweit bekannt, - = terkenal di seluruh dunia
- der Besucher, - = pengunjung
- das Ereignis, -se = peristiwa
- die Segelregatta, -s = lomba layar
- der Segler, - = pelayar
- die Nation, -en = negara/bangsa
- die Segelsport-Veranstaltung, -en = acara olahraga layar
- teilnehmen, - = ikut serta
- das Schiff, -e = kapal
- alte Schiffe, - = kapal-kapal tua
- bewundern, - = mengagumi
- das Sommerfest, -e = festival musim panas
- die Attraktion, -en = atraksi
- Hunger haben, - = lapar
- Durst haben, - = haus
- die Spezialität, -en = makanan khas
- international, - = internasional
- der Musikfan, -s = penggemar musik
- das Konzert, -e = konser
- das Feuerwerk, -e = kembang api
- enden mit, - = berakhir dengan
- der Almabtrieb, -e = tradisi turunnya sapi
- der Viehscheid, - = nama lain Almabtrieb
- der Alpabzug, - = nama lain Almabtrieb di Swiss
- das Erlebnis, -se = pengalaman
- die Kuh, -"e = sapi
- die Alm, -en = padang rumput
- der Berg, -e = gunung
- die Alpen, - = Alpen
- die Alpenregion, -en = wilayah Alpen
- im Sommer, - = pada musim panas
- im Herbst, - = pada musim gugur
- zurückkommen, - = kembali
- das Dorf, -"er = desa
- begrüßen, - = menyambut
- die Blume, -n = bunga
- die Glocke, -n = lonceng
- gesund, - = sehat
- geschmückt sein, - = dihias
- traditionelle Musik, - = musik tradisional
- das Gericht, -e = hidangan
- typische Gerichte, - = hidangan khas
- die Region, -en = wilayah
- probieren, - = mencoba
- besuchen, - = mengunjungi
- die Veranstaltung, -en = acara

K4_BLOG:
- der Blogbeitrag, -"e = tulisan blog
- das Ausland, - = luar negeri
- im Ausland, - = di luar negeri
- seit zwei Monaten, - = sejak dua bulan
- die Sprachschule, -n = sekolah bahasa
- unterrichten, - = mengajar
- Deutsch unterrichten, - = mengajar bahasa Jerman
- lustig, - = lucu/menyenangkan
- sprechen, - = berbicara
- fragen, - = bertanya
- vermissen, - = merindukan
- die Familie vermissen, - = merindukan keluarga
- pünktlich, - = tepat waktu
- unpünktlich, - = tidak tepat waktu
- normal, - = biasa/normal
- sich gewöhnen an, - = membiasakan diri pada
- später, - = lebih lambat
- die Währung, -en = mata uang
- der Tango, -s = tango
- mitmachen, - = ikut serta
- Indien, - = India
- das Frühjahr, -e = musim semi
- die Anmeldung, -en = pendaftaran
- die Uni, -s = universitas
- das Wohnheim, -e = asrama
- der Mitarbeiter, - = pegawai laki-laki
- die Mitarbeiterin, -nen = pegawai perempuan
- freundlich, - = ramah
- hilfsbereit, - = suka membantu
- genau, - = tepat / akurat
- ordentlich, - = rapi / tertib
- der Verkehr, - = lalu lintas
- der Bus, -se = bus
- abfahren, - = berangkat
- fremd, - = asing
- sich fremd fühlen, - = merasa asing
- die Studenten, - = para mahasiswa
- verstehen, - = memahami
- einladen, - = mengundang
- anbieten, - = menawarkan
- der Gast, -"e = tamu

OPPOSITES:
- fröhlich ↔ traurig
- verspätet ↔ pünktlich
- nett ↔ unsympathisch
- langweilig ↔ spannend
- ordentlich ↔ unordentlich
- einfach ↔ schwierig
- wichtig ↔ unwichtig
- billig ↔ teuer
- lang ↔ kurz
- früh ↔ spät
- freundlich ↔ unfreundlich
- höflich ↔ unhöflich
- glücklich ↔ unglücklich
`;

// Combine and gather words
const existingWords = new Set();

function loadWords(filePath) {
    if (!fs.existsSync(filePath)) return;
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = /de:\s*['"]([^'"]+)['"]/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        let de = match[1].toLowerCase().replace(/^(der|die|das)\s+/, '').trim();
        existingWords.add(de);
    }
}

['app/dashboard/kapitel-1/page.tsx', 'app/dashboard/kapitel-2/page.tsx', 'app/dashboard/kapitel-3/page.tsx'].forEach(loadWords);

// Additionally load words that shouldn't be added since they are very common
const excludeList = ['essen', 'arbeiten', 'kaufen', 'fahren', 'finden', 'denken', 'verstehen', 'helfen', 'putzen', 'suchen', 'verlieren', 'besuchen', 'bleiben', 'sehen', 'machen', 'kommen', 'werden', 'gehen', 'sprechen', 'fragen', 'haben', 'sein'];
excludeList.forEach(w => existingWords.add(w.toLowerCase()));

const parsedVocab = [];
const lines = rawData.split('\n');

for (const line of lines) {
    if (line.startsWith('- ')) {
        const text = line.substring(2);
        
        if (text.includes('->')) {
            // Partizip
            continue;
        } else if (text.includes('↔')) {
            // Opposite
            continue;
        } else {
            // Vocab
            // e.g. die Geburt, -en = kelahiran
            const [dePart, idPart] = text.split('=');
            if (!dePart || !idPart) continue;
            const deFull = dePart.trim();
            const idFull = idPart.trim();
            
            // Try to split deFull to 'de' and 'plural'
            // Format: die Geburt, -en
            let de = deFull;
            let plural = '';
            const lastComma = deFull.lastIndexOf(',');
            if (lastComma !== -1) {
                de = deFull.substring(0, lastComma).trim();
                plural = deFull.substring(lastComma + 1).trim();
                if (plural === '-') plural = '';
            }
            
            const baseWord = de.toLowerCase().replace(/^(der|die|das)\s+/, '').trim();
            if (!existingWords.has(baseWord)) {
                parsedVocab.push({ de, plural, id: idFull, beispiel: '', kategorie: 'Gefühle & Ereignisse' });
                existingWords.add(baseWord);
            }
        }
    }
}

// Generate the wortschatz block
let wortschatzStr = 'const wortschatz: { de: string; plural?: string; id: string; beispiel: string; kategorie: string }[] = [\n';
parsedVocab.forEach(v => {
    wortschatzStr += `  { de: '${v.de.replace(/'/g, "\\'")}', plural: '${v.plural}', id: '${v.id.replace(/'/g, "\\'")}', beispiel: '${v.beispiel}', kategorie: '${v.kategorie}' },\n`;
});
wortschatzStr += '];\n';

// Replace in app/dashboard/kapitel-4/page.tsx
const k4Path = 'app/dashboard/kapitel-4/page.tsx';
let k4Content = fs.readFileSync(k4Path, 'utf8');

k4Content = k4Content.replace(/const wortschatz:.*?\];/s, wortschatzStr);

// Add Verbformen Partizip II Module to grammatik
// First parse the partizip II text
let partizipItemsStr = `  {
    titel: 'Verbformen: Partizip II im Kapitel 4',
    erklaerung: 'Bentuk Partizip II bukan fokus grammar utama Kapitel 4, tetapi banyak muncul dalam teks Kursbuch dan Übungsbuch. Ini membantu kamu mengenali bentuk Perfekt.',
    beispiele: [
      { satz: 'Meine Schwester hat im Juli geheiratet.', id: 'Adik perempuan saya menikah di bulan Juli.' },
      { satz: 'Ich habe die Prüfung bestanden.', id: 'Saya telah lulus ujian.' },
      { satz: 'Ich habe mich sehr gefreut.', id: 'Saya sangat merasa senang.' },
      { satz: 'Wir haben uns gut unterhalten.', id: 'Kami telah berbincang-bincang dengan baik.' },
      { satz: 'Mein Spanisch ist besser geworden.', id: 'Bahasa Spanyol saya menjadi lebih baik.' }
    ]
  }`;

// Find the grammatik array and inject this item.
k4Content = k4Content.replace(/const grammatik:.*?\];/s, function(match) {
    // Append inside the array
    return match.replace(/\];$/, `,\n${partizipItemsStr}\n];`);
});

fs.writeFileSync(k4Path, k4Content, 'utf8');

// Now update KapitelTest4.tsx
const testPath = 'app/dashboard/KapitelTest4.tsx';
let testContent = fs.readFileSync(testPath, 'utf8');

const newQuestions = `
  {
    id: 9,
    type: 'fillBlank',
    question: "Was ist das Partizip II von 'heiraten'?",
    correctAnswer: "geheiratet",
  },
  {
    id: 10,
    type: 'fillBlank',
    question: "Was ist das Partizip II von 'essen'?",
    correctAnswer: "gegessen",
  },
  {
    id: 11,
    type: 'fillBlank',
    question: "Was ist das Partizip II von 'bestehen'?",
    correctAnswer: "bestanden",
  },
  {
    id: 12,
    type: 'fillBlank',
    question: "Was ist das Partizip II von 'sich freuen'?",
    correctAnswer: "sich gefreut",
  },
  {
    id: 13,
    type: 'fillBlank',
    question: "Was ist das Partizip II von 'sich entscheiden'?",
    correctAnswer: "sich entschieden",
  },
  {
    id: 14,
    type: 'fillBlank',
    question: "Was ist das Partizip II von 'mitlaufen'?",
    correctAnswer: "mitgelaufen",
  },
  {
    id: 15,
    type: 'multipleChoice',
    question: "Was ist richtig?",
    options: [
      "Ich habe die Prüfung bestehen.",
      "Ich habe die Prüfung bestanden.",
      "Ich bin die Prüfung bestanden.",
      "Ich habe die Prüfung gebesteht."
    ],
    correctAnswer: 1,
  },
  {
    id: 16,
    type: 'multipleChoice',
    question: "Was ist richtig?",
    options: [
      "Wir haben uns gut unterhalten.",
      "Wir sind uns gut unterhalten.",
      "Wir haben uns gut geunterhalten.",
      "Wir unterhalten gehabt."
    ],
    correctAnswer: 0,
  },
  {
    id: 17,
    type: 'multipleChoice',
    question: "Was ist richtig?",
    options: [
      "Ich bin nach Kiel gewohnt.",
      "Ich habe mich an das Leben gewöhnt.",
      "Ich bin mich an das Leben gewöhnt.",
      "Ich habe mich an das Leben gewohnt."
    ],
    correctAnswer: 1,
  },
  {
    id: 18,
    type: 'multipleChoice',
    question: "Was ist richtig?",
    options: [
      "Die Kieler Woche hat im Juni stattgefunden.",
      "Die Kieler Woche ist im Juni stattgefunden.",
      "Die Kieler Woche hat im Juni gestattgefunden.",
      "Die Kieler Woche findet ge."
    ],
    correctAnswer: 0,
  }
];`;

testContent = testContent.replace(/\];\s*export default function KapitelTest4/, newQuestions + '\n\nexport default function KapitelTest4');

fs.writeFileSync(testPath, testContent, 'utf8');
console.log("Patched Kapitel 4 successfully");
