'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import ProgressTracker from '../ProgressTracker';

// Placeholder components to prevent build errors before actual implementation
import KapitelTest3 from '../KapitelTest3';
import { LesenInteraktiv3 } from '../LesenInteraktiv3';
import { HorenInteraktiv3 } from '../HorenInteraktiv3';
import { UebungInteraktiv3 } from '../UebungInteraktiv3';
import { GrammatikInteraktiv3 } from './GrammatikInteraktiv3';
import ChapterTemplate from '../components/ChapterTemplate';

// ============================================================
// DATA: Netzwerk Neu A2 – Kapitel 3: Immer online?
// ============================================================

const kapitel = {
  nummer: 3,
  titel: 'Immer online?',
  untertitel: 'Medien, Kommunikation & Film',
  level: 'A2',
  goetheFokus: ['Lesen', 'Hören', 'Schreiben', 'Sprechen'],
};

const wortschatz: { de: string; plural?: string; id: string; beispiel: string; kategorie: string }[] = [
  // Medien und Geräte
  { de: 'das Handy / das Smartphone', plural: '-s', id: 'handphone / ponsel pintar', beispiel: 'Mein Handy ist immer an.', kategorie: 'Medien & Geräte' },
  { de: 'der Computer / der Laptop', plural: '-s', id: 'komputer / laptop', beispiel: 'Ich arbeite viel am Laptop.', kategorie: 'Medien & Geräte' },
  { de: 'das Tablet', plural: '-s', id: 'tablet', beispiel: 'Das Tablet ist leichter als der Laptop.', kategorie: 'Medien & Geräte' },
  { de: 'das E-Book', plural: '-s', id: 'buku elektronik', beispiel: 'Ein E-Book ist praktisch für den Urlaub.', kategorie: 'Medien & Geräte' },
  { de: 'der E-Book-Reader', plural: '-', id: 'alat pembaca e-book', beispiel: 'Auf dem E-Book-Reader habe ich viele Bücher.', kategorie: 'Medien & Geräte' },
  { de: 'die Spielekonsole', plural: '-n', id: 'konsol game', beispiel: 'Wir spielen gern an der Spielekonsole.', kategorie: 'Medien & Geräte' },
  { de: 'der Bildschirm', plural: '-e', id: 'layar / monitor', beispiel: 'Der Bildschirm ist sehr groß.', kategorie: 'Medien & Geräte' },
  { de: 'die Tastatur', plural: '-en', id: 'keyboard / papan tik', beispiel: 'Die Tastatur ist neu.', kategorie: 'Medien & Geräte' },
  { de: 'die Maus', plural: '"-e', id: 'mouse / tetikus', beispiel: 'Ich brauche eine neue Maus.', kategorie: 'Medien & Geräte' },
  { de: 'das Kabel', plural: '-', id: 'kabel', beispiel: 'Das Kabel ist zu kurz.', kategorie: 'Medien & Geräte' },
  { de: 'der Drucker', plural: '-', id: 'printer', beispiel: 'Der Drucker funktioniert nicht.', kategorie: 'Medien & Geräte' },
  { de: 'der Lautsprecher', plural: '-', id: 'speaker', beispiel: 'Der Lautsprecher ist sehr laut.', kategorie: 'Medien & Geräte' },
  { de: 'die VR-Brille', plural: '-n', id: 'kacamata VR', beispiel: 'Ich möchte eine VR-Brille ausprobieren.', kategorie: 'Medien & Geräte' },
  
  // Aktivitäten mit Medien
  { de: 'chatten', id: 'mengobrol daring (chat)', beispiel: 'Ich chatte oft mit meinen Freunden.', kategorie: 'Online-Aktivitäten' },
  { de: 'posten', id: 'memposting', beispiel: 'Postest du manchmal etwas?', kategorie: 'Online-Aktivitäten' },
  { de: 'teilen', id: 'membagikan', beispiel: 'Ich mag es, Fotos zu teilen.', kategorie: 'Online-Aktivitäten' },
  { de: 'downloaden / herunterladen', id: 'mengunduh', beispiel: 'Du kannst die App herunterladen.', kategorie: 'Online-Aktivitäten' },
  { de: 'hochladen', id: 'mengunggah', beispiel: 'Er hat zu viele Fotos hochgeladen.', kategorie: 'Online-Aktivitäten' },
  { de: 'weiterleiten', id: 'meneruskan (forward)', beispiel: 'Kannst du mir die Mail weiterleiten?', kategorie: 'Online-Aktivitäten' },
  { de: 'löschen', id: 'menghapus', beispiel: 'Ich habe das Foto gelöscht.', kategorie: 'Online-Aktivitäten' },
  { de: 'speichern', id: 'menyimpan', beispiel: 'Bitte speichern Sie das Dokument.', kategorie: 'Online-Aktivitäten' },
  { de: 'anklicken', id: 'mengklik', beispiel: 'Du musst auf den Link anklicken.', kategorie: 'Online-Aktivitäten' },
  { de: 'kopieren', id: 'menyalin', beispiel: 'Ich kopiere den Text.', kategorie: 'Online-Aktivitäten' },
  { de: 'bloggen', id: 'membuat blog', beispiel: 'Sie bloggt über ihre Reisen.', kategorie: 'Online-Aktivitäten' },
  { de: 'checken', id: 'mengecek', beispiel: 'Ich muss meine Mails checken.', kategorie: 'Online-Aktivitäten' },
  { de: 'recherchieren', id: 'meriset / mencari info', beispiel: 'Wir recherchieren im Internet.', kategorie: 'Online-Aktivitäten' },
  { de: 'telefonieren', id: 'menelepon', beispiel: 'Ich möchte lieber telefonieren.', kategorie: 'Online-Aktivitäten' },

  // Meinung & Kommunikation
  { de: 'die Umfrage', plural: '-n', id: 'survei / jajak pendapat', beispiel: 'Wir machen eine Umfrage.', kategorie: 'Meinung & Kommunikation' },
  { de: 'kommentieren', id: 'mengomentari', beispiel: 'Viele Leute kommentieren das Foto.', kategorie: 'Meinung & Kommunikation' },
  { de: 'meinen', id: 'berpendapat / bermaksud', beispiel: 'Ich meine, dass das falsch ist.', kategorie: 'Meinung & Kommunikation' },
  { de: 'mitteilen', id: 'memberitahu', beispiel: 'Ich muss dir etwas mitteilen.', kategorie: 'Meinung & Kommunikation' },
  { de: 'kritisch', id: 'kritis', beispiel: 'Ich sehe das sehr kritisch.', kategorie: 'Meinung & Kommunikation' },
  { de: 'peinlich', id: 'memalukan', beispiel: 'Das Foto war mir sehr peinlich.', kategorie: 'Meinung & Kommunikation' },
  { de: 'blöd', id: 'bodoh / konyol', beispiel: 'Das ist eine blöde Idee.', kategorie: 'Meinung & Kommunikation' },
  { de: 'privat', id: 'pribadi', beispiel: 'Das ist mein privates Leben.', kategorie: 'Meinung & Kommunikation' },
  { de: 'dass', id: 'bahwa', beispiel: 'Ich finde, dass das gut ist.', kategorie: 'Meinung & Kommunikation' },
  { de: 'der Vergleich', plural: '-e', id: 'perbandingan', beispiel: 'Der Vergleich ist interessant.', kategorie: 'Meinung & Kommunikation' },

  // Kino und Filme
  { de: 'die Komödie', plural: '-n', id: 'film komedi', beispiel: 'Ich lache gern bei einer Komödie.', kategorie: 'Kino & Filme' },
  { de: 'der Actionfilm', plural: '-e', id: 'film aksi', beispiel: 'Ich mag Actionfilme sehr.', kategorie: 'Kino & Filme' },
  { de: 'der Thriller', plural: '-', id: 'film menegangkan (thriller)', beispiel: 'Der Thriller war extrem spannend.', kategorie: 'Kino & Filme' },
  { de: 'der Liebesfilm', plural: '-e', id: 'film romantis', beispiel: 'Das ist ein schöner Liebesfilm.', kategorie: 'Kino & Filme' },
  { de: 'der Krimi', plural: '-s', id: 'film kriminal', beispiel: 'Wir sehen jeden Sonntag einen Krimi.', kategorie: 'Kino & Filme' },
  { de: 'der Fantasy-Film', plural: '-e', id: 'film fantasi', beispiel: 'Harry Potter ist ein Fantasy-Film.', kategorie: 'Kino & Filme' },
  { de: 'die Handlung', plural: '-en', id: 'alur cerita / plot', beispiel: 'Die Handlung ist nicht logisch.', kategorie: 'Kino & Filme' },
  { de: 'die Hauptperson', plural: '-en', id: 'pemeran utama', beispiel: 'Wer ist die Hauptperson?', kategorie: 'Kino & Filme' },
  { de: 'der Regisseur', plural: '-e', id: 'sutradara', beispiel: 'Er ist ein bekannter Regisseur.', kategorie: 'Kino & Filme' },
  { de: 'die Filmmusik', id: 'musik latar film', beispiel: 'Die Filmmusik war toll.', kategorie: 'Kino & Filme' },
  { de: 'der Trailer', plural: '-', id: 'cuplikan film', beispiel: 'Hast du den Trailer schon gesehen?', kategorie: 'Kino & Filme' },
  { de: 'der Humor', id: 'humor', beispiel: 'Er hat viel Humor.', kategorie: 'Kino & Filme' },
  { de: 'der Witz', plural: '-e', id: 'lelucon / candaan', beispiel: 'Die Witze waren nicht lustig.', kategorie: 'Kino & Filme' },
  { de: 'logisch', id: 'masuk akal / logis', beispiel: 'Die Geschichte ist logisch.', kategorie: 'Kino & Filme' },
  { de: 'real', id: 'nyata', beispiel: 'Der Film soll real wirken.', kategorie: 'Kino & Filme' },

  // Weitere wichtige Wörter
  { de: 'das Start-Up', plural: '-s', id: 'perusahaan rintisan', beispiel: 'Sie gründen ein Start-Up.', kategorie: 'Weitere Begriffe' },
  { de: 'gründen', id: 'mendirikan', beispiel: 'Er möchte eine Firma gründen.', kategorie: 'Weitere Begriffe' },
  { de: 'programmieren', id: 'memprogram', beispiel: 'Wir programmieren eine App.', kategorie: 'Weitere Begriffe' },
  { de: 'ausprobieren', id: 'mencoba', beispiel: 'Ich will das Spiel ausprobieren.', kategorie: 'Weitere Begriffe' },
  { de: 'die Freundschaft', plural: '-en', id: 'persahabatan', beispiel: 'Freundschaft ist wichtig.', kategorie: 'Weitere Begriffe' },
  { de: 'die Kindheit', id: 'masa kecil', beispiel: 'Der Film zeigt seine Kindheit.', kategorie: 'Weitere Begriffe' },
  { de: 'das Schicksal', plural: '-e', id: 'takdir / nasib', beispiel: 'Das war Schicksal.', kategorie: 'Weitere Begriffe' },
  { de: 'die Sorge', plural: '-n', id: 'kekhawatiran', beispiel: 'Mach dir keine Sorgen.', kategorie: 'Weitere Begriffe' },
  { de: 'sterben', id: 'meninggal', beispiel: 'Seine Mutter ist früh gestorben.', kategorie: 'Weitere Begriffe' },
  { de: 'tot', id: 'mati', beispiel: 'Der Hund ist leider tot.', kategorie: 'Weitere Begriffe' },
  { de: 'plötzlich', id: 'tiba-tiba', beispiel: 'Plötzlich war alles anders.', kategorie: 'Weitere Begriffe' },
  { de: 'überhaupt', id: 'sama sekali', beispiel: 'Das hat mir überhaupt nicht gefallen.', kategorie: 'Weitere Begriffe' },
  { de: 'unbedingt', id: 'harus / sangat ingin', beispiel: 'Ich wollte unbedingt Fotograf werden.', kategorie: 'Weitere Begriffe' },
  { de: 'lachen', id: 'tertawa', beispiel: 'Im Kino möchte ich lachen.', kategorie: 'Weitere Begriffe' },
  { de: 'weinen', id: 'menangis', beispiel: 'Der Film ist zum Weinen.', kategorie: 'Weitere Begriffe' },
];

const komparativZwei: { adjektiv: string; komparativ: string; superlativ: string; id: string }[] = [
  { adjektiv: 'klein', komparativ: 'kleiner', superlativ: 'am kleinsten', id: 'kecil' },
  { adjektiv: 'schnell', komparativ: 'schneller', superlativ: 'am schnellsten', id: 'cepat' },
  { adjektiv: 'praktisch', komparativ: 'praktischer', superlativ: 'am praktischsten', id: 'praktis' },
  { adjektiv: 'schön', komparativ: 'schöner', superlativ: 'am schönsten', id: 'indah / bagus' },
  { adjektiv: 'billig', komparativ: 'billiger', superlativ: 'am billigsten', id: 'murah' },
  // Umlaut
  { adjektiv: 'groß', komparativ: 'größer', superlativ: 'am größten', id: 'besar' },
  { adjektiv: 'alt', komparativ: 'älter', superlativ: 'am ältesten', id: 'tua' },
  { adjektiv: 'lang', komparativ: 'länger', superlativ: 'am längsten', id: 'panjang' },
  { adjektiv: 'kurz', komparativ: 'kürzer', superlativ: 'am kürzesten', id: 'pendek' },
  { adjektiv: 'dumm', komparativ: 'dümmer', superlativ: 'am dümmsten', id: 'bodoh' },
  // Akhiran khusus (-te, -er/-el)
  { adjektiv: 'teuer', komparativ: 'teurer', superlativ: 'am teuersten', id: 'mahal' },
  { adjektiv: 'leicht', komparativ: 'leichter', superlativ: 'am leichtesten', id: 'ringan / mudah' },
  // Irregular
  { adjektiv: 'gut', komparativ: 'besser', superlativ: 'am besten', id: 'baik' },
  { adjektiv: 'gern', komparativ: 'lieber', superlativ: 'am liebsten', id: 'suka' },
  { adjektiv: 'viel', komparativ: 'mehr', superlativ: 'am meisten', id: 'banyak' },
  { adjektiv: 'nah', komparativ: 'näher', superlativ: 'am nächsten', id: 'dekat' }
];

const grammatik = [
  {
    titel: 'Komparativ (Tingkat Lebih)',
    farbe: 'indigo',
    erklaerung: 'Digunakan untuk membandingkan dua hal yang berbeda (Lebih ... dari). Dibentuk dengan menambahkan akhiran -er pada kata sifat.',
    tiefenErklaerung: 'Dalam bahasa Jerman, untuk membandingkan dua hal (Komparativ), kita menggunakan pola: "Adjektiv-er + als". Perlu diperhatikan bahwa banyak kata sifat bersuku kata pendek (seperti groß, alt, lang) akan mendapatkan umlaut (ä, ö, ü) pada tingkat komparatif. Selain itu, ada juga kata sifat yang sepenuhnya tidak beraturan (gut -> besser, gern -> lieber, viel -> mehr). Jika membandingkan dua hal yang "SAMA", kita tidak menggunakan akhiran -er, melainkan pola "genauso + Adjektiv + wie".',
    struktur: 'Perbandingan beda: [Adjektiv-er] + als | Perbandingan sama: genauso [Adjektiv] + wie',
    konjugationsTabelle: {
      headers: ['Pola', 'Positiv (Biasa)', 'Komparativ (Lebih)'],
      rows: [
        ['Reguler', 'klein / schnell', 'kleiner / schneller'],
        ['Umlaut', 'groß / alt / lang', 'größer / älter / länger'],
        ['Akhiran -e hilang', 'teuer / dunkel', 'teurer / dunkler'],
        ['Irreguler', 'gut / gern / viel', 'besser / lieber / mehr'],
      ]
    },
    beispiele: [
      { satz: 'Das Tablet ist praktischer als der Laptop.', terjemahan: 'Tablet lebih praktis daripada laptop.' },
      { satz: 'Mein Bruder ist älter als ich.', terjemahan: 'Kakak laki-laki saya lebih tua dari saya. (alt -> älter)' },
      { satz: 'Der Laptop ist genauso teuer wie das Smartphone.', terjemahan: 'Laptop sama mahalnya dengan smartphone. (genauso ... wie)' },
    ],
    mehrBeispiele: [
      { satz: 'Ich spreche besser Englisch als Deutsch.', terjemahan: 'Saya berbicara bahasa Inggris lebih baik daripada bahasa Jerman. (gut -> besser)' },
      { satz: 'Ein E-Book ist meistens billiger als ein Buch.', terjemahan: 'Sebuah e-book biasanya lebih murah daripada sebuah buku cetak.' },
      { satz: 'Der Laptop ist nicht so leicht wie das Tablet.', terjemahan: 'Laptop tidak seringan tablet. (nicht so ... wie)' }
    ],
    falle: 'Kesalahan umum: Menggunakan kata hubung bahasa Inggris "than" atau "then" dalam Jerman (✗ besser dann). Selalu gunakan "als" untuk tingkat lebih, dan "wie" untuk tingkat sama.',
  },
  {
    titel: 'Superlativ (Tingkat Paling)',
    farbe: 'emerald',
    erklaerung: 'Digunakan untuk mengekspresikan tingkatan tertinggi dari sebuah kata sifat (Paling ... / Ter-...). Dibentuk dengan "am + Adjektiv-sten".',
    tiefenErklaerung: 'Superlativ menunjukkan titik tertinggi. Rumus standarnya adalah "am ...-sten". Jika kata sifat diakhiri dengan huruf d, t, s, ss, ß, z, maka ditambahkan sisipan "e" (menjadi -esten) agar mudah diucapkan, contohnya "kurz" menjadi "am kürzesten", atau "leicht" menjadi "am leichtesten". Sama seperti komparatif, kata sifat pendek akan mendapatkan umlaut.',
    struktur: 'am + [Adjektiv-sten] (Contoh: am schnellsten)',
    konjugationsTabelle: {
      headers: ['Positiv', 'Komparativ (Lebih)', 'Superlativ (Paling)'],
      rows: [
        ['schön (indah)', 'schöner', 'am schönsten'],
        ['kurz (pendek)', 'kürzer', 'am kürzesten (tambah "e")'],
        ['gut (baik)', 'besser', 'am besten (irreguler)'],
        ['gern (suka)', 'lieber', 'am liebsten (irreguler)'],
        ['viel (banyak)', 'mehr', 'am meisten (irreguler)'],
        ['nah (dekat)', 'näher', 'am nächsten (irreguler)'],
      ]
    },
    beispiele: [
      { satz: 'Das ist am wichtigsten.', terjemahan: 'Itu adalah hal yang paling penting.' },
      { satz: 'Ich bin am liebsten draußen in der Natur.', terjemahan: 'Saya paling suka berada di luar, di alam. (gern -> lieber -> am liebsten)' },
      { satz: 'Dieser Film ist am spannendsten.', terjemahan: 'Film ini adalah yang paling menegangkan.' },
    ],
    mehrBeispiele: [
      { satz: 'Die Schauspielerin ist am bekanntesten für ihre Rolle im Tatort.', terjemahan: 'Aktris itu paling terkenal karena perannya di Tatort.' },
      { satz: 'Der Gepard ist das schnellste Tier. Er rennt am schnellsten.', terjemahan: 'Cheetah adalah hewan tercepat. Dia berlari paling cepat.' }
    ],
    falle: 'Jangan lupakan preposisi "am" sebelum superlativ saat dia berdiri sendiri sebagai predikat/keterangan! (Contoh salah: ✗ Das ist besten. Benar: ✓ Das ist am besten).',
  },
  {
    titel: 'Nebensatz mit "dass" (Anak Kalimat)',
    farbe: 'violet',
    erklaerung: 'Digunakan untuk menyatakan pendapat, perasaan, atau fakta setelah koma. Kata hubung "dass" (bahwa) memaksa kata kerja utama pindah ke paling akhir.',
    tiefenErklaerung: 'Sama seperti "weil", kata hubung "dass" menciptakan "Nebensatz" (anak kalimat). Hukum utama anak kalimat dalam bahasa Jerman adalah: Kata Kerja Terkonjugasi Harus Berada di Posisi Terakhir (Verb am Ende). Preposisi ini sering digunakan setelah kalimat ungkapan pendapat seperti "Ich finde, dass...", "Ich denke, dass...", atau "Es ist wichtig, dass...".',
    struktur: 'Induk Kalimat , dass + Subjek + ... + Verb Terkonjugasi.',
    konjugationsTabelle: null,
    beispiele: [
      { satz: 'Ich finde es sehr gut, dass man immer Kontakt mit Freunden hat.', terjemahan: 'Saya merasa sangat bagus, bahwa orang selalu memiliki kontak dengan teman.' },
      { satz: 'Meinen Freunden hat gefallen, dass ich Fotos gepostet habe.', terjemahan: 'Teman-teman saya suka, bahwa saya memposting foto.' },
      { satz: 'Susanna sagt, dass das Internet viel Zeit kostet.', terjemahan: 'Susanna berkata, bahwa internet menghabiskan banyak waktu.' },
    ],
    mehrBeispiele: [
      { satz: 'Ich möchte, dass sie mich anruft.', terjemahan: 'Saya ingin, bahwa dia menelepon saya. (Kata kerja anrufen tidak dipisah di akhir kalimat)' },
      { satz: 'Ich mag es nicht, dass meine Freunde so viel posten.', terjemahan: 'Saya tidak suka, bahwa teman-teman saya terlalu banyak memposting.' },
      { satz: 'Es ist wichtig, dass wir uns oft treffen.', terjemahan: 'Penting, bahwa kita sering bertemu.' }
    ],
    falle: 'Kesalahan posisi kata kerja (Verb Position Error) dan kata kerja yang dapat dipisah (Trennbare Verben). Saat trennbare verben ditaruh di paling belakang di Nebensatz, bagian awalan dan intinya tetap menyatu! (Contoh salah: ✗ dass sie mich ruft an. Benar: ✓ dass sie mich anruft).',
  }
];

const goetheTasks = [
  {
    skill: 'Lesen',
    icon: '📖',
    farbe: 'sky',
    tasks: [
      {
        typ: 'Meinungen im Internet verstehen',
        beschreibung: 'Lesen Sie die Kommentare. Wer sagt was? Richtig oder Falsch?',
        übung: 'Lesen Sie den Text von Nadica und antworten Sie.',
        text: 'Nadica Horvat: "Ich finde es toll, dass man Freunde schnell informieren kann. Aber das Handy muss nicht immer an sein. Man muss nicht jede Party posten. Das ist oft peinlich!"',
        frage: '1. Nadica findet es gut, dass man Freunde leicht erreichen kann. 2. Sie postet gern viele Partyfotos.',
        antwort: '1. Richtig (Sie findet es toll, Freunde schnell zu informieren). 2. Falsch (Sie findet es peinlich, jede Party zu posten).',
      },
    ],
  },
  {
    skill: 'Schreiben',
    icon: '✍️',
    farbe: 'amber',
    tasks: [
      {
        typ: 'Einen Kommentar schreiben',
        beschreibung: 'Mögen Sie Filme? Wenn ja, welche? Wenn nein, warum nicht? Schreiben Sie einen kurzen Kommentar (ca. 20-30 Wörter).',
        übung: 'Nutzen Sie Nebensätze mit "dass" und Komparativ/Superlativ.',
        text: 'Schreiben Sie Ihre Meinung zu Filmen im Internet-Forum.',
        frage: 'Schreiben Sie Ihren Text hier.',
        antwort: 'Beispiel: Ich sehe am liebsten Komödien. Ich finde, dass das Leben schon stressig genug ist. Deshalb möchte ich im Kino lachen. Actionfilme finde ich langweiliger als Komödien.',
      },
    ],
  },
  {
    skill: 'Hören',
    icon: '🎧',
    farbe: 'rose',
    tasks: [
      {
        typ: 'Radiosendung: Immer online?',
        beschreibung: 'Was sagen die Personen im Radio? Kreuzen Sie an.',
        übung: 'Hören Sie zu und ergänzen Sie.',
        text: 'Sprecher 1: "Ich finde es sehr wichtig, dass ich meine Mails überall checken kann."\nSprecher 2: "Ich mag es nicht, dass meine Freunde immer auf das Smartphone schauen."',
        frage: 'Wer sagt was? 1. ... checkt Mails unterwegs. 2. ... ist genervt von Smartphones.',
        antwort: '1. Sprecher 1. 2. Sprecher 2.',
      },
    ],
  },
  {
    skill: 'Sprechen',
    icon: '🗣️',
    farbe: 'violet',
    tasks: [
      {
        typ: 'Vergleiche formulieren & Interview',
        beschreibung: 'Vergleichen Sie verschiedene Geräte und Medien. Sagen Sie Ihre Meinung.',
        übung: 'Sprechen Sie mit Ihrem Partner über Vor- und Nachteile.',
        text: 'Verwenden Sie Komparativ: "praktischer als", "nicht so groß wie", "am besten".',
        frage: 'Was ist besser: Laptop oder Tablet?',
        antwort: 'Beispiel: Ich finde, dass ein Tablet viel praktischer ist als ein Laptop. Es ist leichter und man kann es überall mitnehmen. Aber zum Arbeiten ist ein Laptop am besten.',
      },
    ],
  },
];

const lernTipps = [
  {
    nummer: 1,
    titel: 'Vergleiche visualisieren',
    icon: '📊',
    farbe: 'indigo',
    beschreibung: 'Buat tabel 3 kolom untuk Adjektiv, Komparativ, dan Superlativ. Warna yang berbeda bantu otak mengingat pola irreguler.',
    tag: 'Grammatik Hack',
  },
  {
    nummer: 2,
    titel: 'Nebensatz-Training',
    icon: '🔄',
    farbe: 'violet',
    beschreibung: 'Selalu lafalkan kalimat dengan "dass" secara lantang, beri penekanan keras pada kata kerja yang dilempar ke paling akhir (Verb-Ende).',
    tag: 'Aussprache',
  },
  {
    nummer: 3,
    titel: 'Echte Kommentare lesen',
    icon: '📱',
    farbe: 'emerald',
    beschreibung: 'Ubah bahasa di HP-mu ke Jerman. Baca komentar YouTube/Instagram bahasa Jerman untuk membiasakan dengan ungkapan sosial (Denglisch).',
    tag: 'Immersives Lernen',
  },
];

// ── COLOR MAPS ──


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
      kapitelId="kapitel-3"
      kapitel={kapitel}
      wortschatz={wortschatz}
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
