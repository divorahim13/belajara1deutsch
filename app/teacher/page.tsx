import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Users, TrendingUp, AlertTriangle, CheckCircle, BrainCircuit, ArrowRight } from 'lucide-react'
import TeacherPerformanceChart from './TeacherPerformanceChart'

export const metadata = {
  title: 'Teacher Overview | A2 Deutsch',
}

export default async function TeacherDashboard() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 1. Ambil list class_id yang diajar oleh guru ini
  const { data: memberships } = await supabase
    .from('class_memberships')
    .select('class_id')
    .eq('user_id', user.id)
    .eq('role_in_class', 'teacher')

  const classIds = memberships?.map((m: any) => m.class_id) || []

  // --- 1. Total Students ---
  const { count: studentCount } = await supabase
    .from('class_memberships')
    .select('user_id', { count: 'exact', head: true })
    .in('class_id', classIds)
    .eq('role_in_class', 'student')

  // --- 2. Average Score ---
  const { data: attempts } = await supabase
    .from('quiz_attempts')
    .select('score')
    .in('class_id', classIds)
  
  const avgScore = attempts?.length 
    ? Math.round(attempts.reduce((acc: number, curr: any) => acc + Number(curr.score), 0) / attempts.length) 
    : 0

  // --- 3. Pending AI Reviews ---
  const { count: pendingCount } = await supabase
    .from('assignment_submissions')
    .select('id', { count: 'exact', head: true })
    .in('class_id', classIds)
    .eq('status', 'submitted')

  // --- 4. Needs Attention (Recent fails) ---
  const { data: recentFails } = await supabase
    .from('quiz_attempts')
    .select(`
      user_id, 
      score,
      quiz_id,
      profiles ( full_name )
    `)
    .in('class_id', classIds)
    .eq('passed', false)
    .order('created_at', { ascending: false })
    .limit(5)
    
  // --- 5. Chart Data (Kapitel Progress Average) ---
  // Group quiz attempts by chapter to show a trend.
  const { data: chapterAttempts } = await supabase
    .from('quiz_attempts')
    .select('chapter_id, score, percentage')
    .in('class_id', classIds)
    
  const chapterStats: Record<number, { scores: number[], count: number }> = {}
  chapterAttempts?.forEach((a: any) => {
    if (!chapterStats[a.chapter_id]) chapterStats[a.chapter_id] = { scores: [], count: 0 }
    chapterStats[a.chapter_id].scores.push(Number(a.score))
    chapterStats[a.chapter_id].count++
  })
  
  const chartData = [1, 2, 3, 4, 5, 6].map(ch => {
    const stat = chapterStats[ch]
    const averageScore = stat && stat.scores.length > 0 
      ? Math.round(stat.scores.reduce((a,b)=>a+b,0) / stat.scores.length) 
      : 0
    return {
      chapter: `Kapitel ${ch}`,
      averageScore,
      completionRate: Math.min(100, (stat?.count || 0) * 10) // Mocking completion rate for chart based on attempt counts
    }
  }).filter(d => d.averageScore > 0 || d.chapter === 'Kapitel 1')
  
  const metrics = [
    { label: 'Total Students', value: studentCount || 0, icon: <Users size={24} className="text-blue-600" />, trend: 'Active Enrollment' },
    { label: 'Average Score', value: `${avgScore}%`, icon: <TrendingUp size={24} className="text-emerald-600" />, trend: 'Overall Average' },
    { label: 'Needs Attention', value: recentFails?.length || 0, icon: <AlertTriangle size={24} className="text-amber-600" />, trend: 'Recent failed quizzes' },
    { label: 'AI Reviews Pending', value: pendingCount || 0, icon: <BrainCircuit size={24} className="text-purple-600" />, trend: 'Action required' },
  ]

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Teacher Overview</h1>
          <p className="text-slate-600 mt-2 text-lg">Here is what is happening in your classes today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/teacher/assignments" className="clay-card-sm bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 border-2 border-indigo-900 transition-transform active:scale-95 flex items-center gap-2">
            Create Assignment
          </Link>
          <Link href="/teacher/ai-grading" className="clay-card-sm bg-amber-400 hover:bg-amber-500 text-indigo-950 font-bold py-2 px-4 border-2 border-black transition-transform active:scale-95 flex items-center gap-2">
            Review AI Grading
          </Link>
        </div>
      </div>

      {/* METRICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <p className="text-slate-500 font-bold uppercase tracking-wider text-sm">{m.label}</p>
              <div className="p-2 bg-slate-100 border-2 border-slate-200 rounded-lg">
                {m.icon}
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-4xl font-black text-slate-900">{m.value}</h2>
              <p className="text-sm font-bold text-slate-500 mt-2 bg-slate-100 inline-block px-2 py-1 rounded">{m.trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS & LISTS AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* MAIN CHART PLACEHOLDER */}
        <div className="lg:col-span-2 bg-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            <TrendingUp className="text-indigo-600" />
            Class Performance Trend
          </h3>
          <div className="w-full h-72">
             <TeacherPerformanceChart data={chartData.length > 0 ? chartData : [{ chapter: 'Kapitel 1', averageScore: 0, completionRate: 0 }]} />
          </div>
        </div>

        {/* RECENT ACTIVITY / ALERTS */}
        <div className="bg-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            <AlertTriangle className="text-amber-600" />
            Needs Attention
          </h3>
          
          <div className="flex-1 overflow-y-auto space-y-4">
            {recentFails && recentFails.length > 0 ? (
              recentFails.map((fail: any, i: number) => (
                <div key={i} className="p-4 border-2 border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-red-100 border border-red-300 flex items-center justify-center font-bold text-red-600 text-xs">
                      {(Array.isArray(fail.profiles) ? fail.profiles[0] : fail.profiles)?.full_name?.substring(0, 2).toUpperCase() || 'ST'}
                    </div>
                    <p className="font-bold text-slate-800">{(Array.isArray(fail.profiles) ? fail.profiles[0] : fail.profiles)?.full_name || 'Student'}</p>
                  </div>
                  <p className="text-sm text-slate-600 font-medium">Failed {fail.quiz_id} ({fail.score}%)</p>
                  <button className="mt-3 text-xs font-bold text-indigo-600 uppercase flex items-center gap-1 hover:text-indigo-800">
                    View Profile <ArrowRight size={14} />
                  </button>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-slate-500 font-medium">
                No students currently failing. Great job!
              </div>
            )}
          </div>

          <Link href="/teacher/weakness" className="mt-6 w-full block text-center py-3 bg-slate-900 text-white font-bold border-2 border-slate-900 hover:bg-slate-800 transition-colors">
            View Full Weakness Tracker
          </Link>
        </div>

      </div>

    </div>
  )
}
