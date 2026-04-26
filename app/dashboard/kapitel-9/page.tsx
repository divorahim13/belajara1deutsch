'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import ChapterTemplate from '../components/ChapterTemplate';
import KapitelTest9 from '../KapitelTest9';
import LesenInteraktiv9 from '../LesenInteraktiv9';
import HorenInteraktiv9 from '../HorenInteraktiv9';
import UebungInteraktiv9 from '../UebungInteraktiv9';
import GrammatikInteraktiv9 from '../GrammatikInteraktiv9';

const kapitel = {
  nummer: 9,
  titel: 'Sportlich, sportlich',
  untertitel: 'Sportarten, Fans, Gefühle, Kommentare, Vorschläge, Dativ/Akkusativ und Reiseziele',
  level: 'A2',
  goetheFokus: ['Lesen', 'Hören', 'Schreiben', 'Sprechen'],
  beschreibung: "Belajar berbicara tentang olahraga dan hobi, mengungkapkan antusiasme, harapan, dan kekecewaan, memahami dan menulis komentar, menyatakan akibat dan pertentangan dengan deshalb dan trotzdem, membuat dan merespons usulan, memahami verba dengan Dativ dan Akkusativ, serta memperkenalkan tempat wisata olahraga."
};

const wortschatz = [
  // Sportarten und Sport machen
  { de: 'die Sportart', plural: '-en', id: 'jenis olahraga', beispiel: 'Welche Sportart magst du?', kategorie: 'Sport' },
  { de: 'der Sportverein', plural: '-e', id: 'klub olahraga', beispiel: 'Ich bin in einem Sportverein.', kategorie: 'Sport' },
  { de: 'der Sportler', plural: '-', id: 'atlet laki-laki', beispiel: 'Er ist ein guter Sportler.', kategorie: 'Sport' },
  { de: 'die Sportlerin', plural: '-nen', id: 'atlet perempuan', beispiel: 'Sie ist eine tolle Sportlerin.', kategorie: 'Sport' },
  { de: 'der Wettbewerb', plural: '-e', id: 'kompetisi', beispiel: 'Wir gewinnen den Wettbewerb.', kategorie: 'Sport' },
  { de: 'der Kletterwettbewerb', plural: '-e', id: 'lomba panjat', beispiel: 'Heute ist ein Kletterwettbewerb.', kategorie: 'Sport' },
  { de: 'die Kondition', plural: '', id: 'stamina/kondisi fisik', beispiel: 'Meine Kondition ist schlecht.', kategorie: 'Sport' },
  { de: 'die Gesundheit', plural: '', id: 'kesehatan', beispiel: 'Sport ist gut für die Gesundheit.', kategorie: 'Sport' },
  { de: 'die Grenze', plural: '-n', id: 'batas kemampuan', beispiel: 'Ich kenne meine Grenzen.', kategorie: 'Sport' },
  { de: 'der Erfolg', plural: '-e', id: 'keberhasilan', beispiel: 'Wir hatten großen Erfolg.', kategorie: 'Sport' },
  { de: 'die Mannschaft', plural: '-en', id: 'tim', beispiel: 'Unsere Mannschaft ist die beste.', kategorie: 'Sport' },
  { de: 'das Team', plural: '-s', id: 'tim', beispiel: 'Wir sind ein starkes Team.', kategorie: 'Sport' },
  { de: 'das Spiel', plural: '-e', id: 'pertandingan', beispiel: 'Das Spiel beginnt gleich.', kategorie: 'Sport' },
  { de: 'das Tor', plural: '-e', id: 'gol', beispiel: 'Wir haben ein Tor geschossen.', kategorie: 'Sport' },
  { de: 'die Natur', plural: '', id: 'alam', beispiel: 'Ich bin gern in der Natur.', kategorie: 'Sport/Natur' },
  { de: 'die frische Luft', plural: '', id: 'udara segar', beispiel: 'Ich mag die frische Luft.', kategorie: 'Sport/Natur' },
  { de: 'die Cousine', plural: '-n', id: 'sepupu perempuan', beispiel: 'Meine Cousine spielt Tennis.', kategorie: 'Familie' },
  { de: 'der Cousin', plural: '-s', id: 'sepupu laki-laki', beispiel: 'Mein Cousin ist sportlich.', kategorie: 'Familie' },

  // Sportgeräte und Lieblingsdinge
  { de: 'das Paddel', plural: '-', id: 'dayung', beispiel: 'Ich brauche ein Paddel für das Kajak.', kategorie: 'Sportgerät' },
  { de: 'das Surfbrett', plural: '-er', id: 'papan selancar', beispiel: 'Mein Surfbrett ist neu.', kategorie: 'Sportgerät' },
  { de: 'das Mountainbike', plural: '-s', id: 'sepeda gunung', beispiel: 'Ich fahre gern Mountainbike.', kategorie: 'Sportgerät' },
  { de: 'der Schläger', plural: '-', id: 'raket/pemukul', beispiel: 'Ich brauche einen Tennisschläger.', kategorie: 'Sportgerät' },
  { de: 'der Skistock', plural: '"-e', id: 'tongkat ski', beispiel: 'Hast du deine Skistöcke?', kategorie: 'Sportgerät' },
  { de: 'der Volleyball', plural: '"-e', id: 'bola voli', beispiel: 'Wir spielen mit dem Volleyball.', kategorie: 'Sportgerät' },
  { de: 'der Fußballschuh', plural: '-e', id: 'sepatu bola', beispiel: 'Meine Fußballschuhe sind kaputt.', kategorie: 'Sportgerät' },
  { de: 'die Matte', plural: '-n', id: 'matras', beispiel: 'Für Yoga brauche ich eine Matte.', kategorie: 'Sportgerät' },
  { de: 'die Taucherbrille', plural: '-n', id: 'kacamata selam', beispiel: 'Die Taucherbrille ist wichtig.', kategorie: 'Sportgerät' },
  { de: 'der Klettergurt', plural: '-e', id: 'harness panjat', beispiel: 'Hast du deinen Klettergurt?', kategorie: 'Sportgerät' },
  { de: 'der Sportschuh', plural: '-e', id: 'sepatu olahraga', beispiel: 'Das sind gute Sportschuhe.', kategorie: 'Sportgerät' },
  { de: 'das Kajak', plural: '-s', id: 'kayak', beispiel: 'Ich fahre im Kajak.', kategorie: 'Sportgerät' },
  { de: 'das Kitesurfen', plural: '', id: 'kite surfing', beispiel: 'Kitesurfen ist toll.', kategorie: 'Sport' },
  { de: 'das Snowboard', plural: '-s', id: 'snowboard', beispiel: 'Er fährt Snowboard.', kategorie: 'Sportgerät' },
  { de: 'die Kette', plural: '-n', id: 'kalung/rantai', beispiel: 'Sie trägt eine schöne Kette.', kategorie: 'Hobby' },
  { de: 'das Material', plural: 'Materialien', id: 'bahan', beispiel: 'Das Material ist gut.', kategorie: 'Hobby' },
  { de: 'die Decke', plural: '-n', id: 'selimut', beispiel: 'Die Decke ist weich.', kategorie: 'Lieblingsding' },

  // Fans und Reiseziele
  { de: 'der Fan', plural: '-s', id: 'penggemar', beispiel: 'Er ist ein großer Fan.', kategorie: 'Fans' },
  { de: 'der Fußballfan', plural: '-s', id: 'penggemar sepak bola', beispiel: 'Die Fußballfans jubeln.', kategorie: 'Fans' },
  { de: 'der Fußballstar', plural: '-s', id: 'bintang sepak bola', beispiel: 'Er ist ein Fußballstar.', kategorie: 'Fans' },
  { de: 'der Fanartikel', plural: '-', id: 'merchandise fan', beispiel: 'Ich kaufe Fanartikel.', kategorie: 'Fans' },
  { de: 'der Schal', plural: '-s', id: 'syal', beispiel: 'Der Schal ist warm.', kategorie: 'Fans' },
  { de: 'das Stadion', plural: 'Stadien', id: 'stadion', beispiel: 'Wir gehen ins Stadion.', kategorie: 'Fans' },
  { de: 'das Vorbild', plural: '-er', id: 'panutan', beispiel: 'Er ist ein gutes Vorbild.', kategorie: 'Fans' },
  { de: 'der Kommentar', plural: '-e', id: 'komentar', beispiel: 'Er schreibt einen Kommentar.', kategorie: 'Fans' },
  { de: 'die Fanseite', plural: '-n', id: 'halaman fan', beispiel: 'Sie liest auf der Fanseite.', kategorie: 'Fans' },
  { de: 'die Hoffnung', plural: '-en', id: 'harapan', beispiel: 'Ich habe große Hoffnung.', kategorie: 'Gefühle' },
  { de: 'die Enttäuschung', plural: '-en', id: 'kekecewaan', beispiel: 'Die Enttäuschung war groß.', kategorie: 'Gefühle' },
  { de: 'die Katastrophe', plural: '-n', id: 'bencana', beispiel: 'Das Spiel war eine Katastrophe.', kategorie: 'Gefühle' },

  // Reiseziel Sport
  { de: 'der Nationalpark', plural: '-s', id: 'taman nasional', beispiel: 'Wir wandern im Nationalpark.', kategorie: 'Reise' },
  { de: 'die Sächsische Schweiz', plural: '', id: 'Swiss Saxon', beispiel: 'Die Sächsische Schweiz ist schön.', kategorie: 'Reise' },
  { de: 'die Elbe', plural: '', id: 'Sungai Elbe', beispiel: 'Die Elbe ist lang.', kategorie: 'Reise' },
  { de: 'der Wanderweg', plural: '-e', id: 'jalur hiking', beispiel: 'Der Wanderweg ist gut.', kategorie: 'Reise' },
  { de: 'das Gasthaus', plural: '"-er', id: 'penginapan/restoran tradisional', beispiel: 'Wir essen im Gasthaus.', kategorie: 'Reise' },
  { de: 'die Besucherin', plural: '-nen', id: 'pengunjung perempuan', beispiel: 'Die Besucherin fragt viel.', kategorie: 'Reise' },
  { de: 'die Kleidung', plural: '', id: 'pakaian', beispiel: 'Warme Kleidung ist wichtig.', kategorie: 'Reise' },
  { de: 'die Landschaft', plural: '-en', id: 'pemandangan alam', beispiel: 'Die Landschaft ist wunderbar.', kategorie: 'Reise' },
  { de: 'die Umgebung', plural: '-en', id: 'lingkungan sekitar', beispiel: 'Die Umgebung ist ruhig.', kategorie: 'Reise' },
  { de: 'die Seilbahn', plural: '-en', id: 'kereta gantung', beispiel: 'Wir fahren mit der Seilbahn.', kategorie: 'Reise' },
  { de: 'die Bergstation', plural: '-en', id: 'stasiun gunung', beispiel: 'Die Bergstation ist oben.', kategorie: 'Reise' },
  { de: 'die Strecke', plural: '-n', id: 'rute/jalur', beispiel: 'Die Strecke ist 2 km lang.', kategorie: 'Reise' },
  { de: 'die Anreise', plural: '-n', id: 'perjalanan menuju tempat', beispiel: 'Die Anreise dauert 2 Stunden.', kategorie: 'Reise' },
  { de: 'die Bergtour', plural: '-en', id: 'tur gunung', beispiel: 'Wir machen eine Bergtour.', kategorie: 'Reise' },
  { de: 'die Höhle', plural: '-n', id: 'gua', beispiel: 'Die Eishöhle ist kalt.', kategorie: 'Reise' },
  { de: 'die Temperatur', plural: '-en', id: 'suhu', beispiel: 'Die Temperatur ist unter null.', kategorie: 'Reise' },
  { de: 'der Führer', plural: '-', id: 'pemandu laki-laki', beispiel: 'Der Führer kennt den Weg.', kategorie: 'Reise' },
  { de: 'die Führerin', plural: '-nen', id: 'pemandu perempuan', beispiel: 'Die Führerin erklärt viel.', kategorie: 'Reise' },
  { de: 'die Führung', plural: '-en', id: 'tur berpemandu', beispiel: 'Die Führung dauert eine Stunde.', kategorie: 'Reise' },
  { de: 'das Grenzgebiet', plural: '-e', id: 'wilayah perbatasan', beispiel: 'Es war früher ein Grenzgebiet.', kategorie: 'Reise' },
  { de: 'die Pflanze', plural: '-n', id: 'tanaman', beispiel: 'Das ist eine seltene Pflanze.', kategorie: 'Reise' },
  { de: 'das Tier', plural: '-e', id: 'hewan', beispiel: 'Das Tier lebt im Wald.', kategorie: 'Reise' },
  { de: 'der Ort', plural: '-e', id: 'tempat', beispiel: 'Das ist ein schöner Ort.', kategorie: 'Reise' },
  { de: 'der Hinweis', plural: '-e', id: 'petunjuk/informasi', beispiel: 'Es gibt Hinweise zur Geschichte.', kategorie: 'Reise' },
  { de: 'der Einwohner', plural: '-', id: 'penduduk laki-laki', beispiel: 'Der Einwohner wohnt dort.', kategorie: 'Reise' },
  { de: 'die Einwohnerin', plural: '-nen', id: 'penduduk perempuan', beispiel: 'Die Einwohnerin ist nett.', kategorie: 'Reise' },
  { de: 'der Leuchtturm', plural: '"-e', id: 'mercusuar', beispiel: 'Der Leuchtturm ist groß.', kategorie: 'Reise' },
  { de: 'der Strand', plural: '"-e', id: 'pantai', beispiel: 'Wir gehen an den Strand.', kategorie: 'Reise' },
  { de: 'die Wanderung', plural: '-en', id: 'hiking', beispiel: 'Die Wanderung war toll.', kategorie: 'Reise' },
  { de: 'die Route', plural: '-n', id: 'rute', beispiel: 'Welche Route nehmen wir?', kategorie: 'Reise' },
  { de: 'die Station', plural: '-en', id: 'titik perjalanan', beispiel: 'Das ist die erste Station.', kategorie: 'Reise' },
  { de: 'der Rücken', plural: '-', id: 'punggung', beispiel: 'Mein Rücken tut weh.', kategorie: 'Reise' },
  { de: 'die Hütte', plural: '-n', id: 'pondok gunung', beispiel: 'Wir schlafen in der Hütte.', kategorie: 'Reise' },
  { de: 'das Tal', plural: '"-er', id: 'lembah', beispiel: 'Das Tal ist grün.', kategorie: 'Reise' },
  { de: 'der Nebel', plural: '-', id: 'kabut', beispiel: 'Es gibt heute Nebel.', kategorie: 'Reise' },
  { de: 'der Höhenmeter', plural: '-', id: 'meter ketinggian', beispiel: 'Wir schaffen 1000 Höhenmeter.', kategorie: 'Reise' },
  { de: 'die Distanz', plural: '-en', id: 'jarak', beispiel: 'Die Distanz ist weit.', kategorie: 'Reise' },
  { de: 'das Ziel', plural: '-e', id: 'tujuan', beispiel: 'Wir haben das Ziel erreicht.', kategorie: 'Reise' },
  { de: 'der Start', plural: '-s', id: 'titik awal', beispiel: 'Der Start ist um 8 Uhr.', kategorie: 'Reise' },
  { de: 'die Almrose', plural: '-n', id: 'bunga alpine rose', beispiel: 'Die Almrose riecht gut.', kategorie: 'Reise' },
  { de: 'das Abendessen', plural: '-', id: 'makan malam', beispiel: 'Wir kochen das Abendessen.', kategorie: 'Reise' },

  // Verben
  { de: 'sich bewegen', plural: '', id: 'bergerak', beispiel: 'Du musst dich bewegen.', kategorie: 'Verben' },
  { de: 'schießen', plural: '', id: 'menembak/mencetak gol', beispiel: 'Er schießt ein Tor.', kategorie: 'Verben' },
  { de: 'lieben', plural: '', id: 'mencintai/menyukai', beispiel: 'Ich liebe diesen Sport.', kategorie: 'Verben' },
  { de: 'entspannen', plural: '', id: 'rileks', beispiel: 'Nach der Arbeit möchte ich entspannen.', kategorie: 'Verben' },
  { de: 'trainieren', plural: '', id: 'berlatih', beispiel: 'Wir trainieren hart.', kategorie: 'Verben' },
  { de: 'verlieren', plural: '', id: 'kalah/kehilangan', beispiel: 'Wir haben leider verloren.', kategorie: 'Verben' },
  { de: 'werfen', plural: '', id: 'melempar', beispiel: 'Sie wirft den Ball.', kategorie: 'Verben' },
  { de: 'mitspielen', plural: '', id: 'ikut bermain', beispiel: 'Darf ich mitspielen?', kategorie: 'Verben' },
  { de: 'zustimmen', plural: '', id: 'menyetujui', beispiel: 'Ich stimme dir zu.', kategorie: 'Verben' },
  { de: 'ablehnen', plural: '', id: 'menolak', beispiel: 'Er hat den Vorschlag abgelehnt.', kategorie: 'Verben' },
  { de: 'sich verabreden', plural: '', id: 'membuat janji', beispiel: 'Wir verabreden uns für morgen.', kategorie: 'Verben' },
  { de: 'bringen', plural: '', id: 'membawakan', beispiel: 'Er bringt mir das Essen.', kategorie: 'Verben' },
  { de: 'geben', plural: '', id: 'memberi', beispiel: 'Gibst du mir das Buch?', kategorie: 'Verben' },
  { de: 'schenken', plural: '', id: 'menghadiahkan', beispiel: 'Ich schenke ihr Blumen.', kategorie: 'Verben' },
  { de: 'schicken', plural: '', id: 'mengirim', beispiel: 'Er schickt mir ein Paket.', kategorie: 'Verben' },
  { de: 'vorlesen', plural: '', id: 'membacakan', beispiel: 'Er liest den Kindern vor.', kategorie: 'Verben' },
  { de: 'vorstellen', plural: '', id: 'memperkenalkan', beispiel: 'Ich stelle dir meinen Freund vor.', kategorie: 'Verben' },
  { de: 'wünschen', plural: '', id: 'mengharapkan', beispiel: 'Ich wünsche dir viel Glück.', kategorie: 'Verben' },
  { de: 'zeigen', plural: '', id: 'menunjukkan', beispiel: 'Ich zeige dir die Stadt.', kategorie: 'Verben' },
  { de: 'erklären', plural: '', id: 'menjelaskan', beispiel: 'Erkläre mir das bitte.', kategorie: 'Verben' },
  { de: 'zurückgeben', plural: '', id: 'mengembalikan', beispiel: 'Wann gibst du mir das Buch zurück?', kategorie: 'Verben' },
  { de: 'informieren', plural: '', id: 'memberi informasi', beispiel: 'Der Hinweis informiert über die Geschichte.', kategorie: 'Verben' },
  { de: 'bewachen', plural: '', id: 'menjaga', beispiel: 'Die Grenze war bewacht.', kategorie: 'Verben' },
];

const partizipZwei = [
  { infinitiv: 'gehören', partizip: 'gehört', hilfsverb: 'haben', id: 'termasuk' },
  { infinitiv: 'ordnen', partizip: 'geordnet', hilfsverb: 'haben', id: 'mengurutkan' },
  { infinitiv: 'ankreuzen', partizip: 'angekreuzt', hilfsverb: 'haben', id: 'memberi tanda silang' },
  { infinitiv: 'surfen', partizip: 'gesurft', hilfsverb: 'sein', id: 'berselancar' },
  { infinitiv: 'tauchen', partizip: 'getaucht', hilfsverb: 'sein', id: 'menyelam' },
  { infinitiv: 'langlaufen', partizip: 'langgelaufen', hilfsverb: 'sein', id: 'ski lintas alam' },
  { infinitiv: 'klettern', partizip: 'geklettert', hilfsverb: 'sein', id: 'memanjat' },
  { infinitiv: 'ausprobieren', partizip: 'ausprobiert', hilfsverb: 'haben', id: 'mencoba' },
  { infinitiv: 'basteln', partizip: 'gebastelt', hilfsverb: 'haben', id: 'membuat kerajinan' },
  { infinitiv: 'sammeln', partizip: 'gesammelt', hilfsverb: 'haben', id: 'mengumpulkan' },
  { infinitiv: 'zuordnen', partizip: 'zugeordnet', hilfsverb: 'haben', id: 'mencocokkan' },
  { infinitiv: 'ausdrücken', partizip: 'ausgedrückt', hilfsverb: 'haben', id: 'mengungkapkan' },
  { infinitiv: 'reagieren', partizip: 'reagiert', hilfsverb: 'haben', id: 'merespons' },
  { infinitiv: 'auswählen', partizip: 'ausgewählt', hilfsverb: 'haben', id: 'memilih' },
  { infinitiv: 'vorlesen', partizip: 'vorgelesen', hilfsverb: 'haben', id: 'membacakan' },
  { infinitiv: 'ausfallen', partizip: 'ausgefallen', hilfsverb: 'sein', id: 'dibatalkan' },
  { infinitiv: 'schießen', partizip: 'geschossen', hilfsverb: 'haben', id: 'mencetak gol' },
  { infinitiv: 'sich benehmen', partizip: 'sich benommen', hilfsverb: 'haben', id: 'berperilaku' },
  { infinitiv: 'hängen', partizip: 'gehängt', hilfsverb: 'haben', id: 'menggantung' },
  { infinitiv: 'nennen', partizip: 'genannt', hilfsverb: 'haben', id: 'menyebutkan' },
  { infinitiv: 'sich verabreden', partizip: 'sich verabredet', hilfsverb: 'haben', id: 'membuat janji' },
  { infinitiv: 'schicken', partizip: 'geschickt', hilfsverb: 'haben', id: 'mengirim' },
  { infinitiv: 'vorstellen', partizip: 'vorgestellt', hilfsverb: 'haben', id: 'memperkenalkan' },
  { infinitiv: 'wünschen', partizip: 'gewünscht', hilfsverb: 'haben', id: 'menginginkan' },
  { infinitiv: 'schließen', partizip: 'geschlossen', hilfsverb: 'haben', id: 'menutup' },
  { infinitiv: 'erfahren', partizip: 'erfahren', hilfsverb: 'haben', id: 'mengetahui/mengalami' },
  { infinitiv: 'informieren', partizip: 'informiert', hilfsverb: 'haben', id: 'memberi informasi' },
  { infinitiv: 'trainieren', partizip: 'trainiert', hilfsverb: 'haben', id: 'berlatih' },
  { infinitiv: 'entspannen', partizip: 'entspannt', hilfsverb: 'haben', id: 'rileks' },
  { infinitiv: 'mitspielen', partizip: 'mitgespielt', hilfsverb: 'haben', id: 'ikut bermain' },
  { infinitiv: 'werfen', partizip: 'geworfen', hilfsverb: 'haben', id: 'melempar' },
  { infinitiv: 'bewachen', partizip: 'bewacht', hilfsverb: 'haben', id: 'menjaga' },
  { infinitiv: 'riechen', partizip: 'gerochen', hilfsverb: 'haben', id: 'mencium bau' },
];

const grammatik = [
  {
    titel: 'Konsequenz und Widerspruch',
    name: 'deshalb & trotzdem',
    farbe: 'border-l-indigo-500 bg-indigo-50 text-indigo-900',
    erklaerung: 'Setelah kata hubung deshalb (karena itu) dan trotzdem (meskipun begitu), kata kerja harus langsung mengikuti di posisi kedua.',
    struktur: 'Hauptsatz 1 + deshalb/trotzdem + Verb + Subjekt + ...',
    konjugationsTabelle: null,
    beispiele: [
      { 
        de: 'Er hat super gespielt, deshalb hat sein Team gewonnen.', 
        id: 'Dia bermain sangat baik, karena itu timnya menang.', 
        highlight: 'deshalb hat sein Team gewonnen' 
      },
      { 
        de: 'Er hat super gespielt, trotzdem war das Spiel langweilig.', 
        id: 'Dia bermain sangat baik, meskipun begitu pertandingannya membosankan.', 
        highlight: 'trotzdem war das Spiel langweilig' 
      }
    ],
  },
  {
    titel: 'Verben mit 2 Objekten',
    name: 'Dativ und Akkusativ',
    farbe: 'border-l-emerald-500 bg-emerald-50 text-emerald-900',
    erklaerung: 'Beberapa verba memiliki 2 objek: Person (Dativ) dan Sache (Akkusativ). Aturan umumnya: Dativ diletakkan sebelum Akkusativ. Namun, jika Akkusativ adalah pronomen, maka ia didahulukan.',
    struktur: '... + Dativ (Person) + Akkusativ (Sache)',
    konjugationsTabelle: null,
    beispiele: [
      { 
        de: 'Wir erklären den Gästen die Regeln.', 
        id: 'Kami menjelaskan aturannya kepada para tamu. (Dativ: den Gästen, Akkusativ: die Regeln)', 
        highlight: 'den Gästen die Regeln' 
      },
      { 
        de: 'Wir erklären sie den Gästen.', 
        id: 'Kami menjelaskannya kepada para tamu. (Akkusativ Pronomen "sie" diletakkan di awal)', 
        highlight: 'sie den Gästen' 
      }
    ],
  },
  {
    titel: 'Aussprache',
    name: 'r und l',
    farbe: 'border-l-sky-500 bg-sky-50 text-sky-900',
    erklaerung: 'Latihlah perbedaan pengucapan antara r dan l pada bahasa Jerman agar terdengar jelas.',
    struktur: 'r (seperti dalam reiten, drei) | l (seperti dalam Helm, schlecht)',
    konjugationsTabelle: null,
    beispiele: [
      { 
        de: 'Reiten, drei, großartig', 
        id: 'r jelas / uvular', 
        highlight: 'r' 
      },
      { 
        de: 'Langweilig, Helm, schlecht', 
        id: 'l jelas', 
        highlight: 'l' 
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
      { text: 'Informationen über Reiseziele und Sportarten finden', type: 'Selektives Lesen' },
      { text: 'Kommentare auf einer Fanseite verstehen', type: 'Detailverständnis' },
    ]
  },
  {
    skill: 'Hören',
    icon: '🎧',
    farbe: 'bg-indigo-100 text-indigo-700',
    tasks: [
      { text: 'Eine Radiosendung über Sportmotive verstehen', type: 'Globalverständnis' },
      { text: 'Gespräche über Vorschläge und Verabredungen hören', type: 'Detailverständnis' },
    ]
  },
  {
    skill: 'Schreiben / Sprechen',
    icon: '🗣️',
    farbe: 'bg-rose-100 text-rose-700',
    tasks: [
      { text: 'Einen Kommentar für eine Fanseite schreiben', type: 'Produktion' },
      { text: 'Vorschläge machen, zustimmen und ablehnen', type: 'Präsentation / Interaktion' },
    ]
  }
];

const lernTipps = [
  {
    nummer: 1,
    titel: 'Redemittel für Vorschläge',
    icon: '💡',
    farbe: 'bg-indigo-100 text-indigo-600',
    beschreibung: 'Lernen Sie feste Ausdrücke, um Vorschläge zu machen (z. B. "Wollen wir...", "Wir könnten..."). Das macht Gespräche natürlicher.',
    tag: 'Sprechen'
  },
  {
    nummer: 2,
    titel: 'deshalb vs trotzdem',
    icon: '🧠',
    farbe: 'bg-emerald-100 text-emerald-600',
    beschreibung: 'Erinnern Sie sich an den Unterschied: deshalb zeigt eine logische Folge (karena itu), während trotzdem einen Gegensatz zeigt (meskipun begitu).',
    tag: 'Grammatik'
  },
  {
    nummer: 3,
    titel: 'Pronomen-Position',
    icon: '📝',
    farbe: 'bg-rose-100 text-rose-600',
    beschreibung: 'Achten Sie darauf: "Ich gebe dem Mann den Ball" vs "Ich gebe ihn dem Mann". Wenn der Akkusativ ein Pronomen ist, kommt er zuerst!',
    tag: 'Grammatik'
  }
];

const miniQuiz = [
  {
    frage: 'Welches Wort passt? "Das Spiel war so schlecht, es war eine echte ___!"',
    options: ['Katastrophe', 'Mannschaft', 'Kondition', 'Regel'],
    besteAntwort: 0
  },
  {
    frage: 'Welches Wort ist richtig? "Es regnet stark, ___ gehen wir wandern."',
    options: ['deshalb', 'trotzdem', 'weil', 'und'],
    besteAntwort: 1
  },
  {
    frage: 'Welcher Satz ist grammatikalisch korrekt?',
    options: [
      'Ich gebe den Ball dir.',
      'Ich gebe dir ihn.',
      'Ich gebe ihn dir.',
      'Ich gebe dir den Ball ihm.'
    ],
    besteAntwort: 2
  }
];

export default function Kapitel9Dashboard() {
  return (
    <ChapterTemplate 
      kapitelId="kapitel-9"
      kapitel={kapitel}
      wortschatz={wortschatz}
      partizipZwei={partizipZwei}
      grammatik={grammatik}
      goetheTasks={goetheTasks}
      lernTipps={lernTipps}
      miniQuiz={miniQuiz}
      
      LesenComponent={<LesenInteraktiv9 />}
      HorenComponent={<HorenInteraktiv9 />}
      SchreibenComponent={<UebungInteraktiv9 />}
      GrammatikInteraktivComponent={<GrammatikInteraktiv9 />}
      TestComponent={<KapitelTest9 />}
    />
  );
}
