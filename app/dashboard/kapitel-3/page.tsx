'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import ProgressTracker from '../ProgressTracker';

// Placeholder components to prevent build errors before actual implementation
import KapitelTest3 from '../KapitelTest3';
import { LesenInteraktiv3 } from '../LesenInteraktiv3';
import { HorenInteraktiv3 } from '../HorenInteraktiv3';
import { UebungInteraktiv3 } from '../UebungInteraktiv3';
import { GrammatikInteraktiv3 } from './GrammatikInteraktiv3';

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
  { de: 'die Meinung', plural: '-en', id: 'pendapat', beispiel: 'Was ist deine Meinung?', kategorie: 'Meinung & Kommunikation' },
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
  { de: 'spannend', id: 'menegangkan / seru', beispiel: 'Der Film war sehr spannend.', kategorie: 'Kino & Filme' },
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

const kategorieStyles: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  'Online-Aktivitäten': { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-300', dot: 'bg-blue-500' },
  'Medien & Geräte': { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-300', dot: 'bg-amber-500' },
  'Meinung & Kommunikation': { bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-300', dot: 'bg-indigo-500' },
  'Kino & Filme': { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-300', dot: 'bg-rose-500' },
  'Weitere Begriffe': { bg: 'bg-slate-50', text: 'text-slate-800', border: 'border-slate-300', dot: 'bg-slate-500' },
  'Alltag': { bg: 'bg-teal-50', text: 'text-teal-800', border: 'border-teal-300', dot: 'bg-teal-500' },
};

const grammatikStyles: Record<string, { header: string; card: string; accent: string }> = {
  indigo: { header: 'bg-indigo-600 text-white', card: 'bg-indigo-50 border-indigo-200', accent: 'bg-indigo-600' },
  violet: { header: 'bg-violet-600 text-white', card: 'bg-violet-50 border-violet-200', accent: 'bg-violet-600' },
  emerald: { header: 'bg-emerald-600 text-white', card: 'bg-emerald-50 border-emerald-200', accent: 'bg-emerald-600' },
  blue: { header: 'bg-blue-600 text-white', card: 'bg-blue-50 border-blue-200', accent: 'bg-blue-600' },
};

const goetheStyles: Record<string, { header: string; border: string; bg: string; btn: string }> = {
  amber: { header: 'bg-amber-500 text-white', border: 'border-amber-300', bg: 'bg-amber-50', btn: 'text-amber-700' },
  emerald: { header: 'bg-emerald-600 text-white', border: 'border-emerald-300', bg: 'bg-emerald-50', btn: 'text-emerald-700' },
  sky: { header: 'bg-sky-500 text-white', border: 'border-sky-300', bg: 'bg-sky-50', btn: 'text-sky-700' },
  rose: { header: 'bg-rose-500 text-white', border: 'border-rose-300', bg: 'bg-rose-50', btn: 'text-rose-700' },
  violet: { header: 'bg-violet-600 text-white', border: 'border-violet-300', bg: 'bg-violet-50', btn: 'text-violet-700' },
};

const lernTippStyles: Record<string, string> = {
  indigo: 'from-indigo-600 to-indigo-400',
  violet: 'from-violet-600 to-violet-400',
  emerald: 'from-emerald-600 to-emerald-400',
};

// ── FLASHCARD COMPONENT ──
function FlashCard({ wort }: { wort: typeof wortschatz[0] }) {
  const [flipped, setFlipped] = useState(false);
  const style = kategorieStyles[wort.kategorie] || kategorieStyles['Alltag'];

  return (
    <div className="relative" style={{ perspective: '1000px', height: '190px' }}>
      <div
        className="w-full h-full transition-transform duration-500 cursor-pointer flip-card-inner"
        style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)', position: 'relative' }}
        onClick={() => setFlipped(!flipped)}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 clay-card p-5 flex flex-col justify-between bg-white flip-card-face`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className="flex justify-between items-start gap-2">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg border ${style.bg} ${style.text} ${style.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
              {wort.kategorie}
            </span>
            <span className="text-xs text-slate-400 font-medium flex-shrink-0">Klik balik →</span>
          </div>
          <div className="text-center px-2 flex-1 flex flex-col justify-center items-center">
            <p className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">{wort.de}</p>
            {wort.plural && (
              <p className="text-[11px] font-bold text-slate-500 mt-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm leading-none">
                Pl: {wort.plural}
              </p>
            )}
          </div>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 clay-card p-5 flex flex-col justify-center flip-card-face ${style.bg}`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center">
            <p className={`text-xs font-bold uppercase tracking-widest ${style.text} opacity-80`}>{wort.de}</p>
            <p className={`text-xl font-extrabold ${style.text}`}>{wort.id}</p>
            <div className={`mt-2 pt-2 border-t w-full ${style.border}`}>
              <p className={`text-xs italic opacity-85 ${style.text} leading-relaxed`}>„{wort.beispiel}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── GRAMMATIK CARD COMPONENT ──
function GrammatikKarte({ gram }: { gram: any }) {
  const [showFalle, setShowFalle] = useState(false);
  const [showTiefe, setShowTiefe] = useState(false);
  const [showMehr, setShowMehr] = useState(false);
  const s = grammatikStyles[gram.farbe] || grammatikStyles.indigo;

  return (
    <div className="clay-card overflow-hidden">
      <div className={`p-5 ${s.header}`}>
        <h3 className="text-xl font-extrabold">{gram.name || gram.titel}</h3>
        <p className="text-sm mt-1 opacity-90">{gram.erklärung || gram.erklaerung}</p>
      </div>
      <div className="p-5 space-y-4 bg-white">
        {/* Deep Explanation Toggle */}
        <button
          onClick={() => setShowTiefe(!showTiefe)}
          className={`w-full text-left p-3 bg-white border-2 border-slate-200 rounded-xl text-slate-700 font-bold text-sm cursor-pointer hover:bg-slate-50 transition-colors flex justify-between items-center`}
        >
          <span>🧠 Penjelasan Mendalam (Linguistik)</span>
          <span className="text-xl leading-none">{showTiefe ? '−' : '+'}</span>
        </button>
        {showTiefe && (
          <div className="p-4 bg-slate-50 rounded-xl border-2 border-slate-200 text-sm text-slate-800 leading-relaxed shadow-inner">
            <span className="font-extrabold text-indigo-700 block mb-2">Menggali Lebih Dalam:</span>
            {gram.tiefenErklaerung}
          </div>
        )}

        {/* Struktur */}
        <div className={`rounded-xl border-2 p-3 font-mono text-sm ${s.card} text-slate-800`}>
          <span className="text-xs font-bold text-slate-500 block mb-1 uppercase tracking-wide">Struktur</span>
          {gram.struktur}
        </div>

        {/* KonjugationsTabelle */}
        {gram.konjugationsTabelle && (
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mt-4">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-xs">
                <tr>
                  {gram.konjugationsTabelle.headers.map((h: string, i: number) => (
                    <th key={i} className="px-4 py-3 border-b border-slate-200">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {gram.konjugationsTabelle.rows.map((row: string[], i: number) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    {row.map((cell: string, j: number) => (
                      <td key={j} className={`px-4 py-3 ${j === 0 ? 'font-bold text-slate-800' : 'text-slate-600'}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Beispiele */}
        <div className="space-y-2 mt-4">
          <span className="text-xs font-bold text-slate-500 block uppercase tracking-wide mb-2">Contoh Kalimat</span>
          {gram.beispiele.map((b: any, i: number) => (
            <div key={i} className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className={`w-6 h-6 rounded-full ${s.accent} text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5`}>{i + 1}</span>
              <div>
                <p className="font-bold text-slate-900 text-sm">{b.satz}</p>
                <p className="text-xs text-slate-600 mt-0.5">{b.terjemahan}</p>
              </div>
            </div>
          ))}
          
          {gram.mehrBeispiele && (
            <>
              {showMehr && gram.mehrBeispiele.map((b: any, i: number) => (
                <div key={`mehr-${i}`} className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl border border-slate-200 animate-in fade-in duration-300">
                  <span className={`w-6 h-6 rounded-full ${s.accent} text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 opacity-60`}>{gram.beispiele.length + i + 1}</span>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{b.satz}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{b.terjemahan}</p>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => setShowMehr(!showMehr)}
                className="w-full py-2 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors mt-2"
              >
                {showMehr ? 'Sembunyikan Contoh Tambahan ▲' : 'Lihat Lebih Banyak Contoh ▼'}
              </button>
            </>
          )}
        </div>
        {/* Falle */}
        <button
          onClick={() => setShowFalle(!showFalle)}
          className="w-full text-left p-3 bg-red-50 border-2 border-red-300 rounded-xl text-red-700 font-bold text-sm cursor-pointer hover:bg-red-100 transition-colors mt-4"
        >
          ⚠️ Häufige Fehler {showFalle ? '▲' : '▼'}
        </button>
        {showFalle && (
          <div className="p-3 bg-red-50 rounded-xl border-2 border-red-300 text-sm text-red-800">
            {gram.falle}
          </div>
        )}
      </div>
    </div>
  );
}

// ── GOETHE TASK CARD ──
function GoetheTaskKarte({ task }: { task: typeof goetheTasks[0] }) {
  const [showAntwort, setShowAntwort] = useState(false);
  const s = goetheStyles[task.farbe] || goetheStyles.amber;

  return (
    <div className={`clay-card bg-white overflow-hidden border-2 ${s.border}`}>
      <div className={`p-4 flex items-center gap-3 ${s.header}`}>
        <span className="text-2xl">{task.icon}</span>
        <div>
          <p className="font-extrabold text-lg">{task.skill}</p>
          <p className="text-xs opacity-90">{task.tasks[0].typ}</p>
        </div>
        <span className="ml-auto text-xs font-bold opacity-80 bg-white/20 px-2 py-1 rounded-lg">Goethe A2</span>
      </div>
      <div className={`p-5 space-y-4 ${s.bg}`}>
        <p className="text-sm text-slate-700">{task.tasks[0].beschreibung}</p>
        <div className="bg-white rounded-xl border-2 border-slate-200 p-4 text-sm text-slate-800 whitespace-pre-line leading-relaxed font-mono">
          {task.tasks[0].text}
        </div>
        <div className="p-3 bg-white rounded-xl border-2 border-slate-200 text-sm font-bold text-slate-800">
          ❓ {task.tasks[0].frage}
        </div>
        <button
          onClick={() => setShowAntwort(!showAntwort)}
          className="clay-button clay-button-secondary w-full text-center cursor-pointer"
        >
          {showAntwort ? '▲ Sembunyikan Jawaban' : '▼ Lihat Jawaban / Tips'}
        </button>
        {showAntwort && (
          <div className="p-4 bg-green-50 rounded-xl border-2 border-green-300 text-sm text-green-900">
            <span className="font-extrabold text-green-700 block mb-1">✅ Contoh Jawaban:</span>
            {task.tasks[0].antwort}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// WORTSCHATZ GAME COMPONENT
// ============================================================
function WortschatzGame() {
  const [queue, setQueue] = useState<any[]>([]);
  const [question, setQuestion] = useState<any>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const startGame = useCallback(() => {
    const shuffled = [...wortschatz].sort(() => Math.random() - 0.5);
    setQueue(shuffled);
    setQuestion(shuffled[0]);
    setCorrectCount(0);
    setWrongCount(0);
    setStreak(0);
    setStatus('idle');
    setInputVal('');
    setIsFinished(false);
  }, []);

  useEffect(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    if (status === 'idle') {
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [status, question]);

  if (isFinished) {
    return (
      <div className="clay-card p-10 bg-indigo-950 text-white max-w-2xl mx-auto space-y-6 text-center border-4 border-emerald-500 shadow-2xl">
        <div className="text-6xl mb-4">🏆</div>
        <h3 className="text-3xl md:text-4xl font-black text-emerald-400">Luar Biasa!</h3>
        <p className="text-lg text-indigo-200">Anda telah berhasil mengetik dan menguasai <b className="text-white">{correctCount}</b> kosakata di sesi ini.</p>
        <button 
          onClick={startGame}
          className="mt-8 bg-indigo-500 hover:bg-indigo-400 text-white font-black text-xl px-10 py-4 rounded-2xl border-b-4 border-indigo-700 active:border-b-0 active:translate-y-1 shadow-lg transition-all"
        >
          🔄 Main Ulang
        </button>
      </div>
    );
  }

  if (!question) return null;

  const umlauts = ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'];

  const handleUmlaut = (char: string) => {
    if (status !== 'idle') return;
    setInputVal(prev => prev + char);
    inputRef.current?.focus();
  };

  const handleCheck = () => {
    if (status !== 'idle') return;
    if (!inputVal.trim()) return;

    const cleanInput = inputVal.trim().toLowerCase();
    const cleanTarget = question.de.replace(/\s*\(.*?\)\s*/g, '').trim().toLowerCase();
    
    // Strict comparison without fallback to withoutArticle!
    // But allow either part of "der Computer / der Laptop"
    const targets = cleanTarget.split(' / ');
    const isCorrect = targets.includes(cleanInput);

    if (isCorrect) {
       setStatus('correct');
       setCorrectCount(c => c + 1);
       setStreak(s => s + 1);
    } else {
       setStatus('wrong');
       setWrongCount(c => c + 1);
       setStreak(0);
    }
  };

  const handleNext = () => {
    if (status === 'idle') return;
    
    if (status === 'correct') {
      const newQueue = queue.slice(1);
      setQueue(newQueue);
      if (newQueue.length > 0) {
        setQuestion(newQueue[0]);
      } else {
        setIsFinished(true);
      }
    } else {
      // Salah: masukkan kembali ke antrean paling belakang!
      const current = queue[0];
      const newQueue = [...queue.slice(1), current];
      setQueue(newQueue);
      setQuestion(newQueue[0]);
    }
    
    setStatus('idle');
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'idle') {
      handleCheck();
    } else {
      handleNext();
    }
  };

  return (
    <div className="clay-card p-4 sm:p-6 md:p-8 bg-indigo-950 text-white max-w-2xl mx-auto space-y-6 border-4 border-indigo-800">
      
      {/* HEADER: TITLE / SCORES */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-xl md:text-2xl font-black text-indigo-100 flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <span>🎮</span> Recall 
          <span className="text-xs px-2 py-1 bg-indigo-800 rounded font-bold uppercase tracking-wider text-indigo-300">
            Sisa: {queue.length} Kata
          </span>
        </h3>
        <div className="flex gap-3 justify-center">
          <div className="bg-emerald-500 border-2 border-emerald-400 text-white px-5 py-2 rounded-2xl flex flex-col items-center shadow-lg shadow-emerald-900/50">
            <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-emerald-100">Benar</span>
            <span className="text-xl md:text-2xl font-black leading-none mt-1">{correctCount}</span>
          </div>
          <div className="bg-rose-500 border-2 border-rose-400 text-white px-5 py-2 rounded-2xl flex flex-col items-center shadow-lg shadow-rose-900/50">
            <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-rose-100">Salah</span>
            <span className="text-xl md:text-2xl font-black leading-none mt-1">{wrongCount}</span>
          </div>
        </div>
      </div>
      
      {streak >= 3 && (
        <div className="text-center">
          <div className="bg-orange-500/20 border-2 border-orange-500/50 text-orange-300 px-4 py-1.5 rounded-full inline-block text-sm font-bold shadow-lg animate-pulse">
             🔥 Streak: {streak} Benar Berturut-turut!
          </div>
        </div>
      )}

      {/* QUESTION BOX */}
      <div className="py-8 sm:py-10 px-4 sm:px-6 bg-indigo-900 rounded-3xl border-b-4 border-indigo-950 shadow-inner text-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
         <p className="text-xs sm:text-sm font-extrabold text-indigo-300 mb-2 uppercase tracking-widest">Apa bahasa Jermannya?</p>
         <h4 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">{question.id}</h4>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* INPUT AND UMLAUTS */}
        <div className="space-y-4">
          <div className="flex justify-center gap-1.5 sm:gap-2 flex-wrap">
            {umlauts.map(u => (
              <button 
                key={u}
                type="button"
                onClick={() => handleUmlaut(u)}
                disabled={status !== 'idle'}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-800 hover:bg-indigo-700 disabled:opacity-30 border-b-4 border-indigo-900 rounded-xl text-lg sm:text-xl font-bold transition-all active:border-b-0 active:translate-y-1 shadow-sm text-indigo-100"
              >
                {u}
              </button>
            ))}
          </div>
          
          <input 
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={status !== 'idle'}
            placeholder="Ketik bahasa Jerman..."
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            className="w-full bg-white text-indigo-950 font-black text-2xl md:text-3xl p-4 md:p-6 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-400 disabled:opacity-80 text-center transition-all shadow-inner"
          />
        </div>

        {/* STATUS & ACTION BUTTON */}
        {status === 'idle' ? (
          <button 
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-400 border-b-4 border-indigo-700 text-white font-black text-xl py-4 rounded-2xl transition-all active:border-b-0 active:translate-y-1 shadow-lg"
          >
            Cek Jawaban
          </button>
        ) : status === 'correct' ? (
          <div className="space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="bg-emerald-100 border-2 border-emerald-400 text-emerald-900 p-6 rounded-2xl text-center shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400"></div>
              <p className="font-black text-xl text-emerald-600 mb-4 tracking-wider uppercase">🎉 Tepat Sekali!</p>
              
              <div className="space-y-2">
                <p className="font-black text-3xl md:text-4xl text-emerald-800">{question.de}</p>
                <p className="text-lg md:text-xl font-bold text-emerald-600/80">{question.id}</p>
              </div>
              
              <div className="mt-6 pt-4 border-t-2 border-emerald-200/50">
                <p className="text-sm md:text-base font-semibold italic text-emerald-700/90 leading-relaxed">
                  "{question.beispiel}"
                </p>
              </div>
            </div>
            <button 
              type="submit"
              autoFocus
              className="w-full bg-emerald-500 hover:bg-emerald-400 border-b-4 border-emerald-700 text-white font-black text-xl py-4 rounded-2xl transition-all active:border-b-0 active:translate-y-1 shadow-lg focus:ring-4 focus:ring-emerald-300 outline-none"
            >
              Lanjut (Enter)
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in zoom-in duration-300">
            <div className="bg-rose-100 border-2 border-rose-400 text-rose-900 p-6 rounded-2xl text-center shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-rose-400"></div>
              <p className="font-black text-xl text-rose-600 mb-4 tracking-wider uppercase">❌ Salah</p>
              
              <div className="space-y-2">
                <p className="font-black text-3xl md:text-4xl text-rose-800">{question.de}</p>
                <p className="text-lg md:text-xl font-bold text-rose-600/80">{question.id}</p>
              </div>
              
              <div className="mt-6 pt-4 border-t-2 border-rose-200/50">
                <p className="text-sm md:text-base font-semibold italic text-rose-700/90 leading-relaxed">
                  "{question.beispiel}"
                </p>
              </div>
              
              <div className="mt-4 bg-rose-200/50 inline-block px-3 py-1 rounded-md">
                <p className="text-xs font-bold text-rose-600 uppercase tracking-widest">Akan Diulang Nanti</p>
              </div>
            </div>
            <button 
              type="submit"
              autoFocus
              className="w-full bg-rose-500 hover:bg-rose-400 border-b-4 border-rose-700 text-white font-black text-xl py-4 rounded-2xl transition-all active:border-b-0 active:translate-y-1 shadow-lg focus:ring-4 focus:ring-rose-300 outline-none"
            >
              Mengerti, Lanjut (Enter)
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

// Grammatik Game for Komparativ & Superlativ
function KomparativGame() {
  const [queue, setQueue] = useState<any[]>([]);
  const [question, setQuestion] = useState<any>(null);
  const [masteredCount, setMasteredCount] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [mistakes, setMistakes] = useState<any[]>([]);
  const [komparativInput, setKomparativInput] = useState('');
  const [superlativInput, setSuperlativInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);

  const umlauts = ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'];

  const handleUmlaut = (char: string) => {
    if (status !== 'idle') return;
    // Insert into the currently active input if possible, default to first
    if (document.activeElement === inputRef2.current) {
        setSuperlativInput(prev => prev + char);
        inputRef2.current?.focus();
    } else {
        setKomparativInput(prev => prev + char);
        inputRef1.current?.focus();
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem('komparativ_mistakes');
    if (saved) {
      try {
        setMistakes(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse mistakes", e);
      }
    }
  }, []);

  const startGame = useCallback((customList?: any[]) => {
    const source = customList || komparativZwei;
    const shuffled = [...source].sort(() => Math.random() - 0.5);
    setQueue(shuffled);
    setQuestion(shuffled[0]);
    setMasteredCount(0);
    setTotalWords(source.length);
    setWrongCount(0);
    setKomparativInput('');
    setSuperlativInput('');
    setStatus('idle');
    setIsFinished(false);
    
    setTimeout(() => inputRef1.current?.focus(), 100);
  }, []);

  const clearMistakes = () => {
    setMistakes([]);
    localStorage.removeItem('komparativ_mistakes');
  };

  useEffect(() => {
    startGame();
  }, [startGame]);

  const handleNext = () => {
    if (status === 'correct') {
      const newQueue = queue.slice(1);
      setQueue(newQueue);
      setMasteredCount(prev => prev + 1);
      if (newQueue.length > 0) {
        setQuestion(newQueue[0]);
      } else {
        setIsFinished(true);
      }
    } else {
      const current = queue[0];
      const newQueue = [...queue.slice(1), current];
      setQueue(newQueue);
      setQuestion(newQueue[0]);
    }
    setStatus('idle');
    setKomparativInput('');
    setSuperlativInput('');
    setTimeout(() => inputRef1.current?.focus(), 50);
  };

  const handleCheck = () => {
    if (!komparativInput.trim() || !superlativInput.trim()) return;

    const isKCorrect = komparativInput.trim().toLowerCase() === question.komparativ.toLowerCase();
    const isSCorrect = superlativInput.trim().toLowerCase() === question.superlativ.toLowerCase();

    if (isKCorrect && isSCorrect) {
      setStatus('correct');
    } else {
      setStatus('wrong');
      setWrongCount(c => c + 1);
      if (!mistakes.find(m => m.adjektiv === question.adjektiv)) {
        const newMistakes = [...mistakes, question];
        setMistakes(newMistakes);
        localStorage.setItem('komparativ_mistakes', JSON.stringify(newMistakes));
      }
    }
  };

  if (isFinished) {
    return (
      <div className="clay-card p-6 md:p-10 bg-orange-950 text-white max-w-2xl mx-auto space-y-8 border-4 border-orange-500 shadow-2xl">
        <div className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-3xl md:text-4xl font-black text-orange-400">Sesi Selesai!</h3>
          <p className="text-lg text-orange-100 mt-2">
            Kamu menguasai <span className="text-white font-black">{masteredCount}</span> kata sifat!
          </p>
        </div>

        {mistakes.length > 0 ? (
          <div className="space-y-4">
            <div className="bg-orange-900/50 rounded-2xl p-5 border-2 border-orange-800">
              <h4 className="text-sm font-black text-orange-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span>📝</span> Daftar Kata yang Perlu Diperbaiki:
              </h4>
              <div className="grid gap-2 text-sm">
                {mistakes.map((m, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-orange-800 last:border-0">
                    <div>
                      <span className="font-black text-white">{m.adjektiv}</span>
                    </div>
                    <div className="font-bold text-orange-200">
                      {m.komparativ} / {m.superlativ}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={() => startGame(mistakes)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-4 rounded-2xl shadow-lg transition-all active:translate-y-1"
              >
                🛠️ Latih Kata Salah ({mistakes.length})
              </button>
              <button 
                onClick={clearMistakes}
                className="bg-slate-700 hover:bg-slate-600 text-white font-black px-6 py-4 rounded-2xl shadow-lg transition-all active:translate-y-1"
              >
                🗑️ Hapus Kesalahan
              </button>
            </div>
            <button 
                onClick={() => startGame()}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black px-6 py-4 rounded-2xl shadow-lg transition-all active:translate-y-1"
              >
                🔄 Main dari Awal
              </button>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="bg-emerald-500/20 border-2 border-emerald-500 p-6 rounded-2xl">
              <p className="text-xl font-black text-emerald-400">✨ SEMPURNA! ✨</p>
              <p className="text-sm text-emerald-100 mt-1">Tidak ada kesalahan. Kemampuan grammar-mu luar biasa!</p>
            </div>
            <button 
              onClick={() => startGame()}
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black px-10 py-5 rounded-2xl shadow-lg transition-all"
            >
              🔄 Main Lagi
            </button>
          </div>
        )}
      </div>
    );
  }

  if (!question) return null;

  const progressPercent = totalWords > 0 ? Math.round((masteredCount / totalWords) * 100) : 0;

  return (
    <div className="clay-card p-6 bg-orange-950 text-white max-w-2xl mx-auto space-y-6 border-4 border-orange-900">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-black text-orange-100 italic">⏳ Komparativ Recall</h3>
        <div className="flex gap-2">
          {mistakes.length > 0 && (
            <span className="text-xs font-bold bg-rose-600 border border-rose-400 px-3 py-1 rounded-full text-white shadow shadow-rose-900/50">
              Sulit: {mistakes.length}
            </span>
          )}
          <span className="text-xs font-bold bg-orange-800 border border-orange-700 px-3 py-1 rounded-full text-orange-200">
            Dikuasai: {masteredCount}/{totalWords}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-orange-900 rounded-full h-3 border border-orange-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="py-10 bg-orange-900 rounded-3xl text-center border-b-4 border-orange-950">
        <p className="text-xs font-bold text-orange-300 uppercase tracking-widest mb-2">Tulis Komparativ & Superlativ dari:</p>
        <h4 className="text-4xl font-black">{question.adjektiv}</h4>
        <p className="text-orange-200 mt-1 font-medium italic">({question.id})</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center gap-1.5 sm:gap-2 flex-wrap">
          {umlauts.map(u => (
            <button 
              key={u}
              type="button"
              onClick={() => handleUmlaut(u)}
              disabled={status !== 'idle'}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-800 hover:bg-orange-700 disabled:opacity-30 border-b-4 border-orange-900 rounded-xl text-lg sm:text-xl font-bold transition-all active:border-b-0 active:translate-y-1 shadow-sm text-orange-100"
            >
              {u}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="text-xs font-bold text-orange-300 uppercase ml-2 mb-1 block">Komparativ (Lebih)</label>
                <input
                ref={inputRef1}
                type="text"
                value={komparativInput}
                onChange={(e) => setKomparativInput(e.target.value)}
                disabled={status !== 'idle'}
                placeholder="z.B. besser"
                className="w-full bg-white text-orange-950 font-black text-xl p-4 rounded-2xl outline-none text-center shadow-inner focus:ring-4 focus:ring-orange-400"
                onKeyDown={(e) => {
                    if(e.key === 'Enter' && status === 'idle') {
                        e.preventDefault();
                        inputRef2.current?.focus();
                    } else if (e.key === 'Enter') handleNext();
                }}
                />
            </div>
            <div>
                <label className="text-xs font-bold text-orange-300 uppercase ml-2 mb-1 block">Superlativ (Paling)</label>
                <input
                ref={inputRef2}
                type="text"
                value={superlativInput}
                onChange={(e) => setSuperlativInput(e.target.value)}
                disabled={status !== 'idle'}
                placeholder="z.B. am besten"
                className="w-full bg-white text-orange-950 font-black text-xl p-4 rounded-2xl outline-none text-center shadow-inner focus:ring-4 focus:ring-orange-400"
                onKeyDown={(e) => e.key === 'Enter' && status === 'idle' ? handleCheck() : e.key === 'Enter' && handleNext()}
                />
            </div>
        </div>

        {status === 'idle' ? (
          <button
            onClick={handleCheck}
            disabled={!komparativInput || !superlativInput}
            className="w-full mt-4 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-black py-4 rounded-2xl border-b-4 border-orange-800 transition-all active:border-b-0 active:translate-y-1"
          >
            Cek Jawaban
          </button>
        ) : (
          <div className={`p-6 mt-4 rounded-2xl text-center border-b-4 ${status === 'correct' ? 'bg-emerald-100 border-emerald-400 text-emerald-900' : 'bg-rose-100 border-rose-400 text-rose-900'}`}>
            <p className="font-black text-xl mb-2">{status === 'correct' ? '🎉 BENAR!' : '❌ SALAH!'}</p>
            <p className="text-2xl font-black">{question.adjektiv} → {question.komparativ} → {question.superlativ}</p>
            <button onClick={handleNext} className={`mt-4 w-full py-3 rounded-xl font-black text-white ${status === 'correct' ? 'bg-emerald-600' : 'bg-rose-600'}`}>
              Lanjut (Enter)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function KapitelDreiPage() {
  const [activeTab, setActiveTab] = useState<'wortschatz' | 'grammatik' | 'komparativ' | 'lesen' | 'horen' | 'uebung' | 'wiederholung' | 'strategie' | 'game' | 'test'>('wortschatz');
  const [katFilter, setKatFilter] = useState<string>('Alle');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const kategorien = ['Alle', ...Array.from(new Set(wortschatz.map(w => w.kategorie)))];
  const filteredWords = katFilter === 'Alle' ? wortschatz : wortschatz.filter(w => w.kategorie === katFilter);
  const totalPages = Math.ceil(filteredWords.length / itemsPerPage);
  const currentWords = filteredWords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const [komparativPage, setKomparativPage] = useState<number>(1);
  const komparativItemsPerPage = 8;
  const totalKomparativPages = Math.ceil(komparativZwei.length / komparativItemsPerPage);
  const currentKomparativItems = komparativZwei.slice((komparativPage - 1) * komparativItemsPerPage, komparativPage * komparativItemsPerPage);

  // Steps ordered by learning science
  const steps = [
    { id: 'wortschatz',  label: 'Wortschatz',   icon: '💬', phase: 1 as const, count: wortschatz.length },
    { id: 'grammatik',   label: 'Grammatik',     icon: '📐', phase: 1 as const, count: grammatik.length },
    { id: 'komparativ',  label: 'Adjektive',     icon: '🚀', phase: 1 as const, count: komparativZwei.length },
    { id: 'wiederholung',label: 'Wiederholung',  icon: '♻️', phase: 1 as const, count: null },
    { id: 'lesen',      label: 'Lesen',         icon: '📖', phase: 2 as const, count: null },
    { id: 'horen',      label: 'Hören',         icon: '🎧', phase: 2 as const, count: null },
    { id: 'uebung',     label: 'Schreiben',     icon: '✍️', phase: 2 as const, count: null },
    { id: 'game',       label: 'Mini Game',     icon: '🎮', phase: 2 as const, count: null },
    { id: 'test',       label: 'Kapiteltest 3', icon: '📝', phase: 3 as const, count: null },
    { id: 'strategie',  label: 'Strategie',     icon: '🧠', phase: 3 as const, count: null },
  ] as const;

  const [activeGameMode, setActiveGameMode] = useState<'wortschatz' | 'komparativ' | null>(null);

  return (
    <div className="relative">
      {/* Decorative Blobs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-sky-200/30 blur-[120px] -z-10 rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-rose-200/30 blur-[120px] -z-10 rounded-full pointer-events-none" />

      {/* ── HERO HEADER ── */}
      <header className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <span className="clay-badge bg-emerald-100 text-emerald-800 border-emerald-300">Level A2</span>
              <span className="clay-badge bg-violet-100 text-violet-800 border-violet-300">Kapitel 3</span>
              <span className="clay-badge bg-amber-100 text-amber-800 border-amber-300">Netzwerk Neu</span>
              <span className="clay-badge bg-rose-100 text-rose-800 border-rose-300">Goethe Ready</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
              {kapitel.nummer}. {kapitel.titel}
              <span className="block text-2xl md:text-3xl font-semibold text-indigo-600 mt-2">{kapitel.untertitel}</span>
            </h1>
            <p className="text-base text-slate-600 font-medium max-w-lg leading-relaxed">
              Belajar tentang perangkat digital, memberikan opini di media sosial, dan membahas film. Penguasaan Komparativ, Superlativ, dan penggunaan Nebensatz dengan "dass".
            </p>
            {/* Goethe Skills */}
            <div className="grid grid-cols-4 gap-2">
              {kapitel.goetheFokus.map(skill => (
                <div key={skill} className="clay-card p-2.5 text-center bg-white">
                  <p className="text-xs font-extrabold text-indigo-700">{skill}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Vokabeln', count: wortschatz.length, icon: '💬', bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-300', num: 'text-amber-600' },
              { label: 'Grammatik', count: grammatik.length, icon: '📐', bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-300', num: 'text-indigo-600' },
              { label: 'Goethe Tasks', count: goetheTasks.length, icon: '🎯', bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-300', num: 'text-rose-600' },
              { label: 'Lern-Tipps', count: lernTipps.length, icon: '🧠', bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-300', num: 'text-emerald-600' },
            ].map(stat => (
              <div key={stat.label} className={`clay-card p-5 text-center ${stat.bg} border-2 ${stat.border}`}>
                <p className="text-3xl mb-1">{stat.icon}</p>
                <p className={`text-4xl font-extrabold ${stat.num}`}>{stat.count}</p>
                <p className={`text-sm font-bold mt-1 ${stat.text}`}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6">
        <ProgressTracker kapitelId="kapitel3" totalSteps={10} currentStepId={activeTab} />
      </div>

      {/* ── LERNPLAN BANNER ── */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div
          className="rounded-[20px] p-5 border-4 border-indigo-900"
          style={{ background: 'linear-gradient(to right, #4F46E5, #0ea5e9)', boxShadow: '6px 6px 0 0 rgba(30,27,75,0.3)' }}
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="text-4xl flex-shrink-0">📅</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-extrabold text-lg text-white">Rencana Belajar 2 Hari — Kapitel 3</h2>
              <p className="text-indigo-100 text-sm mt-1">
                <strong className="text-white">Hari 1 (Pagi):</strong> Flashcard Wortschatz Media & Perangkat · &nbsp;
                <strong className="text-white">Hari 1 (Sore):</strong> Grammatik Komparativ & Superlativ ·{' '}
                <strong className="text-white">Hari 2 (Pagi):</strong> Menulis opini film dengan "dass" ·{' '}
                <strong className="text-white">Hari 2 (Sore):</strong> Latihan Grammatik Game & Review.
              </p>
            </div>
            <div className="flex-shrink-0 text-center bg-white/10 rounded-xl px-5 py-3 border border-white/20">
              <p className="text-4xl font-black text-white">2</p>
              <p className="text-xs text-indigo-200 font-bold">HARI TARGET</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── LEARNING PATH STEPPER ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        {/* Phase Labels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
          {[
            { label: '📥 Fase 1 · Input', color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
            { label: '✏️ Fase 2 · Latihan', color: 'bg-amber-50 border-amber-200 text-amber-700' },
            { label: '📊 Fase 3 · Evaluasi', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
          ].map(f => (
            <div key={f.label} className={`text-center py-1.5 rounded-xl border-2 text-[11px] font-black uppercase tracking-wide ${f.color}`}>
              {f.label}
            </div>
          ))}
        </div>
        {/* Steps */}
        <div className="overflow-x-auto custom-scrollbar pb-2">
          <div className="flex items-center min-w-max gap-0">
            {steps.map((step, i) => {
              const isActive = activeTab === step.id;
              const phaseBtn = ({
                1: isActive ? 'bg-indigo-600 border-indigo-900 text-white shadow-[0_4px_0_0_#312E81]' : 'bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-50 hover:border-indigo-500 shadow-[0_3px_0_0_#a5b4fc]',
                2: isActive ? 'bg-amber-500 border-amber-800 text-white shadow-[0_4px_0_0_#92400e]' : 'bg-white text-amber-700 border-amber-300 hover:bg-amber-50 hover:border-amber-500 shadow-[0_3px_0_0_#fcd34d]',
                3: isActive ? 'bg-emerald-600 border-emerald-900 text-white shadow-[0_4px_0_0_#064e3b]' : 'bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50 hover:border-emerald-500 shadow-[0_3px_0_0_#6ee7b7]',
              } as Record<number,string>)[step.phase];
              const phaseNum = ({
                1: isActive ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700',
                2: isActive ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700',
                3: isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700',
              } as Record<number,string>)[step.phase];
              const connectorColor = step.phase === 1 ? 'bg-indigo-200' : step.phase === 2 ? 'bg-amber-200' : 'bg-emerald-200';
              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setActiveTab(step.id as any)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-2xl font-extrabold text-sm whitespace-nowrap cursor-pointer transition-all duration-200 border-2 ${phaseBtn}`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0 ${phaseNum}`}>{i + 1}</span>
                    <span>{step.icon}</span>
                    <span className="hidden sm:inline">{step.label}</span>
                    {step.count !== null && (
                      <span className={`px-1.5 py-0.5 rounded-full text-[11px] font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>{step.count}</span>
                    )}
                  </button>
                  {i < steps.length - 1 && (
                    <div className={`h-0.5 w-5 flex-shrink-0 ${connectorColor}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-7xl mx-auto px-6 pb-24">

        {/* ── WORTSCHATZ TAB ── */}
        {activeTab === 'wortschatz' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900">Wortschatz-Flashcards</h2>
                <p className="text-slate-600 text-sm mt-1">Klik kartu untuk lihat terjemahan + kalimat contoh. Sistem Leitner Box aktif.</p>
              </div>
              <div className="flex flex-wrap gap-2 sm:max-w-xs">
                {kategorien.map(k => {
                  const s = kategorieStyles[k];
                  return (
                    <button
                      key={k}
                      onClick={() => { setKatFilter(k); setCurrentPage(1); }}
                      className={`px-3 py-1.5 rounded-xl text-sm font-bold cursor-pointer transition-all border-2 ${
                        katFilter === k
                          ? 'bg-indigo-600 text-white border-indigo-900 shadow-[0_2px_0_0_#312E81]'
                          : s
                            ? `${s.bg} ${s.text} ${s.border} hover:opacity-80`
                            : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-400'
                      }`}
                    >
                      {k}
                    </button>
                  );
                })}
              </div>
            </div>

            {filteredWords.length === 0 ? (
              <p className="text-center text-slate-500 py-10">Tidak ada kosakata untuk kategori ini.</p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {currentWords.map((wort, i) => (
                    <FlashCard key={`${wort.de}-${i}`} wort={wort} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center items-center gap-4">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 text-slate-700 font-bold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 transition-all cursor-pointer shadow-[0_2px_0_0_rgba(203,213,225,1)] active:translate-y-0.5 active:shadow-none"
                    >
                      ←
                    </button>
                    <span className="font-bold text-slate-600 text-sm">
                      Halaman {currentPage} dari {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 text-slate-700 font-bold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-600 transition-all cursor-pointer shadow-[0_2px_0_0_rgba(203,213,225,1)] active:translate-y-0.5 active:shadow-none"
                    >
                      →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ── WIEDERHOLUNG TAB ── */}
        {activeTab === 'wiederholung' && (
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Kurz & Klar: Wiederholung</h2>
              <p className="text-slate-600 text-sm mt-1">Pengulangan materi penting dari Kapitel 1 & 2 agar tidak terlupa.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="clay-card p-6 bg-indigo-50 border-2 border-indigo-300">
                <h3 className="text-xl font-extrabold text-indigo-900 mb-3">1. Modalverben im Präteritum</h3>
                <p className="text-slate-700 text-sm mb-3">Ingat: di masa lampau, kata kerja modal <strong>tidak punya umlaut</strong> (ä/ö/ü hilang) dan memakai akhiran <strong>-te</strong>.</p>
                <div className="bg-white p-3 rounded-xl border border-indigo-200">
                  <ul className="text-sm space-y-1 font-medium text-slate-800">
                    <li>• müssen → <strong>musste</strong></li>
                    <li>• können → <strong>konnte</strong></li>
                    <li>• dürfen → <strong>durfte</strong></li>
                    <li>• wollen → <strong>wollte</strong></li>
                  </ul>
                  <p className="mt-2 text-xs italic text-indigo-600">"Mit 18 durfte ich Auto fahren."</p>
                </div>
              </div>

              <div className="clay-card p-6 bg-emerald-50 border-2 border-emerald-300">
                <h3 className="text-xl font-extrabold text-emerald-900 mb-3">2. Dativ-Kasus</h3>
                <p className="text-slate-700 text-sm mb-3">Kasus Dativ sering digunakan setelah kata depan: <strong>aus, bei, mit, nach, seit, von, zu</strong>.</p>
                <div className="bg-white p-3 rounded-xl border border-emerald-200">
                  <ul className="text-sm space-y-1 font-medium text-slate-800">
                    <li>• Maskulin/Neutral: <strong>dem / einem / -m</strong></li>
                    <li>• Feminin: <strong>der / einer / -r</strong></li>
                    <li>• Plural: <strong>den / -n</strong> (+ n di kata bendanya)</li>
                  </ul>
                  <p className="mt-2 text-xs italic text-emerald-600">"Max spielt oft mit seinem Vater Tennis."</p>
                </div>
              </div>

              <div className="clay-card p-6 bg-rose-50 border-2 border-rose-300">
                <h3 className="text-xl font-extrabold text-rose-900 mb-3">3. Warum & Weil</h3>
                <p className="text-slate-700 text-sm mb-3">Anak kalimat yang diawali "weil" memindahkan kata kerja ke belakang (mirip dengan "dass").</p>
                <div className="bg-white p-3 rounded-xl border border-rose-200">
                  <p className="text-sm text-slate-800 font-medium mb-1">
                    <strong>Frage:</strong> Warum bist du zu spät gekommen?
                  </p>
                  <p className="text-sm text-slate-800 font-medium">
                    <strong>Antwort:</strong> Weil der Bus nicht gefahren <u>ist</u>.
                  </p>
                </div>
              </div>

              <div className="clay-card p-6 bg-sky-50 border-2 border-sky-300">
                <h3 className="text-xl font-extrabold text-sky-900 mb-3">4. Genitiv dengan Nama Orang</h3>
                <p className="text-slate-700 text-sm mb-3">Untuk menyatakan kepemilikan nama orang secara kasual, kita cukup menambahkan <strong>-s</strong>.</p>
                <div className="bg-white p-3 rounded-xl border border-sky-200">
                  <ul className="text-sm space-y-2 font-medium text-slate-800">
                    <li>• die Freundin von Marie → <strong>Maries Freundin</strong></li>
                    <li>• der Vater von Ben → <strong>Bens Vater</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── KOMPARATIV TAB ── */}
        {activeTab === 'komparativ' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Komparativ & Superlativ (Adjektive)</h2>
              <p className="text-slate-600 text-sm mt-1">Daftar kata sifat dan perubahannya untuk digunakan dalam perbandingan.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentKomparativItems.map((item, i) => (
                <div key={i} className="clay-card p-5 bg-white border-2 border-orange-100 hover:border-orange-300 transition-all group">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{item.id}</p>
                   <p className="text-xl font-black text-slate-900 mt-1">{item.adjektiv}</p>
                   <div className="mt-3 space-y-1">
                     <p className="text-sm font-bold text-orange-600">→ {item.komparativ}</p>
                     <p className="text-sm font-bold text-rose-600">→ {item.superlativ}</p>
                   </div>
                </div>
              ))}
            </div>

            {totalKomparativPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-4">
                <button
                  onClick={() => setKomparativPage(p => Math.max(1, p - 1))}
                  disabled={komparativPage === 1}
                  className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 text-slate-700 font-bold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600 transition-all cursor-pointer shadow-[0_2px_0_0_rgba(203,213,225,1)] active:translate-y-0.5 active:shadow-none"
                >
                  ←
                </button>
                <span className="font-bold text-slate-600 text-sm">
                  Halaman {komparativPage} dari {totalKomparativPages}
                </span>
                <button
                  onClick={() => setKomparativPage(p => Math.min(totalKomparativPages, p + 1))}
                  disabled={komparativPage === totalKomparativPages}
                  className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 text-slate-700 font-bold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600 transition-all cursor-pointer shadow-[0_2px_0_0_rgba(203,213,225,1)] active:translate-y-0.5 active:shadow-none"
                >
                  →
                </button>
              </div>
            )}

            {/* INTERAKTIVE GRAMMATIK ÜBUNG */}
            <div className="mt-12">
              <GrammatikInteraktiv3 />
            </div>
          </div>
        )}

        {/* ── GAME TAB ── */}
        {activeTab === 'game' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {!activeGameMode ? (
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-black text-slate-900">Pilih Mode Latihan</h2>
                  <p className="text-slate-600 mt-2">Uji kemampuanmu dengan mode yang berbeda!</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mode Wortschatz */}
                  <button 
                    onClick={() => setActiveGameMode('wortschatz')}
                    className="clay-card p-8 bg-indigo-50 border-indigo-200 border-b-8 text-left hover:translate-y-1 hover:border-b-4 transition-all group cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm border border-indigo-100 group-hover:scale-110 transition-transform">💬</div>
                    <h3 className="text-2xl font-black text-indigo-950">Wortschatz Recall</h3>
                    <p className="text-indigo-900 mt-2 text-sm font-bold leading-relaxed">Ketikan bahasa Jerman dari kosakata harian perangkat dan media digital.</p>
                  </button>

                  {/* Mode Grammatik */}
                  <button 
                    onClick={() => setActiveGameMode('komparativ')}
                    className="clay-card p-8 bg-orange-50 border-orange-200 border-b-8 text-left hover:translate-y-1 hover:border-b-4 transition-all group cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm border border-orange-100 group-hover:scale-110 transition-transform">⚖️</div>
                    <h3 className="text-2xl font-black text-orange-950">Komparativ Master</h3>
                    <p className="text-orange-900 mt-2 text-sm font-bold leading-relaxed">Latih konjugasi perubahan kata sifat (groß → größer → am größten).</p>
                  </button>
                </div>
              </div>
            ) : activeGameMode === 'wortschatz' ? (
              <div>
                <button onClick={() => setActiveGameMode(null)} className="mb-6 flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors">
                  ← Kembali ke Menu
                </button>
                <WortschatzGame />
              </div>
            ) : (
              <div>
                <button onClick={() => setActiveGameMode(null)} className="mb-6 flex items-center gap-2 text-orange-600 font-bold hover:text-orange-800 transition-colors">
                  ← Kembali ke Menu
                </button>
                <KomparativGame />
              </div>
            )}
          </div>
        )}

        {/* ── GRAMMATIK TAB ── */}
        {activeTab === 'grammatik' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Grammatik</h2>
              <p className="text-slate-600 text-sm mt-1">Tata bahasa utama di Kapitel 3.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              {grammatik.map((g, i) => (
                <div key={i} className={g.titel.includes('Nebensatz') ? 'lg:col-span-2' : ''}>
                    <GrammatikKarte gram={g} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── STRATEGIE TAB ── */}
        {activeTab === 'strategie' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Strategi Belajar Efektif</h2>
              <p className="text-slate-600 text-sm mt-1">Terapkan tips ini untuk memaksimalkan hasil belajar Anda.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lernTipps.map((tipp) => (
                <div key={tipp.nummer} className="clay-card bg-white p-6 relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${lernTippStyles[tipp.farbe]} opacity-10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110`} />
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-${tipp.farbe}-100 text-${tipp.farbe}-700 mb-4`}>
                    Tip #{tipp.nummer}
                  </span>
                  <div className="text-4xl mb-4">{tipp.icon}</div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">{tipp.titel}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{tipp.beschreibung}</p>
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block pt-4 border-t border-slate-100">
                    {tipp.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PLACEHOLDER TABS ── */}
        {activeTab === 'lesen' && <LesenInteraktiv3 />}
        {activeTab === 'horen' && <HorenInteraktiv3 />}
        {activeTab === 'uebung' && <UebungInteraktiv3 />}
        {activeTab === 'test' && <KapitelTest3 />}

      </main>
    </div>
  );
}
