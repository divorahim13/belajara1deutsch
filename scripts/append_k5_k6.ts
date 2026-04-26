import * as fs from 'fs';
import * as path from 'path';

const quizDataFilePath = path.join(process.cwd(), 'app/dashboard/data/quiz-data.ts');
let content = fs.readFileSync(quizDataFilePath, 'utf8');

const kapitel5And6Data = `
  5: {
    quizId: "kapitel-5-final-quiz",
    chapterId: 5,
    title: "Kapitel 5 Test — Leben in der Stadt",
    description: "Uji penguasaan Wortschatz, Partizip II, Adjektivendungen, mit/ohne, höfliche Bitten, Behörden/Bank/Polizei, dan Stadtbeschreibung.",
    passingScore: 85,
    totalPoints: 100,
    questions: [
      { id: 'k5_1', chapterId: 5, type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Wortschatz', points: 5, question: 'Was bedeutet "die Behörde"?', options: ['taman kota', 'kantor pemerintahan / instansi', 'sepeda listrik', 'restoran'], correctAnswer: 'kantor pemerintahan / instansi' },
      { id: 'k5_2', chapterId: 5, type: 'fillBlank', correctionMode: 'template', category: 'Artikel', skill: 'Artikel', points: 5, question: 'Artikel von "Krankenhaus"?', correctAnswer: 'das', acceptableAnswers: ['das'] },
      { id: 'k5_3', chapterId: 5, type: 'fillBlank', correctionMode: 'template', category: 'Plural', skill: 'Plural', points: 5, question: 'Plural von "das Krankenhaus"?', correctAnswer: 'die Krankenhäuser', acceptableAnswers: ['die Krankenhäuser', 'Krankenhäuser'] },
      { id: 'k5_4', chapterId: 5, type: 'fillBlank', correctionMode: 'template', category: 'Partizip II', skill: 'Partizip II', points: 5, question: 'Partizip II von "ansehen"?', correctAnswer: 'angesehen', acceptableAnswers: ['angesehen'] },
      { id: 'k5_5', chapterId: 5, type: 'multipleChoice', correctionMode: 'template', category: 'Partizip II', skill: 'Hilfsverb', points: 5, question: 'Welches Hilfsverb benutzt man im Perfekt mit "gehen"?', options: ['haben', 'sein'], correctAnswer: 'sein' },
      { id: 'k5_6', chapterId: 5, type: 'multipleChoice', correctionMode: 'template', category: 'Grammatik', skill: 'Perfekt', points: 5, question: 'Welche Form ist richtig?', options: ['Ich habe den Stephansdom angesehen.', 'Ich bin den Stephansdom angesehen.', 'Ich habe den Stephansdom geansehen.', 'Ich bin den Stephansdom geansehen.'], correctAnswer: 'Ich habe den Stephansdom angesehen.' },
      { id: 'k5_7', chapterId: 5, type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Adjektivdeklination', points: 5, question: 'Ergänzen Sie: der schwarz___ Rock', correctAnswer: 'schwarze', acceptableAnswers: ['schwarze'] },
      { id: 'k5_8', chapterId: 5, type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Adjektivdeklination', points: 5, question: 'Ergänzen Sie: den schwarz___ Rock', correctAnswer: 'schwarzen', acceptableAnswers: ['schwarzen'] },
      { id: 'k5_9', chapterId: 5, type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Adjektivdeklination', points: 5, question: 'Ergänzen Sie: mit dem schwarz___ Rock', correctAnswer: 'schwarzen', acceptableAnswers: ['schwarzen'] },
      { id: 'k5_10', chapterId: 5, type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Präpositionen', points: 5, question: 'Ergänzen Sie: Ohne ___ Führerschein darf ich nicht Auto fahren.', correctAnswer: 'meinen', acceptableAnswers: ['meinen'] },
      { id: 'k5_11', chapterId: 5, type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Präpositionen', points: 5, question: 'Ergänzen Sie: Mit ___ Pass dürfen Sie über die Grenze fahren.', correctAnswer: 'einem', acceptableAnswers: ['einem'] },
      { id: 'k5_12', chapterId: 5, type: 'multipleChoice', correctionMode: 'template', category: 'Redemittel', skill: 'Höfliche Bitten', points: 5, question: 'Welche Bitte ist am höflichsten?', options: ['Gib mir die Nummer.', 'Ich brauche die Nummer.', 'Könntest du mir bitte die Nummer geben?', 'Nummer bitte.'], correctAnswer: 'Könntest du mir bitte die Nummer geben?' },
      { id: 'k5_13', chapterId: 5, type: 'fillBlank', correctionMode: 'template', category: 'Redemittel', skill: 'Höfliche Bitten', points: 5, question: 'Ergänzen Sie: Könnten Sie mir bitte kurz ___?', correctAnswer: 'helfen', acceptableAnswers: ['helfen'] },
      { id: 'k5_14', chapterId: 5, type: 'matching', correctionMode: 'template', category: 'Wortschatz', skill: 'Behörden und Ämter', points: 5, question: 'Ordnen Sie zu.', pairs: [{ left: 'ein Konto eröffnen', right: 'Bank' }, { left: 'einen Personalausweis beantragen', right: 'Behörde' }, { left: 'einen Diebstahl melden', right: 'Polizei' }, { left: 'einen Betrag überweisen', right: 'Bank' }] },
      { id: 'k5_15', chapterId: 5, type: 'sentenceTransformation', correctionMode: 'hybrid', category: 'Redemittel', skill: 'Höfliche Bitten', points: 5, question: 'Formulieren Sie höflich: "Hilf mir."', acceptableAnswers: ['Könntest du mir bitte helfen?', 'Kannst du mir bitte helfen?', 'Könnten Sie mir bitte helfen?'], aiFallback: true },
      { id: 'k5_16', chapterId: 5, type: 'writing', correctionMode: 'ai', category: 'Schreiben', skill: 'Stadtbeschreibung', points: 25, question: 'Schreiben Sie 5–6 Sätze über Ihre Stadt. Benutzen Sie mindestens einmal "Mir ist wichtig, dass ..." und einmal "Ich finde schön, dass ...".', rubric: { taskCompletion: 25, grammar: 25, vocabulary: 20, coherence: 20, a2Level: 10 } }
    ]
  },
  6: {
    quizId: "kapitel-6-final-quiz",
    chapterId: 6,
    title: "Kapitel 6 Test — Arbeitswelten",
    description: "Uji penguasaan Arbeitswelt, Fahrkartenschalter, Freizeitangebote, Adjektive nach dem unbestimmten Artikel, werden, Telefonieren, Aussprache m/n, dan Traumberuf.",
    passingScore: 85,
    totalPoints: 100,
    questions: [
      { id: 'k6_1', chapterId: 6, type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Arbeitswelt', points: 5, question: 'Was bedeutet "der Traumberuf"?', options: ['pekerjaan impian', 'tiket kereta', 'hari libur', 'kantor pemerintahan'], correctAnswer: 'pekerjaan impian' },
      { id: 'k6_2', chapterId: 6, type: 'fillBlank', correctionMode: 'template', category: 'Artikel', skill: 'Artikel', points: 5, question: 'Artikel von "Arbeitswelt"?', correctAnswer: 'die', acceptableAnswers: ['die'] },
      { id: 'k6_3', chapterId: 6, type: 'fillBlank', correctionMode: 'template', category: 'Plural', skill: 'Plural', points: 5, question: 'Plural von "der Beruf"?', correctAnswer: 'die Berufe', acceptableAnswers: ['die Berufe', 'Berufe'] },
      { id: 'k6_4', chapterId: 6, type: 'fillBlank', correctionMode: 'template', category: 'Partizip II', skill: 'Partizip II', points: 5, question: 'Partizip II von "werden"?', correctAnswer: 'geworden', acceptableAnswers: ['geworden'] },
      { id: 'k6_5', chapterId: 6, type: 'multipleChoice', correctionMode: 'template', category: 'Partizip II', skill: 'Hilfsverb', points: 5, question: 'Welches Hilfsverb benutzt man im Perfekt mit "werden"?', options: ['haben', 'sein'], correctAnswer: 'sein' },
      { id: 'k6_6', chapterId: 6, type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Perfekt', points: 5, question: 'Ergänzen Sie: Er ist Fernfahrer ___.', correctAnswer: 'geworden', acceptableAnswers: ['geworden'] },
      { id: 'k6_7', chapterId: 6, type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Adjektivdeklination', points: 5, question: 'Ergänzen Sie: ein schön___ Abend', correctAnswer: 'schöner', acceptableAnswers: ['schöner'] },
      { id: 'k6_8', chapterId: 6, type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Adjektivdeklination', points: 5, question: 'Ergänzen Sie: einen schön___ Abend', correctAnswer: 'schönen', acceptableAnswers: ['schönen'] },
      { id: 'k6_9', chapterId: 6, type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Adjektivdeklination', points: 5, question: 'Ergänzen Sie: mit einer toll___ Band', correctAnswer: 'tollen', acceptableAnswers: ['tollen'] },
      { id: 'k6_10', chapterId: 6, type: 'multipleChoice', correctionMode: 'template', category: 'Grammatik', skill: 'Verben', points: 5, question: 'Welche Form von werden ist richtig?', options: ['du werde', 'du wirst', 'du werden', 'du werdet'], correctAnswer: 'du wirst' },
      { id: 'k6_11', chapterId: 6, type: 'multipleChoice', correctionMode: 'template', category: 'Redemittel', skill: 'Fahrkartenschalter', points: 5, question: 'Was sagt man am Fahrkartenschalter, wenn man ein Ticket nach Wiesbaden kaufen möchte?', options: ['Eine Fahrkarte nach Wiesbaden, bitte.', 'Ich habe ein Konto in Wiesbaden.', 'Ich möchte Wiesbaden essen.', 'Wiesbaden ist schön.'], correctAnswer: 'Eine Fahrkarte nach Wiesbaden, bitte.' },
      { id: 'k6_12', chapterId: 6, type: 'matching', correctionMode: 'template', category: 'Redemittel', skill: 'Situationen', points: 5, question: 'Ordnen Sie zu.', pairs: [{ left: 'Wann fährt der nächste Zug?', right: 'Fahrkartenschalter' }, { left: 'Kann ich bitte mit Frau Weber sprechen?', right: 'Telefonieren' }, { left: 'Ich möchte einen Platz reservieren.', right: 'Fahrkartenschalter' }, { left: 'Möchten Sie eine Nachricht hinterlassen?', right: 'Telefonieren' }] },
      { id: 'k6_13', chapterId: 6, type: 'sentenceTransformation', correctionMode: 'hybrid', category: 'Redemittel', skill: 'Telefonieren', points: 5, question: 'Formulieren Sie eine höfliche Frage am Telefon: "Ich will mit Frau Müller sprechen."', acceptableAnswers: ['Kann ich bitte mit Frau Müller sprechen?', 'Könnte ich bitte mit Frau Müller sprechen?', 'Können Sie mich bitte mit Frau Müller verbinden?'], aiFallback: true },
      { id: 'k6_14', chapterId: 6, type: 'multipleChoice', correctionMode: 'template', category: 'Aussprache', skill: 'Konsonanten', points: 5, question: 'Bei welchem Wort hört man am Wortende "n"?', options: ['Mann', 'Raum', 'Abend', 'Auftrag'], correctAnswer: 'Mann' },
      { id: 'k6_15', chapterId: 6, type: 'fillBlank', correctionMode: 'template', category: 'Partizip II', skill: 'Partizip II', points: 5, question: 'Partizip II von "abschließen"?', correctAnswer: 'abgeschlossen', acceptableAnswers: ['abgeschlossen'] },
      { id: 'k6_16', chapterId: 6, type: 'writing', correctionMode: 'ai', category: 'Schreiben', skill: 'Traumberuf', points: 25, question: 'Schreiben Sie 5–6 Sätze über Ihren Traumberuf. Benutzen Sie mindestens einmal "werden" und einmal "weil".', rubric: { taskCompletion: 25, grammar: 25, vocabulary: 20, coherence: 20, a2Level: 10 } }
    ]
  }
`;

content = content.replace('    ]\n  }\n};', '    ]\n  },\n' + kapitel5And6Data + '\n};');
fs.writeFileSync(quizDataFilePath, content, 'utf8');
console.log('Appended Kapitel 5 and 6 successfully.');
