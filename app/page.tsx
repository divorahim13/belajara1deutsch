'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import KapitelTest1 from './KapitelTest1';

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
  { de: 'fast', id: 'hampir', beispiel: 'Ich bin fast fertig.', kategorie: 'Alltag' }
];

const partizipZwei: { infinitiv: string; partizip: string; hilfsverb: 'haben' | 'sein'; id: string }[] = [
  { infinitiv: 'machen', partizip: 'gemacht', hilfsverb: 'haben', id: 'membuat' },
  { infinitiv: 'gehen', partizip: 'gegangen', hilfsverb: 'sein', id: 'pergi (jalan)' },
  { infinitiv: 'fahren', partizip: 'gefahren', hilfsverb: 'sein', id: 'berkendara' },
  { infinitiv: 'essen', partizip: 'gegessen', hilfsverb: 'haben', id: 'makan' },
  { infinitiv: 'trinken', partizip: 'getrunken', hilfsverb: 'haben', id: 'minum' },
  { infinitiv: 'kommen', partizip: 'gekommen', hilfsverb: 'sein', id: 'datang' },
  { infinitiv: 'bleiben', partizip: 'geblieben', hilfsverb: 'sein', id: 'tinggal' },
  { infinitiv: 'sehen', partizip: 'gesehen', hilfsverb: 'haben', id: 'melihat' },
  { infinitiv: 'hören', partizip: 'gehört', hilfsverb: 'haben', id: 'mendengar' },
  { infinitiv: 'schreiben', partizip: 'geschrieben', hilfsverb: 'haben', id: 'menulis' },
  { infinitiv: 'lesen', partizip: 'gelesen', hilfsverb: 'haben', id: 'membaca' },
  { infinitiv: 'schlafen', partizip: 'geschlafen', hilfsverb: 'haben', id: 'tidur' },
  { infinitiv: 'finden', partizip: 'gefunden', hilfsverb: 'haben', id: 'menemukan' },
  { infinitiv: 'verstehen', partizip: 'verstanden', hilfsverb: 'haben', id: 'mengerti' },
  { infinitiv: 'beginnen', partizip: 'begonnen', hilfsverb: 'haben', id: 'mulai' },
  { infinitiv: 'fliegen', partizip: 'geflogen', hilfsverb: 'sein', id: 'terbang' },
  { infinitiv: 'schwimmen', partizip: 'geschwommen', hilfsverb: 'sein', id: 'berenang' },
  { infinitiv: 'treffen', partizip: 'getroffen', hilfsverb: 'haben', id: 'bertemu' },
  { infinitiv: 'nehmen', partizip: 'genommen', hilfsverb: 'haben', id: 'mengambil' },
  { infinitiv: 'bringen', partizip: 'gebracht', hilfsverb: 'haben', id: 'membawa' },
  { infinitiv: 'denken', partizip: 'gedacht', hilfsverb: 'haben', id: 'berpikir' },
  { infinitiv: 'wissen', partizip: 'gewusst', hilfsverb: 'haben', id: 'tahu' },
  { infinitiv: 'lernen', partizip: 'gelernt', hilfsverb: 'haben', id: 'belajar' },
  { infinitiv: 'arbeiten', partizip: 'gearbeitet', hilfsverb: 'haben', id: 'bekerja' },
  { infinitiv: 'studieren', partizip: 'studiert', hilfsverb: 'haben', id: 'studi' },
  { infinitiv: 'telefonieren', partizip: 'telefoniert', hilfsverb: 'haben', id: 'telepon' },
  { infinitiv: 'organisieren', partizip: 'organisiert', hilfsverb: 'haben', id: 'mengatur' },
  { infinitiv: 'passieren', partizip: 'passiert', hilfsverb: 'sein', id: 'terjadi' },
  { infinitiv: 'besuchen', partizip: 'besucht', hilfsverb: 'haben', id: 'mengunjungi' },
  { infinitiv: 'anrufen', partizip: 'angerufen', hilfsverb: 'haben', id: 'menelepon' },
  { infinitiv: 'liegen', partizip: 'gelegen', hilfsverb: 'haben', id: 'berbaring / terletak' },
  { infinitiv: 'reiten', partizip: 'geritten', hilfsverb: 'sein', id: 'berkuda' },
  { infinitiv: 'anmelden', partizip: 'angemeldet', hilfsverb: 'haben', id: 'mendaftar' },
  { infinitiv: 'beenden', partizip: 'beendet', hilfsverb: 'haben', id: 'mengakhiri / menyelesaikan' },
  { infinitiv: 'heiraten', partizip: 'geheiratet', hilfsverb: 'haben', id: 'menikah' },
  { infinitiv: 'mieten', partizip: 'gemietet', hilfsverb: 'haben', id: 'menyewa' },
  { infinitiv: 'teilnehmen', partizip: 'teilgenommen', hilfsverb: 'haben', id: 'ikut serta' },
  { infinitiv: 'abschließen', partizip: 'abgeschlossen', hilfsverb: 'haben', id: 'menyelesaikan (studi/lulus)' },
  { infinitiv: 'vorschlagen', partizip: 'vorgeschlagen', hilfsverb: 'haben', id: 'mengusulkan' },
  { infinitiv: 'umziehen', partizip: 'umgezogen', hilfsverb: 'sein', id: 'pindah rumah' },
  { infinitiv: 'helfen', partizip: 'geholfen', hilfsverb: 'haben', id: 'membantu' },
  { infinitiv: 'anfangen', partizip: 'angefangen', hilfsverb: 'haben', id: 'memulai' },
  { infinitiv: 'bekommen', partizip: 'bekommen', hilfsverb: 'haben', id: 'mendapat' },
  { infinitiv: 'einladen', partizip: 'eingeladen', hilfsverb: 'haben', id: 'mengundang' },
  { infinitiv: 'mitnehmen', partizip: 'mitgenommen', hilfsverb: 'haben', id: 'membawa serta' },
  { infinitiv: 'vorbereiten', partizip: 'vorbereitet', hilfsverb: 'haben', id: 'mempersiapkan' },
  { infinitiv: 'aussehen', partizip: 'ausgesehen', hilfsverb: 'haben', id: 'kelihatan (rupa)' },
  { infinitiv: 'vergessen', partizip: 'vergessen', hilfsverb: 'haben', id: 'lupa' },
  { infinitiv: 'verlieren', partizip: 'verloren', hilfsverb: 'haben', id: 'kalah / kehilangan' },
  { infinitiv: 'gewinnen', partizip: 'gewonnen', hilfsverb: 'haben', id: 'menang' },
  { infinitiv: 'reparieren', partizip: 'repariert', hilfsverb: 'haben', id: 'memperbaiki' },
  { infinitiv: 'probieren', partizip: 'probiert', hilfsverb: 'haben', id: 'mencoba (makanan/baju)' },
  { infinitiv: 'wandern', partizip: 'gewandert', hilfsverb: 'sein', id: 'mendaki / hiking' },
  { infinitiv: 'laufen', partizip: 'gelaufen', hilfsverb: 'sein', id: 'berlari' }
];

const grammatik = [
  {
    name: 'Das Perfekt',
    farbe: 'indigo',
    erklärung: 'Kalimat masa lalu dalam percakapan. Dibentuk dari haben/sein + Partizip II.',
    struktur: 'Subjekt + haben/sein ... + [Partizip II]',
    beispiele: [
      { satz: 'Ich habe meine Ausbildung beendet.', terjemahan: 'Saya telah menyelesaikan pendidikan vokasi saya. (beenden → beendet)' },
      { satz: 'Julia ist durch das Land gereist.', terjemahan: 'Julia telah bepergian keliling negara. (sein → gerakan)' },
      { satz: 'Wir haben ein Fest organisiert.', terjemahan: 'Kami telah mengatur pesta. (Verb -ieren → TANPA ge-)' },
    ],
    falle: 'Kata kerja dengan -ieren TIDAK pakai "ge-". Contoh: passiert ✓ — gepassiert ✗. Verb gerakan/perubahan state pakai "sein": gehen → gegangen, fahren → gefahren.',
  },
  {
    name: 'Nebensatz mit "weil"',
    farbe: 'violet',
    erklärung: 'Kalimat anak dengan "weil" (karena). Kata kerja selalu di AKHIR kalimat anak!',
    struktur: 'Hauptsatz + , weil + Subjekt + Info + [Verb]',
    beispiele: [
      { satz: 'Ben schreibt den Freunden, weil er sie einladen will.', terjemahan: 'Ben menulis ke teman-temannya karena dia ingin mengundang mereka.' },
      { satz: 'Marvin kommt später, weil er arbeiten muss.', terjemahan: 'Marvin datang terlambat karena dia harus bekerja.' },
      { satz: 'Lea kann nicht kommen, weil sie ihren Vater besucht.', terjemahan: 'Lea tidak bisa datang karena dia menjenguk ayahnya.' },
    ],
    falle: '✗ SALAH: "...weil er muss arbeiten." ✓ BENAR: "...weil er arbeiten muss." – Verba di AKHIR!',
  },
  {
    name: 'Genitiv bei Eigennamen',
    farbe: 'blue',
    erklärung: 'Menyatakan kepemilikan nama orang. Seperti apostrof-s dalam bahasa Inggris, tapi TANPA apostrof.',
    struktur: 'Name + s + Nomen  /  Name\' + Nomen (jika -s/-z/-x)',
    beispiele: [
      { satz: 'die Schwester von Julia → Julias Schwester', terjemahan: 'Adik perempuannya Julia' },
      { satz: 'die Freundin von Jonas → Jonas\' Freundin', terjemahan: 'Pacarnya Jonas (pakai apostrof karena berakhiran -s)' },
      { satz: 'der Hund von Max → Max\' Hund', terjemahan: 'Anjingnya Max (berakhiran -x)' },
    ],
    falle: '✗ SALAH: "Anna\'s Buch" (aturan Inggris!) ✓ BENAR: "Annas Buch". Apostrof hanya untuk nama berakhiran -s, -z, -x.',
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

// ── COLOR MAPS ──

const kategorieStyles: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  'Sprachen': { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-300', dot: 'bg-blue-500' },
  'Beruf': { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-300', dot: 'bg-amber-500' },
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
function GrammatikKarte({ gram }: { gram: typeof grammatik[0] }) {
  const [showFalle, setShowFalle] = useState(false);
  const s = grammatikStyles[gram.farbe] || grammatikStyles.indigo;

  return (
    <div className="clay-card overflow-hidden">
      <div className={`p-5 ${s.header}`}>
        <h3 className="text-xl font-extrabold">{gram.name}</h3>
        <p className="text-sm mt-1 opacity-90">{gram.erklärung}</p>
      </div>
      <div className="p-5 space-y-4 bg-white">
        {/* Struktur */}
        <div className={`rounded-xl border-2 p-3 font-mono text-sm ${s.card} text-slate-800`}>
          <span className="text-xs font-bold text-slate-500 block mb-1 uppercase tracking-wide">Struktur</span>
          {gram.struktur}
        </div>
        {/* Beispiele */}
        <div className="space-y-2">
          {gram.beispiele.map((b, i) => (
            <div key={i} className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className={`w-6 h-6 rounded-full ${s.accent} text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5`}>{i + 1}</span>
              <div>
                <p className="font-bold text-slate-900 text-sm">{b.satz}</p>
                <p className="text-xs text-slate-600 mt-0.5">{b.terjemahan}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Falle */}
        <button
          onClick={() => setShowFalle(!showFalle)}
          className="w-full text-left p-3 bg-red-50 border-2 border-red-300 rounded-xl text-red-700 font-bold text-sm cursor-pointer hover:bg-red-100 transition-colors"
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
    <div className={`clay-card overflow-hidden border-2 ${s.border}`}>
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
export default function KapitelEinsPage() {
  const [activeTab, setActiveTab] = useState<'wortschatz' | 'partizip' | 'grammatik' | 'goethe' | 'strategie' | 'game' | 'test' | 'schreibensms'>('wortschatz');
  const [katFilter, setKatFilter] = useState<string>('Alle');

  const kategorien = ['Alle', ...Array.from(new Set(wortschatz.map(w => w.kategorie)))];
  const filteredWords = katFilter === 'Alle' ? wortschatz : wortschatz.filter(w => w.kategorie === katFilter);

  const tabs = [
    { id: 'wortschatz', label: 'Wortschatz', icon: '💬', count: wortschatz.length },
    { id: 'partizip', label: 'Partizip II', icon: '⏳', count: partizipZwei.length },
    { id: 'game', label: 'Mini Game', icon: '🎮', count: null },
    { id: 'grammatik', label: 'Grammatik', icon: '📐', count: grammatik.length },
    { id: 'goethe', label: 'Goethe Prep', icon: '🎯', count: 4 },
    { id: 'schreibensms', label: 'Schreiben SMS', icon: '📱', count: null },
    { id: 'test', label: 'Kapiteltest 1', icon: '📝', count: 6 },
    { id: 'strategie', label: 'Lernstrategie', icon: '🧠', count: null },
  ] as const;

  const [activeGameMode, setActiveGameMode] = useState<'wortschatz' | 'partizip' | null>(null);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Decorative Blobs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-indigo-200/30 blur-[120px] -z-10 rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-violet-200/30 blur-[120px] -z-10 rounded-full pointer-events-none" />

      {/* ── TOP NAV ── */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-indigo-950/90 border-b-4 border-indigo-900 px-6 py-3">
        <div className="w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href="/" className="text-white hover:text-indigo-300 transition-colors text-sm font-bold flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              A2 Dashboard
            </a>
            <span className="text-indigo-500">/</span>
            <span className="text-white font-extrabold">Kapitel 1</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-extrabold">A2</span>
            <span className="px-3 py-1 bg-indigo-800 text-indigo-200 rounded-full text-xs font-bold hidden sm:inline">Netzwerk Neu</span>
          </div>
        </div>
      </nav>

      {/* ── HERO HEADER ── */}
      <header className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <span className="clay-badge bg-emerald-100 text-emerald-800 border-emerald-300">Level A2</span>
              <span className="clay-badge bg-violet-100 text-violet-800 border-violet-300">Kapitel 1</span>
              <span className="clay-badge bg-amber-100 text-amber-800 border-amber-300">Netzwerk Neu</span>
              <span className="clay-badge bg-rose-100 text-rose-800 border-rose-300">Goethe Ready</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
              {kapitel.nummer}. {kapitel.titel}
              <span className="block text-2xl md:text-3xl font-semibold text-indigo-600 mt-2">{kapitel.untertitel}</span>
            </h1>
            <p className="text-base text-slate-600 font-medium max-w-lg leading-relaxed">
              Belajar berkomunikasi: membuat janji, menjelaskan alasan, naik transportasi, dan memesan di restoran. Dirancang untuk ujian <strong className="text-slate-800">Goethe-Zertifikat A2</strong>.
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

      {/* ── LERNPLAN BANNER ── */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div
          className="rounded-[20px] p-5 border-4 border-indigo-900"
          style={{ background: 'linear-gradient(to right, #4F46E5, #7C3AED)', boxShadow: '6px 6px 0 0 rgba(30,27,75,0.3)' }}
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="text-4xl flex-shrink-0">📅</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-extrabold text-lg text-white">Rencana Belajar 2 Hari — Kapitel 1 (Scientifically Backed)</h2>
              <p className="text-indigo-100 text-sm mt-1">
                <strong className="text-white">Hari 1 (Pagi):</strong> Flashcard Wortschatz 148 kosakata · &nbsp;
                <strong className="text-white">Hari 1 (Sore):</strong> Grammatik Perfekt &amp; weil ·{' '}
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

      {/* ── TAB NAVIGATION ── */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-extrabold text-sm whitespace-nowrap cursor-pointer transition-all duration-200 flex-shrink-0 border-3 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white border-indigo-900 shadow-[0_4px_0_0_#312E81]'
                  : 'bg-white text-indigo-700 border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50 shadow-[0_3px_0_0_#a5b4fc]'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === tab.id ? 'bg-indigo-800 text-white' : 'bg-indigo-100 text-indigo-700'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
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
                      onClick={() => setKatFilter(k)}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredWords.map((wort, i) => (
                  <FlashCard key={`${wort.de}-${i}`} wort={wort} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── PARTIZIP II TAB ── */}
        {activeTab === 'partizip' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Partizip II (Perfekt Form)</h2>
              <p className="text-slate-600 text-sm mt-1">Daftar kata kerja penting dengan bentuk lampau dan kata kerja bantu (haben/sein).</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {partizipZwei.map((item, i) => (
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
                    className="clay-card p-8 bg-indigo-600 border-indigo-900 border-b-8 text-left hover:translate-y-1 hover:border-b-4 transition-all group cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">💬</div>
                    <h3 className="text-2xl font-black text-white">Wortschatz Recall</h3>
                    <p className="text-indigo-100 mt-2 text-sm leading-relaxed">Ketikan bahasa Jerman dari kosakata harian. Fokus pada artikulasi dan ejaan tepat.</p>
                    <div className="mt-6 flex items-center text-white font-bold text-sm">Main Sekarang →</div>
                  </button>

                  {/* Mode Partizip */}
                  <div className="relative group">
                    <button 
                      onClick={() => setActiveGameMode('partizip')}
                      className="w-full clay-card p-8 bg-orange-600 border-orange-900 border-b-8 text-left hover:translate-y-1 hover:border-b-4 transition-all group-hover:bg-orange-500 cursor-pointer"
                    >
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">⏳</div>
                      <h3 className="text-2xl font-black text-white">Partizip II Lampau</h3>
                      <p className="text-orange-100 mt-2 text-sm leading-relaxed">Tebak bentuk Partizip II dan tentukan Hilfsverb (haben/sein).</p>
                      <div className="mt-6 flex items-center text-white font-bold text-sm">Main Sekarang →</div>
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
              <p className="text-slate-600 text-sm mt-1">3 struktur kunci untuk Kapitel 1. Klik "Häufige Fehler" untuk cek jebakan umum.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {grammatik.map((gram, i) => (
                <GrammatikKarte key={i} gram={gram} />
              ))}
            </div>

            {/* Mini-Quiz */}
            <div className="clay-card p-6 bg-white">
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">🧩 Mini-Quiz: Pilih yang Benar</h3>
              <p className="text-slate-600 text-sm mb-5">Klik jawaban untuk mengecek kebenarannya.</p>
              <div className="space-y-4">
                {[
                  { frage: 'Er bleibt zu Hause, ___ er krank ___.', options: ['weil … ist', 'weil … sein', 'dass … ist'], besteAntwort: 0 },
                  { frage: 'Ich weiß nicht, ___ der Zug kommt.', options: ['ob', 'wann', 'dass'], besteAntwort: 1 },
                  { frage: 'Sie ___ mit der Bahn ___.', options: ['hat ... gefahren', 'ist ... gefahren', 'ist ... gefahrt'], besteAntwort: 1 },
                  { frage: 'Das Verb "passieren" im Perfekt: Es ___ viel ___!', options: ['hat ... passiert', 'ist ... gepassiert', 'hat ... gepassiert'], besteAntwort: 0 },
                ].map((q, qi) => (
                  <MiniQuizFrage key={qi} {...q} index={qi} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── GOETHE TAB ── */}
        {activeTab === 'goethe' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Goethe A2 – Prep Exercises</h2>
              <p className="text-slate-600 text-sm mt-1">4 skills wajib · Min. 60% per skill untuk lulus · ~105 menit total ujian</p>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { skill: 'Lesen', menit: 30, poin: 25, color: 'bg-amber-500', light: 'bg-amber-50 border-amber-300 text-amber-800' },
                { skill: 'Hören', menit: 30, poin: 25, color: 'bg-sky-500', light: 'bg-sky-50 border-sky-300 text-sky-800' },
                { skill: 'Schreiben', menit: 30, poin: 25, color: 'bg-emerald-500', light: 'bg-emerald-50 border-emerald-300 text-emerald-800' },
                { skill: 'Sprechen', menit: 15, poin: 25, color: 'bg-rose-500', light: 'bg-rose-50 border-rose-300 text-rose-800' },
              ].map(s => (
                <div key={s.skill} className={`clay-card p-4 text-center border-2 ${s.light}`}>
                  <div className={`w-12 h-12 ${s.color} rounded-xl mx-auto mb-2 flex items-center justify-center text-white font-extrabold text-lg`}>{s.poin}</div>
                  <p className="font-extrabold text-slate-900">{s.skill}</p>
                  <p className="text-xs text-slate-600 font-semibold mt-0.5">{s.menit} min · {s.poin} Punkte</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goetheTasks.map((task, i) => (
                <GoetheTaskKarte key={i} task={task} />
              ))}
            </div>

            {/* Strategi Box */}
            <div className="clay-card p-5 bg-indigo-950 border-indigo-700">
              <h3 className="font-extrabold text-lg text-white mb-3">🏆 Strategi Lulus Goethe A2</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2 text-indigo-100"><span className="text-green-400 font-bold flex-shrink-0">✓</span> Harus lulus SEMUA 4 skill (min. 15/25 poin per skill)</li>
                <li className="flex gap-2 text-indigo-100"><span className="text-green-400 font-bold flex-shrink-0">✓</span> Baca soal baik-baik – ujian Goethe sering pakai distractor (kata pengecoh)</li>
                <li className="flex gap-2 text-indigo-100"><span className="text-green-400 font-bold flex-shrink-0">✓</span> Schreiben: selalu include Anrede + Abschluss + semua poin tugas</li>
                <li className="flex gap-2 text-indigo-100"><span className="text-green-400 font-bold flex-shrink-0">✓</span> Sprechen: latihan dengan pasangan, fokus pada interaksi bukan perfeksi</li>
                <li className="flex gap-2 text-yellow-300"><span className="font-bold flex-shrink-0">→</span> Download soal latihan resmi: goethe.de/A2-modelltest</li>
              </ul>
            </div>
          </div>
        )}

        {/* ── SCHREIBEN SMS TAB ── */}
        {activeTab === 'schreibensms' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Schreiben: SMS & Nachrichten</h2>
              <p className="text-slate-600 text-sm mt-1">Belajar redemittel (ungkapan) untuk mengatur janji temu.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="clay-card p-6 border-b-4 border-indigo-500 bg-white hover:scale-[1.02] transition-transform">
                <h3 className="font-extrabold text-lg text-indigo-700 mb-3 flex items-center gap-2">💡 Etwas vorschlagen</h3>
                <p className="text-sm text-slate-600 mb-3 font-medium">Membuat usulan atau mengajak seseorang.</p>
                <ul className="space-y-2 text-sm text-slate-800 font-bold bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                  <li>• Wollen wir ins Kino gehen?</li>
                  <li>• Treffen wir uns am Wochenende?</li>
                  <li>• Wie wäre es mit Freitag?</li>
                  <li>• Hast du am Freitagabend Zeit?</li>
                </ul>
              </div>

              <div className="clay-card p-6 border-b-4 border-emerald-500 bg-white hover:scale-[1.02] transition-transform">
                <h3 className="font-extrabold text-lg text-emerald-700 mb-3 flex items-center gap-2">✅ Zusagen / Antworten</h3>
                <p className="text-sm text-slate-600 mb-3 font-medium">Menerima ajakan atau merespons usulan secara positif.</p>
                <ul className="space-y-2 text-sm text-slate-800 font-bold bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <li>• Ja, gerne!</li>
                  <li>• Das passt mir gut.</li>
                  <li>• Ich komme gerne.</li>
                  <li>• Am Freitag habe ich Zeit, bis dann!</li>
                </ul>
              </div>

              <div className="clay-card p-6 border-b-4 border-rose-500 bg-white hover:scale-[1.02] transition-transform">
                <h3 className="font-extrabold text-lg text-rose-700 mb-3 flex items-center gap-2">❌ Absagen & Begründen</h3>
                <p className="text-sm text-slate-600 mb-3 font-medium">Menolak ajakan halus dengan memberikan alasan via 'weil'.</p>
                <ul className="space-y-2 text-sm text-slate-800 font-bold bg-rose-50 p-4 rounded-xl border border-rose-100">
                  <li>• Es tut mir leid, aber ich habe leider keine Zeit.</li>
                  <li>• Ich kann leider nicht kommen, <b>weil</b> ich arbeiten muss.</li>
                  <li>• Schade, da geht es nicht, <b>weil</b> ich Fieber habe.</li>
                  <li>• Danke für die Einladung, aber ich muss noch lernen.</li>
                </ul>
              </div>

              <div className="clay-card p-6 border-b-4 border-amber-500 bg-white hover:scale-[1.02] transition-transform">
                <h3 className="font-extrabold text-lg text-amber-700 mb-3 flex items-center gap-2">🔄 Vorschlag ändern / Nachfragen</h3>
                <p className="text-sm text-slate-600 mb-3 font-medium">Mengubah rencana atau bertanya balik tentang rincian lain.</p>
                <ul className="space-y-2 text-sm text-slate-800 font-bold bg-amber-50 p-4 rounded-xl border border-amber-100">
                  <li>• Geht es vielleicht auch am Dienstag?</li>
                  <li>• Können wir uns am nächsten Sonntag treffen?</li>
                  <li>• Vielleicht können wir uns ein anderes Mal treffen?</li>
                  <li>• Wann hast du denn Zeit?</li>
                </ul>
              </div>
            </div>

            <div className="clay-card p-8 bg-slate-900 border-2 border-slate-700 shadow-2xl">
              <h3 className="font-black text-2xl mb-4 text-emerald-400">📱 Contoh SMS Lengkap (A2)</h3>
              <p className="text-slate-400 text-sm mb-6 border-l-4 border-emerald-500 pl-3 leading-relaxed">
                <strong className="text-emerald-300">Situasi:</strong> Teman Anda mengajak Anda pergi joging, namun Anda sedang sakit kepala. Tulislah sebuah pesan SMS yang berisi: ucapan terima kasih atas ajakan, penolakan beserta alasan (begründen), dan mengusulkan jadwal baru (Vorschlag ändern).
              </p>
              <div className="bg-white/10 p-6 rounded-2xl border border-white/20 relative backdrop-blur-md">
                <div className="font-mono text-base space-y-4 text-slate-100">
                  <p>Hallo Maria,</p>
                  <p>danke für deine Einladung zum Joggen! Leider kann ich heute nicht mitkommen, <b>weil ich starke Kopfschmerzen habe</b>.</p>
                  <p>Wollen wir uns <b>vielleicht am Freitag</b> treffen? Schreib mir, ob das bei dir passt.</p>
                  <p>Liebe Grüße,<br/>Divo</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TEST TAB ── */}
        {activeTab === 'test' && (
          <KapitelTest1 />
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
              <h3 className="text-xl font-extrabold text-slate-900">📅 Jadwal Super-Fokus Kapitel 1 (2 Hari)</h3>
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

      {/* ── FOOTER ── */}
      <footer className="border-t-2 border-slate-200 bg-white py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="clay-badge bg-emerald-100 text-emerald-800 border-emerald-300">A2 · Kapitel 1</span>
            <span className="clay-badge bg-indigo-100 text-indigo-800 border-indigo-300">Netzwerk Neu A2</span>
            <span className="clay-badge bg-violet-100 text-violet-800 border-violet-300">{wortschatz.length} Vokabeln</span>
          </div>
          <p className="text-slate-500 text-xs font-medium">© 2026 BelajarA2Deutsch · Goethe-Zertifikat A2 Preparation</p>
        </div>
      </footer>
    </div>
  );
}
