import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, User, TrendingDown, Clock, Activity, CheckCircle, XCircle } from 'lucide-react'

export const metadata = {
  title: 'Student Report | Teacher Dashboard',
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function StudentReportPage(props: { params: Promise<{ id: string, studentId: string }> }) {
  const params = await props.params;
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Verify access
  const { data: membership } = await supabase
    .from('class_memberships')
    .select('*')
    .eq('user_id', user.id)
    .eq('class_id', params.id)
    .single()

  if (!membership && user.role !== 'admin' && user.role !== 'super_admin') {
    redirect('/teacher/classes')
  }

  // Fetch Student Profile
  const { data: studentProfile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.studentId)
    .single()

  if (!studentProfile) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-black text-slate-900">Student not found</h1>
        <Link href={`/teacher/classes/${params.id}`} className="text-indigo-600 font-bold mt-4 inline-block underline">
          Return to Class
        </Link>
      </div>
    )
  }

  // Fetch Real Analytics Data
  const { data: progressData } = await supabase
    .from('kapitel_progress')
    .select('progress_percent, chapter_id, completed_steps_details, completed_modules, total_modules')
    .eq('user_id', params.studentId)

  const completedChapters = progressData?.filter((p: any) => p.progress_percent === 100).length || 0

  const { data: quizAttempts } = await supabase
    .from('quiz_attempts')
    .select('quiz_id, score, passed, created_at')
    .eq('user_id', params.studentId)
    .order('created_at', { ascending: false })
    .limit(10)

  const overallScore = quizAttempts?.length 
    ? Math.round(quizAttempts.reduce((acc, curr) => acc + Number(curr.score), 0) / quizAttempts.length)
    : 0

  const { data: assignments } = await supabase
    .from('assignment_submissions')
    .select('assignment_id, status, created_at')
    .eq('user_id', params.studentId)
    .order('created_at', { ascending: false })
    .limit(5)

  // Aggregate Weaknesses and Chapter Performance from question_attempts
  const { data: questionAttempts } = await supabase
    .from('question_attempts')
    .select('chapter_id, skill, category, is_correct')
    .eq('user_id', params.studentId)

  const weaknessMap: Record<string, { attempts: number, incorrect: number, category: string }> = {}
  questionAttempts?.forEach((q: any) => {
    const topic = q.skill || q.category || 'General'
    if (!weaknessMap[topic]) weaknessMap[topic] = { attempts: 0, incorrect: 0, category: q.category }
    weaknessMap[topic].attempts++
    if (!q.is_correct) weaknessMap[topic].incorrect++
  })

  const weaknesses = Object.entries(weaknessMap)
    .filter(([_, stat]) => stat.incorrect > 0 && stat.attempts >= 2)
    .map(([topic, stat]) => {
      const errorRate = stat.incorrect / stat.attempts
      return {
        topic,
        severity: errorRate >= 0.5 ? 'Critical' : errorRate >= 0.3 ? 'High' : 'Medium',
        attempts: stat.incorrect,
        avgScore: Math.round((1 - errorRate) * 100)
      }
    }).sort((a, b) => a.avgScore - b.avgScore).slice(0, 5)

  // Build Chapter Performance
  const chapterPerformance = Array.from({ length: 12 }, (_, i) => {
    const chapterId = i + 1
    const progressItem = progressData?.find((p: any) => p.chapter_id === chapterId)
    const progress = progressItem?.progress_percent || 0
    const completedStepsDetails = progressItem?.completed_steps_details || []
    
    const chapterQuestions = questionAttempts?.filter((q: any) => q.chapter_id === chapterId) || []
    const totalQ = chapterQuestions.length
    const correctQ = chapterQuestions.filter((q: any) => q.is_correct).length
    const accuracy = totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : null

    return {
      chapterId,
      progress,
      accuracy,
      totalQ,
      completedStepsDetails
    }
  })

  // Build Recent Activity
  const recentActivity = []
  quizAttempts?.forEach((q: any) => {
    recentActivity.push({
      type: q.passed ? 'quiz_completed' : 'quiz_failed',
      name: `Quiz: ${q.quiz_id}`,
      date: new Date(q.created_at).toLocaleDateString(),
      score: q.score,
      timestamp: new Date(q.created_at).getTime()
    })
  })
  assignments?.forEach((a: any) => {
    recentActivity.push({
      type: 'assignment_submitted',
      name: `Assignment: ${a.assignment_id}`,
      date: new Date(a.created_at).toLocaleDateString(),
      status: a.status,
      timestamp: new Date(a.created_at).getTime()
    })
  })
  recentActivity.sort((a, b) => b.timestamp - a.timestamp)
  
  const analytics = {
    overallScore,
    completedChapters,
    totalTime: 'Active', // Time tracking would need complex session logs
    lastActive: quizAttempts?.[0]?.created_at ? new Date(quizAttempts[0].created_at).toLocaleDateString() : 'Never',
    weaknesses,
    recentActivity: recentActivity.slice(0, 5)
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      
      {/* HEADER */}
      <div>
        <Link href={`/teacher/classes/${params.id}`} className="flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 mb-6 w-fit transition-colors">
          <ArrowLeft size={20} /> Back to Class
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-indigo-100 border-4 border-indigo-300 flex items-center justify-center font-black text-indigo-700 text-3xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
              {studentProfile.full_name?.charAt(0) || studentProfile.email?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">{studentProfile.full_name || 'Unnamed Student'}</h1>
              <p className="text-slate-600 font-mono mt-1">{studentProfile.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <p className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-2">Overall Score</p>
          <p className="text-4xl font-black text-indigo-600">{analytics.overallScore}%</p>
        </div>
        <div className="bg-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <p className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-2">Completed Chapters</p>
          <p className="text-4xl font-black text-emerald-600">{analytics.completedChapters}/12</p>
        </div>
        <div className="bg-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <p className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-2">Total Time</p>
          <p className="text-4xl font-black text-amber-600">{analytics.totalTime}</p>
        </div>
        <div className="bg-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <p className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-2">Last Active</p>
          <p className="text-xl font-bold text-slate-800 mt-2">{analytics.lastActive}</p>
        </div>
      </div>

      {/* CHAPTER PERFORMANCE */}
      <div className="bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
        <div className="p-6 border-b-4 border-slate-900 bg-slate-50">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <CheckCircle className="text-emerald-600" /> Chapter Performance
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-300">
                <th className="p-4 font-black text-slate-700 uppercase tracking-wider text-sm">Chapter</th>
                <th className="p-4 font-black text-slate-700 uppercase tracking-wider text-sm">Progress</th>
                <th className="p-4 font-black text-slate-700 uppercase tracking-wider text-sm">Exercise Accuracy</th>
                <th className="p-4 font-black text-slate-700 uppercase tracking-wider text-sm">Questions Answered</th>
              </tr>
            </thead>
            <tbody>
              {chapterPerformance.filter(c => c.progress > 0 || c.totalQ > 0).map((chapter, i) => (
                <tr key={i} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">Kapitel {chapter.chapterId}</td>
                  <td className="p-4 align-top">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-full max-w-[120px] h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600" style={{ width: `${chapter.progress}%` }} />
                        </div>
                        <span className="text-xs font-bold text-slate-600">{chapter.progress}%</span>
                      </div>
                      {chapter.completedStepsDetails && chapter.completedStepsDetails.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {chapter.completedStepsDetails.map((step: string, idx: number) => (
                            <span key={idx} className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase rounded border border-emerald-300">
                              {step.replace('materi-', '').replace('quiz-', '')}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    {chapter.accuracy !== null ? (
                      <span className={`font-black ${chapter.accuracy >= 80 ? 'text-emerald-600' : chapter.accuracy >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                        {chapter.accuracy}%
                      </span>
                    ) : (
                      <span className="text-slate-400 font-bold">-</span>
                    )}
                  </td>
                  <td className="p-4 font-bold text-slate-600">
                    {chapter.totalQ} questions
                  </td>
                </tr>
              ))}
              {chapterPerformance.filter(c => c.progress > 0 || c.totalQ > 0).length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500 font-bold">
                    No chapter progress recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* WEAKNESSES */}
        <div className="bg-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            <TrendingDown className="text-red-600" /> Identified Weaknesses
          </h3>
          <div className="space-y-4">
            {analytics.weaknesses.map((w, i) => (
              <div key={i} className="p-4 border-2 border-red-200 bg-red-50 flex justify-between items-center">
                <div>
                  <p className="font-black text-red-900">{w.topic}</p>
                  <p className="text-sm font-bold text-red-700 mt-1">
                    Failed {w.attempts} times (Avg: {w.avgScore}%)
                  </p>
                </div>
                <div className={`px-3 py-1 text-xs font-black uppercase tracking-wider border-2 ${
                  w.severity === 'High' ? 'bg-red-600 text-white border-red-900' : 'bg-amber-400 text-amber-950 border-amber-900'
                }`}>
                  {w.severity} Risk
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            <Activity className="text-indigo-600" /> Recent Activity
          </h3>
          <div className="space-y-4">
            {analytics.recentActivity.map((act, i) => (
              <div key={i} className="p-4 border-2 border-slate-200 flex items-start gap-3 bg-slate-50">
                <div className="mt-1">
                  {act.type === 'quiz_completed' && <CheckCircle size={20} className="text-emerald-600" />}
                  {act.type === 'quiz_failed' && <XCircle size={20} className="text-red-600" />}
                  {act.type === 'assignment_submitted' && <Clock size={20} className="text-amber-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900">{act.name}</p>
                  <p className="text-xs text-slate-500 font-bold mt-1">{act.date}</p>
                </div>
                <div className="text-right">
                  {act.score && (
                    <span className={`font-black ${act.score >= 60 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {act.score}%
                    </span>
                  )}
                  {act.status && (
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mt-1">
                      {act.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
