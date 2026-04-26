import { kapitel5Questions } from './k5';
import { kapitel9Questions } from './k9';
import { kapitel10Questions } from './k10';
import { kapitel11Questions } from './k11';
import { kapitel12Questions } from './k12';

export type QuestionType = 
  | "multipleChoice"
  | "trueFalse"
  | "fillBlank"
  | "matching"
  | "reorder"
  | "writing"
  | "speakingPrompt"
  | "audioComprehension"
  | "sentenceTransformation"
  | "shortAnswer";

export type CorrectionMode = "template" | "hybrid" | "ai";

export type CategoryType = 
  | "Wortschatz" | "Artikel" | "Plural" | "Partizip II" 
  | "Grammatik" | "Redemittel" | "Lesen" | "Hören" 
  | "Schreiben" | "Sprechen" | "Aussprache" | "Kommunikation";

export interface Question {
  id: string;
  chapterId: number;
  moduleId?: string;
  partTitle?: string; // Optional grouping title (e.g. "Teil 1: Was passt nicht?")
  partInstruction?: string;
  type: QuestionType;
  correctionMode: CorrectionMode;
  category: CategoryType;
  skill: string;
  question: string;
  instruction?: string;
  options?: string[]; // for multipleChoice
  pairs?: Record<string, string>; // for matching
  items?: string[]; // for reorder
  correctAnswer?: string | string[] | Record<string, string>;
  acceptableAnswers?: string[];
  explanation?: string;
  rubric?: Record<string, number>;
  points: number;
  aiFallback?: boolean;
  aiPrompt?: string;
}

export interface Quiz {
  quizId: string;
  chapterId: number;
  title: string;
  description: string;
  passingScore: number;
  totalPoints: number;
  questions: Question[];
}

// Will be populated with data from Chapter 1 to 12
export const quizData: Record<number, Quiz> = {
  1: {
    quizId: "k1-final",
    chapterId: 1,
    title: "Test zu Kapitel 1",
    description: "Lengkapilah semua pertanyaan di bawah dan tekan 'Kumpulkan' di bagian terbawah.",
    passingScore: 60,
    totalPoints: 30,
    questions: [
      // TEIL 1
      { id: 't1_1', chapterId: 1, partTitle: 'Teil 1: Wortschatz', partInstruction: 'Welches Wort passt nicht in die Reihe?', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'mieten, das Stadtzentrum, renovieren, der Flohmarkt', options: ['mieten', 'das Stadtzentrum', 'renovieren', 'der Flohmarkt'], correctAnswer: 'der Flohmarkt' },
      { id: 't1_2', chapterId: 1, partTitle: 'Teil 1: Wortschatz', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'bitter, lecker, salzig, scharf', options: ['bitter', 'lecker', 'salzig', 'scharf'], correctAnswer: 'lecker' },
      { id: 't1_3', chapterId: 1, partTitle: 'Teil 1: Wortschatz', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'die Rechnung, bezahlen, bestellen, das Trinkgeld', options: ['die Rechnung', 'bezahlen', 'bestellen', 'das Trinkgeld'], correctAnswer: 'bestellen' },
      { id: 't1_4', chapterId: 1, partTitle: 'Teil 1: Wortschatz', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'gemeinsam, verheiratet, ledig, geschieden', options: ['gemeinsam', 'verheiratet', 'ledig', 'geschieden'], correctAnswer: 'gemeinsam' },
      { id: 't1_5', chapterId: 1, partTitle: 'Teil 1: Wortschatz', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'die Sprache, rufen, sprechen, fließend', options: ['die Sprache', 'rufen', 'sprechen', 'fließend'], correctAnswer: 'rufen' },
      { id: 't1_6', chapterId: 1, partTitle: 'Teil 1: Wortschatz', type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'joggen, lesen, reiten, Basketball spielen', options: ['joggen', 'lesen', 'reiten', 'Basketball spielen'], correctAnswer: 'lesen' },
      
      // TEIL 2
      { id: 't2_m', chapterId: 1, partTitle: 'Teil 2: Verben zuordnen', partInstruction: 'Ordnen Sie die Verben zu.', type: 'matching', correctionMode: 'template', category: 'Wortschatz', skill: 'Verben', points: 2, question: 'Verbinden Sie die passenden Nomen und Verben.', pairs: { 'eine Ausbildung': 'abschließen', 'auf dem Land': 'leben', 'Englisch und Deutsch': 'sprechen', 'einen Tisch': 'reservieren' }, correctAnswer: { 'eine Ausbildung': 'abschließen', 'auf dem Land': 'leben', 'Englisch und Deutsch': 'sprechen', 'einen Tisch': 'reservieren' } },
      
      // TEIL 3
      { id: 't3_1', chapterId: 1, partTitle: 'Teil 3: Genitiv', partInstruction: 'Ergänzen Sie die Antworten (Genitiv).', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Genitiv', points: 1, question: 'Ich unterrichte heute die Klasse von Frau Yannis? Wen?', correctAnswer: "Frau Yannis' Klasse", acceptableAnswers: ["Frau Yannis Klasse", "yannis' klasse", "yannis klasse"] },
      { id: 't3_2', chapterId: 1, partTitle: 'Teil 3: Genitiv', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Genitiv', points: 1, question: 'Kennst du den Chef von Frau Groß? Wen?', correctAnswer: "Frau Groß' Chef", acceptableAnswers: ["Frau Gross' Chef", "Frau Groß Chef", "gross' chef", "groß chef"] },
      { id: 't3_3', chapterId: 1, partTitle: 'Teil 3: Genitiv', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Genitiv', points: 1, question: 'Wie heißt der Kollege von Theo? Wer?', correctAnswer: "Theos Kollege", acceptableAnswers: ["theos kollege"] },
      { id: 't3_4', chapterId: 1, partTitle: 'Teil 3: Genitiv', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Genitiv', points: 1, question: 'Hast du mit dem Bruder von Franz gesprochen? Mit wem?', correctAnswer: "Franz' Bruder", acceptableAnswers: ["Franz Bruder", "franz' bruder", "franz bruder"] },
      { id: 't3_5', chapterId: 1, partTitle: 'Teil 3: Genitiv', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Genitiv', points: 1, question: 'Weißt du, wo das Buch von Max ist? Was?', correctAnswer: "Max' Buch", acceptableAnswers: ["Max Buch", "max' buch", "max buch"] },

      // TEIL 4
      { id: 't4_m', chapterId: 1, partTitle: 'Teil 4: Kommunikation', partInstruction: 'Eine Verabredung. Verbinden Sie.', type: 'matching', correctionMode: 'template', category: 'Kommunikation', skill: 'Redemittel', points: 6, question: 'Verbinden Sie die Sätze logisch.', pairs: { 'Das ist': 'eine gute Idee.', 'Hast du am': 'Freitag Zeit?', 'Schade, da kann': 'ich leider nicht.', 'Um wie viel Uhr': 'geht es los?', 'Ich möchte gern,': 'aber ich muss lernen.', 'Geht es auch': 'ein bisschen später?' }, correctAnswer: { 'Das ist': 'eine gute Idee.', 'Hast du am': 'Freitag Zeit?', 'Schade, da kann': 'ich leider nicht.', 'Um wie viel Uhr': 'geht es los?', 'Ich möchte gern,': 'aber ich muss lernen.', 'Geht es auch': 'ein bisschen später?' } },

      // TEIL 5
      { id: 't5_1', chapterId: 1, partTitle: 'Teil 5: Perfekt', partInstruction: 'Ergänzen Sie die Verben im Perfekt (habe/ist + Partizip II).', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Perfekt', points: 1, question: 'Danke, gut! Ich ________ gerade. Ich koche heute. (einkaufen)', correctAnswer: 'habe eingekauft', acceptableAnswers: ['habe eingekauft'] },
      { id: 't5_2', chapterId: 1, partTitle: 'Teil 5: Perfekt', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Perfekt', points: 1, question: 'Ja, ich ________ Saskia und Thomas. (einladen)', correctAnswer: 'habe eingeladen' },
      { id: 't5_3', chapterId: 1, partTitle: 'Teil 5: Perfekt', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Perfekt', points: 1, question: 'Die beiden ________ gestern aus Italien. (zurückkommen)', correctAnswer: 'sind zurückgekommen' },
      { id: 't5_4', chapterId: 1, partTitle: 'Teil 5: Perfekt', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Perfekt', points: 1, question: 'Toll! Ich ________ gestern mit Klara. (telefonieren)', correctAnswer: 'habe telefoniert' },
      { id: 't5_5', chapterId: 1, partTitle: 'Teil 5: Perfekt', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Perfekt', points: 1, question: 'Klar! Wir ________ doch zusammen Jura. (studieren)', correctAnswer: 'haben studiert' },
      { id: 't5_6', chapterId: 1, partTitle: 'Teil 5: Perfekt', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Perfekt', points: 1, question: 'Stimmt! Sie ________ ihr Studium. (beenden)', correctAnswer: 'hat beendet' },

      // TEIL 6
      { id: 't6_1', chapterId: 1, partTitle: 'Teil 6: Nebensätze mit weil', partInstruction: "Schreiben Sie Nebensätze mit 'weil'.", type: 'sentenceTransformation', correctionMode: 'hybrid', aiFallback: true, category: 'Grammatik', skill: 'Nebensätze', points: 2, question: 'Wir müssen uns beeilen, ... (die Gäste | kommen | bald)', acceptableAnswers: ['weil die gäste bald kommen', 'weil die gäste kommen'] },
      { id: 't6_2', chapterId: 1, partTitle: 'Teil 6: Nebensätze mit weil', type: 'sentenceTransformation', correctionMode: 'hybrid', aiFallback: true, category: 'Grammatik', skill: 'Nebensätze', points: 2, question: 'Lea bleibt heute zu Hause, ... (krank | ihr Vater | sein)', acceptableAnswers: ['weil ihr vater krank ist'] },
      { id: 't6_3', chapterId: 1, partTitle: 'Teil 6: Nebensätze mit weil', type: 'sentenceTransformation', correctionMode: 'hybrid', aiFallback: true, category: 'Grammatik', skill: 'Nebensätze', points: 2, question: 'Ben kann gut kochen, ... (er | das | gelernt | haben | von seiner Oma)', acceptableAnswers: ['weil er das von seiner oma gelernt hat', 'weil er das von seiner oma hat gelernt'] },
      { id: 't6_4', chapterId: 1, partTitle: 'Teil 6: Nebensätze mit weil', type: 'sentenceTransformation', correctionMode: 'hybrid', aiFallback: true, category: 'Grammatik', skill: 'Nebensätze', points: 2, question: 'Er freut sich, ... (seinen Hund | wollen | Marvin | mitbringen)', acceptableAnswers: ['weil marvin seinen hund mitbringen will'] },

      // TEIL 7
      { id: 't7_1', chapterId: 1, partTitle: 'Teil 7: Schreiben', partInstruction: 'Schreiben Sie eine E-Mail.', type: 'writing', correctionMode: 'ai', category: 'Schreiben', skill: 'Schreiben', points: 6, question: 'Sie haben am Wochenende eine Party gefeiert. Schreiben Sie eine E-Mail an Ihre Freundin Maria und erzählen Sie von der Party. (Wo, Wann, Wer war da?)', rubric: { taskCompletion: 25, grammar: 25, vocabulary: 20, coherence: 20, a2Level: 10 } }
    ]
  },
  2: {
    quizId: "k2-final",
    chapterId: 2,
    title: "Kapiteltest 2: Nach der Schulzeit",
    description: "Lengkapilah semua pertanyaan berdasarkan materi yang telah dipelajari.",
    passingScore: 60,
    totalPoints: 40,
    questions: [
      // TEIL 1
      { id: 't1_1', chapterId: 2, partTitle: 'Teil 1: Gespräch ergänzen', partInstruction: 'Pilihan: Gymnasium, Abschluss, Abitur, Hausaufgaben, Sommerferien, Biologie, Klasse, Zeugnis, Stundenplan, Lieblingsfach', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'Unser (1) ________ ist ganz schön voll.', correctAnswer: 'Stundenplan' },
      { id: 't1_2', chapterId: 2, partTitle: 'Teil 1: Gespräch ergänzen', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'Was ist denn dein (2) ________?', correctAnswer: 'Lieblingsfach' },
      { id: 't1_3', chapterId: 2, partTitle: 'Teil 1: Gespräch ergänzen', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'Ähm, (3) ________. Das kann ich gut.', correctAnswer: 'Biologie' },
      { id: 't1_4', chapterId: 2, partTitle: 'Teil 1: Gespräch ergänzen', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'Wann bekommst du wieder ein (4) ________?', correctAnswer: 'Zeugnis' },
      { id: 't1_5', chapterId: 2, partTitle: 'Teil 1: Gespräch ergänzen', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'Dann haben wir endlich (5) ________.', correctAnswer: 'Sommerferien' },
      { id: 't1_6', chapterId: 2, partTitle: 'Teil 1: Gespräch ergänzen', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'In welche (6) ________ kommst du?', correctAnswer: 'Klasse' },
      { id: 't1_7', chapterId: 2, partTitle: 'Teil 1: Gespräch ergänzen', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'Machst du bald deinen (7) ________?', correctAnswer: 'Abschluss' },
      { id: 't1_8', chapterId: 2, partTitle: 'Teil 1: Gespräch ergänzen', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'Ich gehe doch ins (8) ________.', correctAnswer: 'Gymnasium' },
      { id: 't1_9', chapterId: 2, partTitle: 'Teil 1: Gespräch ergänzen', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'Mache mein (9) ________ erst in 3 Jahren.', correctAnswer: 'Abitur' },
      { id: 't1_10', chapterId: 2, partTitle: 'Teil 1: Gespräch ergänzen', type: 'fillBlank', correctionMode: 'template', category: 'Wortschatz', skill: 'Vokabeln', points: 0.5, question: 'Jetzt muss ich (10) ________ machen.', correctAnswer: 'Hausaufgaben' },

      // TEIL 2
      { id: 't2_m', chapterId: 2, partTitle: 'Teil 2: Ordnen Sie die Antworten zu', partInstruction: 'Was passt zusammen?', type: 'matching', correctionMode: 'template', category: 'Kommunikation', skill: 'Redemittel', points: 4, question: 'Verbinden Sie.', pairs: { '1. Was hast du danach gemacht?': 'D. Ich bin weiter nach Südamerika gereist.', '2. Und was machst du jetzt?': 'A. Ich jobbe in einem Café.', '3. Macht dir die Arbeit keinen Spaß?': 'C. Es geht. Manchmal ist sie langweilig.', '4. Was sind deine Pläne für die Zukunft?': 'E. Ich fange Ausbildung Hotelkaufmann an.' }, correctAnswer: { '1. Was hast du danach gemacht?': 'D. Ich bin weiter nach Südamerika gereist.', '2. Und was machst du jetzt?': 'A. Ich jobbe in einem Café.', '3. Macht dir die Arbeit keinen Spaß?': 'C. Es geht. Manchmal ist sie langweilig.', '4. Was sind deine Pläne für die Zukunft?': 'E. Ich fange Ausbildung Hotelkaufmann an.' } },

      // TEIL 3
      { id: 't3_1', chapterId: 2, partTitle: 'Teil 3: Modalverben im Präteritum', partInstruction: 'Pilihan: wollen (3x), sollen, müssen, können, dürfen', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Modalverben', points: 1, question: 'Nach der Schule wollte ich Medizin studieren, aber das (1) ________ ich nicht, weil meine Noten nicht gut waren.', correctAnswer: 'konnte' },
      { id: 't3_2', chapterId: 2, partTitle: 'Teil 3: Modalverben im Präteritum', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Modalverben', points: 1, question: 'Also (2) ________ ich eine Ausbildung machen.', correctAnswer: 'musste' },
      { id: 't3_3', chapterId: 2, partTitle: 'Teil 3: Modalverben im Präteritum', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Modalverben', points: 1, question: 'Und was (3) ________ ihr nach der Schule machen?', correctAnswer: 'wolltet' },
      { id: 't3_4', chapterId: 2, partTitle: 'Teil 3: Modalverben im Präteritum', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Modalverben', points: 1, question: 'Wir (4) ________ auf die Universität gehen.', correctAnswer: 'wollten' },
      { id: 't3_5', chapterId: 2, partTitle: 'Teil 3: Modalverben im Präteritum', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Modalverben', points: 1, question: 'aber wir (5) ________ zuerst eine Ausbildung machen. Unsere Eltern haben das gesagt.', correctAnswer: 'sollten' },
      { id: 't3_6', chapterId: 2, partTitle: 'Teil 3: Modalverben im Präteritum', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Modalverben', points: 1, question: 'Wir (6) ________ nicht das machen, was wir wollten.', correctAnswer: 'durften' },

      // TEIL 4
      { id: 't4_1', chapterId: 2, partTitle: 'Teil 4: Welcher Artikel passt?', type: 'multipleChoice', correctionMode: 'template', category: 'Grammatik', skill: 'Artikel', points: 1, question: '1. Ich fange im Herbst mit ... Studium an.', options: ['seinem', 'dem'], correctAnswer: 'dem' },
      { id: 't4_2', chapterId: 2, partTitle: 'Teil 4: Welcher Artikel passt?', type: 'multipleChoice', correctionMode: 'template', category: 'Grammatik', skill: 'Artikel', points: 1, question: '2. Er denkt nicht gern an ... Schule zurück.', options: ['die', 'eine'], correctAnswer: 'eine' },
      { id: 't4_3', chapterId: 2, partTitle: 'Teil 4: Welcher Artikel passt?', type: 'multipleChoice', correctionMode: 'template', category: 'Grammatik', skill: 'Artikel', points: 1, question: '3. Was machst du nach ... Schulabschluss?', options: ['keinem', 'deinem'], correctAnswer: 'deinem' },
      { id: 't4_4', chapterId: 2, partTitle: 'Teil 4: Welcher Artikel passt?', type: 'multipleChoice', correctionMode: 'template', category: 'Grammatik', skill: 'Artikel', points: 1, question: '4. Sprachen sind nützlich für ... Beruf.', options: ['keinen', 'den'], correctAnswer: 'den' },
      { id: 't4_5', chapterId: 2, partTitle: 'Teil 4: Welcher Artikel passt?', type: 'multipleChoice', correctionMode: 'template', category: 'Grammatik', skill: 'Artikel', points: 1, question: '5. Ich möchte von ... Eltern unabhängig sein.', options: ['meinen', 'einen'], correctAnswer: 'meinen' },

      // TEIL 5
      { id: 't5_1', chapterId: 2, partTitle: 'Teil 5: Possessivartikel im Dativ', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Possessivartikel', points: 1, question: '1. Sabrina hat nach ... Studium eine Reise gemacht. (ihr)', correctAnswer: 'ihrem' },
      { id: 't5_2', chapterId: 2, partTitle: 'Teil 5: Possessivartikel im Dativ', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Possessivartikel', points: 1, question: '2. Hast du ... Großeltern eine Postkarte geschrieben? (dein)', correctAnswer: 'deinen' },
      { id: 't5_3', chapterId: 2, partTitle: 'Teil 5: Possessivartikel im Dativ', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Possessivartikel', points: 1, question: '3. Sie lernen an ... Schreibtisch. (ihr Plural)', correctAnswer: 'ihrem' },
      { id: 't5_4', chapterId: 2, partTitle: 'Teil 5: Possessivartikel im Dativ', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Possessivartikel', points: 1, question: '4. Was macht ihr gern in ... Freizeit? (euer)', correctAnswer: 'eurer' },
      { id: 't5_5', chapterId: 2, partTitle: 'Teil 5: Possessivartikel im Dativ', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Possessivartikel', points: 1, question: '5. Wir gehen heute mit ... Freund Olli ins Kino. (unser)', correctAnswer: 'unserem' },
      { id: 't5_6', chapterId: 2, partTitle: 'Teil 5: Possessivartikel im Dativ', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Possessivartikel', points: 1, question: '6. Ich verstehe mich super mit ... Kollegen. (mein Plural)', correctAnswer: 'meinen' },

      // TEIL 6
      { id: 't6_1', chapterId: 2, partTitle: 'Teil 6: Welche Antwort passt?', type: 'multipleChoice', correctionMode: 'template', category: 'Kommunikation', skill: 'Redemittel', points: 1, question: '1. Vielleicht mache ich später noch das Abitur.', options: ['Das ist eine super Idee!', 'Die Schule ist schwer, finde ich.'], correctAnswer: 'Das ist eine super Idee!' },
      { id: 't6_2', chapterId: 2, partTitle: 'Teil 6: Welche Antwort passt?', type: 'multipleChoice', correctionMode: 'template', category: 'Kommunikation', skill: 'Redemittel', points: 1, question: '2. Eine Ausbildung zur Erzieherin dauert drei Jahre.', options: ['Das ist richtig.', 'Ich denke, das geht nicht.'], correctAnswer: 'Das ist richtig.' },
      { id: 't6_3', chapterId: 2, partTitle: 'Teil 6: Welche Antwort passt?', type: 'multipleChoice', correctionMode: 'template', category: 'Kommunikation', skill: 'Redemittel', points: 1, question: '3. Ich lerne in drei Wochen Deutsch.', options: ['Genau.', 'So einfach ist das nicht.'], correctAnswer: 'So einfach ist das nicht.' },
      { id: 't6_4', chapterId: 2, partTitle: 'Teil 6: Welche Antwort passt?', type: 'multipleChoice', correctionMode: 'template', category: 'Kommunikation', skill: 'Redemittel', points: 1, question: '4. Nach der Schule jobbe ich erst mal.', options: ['Ich finde eine Pause gut.', 'Das stimmt nicht.'], correctAnswer: 'Ich finde eine Pause gut.' },

      // TEIL 7
      { id: 't7_1', chapterId: 2, partTitle: 'Teil 7: Schreiben', partInstruction: 'Schulzeit & Pläne (30-50 Wörter)', type: 'writing', correctionMode: 'ai', category: 'Schreiben', skill: 'Schreiben', points: 10, question: 'Tulis cerita singkat tentang masa sekolah dan rencana Anda (Di mana Anda sekolah, apa yang harus/boleh dilakukan menggunakan musste/durfte, dan rencana setelah sekolah).', rubric: { taskCompletion: 25, grammar: 25, vocabulary: 20, coherence: 20, a2Level: 10 } }
    ]
  },

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
      { id: 'ex5_w', chapterId: 4, partTitle: 'Teil 5: Schreiben', partInstruction: 'Schreiben Sie die wenn-Sätze zu Ende.', type: 'writing', correctionMode: 'ai', category: 'Grammatik', skill: 'Schreiben', points: 8, question: 'Beenden Sie die Sätze:\n1. Ich bin nervös, wenn...\n2. Ich finde es wunderbar, wenn...\n3. Wenn..., bin ich traurig.\n4. Wenn..., freue ich mich.', rubric: { grammar: 50, taskCompletion: 50 } },

      // TEIL 6
      { id: 'ex6_1', chapterId: 4, partTitle: 'Teil 6: Reflexivpronomen', partInstruction: 'Ergänzen Sie die Reflexivpronomen.', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Reflexivpronomen', points: 1, question: 'Ich habe (1) _______ sehr gefreut.', correctAnswer: 'mich' },
      { id: 'ex6_2', chapterId: 4, partTitle: 'Teil 6: Reflexivpronomen', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Reflexivpronomen', points: 1, question: 'Übrigens, ich treffe (2) _______ gleich mit Elena.', correctAnswer: 'mich' },
      { id: 'ex6_3', chapterId: 4, partTitle: 'Teil 6: Reflexivpronomen', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Reflexivpronomen', points: 1, question: 'Nach drei Jahren hat sie (3) _______ an mich erinnert.', correctAnswer: 'sich' },
      { id: 'ex6_4', chapterId: 4, partTitle: 'Teil 6: Reflexivpronomen', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Reflexivpronomen', points: 1, question: 'Wir haben (4) _______ noch nicht für einen Treffpunkt entschieden.', correctAnswer: 'uns' },
      { id: 'ex6_5', chapterId: 4, partTitle: 'Teil 6: Reflexivpronomen', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Reflexivpronomen', points: 1, question: 'Du und Karin, ihr langweilt (5) _______ in Indien sicher auch nicht, was?', correctAnswer: 'euch' },
      { id: 'ex6_6', chapterId: 4, partTitle: 'Teil 6: Reflexivpronomen', type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Reflexivpronomen', points: 1, question: 'Ich hoffe, dass ihr (6) _______ auch manchmal ausruht.', correctAnswer: 'euch' }
    ]
  },
  5: {
    quizId: "kapitel-5-final-quiz",
    chapterId: 5,
    title: "Kapitel 5 Test — Leben in der Stadt",
    description: "Uji penguasaan Wortschatz, Partizip II, Adjektivendungen, mit/ohne, höfliche Bitten, Behörden/Bank/Polizei, dan Stadtbeschreibung.",
    passingScore: 75,
    totalPoints: 88,
    questions: kapitel5Questions
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
      { id: 'k6_12', chapterId: 6, type: 'matching', correctionMode: 'template', category: 'Redemittel', skill: 'Situationen', points: 5, question: 'Ordnen Sie zu.', pairs: { 'Wann fährt der nächste Zug?': 'Fahrkartenschalter', 'Kann ich bitte mit Frau Weber sprechen?': 'Telefonieren', 'Ich möchte einen Platz reservieren.': 'Fahrkartenschalter', 'Möchten Sie eine Nachricht hinterlassen?': 'Telefonieren' } },
      { id: 'k6_13', chapterId: 6, type: 'sentenceTransformation', correctionMode: 'hybrid', category: 'Redemittel', skill: 'Telefonieren', points: 5, question: 'Formulieren Sie eine höfliche Frage am Telefon: "Ich will mit Frau Müller sprechen."', acceptableAnswers: ['Kann ich bitte mit Frau Müller sprechen?', 'Könnte ich bitte mit Frau Müller sprechen?', 'Können Sie mich bitte mit Frau Müller verbinden?'], aiFallback: true },
      { id: 'k6_14', chapterId: 6, type: 'multipleChoice', correctionMode: 'template', category: 'Aussprache', skill: 'Konsonanten', points: 5, question: 'Bei welchem Wort hört man am Wortende "n"?', options: ['Mann', 'Raum', 'Abend', 'Auftrag'], correctAnswer: 'Mann' },
      { id: 'k6_15', chapterId: 6, type: 'fillBlank', correctionMode: 'template', category: 'Partizip II', skill: 'Partizip II', points: 5, question: 'Partizip II von "abschließen"?', correctAnswer: 'abgeschlossen', acceptableAnswers: ['abgeschlossen'] },
      { id: 'k6_16', chapterId: 6, type: 'writing', correctionMode: 'ai', category: 'Schreiben', skill: 'Traumberuf', points: 25, question: 'Schreiben Sie 5–6 Sätze über Ihren Traumberuf. Benutzen Sie mindestens einmal "werden" und einmal "weil".', rubric: { taskCompletion: 25, grammar: 25, vocabulary: 20, coherence: 20, a2Level: 10 } }
    ]
  },
  7: {
    quizId: "kapitel-7-final-quiz",
    chapterId: 7,
    title: "Kapitel 7 Test — Ganz schön mobil",
    description: "Uji penguasaan Mobilität, Verkehrsmittel, indirekte Fragen, ob-Fragen, Wegbeschreibung, Präpositionen, Meinung, Grafikbeschreibung, dan Partizip II.",
    passingScore: 85,
    totalPoints: 100,
    questions: [
      { id: 'k7_1', chapterId: 7, type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Wortschatz', points: 5, question: 'Was bedeutet "das Verkehrsmittel"?', options: ['alat transportasi', 'tempat parkir', 'lampu lalu lintas', 'rute hiking'], correctAnswer: 'alat transportasi' },
      { id: 'k7_2', chapterId: 7, type: 'fillBlank', correctionMode: 'template', category: 'Artikel', skill: 'Artikel', points: 5, question: 'Artikel von "Verspätung"?', correctAnswer: 'die', acceptableAnswers: ['die'] },
      { id: 'k7_3', chapterId: 7, type: 'fillBlank', correctionMode: 'template', category: 'Plural', skill: 'Plural', points: 5, question: 'Plural von "der Stau"?', correctAnswer: 'die Staus', acceptableAnswers: ['die Staus', 'Staus'] },
      { id: 'k7_4', chapterId: 7, type: 'fillBlank', correctionMode: 'template', category: 'Partizip II', skill: 'Partizip II', points: 5, question: 'Partizip II von "herunterladen"?', correctAnswer: 'heruntergeladen', acceptableAnswers: ['heruntergeladen'] },
      { id: 'k7_5', chapterId: 7, type: 'multipleChoice', correctionMode: 'template', category: 'Partizip II', skill: 'Hilfsverb', points: 5, question: 'Welches Hilfsverb benutzt man im Perfekt mit "losfahren"?', options: ['haben', 'sein'], correctAnswer: 'sein' },
      { id: 'k7_6', chapterId: 7, type: 'fillBlank', correctionMode: 'template', category: 'Partizip II', skill: 'Partizip II', points: 5, question: 'Ergänzen Sie: Der Zug ist nicht ___.', correctAnswer: 'weitergefahren', acceptableAnswers: ['weitergefahren'] },
      { id: 'k7_7', chapterId: 7, type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Indirekte Fragen', points: 5, question: 'Ergänzen Sie: Der Mann fragt, warum der Zug nicht ___.', correctAnswer: 'weiterfährt', acceptableAnswers: ['weiterfährt', 'weiterfaehrt'] },
      { id: 'k7_8', chapterId: 7, type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Indirekte Fragen', points: 5, question: 'Ergänzen Sie: Simon fragt, ob man einen Führerschein ___.', correctAnswer: 'braucht', acceptableAnswers: ['braucht'] },
      { id: 'k7_9', chapterId: 7, type: 'multipleChoice', correctionMode: 'template', category: 'Grammatik', skill: 'Indirekte Fragen', points: 5, question: 'Welche indirekte Frage ist richtig?', options: ['Können Sie mir sagen, wo ist der Bahnhof?', 'Können Sie mir sagen, wo der Bahnhof ist?', 'Können Sie mir sagen, wo der Bahnhof?', 'Können Sie mir sagen, der Bahnhof wo ist?'], correctAnswer: 'Können Sie mir sagen, wo der Bahnhof ist?' },
      { id: 'k7_10', chapterId: 7, type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Präpositionen', points: 5, question: 'Ergänzen Sie: Sie geht ___ Kaufhaus vorbei.', correctAnswer: 'am', acceptableAnswers: ['am', 'an dem'] },
      { id: 'k7_11', chapterId: 7, type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Präpositionen', points: 5, question: 'Ergänzen Sie: Sie geht ___ den Park.', correctAnswer: 'durch', acceptableAnswers: ['durch'] },
      { id: 'k7_12', chapterId: 7, type: 'multipleChoice', correctionMode: 'template', category: 'Redemittel', skill: 'Meinung', points: 5, question: 'Welche Aussage ist eine Meinung?', options: ['Die U-Bahn fährt um 8 Uhr.', 'Ich finde E-Bikes praktisch.', 'Der Bus hat 30 Sitzplätze.', 'Die App kostet 5 Euro.'], correctAnswer: 'Ich finde E-Bikes praktisch.' },
      { id: 'k7_13', chapterId: 7, type: 'sentenceTransformation', correctionMode: 'hybrid', category: 'Grammatik', skill: 'Indirekte Fragen', points: 5, question: 'Formulieren Sie höflich: "Wo ist der Bahnhof?"', acceptableAnswers: ['Können Sie mir sagen, wo der Bahnhof ist?', 'Könnten Sie mir sagen, wo der Bahnhof ist?', 'Wissen Sie, wo der Bahnhof ist?', 'Entschuldigung, wissen Sie, wo der Bahnhof ist?'], aiFallback: true },
      { id: 'k7_14', chapterId: 7, type: 'sentenceTransformation', correctionMode: 'hybrid', category: 'Grammatik', skill: 'ob-Fragen', points: 5, question: 'Formulieren Sie eine ob-Frage: "Braucht man für den E-Scooter einen Führerschein?"', acceptableAnswers: ['Ich möchte wissen, ob man für den E-Scooter einen Führerschein braucht.', 'Simon fragt, ob man für den E-Scooter einen Führerschein braucht.', 'Können Sie mir sagen, ob man für den E-Scooter einen Führerschein braucht?', 'Wissen Sie, ob man für den E-Scooter einen Führerschein braucht?'], aiFallback: true },
      { id: 'k7_15', chapterId: 7, type: 'writing', correctionMode: 'ai', category: 'Schreiben', skill: 'Wegbeschreibung', points: 15, question: 'Schreiben Sie eine kurze Wegbeschreibung mit mindestens 4 Sätzen. Benutzen Sie mindestens zwei Ausdrücke: geradeaus, links, rechts, durch den Park, am Kaufhaus vorbei, bis zur Kirche.', rubric: { taskCompletion: 25, grammar: 25, vocabulary: 20, coherence: 20, a2Level: 10 } },
      { id: 'k7_16', chapterId: 7, type: 'writing', correctionMode: 'ai', category: 'Schreiben', skill: 'Grafikbeschreibung', points: 15, question: 'Beschreiben Sie kurz eine Grafik über den Weg zur Arbeit. Schreiben Sie 5 Sätze mit mindestens zwei Redemitteln: "Die meisten ...", "... Prozent ...", "Nur wenige ...", "Mehr als ...".', rubric: { taskCompletion: 25, grammar: 25, vocabulary: 20, coherence: 20, a2Level: 10 } }
    ]
  },
  8: {
    quizId: "kapitel-8-final-quiz",
    chapterId: 8,
    title: "Kapitel 8 Test — Gelernt ist gelernt!",
    description: "Uji penguasaan Lernprobleme, Ratschläge, Konjunktiv II sollte, Was für ein/e, Beruf Sprache, Aussprache b/d/g, Präsentation, dan Partizip II.",
    passingScore: 85,
    totalPoints: 100,
    questions: [
      { id: 'k8_1', chapterId: 8, type: 'multipleChoice', correctionMode: 'template', category: 'Wortschatz', skill: 'Wortschatz', points: 5, question: 'Was bedeutet "das Lernproblem"?', options: ['masalah belajar', 'alat musik', 'rute kereta', 'kucing kecil'], correctAnswer: 'masalah belajar' },
      { id: 'k8_2', chapterId: 8, type: 'fillBlank', correctionMode: 'template', category: 'Artikel', skill: 'Artikel', points: 5, question: 'Artikel von "Prüfung"?', correctAnswer: 'die', acceptableAnswers: ['die'] },
      { id: 'k8_3', chapterId: 8, type: 'fillBlank', correctionMode: 'template', category: 'Plural', skill: 'Plural', points: 5, question: 'Plural von "der Auftrag"?', correctAnswer: 'die Aufträge', acceptableAnswers: ['die Aufträge', 'Aufträge', 'Auftraege', 'die Auftraege'] },
      { id: 'k8_4', chapterId: 8, type: 'fillBlank', correctionMode: 'template', category: 'Partizip II', skill: 'Partizip II', points: 5, question: 'Partizip II von "abschließen"?', correctAnswer: 'abgeschlossen', acceptableAnswers: ['abgeschlossen'] },
      { id: 'k8_5', chapterId: 8, type: 'multipleChoice', correctionMode: 'template', category: 'Partizip II', skill: 'Hilfsverb', points: 5, question: 'Welches Hilfsverb benutzt man im Perfekt mit "schwimmen"?', options: ['haben', 'sein'], correctAnswer: 'sein' },
      { id: 'k8_6', chapterId: 8, type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Konjunktiv II', points: 5, question: 'Ergänzen Sie: Du ___ einen Zeitplan machen.', correctAnswer: 'solltest', acceptableAnswers: ['solltest'] },
      { id: 'k8_7', chapterId: 8, type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Konjunktiv II', points: 5, question: 'Ergänzen Sie: Man ___ Freizeit einplanen.', correctAnswer: 'sollte', acceptableAnswers: ['sollte'] },
      { id: 'k8_8', chapterId: 8, type: 'multipleChoice', correctionMode: 'template', category: 'Redemittel', skill: 'Ratschläge', points: 5, question: 'Welche Aussage ist ein Ratschlag?', options: ['Ich war gestern müde.', 'Du solltest mehr Pausen machen.', 'Das Buch liegt auf dem Tisch.', 'Wir haben morgen frei.'], correctAnswer: 'Du solltest mehr Pausen machen.' },
      { id: 'k8_9', chapterId: 8, type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Was für ein', points: 5, question: 'Ergänzen Sie: Was für ___ Kurs möchtest du besuchen?', correctAnswer: 'einen', acceptableAnswers: ['einen'] },
      { id: 'k8_10', chapterId: 8, type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Was für ein', points: 5, question: 'Ergänzen Sie: Mit was für ___ App hast du gelernt?', correctAnswer: 'einer', acceptableAnswers: ['einer'] },
      { id: 'k8_11', chapterId: 8, type: 'multipleChoice', correctionMode: 'template', category: 'Aussprache', skill: 'Konsonanten', points: 5, question: 'Wie spricht man "der Tag" am Wortende?', options: ['g wie g', 'g wie k', 'g wie sch', 'g wird nicht gesprochen'], correctAnswer: 'g wie k' },
      { id: 'k8_12', chapterId: 8, type: 'matching', correctionMode: 'template', category: 'Redemittel', skill: 'Präsentation', points: 5, question: 'Ordnen Sie die Präsentationsphasen zu.', pairs: { 'Mein Thema ist ...': 'Einleitung', 'Zum ersten Punkt: ...': 'Hauptteil', 'Kurz gesagt: ...': 'Schluss', 'Haben Sie Fragen?': 'Schluss' } },
      { id: 'k8_13', chapterId: 8, type: 'sentenceTransformation', correctionMode: 'hybrid', category: 'Redemittel', skill: 'Ratschläge', points: 5, question: 'Formulieren Sie einen Ratschlag für dieses Problem: "Ich kann mich nicht konzentrieren."', acceptableAnswers: ['Du solltest dein Handy ausschalten.', 'Du solltest kurze Pausen machen.', 'Du solltest an einem ruhigen Ort lernen.', 'Man sollte an einem ruhigen Ort lernen.'], aiFallback: true },
      { id: 'k8_14', chapterId: 8, type: 'fillBlank', correctionMode: 'template', category: 'Grammatik', skill: 'Was für ein', points: 5, question: 'Ergänzen Sie: Was für ___ Film hast du gesehen?', correctAnswer: 'einen', acceptableAnswers: ['einen'] },
      { id: 'k8_15', chapterId: 8, type: 'writing', correctionMode: 'ai', category: 'Schreiben', skill: 'Ratschlag', points: 15, question: 'Schreiben Sie einen Ratschlag für eine Person mit Lernproblemen. Schreiben Sie mindestens 5 Sätze und benutzen Sie mindestens zweimal "sollte/solltest".', rubric: { taskCompletion: 25, grammar: 25, vocabulary: 20, coherence: 20, a2Level: 10 } },
      { id: 'k8_16', chapterId: 8, type: 'writing', correctionMode: 'ai', category: 'Schreiben', skill: 'Präsentation', points: 15, question: 'Schreiben Sie eine kurze Präsentation über ein Hobby, einen Beruf oder eine Stadt. Verwenden Sie Einleitung, Hauptteil und Schluss.', rubric: { taskCompletion: 25, grammar: 25, vocabulary: 20, coherence: 20, a2Level: 10 } }
    ]
  },
  9: {
    quizId: 'kapitel-9-final-quiz',
    chapterId: 9,
    title: 'Kapitel 9: Unterwegs',
    description: 'Final Quiz für Kapitel 9',
    passingScore: 60,
    totalPoints: 30,
    questions: kapitel9Questions
  },
  10: {
    quizId: 'kapitel-10-final-quiz',
    chapterId: 10,
    title: 'Kapitel 10: Wohnen',
    description: 'Final Quiz für Kapitel 10',
    passingScore: 60,
    totalPoints: 30,
    questions: kapitel10Questions
  },
  11: {
    quizId: 'kapitel-11-final-quiz',
    chapterId: 11,
    title: 'Kapitel 11 Test — Wie die Zeit vergeht!',
    description: 'Uji penguasaan Lebensphasen, Zeitprobleme, Wünsche äußern, Konjunktiv II, Ratschläge, gemeinsam planen, Verben mit Präposition, W-Fragen mit Präposition, Sprichwörter, dan Partizip II.',
    passingScore: 85,
    totalPoints: 63,
    questions: kapitel11Questions
  },
  12: {
    quizId: 'kapitel-12-final-quiz',
    chapterId: 12,
    title: 'Kapitel 12 Test — Gute Unterhaltung!',
    description: 'Uji penguasaan Unterhaltung, Festival, Musik, Indefinitpronomen, Rückfragen, Relativsätze, Zeitungsmeldungen, Malerei, Bildbeschreibung, dan Partizip II.',
    passingScore: 85,
    totalPoints: 78,
    questions: kapitel12Questions
  }
};

export function getQuizData(chapterId: number): Quiz | undefined {
  return quizData[chapterId];
}
