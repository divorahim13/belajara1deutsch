import { Question } from './quiz-data';

export const kapitel11Questions: Question[] = [
  {
    id: 'k11_1',
    chapterId: 11,
    partTitle: 'Teil 1: Wortschatz Lebensphasen',
    type: 'multipleChoice',
    correctionMode: 'template',
    category: 'Wortschatz',
    skill: 'Lebensphasen',
    points: 2,
    question: 'Was bedeutet "die Lebensphase"?',
    options: [
      'fase kehidupan',
      'tempat duduk',
      'lukisan hewan',
      'tiket konser'
    ],
    correctAnswer: 'fase kehidupan'
  },
  {
    id: 'k11_2',
    chapterId: 11,
    partTitle: 'Teil 2: Artikel',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Artikel',
    skill: 'Wunsch',
    points: 2,
    question: 'Artikel von "Wunsch"?',
    correctAnswer: 'der',
    acceptableAnswers: ['der']
  },
  {
    id: 'k11_3',
    chapterId: 11,
    partTitle: 'Teil 3: Plural',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Plural',
    skill: 'Wunsch',
    points: 2,
    question: 'Plural von "der Wunsch"?',
    correctAnswer: 'die Wünsche',
    acceptableAnswers: ['die Wünsche', 'Wünsche', 'die Wuensche', 'Wuensche']
  },
  {
    id: 'k11_4',
    chapterId: 11,
    partTitle: 'Teil 4: Partizip II',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Partizip II',
    skill: 'verreisen',
    points: 2,
    question: 'Partizip II von "verreisen"?',
    correctAnswer: 'verreist',
    acceptableAnswers: ['verreist']
  },
  {
    id: 'k11_5',
    chapterId: 11,
    partTitle: 'Teil 5: Hilfsverb',
    type: 'multipleChoice',
    correctionMode: 'template',
    category: 'Partizip II',
    skill: 'verreisen',
    points: 2,
    question: 'Welches Hilfsverb benutzt man im Perfekt mit "verreisen"?',
    options: ['haben', 'sein'],
    correctAnswer: 'sein'
  },
  {
    id: 'k11_6',
    chapterId: 11,
    partTitle: 'Teil 6: Konjunktiv II',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Grammatik',
    skill: 'Konjunktiv II',
    points: 2,
    question: 'Ergänzen Sie: Ich ___ gern mehr Zeit.',
    correctAnswer: 'hätte',
    acceptableAnswers: ['hätte', 'haette']
  },
  {
    id: 'k11_7',
    chapterId: 11,
    partTitle: 'Teil 7: Konjunktiv II',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Grammatik',
    skill: 'Konjunktiv II',
    points: 2,
    question: 'Ergänzen Sie: Er ___ gern öfter zu Hause.',
    correctAnswer: 'wäre',
    acceptableAnswers: ['wäre', 'waere']
  },
  {
    id: 'k11_8',
    chapterId: 11,
    partTitle: 'Teil 8: Konjunktiv II',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Grammatik',
    skill: 'Konjunktiv II',
    points: 2,
    question: 'Ergänzen Sie: Wir ___ gern mehr reisen.',
    correctAnswer: 'würden',
    acceptableAnswers: ['würden', 'wuerden']
  },
  {
    id: 'k11_9',
    chapterId: 11,
    partTitle: 'Teil 9: Wünsche äußern',
    type: 'multipleChoice',
    correctionMode: 'template',
    category: 'Grammatik',
    skill: 'Wünsche',
    points: 2,
    question: 'Welche Aussage ist ein Wunsch im Konjunktiv II?',
    options: [
      'Ich gehe heute einkaufen.',
      'Ich hätte gern mehr Freizeit.',
      'Ich habe gestern gelernt.',
      'Ich bin im Büro.'
    ],
    correctAnswer: 'Ich hätte gern mehr Freizeit.'
  },
  {
    id: 'k11_10',
    chapterId: 11,
    partTitle: 'Teil 10: Ratschläge',
    type: 'multipleChoice',
    correctionMode: 'template',
    category: 'Redemittel',
    skill: 'Ratschläge',
    points: 2,
    question: 'Welche Aussage ist ein Ratschlag?',
    options: [
      'Du solltest am Abend das Handy ausschalten.',
      'Ich habe wenig Zeit.',
      'Wir treffen uns morgen.',
      'Ich war sehr müde.'
    ],
    correctAnswer: 'Du solltest am Abend das Handy ausschalten.'
  },
  {
    id: 'k11_11',
    chapterId: 11,
    partTitle: 'Teil 11: Ratschläge',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Redemittel',
    skill: 'Ratschläge',
    points: 2,
    question: 'Ergänzen Sie: Ich würde mit dem Chef ___.',
    correctAnswer: 'sprechen',
    acceptableAnswers: ['sprechen']
  },
  {
    id: 'k11_12',
    chapterId: 11,
    partTitle: 'Teil 12: Verben mit Präposition',
    type: 'matching',
    correctionMode: 'template',
    category: 'Grammatik',
    skill: 'Verben mit Präposition',
    points: 4,
    question: 'Ordnen Sie zu.',
    pairs: {
      'sich freuen auf': 'Akkusativ',
      'sich erinnern an': 'Akkusativ',
      'sprechen mit': 'Dativ',
      'sich kümmern um': 'Akkusativ'
    }
  },
  {
    id: 'k11_13',
    chapterId: 11,
    partTitle: 'Teil 13: Verben mit Präposition',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Grammatik',
    skill: 'Verben mit Präposition',
    points: 2,
    question: 'Ergänzen Sie: Worauf freut sich Linda? Sie freut sich ___ den Ausflug.',
    correctAnswer: 'auf',
    acceptableAnswers: ['auf']
  },
  {
    id: 'k11_14',
    chapterId: 11,
    partTitle: 'Teil 14: W-Fragen mit Präposition',
    type: 'fillBlank',
    correctionMode: 'template',
    category: 'Grammatik',
    skill: 'W-Fragen',
    points: 2,
    question: 'Ergänzen Sie: Mit ___ hat Mereth gesprochen?',
    correctAnswer: 'wem',
    acceptableAnswers: ['wem']
  },
  {
    id: 'k11_15',
    chapterId: 11,
    partTitle: 'Teil 15: W-Fragen',
    type: 'multipleChoice',
    correctionMode: 'template',
    category: 'Grammatik',
    skill: 'W-Fragen',
    points: 2,
    question: 'Welche Frage ist richtig?',
    options: [
      'Woran denkst du?',
      'Wo denkst du an?',
      'Was denkst du an?',
      'Wen denkst du?'
    ],
    correctAnswer: 'Woran denkst du?'
  },
  {
    id: 'k11_16',
    chapterId: 11,
    partTitle: 'Teil 16: Sprichwörter',
    type: 'multipleChoice',
    correctionMode: 'template',
    category: 'Wortschatz',
    skill: 'Sprichwörter',
    points: 2,
    question: 'Was bedeutet das Sprichwort "Zeit ist Geld"?',
    options: [
      'Zeit ist wertvoll.',
      'Zeit heilt Krankheiten.',
      'Man soll immer schlafen.',
      'Man darf kein Geld ausgeben.'
    ],
    correctAnswer: 'Zeit ist wertvoll.'
  },
  {
    id: 'k11_17',
    chapterId: 11,
    partTitle: 'Teil 17: Sprichwörter zuordnen',
    type: 'matching',
    correctionMode: 'template',
    category: 'Wortschatz',
    skill: 'Sprichwörter',
    points: 4,
    question: 'Ordnen Sie das Sprichwort der Bedeutung zu.',
    pairs: {
      "Morgenstund' hat Gold im Mund.": 'Am Morgen kann man gut arbeiten.',
      'Zeit ist Geld.': 'Zeit ist wertvoll.',
      'Die Zeit heilt alle Wunden.': 'Nach einiger Zeit tun Enttäuschungen weniger weh.',
      'Gut Ding will Weile haben.': 'Gute Dinge brauchen Zeit.'
    }
  },
  {
    id: 'k11_18',
    chapterId: 11,
    partTitle: 'Teil 18: Wunsch formulieren',
    type: 'sentenceTransformation',
    correctionMode: 'hybrid',
    category: 'Grammatik',
    skill: 'Konjunktiv II',
    points: 5,
    question: 'Formulieren Sie einen Wunsch: "Ich habe wenig Zeit."',
    acceptableAnswers: [
      'Ich hätte gern mehr Zeit.',
      'Ich würde gern mehr Zeit haben.',
      'Ich hätte gern mehr Freizeit.'
    ],
    aiFallback: true
  },
  {
    id: 'k11_19',
    chapterId: 11,
    partTitle: 'Teil 19: Ratschlag formulieren',
    type: 'sentenceTransformation',
    correctionMode: 'hybrid',
    category: 'Redemittel',
    skill: 'Ratschlag',
    points: 5,
    question: 'Formulieren Sie einen Ratschlag: "Mein Kollege ist zu laut."',
    acceptableAnswers: [
      'Du könntest deinem Kollegen sagen, dass er leiser reden soll.',
      'Du solltest mit deinem Kollegen sprechen.',
      'An deiner Stelle würde ich mit dem Kollegen sprechen.'
    ],
    aiFallback: true
  },
  {
    id: 'k11_20',
    chapterId: 11,
    partTitle: 'Teil 20: Schreiben (Wünsche)',
    type: 'writing',
    correctionMode: 'ai',
    category: 'Schreiben',
    skill: 'Konjunktiv II',
    points: 15,
    question: 'Schreiben Sie 5–6 Sätze über Ihre Wünsche. Was hätten Sie gern? Was würden Sie gern machen? Benutzen Sie mindestens zweimal Konjunktiv II.',
    rubric: {
      taskCompletion: 25,
      grammar: 25,
      vocabulary: 20,
      coherence: 20,
      a2Level: 10
    }
  },
  {
    id: 'k11_21',
    chapterId: 11,
    partTitle: 'Teil 21: Schreiben (Ratschläge)',
    type: 'writing',
    correctionMode: 'ai',
    category: 'Schreiben',
    skill: 'Ratschläge',
    points: 15,
    question: 'Ein Freund hat sehr viel Stress. Schreiben Sie ihm 5–6 Sätze mit Ratschlägen. Benutzen Sie mindestens einmal "solltest", einmal "könntest" und einmal "An deiner Stelle würde ich ...".',
    rubric: {
      taskCompletion: 25,
      grammar: 25,
      vocabulary: 20,
      coherence: 20,
      a2Level: 10
    }
  }
];
