"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import ChapterTemplate from '../components/ChapterTemplate';
import KapitelTest11 from '../KapitelTest11';
import LesenInteraktiv11 from '../LesenInteraktiv11';
import HorenInteraktiv11 from '../HorenInteraktiv11';
import UebungInteraktiv11 from '../UebungInteraktiv11';
import GrammatikInteraktiv11 from '../GrammatikInteraktiv11';

const kapitel = {
  nummer: 11,
  titel: "Wie die Zeit vergeht!",
  untertitel: "Leben, Erinnerungen & Wünsche",
  level: "A2",
  goetheFokus: ["Lesen", "Hören", "Schreiben", "Sprechen"],
  source: "Netzwerk neu A2.2",
  estimatedDays: 14,
  beschreibung: "Dalam bab ini, kamu akan belajar cara mendeskripsikan masa lalu, mengungkapkan keinginan dan dugaan, serta membicarakan waktu dan memori. Kamu akan menguasai penggunaan Konjunktiv II dan kata kerja dengan preposisi.",
  skills: ["Lesen", "Hören", "Schreiben", "Sprechen"],
  badges: ["Level A2", "Kapitel 11", "Netzwerk Neu", "Goethe Ready"],
  learningObjectives: [
    "Über Lebensphasen und Aktivitäten sprechen.",
    "Aussagen über Zeitprobleme verstehen.",
    "Wünsche mit Konjunktiv II äußern.",
    "Ratschläge mit würde, könnte dan sollte geben.",
    "Gemeinsam etwas planen.",
    "Um etwas bitten, zustimmen, ablehnen, nachfragen.",
    "Verben mit Präposition verwenden.",
    "W-Fragen mit Präposition bilden.",
    "Texte aus dem Kontext erschließen.",
    "Über ein einfaches Leben sprechen.",
    "Über Sprichwörter zum Thema Zeit sprechen.",
    "Satzakzent für wichtige Informationen üben.",
    "Wortschatz, Artikel, Plural und Partizip II aktiv beherrschen."
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
    title: "Rencana Belajar 2 Hari — Kapitel 11",
    days: 2,
    content: "Hari 1: Wortschatz Zeit, Lebensphasen, Aktivitäten, Wünsche mit Konjunktiv II, Zeitprobleme, Stress, Ratschläge, Partizip II. Hari 2: Kajak-Ausflug, gemeinsam planen, Verben mit Präposition, W-Fragen mit Präposition, Satzakzent, Leben wie damals, Sprichwörter, Netzwerk-WG, Review dan Final Quiz."
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
    { word: "die Zeit", plural: "die Zeiten", meaning: "waktu", category: "Zeit", article: "die" },
    { word: "das Leben", plural: "die Leben", meaning: "kehidupan", category: "Lebensphasen", article: "das" },
    { word: "die Freizeit", plural: "Sg.", meaning: "waktu luang", category: "Zeit", article: "die" },
    { word: "der Werktag", plural: "die Werktage", meaning: "hari kerja", category: "Zeit", article: "der" },
    { word: "das Wochenende", plural: "die Wochenenden", meaning: "akhir pekan", category: "Zeit", article: "das" },
    { word: "die Schulzeit", plural: "Sg.", meaning: "masa sekolah", category: "Lebensphasen", article: "die" },
    { word: "die Ausbildung", plural: "die Ausbildungen", meaning: "pendidikan/pelatihan kerja", category: "Lebensphasen", article: "die" },
    { word: "das Studium", plural: "die Studien", meaning: "studi/kuliah", category: "Lebensphasen", article: "das" },
    { word: "der Beruf", plural: "die Berufe", meaning: "profesi", category: "Lebensphasen", article: "der" },
    { word: "das Berufsleben", plural: "Sg.", meaning: "kehidupan kerja", category: "Lebensphasen", article: "das" },
    { word: "die Familie", plural: "die Familien", meaning: "keluarga", category: "Lebensphasen", article: "die" },
    { word: "die Ehe", plural: "die Ehen", meaning: "pernikahan", category: "Lebensphasen", article: "die" },
    { word: "die Hausfrau", plural: "die Hausfrauen", meaning: "ibu rumah tangga", category: "Lebensphasen", article: "die" },
    { word: "der Hausmann", plural: "die Hausmänner", meaning: "bapak rumah tangga", category: "Lebensphasen", article: "der" },
    { word: "der Rentner", plural: "die Rentner", meaning: "pensiunan laki-laki", category: "Lebensphasen", article: "der" },
    { word: "die Rentnerin", plural: "die Rentnerinnen", meaning: "pensiunan perempuan", category: "Lebensphasen", article: "die" },
    { word: "der Enkel", plural: "die Enkel", meaning: "cucu laki-laki", category: "Familie", article: "der" },
    { word: "die Enkelin", plural: "die Enkelinnen", meaning: "cucu perempuan", category: "Familie", article: "die" },
    { word: "der Freund", plural: "die Freunde", meaning: "teman laki-laki", category: "Sozialleben", article: "der" },
    { word: "die Freundin", plural: "die Freundinnen", meaning: "teman perempuan", category: "Sozialleben", article: "die" },
    { word: "die Bibliothek", plural: "die Bibliotheken", meaning: "perpustakaan", category: "Lernen", article: "die" },
    { word: "die Hausaufgabe", plural: "die Hausaufgaben", meaning: "pekerjaan rumah", category: "Lernen", article: "die" },
    { word: "die Reise", plural: "die Reisen", meaning: "perjalanan", category: "Freizeit", article: "die" },
    { word: "der Ausflug", plural: "die Ausflüge", meaning: "perjalanan singkat", category: "Freizeit", article: "der" },
    { word: "das Konzert", plural: "die Konzerte", meaning: "konser", category: "Freizeit", article: "das" },
    { word: "das Hobby", plural: "die Hobbys", meaning: "hobi", category: "Freizeit", article: "das" },
    
    { word: "der Stress", plural: "Sg.", meaning: "stres", category: "Stress", article: "der" },
    { word: "der Bereich", plural: "die Bereiche", meaning: "bidang", category: "Arbeit", article: "der" },
    { word: "der Import", plural: "Sg.", meaning: "impor", category: "Arbeit", article: "der" },
    { word: "der Export", plural: "Sg.", meaning: "ekspor", category: "Arbeit", article: "der" },
    { word: "der Stau", plural: "die Staus", meaning: "kemacetan", category: "Zeitproblem", article: "der" },
    { word: "das Büro", plural: "die Büros", meaning: "kantor", category: "Arbeit", article: "das" },
    { word: "der Kollege", plural: "die Kollegen", meaning: "rekan kerja laki-laki", category: "Arbeit", article: "der" },
    { word: "die Kollegin", plural: "die Kolleginnen", meaning: "rekan kerja perempuan", category: "Arbeit", article: "die" },
    { word: "das Projekt", plural: "die Projekte", meaning: "proyek", category: "Arbeit", article: "das" },
    { word: "die Frist", plural: "die Fristen", meaning: "tenggat waktu", category: "Arbeit", article: "die" },
    { word: "der Chef", plural: "die Chefs", meaning: "bos laki-laki", category: "Arbeit", article: "der" },
    { word: "die Chefin", plural: "die Chefinnen", meaning: "bos perempuan", category: "Arbeit", article: "die" },
    { word: "die Aufgabe", plural: "die Aufgaben", meaning: "tugas", category: "Arbeit", article: "die" },
    { word: "die Stelle", plural: "die Stellen", meaning: "posisi kerja", category: "Arbeit", article: "die" },
    { word: "die Verabredung", plural: "die Verabredungen", meaning: "janji/pertemuan", category: "Freizeit", article: "die" },
    { word: "die Nachricht", plural: "die Nachrichten", meaning: "pesan", category: "Alltag", article: "die" },
    { word: "der Rücken", plural: "die Rücken", meaning: "punggung", category: "Gesundheit", article: "der" },
    { word: "der Schreibtisch", plural: "die Schreibtische", meaning: "meja kerja", category: "Arbeit", article: "der" },

    { word: "der Bauernhof", plural: "die Bauernhöfe", meaning: "rumah pertanian", category: "Leben damals", article: "der" },
    { word: "der Schwarzwald", plural: "Sg.", meaning: "Black Forest", category: "Ort", article: "der" },
    { word: "das Gefühl", plural: "die Gefühle", meaning: "perasaan", category: "Leben", article: "das" },
    { word: "das Dorf", plural: "die Dörfer", meaning: "desa", category: "Ort", article: "das" },
    { word: "der Hof", plural: "die Höfe", meaning: "halaman/lahan pertanian", category: "Bauernhof", article: "der" },
    { word: "das Obst", plural: "Sg.", meaning: "buah", category: "Essen", article: "das" },
    { word: "das Gemüse", plural: "Sg.", meaning: "sayuran", category: "Essen", article: "das" },
    { word: "das Fleisch", plural: "Sg.", meaning: "daging", category: "Essen", article: "das" },
    { word: "das Brot", plural: "die Brote", meaning: "roti", category: "Essen", article: "das" },
    { word: "die Kutsche", plural: "die Kutschen", meaning: "kereta kuda", category: "Transport", article: "die" },
    { word: "das Fahrrad", plural: "die Fahrräder", meaning: "sepeda", category: "Transport", article: "das" },
    { word: "der Raum", plural: "die Räume", meaning: "ruangan", category: "Haus", article: "der" },
    { word: "das Möbel", plural: "die Möbel", meaning: "perabot", category: "Haus", article: "das" },
    { word: "die Waschmaschine", plural: "die Waschmaschinen", meaning: "mesin cuci", category: "Haushalt", article: "die" },
    { word: "das Holz", plural: "Sg.", meaning: "kayu", category: "Haushalt", article: "das" },
    { word: "das Feuer", plural: "die Feuer", meaning: "api", category: "Haushalt", article: "das" },
    { word: "das Gas", plural: "die Gase", meaning: "gas", category: "Haushalt", article: "das" },
    { word: "die Heizung", plural: "die Heizungen", meaning: "pemanas", category: "Haushalt", article: "die" },
    { word: "der Strom", plural: "Sg.", meaning: "listrik", category: "Haushalt", article: "der" },
    { word: "der Fernseher", plural: "die Fernseher", meaning: "televisi", category: "Technik", article: "der" },
    { word: "das Handy", plural: "die Handys", meaning: "HP", category: "Technik", article: "das" },
    { word: "der Notfall", plural: "die Notfälle", meaning: "keadaan darurat", category: "Sicherheit", article: "der" },
    { word: "der Computer", plural: "die Computer", meaning: "komputer", category: "Technik", article: "der" },
    { word: "das Internet", plural: "Sg.", meaning: "internet", category: "Technik", article: "das" },
    { word: "der Blog", plural: "die Blogs", meaning: "blog", category: "Medien", article: "der" },
    { word: "der Luxus", plural: "Sg.", meaning: "kemewahan", category: "Leben", article: "der" },
    { word: "die Unterkunft", plural: "die Unterkünfte", meaning: "akomodasi", category: "Reisen", article: "die" },
    { word: "das Einkaufszentrum", plural: "die Einkaufszentren", meaning: "pusat belanja", category: "Alltag", article: "das" },
    { word: "die Hektik", plural: "Sg.", meaning: "kesibukan/hektik", category: "Alltag", article: "die" },
    { word: "der Helfer", plural: "die Helfer", meaning: "penolong laki-laki", category: "Hilfe", article: "der" },
    { word: "die Helferin", plural: "die Helferinnen", meaning: "penolong perempuan", category: "Hilfe", article: "die" },

    { word: "das Sprichwort", plural: "die Sprichwörter", meaning: "peribahasa", category: "Sprichwort", article: "das" },
    { word: "die Erklärung", plural: "die Erklärungen", meaning: "penjelasan", category: "Sprichwort", article: "die" },
    { word: "das Gold", plural: "Sg.", meaning: "emas", category: "Sprichwort", article: "das" },
    { word: "der Rat", plural: "Sg.", meaning: "nasihat", category: "Sprichwort", article: "der" },
    { word: "die Wunde", plural: "die Wunden", meaning: "luka", category: "Sprichwort", article: "die" },
    { word: "die Weile", plural: "Sg.", meaning: "beberapa waktu", category: "Sprichwort", article: "die" }
  ],
  partizip2: [
    { infinitive: "vergehen", partizip2: "ist vergangen", meaning: "berlalu", isIrregular: true },
    { infinitive: "anmelden", partizip2: "hat angemeldet", meaning: "mendaftar", isIrregular: false },
    { infinitive: "sein", partizip2: "ist gewesen", meaning: "berada/menjadi", isIrregular: true },
    { infinitive: "haben", partizip2: "hat gehabt", meaning: "mempunyai", isIrregular: false },
    { infinitive: "werden", partizip2: "ist geworden", meaning: "menjadi", isIrregular: true },
    { infinitive: "gehen", partizip2: "ist gegangen", meaning: "pergi", isIrregular: true },
    { infinitive: "arbeiten", partizip2: "hat gearbeitet", meaning: "bekerja", isIrregular: false },
    { infinitive: "machen", partizip2: "hat gemacht", meaning: "melakukan", isIrregular: false },
    { infinitive: "verreisen", partizip2: "ist verreist", meaning: "bepergian", isIrregular: false },
    { infinitive: "spielen", partizip2: "hat gespielt", meaning: "bermain", isIrregular: false },
    { infinitive: "verbringen", partizip2: "hat verbracht", meaning: "menghabiskan", isIrregular: true },
    { infinitive: "vergleichen", partizip2: "hat verglichen", meaning: "membandingkan", isIrregular: true },
    { infinitive: "notieren", partizip2: "hat notiert", meaning: "mencatat", isIrregular: false },
    { infinitive: "hören", partizip2: "hat gehört", meaning: "mendengar", isIrregular: false },
    { infinitive: "unternehmen", partizip2: "hat unternommen", meaning: "melakukan kegiatan", isIrregular: true },
    { infinitive: "reisen", partizip2: "ist gereist", meaning: "bepergian", isIrregular: false },
    { infinitive: "lesen", partizip2: "hat gelesen", meaning: "membaca", isIrregular: true },
    { infinitive: "schlafen", partizip2: "hat geschlafen", meaning: "tidur", isIrregular: true },
    { infinitive: "besuchen", partizip2: "hat besucht", meaning: "mengunjungi", isIrregular: false },
    { infinitive: "diskutieren", partizip2: "hat diskutiert", meaning: "berdiskusi", isIrregular: false },
    { infinitive: "kommen", partizip2: "ist gekommen", meaning: "datang", isIrregular: true },
    { infinitive: "hereinkommen", partizip2: "ist hereingekommen", meaning: "masuk", isIrregular: true },
    { infinitive: "erledigen", partizip2: "hat erledigt", meaning: "menyelesaikan", isIrregular: false },
    { infinitive: "entlassen", partizip2: "hat entlassen", meaning: "memecat", isIrregular: true },
    { infinitive: "behalten", partizip2: "hat behalten", meaning: "mempertahankan", isIrregular: true },
    { infinitive: "verschieben", partizip2: "hat verschoben", meaning: "menunda", isIrregular: true },
    { infinitive: "klingeln", partizip2: "hat geklingelt", meaning: "berdering", isIrregular: false },
    { infinitive: "ausschalten", partizip2: "hat ausgeschaltet", meaning: "mematikan", isIrregular: false },
    { infinitive: "schimpfen", partizip2: "hat geschimpft", meaning: "memarahi/mengeluh", isIrregular: false },
    { infinitive: "bekommen", partizip2: "hat bekommen", meaning: "mendapatkan", isIrregular: true },
    { infinitive: "planen", partizip2: "hat geplant", meaning: "merencanakan", isIrregular: false },
    { infinitive: "kaufen", partizip2: "hat gekauft", meaning: "membeli", isIrregular: false },
    { infinitive: "reservieren", partizip2: "hat reserviert", meaning: "memesan", isIrregular: false },
    { infinitive: "anrufen", partizip2: "hat angerufen", meaning: "menelepon", isIrregular: true },
    { infinitive: "mitbringen", partizip2: "hat mitgebracht", meaning: "membawa serta", isIrregular: true },
    { infinitive: "mitnehmen", partizip2: "hat mitgenommen", meaning: "membawa", isIrregular: true },
    { infinitive: "backen", partizip2: "hat gebacken", meaning: "memanggang", isIrregular: true },
    { infinitive: "sich kümmern", partizip2: "hat sich gekümmert", meaning: "mengurus", isIrregular: false },
    { infinitive: "sich freuen", partizip2: "hat sich gefreut", meaning: "merasa senang", isIrregular: false },
    { infinitive: "sich erinnern", partizip2: "hat sich erinnert", meaning: "mengingat", isIrregular: false },
    { infinitive: "warten", partizip2: "hat gewartet", meaning: "menunggu", isIrregular: false },
    { infinitive: "sprechen", partizip2: "hat gesprochen", meaning: "berbicara", isIrregular: true },
    { infinitive: "sich vorbereiten", partizip2: "hat sich vorbereitet", meaning: "mempersiapkan diri", isIrregular: false },
    { infinitive: "sich ärgern", partizip2: "hat sich geärgert", meaning: "kesal", isIrregular: false },
    { infinitive: "fragen", partizip2: "hat gefragt", meaning: "bertanya", isIrregular: false },
    { infinitive: "schreiben", partizip2: "hat geschrieben", meaning: "menulis", isIrregular: true },
    { infinitive: "zusammenfassen", partizip2: "hat zusammengefasst", meaning: "merangkum", isIrregular: false },
    { infinitive: "betonen", partizip2: "hat betont", meaning: "menekankan", isIrregular: false },
    { infinitive: "vermuten", partizip2: "hat vermutet", meaning: "menduga", isIrregular: false },
    { infinitive: "fehlen", partizip2: "hat gefehlt", meaning: "tidak ada/kurang", isIrregular: false },
    { infinitive: "entscheiden", partizip2: "hat entschieden", meaning: "memutuskan", isIrregular: true },
    { infinitive: "verkaufen", partizip2: "hat verkauft", meaning: "menjual", isIrregular: false },
    { infinitive: "produzieren", partizip2: "hat produziert", meaning: "memproduksi", isIrregular: false },
    { infinitive: "einkaufen", partizip2: "hat eingekauft", meaning: "berbelanja", isIrregular: false },
    { infinitive: "berichten", partizip2: "hat berichtet", meaning: "melaporkan", isIrregular: false },
    { infinitive: "genießen", partizip2: "hat genossen", meaning: "menikmati", isIrregular: true },
    { infinitive: "schaffen", partizip2: "hat geschafft", meaning: "berhasil/membuat", isIrregular: false },
    { infinitive: "heilen", partizip2: "hat geheilt", meaning: "menyembuhkan", isIrregular: false },
    { infinitive: "packen", partizip2: "hat gepackt", meaning: "mengepak", isIrregular: false },
    { infinitive: "putzen", partizip2: "hat geputzt", meaning: "membersihkan", isIrregular: false },
    { infinitive: "liegen", partizip2: "hat gelegen", meaning: "berbaring/terletak", isIrregular: true },
    { infinitive: "lernen", partizip2: "hat gelernt", meaning: "belajar", isIrregular: false },
    { infinitive: "beginnen", partizip2: "hat begonnen", meaning: "memulai", isIrregular: true },
    { infinitive: "kennenlernen", partizip2: "hat kennengelernt", meaning: "mengenal", isIrregular: false },
    { infinitive: "heiraten", partizip2: "hat geheiratet", meaning: "menikah", isIrregular: false },
    { infinitive: "bauen", partizip2: "hat gebaut", meaning: "membangun", isIrregular: false },
    { infinitive: "einrichten", partizip2: "hat eingerichtet", meaning: "menata/mengatur", isIrregular: false },
    { infinitive: "sparen", partizip2: "hat gespart", meaning: "menabung", isIrregular: false },
    { infinitive: "sich verletzen", partizip2: "hat sich verletzt", meaning: "terluka", isIrregular: false },
    { infinitive: "bremsen", partizip2: "hat gebremst", meaning: "mengerem", isIrregular: false },
    { infinitive: "tanken", partizip2: "hat getankt", meaning: "mengisi bensin", isIrregular: false },
    { infinitive: "bluten", partizip2: "hat geblutet", meaning: "berdarah", isIrregular: false },
    { infinitive: "sich ausruhen", partizip2: "hat sich ausgeruht", meaning: "beristirahat", isIrregular: false },
    { infinitive: "ausleihen", partizip2: "hat ausgeliehen", meaning: "meminjam", isIrregular: true },
    { infinitive: "sich unterhalten", partizip2: "hat sich unterhalten", meaning: "berbincang", isIrregular: true },
    { infinitive: "denken", partizip2: "hat gedacht", meaning: "berpikir", isIrregular: true },
    { infinitive: "sich interessieren", partizip2: "hat sich interessiert", meaning: "tertarik", isIrregular: false },
    { infinitive: "verzichten", partizip2: "hat verzichtet", meaning: "melepaskan/tidak memakai", isIrregular: false },
    { infinitive: "träumen", partizip2: "hat geträumt", meaning: "bermimpi", isIrregular: false },
    { infinitive: "besitzen", partizip2: "hat besessen", meaning: "memiliki", isIrregular: true },
    { infinitive: "bieten", partizip2: "hat geboten", meaning: "menawarkan", isIrregular: true },
    { infinitive: "besorgen", partizip2: "hat besorgt", meaning: "mengurus/membeli", isIrregular: false },
    { infinitive: "brechen", partizip2: "ist gebrochen", meaning: "pecah", isIrregular: true },
    { infinitive: "reparieren", partizip2: "hat repariert", meaning: "memperbaiki", isIrregular: false },
    { infinitive: "heizen", partizip2: "hat geheizt", meaning: "memanaskan", isIrregular: false }
  ],
  grammarRules: [
    {
      id: "konjunktiv2",
      title: "Konjunktiv II: Wünsche äußern",
      description: "Konjunktiv II digunakan untuk menyatakan keinginan, permintaan sopan, atau situasi yang tidak nyata / belum terjadi. Sering digunakan dengan kata 'gern'.",
      examples: [
        "Ich hätte gern mehr Zeit.",
        "Ich wäre gern öfter zu Hause.",
        "Wir würden gern unsere Freunde treffen."
      ]
    },
    {
      id: "verben-mit-praeposition",
      title: "Verben mit Präposition",
      description: "Banyak kata kerja dalam bahasa Jerman yang selalu diikuti oleh preposisi tertentu. Anda harus menghafal kombinasi kata kerja dan preposisinya.",
      examples: [
        "Wir freuen uns auf dich. (sich freuen auf + Akk.)",
        "Er erinnert sich an den Ausflug. (sich erinnern an + Akk.)",
        "Sie spricht mit mir. (sprechen mit + Dat.)"
      ]
    },
    {
      id: "w-fragen-praeposition",
      title: "W-Fragen mit Präposition",
      description: "Untuk bertanya tentang DINGE/BENDA gunakan: wo(r) + Präposition (Contoh: Worüber? Worauf?). Untuk bertanya tentang ORANG gunakan: Präposition + wen/wem (Contoh: Über wen? Mit wem?).",
      examples: [
        "Worüber ärgert er sich? – Er ärgert sich über die Prüfung. (Dinge)",
        "Über wen ärgert er sich? – Über Ben. (Person)",
        "Woran erinnert er sich? – An den Ausflug. (Dinge)"
      ]
    }
  ],
  redemittel: [
    {
      category: "Wünsche äußern",
      phrases: [
        { german: "Ich hätte gern mehr Zeit.", indonesian: "Saya ingin punya lebih banyak waktu." },
        { german: "Ich wäre gern mehr mit Freunden zusammen.", indonesian: "Saya ingin lebih sering bersama teman." },
        { german: "Er würde gern mehr lesen.", indonesian: "Dia ingin lebih banyak membaca." }
      ]
    },
    {
      category: "Ratschläge geben",
      phrases: [
        { german: "Ich würde mit dem Chef sprechen.", indonesian: "Saya akan berbicara dengan bos." },
        { german: "An deiner Stelle würde ich mit der U-Bahn fahren.", indonesian: "Jika aku jadi kamu, aku akan naik kereta bawah tanah." },
        { german: "Du solltest dich am Wochenende ausruhen.", indonesian: "Kamu seharusnya beristirahat di akhir pekan." }
      ]
    },
    {
      category: "Gemeinsam planen: Vorschlag machen",
      phrases: [
        { german: "Wollen wir am Samstag einen Kajak-Ausflug machen?", indonesian: "Apakah kita ingin wisata kayak hari Sabtu?" },
        { german: "Wir könnten doch auch ...", indonesian: "Kita juga bisa saja..." },
        { german: "Ich habe eine Idee: ...", indonesian: "Aku punya ide: ..." }
      ]
    },
    {
      category: "Gemeinsam planen: Um etwas bitten & Zustimmen",
      phrases: [
        { german: "Könntest du dich um die Tickets kümmern?", indonesian: "Bisakah kamu mengurus tiketnya?" },
        { german: "Würdest du bitte Ben anrufen?", indonesian: "Maukah kamu menelepon Ben?" },
        { german: "Klar, gern.", indonesian: "Tentu saja, dengan senang hati." },
        { german: "Ja, das wäre super.", indonesian: "Ya, itu ide yang bagus sekali." }
      ]
    }
  ]
};

export default function Kapitel11() {
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
      kapitelId="kapitel-11"
      kapitel={kapitel}
      wortschatz={wortschatz}
      partizipZwei={partizipZwei}
      grammatik={grammatik}
      goetheTasks={goetheTasks}
      lernTipps={lernTipps}
      miniQuiz={miniQuiz}
      LesenComponent={<LesenInteraktiv11 />}
      HorenComponent={<HorenInteraktiv11 />}
      SchreibenComponent={<UebungInteraktiv11 />}
      GrammatikInteraktivComponent={<GrammatikInteraktiv11 />}
      TestComponent={<KapitelTest11 />}
    />
  );
}
