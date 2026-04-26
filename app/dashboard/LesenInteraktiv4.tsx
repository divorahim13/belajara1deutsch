"use client";

import React, { useState } from 'react';

export function LesenInteraktiv4() {
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
    "kieler": { meaning: "berkaitan dengan Kiel", type: "Kata Sifat" },
    "woche": { meaning: "minggu", type: "Kata Benda" },
    "juni": { meaning: "Juni", type: "Kata Benda" },
    "norddeutschland": { meaning: "Jerman Utara", type: "Kata Benda" },
    "weltweit": { meaning: "di seluruh dunia", type: "Adverbia" },
    "bekannt": { meaning: "terkenal", type: "Kata Sifat" },
    "besucher": { meaning: "pengunjung", type: "Kata Benda" },
    "segelregatta": { meaning: "lomba perahu layar", type: "Kata Benda" },
    "segler": { meaning: "pelaut", type: "Kata Benda" },
    "nationen": { meaning: "negara-negara / bangsa", type: "Kata Benda" },
    "teil": { meaning: "bagian (dari teilnehmen = ikut serta)", type: "Kata Kerja" },
    "schiffe": { meaning: "kapal-kapal", type: "Kata Benda" },
    "bewundern": { meaning: "mengagumi", type: "Kata Kerja" },
    "sommerfest": { meaning: "pesta musim panas", type: "Kata Benda" },
    "erwachsene": { meaning: "orang dewasa", type: "Kata Benda" },
    "spezialitäten": { meaning: "spesialisasi / makanan khas", type: "Kata Benda" },
    "konzerte": { meaning: "konser-konser", type: "Kata Benda" },
    "endet": { meaning: "berakhir", type: "Kata Kerja" },
    "feuerwerk": { meaning: "kembang api", type: "Kata Benda" },
    "almabtrieb": { meaning: "tradisi turunnya sapi dari gunung", type: "Kata Benda" },
    "september": { meaning: "September", type: "Kata Benda" },
    "alpenregionen": { meaning: "wilayah pegunungan Alpen", type: "Kata Benda" },
    "süden": { meaning: "selatan", type: "Kata Benda" },
    "schweiz": { meaning: "Swiss", type: "Kata Benda" },
    "alpabzug": { meaning: "sebutan Almabtrieb di Swiss", type: "Kata Benda" },
    "sommer": { meaning: "musim panas", type: "Kata Benda" },
    "kühe": { meaning: "sapi-sapi", type: "Kata Benda" },
    "alm": { meaning: "padang rumput pegunungan", type: "Kata Benda" },
    "bergen": { meaning: "pegunungan", type: "Kata Benda" },
    "herbst": { meaning: "musim gugur", type: "Kata Benda" },
    "zurück": { meaning: "kembali", type: "Adverbia" },
    "dörfer": { meaning: "desa-desa", type: "Kata Benda" },
    "tiere": { meaning: "hewan-hewan", type: "Kata Benda" },
    "gesund": { meaning: "sehat", type: "Kata Sifat" },
    "tragen": { meaning: "memakai / membawa", type: "Kata Kerja" },
    "blumen": { meaning: "bunga-bunga", type: "Kata Benda" },
    "glocken": { meaning: "lonceng-lonceng", type: "Kata Benda" },
    "region": { meaning: "wilayah", type: "Kata Benda" },
    "besuch": { meaning: "kunjungan", type: "Kata Benda" },
    "sprachschule": { meaning: "sekolah bahasa", type: "Kata Benda" },
    "unterrichtet": { meaning: "mengajar", type: "Kata Kerja" },
    "lustig": { meaning: "lucu / menyenangkan", type: "Kata Sifat" },
    "manchmal": { meaning: "kadang-kadang", type: "Adverbia" },
    "vermisst": { meaning: "merindukan", type: "Kata Kerja" },
    "anfang": { meaning: "awal", type: "Kata Benda" },
    "sauer": { meaning: "marah / kesal", type: "Kata Sifat" },
    "pünktlich": { meaning: "tepat waktu", type: "Kata Sifat" },
    "gewöhnt": { meaning: "terbiasa", type: "Kata Kerja (Partizip II)" },
    "besser": { meaning: "lebih baik", type: "Kata Sifat (Komparativ)" },
    "frühjahr": { meaning: "musim semi", type: "Kata Benda" },
    "überrascht": { meaning: "terkejut", type: "Kata Sifat (Partizip II)" },
    "anmeldung": { meaning: "pendaftaran", type: "Kata Benda" },
    "wohnheim": { meaning: "asrama", type: "Kata Benda" },
    "mitarbeiter": { meaning: "pegawai", type: "Kata Benda" },
    "freundlich": { meaning: "ramah", type: "Kata Sifat" },
    "hilfsbereit": { meaning: "suka menolong", type: "Kata Sifat" },
    "busse": { meaning: "bus-bus", type: "Kata Benda" },
    "fremd": { meaning: "asing", type: "Kata Sifat" },
    "studenten": { meaning: "mahasiswa", type: "Kata Benda" },
    "anbieten": { meaning: "menawarkan", type: "Kata Kerja" }
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
      title: "Text 1: Kieler Woche",
      desc: "Bacalah teks tentang acara besar di Jerman Utara.",
      content: (
        <p className="text-amber-900 font-medium leading-relaxed text-lg">
          {renderInteractiveText("Die Kieler Woche findet jedes Jahr im Juni in Norddeutschland statt. Sie ist weltweit bekannt. Etwa drei Millionen Besucher kommen nach Kiel. Die Kieler Woche ist eine große Segelregatta. 4.000 Segler aus 70 Nationen nehmen teil. Man kann alte Schiffe bewundern. Es gibt ein Sommerfest für Kinder und Erwachsene. Es gibt viele internationale Spezialitäten. Musikfans können über 400 Konzerte besuchen. Die Kieler Woche endet mit einem Feuerwerk.")}
        </p>
      ),
      questions: [
        {
          q: "1. Wann findet die Kieler Woche statt?",
          options: [
            "Im September.",
            "Im Juni.",
            "Im Winter."
          ],
          correct: 1
        },
        {
          q: "2. Wofür ist die Kieler Woche bekannt?",
          options: [
            "Für Wintersport.",
            "Für eine große Segelregatta.",
            "Für Fußball."
          ],
          correct: 1
        },
        {
          q: "3. Womit endet die Kieler Woche?",
          options: [
            "Mit einem Konzert.",
            "Mit einem Feuerwerk.",
            "Mit internationalen Spezialitäten."
          ],
          correct: 1
        }
      ]
    },
    {
      id: 2,
      title: "Text 2: Almabtrieb",
      desc: "Bacalah teks tentang acara tradisional di wilayah Alpen.",
      content: (
        <p className="text-amber-900 font-medium leading-relaxed text-lg">
          {renderInteractiveText("Der Almabtrieb findet im September statt. Er findet in Alpenregionen im Süden Deutschlands, in Österreich und in der Schweiz statt. In der Schweiz sagt man auch Alpabzug. Im Sommer sind die Kühe auf der Alm in den Bergen. Im Herbst kommen sie zurück in die Dörfer. Wenn der Sommer gut war und die Tiere gesund sind, tragen die Kühe Blumen und Glocken. Es gibt ein Fest, traditionelle Musik und Essen aus der Region. Viele Menschen besuchen die Veranstaltung. Ein Besuch beim Almabtrieb macht sicher Spaß.")}
        </p>
      ),
      questions: [
        {
          q: "1. Wo findet der Almabtrieb statt?",
          options: [
            "In Norddeutschland.",
            "In der Schweiz, in Österreich und in Süddeutschland.",
            "Nur in der Schweiz."
          ],
          correct: 1
        },
        {
          q: "2. Wann kommen die Kühe zurück in die Dörfer?",
          options: [
            "Im Sommer.",
            "Im Herbst.",
            "Im Frühling."
          ],
          correct: 1
        },
        {
          q: "3. Was tragen die Kühe, wenn sie gesund sind?",
          options: [
            "Blumen und Glocken.",
            "Nur Blumen.",
            "Eine Medaille."
          ],
          correct: 0
        }
      ]
    },
    {
      id: 3,
      title: "Text 3: Blogs",
      desc: "Bacalah pengalaman Paula dan Chandan di luar negeri.",
      content: (
        <div className="space-y-4">
          <p className="text-amber-900 font-medium leading-relaxed text-lg border-l-4 border-amber-400 pl-4">
            <span className="font-bold block mb-1">Paula (in Argentinien):</span>
            {renderInteractiveText("Ich bin seit zwei Monaten in Argentinien. Ich arbeite in einer Sprachschule und unterrichte Deutsch. Im Kurs ist es oft lustig. Manchmal vermisse ich meine Familie in Deutschland. Am Anfang war ich sauer, weil meine Freunde oft nicht pünktlich waren. Jetzt habe ich mich daran gewöhnt. Mein Spanisch ist besser geworden und ich habe gelernt, dass man hier nicht nur Tango tanzt.")}
          </p>
          <p className="text-amber-900 font-medium leading-relaxed text-lg border-l-4 border-emerald-400 pl-4 mt-6">
            <span className="font-bold block mb-1">Chandan (in Deutschland):</span>
            {renderInteractiveText("Ich komme aus Indien und bin seit dem Frühjahr in Kiel. Ich war überrascht, dass die Anmeldung an der Uni und im Wohnheim so einfach war. Die Mitarbeiter waren freundlich und hilfsbereit. Am Anfang fühlte ich mich fremd und vermisste meine Freunde. Jetzt fühle ich mich wohl. Wenn meine Freunde Partys machen, bringt jeder etwas zu essen mit.")}
          </p>
        </div>
      ),
      questions: [
        {
          q: "1. Warum war Paula am Anfang in Argentinien sauer?",
          options: [
            "Weil sie kein Spanisch sprach.",
            "Weil ihre Freunde oft nicht pünktlich waren.",
            "Weil sie nicht Tango tanzen konnte."
          ],
          correct: 1
        },
        {
          q: "2. Was hat Chandan in Deutschland überrascht?",
          options: [
            "Dass die Busse unpünktlich waren.",
            "Dass die Anmeldung an der Uni einfach war.",
            "Dass das Essen teuer war."
          ],
          correct: 1
        },
        {
          q: "3. Was machen Chandans Freunde bei Partys?",
          options: [
            "Sie bringen etwas zu essen mit.",
            "Sie tanzen Tango.",
            "Sie posten Fotos."
          ],
          correct: 0
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
