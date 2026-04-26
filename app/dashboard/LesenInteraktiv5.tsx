"use client";

import React, { useState } from 'react';

export function LesenInteraktiv5() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number | null>>({});
  const [isCorrect, setIsCorrect] = useState<Record<number, boolean | null>>({});
  const [activeWord, setActiveWord] = useState<string | null>(null);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setSelectedAnswers({});
    setIsCorrect({});
    setActiveWord(null);
  };

  const dictionary: Record<string, { meaning: string, type: string }> = {
    // G1
    "vorgestern": { meaning: "kemarin lusa", type: "Adverbia" },
    "vermieterin": { meaning: "ibu kos / pemilik sewa", type: "Kata Benda" },
    "erzählt": { meaning: "menceritakan (Partizip II)", type: "Kata Kerja" },
    "hell": { meaning: "terang", type: "Kata Sifat" },
    "stephansdom": { meaning: "Gereja Katedral di Wina", type: "Kata Benda" },
    "zentrum": { meaning: "pusat kota", type: "Kata Benda" },
    "spaziergang": { meaning: "jalan-jalan", type: "Kata Benda" },
    "aushilfe": { meaning: "pekerja bantuan / sambilan", type: "Kata Benda" },
    "gefragt": { meaning: "bertanya (Partizip II)", type: "Kata Kerja" },
    "termin": { meaning: "janji temu", type: "Kata Benda" },
    "vorstellungsgespräch": { meaning: "wawancara kerja", type: "Kata Benda" },
    "erledigen": { meaning: "menyelesaikan / mengurus", type: "Kata Kerja" },
    "konto": { meaning: "rekening", type: "Kata Benda" },
    "eröffnen": { meaning: "membuka", type: "Kata Kerja" },
    "lohn": { meaning: "gaji / upah", type: "Kata Benda" },

    // G2
    "stadt-tour": { meaning: "tur kota", type: "Kata Benda" },
    "rund": { meaning: "seputar / keliling", type: "Adverbia" },
    "ring": { meaning: "jalan lingkar di Wina", type: "Kata Benda" },
    "startet": { meaning: "memulai", type: "Kata Kerja" },
    "schwedenplatz": { meaning: "Nama alun-alun di Wina", type: "Kata Benda" },
    "wichtigsten": { meaning: "paling penting", type: "Kata Sifat" },
    "sehenswürdigkeiten": { meaning: "tempat wisata / atraksi", type: "Kata Benda" },
    "vorbei": { meaning: "melewati", type: "Adverbia" },
    "staatsoper": { meaning: "gedung opera negara", type: "Kata Benda" },
    "parlament": { meaning: "gedung parlemen", type: "Kata Benda" },
    "rathaus": { meaning: "balai kota", type: "Kata Benda" },
    "universität": { meaning: "universitas", type: "Kata Benda" },
    "dauert": { meaning: "berlangsung (durasi)", type: "Kata Kerja" },
    "gemütlich": { meaning: "nyaman / santai", type: "Kata Sifat" },
    "aussteigen": { meaning: "turun (dari kendaraan)", type: "Kata Kerja" },
    "fotografieren": { meaning: "memotret", type: "Kata Kerja" },

    // G3
    "hauptstadt": { meaning: "ibu kota", type: "Kata Benda" },
    "schweiz": { meaning: "Swiss", type: "Kata Benda" },
    "einwohner": { meaning: "penduduk", type: "Kata Benda" },
    "altstadt": { meaning: "kota tua", type: "Kata Benda" },
    "bekannt": { meaning: "terkenal", type: "Kata Sifat" },
    "wunderschön": { meaning: "sangat indah", type: "Kata Sifat" },
    "besonders": { meaning: "terutama / sangat", type: "Adverbia" },
    "gebäude": { meaning: "bangunan", type: "Kata Benda" },
    "fließt": { meaning: "mengalir", type: "Kata Kerja" },
    "fluss": { meaning: "sungai", type: "Kata Benda" },
    "brücken": { meaning: "jembatan (Plural)", type: "Kata Benda" },
    "spazieren": { meaning: "berjalan-jalan", type: "Kata Kerja" },
    "teil": { meaning: "bagian", type: "Kata Benda" }
  };

  const renderInteractiveText = (text: string) => {
    return text.split(' ').map((word, index) => {
      const cleanWord = word.replace(/[.,?!:;]/g, '').toLowerCase();
      const punctuationMatch = word.match(/[.,?!:;]+$/);
      const punctuation = punctuationMatch ? punctuationMatch[0] : '';
      const baseWord = word.replace(/[.,?!:;]+$/, '');
      
      const entry = dictionary[cleanWord];

      if (entry) {
        const wordId = `${text.substring(0,10)}-${index}`;
        const isActive = activeWord === wordId;
        return (
          <span 
            key={index} 
            className="group relative inline-block mx-[2px] cursor-help"
            onClick={() => setActiveWord(isActive ? null : wordId)}
            onMouseEnter={() => setActiveWord(wordId)}
            onMouseLeave={() => setActiveWord(null)}
          >
            <span className={`border-b border-dashed transition-colors duration-200 ${isActive ? 'border-pink-500 text-pink-600' : 'border-amber-500 hover:border-pink-500 hover:text-pink-600'}`}>
              {baseWord}
            </span>
            {punctuation}
            <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs bg-slate-900 border border-slate-700 text-white text-xs px-3 py-2 rounded-xl transition-all duration-200 pointer-events-none z-20 shadow-xl shadow-black/50 ${isActive ? 'opacity-100 -translate-y-1' : 'opacity-0 translate-y-0'}`}>
              <span className="block font-black text-pink-400 mb-1 text-[10px] tracking-wider uppercase">{entry.type}</span>
              <span className="block font-medium">{entry.meaning}</span>
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></span>
            </span>
          </span>
        );
      }
      return <span key={index} className="mx-[2px]">{word} </span>;
    });
  };

  const stories = [
    {
      id: 1,
      title: "Text 1: Neu in Wien",
      desc: "Valentinas Blog über ihre ersten Tage in der Stadt.",
      content: (
        <div className="space-y-4 text-amber-900 font-medium leading-relaxed text-lg">
          <p>{renderInteractiveText("Valentina ist seit vorgestern in Wien. Sie findet Wien sehr schön. Ihre Vermieterin ist nett und hat ihr viel über Wien erzählt. Ihr Zimmer ist klein, aber hell und schön.")}</p>
          <p>{renderInteractiveText("Sie hat den Stephansdom gesehen und im Zentrum einen Spaziergang gemacht. Außerdem hat sie in Restaurants und Cafés nach einem Job als Aushilfe gefragt. Sie hat einen Termin für ein Vorstellungsgespräch in einem Restaurant. Danach muss sie noch Dinge erledigen, zum Beispiel bei der Bank ein Konto für ihren Lohn eröffnen.")}</p>
        </div>
      ),
      questions: [
        {
          q: "1. Wie findet Valentina ihr Zimmer?",
          options: [
            "Es ist groß und dunkel.",
            "Es ist klein, aber hell und schön.",
            "Es ist laut und schmutzig."
          ],
          correct: 1
        },
        {
          q: "2. Was hat Valentina im Zentrum gemacht?",
          options: [
            "Sie hat ein Konto eröffnet.",
            "Sie hat ihren Lohn bekommen.",
            "Sie hat einen Spaziergang gemacht und den Stephansdom gesehen."
          ],
          correct: 2
        },
        {
          q: "3. Warum geht sie in Restaurants und Cafés?",
          options: [
            "Sie sucht einen Job als Aushilfe.",
            "Sie möchte Kaffee trinken.",
            "Sie trifft dort ihre Vermieterin."
          ],
          correct: 0
        },
        {
          q: "4. Was muss sie auf der Bank erledigen?",
          options: [
            "Geld wechseln.",
            "Ein Konto für ihren Lohn eröffnen.",
            "Ihren Vermieter bezahlen."
          ],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: "Text 2: Stadt-Tour Wien",
      desc: "Informationen über die Fahrt rund um den Ring.",
      content: (
        <div className="space-y-4 text-amber-900 font-medium leading-relaxed text-lg">
          <p>{renderInteractiveText("Die Stadt-Tour Wien startet am Schwedenplatz. Die Tour fährt rund um den Ring. Das ist eine große Straße im Zentrum von Wien.")}</p>
          <p>{renderInteractiveText("Die Fahrt fährt an den wichtigsten Sehenswürdigkeiten vorbei: an der Staatsoper, am Parlament, am Rathaus und an der Universität. Die ganze Tour dauert nur 25 Minuten.")}</p>
          <p>{renderInteractiveText("Man sitzt gemütlich in der Straßenbahn. Man kann leider nicht aussteigen und fotografieren, aber man sieht fast die ganze Innenstadt. Das Ticket kostet 12 Euro.")}</p>
        </div>
      ),
      questions: [
        {
          q: "1. Wo startet die Stadt-Tour?",
          options: [
            "Am Rathaus.",
            "Am Schwedenplatz.",
            "An der Staatsoper."
          ],
          correct: 1
        },
        {
          q: "2. Wie lange dauert die Tour?",
          options: [
            "Zwei Stunden.",
            "Eine halbe Stunde.",
            "25 Minuten."
          ],
          correct: 2
        },
        {
          q: "3. Was kann man bei dieser Tour nicht machen?",
          options: [
            "Aussteigen und fotografieren.",
            "Gemütlich sitzen.",
            "Das Parlament sehen."
          ],
          correct: 0
        },
        {
          q: "4. An welchen Gebäuden fährt man vorbei?",
          options: [
            "An Flughäfen und Bahnhöfen.",
            "An der Staatsoper, am Parlament und am Rathaus.",
            "An großen Einkaufszentren."
          ],
          correct: 1
        }
      ]
    },
    {
      id: 3,
      title: "Text 3: Blog über Bern",
      desc: "Eine Stadt in der Schweiz.",
      content: (
        <div className="space-y-4 text-amber-900 font-medium leading-relaxed text-lg">
          <p>{renderInteractiveText("Bern ist die Hauptstadt der Schweiz. Die Stadt hat etwa 134.000 Einwohner. Bern ist nicht so groß wie Zürich, aber sehr bekannt und wunderschön.")}</p>
          <p>{renderInteractiveText("Die Altstadt von Bern ist besonders schön. Dort gibt es viele alte Gebäude. Durch die Stadt fließt der Fluss Aare. Im Sommer schwimmen viele Leute im Fluss.")}</p>
          <p>{renderInteractiveText("Bern hat viele Brücken, weil die Stadt in zwei Teile geteilt ist. Man kann dort super spazieren gehen und einkaufen.")}</p>
        </div>
      ),
      questions: [
        {
          q: "1. Was ist Bern?",
          options: [
            "Die Hauptstadt der Schweiz.",
            "Der größte Fluss der Schweiz.",
            "Die größte Stadt in Deutschland."
          ],
          correct: 0
        },
        {
          q: "2. Wie viele Einwohner hat Bern?",
          options: [
            "Etwa 100.000 Einwohner.",
            "Etwa 134.000 Einwohner.",
            "Etwa 1 Millionen Einwohner."
          ],
          correct: 1
        },
        {
          q: "3. Was machen die Leute im Sommer oft?",
          options: [
            "Sie wandern in den Bergen.",
            "Sie schwimmen im Fluss Aare.",
            "Sie bleiben zu Hause."
          ],
          correct: 1
        },
        {
          q: "4. Warum gibt es in Bern viele Brücken?",
          options: [
            "Weil es dort viele Flüsse gibt.",
            "Weil die Stadt in zwei Teile geteilt ist.",
            "Weil die Brücken schön aussehen."
          ],
          correct: 1
        }
      ]
    }
  ];

  const currentStory = stories[activeTab];

  const handleCheck = (qIndex: number, optIndex: number) => {
    setSelectedAnswers(prev => ({...prev, [qIndex]: optIndex}));
    const qObj = currentStory.questions[qIndex];
    const correct = typeof (qObj as any).correct !== 'undefined' ? (qObj as any).correct : (qObj as any).correctAnswer;
    setIsCorrect(prev => ({...prev, [qIndex]: optIndex === correct}));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {stories.map((story, idx) => (
          <button
            key={story.id || idx}
            onClick={() => handleTabChange(idx)}
            className={`px-6 py-3 rounded-2xl font-bold transition-all shadow-sm ${
              activeTab === idx 
                ? 'bg-amber-500 text-white shadow-amber-500/30 scale-105' 
                : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50 hover:border-amber-300 hover:text-amber-600'
            }`}
          >
            {story.title}
          </button>
        ))}
      </div>

      <div className="text-center mb-10">
        <h2 className="text-4xl font-black text-slate-900">{currentStory.title}</h2>
        <p className="text-slate-600 mt-2">{currentStory.desc}</p>
      </div>

      <div className="bg-white/5 p-6 rounded-2xl border border-amber-200 w-full mb-8 bg-amber-50 shadow-inner">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">Lesetext (Interaktif)</p>
          <span className="text-[10px] bg-amber-200 text-amber-800 px-2 py-1 rounded-md uppercase tracking-wider font-bold">Arahkan kursor ke kata</span>
        </div>
        {currentStory.content ? currentStory.content : (
          <p className="text-amber-900 font-medium leading-relaxed text-lg">
             {renderInteractiveText((currentStory as any).text)}
          </p>
        )}
      </div>

      <div className="space-y-6">
        {currentStory.questions.map((item, qIndex) => (
          <div key={qIndex} className="clay-card p-8 bg-white border-slate-300">
            <h4 className="text-xl font-bold text-slate-800 mb-6">{(item as any).q || (item as any).question}</h4>
            <div className="space-y-4">
              {item.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleCheck(qIndex, index)}
                  className={`w-full text-left p-4 rounded-xl border-2 font-bold transition-all ${
                    selectedAnswers[qIndex] === index
                      ? isCorrect[qIndex]
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                        : 'bg-rose-100 border-rose-500 text-rose-900'
                      : 'bg-slate-50 border-slate-300 text-slate-700 hover:border-amber-400 hover:bg-amber-50'
                  }`}
                >
                  <span className="mr-3 text-lg">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>
            {typeof isCorrect[qIndex] === 'boolean' && (
              <div className={`mt-6 p-4 rounded-xl font-bold ${isCorrect[qIndex] ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                {isCorrect[qIndex] ? '🎉 Richtig! Jawaban kamu benar.' : '❌ Falsch! Coba baca teksnya lagi.'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
