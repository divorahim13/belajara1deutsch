'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import KapitelTest1 from './KapitelTest1';
import { LesenInteraktiv1 } from './LesenInteraktiv1';
import { HorenInteraktiv1 } from './HorenInteraktiv1';
import { UebungInteraktiv1 } from './UebungInteraktiv1';
import ProgressTracker, { MarkCompleteButton } from './ProgressTracker';
import { GrammatikInteraktiv1 } from './GrammatikInteraktiv1';
import ChapterTemplate from './components/ChapterTemplate';

// ============================================================
// DATA: Netzwerk Neu A2 – Kapitel 1: Und was machst du?
// ============================================================

const kapitel = {
  nummer: 1,
  titel: 'Und was machst du?',
  untertitel: 'Alltag, Vergangenes & Verabredungen',
  level: 'A2',
  goetheFokus: ['Lesen', 'Hören', 'Schreiben', 'Sprechen'],
};

const wortschatz: { de: string; plural?: string; id: string; beispiel: string; kategorie: string }[] = [
  // Sprachen
  { de: 'die Muttersprache', plural: '-n', id: 'bahasa ibu', beispiel: 'Ich habe zwei Muttersprachen.', kategorie: 'Sprachen' },
  { de: 'die Fremdsprache', plural: '-n', id: 'bahasa asing', beispiel: 'Er spricht drei Fremdsprachen.', kategorie: 'Sprachen' },
  { de: 'fließend', id: 'lancar / fasih', beispiel: 'Ich spreche Deutsch fließend.', kategorie: 'Sprachen' },
  { de: 'ein bisschen', id: 'sedikit', beispiel: 'Französisch spreche ich nur ein bisschen.', kategorie: 'Sprachen' },
  
  // Beruf & Studium
  { de: 'die Ausbildung', plural: '-en', id: 'pendidikan vokasi', beispiel: 'Nach der Schule habe ich eine Ausbildung gemacht.', kategorie: 'Beruf' },
  { de: 'abschließen', id: 'menyelesaikan / lulus', beispiel: 'Sie hat ihre Ausbildung abgeschlossen.', kategorie: 'Beruf' },
  { de: 'der Kollege / die Kollegin', plural: '-n / -nen', id: 'rekan kerja', beispiel: 'Ich habe nette Kollegen.', kategorie: 'Beruf' },
  { de: 'das Studium', plural: 'Studien', id: 'studi universitas', beispiel: 'Im Herbst habe ich mein Studium angefangen.', kategorie: 'Beruf' },
  { de: 'die Überstunde', plural: '-n', id: 'lembur', beispiel: 'Ich muss heute Überstunden machen.', kategorie: 'Beruf' },
  { de: 'der Krankenpfleger', plural: '-', id: 'perawat pria', beispiel: 'Er arbeitet als Krankenpfleger.', kategorie: 'Beruf' },
  { de: 'das Praktikum', plural: 'Praktika', id: 'magang', beispiel: 'Ich mache ein Praktikum.', kategorie: 'Beruf' },
  { de: 'jobben', id: 'bekerja paruh waktu', beispiel: 'Der Student jobbt am Wochenende.', kategorie: 'Beruf' },
  { de: 'die Ingenieurin', plural: '-nen', id: 'insinyur (wanita)', beispiel: 'Sie arbeitet als Ingenieurin.', kategorie: 'Beruf' },
  { de: 'der Elektriker', plural: '-', id: 'teknisi listrik', beispiel: 'Er ist Elektriker von Beruf.', kategorie: 'Beruf' },
  { de: 'die Firma', plural: 'Firmen', id: 'perusahaan', beispiel: 'Er arbeitet in einer Firma im Zentrum.', kategorie: 'Beruf' },
  { de: 'die Prüfung', plural: '-en', id: 'ujian', beispiel: 'Ich habe meine Prüfung gut gemacht.', kategorie: 'Beruf' },
  { de: 'die Note', plural: '-n', id: 'nilai / angka', beispiel: 'Ich habe eine gute Note bekommen.', kategorie: 'Beruf' },
  { de: 'der Augenoptiker', plural: '-', id: 'ahli kacamata', beispiel: 'Der Augenoptiker macht meine neue Brille.', kategorie: 'Beruf' },
  { de: 'der Bankkaufmann', plural: 'Bankkaufleute', id: 'pegawai bank', beispiel: 'Er arbeitet als Bankkaufmann.', kategorie: 'Beruf' },
  { de: 'der Rentner / die Rentnerin', plural: '- / -nen', id: 'pensiunan', beispiel: 'Meine Eltern sind schon Rentner.', kategorie: 'Beruf' },
  { de: 'die Präsentation', plural: '-en', id: 'presentasi', beispiel: 'Ich muss eine Präsentation vorbereiten.', kategorie: 'Beruf' },
  
  // Familie & Wohnen
  { de: 'heiraten', id: 'menikah', beispiel: 'Im August hat meine Schwester geheiratet.', kategorie: 'Familie & Wohnen' },
  { de: 'geschieden', id: 'bercerai', beispiel: 'Mein Bruder ist geschieden.', kategorie: 'Familie & Wohnen' },
  { de: 'die Hochzeit', plural: '-en', id: 'pernikahan', beispiel: 'Die Hochzeit war sehr romantisch.', kategorie: 'Familie & Wohnen' },
  { de: 'der/die Verwandte', plural: '-n', id: 'kerabat / sanak saudara', beispiel: 'Viele Verwandte sind gekommen.', kategorie: 'Familie & Wohnen' },
  { de: 'das Apartment', plural: '-s', id: 'apartemen', beispiel: 'Wir haben ein Apartment im Stadtzentrum.', kategorie: 'Familie & Wohnen' },
  { de: 'das Stadtzentrum', plural: '-zentren', id: 'pusat kota', beispiel: 'Das Apartment ist im Stadtzentrum.', kategorie: 'Familie & Wohnen' },
  { de: 'das Land', plural: 'Länder', id: 'pedesaan / negara', beispiel: 'Meine Eltern leben auf dem Land.', kategorie: 'Familie & Wohnen' },
  { de: 'renovieren', id: 'merenovasi', beispiel: 'Wir haben die Wohnung renoviert.', kategorie: 'Familie & Wohnen' },
  { de: 'umziehen', id: 'pindah rumah', beispiel: 'Ich bin letztes Jahr umgezogen.', kategorie: 'Familie & Wohnen' },
  { de: 'die Miete', plural: '-n', id: 'uang sewa', beispiel: 'Die Miete für das Apartment ist teuer.', kategorie: 'Familie & Wohnen' },
  { de: 'der Nachbar / die Nachbarin', plural: '-n / -nen', id: 'tetangga', beispiel: 'Mein Nachbar ist sehr nett.', kategorie: 'Familie & Wohnen' },
  { de: 'die Pension', plural: '-en', id: 'penginapan / losmen', beispiel: 'Wir haben in einer Pension geschlafen.', kategorie: 'Familie & Wohnen' },
  { de: 'mieten', id: 'menyewa', beispiel: 'Wir mieten eine kleine Wohnung.', kategorie: 'Familie & Wohnen' },
  { de: 'zusammenleben', id: 'tinggal bersama', beispiel: 'Wir leben seit drei Jahren zusammen.', kategorie: 'Familie & Wohnen' },
  { de: 'ziehen (nach)', id: 'pindah (ke)', beispiel: 'Sie will nach Berlin ziehen.', kategorie: 'Familie & Wohnen' },

  // Freizeit
  { de: 'reiten', id: 'berkuda', beispiel: 'Ich spiele Basketball und ich reite.', kategorie: 'Freizeit' },
  { de: 'das Pferd', plural: '-e', id: 'kuda', beispiel: 'Meine Eltern haben ein Pferd.', kategorie: 'Freizeit' },
  { de: 'das Fest', plural: '-e', id: 'pesta / perayaan', beispiel: 'Wir haben das Fest organisiert.', kategorie: 'Freizeit' },
  { de: 'der Verein', plural: '-e', id: 'klub / asosiasi', beispiel: 'Er spielt Fußball in einem Verein.', kategorie: 'Freizeit' },
  { de: 'das Kino', plural: '-s', id: 'bioskop', beispiel: 'Wollen wir zusammen ins Kino gehen?', kategorie: 'Freizeit' },
  { de: 'das Konzert', plural: '-e', id: 'konser', beispiel: 'Sie gehen zu einem Konzert.', kategorie: 'Freizeit' },
  { de: 'der Flohmarkt', plural: '"-e', id: 'pasar loak', beispiel: 'Am Sonntag gehe ich auf den Flohmarkt.', kategorie: 'Freizeit' },
  { de: 'wandern', id: 'mendaki / hiking', beispiel: 'Mein Hobby ist wandern in den Bergen.', kategorie: 'Freizeit' },
  { de: 'klettern', id: 'panjat tebing', beispiel: 'Er geht am Wochenende oft klettern.', kategorie: 'Freizeit' },
  { de: 'der See', plural: '-n', id: 'danau', beispiel: 'Wir haben viel Spaß am See.', kategorie: 'Freizeit' },
  { de: 'kochen', id: 'memasak', beispiel: 'Kochen ist mein Hobby.', kategorie: 'Freizeit' },
  { de: 'reisen', id: 'bepergian', beispiel: 'Ich reise gern in Asien.', kategorie: 'Freizeit' },
  { de: 'das Wochenende', plural: '-n', id: 'akhir pekan', beispiel: 'Am Wochenende mache ich Sport.', kategorie: 'Freizeit' },
  { de: 'fotografieren', id: 'memotret', beispiel: 'Sie haben oft die Stadt fotografiert.', kategorie: 'Freizeit' },
  { de: 'joggen', id: 'joging', beispiel: 'Ich mache diesen Sommer weiter mit Joggen.', kategorie: 'Freizeit' },
  { de: 'der Zug', plural: '"-e', id: 'kereta api', beispiel: 'Wir sind mit dem Zug gefahren.', kategorie: 'Freizeit' },
  { de: 'der Bus', plural: '-se', id: 'bus', beispiel: 'Ich fahre jeden Tag mit dem Bus.', kategorie: 'Freizeit' },
  { de: 'das Auto', plural: '-s', id: 'mobil', beispiel: 'Wir sind mit dem Auto gefahren.', kategorie: 'Freizeit' },
  { de: 'der Bahnhof', plural: '"-e', id: 'stasiun kereta', beispiel: 'Ich habe den Bahnhof nicht gefunden.', kategorie: 'Freizeit' },
  { de: 'fernsehen', id: 'menonton TV', beispiel: 'Am Abend sehe ich oft fern.', kategorie: 'Freizeit' },
  { de: 'feiern', id: 'merayakan', beispiel: 'Wir feiern im Garten.', kategorie: 'Freizeit' },
  { de: 'das Fahrrad', plural: '"-er', id: 'sepeda', beispiel: 'Jan kommt mit dem Fahrrad.', kategorie: 'Freizeit' },
  { de: 'der Urlaub', plural: '-e', id: 'liburan / cuti', beispiel: 'Ben war lange im Urlaub.', kategorie: 'Freizeit' },
  { de: 'schwimmen', id: 'berenang', beispiel: 'Gehen wir heute schwimmen?', kategorie: 'Freizeit' },
  { de: 'tanzen', id: 'menari / berdansa', beispiel: 'Danach gehen wir noch tanzen.', kategorie: 'Freizeit' },
  { de: 'das Schwimmbad', plural: '"-er', id: 'kolam renang', beispiel: 'Das Schwimmbad ist schon geschlossen.', kategorie: 'Freizeit' },
  { de: 'das Museum', plural: 'Museen', id: 'museum', beispiel: 'Ich gehe morgen ins Museum.', kategorie: 'Freizeit' },
  { de: 'die Radtour', plural: '-en', id: 'tur bersepeda', beispiel: 'Ich möchte eine Radtour machen.', kategorie: 'Freizeit' },
  { de: 'das Picknick', plural: '-s', id: 'piknik', beispiel: 'Wir können noch ein Picknick machen.', kategorie: 'Freizeit' },
  { de: 'einen Plan ändern', id: 'mengubah rencana', beispiel: 'Wir müssen unseren Plan ändern.', kategorie: 'Freizeit' },
  { de: 'teilnehmen', id: 'ikut serta', beispiel: 'Nimmst du an dem Kurs teil?', kategorie: 'Freizeit' },

  // Essen & Restaurant
  { de: 'die Speisekarte', plural: '-n', id: 'daftar menu', beispiel: 'Wir bestellen aus der Speisekarte.', kategorie: 'Essen' },
  { de: 'die Rechnung', plural: '-en', id: 'tagihan', beispiel: 'Die Rechnung, bitte!', kategorie: 'Essen' },
  { de: 'der Kellner / die Kellnerin', plural: '- / -nen', id: 'pelayan restoran', beispiel: 'Rufen Sie den Kellner!', kategorie: 'Essen' },
  { de: 'reservieren', id: 'memesan tempat', beispiel: 'Sie müssen rechtzeitig reservieren.', kategorie: 'Essen' },
  { de: 'die Reservierung', plural: '-en', id: 'reservasi', beispiel: 'Haben Sie eine Reservierung?', kategorie: 'Essen' },
  { de: 'schmecken', id: 'terasa / enak', beispiel: 'Das schmeckt sehr süß.', kategorie: 'Essen' },
  { de: 'das Besteck', plural: '-e', id: 'alat makan', beispiel: 'Kann ich bitte Besteck haben?', kategorie: 'Essen' },
  { de: 'lecker', id: 'enak', beispiel: 'Das sieht ja lecker aus!', kategorie: 'Essen' },
  { de: 'der Kuchen', plural: '-', id: 'kue', beispiel: 'Der Kuchen im Café Blume ist gut.', kategorie: 'Essen' },
  { de: 'der Salat', plural: '-e', id: 'salad', beispiel: 'Ja, vielleicht einen Salat.', kategorie: 'Essen' },
  { de: 'das Messer', plural: '-', id: 'pisau', beispiel: 'Ich brauche ein Messer, bitte.', kategorie: 'Essen' },
  { de: 'der Löffel', plural: '-', id: 'sendok', beispiel: 'Der Löffel liegt auf dem Tisch.', kategorie: 'Essen' },
  { de: 'das Glas', plural: '"-er', id: 'gelas', beispiel: 'Ich hätte gern ein Glas Wasser.', kategorie: 'Essen' },
  { de: 'der Teller', plural: '-', id: 'piring', beispiel: 'Der Teller ist heiß, Vorsicht!', kategorie: 'Essen' },
  { de: 'die Gabel', plural: '-n', id: 'garpu', beispiel: 'Hier fehlt eine Gabel.', kategorie: 'Essen' },
  { de: 'die Serviette', plural: '-n', id: 'serbet', beispiel: 'Darf ich noch eine Serviette haben?', kategorie: 'Essen' },
  { de: 'der Platz', plural: '"-e', id: 'tempat duduk', beispiel: 'Ein Kellner führt Sie zum Platz.', kategorie: 'Essen' },
  { de: 'auswählen', id: 'memilih', beispiel: 'Sie können aus dem Menü auswählen.', kategorie: 'Essen' },
  { de: 'salzig', id: 'asin', beispiel: 'Die Suppe ist zu salzig.', kategorie: 'Essen' },
  { de: 'süß', id: 'manis', beispiel: 'Der Kuchen schmeckt süß.', kategorie: 'Essen' },
  { de: 'bitter', id: 'pahit', beispiel: 'Dieser Kaffee schmeckt ziemlich bitter.', kategorie: 'Essen' },
  { de: 'scharf', id: 'pedas', beispiel: 'Das Essen ist mir zu scharf.', kategorie: 'Essen' },
  { de: 'sauer', id: 'asam', beispiel: 'Die Zitrone schmeckt total sauer.', kategorie: 'Essen' },
  { de: 'bezahlen', id: 'membayar', beispiel: 'Können wir bitte bezahlen?', kategorie: 'Essen' },

  // Kommunikation
  { de: 'vorschlagen', id: 'mengusulkan', beispiel: 'Darf ich etwas vorschlagen?', kategorie: 'Kommunikation' },
  { de: 'zusagen', id: 'menerima (undangan)', beispiel: 'Ich sage gern zu.', kategorie: 'Kommunikation' },
  { de: 'absagen', id: 'membatalkan (janji)', beispiel: 'Ich muss den Termin leider absagen.', kategorie: 'Kommunikation' },
  { de: 'einverstanden', id: 'setuju', beispiel: 'Gehen wir ins Kino? – Einverstanden!', kategorie: 'Kommunikation' },
  { de: 'schade', id: 'sayang sekali', beispiel: 'Schade, da geht es leider nicht.', kategorie: 'Kommunikation' },
  { de: 'die Lust', plural: '(no pl.)', id: 'keinginan (mood)', beispiel: 'Hast du auch Lust auf einen Kaffee?', kategorie: 'Kommunikation' },
  { de: 'erzählen', id: 'menceritakan', beispiel: 'Er hat mir die Geschichte erzählt.', kategorie: 'Kommunikation' },
  { de: 'verstehen', id: 'mengerti', beispiel: 'Ich verstehe das nicht ganz.', kategorie: 'Kommunikation' },
  { de: 'empfehlen', id: 'merekomendasikan', beispiel: 'Welches Restaurant können Sie empfehlen?', kategorie: 'Kommunikation' },
  { de: 'die Nachricht', plural: '-en', id: 'pesan / berita', beispiel: 'Ich habe deine Nachricht gelesen.', kategorie: 'Kommunikation' },
  { de: 'einladen', id: 'mengundang', beispiel: 'Lisa lädt ihre Freunde ein.', kategorie: 'Kommunikation' },
  { de: 'kennenlernen', id: 'berkenalan', beispiel: 'Sie möchte seine Freundin kennenlernen.', kategorie: 'Kommunikation' },
  { de: 'berichten', id: 'melaporkan', beispiel: 'Ich kann über Vergangenes berichten.', kategorie: 'Kommunikation' },
  { de: 'empfangen', id: 'menerima / menyambut', beispiel: 'Er empfängt die Gäste.', kategorie: 'Kommunikation' },
  { de: 'sich informieren', id: 'mencari info', beispiel: 'Ich muss mich darüber informieren.', kategorie: 'Kommunikation' },
  { de: 'zuhören', id: 'mendengarkan saksama', beispiel: 'Bitte hören Sie gut zu.', kategorie: 'Kommunikation' },
  { de: 'begründen', id: 'menjelaskan alasan', beispiel: 'Kannst du das begründen?', kategorie: 'Kommunikation' },
  { de: 'Mal sehen.', id: 'Kita lihat nanti.', beispiel: 'Kommst du morgen? – Mal sehen.', kategorie: 'Kommunikation' },
  { de: 'also', id: 'jadi', beispiel: 'Ich habe also zwei Muttersprachen.', kategorie: 'Kommunikation' },

  // Alltag
  { de: 'riechen', id: 'mencium bau', beispiel: 'Das riecht nach Äpfeln.', kategorie: 'Alltag' },
  { de: 'müde', id: 'lelah / ngantuk', beispiel: 'Ich arbeite nachts und bin oft müde.', kategorie: 'Alltag' },
  { de: 'fröhlich', id: 'ceria', beispiel: 'Sie ist ein sehr fröhlicher Mensch.', kategorie: 'Alltag' },
  { de: 'glücklich', id: 'bahagia', beispiel: 'Warum bist du so glücklich?', kategorie: 'Alltag' },
  { de: 'verboten', id: 'dilarang', beispiel: 'Telefonieren ist im Restaurant verboten.', kategorie: 'Alltag' },
  { de: 'geschlossen', id: 'tutup', beispiel: 'Das Schwimmbad ist schon geschlossen.', kategorie: 'Alltag' },
  { de: 'die Grippe', plural: '-n', id: 'flu', beispiel: 'Er hat leider die Grippe.', kategorie: 'Alltag' },
  { de: 'krank', id: 'sakit', beispiel: 'Sie ist heute leider krank.', kategorie: 'Alltag' },
  { de: 'der Termin', plural: '-e', id: 'janji temu', beispiel: 'Ich habe morgen einen Termin.', kategorie: 'Alltag' },
  { de: 'das Treffen', plural: '-', id: 'pertemuan', beispiel: 'Kommst du nicht zu dem Treffen?', kategorie: 'Alltag' },
  { de: 'mitbringen', id: 'membawa serta', beispiel: 'Ich bringe einen Salat mit.', kategorie: 'Alltag' },
  { de: 'vorbereiten', id: 'mempersiapkan', beispiel: 'Wir müssen das Treffen vorbereiten.', kategorie: 'Alltag' },
  { de: 'der Fuß', plural: '"-e', id: 'kaki', beispiel: 'Mein Fuß tut total weh.', kategorie: 'Alltag' },
  { de: 'wehtun', id: 'terasa sakit', beispiel: 'Der Fuß tut sehr weh.', kategorie: 'Alltag' },
  { de: 'regnen', id: 'hujan', beispiel: 'Es regnet stark.', kategorie: 'Alltag' },
  { de: 'zusammen', id: 'bersama', beispiel: 'Wir können zusammen gehen.', kategorie: 'Alltag' },
  { de: 'gemeinsam', id: 'bersama-sama', beispiel: 'Wir machen diese Arbeit gemeinsam.', kategorie: 'Alltag' },
  { de: 'losfahren', id: 'berangkat', beispiel: 'Wir wollen um 10 Uhr losfahren.', kategorie: 'Alltag' },
  { de: 'abholen', id: 'menjemput', beispiel: 'Ich hole dich am Bahnhof ab.', kategorie: 'Alltag' },
  { de: 'einkaufen', id: 'berbelanja', beispiel: 'Ich muss heute einkaufen.', kategorie: 'Alltag' },
  { de: 'Spaß machen', id: 'menyenangkan', beispiel: 'Die Arbeit macht mir Spaß.', kategorie: 'Alltag' },
  { de: 'suchen', id: 'mencari', beispiel: 'Ich suche eine neue Stelle.', kategorie: 'Alltag' },
  { de: 'diskutieren', id: 'berdiskusi', beispiel: 'Wir haben viel diskutiert.', kategorie: 'Alltag' },
  { de: 'das Problem', plural: '-e', id: 'masalah', beispiel: 'Das war gar kein Problem.', kategorie: 'Alltag' },
  { de: 'spannend', id: 'menegangkan / menarik', beispiel: 'Dieser Film ist sehr spannend.', kategorie: 'Alltag' },
  { de: 'teuer', id: 'mahal', beispiel: 'Die Pension war nicht so teuer.', kategorie: 'Alltag' },
  { de: 'die Sonne', plural: '-n', id: 'matahari', beispiel: 'Die Sonne scheint.', kategorie: 'Alltag' },
  { de: 'vorher', id: 'sebelumnya', beispiel: 'Vorher bin ich immer zu Fuß gegangen.', kategorie: 'Alltag' },
  { de: 'beginnen', id: 'mulai', beispiel: 'Der Film beginnt bald.', kategorie: 'Alltag' },
  { de: 'organisieren', id: 'mengatur', beispiel: 'Wir organisieren ein Fest.', kategorie: 'Alltag' },
  { de: 'sich anmelden', id: 'mendaftar', beispiel: 'Ich möchte mich anmelden.', kategorie: 'Alltag' },
  { de: 'der Aufenthalt', plural: '-e', id: 'masa tinggal', beispiel: 'Ich wünsche einen angenehmen Aufenthalt.', kategorie: 'Alltag' },
  { de: 'der Eingang', plural: '"-e', id: 'pintu masuk', beispiel: 'Wir treffen uns am Eingang.', kategorie: 'Alltag' },
  { de: 'spätestens', id: 'paling lambat', beispiel: 'Ich komme spätestens um drei Uhr.', kategorie: 'Alltag' },
  { de: 'aus sein', id: 'off / dimatikan', beispiel: 'Handys müssen aus sein.', kategorie: 'Alltag' },
  { de: 'fühlen', id: 'merasa(kan)', beispiel: 'Wie fühlst du dich heute?', kategorie: 'Alltag' },
  { de: 'der Gegenstand', plural: '"-e', id: 'benda / objek', beispiel: 'Was ist das für ein Gegenstand?', kategorie: 'Alltag' },
  { de: 'die Angst', plural: '"-e', id: 'rasa takut', beispiel: 'Ich habe Angst vor dem Examen.', kategorie: 'Alltag' },
  { de: 'das Handy', plural: '-s', id: 'HP / ponsel', beispiel: 'Mein Handy ist neu.', kategorie: 'Alltag' },
  { de: 'fast', id: 'hampir', beispiel: 'Ich bin fast fertig.', kategorie: 'Alltag' },
  
  // Neue Wörter (A2 Lektion 1)
  { de: 'geboren sein', id: 'lahir', beispiel: 'Ich bin 1990 geboren.', kategorie: 'Familie & Wohnen' },
  { de: 'romantisch', id: 'romantis', beispiel: 'Das Essen war sehr romantisch.', kategorie: 'Familie & Wohnen' },
  { de: 'beenden', id: 'mengakhiri / menyelesaikan', beispiel: 'Ich möchte meine Arbeit beenden.', kategorie: 'Beruf' },
  { de: 'die Arbeit', plural: '(Sg.)', id: 'pekerjaan', beispiel: 'Das war viel Arbeit.', kategorie: 'Beruf' },
  { de: 'Biologie', plural: '(Sg.)', id: 'biologi', beispiel: 'Ich studiere Biologie.', kategorie: 'Beruf' },
  { de: 'Mathematik', plural: '(Sg.)', id: 'matematika', beispiel: 'Mathematik ist schwer.', kategorie: 'Beruf' },
  { de: 'auf dem Land leben', id: 'tinggal di desa', beispiel: 'Meine Eltern leben auf dem Land.', kategorie: 'Familie & Wohnen' },
  { de: 'weitersuchen', id: 'terus mencari', beispiel: 'Wir müssen eine Wohnung weitersuchen.', kategorie: 'Familie & Wohnen' },
  { de: 'liegen', id: 'berbaring / terletak', beispiel: 'Er liegt am Wochenende gern auf dem Sofa.', kategorie: 'Freizeit' },
  { de: 'das WC', plural: '-s', id: 'toilet / WC', beispiel: 'Wo ist bitte das WC?', kategorie: 'Essen' },
  { de: 'weiterhelfen', id: 'membantu (lanjut)', beispiel: 'Der Mitarbeiter hat uns weitergeholfen.', kategorie: 'Alltag' },
  { de: 'die Zigarette', plural: '-n', id: 'rokok', beispiel: 'Hast du eine Zigarette?', kategorie: 'Alltag' },
  { de: 'der Sinn', plural: '-e', id: 'indera / makna', beispiel: 'Mit allen Sinnen lernen.', kategorie: 'Alltag' },
  { de: 'rufen', id: 'memanggil / berseru', beispiel: 'Er ruft seinen Hund.', kategorie: 'Kommunikation' },
  { de: 'ganz', id: 'sangat / utuh', beispiel: 'Das steht ganz am Ende.', kategorie: 'Alltag' },
  { de: 'weil', id: 'karena', beispiel: 'Marvin kommt später, weil er arbeiten muss.', kategorie: 'Kommunikation' }
];

const partizipZwei: { infinitiv: string; partizip: string; hilfsverb: 'haben' | 'sein'; id: string; beispiel?: string; praesens?: [string, string, string, string, string, string] }[] = [
  { infinitiv: 'machen', partizip: 'gemacht', hilfsverb: 'haben', id: 'membuat', beispiel: 'Ich habe gestern eine Pizza gemacht.', praesens: ['mache', 'machst', 'macht', 'machen', 'macht', 'machen'] },
  { infinitiv: 'gehen', partizip: 'gegangen', hilfsverb: 'sein', id: 'pergi (jalan)', beispiel: 'Wir sind in den Park gegangen.', praesens: ['gehe', 'gehst', 'geht', 'gehen', 'geht', 'gehen'] },
  { infinitiv: 'fahren', partizip: 'gefahren', hilfsverb: 'sein', id: 'berkendara', beispiel: 'Sie ist nach Berlin gefahren.', praesens: ['fahre', 'fährst', 'fährt', 'fahren', 'fahrt', 'fahren'] },
  { infinitiv: 'essen', partizip: 'gegessen', hilfsverb: 'haben', id: 'makan', beispiel: 'Hast du schon gegessen?', praesens: ['esse', 'isst', 'isst', 'essen', 'esst', 'essen'] },
  { infinitiv: 'trinken', partizip: 'getrunken', hilfsverb: 'haben', id: 'minum', beispiel: 'Er hat viel Wasser getrunken.', praesens: ['trinke', 'trinkst', 'trinkt', 'trinken', 'trinkt', 'trinken'] },
  { infinitiv: 'kommen', partizip: 'gekommen', hilfsverb: 'sein', id: 'datang', beispiel: 'Wann bist du nach Hause gekommen?', praesens: ['komme', 'kommst', 'kommt', 'kommen', 'kommt', 'kommen'] },
  { infinitiv: 'bleiben', partizip: 'geblieben', hilfsverb: 'sein', id: 'tinggal', beispiel: 'Ich bin das ganze Wochenende zu Hause geblieben.', praesens: ['bleibe', 'bleibst', 'bleibt', 'bleiben', 'bleibt', 'bleiben'] },
  { infinitiv: 'sehen', partizip: 'gesehen', hilfsverb: 'haben', id: 'melihat', beispiel: 'Ich habe diesen Film schon gesehen.', praesens: ['sehe', 'siehst', 'sieht', 'sehen', 'seht', 'sehen'] },
  { infinitiv: 'hören', partizip: 'gehört', hilfsverb: 'haben', id: 'mendengar', beispiel: 'Hast du das gehört?', praesens: ['höre', 'hörst', 'hört', 'hören', 'hört', 'hören'] },
  { infinitiv: 'schreiben', partizip: 'geschrieben', hilfsverb: 'haben', id: 'menulis', beispiel: 'Sie hat mir eine E-Mail geschrieben.', praesens: ['schreibe', 'schreibst', 'schreibt', 'schreiben', 'schreibt', 'schreiben'] },
  { infinitiv: 'lesen', partizip: 'gelesen', hilfsverb: 'haben', id: 'membaca', beispiel: 'Er hat ein spannendes Buch gelesen.', praesens: ['lese', 'liest', 'liest', 'lesen', 'lest', 'lesen'] },
  { infinitiv: 'schlafen', partizip: 'geschlafen', hilfsverb: 'haben', id: 'tidur', beispiel: 'Ich habe sehr gut geschlafen.', praesens: ['schlafe', 'schläfst', 'schläft', 'schlafen', 'schlaft', 'schlafen'] },
  { infinitiv: 'finden', partizip: 'gefunden', hilfsverb: 'haben', id: 'menemukan', beispiel: 'Wir haben den Schlüssel gefunden.', praesens: ['finde', 'findest', 'findet', 'finden', 'findet', 'finden'] },
  { infinitiv: 'verstehen', partizip: 'verstanden', hilfsverb: 'haben', id: 'mengerti', beispiel: 'Ich habe die Frage nicht verstanden.', praesens: ['verstehe', 'verstehst', 'versteht', 'verstehen', 'versteht', 'verstehen'] },
  { infinitiv: 'beginnen', partizip: 'begonnen', hilfsverb: 'haben', id: 'mulai', beispiel: 'Der Kurs hat gestern begonnen.', praesens: ['beginne', 'beginnst', 'beginnt', 'beginnen', 'beginnt', 'beginnen'] },
  { infinitiv: 'fliegen', partizip: 'geflogen', hilfsverb: 'sein', id: 'terbang', beispiel: 'Wir sind nach Spanien geflogen.', praesens: ['fliege', 'fliegst', 'fliegt', 'fliegen', 'fliegt', 'fliegen'] },
  { infinitiv: 'schwimmen', partizip: 'geschwommen', hilfsverb: 'sein', id: 'berenang', beispiel: 'Sie ist eine Stunde lang geschwommen.', praesens: ['schwimme', 'schwimmst', 'schwimmt', 'schwimmen', 'schwimmt', 'schwimmen'] },
  { infinitiv: 'treffen', partizip: 'getroffen', hilfsverb: 'haben', id: 'bertemu', beispiel: 'Ich habe alte Freunde getroffen.', praesens: ['treffe', 'triffst', 'trifft', 'treffen', 'trefft', 'treffen'] },
  { infinitiv: 'nehmen', partizip: 'genommen', hilfsverb: 'haben', id: 'mengambil', beispiel: 'Er hat das Geld genommen.', praesens: ['nehme', 'nimmst', 'nimmt', 'nehmen', 'nehmt', 'nehmen'] },
  { infinitiv: 'bringen', partizip: 'gebracht', hilfsverb: 'haben', id: 'membawa', beispiel: 'Hast du den Wein mitgebracht?', praesens: ['bringe', 'bringst', 'bringt', 'bringen', 'bringt', 'bringen'] },
  { infinitiv: 'denken', partizip: 'gedacht', hilfsverb: 'haben', id: 'berpikir', beispiel: 'Das habe ich mir gedacht.', praesens: ['denke', 'denkst', 'denkt', 'denken', 'denkt', 'denken'] },
  { infinitiv: 'wissen', partizip: 'gewusst', hilfsverb: 'haben', id: 'tahu', beispiel: 'Das habe ich nicht gewusst!', praesens: ['weiß', 'weißt', 'weiß', 'wissen', 'wisst', 'wissen'] },
  { infinitiv: 'lernen', partizip: 'gelernt', hilfsverb: 'haben', id: 'belajar', beispiel: 'Wir haben viel Deutsch gelernt.', praesens: ['lerne', 'lernst', 'lernt', 'lernen', 'lernt', 'lernen'] },
  { infinitiv: 'arbeiten', partizip: 'gearbeitet', hilfsverb: 'haben', id: 'bekerja', beispiel: 'Sie hat am Wochenende gearbeitet.', praesens: ['arbeite', 'arbeitest', 'arbeitet', 'arbeiten', 'arbeitet', 'arbeiten'] },
  { infinitiv: 'studieren', partizip: 'studiert', hilfsverb: 'haben', id: 'studi', beispiel: 'Er hat in München studiert.', praesens: ['studiere', 'studierst', 'studiert', 'studieren', 'studiert', 'studieren'] },
  { infinitiv: 'telefonieren', partizip: 'telefoniert', hilfsverb: 'haben', id: 'telepon', beispiel: 'Ich habe mit meiner Mutter telefoniert.', praesens: ['telefoniere', 'telefonierst', 'telefoniert', 'telefonieren', 'telefoniert', 'telefonieren'] },
  { infinitiv: 'organisieren', partizip: 'organisiert', hilfsverb: 'haben', id: 'mengatur', beispiel: 'Wir haben ein Fest organisiert.', praesens: ['organisiere', 'organisierst', 'organisiert', 'organisieren', 'organisiert', 'organisieren'] },
  { infinitiv: 'passieren', partizip: 'passiert', hilfsverb: 'sein', id: 'terjadi', beispiel: 'Was ist gestern passiert?', praesens: ['passiere', 'passierst', 'passiert', 'passieren', 'passiert', 'passieren'] },
  { infinitiv: 'besuchen', partizip: 'besucht', hilfsverb: 'haben', id: 'mengunjungi', beispiel: 'Ich habe meine Oma besucht.', praesens: ['besuche', 'besuchst', 'besucht', 'besuchen', 'besucht', 'besuchen'] },
  { infinitiv: 'anrufen', partizip: 'angerufen', hilfsverb: 'haben', id: 'menelepon', beispiel: 'Er hat mich gestern angerufen.', praesens: ['rufe an', 'rufst an', 'ruft an', 'rufen an', 'ruft an', 'rufen an'] },
  { infinitiv: 'liegen', partizip: 'gelegen', hilfsverb: 'haben', id: 'berbaring / terletak', beispiel: 'Das Buch hat auf dem Tisch gelegen.', praesens: ['liege', 'liegst', 'liegt', 'liegen', 'liegt', 'liegen'] },
  { infinitiv: 'reiten', partizip: 'geritten', hilfsverb: 'sein', id: 'berkuda', beispiel: 'Wir sind im Wald geritten.', praesens: ['reite', 'reitest', 'reitet', 'reiten', 'reitet', 'reiten'] },
  { infinitiv: 'anmelden', partizip: 'angemeldet', hilfsverb: 'haben', id: 'mendaftar', beispiel: 'Ich habe mich für den Kurs angemeldet.', praesens: ['melde an', 'meldest an', 'meldet an', 'melden an', 'meldet an', 'melden an'] },
  { infinitiv: 'beenden', partizip: 'beendet', hilfsverb: 'haben', id: 'mengakhiri / menyelesaikan', beispiel: 'Er hat das Projekt beendet.', praesens: ['beende', 'beendest', 'beendet', 'beenden', 'beendet', 'beenden'] },
  { infinitiv: 'heiraten', partizip: 'geheiratet', hilfsverb: 'haben', id: 'menikah', beispiel: 'Sie haben im Sommer geheiratet.', praesens: ['heirate', 'heiratest', 'heiratet', 'heiraten', 'heiratet', 'heiraten'] },
  { infinitiv: 'mieten', partizip: 'gemietet', hilfsverb: 'haben', id: 'menyewa', beispiel: 'Wir haben ein Auto gemietet.', praesens: ['miete', 'mietest', 'mietet', 'mieten', 'mietet', 'mieten'] },
  { infinitiv: 'teilnehmen', partizip: 'teilgenommen', hilfsverb: 'haben', id: 'ikut serta', beispiel: 'Er hat an dem Meeting teilgenommen.', praesens: ['nehme teil', 'nimmst teil', 'nimmt teil', 'nehmen teil', 'nehmt teil', 'nehmen teil'] },
  { infinitiv: 'abschließen', partizip: 'abgeschlossen', hilfsverb: 'haben', id: 'menyelesaikan (studi/lulus)', beispiel: 'Sie hat ihr Studium abgeschlossen.', praesens: ['schließe ab', 'schließt ab', 'schließt ab', 'schließen ab', 'schließt ab', 'schließen ab'] },
  { infinitiv: 'vorschlagen', partizip: 'vorgeschlagen', hilfsverb: 'haben', id: 'mengusulkan', beispiel: 'Er hat eine Idee vorgeschlagen.', praesens: ['schlage vor', 'schlägst vor', 'schlägt vor', 'schlagen vor', 'schlagt vor', 'schlagen vor'] },
  { infinitiv: 'umziehen', partizip: 'umgezogen', hilfsverb: 'sein', id: 'pindah rumah', beispiel: 'Wir sind nach München umgezogen.', praesens: ['ziehe um', 'ziehst um', 'zieht um', 'ziehen um', 'zieht um', 'ziehen um'] },
  { infinitiv: 'helfen', partizip: 'geholfen', hilfsverb: 'haben', id: 'membantu', beispiel: 'Er hat mir sehr geholfen.', praesens: ['helfe', 'hilfst', 'hilft', 'helfen', 'helft', 'helfen'] },
  { infinitiv: 'anfangen', partizip: 'angefangen', hilfsverb: 'haben', id: 'memulai', beispiel: 'Der Film hat schon angefangen.', praesens: ['fange an', 'fängst an', 'fängt an', 'fangen an', 'fangt an', 'fangen an'] },
  { infinitiv: 'bekommen', partizip: 'bekommen', hilfsverb: 'haben', id: 'mendapat', beispiel: 'Ich habe ein Geschenk bekommen.', praesens: ['bekomme', 'bekommst', 'bekommt', 'bekommen', 'bekommt', 'bekommen'] },
  { infinitiv: 'einladen', partizip: 'eingeladen', hilfsverb: 'haben', id: 'mengundang', beispiel: 'Sie hat alle Freunde eingeladen.', praesens: ['lade ein', 'lädst ein', 'lädt ein', 'laden ein', 'ladet ein', 'laden ein'] },
  { infinitiv: 'mitnehmen', partizip: 'mitgenommen', hilfsverb: 'haben', id: 'membawa serta', beispiel: 'Er hat seinen Regenschirm mitgenommen.', praesens: ['nehme mit', 'nimmst mit', 'nimmt mit', 'nehmen mit', 'nehmt mit', 'nehmen mit'] },
  { infinitiv: 'vorbereiten', partizip: 'vorbereitet', hilfsverb: 'haben', id: 'mempersiapkan', beispiel: 'Wir haben alles für die Party vorbereitet.', praesens: ['bereite vor', 'bereitest vor', 'bereitet vor', 'bereiten vor', 'bereitet vor', 'bereiten vor'] },
  { infinitiv: 'aussehen', partizip: 'ausgesehen', hilfsverb: 'haben', id: 'kelihatan (rupa)', beispiel: 'Du hast gestern sehr müde ausgesehen.', praesens: ['sehe aus', 'siehst aus', 'sieht aus', 'sehen aus', 'seht aus', 'sehen aus'] },
  { infinitiv: 'vergessen', partizip: 'vergessen', hilfsverb: 'haben', id: 'lupa', beispiel: 'Ich habe meinen Schlüssel vergessen.', praesens: ['vergesse', 'vergisst', 'vergisst', 'vergessen', 'vergesst', 'vergessen'] },
  { infinitiv: 'verlieren', partizip: 'verloren', hilfsverb: 'haben', id: 'kalah / kehilangan', beispiel: 'Wir haben das Spiel verloren.', praesens: ['verliere', 'verlierst', 'verliert', 'verlieren', 'verliert', 'verlieren'] },
  { infinitiv: 'gewinnen', partizip: 'gewonnen', hilfsverb: 'haben', id: 'menang', beispiel: 'Sie hat im Lotto gewonnen.', praesens: ['gewinne', 'gewinnst', 'gewinnt', 'gewinnen', 'gewinnt', 'gewinnen'] },
  { infinitiv: 'reparieren', partizip: 'repariert', hilfsverb: 'haben', id: 'memperbaiki', beispiel: 'Mein Vater hat das Fahrrad repariert.', praesens: ['repariere', 'reparierst', 'repariert', 'reparieren', 'repariert', 'reparieren'] },
  { infinitiv: 'probieren', partizip: 'probiert', hilfsverb: 'haben', id: 'mencoba (makanan/baju)', beispiel: 'Hast du den Kuchen probiert?', praesens: ['probiere', 'probierst', 'probiert', 'probieren', 'probiert', 'probieren'] },
  { infinitiv: 'wandern', partizip: 'gewandert', hilfsverb: 'sein', id: 'mendaki / hiking', beispiel: 'Wir sind in den Bergen gewandert.', praesens: ['wandere', 'wanderst', 'wandert', 'wandern', 'wandert', 'wandern'] },
  { infinitiv: 'laufen', partizip: 'gelaufen', hilfsverb: 'sein', id: 'berlari', beispiel: 'Er ist sehr schnell gelaufen.', praesens: ['laufe', 'läufst', 'läuft', 'laufen', 'lauft', 'laufen'] }
];

const grammatik = [
  {
    name: 'Das Perfekt (Masa Lalu Percakapan)',
    farbe: 'indigo',
    erklärung: 'Waktu lampau yang paling sering digunakan dalam percakapan lisan bahasa Jerman. Dibentuk dengan auxiliary verb (kata kerja bantu) "haben" atau "sein" ditambah Partizip II.',
    tiefenErklaerung: 'Mengapa ada "haben" dan "sein"? Secara linguistik, "sein" (to be) digunakan khusus untuk kata kerja tak transitif (intransitive) yang menunjukkan dua hal: (1) Ortswechsel (Perpindahan lokasi dari titik A ke titik B, misal: gehen, fahren, fliegen) atau (2) Zustandsänderung (Perubahan wujud/kondisi, misal: aufwachen/bangun, sterben/mati). Sedangkan "haben" digunakan untuk kata kerja transitif (yang bisa memiliki objek penderita) dan semua kata kerja yang tidak menunjukkan perpindahan lokasi atau wujud secara drastis (misal: schlafen, arbeiten, lesen). Awalan "ge-" pada Partizip II merupakan penanda gramatikal kuno Germanic yang berarti penyelesaian sebuah aksi (completed action).',
    struktur: 'Subjekt + haben/sein (dikonjugasi) ... + [Partizip II di akhir kalimat]',
    konjugationsTabelle: {
      headers: ['Pronomen', 'haben (Transitiv)', 'sein (Ortswechsel/Zustand)'],
      rows: [
        ['ich', 'habe ... gemacht', 'bin ... gegangen'],
        ['du', 'hast ... gemacht', 'bist ... gegangen'],
        ['er/sie/es', 'hat ... gemacht', 'ist ... gegangen'],
        ['wir', 'haben ... gemacht', 'sind ... gegangen'],
        ['ihr', 'habt ... gemacht', 'seid ... gegangen'],
        ['sie/Sie', 'haben ... gemacht', 'sind ... gegangen'],
      ]
    },
    beispiele: [
      { satz: 'Ich habe meine Ausbildung beendet.', terjemahan: 'Saya telah menyelesaikan pendidikan vokasi. (Menggunakan "haben" karena ada objek penderita "meine Ausbildung")' },
      { satz: 'Julia ist nach Berlin gereist.', terjemahan: 'Julia telah bepergian ke Berlin. (Menggunakan "sein" karena "reisen" menunjukkan perpindahan lokasi - Ortswechsel)' },
      { satz: 'Wir haben ein Fest organisiert.', terjemahan: 'Kami telah mengatur pesta. (Catatan: Kata kerja dengan akhiran asing "-ieren" seperti "organisieren" atau "studieren" TIDAK menggunakan awalan "ge-")' },
    ],
    mehrBeispiele: [
      { satz: 'Hast du das Buch gelesen?', terjemahan: 'Apakah kamu sudah membaca buku itu? (lesen -> gelesen, butuh haben)' },
      { satz: 'Wann seid ihr gestern angekommen?', terjemahan: 'Kapan kalian tiba kemarin? (ankommen -> angekommen, Ortswechsel, butuh sein)' },
      { satz: 'Ich habe den ganzen Tag geschlafen.', terjemahan: 'Saya sudah tidur sepanjang hari. (schlafen -> geschlafen, tidak ada perpindahan, butuh haben)' },
      { satz: 'Sie ist am Wochenende geschwommen.', terjemahan: 'Dia berenang pada akhir pekan. (schwimmen -> geschwommen, pergerakan, butuh sein)' }
    ],
    falle: 'Kata kerja berakhiran -ieren TIDAK pakai "ge-". Contoh: passiert ✓ — gepassiert ✗. Verba gerakan pakai "sein": gehen → gegangen. Jangan sampai menggunakan "haben" untuk verba pergerakan (Ich habe gegangen ✗).',
  },
  {
    name: 'Nebensatz mit "weil" (Anak Kalimat Alasan)',
    farbe: 'violet',
    erklärung: 'Kalimat majemuk bertingkat yang menyatakan alasan/sebab. Konjungsi "weil" mengubah struktur kalimat sehingga kata kerja berpindah ke posisi paling belakang.',
    tiefenErklaerung: 'Bahasa Jerman memiliki aturan V2 (Verb-second) untuk kalimat utama (Hauptsatz), di mana kata kerja selalu di posisi kedua. Namun, ketika menggunakan konjungsi subordinatif (unterordnende Konjunktion) seperti "weil", "dass", atau "wenn", kalimat tersebut menjadi anak kalimat (Nebensatz). Nebensatz tidak bisa berdiri sendiri secara semantik. Dalam Nebensatz, hukum V-End (Verb-final) berlaku secara mutlak: semua kata kerja yang dikonjugasikan dilempar ke ujung kalimat. Jika ada modal verb (misal: muss, kann), maka modal verb tersebut yang berada paling mentok di belakang.',
    struktur: 'Hauptsatz + , weil + Subjekt + Informasi Lain + [Verb dikonjugasi]',
    konjugationsTabelle: {
      headers: ['Hauptsatz', 'Konjunktion', 'Subjekt', 'Objekt / Adverb', 'Verb (am Ende)'],
      rows: [
        ['Ich bleibe zu Hause', ', weil', 'ich', 'krank', 'bin.'],
        ['Er lernt Deutsch', ', weil', 'er', 'in Berlin', 'arbeitet.'],
        ['Wir gehen nicht ins Kino', ', weil', 'wir', 'keine Zeit', 'haben.'],
        ['Sie ist müde', ', weil', 'sie', 'lange', 'gearbeitet hat. (Perfekt)'],
      ]
    },
    beispiele: [
      { satz: 'Ben schreibt den Freunden, weil er sie einladen will.', terjemahan: 'Ben menulis ke teman-temannya karena dia ingin mengundang mereka. (Perhatikan "will" berada setelah infinitive "einladen" di paling ujung)' },
      { satz: 'Marvin kommt später, weil er heute arbeiten muss.', terjemahan: 'Marvin datang terlambat karena dia hari ini harus bekerja.' },
      { satz: 'Lea kann nicht kommen, weil sie krank ist.', terjemahan: 'Lea tidak bisa datang karena dia sakit. (Verb "ist" ada di akhir)' },
    ],
    mehrBeispiele: [
      { satz: 'Ich esse einen Apfel, weil ich Hunger habe.', terjemahan: 'Saya makan apel karena saya lapar.' },
      { satz: 'Wir lernen viel, weil wir die Prüfung bestehen wollen.', terjemahan: 'Kami belajar banyak karena kami ingin lulus ujian.' },
      { satz: 'Er trinkt Kaffee, weil er müde ist.', terjemahan: 'Dia minum kopi karena dia lelah.' }
    ],
    falle: 'Sangat sering keliru menggunakan struktur bahasa Indonesia atau Inggris! ✗ SALAH: "...weil er muss arbeiten." ✓ BENAR: "...weil er arbeiten muss." Verba utama/konjugasi HARUS di akhir.',
  },
  {
    name: 'Genitiv bei Eigennamen (Kepemilikan Nama)',
    farbe: 'blue',
    erklärung: 'Cara paling elegan dalam bahasa Jerman untuk menyatakan benda milik seseorang, menempelkan -s di belakang nama orang.',
    tiefenErklaerung: 'Genitiv adalah salah satu dari 4 kasus gramatikal Jerman. Kasus ini digunakan untuk menunjukkan asal atau kepemilikan (Possession). Berbeda dengan bahasa Inggris yang menggunakan apostrof (John\'s car), bahasa Jerman klasik TIDAK menggunakan apostrof (Johns Auto). Apostrof di bahasa Jerman hanya digunakan jika nama orang tersebut sudah berakhiran dengan bunyi desis (s, z, x, ß) untuk menghindari pengulangan konsonan (misal: Max\' Auto, bukan Maxs Auto). Penggunaan Dativ seperti "das Auto von Max" sering terdengar di percakapan sehari-hari, namun Genitiv (Maxs Auto) dianggap jauh lebih baku dan elegan.',
    struktur: 'Name + s + Nomen  /  Name\' + Nomen (jika nama berakhiran -s/-z/-x)',
    konjugationsTabelle: {
      headers: ['Regel', 'Name', 'Mit Besitz (Genitiv)', 'Falsch (Englisch)'],
      rows: [
        ['Normal (+s)', 'Maria', 'Marias Auto', "Maria's Auto"],
        ['Normal (+s)', 'Peter', 'Peters Haus', "Peter's Haus"],
        ['Endet auf s/z/x (Apostroph)', 'Max', "Max' Hund", 'Maxs Hund'],
        ['Endet auf s/z/x (Apostroph)', 'Jonas', "Jonas' Buch", 'Jonass Buch'],
      ]
    },
    beispiele: [
      { satz: 'Das ist Julias Bruder.', terjemahan: 'Itu saudara laki-lakinya Julia.' },
      { satz: 'Wie heißt Jonas\' Freundin?', terjemahan: 'Siapa nama pacarnya Jonas? (Menggunakan apostrof karena Jonas berakhiran huruf S)' },
      { satz: 'Wir fahren mit Max\' Auto.', terjemahan: 'Kami pergi dengan mobilnya Max (berakhiran X)' },
    ],
    mehrBeispiele: [
      { satz: 'Das ist Annas Tasche.', terjemahan: 'Itu tasnya Anna.' },
      { satz: 'Wir treffen Felix\' Vater.', terjemahan: 'Kami bertemu ayahnya Felix. (Felix berakhiran x, jadi pakai apostrof)' },
      { satz: 'Ist das Moritz\' Fahrrad?', terjemahan: 'Apakah itu sepedanya Moritz? (Moritz berakhiran z, jadi pakai apostrof)' }
    ],
    falle: '✗ SALAH: "Anna\'s Buch" (Ini aturan Inggris yang salah kaprah dipakai di Jerman yang biasa disebut "Deppenapostroph"). ✓ BENAR: "Annas Buch".',
  },
];

const goetheTasks = [
  {
    skill: 'Lesen',
    icon: '📖',
    farbe: 'amber',
    tasks: [
      {
        typ: 'Profile / Kurze Texte lesen',
        beschreibung: 'Membaca profil singkat orang-orang dan mencocokkan pernyataan dengan orangnya.',
        übung: 'Baca teks Jonas & Julia lalu jawab pertanyaan!',
        text: `Jonas: "Ich bin letztes Jahr umgezogen, wohne jetzt in Zürich und studiere Biologie."\nJulia: "Ich habe meine Ausbildung zur Augenoptikerin beendet. Im Juni habe ich meine Prüfungen geschrieben."`,
        frage: 'Wer hat seine Ausbildung abgeschlossen?',
        antwort: 'Julia. Julias Ausbildung ist beendet. Jonas hat sein Studium begonnen (nicht beendet).',
      },
    ],
  },
  {
    skill: 'Schreiben',
    icon: '✍️',
    farbe: 'emerald',
    tasks: [
      {
        typ: 'Reaktion auf Chat / Einladung',
        beschreibung: 'Balas pesan singkat ke teman untuk menolak undangan dengan alasan yang jelas.',
        übung: 'Balas undangan dari Ben: "Wollt ihr morgen Abend kommen?"',
        text: `Schreibe eine Nachricht (30–40 Wörter):\n1. Bedanke dich für die Einladung.\n2. Sage ab + nenne den Grund: Überstunden machen müssen.\n3. Schlage einen anderen Termin vor.`,
        frage: 'Tulis balasanmu sekarang!',
        antwort: 'Hallo Ben! Danke für die Einladung. Leider kann ich morgen nicht kommen, weil ich Überstunden machen muss. Vielleicht am Wochenende? Bis dann!',
      },
    ],
  },
  {
    skill: 'Hören',
    icon: '🎧',
    farbe: 'sky',
    tasks: [
      {
        typ: 'Informationen aus Audio filtern',
        beschreibung: 'Dengar percakapan/pesan voicemail dan catat informasi utama yang disebutkan.',
        übung: 'Simulasi Hörtraining – baca teks lalu jawab:',
        text: `"Hallo, hier ist Marie. Nach der Schule habe ich eine Ausbildung zur Bankkauffrau gemacht. Das war viel Arbeit, aber jetzt arbeite ich in einer Firma in Berlin."`,
        frage: 'Über welche Themen spricht Marie? A) Sprachen  B) Beruf/Ausbildung  C) Freizeit',
        antwort: 'B) Beruf/Ausbildung. Marie spricht über ihre Ausbildung (Bankkauffrau) und ihre aktuelle Arbeitsstelle in Berlin.',
      },
    ],
  },
  {
    skill: 'Sprechen',
    icon: '🗣️',
    farbe: 'rose',
    tasks: [
      {
        typ: 'Über Vergangenes berichten (Sprecheraufgabe)',
        beschreibung: 'Mampu bercerita singkat apa yang sudah kamu lakukan (Perfekt).',
        übung: 'Latih jawaban untuk pertanyaan ini:',
        text: `"Und was hast du letztes Jahr gemacht?" / "Was hast du am Wochenende gemacht?"\n\nStruktur: Ich habe ... [Partizip II]. / Ich bin ... [gefahren/gegangen].`,
        frage: 'Buat 3 kalimat Perfekt tentang kamu sendiri!',
        antwort: 'Beispiel: "Ich habe einen Deutschkurs gemacht. Ich bin nach Bali gefahren. Ich habe viel Musik gehört."',
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


// ============================================================
// MAIN PAGE
// ============================================================

const miniQuiz = [
  { frage: 'Er bleibt zu Hause, ___ er krank ___.', options: ['weil … ist', 'weil … sein', 'dass … ist'], besteAntwort: 0 },
  { frage: 'Ich weiß nicht, ___ der Zug kommt.', options: ['ob', 'wann', 'dass'], besteAntwort: 1 },
  { frage: 'Sie ___ mit der Bahn ___.', options: ['hat ... gefahren', 'ist ... gefahren', 'ist ... gefahrt'], besteAntwort: 1 },
  { frage: 'Das Verb "passieren" im Perfekt: Es ___ viel ___!', options: ['hat ... passiert', 'ist ... gepassiert', 'hat ... gepassiert'], besteAntwort: 0 },
];

export default function KapitelEinsPage() {
  return (
    <ChapterTemplate
      kapitelId="kapitel-1"
      kapitel={kapitel}
      wortschatz={wortschatz}
      partizipZwei={partizipZwei}
      grammatik={grammatik}
      goetheTasks={goetheTasks}
      lernTipps={lernTipps}
      miniQuiz={miniQuiz}
      LesenComponent={<LesenInteraktiv1 />}
      HorenComponent={<HorenInteraktiv1 />}
      SchreibenComponent={<UebungInteraktiv1 />}
      GrammatikInteraktivComponent={<GrammatikInteraktiv1 />}
      TestComponent={<KapitelTest1 />}
    />
  );
}
