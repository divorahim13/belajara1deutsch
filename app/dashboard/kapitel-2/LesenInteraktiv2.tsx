"use client";

import React, { useState } from 'react';

export function LesenInteraktiv2() {
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
    // Übung 1
    "praktikum": { meaning: "magang", type: "Kata Benda" },
    "letztes": { meaning: "terakhir / lalu", type: "Kata Sifat" },
    "jahr": { meaning: "tahun", type: "Kata Benda" },
    "it-firma": { meaning: "perusahaan IT", type: "Kata Benda" },
    "interessant": { meaning: "menarik", type: "Kata Sifat" },
    "anstrengend": { meaning: "melelahkan", type: "Kata Sifat" },
    "musste": { meaning: "harus (Präteritum)", type: "Kata Kerja (Modal)" },
    "jeden": { meaning: "setiap", type: "Kata Sifat" },
    "morgen": { meaning: "pagi", type: "Kata Benda" },
    "uhr": { meaning: "jam", type: "Kata Benda" },
    "büro": { meaning: "kantor", type: "Kata Benda" },
    "kollegen": { meaning: "rekan kerja", type: "Kata Benda" },
    "nett": { meaning: "ramah", type: "Kata Sifat" },
    "durfte": { meaning: "diizinkan (Präteritum)", type: "Kata Kerja (Modal)" },
    "projekten": { meaning: "proyek (Plural)", type: "Kata Benda" },
    "mithelfen": { meaning: "turut membantu", type: "Kata Kerja" },
    "gelernt": { meaning: "belajar (Partizip II)", type: "Kata Kerja" },
    "anfang": { meaning: "awal", type: "Kata Benda" },
    "konnte": { meaning: "bisa (Präteritum)", type: "Kata Kerja (Modal)" },
    "alles": { meaning: "semuanya", type: "Kata Ganti" },
    "verstehen": { meaning: "memahami", type: "Kata Kerja" },
    "arbeit": { meaning: "pekerjaan", type: "Kata Benda" },
    "neu": { meaning: "baru", type: "Kata Sifat" },
    "wochen": { meaning: "minggu / pekan (Plural)", type: "Kata Benda" },
    "wollte": { meaning: "ingin (Präteritum)", type: "Kata Kerja (Modal)" },
    "team": { meaning: "tim", type: "Kata Benda" },
    "super": { meaning: "hebat", type: "Kata Sifat" },
    "geholfen": { meaning: "membantu (Partizip II)", type: "Kata Kerja" },
    "traumberuf": { meaning: "pekerjaan impian", type: "Kata Benda" },
    "finden": { meaning: "menemukan", type: "Kata Kerja" },
    "sicher": { meaning: "yakin / pasti", type: "Kata Sifat" },
    "informatik": { meaning: "ilmu komputer", type: "Kata Benda" },
    "studieren": { meaning: "kuliah", type: "Kata Kerja" },

    // Übung 2
    "schulzeit": { meaning: "masa sekolah", type: "Kata Benda" },
    "eltern": { meaning: "orang tua", type: "Kata Benda" },
    "mutter": { meaning: "ibu", type: "Kata Benda" },
    "erzählt": { meaning: "bercerita", type: "Kata Kerja" },
    "oft": { meaning: "sering", type: "Adverbia" },
    "von": { meaning: "dari / tentang", type: "Preposisi" },
    "ihrer": { meaning: "kepunyaannya (perempuan)", type: "Kata Ganti Kepemilikan" },
    "damals": { meaning: "zaman dahulu / saat itu", type: "Adverbia" },
    "streng": { meaning: "ketat / disiplin", type: "Kata Sifat" },
    "schüler": { meaning: "murid", type: "Kata Benda" },
    "mussten": { meaning: "harus (Präteritum Plural)", type: "Kata Kerja (Modal)" },
    "immer": { meaning: "selalu", type: "Adverbia" },
    "leise": { meaning: "pelan / tidak berisik", type: "Kata Sifat" },
    "sein": { meaning: "adalah (to be)", type: "Kata Kerja" },
    "durften": { meaning: "diizinkan (Präteritum Plural)", type: "Kata Kerja (Modal)" },
    "unterricht": { meaning: "pelajaran / kelas", type: "Kata Benda" },
    "nicht": { meaning: "tidak", type: "Partikel Negatif" },
    "sprechen": { meaning: "berbicara", type: "Kata Kerja" },
    "vater": { meaning: "ayah", type: "Kata Benda" },
    "hausaufgaben": { meaning: "pekerjaan rumah (PR)", type: "Kata Benda" },
    "machen": { meaning: "membuat / melakukan", type: "Kata Kerja" },
    "freunden": { meaning: "teman-teman (Dativ Plural)", type: "Kata Benda" },
    "spielen": { meaning: "bermain", type: "Kata Kerja" },
    "heute": { meaning: "hari ini", type: "Adverbia" },
    "schule": { meaning: "sekolah", type: "Kata Benda" },
    "besser": { meaning: "lebih baik", type: "Kata Sifat" },

    // Übung 3
    "geschenk": { meaning: "hadiah", type: "Kata Benda" },
    "für": { meaning: "untuk", type: "Preposisi" },
    "wochenende": { meaning: "akhir pekan", type: "Kata Benda" },
    "geburtstag": { meaning: "ulang tahun", type: "Kata Benda" },
    "gestern": { meaning: "kemarin", type: "Adverbia" },
    "stadt": { meaning: "kota", type: "Kata Benda" },
    "ein": { meaning: "sebuah", type: "Artikel" },
    "buch": { meaning: "buku", type: "Kata Benda" },
    "gekauft": { meaning: "membeli (Partizip II)", type: "Kata Kerja" },
    "liest": { meaning: "membaca (dari lesen)", type: "Kata Kerja" },
    "sehr": { meaning: "sangat", type: "Adverbia" },
    "gerne": { meaning: "dengan senang hati / suka", type: "Adverbia" },
    "dem": { meaning: "kepada (Dativ Maskulin/Netral)", type: "Artikel" },
    "bruder": { meaning: "saudara laki-laki", type: "Kata Benda" },
    "habe": { meaning: "memiliki (dari haben)", type: "Kata Kerja" },
    "ich": { meaning: "saya", type: "Kata Ganti" },
    "auch": { meaning: "juga", type: "Adverbia" },
    "etwas": { meaning: "sesuatu", type: "Kata Ganti" },
    "mitgebracht": { meaning: "membawa (Partizip II)", type: "Kata Kerja" },
    "ihm": { meaning: "kepadanya (Dativ Maskulin)", type: "Kata Ganti" },
    "gebe": { meaning: "memberikan (dari geben)", type: "Kata Kerja" },
    "schokolade": { meaning: "cokelat", type: "Kata Benda" },
    "freut": { meaning: "senang (sich freuen)", type: "Kata Kerja" },
    "sich": { meaning: "dirinya (refleksif)", type: "Kata Ganti" },
    "bestimmt": { meaning: "pasti", type: "Adverbia" }
  };

  const renderInteractiveText = (text: string) => {
    return text.split(' ').map((word, index) => {
      const cleanWord = word.replace(/[.,?!:;]/g, '').toLowerCase();
      const punctuationMatch = word.match(/[.,?!:;]+$/);
      const punctuation = punctuationMatch ? punctuationMatch[0] : '';
      const baseWord = word.replace(/[.,?!:;]+$/, '');
      
      const entry = dictionary[cleanWord];

      if (entry) {
        const wordId = `${text}-${index}`;
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
      title: "Übung 1: Erfahrungen im Praktikum",
      desc: "Bacalah cerita tentang Tobias di bawah ini dan jawab pertanyaannya.",
      content: (
        <p className="text-amber-900 font-medium leading-relaxed text-lg">
          {renderInteractiveText("Hallo, ich bin Tobias! Letztes Jahr habe ich ein Praktikum in einer IT-Firma gemacht. Das Praktikum war sehr interessant, aber auch anstrengend. Ich musste jeden Morgen um 8 Uhr im Büro sein. Meine Kollegen waren sehr nett. Ich durfte bei vielen Projekten mithelfen und habe viel gelernt. Am Anfang konnte ich nicht alles verstehen, weil die Arbeit neu für mich war. Aber nach zwei Wochen wollte ich gar nicht mehr gehen, weil das Team super war. Das Praktikum hat mir sehr geholfen, meinen Traumberuf zu finden. Jetzt bin ich sicher, dass ich Informatik studieren will.")}
        </p>
      ),
      questions: [
        {
          q: "1. Wo hat Tobias sein Praktikum gemacht?",
          options: [
            "In einem Krankenhaus.",
            "In einer Schule.",
            "In einer IT-Firma."
          ],
          correct: 2
        },
        {
          q: "2. Was war am Anfang schwierig für Tobias?",
          options: [
            "Die Arbeit war neu und er konnte nicht alles verstehen.",
            "Die Kollegen waren sehr unfreundlich zu ihm.",
            "Er musste jeden Tag sehr lange arbeiten."
          ],
          correct: 0
        },
        {
          q: "3. Wie fand Tobias das Praktikum am Ende?",
          options: [
            "Er fand es langweilig, weil er nichts verstanden hat.",
            "Er fand es zu anstrengend und wollte sofort nach Hause gehen.",
            "Er fand es sehr gut und es hat ihm geholfen, seinen Traumberuf zu finden."
          ],
          correct: 2
        }
      ]
    },
    {
      id: 2,
      title: "Übung 2: Die Schulzeit meiner Eltern",
      desc: "Bacalah teks tentang masa sekolah zaman dahulu dan perhatikan penggunaan modalverben.",
      content: (
        <p className="text-amber-900 font-medium leading-relaxed text-lg">
          {renderInteractiveText("Meine Mutter erzählt oft von ihrer Schulzeit. Damals war die Schule sehr streng. Die Schüler mussten immer leise sein und durften im Unterricht nicht sprechen. Mein Vater musste jeden Tag viele Hausaufgaben machen. Er konnte nicht oft mit seinen Freunden spielen, weil er lernen musste. Ich bin froh, dass die Schule heute etwas besser ist!")}
        </p>
      ),
      questions: [
        {
          q: "1. Wie war die Schule früher nach Meinung der Mutter?",
          options: [
            "Sehr modern und einfach.",
            "Sehr streng.",
            "Sehr lustig und laut."
          ],
          correct: 1
        },
        {
          q: "2. Was durften die Schüler im Unterricht NICHT machen?",
          options: [
            "Sprechen.",
            "Lernen.",
            "Hausaufgaben machen."
          ],
          correct: 0
        },
        {
          q: "3. Warum konnte der Vater nicht oft mit Freunden spielen?",
          options: [
            "Weil er keine Freunde hatte.",
            "Weil er lernen und Hausaufgaben machen musste.",
            "Weil er arbeiten musste."
          ],
          correct: 1
        }
      ]
    },
    {
      id: 3,
      title: "Übung 3: Ein Geschenk für die Mutter",
      desc: "Pahami cerita tentang memberikan hadiah (penggunaan Dativ).",
      content: (
        <p className="text-amber-900 font-medium leading-relaxed text-lg">
          {renderInteractiveText("Am Wochenende hat meine Mutter Geburtstag. Gestern bin ich in die Stadt gefahren und habe ein Buch für sie gekauft. Sie liest sehr gerne. Dem Bruder habe ich auch etwas mitgebracht. Ich gebe ihm Schokolade. Er freut sich bestimmt sehr!")}
        </p>
      ),
      questions: [
        {
          q: "1. Wer hat am Wochenende Geburtstag?",
          options: [
            "Der Bruder.",
            "Die Mutter.",
            "Der Vater."
          ],
          correct: 1
        },
        {
          q: "2. Was hat die Person für die Mutter gekauft?",
          options: [
            "Ein Buch.",
            "Schokolade.",
            "Ein T-Shirt."
          ],
          correct: 0
        },
        {
          q: "3. Wem gibt die Person die Schokolade?",
          options: [
            "Der Mutter.",
            "Dem Vater.",
            "Dem Bruder."
          ],
          correct: 2
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
              {item.options.map((option, index) => (
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
