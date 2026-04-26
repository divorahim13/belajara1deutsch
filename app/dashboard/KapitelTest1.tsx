'use client';

import FinalQuizTemplate from './components/quiz/FinalQuizTemplate';
import { getQuizData } from './data/quiz-data';

export default function KapitelTestEins() {
  const quizData = getQuizData(1);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto mb-8">
        <a href="/dashboard" className="inline-flex items-center text-slate-700 hover:text-indigo-600 font-bold transition-colors">
          <span className="mr-2">←</span> Zurück zum Dashboard
        </a>
      </div>
      <FinalQuizTemplate quizData={quizData} />
    </div>
  );
}
