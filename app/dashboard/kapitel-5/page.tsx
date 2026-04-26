'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import ProgressTracker from '../ProgressTracker';

// Placeholder components to prevent build errors before actual implementation
import KapitelTest5 from '../KapitelTest5';
import { LesenInteraktiv5 } from '../LesenInteraktiv5';
import { HorenInteraktiv5 } from '../HorenInteraktiv5';
import { UebungInteraktiv5 } from '../UebungInteraktiv5';
import { GrammatikInteraktiv5 } from './GrammatikInteraktiv5';
import ChapterTemplate from '../components/ChapterTemplate';

// ============================================================
// DATA: Netzwerk Neu A2 – Kapitel 5: Leben in der Stadt
// ============================================================

const kapitel = {
  nummer: 5,
  titel: 'Leben in der Stadt',
  untertitel: 'Stadtleben, Arbeit, Behörden, Banken, höfliche Bitten',
  level: 'A2',
  goetheFokus: ['Lesen', 'Hören', 'Schreiben', 'Sprechen'],
};

const wortschatz = [
  // C1. Stadt und Verkehr (Kota dan Lalu Lintas)
  { de: 'das Zentrum', plural: 'Zentren', id: 'pusat kota', beispiel: '', kategorie: 'Stadt und Verkehr' },
  { de: 'die Kreuzung', plural: '-en', id: 'perempatan', beispiel: '', kategorie: 'Stadt und Verkehr' },
  { de: 'die Ampel', plural: '-n', id: 'lampu lalu lintas', beispiel: '', kategorie: 'Stadt und Verkehr' },
  { de: 'die Brücke', plural: '-n', id: 'jembatan', beispiel: '', kategorie: 'Stadt und Verkehr' },
  { de: 'der Stau', plural: '-s', id: 'kemacetan', beispiel: '', kategorie: 'Stadt und Verkehr' },
  { de: 'die Haltestelle', plural: '-n', id: 'pemberhentian bus/trem', beispiel: '', kategorie: 'Stadt und Verkehr' },
  { de: 'der Hauptbahnhof', plural: '-höfe', id: 'stasiun utama', beispiel: '', kategorie: 'Stadt und Verkehr' },
  { de: 'die Straßenbahn', plural: '-en', id: 'trem', beispiel: '', kategorie: 'Stadt und Verkehr' },
  { de: 'die U-Bahn', plural: '-en', id: 'kereta bawah tanah', beispiel: '', kategorie: 'Stadt und Verkehr' },
  { de: 'der Flughafen', plural: '-häfen', id: 'bandara', beispiel: '', kategorie: 'Stadt und Verkehr' },
  
  // C2. Im Hotel (Di Hotel)
  { de: 'das Hotel', plural: '-s', id: 'hotel', beispiel: '', kategorie: 'Im Hotel' },
  { de: 'die Rezeption', plural: '-en', id: 'resepsionis', beispiel: '', kategorie: 'Im Hotel' },
  { de: 'das Einzelzimmer', plural: '-', id: 'kamar tunggal', beispiel: '', kategorie: 'Im Hotel' },
  { de: 'das Doppelzimmer', plural: '-', id: 'kamar ganda', beispiel: '', kategorie: 'Im Hotel' },
  { de: 'das Frühstück', plural: '-e', id: 'sarapan', beispiel: '', kategorie: 'Im Hotel' },
  { de: 'buchen', plural: '', id: 'memesan (booking)', beispiel: '', kategorie: 'Im Hotel' },
  { de: 'übernachten', plural: '', id: 'menginap', beispiel: '', kategorie: 'Im Hotel' },
  
  // C3. Auf der Bank (Di Bank)
  { de: 'die Bank', plural: '-en', id: 'bank', beispiel: '', kategorie: 'Auf der Bank' },
  { de: 'das Konto', plural: 'Konten', id: 'rekening', beispiel: '', kategorie: 'Auf der Bank' },
  { de: 'der Schalter', plural: '-', id: 'loket', beispiel: '', kategorie: 'Auf der Bank' },
  { de: 'der Geldautomat', plural: '-en', id: 'mesin ATM', beispiel: '', kategorie: 'Auf der Bank' },
  { de: 'die Geheimzahl', plural: '-en', id: 'nomor PIN', beispiel: '', kategorie: 'Auf der Bank' },
  { de: 'abheben', plural: '', id: 'menarik uang', beispiel: '', kategorie: 'Auf der Bank' },
  { de: 'überweisen', plural: '', id: 'mentransfer uang', beispiel: '', kategorie: 'Auf der Bank' },
  { de: 'einzahlen', plural: '', id: 'menyetor uang', beispiel: '', kategorie: 'Auf der Bank' },
  { de: 'sperren', plural: '', id: 'memblokir', beispiel: '', kategorie: 'Auf der Bank' },
  
  // C4. Auf der Behörde (Di Kantor Pemerintahan)
  { de: 'die Behörde', plural: '-n', id: 'instansi / otoritas', beispiel: '', kategorie: 'Auf der Behörde' },
  { de: 'das Amt', plural: '-Ämter', id: 'kantor dinas', beispiel: '', kategorie: 'Auf der Behörde' },
  { de: 'der Antrag', plural: '-Anträge', id: 'formulir permohonan', beispiel: '', kategorie: 'Auf der Behörde' },
  { de: 'das Formular', plural: '-e', id: 'formulir isian', beispiel: '', kategorie: 'Auf der Behörde' },
  { de: 'die Meldebescheinigung', plural: '-en', id: 'surat keterangan domisili', beispiel: '', kategorie: 'Auf der Behörde' },
  { de: 'beantragen', plural: '', id: 'mengajukan', beispiel: '', kategorie: 'Auf der Behörde' },
  { de: 'ausfüllen', plural: '', id: 'mengisi (formulir)', beispiel: '', kategorie: 'Auf der Behörde' },
  { de: 'unterschreiben', plural: '', id: 'menandatangani', beispiel: '', kategorie: 'Auf der Behörde' },
  { de: 'verlängern', plural: '', id: 'memperpanjang', beispiel: '', kategorie: 'Auf der Behörde' },
  
  // C5. Bei der Polizei (Di Kepolisian)
  { de: 'die Polizei', plural: '', id: 'polisi', beispiel: '', kategorie: 'Bei der Polizei' },
  { de: 'der Polizist', plural: '-en', id: 'polisi pria', beispiel: '', kategorie: 'Bei der Polizei' },
  { de: 'die Polizistin', plural: '-nen', id: 'polisi wanita', beispiel: '', kategorie: 'Bei der Polizei' },
  { de: 'der Diebstahl', plural: '-Diebstähle', id: 'pencurian', beispiel: '', kategorie: 'Bei der Polizei' },
  { de: 'der Zeuge', plural: '-n', id: 'saksi (pria)', beispiel: '', kategorie: 'Bei der Polizei' },
  { de: 'das Protokoll', plural: '-e', id: 'berita acara', beispiel: '', kategorie: 'Bei der Polizei' },
  { de: 'stehlen', plural: '', id: 'mencuri', beispiel: '', kategorie: 'Bei der Polizei' },
  { de: 'anzeigen', plural: '', id: 'melaporkan ke polisi', beispiel: '', kategorie: 'Bei der Polizei' },
  
  // C6. Im Supermarkt / Markt (Di Supermarket / Pasar)
  { de: 'der Markt', plural: '-Märkte', id: 'pasar', beispiel: '', kategorie: 'Einkaufen' },
  { de: 'der Supermarkt', plural: '-märkte', id: 'supermarket', beispiel: '', kategorie: 'Einkaufen' },
  { de: 'das Angebot', plural: '-e', id: 'penawaran / diskon', beispiel: '', kategorie: 'Einkaufen' },
  { de: 'die Kasse', plural: '-n', id: 'kasir', beispiel: '', kategorie: 'Einkaufen' },
  { de: 'der Einkaufszettel', plural: '-', id: 'daftar belanja', beispiel: '', kategorie: 'Einkaufen' },
  { de: 'die Tüte', plural: '-n', id: 'kantong plastik / kertas', beispiel: '', kategorie: 'Einkaufen' },
  { de: 'wiegen', plural: '', id: 'menimbang', beispiel: '', kategorie: 'Einkaufen' },
  
  // C7. Berufe und Arbeit (Pekerjaan dan Karir)
  { de: 'der Beruf', plural: '-e', id: 'profesi', beispiel: '', kategorie: 'Berufe und Arbeit' },
  { de: 'die Stelle', plural: '-n', id: 'posisi / lowongan', beispiel: '', kategorie: 'Berufe und Arbeit' },
  { de: 'das Praktikum', plural: '-Praktika', id: 'magang', beispiel: '', kategorie: 'Berufe und Arbeit' },
  { de: 'der Lebenslauf', plural: '-läufe', id: 'curriculum vitae (CV)', beispiel: '', kategorie: 'Berufe und Arbeit' },
  { de: 'das Zeugnis', plural: '-se', id: 'ijazah / rapor', beispiel: '', kategorie: 'Berufe und Arbeit' },
  { de: 'das Vorstellungsgespräch', plural: '-e', id: 'wawancara kerja', beispiel: '', kategorie: 'Berufe und Arbeit' },
  { de: 'sich bewerben', plural: '', id: 'melamar pekerjaan', beispiel: '', kategorie: 'Berufe und Arbeit' },
  { de: 'verdienen', plural: '', id: 'menghasilkan (uang)', beispiel: '', kategorie: 'Berufe und Arbeit' },
  { de: 'kündigen', plural: '', id: 'mengundurkan diri / memberhentikan', beispiel: '', kategorie: 'Berufe und Arbeit' },
  
  // C8. Eigenschaften / Adjektive (Kata Sifat)
  { de: 'berühmt', plural: '', id: 'terkenal', beispiel: '', kategorie: 'Eigenschaften' },
  { de: 'beliebt', plural: '', id: 'populer / disukai', beispiel: '', kategorie: 'Eigenschaften' },
  { de: 'zentral', plural: '', id: 'berada di pusat', beispiel: '', kategorie: 'Eigenschaften' },
  { de: 'gefährlich', plural: '', id: 'berbahaya', beispiel: '', kategorie: 'Eigenschaften' },
  { de: 'sicher', plural: '', id: 'aman', beispiel: '', kategorie: 'Eigenschaften' },
  { de: 'laut', plural: '', id: 'berisik / keras', beispiel: '', kategorie: 'Eigenschaften' },
  { de: 'ruhig', plural: '', id: 'tenang', beispiel: '', kategorie: 'Eigenschaften' },
  { de: 'dringend', plural: '', id: 'mendesak', beispiel: '', kategorie: 'Eigenschaften' },
  
  // C9. Ausdrücke / Kommunikation (Ekspresi / Komunikasi)
  { de: 'Haben Sie einen Moment Zeit?', plural: '', id: 'Apakah Anda punya waktu sebentar?', beispiel: '', kategorie: 'Kommunikation' },
  { de: 'Ich hätte gern...', plural: '', id: 'Saya ingin / mau...', beispiel: '', kategorie: 'Kommunikation' },
  { de: 'Könnten Sie mir bitte helfen?', plural: '', id: 'Bisakah Anda tolong bantu saya?', beispiel: '', kategorie: 'Kommunikation' },
  { de: 'Vielen Dank für Ihre Hilfe.', plural: '', id: 'Terima kasih banyak atas bantuan Anda.', beispiel: '', kategorie: 'Kommunikation' },
  { de: 'Es tut mir leid, aber...', plural: '', id: 'Maafkan saya, tapi...', beispiel: '', kategorie: 'Kommunikation' },
  { de: 'Was kann ich für Sie tun?', plural: '', id: 'Apa yang bisa saya bantu?', beispiel: '', kategorie: 'Kommunikation' }
];

const partizipZwei = [
  // Schwache Verben (K.K. Beraturan) - ge...t
  { infinitiv: 'kaufen', partizip: 'gekauft', hilfsverb: 'hat', id: 'membeli' },
  { infinitiv: 'lernen', partizip: 'gelernt', hilfsverb: 'hat', id: 'belajar' },
  { infinitiv: 'machen', partizip: 'gemacht', hilfsverb: 'hat', id: 'melakukan/membuat' },
  { infinitiv: 'arbeiten', partizip: 'gearbeitet', hilfsverb: 'hat', id: 'bekerja' },
  { infinitiv: 'spielen', partizip: 'gespielt', hilfsverb: 'hat', id: 'bermain' },
  { infinitiv: 'wohnen', partizip: 'gewohnt', hilfsverb: 'hat', id: 'tinggal' },
  { infinitiv: 'hören', partizip: 'gehört', hilfsverb: 'hat', id: 'mendengar' },
  { infinitiv: 'sagen', partizip: 'gesagt', hilfsverb: 'hat', id: 'mengatakan' },
  { infinitiv: 'fragen', partizip: 'gefragt', hilfsverb: 'hat', id: 'bertanya' },
  { infinitiv: 'suchen', partizip: 'gesucht', hilfsverb: 'hat', id: 'mencari' },

  // Verben auf -ieren (tanpa ge-) - ...t
  { infinitiv: 'studieren', partizip: 'studiert', hilfsverb: 'hat', id: 'kuliah' },
  { infinitiv: 'fotografieren', partizip: 'fotografiert', hilfsverb: 'hat', id: 'memotret' },
  { infinitiv: 'passieren', partizip: 'passiert', hilfsverb: 'ist', id: 'terjadi' },
  { infinitiv: 'reservieren', partizip: 'reserviert', hilfsverb: 'hat', id: 'memesan (tempat)' },
  { infinitiv: 'funktionieren', partizip: 'funktioniert', hilfsverb: 'hat', id: 'berfungsi' },

  // Trennbare Verben (K.K. Dapat Dipisah)
  { infinitiv: 'einkaufen', partizip: 'eingekauft', hilfsverb: 'hat', id: 'berbelanja' },
  { infinitiv: 'aufmachen', partizip: 'aufgemacht', hilfsverb: 'hat', id: 'membuka' },
  { infinitiv: 'zumachen', partizip: 'zugemacht', hilfsverb: 'hat', id: 'menutup' },
  { infinitiv: 'anrufen', partizip: 'angerufen', hilfsverb: 'hat', id: 'menelepon' },
  { infinitiv: 'aufstehen', partizip: 'aufgestanden', hilfsverb: 'ist', id: 'bangun' },
  { infinitiv: 'abholen', partizip: 'abgeholt', hilfsverb: 'hat', id: 'menjemput' },
  { infinitiv: 'umziehen', partizip: 'umgezogen', hilfsverb: 'ist', id: 'pindah rumah' },

  // Untrennbare Verben (K.K. Tidak Dapat Dipisah) - tanpa ge-
  { infinitiv: 'besuchen', partizip: 'besucht', hilfsverb: 'hat', id: 'mengunjungi' },
  { infinitiv: 'bezahlen', partizip: 'bezahlt', hilfsverb: 'hat', id: 'membayar' },
  { infinitiv: 'erzählen', partizip: 'erzählt', hilfsverb: 'hat', id: 'bercerita' },
  { infinitiv: 'vergessen', partizip: 'vergessen', hilfsverb: 'hat', id: 'lupa' },
  { infinitiv: 'erleben', partizip: 'erlebt', hilfsverb: 'hat', id: 'mengalami' },
  { infinitiv: 'verstehen', partizip: 'verstanden', hilfsverb: 'hat', id: 'mengerti' },

  // Starke/Unregelmäßige Verben (K.K. Tidak Beraturan) - ge...en
  { infinitiv: 'lesen', partizip: 'gelesen', hilfsverb: 'hat', id: 'membaca' },
  { infinitiv: 'sehen', partizip: 'gesehen', hilfsverb: 'hat', id: 'melihat' },
  { infinitiv: 'essen', partizip: 'gegessen', hilfsverb: 'hat', id: 'makan' },
  { infinitiv: 'trinken', partizip: 'getrunken', hilfsverb: 'hat', id: 'minum' },
  { infinitiv: 'schreiben', partizip: 'geschrieben', hilfsverb: 'hat', id: 'menulis' },
  { infinitiv: 'sprechen', partizip: 'gesprochen', hilfsverb: 'hat', id: 'berbicara' },
  { infinitiv: 'finden', partizip: 'gefunden', hilfsverb: 'hat', id: 'menemukan' },
  { infinitiv: 'geben', partizip: 'gegeben', hilfsverb: 'hat', id: 'memberi' },
  { infinitiv: 'helfen', partizip: 'geholfen', hilfsverb: 'hat', id: 'membantu' },
  { infinitiv: 'schlafen', partizip: 'geschlafen', hilfsverb: 'hat', id: 'tidur' },

  // Bewegungsverben (K.K. Pergerakan) -> hilfsverb: "sein"
  { infinitiv: 'gehen', partizip: 'gegangen', hilfsverb: 'ist', id: 'pergi/berjalan' },
  { infinitiv: 'fahren', partizip: 'gefahren', hilfsverb: 'ist', id: 'pergi (berkendara)' },
  { infinitiv: 'kommen', partizip: 'gekommen', hilfsverb: 'ist', id: 'datang' },
  { infinitiv: 'fliegen', partizip: 'geflogen', hilfsverb: 'ist', id: 'terbang' },
  { infinitiv: 'bleiben', partizip: 'geblieben', hilfsverb: 'ist', id: 'tinggal (stay)' }
];

const grammatik = [
  {
    titel: 'Adjektive nach dem bestimmten Artikel',
    farbe: 'indigo',
    erklaerung: 'Setelah artikel pasti (der, die, das), adjektiva mendapat akhiran -e atau -en.',
    tiefenErklaerung: 'Dalam bahasa Jerman, saat menggunakan artikel definit (der, das, die, den, dem, der), akhiran adjektiva menjadi lemah (schwache Deklination). Akhirannya hanya -e (Nominativ singular dan Akkusativ neutrum/feminin) atau -en (Dativ, Genitiv, Plural, dan Akkusativ maskulin).',
    struktur: 'der/die/das + Adjektiv-e/en + Nomen',
    konjugationsTabelle: {
      headers: ['Kasus', 'Maskulin', 'Neutral', 'Feminin', 'Plural'],
      rows: [
        ['Nominativ', 'der gute Mann', 'das gute Kind', 'die gute Frau', 'die guten Leute'],
        ['Akkusativ', 'den guten Mann', 'das gute Kind', 'die gute Frau', 'die guten Leute'],
        ['Dativ', 'dem guten Mann', 'dem guten Kind', 'der guten Frau', 'den guten Leuten']
      ]
    },
    beispiele: [
      { satz: 'Ich kaufe das weiße T-Shirt.', terjemahan: 'Saya membeli kaos putih itu.' },
      { satz: 'Wir fahren mit dem neuen Auto.', terjemahan: 'Kami pergi dengan mobil baru itu.' }
    ],
    falle: 'Ingat! Di jamak (Plural) dan Dativ, akhirannya selalu -en!'
  },
  {
    titel: 'Präpositionen: mit und ohne',
    farbe: 'emerald',
    erklaerung: 'mit + Dativ, ohne + Akkusativ.',
    tiefenErklaerung: '"mit" (dengan) selalu diikuti kasus Dativ. "ohne" (tanpa) selalu diikuti kasus Akkusativ.',
    struktur: 'mit + Dativ | ohne + Akkusativ',
    konjugationsTabelle: null,
    beispiele: [
      { satz: 'Ohne meinen Pass kann ich nicht reisen.', terjemahan: 'Tanpa paspor saya, saya tidak bisa bepergian.' },
      { satz: 'Er fährt mit dem Bus.', terjemahan: 'Dia pergi dengan bus.' }
    ],
    falle: 'Perhatikan perubahan artikel: mit (dem/der/den), ohne (den/das/die).'
  },
  {
    titel: 'Konjunktiv II: könnte (Höfliche Bitten)',
    farbe: 'orange',
    erklaerung: 'Digunakan untuk membuat permintaan menjadi sangat sopan.',
    tiefenErklaerung: 'Untuk meminta tolong dengan sopan, gunakan bentuk Konjunktiv II dari "können" ("könnte").',
    struktur: 'Könnte(st/n) + Subjekt + ... + Infinitiv?',
    konjugationsTabelle: {
      headers: ['Person', 'könnte'],
      rows: [
        ['ich', 'könnte'],
        ['du', 'könntest'],
        ['er/es/sie', 'könnte'],
        ['wir', 'könnten'],
        ['ihr', 'könntet'],
        ['sie/Sie', 'könnten']
      ]
    },
    beispiele: [
      { satz: 'Könnten Sie mir bitte helfen?', terjemahan: 'Bisakah Anda menolong saya?' },
      { satz: 'Könntest du mir das Geld leihen?', terjemahan: 'Bisakah kamu meminjamkan uang itu padaku?' }
    ],
    falle: 'Kata kerja utama (Infinitiv) diletakkan di akhir kalimat!'
  }
];

const goetheTasks = [
  {
    skill: 'Lesen (Teil 2)',
    icon: '📖',
    farbe: 'sky',
    tasks: [
      {
        typ: 'Informationssuche',
        beschreibung: 'Mencari informasi spesifik tentang sebuah kota di papan informasi.',
        text: 'Stadtzentrum\n\n1. Rathaus (City Hall) - 50m\n2. Bahnhof - 200m\n3. Polizei - 150m',
        frage: 'Wo ist der Bahnhof?',
        antwort: 'Der Bahnhof ist 200 Meter entfernt.'
      }
    ]
  },
  {
    skill: 'Sprechen (Teil 1)',
    icon: '🗣️',
    farbe: 'emerald',
    tasks: [
      {
        typ: 'Fragen und Antworten',
        beschreibung: 'Membuat pertanyaan menggunakan kalimat sopan (könnte).',
        text: 'Thema: Bank',
        frage: 'Formulieren Sie eine Frage mit "könnte".',
        antwort: 'Könnten Sie mir bitte helfen? Ich möchte ein Konto eröffnen.'
      }
    ]
  }
];

const lernTipps = [
  {
    nummer: 1,
    titel: 'Wortschatz Kategorisieren',
    beschreibung: 'Hafalkan kosakata berdasarkan kategorinya (Bank, Behörde, Polizei) agar lebih mudah diingat.',
    icon: '🗂️',
    farbe: 'sky',
    tag: 'STRUKTUR'
  },
  {
    nummer: 2,
    titel: 'Partizip II Drill',
    beschreibung: 'Latih memori Partizip II beserta Hilfsverb (hat/ist) karena sangat krusial untuk bercerita.',
    icon: '⏳',
    farbe: 'orange',
    tag: 'GRAMMATIK'
  },
  {
    nummer: 3,
    titel: 'Höflichkeit üben',
    beschreibung: 'Selalu gunakan "könnte" dan "bitte" saat simulasi roleplay di Bank atau Behörde.',
    icon: '🎩',
    farbe: 'emerald',
    tag: 'KOMMUNIKATION'
  }
];

const miniQuiz = [
  { frage: 'Welche Endung ist richtig: der schwarz___ Rock?', options: ['-e', '-en', '-er'], besteAntwort: 0 },
  { frage: 'Ich trinke meinen Kaffee ___ Milch (tanpa).', options: ['ohne', 'mit', 'für'], besteAntwort: 0 },
  { frage: '___ du mir bitte helfen?', options: ['Könntest', 'Könnte', 'Könnten'], besteAntwort: 0 },
];

export default function KapitelFuenfPage() {
  return (
    <ChapterTemplate
      kapitelId="kapitel-5"
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
