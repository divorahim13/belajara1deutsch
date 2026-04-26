import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Target, AlertTriangle, TrendingDown, Users, BookOpen } from 'lucide-react'
import ExportButton from '@/components/ui/ExportButton'

export const metadata = {
  title: 'Weakness Tracker | Teacher Dashboard',
}

export default async function WeaknessTrackerPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Verify access (just role checking)
  if (user.role !== 'teacher' && user.role !== 'admin' && user.role !== 'super_admin') {
     // Wait, user object doesn't contain role directly unless custom claim, let's fetch profile
     const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
     if (profile?.role !== 'teacher' && profile?.role !== 'admin' && profile?.role !== 'super_admin') {
       redirect('/dashboard')
     }
  }

  // Fetch classes for this teacher
  const { data: memberships } = await supabase
    .from('class_memberships')
    .select('class_id')
    .eq('user_id', user.id)
    .eq('role_in_class', 'teacher')

  const classIds = memberships?.map((m: any) => m.class_id) || []

  // Fetch attempts
  const { data: attempts } = await supabase
    .from('question_attempts')
    .select('user_id, chapter_id, category, skill, is_correct')
    .in('class_id', classIds)

  // Aggregate weaknesses
  const topicStats: Record<string, { total: number, incorrect: number, users: Set<string>, category: string, chapter: string }> = {}

  attempts?.forEach((a: any) => {
    const chapter = `Kapitel ${a.chapter_id}`
    const topic = a.skill || a.category || 'General'
    
    // Group by topic + chapter
    const key = `${topic}-${chapter}`

    if (!topicStats[key]) {
      topicStats[key] = { total: 0, incorrect: 0, users: new Set(), category: a.category || 'Mixed', chapter }
    }

    topicStats[key].total++
    if (!a.is_correct) {
      topicStats[key].incorrect++
      topicStats[key].users.add(a.user_id)
    }
  })

  // Format into weaknesses array, only keep ones with incorrect > 0
  const weaknesses = Object.entries(topicStats)
    .filter(([_, stat]) => stat.incorrect > 0 && stat.total >= 3) // Minimum 3 attempts to count as a trend
    .map(([topicKey, stat]) => {
      const errorRate = (stat.incorrect / stat.total) * 100
      let severity = 'Medium'
      if (errorRate >= 50) severity = 'Critical'
      else if (errorRate >= 30) severity = 'High'

      // Avg score is inverse of error rate for this specific topic
      const avgScore = Math.round(100 - errorRate)

      return {
        topic: topicKey.split('-')[0], // Remove chapter from topic name
        category: stat.category,
        chapter: stat.chapter,
        affectedStudents: stat.users.size,
        avgScore,
        severity,
        trend: errorRate > 40 ? 'worsening' : 'stable'
      }
    })
    .sort((a, b) => a.avgScore - b.avgScore) // sort by lowest score first
    .slice(0, 10) // show top 10 weaknesses

  const criticalCount = weaknesses.filter(w => w.severity === 'Critical').length
  const totalAffected = new Set(Array.from(Object.values(topicStats)).flatMap(stat => Array.from(stat.users))).size

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Weakness Tracker</h1>
          <p className="text-slate-600 mt-2 text-lg">AI-powered insights identifying concepts your students are struggling with.</p>
        </div>
        <ExportButton 
          data={weaknesses.map(w => ({
            Topic: w.topic,
            Category: w.category,
            Chapter: w.chapter,
            AffectedStudents: w.affectedStudents,
            AvgScore: w.avgScore,
            Severity: w.severity,
            Trend: w.trend
          }))}
          filename="Weakness_Tracker_Report"
        />
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex items-center gap-4">
          <div className="p-4 bg-red-100 border-2 border-red-300 rounded-xl">
            <AlertTriangle size={32} className="text-red-600" />
          </div>
          <div>
            <p className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-1">Critical Topics</p>
            <p className="text-3xl font-black text-slate-900">{criticalCount}</p>
          </div>
        </div>
        
        <div className="bg-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex items-center gap-4">
          <div className="p-4 bg-amber-100 border-2 border-amber-300 rounded-xl">
            <Users size={32} className="text-amber-600" />
          </div>
          <div>
            <p className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-1">Affected Students</p>
            <p className="text-3xl font-black text-slate-900">{totalAffected}</p>
          </div>
        </div>

        <div className="bg-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex items-center gap-4">
          <div className="p-4 bg-indigo-100 border-2 border-indigo-300 rounded-xl">
            <BookOpen size={32} className="text-indigo-600" />
          </div>
          <div>
            <p className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-1">Recommended Interventions</p>
            <p className="text-3xl font-black text-slate-900">{weaknesses.length}</p>
          </div>
        </div>
      </div>

      {/* WEAKNESS LIST */}
      <div className="bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
        <div className="p-6 border-b-4 border-slate-900 bg-slate-50">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Target className="text-indigo-600" /> Aggregated Weaknesses
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-300">
                <th className="p-4 font-black text-slate-700 uppercase tracking-wider text-sm">Topic</th>
                <th className="p-4 font-black text-slate-700 uppercase tracking-wider text-sm">Chapter & Category</th>
                <th className="p-4 font-black text-slate-700 uppercase tracking-wider text-sm">Affected Students</th>
                <th className="p-4 font-black text-slate-700 uppercase tracking-wider text-sm">Avg Score</th>
                <th className="p-4 font-black text-slate-700 uppercase tracking-wider text-sm text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {weaknesses.map((w, i) => (
                <tr key={i} className="border-b border-slate-200 hover:bg-slate-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-bold text-slate-900 text-lg">{w.topic}</p>
                        <div className={`mt-1 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider border-2 ${
                          w.severity === 'Critical' ? 'bg-red-600 text-white border-red-900' :
                          w.severity === 'High' ? 'bg-amber-400 text-amber-950 border-amber-900' :
                          'bg-emerald-400 text-emerald-950 border-emerald-900'
                        }`}>
                          {w.severity}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-slate-800">{w.chapter}</p>
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mt-1">{w.category}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-slate-400" />
                      <span className="font-black text-slate-700">{w.affectedStudents}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-black ${
                        w.avgScore >= 80 ? 'text-emerald-600' :
                        w.avgScore >= 60 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {w.avgScore}%
                      </span>
                      {w.trend === 'worsening' && <TrendingDown size={16} className="text-red-500" />}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 underline opacity-0 group-hover:opacity-100 transition-opacity">
                      View Affected Students
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
