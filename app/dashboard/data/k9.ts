import { Question } from './quiz-data';

export const kapitel9Questions: Question[] = [
  {
    id: 'k9_1',
    chapterId: 9,
    partTitle: 'Teil 1: Wortschatz',
    type: 'multipleChoice',
    correctionMode: 'template',
    category: 'Wortschatz',
    skill: 'Sport',
    points: 2,
    question: 'Was bedeutet "der Schläger"?',
    options: [
      'raket / alat pemukul olahraga',
      'peta kota',
      'penginapan',
      'surat kabar'
    ],
    correctAnswer: 'raket / alat pemukul olahraga'
  },
  {
    id: 'k9_2',
    chapterId: 9,
    partTitle: 'Teil 2: Artikel',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Artikel',
    skill: 'Sportart',
    points: 2,
    question: 'Artikel von "Sportart"?',
    correctAnswer: 'die',
    acceptableAnswers: ['die']
  },
  {
    id: 'k9_3',
    chapterId: 9,
    partTitle: 'Teil 3: Plural',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Plural',
    skill: 'Helm',
    points: 2,
    question: 'Plural von "der Helm"?',
    correctAnswer: 'die Helme',
    acceptableAnswers: ['die Helme', 'Helme']
  },
  {
    id: 'k9_4',
    chapterId: 9,
    partTitle: 'Teil 4: Partizip II',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Partizip II',
    skill: 'gewinnen',
    points: 2,
    question: 'Partizip II von "gewinnen"?',
    correctAnswer: 'gewonnen',
    acceptableAnswers: ['gewonnen']
  },
  {
    id: 'k9_5',
    chapterId: 9,
    partTitle: 'Teil 5: Hilfsverb',
    type: 'multipleChoice',
    correctionMode: 'template',
    category: 'Partizip II',
    skill: 'teilnehmen',
    points: 2,
    question: 'Welches Hilfsverb benutzt man im Perfekt mit "teilnehmen"?',
    options: ['haben', 'sein'],
    correctAnswer: 'haben'
  },
  {
    id: 'k9_6',
    chapterId: 9,
    partTitle: 'Teil 6: Grammatik',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Grammatik',
    skill: 'Präpositionen',
    points: 2,
    question: 'Ergänzen Sie: Ich bin Fan ___ Bayern München.',
    correctAnswer: 'von',
    acceptableAnswers: ['von']
  },
  {
    id: 'k9_7',
    chapterId: 9,
    partTitle: 'Teil 7: Redemittel',
    type: 'multipleChoice',
    correctionMode: 'template',
    category: 'Redemittel',
    skill: 'Begeisterung',
    points: 2,
    question: 'Welche Aussage drückt Begeisterung aus?',
    options: [
      'Das ist wirklich eine Katastrophe.',
      'Wahnsinn!',
      'Das kann doch nicht wahr sein!',
      'So ein Mist!'
    ],
    correctAnswer: 'Wahnsinn!'
  },
  {
    id: 'k9_8',
    chapterId: 9,
    partTitle: 'Teil 8: Redemittel',
    type: 'multipleChoice',
    correctionMode: 'template',
    category: 'Redemittel',
    skill: 'Hoffnung',
    points: 2,
    question: 'Welche Aussage drückt Hoffnung aus?',
    options: [
      'Hoffentlich schaffen sie es!',
      'Echt blöd!',
      'Das ist schade.',
      'Das war langweilig.'
    ],
    correctAnswer: 'Hoffentlich schaffen sie es!'
  },
  {
    id: 'k9_9',
    chapterId: 9,
    partTitle: 'Teil 9: deshalb oder trotzdem',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Grammatik',
    skill: 'Konjunktionen',
    points: 2,
    question: 'Ergänzen Sie: Alle spielen schlecht, ___ haben sie gewonnen.',
    correctAnswer: 'trotzdem',
    acceptableAnswers: ['trotzdem']
  },
  {
    id: 'k9_10',
    chapterId: 9,
    partTitle: 'Teil 10: deshalb oder trotzdem',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Grammatik',
    skill: 'Konjunktionen',
    points: 2,
    question: 'Ergänzen Sie: Alle spielen schlecht, ___ haben sie verloren.',
    correctAnswer: 'deshalb',
    acceptableAnswers: ['deshalb']
  },
  {
    id: 'k9_11',
    chapterId: 9,
    partTitle: 'Teil 11: Redemittel',
    type: 'multipleChoice',
    correctionMode: 'template',
    category: 'Redemittel',
    skill: 'Zustimmung',
    points: 2,
    question: 'Welche Reaktion ist eine Zustimmung?',
    options: [
      'Tut mir leid, ich habe keine Zeit.',
      'Leider geht es am Samstag nicht.',
      'Super, das ist eine gute Idee.',
      'Wollen wir nicht lieber etwas anderes machen?'
    ],
    correctAnswer: 'Super, das ist eine gute Idee.'
  },
  {
    id: 'k9_12',
    chapterId: 9,
    partTitle: 'Teil 12: Ordnen Sie zu',
    type: 'matching',
    correctionMode: 'template',
    category: 'Redemittel',
    skill: 'Vorschläge',
    points: 4,
    question: 'Ordnen Sie zu.',
    pairs: {
      'Darf ich etwas vorschlagen?': 'Vorschlag machen',
      'Einverstanden.': 'zustimmen',
      'Tut mir leid, ich habe keine Lust.': 'ablehnen',
      'Wollen wir nicht lieber ...?': 'Gegenvorschlag machen'
    }
  },
  {
    id: 'k9_13',
    chapterId: 9,
    partTitle: 'Teil 13: Grammatik',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Grammatik',
    skill: 'Dativ und Akkusativ',
    points: 2,
    question: 'Ergänzen Sie: Wir erklären ___ die Regeln.',
    correctAnswer: 'den Gästen',
    acceptableAnswers: ['den Gästen', 'den Gaesten']
  },
  {
    id: 'k9_14',
    chapterId: 9,
    partTitle: 'Teil 14: Grammatik',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Grammatik',
    skill: 'Dativ und Akkusativ',
    points: 2,
    question: 'Ergänzen Sie: Wir leihen ___ Helme.',
    correctAnswer: 'euch',
    acceptableAnswers: ['euch']
  },
  {
    id: 'k9_15',
    chapterId: 9,
    partTitle: 'Teil 15: Pronomen Akkusativ vor Dativ',
    type: 'sentenceTransformation',
    correctionMode: 'hybrid',
    category: 'Grammatik',
    skill: 'Pronomen',
    points: 5,
    question: 'Ersetzen Sie das Akkusativobjekt durch ein Pronomen: "Wir erklären den Gästen die Regeln."',
    acceptableAnswers: [
      'Wir erklären sie den Gästen.',
      'Wir erklären sie den Gaesten.'
    ],
    aiFallback: true
  },
  {
    id: 'k9_16',
    chapterId: 9,
    partTitle: 'Teil 16: Vorschlag machen',
    type: 'sentenceTransformation',
    correctionMode: 'hybrid',
    category: 'Redemittel',
    skill: 'Vorschlag machen',
    points: 5,
    question: 'Machen Sie einen Vorschlag: "am Wochenende / Rad fahren"',
    acceptableAnswers: [
      'Wollen wir am Wochenende Rad fahren?',
      'Wir könnten am Wochenende Rad fahren.',
      'Was denkst du, sollen wir am Wochenende Rad fahren?'
    ],
    aiFallback: true
  },
  {
    id: 'k9_17',
    chapterId: 9,
    partTitle: 'Teil 17: Schreiben',
    type: 'writing',
    correctionMode: 'ai',
    category: 'Schreiben',
    skill: 'Sportart',
    points: 15,
    question: 'Schreiben Sie 5–6 Sätze über eine Sportart, die Sie mögen oder nicht mögen. Benutzen Sie mindestens einmal "deshalb" und einmal "trotzdem".',
    rubric: {
      taskCompletion: 25,
      grammar: 25,
      vocabulary: 20,
      coherence: 20,
      a2Level: 10
    }
  },
  {
    id: 'k9_18',
    chapterId: 9,
    partTitle: 'Teil 18: Schreiben',
    type: 'writing',
    correctionMode: 'ai',
    category: 'Schreiben',
    skill: 'Reiseziel',
    points: 15,
    question: 'Stellen Sie ein Reiseziel für Sport vor. Schreiben Sie mindestens 5 Sätze: Wo ist der Ort? Was kann man dort machen? Was ist besonders?',
    rubric: {
      taskCompletion: 25,
      grammar: 25,
      vocabulary: 20,
      coherence: 20,
      a2Level: 10
    }
  }
];
