'use client';

import { useState, useEffect, useCallback } from 'react';

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

const wortschatz: { de: string; id: string; beispiel: string; kategorie: string }[] = [
  // Sprachen
  { de: 'die Muttersprache', id: 'bahasa ibu', beispiel: 'Ich habe zwei Muttersprachen.', kategorie: 'Sprachen' },
  { de: 'fließend', id: 'lancar / fasih', beispiel: 'Ich spreche Deutsch fließend.', kategorie: 'Sprachen' },
  { de: 'ein bisschen', id: 'sedikit', beispiel: 'Französisch spreche ich nur ein bisschen.', kategorie: 'Sprachen' },
  // Beruf & Studium
  { de: 'die Ausbildung', id: 'pendidikan / pelatihan vokasi', beispiel: 'Nach der Schule habe ich eine Ausbildung gemacht.', kategorie: 'Beruf' },
  { de: 'abschließen', id: 'menyelesaikan / lulus', beispiel: 'Sie hat ihre Ausbildung abgeschlossen.', kategorie: 'Beruf' },
  { de: 'der Kollege / die Kollegin', id: 'rekan kerja', beispiel: 'Ich habe nette Kollegen.', kategorie: 'Beruf' },
  { de: 'das Studium', id: 'studi universitas', beispiel: 'Im Herbst habe ich mein Studium angefangen.', kategorie: 'Beruf' },
  { de: 'die Überstunde(n)', id: 'lembur', beispiel: 'Ich muss heute Überstunden machen.', kategorie: 'Beruf' },
  { de: 'der Krankenpfleger', id: 'perawat pria', beispiel: 'Er arbeitet als Krankenpfleger.', kategorie: 'Beruf' },
  { de: 'das Praktikum', id: 'magang', beispiel: 'Ich mache ein Praktikum im Ingenieurbüro.', kategorie: 'Beruf' },
  { de: 'jobben', id: 'bekerja paruh waktu', beispiel: 'Der Student jobbt am Wochenende.', kategorie: 'Beruf' },
  { de: 'die Ingenieurin', id: 'insinyur (wanita)', beispiel: 'Sie arbeitet als Ingenieurin.', kategorie: 'Beruf' },
  { de: 'der Elektriker', id: 'teknisi listrik', beispiel: 'Er hat eine Ausbildung zum Elektriker gemacht.', kategorie: 'Beruf' },
  { de: 'die Firma', id: 'perusahaan', beispiel: 'Er arbeitet jetzt in einer Firma im Zentrum.', kategorie: 'Beruf' },
  { de: 'die Prüfung', id: 'ujian', beispiel: 'Ich habe meine Prüfung gut gemacht.', kategorie: 'Beruf' },
  { de: 'die Note', id: 'nilai / angka rapor', beispiel: 'Ich habe eine gute Note bekommen.', kategorie: 'Beruf' },
  { de: 'der Augenoptiker', id: 'ahli kacamata', beispiel: 'Der Augenoptiker macht meine neue Brille.', kategorie: 'Beruf' },
  { de: 'der Bankkaufmann', id: 'pegawai bank', beispiel: 'Er arbeitet als Bankkaufmann.', kategorie: 'Beruf' },
  { de: 'der Rentner / die Rentnerin', id: 'pensiunan', beispiel: 'Meine Eltern sind schon Rentner.', kategorie: 'Beruf' },
  { de: 'die Präsentation', id: 'presentasi', beispiel: 'Ich muss eine Präsentation vorbereiten.', kategorie: 'Beruf' },
  // Familie & Wohnen
  { de: 'heiraten', id: 'menikah', beispiel: 'Im August hat meine Schwester geheiratet.', kategorie: 'Familie & Wohnen' },
  { de: 'geschieden', id: 'bercerai', beispiel: 'Mein Bruder ist geschieden.', kategorie: 'Familie & Wohnen' },
  { de: 'die Hochzeit', id: 'pesta pernikahan', beispiel: 'Die Hochzeit war sehr romantisch.', kategorie: 'Familie & Wohnen' },
  { de: 'die Verwandten (Pl.)', id: 'kerabat / sanak saudara', beispiel: 'Viele Freunde und Verwandte sind gekommen.', kategorie: 'Familie & Wohnen' },
  { de: 'das Apartment', id: 'apartemen', beispiel: 'Wir haben ein Apartment im Stadtzentrum.', kategorie: 'Familie & Wohnen' },
  { de: 'das Stadtzentrum', id: 'pusat kota', beispiel: 'Das Apartment ist im Stadtzentrum.', kategorie: 'Familie & Wohnen' },
  { de: 'auf dem Land leben', id: 'tinggal di pedesaan', beispiel: 'Meine Eltern leben auf dem Land.', kategorie: 'Familie & Wohnen' },
  { de: 'renovieren', id: 'merenovasi', beispiel: 'Wir haben die Wohnung zusammen renoviert.', kategorie: 'Familie & Wohnen' },
  { de: 'umziehen', id: 'pindah rumah', beispiel: 'Ich bin letztes Jahr umgezogen.', kategorie: 'Familie & Wohnen' },
  { de: 'die Miete', id: 'uang sewa', beispiel: 'Die Miete für das Apartment ist teuer.', kategorie: 'Familie & Wohnen' },
  { de: 'der Nachbar / die Nachbarin', id: 'tetangga', beispiel: 'Mein Nachbar ist sehr nett.', kategorie: 'Familie & Wohnen' },
  { de: 'die Pension', id: 'penginapan / losmen', beispiel: 'Wir haben in einer Pension geschlafen.', kategorie: 'Familie & Wohnen' },
  { de: 'mieten', id: 'menyewa', beispiel: 'Wir mieten eine kleine Wohnung.', kategorie: 'Familie & Wohnen' },
  { de: 'zusammenleben', id: 'tinggal bersama', beispiel: 'Wir leben seit drei Jahren zusammen.', kategorie: 'Familie & Wohnen' },
  { de: 'ziehen (nach)', id: 'pindah (ke)', beispiel: 'Sie will nach Berlin ziehen.', kategorie: 'Familie & Wohnen' },
  // Freizeit
  { de: 'reiten', id: 'berkuda', beispiel: 'Ich spiele Basketball und ich reite.', kategorie: 'Freizeit' },
  { de: 'das Pferd', id: 'kuda', beispiel: 'Meine Eltern haben ein Pferd.', kategorie: 'Freizeit' },
  { de: 'das Fest', id: 'pesta / perayaan', beispiel: 'Wir haben das Fest organisiert.', kategorie: 'Freizeit' },
  { de: 'der Verein', id: 'klub / asosiasi', beispiel: 'Er spielt Fußball in einem Verein.', kategorie: 'Freizeit' },
  { de: 'das Kino', id: 'bioskop', beispiel: 'Wollen wir zusammen ins Kino gehen?', kategorie: 'Freizeit' },
  { de: 'das Konzert', id: 'konser', beispiel: 'Sie gehen zu einem Konzert.', kategorie: 'Freizeit' },
  { de: 'der Flohmarkt', id: 'pasar loak', beispiel: 'Am Sonntag gehe ich auf den Flohmarkt.', kategorie: 'Freizeit' },
  { de: 'wandern', id: 'mendaki / hiking', beispiel: 'Mein Hobby ist wandern in den Bergen.', kategorie: 'Freizeit' },
  { de: 'klettern', id: 'panjat tebing', beispiel: 'Er geht am Wochenende oft klettern.', kategorie: 'Freizeit' },
  { de: 'der See', id: 'danau', beispiel: 'Wir haben viel Spaß am See.', kategorie: 'Freizeit' },
  { de: 'kochen', id: 'memasak', beispiel: 'Kochen ist mein Hobby.', kategorie: 'Freizeit' },
  { de: 'reisen', id: 'bepergian / traveling', beispiel: 'Ich reise gern in Asien.', kategorie: 'Freizeit' },
  { de: 'das Wochenende', id: 'akhir pekan', beispiel: 'Am Wochenende mache ich Sport.', kategorie: 'Freizeit' },
  { de: 'fotografieren', id: 'memotret / fotografi', beispiel: 'Sie haben oft die Stadt fotografiert.', kategorie: 'Freizeit' },
  { de: 'joggen', id: 'joging', beispiel: 'Ich mache diesen Sommer weiter mit Joggen.', kategorie: 'Freizeit' },
  { de: 'der Zug', id: 'kereta api', beispiel: 'Wir sind mit dem Zug gefahren.', kategorie: 'Freizeit' },
  { de: 'der Bus', id: 'bus', beispiel: 'Ich fahre jeden Tag mit dem Bus.', kategorie: 'Freizeit' },
  { de: 'das Auto', id: 'mobil', beispiel: 'Wir sind mit dem Auto gefahren.', kategorie: 'Freizeit' },
  { de: 'der Bahnhof', id: 'stasiun kereta', beispiel: 'Ich habe den Bahnhof nicht gefunden.', kategorie: 'Freizeit' },
  { de: 'fernsehen', id: 'menonton TV', beispiel: 'Am Abend sehe ich oft fern.', kategorie: 'Freizeit' },
  { de: 'feiern', id: 'merayakan', beispiel: 'Wir feiern im Garten.', kategorie: 'Freizeit' },
  { de: 'das Fahrrad', id: 'sepeda', beispiel: 'Jan kommt mit dem Fahrrad.', kategorie: 'Freizeit' },
  { de: 'der Urlaub', id: 'liburan / cuti', beispiel: 'Ben war lange im Urlaub.', kategorie: 'Freizeit' },
  { de: 'schwimmen', id: 'berenang', beispiel: 'Gehen wir heute schwimmen?', kategorie: 'Freizeit' },
  { de: 'tanzen', id: 'menari / berdansa', beispiel: 'Danach gehen wir noch tanzen.', kategorie: 'Freizeit' },
  { de: 'das Schwimmbad', id: 'kolam renang', beispiel: 'Das Schwimmbad ist schon geschlossen.', kategorie: 'Freizeit' },
  { de: 'das Museum', id: 'museum', beispiel: 'Ich gehe morgen ins Museum.', kategorie: 'Freizeit' },
  { de: 'die Radtour', id: 'tur bersepeda', beispiel: 'Ich möchte am Freitag eine Radtour machen.', kategorie: 'Freizeit' },
  { de: 'das Picknick', id: 'piknik', beispiel: 'Wir können noch ein Picknick machen.', kategorie: 'Freizeit' },
  { de: 'einen Plan ändern', id: 'mengubah rencana', beispiel: 'Wir müssen unseren Plan ändern.', kategorie: 'Freizeit' },
  { de: 'teilnehmen', id: 'ikut serta / berpartisipasi', beispiel: 'Nimmst du an dem Kurs teil?', kategorie: 'Freizeit' },
  // Essen & Restaurant
  { de: 'die Speisekarte', id: 'daftar menu', beispiel: 'Wir bestellen aus der Speisekarte.', kategorie: 'Essen' },
  { de: 'die Rechnung', id: 'tagihan / nota', beispiel: 'Die Rechnung, bitte!', kategorie: 'Essen' },
  { de: 'der Kellner', id: 'pelayan restoran', beispiel: 'Rufen Sie den Kellner!', kategorie: 'Essen' },
  { de: 'reservieren', id: 'memesan tempat', beispiel: 'Sie müssen rechtzeitig Plätze reservieren.', kategorie: 'Essen' },
  { de: 'die Reservierung', id: 'reservasi', beispiel: 'Haben Sie eine Reservierung?', kategorie: 'Essen' },
  { de: 'schmecken', id: 'mengecap rasa / terasa', beispiel: 'Das schmeckt sehr süß.', kategorie: 'Essen' },
  { de: 'das Besteck', id: 'alat makan (set)', beispiel: 'Kann ich bitte Besteck haben?', kategorie: 'Essen' },
  { de: 'lecker', id: 'enak / lezat', beispiel: 'Das sieht ja lecker aus!', kategorie: 'Essen' },
  { de: 'der Kuchen', id: 'kue', beispiel: 'Der Kuchen im Café Blume ist gut.', kategorie: 'Essen' },
  { de: 'der Salat', id: 'salad', beispiel: 'Ja, vielleicht einen Salat.', kategorie: 'Essen' },
  { de: 'das Messer', id: 'pisau makan', beispiel: 'Ich brauche ein Messer, bitte.', kategorie: 'Essen' },
  { de: 'der Löffel', id: 'sendok makan', beispiel: 'Der Löffel liegt auf dem Tisch.', kategorie: 'Essen' },
  { de: 'das Glas', id: 'gelas', beispiel: 'Ich hätte gern ein Glas Wasser.', kategorie: 'Essen' },
  { de: 'der Teller', id: 'piring', beispiel: 'Der Teller ist heiß, Vorsicht!', kategorie: 'Essen' },
  { de: 'die Gabel', id: 'garpu', beispiel: 'Hier fehlt eine Gabel.', kategorie: 'Essen' },
  { de: 'die Serviette', id: 'serbet makan', beispiel: 'Darf ich noch eine Serviette haben?', kategorie: 'Essen' },
  { de: 'der Platz', id: 'tempat duduk', beispiel: 'Ein Kellner führt Sie zum Platz.', kategorie: 'Essen' },
  { de: 'auswählen', id: 'memilih', beispiel: 'Sie können aus dem Menü auswählen.', kategorie: 'Essen' },
  { de: 'salzig', id: 'asin', beispiel: 'Die Suppe ist zu salzig.', kategorie: 'Essen' },
  { de: 'süß', id: 'manis', beispiel: 'Der Kuchen schmeckt süß.', kategorie: 'Essen' },
  { de: 'bitter', id: 'pahit', beispiel: 'Dieser Kaffee schmeckt ziemlich bitter.', kategorie: 'Essen' },
  { de: 'scharf', id: 'pedas / tajam', beispiel: 'Das Essen ist mir zu scharf.', kategorie: 'Essen' },
  { de: 'sauer', id: 'asam', beispiel: 'Die Zitrone schmeckt total sauer.', kategorie: 'Essen' },
  { de: 'bezahlen', id: 'membayar', beispiel: 'Können wir bitte bezahlen?', kategorie: 'Essen' },
  // Kommunikation
  { de: 'vorschlagen', id: 'mengusulkan', beispiel: 'Darf ich etwas vorschlagen?', kategorie: 'Kommunikation' },
  { de: 'zusagen', id: 'menerima undangan', beispiel: 'Danke für die Einladung, ich sage gern zu.', kategorie: 'Kommunikation' },
  { de: 'absagen', id: 'membatalkan janji', beispiel: 'Ich muss den Termin leider absagen.', kategorie: 'Kommunikation' },
  { de: 'einverstanden', id: 'setuju', beispiel: 'Gehen wir ins Kino? – Einverstanden!', kategorie: 'Kommunikation' },
  { de: 'schade', id: 'sayang sekali', beispiel: 'Schade, da geht es leider nicht.', kategorie: 'Kommunikation' },
  { de: 'die Lust', id: 'keinginan / mood', beispiel: 'Hast du auch Lust auf einen Kaffee?', kategorie: 'Kommunikation' },
  { de: 'erzählen', id: 'menceritakan', beispiel: 'Er hat mir die Geschichte erzählt.', kategorie: 'Kommunikation' },
  { de: 'verstehen', id: 'mengerti / memahami', beispiel: 'Ich verstehe das nicht ganz.', kategorie: 'Kommunikation' },
  { de: 'empfehlen', id: 'merekomendasikan', beispiel: 'Welches Restaurant können Sie empfehlen?', kategorie: 'Kommunikation' },
  { de: 'die Nachricht', id: 'pesan / berita', beispiel: 'Ich habe deine Nachricht gelesen.', kategorie: 'Kommunikation' },
  { de: 'einladen', id: 'mengundang', beispiel: 'Lisa lädt ihre Freunde ein.', kategorie: 'Kommunikation' },
  { de: 'kennenlernen', id: 'berkenalan / mengenal', beispiel: 'Sie möchte seine Freundin kennenlernen.', kategorie: 'Kommunikation' },
  { de: 'berichten', id: 'menceritakan / melaporkan', beispiel: 'Ich kann über Vergangenes berichten.', kategorie: 'Kommunikation' },
  { de: 'empfangen', id: 'menyambut / menerima', beispiel: 'Er empfängt die Gäste freundlich.', kategorie: 'Kommunikation' },
  { de: 'sich informieren', id: 'mencari informasi', beispiel: 'Ich muss mich darüber informieren.', kategorie: 'Kommunikation' },
  { de: 'zuhören', id: 'mendengarkan saksama', beispiel: 'Bitte hören Sie gut zu.', kategorie: 'Kommunikation' },
  { de: 'begründen', id: 'memberikan alasan / menjelaskan', beispiel: 'Kannst du das begründen?', kategorie: 'Kommunikation' },
  { de: 'Mal sehen.', id: 'Kita lihat saja nanti.', beispiel: 'Kommst du morgen? – Mal sehen.', kategorie: 'Kommunikation' },
  { de: 'also', id: 'jadi / oleh karena itu', beispiel: 'Ich habe also zwei Muttersprachen.', kategorie: 'Kommunikation' },
  // Alltag
  { de: 'riechen', id: 'mencium bau', beispiel: 'Das riecht nach Äpfeln.', kategorie: 'Alltag' },
  { de: 'müde', id: 'lelah / mengantuk', beispiel: 'Ich arbeite nachts und bin oft müde.', kategorie: 'Alltag' },
  { de: 'fröhlich', id: 'ceria / gembira', beispiel: 'Sie ist ein sehr fröhlicher Mensch.', kategorie: 'Alltag' },
  { de: 'glücklich', id: 'bahagia', beispiel: 'Warum bist du so glücklich?', kategorie: 'Alltag' },
  { de: 'verboten', id: 'dilarang', beispiel: 'Telefonieren ist im Restaurant verboten.', kategorie: 'Alltag' },
  { de: 'geschlossen', id: 'tutup (buka-tutup)', beispiel: 'Das Schwimmbad ist schon geschlossen.', kategorie: 'Alltag' },
  { de: 'die Grippe', id: 'penyakit flu', beispiel: 'Er hat leider die Grippe.', kategorie: 'Alltag' },
  { de: 'krank', id: 'sakit', beispiel: 'Sie ist heute leider krank.', kategorie: 'Alltag' },
  { de: 'der Termin', id: 'janji temu / jadwal', beispiel: 'Ich habe morgen einen Termin.', kategorie: 'Alltag' },
  { de: 'das Treffen', id: 'pertemuan', beispiel: 'Kommst du nicht zu dem Treffen?', kategorie: 'Alltag' },
  { de: 'mitbringen', id: 'membawa serta', beispiel: 'Ich bringe einen Salat mit.', kategorie: 'Alltag' },
  { de: 'vorbereiten', id: 'mempersiapkan', beispiel: 'Wir müssen das Treffen vorbereiten.', kategorie: 'Alltag' },
  { de: 'der Fuß', id: 'kaki', beispiel: 'Mein Fuß tut total weh.', kategorie: 'Alltag' },
  { de: 'wehtun', id: 'terasa sakit', beispiel: 'Der Fuß tut sehr weh.', kategorie: 'Alltag' },
  { de: 'regnen', id: 'hujan', beispiel: 'Es regnet sehr stark.', kategorie: 'Alltag' },
  { de: 'zusammen', id: 'bersama / bersama-sama', beispiel: 'Wir können zusammen gehen.', kategorie: 'Alltag' },
  { de: 'gemeinsam', id: 'bersama-sama', beispiel: 'Wir machen diese Arbeit gemeinsam.', kategorie: 'Alltag' },
  { de: 'losfahren', id: 'berangkat', beispiel: 'Wir wollen um 10 Uhr losfahren.', kategorie: 'Alltag' },
  { de: 'abholen', id: 'menjemput', beispiel: 'Ich hole dich später am Bahnhof ab.', kategorie: 'Alltag' },
  { de: 'einkaufen', id: 'berbelanja', beispiel: 'Ich muss heute Nachmittag noch einkaufen.', kategorie: 'Alltag' },
  { de: 'Spaß machen', id: 'menyenangkan', beispiel: 'Die Arbeit macht mir viel Spaß.', kategorie: 'Alltag' },
  { de: 'suchen', id: 'mencari', beispiel: 'Ich suche eine neue Stelle.', kategorie: 'Alltag' },
  { de: 'diskutieren', id: 'berdiskusi', beispiel: 'Wir haben im Kurs viel diskutiert.', kategorie: 'Alltag' },
  { de: 'das Problem', id: 'masalah', beispiel: 'Das war gar kein Problem.', kategorie: 'Alltag' },
  { de: 'spannend', id: 'menegangkan / menarik', beispiel: 'Dieser Film ist sehr spannend.', kategorie: 'Alltag' },
  { de: 'teuer', id: 'mahal', beispiel: 'Die Pension war nicht so teuer.', kategorie: 'Alltag' },
  { de: 'die Sonne', id: 'matahari', beispiel: 'Die Sonne scheint hier mehr.', kategorie: 'Alltag' },
  { de: 'vorher', id: 'sebelumnya', beispiel: 'Vorher bin ich immer zu Fuß gegangen.', kategorie: 'Alltag' },
  { de: 'beginnen', id: 'memulai', beispiel: 'Der Film beginnt erst um zwanzig Uhr.', kategorie: 'Alltag' },
  { de: 'organisieren', id: 'mengatur / menyelenggarakan', beispiel: 'Wir organisieren ein kleines Fest.', kategorie: 'Alltag' },
  { de: 'sich anmelden', id: 'mendaftar / registrasi', beispiel: 'Ich möchte mich für den Kurs anmelden.', kategorie: 'Alltag' },
  { de: 'der Aufenthalt', id: 'masa tinggal', beispiel: 'Ich wünsche Ihnen einen angenehmen Aufenthalt.', kategorie: 'Alltag' },
  { de: 'der Eingang', id: 'pintu masuk', beispiel: 'Wir treffen uns am Eingang.', kategorie: 'Alltag' },
  { de: 'spätestens', id: 'paling lambat', beispiel: 'Ich komme spätestens um drei Uhr.', kategorie: 'Alltag' },
  { de: 'aus sein', id: 'dimatikan / off', beispiel: 'Handys müssen aus sein.', kategorie: 'Alltag' },
  { de: 'fühlen', id: 'merasakan / merasa', beispiel: 'Wie fühlst du dich heute?', kategorie: 'Alltag' },
  { de: 'der Gegenstand', id: 'benda / objek', beispiel: 'Was ist das für ein Gegenstand?', kategorie: 'Alltag' },
  { de: 'die Angst', id: 'rasa takut', beispiel: 'Ich habe Angst vor dem Examen.', kategorie: 'Alltag' },
  { de: 'fast', id: 'hampir', beispiel: 'Ich bin fast fertig.', kategorie: 'Alltag' },
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
    <div className="relative" style={{ perspective: '1000px', height: '180px' }}>
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
            <span className="text-xs text-slate-400 font-medium flex-shrink-0">Klik untuk balik →</span>
          </div>
          <div className="text-center px-2">
            <p className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">{wort.de}</p>
          </div>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 clay-card p-5 flex flex-col justify-between flip-card-face ${style.bg}`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex-1 flex flex-col justify-center gap-2 text-center">
            <p className={`text-xl font-extrabold ${style.text}`}>{wort.id}</p>
            <p className={`text-sm italic opacity-80 ${style.text} leading-snug`}>„{wort.beispiel}"</p>
          </div>
          {learned === 'none' && (
            <div className="flex gap-2 pt-2">
              <button
                onClick={(e) => { e.stopPropagation(); setLearned('no'); }}
                className="flex-1 py-2 rounded-xl bg-red-100 text-red-700 font-bold border-2 border-red-300 hover:bg-red-200 transition-colors cursor-pointer text-sm"
              >
                ✗ Belum
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLearned('yes'); }}
                className="flex-1 py-2 rounded-xl bg-green-100 text-green-700 font-bold border-2 border-green-300 hover:bg-green-200 transition-colors cursor-pointer text-sm"
              >
                ✓ Hafal!
              </button>
            </div>
          )}
          {learned === 'yes' && <p className="text-center text-green-700 font-extrabold pt-2 text-sm">🎉 Box 2 – Ulang 3 hari lagi!</p>}
          {learned === 'no' && <p className="text-center text-red-700 font-extrabold pt-2 text-sm">🔁 Box 1 – Ulang besok!</p>}
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
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [question, setQuestion] = useState<any>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [direction, setDirection] = useState<'de-id' | 'id-de'>('de-id');
  const [selected, setSelected] = useState<number | null>(null);

  const generateQuestion = useCallback(() => {
    const target = wortschatz[Math.floor(Math.random() * wortschatz.length)];
    const dir = Math.random() > 0.5 ? 'de-id' : 'id-de';
    const wrong: any[] = [];
    while (wrong.length < 3) {
      const rand = wortschatz[Math.floor(Math.random() * wortschatz.length)];
      if (rand.de !== target.de && !wrong.find(w => w.de === rand.de)) {
        wrong.push(rand);
      }
    }
    const all = [target, ...wrong].sort(() => Math.random() - 0.5);
    setQuestion(target);
    setOptions(all);
    setDirection(dir);
    setSelected(null);
  }, []);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  if (!question) return null;

  const promptText = direction === 'de-id' ? question.de : question.id;
  const promptLang = direction === 'de-id' ? 'Tebak Arti (Jerman → Indo)' : 'Uji Memori (Indo → Jerman)';
  const correctOptionText = direction === 'de-id' ? question.id : question.de;

  const handleSelect = (idx: number, opt: any) => {
    if (selected !== null) return;
    setSelected(idx);
    const optText = direction === 'de-id' ? opt.id : opt.de;
    const isCorrect = optText === correctOptionText;
    
    if (isCorrect) {
      setScore(s => s + 10);
      setStreak(s => s + 1);
      setTimeout(generateQuestion, 1000);
    } else {
      setStreak(0);
      setTimeout(generateQuestion, 2500);
    }
  };

  return (
    <div className="clay-card p-6 md:p-8 bg-indigo-950 text-white max-w-2xl mx-auto space-y-6 text-center border-4 border-indigo-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-2xl font-black text-indigo-100 flex items-center justify-center sm:justify-start gap-2">
          <span>🎮</span> Active Recall Challenge
        </h3>
        <div className="text-center sm:text-right bg-indigo-900 px-4 py-2 rounded-2xl border-2 border-indigo-800">
          <p className="text-indigo-400 text-xs font-bold uppercase tracking-wider">Score</p>
          <p className="text-3xl font-black text-emerald-400">{score}</p>
        </div>
      </div>
      
      {streak >= 3 && (
        <div className="bg-orange-500/20 border-2 border-orange-500/50 text-orange-300 px-4 py-1.5 rounded-full inline-block text-sm font-bold shadow-lg animate-pulse">
           🔥 Streak: {streak} Benar Berturut-turut!
        </div>
      )}

      <div className="py-12 px-6 bg-indigo-900 rounded-3xl border-b-4 border-indigo-950 shadow-inner relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
         <p className="text-sm font-extrabold text-indigo-300 mb-4 uppercase tracking-widest">{promptLang}</p>
         <h4 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">{promptText}</h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {options.map((opt, idx) => {
          const optText = direction === 'de-id' ? opt.id : opt.de;
          let uiState = "bg-indigo-800 hover:bg-indigo-700 hover:-translate-y-1 text-indigo-100 border-indigo-900 shadow-md";
          if (selected !== null) {
            const isCorrectOption = optText === correctOptionText;
            if (isCorrectOption) {
              uiState = "bg-emerald-500 text-white border-emerald-700 shadow-[0_0_20px_rgba(16,185,129,0.4)] z-10 scale-105";
            } else if (selected === idx && !isCorrectOption) {
              uiState = "bg-rose-500 text-white border-rose-700";
            } else {
              uiState = "bg-indigo-900/50 text-indigo-500 border-transparent opacity-50 scale-95";
            }
          }
          return (
            <button 
              key={idx} 
              onClick={() => handleSelect(idx, opt)}
              className={`p-6 rounded-2xl font-bold cursor-pointer transition-all duration-300 border-b-4 ${uiState} text-lg md:text-xl relative`}
            >
              {optText}
            </button>
          )
        })}
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function KapitelEinsPage() {
  const [activeTab, setActiveTab] = useState<'wortschatz' | 'grammatik' | 'goethe' | 'strategie' | 'game'>('wortschatz');
  const [katFilter, setKatFilter] = useState<string>('Alle');

  const kategorien = ['Alle', ...Array.from(new Set(wortschatz.map(w => w.kategorie)))];
  const filteredWords = katFilter === 'Alle' ? wortschatz : wortschatz.filter(w => w.kategorie === katFilter);

  const tabs = [
    { id: 'wortschatz', label: 'Wortschatz', icon: '💬', count: wortschatz.length },
    { id: 'game', label: 'Mini Game', icon: '🎮', count: null },
    { id: 'grammatik', label: 'Grammatik', icon: '📐', count: grammatik.length },
    { id: 'goethe', label: 'Goethe Prep', icon: '🎯', count: 4 },
    { id: 'strategie', label: 'Lernstrategie', icon: '🧠', count: null },
  ] as const;

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
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
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

        {/* ── GAME TAB ── */}
        {activeTab === 'game' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Vocabulary Challenge</h2>
              <p className="text-slate-600 text-sm mt-1">Latih memori pasif dan aktif Anda. Jawab secepat mungkin!</p>
            </div>
            <WortschatzGame />
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
