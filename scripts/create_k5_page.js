const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../app/dashboard/kapitel-5');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

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
  { de: 'das Krankenhaus', plural: 'die Krankenhäuser', id: 'rumah sakit', beispiel: 'Er liegt im Krankenhaus.', kategorie: 'Stadt & Gesundheit' },
  { de: 'die Müllabfuhr', plural: 'Sg.', id: 'layanan pengangkutan sampah', beispiel: 'Die Müllabfuhr kommt am Montag.', kategorie: 'Stadtservice' },
  { de: 'die Straßenreinigung', plural: 'Sg.', id: 'pembersihan jalan', beispiel: 'Die Straßenreinigung macht die Straße sauber.', kategorie: 'Stadtservice' },
  { de: 'die Polizei', plural: 'Sg.', id: 'polisi', beispiel: 'Die Polizei beschützt die Menschen.', kategorie: 'Sicherheit' },
  { de: 'das Restaurant', plural: 'die Restaurants', id: 'restoran', beispiel: 'Im Restaurant serviert der Kellner das Essen.', kategorie: 'Stadt' },
  { de: 'die Behörde', plural: 'die Behörden', id: 'kantor pemerintahan', beispiel: 'Bei der Behörde prüft der Beamte die Dokumente.', kategorie: 'Behörde' },
  { de: 'das Amt', plural: 'die Ämter', id: 'kantor pemerintahan', beispiel: 'Ich muss zum Amt gehen.', kategorie: 'Behörde' },
  { de: 'die Straßenbahn', plural: 'die Straßenbahnen', id: 'trem', beispiel: 'Wir fahren mit der Straßenbahn.', kategorie: 'Verkehr' },
  { de: 'die U-Bahn', plural: 'die U-Bahnen', id: 'kereta bawah tanah', beispiel: 'Die U-Bahn ist sehr schnell.', kategorie: 'Verkehr' },
  { de: 'die Feuerwehr', plural: 'die Feuerwehren', id: 'pemadam kebakaran', beispiel: 'Die Feuerwehr hilft bei Feuer.', kategorie: 'Sicherheit' },
  { de: 'die Universität', plural: 'die Universitäten', id: 'universitas', beispiel: 'Er studiert an der Universität.', kategorie: 'Bildung' },
  { de: 'der Park', plural: 'die Parks', id: 'taman', beispiel: 'Wir gehen im Park spazieren.', kategorie: 'Stadt' },
  { de: 'die Sicherheit', plural: 'Sg.', id: 'keamanan', beispiel: 'Sicherheit ist wichtig.', kategorie: 'Sicherheit' },
  { de: 'die Ordnung', plural: 'Sg.', id: 'ketertiban', beispiel: 'Wir brauchen Ordnung.', kategorie: 'Stadtservice' },
  { de: 'der Müll', plural: 'Sg.', id: 'sampah', beispiel: 'Bitte wirf den Müll weg.', kategorie: 'Stadtservice' },
  { de: 'das Formular', plural: 'die Formulare', id: 'formulir', beispiel: 'Bitte füllen Sie das Formular aus.', kategorie: 'Behörde' },
  { de: 'der Antrag', plural: 'die Anträge', id: 'permohonan', beispiel: 'Ich stelle einen Antrag.', kategorie: 'Behörde' },
  { de: 'das Dokument', plural: 'die Dokumente', id: 'dokumen', beispiel: 'Haben Sie alle Dokumente?', kategorie: 'Behörde' },
  { de: 'der Pass', plural: 'die Pässe', id: 'paspor', beispiel: 'Mein Pass ist nicht mehr gültig.', kategorie: 'Behörde' },
  { de: 'das Visum', plural: 'die Visa', id: 'visa', beispiel: 'Ich brauche ein Visum.', kategorie: 'Behörde' },
  { de: 'die Bank', plural: 'die Banken', id: 'bank', beispiel: 'Ich muss zur Bank gehen.', kategorie: 'Bank' },
  { de: 'das Konto', plural: 'die Konten', id: 'rekening', beispiel: 'Ich möchte ein Konto eröffnen.', kategorie: 'Bank' },
  { de: 'die Stellenanzeige', plural: 'die Stellenanzeigen', id: 'lowongan kerja', beispiel: 'Ich habe eine Stellenanzeige gelesen.', kategorie: 'Arbeit' },
  { de: 'das Vorstellungsgespräch', plural: 'die Vorstellungsgespräche', id: 'wawancara kerja', beispiel: 'Morgen habe ich ein Vorstellungsgespräch.', kategorie: 'Arbeit' },
  { de: 'die Erfahrung', plural: 'die Erfahrungen', id: 'pengalaman', beispiel: 'Haben Sie schon Erfahrung?', kategorie: 'Arbeit' }
];

const partizipZwei = [
  { inf: 'sein', p2: 'gewesen', hilfsverb: 'ist', id: 'menjadi/berada', bsp: 'Ich bin gestern in Wien gewesen.' },
  { inf: 'haben', p2: 'gehabt', hilfsverb: 'hat', id: 'mempunyai', bsp: 'Wir haben Glück gehabt.' },
  { inf: 'machen', p2: 'gemacht', hilfsverb: 'hat', id: 'melakukan', bsp: 'Ich habe einen Spaziergang gemacht.' },
  { inf: 'erzählen', p2: 'erzählt', hilfsverb: 'hat', id: 'menceritakan', bsp: 'Sie hat mir viel über Wien erzählt.' },
  { inf: 'ansehen', p2: 'angesehen', hilfsverb: 'hat', id: 'melihat', bsp: 'Ich habe mir den Stephansdom angesehen.' },
  { inf: 'fragen', p2: 'gefragt', hilfsverb: 'hat', id: 'bertanya', bsp: 'Ich habe nach einem Job gefragt.' },
  { inf: 'gefallen', p2: 'gefallen', hilfsverb: 'hat', id: 'menyukai', bsp: 'Wien hat mir sehr gut gefallen.' },
  { inf: 'arbeiten', p2: 'gearbeitet', hilfsverb: 'hat', id: 'bekerja', bsp: 'Hast du schon in Restaurants gearbeitet?' },
  { inf: 'bewerben', p2: 'beworben', hilfsverb: 'hat', id: 'melamar', bsp: 'Ich habe mich vor drei Wochen beworben.' },
  { inf: 'helfen', p2: 'geholfen', hilfsverb: 'hat', id: 'membantu', bsp: 'Er hat mir sehr geholfen.' },
  { inf: 'geben', p2: 'gegeben', hilfsverb: 'hat', id: 'memberi', bsp: 'Der Chef hat mir heute Bescheid gegeben.' },
  { inf: 'fahren', p2: 'gefahren', hilfsverb: 'ist', id: 'pergi', bsp: 'Herr Ziegler ist mit der U-Bahn gefahren.' },
  { inf: 'gehen', p2: 'gegangen', hilfsverb: 'ist', id: 'pergi', bsp: 'Frau Nowak ist zur Behörde gegangen.' },
  { inf: 'abgeben', p2: 'abgegeben', hilfsverb: 'hat', id: 'menyerahkan', bsp: 'Ich habe die Unterlagen abgegeben.' },
  { inf: 'überweisen', p2: 'überwiesen', hilfsverb: 'hat', id: 'mentransfer', bsp: 'Ich habe den Betrag überwiesen.' },
  { inf: 'lesen', p2: 'gelesen', hilfsverb: 'hat', id: 'membaca', bsp: 'Max hat den Zettel gelesen.' },
  { inf: 'bedienen', p2: 'bedient', hilfsverb: 'hat', id: 'melayani', bsp: 'Max hat Kunden bedient.' },
  { inf: 'leihen', p2: 'geliehen', hilfsverb: 'hat', id: 'meminjamkan', bsp: 'Ich habe Geld geliehen.' },
  { inf: 'bringen', p2: 'gebracht', hilfsverb: 'hat', id: 'membawa', bsp: 'Er hat die Unterlagen gebracht.' },
  { inf: 'trinken', p2: 'getrunken', hilfsverb: 'hat', id: 'minum', bsp: 'Wir haben Kaffee getrunken.' },
  { inf: 'gewinnen', p2: 'gewonnen', hilfsverb: 'hat', id: 'menang', bsp: 'Die Mannschaft hat gewonnen.' }
];

export default function Kapitel5() {
  const [activeTab, setActiveTab] = useState<'übersicht' | 'wortschatz' | 'partizip2' | 'quiz' | 'übung'>('übersicht');
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  
  // Flashcard state
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardsPerSet, setCardsPerSet] = useState(10);
  const [currentSet, setCurrentSet] = useState(0);
  
  // Partizip 2 state
  const [currentP2Page, setCurrentP2Page] = useState(0);
  const p2PerPage = 8;
  const [activeP2Game, setActiveP2Game] = useState(false);
  
  // Quiz states
  const [quizScore, setQuizScore] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  
  const totalSets = Math.ceil(wortschatz.length / cardsPerSet);
  const currentWords = wortschatz.slice(currentSet * cardsPerSet, (currentSet + 1) * cardsPerSet);
  
  const totalP2Pages = Math.ceil(partizipZwei.length / p2PerPage);
  const currentP2Words = partizipZwei.slice(currentP2Page * p2PerPage, (currentP2Page + 1) * p2PerPage);

  const modules = [
    { id: 'k5-wortschatz-stadt', title: 'Wortschatz: Stadt', type: 'wortschatz', req: true, component: null },
    { id: 'k5-neu-in-wien', title: 'Lesen: Neu in Wien', type: 'lesen', req: true, component: <LesenInteraktiv5 /> },
    { id: 'k5-vorstellungsgespraech', title: 'Job & Vorstellungsgespräch', type: 'übung', req: true, component: <UebungInteraktiv5 /> },
    { id: 'k5-adjektive', title: 'Grammatik: Adjektive', type: 'grammatik', req: true, component: <GrammatikInteraktiv5 /> },
    { id: 'k5-bank-behoerde', title: 'Bank, Behörde, Polizei', type: 'wortschatz', req: true, component: null },
    { id: 'k5-rund-um-den-ring', title: 'Stadt-Tour Wien', type: 'hören', req: true, component: <HorenInteraktiv5 /> },
    { id: 'k5-final-quiz', title: 'Final Mastery Quiz', type: 'test', req: true, component: <KapitelTest5 /> },
  ];

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard((prev) => (prev + 1) % currentWords.length);
    }, 150);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCard((prev) => (prev - 1 + currentWords.length) % currentWords.length);
    }, 150);
  };

  // ------------------------------------------
  // ARTICLE QUIZ (Der, Die, Das)
  // ------------------------------------------
  const nounsOnly = wortschatz.filter(w => w.de.startsWith('der ') || w.de.startsWith('die ') || w.de.startsWith('das '));
  const [articleQuestions, setArticleQuestions] = useState<any[]>([]);

  const startArticleQuiz = () => {
    const shuffled = [...nounsOnly].sort(() => 0.5 - Math.random()).slice(0, 10);
    const questions = shuffled.map(w => {
      const parts = w.de.split(' ');
      return {
        word: parts[1],
        answer: parts[0],
        options: ['der', 'die', 'das'],
        translation: w.id
      };
    });
    setArticleQuestions(questions);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizFinished(false);
    setActiveQuiz('artikel');
  };

  // ------------------------------------------
  // PARTIZIP II QUIZ (Game)
  // ------------------------------------------
  const [p2Questions, setP2Questions] = useState<any[]>([]);
  const startP2Quiz = () => {
    const shuffled = [...partizipZwei].sort(() => 0.5 - Math.random()).slice(0, 10);
    setP2Questions(shuffled);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizFinished(false);
    setActiveP2Game(true);
  };

  // ------------------------------------------
  // RENDER HELPERS
  // ------------------------------------------
  const renderQuiz = () => {
    if (activeQuiz === 'artikel') {
      if (quizFinished) return renderQuizResult('Artikel Quiz');
      const q = articleQuestions[quizIndex];
      return (
        <div className="clay-card p-8 bg-white max-w-lg mx-auto animate-in fade-in zoom-in duration-300">
          <div className="flex justify-between text-slate-400 font-bold mb-6">
            <span>Frage {quizIndex + 1}/10</span>
            <span>Punkte: {quizScore}</span>
          </div>
          <div className="text-center mb-8">
            <h3 className="text-4xl font-black text-slate-800 mb-2">{q?.word}</h3>
            <p className="text-slate-500 italic">{q?.translation}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {q?.options.map((opt: string) => (
              <button
                key={opt}
                onClick={() => {
                  if (opt === q.answer) setQuizScore(s => s + 10);
                  if (quizIndex < 9) setQuizIndex(i => i + 1);
                  else setQuizFinished(true);
                }}
                className="py-4 rounded-xl border-2 border-slate-200 font-black text-xl hover:border-sky-400 hover:bg-sky-50 hover:text-sky-600 transition-all active:scale-95"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderQuizResult = (title: string) => (
    <div className="clay-card p-8 bg-white max-w-lg mx-auto text-center animate-in slide-in-from-bottom-8">
      <div className="text-6xl mb-6">{quizScore >= 80 ? '🏆' : '💪'}</div>
      <h3 className="text-3xl font-black text-slate-800 mb-2">{title} Abgeschlossen!</h3>
      <p className="text-slate-600 mb-8 font-medium">Dein Ergebnis: <span className="font-black text-sky-500 text-2xl">{quizScore}%</span></p>
      <button 
        onClick={() => { setActiveQuiz(null); setActiveP2Game(false); }}
        className="w-full py-4 bg-slate-900 text-white font-black rounded-xl hover:bg-slate-800 active:scale-95 transition-all"
      >
        Zurück zur Übersicht
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20 font-sans selection:bg-rose-200 selection:text-rose-900">
      <div className="bg-white border-b-2 border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black">
              K5
            </div>
            <div>
              <h1 className="font-black text-slate-900 leading-tight tracking-tight">Leben in der Stadt</h1>
              <p className="text-xs font-bold text-slate-500">{kapitel.level} • {kapitel.untertitel}</p>
            </div>
          </div>
          <div className="hidden md:flex gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {['übersicht', 'wortschatz', 'partizip2', 'übung'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab as any); setActiveQuiz(null); setActiveP2Game(false); }}
                className={\`px-4 py-2 rounded-lg font-bold text-sm capitalize transition-all \${
                  activeTab === tab 
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }\`}
              >
                {tab === 'übersicht' ? '📖 Übersicht' : tab === 'wortschatz' ? '🗂️ Wortschatz' : tab === 'partizip2' ? '⏳ Partizip II' : '🚀 Module'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProgressTracker 
          chapterId="kapitel-5"
          modules={modules.map(m => ({ id: m.id, title: m.title, type: m.type as any, masteryRequired: m.req }))}
        />

        <div className="mt-8">
          {activeTab === 'übersicht' && !activeQuiz && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="clay-card p-8 bg-sky-500 text-white border-b-8 border-sky-700 rounded-3xl">
                  <h2 className="text-3xl font-black mb-4">Willkommen in Kapitel 5! 👋</h2>
                  <p className="text-sky-100 font-medium leading-relaxed mb-6 text-lg">
                    In diesem Kapitel lernen wir, über das Leben in der Stadt zu sprechen, Dinge bei Behörden und Banken zu erledigen und uns auf ein Vorstellungsgespräch vorzubereiten.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {kapitel.goetheFokus.map(fokus => (
                      <span key={fokus} className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl font-bold text-sm border border-white/30">
                        🎯 {fokus}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button onClick={() => setActiveTab('wortschatz')} className="group text-left clay-card p-6 bg-white hover:bg-rose-50 border-2 border-slate-200 hover:border-rose-400 transition-all rounded-3xl">
                    <div className="w-12 h-12 bg-rose-100 text-rose-500 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🗂️</div>
                    <h3 className="font-black text-slate-800 text-lg mb-1">Wortschatz lernen</h3>
                    <p className="text-slate-500 text-sm font-medium">Stadt, Ämter & Berufe ({wortschatz.length} Wörter)</p>
                  </button>
                  <button onClick={startArticleQuiz} className="group text-left clay-card p-6 bg-white hover:bg-emerald-50 border-2 border-slate-200 hover:border-emerald-400 transition-all rounded-3xl">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-500 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">🎲</div>
                    <h3 className="font-black text-slate-800 text-lg mb-1">Der, Die oder Das?</h3>
                    <p className="text-slate-500 text-sm font-medium">Artikel-Quiz starten</p>
                  </button>
                </div>
              </div>
              <div className="space-y-6">
                <div className="clay-card p-6 bg-slate-900 text-white rounded-3xl border-2 border-slate-800">
                  <h3 className="font-black text-xl mb-4 text-emerald-400">Lernziele 🚀</h3>
                  <ul className="space-y-3">
                    {['Ein Vorstellungsgespräch verstehen', 'Gespräche bei Banken und Behörden', 'Höflich um etwas bitten', 'Adjektive nach dem bestimmten Artikel', 'Präpositionen mit und ohne'].map((ziel, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-emerald-500 mt-1">✔</span>
                        <span className="text-slate-300 font-medium leading-tight">{ziel}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wortschatz' && !activeQuiz && (
            <div className="space-y-8 animate-in slide-in-from-bottom-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black text-slate-800">Wortschatz Karten</h2>
                <div className="flex gap-2">
                  <select 
                    className="p-2 bg-white border-2 border-slate-200 rounded-xl font-bold text-slate-600 outline-none focus:border-sky-400"
                    value={cardsPerSet}
                    onChange={(e) => { setCardsPerSet(Number(e.target.value)); setCurrentSet(0); setCurrentCard(0); }}
                  >
                    <option value={10}>10 pro Set</option>
                    <option value={20}>20 pro Set</option>
                    <option value={wortschatz.length}>Alle Wörter</option>
                  </select>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-full max-w-2xl relative perspective-1000 mb-8" style={{ height: '350px' }}>
                  <div 
                    className={\`w-full h-full absolute transition-all duration-500 transform-style-3d cursor-pointer \${isFlipped ? 'rotate-y-180' : ''}\`}
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    <div className="absolute w-full h-full backface-hidden clay-card bg-white border-2 border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center hover:border-sky-300 transition-colors">
                      <span className="absolute top-6 left-6 text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-lg">Deutsch</span>
                      <span className="absolute top-6 right-6 text-xs font-bold text-sky-500 bg-sky-50 px-3 py-1 rounded-lg">{currentWords[currentCard]?.kategorie}</span>
                      <h3 className="text-5xl font-black text-slate-800 mb-4">{currentWords[currentCard]?.de}</h3>
                      {currentWords[currentCard]?.plural && currentWords[currentCard].plural !== '' && (
                        <p className="text-xl font-bold text-slate-400">Pl: {currentWords[currentCard].plural}</p>
                      )}
                      <p className="absolute bottom-6 text-sm font-bold text-slate-400">Klicken zum Umdrehen</p>
                    </div>
                    <div className="absolute w-full h-full backface-hidden rotate-y-180 clay-card bg-slate-900 border-2 border-slate-800 rounded-3xl flex flex-col items-center justify-center p-8 text-center text-white">
                      <span className="absolute top-6 left-6 text-xs font-black text-slate-500 uppercase tracking-widest bg-slate-800 px-3 py-1 rounded-lg">Indonesisch</span>
                      <h3 className="text-4xl font-black text-emerald-400 mb-6 leading-tight">{currentWords[currentCard]?.id}</h3>
                      {currentWords[currentCard]?.beispiel && (
                        <div className="bg-white/10 p-4 rounded-xl max-w-sm border border-white/10">
                          <p className="text-sm font-medium text-slate-300 italic">" {currentWords[currentCard].beispiel} "</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <button onClick={handlePrevCard} className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-sky-500 hover:border-sky-300 transition-all font-black text-xl shadow-sm active:scale-95">←</button>
                  <span className="font-black text-slate-500 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200">
                    {currentCard + 1} / {currentWords.length}
                  </span>
                  <button onClick={handleNextCard} className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-sky-500 hover:border-sky-300 transition-all font-black text-xl shadow-sm active:scale-95">→</button>
                </div>

                {totalSets > 1 && (
                  <div className="flex gap-2 mt-8 flex-wrap justify-center">
                    {Array.from({length: totalSets}).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => { setCurrentSet(i); setCurrentCard(0); setIsFlipped(false); }}
                        className={\`px-4 py-2 rounded-xl font-bold transition-all border-2 \${
                          currentSet === i ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'
                        }\`}
                      >
                        Set {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'partizip2' && !activeP2Game && (
            <div className="space-y-8 animate-in slide-in-from-bottom-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-amber-50 p-6 rounded-3xl border-2 border-amber-200">
                <div>
                  <h2 className="text-2xl font-black text-amber-900 flex items-center gap-2">
                    <span>⏳</span> Partizip II im Kapitel 5
                  </h2>
                  <p className="text-amber-700 font-medium mt-1">Lerne die wichtigen Verbformen der Vergangenheit für dieses Kapitel.</p>
                </div>
                <button 
                  onClick={startP2Quiz}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-xl shadow-[0_4px_0_rgb(180,83,9)] hover:shadow-[0_2px_0_rgb(180,83,9)] hover:translate-y-[2px] transition-all"
                >
                  Game Starten 🎮
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentP2Words.map((v, i) => (
                  <div key={i} className="bg-white border-2 border-slate-200 rounded-2xl p-5 hover:border-amber-300 transition-colors group relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Infinitiv</div>
                    <div className="text-xl font-black text-slate-800 mb-3">{v.inf}</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Partizip II</div>
                    <div className="text-lg font-bold text-amber-600 mb-3 flex items-center gap-2">
                      <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-sm">{v.hilfsverb}</span>
                      {v.p2}
                    </div>
                    <div className="text-sm font-medium text-slate-500 mb-2">{v.id}</div>
                    <div className="text-xs italic text-slate-400 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      "{v.bsp}"
                    </div>
                  </div>
                ))}
              </div>

              {totalP2Pages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({length: totalP2Pages}).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentP2Page(i)}
                      className={\`w-10 h-10 rounded-xl font-bold flex items-center justify-center transition-all border-2 \${
                        currentP2Page === i ? 'bg-amber-500 text-white border-amber-600' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'
                      }\`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PARTIZIP 2 GAME COMPONENT */}
          {activeTab === 'partizip2' && activeP2Game && (
             <div className="clay-card p-8 bg-white max-w-2xl mx-auto animate-in zoom-in duration-300 border-2 border-amber-200">
               {quizFinished ? (
                 <div className="text-center">
                   <div className="text-6xl mb-4">{quizScore >= 80 ? '🏆' : '💪'}</div>
                   <h3 className="text-3xl font-black text-slate-800 mb-2">Game Over!</h3>
                   <p className="text-slate-600 mb-8 font-medium">Dein Score: <span className="font-black text-amber-500 text-2xl">{quizScore}%</span></p>
                   <button 
                     onClick={() => { setActiveP2Game(false); }}
                     className="px-8 py-4 bg-amber-500 text-white font-black rounded-xl hover:bg-amber-600 transition-all"
                   >
                     Zurück zur Liste
                   </button>
                 </div>
               ) : (
                 <>
                   <div className="flex justify-between text-slate-400 font-bold mb-8">
                     <span className="bg-slate-100 px-3 py-1 rounded-lg">Wort {quizIndex + 1}/10</span>
                     <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-lg">Score: {quizScore}</span>
                   </div>
                   
                   <div className="text-center mb-10">
                     <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Bilde das Partizip II</div>
                     <h3 className="text-5xl font-black text-slate-800">{p2Questions[quizIndex]?.inf}</h3>
                     <p className="text-slate-500 mt-2 font-medium">{p2Questions[quizIndex]?.id}</p>
                   </div>

                   <div className="space-y-6">
                     <div className="flex items-center gap-4">
                       <span className="w-24 text-right font-bold text-slate-500 uppercase text-xs tracking-wider">Hilfsverb</span>
                       <div className="flex flex-1 gap-2">
                         {['hat', 'ist'].map(hv => (
                           <button 
                             key={hv}
                             onClick={() => {
                               // Quick inline validation
                               const q = p2Questions[quizIndex];
                               const btn = document.getElementById(\`hv-\${hv}\`);
                               if(hv === q.hilfsverb) {
                                 btn?.classList.add('bg-emerald-500', 'text-white', 'border-emerald-600');
                                 setQuizScore(s => s + 5);
                               } else {
                                 btn?.classList.add('bg-rose-500', 'text-white', 'border-rose-600');
                               }
                             }}
                             id={\`hv-\${hv}\`}
                             className="flex-1 py-3 border-2 border-slate-200 rounded-xl font-black text-slate-700 hover:bg-slate-50 transition-colors"
                           >
                             {hv}
                           </button>
                         ))}
                       </div>
                     </div>

                     <div className="flex items-center gap-4">
                       <span className="w-24 text-right font-bold text-slate-500 uppercase text-xs tracking-wider">Partizip</span>
                       <div className="flex-1 flex gap-2">
                         <input 
                           type="text" 
                           id="p2-input"
                           className="flex-1 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl font-bold text-xl outline-none focus:border-amber-400"
                           placeholder="z.B. gemacht"
                           onKeyDown={(e) => {
                             if(e.key === 'Enter') {
                               const val = (e.target as HTMLInputElement).value.trim().toLowerCase();
                               const q = p2Questions[quizIndex];
                               if(val === q.p2.toLowerCase()) {
                                 setQuizScore(s => s + 5);
                                 (e.target as HTMLInputElement).classList.add('border-emerald-500', 'bg-emerald-50', 'text-emerald-700');
                               } else {
                                 (e.target as HTMLInputElement).classList.add('border-rose-500', 'bg-rose-50', 'text-rose-700');
                                 (e.target as HTMLInputElement).value = q.p2; // show correct
                               }
                               
                               setTimeout(() => {
                                 (e.target as HTMLInputElement).value = '';
                                 (e.target as HTMLInputElement).className = "flex-1 p-4 bg-slate-50 border-2 border-slate-200 rounded-xl font-bold text-xl outline-none focus:border-amber-400";
                                 ['hat', 'ist'].forEach(hv => {
                                   document.getElementById(\`hv-\${hv}\`)?.className.replace(/bg-(emerald|rose)-500 text-white border-(emerald|rose)-600/g, '');
                                   document.getElementById(\`hv-\${hv}\`)?.setAttribute('class', 'flex-1 py-3 border-2 border-slate-200 rounded-xl font-black text-slate-700 hover:bg-slate-50 transition-colors');
                                 });
                                 
                                 if (quizIndex < 9) setQuizIndex(i => i + 1);
                                 else setQuizFinished(true);
                               }, 1500);
                             }
                           }}
                         />
                       </div>
                     </div>
                     <p className="text-center text-xs font-bold text-slate-400">Drücke Enter nach der Eingabe</p>
                   </div>
                 </>
               )}
             </div>
          )}

          {activeTab === 'übung' && !activeQuiz && (
            <div className="space-y-6">
              {modules.filter(m => m.component).map((mod, i) => (
                <div key={mod.id} className="clay-card bg-white p-8 rounded-3xl border-2 border-slate-200 flex flex-col md:flex-row items-center gap-8 group">
                  <div className="w-24 h-24 flex-shrink-0 bg-slate-50 rounded-2xl border-2 border-slate-200 flex items-center justify-center text-4xl group-hover:scale-105 group-hover:bg-sky-50 group-hover:border-sky-200 transition-all">
                    {mod.type === 'lesen' ? '📖' : mod.type === 'hören' ? '🎧' : mod.type === 'übung' ? '✍️' : mod.type === 'grammatik' ? '🧩' : '🏆'}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{mod.type}</span>
                      {mod.req && <span className="text-[10px] font-black uppercase tracking-widest text-rose-500 bg-rose-50 border border-rose-100 px-2 py-1 rounded-md">Mastery Required</span>}
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2 group-hover:text-sky-600 transition-colors">{mod.title}</h3>
                    <p className="text-slate-500 font-medium">Interaktive Übung {i + 1}</p>
                  </div>
                  <button 
                    onClick={() => setActiveQuiz(mod.id)}
                    className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white font-black rounded-xl hover:bg-sky-600 active:scale-95 transition-all shadow-md"
                  >
                    Starten →
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Render Active Module */}
          {activeQuiz && activeQuiz !== 'artikel' && activeTab === 'übung' && (
            <div className="animate-in slide-in-from-right-8 duration-500">
              <button 
                onClick={() => setActiveQuiz(null)}
                className="mb-6 flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
              >
                ← Zurück zur Übersicht
              </button>
              {modules.find(m => m.id === activeQuiz)?.component}
            </div>
          )}

          {activeQuiz === 'artikel' && renderQuiz()}

        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync(path.join(dir, 'page.tsx'), content, 'utf8');
console.log("Created kapitel-5/page.tsx");
