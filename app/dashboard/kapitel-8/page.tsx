'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import ProgressTracker from '../ProgressTracker';

import KapitelTest8 from '../KapitelTest8';
import { LesenInteraktiv8 } from '../LesenInteraktiv8';
import { HorenInteraktiv8 } from '../HorenInteraktiv8';
import { UebungInteraktiv8 } from '../UebungInteraktiv8';
import { GrammatikInteraktiv8 } from '../GrammatikInteraktiv8';
import ChapterTemplate from '../components/ChapterTemplate';

// ============================================================
// DATA: Netzwerk Neu A2 – Kapitel 8: Gelernt ist gelernt!
// ============================================================

const kapitel = {
  nummer: 8,
  titel: 'Gelernt ist gelernt!',
  untertitel: 'Lernen, Lernprobleme, Ratschläge, Sprache im Beruf, Interviews und Präsentationen',
  level: 'A2',
  goetheFokus: ['Lesen', 'Hören', 'Schreiben', 'Sprechen'],
  beschreibung: "Belajar memahami und menjelaskan masalah belajar, memberi saran, memahami laporan tentang profesi yang berhubungan dengan bahasa, menanyakan informasi dengan Was für ein/e, memahami interview, melatih pelafalan b/d/g di akhir kata, dan menyiapkan presentasi singkat."
};

const wortschatz = [
  // Lernen, Hobbys und Lernmethoden
  { de: 'das Lernen', plural: '', id: 'proses belajar', beispiel: 'Das Lernen macht Spaß.', kategorie: 'Lernen' },
  { de: 'das Lernproblem', plural: '-e', id: 'masalah belajar', beispiel: 'Viele haben Lernprobleme.', kategorie: 'Lernen' },
  { de: 'der Kurs', plural: '-e', id: 'kursus', beispiel: 'Ich besuche einen Kurs.', kategorie: 'Lernen' },
  { de: 'die Übung', plural: '-en', id: 'latihan', beispiel: 'Wir machen viele Übungen.', kategorie: 'Lernen' },
  { de: 'die Vokabelkarte', plural: '-n', id: 'kartu kosakata', beispiel: 'Er schreibt Vokabelkarten.', kategorie: 'Lernen' },
  { de: 'das Wörterbuch', plural: '"-er', id: 'kamus', beispiel: 'Ich schlage im Wörterbuch nach.', kategorie: 'Lernen' },
  { de: 'der Beispielsatz', plural: '"-e', id: 'kalimat contoh', beispiel: 'Ein Beispielsatz hilft beim Lernen.', kategorie: 'Lernen' },
  { de: 'das Video', plural: '-s', id: 'video', beispiel: 'Ich sehe mir ein Video an.', kategorie: 'Lernen' },
  { de: 'der Partner', plural: '-', id: 'partner laki-laki', beispiel: 'Mein Partner hilft mir.', kategorie: 'Lernen' },
  { de: 'die Partnerin', plural: '-nen', id: 'partner perempuan', beispiel: 'Meine Partnerin lernt mit mir.', kategorie: 'Lernen' },
  { de: 'die Aussprachübung', plural: '-en', id: 'latihan pelafalan', beispiel: 'Wir machen eine Aussprachübung.', kategorie: 'Lernen' },
  { de: 'der Badeanzug', plural: '"-e', id: 'baju renang', beispiel: 'Ich brauche einen Badeanzug.', kategorie: 'Hobby' },
  { de: 'das Gemüse', plural: '', id: 'sayuran', beispiel: 'Wir essen viel Gemüse.', kategorie: 'Hobby' },
  { de: 'die Gitarre', plural: '-n', id: 'gitar', beispiel: 'Ich spiele Gitarre.', kategorie: 'Hobby' },
  { de: 'das Instrument', plural: '-e', id: 'alat musik', beispiel: 'Welches Instrument spielst du?', kategorie: 'Hobby' },
  { de: 'die Lieblingsband', plural: '-s', id: 'band favorit', beispiel: 'Das ist meine Lieblingsband.', kategorie: 'Hobby' },
  { de: 'die Kamera', plural: '-s', id: 'kamera', beispiel: 'Ich fotografiere mit der Kamera.', kategorie: 'Hobby' },
  { de: 'der Schwimmkurs', plural: '-e', id: 'kursus renang', beispiel: 'Sie macht einen Schwimmkurs.', kategorie: 'Hobby' },
  { de: 'das Foto', plural: '-s', id: 'foto', beispiel: 'Ich mache gern Fotos.', kategorie: 'Hobby' },
  { de: 'die Menge', plural: '-n', id: 'jumlah banyak', beispiel: 'Eine Menge Leute waren da.', kategorie: 'Hobby' },
  { de: 'die Qualität', plural: '-en', id: 'kualitas', beispiel: 'Die Qualität ist gut.', kategorie: 'Hobby' },
  { de: 'der Computer', plural: '-', id: 'komputer', beispiel: 'Ich lerne am Computer.', kategorie: 'Technik' },
  { de: 'die Kursleiterin', plural: '-nen', id: 'instruktur kursus perempuan', beispiel: 'Die Kursleiterin ist nett.', kategorie: 'Lernen' },
  { de: 'der Kursleiter', plural: '-', id: 'instruktur kursus laki-laki', beispiel: 'Der Kursleiter hilft uns.', kategorie: 'Lernen' },
  { de: 'die Einführung', plural: '-en', id: 'pengantar', beispiel: 'Wir bekommen eine Einführung.', kategorie: 'Lernen' },
  { de: 'die Disziplin', plural: '', id: 'disiplin', beispiel: 'Man braucht viel Disziplin.', kategorie: 'Lernen' },
  { de: 'das Klavier', plural: '-e', id: 'piano', beispiel: 'Ich spiele Klavier.', kategorie: 'Hobby' },

  // Lernprobleme und Prüfungen
  { de: 'die Abschlussprüfung', plural: '-en', id: 'ujian akhir', beispiel: 'Die Abschlussprüfung ist schwer.', kategorie: 'Prüfung' },
  { de: 'der Stoff', plural: '', id: 'materi pelajaran', beispiel: 'Der Stoff ist viel.', kategorie: 'Lernen' },
  { de: 'der Zeitplan', plural: '"-e', id: 'jadwal/rencana waktu', beispiel: 'Du solltest einen Zeitplan machen.', kategorie: 'Lernen' },
  { de: 'das Semester', plural: '-', id: 'semester', beispiel: 'Ich studiere im ersten Semester.', kategorie: 'Studium' },
  { de: 'das Stipendium', plural: 'Stipendien', id: 'beasiswa', beispiel: 'Sie hat ein Stipendium bekommen.', kategorie: 'Studium' },
  { de: 'der Prüfer', plural: '-', id: 'penguji laki-laki', beispiel: 'Der Prüfer war nett.', kategorie: 'Prüfung' },
  { de: 'die Prüferin', plural: '-nen', id: 'penguji perempuan', beispiel: 'Die Prüferin fragt viel.', kategorie: 'Prüfung' },
  { de: 'die Nervosität', plural: '', id: 'rasa gugup', beispiel: 'Meine Nervosität war groß.', kategorie: 'Gefühl' },
  { de: 'die Energie', plural: '-n', id: 'energi', beispiel: 'Ich habe viel Energie.', kategorie: 'Gesundheit' },
  { de: 'die Portion', plural: '-en', id: 'porsi', beispiel: 'Eine kleine Portion essen.', kategorie: 'Essen' },
  { de: 'das Mineralwasser', plural: '', id: 'air mineral', beispiel: 'Ich trinke Mineralwasser.', kategorie: 'Essen' },
  { de: 'die Zitrone', plural: '-n', id: 'lemon', beispiel: 'Wasser mit Zitrone.', kategorie: 'Essen' },
  { de: 'der Spaziergang', plural: '"-e', id: 'jalan-jalan', beispiel: 'Ein Spaziergang macht den Kopf frei.', kategorie: 'Freizeit' },
  { de: 'der Wald', plural: '"-er', id: 'hutan', beispiel: 'Wir gehen in den Wald.', kategorie: 'Freizeit' },
  { de: 'die Fahrstunde', plural: '-n', id: 'jam latihan mengemudi', beispiel: 'Ich habe eine Fahrstunde.', kategorie: 'Prüfung' },
  { de: 'das Herz', plural: '-en', id: 'jantung/hati', beispiel: 'Mein Herz klopft schnell.', kategorie: 'Körper' },
  { de: 'der Magen', plural: '"-', id: 'lambung', beispiel: 'Mein Magen tut weh.', kategorie: 'Körper' },
  { de: 'die Magenschmerzen', plural: '', id: 'sakit perut', beispiel: 'Ich habe Magenschmerzen.', kategorie: 'Körper' },
  { de: 'die Forderung', plural: '-en', id: 'tuntutan/permintaan', beispiel: 'Die Forderungen sind hoch.', kategorie: 'Prüfung' },
  { de: 'die Beratung', plural: '-en', id: 'konsultasi', beispiel: 'Ich brauche eine Beratung.', kategorie: 'Lernen' },
  { de: 'das Sekretariat', plural: '-e', id: 'sekretariat', beispiel: 'Das Sekretariat ist geschlossen.', kategorie: 'Lernen' },
  { de: 'die Sprechstunde', plural: '-n', id: 'jam konsultasi', beispiel: 'Wann ist die Sprechstunde?', kategorie: 'Lernen' },
  { de: 'das Lerntempo', plural: 'Lerntempi', id: 'tempo belajar', beispiel: 'Jeder hat sein eigenes Lerntempo.', kategorie: 'Lernen' },
  { de: 'die Lerngruppe', plural: '-n', id: 'kelompok belajar', beispiel: 'Wir lernen in einer Lerngruppe.', kategorie: 'Lernen' },
  { de: 'die Methode', plural: '-n', id: 'metode', beispiel: 'Welche Methode benutzt du?', kategorie: 'Lernen' },

  // Mit Sprache arbeiten
  { de: 'die Sprache', plural: '-n', id: 'bahasa', beispiel: 'Sie spricht drei Sprachen.', kategorie: 'Sprache' },
  { de: 'die Kommunikation', plural: '', id: 'komunikasi', beispiel: 'Kommunikation ist wichtig.', kategorie: 'Sprache' },
  { de: 'der Gebärdendolmetscher', plural: '-', id: 'juru bahasa isyarat laki-laki', beispiel: 'Er ist Gebärdendolmetscher.', kategorie: 'Beruf' },
  { de: 'die Gebärdendolmetscherin', plural: '-nen', id: 'juru bahasa isyarat perempuan', beispiel: 'Sie arbeitet als Gebärdendolmetscherin.', kategorie: 'Beruf' },
  { de: 'der Dolmetscher', plural: '-', id: 'interpreter laki-laki', beispiel: 'Der Dolmetscher übersetzt.', kategorie: 'Beruf' },
  { de: 'die Dolmetscherin', plural: '-nen', id: 'interpreter perempuan', beispiel: 'Die Dolmetscherin hilft uns.', kategorie: 'Beruf' },
  { de: 'der Übersetzer', plural: '-', id: 'penerjemah laki-laki', beispiel: 'Er arbeitet als Übersetzer.', kategorie: 'Beruf' },
  { de: 'die Übersetzerin', plural: '-nen', id: 'penerjemah perempuan', beispiel: 'Die Übersetzerin schreibt den Text neu.', kategorie: 'Beruf' },
  { de: 'die Sprachwissenschaft', plural: '', id: 'linguistik', beispiel: 'Sie studiert Sprachwissenschaft.', kategorie: 'Studium' },
  { de: 'die Konferenz', plural: '-en', id: 'konferensi', beispiel: 'Wir sind auf einer Konferenz.', kategorie: 'Beruf' },
  { de: 'das Standesamt', plural: '"-er', id: 'kantor catatan sipil', beispiel: 'Sie heiraten auf dem Standesamt.', kategorie: 'Beruf' },
  { de: 'der Angehörige', plural: '-n', id: 'anggota keluarga/kerabat', beispiel: 'Angehörige können mitkommen.', kategorie: 'Beruf' },
  { de: 'das Gebärdentelefon', plural: '-e', id: 'telepon bahasa isyarat', beispiel: 'Er ruft über das Gebärdentelefon an.', kategorie: 'Beruf' },
  { de: 'der Gesprächspartner', plural: '-', id: 'lawan bicara laki-laki', beispiel: 'Mein Gesprächspartner hört gut zu.', kategorie: 'Kommunikation' },
  { de: 'die Gesprächspartnerin', plural: '-nen', id: 'lawan bicara perempuan', beispiel: 'Meine Gesprächspartnerin lacht.', kategorie: 'Kommunikation' },
  { de: 'der Auftrag', plural: '"-e', id: 'tugas/proyek kerja', beispiel: 'Ich habe einen neuen Auftrag.', kategorie: 'Beruf' },
  { de: 'der Arbeitgeber', plural: '-', id: 'pemberi kerja laki-laki', beispiel: 'Der Arbeitgeber zahlt das Gehalt.', kategorie: 'Beruf' },
  { de: 'die Arbeitgeberin', plural: '-nen', id: 'pemberi kerja perempuan', beispiel: 'Die Arbeitgeberin ist nett.', kategorie: 'Beruf' },
  { de: 'das Projekt', plural: '-e', id: 'proyek', beispiel: 'Wir arbeiten an einem Projekt.', kategorie: 'Beruf' },
  { de: 'das Feedback', plural: '', id: 'umpan balik', beispiel: 'Ich brauche Feedback.', kategorie: 'Lernen' },
  { de: 'der Prospekt', plural: '-e', id: 'brosur', beispiel: 'Ich lese den Prospekt.', kategorie: 'Beruf' },
  { de: 'der Katalog', plural: '-e', id: 'katalog', beispiel: 'Im Katalog gibt es viele Produkte.', kategorie: 'Beruf' },
  { de: 'der Film', plural: '-e', id: 'film', beispiel: 'Der Film ist spannend.', kategorie: 'Beruf' },
  { de: 'die Figur', plural: '-en', id: 'karakter', beispiel: 'Die Figur im Film ist lustig.', kategorie: 'Film' },
  { de: 'der Ausdruck', plural: '"-e', id: 'ungkapan', beispiel: 'Dieser Ausdruck ist neu für mich.', kategorie: 'Sprache' },
  { de: 'der Werbetext', plural: '-e', id: 'teks iklan', beispiel: 'Sie schreibt einen Werbetext.', kategorie: 'Beruf' },
  { de: 'der Stummfilm', plural: '-e', id: 'film bisu', beispiel: 'Ein Stummfilm hat keinen Ton.', kategorie: 'Film' },
  { de: 'die Übersetzung', plural: '-en', id: 'terjemahan', beispiel: 'Die Übersetzung ist gut.', kategorie: 'Sprache' },

  // Voneinander lernen
  { de: 'der Nachbar', plural: '-n', id: 'tetangga laki-laki', beispiel: 'Mein Nachbar ist nett.', kategorie: 'Personen' },
  { de: 'die Nachbarin', plural: '-nen', id: 'tetangga perempuan', beispiel: 'Meine Nachbarin hilft mir.', kategorie: 'Personen' },
  { de: 'das Viertel', plural: '-', id: 'lingkungan/area', beispiel: 'Wir wohnen im gleichen Viertel.', kategorie: 'Orte' },
  { de: 'der Freiwillige', plural: '-n', id: 'relawan laki-laki', beispiel: 'Er arbeitet als Freiwilliger.', kategorie: 'Personen' },
  { de: 'die Freiwillige', plural: '-n', id: 'relawan perempuan', beispiel: 'Sie ist Freiwillige.', kategorie: 'Personen' },
  { de: 'das Talent', plural: '-e', id: 'bakat', beispiel: 'Jeder hat Talente.', kategorie: 'Eigenschaften' },
  { de: 'die Aktion', plural: '-en', id: 'aksi/kegiatan', beispiel: 'Das ist eine tolle Aktion.', kategorie: 'Aktivitäten' },
  { de: 'der Babysitter', plural: '-', id: 'babysitter laki-laki', beispiel: 'Wir brauchen einen Babysitter.', kategorie: 'Beruf' },
  { de: 'die Babysitterin', plural: '-nen', id: 'babysitter perempuan', beispiel: 'Die Babysitterin kommt heute.', kategorie: 'Beruf' },
  { de: 'der Senior', plural: '-en', id: 'lansia laki-laki', beispiel: 'Der Senior hilft den Kindern.', kategorie: 'Personen' },
  { de: 'die Seniorin', plural: '-nen', id: 'lansia perempuan', beispiel: 'Die Seniorin liest vor.', kategorie: 'Personen' },
  { de: 'der Garten', plural: '"-', id: 'kebun', beispiel: 'Wir arbeiten im Garten.', kategorie: 'Orte' },
  { de: 'das Dankeschön', plural: '-s', id: 'bentuk terima kasih', beispiel: 'Als Dankeschön gibt es Essen.', kategorie: 'Aktivitäten' },
  { de: 'der Service', plural: '-s', id: 'layanan', beispiel: 'Der Service ist kostenlos.', kategorie: 'Aktivitäten' },
  { de: 'die Reparatur', plural: '-en', id: 'perbaikan', beispiel: 'Die Reparatur dauert lange.', kategorie: 'Aktivitäten' },
  { de: 'das Repair-Café', plural: '-s', id: 'kafe perbaikan', beispiel: 'Wir gehen ins Repair-Café.', kategorie: 'Orte' },
  { de: 'das Werkzeug', plural: '-e', id: 'alat/perkakas', beispiel: 'Hast du das Werkzeug?', kategorie: 'Aktivitäten' },
  { de: 'das Ding', plural: '-e', id: 'benda/barang', beispiel: 'Bringen Sie kaputte Dinge mit.', kategorie: 'Aktivitäten' },

  // Verben
  { de: 'lernen', plural: '', id: 'belajar', beispiel: 'Ich lerne Deutsch.', kategorie: 'Verben' },
  { de: 'üben', plural: '', id: 'berlatih', beispiel: 'Wir üben jeden Tag.', kategorie: 'Verben' },
  { de: 'wiederholen', plural: '', id: 'mengulang', beispiel: 'Bitte wiederholen Sie.', kategorie: 'Verben' },
  { de: 'nachsprechen', plural: '', id: 'menirukan ucapan', beispiel: 'Sprechen Sie nach.', kategorie: 'Verben' },
  { de: 'nachschlagen', plural: '', id: 'mencari di kamus', beispiel: 'Ich schlage das Wort nach.', kategorie: 'Verben' },
  { de: 'schreiben', plural: '', id: 'menulis', beispiel: 'Er schreibt eine E-Mail.', kategorie: 'Verben' },
  { de: 'benutzen', plural: '', id: 'menggunakan', beispiel: 'Benutzen Sie die App.', kategorie: 'Verben' },
  { de: 'sehen', plural: '', id: 'melihat/menonton', beispiel: 'Ich sehe ein Video.', kategorie: 'Verben' },
  { de: 'beschriften', plural: '', id: 'memberi label', beispiel: 'Gegenstände beschriften.', kategorie: 'Verben' },
  { de: 'sprechen', plural: '', id: 'berbicara', beispiel: 'Wir sprechen Deutsch.', kategorie: 'Verben' },
  { de: 'hören', plural: '', id: 'mendengar', beispiel: 'Wir hören Musik.', kategorie: 'Verben' },
  { de: 'spielen', plural: '', id: 'bermain', beispiel: 'Ich spiele Gitarre.', kategorie: 'Verben' },
  { de: 'bearbeiten', plural: '', id: 'mengedit', beispiel: 'Ich bearbeite Fotos.', kategorie: 'Verben' },
  { de: 'pflanzen', plural: '', id: 'menanam', beispiel: 'Blumen pflanzen.', kategorie: 'Verben' },
  { de: 'ernten', plural: '', id: 'memanen', beispiel: 'Gemüse ernten.', kategorie: 'Verben' },
  { de: 'singen', plural: '', id: 'menyanyi', beispiel: 'Ein Lied singen.', kategorie: 'Verben' },
  { de: 'sich merken', plural: '', id: 'mengingat', beispiel: 'Ich kann mir das nicht merken.', kategorie: 'Verben' },
  { de: 'sich konzentrieren', plural: '', id: 'berkonsentrasi', beispiel: 'Ich muss mich konzentrieren.', kategorie: 'Verben' },
  { de: 'schlafen', plural: '', id: 'tidur', beispiel: 'Du solltest genug schlafen.', kategorie: 'Verben' },
  { de: 'schaffen', plural: '', id: 'berhasil/menyelesaikan', beispiel: 'Wir schaffen das!', kategorie: 'Verben' },
  { de: 'kapieren', plural: '', id: 'paham (informal)', beispiel: 'Ich kapier das nicht.', kategorie: 'Verben' },
  { de: 'vergessen', plural: '', id: 'lupa', beispiel: 'Ich vergesse die Wörter.', kategorie: 'Verben' },
  { de: 'einplanen', plural: '', id: 'merencanakan', beispiel: 'Du solltest Pausen einplanen.', kategorie: 'Verben' },
  { de: 'notieren', plural: '', id: 'mencatat', beispiel: 'Notieren Sie die neuen Wörter.', kategorie: 'Verben' },
  { de: 'atmen', plural: '', id: 'bernapas', beispiel: 'Ruhig atmen.', kategorie: 'Verben' },
  { de: 'durchatmen', plural: '', id: 'menarik napas dalam', beispiel: 'Atme tief durch.', kategorie: 'Verben' },
  { de: 'helfen', plural: '', id: 'membantu', beispiel: 'Ich helfe dir.', kategorie: 'Verben' },
  { de: 'funktionieren', plural: '', id: 'berfungsi/berhasil', beispiel: 'Es funktioniert nicht.', kategorie: 'Verben' },
  { de: 'freimachen', plural: '', id: 'mengosongkan (waktu)', beispiel: 'Mach dir den Nachmittag frei.', kategorie: 'Verben' },
  { de: 'trinken', plural: '', id: 'minum', beispiel: 'Trink viel Wasser.', kategorie: 'Verben' },
  { de: 'essen', plural: '', id: 'makan', beispiel: 'Ich esse einen Apfel.', kategorie: 'Verben' },
  { de: 'verschieben', plural: '', id: 'menunda', beispiel: 'Wir verschieben den Termin.', kategorie: 'Verben' },
  { de: 'bleiben', plural: '', id: 'tetap/tinggal', beispiel: 'Bleib konzentriert.', kategorie: 'Verben' },
  { de: 'sorgen', plural: '', id: 'memastikan/mengurus', beispiel: 'Er sorgt dafür, dass alles klappt.', kategorie: 'Verben' },
  { de: 'dolmetschen', plural: '', id: 'menerjemahkan lisan', beispiel: 'Er dolmetscht auf der Konferenz.', kategorie: 'Verben' },
  { de: 'begleiten', plural: '', id: 'mendampingi', beispiel: 'Er begleitet gehörlose Menschen.', kategorie: 'Verben' },
  { de: 'kommunizieren', plural: '', id: 'berkomunikasi', beispiel: 'Wir kommunizieren über Video.', kategorie: 'Verben' },
  { de: 'weitergeben', plural: '', id: 'meneruskan (informasi)', beispiel: 'Er gibt die Informationen weiter.', kategorie: 'Verben' },
  { de: 'studieren', plural: '', id: 'kuliah/mempelajari', beispiel: 'Sie studiert Sprachwissenschaft.', kategorie: 'Verben' },
  { de: 'übersetzen', plural: '', id: 'menerjemahkan', beispiel: 'Sie übersetzt Filme.', kategorie: 'Verben' },
  { de: 'halten', plural: '', id: 'mengadakan/memberikan', beispiel: 'Eine Präsentation halten.', kategorie: 'Verben' },
  { de: 'präsentieren', plural: '', id: 'mempresentasikan', beispiel: 'Wir präsentieren unser Projekt.', kategorie: 'Verben' },
  { de: 'bewegen', plural: '', id: 'bergerak', beispiel: 'Man muss sich bewegen.', kategorie: 'Verben' },
  { de: 'segeln', plural: '', id: 'berlayar', beispiel: 'Er macht einen Segelkurs.', kategorie: 'Verben' },
  { de: 'wegwerfen', plural: '', id: 'membuang', beispiel: 'Wirf das nicht weg!', kategorie: 'Verben' },
  { de: 'starten', plural: '', id: 'memulai', beispiel: 'Das Projekt startet heute.', kategorie: 'Verben' },
  { de: 'existieren', plural: '', id: 'ada/eksis', beispiel: 'Der Verein existiert schon lange.', kategorie: 'Verben' },
];

const partizipZwei = [
  { infinitiv: 'wiederholen', partizip: 'wiederholt', hilfsverb: 'haben', id: 'mengulang' },
  { infinitiv: 'nachsprechen', partizip: 'nachgesprochen', hilfsverb: 'haben', id: 'menirukan ucapan' },
  { infinitiv: 'nachschlagen', partizip: 'nachgeschlagen', hilfsverb: 'haben', id: 'mencari di kamus' },
  { infinitiv: 'beschriften', partizip: 'beschriftet', hilfsverb: 'haben', id: 'memberi label' },
  { infinitiv: 'fotografieren', partizip: 'fotografiert', hilfsverb: 'haben', id: 'memotret' },
  { infinitiv: 'bearbeiten', partizip: 'bearbeitet', hilfsverb: 'haben', id: 'mengedit' },
  { infinitiv: 'pflanzen', partizip: 'gepflanzt', hilfsverb: 'haben', id: 'menanam' },
  { infinitiv: 'ernten', partizip: 'geerntet', hilfsverb: 'haben', id: 'memanen' },
  { infinitiv: 'sich merken', partizip: 'sich gemerkt', hilfsverb: 'haben', id: 'mengingat' },
  { infinitiv: 'sich konzentrieren', partizip: 'sich konzentriert', hilfsverb: 'haben', id: 'berkonsentrasi' },
  { infinitiv: 'kapieren', partizip: 'kapiert', hilfsverb: 'haben', id: 'paham (informal)' },
  { infinitiv: 'einplanen', partizip: 'eingeplant', hilfsverb: 'haben', id: 'merencanakan' },
  { infinitiv: 'atmen', partizip: 'geatmet', hilfsverb: 'haben', id: 'bernapas' },
  { infinitiv: 'durchatmen', partizip: 'durchgeatmet', hilfsverb: 'haben', id: 'menarik napas dalam' },
  { infinitiv: 'freimachen', partizip: 'freigemacht', hilfsverb: 'haben', id: 'mengosongkan waktu' },
  { infinitiv: 'verschieben', partizip: 'verschoben', hilfsverb: 'haben', id: 'menunda' },
  { infinitiv: 'sorgen', partizip: 'gesorgt', hilfsverb: 'haben', id: 'memastikan' },
  { infinitiv: 'dolmetschen', partizip: 'gedolmetscht', hilfsverb: 'haben', id: 'menerjemahkan lisan' },
  { infinitiv: 'begleiten', partizip: 'begleitet', hilfsverb: 'haben', id: 'mendampingi' },
  { infinitiv: 'kommunizieren', partizip: 'kommuniziert', hilfsverb: 'haben', id: 'berkomunikasi' },
  { infinitiv: 'weitergeben', partizip: 'weitergegeben', hilfsverb: 'haben', id: 'meneruskan' },
  { infinitiv: 'programmieren', partizip: 'programmiert', hilfsverb: 'haben', id: 'memprogram' },
  { infinitiv: 'bewegen', partizip: 'bewegt', hilfsverb: 'haben', id: 'bergerak' },
  { infinitiv: 'segeln', partizip: 'gesegelt', hilfsverb: 'sein', id: 'berlayar' },
  { infinitiv: 'wegwerfen', partizip: 'weggeworfen', hilfsverb: 'haben', id: 'membuang' },
  { infinitiv: 'starten', partizip: 'gestartet', hilfsverb: 'haben', id: 'memulai' },
  { infinitiv: 'existieren', partizip: 'existiert', hilfsverb: 'haben', id: 'ada/eksis' },
];

const grammatik = [
  {
    titel: 'Ratschläge',
    name: 'sollte',
    farbe: 'border-l-sky-500 bg-sky-50 text-sky-900',
    erklaerung: '"sollte" (should) digunakan untuk memberi saran atau nasihat. Kata kerja utama berada di akhir kalimat dalam bentuk infinitiv.',
    struktur: 'Subjekt + sollte + ... + Infinitiv',
    konjugationsTabelle: {
      headers: ['Pronomen', 'sollte'],
      rows: [
        ['ich', 'sollte'],
        ['du', 'solltest'],
        ['er/sie/es', 'sollte'],
        ['wir', 'sollten'],
        ['ihr', 'solltet'],
        ['sie/Sie', 'sollten']
      ]
    },
    beispiele: [
      { 
        de: 'Du solltest Pausen machen.', 
        id: 'Kamu sebaiknya mengambil jeda istirahat.', 
        highlight: 'solltest' 
      },
      { 
        de: 'Man sollte mit anderen zusammen lernen.', 
        id: 'Seseorang sebaiknya belajar bersama orang lain.', 
        highlight: 'sollte' 
      }
    ],
  },
  {
    titel: 'Frageartikel',
    name: 'Was für ein/e?',
    farbe: 'border-l-indigo-500 bg-indigo-50 text-indigo-900',
    erklaerung: '"Was für ein/e?" digunakan untuk bertanya "jenis/macam apa?". Perhatikan kasus (Nominativ/Akkusativ/Dativ) yang digunakan.',
    struktur: 'Was für ein/eine/einen/einem + Nomen?',
    konjugationsTabelle: null,
    beispiele: [
      { 
        de: 'Was für einen Kurs möchtest du besuchen?', 
        id: 'Kurs jenis apa yang ingin kamu ikuti? (Akkusativ, der Kurs)', 
        highlight: 'Was für einen' 
      },
      { 
        de: 'Mit was für einer App hast du schon gelernt?', 
        id: 'Dengan aplikasi jenis apa kamu sudah belajar? (Dativ, die App)', 
        highlight: 'Mit was für einer' 
      }
    ],
  },
  {
    titel: 'Aussprache',
    name: 'b, d, g am Wortende',
    farbe: 'border-l-emerald-500 bg-emerald-50 text-emerald-900',
    erklaerung: 'Konsonan b, d, g jika berada di akhir suku kata/kata dibaca keras seperti p, t, k (Auslautverhärtung).',
    struktur: 'b → [p] | d → [t] | g → [k]',
    konjugationsTabelle: null,
    beispiele: [
      { 
        de: 'der Auftrag → die Aufträge', 
        id: 'Auftrag (g diucapkan k) → Aufträge (g diucapkan g)', 
        highlight: 'Auftrag' 
      },
      { 
        de: 'der Abend → die Abende', 
        id: 'Abend (d diucapkan t) → Abende (d diucapkan d)', 
        highlight: 'Abend' 
      },
      { 
        de: 'der Urlaub → die Urlaube', 
        id: 'Urlaub (b diucapkan p) → Urlaube (b diucapkan b)', 
        highlight: 'Urlaub' 
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
      { text: 'Berichte über den Berufsalltag verstehen', type: 'Detailverständnis' },
      { text: 'Informationen über Nachbarschaftsprojekte finden', type: 'Selektives Lesen' },
    ]
  },
  {
    skill: 'Hören',
    icon: '🎧',
    farbe: 'bg-indigo-100 text-indigo-700',
    tasks: [
      { text: 'Ein Interview zum Thema Reparieren verstehen', type: 'Globalverständnis' },
      { text: 'Lernprobleme und Ratschläge im Radio hören', type: 'Detailverständnis' },
    ]
  },
  {
    skill: 'Schreiben / Sprechen',
    icon: '🗣️',
    farbe: 'bg-rose-100 text-rose-700',
    tasks: [
      { text: 'Schriftliche Ratschläge zu Problemen geben', type: 'Produktion' },
      { text: 'Eine kurze Präsentation vorbereiten und halten', type: 'Präsentation' },
    ]
  }
];

const lernTipps = [
  {
    nummer: 1,
    titel: 'Präsentationen üben',
    icon: '🗣️',
    farbe: 'bg-indigo-100 text-indigo-600',
    beschreibung: 'Nehmen Sie Ihre Präsentation mit dem Handy auf und hören Sie sich selbst an. Sprechen Sie flüssig? Lesen Sie nicht ab?',
    tag: 'Sprechen'
  },
  {
    nummer: 2,
    titel: 'Auslautverhärtung',
    icon: '🎙️',
    farbe: 'bg-rose-100 text-rose-600',
    beschreibung: 'Achten Sie auf das Ende von Wörtern: "Tag" klingt wie [Taak], aber "Tage" klingt wie [Taage].',
    tag: 'Aussprache'
  },
  {
    nummer: 3,
    titel: 'Konjunktiv II: sollte',
    icon: '💡',
    farbe: 'bg-emerald-100 text-emerald-600',
    beschreibung: 'Wenn jemand ein Problem hat, geben Sie Ratschläge mit "Du solltest...". Es klingt höflicher als ein direkter Imperativ.',
    tag: 'Grammatik'
  }
];

const miniQuiz = [
  {
    frage: 'Welches Wort passt? "Ich kann mich nicht ___, weil das Handy immer neben mir liegt."',
    options: ['kapieren', 'konzentrieren', 'aussteigen', 'bremsen'],
    besteAntwort: 1
  },
  {
    frage: 'Wie geben Sie einen Ratschlag? "Er ___ einen Zeitplan machen."',
    options: ['soll', 'sollte', 'muss', 'sollten'],
    besteAntwort: 1
  },
  {
    frage: 'Welches Fragewort ist richtig? "___ einen Kurs möchtest du besuchen?"',
    options: ['Was für ein', 'Was für eine', 'Was für einen', 'Was für einem'],
    besteAntwort: 2
  }
];

export default function Kapitel8Dashboard() {
  return (
    <ChapterTemplate 
      kapitelId="kapitel-8"
      kapitel={kapitel}
      wortschatz={wortschatz}
      partizipZwei={partizipZwei}
      grammatik={grammatik}
      goetheTasks={goetheTasks}
      lernTipps={lernTipps}
      miniQuiz={miniQuiz}
      
      LesenComponent={<LesenInteraktiv8 />}
      HorenComponent={<HorenInteraktiv8 />}
      SchreibenComponent={<UebungInteraktiv8 />}
      GrammatikInteraktivComponent={<GrammatikInteraktiv8 />}
      TestComponent={<KapitelTest8 />}
    />
  );
}
