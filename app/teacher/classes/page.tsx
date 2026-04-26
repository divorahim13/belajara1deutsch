import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Users, GraduationCap, ChevronRight, BookOpen } from 'lucide-react'

export const metadata = {
  title: 'My Classes | Teacher Dashboard',
}

export default async function ClassesPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch classes the teacher teaches
  const { data: memberships } = await supabase
    .from('class_memberships')
    .select(`
      class_id,
      classes (
        id,
        name,
        created_at
      )
    `)
    .eq('user_id', user.id)
    .eq('role_in_class', 'teacher')

  const classes = memberships?.map((m: any) => m.classes).filter(Boolean) || []

  // Fetch stats for each class
  const classesWithStats = await Promise.all(classes.map(async (cls: any) => {
    // Count students
    const { count: studentCount } = await supabase
      .from('class_memberships')
      .select('*', { count: 'exact', head: true })
      .eq('class_id', cls.id)
      .eq('role_in_class', 'student')
      
    // Average Score
    const { data: attempts } = await supabase
      .from('quiz_attempts')
      .select('score')
      .eq('class_id', cls.id)
      
    const avgScore = attempts?.length 
      ? Math.round(attempts.reduce((a: number, b: any) => a + Number(b.score), 0) / attempts.length) 
      : 0
      
    // Average Progress
    const { data: progress } = await supabase
      .from('kapitel_progress')
      .select('progress_percent')
      .eq('class_id', cls.id)
      
    const avgProgress = progress?.length
      ? Math.round(progress.reduce((a: number, b: any) => a + Number(b.progress_percent), 0) / progress.length)
      : 0

    return {
      ...cls,
      stats: {
        students: studentCount || 0,
        avgScore: `${avgScore}%`,
        progress: `${avgProgress}%`
      }
    }
  }))

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">My Classes</h1>
          <p className="text-slate-600 mt-2 text-lg">Manage your classes and monitor their progress.</p>
        </div>
      </div>

      {classesWithStats.length === 0 ? (
        <div className="bg-white border-4 border-slate-900 p-12 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] text-center">
          <GraduationCap size={48} className="mx-auto text-slate-300 mb-4" />
          <h2 className="text-2xl font-black text-slate-900 mb-2">No Classes Assigned</h2>
          <p className="text-slate-500">You have not been assigned to any classes yet. Contact your administrator.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classesWithStats.map((cls: any) => (
            <Link 
              key={cls.id} 
              href={`/teacher/classes/${cls.id}`}
              className="bg-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] transition-all duration-200 group flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-amber-100 border-2 border-amber-300 rounded-lg group-hover:bg-amber-400 group-hover:border-black transition-colors">
                  <BookOpen size={24} className="text-indigo-950" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Class ID</span>
                  <p className="text-sm font-mono font-bold text-slate-900">{cls.id.split('-')[0]}</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-black text-slate-900 mb-6 truncate">{cls.name}</h2>
              
              <div className="mt-auto pt-6 border-t-2 border-slate-100 grid grid-cols-3 gap-2">
                <div className="text-center">
                  <p className="text-xl font-black text-indigo-600">{cls.stats.students}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Students</p>
                </div>
                <div className="text-center border-l-2 border-slate-100">
                  <p className="text-xl font-black text-emerald-600">{cls.stats.avgScore}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Avg Score</p>
                </div>
                <div className="text-center border-l-2 border-slate-100">
                  <p className="text-xl font-black text-purple-600">{cls.stats.progress}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Progress</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  )
}
