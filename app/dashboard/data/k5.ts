import { Question } from './quiz-data';

export const kapitel5Questions: Question[] = [
  // ==========================================
  // J1. TEMPLATE MODE (Objective)
  // ==========================================
  // Vocabulary (Multiple Choice)
  {
    id: 'k5_vocab_1',
    category: 'Wortschatz',
    chapterId: 5,
    skill: 'Wortschatz',
    type: 'multipleChoice',
    correctionMode: 'template',
    question: 'Was ist das Gegenteil von "laut"?',
    options: ['ruhig', 'schnell', 'teuer', 'nah'],
    correctAnswer: 'ruhig',
    explanation: 'Das Gegenteil von laut (berisik) adalah ruhig (tenang).',
    points: 2
  },
  {
    id: 'k5_vocab_2',
    category: 'Wortschatz',
    chapterId: 5,
    skill: 'Wortschatz',
    type: 'multipleChoice',
    correctionMode: 'template',
    question: 'Wo kann man ein Konto eröffnen?',
    options: ['Auf der Post', 'Auf der Bank', 'Im Supermarkt', 'Im Kino'],
    correctAnswer: 'Auf der Bank',
    explanation: 'Man eröffnet ein Konto auf der Bank (Di bank).',
    points: 2
  },
  {
    id: 'k5_vocab_3',
    category: 'Wortschatz',
    chapterId: 5,
    skill: 'Wortschatz',
    type: 'multipleChoice',
    correctionMode: 'template',
    question: 'Wer fängt Diebe und regelt den Verkehr?',
    options: ['Der Arzt', 'Der Lehrer', 'Die Polizei', 'Der Bäcker'],
    correctAnswer: 'Die Polizei',
    explanation: 'Die Polizei (Polisi) bertugas menangkap pencuri dan mengatur lalu lintas.',
    points: 2
  },
  {
    id: 'k5_vocab_4',
    category: 'Wortschatz',
    chapterId: 5,
    skill: 'Wortschatz',
    type: 'multipleChoice',
    correctionMode: 'template',
    question: 'Wie heißt der Ort, wo man Züge nimmt?',
    options: ['Der Flughafen', 'Der Bahnhof', 'Die Haltestelle', 'Der Hafen'],
    correctAnswer: 'Der Bahnhof',
    explanation: 'Züge (kereta api) berhenti di stasiun (Der Bahnhof).',
    points: 2
  },
  {
    id: 'k5_vocab_5',
    category: 'Wortschatz',
    chapterId: 5,
    skill: 'Wortschatz',
    type: 'multipleChoice',
    correctionMode: 'template',
    question: 'Was braucht man, um legal Auto zu fahren?',
    options: ['Den Personalausweis', 'Den Führerschein', 'Die Meldebescheinigung', 'Das Formular'],
    correctAnswer: 'Den Führerschein',
    explanation: 'Man braucht einen Führerschein (SIM) um Auto zu fahren.',
    points: 2
  },
  {
    id: 'k5_vocab_6',
    category: 'Wortschatz',
    chapterId: 5,
    skill: 'Wortschatz',
    type: 'multipleChoice',
    correctionMode: 'template',
    question: 'Was macht man, wenn man eine neue Wohnung hat?',
    options: ['Man muss sich bei der Behörde anmelden.', 'Man muss ein Konto eröffnen.', 'Man ruft die Polizei.', 'Man geht einkaufen.'],
    correctAnswer: 'Man muss sich bei der Behörde anmelden.',
    explanation: 'Saat pindah rumah, kita harus melapor ke kantor catatan sipil (Behörde).',
    points: 2
  },
  {
    id: 'k5_vocab_7',
    category: 'Wortschatz',
    chapterId: 5,
    skill: 'Wortschatz',
    type: 'multipleChoice',
    correctionMode: 'template',
    question: 'Was ist ein anderes Wort für "sehr wichtig"?',
    options: ['langweilig', 'dringend', 'gefährlich', 'teuer'],
    correctAnswer: 'dringend',
    explanation: '"Dringend" berarti mendesak atau sangat penting.',
    points: 2
  },
  {
    id: 'k5_vocab_8',
    category: 'Wortschatz',
    chapterId: 5,
    skill: 'Wortschatz',
    type: 'multipleChoice',
    correctionMode: 'template',
    question: 'Wo kann man frisches Obst und Gemüse kaufen?',
    options: ['Auf dem Markt', 'In der Bank', 'Auf der Behörde', 'Im Museum'],
    correctAnswer: 'Auf dem Markt',
    explanation: 'Buah dan sayuran segar biasanya dibeli di pasar (Auf dem Markt).',
    points: 2
  },
  {
    id: 'k5_vocab_9',
    category: 'Wortschatz',
    chapterId: 5,
    skill: 'Wortschatz',
    type: 'multipleChoice',
    correctionMode: 'template',
    question: 'Welches Verkehrsmittel fährt unter der Erde?',
    options: ['Der Bus', 'Die Straßenbahn', 'Die U-Bahn', 'Das Taxi'],
    correctAnswer: 'Die U-Bahn',
    explanation: 'U-Bahn (Untergrundbahn) adalah kereta bawah tanah.',
    points: 2
  },
  {
    id: 'k5_vocab_10',
    category: 'Wortschatz',
    chapterId: 5,
    skill: 'Wortschatz',
    type: 'multipleChoice',
    correctionMode: 'template',
    question: 'Was sagt man am Ende eines Gesprächs, wenn man sich bedankt?',
    options: ['Vielen Dank für Ihre Hilfe.', 'Wie viel kostet das?', 'Ich möchte das bezahlen.', 'Wo ist die Toilette?'],
    correctAnswer: 'Vielen Dank für Ihre Hilfe.',
    explanation: 'Ungkapan sopan untuk berterima kasih: Terima kasih atas bantuan Anda.',
    points: 2
  },

  // Partizip II (Matching/FillBlank)
  {
    id: 'k5_partizip_1',
    category: 'Grammatik',
    chapterId: 5,
    skill: 'Grammatik',
    type: 'fillBlank',
    correctionMode: 'template',
    question: 'Schreibe das Partizip II von "erleben". (Hilfsverb + Partizip)',
    correctAnswer: 'hat erlebt',
    acceptableAnswers: ['hat erlebt', 'erlebt'],
    explanation: 'erleben -> hat erlebt. Ini kata kerja tidak dapat dipisah (untrennbar).',
    points: 2
  },
  {
    id: 'k5_partizip_2',
    category: 'Grammatik',
    chapterId: 5,
    skill: 'Grammatik',
    type: 'fillBlank',
    correctionMode: 'template',
    question: 'Schreibe das Partizip II von "umziehen". (Hilfsverb + Partizip)',
    correctAnswer: 'ist umgezogen',
    acceptableAnswers: ['ist umgezogen', 'umgezogen'],
    explanation: 'umziehen -> ist umgezogen. Menggunakan "sein" karena menunjukkan perpindahan.',
    points: 2
  },
  {
    id: 'k5_partizip_3',
    category: 'Grammatik',
    chapterId: 5,
    skill: 'Grammatik',
    type: 'fillBlank',
    correctionMode: 'template',
    question: 'Schreibe das Partizip II von "besichtigen". (Hilfsverb + Partizip)',
    correctAnswer: 'hat besichtigt',
    acceptableAnswers: ['hat besichtigt', 'besichtigt'],
    explanation: 'besichtigen -> hat besichtigt. Berakhiran -ieren/-igen tidak pakai ge-.',
    points: 2
  },

  // Grammatik - Präpositionen (FillBlank)
  {
    id: 'k5_prep_1',
    category: 'Grammatik',
    chapterId: 5,
    skill: 'Grammatik',
    type: 'fillBlank',
    correctionMode: 'template',
    question: 'Er trinkt seinen Kaffee ___ Zucker. (tanpa)',
    correctAnswer: 'ohne',
    explanation: '"ohne" (tanpa) selalu diikuti Akkusativ.',
    points: 2
  },
  {
    id: 'k5_prep_2',
    category: 'Grammatik',
    chapterId: 5,
    skill: 'Grammatik',
    type: 'fillBlank',
    correctionMode: 'template',
    question: 'Sie fährt ___ dem Fahrrad zur Arbeit. (dengan)',
    correctAnswer: 'mit',
    explanation: '"mit" (dengan alat transportasi) selalu diikuti Dativ. (mit dem Fahrrad)',
    points: 2
  },
  {
    id: 'k5_prep_3',
    category: 'Grammatik',
    chapterId: 5,
    skill: 'Grammatik',
    type: 'fillBlank',
    correctionMode: 'template',
    question: 'Wir gehen heute ___ unseren Hund im Park spazieren.',
    correctAnswer: 'mit',
    explanation: '"mit" + Dativ (unserem Hund).',
    points: 2
  },
  {
    id: 'k5_prep_4',
    category: 'Grammatik',
    chapterId: 5,
    skill: 'Grammatik',
    type: 'fillBlank',
    correctionMode: 'template',
    question: '___ Brille kann ich leider nichts sehen.',
    correctAnswer: 'ohne',
    acceptableAnswers: ['Ohne'],
    explanation: '"Ohne" (tanpa). Awal kalimat menggunakan huruf kapital.',
    points: 2
  },

  // Grammatik - Adjektivendung (Multiple Choice)
  {
    id: 'k5_adj_1',
    category: 'Grammatik',
    chapterId: 5,
    skill: 'Grammatik',
    type: 'multipleChoice',
    correctionMode: 'template',
    question: 'Welche Endung ist richtig? "Der neu___ Computer ist sehr teuer."',
    options: ['-e', '-en', '-er', '-es'],
    correctAnswer: '-e',
    explanation: 'Nominativ Maskulin nach bestimmtem Artikel: der neue Computer.',
    points: 2
  },
  {
    id: 'k5_adj_2',
    category: 'Grammatik',
    chapterId: 5,
    skill: 'Grammatik',
    type: 'multipleChoice',
    correctionMode: 'template',
    question: 'Welche Endung ist richtig? "Wir kaufen das groß___ Auto."',
    options: ['-e', '-en', '-er', '-es'],
    correctAnswer: '-e',
    explanation: 'Akkusativ Neutrum nach bestimmtem Artikel: das große Auto.',
    points: 2
  },
  {
    id: 'k5_adj_3',
    category: 'Grammatik',
    chapterId: 5,
    skill: 'Grammatik',
    type: 'multipleChoice',
    correctionMode: 'template',
    question: 'Welche Endung ist richtig? "Ich spreche mit dem alt___ Mann."',
    options: ['-e', '-en', '-er', '-em'],
    correctAnswer: '-en',
    explanation: 'Dativ Maskulin nach bestimmtem Artikel: mit dem alten Mann. (Immer -en im Dativ nach bestimmtem Artikel)',
    points: 2
  },

  // Grammatik - Konjunktiv II (Multiple Choice)
  {
    id: 'k5_konj_1',
    category: 'Grammatik',
    chapterId: 5,
    skill: 'Grammatik',
    type: 'multipleChoice',
    correctionMode: 'template',
    question: 'Welcher Satz ist höflicher?',
    options: ['Könnten Sie mir bitte helfen?', 'Können Sie mir helfen?', 'Helfen Sie mir!', 'Können Sie mir bitte helfen?'],
    correctAnswer: 'Könnten Sie mir bitte helfen?',
    explanation: 'Konjunktiv II ("Könnten") digunakan untuk permintaan yang sangat sopan.',
    points: 2
  },

  // ==========================================
  // J2. HYBRID MODE (Sentence Transformation)
  // ==========================================
  {
    id: 'k5_hybrid_1',
    category: 'Grammatik',
    chapterId: 5,
    skill: 'Grammatik',
    type: 'writing',
    correctionMode: 'hybrid',
    question: 'Formuliere höflich (Konjunktiv II): "Kannst du mir das Buch geben?"',
    correctAnswer: 'Könntest du mir das Buch geben?',
    explanation: 'Gunakan bentuk Konjunktiv II dari können (könntest) untuk subjek "du".',
    points: 4
  },
  {
    id: 'k5_hybrid_2',
    category: 'Grammatik',
    chapterId: 5,
    skill: 'Grammatik',
    type: 'writing',
    correctionMode: 'hybrid',
    question: 'Formuliere höflich (Konjunktiv II): "Machen Sie bitte das Fenster zu!"',
    correctAnswer: 'Könnten Sie bitte das Fenster zumachen?',
    acceptableAnswers: ['Könnten Sie bitte das Fenster zumachen?', 'Könnten Sie das Fenster bitte zumachen?', 'Würden Sie bitte das Fenster zumachen?'],
    explanation: 'Gunakan bentuk Konjunktiv II dari können (könnten) untuk subjek "Sie" (Anda).',
    points: 4
  },
  {
    id: 'k5_hybrid_3',
    category: 'Grammatik',
    chapterId: 5,
    skill: 'Grammatik',
    type: 'writing',
    correctionMode: 'hybrid',
    question: 'Formuliere den Satz im Perfekt: "Er bestellt eine Pizza." (hilfsverb + partizip)',
    correctAnswer: 'Er hat eine Pizza bestellt.',
    explanation: 'bestellen -> hat bestellt. (Kata kerja berakhiran -ieren atau berawalan be- tidak menggunakan ge-).',
    points: 4
  },
  {
    id: 'k5_hybrid_4',
    category: 'Grammatik',
    chapterId: 5,
    skill: 'Grammatik',
    type: 'writing',
    correctionMode: 'hybrid',
    question: 'Bilde einen Satz mit "mit" (Dativ): Ich fahre / der Bus / zur Arbeit.',
    correctAnswer: 'Ich fahre mit dem Bus zur Arbeit.',
    explanation: 'Der Bus menjadi dem Bus dalam Dativ setelah preposisi mit.',
    points: 4
  },

  // ==========================================
  // J3. AI MODE (Open Writing)
  // ==========================================
  {
    id: 'k5_ai_1',
    category: 'Schreiben',
    chapterId: 5,
    skill: 'Schreiben',
    type: 'writing',
    correctionMode: 'ai',
    question: 'Schreiben: Beschreibe deine Stadt. Schreibe 3-4 Sätze. (Wo liegt sie? Was gibt es dort? Wie findest du sie?)',
    correctAnswer: 'Individuelle Antwort.',
    explanation: 'AI akan menilai tata bahasa, penggunaan kosakata kota, dan struktur kalimatmu.',
    points: 10,
    aiPrompt: 'Evaluasi deskripsi kota pengguna (A2). Cek penggunaan kosakata tempat umum, letak geografis, dan opini.'
  },
  {
    id: 'k5_ai_2',
    category: 'Schreiben',
    chapterId: 5,
    skill: 'Schreiben',
    type: 'writing',
    correctionMode: 'ai',
    question: 'Schreiben: Du warst auf der Behörde. Schreibe eine kurze Nachricht an einen Freund. Was hast du dort gemacht? War es voll? (3 Sätze)',
    correctAnswer: 'Individuelle Antwort.',
    explanation: 'AI akan mengevaluasi penggunaan bentuk lampau (Perfekt) dan kosakata terkait instansi publik.',
    points: 10,
    aiPrompt: 'Evaluasi pesan teks singkat pengguna tentang kunjungan ke Behörde (A2). Cek penggunaan Perfekt yang benar dan kosakata seperti warten, anmelden, Ausweis.'
  },
  {
    id: 'k5_ai_3',
    category: 'Sprechen',
    chapterId: 5,
    skill: 'Sprechen',
    type: 'writing',
    correctionMode: 'ai',
    question: 'Rollenspiel Schreiben: Du bist in der Bank und möchtest ein Konto eröffnen. Was sagst du zum Bankangestellten? Formuliere 2 höfliche Sätze.',
    correctAnswer: 'Individuelle Antwort.',
    explanation: 'AI akan mengevaluasi kesopanan kalimatmu (penggunaan Konjunktiv II atau bitte) dan relevansi dengan konteks bank.',
    points: 10,
    aiPrompt: 'Evaluasi kalimat pembuka di bank (A2). Cek kesopanan (Könnten Sie, Ich möchte) dan kosakata terkait rekening (Konto eröffnen, Formular).'
  }
];
