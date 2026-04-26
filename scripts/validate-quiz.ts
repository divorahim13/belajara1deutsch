import { getQuizData, quizData } from '../app/dashboard/data/quiz-data';

function validateQuiz() {
  let hasError = false;
  let totalQuestions = 0;

  for (const [chapterIdStr, quiz] of Object.entries(quizData)) {
    const chapterId = parseInt(chapterIdStr);
    console.log(`\nValidating Kapitel ${chapterId}: ${quiz.title}`);
    
    if (!quiz.questions || quiz.questions.length === 0) {
      console.error(`❌ Kapitel ${chapterId} has no questions.`);
      hasError = true;
      continue;
    }

    totalQuestions += quiz.questions.length;
    let kapitelHasError = false;

    quiz.questions.forEach((q, index) => {
      const qNum = index + 1;
      
      // Check required fields
      if (!q.id) { console.error(`❌ Q${qNum} is missing ID.`); kapitelHasError = true; }
      if (!q.type) { console.error(`❌ Q${qNum} (${q.id}) is missing type.`); kapitelHasError = true; }
      if (!q.correctionMode) { console.error(`❌ Q${qNum} (${q.id}) is missing correctionMode.`); kapitelHasError = true; }
      
      // Check correctionMode logic rules
      if (q.type !== 'writing' && q.type !== 'speakingPrompt' && q.type !== 'sentenceTransformation' && q.correctionMode === 'ai') {
        console.error(`❌ Q${qNum} (${q.id}) has type '${q.type}' but uses 'ai' correctionMode. Objective types must use 'template'.`);
        kapitelHasError = true;
      }

      if (['multipleChoice', 'trueFalse', 'matching', 'reorder', 'fillBlank'].includes(q.type) && q.correctionMode !== 'template') {
        // Warning if hybrid is used on simple types, but mostly it should be template.
        if (q.correctionMode === 'ai') {
          console.error(`❌ Q${qNum} (${q.id}) has type '${q.type}' but uses '${q.correctionMode}' correctionMode. Must use 'template'.`);
          kapitelHasError = true;
        }
      }

      // Ensure points are defined
      if (typeof q.points !== 'number' || q.points < 0) {
        console.error(`❌ Q${qNum} (${q.id}) has invalid or missing points.`);
        kapitelHasError = true;
      }
    });

    if (!kapitelHasError) {
      console.log(`✅ Kapitel ${chapterId} is valid. (${quiz.questions.length} questions)`);
    } else {
      hasError = true;
    }
  }

  if (hasError) {
    console.error(`\n❌ Validation Failed! Fix the errors in quiz-data.ts`);
    process.exit(1);
  } else {
    console.log(`\n🎉 Validation Passed! All ${totalQuestions} questions are correctly configured.`);
    process.exit(0);
  }
}

validateQuiz();
