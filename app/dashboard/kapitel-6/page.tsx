'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import ProgressTracker from '../ProgressTracker';

// Placeholder components to prevent build errors before actual implementation
import KapitelTest6 from '../KapitelTest6';
import { LesenInteraktiv6 } from '../LesenInteraktiv6';
import { HorenInteraktiv6 } from '../HorenInteraktiv6';
import { UebungInteraktiv6 } from '../UebungInteraktiv6';
import { GrammatikInteraktiv6 } from '../GrammatikInteraktiv6';
import ChapterTemplate from '../components/ChapterTemplate';

// ============================================================
// DATA: Netzwerk Neu A2 – Kapitel 6: Arbeitswelten
// ============================================================

const kapitel = {
  nummer: 6,
  titel: 'Arbeitswelten',
  untertitel: 'Berufe, Geschäftsreise, Freizeitangebote, Traumberuf, Telefonieren und moderne Arbeitswelt',
  level: 'A2',
  goetheFokus: ['Lesen', 'Hören', 'Schreiben', 'Sprechen'],
};

const wortschatz = [
  // Arbeitswelten & Arbeit
  { de: 'der Arbeitstag', plural: '-e', id: 'hari kerja', beispiel: 'Mein Arbeitstag ist lang.', kategorie: 'Arbeitswelt' },
  { de: 'das Arbeitsleben', plural: '', id: 'kehidupan kerja', beispiel: 'Das Arbeitsleben mit Maschinen.', kategorie: 'Arbeitswelt' },
  { de: 'die Tätigkeit', plural: '-en', id: 'aktivitas/kegiatan', beispiel: 'Das ist eine interessante Tätigkeit.', kategorie: 'Arbeitswelt' },
  { de: 'das Büro', plural: '-s', id: 'kantor', beispiel: 'Ich fahre ins Büro.', kategorie: 'Arbeit' },
  { de: 'das Geschäft', plural: '-e', id: 'toko/usaha', beispiel: 'Marlies hat ein Geschäft eröffnet.', kategorie: 'Arbeit' },
  { de: 'der Laden', plural: 'Läden', id: 'toko', beispiel: 'Sie arbeitet in ihrem eigenen Laden.', kategorie: 'Arbeit' },
  { de: 'der Kunde / die Kundin', plural: '-n / -nen', id: 'pelanggan', beispiel: 'Der Kunde wartet am Schalter.', kategorie: 'Arbeit' },
  { de: 'der Chef / die Chefin', plural: '-s / -nen', id: 'bos', beispiel: 'Sie ist selbstständig und hat keinen Chef.', kategorie: 'Arbeit' },
  { de: 'die Baustelle', plural: '-n', id: 'lokasi konstruksi', beispiel: 'Die Baustelle ist sehr groß.', kategorie: 'Arbeit' },
  { de: 'die Lieblingsbaustelle', plural: '-n', id: 'lokasi konstruksi favorit', beispiel: 'Das ist seine Lieblingsbaustelle.', kategorie: 'Arbeit' },
  { de: 'die Besprechung', plural: '-en', id: 'rapat', beispiel: 'Wir haben gleich eine Besprechung.', kategorie: 'Arbeit' },
  { de: 'der Traumberuf', plural: '-e', id: 'pekerjaan impian', beispiel: 'Tiertrainer ist mein Traumberuf.', kategorie: 'Beruf' },
  { de: 'der Berufswunsch', plural: '"-e', id: 'cita-cita profesi', beispiel: 'Was ist dein Berufswunsch?', kategorie: 'Beruf' },
  { de: 'der Job', plural: '-s', id: 'pekerjaan', beispiel: 'Ich brauche einen neuen Job.', kategorie: 'Beruf' },
  { de: 'der Jobwechsel', plural: '-', id: 'pergantian pekerjaan', beispiel: 'Ein Jobwechsel ist manchmal gut.', kategorie: 'Beruf' },
  { de: 'der Neuanfang', plural: '"-e', id: 'awal baru', beispiel: 'Ein beruflicher Neuanfang.', kategorie: 'Beruf' },
  { de: 'der Lohn', plural: '"-e', id: 'upah', beispiel: 'Der Lohn ist nicht sehr hoch.', kategorie: 'Beruf' },
  { de: 'das Risiko', plural: 'Risiken', id: 'risiko', beispiel: 'Das Risiko ist groß.', kategorie: 'Beruf' },
  { de: 'die Chance', plural: '-n', id: 'kesempatan', beispiel: 'Man muss eine Chance nutzen.', kategorie: 'Beruf' },
  { de: 'die Freiheit', plural: '', id: 'kebebasan', beispiel: 'Er liebt die Freiheit auf der Straße.', kategorie: 'Beruf' },
  { de: 'der Lastwagen (Lkw)', plural: '-', id: 'truk', beispiel: 'Er fährt einen großen Lastwagen.', kategorie: 'Beruf' },
  { de: 'die Rente', plural: '-n', id: 'pensiun', beispiel: 'Sie möchte bis zur Rente arbeiten.', kategorie: 'Beruf' },

  // Berufe
  { de: 'der Lehrer / die Lehrerin', plural: '- / -nen', id: 'guru', beispiel: 'Die Lehrerin korrigiert die Tests.', kategorie: 'Berufe' },
  { de: 'der Übersetzer / die Übersetzerin', plural: '- / -nen', id: 'penerjemah', beispiel: 'Sie hat als Übersetzerin gearbeitet.', kategorie: 'Berufe' },
  { de: 'der Fernfahrer / die Fernfahrerin', plural: '- / -nen', id: 'sopir truk', beispiel: 'Er arbeitet jetzt als Fernfahrer.', kategorie: 'Berufe' },
  { de: 'der Busfahrer / die Busfahrerin', plural: '- / -nen', id: 'sopir bus', beispiel: 'Später möchte er Busfahrer werden.', kategorie: 'Berufe' },
  { de: 'der Arzt / die Ärztin', plural: '"-e / -nen', id: 'dokter', beispiel: 'Er war als Arzt sehr erfolgreich.', kategorie: 'Berufe' },
  { de: 'der Herzchirurg / die Herzchirurgin', plural: '-en / -nen', id: 'dokter bedah jantung', beispiel: 'Er hat eine Ausbildung zum Herzchirurgen gemacht.', kategorie: 'Berufe' },
  { de: 'der Chirurg / die Chirurgin', plural: '-en / -nen', id: 'ahli bedah', beispiel: 'Sie ist Chirurgin im Krankenhaus.', kategorie: 'Berufe' },
  { de: 'der Oberarzt / die Oberärztin', plural: '"-e / -nen', id: 'dokter senior', beispiel: 'Er wurde Oberarzt.', kategorie: 'Berufe' },
  { de: 'der Leiter / die Leiterin', plural: '- / -nen', id: 'pemimpin', beispiel: 'Er war Leiter eines Herzzentrums.', kategorie: 'Berufe' },
  { de: 'der Tiertrainer / die Tiertrainerin', plural: '- / -nen', id: 'pelatih hewan', beispiel: 'Ein Tiertrainer arbeitet mit Tieren.', kategorie: 'Berufe' },
  { de: 'der Architekt / die Architektin', plural: '-en / -nen', id: 'arsitek', beispiel: 'Der Architekt plant das Haus.', kategorie: 'Berufe' },
  { de: 'der Ingenieur / die Ingenieurin', plural: '-e / -nen', id: 'insinyur', beispiel: 'Die Ingenieurin arbeitet im Büro.', kategorie: 'Berufe' },
  { de: 'der Verkäufer / die Verkäuferin', plural: '- / -nen', id: 'penjual', beispiel: 'Der Verkäufer berät den Kunden.', kategorie: 'Berufe' },
  { de: 'der Programmierer / die Programmiererin', plural: '- / -nen', id: 'programmer', beispiel: 'Der Programmierer schreibt den Code.', kategorie: 'Berufe' },
  { de: 'der Therapeut / die Therapeutin', plural: '-en / -nen', id: 'terapis', beispiel: 'Die Therapeutin hilft den Patienten.', kategorie: 'Berufe' },
  { de: 'der Koch / die Köchin', plural: '"-e / -nen', id: 'koki', beispiel: 'Sie wurde Köchin.', kategorie: 'Berufe' },

  // Schule & Bildung
  { de: 'der Student / die Studentin', plural: '-en / -nen', id: 'mahasiswa', beispiel: 'Studenten bekommen eine Ermäßigung.', kategorie: 'Schule & Bildung' },
  { de: 'der Abendkurs', plural: '-e', id: 'kursus malam', beispiel: 'Er besucht einen Abendkurs.', kategorie: 'Schule & Bildung' },
  { de: 'die Schule', plural: '-n', id: 'sekolah', beispiel: 'Wir gehen in die Schule.', kategorie: 'Schule & Bildung' },
  { de: 'der Test', plural: '-s', id: 'tes/ujian', beispiel: 'Sie muss Tests korrigieren.', kategorie: 'Schule & Bildung' },

  // Musik & Kultur
  { de: 'die Musikhochschule', plural: '-n', id: 'sekolah tinggi musik', beispiel: 'Sie studiert an der Musikhochschule.', kategorie: 'Musik & Kultur' },
  { de: 'die Geige', plural: '-n', id: 'biola', beispiel: 'Claudia hat Geige gelernt.', kategorie: 'Musik & Kultur' },
  { de: 'das Orchester', plural: '-', id: 'orkestra', beispiel: 'Sie spielt im Orchester.', kategorie: 'Musik & Kultur' },
  { de: 'der Musiker / die Musikerin', plural: '- / -nen', id: 'musisi', beispiel: 'Die Musikerin kommt mit einer neuen Band.', kategorie: 'Musik & Kultur' },
  { de: 'die Band', plural: '-s', id: 'band', beispiel: 'Das ist eine tolle Band.', kategorie: 'Musik & Kultur' },
  { de: 'das Album', plural: 'Alben', id: 'album', beispiel: 'Sie hat ein neues Album.', kategorie: 'Musik & Kultur' },
  { de: 'der Sänger / die Sängerin', plural: '- / -nen', id: 'penyanyi', beispiel: 'Sie ist eine große Sängerin.', kategorie: 'Musik & Kultur' },
  { de: 'das Lied', plural: '-er', id: 'lagu', beispiel: 'Sie singt neue Lieder.', kategorie: 'Musik & Kultur' },
  { de: 'das Theater', plural: '-', id: 'teater', beispiel: 'Wir gehen ins Theater.', kategorie: 'Musik & Kultur' },
  { de: 'der Klassiker', plural: '-', id: 'karya klasik', beispiel: 'Ein bekannter Klassiker auf der Bühne.', kategorie: 'Musik & Kultur' },
  { de: 'das Thema', plural: 'Themen', id: 'tema', beispiel: 'Ein aktuelles Thema.', kategorie: 'Musik & Kultur' },
  { de: 'die Bühne', plural: '-n', id: 'panggung', beispiel: 'Die Schauspieler stehen auf der Bühne.', kategorie: 'Musik & Kultur' },
  { de: 'die Ausstellung', plural: '-en', id: 'pameran', beispiel: 'Die Ausstellung ist fantastisch.', kategorie: 'Musik & Kultur' },
  { de: 'die Sehenswürdigkeit', plural: '-en', id: 'objek wisata', beispiel: 'Wien hat viele Sehenswürdigkeiten.', kategorie: 'Musik & Kultur' },
  { de: 'der Tanz', plural: '"-e', id: 'tarian', beispiel: 'Der Tanz war schön.', kategorie: 'Musik & Kultur' },
  { de: 'das Publikum', plural: '', id: 'penonton', beispiel: 'Das Publikum applaudiert.', kategorie: 'Musik & Kultur' },

  // Freizeitangebote
  { de: 'das Angebot', plural: '-e', id: 'tawaran/penawaran', beispiel: 'Das Angebot ist gut.', kategorie: 'Freizeitangebote' },
  { de: 'das Abend-Programm', plural: '-e', id: 'program malam', beispiel: 'Was ist das Abend-Programm?', kategorie: 'Freizeitangebote' },
  { de: 'das Stadtprogramm', plural: '-e', id: 'program kota', beispiel: 'Wir lesen das Stadtprogramm.', kategorie: 'Freizeitangebote' },
  { de: 'das Café', plural: '-s', id: 'kafe', beispiel: 'Ein gemütliches Café.', kategorie: 'Freizeitangebote' },
  { de: 'die Kneipe', plural: '-n', id: 'bar/pub', beispiel: 'Er geht in eine Kneipe.', kategorie: 'Freizeitangebote' },
  { de: 'der Biergarten', plural: '"-', id: 'taman bir', beispiel: 'Wir treffen uns im Biergarten.', kategorie: 'Freizeitangebote' },
  { de: 'der Park', plural: '-s', id: 'taman', beispiel: 'Kennst du einen schönen Park?', kategorie: 'Freizeitangebote' },
  { de: 'das Studio', plural: '-s', id: 'studio', beispiel: 'Ein modernes Fitness-Studio.', kategorie: 'Freizeitangebote' },
  { de: 'der Trainer / die Trainerin', plural: '- / -nen', id: 'pelatih', beispiel: 'Professionelle Trainer arbeiten hier.', kategorie: 'Freizeitangebote' },
  { de: 'das Ticket', plural: '-s', id: 'tiket', beispiel: 'Ich brauche ein Ticket.', kategorie: 'Freizeitangebote' },
  { de: 'die Ermäßigung', plural: '-en', id: 'diskon/potongan', beispiel: 'Schüler bekommen eine Ermäßigung.', kategorie: 'Freizeitangebote' },
  { de: 'der Tagesgast', plural: '"-e', id: 'tamu harian', beispiel: 'Tagesgäste sind willkommen.', kategorie: 'Freizeitangebote' },
  { de: 'der Frühling', plural: '-e', id: 'musim semi', beispiel: 'Im Frühling ist Ostern.', kategorie: 'Zeit' },
  { de: 'der Feiertag', plural: '-e', id: 'hari libur', beispiel: 'Der 1. Mai ist ein Feiertag.', kategorie: 'Zeit' },

  // Umwelt & Natur
  { de: 'die Umwelt', plural: '', id: 'lingkungan', beispiel: 'Sie möchte etwas für die Umwelt tun.', kategorie: 'Umwelt' },
  { de: 'das Plastik', plural: '', id: 'plastik', beispiel: 'Sie verkauft Lebensmittel ohne Plastik.', kategorie: 'Umwelt' },
  { de: 'das Lebensmittel', plural: '-', id: 'bahan makanan', beispiel: 'Wir kaufen Lebensmittel.', kategorie: 'Umwelt' },
  { de: 'die Verpackung', plural: '-en', id: 'kemasan', beispiel: 'Wir leben ohne Verpackung.', kategorie: 'Umwelt' },

  // Bahnhof & Reise
  { de: 'die Geschäftsreise', plural: '-n', id: 'perjalanan dinas', beispiel: 'Er ist auf Geschäftsreise.', kategorie: 'Bahnhof & Reise' },
  { de: 'die Bahnhofshalle', plural: '-n', id: 'aula stasiun', beispiel: 'Die Bahnhofshalle ist groß.', kategorie: 'Bahnhof & Reise' },
  { de: 'die Bahn', plural: '-en', id: 'kereta api', beispiel: 'Wir fahren mit der Bahn.', kategorie: 'Bahnhof & Reise' },
  { de: 'die Fahrkarte', plural: '-n', id: 'tiket', beispiel: 'Ich brauche eine Fahrkarte nach Berlin.', kategorie: 'Bahnhof & Reise' },
  { de: 'der Fahrkartenschalter', plural: '-', id: 'loket tiket', beispiel: 'Der Fahrkartenschalter ist geschlossen.', kategorie: 'Bahnhof & Reise' },
  { de: 'der Schalter', plural: '-', id: 'loket', beispiel: 'Bitte warten Sie am Schalter.', kategorie: 'Bahnhof & Reise' },
  { de: 'der Fahrplan', plural: '"-e', id: 'jadwal', beispiel: 'Sie sieht auf den Fahrplan.', kategorie: 'Bahnhof & Reise' },
  { de: 'die Zugverbindung', plural: '-en', id: 'koneksi kereta', beispiel: 'Ich suche eine Zugverbindung.', kategorie: 'Bahnhof & Reise' },
  { de: 'die Durchsage', plural: '-n', id: 'pengumuman (suara)', beispiel: 'Achten Sie auf die Durchsage!', kategorie: 'Bahnhof & Reise' },
  { de: 'der Wagen', plural: '-', id: 'gerbong', beispiel: 'In welchem Wagen sitzen wir?', kategorie: 'Bahnhof & Reise' },
  { de: 'das Gleis', plural: '-e', id: 'peron/jalur', beispiel: 'Der Zug fährt von Gleis 3 ab.', kategorie: 'Bahnhof & Reise' },
  { de: 'der Bahnsteig', plural: '-e', id: 'peron', beispiel: 'Warten Sie am Bahnsteig.', kategorie: 'Bahnhof & Reise' },
  { de: 'der Automat', plural: '-en', id: 'mesin otomatis', beispiel: 'Sie kauft die Karte am Automaten.', kategorie: 'Bahnhof & Reise' },
  { de: 'der Stadtplan', plural: '"-e', id: 'peta kota', beispiel: 'Suchen Sie auf dem Stadtplan.', kategorie: 'Bahnhof & Reise' },
  { de: 'der Ausgang', plural: '"-e', id: 'pintu keluar', beispiel: 'Wo ist der Ausgang?', kategorie: 'Bahnhof & Reise' },
  { de: 'das Schild', plural: '-er', id: 'tanda/papan', beispiel: 'Folgen Sie den Schildern.', kategorie: 'Bahnhof & Reise' },
  { de: 'das Reisezentrum', plural: 'Reisezentren', id: 'pusat perjalanan', beispiel: 'Gehen Sie ins Reisezentrum.', kategorie: 'Bahnhof & Reise' },
  { de: 'die Hinfahrt', plural: '-en', id: 'perjalanan pergi', beispiel: 'Die Hinfahrt dauert zwei Stunden.', kategorie: 'Bahnhof & Reise' },
  { de: 'die Rückfahrt', plural: '-en', id: 'perjalanan pulang', beispiel: 'Wann ist die Rückfahrt?', kategorie: 'Bahnhof & Reise' },
  { de: 'die Hin- und Rückfahrt', plural: '-en', id: 'perjalanan pp', beispiel: 'Eine Fahrkarte für Hin- und Rückfahrt.', kategorie: 'Bahnhof & Reise' },
  { de: 'die Ankunft', plural: '"-e', id: 'kedatangan', beispiel: 'Die Ankunft ist um 15 Uhr.', kategorie: 'Bahnhof & Reise' },
  { de: 'die Abfahrt', plural: '-en', id: 'keberangkatan', beispiel: 'Die Abfahrt ist in zehn Minuten.', kategorie: 'Bahnhof & Reise' },
  { de: 'der Koffer', plural: '-', id: 'koper', beispiel: 'Er trägt den Koffer.', kategorie: 'Bahnhof & Reise' },
  { de: 'das Gepäck', plural: '', id: 'bagasi', beispiel: 'Wo ist mein Gepäck?', kategorie: 'Bahnhof & Reise' },
  { de: 'der Rucksack', plural: '"-e', id: 'ransel', beispiel: 'Er hat einen Rucksack.', kategorie: 'Bahnhof & Reise' },
  { de: 'der Fahrgast', plural: '"-e', id: 'penumpang', beispiel: 'Ein Fahrgast fragt nach dem Weg.', kategorie: 'Bahnhof & Reise' },
  { de: 'der Schaffner / die Schaffnerin', plural: '- / -nen', id: 'kondektur', beispiel: 'Der Schaffner kontrolliert die Karten.', kategorie: 'Bahnhof & Reise' },
  { de: 'der Sitzplatz', plural: '"-e', id: 'tempat duduk', beispiel: 'Ich möchte einen Sitzplatz reservieren.', kategorie: 'Bahnhof & Reise' },
  { de: 'der Gang', plural: '"-e', id: 'lorong', beispiel: 'Ich sitze lieber am Gang.', kategorie: 'Bahnhof & Reise' },
  { de: 'das Fenster', plural: '-', id: 'jendela', beispiel: 'Er sitzt am Fenster.', kategorie: 'Bahnhof & Reise' },
  { de: 'der Hauptbahnhof', plural: '"-e', id: 'stasiun utama', beispiel: 'Der Zug hält am Hauptbahnhof.', kategorie: 'Bahnhof & Reise' },
  { de: 'der Preis', plural: '-e', id: 'harga', beispiel: 'Der Preis ist günstig.', kategorie: 'Bahnhof & Reise' },

  // Verben
  { de: 'arbeiten', plural: '', id: 'bekerja', beispiel: 'Ich arbeite in einer Firma.', kategorie: 'Verben' },
  { de: 'kontrollieren', plural: '', id: 'mengontrol', beispiel: 'Sie kontrolliert andere.', kategorie: 'Verben' },
  { de: 'beraten', plural: '', id: 'memberi nasihat', beispiel: 'Er berät Kunden.', kategorie: 'Verben' },
  { de: 'korrigieren', plural: '', id: 'mengoreksi', beispiel: 'Tests korrigieren.', kategorie: 'Verben' },
  { de: 'klappen', plural: '', id: 'berjalan lancar', beispiel: 'Das hat gut geklappt.', kategorie: 'Verben' },
  { de: 'schiefgehen', plural: '', id: 'gagal', beispiel: 'Manchmal geht etwas schief.', kategorie: 'Verben' },
  { de: 'mithelfen', plural: '', id: 'ikut membantu', beispiel: 'Der Mann hilft im Geschäft mit.', kategorie: 'Verben' },
  { de: 'wechseln', plural: '', id: 'berganti', beispiel: 'Den Beruf wechseln.', kategorie: 'Verben' },
  { de: 'nutzen', plural: '', id: 'memanfaatkan', beispiel: 'Eine Chance nutzen.', kategorie: 'Verben' },
  { de: 'bereuen', plural: '', id: 'menyesal', beispiel: 'Ich bereue es nicht.', kategorie: 'Verben' },
  { de: 'mitnehmen', plural: '', id: 'membawa serta', beispiel: 'Ich habe keine Arbeit mitgenommen.', kategorie: 'Verben' },
  { de: 'kaufen', plural: '', id: 'membeli', beispiel: 'Eine Fahrkarte kaufen.', kategorie: 'Verben' },
  { de: 'warten', plural: '', id: 'menunggu', beispiel: 'Am Schalter warten.', kategorie: 'Verben' },
  { de: 'umsteigen', plural: '', id: 'berganti kereta', beispiel: 'Sie müssen in Hamburg umsteigen.', kategorie: 'Verben' },
  { de: 'ankommen', plural: '', id: 'tiba', beispiel: 'Wann kommen wir an?', kategorie: 'Verben' },
  { de: 'sitzen', plural: '', id: 'duduk', beispiel: 'Ich sitze am Fenster.', kategorie: 'Verben' },
  { de: 'anrufen', plural: '', id: 'menelepon (ke seseorang)', beispiel: 'Ruf mich später an.', kategorie: 'Verben' },
  { de: 'verbinden', plural: '', id: 'menyambungkan', beispiel: 'Können Sie mich verbinden?', kategorie: 'Verben' },
  { de: 'hinterlassen', plural: '', id: 'meninggalkan (pesan)', beispiel: 'Möchten Sie eine Nachricht hinterlassen?', kategorie: 'Verben' },
  { de: 'ausrichten', plural: '', id: 'menyampaikan pesan', beispiel: 'Soll ich etwas ausrichten?', kategorie: 'Verben' },
  { de: 'zurückrufen', plural: '', id: 'menelepon kembali', beispiel: 'Er soll mich zurückrufen.', kategorie: 'Verben' },
  { de: 'werden', plural: '', id: 'menjadi', beispiel: 'Sie wird arbeitslos.', kategorie: 'Verben' },

  // Adjektive & Adverbien
  { de: 'beruflich', plural: '', id: 'terkait pekerjaan', beispiel: 'Beruflich neu anfangen.', kategorie: 'Adjektive' },
  { de: 'komplett', plural: '', id: 'sepenuhnya', beispiel: 'Das ist komplett falsch.', kategorie: 'Adjektive' },
  { de: 'selbstständig', plural: '', id: 'mandiri/wiraswasta', beispiel: 'Sie ist jetzt selbstständig.', kategorie: 'Adjektive' },
  { de: 'erfolgreich', plural: '', id: 'sukses', beispiel: 'Er war sehr erfolgreich.', kategorie: 'Adjektive' },
  { de: 'finanziell', plural: '', id: 'finansial', beispiel: 'Das finanzielle Risiko.', kategorie: 'Adjektive' },
  { de: 'professionell', plural: '', id: 'profesional', beispiel: 'Eine professionelle Trainerin.', kategorie: 'Adjektive' },
  { de: 'fantastisch', plural: '', id: 'fantastis', beispiel: 'Das Konzert war fantastisch.', kategorie: 'Adjektive' },
  { de: 'komisch', plural: '', id: 'aneh', beispiel: 'Ich finde das komisch.', kategorie: 'Adjektive' },
  { de: 'unnötig', plural: '', id: 'nicht notwendig', beispiel: 'Das ist völlig unnötig.', kategorie: 'Adjektive' },
  { de: 'häufig', plural: '', id: 'sering', beispiel: 'Häufig den Job wechseln.', kategorie: 'Adjektive' },
  { de: 'möglich', plural: '', id: 'mungkin', beispiel: 'Ist das möglich?', kategorie: 'Adjektive' },
  { de: 'mobil', plural: '', id: 'mobile/fleksibel', beispiel: 'Viele arbeiten mobil.', kategorie: 'Adjektive' },
  { de: 'befristet', plural: '', id: 'terbatas waktu', beispiel: 'Ein befristeter Vertrag.', kategorie: 'Adjektive' },
  { de: 'fest', plural: '', id: 'tetap', beispiel: 'Ein fester Job.', kategorie: 'Adjektive' },
  { de: 'virtuell', plural: '', id: 'virtual', beispiel: 'Teams werden virtuell.', kategorie: 'Adjektive' },
  { de: 'erreichbar', plural: '', id: 'bisa dihubungi', beispiel: 'Ich bin immer erreichbar.', kategorie: 'Adjektive' },
  { de: 'lebenslang', plural: '', id: 'seumur hidup', beispiel: 'Lebenslanges Lernen.', kategorie: 'Adjektive' },
  { de: 'problemlos', plural: '', id: 'tanpa masalah', beispiel: 'Es klappt problemlos.', kategorie: 'Adjektive' },
  { de: 'schwanger', plural: '', id: 'hamil', beispiel: 'Tims Schwester ist schwanger.', kategorie: 'Adjektive' },
  { de: 'preiswert', plural: '', id: 'terjangkau', beispiel: 'Ein preiswertes Restaurant.', kategorie: 'Adjektive' },
  { de: 'gemütlich', plural: '', id: 'nyaman', beispiel: 'Ein gemütliches Café.', kategorie: 'Adjektive' },
  { de: 'bekannt', plural: '', id: 'terkenal', beispiel: 'Ein bekannter Klassiker.', kategorie: 'Adjektive' },
  { de: 'elegant', plural: '', id: 'elegan', beispiel: 'Ein elegantes Restaurant.', kategorie: 'Adjektive' },
  { de: 'aktuell', plural: '', id: 'aktual/terkini', beispiel: 'Ein aktuelles Thema.', kategorie: 'Adjektive' },
  { de: 'günstig', plural: '', id: 'murah', beispiel: 'Günstige Preise.', kategorie: 'Adjektive' },

  // Moderne Arbeitswelt
  { de: 'der Betrieb', plural: '-e', id: 'perusahaan', beispiel: 'Der Betrieb macht befristete Verträge.', kategorie: 'Moderne Arbeit' },
  { de: 'die Fabrik', plural: '-en', id: 'pabrik', beispiel: 'Roboter helfen in der Fabrik.', kategorie: 'Moderne Arbeit' },
  { de: 'die Maschine', plural: '-n', id: 'mesin', beispiel: 'Arbeiten mit Maschinen.', kategorie: 'Moderne Arbeit' },
  { de: 'der Roboter', plural: '-', id: 'robot', beispiel: 'Roboter helfen im Haushalt.', kategorie: 'Moderne Arbeit' },
  { de: 'die Digitalisierung', plural: '', id: 'digitalisasi', beispiel: 'Die Digitalisierung nimmt zu.', kategorie: 'Moderne Arbeit' },
  { de: 'die Kompetenz', plural: '-en', id: 'kompetensi', beispiel: 'Neue Kompetenzen sind wichtig.', kategorie: 'Moderne Arbeit' },
  { de: 'das Wissen', plural: '', id: 'pengetahuan', beispiel: 'Wissen wird schnell alt.', kategorie: 'Moderne Arbeit' },
  { de: 'die Zusammenarbeit', plural: '', id: 'kerja sama', beispiel: 'Internationale Zusammenarbeit.', kategorie: 'Moderne Arbeit' },
  { de: 'der Austausch', plural: '', id: 'pertukaran', beispiel: 'Der Austausch von Dateien.', kategorie: 'Moderne Arbeit' },
  { de: 'die Datei', plural: '-en', id: 'file', beispiel: 'Wir schicken Dateien über das Internet.', kategorie: 'Moderne Arbeit' },
  { de: 'die Videokonferenz', plural: '-en', id: 'konferensi video', beispiel: 'Wir haben oft Videokonferenzen.', kategorie: 'Moderne Arbeit' },
  { de: 'die Telefonkonferenz', plural: '-en', id: 'konferensi telepon', beispiel: 'Die Telefonkonferenz startet bald.', kategorie: 'Moderne Arbeit' },
  { de: 'der Arbeitsplatz', plural: '"-e', id: 'tempat kerja', beispiel: 'Feste Arbeitsplätze werden seltener.', kategorie: 'Moderne Arbeit' },
  { de: 'die Arbeitszeit', plural: '-en', id: 'jam kerja', beispiel: 'Keine festen Arbeitszeiten.', kategorie: 'Moderne Arbeit' },
  { de: 'der Vertrag', plural: '"-e', id: 'kontrak', beispiel: 'Ein befristeter Vertrag.', kategorie: 'Moderne Arbeit' },
  { de: 'das Grundeinkommen', plural: '-', id: 'pendapatan dasar', beispiel: 'Es gibt ein Grundeinkommen.', kategorie: 'Moderne Arbeit' },
  { de: 'die Kreativität', plural: '', id: 'kreativitas', beispiel: 'Mehr Zeit für Kreativität.', kategorie: 'Moderne Arbeit' },
  { de: 'der Kindergarten', plural: '"-', id: 'taman kanak-kanak', beispiel: 'Wir brauchen gute Kindergärten.', kategorie: 'Moderne Arbeit' },
  { de: 'die Hausarbeit', plural: '-en', id: 'pekerjaan rumah', beispiel: 'Roboter helfen bei der Hausarbeit.', kategorie: 'Moderne Arbeit' },
  { de: 'die Zukunft', plural: '', id: 'masa depan', beispiel: 'In Zukunft wird alles anders.', kategorie: 'Moderne Arbeit' },
];

const partizipZwei = [
  { infinitiv: 'sein', partizip: 'gewesen', hilfsverb: 'sein', id: 'berada/menjadi' },
  { infinitiv: 'korrigieren', partizip: 'korrigiert', hilfsverb: 'haben', id: 'mengoreksi' },
  { infinitiv: 'klappen', partizip: 'geklappt', hilfsverb: 'haben', id: 'berjalan lancar' },
  { infinitiv: 'schiefgehen', partizip: 'schiefgegangen', hilfsverb: 'sein', id: 'gagal' },
  { infinitiv: 'einhalten', partizip: 'eingehalten', hilfsverb: 'haben', id: 'menepati' },
  { infinitiv: 'kontrollieren', partizip: 'kontrolliert', hilfsverb: 'haben', id: 'mengontrol' },
  { infinitiv: 'beraten', partizip: 'beraten', hilfsverb: 'haben', id: 'memberi nasihat' },
  { infinitiv: 'umsteigen', partizip: 'umgestiegen', hilfsverb: 'sein', id: 'berganti kendaraan' },
  { infinitiv: 'ankommen', partizip: 'angekommen', hilfsverb: 'sein', id: 'tiba' },
  { infinitiv: 'bezahlen', partizip: 'bezahlt', hilfsverb: 'haben', id: 'membayar' },
  { infinitiv: 'recherchieren', partizip: 'recherchiert', hilfsverb: 'haben', id: 'mencari informasi' },
  { infinitiv: 'spielen', partizip: 'gespielt', hilfsverb: 'haben', id: 'bermain' },
  { infinitiv: 'erleben', partizip: 'erlebt', hilfsverb: 'haben', id: 'mengalami' },
  { infinitiv: 'reservieren', partizip: 'reserviert', hilfsverb: 'haben', id: 'memesan' },
  { infinitiv: 'entscheiden', partizip: 'entschieden', hilfsverb: 'haben', id: 'memutuskan' },
  { infinitiv: 'antworten', partizip: 'geantwortet', hilfsverb: 'haben', id: 'menjawab' },
  { infinitiv: 'empfehlen', partizip: 'empfohlen', hilfsverb: 'haben', id: 'merekomendasikan' },
  { infinitiv: 'kennen', partizip: 'gekannt', hilfsverb: 'haben', id: 'mengenal' },
  { infinitiv: 'bereuen', partizip: 'bereut', hilfsverb: 'haben', id: 'menyesal' },
  { infinitiv: 'tauschen', partizip: 'getauscht', hilfsverb: 'haben', id: 'menukar' },
  { infinitiv: 'lieben', partizip: 'geliebt', hilfsverb: 'haben', id: 'mencintai' },
  { infinitiv: 'brauchen', partizip: 'gebraucht', hilfsverb: 'haben', id: 'membutuhkan' },
  { infinitiv: 'benutzen', partizip: 'benutzt', hilfsverb: 'haben', id: 'menggunakan' },
  { infinitiv: 'stören', partizip: 'gestört', hilfsverb: 'haben', id: 'mengganggu' },
  { infinitiv: 'aufschreiben', partizip: 'aufgeschrieben', hilfsverb: 'haben', id: 'mencatat' },
  { infinitiv: 'notieren', partizip: 'notiert', hilfsverb: 'haben', id: 'mencatat' },
  { infinitiv: 'sagen', partizip: 'gesagt', hilfsverb: 'haben', id: 'mengatakan' },
  { infinitiv: 'verbinden', partizip: 'verbunden', hilfsverb: 'haben', id: 'menyambungkan' },
  { infinitiv: 'hinterlassen', partizip: 'hinterlassen', hilfsverb: 'haben', id: 'meninggalkan' },
  { infinitiv: 'ausrichten', partizip: 'ausgerichtet', hilfsverb: 'haben', id: 'menyampaikan pesan' },
  { infinitiv: 'zurückrufen', partizip: 'zurückgerufen', hilfsverb: 'haben', id: 'menelepon kembali' },
  { infinitiv: 'passen', partizip: 'gepasst', hilfsverb: 'haben', id: 'cocok' },
  { infinitiv: 'raten', partizip: 'geraten', hilfsverb: 'haben', id: 'menebak' },
  { infinitiv: 'singen', partizip: 'gesungen', hilfsverb: 'haben', id: 'bernyanyi' },
  { infinitiv: 'kochen', partizip: 'gekocht', hilfsverb: 'haben', id: 'memasak' },
  { infinitiv: 'stehen', partizip: 'gestanden', hilfsverb: 'haben', id: 'berdiri' },
  { infinitiv: 'lachen', partizip: 'gelacht', hilfsverb: 'haben', id: 'tertawa' },
  { infinitiv: 'gründen', partizip: 'gegründet', hilfsverb: 'haben', id: 'mendirikan' },
  { infinitiv: 'erklären', partizip: 'erklärt', hilfsverb: 'haben', id: 'menjelaskan' },
];

const grammatik = [
  {
    titel: 'Adjektive nach unbestimmtem Artikel',
    farbe: 'sky',
    erklaerung: 'Adjektive nach ein/eine/kein/mein bekommen im Nominativ und Akkusativ bestimmte Endungen.',
    tiefenErklaerung: 'Im Singular folgen kein- und mein-/dein- dem Muster des unbestimmten Artikels. Im Plural nach einem Artikelwort ist die Adjektivendung immer -en.',
    struktur: 'ein/eine/kein/mein + Adjektiv + Nomen',
    konjugationsTabelle: {
      headers: ['Kasus', 'Maskulin', 'Neutral', 'Feminin', 'Plural (mit kein)'],
      rows: [
        ['Nominativ', 'ein schöner', 'ein aktuelles', 'eine große', 'keine günstigen'],
        ['Akkusativ', 'einen schönen', 'ein aktuelles', 'eine große', 'keine günstigen'],
        ['Dativ', 'einem schönen', 'einem aktuellen', 'einer großen', 'keinen günstigen']
      ]
    },
    beispiele: [
      { satz: 'Das ist ein schönes Restaurant.', terjemahan: 'Itu adalah restoran yang indah.' },
      { satz: 'Wir waren in einem netten Hotel.', terjemahan: 'Kami menginap di hotel yang bagus.' },
      { satz: 'Das sind günstige Preise.', terjemahan: 'Itu adalah harga-harga yang terjangkau (tanpa artikel).' }
    ],
    falle: 'Perhatikan bahwa nach "keine" und "meine" im Plural, das Adjektiv immer auf "-en" endet.'
  },
  {
    titel: 'Das Verb: werden',
    farbe: 'emerald',
    erklaerung: 'Wird verwendet, um eine Veränderung des Zustands (menjadi) oder einen Prozess auszudrücken.',
    tiefenErklaerung: '"werden" kann von einem Nomen (Er wird Arzt), einem Adjektiv (Es wird kalt) oder dem Alter (Ich werde 30) gefolgt werden.',
    struktur: 'Subjekt + werden + [Nomen/Adjektiv/Alter]',
    konjugationsTabelle: {
      headers: ['Person', 'Präsens', 'Präteritum', 'Perfekt'],
      rows: [
        ['ich', 'werde', 'wurde', 'bin geworden'],
        ['du', 'wirst', 'wurdest', 'bist geworden'],
        ['er/es/sie', 'wird', 'wurde', 'ist geworden'],
        ['wir', 'werden', 'wurden', 'sind geworden'],
        ['ihr', 'werdet', 'wurdet', 'seid geworden'],
        ['sie/Sie', 'werden', 'wurden', 'sind geworden']
      ]
    },
    beispiele: [
      { satz: 'Er wird Fernfahrer.', terjemahan: 'Dia (akan) menjadi sopir truk.' },
      { satz: 'Das Wetter wird besser.', terjemahan: 'Cuacanya menjadi lebih baik.' },
      { satz: 'Sie ist arbeitslos geworden.', terjemahan: 'Dia telah menjadi pengangguran.' }
    ],
    falle: 'Achtung beim Perfekt! "werden" verwendet das Hilfsverb "sein" (ist geworden), NICHT "hat".'
  }
];

const goetheTasks = [
  {
    skill: 'Lesen (Teil 1)',
    icon: '📖',
    farbe: 'sky',
    tasks: [
      {
        typ: 'Informationssuche',
        beschreibung: 'Mencari informasi spesifik tentang tawaran Freizeit di teks pendek.',
        text: 'Fit plus: Ein modernes Studio mit günstigen Preisen. Auch Tagesgäste sind willkommen.',
        frage: 'Was ist "Fit plus"?',
        antwort: 'Ein modernes Fitness-Studio, das auch Tagesgäste akzeptiert.'
      }
    ]
  },
  {
    skill: 'Sprechen (Teil 1)',
    icon: '🗣️',
    farbe: 'emerald',
    tasks: [
      {
        typ: 'Dialog',
        beschreibung: 'Menyampaikan pesan melalui telepon di tempat kerja.',
        text: 'Thema: Telefonieren',
        frage: 'Was sagen Sie, wenn Sie eine Nachricht hinterlassen möchten?',
        antwort: 'Herr Jeschke ist nicht da. Kann er mich bitte zurückrufen?'
      }
    ]
  },
  {
    skill: 'Schreiben (Teil 2)',
    icon: '✍️',
    farbe: 'rose',
    tasks: [
      {
        typ: 'Kurzer Text',
        beschreibung: 'Menulis tentang pekerjaan impian.',
        text: 'Thema: Traumberuf',
        frage: 'Schreiben Sie über Ihren Traumberuf.',
        antwort: 'Ich wollte schon immer Tiertrainer werden. Ich liebe Tiere.'
      }
    ]
  }
];

const lernTipps = [
  {
    nummer: 1,
    titel: 'Fokus auf N-und M-Endungen',
    beschreibung: 'Latih telinga dan pelafalan Anda membedakan akhiran -m (einem) dan -n (einen), ini krusial di Dativ dan Akkusativ.',
    icon: '🎧',
    farbe: 'emerald',
    tag: 'AUSSPRACHE'
  },
  {
    nummer: 2,
    titel: 'Redemittel für Telefonate',
    beschreibung: 'Hafalkan beberapa kalimat standar seperti "Kann ich etwas ausrichten?" dan "Können Sie mich verbinden?". Ini sangat sering diuji.',
    icon: '📞',
    farbe: 'sky',
    tag: 'KOMMUNIKATION'
  },
  {
    nummer: 3,
    titel: 'werden in 3 Zeiten',
    beschreibung: 'Kuasai perubahan "werden" di Präsens (wird), Präteritum (wurde), dan Perfekt (ist geworden).',
    icon: '⏳',
    farbe: 'orange',
    tag: 'GRAMMATIK'
  }
];

// Reused Styling Constants
const lernTippStyles: Record<string, string> = {
  emerald: 'from-emerald-400 to-emerald-600',
  orange: 'from-orange-400 to-orange-600',
  indigo: 'from-indigo-400 to-indigo-600',
  sky: 'from-sky-400 to-sky-600',
  rose: 'from-rose-400 to-rose-600'
};

// ============================================================
// MAIN PAGE
// ============================================================

const miniQuiz = [
  { frage: 'Er _____ Arzt geworden.', options: ['hat', 'ist', 'wurde'], besteAntwort: 1 },
  { frage: 'Wir waren in einem _____ Hotel.', options: ['schöne', 'schönen', 'schöner'], besteAntwort: 1 },
  { frage: 'Ich sitze lieber am _____.', options: ['Gleis', 'Schalter', 'Gang'], besteAntwort: 2 },
];

export default function KapitelSechsPage() {
  return (
    <ChapterTemplate
      kapitelId="kapitel-6"
      kapitel={kapitel}
      wortschatz={wortschatz}
      partizipZwei={partizipZwei}
      grammatik={grammatik}
      goetheTasks={goetheTasks}
      lernTipps={lernTipps}
      miniQuiz={miniQuiz}
      LesenComponent={<LesenInteraktiv6 />}
      HorenComponent={<HorenInteraktiv6 />}
      SchreibenComponent={<UebungInteraktiv6 />}
      GrammatikInteraktivComponent={<GrammatikInteraktiv6 />}
      TestComponent={<KapitelTest6 />}
    />
  );
}
