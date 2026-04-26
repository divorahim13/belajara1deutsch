import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Building2, Users, GraduationCap, TrendingUp, AlertCircle, Plus } from 'lucide-react'

export const metadata = {
  title: 'Institution Overview | Admin Dashboard',
}

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Ambil data admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('institution_id')
    .eq('id', user.id)
    .single()

  if (!profile?.institution_id && user.role !== 'super_admin') {
     return (
       <div className="p-10 text-center">
         <h1 className="text-2xl font-black text-slate-900">Institution not linked</h1>
         <p className="text-slate-500 mt-2">Please contact super admin to link your account to an institution.</p>
       </div>
     )
  }

  // Fetch Institution Data
  const institutionId = profile?.institution_id || 'super-admin-view'
  let institutionName = 'Super Admin View'
  
  if (institutionId !== 'super-admin-view') {
    const { data: inst } = await supabase
      .from('institutions')
      .select('name')
      .eq('id', institutionId)
      .single()
    if (inst) institutionName = inst.name
  }

  // --- 1. Total Teachers & Students ---
  let teacherCount = 0
  let studentCount = 0
  
  if (institutionId !== 'super-admin-view') {
    const { count: tCount } = await supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .eq('institution_id', institutionId)
      .eq('role', 'teacher')
    teacherCount = tCount || 0
    
    const { count: sCount } = await supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .eq('institution_id', institutionId)
      .eq('role', 'student')
    studentCount = sCount || 0
  } else {
    // Super admin view all
    const { count: tCount } = await supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'teacher')
    teacherCount = tCount || 0
    const { count: sCount } = await supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('role', 'student')
    studentCount = sCount || 0
  }

  // --- 2. Active Classes ---
  let classQuery = supabase.from('classes').select('id')
  if (institutionId !== 'super-admin-view') {
    classQuery = classQuery.eq('institution_id', institutionId)
  }
  const { data: classes } = await classQuery
  const classCount = classes?.length || 0
  const classIds = classes?.map((c: any) => c.id) || []

  // --- 3. Overall Completion ---
  let avgCompletion = 0
  if (classIds.length > 0) {
    const { data: progressData } = await supabase
      .from('kapitel_progress')
      .select('progress_percent')
      .in('class_id', classIds)
      
    avgCompletion = progressData?.length
      ? Math.round(progressData.reduce((a: number, b: any) => a + Number(b.progress_percent), 0) / progressData.length)
      : 0
  }

  const metrics = [
    { label: 'Total Teachers', value: teacherCount, icon: <Users size={24} className="text-rose-600" />, trend: 'Active users' },
    { label: 'Active Classes', value: classCount, icon: <GraduationCap size={24} className="text-indigo-600" />, trend: 'Running sessions' },
    { label: 'Total Students', value: studentCount, icon: <Users size={24} className="text-emerald-600" />, trend: 'Enrolled users' },
    { label: 'Overall Completion', value: `${avgCompletion}%`, icon: <TrendingUp size={24} className="text-blue-600" />, trend: 'Average across all' },
  ]

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <div className="flex items-center gap-3 mb-2">
             <span className="bg-rose-500 text-white px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-black">Institution</span>
             <span className="text-slate-500 font-mono text-sm font-bold">{institutionId.split('-')[0] || 'ALL'}</span>
           </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">{institutionName}</h1>
          <p className="text-slate-600 mt-2 text-lg">High-level overview of your institution's performance.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/classes" className="clay-card-sm bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 border-2 border-black transition-transform active:scale-95 flex items-center gap-2">
            <Plus size={18} /> Add Class
          </Link>
          <Link href="/admin/teachers" className="clay-card-sm bg-white hover:bg-slate-50 text-slate-900 font-bold py-2 px-4 border-2 border-slate-900 transition-transform active:scale-95 flex items-center gap-2">
            <Plus size={18} /> Invite Teacher
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
            <TrendingUp className="text-rose-600" />
            Institution Performance Over Time
          </h3>
          <div className="w-full h-72 bg-slate-50 border-2 border-dashed border-slate-300 flex items-center justify-center flex-col">
             <p className="text-slate-500 font-bold">Aggregated Chart Data</p>
             <p className="text-sm text-slate-400">Recharts integration pending real data.</p>
          </div>
        </div>

        {/* ALERTS / SYSTEM STATUS */}
        <div className="bg-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col">
          <h3 className="text-xl font-black mb-6 flex items-center gap-2">
            <AlertCircle className="text-amber-500" />
            System Alerts
          </h3>
          
          <div className="flex-1 overflow-y-auto space-y-4">
            <div className="p-4 border-2 border-amber-200 bg-amber-50 hover:bg-amber-100 transition-colors">
              <p className="font-bold text-amber-900">License Limit Approaching</p>
              <p className="text-sm text-amber-700 font-medium mt-1">145/150 student seats used.</p>
              <button className="mt-3 text-xs font-bold text-amber-700 uppercase underline hover:text-amber-900">
                Upgrade Plan
              </button>
            </div>
            
            <div className="p-4 border-2 border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors">
              <p className="font-bold text-slate-800">New Teacher Registered</p>
              <p className="text-sm text-slate-600 font-medium mt-1">Pending approval for "A. Faiz".</p>
              <button className="mt-3 text-xs font-bold text-indigo-600 uppercase underline hover:text-indigo-800">
                Review Now
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
