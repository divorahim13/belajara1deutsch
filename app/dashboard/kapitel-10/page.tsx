"use client";

import ChapterTemplate from '../components/ChapterTemplate';
import LesenInteraktiv10 from '../LesenInteraktiv10';
import HorenInteraktiv10 from '../HorenInteraktiv10';
import UebungInteraktiv10 from '../UebungInteraktiv10';
import GrammatikInteraktiv10 from '../GrammatikInteraktiv10';
import KapitelTest10 from '../KapitelTest10';

const kapitel = {
  nummer: 10,
  titel: 'Zusammen leben',
  untertitel: 'Wohnen, Nachbarn, Bitten, Beschwerden, Wechselpräpositionen, Umzug, Haustiere und Tiergeschichten',
  level: 'A2',
  goetheFokus: ['Lesen', 'Hören', 'Schreiben', 'Sprechen'],
  beschreibung: "Belajar berbicara tentang tempat tinggal dan hidup bersama, meminta bantuan, menyampaikan keluhan, meminta maaf, menjelaskan posisi benda dengan Wechselpräpositionen, mempersiapkan pesta, memahami pengalaman pindahan, menceritakan masa lalu dengan als dan wenn, berbicara tentang hewan peliharaan, bereaksi terhadap informasi, serta menulis dan memperbaiki cerita."
};

const wortschatz = [
  { de: "der Wohnort", plural: "die Wohnorte", id: "tempat tinggal", beispiel: "Mein Wohnort ist Berlin.", kategorie: "Wohnen" },
  { de: "die Wohnform", plural: "die Wohnformen", id: "bentuk/tempat tinggal", beispiel: "Es gibt viele Wohnformen.", kategorie: "Wohnen" },
  { de: "das Zuhause", plural: "Sg.", id: "rumah/tempat tinggal", beispiel: "Ich bin gern zu Hause.", kategorie: "Wohnen" },
  { de: "der Bauernhof", plural: "die Bauernhöfe", id: "rumah pertanian/peternakan", beispiel: "Er lebt auf einem Bauernhof.", kategorie: "Wohnen" },
  { de: "der Bauer", plural: "die Bauern", id: "petani laki-laki", beispiel: "Der Bauer hat viele Tiere.", kategorie: "Wohnen" },
  { de: "die Bäuerin", plural: "die Bäuerinnen", id: "petani perempuan", beispiel: "Die Bäuerin arbeitet hart.", kategorie: "Wohnen" },
  { de: "die Ferienwohnung", plural: "die Ferienwohnungen", id: "apartemen liburan", beispiel: "Wir mieten eine Ferienwohnung.", kategorie: "Wohnen" },
  { de: "das Hausboot", plural: "die Hausboote", id: "rumah perahu", beispiel: "Sie wohnt auf einem Hausboot.", kategorie: "Wohnen" },
  { de: "die Insel", plural: "die Inseln", id: "pulau", beispiel: "Ich lebe auf einer Insel.", kategorie: "Wohnen" },
  { de: "die Wohnung", plural: "die Wohnungen", id: "apartemen", beispiel: "Meine Wohnung ist klein.", kategorie: "Wohnen" },
  { de: "das Zimmer", plural: "die Zimmer", id: "kamar", beispiel: "Das Zimmer ist möbliert.", kategorie: "Wohnen" },
  { de: "die WG", plural: "die WGs", id: "tempat tinggal bersama", beispiel: "Ich wohne in einer WG.", kategorie: "Wohnen" },
  { de: "die Terrasse", plural: "die Terrassen", id: "teras", beispiel: "Wir sitzen auf der Terrasse.", kategorie: "Wohnen" },
  { de: "das Bad", plural: "die Bäder", id: "kamar mandi", beispiel: "Das Bad ist neu.", kategorie: "Haus" },
  { de: "das Wohnzimmer", plural: "die Wohnzimmer", id: "ruang tamu", beispiel: "Wir essen im Wohnzimmer.", kategorie: "Haus" },
  { de: "das Schlafzimmer", plural: "die Schlafzimmer", id: "kamar tidur", beispiel: "Das Schlafzimmer ist ruhig.", kategorie: "Haus" },
  { de: "die Küche", plural: "die Küchen", id: "dapur", beispiel: "Wir kochen in der Küche.", kategorie: "Haus" },
  { de: "der Hof", plural: "die Höfe", id: "halaman", beispiel: "Die Kinder spielen im Hof.", kategorie: "Haus" },
  { de: "der Stadtrand", plural: "die Stadtränder", id: "pinggir kota", beispiel: "Wir wohnen am Stadtrand.", kategorie: "Wohnen" },
  { de: "die Stadt", plural: "die Städte", id: "kota", beispiel: "Die Stadt ist groß.", kategorie: "Wohnen" },
  { de: "der Bewohner", plural: "die Bewohner", id: "penghuni laki-laki", beispiel: "Der Bewohner ist nett.", kategorie: "Zusammenleben" },
  { de: "die Bewohnerin", plural: "die Bewohnerinnen", id: "penghuni perempuan", beispiel: "Die Bewohnerin hilft mir.", kategorie: "Zusammenleben" },
  { de: "der Mitbewohner", plural: "die Mitbewohner", id: "teman serumah laki-laki", beispiel: "Mein Mitbewohner kocht gut.", kategorie: "Zusammenleben" },
  { de: "die Mitbewohnerin", plural: "die Mitbewohnerinnen", id: "teman serumah perempuan", beispiel: "Meine Mitbewohnerin ist Studentin.", kategorie: "Zusammenleben" },
  { de: "der Mieter", plural: "die Mieter", id: "penyewa laki-laki", beispiel: "Der Mieter zahlt die Miete.", kategorie: "Wohnen" },
  { de: "die Mieterin", plural: "die Mieterinnen", id: "penyewa perempuan", beispiel: "Die Mieterin zieht ein.", kategorie: "Wohnen" },
  { de: "der Erwachsene", plural: "die Erwachsenen", id: "orang dewasa laki-laki", beispiel: "Der Erwachsene liest.", kategorie: "Zusammenleben" },
  { de: "die Erwachsene", plural: "die Erwachsenen", id: "orang dewasa perempuan", beispiel: "Die Erwachsene arbeitet.", kategorie: "Zusammenleben" },
  { de: "das Kind", plural: "die Kinder", id: "anak", beispiel: "Das Kind spielt.", kategorie: "Familie" },
  { de: "die Nebenkosten", plural: "Pl.", id: "biaya tambahan", beispiel: "Die Nebenkosten sind hoch.", kategorie: "Wohnen" },
  { de: "der Umzug", plural: "die Umzüge", id: "pindahan", beispiel: "Der Umzug ist morgen.", kategorie: "Umzug" },
  { de: "die Kiste", plural: "die Kisten", id: "kotak", beispiel: "Ich packe die Kisten.", kategorie: "Umzug" },
  { de: "die Lage", plural: "die Lagen", id: "lokasi", beispiel: "Die Lage ist zentral.", kategorie: "Stadt" },
  { de: "der Gefallen", plural: "die Gefallen", id: "bantuan", beispiel: "Tust du mir einen Gefallen?", kategorie: "Nachbarn" },
  { de: "die Bitte", plural: "die Bitten", id: "permintaan", beispiel: "Ich habe eine Bitte.", kategorie: "Nachbarn" },
  { de: "die Beschwerde", plural: "die Beschwerden", id: "keluhan", beispiel: "Er hat eine Beschwerde.", kategorie: "Nachbarn" },
  { de: "die Entschuldigung", plural: "die Entschuldigungen", id: "permintaan maaf", beispiel: "Ich bitte um Entschuldigung.", kategorie: "Nachbarn" },
  { de: "der Lärm", plural: "Sg.", id: "kebisingan", beispiel: "Der Lärm ist zu laut.", kategorie: "Nachbarn" },
  { de: "das Haustier", plural: "die Haustiere", id: "hewan peliharaan", beispiel: "Hast du ein Haustier?", kategorie: "Tiere" },
  { de: "die Katze", plural: "die Katzen", id: "kucing", beispiel: "Die Katze schläft.", kategorie: "Tiere" },
  { de: "das Kätzchen", plural: "die Kätzchen", id: "kucing kecil", beispiel: "Das Kätzchen ist süß.", kategorie: "Tiere" },
  { de: "der Hund", plural: "die Hunde", id: "anjing", beispiel: "Der Hund bellt.", kategorie: "Tiere" },
  { de: "der Fisch", plural: "die Fische", id: "ikan", beispiel: "Der Fisch schwimmt.", kategorie: "Tiere" },
  { de: "die Ratte", plural: "die Ratten", id: "tikus", beispiel: "Die Ratte ist klein.", kategorie: "Tiere" },
  { de: "das Schwein", plural: "die Schweine", id: "babi", beispiel: "Das Schwein ist rosa.", kategorie: "Tiere" },
  { de: "der Vogel", plural: "die Vögel", id: "burung", beispiel: "Der Vogel singt.", kategorie: "Tiere" },
  { de: "der Hase", plural: "die Hasen", id: "kelinci", beispiel: "Der Hase springt.", kategorie: "Tiere" },
  { de: "das Schaf", plural: "die Schafe", id: "domba", beispiel: "Das Schaf frisst Gras.", kategorie: "Tiere" },
  { de: "der Bär", plural: "die Bären", id: "beruang", beispiel: "Der Bär ist groß.", kategorie: "Tiere" },
  { de: "das Futter", plural: "Sg.", id: "makanan hewan", beispiel: "Das Futter ist leer.", kategorie: "Tiere" }
];

const partizipZwei = [
  { infinitiv: "leben", partizip: "gelebt", hilfsverb: "haben", id: "tinggal/hidup" },
  { infinitiv: "wohnen", partizip: "gewohnt", hilfsverb: "haben", id: "tinggal" },
  { infinitiv: "bitten", partizip: "gebeten", hilfsverb: "haben", id: "meminta" },
  { infinitiv: "gießen", partizip: "gegossen", hilfsverb: "haben", id: "menyiram" },
  { infinitiv: "bellen", partizip: "gebellt", hilfsverb: "haben", id: "menggonggong" },
  { infinitiv: "packen", partizip: "gepackt", hilfsverb: "haben", id: "mengepak" },
  { infinitiv: "kündigen", partizip: "gekündigt", hilfsverb: "haben", id: "mengundurkan diri/membatalkan" },
  { infinitiv: "sich verabschieden", partizip: "sich verabschiedet", hilfsverb: "haben", id: "berpamitan" },
  { infinitiv: "sich anmelden", partizip: "sich angemeldet", hilfsverb: "haben", id: "mendaftar" },
  { infinitiv: "fehlen", partizip: "gefehlt", hilfsverb: "haben", id: "kurang/tidak ada" },
  { infinitiv: "mailen", partizip: "gemailt", hilfsverb: "haben", id: "mengirim email" },
  { infinitiv: "sich verirren", partizip: "sich verirrt", hilfsverb: "haben", id: "tersesat" },
  { infinitiv: "reden", partizip: "geredet", hilfsverb: "haben", id: "berbicara" },
  { infinitiv: "verbessern", partizip: "verbessert", hilfsverb: "haben", id: "memperbaiki" },
  { infinitiv: "verschwinden", partizip: "verschwunden", hilfsverb: "sein", id: "menghilang" },
  { infinitiv: "glauben", partizip: "geglaubt", hilfsverb: "haben", id: "percaya" },
  { infinitiv: "weggeben", partizip: "weggegeben", hilfsverb: "haben", id: "memberikan/menyerahkan" },
  { infinitiv: "füttern", partizip: "gefüttert", hilfsverb: "haben", id: "memberi makan" },
  { infinitiv: "aufmachen", partizip: "aufgemacht", hilfsverb: "haben", id: "membuka" },
  { infinitiv: "weglaufen", partizip: "weggelaufen", hilfsverb: "sein", id: "kabur/berlari pergi" },
  { infinitiv: "einziehen", partizip: "eingezogen", hilfsverb: "sein", id: "pindah masuk" }
];

const grammatik = [
  {
    titel: 'Wechselpräpositionen',
    name: 'Wo? vs Wohin?',
    farbe: 'border-l-amber-500 bg-amber-50 text-amber-900',
    erklaerung: 'Wechselpräpositionen (in, an, auf, neben, zwischen, vor, hinter, über, unter) verwenden den Dativ bei Positionsangaben (Wo?) und den Akkusativ bei Richtungsangaben (Wohin?).',
    struktur: 'Wo? + Dativ (liegen, stehen, hängen) | Wohin? + Akkusativ (legen, stellen, hängen)',
    konjugationsTabelle: null,
    beispiele: [
      { 
        de: 'Der Laptop steht auf dem Tisch.', 
        id: 'Laptop itu berada di atas meja (Wo? -> Dativ).', 
        highlight: 'auf dem Tisch' 
      },
      { 
        de: 'Eva stellt den Laptop auf den Tisch.', 
        id: 'Eva meletakkan laptop di atas meja (Wohin? -> Akkusativ).', 
        highlight: 'auf den Tisch' 
      }
    ],
  },
  {
    titel: 'Nebensätze der Zeit',
    name: 'als vs wenn',
    farbe: 'border-l-emerald-500 bg-emerald-50 text-emerald-900',
    erklaerung: '"als" digunakan untuk kejadian masa lalu yang hanya terjadi satu kali (einmaliges Ereignis in der Vergangenheit). "wenn" digunakan untuk kejadian masa lalu yang terjadi berulang-ulang ("immer wenn") atau kejadian di masa sekarang.',
    struktur: 'Als/Wenn + Subjekt + ... + Verb am Ende',
    konjugationsTabelle: null,
    beispiele: [
      { 
        de: 'Als Melly ein Zeugnis gefehlt hat, hat ihre Mutter es geschickt.', 
        id: 'Ketika sebuah sertifikat kurang bagi Melly, ibunya mengirimkannya (Sekali di masa lalu).', 
        highlight: 'Als Melly ein Zeugnis gefehlt hat' 
      },
      { 
        de: 'Immer wenn Melly Zeit hatte, waren Lena und Noah nicht da.', 
        id: 'Selalu ketika Melly punya waktu, Lena dan Noah tidak ada (Berulang di masa lalu).', 
        highlight: 'Immer wenn Melly Zeit hatte' 
      }
    ],
  }
];

const goetheTasks = [
  {
    skill: 'Lesen',
    icon: '📖',
    farbe: 'bg-emerald-100 text-emerald-700',
    tasks: [
      { text: 'Informationen zur Wohnsituation verstehen', type: 'Detailverständnis' },
      { text: 'Erfahrungsberichte in E-Mails verstehen', type: 'Globalverständnis' },
    ]
  },
  {
    skill: 'Hören',
    icon: '🎧',
    farbe: 'bg-indigo-100 text-indigo-700',
    tasks: [
      { text: 'Ein Gespräch über Haustiere verstehen', type: 'Selektives Hören' },
      { text: 'Meinungen zu Wohnorten und Beschwerden hören', type: 'Detailverständnis' },
    ]
  },
  {
    skill: 'Schreiben / Sprechen',
    icon: '🗣️',
    farbe: 'bg-rose-100 text-rose-700',
    tasks: [
      { text: 'Um einen Gefallen bitten und sich beschweren', type: 'Produktion' },
      { text: 'Eine Tiergeschichte schreiben (als/wenn)', type: 'Interaktion' },
    ]
  }
];

const lernTipps = [
  {
    nummer: 1,
    titel: 'Verben für Wo vs Wohin',
    icon: '💡',
    farbe: 'bg-indigo-100 text-indigo-600',
    beschreibung: 'Lernen Sie die Verb-Paare: stehen (Wo?) vs stellen (Wohin?), liegen (Wo?) vs legen (Wohin?).',
    tag: 'Grammatik'
  },
  {
    nummer: 2,
    titel: 'als oder wenn?',
    icon: '🧠',
    farbe: 'bg-emerald-100 text-emerald-600',
    beschreibung: 'Erinnern Sie sich: Einmal in der Vergangenheit = als. Öfter in der Vergangenheit = (immer) wenn.',
    tag: 'Grammatik'
  },
  {
    nummer: 3,
    titel: 'Redemittel Nachbarn',
    icon: '📝',
    farbe: 'bg-rose-100 text-rose-600',
    beschreibung: 'Merken Sie sich höfliche Bitten: "Könnten Sie mir bitte einen Gefallen tun?"',
    tag: 'Sprechen'
  }
];

const miniQuiz = [
  {
    frage: 'Welches Wort ist richtig? "___ ich 6 Jahre alt war, bin ich zur Schule gegangen."',
    options: ['Als', 'Wenn', 'Weil', 'Deshalb'],
    besteAntwort: 0
  },
  {
    frage: 'Ergänzen Sie: "Ich lege das Buch auf ___ Tisch."',
    options: ['dem', 'den', 'der', 'die'],
    besteAntwort: 1
  },
  {
    frage: 'Wie reagieren Sie auf eine Beschwerde höflich?',
    options: [
      'Das ist mir egal.',
      'Das tut mir leid. Das kommt nicht mehr vor.',
      'Was gibt es?',
      'Könnten Sie mir einen Gefallen tun?'
    ],
    besteAntwort: 1
  }
];

export default function Kapitel10Page() {
  return (
    <ChapterTemplate 
      kapitelId="kapitel-10"
      kapitel={kapitel}
      wortschatz={wortschatz}
      partizipZwei={partizipZwei}
      grammatik={grammatik}
      goetheTasks={goetheTasks}
      lernTipps={lernTipps}
      miniQuiz={miniQuiz}
      
      LesenComponent={<LesenInteraktiv10 />}
      HorenComponent={<HorenInteraktiv10 />}
      SchreibenComponent={<UebungInteraktiv10 />}
      GrammatikInteraktivComponent={<GrammatikInteraktiv10 />}
      TestComponent={<KapitelTest10 />}
    />
  );
}
