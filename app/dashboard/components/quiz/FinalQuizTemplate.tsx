'use client';

import React, { useState } from 'react';
import { Quiz, Question } from '../../data/quiz-data';
import { CorrectionEngine, CorrectionResult } from './CorrectionEngine';
import QuestionRenderer from './QuestionRenderer';

interface FinalQuizTemplateProps {
  quizData: Quiz | undefined;
}

export default function FinalQuizTemplate({ quizData }: FinalQuizTemplateProps) {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [results, setResults] = useState<Record<string, CorrectionResult>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  if (!quizData) {
    return <div className="p-8 text-center text-rose-500 font-bold">Error: Quiz Data not found.</div>;
  }

  const handleAnswerChange = (qId: string, val: any) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const submitQuiz = async () => {
    setIsEvaluating(true);
    let scoreAcc = 0;
    const newResults: Record<string, CorrectionResult> = {};
    const attemptsPayload: { questionId: string, isCorrect: boolean, userAnswer: string }[] = [];

    for (const q of quizData.questions) {
      const userAns = answers[q.id];
      const res = CorrectionEngine.checkAnswer(q, userAns);
      newResults[q.id] = res;
      scoreAcc += res.score;

      if (!res.needsAiCheck) {
        attemptsPayload.push({
          questionId: `fq_${q.id}`,
          isCorrect: res.isCorrect,
          userAnswer: typeof userAns === 'string' ? userAns : JSON.stringify(userAns)
        });
      }
    }

    setResults(newResults);
    setTotalScore(scoreAcc);
    setIsSubmitted(true);
    setIsEvaluating(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (attemptsPayload.length > 0) {
      fetch('/api/questions/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapterId: quizData.chapterId,
          attempts: attemptsPayload
        })
      }).catch(err => console.error('Failed to sync question attempts:', err));
    }
  };

  const getAiFeedback = async (q: Question) => {
    // Single question AI feedback call
    try {
      const currentRes = results[q.id];
      if (!currentRes) return;

      // Optimistic loading state
      setResults(prev => ({
        ...prev,
        [q.id]: { ...currentRes, feedback: "🤖 Meminta AI menganalisa jawaban Anda...", needsAiCheck: false }
      }));

      const response = await fetch('/api/ai-correct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapterId: quizData.chapterId,
          moduleId: q.moduleId || 'final-quiz',
          questionId: q.id,
          answer: answers[q.id],
          correctionMode: q.correctionMode,
          rubric: q.rubric,
          questionText: q.question
        })
      });

      if (!response.ok) throw new Error("Gagal");

      const aiData = await response.json();
      
      const newScore = (aiData.score / 100) * q.points;
      const isCorrect = aiData.score >= 60;
      
      setResults(prev => {
        const oldScore = prev[q.id]?.score || 0;
        setTotalScore(ts => ts - oldScore + newScore);

        return {
          ...prev,
          [q.id]: {
            ...currentRes,
            isCorrect: isCorrect,
            score: newScore,
            mode: 'ai',
            needsAiCheck: false,
            feedback: `🤖 **AI Feedback:** ${aiData.feedbackIndonesian}\n\n**Koreksi Teks:** ${aiData.correctedText}`
          }
        };
      });

      fetch('/api/questions/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapterId: quizData.chapterId,
          attempts: [{
            questionId: `fq_${q.id}_ai`,
            isCorrect,
            userAnswer: typeof answers[q.id] === 'string' ? answers[q.id] : JSON.stringify(answers[q.id])
          }]
        })
      }).catch(err => console.error('Failed to sync ai attempt:', err));

    } catch (err) {
      setResults(prev => ({
        ...prev,
        [q.id]: { ...prev[q.id], feedback: "❌ Gagal menghubungi server AI.", needsAiCheck: true }
      }));
    }
  };

  // Grouping by partTitle
  const parts: Record<string, Question[]> = {};
  quizData.questions.forEach(q => {
    const title = q.partTitle || "Allgemein";
    if (!parts[title]) parts[title] = [];
    parts[title].push(q);
  });

  const percentage = Math.round((totalScore / quizData.totalPoints) * 100) || 0;
  const isPassed = percentage >= quizData.passingScore;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pb-12">
      
      {/* HEADER */}
      <div className="text-center space-y-2">
        <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 font-bold rounded-full text-sm mb-2">
          Kapitel {quizData.chapterId}
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">{quizData.title}</h2>
        <p className="text-slate-600 text-lg">{quizData.description}</p>
      </div>

      {/* RESULT SCREEN */}
      {isSubmitted && (
        <div className={`p-8 rounded-3xl border-4 text-center clay-card ${isPassed ? 'bg-emerald-50 border-emerald-400' : 'bg-rose-50 border-rose-400'}`}>
          <div className="text-6xl mb-4">{isPassed ? '🏆' : '💪'}</div>
          <h2 className={`text-3xl font-black mb-2 ${isPassed ? 'text-emerald-700' : 'text-rose-700'}`}>
            {isPassed ? 'BESTANDEN!' : 'NICHT BESTANDEN'}
          </h2>
          <p className="text-xl font-bold text-slate-700">Skor Anda: <span className={`text-4xl font-black ${isPassed ? 'text-emerald-600' : 'text-rose-600'}`}>{percentage}%</span></p>
          <p className="text-slate-700 mt-2 font-medium">Batas Lulus: {quizData.passingScore}% ({totalScore} / {quizData.totalPoints} Poin)</p>
          
          <div className="mt-8">
            <button 
              onClick={() => { setIsSubmitted(false); setAnswers({}); setResults({}); setTotalScore(0); }}
              className="font-bold bg-white text-slate-800 px-8 py-3 rounded-xl shadow-md border-2 border-slate-300 hover:bg-slate-50 transition-all"
            >
              🔄 Coba Lagi
            </button>
          </div>
        </div>
      )}

      {/* QUESTIONS LIST */}
      <div className="space-y-12">
        {Object.keys(parts).map((partTitle, pIdx) => (
          <div key={pIdx} className="space-y-6">
            <div className="dark-card p-4 rounded-2xl shadow-lg">
              <h3 className="dark-card-title text-xl">{partTitle}</h3>
              {parts[partTitle][0]?.partInstruction && (
                <p className="dark-card-muted text-sm mt-1">{parts[partTitle][0].partInstruction}</p>
              )}
            </div>

            <div className="space-y-6">
              {parts[partTitle].map((q, qIdx) => {
                const res = results[q.id];
                const isIncorrectObj = isSubmitted && res && !res.isCorrect && !res.needsAiCheck;

                return (
                  <div key={q.id} className={`clay-card p-6 bg-white border-2 rounded-2xl transition-all ${isIncorrectObj ? 'border-rose-300 bg-rose-50/30' : 'border-slate-300'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-slate-100 text-slate-700 font-bold px-2 py-1 rounded text-xs">#{qIdx + 1}</span>
                      <span className="bg-indigo-100 text-indigo-800 font-bold px-2 py-1 rounded text-xs">{q.category}</span>
                      <span className="ml-auto text-slate-600 font-bold text-sm">{q.points} Poin</span>
                    </div>
                    
                    <p className="text-lg font-bold text-slate-800">{q.question}</p>
                    {q.instruction && <p className="text-sm text-slate-700 mt-1">{q.instruction}</p>}

                    <div className="mt-4">
                      <QuestionRenderer 
                        question={q} 
                        value={answers[q.id]} 
                        onChange={(v) => handleAnswerChange(q.id, v)} 
                        disabled={isSubmitted && !res?.needsAiCheck}
                      />
                    </div>

                    {/* REVIEW FEEDBACK */}
                    {isSubmitted && res && (
                      <div className="mt-6 pt-4 border-t-2 border-dashed border-slate-300">
                        {res.needsAiCheck ? (
                          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
                            <p className="text-amber-800 font-bold mb-3">{res.feedback}</p>
                            <button 
                              onClick={() => getAiFeedback(q)}
                              className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-xl font-bold shadow-md flex items-center gap-2 transition-all"
                            >
                              🤖 Dapatkan Feedback AI
                            </button>
                          </div>
                        ) : (
                          <div className={`p-4 rounded-xl ${res.isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                            <div className="flex items-start gap-2">
                              <span className="text-xl">{res.isCorrect ? '✅' : '❌'}</span>
                              <div className="flex-1">
                                <p className="font-bold whitespace-pre-wrap">{res.feedback}</p>
                                
                                {!res.isCorrect && res.correctAnswer && (
                                  <p className="text-sm mt-2 font-medium opacity-80">Jawaban benar: <strong className="bg-white/50 px-2 rounded">{res.correctAnswer}</strong></p>
                                )}
                                
                                {res.explanation && (
                                  <div className="mt-3 p-3 bg-white/50 rounded-lg text-sm border border-black/5">
                                    <strong>💡 Penjelasan:</strong> {res.explanation}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!isSubmitted && (
        <div className="pt-8">
          <button 
            onClick={submitQuiz}
            disabled={isEvaluating}
            className="w-full py-5 flex items-center justify-center gap-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 border-b-4 border-indigo-900 text-white font-black text-2xl transition-all active:border-b-0 active:translate-y-1 shadow-xl"
          >
            {isEvaluating ? '⏳ Memproses Jawaban...' : '📝 Kumpulkan & Hitung Skor'}
          </button>
        </div>
      )}

    </div>
  );
}
