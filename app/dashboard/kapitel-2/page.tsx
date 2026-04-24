'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import KapitelTest2 from '../KapitelTest2';
import { LesenInteraktiv2 } from './LesenInteraktiv2';
import { HorenInteraktiv2 } from './HorenInteraktiv2';
import { UebungInteraktiv2 } from './UebungInteraktiv2';
import ProgressTracker, { MarkCompleteButton } from '../ProgressTracker';
import { GrammatikInteraktiv2 } from './GrammatikInteraktiv2';

// ============================================================
// DATA: Netzwerk Neu A2 – Kapitel 2: Und was machst du?
// ============================================================

const kapitel = {
  nummer: 2,
  titel: 'Nach der Schulzeit',
  untertitel: 'Ausbildung, Studium & Berufsleben',
  level: 'A2',
  goetheFokus: ['Lesen', 'Hören', 'Schreiben', 'Sprechen'],
};

const wortschatz: { de: string; plural?: string; id: string; beispiel: string; kategorie: string }[] = [
  // Sprachen
  
  // Beruf & Studium
  { de: 'der Beruf', plural: '-e', id: 'pekerjaan / profesi', beispiel: 'Was ist dein Beruf?', kategorie: 'Beruf' },
  { de: 'das Gehalt', plural: '"-er', id: 'gaji', beispiel: 'Das Gehalt ist sehr gut.', kategorie: 'Beruf' },
  { de: 'verdienen', id: 'menghasilkan (uang)', beispiel: 'Sie verdient viel Geld.', kategorie: 'Beruf' },
  { de: 'die Lehre', plural: '-n', id: 'magang profesi', beispiel: 'Er macht eine Lehre als Elektriker.', kategorie: 'Beruf' },
  { de: 'die Vorlesung', plural: '-en', id: 'kuliah (mata kuliah)', beispiel: 'Die Vorlesung beginnt um 8 Uhr.', kategorie: 'Beruf' },
  { de: 'der/die Auszubildende', plural: '-n', id: 'peserta magang / pelatihan', beispiel: 'Der Auszubildende lernt den Beruf.', kategorie: 'Beruf' },
  { de: 'das Zeugnis', plural: '-se', id: 'rapor / ijazah', beispiel: 'Ich habe ein gutes Zeugnis bekommen.', kategorie: 'Beruf' },
  { de: 'die Universität', plural: '-en', id: 'universitas', beispiel: 'Sie studiert an der Universität.', kategorie: 'Beruf' },
  { de: 'der Professor / die Professorin', plural: '-en / -nen', id: 'profesor', beispiel: 'Der Professor hält eine Vorlesung.', kategorie: 'Beruf' },
  { de: 'die Berufsschule', plural: '-n', id: 'sekolah kejuruan', beispiel: 'Er geht zweimal pro Woche in die Berufsschule.', kategorie: 'Beruf' },
  { de: 'das Handwerk', plural: '-e', id: 'kerajinan / pekerjaan tangan', beispiel: 'Das Handwerk hat goldenen Boden.', kategorie: 'Beruf' },
  { de: 'betreuen', id: 'mengurus / merawat', beispiel: 'Er betreut die Kunden gut.', kategorie: 'Beruf' },
  { de: 'der Altenpfleger / die Altenpflegerin', plural: '- / -nen', id: 'perawat lansia', beispiel: 'Der Altenpfleger hilft alten Menschen.', kategorie: 'Beruf' },
  { de: 'die Arzthelferin', plural: '-nen', id: 'asisten dokter', beispiel: 'Die Arzthelferin arbeitet in der Praxis.', kategorie: 'Beruf' },
  { de: 'der Gärtner / die Gärtnerin', plural: '- / -nen', id: 'tukang kebun', beispiel: 'Der Gärtner pflanzt Blumen.', kategorie: 'Beruf' },
  { de: 'der Grafiker / die Grafikerin', plural: '- / -nen', id: 'desainer grafis', beispiel: 'Die Grafikerin entwirft ein Logo.', kategorie: 'Beruf' },
  { de: 'der Hotelkaufmann / die Hotelkauffrau', plural: '"-er / -en', id: 'staf manajemen hotel', beispiel: 'Er lernt Hotelkaufmann.', kategorie: 'Beruf' },
  { de: 'die Krankenschwester / der Krankenpfleger', plural: '-n / -', id: 'perawat', beispiel: 'Die Krankenschwester arbeitet im Krankenhaus.', kategorie: 'Beruf' },
  { de: 'die Arbeitswelt', id: 'dunia kerja', beispiel: 'Die Arbeitswelt verändert sich.', kategorie: 'Beruf' },
  { de: 'der Azubi', plural: '-s', id: 'peserta magang', beispiel: 'Der Azubi lernt viel.', kategorie: 'Beruf' },
  { de: 'die Berufserfahrung', plural: '-en', id: 'pengalaman kerja', beispiel: 'Sie hat viel Berufserfahrung.', kategorie: 'Beruf' },
  { de: 'das Berufsleben', id: 'kehidupan profesional', beispiel: 'Das Berufsleben ist manchmal anstrengend.', kategorie: 'Beruf' },
  { de: 'die Messe', plural: '-n', id: 'pameran dagang', beispiel: 'Wir besuchen eine Messe.', kategorie: 'Beruf' },
  { de: 'die Arztpraxis', plural: 'Arztpraxen', id: 'klinik dokter', beispiel: 'Ich rufe in der Arztpraxis an.', kategorie: 'Beruf' },
  { de: 'das Reisebüro', plural: '-s', id: 'agen perjalanan', beispiel: 'Wir buchen den Urlaub im Reisebüro.', kategorie: 'Beruf' },
  { de: 'die Werbeagentur', plural: '-en', id: 'agen periklanan', beispiel: 'Er arbeitet in einer Werbeagentur.', kategorie: 'Beruf' },
  { de: 'Jura', id: 'ilmu hukum', beispiel: 'Sie studiert Jura.', kategorie: 'Beruf' },
  { de: 'Medizin', id: 'kedokteran', beispiel: 'Er möchte Medizin studieren.', kategorie: 'Beruf' },
  { de: 'die AG', plural: '-s', id: 'perusahaan saham (Aktiengesellschaft)', beispiel: 'Er arbeitet bei einer großen AG.', kategorie: 'Beruf' },
  { de: 'der Sprachkurs', plural: '-e', id: 'kursus bahasa', beispiel: 'Ich besuche einen Sprachkurs.', kategorie: 'Beruf' },

  // Schule
  { de: 'die Schulzeit', id: 'masa sekolah', beispiel: 'Die Schulzeit war eine schöne Zeit.', kategorie: 'Schule' },
  { de: 'die Schuluniform', plural: '-en', id: 'seragam sekolah', beispiel: 'Wir mussten eine Schuluniform tragen.', kategorie: 'Schule' },
  { de: 'das Fach', plural: '"-er', id: 'mata pelajaran', beispiel: 'Mathe war mein Lieblingsfach.', kategorie: 'Schule' },
  { de: 'der Schulweg', plural: '-e', id: 'perjalanan ke sekolah', beispiel: 'Mein Schulweg war nicht weit.', kategorie: 'Schule' },
  { de: 'die Grundschule', plural: '-n', id: 'sekolah dasar', beispiel: 'Die Grundschule dauert vier Jahre.', kategorie: 'Schule' },
  { de: 'die Hauptschule', plural: '-n', id: 'SMP/SMA Fokus Praktikal (Kelas 5-9)', beispiel: 'Er war in der Hauptschule. (Lulusannya langsung kerja magang fisik/Handwerk)', kategorie: 'Schule' },
  { de: 'die Realschule', plural: '-n', id: 'SMP/SMA Fokus Bisnis/Jasa (Kelas 5-10)', beispiel: 'Sie hat den Realschulabschluss gemacht. (Lulusannya kerja kantoran/pelayanan)', kategorie: 'Schule' },
  { de: 'das Gymnasium', plural: 'Gymnasien', id: 'SMP/SMA Fokus Akademis (Kelas 5-12/13)', beispiel: 'Nach dem Gymnasium mache ich Abitur. (Sekolah tertinggi, syarat wajib masuk Universitas)', kategorie: 'Schule' },
  { de: 'die Gesamtschule', plural: '-n', id: 'Sekolah Menengah Gabungan', beispiel: 'In der Gesamtschule gibt es alle Abschlüsse. (Menggabungkan ketiga sistem di atas)', kategorie: 'Schule' },
  { de: 'das Abitur', id: 'ijazah SMA (Jerman)', beispiel: 'Mit dem Abitur kann man studieren.', kategorie: 'Schule' },
  { de: 'der Abschluss', plural: '"-e', id: 'kelulusan', beispiel: 'Welchen Abschluss machst du?', kategorie: 'Schule' },
  { de: 'streng', id: 'tegas / galak', beispiel: 'Der Lehrer war sehr streng.', kategorie: 'Schule' },
  { de: 'die Klasse', plural: '-n', id: 'kelas', beispiel: 'Meine Klasse ist sehr nett.', kategorie: 'Schule' },
  { de: 'der Schüler / die Schülerin', plural: '- / -nen', id: 'murid', beispiel: 'Die Schüler machen Hausaufgaben.', kategorie: 'Schule' },
  { de: 'der Unterricht', plural: '-', id: 'pelajaran / kelas', beispiel: 'Der Unterricht beginnt um 8 Uhr.', kategorie: 'Schule' },
  { de: 'die Freizeit', plural: '-', id: 'waktu luang', beispiel: 'In meiner Freizeit spiele ich Fußball.', kategorie: 'Schule' },
  { de: 'die Sommerferien', plural: '(nur Plural)', id: 'libur musim panas', beispiel: 'Wir hatten sechs Wochen Sommerferien.', kategorie: 'Schule' },
  { de: 'die Hausaufgabe', plural: '-n', id: 'pekerjaan rumah (PR)', beispiel: 'Ich muss noch Hausaufgaben machen.', kategorie: 'Schule' },
  { de: 'der Schulausflug', plural: '"-e', id: 'karyawisata sekolah', beispiel: 'Wir machen einen Schulausflug nach Berlin.', kategorie: 'Schule' },
  { de: 'die Schulkantine', plural: '-n', id: 'kantin sekolah', beispiel: 'Das Essen in der Schulkantine ist gut.', kategorie: 'Schule' },
  { de: 'der Biologieunterricht', plural: '-', id: 'pelajaran biologi', beispiel: 'Der Biologieunterricht war interessant.', kategorie: 'Schule' },
  { de: 'die Mathematik / Mathe', plural: '-', id: 'matematika', beispiel: 'Mathe ist mein Lieblingsfach.', kategorie: 'Schule' },
  { de: 'die Physik', plural: '-', id: 'fisika', beispiel: 'Physik finde ich schwer.', kategorie: 'Schule' },
  { de: 'die Chemie', plural: '-', id: 'kimia', beispiel: 'Wir machen ein Experiment in Chemie.', kategorie: 'Schule' },
  { de: 'die Geografie', plural: '-', id: 'geografi', beispiel: 'Geografie ist interessant.', kategorie: 'Schule' },
  { de: 'die Informatik', plural: '-', id: 'ilmu komputer', beispiel: 'Ich lerne programmieren in Informatik.', kategorie: 'Schule' },
  { de: 'die Sozialkunde', plural: '-', id: 'ilmu sosial', beispiel: 'In Sozialkunde sprechen wir über Politik.', kategorie: 'Schule' },
  { de: 'die Kunst', plural: '"-e', id: 'seni', beispiel: 'Ich zeichne gern in Kunst.', kategorie: 'Schule' },
  { de: 'der Sport', plural: '-', id: 'olahraga', beispiel: 'Sport macht mir Spaß.', kategorie: 'Schule' },
  { de: 'die Religion', plural: '-en', id: 'agama', beispiel: 'Wir diskutieren viel in Religion.', kategorie: 'Schule' },
  { de: 'die Musik', plural: '-', id: 'musik', beispiel: 'Wir singen im Musikunterricht.', kategorie: 'Schule' },
  { de: 'das Latein', plural: '-', id: 'bahasa Latin', beispiel: 'Latein ist eine alte Sprache.', kategorie: 'Schule' },
  { de: 'das Englisch', plural: '-', id: 'bahasa Inggris', beispiel: 'Englisch ist wichtig für den Beruf.', kategorie: 'Schule' },
  { de: 'der Mitschüler / die Mitschülerin', plural: '- / -nen', id: 'teman sekelas', beispiel: 'Meine Mitschüler sind nett.', kategorie: 'Schule' },
  { de: 'das Klassentreffen', plural: '-', id: 'reuni kelas', beispiel: 'Wir organisieren ein Klassentreffen.', kategorie: 'Schule' },
  { de: 'die Geschichte', plural: '-n', id: 'sejarah', beispiel: 'Geschichte ist sehr spannend.', kategorie: 'Schule' },
  { de: 'die Wirtschaft', plural: '-en', id: 'ekonomi', beispiel: 'Wirtschaft ist ein wichtiges Fach.', kategorie: 'Schule' },
  { de: 'der Schulabschluss', plural: '"-e', id: 'ijazah kelulusan sekolah', beispiel: 'Welchen Schulabschluss hast du?', kategorie: 'Schule' },
  { de: 'der Direktor / die Direktorin', plural: '- / -nen', id: 'kepala sekolah', beispiel: 'Der Direktor hält eine Rede.', kategorie: 'Schule' },
  { de: 'das Klassenzimmer', plural: '-', id: 'ruang kelas', beispiel: 'Wir lernen im Klassenzimmer.', kategorie: 'Schule' },
  { de: 'die Unterrichtszeit', plural: '-en', id: 'waktu pelajaran', beispiel: 'Die Unterrichtszeit ist lang.', kategorie: 'Schule' },
  { de: 'der Stundenplan', plural: '"-e', id: 'jadwal pelajaran', beispiel: 'Mein Stundenplan ist voll.', kategorie: 'Schule' },
  { de: 'die Cafeteria', plural: 'Cafeterien', id: 'kafeteria', beispiel: 'Wir essen in der Cafeteria.', kategorie: 'Schule' },
  { de: 'die Klassenfahrt', plural: '-en', id: 'karyawisata kelas', beispiel: 'Die Klassenfahrt war super.', kategorie: 'Schule' },
  { de: 'die Ferien', plural: '(nur Plural)', id: 'liburan sekolah', beispiel: 'Bald sind Ferien.', kategorie: 'Schule' },
  { de: 'die Vorbereitung', plural: '-en', id: 'persiapan', beispiel: 'Die Vorbereitung auf den Test ist wichtig.', kategorie: 'Schule' },
  { de: 'der Vokabeltest', plural: '-s', id: 'tes kosakata', beispiel: 'Wir schreiben heute einen Vokabeltest.', kategorie: 'Schule' },
  { de: 'das Schulsystem', plural: '-e', id: 'sistem sekolah', beispiel: 'Das Schulsystem in Deutschland ist anders.', kategorie: 'Schule' },
  { de: 'das Lieblingsfach', plural: '"-er', id: 'mata pelajaran favorit', beispiel: 'Was ist dein Lieblingsfach?', kategorie: 'Schule' },

  // Weitere Begriffe
  { de: 'die Erfahrung', plural: '-en', id: 'pengalaman', beispiel: 'Ich sammle viele Erfahrungen.', kategorie: 'Weitere Begriffe' },
  { de: 'unabhängig', id: 'mandiri', beispiel: 'Ich möchte unabhängig von meinen Eltern sein.', kategorie: 'Weitere Begriffe' },
  { de: 'erwachsen', id: 'dewasa', beispiel: 'Ich wollte immer erwachsen sein.', kategorie: 'Weitere Begriffe' },
  { de: 'die Pause', plural: '-n', id: 'istirahat', beispiel: 'Wir haben jetzt eine Pause.', kategorie: 'Weitere Begriffe' },
  { de: 'die Erinnerung', plural: '-en', id: 'kenangan', beispiel: 'Ich habe gute Erinnerungen an die Schule.', kategorie: 'Weitere Begriffe' },
  { de: 'die Aussprache', plural: '-n', id: 'pelafalan', beispiel: 'Die deutsche Aussprache ist schwer.', kategorie: 'Weitere Begriffe' },
  { de: 'der Fehler', plural: '-', id: 'kesalahan', beispiel: 'Ich habe Angst vor Fehlern.', kategorie: 'Weitere Begriffe' },
  { de: 'die Zeitschrift', plural: '-en', id: 'majalah', beispiel: 'Ich lese eine Zeitschrift.', kategorie: 'Weitere Begriffe' },
  { de: 'das Au-Pair', plural: '-s', id: 'au-pair', beispiel: 'Sie arbeitet als Au-Pair in Paris.', kategorie: 'Weitere Begriffe' },
  { de: 'die Behinderung', plural: '-en', id: 'disabilitas', beispiel: 'Er lebt mit einer Behinderung.', kategorie: 'Weitere Begriffe' },
  { de: 'sozial', id: 'sosial', beispiel: 'Sie ist sehr sozial aktiv.', kategorie: 'Weitere Begriffe' },
  { de: 'aktiv', id: 'aktif', beispiel: 'Ich bin sportlich aktiv.', kategorie: 'Weitere Begriffe' },
  { de: 'der Rollstuhl', plural: '"-e', id: 'kursi roda', beispiel: 'Er sitzt im Rollstuhl.', kategorie: 'Weitere Begriffe' },
  { de: 'das Hotel', plural: '-s', id: 'hotel', beispiel: 'Das Hotel liegt am Strand.', kategorie: 'Weitere Begriffe' },
  { de: 'der Ausflug', plural: '"-e', id: 'karyawisata / perjalanan', beispiel: 'Wir machen einen Ausflug.', kategorie: 'Weitere Begriffe' },
  { de: 'circa', id: 'sekitar / kurang lebih', beispiel: 'Das dauert circa eine Stunde.', kategorie: 'Weitere Begriffe' },
  { de: 'das Zentrum', plural: 'Zentren', id: 'pusat kota', beispiel: 'Die Uni liegt im Zentrum.', kategorie: 'Weitere Begriffe' },
  { de: 'beliebt', id: 'populer / disukai', beispiel: 'Das Fach ist sehr beliebt.', kategorie: 'Weitere Begriffe' },
  { de: 'der Stress', plural: '-', id: 'stres', beispiel: 'Ich habe im Moment viel Stress.', kategorie: 'Weitere Begriffe' },
  { de: 'nützlich', id: 'berguna', beispiel: 'Die App ist sehr nützlich.', kategorie: 'Weitere Begriffe' },
  { de: 'die Dauer', id: 'durasi', beispiel: 'Die Dauer ist eine Stunde.', kategorie: 'Weitere Begriffe' },
  { de: 'das Bundesland', plural: '"-er', id: 'negara bagian', beispiel: 'Hessen ist ein Bundesland.', kategorie: 'Weitere Begriffe' },
  { de: 'die Meinung', plural: '-en', id: 'pendapat', beispiel: 'Was ist deine Meinung?', kategorie: 'Weitere Begriffe' },
  { de: 'witzig', id: 'lucu', beispiel: 'Der Film war sehr witzig.', kategorie: 'Weitere Begriffe' },
  { de: 'furchtbar', id: 'mengerikan / sangat buruk', beispiel: 'Das Wetter ist furchtbar.', kategorie: 'Weitere Begriffe' },
  { de: 'schlecht', id: 'buruk', beispiel: 'Mir ist schlecht.', kategorie: 'Weitere Begriffe' },
  { de: 'wütend', id: 'marah', beispiel: 'Er war sehr wütend.', kategorie: 'Weitere Begriffe' },
  { de: 'die Hauptsache', plural: '-n', id: 'hal yang paling penting', beispiel: 'Hauptsache, es macht Spaß.', kategorie: 'Weitere Begriffe' },
  { de: 'die Gemeinsamkeit', plural: '-en', id: 'kesamaan', beispiel: 'Wir haben viele Gemeinsamkeiten.', kategorie: 'Weitere Begriffe' },
  { de: 'der Unterschied', plural: '-e', id: 'perbedaan', beispiel: 'Was ist der Unterschied?', kategorie: 'Weitere Begriffe' },
  { de: 'wahrscheinlich', id: 'mungkin / kemungkinan besar', beispiel: 'Er kommt wahrscheinlich später.', kategorie: 'Weitere Begriffe' },
  { de: 'wenigstens', id: 'setidaknya', beispiel: 'Wenigstens hast du es probiert.', kategorie: 'Weitere Begriffe' },
  { de: 'ziemlich', id: 'lumayan / cukup', beispiel: 'Das ist ziemlich gut.', kategorie: 'Weitere Begriffe' },
  { de: 'zum Beispiel', id: 'contohnya', beispiel: 'Ich mag Obst, zum Beispiel Äpfel.', kategorie: 'Weitere Begriffe' },
  { de: 'ehrlich', id: 'jujur', beispiel: 'Sei ehrlich!', kategorie: 'Weitere Begriffe' },
  { de: 'die Erholung', id: 'pemulihan / istirahat', beispiel: 'Ich brauche Erholung.', kategorie: 'Weitere Begriffe' },
  { de: 'die Weltreise', plural: '-n', id: 'perjalanan keliling dunia', beispiel: 'Sie macht eine Weltreise.', kategorie: 'Weitere Begriffe' },
  { de: 'freiwillig', id: 'sukarela', beispiel: 'Das ist freiwillig.', kategorie: 'Weitere Begriffe' },
  { de: 'die Grafik', plural: '-en', id: 'grafik / diagram', beispiel: 'Die Grafik zeigt die Zahlen.', kategorie: 'Weitere Begriffe' },
  { de: 'der Kontakt', plural: '-e', id: 'kontak', beispiel: 'Wir bleiben in Kontakt.', kategorie: 'Weitere Begriffe' },
  { de: 'anstrengend', id: 'melelahkan', beispiel: 'Die Arbeit ist anstrengend.', kategorie: 'Weitere Begriffe' },
  { de: 'schwer', id: 'berat / sulit', beispiel: 'Der Koffer ist schwer.', kategorie: 'Weitere Begriffe' },
  { de: 'der Wunsch', plural: '"-e', id: 'harapan / keinginan', beispiel: 'Was ist dein größter Wunsch?', kategorie: 'Weitere Begriffe' },
  { de: 'das Ausland', id: 'luar negeri', beispiel: 'Er studiert im Ausland.', kategorie: 'Weitere Begriffe' }
];

const partizipZwei: { infinitiv: string; partizip: string; hilfsverb: 'haben' | 'sein'; id: string }[] = [
  { infinitiv: 'übersetzen', partizip: 'übersetzt', hilfsverb: 'haben', id: 'menerjemahkan' },
  { infinitiv: 'jobben', partizip: 'gejobbt', hilfsverb: 'haben', id: 'bekerja paruh waktu' },
  { infinitiv: 'betreuen', partizip: 'betreut', hilfsverb: 'haben', id: 'mengurus / merawat' },
  { infinitiv: 'kennenlernen', partizip: 'kennengelernt', hilfsverb: 'haben', id: 'mengenal' },
  { infinitiv: 'üben', partizip: 'geübt', hilfsverb: 'haben', id: 'berlatih' },
  { infinitiv: 'präsentieren', partizip: 'präsentiert', hilfsverb: 'haben', id: 'mempresentasikan' },
  { infinitiv: 'ablehnen', partizip: 'abgelehnt', hilfsverb: 'haben', id: 'menolak' },
  { infinitiv: 'zustimmen', partizip: 'zugestimmt', hilfsverb: 'haben', id: 'setuju' },
  { infinitiv: 'ausschlafen', partizip: 'ausgeschlafen', hilfsverb: 'haben', id: 'tidur sampai puas' },
  { infinitiv: 'ziehen', partizip: 'gezogen', hilfsverb: 'sein', id: 'pindah / pindah rumah' },
  { infinitiv: 'sprechen', partizip: 'gesprochen', hilfsverb: 'haben', id: 'berbicara' },
  { infinitiv: 'wechseln', partizip: 'gewechselt', hilfsverb: 'haben', id: 'mengganti / bertukar' },
  { infinitiv: 'schaffen', partizip: 'geschafft', hilfsverb: 'haben', id: 'menyelesaikan / berhasil' },
  { infinitiv: 'haben', partizip: 'gehabt', hilfsverb: 'haben', id: 'mempunyai / memiliki' },
  { infinitiv: 'anfangen', partizip: 'angefangen', hilfsverb: 'haben', id: 'memulai' },
  { infinitiv: 'abschließen', partizip: 'abgeschlossen', hilfsverb: 'haben', id: 'menyelesaikan / lulus' },
  { infinitiv: 'umziehen', partizip: 'umgezogen', hilfsverb: 'sein', id: 'pindah rumah' },
  { infinitiv: 'ausziehen', partizip: 'ausgezogen', hilfsverb: 'sein', id: 'pindah keluar / melepas' },
  { infinitiv: 'verdienen', partizip: 'verdient', hilfsverb: 'haben', id: 'menghasilkan (uang)' },
  { infinitiv: 'berichten', partizip: 'berichtet', hilfsverb: 'haben', id: 'melaporkan / menceritakan' }
];

const grammatik = [
  {
    titel: 'Modalverben im Präteritum (Modal Lisan Masa Lalu)',
    farbe: 'indigo',
    erklaerung: 'Bentuk lampau dari kata kerja modal (wollen, müssen, können, dürfen). Dibentuk dengan menghilangkan umlaut dan menambahkan akhiran -te.',
    tiefenErklaerung: 'Penting! Dalam bahasa Jerman lisan percakapan, kita selalu menggunakan "Perfekt" untuk kejadian masa lalu. NAMUN ada pengecualian besar: untuk "haben", "sein", dan kata kerja Modal (Modalverben), penutur asli Jerman hampir selalu menggunakan Präteritum meskipun sedang mengobrol biasa (lisan). Mereka lebih suka berkata "Ich musste arbeiten" daripada "Ich habe arbeiten müssen". Secara morfologi linguistik, kata kerja modal ini adalah "kata kerja lemah" di masa lalu sehingga ditambahkan akhiran "-te". Selain itu, terjadi pergeseran bunyi historis Germanic di mana tanda titik dua (Umlaut: ä, ö, ü) menghilang sama sekali di masa lalu (können -> konnte, müssen -> musste, dürfen -> durfte).',
    struktur: 'Subjek + Modalverb (tanpa Umlaut + te) + ... + [Infinitive Verba Utama]',
    konjugationsTabelle: {
      headers: ['Pronomen', 'müssen -> musste', 'können -> konnte', 'wollen -> wollte', 'dürfen -> durfte'],
      rows: [
        ['ich', 'musste', 'konnte', 'wollte', 'durfte'],
        ['du', 'musstest', 'konntest', 'wolltest', 'durftest'],
        ['er/sie/es', 'musste', 'konnte', 'wollte', 'durfte'],
        ['wir', 'mussten', 'konnten', 'wollten', 'durften'],
        ['ihr', 'musstet', 'konntet', 'wolltet', 'durftet'],
        ['sie/Sie', 'mussten', 'konnten', 'wollten', 'durften'],
      ]
    },
    beispiele: [
      { satz: 'Als Kind musste ich um 20 Uhr schlafen.', terjemahan: 'Waktu kecil saya harus tidur jam 8 malam. (müssen -> musste)' },
      { satz: 'Wir wollten ins Kino gehen, aber wir durften nicht.', terjemahan: 'Kami ingin pergi ke bioskop, tapi kami tidak diizinkan. (wollen -> wollten, dürfen -> durften)' },
      { satz: 'Er konnte gestern nicht kommen.', terjemahan: 'Dia tidak bisa datang kemarin. (können -> konnte)' },
    ],
    mehrBeispiele: [
      { satz: 'Ich wollte dich anrufen, aber ich hatte keine Zeit.', terjemahan: 'Saya ingin meneleponmu, tapi saya tidak punya waktu.' },
      { satz: 'Musstest du am Wochenende arbeiten?', terjemahan: 'Apakah kamu harus bekerja pada akhir pekan?' },
      { satz: 'Früher durften wir nicht auf der Straße spielen.', terjemahan: 'Dulu kami tidak diizinkan bermain di jalanan.' }
    ],
    falle: 'Kesalahan paling fatal: Masih memakai Umlaut di masa lalu (Contoh salah: ✗ Ich müssste, ✗ er könnnte). Ingat: Präteritum Modalverben = BEBAS UMLAUT. Perkecualian: "mögen" menjadi "mochte" (perubahan konsonan g -> ch).',
  },
  {
    titel: 'Dativ-Kasus (Objek Penerima / Kasus Ke-3)',
    farbe: 'emerald',
    erklaerung: 'Kasus Dativ digunakan untuk objek tidak langsung (indirect object), penerima manfaat dari suatu aksi, atau setelah preposisi tertentu (aus, bei, mit, nach, seit, von, zu).',
    tiefenErklaerung: 'Mengapa butuh Dativ? Bahasa Jerman adalah bahasa berfleksi (inflected language), di mana fungsi kata dalam kalimat ditunjukkan oleh perubahan artikel, bukan hanya urutan kata. Dativ menjawab pertanyaan "Wem?" (Kepada siapa?). Penanda paling kuat untuk Dativ adalah bunyi "-m" (untuk Masculine dan Neuter: dem, einem, meinem) dan bunyi "-r" (untuk Feminine: der, einer, meiner). Untuk bentuk Plural (jamak), artikelnya selalu berakhiran "-n" (den, meinen, unseren), DAN kata bendanya sendiri wajib ditambahkan huruf "-n" jika belum berakhiran -n atau -s di bentuk jamaknya.',
    struktur: 'Maskulin/Neutral: dem/einem/-m | Feminin: der/einer/-r | Plural: den/...-n + Nomen-n',
    konjugationsTabelle: {
      headers: ['Genus', 'Nominativ (Subjek)', 'Dativ (Objek Penerima)'],
      rows: [
        ['Maskulin (der)', 'der Mann / ein Mann', 'dem Mann / einem Mann'],
        ['Neutral (das)', 'das Kind / ein Kind', 'dem Kind / einem Kind'],
        ['Feminin (die)', 'die Frau / eine Frau', 'der Frau / einer Frau'],
        ['Plural (die)', 'die Kinder / meine Kinder', 'den Kindern / meinen Kindern (+n)'],
      ]
    },
    beispiele: [
      { satz: 'Ich fahre mit meinem Auto zur Arbeit.', terjemahan: 'Saya berkendara dengan mobil saya ke tempat kerja. (mit + Dativ Neuter: mein -> meinem)' },
      { satz: 'Das Haus gefällt meiner Schwester.', terjemahan: 'Rumah itu menyenangkan (bagi) saudara perempuan saya. (gefallen selalu butuh Dativ; Feminine: meine -> meiner)' },
      { satz: 'Wir helfen den Kindern bei den Hausaufgaben.', terjemahan: 'Kami membantu anak-anak dengan PR mereka. (helfen + Dativ Plural; die Kinder -> den Kindern)' },
    ],
    mehrBeispiele: [
      { satz: 'Ich danke dir für deine Hilfe.', terjemahan: 'Saya berterima kasih kepadamu atas bantuanmu. (danken selalu butuh Dativ)' },
      { satz: 'Sie kommt gerade aus der Schule.', terjemahan: 'Dia baru saja datang dari sekolah. (aus + Dativ Feminin: die -> der)' },
      { satz: 'Nach dem Essen gehen wir spazieren.', terjemahan: 'Setelah makan kita pergi jalan-jalan. (nach + Dativ Neuter: das -> dem)' },
      { satz: 'Das Buch gehört dem Lehrer.', terjemahan: 'Buku itu milik sang guru. (gehören + Dativ Masculine: der -> dem)' }
    ],
    falle: 'Jangan lupakan huruf "n" ekstra di kata benda jamak Dativ! (Contoh salah: ✗ mit den Kinder. Benar: ✓ mit den Kindern). Selain itu, pastikan hafal preposisi mutlak Dativ: "aus, bei, mit, nach, seit, von, zu" (menghapalnya pakai melodi lagu akan sangat membantu).',
  }
];

const goetheTasks = [
  {
    skill: 'Lesen',
    icon: '📖',
    farbe: 'sky',
    tasks: [
      {
        typ: 'Schultypen in Deutschland',
        beschreibung: 'Lesen Sie die Texte über verschiedene Schulabschlüsse. Sind die Aussagen Richtig oder Falsch?',
        übung: 'Beantworten Sie die Frage zu Sebastian und Vanessa.',
        text: 'Sebastian war in der Realschule. Mathe war für ihn schwer. Er hat seinen Abschluss geschafft und beginnt eine Ausbildung zum Physiotherapeuten.\n\nVanessa war fünf Jahre in der Hauptschule. Jetzt ist sie Azubi in einer Arztpraxis.',
        frage: 'Sind folgende Aussagen Richtig oder Falsch? 1. Sebastian fand Mathe sehr einfach. 2. Vanessa macht eine Ausbildung in einer Arztpraxis.',
        antwort: '1. Falsch (Mathe war für ihn schwer). 2. Richtig (Sie ist Azubi in einer Arztpraxis).',
      },
    ],
  },
  {
    skill: 'Schreiben',
    icon: '✍️',
    farbe: 'amber',
    tasks: [
      {
        typ: 'Kommentar im Schulforum',
        beschreibung: 'Schreiben Sie einen Kommentar (ca. 20-30 Wörter) über Ihre Schulzeit. Was war gut, was war schlecht?',
        übung: 'Nutzen Sie Redemittel wie "Ich war in der...", "Das war super...", "Ich mochte / musste..."',
        text: 'Schreiben Sie einen kurzen Kommentar über Ihre Schule, Ihre Lieblingsfächer und Lehrer.',
        frage: 'Schreiben Sie Ihren Text hier.',
        antwort: 'Beispiel: Ich war im Gymnasium. Das war eine schöne Zeit. Ich hatte viele Freunde. Ich mochte meine Lehrer, aber ich musste viele Hausaufgaben machen.',
      },
    ],
  },
  {
    skill: 'Hören',
    icon: '🎧',
    farbe: 'rose',
    tasks: [
      {
        typ: 'Radiosendung "Schule aus - und nun?"',
        beschreibung: 'Was machen Maike, Sara und Vida? Richtig oder Falsch?',
        übung: 'Lesen Sie das Transkript und antworten Sie.',
        text: 'Maike: "Ich bin mit der Schule fertig und wohne nicht mehr bei meinen Eltern."\nSara: "Ich wollte eine Pause haben und arbeite als Au-pair."\nVida: "Meine Eltern zahlen meine Miete nicht mehr."',
        frage: '1. Maike wohnt noch bei ihren Eltern. 2. Sara macht eine Pause vom Lernen.',
        antwort: '1. Falsch (Sie wohnt nicht mehr bei ihren Eltern). 2. Richtig (Sie wollte eine Pause haben).',
      },
    ],
  },
  {
    skill: 'Sprechen',
    icon: '🗣️',
    farbe: 'violet',
    tasks: [
      {
        typ: 'Erfahrungen austauschen',
        beschreibung: 'Stellen Sie sich vor und sprechen Sie über Ihre Schulzeit.',
        übung: 'Sprechen Sie über: Schule, Abschluss, Pläne, Ausbildung/Studium.',
        text: 'Verwenden Sie Modalverben im Präteritum: "Ich musste viele Hausaufgaben machen...", "Ich wollte studieren..."',
        frage: 'Was haben Sie nach der Schule gemacht?',
        antwort: 'Beispiel: Nach der Schule habe ich eine Ausbildung gemacht. Ich wollte studieren, aber ich musste arbeiten. Jetzt arbeite ich als Elektroniker.',
      },
    ],
  },
];

const lernTipps = [
  {
    nummer: 1,
    titel: 'Spaced Repetition',
    icon: '🔁',
    farbe: 'indigo',
    beschreibung: 'Ulangi kata baru setelah 1 hari → 3 hari → 7 hari → 21 hari. Terbukti meningkatkan retensi 200% (Cepeda et al., 2006).',
    tag: 'Leitner System',
  },
  {
    nummer: 2,
    titel: 'Multi-Sensory Learning',
    icon: '👁️',
    farbe: 'violet',
    beschreibung: 'Baca + Tulis + Ucapkan + Gambarkan. Dual Coding Theory (Paivio, 1991) membuktikan kombinasi visual & verbal menguatkan memori jangka panjang.',
    tag: 'Wörter mit allen Sinnen',
  },
  {
    nummer: 3,
    titel: 'Context Over Isolation',
    icon: '📝',
    farbe: 'emerald',
    beschreibung: 'Jangan hapal kata satu-satu. Belajar dalam kalimat penuh & konteks nyata. Cloze sentences meningkatkan retensi 40% (Nation, 2001).',
    tag: 'Kontextuelles Lernen',
  },
  {
    nummer: 4,
    titel: 'Interleaved Practice',
    icon: '🔀',
    farbe: 'rose',
    beschreibung: 'Campur latihan Grammatik, Wortschatz, dan Sprechen dalam satu sesi. Lebih efektif dari belajar satu topik secara berblok (Kornell & Bjork, 2008).',
    tag: 'Gemischtes Üben',
  },
];

// ── COLOR MAPS ──

const kategorieStyles: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  'Sprachen': { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-300', dot: 'bg-blue-500' },
  'Beruf': { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-300', dot: 'bg-amber-500' },
  'Schule': { bg: 'bg-indigo-50', text: 'text-indigo-800', border: 'border-indigo-300', dot: 'bg-indigo-500' },
  'Weitere Begriffe': { bg: 'bg-slate-50', text: 'text-slate-800', border: 'border-slate-300', dot: 'bg-slate-500' },
  'Familie & Wohnen': { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-300', dot: 'bg-purple-500' },
  'Freizeit': { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-300', dot: 'bg-rose-500' },
  'Essen': { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-300', dot: 'bg-orange-500' },
  'Kommunikation': { bg: 'bg-cyan-50', text: 'text-cyan-800', border: 'border-cyan-300', dot: 'bg-cyan-500' },
  'Alltag': { bg: 'bg-teal-50', text: 'text-teal-800', border: 'border-teal-300', dot: 'bg-teal-500' },
};

const grammatikStyles: Record<string, { header: string; card: string; accent: string }> = {
  indigo: { header: 'bg-indigo-600 text-white', card: 'bg-indigo-50 border-indigo-200', accent: 'bg-indigo-600' },
  violet: { header: 'bg-violet-600 text-white', card: 'bg-violet-50 border-violet-200', accent: 'bg-violet-600' },
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
  indigo: 'from-indigo-500 to-indigo-600',
  violet: 'from-violet-500 to-violet-600',
  emerald: 'from-emerald-500 to-emerald-600',
  rose: 'from-rose-500 to-rose-600',
};

// ── FLASHCARD COMPONENT ──
function FlashCard({ wort }: { wort: typeof wortschatz[0] }) {
  const [flipped, setFlipped] = useState(false);
  const [learned, setLearned] = useState<'none' | 'yes' | 'no'>('none');
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

// ── MINI QUIZ COMPONENT ──
function MiniQuizFrage({ frage, options, besteAntwort, index }: {
  frage: string;
  options: string[];
  besteAntwort: number;
  index: number;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-200">
      <p className="font-bold text-slate-900 text-sm">{index + 1}. {frage}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === besteAntwort;
          const showResult = selected !== null;

          let cls = 'px-3 py-2 rounded-xl border-2 font-semibold text-sm cursor-pointer transition-all ';
          if (!showResult) cls += 'bg-white border-slate-300 text-slate-700 hover:border-indigo-400 hover:bg-indigo-50';
          else if (isCorrect) cls += 'bg-green-100 border-green-400 text-green-800';
          else if (isSelected) cls += 'bg-red-100 border-red-400 text-red-800';
          else cls += 'bg-white border-slate-200 text-slate-400';

          return (
            <button key={i} onClick={() => { if (selected === null) setSelected(i); }} className={cls}>
              {String.fromCharCode(65 + i)}) {opt}
            </button>
          );
        })}
        {selected !== null && (
          <button onClick={() => setSelected(null)} className="px-3 py-2 rounded-xl border-2 border-indigo-300 bg-indigo-50 text-indigo-700 font-bold text-sm cursor-pointer hover:bg-indigo-100">
            ↺ Reset
          </button>
        )}
      </div>
      {selected !== null && (
        <p className={`text-xs font-bold mt-1 ${selected === besteAntwort ? 'text-green-700' : 'text-red-700'}`}>
          {selected === besteAntwort ? '🎉 Benar! Jawaban tepat.' : `✗ Salah. Jawaban benar: ${String.fromCharCode(65 + besteAntwort)}) ${options[besteAntwort]}`}
        </p>
      )}
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
    if (cleanInput === cleanTarget) {
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

function PartizipZweiGame() {
  const [queue, setQueue] = useState<any[]>([]);
  const [question, setQuestion] = useState<any>(null);
  const [masteredCount, setMasteredCount] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [mistakes, setMistakes] = useState<any[]>([]);
  const [hilfsverbInput, setHilfsverbInput] = useState<'haben' | 'sein' | null>(null);
  const [partizipInput, setPartizipInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [isFinished, setIsFinished] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const umlauts = ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'];

  const handleUmlaut = (char: string) => {
    if (status !== 'idle') return;
    setPartizipInput(prev => prev + char);
    inputRef.current?.focus();
  };

  // Load mistakes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('perfekt_mistakes');
    if (saved) {
      try {
        setMistakes(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse mistakes", e);
      }
    }
  }, []);

  const startGame = useCallback((customList?: any[]) => {
    const source = customList || partizipZwei;
    const shuffled = [...source].sort(() => Math.random() - 0.5);
    setQueue(shuffled);
    setQuestion(shuffled[0]);
    setMasteredCount(0);
    setTotalWords(source.length);
    setWrongCount(0);
    // Don't reset mistakes here, as we want to track them across sessions
    setHilfsverbInput(null);
    setPartizipInput('');
    setStatus('idle');
    setIsFinished(false);
    
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const clearMistakes = () => {
    setMistakes([]);
    localStorage.removeItem('perfekt_mistakes');
  };

  useEffect(() => {
    startGame();
  }, [startGame]);

  const handleNext = () => {
    if (status === 'correct') {
      // Remove mastered word permanently from queue
      const newQueue = queue.slice(1);
      setQueue(newQueue);
      setMasteredCount(prev => prev + 1);
      if (newQueue.length > 0) {
        setQuestion(newQueue[0]);
      } else {
        setIsFinished(true);
      }
    } else {
      // Wrong: move current word to END of queue for retry, but don't change total
      const current = queue[0];
      const newQueue = [...queue.slice(1), current];
      setQueue(newQueue);
      setQuestion(newQueue[0]);
    }
    setStatus('idle');
    setPartizipInput('');
    setHilfsverbInput(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleCheck = () => {
    if (!hilfsverbInput || !partizipInput.trim()) return;

    const isHCorrect = hilfsverbInput === question.hilfsverb;
    const isPCorrect = partizipInput.trim().toLowerCase() === question.partizip.toLowerCase();

    if (isHCorrect && isPCorrect) {
      setStatus('correct');
    } else {
      setStatus('wrong');
      setWrongCount(c => c + 1);
      // Track unique mistakes
      if (!mistakes.find(m => m.infinitiv === question.infinitiv)) {
        const newMistakes = [...mistakes, question];
        setMistakes(newMistakes);
        localStorage.setItem('perfekt_mistakes', JSON.stringify(newMistakes));
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
            Kamu menyelesaikan semua <span className="text-white font-black">{masteredCount}</span> kata dengan benar!
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
                      <span className="font-black text-white">{m.infinitiv}</span>
                      <span className="text-orange-400 ml-2">({m.id})</span>
                    </div>
                    <div className="font-bold text-orange-200">
                      {m.hilfsverb} {m.partizip}
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
              <p className="text-sm text-emerald-100 mt-1">Tidak ada kesalahan. Kamu sudah menguasai materi ini dengan sangat baik!</p>
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

  // Calculate remaining unique words (queue might have duplicates from wrong answers)
  const remainingUnique = queue.length > 0 ? new Set(queue.map((w: any) => w.infinitiv)).size : 0;
  const progressPercent = totalWords > 0 ? Math.round((masteredCount / totalWords) * 100) : 0;

  return (
    <div className="clay-card p-6 bg-orange-950 text-white max-w-2xl mx-auto space-y-6 border-4 border-orange-900">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-black text-orange-100 italic">⏳ Partizip II Recall</h3>
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
        <p className="text-xs font-bold text-orange-300 uppercase tracking-widest mb-2">Tulis Partizip II dari:</p>
        <h4 className="text-4xl font-black">{question.infinitiv}</h4>
        <p className="text-orange-200 mt-1 font-medium italic">({question.id})</p>
      </div>

      <div className="space-y-4">
        {/* Hilfsverb Selection */}
        <div className="grid grid-cols-2 gap-3">
          {(['haben', 'sein'] as const).map(h => (
            <button
              key={h}
              disabled={status !== 'idle'}
              onClick={() => setHilfsverbInput(h)}
              className={`py-3 rounded-xl font-black text-lg transition-all border-b-4 ${
                hilfsverbInput === h 
                  ? 'bg-orange-500 border-orange-700 text-white shadow-inner scale-95' 
                  : 'bg-orange-800 border-orange-900 text-orange-300 hover:bg-orange-700'
              }`}
            >
              {h}
            </button>
          ))}
        </div>

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

        <input
          ref={inputRef}
          type="text"
          value={partizipInput}
          onChange={(e) => setPartizipInput(e.target.value)}
          disabled={status !== 'idle'}
          placeholder="Ketik Partizip II..."
          className="w-full bg-white text-orange-950 font-black text-2xl p-5 rounded-2xl outline-none text-center shadow-inner"
          onKeyDown={(e) => e.key === 'Enter' && status === 'idle' ? handleCheck() : e.key === 'Enter' && handleNext()}
        />

        {status === 'idle' ? (
          <button
            onClick={handleCheck}
            disabled={!hilfsverbInput || !partizipInput}
            className="w-full bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white font-black py-4 rounded-2xl border-b-4 border-orange-800 transition-all active:border-b-0 active:translate-y-1"
          >
            Cek Jawaban
          </button>
        ) : (
          <div className={`p-6 rounded-2xl text-center border-b-4 ${status === 'correct' ? 'bg-emerald-100 border-emerald-400 text-emerald-900' : 'bg-rose-100 border-rose-400 text-rose-900'}`}>
            <p className="font-black text-xl mb-2">{status === 'correct' ? '🎉 BENAR!' : '❌ SALAH!'}</p>
            <p className="text-3xl font-black">{question.hilfsverb} {question.partizip}</p>
            <button onClick={handleNext} className={`mt-4 w-full py-3 rounded-xl font-black text-white ${status === 'correct' ? 'bg-emerald-600' : 'bg-rose-600'}`}>
              Lanjut (Enter)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── MISTAKE BADGE HELPER ──
function MistakeBadge({ type }: { type: 'perfekt' }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const saved = localStorage.getItem(`${type}_mistakes`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCount(parsed.length);
      } catch (e) {}
    }
  }, [type]);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem(`${type}_mistakes`);
    setCount(0);
  };

  if (count === 0) return null;
  return (
    <div className="flex flex-col items-end gap-1">
      <div className="bg-rose-500 text-white text-[10px] font-black px-2 py-1 rounded-full border-2 border-white shadow-lg animate-bounce cursor-default">
        {count} KATA SULIT
      </div>
      <button 
        onClick={handleClear}
        className="text-[10px] font-bold bg-slate-800 text-white px-2 py-0.5 rounded-full hover:bg-rose-600 transition-colors shadow-md border border-slate-700"
      >
        Hapus 🗑️
      </button>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function KapitelZweiPage() {
  const [activeTab, setActiveTab] = useState<'wortschatz' | 'partizip' | 'grammatik' | 'lesen' | 'horen' | 'uebung' | 'schulsystem' | 'strategie' | 'game' | 'test'>('wortschatz');
  const [katFilter, setKatFilter] = useState<string>('Alle');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const kategorien = ['Alle', ...Array.from(new Set(wortschatz.map(w => w.kategorie)))];
  const filteredWords = katFilter === 'Alle' ? wortschatz : wortschatz.filter(w => w.kategorie === katFilter);
  const totalPages = Math.ceil(filteredWords.length / itemsPerPage);
  const currentWords = filteredWords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const [partizipPage, setPartizipPage] = useState<number>(1);
  const partizipItemsPerPage = 8;
  const totalPartizipPages = Math.ceil(partizipZwei.length / partizipItemsPerPage);
  const currentPartizipItems = partizipZwei.slice((partizipPage - 1) * partizipItemsPerPage, partizipPage * partizipItemsPerPage);

  // Steps ordered by learning science (Input → Practice → Evaluation)
  const steps = [
    { id: 'wortschatz',  label: 'Wortschatz',   icon: '💬', phase: 1 as const, count: wortschatz.length },
    { id: 'schulsystem', label: 'Schulsystem',   icon: '🏫', phase: 1 as const, count: null },
    { id: 'grammatik',   label: 'Grammatik',     icon: '📐', phase: 1 as const, count: grammatik.length },
    { id: 'partizip',   label: 'Partizip II',   icon: '⏳', phase: 1 as const, count: partizipZwei.length },
    { id: 'lesen',      label: 'Lesen',         icon: '📖', phase: 2 as const, count: null },
    { id: 'horen',      label: 'Hören',         icon: '🎧', phase: 2 as const, count: null },
    { id: 'uebung',     label: 'Schreiben',     icon: '✍️', phase: 2 as const, count: null },
    { id: 'game',       label: 'Mini Game',     icon: '🎮', phase: 2 as const, count: null },
    { id: 'test',       label: 'Kapiteltest 2', icon: '📝', phase: 3 as const, count: 7 },
    { id: 'strategie',  label: 'Strategie',     icon: '🧠', phase: 3 as const, count: null },
  ] as const;
  type TabId = typeof steps[number]['id'];

  const [activeGameMode, setActiveGameMode] = useState<'wortschatz' | 'partizip' | null>(null);

  return (
    <div className="relative">
      {/* Decorative Blobs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-indigo-200/30 blur-[120px] -z-10 rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-violet-200/30 blur-[120px] -z-10 rounded-full pointer-events-none" />


      {/* ── HERO HEADER ── */}
      <header className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <span className="clay-badge bg-emerald-100 text-emerald-800 border-emerald-300">Level A2</span>
              <span className="clay-badge bg-violet-100 text-violet-800 border-violet-300">Kapitel 2</span>
              <span className="clay-badge bg-amber-100 text-amber-800 border-amber-300">Netzwerk Neu</span>
              <span className="clay-badge bg-rose-100 text-rose-800 border-rose-300">Goethe Ready</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
              {kapitel.nummer}. {kapitel.titel}
              <span className="block text-2xl md:text-3xl font-semibold text-indigo-600 mt-2">{kapitel.untertitel}</span>
            </h1>
            <p className="text-base text-slate-600 font-medium max-w-lg leading-relaxed">
              Belajar tentang jalur pendidikan di Jerman, pengalaman sekolah, menceritakan masa lalu dengan Modalverben Präteritum, dan Kasus Dativ. Dirancang untuk ujian <strong className="text-slate-800">Goethe-Zertifikat A2</strong>.
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
              { label: 'Goethe Tasks', count: 4, icon: '🎯', bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-300', num: 'text-rose-600' },
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
        <ProgressTracker kapitelId="kapitel2" totalSteps={9} currentStepId={activeTab} />
      </div>

      {/* ── LERNPLAN BANNER ── */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div
          className="rounded-[20px] p-5 border-4 border-indigo-900"
          style={{ background: 'linear-gradient(to right, #4F46E5, #7C3AED)', boxShadow: '6px 6px 0 0 rgba(30,27,75,0.3)' }}
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="text-4xl flex-shrink-0">📅</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-extrabold text-lg text-white">Rencana Belajar 2 Hari — Kapitel 2 (Scientifically Backed)</h2>
              <p className="text-indigo-100 text-sm mt-1">
                <strong className="text-white">Hari 1 (Pagi):</strong> Flashcard Wortschatz 20 kosakata · &nbsp;
                <strong className="text-white">Hari 1 (Sore):</strong> Grammatik Präteritum & Dativ ·{' '}
                <strong className="text-white">Hari 2 (Pagi):</strong> Goethe Tasks Lesen &amp; Schreiben ·{' '}
                <strong className="text-white">Hari 2 (Sore):</strong> Spaced Repetition Review — semua kartu salah
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
        {/* Step Progress Banner */}
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 font-semibold">
          <span>📍 Step {steps.findIndex(s => s.id === activeTab) + 1} dari {steps.length} · {steps.find(s => s.id === activeTab)?.label}</span>
          {steps.findIndex(s => s.id === activeTab) < steps.length - 1 && (
            <button
              onClick={() => { const idx = steps.findIndex(s => s.id === activeTab); setActiveTab(steps[idx + 1].id as any); }}
              className="ml-auto text-xs font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer border border-indigo-200 px-3 py-1 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              Lanjut: {steps[steps.findIndex(s => s.id === activeTab) + 1]?.label} →
            </button>
          )}
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

            {/* Leitner System Info */}
            <div className="clay-card p-4 bg-indigo-50 border-indigo-300">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black flex-shrink-0 text-lg">🗂️</div>
                <div>
                  <p className="font-extrabold text-indigo-900">Sistem Leitner Box (Spaced Repetition)</p>
                  <p className="text-sm text-indigo-700 mt-0.5">
                    <strong>Box 1:</strong> Ulangi tiap hari ·{' '}
                    <strong>Box 2:</strong> Tiap 3 hari ·{' '}
                    <strong>Box 3:</strong> Tiap 7 hari ·{' '}
                    <strong>Box 4:</strong> Tiap 14 hari ·{' '}
                    <strong>Box 5:</strong> ✅ Hafal permanen
                  </p>
                </div>
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

        {/* ── SCHULSYSTEM TAB (LANDESKUNDE) ── */}
        {activeTab === 'schulsystem' && (
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Das deutsche Schulsystem</h2>
              <p className="text-slate-600 text-sm mt-1">Sistem pendidikan menengah di Jerman seringkali membingungkan. Berikut adalah penjelasan super ringkas untuk membedakannya.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Hauptschule */}
              <div className="clay-card p-6 bg-rose-50 border-2 border-rose-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-rose-600 rounded-xl flex items-center justify-center text-white text-2xl font-black">🛠️</div>
                  <div>
                    <h3 className="text-xl font-extrabold text-rose-900">Hauptschule</h3>
                    <p className="text-sm font-bold text-rose-700">Kelas 5 - 9 (Fokus Praktikal)</p>
                  </div>
                </div>
                <p className="text-slate-700 text-sm mb-3">Ditujukan untuk siswa yang ingin cepat masuk ke dunia kerja manual atau kerajinan tangan (Handwerk). Lulusan mendapatkan <strong>Hauptschulabschluss</strong>.</p>
                <div className="bg-white p-3 rounded-xl border border-rose-200">
                  <p className="text-xs font-bold text-slate-500 mb-1">SETELAH LULUS:</p>
                  <p className="text-sm text-slate-800 font-medium">Bisa langsung Ausbildung (magang profesi) seperti tukang kayu, montir, atau pekerja pabrik.</p>
                </div>
              </div>

              {/* Realschule */}
              <div className="clay-card p-6 bg-sky-50 border-2 border-sky-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center text-white text-2xl font-black">💼</div>
                  <div>
                    <h3 className="text-xl font-extrabold text-sky-900">Realschule</h3>
                    <p className="text-sm font-bold text-sky-700">Kelas 5 - 10 (Fokus Bisnis/Jasa)</p>
                  </div>
                </div>
                <p className="text-slate-700 text-sm mb-3">Sekolah menengah dengan standar akademis menengah. Lulusannya mendapat ijazah <strong>Realschulabschluss</strong> (atau Mittlere Reife).</p>
                <div className="bg-white p-3 rounded-xl border border-sky-200">
                  <p className="text-xs font-bold text-slate-500 mb-1">SETELAH LULUS:</p>
                  <p className="text-sm text-slate-800 font-medium">Bisa Ausbildung untuk pekerjaan kantoran/jasa seperti perawat, asisten dokter, staf bank, atau polisi.</p>
                </div>
              </div>

              {/* Gymnasium */}
              <div className="clay-card p-6 bg-indigo-50 border-2 border-indigo-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl font-black">🎓</div>
                  <div>
                    <h3 className="text-xl font-extrabold text-indigo-900">Gymnasium</h3>
                    <p className="text-sm font-bold text-indigo-700">Kelas 5 - 12/13 (Fokus Akademis)</p>
                  </div>
                </div>
                <p className="text-slate-700 text-sm mb-3">Sekolah paling menuntut secara akademis. Bertujuan mempersiapkan siswa untuk universitas. Lulusannya mendapat ijazah tertinggi: <strong>Abitur</strong>.</p>
                <div className="bg-white p-3 rounded-xl border border-indigo-200">
                  <p className="text-xs font-bold text-slate-500 mb-1">SETELAH LULUS:</p>
                  <p className="text-sm text-slate-800 font-medium">Bebas mendaftar ke Universitas (Universität) untuk studi Kedokteran (Medizin), Hukum (Jura), Teknik, dll.</p>
                </div>
              </div>

              {/* Gesamtschule */}
              <div className="clay-card p-6 bg-emerald-50 border-2 border-emerald-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl font-black">🤝</div>
                  <div>
                    <h3 className="text-xl font-extrabold text-emerald-900">Gesamtschule</h3>
                    <p className="text-sm font-bold text-emerald-700">Semua digabung (Fleksibel)</p>
                  </div>
                </div>
                <p className="text-slate-700 text-sm mb-3">Ini adalah sekolah komprehensif yang menggabungkan Hauptschule, Realschule, dan Gymnasium di satu atap. Siswa belum dipisah dari awal.</p>
                <div className="bg-white p-3 rounded-xl border border-emerald-200">
                  <p className="text-xs font-bold text-slate-500 mb-1">SETELAH LULUS:</p>
                  <p className="text-sm text-slate-800 font-medium">Tergantung nilai dan berapa lama belajar, siswa bisa lulus dengan ijazah Hauptschule, Realschule, atau Abitur.</p>
                </div>
              </div>
            </div>
            
            <div className="clay-card p-6 bg-amber-50 border-2 border-amber-300 mt-6">
              <h4 className="text-lg font-extrabold text-amber-900 mb-2">💡 Tips untuk Ujian Goethe:</h4>
              <ul className="list-disc pl-5 space-y-2 text-amber-800 text-sm font-medium">
                <li>Jika teks ujian menyebutkan <strong>"Er macht eine Lehre als..."</strong> (Dia sedang magang sebagai...), dia biasanya dari Hauptschule atau Realschule.</li>
                <li>Jika teks menyebutkan <strong>"Sie will an der Uni studieren"</strong> (Dia ingin kuliah di Universitas), maka dia butuh <strong>Abitur</strong> (berasal dari Gymnasium).</li>
                <li><strong>Azubi</strong> (Auszubildende/r) adalah orang yang sedang melakukan <em>Ausbildung / Lehre</em> (sekolah vokasi/magang kerja).</li>
              </ul>
            </div>
          </div>
        )}

        {/* ── PARTIZIP II TAB ── */}
        {activeTab === 'partizip' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Modalverben (Präteritum)</h2>
              <p className="text-slate-600 text-sm mt-1">Bentuk lampau dari kata kerja modal.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentPartizipItems.map((item, i) => (
                <div key={i} className="clay-card p-5 bg-white border-2 border-orange-100 hover:border-orange-300 transition-all group">
                   <div className="flex justify-between items-start mb-3">
                     <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${item.hilfsverb === 'sein' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                       {item.hilfsverb}
                     </span>
                     <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">★</span>
                   </div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{item.infinitiv}</p>
                   <p className="text-xl font-black text-slate-900">{item.partizip}</p>
                   <p className="text-xs text-slate-500 font-medium italic mt-1">{item.id}</p>
                </div>
              ))}
            </div>

            {totalPartizipPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-4">
                <button
                  onClick={() => setPartizipPage(p => Math.max(1, p - 1))}
                  disabled={partizipPage === 1}
                  className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 text-slate-700 font-bold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600 transition-all cursor-pointer shadow-[0_2px_0_0_rgba(203,213,225,1)] active:translate-y-0.5 active:shadow-none"
                >
                  ←
                </button>
                <span className="font-bold text-slate-600 text-sm">
                  Halaman {partizipPage} dari {totalPartizipPages}
                </span>
                <button
                  onClick={() => setPartizipPage(p => Math.min(totalPartizipPages, p + 1))}
                  disabled={partizipPage === totalPartizipPages}
                  className="w-10 h-10 rounded-full bg-white border-2 border-slate-300 text-slate-700 font-bold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600 transition-all cursor-pointer shadow-[0_2px_0_0_rgba(203,213,225,1)] active:translate-y-0.5 active:shadow-none"
                >
                  →
                </button>
              </div>
            )}
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
                    <p className="text-indigo-900 mt-2 text-sm font-bold leading-relaxed">Ketikan bahasa Jerman dari kosakata harian. Fokus pada artikulasi dan ejaan tepat.</p>
                    <div className="mt-6 flex items-center text-indigo-600 font-black text-sm uppercase tracking-wider">Main Sekarang →</div>
                  </button>

                  {/* Mode Partizip */}
                  <div className="relative group">
                    <button 
                      onClick={() => setActiveGameMode('partizip')}
                      className="w-full clay-card p-8 bg-orange-50 border-orange-200 border-b-8 text-left hover:translate-y-1 hover:border-b-4 transition-all group-hover:bg-orange-100 cursor-pointer"
                    >
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm border border-orange-100 group-hover:scale-110 transition-transform">⏳</div>
                      <h3 className="text-2xl font-black text-orange-950">Modalverben Latih</h3>
                      <p className="text-indigo-900 mt-2 text-sm font-bold leading-relaxed">Tebak bentuk Präteritum dari modal verbs.</p>
                      <div className="mt-6 flex items-center text-orange-600 font-black text-sm uppercase tracking-wider">Main Sekarang →</div>
                    </button>
                    {/* Persistent Mistake Badge */}
                    <div className="absolute -top-3 -right-3 z-10">
                      <MistakeBadge type="perfekt" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <button 
                  onClick={() => setActiveGameMode(null)}
                  className="flex items-center gap-2 text-slate-600 font-bold hover:text-indigo-600 transition-colors"
                >
                  ← Kembali ke Menu
                </button>
                {activeGameMode === 'wortschatz' ? <WortschatzGame /> : <PartizipZweiGame />}
              </div>
            )}
          </div>
        )}

        {/* ── GRAMMATIK TAB ── */}
        {activeTab === 'grammatik' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Grammatik</h2>
              <p className="text-slate-600 text-sm mt-1">3 struktur kunci untuk Kapitel 2. Klik "Häufige Fehler" untuk cek jebakan umum.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {grammatik.map((gram, i) => (
                <GrammatikKarte key={i} gram={gram} />
              ))}
            </div>

            {/* Latihan Soal Grammatik */}
            <div className="clay-card p-6 bg-white border-2 border-indigo-100 shadow-xl">
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">🧩 Latihan Soal Grammatik (Kapitel 2)</h3>
              <p className="text-slate-600 text-sm mb-5">Uji pemahaman Anda tentang Modalverben im Präteritum dan Dativ. Klik jawaban yang menurut Anda benar.</p>
              <div className="space-y-4">
                {[
                  { frage: 'Nach der Schule ______ ich Medizin studieren.', options: ['willte', 'wollte', 'wollen'], besteAntwort: 1 },
                  { frage: 'Wir ______ eine Ausbildung machen.', options: ['musste', 'müssten', 'mussten'], besteAntwort: 2 },
                  { frage: 'Meine Eltern haben gesagt, ich ______ lernen.', options: ['solltet', 'durfte', 'sollte'], besteAntwort: 2 },
                  { frage: 'Früher ______ Kinder nicht so lange aufbleiben.', options: ['durften', 'darften', 'durftet'], besteAntwort: 0 },
                  { frage: '______ du früher gut zeichnen?', options: ['Konntest', 'Konnte', 'Könntest'], besteAntwort: 0 },
                  { frage: 'Sabrina hat nach ______ Studium eine Reise gemacht. (das Studium)', options: ['ihrer', 'seinem', 'ihrem'], besteAntwort: 2 },
                  { frage: 'Hast du ______ Großeltern eine Postkarte geschrieben? (Plural)', options: ['deine', 'deinen', 'deinem'], besteAntwort: 1 },
                  { frage: 'Ich verstehe mich super mit ______ Kollegen (Plural).', options: ['meinem', 'meiner', 'meinen'], besteAntwort: 2 },
                  { frage: 'Was macht ihr gern in ______ Freizeit? (die Freizeit)', options: ['eurer', 'eurem', 'euren'], besteAntwort: 0 },
                  { frage: 'Wir gehen heute mit ______ Freund Olli ins Kino. (der Freund)', options: ['unserer', 'unserem', 'unseren'], besteAntwort: 1 },
                ].map((q, qi) => (
                  <MiniQuizFrage key={qi} {...q} index={qi} />
                ))}
              </div>
            </div>

            {/* INTERAKTIVE GRAMMATIK ÜBUNG */}
            <div className="mt-12">
              <GrammatikInteraktiv2 />
            </div>
          </div>
        )}

        {/* ── LESEN TAB ── */}
        {activeTab === 'lesen' && (
          <LesenInteraktiv2 />
        )}

        {/* ── HÖREN TAB ── */}
        {activeTab === 'horen' && (
          <HorenInteraktiv2 />
        )}

        {/* ── ÜBUNG TAB ── */}
        {activeTab === 'uebung' && (
          <UebungInteraktiv2 />
        )}

        {/* ── TEST TAB ── */}
        {activeTab === 'test' && (

          <KapitelTest2 />
        )}

        {/* ── STRATEGIE TAB ── */}
        {activeTab === 'strategie' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Lernstrategie</h2>
              <p className="text-slate-600 text-sm mt-1">Metode belajar berbasis jurnal ilmiah untuk retensi jangka panjang.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lernTipps.map((tip, i) => (
                <div key={i} className="clay-card p-6 bg-white space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${lernTippStyles[tip.farbe]} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                      {tip.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900">{tip.titel}</h3>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{tip.tag}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{tip.beschreibung}</p>
                </div>
              ))}
            </div>

            {/* Jadwal Belajar */}
            <div className="clay-card p-6 bg-white space-y-4">
              <h3 className="text-xl font-extrabold text-slate-900">📅 Jadwal Super-Fokus Kapitel 2 (2 Hari)</h3>
              <div className="overflow-x-auto rounded-xl border-2 border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-indigo-600 text-white">
                      <th className="text-left py-3 px-4 font-bold text-xs uppercase tracking-wide w-20">Hari</th>
                      <th className="text-left py-3 px-4 font-bold text-xs uppercase tracking-wide">Kegiatan (Berbasis Jurnal)</th>
                      <th className="text-left py-3 px-4 font-bold text-xs uppercase tracking-wide w-24">Durasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { hari: '1', kegiatan: '🌅 Pagi: Wortschatz Flashcards (Fokus Spaced Repetition Box 1)', durasi: '45 mnt', stripe: false },
                      { hari: '1', kegiatan: '☀️ Siang: Grammatik "weil" & Perfekt (Interleaving Practice)', durasi: '35 mnt', stripe: true },
                      { hari: '1', kegiatan: '🌙 Malam: Goethe Terserap (Lesen & Hören) + Mini-Quiz', durasi: '40 mnt', stripe: false },
                      { hari: '2', kegiatan: '🌅 Pagi: Goethe Aktif (Schreiben & Sprechen) via Dual Coding', durasi: '45 mnt', stripe: true },
                      { hari: '2', kegiatan: '☀️ Siang: Spaced Repetition Box 2 (Pengulangan Cepat Tepat)', durasi: '30 mnt', stripe: false },
                      { hari: '2', kegiatan: '🌙 Malam: Full Mock Test A2 & Final Review (Testing Effect)', durasi: '45 mnt', stripe: true },
                    ].map((row, i) => (
                      <tr key={i} className={`${row.stripe ? 'bg-slate-50' : 'bg-white'} hover:bg-indigo-50 transition-colors`}>
                        <td className="py-3 px-4 font-extrabold text-indigo-700">Hari {row.hari}</td>
                        <td className="py-3 px-4 text-slate-800">{row.kegiatan}</td>
                        <td className="py-3 px-4 font-bold text-slate-600">{row.durasi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Referensi Jurnal */}
            <div className="clay-card p-6 bg-indigo-950 border-indigo-700">
              <h3 className="font-extrabold text-lg text-white mb-4">📚 Referensi Jurnal Ilmiah</h3>
              <ul className="space-y-3 text-sm">
                <li className="text-indigo-100"><span className="text-green-400 font-bold">Spaced Repetition:</span> Cepeda et al. (2006). "Distributed Practice in Verbal Recall Tasks." <em>Psychological Bulletin</em>, 132(3), 354–380.</li>
                <li className="text-indigo-100"><span className="text-green-400 font-bold">Dual Coding:</span> Paivio, A. (1991). "Dual coding theory: Retrospect and current status." <em>Canadian Journal of Psychology</em>, 45(3), 255–287.</li>
                <li className="text-indigo-100"><span className="text-green-400 font-bold">Interleaving:</span> Kornell, N., & Bjork, R.A. (2008). "Learning concepts and categories." <em>Psychological Science</em>, 19(6), 585–592.</li>
                <li className="text-indigo-100"><span className="text-green-400 font-bold">Vocabulary in Context:</span> Nation, I.S.P. (2001). <em>Learning Vocabulary in Another Language.</em> Cambridge University Press.</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      {/* ── MARK COMPLETE BUTTON ── */}
      <div className="pb-12 max-w-7xl mx-auto px-6">
        <MarkCompleteButton stepId={activeTab} kapitelId="kapitel2" />
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t-2 border-slate-200 bg-white py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="clay-badge bg-emerald-100 text-emerald-800 border-emerald-300">A2 · Kapitel 2</span>
            <span className="clay-badge bg-indigo-100 text-indigo-800 border-indigo-300">Netzwerk Neu A2</span>
            <span className="clay-badge bg-violet-100 text-violet-800 border-violet-300">{wortschatz.length} Vokabeln</span>
          </div>
          <p className="text-slate-500 text-xs font-medium">© 2026 BelajarA2Deutsch · Goethe-Zertifikat A2 Preparation. Dibuat oleh Cipta Web Cibubur.</p>
        </div>
      </footer>
    </div>
  );
}
