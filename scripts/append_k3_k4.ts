import * as fs from 'fs';
import * as path from 'path';

const quizDataFilePath = path.join(process.cwd(), 'app/dashboard/data/quiz-data.ts');
let content = fs.readFileSync(quizDataFilePath, 'utf8');

const kapitel3Data = `
  3: {
    quizId: "k3-final",
    chapterId: 3,
    title: "Kapiteltest 3: Immer online?",
    description: "Netzwerk neu A2 - Kerjakan semua soal di bawah ini.",
    passingScore: 18,
    totalPoints: 30,
    questions: [
      // TEIL 1
      { id: 't1_1', chapterId: 3, partTitle: 'Teil 1: Medien', partInstruction: 'Finden Sie acht Medien und notieren Sie sie mit Artikel. (Han | Com | Zei | Ra | dy | Smart | der | er | Fern | tung | Lap | Tab | E-Book | pu | watch | Rea | seh | top | dio | let | ter)', type: 'shortAnswer', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'Medium 1', acceptableAnswers: ['der computer', 'die zeitung', 'das radio', 'die smartwatch', 'der e-book-reader', 'der fernseher', 'der laptop', 'das tablet'] },
      { id: 't1_2', chapterId: 3, partTitle: 'Teil 1: Medien', type: 'shortAnswer', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'Medium 2', acceptableAnswers: ['der computer', 'die zeitung', 'das radio', 'die smartwatch', 'der e-book-reader', 'der fernseher', 'der laptop', 'das tablet'] },
      { id: 't1_3', chapterId: 3, partTitle: 'Teil 1: Medien', type: 'shortAnswer', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'Medium 3', acceptableAnswers: ['der computer', 'die zeitung', 'das radio', 'die smartwatch', 'der e-book-reader', 'der fernseher', 'der laptop', 'das tablet'] },
      { id: 't1_4', chapterId: 3, partTitle: 'Teil 1: Medien', type: 'shortAnswer', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'Medium 4', acceptableAnswers: ['der computer', 'die zeitung', 'das radio', 'die smartwatch', 'der e-book-reader', 'der fernseher', 'der laptop', 'das tablet'] },
      { id: 't1_5', chapterId: 3, partTitle: 'Teil 1: Medien', type: 'shortAnswer', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'Medium 5', acceptableAnswers: ['der computer', 'die zeitung', 'das radio', 'die smartwatch', 'der e-book-reader', 'der fernseher', 'der laptop', 'das tablet'] },
      { id: 't1_6', chapterId: 3, partTitle: 'Teil 1: Medien', type: 'shortAnswer', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'Medium 6', acceptableAnswers: ['der computer', 'die zeitung', 'das radio', 'die smartwatch', 'der e-book-reader', 'der fernseher', 'der laptop', 'das tablet'] },
      { id: 't1_7', chapterId: 3, partTitle: 'Teil 1: Medien', type: 'shortAnswer', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'Medium 7', acceptableAnswers: ['der computer', 'die zeitung', 'das radio', 'die smartwatch', 'der e-book-reader', 'der fernseher', 'der laptop', 'das tablet'] },
      { id: 't1_8', chapterId: 3, partTitle: 'Teil 1: Medien', type: 'shortAnswer', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'Medium 8', acceptableAnswers: ['der computer', 'die zeitung', 'das radio', 'die smartwatch', 'der e-book-reader', 'der fernseher', 'der laptop', 'das tablet'] },

      // TEIL 2
      { id: 't2_1', chapterId: 3, partTitle: 'Teil 2: Was kann man nicht ...?', partInstruction: 'Streichen Sie durch. (Pilih yang tidak bisa dilakukan)', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Verben', points: 1, question: '1. ... -> senden', options: ['Kameras', 'Fotos', 'E-Mails'], correctAnswer: 'Kameras' },
      { id: 't2_2', chapterId: 3, partTitle: 'Teil 2: Was kann man nicht ...?', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Verben', points: 1, question: '2. ... -> anklicken', options: ['Dateien', 'E-Mails', 'Papier'], correctAnswer: 'Papier' },
      { id: 't2_3', chapterId: 3, partTitle: 'Teil 2: Was kann man nicht ...?', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Verben', points: 1, question: '3. ... -> runterladen', options: ['Musik', 'Tablets', 'E-Books'], correctAnswer: 'Tablets' },
      { id: 't2_4', chapterId: 3, partTitle: 'Teil 2: Was kann man nicht ...?', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Verben', points: 1, question: '4. ... -> kopieren', options: ['Links', 'Rezepte', 'VR-Brillen'], correctAnswer: 'VR-Brillen' },

      // TEIL 3
      { id: 't3_1', chapterId: 3, partTitle: 'Teil 3: Komparativ oder Superlativ?', partInstruction: 'Ergänzen Sie die Adjektive in der richtigen Form.', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Adjektive', points: 1, question: '1. Magst du auch E-Books _______ als normale Bücher? (gern)', correctAnswer: 'lieber' },
      { id: 't3_2', chapterId: 3, partTitle: 'Teil 3: Komparativ oder Superlativ?', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Adjektive', points: 1, question: '2. Welcher Film gefällt dir _______? (gut)', correctAnswer: 'am besten' },
      { id: 't3_3', chapterId: 3, partTitle: 'Teil 3: Komparativ oder Superlativ?', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Adjektive', points: 1, question: '3. Rico ist jeden Tag viel _______ im Internet als ich. (lang)', correctAnswer: 'länger' },
      { id: 't3_4', chapterId: 3, partTitle: 'Teil 3: Komparativ oder Superlativ?', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Adjektive', points: 1, question: '4. Was ist dir bei der Arbeit _______? (wichtig)', correctAnswer: 'am wichtigsten' },
      { id: 't3_5', chapterId: 3, partTitle: 'Teil 3: Komparativ oder Superlativ?', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Adjektive', points: 1, question: '5. Welche Schauspielerin findest du _______? (sympathisch)', correctAnswer: 'am sympathischsten', acceptableAnswers: ['am sympathischsten', 'am sympatischsten'] },

      // TEIL 4
      { id: 't4_1', chapterId: 3, partTitle: 'Teil 4: als oder wie?', partInstruction: 'Kreuzen Sie an.', type: 'multipleChoice', correctionMode: 'template', category: 'Grammatik', skill: 'Vergleich', points: 0.5, question: '1. Ich lese Zeitschriften genauso gern _______ Bücher.', options: ['als', 'wie'], correctAnswer: 'wie' },
      { id: 't4_2', chapterId: 3, partTitle: 'Teil 4: als oder wie?', type: 'multipleChoice', correctionMode: 'template', category: 'Grammatik', skill: 'Vergleich', points: 0.5, question: '2. Ich arbeite lieber an einem Computer _______ an einem Laptop.', options: ['als', 'wie'], correctAnswer: 'als' },
      { id: 't4_3', chapterId: 3, partTitle: 'Teil 4: als oder wie?', type: 'multipleChoice', correctionMode: 'template', category: 'Grammatik', skill: 'Vergleich', points: 0.5, question: '3. Die Schauspieler sind mir nicht so wichtig _______ die Geschichte.', options: ['als', 'wie'], correctAnswer: 'wie' },
      { id: 't4_4', chapterId: 3, partTitle: 'Teil 4: als oder wie?', type: 'multipleChoice', correctionMode: 'template', category: 'Grammatik', skill: 'Vergleich', points: 0.5, question: '4. Sport im Fernsehen finde ich so langweilig _______ Liebesfilme.', options: ['als', 'wie'], correctAnswer: 'wie' },
      { id: 't4_5', chapterId: 3, partTitle: 'Teil 4: als oder wie?', type: 'multipleChoice', correctionMode: 'template', category: 'Grammatik', skill: 'Vergleich', points: 0.5, question: '5. Heute verbringen die Menschen mehr Zeit mit Medien _______ früher.', options: ['als', 'wie'], correctAnswer: 'als' },
      { id: 't4_6', chapterId: 3, partTitle: 'Teil 4: als oder wie?', type: 'multipleChoice', correctionMode: 'template', category: 'Grammatik', skill: 'Vergleich', points: 0.5, question: '6. Wir benutzen die Spielekonsole genauso selten _______ die VR-Brille.', options: ['als', 'wie'], correctAnswer: 'wie' },

      // TEIL 5
      { id: 't5_1', chapterId: 3, partTitle: 'Teil 5: Sätze mit dass', partInstruction: 'Schreiben Sie Sätze mit dass.', type: 'sentenceTransformation', correctionMode: 'hybrid', aiFallback: true, category: 'Grammatik', skill: 'Nebensätze', points: 2, question: '1. Ich hoffe, ... (Er spielt bald wieder in einem Film mit.)', acceptableAnswers: ['dass er bald wieder in einem film mitspielt', 'dass er bald in einem film wieder mitspielt'] },
      { id: 't5_2', chapterId: 3, partTitle: 'Teil 5: Sätze mit dass', type: 'sentenceTransformation', correctionMode: 'hybrid', aiFallback: true, category: 'Grammatik', skill: 'Nebensätze', points: 2, question: '2. Ich bin sicher, ... (Ich gehe dann sofort ins Kino.)', acceptableAnswers: ['dass ich dann sofort ins kino gehe'] },
      { id: 't5_3', chapterId: 3, partTitle: 'Teil 5: Sätze mit dass', type: 'sentenceTransformation', correctionMode: 'hybrid', aiFallback: true, category: 'Grammatik', skill: 'Nebensätze', points: 2, question: '3. Ich denke, ... (Filme müssen nicht immer spannend sein.)', acceptableAnswers: ['dass filme nicht immer spannend sein müssen', 'dass filme immer nicht spannend sein müssen'] },
      { id: 't5_4', chapterId: 3, partTitle: 'Teil 5: Sätze mit dass', type: 'sentenceTransformation', correctionMode: 'hybrid', aiFallback: true, category: 'Grammatik', skill: 'Nebensätze', points: 2, question: '4. Ich bin glücklich, ... (Ich verstehe den Film auf Deutsch.)', acceptableAnswers: ['dass ich den film auf deutsch verstehe'] },

      // TEIL 6
      { id: 't6_1_art', chapterId: 3, partTitle: 'Teil 6: Artikel zuordnen', partInstruction: 'Ordnen Sie die Wörter zum Thema Film mit Artikel zu.', type: 'multipleChoice', correctionMode: 'template', category: 'Artikel', skill: 'Artikel', points: 0.25, question: 'Video', options: ['der', 'die', 'das'], correctAnswer: 'das' },
      { id: 't6_1_cat', chapterId: 3, partTitle: 'Teil 6: Kategorie zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Kategorie', points: 0.25, question: 'Video', options: ['Filmtyp', 'Andere Wörter'], correctAnswer: 'Andere Wörter' },
      { id: 't6_2_art', chapterId: 3, partTitle: 'Teil 6: Artikel zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Artikel', skill: 'Artikel', points: 0.25, question: 'Komödie', options: ['der', 'die', 'das'], correctAnswer: 'die' },
      { id: 't6_2_cat', chapterId: 3, partTitle: 'Teil 6: Kategorie zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Kategorie', points: 0.25, question: 'Komödie', options: ['Filmtyp', 'Andere Wörter'], correctAnswer: 'Filmtyp' },
      { id: 't6_3_art', chapterId: 3, partTitle: 'Teil 6: Artikel zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Artikel', skill: 'Artikel', points: 0.25, question: 'Filmmusik', options: ['der', 'die', 'das'], correctAnswer: 'die' },
      { id: 't6_3_cat', chapterId: 3, partTitle: 'Teil 6: Kategorie zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Kategorie', points: 0.25, question: 'Filmmusik', options: ['Filmtyp', 'Andere Wörter'], correctAnswer: 'Andere Wörter' },
      { id: 't6_4_art', chapterId: 3, partTitle: 'Teil 6: Artikel zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Artikel', skill: 'Artikel', points: 0.25, question: 'Handlung', options: ['der', 'die', 'das'], correctAnswer: 'die' },
      { id: 't6_4_cat', chapterId: 3, partTitle: 'Teil 6: Kategorie zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Kategorie', points: 0.25, question: 'Handlung', options: ['Filmtyp', 'Andere Wörter'], correctAnswer: 'Andere Wörter' },
      { id: 't6_5_art', chapterId: 3, partTitle: 'Teil 6: Artikel zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Artikel', skill: 'Artikel', points: 0.25, question: 'Autobiografie', options: ['der', 'die', 'das'], correctAnswer: 'die' },
      { id: 't6_5_cat', chapterId: 3, partTitle: 'Teil 6: Kategorie zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Kategorie', points: 0.25, question: 'Autobiografie', options: ['Filmtyp', 'Andere Wörter'], correctAnswer: 'Filmtyp' },
      { id: 't6_6_art', chapterId: 3, partTitle: 'Teil 6: Artikel zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Artikel', skill: 'Artikel', points: 0.25, question: 'Schauspieler', options: ['der', 'die', 'das'], correctAnswer: 'der' },
      { id: 't6_6_cat', chapterId: 3, partTitle: 'Teil 6: Kategorie zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Kategorie', points: 0.25, question: 'Schauspieler', options: ['Filmtyp', 'Andere Wörter'], correctAnswer: 'Andere Wörter' },
      { id: 't6_7_art', chapterId: 3, partTitle: 'Teil 6: Artikel zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Artikel', skill: 'Artikel', points: 0.25, question: 'Fernseher', options: ['der', 'die', 'das'], correctAnswer: 'der' },
      { id: 't6_7_cat', chapterId: 3, partTitle: 'Teil 6: Kategorie zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Kategorie', points: 0.25, question: 'Fernseher', options: ['Filmtyp', 'Andere Wörter'], correctAnswer: 'Andere Wörter' },
      { id: 't6_8_art', chapterId: 3, partTitle: 'Teil 6: Artikel zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Artikel', skill: 'Artikel', points: 0.25, question: 'Liebesfilm', options: ['der', 'die', 'das'], correctAnswer: 'der' },
      { id: 't6_8_cat', chapterId: 3, partTitle: 'Teil 6: Kategorie zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Kategorie', points: 0.25, question: 'Liebesfilm', options: ['Filmtyp', 'Andere Wörter'], correctAnswer: 'Filmtyp' },
      { id: 't6_9_art', chapterId: 3, partTitle: 'Teil 6: Artikel zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Artikel', skill: 'Artikel', points: 0.25, question: 'Geschichte', options: ['der', 'die', 'das'], correctAnswer: 'die' },
      { id: 't6_9_cat', chapterId: 3, partTitle: 'Teil 6: Kategorie zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Kategorie', points: 0.25, question: 'Geschichte', options: ['Filmtyp', 'Andere Wörter'], correctAnswer: 'Andere Wörter' },
      { id: 't6_10_art', chapterId: 3, partTitle: 'Teil 6: Artikel zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Artikel', skill: 'Artikel', points: 0.25, question: 'Hauptperson', options: ['der', 'die', 'das'], correctAnswer: 'die' },
      { id: 't6_10_cat', chapterId: 3, partTitle: 'Teil 6: Kategorie zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Kategorie', points: 0.25, question: 'Hauptperson', options: ['Filmtyp', 'Andere Wörter'], correctAnswer: 'Andere Wörter' },
      { id: 't6_11_art', chapterId: 3, partTitle: 'Teil 6: Artikel zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Artikel', skill: 'Artikel', points: 0.25, question: 'Thriller', options: ['der', 'die', 'das'], correctAnswer: 'der' },
      { id: 't6_11_cat', chapterId: 3, partTitle: 'Teil 6: Kategorie zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Kategorie', points: 0.25, question: 'Thriller', options: ['Filmtyp', 'Andere Wörter'], correctAnswer: 'Filmtyp' },
      { id: 't6_12_art', chapterId: 3, partTitle: 'Teil 6: Artikel zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Artikel', skill: 'Artikel', points: 0.25, question: 'Trailer', options: ['der', 'die', 'das'], correctAnswer: 'der' },
      { id: 't6_12_cat', chapterId: 3, partTitle: 'Teil 6: Kategorie zuordnen', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Kategorie', points: 0.25, question: 'Trailer', options: ['Filmtyp', 'Andere Wörter'], correctAnswer: 'Andere Wörter' }
    ]
  },
  4: {
    quizId: "k4-final",
    chapterId: 4,
    title: "Test zu Kapitel 4",
    description: "Netzwerk neu A2 - Kerjakan semua soal di bawah ini.",
    passingScore: 18,
    totalPoints: 30,
    questions: [
      // TEIL 1 (Ereignisse ordnen)
      { id: 'ex1_1', chapterId: 4, partTitle: 'Teil 1: Ereignisse', partInstruction: 'Welche Ereignisse finden Sie? (EIN | SCHUL | STAND | TAG | HOCH | PRÜ | SCHEIN | ZEIT | GE | FÜH | BURT | RER | FUNG)', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 1, question: '1. die Schultüte -> _______', correctAnswer: 'Schultag' },
      { id: 'ex1_2', chapterId: 4, partTitle: 'Teil 1: Ereignisse', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 1, question: '2. der Storch -> _______', correctAnswer: 'Geburt' },
      { id: 'ex1_3', chapterId: 4, partTitle: 'Teil 1: Ereignisse', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 1, question: '3. das Auto -> _______', correctAnswer: 'Führerschein' },
      { id: 'ex1_4', chapterId: 4, partTitle: 'Teil 1: Ereignisse', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 1, question: '4. die Ringe -> _______', correctAnswer: 'Hochzeit' },
      
      // TEIL 2
      { id: 'ex2_1', chapterId: 4, partTitle: 'Teil 2: Lücken ergänzen', partInstruction: 'Ergänzen Sie die Lücken.', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Redemittel', points: 0.5, question: 'Tausend (1) D___ für die...', correctAnswer: 'Dank', acceptableAnswers: ['dank'] },
      { id: 'ex2_2', chapterId: 4, partTitle: 'Teil 2: Lücken ergänzen', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Redemittel', points: 0.5, question: '... für die (2) Ein___ zu eurer...', correctAnswer: 'Einladung', acceptableAnswers: ['einladung'] },
      { id: 'ex2_3', chapterId: 4, partTitle: 'Teil 2: Lücken ergänzen', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Redemittel', points: 0.5, question: '... zu eurer (3) Ho___.', correctAnswer: 'Hochzeit', acceptableAnswers: ['hochzeit'] },
      { id: 'ex2_4', chapterId: 4, partTitle: 'Teil 2: Lücken ergänzen', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Redemittel', points: 0.5, question: 'Wir haben uns (4) s___ gefreut.', correctAnswer: 'sehr', acceptableAnswers: ['sehr'] },
      { id: 'ex2_5', chapterId: 4, partTitle: 'Teil 2: Lücken ergänzen', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Redemittel', points: 0.5, question: 'Leider (5) k___ wir nicht kommen,', correctAnswer: 'können', acceptableAnswers: ['können', 'koennen', 'kœnnen'] },
      { id: 'ex2_6', chapterId: 4, partTitle: 'Teil 2: Lücken ergänzen', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Redemittel', points: 0.5, question: '(6) w___ wir im...', correctAnswer: 'weil', acceptableAnswers: ['weil'] },
      { id: 'ex2_7', chapterId: 4, partTitle: 'Teil 2: Lücken ergänzen', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Redemittel', points: 0.5, question: '... im (7) Ur___ sind.', correctAnswer: 'Urlaub', acceptableAnswers: ['urlaub'] },
      { id: 'ex2_8', chapterId: 4, partTitle: 'Teil 2: Lücken ergänzen', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Redemittel', points: 0.5, question: 'Wir (8) gra___ euch sehr...', correctAnswer: 'gratulieren', acceptableAnswers: ['gratulieren'] },
      { id: 'ex2_9', chapterId: 4, partTitle: 'Teil 2: Lücken ergänzen', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Redemittel', points: 0.5, question: '... sehr (9) herz___ und wünschen...', correctAnswer: 'herzlich', acceptableAnswers: ['herzlich'] },
      { id: 'ex2_10', chapterId: 4, partTitle: 'Teil 2: Lücken ergänzen', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Redemittel', points: 0.5, question: '... und wünschen (10) e___ alles Liebe zu eurer...', correctAnswer: 'euch', acceptableAnswers: ['euch'] },
      { id: 'ex2_11', chapterId: 4, partTitle: 'Teil 2: Lücken ergänzen', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Redemittel', points: 0.5, question: '... Liebe zu eurer (11) Ho___ und eine sehr...', correctAnswer: 'Hochzeit', acceptableAnswers: ['hochzeit'] },
      { id: 'ex2_12', chapterId: 4, partTitle: 'Teil 2: Lücken ergänzen', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Redemittel', points: 0.5, question: '... und eine sehr (12) sch___ Feier!', correctAnswer: 'schöne', acceptableAnswers: ['schöne', 'schoene', 'schœne'] },

      // TEIL 3
      { id: 'ex3_1', chapterId: 4, partTitle: 'Teil 3: Welche Antwort passt?', partInstruction: 'Kreuzen Sie an.', type: 'multipleChoice', correctionMode: 'template', category: 'Kommunikation', skill: 'Redemittel', points: 1, question: '1. Wir wollen im Mai heiraten.', options: ["Hauptsache, wir feiern jetzt.", "Wirklich? Oh, wie schön!", "Schade!"], correctAnswer: 'Wirklich? Oh, wie schön!' },
      { id: 'ex3_2', chapterId: 4, partTitle: 'Teil 3: Welche Antwort passt?', type: 'multipleChoice', correctionMode: 'template', category: 'Kommunikation', skill: 'Redemittel', points: 1, question: "2. Alles Gute zum Geburtstag! Tut mir leid, ich habe dein Geschenk zu Hause vergessen.", options: ["Das gibt's doch nicht!", "Ich freue mich riesig.", "Das macht doch nichts."], correctAnswer: 'Das macht doch nichts.' },
      { id: 'ex3_3', chapterId: 4, partTitle: 'Teil 3: Welche Antwort passt?', type: 'multipleChoice', correctionMode: 'template', category: 'Kommunikation', skill: 'Redemittel', points: 1, question: '3. Ich habe 1.000 € gewonnen!', options: ["So ein Glück!", "Oh, ist das peinlich!", "Es ist alles okay."], correctAnswer: 'So ein Glück!' },
      { id: 'ex3_4', chapterId: 4, partTitle: 'Teil 3: Welche Antwort passt?', type: 'multipleChoice', correctionMode: 'template', category: 'Kommunikation', skill: 'Redemittel', points: 1, question: '4. Ich kann dieses Jahr nicht zur Kieler Woche fahren.', options: ["Das ist mir so unangenehm!", "Das tut mir leid.", "Das ist ja toll!"], correctAnswer: 'Das tut mir leid.' },

      // TEIL 4
      { id: 'ex4_1', chapterId: 4, partTitle: 'Teil 4: weil, dass oder wenn?', partInstruction: 'Kreuzen Sie an.', type: 'multipleChoice', correctionMode: 'template', category: 'Grammatik', skill: 'Nebensätze', points: 0.5, question: '1. Wir haben gedacht, _______ in Deutschland alles ordentlich ist.', options: ['wenn', 'dass'], correctAnswer: 'dass' },
      { id: 'ex4_2', chapterId: 4, partTitle: 'Teil 4: weil, dass oder wenn?', type: 'multipleChoice', correctionMode: 'template', category: 'Grammatik', skill: 'Nebensätze', points: 0.5, question: '2. Sie findet es schlimm, _______ er mal wieder zu spät kommt.', options: ['weil', 'wenn'], correctAnswer: 'wenn' },
      { id: 'ex4_3', chapterId: 4, partTitle: 'Teil 4: weil, dass oder wenn?', type: 'multipleChoice', correctionMode: 'template', category: 'Grammatik', skill: 'Nebensätze', points: 0.5, question: '3. Wir haben die Erfahrung gemacht, _______ nicht alle Deutschen pünktlich sind.', options: ['dass', 'weil'], correctAnswer: 'dass' },
      { id: 'ex4_4', chapterId: 4, partTitle: 'Teil 4: weil, dass oder wenn?', type: 'multipleChoice', correctionMode: 'template', category: 'Grammatik', skill: 'Nebensätze', points: 0.5, question: '4. Sie geht abends gerne aus, _______ sie dann ihre Freunde trifft.', options: ['dass', 'weil'], correctAnswer: 'weil' },

      // TEIL 5
      { id: 'ex5_w', chapterId: 4, partTitle: 'Teil 5: Schreiben', partInstruction: 'Schreiben Sie die wenn-Sätze zu Ende.', type: 'writing', correctionMode: 'ai', category: 'Grammatik', skill: 'Schreiben', points: 8, question: 'Beenden Sie die Sätze:\\n1. Ich bin nervös, wenn...\\n2. Ich finde es wunderbar, wenn...\\n3. Wenn..., bin ich traurig.\\n4. Wenn..., freue ich mich.', rubric: { grammar: 50, taskCompletion: 50 } },

      // TEIL 6
      { id: 'ex6_1', chapterId: 4, partTitle: 'Teil 6: Reflexivpronomen', partInstruction: 'Ergänzen Sie die Reflexivpronomen.', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Reflexivpronomen', points: 1, question: 'Ich habe (1) _______ sehr gefreut.', correctAnswer: 'mich' },
      { id: 'ex6_2', chapterId: 4, partTitle: 'Teil 6: Reflexivpronomen', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Reflexivpronomen', points: 1, question: 'Übrigens, ich treffe (2) _______ gleich mit Elena.', correctAnswer: 'mich' },
      { id: 'ex6_3', chapterId: 4, partTitle: 'Teil 6: Reflexivpronomen', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Reflexivpronomen', points: 1, question: 'Nach drei Jahren hat sie (3) _______ an mich erinnert.', correctAnswer: 'sich' },
      { id: 'ex6_4', chapterId: 4, partTitle: 'Teil 6: Reflexivpronomen', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Reflexivpronomen', points: 1, question: 'Wir haben (4) _______ noch nicht für einen Treffpunkt entschieden.', correctAnswer: 'uns' },
      { id: 'ex6_5', chapterId: 4, partTitle: 'Teil 6: Reflexivpronomen', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Reflexivpronomen', points: 1, question: 'Du und Karin, ihr langweilt (5) _______ in Indien sicher auch nicht, was?', correctAnswer: 'euch' },
      { id: 'ex6_6', chapterId: 4, partTitle: 'Teil 6: Reflexivpronomen', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Reflexivpronomen', points: 1, question: 'Ich hoffe, dass ihr (6) _______ auch manchmal ausruht.', correctAnswer: 'euch' }
    ]
  }
`;

content = content.replace('    ]\n  }\n};', '    ]\n  },\n' + kapitel3Data + '\n};');
fs.writeFileSync(quizDataFilePath, content, 'utf8');
console.log('Appended Kapitel 3 and 4 successfully.');
