'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import KapitelTest2 from '../KapitelTest2';
import { LesenInteraktiv2 } from './LesenInteraktiv2';
import { HorenInteraktiv2 } from './HorenInteraktiv2';
import { UebungInteraktiv2 } from './UebungInteraktiv2';
import ProgressTracker, { MarkCompleteButton } from '../ProgressTracker';
import { GrammatikInteraktiv2 } from './GrammatikInteraktiv2';
import ChapterTemplate from '../components/ChapterTemplate';

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


// ============================================================
// MAIN PAGE
// ============================================================

const miniQuiz = [
  { frage: 'Letztes Jahr ___ ich in Berlin.', options: ['bin', 'war', 'hatte'], besteAntwort: 1 },
  { frage: 'Wir ___ gestern keine Zeit.', options: ['waren', 'sind', 'hatten'], besteAntwort: 2 },
  { frage: 'Er hilft ___ bei den Hausaufgaben.', options: ['dem Kind', 'das Kind', 'den Kind'], besteAntwort: 0 },
  { frage: 'Können Sie ___ bitte den Weg zeigen?', options: ['mich', 'mir', 'ich'], besteAntwort: 1 },
];

export default function KapitelZweiPage() {
  return (
    <ChapterTemplate
      kapitelId="kapitel-2"
      kapitel={kapitel}
      wortschatz={wortschatz}
      partizipZwei={partizipZwei}
      grammatik={grammatik}
      goetheTasks={goetheTasks}
      lernTipps={lernTipps}
      miniQuiz={miniQuiz}
      LesenComponent={<LesenInteraktiv2 />}
      HorenComponent={<HorenInteraktiv2 />}
      SchreibenComponent={<UebungInteraktiv2 />}
      GrammatikInteraktivComponent={<GrammatikInteraktiv2 />}
      TestComponent={<KapitelTest2 />}
    />
  );
}
