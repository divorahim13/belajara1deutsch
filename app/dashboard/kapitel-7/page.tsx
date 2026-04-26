'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import ProgressTracker from '../ProgressTracker';

import KapitelTest7 from '../KapitelTest7';
import { LesenInteraktiv7 } from '../LesenInteraktiv7';
import { HorenInteraktiv7 } from '../HorenInteraktiv7';
import { UebungInteraktiv7 } from '../UebungInteraktiv7';
import { GrammatikInteraktiv7 } from '../GrammatikInteraktiv7';
import ChapterTemplate from '../components/ChapterTemplate';

// ============================================================
// DATA: Netzwerk Neu A2 – Kapitel 7: Ganz schön mobil
// ============================================================

const kapitel = {
  nummer: 7,
  titel: 'Ganz schön mobil',
  untertitel: 'Mobilität, Verkehrsmittel, Wegbeschreibung, Meinung, Arbeitsweg und Grafik',
  level: 'A2',
  goetheFokus: ['Lesen', 'Hören', 'Schreiben', 'Sprechen'],
  beschreibung: "Belajar meminta informasi, memahami dan memberi petunjuk arah, berbicara tentang transportasi, menyampaikan pendapat tentang kelebihan dan kekurangan, membahas perjalanan ke tempat kerja, mendeskripsikan grafik, memahami cerita perjalanan kereta, und menulis cerita pendek."
};

const wortschatz = [
  // Mobilität
  { de: 'die Mobilität', plural: '', id: 'mobilitas', beispiel: 'Mobilität ist wichtig in der Stadt.', kategorie: 'Mobilität' },
  { de: 'das Verkehrsmittel', plural: '-', id: 'alat transportasi', beispiel: 'Welches Verkehrsmittel nimmst du?', kategorie: 'Mobilität' },
  { de: 'die S-Bahn', plural: '-en', id: 'kereta kota', beispiel: 'Die S-Bahn fährt in die Vorstadt.', kategorie: 'Verkehrsmittel' },
  { de: 'das E-Bike', plural: '-s', id: 'sepeda listrik', beispiel: 'Ein E-Bike ist praktisch.', kategorie: 'Verkehrsmittel' },
  { de: 'der E-Scooter', plural: '-', id: 'skuter listrik', beispiel: 'Der E-Scooter macht Spaß.', kategorie: 'Verkehrsmittel' },
  { de: 'das Fahrzeug', plural: '-e', id: 'kendaraan', beispiel: 'Das Fahrzeug steht auf dem Parkplatz.', kategorie: 'Mobilität' },
  { de: 'der Pkw', plural: '-s', id: 'mobil penumpang', beispiel: 'Der Pkw ist neu.', kategorie: 'Mobilität' },
  { de: 'das Kennzeichen', plural: '-', id: 'plat nomor', beispiel: 'Welches Kennzeichen hat das Auto?', kategorie: 'Mobilität' },
  { de: 'der Motor', plural: '-en', id: 'mesin', beispiel: 'Der Motor macht Probleme.', kategorie: 'Auto' },
  { de: 'der Reifen', plural: '-', id: 'ban', beispiel: 'Der Reifen ist kaputt.', kategorie: 'Auto' },
  { de: 'der Diesel', plural: '', id: 'diesel', beispiel: 'Dieses Auto fährt mit Diesel.', kategorie: 'Auto' },
  { de: 'die Fahrt', plural: '-en', id: 'perjalanan', beispiel: 'Die Fahrt dauert lange.', kategorie: 'Mobilität' },
  { de: 'der Weg', plural: '-e', id: 'jalan/rute', beispiel: 'Der Weg zur Arbeit.', kategorie: 'Mobilität' },
  
  // Verkehr & Probleme
  { de: 'der Stau', plural: '-s', id: 'kemacetan', beispiel: 'Lukas steht im Stau.', kategorie: 'Problem' },
  { de: 'die Ampel', plural: '-n', id: 'lampu lalu lintas', beispiel: 'Lukas muss an der Ampel halten.', kategorie: 'Verkehr' },
  { de: 'die Panne', plural: '-n', id: 'kerusakan kendaraan', beispiel: 'Lukas hat eine Panne.', kategorie: 'Problem' },
  { de: 'der Parkplatz', plural: '"-e', id: 'tempat parkir', beispiel: 'Lukas findet keinen Parkplatz.', kategorie: 'Verkehr' },
  { de: 'das Parkhaus', plural: '"-er', id: 'gedung parkir', beispiel: 'Wir fahren ins Parkhaus.', kategorie: 'Verkehr' },
  { de: 'die Verspätung', plural: '-en', id: 'keterlambatan', beispiel: 'Der Zug hat Verspätung.', kategorie: 'Problem' },
  { de: 'der Anschluss', plural: '"-e', id: 'koneksi kendaraan', beispiel: 'Ich habe den Anschluss verpasst.', kategorie: 'Problem' },
  { de: 'der Helm', plural: '-e', id: 'helm', beispiel: 'Du musst einen Helm tragen.', kategorie: 'Verkehr' },
  
  // Sharing & Technik
  { de: 'die Kaution', plural: '-en', id: 'deposit/jaminan', beispiel: 'Ist eine Kaution nötig?', kategorie: 'Sharing' },
  { de: 'die Kreditkarte', plural: '-n', id: 'kartu kredit', beispiel: 'Kann man mit Kreditkarte zahlen?', kategorie: 'Payment' },
  { de: 'der Kundenservice', plural: '', id: 'layanan pelanggan', beispiel: 'Ich rufe den Kundenservice an.', kategorie: 'Service' },
  { de: 'die Platzreservierung', plural: '-en', id: 'reservasi tempat duduk', beispiel: 'Wir haben eine Platzreservierung.', kategorie: 'Zug' },
  { de: 'der Kinderwagen', plural: '-', id: 'stroller', beispiel: 'Wo ist der Platz für den Kinderwagen?', kategorie: 'Zug' },
  { de: 'das Kinderabteil', plural: '-e', id: 'kompartemen anak', beispiel: 'Gibt es ein Kinderabteil?', kategorie: 'Zug' },
  { de: 'das Bordbistro', plural: '-s', id: 'restoran di kereta', beispiel: 'Ich gehe ins Bordbistro.', kategorie: 'Zug' },
  { de: 'die Toilette', plural: '-n', id: 'toilet', beispiel: 'Wo ist die Toilette?', kategorie: 'Zug' },
  { de: 'das Getränk', plural: '-e', id: 'minuman', beispiel: 'Ich kaufe ein Getränk.', kategorie: 'Zug' },
  { de: 'die Versicherung', plural: '-en', id: 'asuransi', beispiel: 'Ist man bei der Fahrt versichert?', kategorie: 'Sharing' },
  { de: 'die Linie', plural: '-n', id: 'jalur', beispiel: 'Welche Linie nimmst du?', kategorie: 'Verkehr' },
  { de: 'die Haltestelle', plural: '-n', id: 'halte', beispiel: 'Die nächste Haltestelle ist am Rathaus.', kategorie: 'Verkehr' },
  { de: 'der Flughafen', plural: '"-', id: 'bandara', beispiel: 'Wir fahren zum Flughafen.', kategorie: 'Verkehr' },
  { de: 'das Flugzeug', plural: '-e', id: 'pesawat', beispiel: 'Das Flugzeug startet bald.', kategorie: 'Verkehr' },
  { de: 'die Garage', plural: '-n', id: 'garasi', beispiel: 'Das Auto steht in der Garage.', kategorie: 'Auto' },
  { de: 'die Tankstelle', plural: '-n', id: 'pom bensin', beispiel: 'Wir müssen zur Tankstelle.', kategorie: 'Auto' },
  { de: 'der Flug', plural: '"-e', id: 'penerbangan', beispiel: 'Der Flug war angenehm.', kategorie: 'Verkehr' },
  { de: 'der TÜV', plural: '', id: 'inspeksi kendaraan', beispiel: 'Das Auto muss zum TÜV.', kategorie: 'Auto' },
  
  // Flexi App
  { de: 'die App', plural: '-s', id: 'aplikasi', beispiel: 'Man lädt die App herunter.', kategorie: 'Sharing' },
  { de: 'die PIN', plural: '-s', id: 'PIN', beispiel: 'Man bekommt eine PIN.', kategorie: 'Technik' },
  { de: 'der Bordcomputer', plural: '-', id: 'komputer kendaraan', beispiel: 'Man gibt die PIN in den Bordcomputer ein.', kategorie: 'Technik' },
  { de: 'der Tarif', plural: '-e', id: 'tarif', beispiel: 'Die Tarife findet man online.', kategorie: 'Sharing' },
  { de: 'die Nähe', plural: '', id: 'sekitar/kedekatan', beispiel: 'Ein Auto in der Nähe finden.', kategorie: 'Ort' },

  // Arbeitsweg & Berufe
  { de: 'die Grafikerin', plural: '-nen', id: 'desainer grafis', beispiel: 'Sie arbeitet als Grafikerin.', kategorie: 'Berufe' },
  { de: 'der Arzt', plural: '"-e', id: 'dokter', beispiel: 'Der Arzt hat eine Praxis.', kategorie: 'Berufe' },
  { de: 'der Student', plural: '-en', id: 'mahasiswa', beispiel: 'Der Student fährt zur Uni.', kategorie: 'Berufe' },
  { de: 'das Gewitter', plural: '-', id: 'badai petir', beispiel: 'Bei Gewitter fahre ich nicht Fahrrad.', kategorie: 'Wetter' },
  { de: 'das Glatteis', plural: '', id: 'jalan es licin', beispiel: 'Glatteis ist gefährlich.', kategorie: 'Wetter' },
  { de: 'die Praxis', plural: 'Praxen', id: 'tempat praktik', beispiel: 'Seine Praxis ist gleich beim Bahnhof.', kategorie: 'Ort' },
  { de: 'die Richtung', plural: '-en', id: 'arah', beispiel: 'In welche Richtung gehst du?', kategorie: 'Ort' },
  { de: 'die Lebensqualität', plural: '', id: 'kualitas hidup', beispiel: 'Lange Wege wirken negativ auf die Lebensqualität.', kategorie: 'Leben' },
  { de: 'der Pendler', plural: '-', id: 'komuter', beispiel: 'Viele Pendler nutzen den Zug.', kategorie: 'Berufe' },
  
  // Verben
  { de: 'tanken', plural: '', id: 'mengisi bensin', beispiel: 'Er hat getankt.', kategorie: 'Verben' },
  { de: 'parken', plural: '', id: 'parkir', beispiel: 'Er hat das Auto geparkt.', kategorie: 'Verben' },
  { de: 'bremsen', plural: '', id: 'mengerem', beispiel: 'Er hat gebremst.', kategorie: 'Verben' },
  { de: 'reparieren', plural: '', id: 'memperbaiki', beispiel: 'Das Auto wird repariert.', kategorie: 'Verben' },
  { de: 'herunterladen', plural: '', id: 'mengunduh', beispiel: 'Man lädt die App herunter.', kategorie: 'Verben' },
  { de: 'registrieren', plural: '', id: 'mendaftar', beispiel: 'Man registriert sich.', kategorie: 'Verben' },
  { de: 'wählen', plural: '', id: 'memilih', beispiel: 'Das Rad auswählen.', kategorie: 'Verben' },
  { de: 'finden', plural: '', id: 'menemukan', beispiel: 'Ein Auto in der Nähe finden.', kategorie: 'Verben' },
  { de: 'bekommen', plural: '', id: 'mendapatkan', beispiel: 'Man bekommt eine PIN.', kategorie: 'Verben' },
  { de: 'eingeben', plural: '', id: 'memasukkan', beispiel: 'Man gibt die PIN ein.', kategorie: 'Verben' },
  { de: 'leihen', plural: '', id: 'menyewa/meminjam', beispiel: 'Ein Rad leihen.', kategorie: 'Verben' },
  { de: 'abstellen', plural: '', id: 'memarkir/menaruh', beispiel: 'Das Auto abstellen.', kategorie: 'Verben' },
  { de: 'zahlen', plural: '', id: 'membayar', beispiel: 'Mit Kreditkarte zahlen.', kategorie: 'Verben' },
  { de: 'tragen', plural: '', id: 'memakai', beispiel: 'Einen Helm tragen.', kategorie: 'Verben' },
  { de: 'erreichen', plural: '', id: 'menghubungi', beispiel: 'Den Service erreichen.', kategorie: 'Verben' },
  { de: 'einsteigen', plural: '', id: 'naik kendaraan', beispiel: 'In den Zug einsteigen.', kategorie: 'Verben' },
  { de: 'aussteigen', plural: '', id: 'turun kendaraan', beispiel: 'Aus der U-Bahn aussteigen.', kategorie: 'Verben' },
  { de: 'pendeln', plural: '', id: 'pulang-pergi', beispiel: 'Langes Pendeln nervt.', kategorie: 'Verben' },
  { de: 'dauern', plural: '', id: 'memakan waktu', beispiel: 'Der Weg dauert 30 Minuten.', kategorie: 'Verben' },
  { de: 'klatschen', plural: '', id: 'bertepuk tangan', beispiel: 'Die Menschen haben geklatscht.', kategorie: 'Verben' },
  { de: 'weiterfahren', plural: '', id: 'melanjutkan perjalanan', beispiel: 'Der Zug fährt weiter.', kategorie: 'Verben' }
];

const partizipZwei = [
  { infinitiv: 'verpassen', partizip: 'verpasst', hilfsverb: 'haben', id: 'ketinggalan' },
  { infinitiv: 'tanken', partizip: 'getankt', hilfsverb: 'haben', id: 'mengisi bensin' },
  { infinitiv: 'weiterfahren', partizip: 'weitergefahren', hilfsverb: 'sein', id: 'melanjutkan perjalanan' },
  { infinitiv: 'herunterladen', partizip: 'heruntergeladen', hilfsverb: 'haben', id: 'mengunduh' },
  { infinitiv: 'sich registrieren', partizip: 'sich registriert', hilfsverb: 'haben', id: 'mendaftar' },
  { infinitiv: 'wählen', partizip: 'gewählt', hilfsverb: 'haben', id: 'memilih' },
  { infinitiv: 'eingeben', partizip: 'eingegeben', hilfsverb: 'haben', id: 'memasukkan' },
  { infinitiv: 'losfahren', partizip: 'losgefahren', hilfsverb: 'sein', id: 'berangkat' },
  { infinitiv: 'zahlen', partizip: 'gezahlt', hilfsverb: 'haben', id: 'membayar' },
  { infinitiv: 'erreichen', partizip: 'erreicht', hilfsverb: 'haben', id: 'mencapai' },
  { infinitiv: 'abstellen', partizip: 'abgestellt', hilfsverb: 'haben', id: 'memarkir' },
  { infinitiv: 'übernachten', partizip: 'übernachtet', hilfsverb: 'haben', id: 'menginap' },
  { infinitiv: 'vorbeigehen', partizip: 'vorbeigegangen', hilfsverb: 'sein', id: 'melewati' },
  { infinitiv: 'vergleichen', partizip: 'verglichen', hilfsverb: 'haben', id: 'membandingkan' },
  { infinitiv: 'beschreiben', partizip: 'beschrieben', hilfsverb: 'haben', id: 'mendeskripsikan' },
  { infinitiv: 'pendeln', partizip: 'gependelt', hilfsverb: 'sein', id: 'pulang-pergi' },
  { infinitiv: 'dauern', partizip: 'gedauert', hilfsverb: 'haben', id: 'memakan waktu' },
  { infinitiv: 'überraschen', partizip: 'überrascht', hilfsverb: 'haben', id: 'mengejutkan' },
  { infinitiv: 'klatschen', partizip: 'geklatscht', hilfsverb: 'haben', id: 'bertepuk tangan' },
  { infinitiv: 'zurückgeben', partizip: 'zurückgegeben', hilfsverb: 'haben', id: 'mengembalikan' },
  { infinitiv: 'spazieren gehen', partizip: 'spazieren gegangen', hilfsverb: 'sein', id: 'berjalan-jalan' },
  { infinitiv: 'halten', partizip: 'gehalten', hilfsverb: 'haben', id: 'berhenti/memegang' },
  { infinitiv: 'bremsen', partizip: 'gebremst', hilfsverb: 'haben', id: 'mengerem' },
  { infinitiv: 'landen', partizip: 'gelandet', hilfsverb: 'sein', id: 'mendarat' },
  { infinitiv: 'buchen', partizip: 'gebucht', hilfsverb: 'haben', id: 'memesan' }
];

const grammatik = [
  {
    titel: 'Indirekte Fragesätze',
    name: 'W-Fragen',
    farbe: 'border-l-sky-500 bg-sky-50 text-sky-900',
    erklaerung: 'Indirekte Fragesätze mit W-Fragen verwenden das W-Wort. Das Verb steht am Ende des Nebensatzes.',
    struktur: 'W-Frage + Subjekt + Ergänzung + Verb am Satzende',
    konjugationsTabelle: null,
    beispiele: [
      { 
        de: 'Warum fährt der Zug nicht weiter?', 
        id: 'Der Mann fragt, warum der Zug nicht weiterfährt.', 
        highlight: 'warum der Zug nicht weiterfährt.' 
      },
      { 
        de: 'Wo finde ich das Bordbistro?', 
        id: 'Können Sie mir sagen, wo ich das Bordbistro finde?', 
        highlight: 'wo ich das Bordbistro finde?' 
      }
    ],
  },
  {
    titel: 'Indirekte Fragesätze',
    name: 'Ja/Nein-Fragen (ob)',
    farbe: 'border-l-indigo-500 bg-indigo-50 text-indigo-900',
    erklaerung: 'Wenn eine direkte Frage mit Ja oder Nein beantwortet werden kann, benutzt man in der indirekten Frage "ob". Das Verb steht am Ende.',
    struktur: 'ob + Subjekt + Ergänzung + Verb am Satzende',
    konjugationsTabelle: null,
    beispiele: [
      { 
        de: 'Braucht man einen Führerschein?', 
        id: 'Er fragt, ob man einen Führerschein braucht.', 
        highlight: 'ob man einen Führerschein braucht.' 
      },
      { 
        de: 'Kann ich mit Kreditkarte zahlen?', 
        id: 'Ich möchte wissen, ob ich mit Kreditkarte zahlen kann.', 
        highlight: 'ob ich mit Kreditkarte zahlen kann.' 
      }
    ],
  },
  {
    titel: 'Lokale Präpositionen',
    name: 'Ortsangaben',
    farbe: 'border-l-emerald-500 bg-emerald-50 text-emerald-900',
    erklaerung: 'Verschiedene Präpositionen für die Wegbeschreibung:',
    struktur: 'an ... vorbei + Dativ | durch + Akkusativ | bis zu + Dativ | gegenüber von + Dativ',
    konjugationsTabelle: null,
    beispiele: [
      { 
        de: 'Geh am Kaufhaus vorbei.', 
        id: 'am Kaufhaus', 
        highlight: 'am Kaufhaus vorbei' 
      },
      { 
        de: 'Dann gehst du durch den Park.', 
        id: 'durch den Park', 
        highlight: 'durch den Park' 
      },
      { 
        de: 'Geh bis zur Kirche.', 
        id: 'bis zur Kirche', 
        highlight: 'bis zur Kirche' 
      },
      { 
        de: 'Das Café ist gegenüber vom Bahnhof.', 
        id: 'gegenüber vom Bahnhof', 
        highlight: 'gegenüber vom Bahnhof' 
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
      { text: 'Informationen aus Texten zu Mobilität entnehmen', type: 'Detailverständnis' },
      { text: 'Einfache Grafiken und Statistiken verstehen', type: 'Globalverständnis' },
    ]
  },
  {
    skill: 'Hören',
    icon: '🎧',
    farbe: 'bg-indigo-100 text-indigo-700',
    tasks: [
      { text: 'Wegbeschreibungen im Detail verstehen', type: 'Detailverständnis' },
      { text: 'Geschichten und Probleme im Zug verstehen', type: 'Globalverständnis' },
    ]
  },
  {
    skill: 'Schreiben',
    icon: '✍️',
    farbe: 'bg-rose-100 text-rose-700',
    tasks: [
      { text: 'Eine Wegbeschreibung in kurzen Sätzen formulieren', type: 'Produktion' },
      { text: 'Die eigene Meinung mit Begründung schreiben', type: 'Produktion' },
    ]
  }
];

const lernTipps = [
  {
    nummer: 1,
    titel: 'Indirekte Fragen Höflichkeit',
    icon: '🗣️',
    farbe: 'bg-indigo-100 text-indigo-600',
    beschreibung: 'Benutzen Sie immer indirekte Fragen, wenn Sie jemanden höflich nach dem Weg fragen (z.B. "Könnten Sie mir sagen, wo...").',
    tag: 'Kommunikation'
  },
  {
    nummer: 2,
    titel: 'Komposita Aussprache',
    icon: '🎙️',
    farbe: 'bg-rose-100 text-rose-600',
    beschreibung: 'Bei zusammengesetzten Nomen (Komposita) wird immer das ERSTE Wort betont: BAHNhofshalle, PLATZreservierung.',
    tag: 'Aussprache'
  },
  {
    nummer: 3,
    titel: 'Präpositionen lernen',
    icon: '🗺️',
    farbe: 'bg-emerald-100 text-emerald-600',
    beschreibung: 'Lernen Sie Präpositionen am besten gleich mit dem richtigen Fall: "durch + Akkusativ", "an ... vorbei + Dativ".',
    tag: 'Grammatik'
  }
];

const miniQuiz = [
  {
    frage: 'Welches Wort ist richtig: "Der Zug hat ..."?',
    options: ['Stau', 'Verspätung', 'Baustelle', 'Panne'],
    besteAntwort: 1
  },
  {
    frage: 'Wie bildet man die indirekte Frage von: "Wann kommt der Zug?"',
    options: ['Er fragt, wann kommt der Zug.', 'Er fragt, wann der Zug kommt.', 'Er fragt, ob der Zug kommt.', 'Er fragt, wann der Zug kommen.'],
    besteAntwort: 1
  },
  {
    frage: 'Welche Präposition ist richtig: "Er geht ___ den Park."?',
    options: ['durch', 'an', 'gegenüber', 'bis'],
    besteAntwort: 0
  }
];

export default function Kapitel7Dashboard() {
  return (
    <ChapterTemplate 
      kapitelId="kapitel-7"
      kapitel={kapitel}
      wortschatz={wortschatz}
      partizipZwei={partizipZwei}
      grammatik={grammatik}
      goetheTasks={goetheTasks}
      lernTipps={lernTipps}
      miniQuiz={miniQuiz}
      
      LesenComponent={<LesenInteraktiv7 />}
      HorenComponent={<HorenInteraktiv7 />}
      SchreibenComponent={<UebungInteraktiv7 />}
      GrammatikInteraktivComponent={<GrammatikInteraktiv7 />}
      TestComponent={<KapitelTest7 />}
    />
  );
}
