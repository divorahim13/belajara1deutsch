"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import ChapterTemplate from '../components/ChapterTemplate';
import KapitelTest12 from '../KapitelTest12';
import LesenInteraktiv12 from '../LesenInteraktiv12';
import HorenInteraktiv12 from '../HorenInteraktiv12';
import UebungInteraktiv12 from '../UebungInteraktiv12';
import GrammatikInteraktiv12 from '../GrammatikInteraktiv12';

const kapitel = {
  nummer: 12,
  titel: "Gute Unterhaltung!",
  untertitel: "Festival, Musik, Indefinitpronomen, Rückfragen, Relativsätze, Kunst und Bildbeschreibung",
  level: "A2",
  goetheFokus: ["Lesen", "Hören", "Schreiben", "Sprechen"],
  source: "Netzwerk neu A2 Kursbuch + Übungsbuch",
  estimatedDays: 2,
  beschreibung: "Belajar merencanakan kunjungan festival, membeli tiket, bertanya ulang, berbicara tentang musik, memperkenalkan musisi atau band, memahami berita singkat, memberi informasi lebih rinci tentang orang dengan Relativsätze, memahami informasi tentang seni lukis, berbicara tentang gambar, dan mendeskripsikan gambar secara terstruktur.",
  skills: ["Lesen", "Hören", "Schreiben", "Sprechen"],
  badges: ["Level A2", "Kapitel 12", "Netzwerk Neu", "Goethe Ready"],
  learningObjectives: [
    "Einen Festivalbesuch planen.",
    "Konzertkarten online kaufen.",
    "Nachfragen und Rückfragen formulieren.",
    "Über Musik, Lieder, Bands und Musiker/innen sprechen.",
    "Eine Band oder einen Musiker / eine Musikerin vorstellen.",
    "Indefinitpronomen man, jemand, niemand, alles, etwas, nichts verwenden.",
    "Zeitungsmeldungen verstehen.",
    "Genauere Informationen zu Personen und Dingen geben.",
    "Relativsätze im Nominativ bilden.",
    "Relativsätze im Akkusativ bilden.",
    "Informationen über Malerei verstehen.",
    "Über Bilder sprechen.",
    "Eine Bildbeschreibung verstehen und schreiben.",
    "Wortschatz, Artikel, Plural dan Partizip II aktif menguasai."
  ],
  stats: {
    vocabularyCount: 0, 
    partizip2Count: 0,  
    grammarCount: 3,
    redemittelCount: 4,
    goetheTaskCount: 3,
    learningTipsCount: 3
  },
  studyPlan: {
    title: "Rencana Belajar 2 Hari — Kapitel 12",
    days: 2,
    content: "Hari 1: Wortschatz Unterhaltung, Medien, Kultur, Festival, Musik, Indefinitpronomen, Rückfragen, Band/Musiker/in vorstellen, Partizip II. Hari 2: Zeitungsmeldungen, Relativsätze Nominativ dan Akkusativ, Malerei, Bildbeschreibung, Netzwerk-WG, Review, dan Final Quiz."
  },
  phases: [
    {
      title: "FASE 1: INPUT",
      desc: "Wortschatz, Partizip II, Grammatik, Redemittel",
      color: "bg-blue-500",
      items: ["Wortschatz", "Partizip II", "Grammatik", "Redemittel"]
    },
    {
      title: "FASE 2: LATIHAN",
      desc: "Lesen, Hören, Schreiben, Sprechen, Aussprache",
      color: "bg-purple-500",
      items: ["Lesen", "Hören", "Schreiben", "Sprechen", "Aussprache"]
    },
    {
      title: "FASE 3: EVALUASI",
      desc: "Review & Final Quiz",
      color: "bg-emerald-500",
      items: ["Review", "Final Quiz"]
    }
  ],
  wortschatz: [
    { word: "die Unterhaltung", plural: "Sg.", meaning: "hiburan", category: "Unterhaltung" },
    { word: "die Gesellschaft", plural: "die Gesellschaften", meaning: "masyarakat", category: "Kultur" },
    { word: "die Kultur", plural: "die Kulturen", meaning: "budaya", category: "Kultur" },
    { word: "die Politik", plural: "Sg.", meaning: "politik", category: "Kultur" },
    { word: "die Gewalt", plural: "Sg.", meaning: "kekerasan", category: "Kultur" },
    { word: "die Kriminalität", plural: "Sg.", meaning: "kriminalitas", category: "Kultur" },
    { word: "die Realität", plural: "Sg.", meaning: "realitas", category: "Kultur" },
    { word: "die Kulisse", plural: "die Kulissen", meaning: "latar", category: "Film" },
    { word: "die Serie", plural: "die Serien", meaning: "serial", category: "Medien" },
    { word: "die Folge", plural: "die Folgen", meaning: "episode", category: "Medien" },
    { word: "der Film", plural: "die Filme", meaning: "film", category: "Medien" },
    { word: "das Buch", plural: "die Bücher", meaning: "buku", category: "Medien" },
    { word: "der Roman", plural: "die Romane", meaning: "novel", category: "Medien" },
    { word: "die Geschichte", plural: "die Geschichten", meaning: "cerita", category: "Medien" },
    { word: "das Kinderbuch", plural: "die Kinderbücher", meaning: "buku anak-anak", category: "Medien" },
    { word: "die Bestseller-Liste", plural: "die Bestseller-Listen", meaning: "daftar bestseller", category: "Medien" },
    { word: "die Verfilmung", plural: "die Verfilmungen", meaning: "adaptasi film", category: "Medien" },
    { word: "die Sprache", plural: "die Sprachen", meaning: "bahasa", category: "Medien" },
    { word: "die Übersetzung", plural: "die Übersetzungen", meaning: "terjemahan", category: "Medien" },
    { word: "das Spiel", plural: "die Spiele", meaning: "game/permainan", category: "Medien" },
    { word: "das Video", plural: "die Videos", meaning: "video", category: "Medien" },
    { word: "das Let’s-play-Video", plural: "die Let’s-play-Videos", meaning: "video Let’s Play", category: "Medien" },
    { word: "der Kanal", plural: "die Kanäle", meaning: "kanal", category: "Medien" },
    { word: "der YouTube-Kanal", plural: "die YouTube-Kanäle", meaning: "kanal YouTube", category: "Medien" },
    { word: "die Reihe", plural: "die Reihen", meaning: "seri/rangkaian", category: "Medien" },
    { word: "das Werk", plural: "die Werke", meaning: "karya", category: "Kunst" },
    { word: "das Bild", plural: "die Bilder", meaning: "gambar/lukisan", category: "Kunst" },
    { word: "der Titel", plural: "die Titel", meaning: "judul", category: "Kunst" },
    { word: "der Autor", plural: "die Autoren", meaning: "penulis laki-laki", category: "Medien" },
    { word: "die Autorin", plural: "die Autorinnen", meaning: "penulis perempuan", category: "Medien" },
    { word: "der Schauspieler", plural: "die Schauspieler", meaning: "aktor", category: "Film" },
    { word: "die Schauspielerin", plural: "die Schauspielerinnen", meaning: "aktris", category: "Film" },
    { word: "der Synchronsprecher", plural: "die Synchronsprecher", meaning: "dubber laki-laki", category: "Medien" },
    { word: "die Synchronsprecherin", plural: "die Synchronsprecherinnen", meaning: "dubber perempuan", category: "Medien" },
    { word: "der Preis", plural: "die Preise", meaning: "penghargaan/harga", category: "Medien" },
    { word: "der Webvideopreis", plural: "die Webvideopreise", meaning: "penghargaan video web", category: "Medien" },
    { word: "das Schloss", plural: "die Schlösser", meaning: "istana", category: "Gebäude" },
    { word: "das Märchenschloss", plural: "die Märchenschlösser", meaning: "istana dongeng", category: "Gebäude" },
    { word: "der König", plural: "die Könige", meaning: "raja", category: "Geschichte" },
    { word: "die Königin", plural: "die Königinnen", meaning: "ratu", category: "Geschichte" },
    { word: "das Gebäude", plural: "die Gebäude", meaning: "bangunan", category: "Gebäude" },
    { word: "die Kirche", plural: "die Kirchen", meaning: "gereja", category: "Gebäude" },
    { word: "das Museum", plural: "die Museen", meaning: "museum", category: "Kultur" },
    { word: "die Oper", plural: "die Opern", meaning: "opera", category: "Kultur" },
    { word: "die Kunsthalle", plural: "die Kunsthallen", meaning: "galeri/museum seni", category: "Kunst" },
    { word: "das Kunstmuseum", plural: "die Kunstmuseen", meaning: "museum seni", category: "Kunst" },
    { word: "die Kunstgalerie", plural: "die Kunstgalerien", meaning: "galeri seni", category: "Kunst" },
    { word: "die Führung", plural: "die Führungen", meaning: "tur berpemandu", category: "Kultur" },
    { word: "der Tourist", plural: "die Touristen", meaning: "turis laki-laki", category: "Reisen" },
    { word: "die Touristin", plural: "die Touristinnen", meaning: "turis perempuan", category: "Reisen" },
    { word: "der Besucher", plural: "die Besucher", meaning: "pengunjung laki-laki", category: "Kultur" },
    { word: "die Besucherin", plural: "die Besucherinnen", meaning: "pengunjung perempuan", category: "Kultur" },
    { word: "das Jahrhundert", plural: "die Jahrhunderte", meaning: "abad", category: "Zeit" },
    { word: "das Festival", plural: "die Festivals", meaning: "festival", category: "Festival" },
    { word: "der Festivalbesuch", plural: "die Festivalbesuche", meaning: "kunjungan festival", category: "Festival" },
    { word: "das Konzert", plural: "die Konzerte", meaning: "konser", category: "Musik" },
    { word: "die Musik", plural: "Sg.", meaning: "musik", category: "Musik" },
    { word: "die Rockmusik", plural: "Sg.", meaning: "musik rock", category: "Musik" },
    { word: "der Ort", plural: "die Orte", meaning: "tempat", category: "Festival" },
    { word: "die Unterkunft", plural: "die Unterkünfte", meaning: "akomodasi", category: "Reise" },
    { word: "die Übernachtung", plural: "die Übernachtungen", meaning: "penginapan", category: "Reise" },
    { word: "die Abfahrt", plural: "die Abfahrten", meaning: "keberangkatan", category: "Reise" },
    { word: "die Fahrt", plural: "die Fahrten", meaning: "perjalanan", category: "Reise" },
    { word: "die Verpflegung", plural: "Sg.", meaning: "konsumsi", category: "Reise" },
    { word: "das Gepäck", plural: "Sg.", meaning: "barang bawaan", category: "Reise" },
    { word: "der Rucksack", plural: "die Rucksäcke", meaning: "ransel", category: "Reise" },
    { word: "die Katze", plural: "die Katzen", meaning: "kucing", category: "Haustier" },
    { word: "das Essen", plural: "Sg.", meaning: "makanan", category: "Verpflegung" },
    { word: "das Getränk", plural: "die Getränke", meaning: "minuman", category: "Verpflegung" },
    { word: "die Fahrkarte", plural: "die Fahrkarten", meaning: "tiket perjalanan", category: "Ticket" },
    { word: "die Reservierung", plural: "die Reservierungen", meaning: "reservasi", category: "Ticket" },
    { word: "der Kauf", plural: "die Käufe", meaning: "pembelian", category: "Ticket" },
    { word: "der Ticketkauf", plural: "die Ticketkäufe", meaning: "pembelian tiket", category: "Ticket" },
    { word: "die Ticketwahl", plural: "die Ticketwahlen", meaning: "pemilihan tiket", category: "Ticket" },
    { word: "der Warenkorb", plural: "die Warenkörbe", meaning: "keranjang belanja", category: "Ticket" },
    { word: "die Kontaktdaten", plural: "Pl.", meaning: "data kontak", category: "Ticket" },
    { word: "die Versandart", plural: "die Versandarten", meaning: "metode pengiriman", category: "Ticket" },
    { word: "die Zahlungsart", plural: "die Zahlungsarten", meaning: "metode pembayaran", category: "Ticket" },
    { word: "die Überweisung", plural: "die Überweisungen", meaning: "transfer", category: "Ticket" },
    { word: "die Kreditkarte", plural: "die Kreditkarten", meaning: "kartu kredit", category: "Ticket" },
    { word: "die Sofort-Überweisung", plural: "die Sofort-Überweisungen", meaning: "transfer instan", category: "Ticket" },
    { word: "der Versand", plural: "Sg.", meaning: "pengiriman", category: "Ticket" },
    { word: "die Versandkosten", plural: "Pl.", meaning: "biaya pengiriman", category: "Ticket" },
    { word: "die Gebühr", plural: "die Gebühren", meaning: "biaya", category: "Ticket" },
    { word: "die Vorwahl", plural: "die Vorwahlen", meaning: "kode area", category: "Ticket" },
    { word: "die Mobilnummer", plural: "die Mobilnummern", meaning: "nomor ponsel", category: "Ticket" },
    { word: "die Mehrwertsteuer", plural: "Sg.", meaning: "PPN", category: "Ticket" },
    { word: "die AGB", plural: "Pl.", meaning: "syarat dan ketentuan", category: "Ticket" },
    { word: "die Datenschutzbestimmung", plural: "die Datenschutzbestimmungen", meaning: "ketentuan perlindungan data", category: "Ticket" },
    { word: "der Musikstil", plural: "die Musikstile", meaning: "gaya musik", category: "Musik" },
    { word: "das Album", plural: "die Alben", meaning: "album", category: "Musik" },
    { word: "die Bühne", plural: "die Bühnen", meaning: "panggung", category: "Musik" },
    { word: "der Musiker", plural: "die Musiker", meaning: "musisi laki-laki", category: "Musik" },
    { word: "die Musikerin", plural: "die Musikerinnen", meaning: "musisi perempuan", category: "Musik" },
    { word: "der Sänger", plural: "die Sänger", meaning: "penyanyi laki-laki", category: "Musik" },
    { word: "die Sängerin", plural: "die Sängerinnen", meaning: "penyanyi perempuan", category: "Musik" },
    { word: "die Band", plural: "die Bands", meaning: "band", category: "Musik" },
    { word: "das Mitglied", plural: "die Mitglieder", meaning: "anggota", category: "Musik" },
    { word: "das Lied", plural: "die Lieder", meaning: "lagu", category: "Musik" },
    { word: "der Hit", plural: "die Hits", meaning: "hit", category: "Musik" },
    { word: "die Stimme", plural: "die Stimmen", meaning: "suara", category: "Musik" },
    { word: "die Stimmung", plural: "die Stimmungen", meaning: "suasana", category: "Musik" },
    { word: "die Meldung", plural: "die Meldungen", meaning: "berita singkat", category: "Meldungen" },
    { word: "der Prominente", plural: "die Prominenten", meaning: "selebritas laki-laki", category: "Meldungen" },
    { word: "die Prominente", plural: "die Prominenten", meaning: "selebritas perempuan", category: "Meldungen" },
    { word: "der Nachrichtensprecher", plural: "die Nachrichtensprecher", meaning: "pembaca berita laki-laki", category: "Meldungen" },
    { word: "die Nachrichtensprecherin", plural: "die Nachrichtensprecherinnen", meaning: "pembaca berita perempuan", category: "Meldungen" },
    { word: "der Radiosprecher", plural: "die Radiosprecher", meaning: "penyiar radio laki-laki", category: "Radio" },
    { word: "die Radiosprecherin", plural: "die Radiosprecherinnen", meaning: "penyiar radio perempuan", category: "Radio" },
    { word: "der Hörer", plural: "die Hörer", meaning: "pendengar laki-laki", category: "Radio" },
    { word: "die Hörerin", plural: "die Hörerinnen", meaning: "pendengar perempuan", category: "Radio" },
    { word: "die Sendung", plural: "die Sendungen", meaning: "siaran", category: "Radio" },
    { word: "der Einsatz", plural: "die Einsätze", meaning: "giliran/tugas", category: "Arbeit" },
    { word: "die Stille", plural: "Sg.", meaning: "keheningan", category: "Radio" },
    { word: "der Sammler", plural: "die Sammler", meaning: "kolektor laki-laki", category: "Kunst" },
    { word: "die Sammlerin", plural: "die Sammlerinnen", meaning: "kolektor perempuan", category: "Kunst" },
    { word: "das Schnäppchen", plural: "die Schnäppchen", meaning: "barang murah", category: "Flohmarkt" },
    { word: "der Flohmarkt", plural: "die Flohmärkte", meaning: "pasar loak", category: "Flohmarkt" },
    { word: "der Wert", plural: "die Werte", meaning: "nilai", category: "Kunst" },
    { word: "die Kunstexpertin", plural: "die Kunstexpertinnen", meaning: "ahli seni perempuan", category: "Kunst" },
    { word: "der Experte", plural: "die Experten", meaning: "ahli laki-laki", category: "Kunst" },
    { word: "die Expertin", plural: "die Expertinnen", meaning: "ahli perempuan", category: "Kunst" },
    { word: "der Zuschauer", plural: "die Zuschauer", meaning: "penonton laki-laki", category: "Konzert" },
    { word: "die Zuschauerin", plural: "die Zuschauerinnen", meaning: "penonton perempuan", category: "Konzert" },
    { word: "die Malerei", plural: "Sg.", meaning: "seni lukis", category: "Malerei" },
    { word: "die Ausstellung", plural: "die Ausstellungen", meaning: "pameran", category: "Kunst" },
    { word: "der Audioguide", plural: "die Audioguides", meaning: "panduan audio", category: "Kunst" },
    { word: "das Tierbild", plural: "die Tierbilder", meaning: "lukisan hewan", category: "Kunst" },
    { word: "die Bedeutung", plural: "die Bedeutungen", meaning: "makna", category: "Bild" },
    { word: "der Ausblick", plural: "die Ausblicke", meaning: "pemandangan", category: "Bild" },
    { word: "das Blatt", plural: "die Blätter", meaning: "daun", category: "Bild" },
    { word: "der Feldhase", plural: "die Feldhasen", meaning: "kelinci liar", category: "Tier" },
    { word: "das Wildschwein", plural: "die Wildschweine", meaning: "babi hutan", category: "Tier" },
    { word: "die Kuh", plural: "die Kühe", meaning: "sapi", category: "Tier" },
    { word: "die Blume", plural: "die Blumen", meaning: "bunga", category: "Bild" },
    { word: "der Vordergrund", plural: "Sg.", meaning: "latar depan", category: "Bild" },
    { word: "der Hintergrund", plural: "Sg.", meaning: "latar belakang", category: "Bild" },
    { word: "die Mitte", plural: "Sg.", meaning: "tengah", category: "Bild" },
    { word: "die Ecke", plural: "die Ecken", meaning: "sudut", category: "Bild" },
    { word: "die Stelle", plural: "die Stellen", meaning: "tempat/posisi", category: "Bild" }
  ],
  partizip2: [
    { infinitive: "verbringen", partizip2: "hat verbracht", meaning: "menghabiskan waktu", isIrregular: true },
    { infinitive: "zeigen", partizip2: "hat gezeigt", meaning: "menunjukkan", isIrregular: false },
    { infinitive: "anfangen", partizip2: "hat angefangen", meaning: "mulai", isIrregular: true },
    { infinitive: "singen", partizip2: "hat gesungen", meaning: "bernyanyi", isIrregular: true },
    { infinitive: "weiterspielen", partizip2: "hat weitergespielt", meaning: "terus bermain", isIrregular: false },
    { infinitive: "sich bedanken", partizip2: "hat sich bedankt", meaning: "berterima kasih", isIrregular: false },
    { infinitive: "warten", partizip2: "hat gewartet", meaning: "menunggu", isIrregular: false },
    { infinitive: "einschlafen", partizip2: "ist eingeschlafen", meaning: "tertidur", isIrregular: true },
    { infinitive: "verschlafen", partizip2: "hat verschlafen", meaning: "kesiangan/tertidur", isIrregular: true },
    { infinitive: "verpassen", partizip2: "hat verpasst", meaning: "melewatkan", isIrregular: false },
    { infinitive: "bestätigen", partizip2: "hat bestätigt", meaning: "mengonfirmasi", isIrregular: false },
    { infinitive: "bekommen", partizip2: "hat bekommen", meaning: "mendapatkan", isIrregular: true },
    { infinitive: "malen", partizip2: "hat gemalt", meaning: "melukis", isIrregular: false },
    { infinitive: "abmalen", partizip2: "hat abgemalt", meaning: "menyalin/melukis dari contoh", isIrregular: false },
    { infinitive: "beschreiben", partizip2: "hat beschrieben", meaning: "mendeskripsikan", isIrregular: true },
    { infinitive: "auswählen", partizip2: "hat ausgewählt", meaning: "memilih", isIrregular: false },
    { infinitive: "hängen", partizip2: "hat gehangen", meaning: "tergantung", isIrregular: true },
    { infinitive: "stehen", partizip2: "hat gestanden", meaning: "berdiri", isIrregular: true },
    { infinitive: "liegen", partizip2: "hat gelegen", meaning: "terletak/berbaring", isIrregular: true },
    { infinitive: "sich ärgern", partizip2: "hat sich geärgert", meaning: "kesal", isIrregular: false },
    { infinitive: "wirken", partizip2: "hat gewirkt", meaning: "memberi kesan", isIrregular: false },
    { infinitive: "auffallen", partizip2: "ist aufgefallen", meaning: "menarik perhatian", isIrregular: true },
    { infinitive: "erhalten", partizip2: "hat erhalten", meaning: "menerima", isIrregular: true },
    { infinitive: "spielen", partizip2: "hat gespielt", meaning: "bermain", isIrregular: false },
    { infinitive: "laufen", partizip2: "ist gelaufen", meaning: "berjalan/berlari", isIrregular: true },
    { infinitive: "stimmen", partizip2: "hat gestimmt", meaning: "benar/cocok", isIrregular: false },
    { infinitive: "streichen", partizip2: "hat gestrichen", meaning: "mencoret", isIrregular: true },
    { infinitive: "kreuzen", partizip2: "hat gekreuzt", meaning: "menyilang", isIrregular: false },
    { infinitive: "ankreuzen", partizip2: "hat angekreuzt", meaning: "memberi tanda silang", isIrregular: false },
    { infinitive: "wählen", partizip2: "hat gewählt", meaning: "memilih", isIrregular: false },
    { infinitive: "öffnen", partizip2: "hat geöffnet", meaning: "membuka", isIrregular: false },
    { infinitive: "schließen", partizip2: "hat geschlossen", meaning: "menutup", isIrregular: true },
    { infinitive: "rechnen", partizip2: "hat gerechnet", meaning: "menghitung", isIrregular: false },
    { infinitive: "kosten", partizip2: "hat gekostet", meaning: "berharga", isIrregular: false },
    { infinitive: "reservieren", partizip2: "hat reserviert", meaning: "memesan", isIrregular: false },
    { infinitive: "liefern", partizip2: "hat geliefert", meaning: "mengirimkan", isIrregular: false },
    { infinitive: "ausfüllen", partizip2: "hat ausgefüllt", meaning: "mengisi formulir", isIrregular: false },
    { infinitive: "anklicken", partizip2: "hat angeklickt", meaning: "mengeklik", isIrregular: false },
    { infinitive: "zustimmen", partizip2: "hat zugestimmt", meaning: "menyetujui", isIrregular: false },
    { infinitive: "ablehnen", partizip2: "hat abgelehnt", meaning: "menolak", isIrregular: false },
    { infinitive: "berichten", partizip2: "hat berichtet", meaning: "melaporkan", isIrregular: false },
    { infinitive: "diktieren", partizip2: "hat diktiert", meaning: "mendikte", isIrregular: false },
    { infinitive: "unterscheiden", partizip2: "hat unterschieden", meaning: "membedakan", isIrregular: true }
  ],
  grammarRules: [
    {
      title: "Indefinitpronomen",
      description: "Die Pronomen man, jemand und niemand stehen für Personen. Sie verwendet man immer im Singular. Die Pronomen alles, etwas/was und nichts stehen für Sachen.",
      examples: [
        "Kann mir bitte jemand helfen?",
        "Hast du schon jemanden gesehen?",
        "Nein, es ist noch niemand auf der Bühne.",
        "Man kann gar nichts verstehen.",
        "Hast du alles gepackt?",
        "Willst du etwas essen?"
      ]
    },
    {
      title: "Relativsätze im Nominativ",
      description: "Relativsätze geben genauere Informationen zu Personen oder Dingen. Die Relativpronomen im Nominativ haben die gleichen Formen wie die bestimmten Artikel im Nominativ (der, das, die, die).",
      examples: [
        "Peter Veit ist ein Radiosprecher, der eingeschlafen ist.",
        "Karl T. ist ein Sammler, der ein Bild gekauft hat.",
        "Auf der Bühne war eine Sängerin, die keine Stimme mehr hatte.",
        "Es waren die Fans, die fast alle Lieder gesungen haben.",
        "Das ist das Kind, das sehr nett ist."
      ]
    },
    {
      title: "Relativsätze im Akkusativ",
      description: "Die Relativpronomen im Akkusativ haben die gleichen Formen wie die bestimmten Artikel im Akkusativ (den, das, die, die). Der Relativsatz steht direkt hinter oder nah beim Bezugswort.",
      examples: [
        "Peter Veit ist ein Radiosprecher, den viele Leute kennen.",
        "Das ist das Bild, das ich gekauft habe.",
        "Ich habe das Bild gekauft, das hier hängt.",
        "Das Bild, das „Sommer“ heißt, kaufe ich."
      ]
    }
  ],
  redemittel: [
    {
      category: "Über ein Bild sprechen",
      phrases: [
        { german: "Das Bild heißt...", indonesian: "Gambar itu berjudul..." },
        { german: "Der Maler heißt...", indonesian: "Pelukisnya bernama..." },
        { german: "Das Bild ist im Jahr ... gemalt.", indonesian: "Gambar itu dilukis pada tahun..." },
        { german: "Auf dem Bild sieht man...", indonesian: "Pada gambar itu terlihat..." },
        { german: "Im Hintergrund / Im Vordergrund gibt es...", indonesian: "Di latar belakang / depan ada..." },
        { german: "Mir gefällt das Bild, weil...", indonesian: "Saya suka gambar itu, karena..." }
      ]
    },
    {
      category: "Eine Band / einen Musiker vorstellen",
      phrases: [
        { german: "Die Sängerin heißt...", indonesian: "Penyanyinya bernama..." },
        { german: "Die Band kommt aus...", indonesian: "Band itu berasal dari..." },
        { german: "Die Band besteht aus ... Mitgliedern.", indonesian: "Band itu terdiri dari ... anggota." },
        { german: "Ihr bekanntestes Lied ist...", indonesian: "Lagu mereka yang paling terkenal adalah..." }
      ]
    }
  ]
};

export default function Kapitel12Page() {
  const kapitelId = 'kapitel-12';
  kapitel.stats.vocabularyCount = kapitel.wortschatz.length;
  kapitel.stats.partizip2Count = kapitel.partizip2.length;

  const wortschatz = kapitel.wortschatz.map((w: any) => ({
    de: w.word,
    plural: w.plural,
    id: w.meaning,
    beispiel: "-",
    kategorie: w.category
  }));

  const partizipZwei = kapitel.partizip2.map((p: any) => {
    const parts = p.partizip2.split(" ");
    let hilfsverb = "haben";
    let partizip = p.partizip2;
    if (parts.length > 1 && (parts[0] === "hat" || parts[0] === "ist")) {
      hilfsverb = parts[0] === "ist" ? "sein" : "haben";
      partizip = parts.slice(1).join(" ");
    }
    return {
      infinitiv: p.infinitive,
      partizip: partizip,
      hilfsverb: hilfsverb,
      id: p.meaning
    };
  });

  const grammatik = kapitel.grammarRules.map(rule => ({
    titel: rule.title,
    farbe: "bg-blue-500",
    struktur: rule.description,
    konjugationsTabelle: null,
    beispiele: rule.examples.map(ex => ({ satz: ex, terjemahan: "" }))
  }));

  const goetheTasks: any[] = [];
  const lernTipps: any[] = [];
  const miniQuiz: any[] = [];

  return (
    <ChapterTemplate 
      kapitel={kapitel} 
      kapitelId={kapitelId}
      wortschatz={wortschatz}
      partizipZwei={partizipZwei}
      grammatik={grammatik}
      goetheTasks={goetheTasks}
      lernTipps={lernTipps}
      miniQuiz={miniQuiz}
      TestComponent={<KapitelTest12 />}
      LesenComponent={<LesenInteraktiv12 />}
      HorenComponent={<HorenInteraktiv12 />}
      SchreibenComponent={<UebungInteraktiv12 />}
      GrammatikInteraktivComponent={<GrammatikInteraktiv12 />}
    />
  );
}
