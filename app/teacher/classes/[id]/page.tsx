import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Users, User, TrendingUp, AlertCircle, Search } from 'lucide-react'
import ExportButton from '@/components/ui/ExportButton'

export const metadata = {
  title: 'Class Details | Teacher Dashboard',
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ClassDetailsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 1. Verifikasi apakah teacher ini mengajar kelas ini
  const { data: membership } = await supabase
    .from('class_memberships')
    .select('*')
    .eq('user_id', user.id)
    .eq('class_id', params.id)
    .single()

  // Jika tidak punya akses, redirect
  if (!membership && user.role !== 'admin' && user.role !== 'super_admin') {
    redirect('/teacher/classes')
  }

  // 2. Fetch Class Data
  const { data: classData } = await supabase
    .from('classes')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!classData) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-black text-slate-900">Class not found</h1>
        <Link href="/teacher/classes" className="text-indigo-600 font-bold mt-4 inline-block underline">
          Return to Classes
        </Link>
      </div>
    )
  }

  // 3. Fetch Students in this class
  const { data: studentsData } = await supabase
    .from('class_memberships')
    .select(`
      user_id,
      profiles (
        id,
        full_name,
        email
      )
    `)
    .eq('class_id', params.id)
    .eq('role_in_class', 'student')

  const students = studentsData?.map((s: any) => Array.isArray(s.profiles) ? s.profiles[0] : s.profiles).filter(Boolean) || []

  // 4. Fetch Progress and Scores for these students
  const studentIds = students.map((s: any) => s.id)
  
  const { data: progressData } = await supabase
    .from('kapitel_progress')
    .select('user_id, progress_percent')
    .eq('class_id', params.id)
    .in('user_id', studentIds.length > 0 ? studentIds : ['empty'])
    
  const { data: quizData } = await supabase
    .from('quiz_attempts')
    .select('user_id, score, passed')
    .eq('class_id', params.id)
    .in('user_id', studentIds.length > 0 ? studentIds : ['empty'])
    
  const studentProgress = students.map((s: any) => {
    const sProgress = progressData?.filter((p: any) => p.user_id === s.id) || []
    const sQuizzes = quizData?.filter((q: any) => q.user_id === s.id) || []
    
    const avgProgress = sProgress.length > 0 
      ? Math.round(sProgress.reduce((acc: number, curr: any) => acc + Number(curr.progress_percent), 0) / sProgress.length)
      : 0
      
    const avgScore = sQuizzes.length > 0
      ? Math.round(sQuizzes.reduce((acc: number, curr: any) => acc + Number(curr.score), 0) / sQuizzes.length)
      : 0
      
    const needsAttention = sQuizzes.some((q: any) => q.passed === false) || (sQuizzes.length > 0 && avgScore < 60)
    
    return {
      ...s,
      progress: avgProgress,
      score: avgScore,
      needsAttention
    }
  })

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      
      {/* HEADER */}
      <div>
        <Link href="/teacher/classes" className="flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 mb-6 w-fit transition-colors">
          <ArrowLeft size={20} /> Back to My Classes
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
             <div className="flex items-center gap-3 mb-2">
               <span className="bg-amber-400 text-indigo-950 px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-black">Class</span>
               <span className="text-slate-500 font-mono text-sm font-bold">{classData.id.split('-')[0]}</span>
             </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{classData.name}</h1>
          </div>
          <div className="flex gap-3">
             <ExportButton 
               data={studentProgress.map((s: any) => ({
                 ID: s.id,
                 Name: s.full_name,
                 Email: s.email,
                 Progress: s.progress,
                 AvgScore: s.score,
                 NeedsAttention: s.needsAttention ? 'Yes' : 'No'
               }))} 
               filename={`${classData.name}_Progress_Report`} 
               label="Export Report" 
             />
             <div className="clay-card-sm bg-white text-slate-900 font-bold py-2 px-4 border-2 border-slate-200 flex items-center gap-2">
               <Users size={18} className="text-indigo-600" />
               {students.length} Students
             </div>
          </div>
        </div>
      </div>

      {/* STUDENT LIST */}
      <div className="bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] overflow-hidden flex flex-col">
        <div className="p-6 border-b-4 border-slate-900 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <User className="text-indigo-600" /> Students List
          </h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search students..." 
              className="w-full pl-10 pr-4 py-2 border-2 border-slate-300 focus:border-indigo-600 focus:ring-0 font-medium outline-none transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-300">
                <th className="p-4 font-black text-slate-700 uppercase tracking-wider text-sm">Student</th>
                <th className="p-4 font-black text-slate-700 uppercase tracking-wider text-sm">Progress</th>
                <th className="p-4 font-black text-slate-700 uppercase tracking-wider text-sm">Avg Score</th>
                <th className="p-4 font-black text-slate-700 uppercase tracking-wider text-sm text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {studentProgress.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500 font-bold">
                    No students found in this class.
                  </td>
                </tr>
              ) : (
                studentProgress.map((student: any) => (
                  <tr key={student.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center font-bold text-indigo-700">
                          {student.full_name?.charAt(0) || student.email?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{student.full_name || 'Unnamed Student'}</p>
                          <p className="text-xs text-slate-500">{student.email}</p>
                        </div>
                        {student.needsAttention && (
                          <span title="Needs Attention"><AlertCircle size={16} className="text-amber-500 ml-2" /></span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full max-w-[120px] h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-600" 
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-600">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`font-black ${
                        student.score >= 80 ? 'text-emerald-600' :
                        student.score >= 60 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {student.score}%
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link 
                        href={`/teacher/classes/${classData.id}/students/${student.id}`}
                        className="text-sm font-bold text-indigo-600 hover:text-indigo-800 underline transition-colors"
                      >
                        View Report
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
