import { Question, CorrectionMode } from '../../data/quiz-data';

export interface CorrectionResult {
  isCorrect: boolean;
  score: number;
  mode: CorrectionMode;
  feedback: string;
  correctAnswer?: string;
  explanation?: string;
  needsAiCheck?: boolean;
}

export class CorrectionEngine {
  
  static checkAnswer(question: Question, userAnswer: any): CorrectionResult {
    if (question.correctionMode === 'template') {
      return this.checkTemplate(question, userAnswer);
    }
    
    if (question.correctionMode === 'hybrid') {
      const templateResult = this.checkTemplate(question, userAnswer);
      if (templateResult.isCorrect) {
        return { ...templateResult, mode: 'hybrid' };
      }
      return {
        isCorrect: false,
        score: 0,
        mode: 'hybrid',
        feedback: "Jawaban belum cocok dengan template baku. Anda bisa memeriksa variasi kalimat ini menggunakan AI.",
        needsAiCheck: true
      };
    }

    if (question.correctionMode === 'ai') {
      return {
        isCorrect: false,
        score: 0,
        mode: 'ai',
        feedback: "Jawaban ini membutuhkan penilaian AI karena bersifat terbuka.",
        needsAiCheck: true
      };
    }

    return { isCorrect: false, score: 0, mode: 'template', feedback: "Unknown correction mode." };
  }

  private static checkTemplate(question: Question, userAnswer: any): CorrectionResult {
    let isCorrect = false;
    let score = 0;

    if (!userAnswer) {
      return { isCorrect: false, score: 0, mode: 'template', feedback: "Jawaban kosong." };
    }

    const normalize = (str: string) => str.toString().trim().toLowerCase().replace(/\.$/, '');

    switch (question.type) {
      case 'multipleChoice':
      case 'trueFalse':
      case 'fillBlank':
      case 'shortAnswer':
      case 'sentenceTransformation':
        const ansStr = normalize(userAnswer as string);
        const expectedAnswers: string[] = [];
        
        if (typeof question.correctAnswer === 'string') {
          expectedAnswers.push(normalize(question.correctAnswer));
        } else if (Array.isArray(question.correctAnswer)) {
          expectedAnswers.push(...question.correctAnswer.map(normalize));
        }

        if (question.acceptableAnswers) {
          expectedAnswers.push(...question.acceptableAnswers.map(normalize));
        }

        if (expectedAnswers.includes(ansStr)) {
          isCorrect = true;
          score = question.points;
        }
        break;

      case 'matching':
        if (typeof userAnswer === 'object' && question.correctAnswer && typeof question.correctAnswer === 'object') {
          let correctCount = 0;
          const totalPairs = Object.keys(question.correctAnswer).length;
          const userObj = userAnswer as Record<string, string>;
          const correctObj = question.correctAnswer as Record<string, string>;
          
          for (const key of Object.keys(correctObj)) {
            if (userObj[key] === correctObj[key]) {
              correctCount++;
            }
          }
          score = (correctCount / totalPairs) * question.points;
          isCorrect = correctCount === totalPairs;
        }
        break;

      case 'reorder':
        if (Array.isArray(userAnswer) && Array.isArray(question.correctAnswer)) {
          const userArr = userAnswer as string[];
          const correctArr = question.correctAnswer as string[];
          if (userArr.length === correctArr.length && userArr.every((val, index) => val === correctArr[index])) {
            isCorrect = true;
            score = question.points;
          }
        }
        break;

      default:
        break;
    }

    return {
      isCorrect,
      score,
      mode: 'template',
      feedback: isCorrect ? "Benar!" : "Jawaban kurang tepat.",
      correctAnswer: typeof question.correctAnswer === 'string' ? question.correctAnswer : JSON.stringify(question.correctAnswer),
      explanation: question.explanation
    };
  }
}
