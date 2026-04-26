import { Question } from './quiz-data';

export const kapitel10Questions: Question[] = [
  {
    id: 'k10_1',
    chapterId: 10,
    partTitle: 'Teil 1: Wortschatz Wohnformen',
    type: 'multipleChoice',
    correctionMode: 'template',
    category: 'Wortschatz',
    skill: 'Wohnformen',
    points: 2,
    question: 'Was bedeutet "der Bauernhof"?',
    options: [
      'peternakan / rumah pertanian',
      'konser musik',
      'galeri seni',
      'halte bus'
    ],
    correctAnswer: 'peternakan / rumah pertanian'
  },
  {
    id: 'k10_2',
    chapterId: 10,
    partTitle: 'Teil 2: Artikel',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Artikel',
    skill: 'Haustier',
    points: 2,
    question: 'Artikel von "Haustier"?',
    correctAnswer: 'das',
    acceptableAnswers: ['das']
  },
  {
    id: 'k10_3',
    chapterId: 10,
    partTitle: 'Teil 3: Plural',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Plural',
    skill: 'Katze',
    points: 2,
    question: 'Plural von "die Katze"?',
    correctAnswer: 'die Katzen',
    acceptableAnswers: ['die Katzen', 'Katzen']
  },
  {
    id: 'k10_4',
    chapterId: 10,
    partTitle: 'Teil 4: Partizip II',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Partizip II',
    skill: 'umziehen',
    points: 2,
    question: 'Partizip II von "umziehen"?',
    correctAnswer: 'umgezogen',
    acceptableAnswers: ['umgezogen']
  },
  {
    id: 'k10_5',
    chapterId: 10,
    partTitle: 'Teil 5: Hilfsverb',
    type: 'multipleChoice',
    correctionMode: 'template',
    category: 'Partizip II',
    skill: 'umziehen',
    points: 2,
    question: 'Welches Hilfsverb benutzt man im Perfekt mit "umziehen"?',
    options: ['haben', 'sein'],
    correctAnswer: 'sein'
  },
  {
    id: 'k10_6',
    chapterId: 10,
    partTitle: 'Teil 6: Redemittel',
    type: 'multipleChoice',
    correctionMode: 'template',
    category: 'Redemittel',
    skill: 'Bitte',
    points: 2,
    question: 'Welche Aussage ist eine höfliche Bitte?',
    options: [
      'Mach das sofort!',
      'Könnten Sie mir einen Gefallen tun?',
      'Das geht wirklich nicht.',
      'Das kommt nicht mehr vor.'
    ],
    correctAnswer: 'Könnten Sie mir einen Gefallen tun?'
  },
  {
    id: 'k10_7',
    chapterId: 10,
    partTitle: 'Teil 7: Redemittel',
    type: 'multipleChoice',
    correctionMode: 'template',
    category: 'Redemittel',
    skill: 'Beschwerde',
    points: 2,
    question: 'Welche Aussage ist eine Beschwerde?',
    options: [
      'Ja, gerne.',
      'Kein Problem.',
      'Es stört mich, wenn der Hund so laut bellt.',
      'Natürlich, das mache ich gern.'
    ],
    correctAnswer: 'Es stört mich, wenn der Hund so laut bellt.'
  },
  {
    id: 'k10_8',
    chapterId: 10,
    partTitle: 'Teil 8: Redemittel',
    type: 'multipleChoice',
    correctionMode: 'template',
    category: 'Redemittel',
    skill: 'Entschuldigung',
    points: 2,
    question: 'Welche Aussage ist eine Entschuldigung?',
    options: [
      'Das tut mir leid.',
      'Ich hätte eine Bitte.',
      'Könnten Sie mir helfen?',
      'Ich finde interessant, dass ...'
    ],
    correctAnswer: 'Das tut mir leid.'
  },
  {
    id: 'k10_9',
    chapterId: 10,
    partTitle: 'Teil 9: Ordnen Sie zu',
    type: 'matching',
    correctionMode: 'template',
    category: 'Redemittel',
    skill: 'Reaktionen',
    points: 4,
    question: 'Ordnen Sie zu.',
    pairs: {
      'Könnten Sie mir einen Gefallen tun?': 'um einen Gefallen bitten',
      'Es stört mich, wenn ...': 'sich beschweren',
      'Das tut mir leid.': 'sich entschuldigen',
      'Natürlich, das mache ich gern.': 'auf eine Bitte reagieren'
    }
  },
  {
    id: 'k10_10',
    chapterId: 10,
    partTitle: 'Teil 10: Wechselpräpositionen',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Grammatik',
    skill: 'Wo?',
    points: 2,
    question: 'Wo? Ergänzen Sie: Der Müll steht neben ___ Garage.',
    correctAnswer: 'der',
    acceptableAnswers: ['der']
  },
  {
    id: 'k10_11',
    chapterId: 10,
    partTitle: 'Teil 11: Wechselpräpositionen',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Grammatik',
    skill: 'Wo?',
    points: 2,
    question: 'Wo? Ergänzen Sie: Das Kissen liegt unter ___ Stuhl.',
    correctAnswer: 'dem',
    acceptableAnswers: ['dem']
  },
  {
    id: 'k10_12',
    chapterId: 10,
    partTitle: 'Teil 12: Wechselpräpositionen',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Grammatik',
    skill: 'Wohin?',
    points: 2,
    question: 'Wohin? Ergänzen Sie: Sie stellen das Fahrrad in ___ Garage.',
    correctAnswer: 'die',
    acceptableAnswers: ['die']
  },
  {
    id: 'k10_13',
    chapterId: 10,
    partTitle: 'Teil 13: Wechselpräpositionen',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Grammatik',
    skill: 'Wohin?',
    points: 2,
    question: 'Wohin? Ergänzen Sie: Sie legen das Kissen auf ___ Stuhl.',
    correctAnswer: 'den',
    acceptableAnswers: ['den']
  },
  {
    id: 'k10_14',
    chapterId: 10,
    partTitle: 'Teil 14: Präpositionen',
    type: 'multipleChoice',
    correctionMode: 'template',
    category: 'Grammatik',
    skill: 'Wechselpräpositionen',
    points: 2,
    question: 'Welche Präposition ist eine Wechselpräposition?',
    options: ['ohne', 'mit', 'zwischen', 'wegen'],
    correctAnswer: 'zwischen'
  },
  {
    id: 'k10_15',
    chapterId: 10,
    partTitle: 'Teil 15: als oder wenn',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Grammatik',
    skill: 'Nebensätze',
    points: 2,
    question: 'Ergänzen Sie: ___ Melly ein Zeugnis gefehlt hat, hat ihre Mutter es geschickt.',
    correctAnswer: 'Als',
    acceptableAnswers: ['Als', 'als']
  },
  {
    id: 'k10_16',
    chapterId: 10,
    partTitle: 'Teil 16: als oder wenn',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Grammatik',
    skill: 'Nebensätze',
    points: 2,
    question: 'Ergänzen Sie: Immer ___ Melly Zeit hatte, waren Lena und Noah nicht da.',
    correctAnswer: 'wenn',
    acceptableAnswers: ['wenn']
  },
  {
    id: 'k10_17',
    chapterId: 10,
    partTitle: 'Teil 17: Bitte formulieren',
    type: 'sentenceTransformation',
    correctionMode: 'hybrid',
    category: 'Redemittel',
    skill: 'Bitte',
    points: 5,
    question: 'Formulieren Sie eine höfliche Bitte: "Gieß bitte meine Blumen."',
    acceptableAnswers: [
      'Könntest du bitte meine Blumen gießen?',
      'Könnten Sie bitte meine Blumen gießen?',
      'Kannst du bitte meine Blumen gießen?'
    ],
    aiFallback: true
  },
  {
    id: 'k10_18',
    chapterId: 10,
    partTitle: 'Teil 18: Beschwerde formulieren',
    type: 'sentenceTransformation',
    correctionMode: 'hybrid',
    category: 'Redemittel',
    skill: 'Beschwerde',
    points: 5,
    question: 'Sagen Sie höflich, dass der Lärm ein Problem ist.',
    acceptableAnswers: [
      'Entschuldigung, könnten Sie bitte leiser sein?',
      'Es stört mich, wenn es so laut ist.',
      'Entschuldigung, das geht wirklich nicht.'
    ],
    aiFallback: true
  },
  {
    id: 'k10_19',
    chapterId: 10,
    partTitle: 'Teil 19: Nachricht an einen Nachbarn',
    type: 'writing',
    correctionMode: 'ai',
    category: 'Schreiben',
    skill: 'Kommunikation',
    points: 15,
    question: 'Schreiben Sie eine kurze Nachricht an einen Nachbarn. Bitten Sie um einen Gefallen oder beschweren Sie sich höflich. Schreiben Sie mindestens 5 Sätze.',
    rubric: {
      taskCompletion: 25,
      grammar: 25,
      vocabulary: 20,
      coherence: 20,
      a2Level: 10
    }
  },
  {
    id: 'k10_20',
    chapterId: 10,
    partTitle: 'Teil 20: Tiergeschichte',
    type: 'writing',
    correctionMode: 'ai',
    category: 'Schreiben',
    skill: 'Geschichten erzählen',
    points: 15,
    question: 'Schreiben Sie eine kurze Tiergeschichte mit mindestens 6 Sätzen. Benutzen Sie mindestens einmal "als", einmal "wenn" und zwei Adjektive.',
    rubric: {
      taskCompletion: 25,
      grammar: 25,
      vocabulary: 20,
      coherence: 20,
      a2Level: 10
    }
  }
];
