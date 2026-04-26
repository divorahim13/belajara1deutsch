const fs = require('fs');
const path = require('path');

let content = `
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import ProgressTracker from '../ProgressTracker';

// Placeholder components to prevent build errors before actual implementation
import KapitelTest5 from '../KapitelTest5';
import { LesenInteraktiv5 } from '../LesenInteraktiv5';
import { HorenInteraktiv5 } from '../HorenInteraktiv5';
import { UebungInteraktiv5 } from '../UebungInteraktiv5';
import { GrammatikInteraktiv5 } from './GrammatikInteraktiv5';

// ============================================================
// DATA: Netzwerk Neu A2 – Kapitel 5: Leben in der Stadt
// ============================================================

const kapitel = {
  nummer: 5,
  titel: 'Leben in der Stadt',
  untertitel: 'Stadtleben, Arbeit, Behörden, Banken, höfliche Bitten',
  level: 'A2',
  goetheFokus: ['Lesen', 'Hören', 'Schreiben', 'Sprechen'],
};

const wortschatz = [
  { de: 'das Leben in der Stadt', plural: '', id: 'kehidupan di kota', beispiel: '', kategorie: 'Leben in der Stadt' },
  { de: 'das Stadtservice', plural: '', id: 'layanan kota', beispiel: '', kategorie: 'Stadtservice' },
  { de: 'die Müllabfuhr', plural: '', id: 'pengangkutan sampah', beispiel: '', kategorie: 'Stadtservice' },
  { de: 'die Straßenreinigung', plural: '', id: 'pembersihan jalan', beispiel: '', kategorie: 'Stadtservice' },
  { de: 'die Ordnung', plural: '', id: 'ketertiban', beispiel: '', kategorie: 'Stadtservice' },
  { de: 'der Müll', plural: '', id: 'sampah', beispiel: '', kategorie: 'Stadtservice' },
  { de: 'leeren', plural: '', id: 'mengosongkan', beispiel: '', kategorie: 'Stadtservice' },
  { de: 'pflegen', plural: '', id: 'merawat', beispiel: '', kategorie: 'Stadtservice' },
  { de: 'transportieren', plural: '', id: 'mengangkut', beispiel: '', kategorie: 'Stadtservice' },
  { de: 'die öffentlichen Verkehrsmittel', plural: '', id: 'transportasi umum', beispiel: '', kategorie: 'Verkehr' },
  { de: 'die Straßenbahn', plural: '-en', id: 'trem', beispiel: '', kategorie: 'Verkehr' },
  { de: 'die U-Bahn', plural: '-en', id: 'kereta bawah tanah', beispiel: '', kategorie: 'Verkehr' },
  { de: 'der Bus', plural: '-se', id: 'bus', beispiel: '', kategorie: 'Verkehr' },
  { de: 'der Verkehr', plural: '', id: 'lalu lintas', beispiel: '', kategorie: 'Verkehr' },
  { de: 'der Mitarbeiter', plural: '', id: 'karyawan laki-laki', beispiel: '', kategorie: 'Berufe' },
  { de: 'die Mitarbeiterin', plural: '-nen', id: 'karyawan perempuan', beispiel: '', kategorie: 'Berufe' },
  { de: 'der Beamte', plural: '-n', id: 'pegawai negeri laki-laki', beispiel: '', kategorie: 'Berufe' },
  { de: 'die Beamtin', plural: '-nen', id: 'pegawai negeri perempuan', beispiel: '', kategorie: 'Berufe' },
  { de: 'der Kellner', plural: '', id: 'pelayan laki-laki', beispiel: '', kategorie: 'Berufe' },
  { de: 'die Kellnerin', plural: '-nen', id: 'pelayan perempuan', beispiel: '', kategorie: 'Berufe' },
  { de: 'die Bank', plural: '-en', id: 'bank', beispiel: '', kategorie: 'Bank' },
  { de: 'das Konto', plural: 'Konten', id: 'rekening', beispiel: '', kategorie: 'Bank' },
  { de: 'die Bankkarte', plural: '-n', id: 'kartu bank', beispiel: '', kategorie: 'Bank' },
  { de: 'sperren', plural: '', id: 'memblokir', beispiel: '', kategorie: 'Bank' },
  { de: 'überweisen', plural: '', id: 'mentransfer', beispiel: '', kategorie: 'Bank' },
  { de: 'die Behörde', plural: '-n', id: 'instansi / kantor pemerintahan', beispiel: '', kategorie: 'Behörde' },
  { de: 'das Amt', plural: '-"er', id: 'kantor pemerintahan', beispiel: '', kategorie: 'Behörde' },
  { de: 'das Formular', plural: '-e', id: 'formulir', beispiel: '', kategorie: 'Behörde' },
  { de: 'der Antrag', plural: '-"e', id: 'permohonan', beispiel: '', kategorie: 'Behörde' },
  { de: 'das Dokument', plural: '-e', id: 'dokumen', beispiel: '', kategorie: 'Behörde' },
  { de: 'der Pass', plural: '-"e', id: 'paspor', beispiel: '', kategorie: 'Behörde' },
  { de: 'das Visum', plural: 'Visa', id: 'visa', beispiel: '', kategorie: 'Behörde' },
  { de: 'beantragen', plural: '', id: 'mengajukan permohonan', beispiel: '', kategorie: 'Behörde' },
  { de: 'verlängern', plural: '', id: 'memperpanjang', beispiel: '', kategorie: 'Behörde' },
  { de: 'unterschreiben', plural: '', id: 'menandatangani', beispiel: '', kategorie: 'Behörde' },
  { de: 'die Polizei', plural: '', id: 'polisi', beispiel: '', kategorie: 'Polizei' },
  { de: 'beschützen', plural: '', id: 'melindungi', beispiel: '', kategorie: 'Polizei' },
  { de: 'die Sicherheit', plural: '', id: 'keamanan', beispiel: '', kategorie: 'Polizei' },
  { de: 'das Restaurant', plural: '-s', id: 'restoran', beispiel: '', kategorie: 'Restaurant' },
  { de: 'das Vorstellungsgespräch', plural: '-e', id: 'wawancara kerja', beispiel: '', kategorie: 'Arbeit' },
  { de: 'die Stellenanzeige', plural: '-n', id: 'lowongan kerja', beispiel: '', kategorie: 'Arbeit' },
  { de: 'sich bewerben', plural: '', id: 'melamar pekerjaan', beispiel: '', kategorie: 'Arbeit' },
  { de: 'die Erfahrung', plural: '-en', id: 'pengalaman', beispiel: '', kategorie: 'Arbeit' },
  { de: 'die Stadt-Tour', plural: '-en', id: 'tur kota', beispiel: '', kategorie: 'Leben in der Stadt' },
  { de: 'besichtigen', plural: '', id: 'mengunjungi / melihat-lihat', beispiel: '', kategorie: 'Leben in der Stadt' }
];

const partizipZwei = [
  { infinitiv: 'erzählen', partizip: 'erzählt', hilfsverb: 'hat', id: 'menceritakan' },
  { infinitiv: 'ansehen', partizip: 'angesehen', hilfsverb: 'hat', id: 'melihat' },
  { infinitiv: 'machen', partizip: 'gemacht', hilfsverb: 'hat', id: 'melakukan' },
  { infinitiv: 'fragen', partizip: 'gefragt', hilfsverb: 'hat', id: 'bertanya' },
  { infinitiv: 'anfangen', partizip: 'angefangen', hilfsverb: 'hat', id: 'memulai' },
  { infinitiv: 'gefallen', partizip: 'gefallen', hilfsverb: 'hat', id: 'menyukai' },
  { infinitiv: 'arbeiten', partizip: 'gearbeitet', hilfsverb: 'hat', id: 'bekerja' },
  { infinitiv: 'erledigen', partizip: 'erledigt', hilfsverb: 'hat', id: 'menyelesaikan' },
  { infinitiv: 'eröffnen', partizip: 'eröffnet', hilfsverb: 'hat', id: 'membuka' },
  { infinitiv: 'ausgeben', partizip: 'ausgegeben', hilfsverb: 'hat', id: 'menghabiskan (uang)' },
  { infinitiv: 'sich bewerben', partizip: 'sich beworben', hilfsverb: 'hat', id: 'melamar' },
  { infinitiv: 'kennenlernen', partizip: 'kennengelernt', hilfsverb: 'hat', id: 'berkenalan' },
  { infinitiv: 'waschen', partizip: 'gewaschen', hilfsverb: 'hat', id: 'mencuci' },
  { infinitiv: 'kaufen', partizip: 'gekauft', hilfsverb: 'hat', id: 'membeli' },
  { infinitiv: 'anziehen', partizip: 'angezogen', hilfsverb: 'hat', id: 'memakai (pakaian)' },
  { infinitiv: 'helfen', partizip: 'geholfen', hilfsverb: 'hat', id: 'membantu' },
  { infinitiv: 'geben', partizip: 'gegeben', hilfsverb: 'hat', id: 'memberi' },
  { infinitiv: 'beantragen', partizip: 'beantragt', hilfsverb: 'hat', id: 'mengajukan' },
  { infinitiv: 'überweisen', partizip: 'überwiesen', hilfsverb: 'hat', id: 'mentransfer' },
  { infinitiv: 'melden', partizip: 'gemeldet', hilfsverb: 'hat', id: 'melaporkan' },
  { infinitiv: 'verlieren', partizip: 'verloren', hilfsverb: 'hat', id: 'kehilangan' },
  { infinitiv: 'zeigen', partizip: 'gezeigt', hilfsverb: 'hat', id: 'menunjukkan' },
  { infinitiv: 'abholen', partizip: 'abgeholt', hilfsverb: 'hat', id: 'menjemput/mengambil' },
  { infinitiv: 'unterschreiben', partizip: 'unterschrieben', hilfsverb: 'hat', id: 'menandatangani' },
  { infinitiv: 'verlängern', partizip: 'verlängert', hilfsverb: 'hat', id: 'memperpanjang' },
  { infinitiv: 'abgeben', partizip: 'abgegeben', hilfsverb: 'hat', id: 'menyerahkan' },
  { infinitiv: 'fahren', partizip: 'gefahren', hilfsverb: 'ist', id: 'pergi (kendaraan)' },
  { infinitiv: 'gehen', partizip: 'gegangen', hilfsverb: 'ist', id: 'pergi (jalan kaki)' },
  { infinitiv: 'telefonieren', partizip: 'telefoniert', hilfsverb: 'hat', id: 'menelepon' },
  { infinitiv: 'sperren', partizip: 'gesperrt', hilfsverb: 'hat', id: 'memblokir' },
  { infinitiv: 'anrufen', partizip: 'angerufen', hilfsverb: 'hat', id: 'menelepon' },
  { infinitiv: 'warten', partizip: 'gewartet', hilfsverb: 'hat', id: 'menunggu' },
  { infinitiv: 'leihen', partizip: 'geliehen', hilfsverb: 'hat', id: 'meminjam' },
  { infinitiv: 'ausdrucken', partizip: 'ausgedruckt', hilfsverb: 'hat', id: 'mencetak' },
  { infinitiv: 'funktionieren', partizip: 'funktioniert', hilfsverb: 'hat', id: 'berfungsi' },
  { infinitiv: 'ausmachen', partizip: 'ausgemacht', hilfsverb: 'hat', id: 'mematikan / membuat janji' },
  { infinitiv: 'kommen', partizip: 'gekommen', hilfsverb: 'ist', id: 'datang' },
  { infinitiv: 'lesen', partizip: 'gelesen', hilfsverb: 'hat', id: 'membaca' },
  { infinitiv: 'suchen', partizip: 'gesucht', hilfsverb: 'hat', id: 'mencari' },
  { infinitiv: 'duzen', partizip: 'geduzt', hilfsverb: 'hat', id: 'menyapa dengan "du"' },
  { infinitiv: 'bedienen', partizip: 'bedient', hilfsverb: 'hat', id: 'melayani' },
  { infinitiv: 'bringen', partizip: 'gebracht', hilfsverb: 'hat', id: 'membawa' },
  { infinitiv: 'stellen', partizip: 'gestellt', hilfsverb: 'hat', id: 'meletakkan' },
  { infinitiv: 'trinken', partizip: 'getrunken', hilfsverb: 'hat', id: 'minum' },
  { infinitiv: 'aufräumen', partizip: 'aufgeräumt', hilfsverb: 'hat', id: 'merapikan' },
  { infinitiv: 'begrüßen', partizip: 'begrüßt', hilfsverb: 'hat', id: 'menyapa' },
  { infinitiv: 'prüfen', partizip: 'geprüft', hilfsverb: 'hat', id: 'memeriksa' },
  { infinitiv: 'genehmigen', partizip: 'genehmigt', hilfsverb: 'hat', id: 'menyetujui' },
  { infinitiv: 'beschützen', partizip: 'beschützt', hilfsverb: 'hat', id: 'melindungi' },
  { infinitiv: 'transportieren', partizip: 'transportiert', hilfsverb: 'hat', id: 'mengangkut' },
  { infinitiv: 'pflegen', partizip: 'gepflegt', hilfsverb: 'hat', id: 'merawat' },
  { infinitiv: 'leeren', partizip: 'geleert', hilfsverb: 'hat', id: 'mengosongkan' },
  { infinitiv: 'verkaufen', partizip: 'verkauft', hilfsverb: 'hat', id: 'menjual' }
];

const grammatik = [
  {
    titel: 'Adjektive nach dem bestimmten Artikel',
    farbe: 'indigo',
    erklaerung: 'Setelah artikel pasti (der, die, das), adjektiva mendapat akhiran -e atau -en.',
    tiefenErklaerung: 'Dalam bahasa Jerman, saat menggunakan artikel definit (der, das, die, den, dem, der), akhiran adjektiva menjadi lemah (schwache Deklination). Akhirannya hanya -e (Nominativ singular dan Akkusativ neutrum/feminin) atau -en (Dativ, Genitiv, Plural, dan Akkusativ maskulin).',
    struktur: 'der/die/das + Adjektiv-e/en + Nomen',
    konjugationsTabelle: null,
    beispiele: [
      { satz: 'Ich kaufe das weiße T-Shirt.', terjemahan: 'Saya membeli kaos putih itu.' },
      { satz: 'Er trägt den schwarzen Rock.', terjemahan: 'Dia memakai rok hitam itu.' },
      { satz: 'Wir fahren mit dem neuen Auto.', terjemahan: 'Kami pergi dengan mobil baru itu.' }
    ],
    falle: 'Ingat! Di jamak (Plural) dan Dativ, akhirannya selalu -en!'
  },
  {
    titel: 'Präpositionen: mit und ohne',
    farbe: 'emerald',
    erklaerung: 'mit + Dativ, tanpa + Akkusativ.',
    tiefenErklaerung: '"mit" (dengan) selalu diikuti kasus Dativ. "ohne" (tanpa) selalu diikuti kasus Akkusativ.',
    struktur: 'mit + Dativ | ohne + Akkusativ',
    konjugationsTabelle: null,
    beispiele: [
      { satz: 'Ohne meinen Pass kann ich nicht reisen.', terjemahan: 'Tanpa paspor saya, saya tidak bisa bepergian.' },
      { satz: 'Er fährt mit dem Bus.', terjemahan: 'Dia pergi dengan bus.' }
    ],
    falle: 'Perhatikan perubahan artikel: dengan (mit dem/der/den), tanpa (ohne den/das/die).'
  },
  {
    titel: 'Konjunktiv II: könnte',
    farbe: 'orange',
    erklaerung: 'Digunakan untuk membuat permintaan menjadi sangat sopan.',
    tiefenErklaerung: 'Untuk meminta tolong dengan sopan (höfliche Bitte), bahasa Jerman menggunakan Konjunktiv II dari "können", yaitu "könnte". Kata kerja utama diletakkan di akhir kalimat.',
    struktur: 'Könnte(st/n) + Subjekt + ... + Infinitiv?',
    konjugationsTabelle: {
      headers: ['Person', 'könnte'],
      rows: [
        ['ich', 'könnte'],
        ['du', 'könntest'],
        ['er/es/sie', 'könnte'],
        ['wir', 'könnten'],
        ['ihr', 'könntet'],
        ['sie/Sie', 'könnten']
      ]
    },
    beispiele: [
      { satz: 'Könnten Sie mir bitte helfen?', terjemahan: 'Bisakah Anda menolong saya?' },
      { satz: 'Könntest du mir das Geld leihen?', terjemahan: 'Bisakah kamu meminjamkan uang itu padaku?' }
    ],
    falle: 'Jangan lupakan kata kerja asli di akhir kalimat dalam bentuk Infinitiv!'
  }
];

const goetheTasks = [
  'Eine Stadt beschreiben',
  'Höfliche Bitten formulieren',
  'Vorstellungsgespräch'
];

const lernTipps = [
  {
    nummer: 1,
    titel: 'Wortschatz Kategorisieren',
    beschreibung: 'Hafalkan kosakata berdasarkan kategorinya (Bank, Behörde, Polizei) agar lebih mudah diingat.',
    icon: '🗂️',
    farbe: 'sky',
    tag: 'STRUKTUR'
  },
  {
    nummer: 2,
    titel: 'Partizip II Drill',
    beschreibung: 'Latih memori Partizip II beserta Hilfsverb (hat/ist) karena sangat krusial untuk bercerita.',
    icon: '⏳',
    farbe: 'orange',
    tag: 'GRAMMATIK'
  },
  {
    nummer: 3,
    titel: 'Höflichkeit üben',
    beschreibung: 'Selalu gunakan "könnte" dan "bitte" saat simulasi roleplay di Bank atau Behörde.',
    icon: '🎩',
    farbe: 'emerald',
    tag: 'KOMMUNIKATION'
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

const kategorieStyles: Record<string, { bg: string; text: string; border: string }> = {
  'Gefühle & Ereignisse': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-300' },
  'Leben in der Stadt': { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-300' },
  'Stadtservice': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-300' },
  'Verkehr': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-300' },
  'Berufe': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-300' },
  'Bank': { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-300' },
  'Behörde': { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300' },
  'Polizei': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-300' },
  'Restaurant': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-300' },
  'Arbeit': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-300' }
};

// ============================================================
// REUSABLE COMPONENTS (Copied from Kapitel 4 template)
// ============================================================

function FlashCard({ wort }: { wort: any }) {
  const [flipped, setFlipped] = useState(false);
  const s = kategorieStyles[wort.kategorie] || { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-300' };

  return (
    <div 
      className="group perspective-1000 h-64 w-full cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={\`relative w-full h-full transition-transform duration-500 transform-style-3d \${flipped ? 'rotate-y-180' : ''}\`}>
        {/* Front */}
        <div className="absolute inset-0 backface-hidden clay-card bg-white border-2 border-slate-200 flex flex-col p-6 hover:border-indigo-300 hover:shadow-lg transition-all group-hover:-translate-y-1">
          <div className="flex justify-between items-start mb-4">
             <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Deutsch</span>
             <span className={\`text-[10px] font-black uppercase px-2 py-1 rounded-md \${s.bg} \${s.text} \${s.border} border\`}>
               {wort.kategorie}
             </span>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-black text-slate-900 leading-tight">{wort.de}</h3>
            {wort.plural && wort.plural !== '' && (
              <p className="text-slate-400 font-bold mt-2">Pl: {wort.plural}</p>
            )}
          </div>
          <div className="text-center mt-4 opacity-50 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">Klik untuk balik</span>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 clay-card bg-indigo-900 border-2 border-indigo-950 flex flex-col p-6 text-white">
          <div className="flex justify-between items-start mb-4">
             <span className="text-[10px] font-black tracking-widest text-indigo-300 uppercase">Indonesisch</span>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-black text-emerald-400 leading-tight mb-4">{wort.id}</h3>
            {wort.beispiel && (
              <div className="w-full bg-indigo-950/50 p-3 rounded-xl border border-indigo-800/50">
                <p className="text-sm font-medium text-indigo-200 italic leading-relaxed">"{wort.beispiel}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GrammatikKarte({ gram }: { gram: any }) {
  const isLarge = gram.titel.includes('Nebensatz');
  const bgColors: Record<string, string> = {
    indigo: 'bg-indigo-50 border-indigo-200',
    emerald: 'bg-emerald-50 border-emerald-200',
    orange: 'bg-orange-50 border-orange-200',
  };
  const textColors: Record<string, string> = {
    indigo: 'text-indigo-900',
    emerald: 'text-emerald-900',
    orange: 'text-orange-900',
  };
  const iconColors: Record<string, string> = {
    indigo: 'bg-indigo-100 text-indigo-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  return (
    <div className={\`clay-card p-6 md:p-8 \${bgColors[gram.farbe] || 'bg-slate-50 border-slate-200'} h-full flex flex-col\`}>
      <div className="flex items-start gap-4 mb-6">
        <div className={\`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl \${iconColors[gram.farbe] || 'bg-slate-200 text-slate-600'}\`}>
          🧩
        </div>
        <div>
          <h3 className={\`text-2xl font-black \${textColors[gram.farbe] || 'text-slate-900'}\`}>{gram.titel}</h3>
          <p className="text-slate-600 font-medium mt-1">{gram.erklaerung}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border-2 border-slate-100 mb-6">
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Pola / Struktur</div>
        <code className="text-sm md:text-base font-bold text-slate-800 block">{gram.struktur}</code>
      </div>

      {gram.konjugationsTabelle && (
        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-black uppercase text-[10px] tracking-wider">
              <tr>
                {gram.konjugationsTabelle.headers.map((h: string, i: number) => (
                  <th key={i} className="px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {gram.konjugationsTabelle.rows.map((row: string[], i: number) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  {row.map((cell: string, j: number) => (
                    <td key={j} className={\`px-4 py-3 \${j === 0 ? 'font-bold' : ''}\`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="space-y-3 mb-6 flex-1">
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contoh Kalimat</div>
        {gram.beispiele.map((b: any, i: number) => (
          <div key={i} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
            <p className="font-bold text-slate-800 mb-1">{b.satz}</p>
            <p className="text-xs text-slate-500 font-medium">{b.terjemahan}</p>
          </div>
        ))}
      </div>

      {gram.falle && (
        <div className="mt-auto bg-rose-50 p-4 rounded-xl border border-rose-100 flex gap-3 items-start">
          <span className="text-rose-500">⚠️</span>
          <p className="text-sm text-rose-800 font-medium leading-relaxed">{gram.falle}</p>
        </div>
      )}
    </div>
  );
}

// Wortschatz Game & Partizip Game
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
    const cleanTarget = question.de.replace(/\\s*\\(.*?\\)\\s*/g, '').trim().toLowerCase();
    
    const targets = cleanTarget.split(' / ');
    const isCorrect = targets.includes(cleanInput);

    if (isCorrect) {
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

      <div className="py-8 sm:py-10 px-4 sm:px-6 bg-indigo-900 rounded-3xl border-b-4 border-indigo-950 shadow-inner text-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
         <p className="text-xs sm:text-sm font-extrabold text-indigo-300 mb-2 uppercase tracking-widest">Apa bahasa Jermannya?</p>
         <h4 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">{question.id}</h4>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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

function PartizipZweiGame({ customList }: { customList?: typeof partizipZwei }) {
  const [question, setQuestion] = useState<(typeof partizipZwei)[0] | null>(null);
  const [hilfsverbInput, setHilfsverbInput] = useState<'haben' | 'sein' | ''>('');
  const [partizipInput, setPartizipInput] = useState('');
  const [mistakes, setMistakes] = useState<typeof partizipZwei>([]);
  const [score, setScore] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const newQuestion = useCallback(() => {
    const source = customList || partizipZwei;
    const q = source[Math.floor(Math.random() * source.length)];
    setQuestion(q);
    setHilfsverbInput('');
    setPartizipInput('');
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [customList]);

  useEffect(() => {
    newQuestion();
  }, [newQuestion]);

  const handleKeyboardClick = (char: string) => {
    setPartizipInput(prev => prev + char);
    inputRef.current?.focus();
  };

  const checkAnswer = () => {
    if (!question) return;
    if (!hilfsverbInput || !partizipInput.trim()) return;

    const isHCorrect = hilfsverbInput === question.hilfsverb;
    const isPCorrect = partizipInput.trim().toLowerCase() === question.partizip.toLowerCase();

    if (isHCorrect && isPCorrect) {
      setScore(s => s + 10);
      newQuestion();
    } else {
      if (!mistakes.find(m => m.infinitiv === question.infinitiv)) {
        setMistakes(prev => [...prev, question]);
      }
      alert(\`Salah! Jawaban yang benar: \${question.hilfsverb} \${question.partizip}\`);
      newQuestion();
    }
  };

  if (!question) return null;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-black text-orange-100 italic">⏳ Partizip II Recall</h3>
        <span className="text-xl font-bold text-orange-200">Skor: {score}</span>
      </div>

      <div className="clay-card p-8 bg-white border-4 border-slate-900 text-center relative overflow-hidden">
        <p className="text-xs font-bold text-orange-300 uppercase tracking-widest mb-2">Tulis Partizip II dari:</p>
        <h4 className="text-4xl font-black text-slate-900 mb-2">{question.infinitiv}</h4>
        <p className="text-slate-500 font-bold">({question.id})</p>

        <div className="mt-8 space-y-4">
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => setHilfsverbInput('haben')}
              className={\`px-6 py-3 rounded-xl font-bold border-2 transition-all \${hilfsverbInput === 'haben' ? 'bg-orange-500 text-white border-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200'}\`}
            >haben</button>
            <button 
              onClick={() => setHilfsverbInput('sein')}
              className={\`px-6 py-3 rounded-xl font-bold border-2 transition-all \${hilfsverbInput === 'sein' ? 'bg-orange-500 text-white border-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : 'bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200'}\`}
            >sein</button>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={partizipInput}
            onChange={(e) => setPartizipInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
            placeholder="Ketik Partizip II..."
            className="w-full text-center text-3xl font-black p-4 bg-slate-50 border-b-4 border-slate-300 focus:outline-none focus:border-orange-500 focus:bg-white rounded-t-xl"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />

          <div className="flex justify-center gap-2 mt-4">
            {['ä', 'ö', 'ü', 'ß'].map(char => (
              <button 
                key={char} 
                onClick={() => handleKeyboardClick(char)}
                className="w-12 h-12 bg-slate-800 text-white rounded-lg font-bold text-xl hover:bg-slate-700 active:translate-y-1 transition-all"
              >
                {char}
              </button>
            ))}
          </div>

          <button
            onClick={checkAnswer}
            disabled={!hilfsverbInput || !partizipInput}
            className="w-full py-4 mt-6 bg-slate-900 text-white font-black text-xl rounded-2xl hover:bg-slate-800 active:translate-y-1 disabled:opacity-50 transition-all border-b-4 border-slate-950 active:border-b-0"
          >
            Cek Jawaban
          </button>
        </div>
      </div>

      {mistakes.length > 0 && (
        <div className="mt-8 clay-card p-6 bg-rose-50 border-rose-200">
          <h4 className="text-rose-900 font-bold mb-4">Perlu Diulang ({mistakes.length}):</h4>
          <div className="flex flex-wrap gap-2">
            {mistakes.map(m => (
              <span key={m.infinitiv} className="bg-white border border-rose-200 text-rose-700 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                {m.infinitiv} ➔ {m.hilfsverb} {m.partizip}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================

export default function KapitelFuenfPage() {
  const [activeTab, setActiveTab] = useState<'wortschatz' | 'partizip' | 'grammatik' | 'lesen' | 'horen' | 'uebung' | 'strategie' | 'game' | 'test'>('wortschatz');

  // Partizip Pagination
  const [partizipPage, setPartizipPage] = useState<number>(1);
  const partizipItemsPerPage = 8;
  const totalPartizipPages = Math.ceil(partizipZwei.length / partizipItemsPerPage);
  const currentPartizipItems = partizipZwei.slice((partizipPage - 1) * partizipItemsPerPage, partizipPage * partizipItemsPerPage);
  const [katFilter, setKatFilter] = useState<string>('Alle');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const kategorien = ['Alle', ...Array.from(new Set(wortschatz.map(w => w.kategorie)))];
  const filteredWords = katFilter === 'Alle' ? wortschatz : wortschatz.filter(w => w.kategorie === katFilter);
  const totalPages = Math.ceil(filteredWords.length / itemsPerPage);
  const currentWords = filteredWords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Steps ordered by learning science
  const steps = [
    { id: 'wortschatz',  label: 'Wortschatz',   icon: '💬', phase: 1 as const, count: wortschatz.length },
    { id: 'partizip',   label: 'Partizip II',   icon: '⏳', phase: 1 as const, count: partizipZwei.length },
    { id: 'grammatik',   label: 'Grammatik',     icon: '📐', phase: 1 as const, count: grammatik.length },
    
    { id: 'lesen',      label: 'Lesen',         icon: '📖', phase: 2 as const, count: null },
    { id: 'horen',      label: 'Hören',         icon: '🎧', phase: 2 as const, count: null },
    { id: 'uebung',     label: 'Schreiben',     icon: '✍️', phase: 2 as const, count: null },
    { id: 'game',       label: 'Mini Game',     icon: '🎮', phase: 2 as const, count: null },
    { id: 'test',       label: 'Kapiteltest 5', icon: '📝', phase: 3 as const, count: null },
    { id: 'strategie',  label: 'Strategie',     icon: '🧠', phase: 3 as const, count: null },
  ] as const;

  const [activeGameMode, setActiveGameMode] = useState<'wortschatz' | 'partizip' | null>(null);

  return (
    <div className="relative">
      {/* Decorative Blobs */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-sky-200/30 blur-[120px] -z-10 rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-rose-200/30 blur-[120px] -z-10 rounded-full pointer-events-none" />

      {/* ── HERO HEADER ── */}
      <header className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <span className="clay-badge bg-emerald-100 text-emerald-800 border-emerald-300">Level A2</span>
              <span className="clay-badge bg-violet-100 text-violet-800 border-violet-300">Kapitel 5</span>
              <span className="clay-badge bg-amber-100 text-amber-800 border-amber-300">Netzwerk Neu</span>
              <span className="clay-badge bg-rose-100 text-rose-800 border-rose-300">Goethe Ready</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
              {kapitel.nummer}. {kapitel.titel}
              <span className="block text-2xl md:text-3xl font-semibold text-indigo-600 mt-2">{kapitel.untertitel}</span>
            </h1>
            <p className="text-base text-slate-600 font-medium max-w-lg leading-relaxed">
              Belajar berbicara tentang kehidupan di kota, memahami wawancara kerja, mengurus keperluan di bank dan kantor pemerintahan, meminta sesuatu dengan sopan, mengikuti tur kota, dan mendeskripsikan sebuah kota.
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
              { label: 'Goethe Tasks', count: goetheTasks.length, icon: '🎯', bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-300', num: 'text-rose-600' },
              { label: 'Lern-Tipps', count: lernTipps.length, icon: '🧠', bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-300', num: 'text-emerald-600' },
            ].map(stat => (
              <div key={stat.label} className={\`clay-card p-5 text-center \${stat.bg} border-2 \${stat.border}\`}>
                <p className="text-3xl mb-1">{stat.icon}</p>
                <p className={\`text-4xl font-extrabold \${stat.num}\`}>{stat.count}</p>
                <p className={\`text-sm font-bold mt-1 \${stat.text}\`}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6">
        <ProgressTracker kapitelId="kapitel-5" totalSteps={8} currentStepId={activeTab} />
      </div>

      {/* ── LERNPLAN BANNER ── */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div
          className="rounded-[20px] p-5 border-4 border-indigo-900"
          style={{ background: 'linear-gradient(to right, #4F46E5, #0ea5e9)', boxShadow: '6px 6px 0 0 rgba(30,27,75,0.3)' }}
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="text-4xl flex-shrink-0">📅</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-extrabold text-lg text-white">Rencana Belajar 2 Hari — Kapitel 5</h2>
              <p className="text-indigo-100 text-sm mt-1">
                <strong className="text-white">Hari 1 (Pagi):</strong> Wortschatz Stadt & Behörden + Partizip II · &nbsp;
                <strong className="text-white">Hari 1 (Sore):</strong> Grammatik Adjektivendungen + mit/ohne ·{' '}
                <strong className="text-white">Hari 2 (Pagi):</strong> Höfliche Bitten mit könnte + Vorstellungsgespräch ·{' '}
                <strong className="text-white">Hari 2 (Sore):</strong> Stadt-Tour, Stadtbeschreibung, Review & Final Quiz.
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
            <div key={f.label} className={\`text-center py-1.5 rounded-xl border-2 text-[11px] font-black uppercase tracking-wide \${f.color}\`}>
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
                    className={\`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-2xl font-extrabold text-sm whitespace-nowrap cursor-pointer transition-all duration-200 border-2 \${phaseBtn}\`}
                  >
                    <span className={\`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0 \${phaseNum}\`}>{i + 1}</span>
                    <span>{step.icon}</span>
                    <span className="hidden sm:inline">{step.label}</span>
                    {step.count !== null && (
                      <span className={\`px-1.5 py-0.5 rounded-full text-[11px] font-bold \${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}\`}>{step.count}</span>
                    )}
                  </button>
                  {i < steps.length - 1 && (
                    <div className={\`h-0.5 w-5 flex-shrink-0 \${connectorColor}\`} />
                  )}
                </div>
              );
            })}
          </div>
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
                      className={\`px-3 py-1.5 rounded-xl text-sm font-bold cursor-pointer transition-all border-2 \${
                        katFilter === k
                          ? 'bg-indigo-600 text-white border-indigo-900 shadow-[0_2px_0_0_#312E81]'
                          : s
                            ? \`\${s.bg} \${s.text} \${s.border} hover:opacity-80\`
                            : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-400'
                      }\`}
                    >
                      {k}
                    </button>
                  );
                })}
              </div>
            </div>

            {filteredWords.length === 0 ? (
              <p className="text-center text-slate-500 py-10">Tidak ada kosakata untuk kategori ini.</p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {currentWords.map((wort, i) => (
                    <FlashCard key={\`\${wort.de}-\${i}\`} wort={wort} />
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
                    <p className="text-indigo-900 mt-2 text-sm font-bold leading-relaxed">Ketikan bahasa Jerman dari kosakata harian acara, pesta, dan perasaan.</p>
                  </button>

                  {/* Mode Partizip */}
                  <button 
                    onClick={() => setActiveGameMode('partizip')}
                    className="clay-card p-8 bg-orange-50 border-orange-200 border-b-8 text-left hover:translate-y-1 hover:border-b-4 transition-all group cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-sm border border-orange-100 group-hover:scale-110 transition-transform">⏳</div>
                    <h3 className="text-2xl font-black text-orange-950">Partizip II Recall</h3>
                    <p className="text-orange-900 mt-2 text-sm font-bold leading-relaxed">Tebak bentuk Partizip II dan Auxiliar verb (haben/sein) yang benar.</p>
                  </button>
                </div>
              </div>
            ) : activeGameMode === 'wortschatz' ? (
              <div>
                <button onClick={() => setActiveGameMode(null)} className="mb-6 flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors">
                  ← Kembali ke Menu
                </button>
                <WortschatzGame />
              </div>
            ) : (
              <div>
                <button onClick={() => setActiveGameMode(null)} className="mb-6 flex items-center gap-2 text-orange-600 font-bold hover:text-orange-800 transition-colors">
                  ← Kembali ke Menu
                </button>
                <PartizipZweiGame />
              </div>
            )}
          </div>
        )}

        {/* ── PARTIZIP II TAB ── */}
        {activeTab === 'partizip' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Verbformen: Partizip II</h2>
              <p className="text-slate-600 text-sm mt-1">Bentuk Partizip II (Perfekt) dari kata kerja di Kapitel 5.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentPartizipItems.map((item, i) => (
                <div key={i} className="clay-card bg-orange-50 border-orange-200 p-6 flex flex-col items-center justify-center text-center relative group overflow-hidden">
                   <div className="absolute top-0 right-0 w-16 h-16 bg-orange-200 rounded-bl-full opacity-50 -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500" />
                   <span className="text-xs font-black text-orange-400 uppercase tracking-widest mb-2">{item.infinitiv}</span>
                   <p className="text-xl font-black text-slate-900">{item.partizip}</p>
                   <p className="text-sm font-bold text-slate-500 mt-2">({item.hilfsverb})</p>
                   <div className="mt-4 pt-3 border-t-2 border-orange-100 w-full">
                     <p className="text-orange-800 font-bold text-sm">{item.id}</p>
                   </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPartizipPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button 
                  onClick={() => setPartizipPage(p => Math.max(1, p - 1))}
                  disabled={partizipPage === 1}
                  className="p-3 rounded-xl bg-white border-2 border-slate-200 font-bold text-slate-600 hover:border-slate-400 hover:text-slate-900 disabled:opacity-50 transition-all"
                >
                  ← Prev
                </button>
                <span className="font-black text-slate-400">
                  Halaman {partizipPage} dari {totalPartizipPages}
                </span>
                <button 
                  onClick={() => setPartizipPage(p => Math.min(totalPartizipPages, p + 1))}
                  disabled={partizipPage === totalPartizipPages}
                  className="p-3 rounded-xl bg-white border-2 border-slate-200 font-bold text-slate-600 hover:border-slate-400 hover:text-slate-900 disabled:opacity-50 transition-all"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── GRAMMATIK TAB ── */}
        {activeTab === 'grammatik' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Grammatik</h2>
              <p className="text-slate-600 text-sm mt-1">Tata bahasa utama di Kapitel 5.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              {grammatik.map((g, i) => (
                <div key={i} className={g.titel.includes('Nebensatz') ? 'lg:col-span-2' : ''}>
                    <GrammatikKarte gram={g} />
                </div>
              ))}
            </div>
              <div className="mt-12">
              <GrammatikInteraktiv5 />
            </div>
          </div>
        )}

        {/* ── STRATEGIE TAB ── */}
        {activeTab === 'strategie' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Strategi Belajar Efektif</h2>
              <p className="text-slate-600 text-sm mt-1">Terapkan tips ini untuk memaksimalkan hasil belajar Anda.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lernTipps.map((tipp) => (
                <div key={tipp.nummer} className="clay-card bg-white p-6 relative overflow-hidden group">
                  <div className={\`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br \${lernTippStyles[tipp.farbe]} opacity-10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110\`} />
                  <span className={\`inline-block px-3 py-1 rounded-full text-xs font-bold bg-\${tipp.farbe}-100 text-\${tipp.farbe}-700 mb-4\`}>
                    Tip #{tipp.nummer}
                  </span>
                  <div className="text-4xl mb-4">{tipp.icon}</div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">{tipp.titel}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{tipp.beschreibung}</p>
                  <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block pt-4 border-t border-slate-100">
                    {tipp.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PLACEHOLDER TABS ── */}
        {activeTab === 'lesen' && <LesenInteraktiv5 />}
        {activeTab === 'horen' && <HorenInteraktiv5 />}
        {activeTab === 'uebung' && <UebungInteraktiv5 />}
        {activeTab === 'test' && <KapitelTest5 />}

      </main>
    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, '../app/dashboard/kapitel-5/page.tsx'), content, 'utf8');
console.log("Created kapitel-5/page.tsx with kapitel-4 template");
