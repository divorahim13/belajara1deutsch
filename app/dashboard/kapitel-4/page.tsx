'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import ProgressTracker from '../ProgressTracker';

// Placeholder components to prevent build errors before actual implementation
import KapitelTest4 from '../KapitelTest4';
import { LesenInteraktiv4 } from '../LesenInteraktiv4';
import { HorenInteraktiv4 } from '../HorenInteraktiv4';
import { UebungInteraktiv4 } from '../UebungInteraktiv4';
import { GrammatikInteraktiv4 } from './GrammatikInteraktiv4';
import ChapterTemplate from '../components/ChapterTemplate';

// ============================================================
// DATA: Netzwerk Neu A2 – Kapitel 4: Große und kleine Gefühle
// ============================================================

const kapitel = {
  nummer: 4,
  titel: 'Große und kleine Gefühle',
  untertitel: 'Gefühle, Glückwünsche, Dank, Feiern und Blogtexte',
  level: 'A2',
  goetheFokus: ['Lesen', 'Hören', 'Schreiben', 'Sprechen'],
};

const wortschatz: { de: string; plural?: string; id: string; beispiel: string; kategorie: string }[] = [
  { de: 'die Geburt', plural: '-en', id: 'kelahiran', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'das Baby', plural: '-s', id: 'bayi', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Babykleidung', plural: '', id: 'pakaian bayi', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'schmücken', plural: '', id: 'menghias', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Storch', plural: '-"e', id: 'burung bangau', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Geburtstagsparty', plural: '-s', id: 'pesta ulang tahun', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Geburtstag', plural: '-e', id: 'ulang tahun', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Einladung', plural: '-en', id: 'undangan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'das Geschenk', plural: '-e', id: 'hadiah', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Glückwünsche', plural: '', id: 'ucapan selamat', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Glückwunschkarte', plural: '-n', id: 'kartu ucapan selamat', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Karte', plural: '-n', id: 'kartu', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Dankeskarte', plural: '-n', id: 'kartu ucapan terima kasih', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Absage', plural: '-n', id: 'pembatalan / penolakan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'das Brautpaar', plural: '-e', id: 'pasangan pengantin', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'das Brautkleid', plural: '-er', id: 'gaun pengantin', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Ring', plural: '-e', id: 'cincin', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'das Paar', plural: '-e', id: 'pasangan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Kirche', plural: '-n', id: 'gereja', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Familie', plural: '-n', id: 'keluarga', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Freunde', plural: '', id: 'teman-teman', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Leute', plural: '', id: 'orang-orang', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'ungefähr', plural: '', id: 'kira-kira', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'morgens', plural: '', id: 'pada pagi hari', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der erste Schultag', plural: '', id: 'hari pertama sekolah', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Schultag', plural: '-e', id: 'hari sekolah', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Schultüte', plural: '-n', id: 'kerucut hadiah sekolah', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Überraschung', plural: '-en', id: 'kejutan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Schulranzen', plural: '', id: 'tas sekolah', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'aufgeregt sein', plural: '', id: 'merasa gugup / bersemangat', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Kollege', plural: '-n', id: 'rekan kerja laki-laki', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Kollegin', plural: '-nen', id: 'rekan kerja perempuan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Kollegen', plural: '', id: 'para rekan kerja', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'das Gebäck', plural: '-e', id: 'kue / pastry', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Getränke', plural: '', id: 'minuman', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Feier', plural: '-n', id: 'perayaan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'nett', plural: '', id: 'baik/ramah', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Führerschein', plural: '-e', id: 'SIM', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Führerscheinprüfung', plural: '-en', id: 'ujian SIM', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Prüfung bestehen', plural: '', id: 'lulus ujian', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'Auto fahren', plural: '', id: 'mengendarai mobil', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'mobil sein', plural: '', id: 'bisa bepergian / mobile', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Marathon', plural: '-s', id: 'maraton', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Stadt-Marathon', plural: '-s', id: 'maraton kota', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'mitlaufen', plural: '', id: 'ikut berlari', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Medaille', plural: '-n', id: 'medali', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der erste Platz', plural: '', id: 'juara pertama', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Sieg', plural: '-e', id: 'kemenangan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Siegerin', plural: '-nen', id: 'pemenang perempuan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'gewinnen', plural: '', id: 'menang', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'versuchen', plural: '', id: 'mencoba', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'nächstes Jahr', plural: '', id: 'tahun depan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'geschafft!', plural: '', id: 'berhasil!', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'dabei sein', plural: '', id: 'hadir / ikut serta', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'glücklich sein', plural: '', id: 'bahagia', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'froh sein', plural: '', id: 'senang', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'sich freuen', plural: '', id: 'merasa senang', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'sich riesig freuen', plural: '', id: 'sangat senang', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'stolz sein', plural: '', id: 'bangga', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'sich wohlfühlen', plural: '', id: 'merasa nyaman', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'etwas schön finden', plural: '', id: 'menganggap sesuatu menyenangkan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'etwas cool finden', plural: '', id: 'menganggap sesuatu keren', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'erleichtert sein', plural: '', id: 'merasa lega', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'gute Laune haben', plural: '', id: 'suasana hati baik', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'traurig sein', plural: '', id: 'sedih', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'unglücklich sein', plural: '', id: 'tidak bahagia', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'Angst haben', plural: '', id: 'takut', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'nervös sein', plural: '', id: 'gugup', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'genervt sein', plural: '', id: 'kesal / terganggu', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'sauer sein', plural: '', id: 'marah', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'ärgerlich sein', plural: '', id: 'kesal', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'gestresst sein', plural: '', id: 'stres', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'schlechte Laune haben', plural: '', id: 'suasana hati buruk', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'sich langweilen', plural: '', id: 'bosan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'sich ärgern', plural: '', id: 'merasa kesal', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'sich streiten', plural: '', id: 'bertengkar', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'unangenehm', plural: '', id: 'tidak nyaman', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'schlimm', plural: '', id: 'buruk / parah', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'das Bedauern', plural: '', id: 'penyesalan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'keine Ahnung haben', plural: '', id: 'tidak tahu', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'das Gefühl', plural: '-e', id: 'perasaan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Emotion', plural: '-en', id: 'emosi', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Freude', plural: '-n', id: 'kegembiraan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Laune', plural: '-n', id: 'suasana hati', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Liebe', plural: '', id: 'cinta', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'das Glück', plural: '', id: 'keberuntungan / kebahagiaan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'das Pech', plural: '', id: 'kesialan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Kieler Woche', plural: '', id: 'Kiel Week', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'stattfinden', plural: '', id: 'berlangsung', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'weltweit bekannt', plural: '', id: 'terkenal di seluruh dunia', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Besucher', plural: '', id: 'pengunjung', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'das Ereignis', plural: '-se', id: 'peristiwa', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Segelregatta', plural: '-s', id: 'lomba layar', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Segler', plural: '', id: 'pelayar', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Nation', plural: '-en', id: 'negara/bangsa', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Segelsport-Veranstaltung', plural: '-en', id: 'acara olahraga layar', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'das Schiff', plural: '-e', id: 'kapal', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'alte Schiffe', plural: '', id: 'kapal-kapal tua', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'bewundern', plural: '', id: 'mengagumi', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'das Sommerfest', plural: '-e', id: 'festival musim panas', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Attraktion', plural: '-en', id: 'atraksi', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'Hunger haben', plural: '', id: 'lapar', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'Durst haben', plural: '', id: 'haus', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Spezialität', plural: '-en', id: 'makanan khas', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'international', plural: '', id: 'internasional', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Musikfan', plural: '-s', id: 'penggemar musik', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'das Feuerwerk', plural: '-e', id: 'kembang api', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'enden mit', plural: '', id: 'berakhir dengan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Almabtrieb', plural: '-e', id: 'tradisi turunnya sapi', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Viehscheid', plural: '', id: 'nama lain Almabtrieb', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Alpabzug', plural: '', id: 'nama lain Almabtrieb di Swiss', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'das Erlebnis', plural: '-se', id: 'pengalaman', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Kuh', plural: '-"e', id: 'sapi', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Alm', plural: '-en', id: 'padang rumput', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Berg', plural: '-e', id: 'gunung', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Alpen', plural: '', id: 'Alpen', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Alpenregion', plural: '-en', id: 'wilayah Alpen', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'im Sommer', plural: '', id: 'pada musim panas', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'im Herbst', plural: '', id: 'pada musim gugur', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'zurückkommen', plural: '', id: 'kembali', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'das Dorf', plural: '-"er', id: 'desa', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'begrüßen', plural: '', id: 'menyambut', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Blume', plural: '-n', id: 'bunga', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Glocke', plural: '-n', id: 'lonceng', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'gesund', plural: '', id: 'sehat', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'geschmückt sein', plural: '', id: 'dihias', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'traditionelle Musik', plural: '', id: 'musik tradisional', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'das Gericht', plural: '-e', id: 'hidangan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'typische Gerichte', plural: '', id: 'hidangan khas', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Region', plural: '-en', id: 'wilayah', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'probieren', plural: '', id: 'mencoba', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Veranstaltung', plural: '-en', id: 'acara', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Blogbeitrag', plural: '-"e', id: 'tulisan blog', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'im Ausland', plural: '', id: 'di luar negeri', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'seit zwei Monaten', plural: '', id: 'sejak dua bulan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Sprachschule', plural: '-n', id: 'sekolah bahasa', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'unterrichten', plural: '', id: 'mengajar', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'Deutsch unterrichten', plural: '', id: 'mengajar bahasa Jerman', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'lustig', plural: '', id: 'lucu/menyenangkan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'vermissen', plural: '', id: 'merindukan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Familie vermissen', plural: '', id: 'merindukan keluarga', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'pünktlich', plural: '', id: 'tepat waktu', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'unpünktlich', plural: '', id: 'tidak tepat waktu', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'normal', plural: '', id: 'biasa/normal', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'sich gewöhnen an', plural: '', id: 'membiasakan diri pada', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'später', plural: '', id: 'lebih lambat', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Währung', plural: '-en', id: 'mata uang', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Tango', plural: '-s', id: 'tango', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'mitmachen', plural: '', id: 'ikut serta', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'Indien', plural: '', id: 'India', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'das Frühjahr', plural: '-e', id: 'musim semi', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Anmeldung', plural: '-en', id: 'pendaftaran', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Uni', plural: '-s', id: 'universitas', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'das Wohnheim', plural: '-e', id: 'asrama', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Mitarbeiter', plural: '', id: 'pegawai laki-laki', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Mitarbeiterin', plural: '-nen', id: 'pegawai perempuan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'freundlich', plural: '', id: 'ramah', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'hilfsbereit', plural: '', id: 'suka membantu', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'genau', plural: '', id: 'tepat / akurat', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'ordentlich', plural: '', id: 'rapi / tertib', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Verkehr', plural: '', id: 'lalu lintas', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'abfahren', plural: '', id: 'berangkat', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'fremd', plural: '', id: 'asing', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'sich fremd fühlen', plural: '', id: 'merasa asing', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'die Studenten', plural: '', id: 'para mahasiswa', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'anbieten', plural: '', id: 'menawarkan', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
  { de: 'der Gast', plural: '-"e', id: 'tamu', beispiel: '', kategorie: 'Gefühle & Ereignisse' },
                                                                                                                    ];




const grammatik = [
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
];

const partizipZwei: { infinitiv: string; partizip: string; hilfsverb: 'haben' | 'sein'; id: string }[] = [
  { infinitiv: 'feiern', partizip: 'gefeiert', hilfsverb: 'haben', id: 'merayakan' },
  { infinitiv: 'tanzen', partizip: 'getanzt', hilfsverb: 'haben', id: 'menari' },
  { infinitiv: 'mitlaufen', partizip: 'mitgelaufen', hilfsverb: 'sein', id: 'ikut berlari' },
  { infinitiv: 'versuchen', partizip: 'versucht', hilfsverb: 'haben', id: 'mencoba' },
  { infinitiv: 'werden', partizip: 'geworden', hilfsverb: 'sein', id: 'menjadi' },
  { infinitiv: 'bestehen', partizip: 'bestanden', hilfsverb: 'haben', id: 'lulus' },
  { infinitiv: 'erzählen', partizip: 'erzählt', hilfsverb: 'haben', id: 'menceritakan' },
  { infinitiv: 'gratulieren', partizip: 'gratuliert', hilfsverb: 'haben', id: 'memberi selamat' },
  { infinitiv: 'sich freuen', partizip: 'sich gefreut', hilfsverb: 'haben', id: 'merasa senang' },
  { infinitiv: 'sich ärgern', partizip: 'sich geärgert', hilfsverb: 'haben', id: 'merasa kesal' },
  { infinitiv: 'sich entscheiden', partizip: 'sich entschieden', hilfsverb: 'haben', id: 'memutuskan' },
  { infinitiv: 'sich entschuldigen', partizip: 'sich entschuldigt', hilfsverb: 'haben', id: 'meminta maaf' },
  { infinitiv: 'sich erinnern', partizip: 'sich erinnert', hilfsverb: 'haben', id: 'mengingat' },
  { infinitiv: 'sich interessieren', partizip: 'sich interessiert', hilfsverb: 'haben', id: 'tertarik' },
  { infinitiv: 'sich treffen', partizip: 'sich getroffen', hilfsverb: 'haben', id: 'bertemu' },
  { infinitiv: 'sich unterhalten', partizip: 'sich unterhalten', hilfsverb: 'haben', id: 'bercakap-cakap' },
  { infinitiv: 'sich streiten', partizip: 'sich gestritten', hilfsverb: 'haben', id: 'bertengkar' },
  { infinitiv: 'sich gewöhnen', partizip: 'sich gewöhnt', hilfsverb: 'haben', id: 'membiasakan diri' },
  { infinitiv: 'sich wohlfühlen', partizip: 'sich wohlgefühlt', hilfsverb: 'haben', id: 'merasa nyaman' },
  { infinitiv: 'vermissen', partizip: 'vermisst', hilfsverb: 'haben', id: 'merindukan' },
  { infinitiv: 'zeigen', partizip: 'gezeigt', hilfsverb: 'haben', id: 'menunjukkan' },
  { infinitiv: 'mitbringen', partizip: 'mitgebracht', hilfsverb: 'haben', id: 'membawa serta' },
  { infinitiv: 'anbieten', partizip: 'angeboten', hilfsverb: 'haben', id: 'menawarkan' },
  { infinitiv: 'unterrichten', partizip: 'unterrichtet', hilfsverb: 'haben', id: 'mengajar' },
  { infinitiv: 'putzen', partizip: 'geputzt', hilfsverb: 'haben', id: 'membersihkan' },
  { infinitiv: 'aufräumen', partizip: 'aufgeräumt', hilfsverb: 'haben', id: 'merapikan' },
  { infinitiv: 'sauber machen', partizip: 'sauber gemacht', hilfsverb: 'haben', id: 'membersihkan' },
  { infinitiv: 'legen', partizip: 'gelegt', hilfsverb: 'haben', id: 'meletakkan' },
  { infinitiv: 'spülen', partizip: 'gespült', hilfsverb: 'haben', id: 'mencuci' },
  { infinitiv: 'schenken', partizip: 'geschenkt', hilfsverb: 'haben', id: 'memberi hadiah' },
  { infinitiv: 'suchen', partizip: 'gesucht', hilfsverb: 'haben', id: 'mencari' },
  { infinitiv: 'fallen', partizip: 'gefallen', hilfsverb: 'sein', id: 'jatuh' },
  { infinitiv: 'gefallen', partizip: 'gefallen', hilfsverb: 'haben', id: 'menyukai / berkenan' },
  { infinitiv: 'kosten', partizip: 'gekostet', hilfsverb: 'haben', id: 'berharga' },
  { infinitiv: 'stattfinden', partizip: 'stattgefunden', hilfsverb: 'haben', id: 'berlangsung' },
  { infinitiv: 'bewundern', partizip: 'bewundert', hilfsverb: 'haben', id: 'mengagumi' },
  { infinitiv: 'enden', partizip: 'geendet', hilfsverb: 'haben', id: 'berakhir' },
  { infinitiv: 'tragen', partizip: 'getragen', hilfsverb: 'haben', id: 'memakai / membawa' },
  { infinitiv: 'zurückkommen', partizip: 'zurückgekommen', hilfsverb: 'sein', id: 'kembali' },
  { infinitiv: 'abfahren', partizip: 'abgefahren', hilfsverb: 'sein', id: 'berangkat' },
  { infinitiv: 'aussprechen', partizip: 'ausgesprochen', hilfsverb: 'haben', id: 'mengucapkan' },
  { infinitiv: 'austauschen', partizip: 'ausgetauscht', hilfsverb: 'haben', id: 'bertukar' },
  { infinitiv: 'wegfahren', partizip: 'weggefahren', hilfsverb: 'sein', id: 'pergi berangkat' },
];


const goetheTasks = [
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
  { frage: 'Ich freue mich ___, dass du kommst.', options: ['darüber', 'darauf', 'daran'], besteAntwort: 0 },
  { frage: 'Hast du Angst ___ Spinnen?', options: ['von', 'vor', 'für'], besteAntwort: 1 },
  { frage: 'Er ärgert sich ___ das schlechte Wetter.', options: ['über', 'auf', 'um'], besteAntwort: 0 },
];

export default function KapitelVierPage() {
  return (
    <ChapterTemplate
      kapitelId="kapitel-4"
      kapitel={kapitel}
      wortschatz={wortschatz}
      partizipZwei={partizipZwei}
      grammatik={grammatik}
      goetheTasks={goetheTasks}
      lernTipps={lernTipps}
      miniQuiz={miniQuiz}
      LesenComponent={<LesenInteraktiv4 />}
      HorenComponent={<HorenInteraktiv4 />}
      SchreibenComponent={<UebungInteraktiv4 />}
      GrammatikInteraktivComponent={<GrammatikInteraktiv4 />}
      TestComponent={<KapitelTest4 />}
    />
  );
}
