import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { BrainCircuit, Check, X, Eye, FileText, User, Clock } from 'lucide-react'
import GradingRow from './GradingRow'

export const metadata = {
  title: 'AI Grading Center | Teacher Dashboard',
}

export default async function AIGradingCenterPage() {
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

  // 2. Ambil ai_grading_results yang belum di-review
  const { data: gradingData } = await supabase
    .from('ai_grading_results')
    .select(`
      id,
      ai_score,
      ai_feedback,
      created_at,
      submission:assignment_submissions!inner (
        id,
        class_id,
        assignment:assignments ( title ),
        student:profiles ( full_name )
      )
    `)
    .is('reviewed_by', null)
    .in('submission.class_id', classIds.length > 0 ? classIds : ['empty'])

  const pendingGrades = gradingData?.map((grade: any) => ({
    id: grade.id,
    studentName: grade.submission?.student?.full_name || 'Unknown Student',
    assignmentTitle: grade.submission?.assignment?.title || 'Unknown Assignment',
    submittedAt: new Date(grade.created_at).toLocaleDateString() + ' ' + new Date(grade.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    aiScore: grade.ai_score,
    aiFeedback: grade.ai_feedback || 'No feedback provided.',
    status: 'pending_review'
  })) || []

  // Stats for the overview
  const pendingCount = pendingGrades.length
  
  // Get approved today count
  const today = new Date()
  today.setHours(0,0,0,0)
  
  const { count: approvedCount } = await supabase
    .from('ai_grading_results')
    .select('id', { count: 'exact', head: true })
    .not('reviewed_by', 'is', null)
    .gte('created_at', today.toISOString())
    
  const estimatedTimeSaved = (approvedCount || 0) * 10 / 60 // Assumes 10 mins per grading

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">AI Grading Center</h1>
          <p className="text-slate-600 mt-2 text-lg">Review and approve automated grading by AI before releasing to students.</p>
        </div>
      </div>

      {/* OVERVIEW CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-950 text-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-indigo-300 font-bold uppercase tracking-wider text-sm">Pending Review</p>
            <BrainCircuit size={24} className="text-amber-400" />
          </div>
          <div className="mt-4">
            <h2 className="text-5xl font-black text-amber-400">{pendingCount}</h2>
            <p className="text-sm font-bold text-indigo-300 mt-2">Requires your attention</p>
          </div>
        </div>
        
        <div className="bg-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 font-bold uppercase tracking-wider text-sm">Approved Today</p>
            <Check size={24} className="text-emerald-600" />
          </div>
          <div className="mt-4">
            <h2 className="text-5xl font-black text-slate-900">{approvedCount || 0}</h2>
            <p className="text-sm font-bold text-slate-500 mt-2">Auto-released to students</p>
          </div>
        </div>

        <div className="bg-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <p className="text-slate-500 font-bold uppercase tracking-wider text-sm">Time Saved</p>
            <Clock size={24} className="text-blue-600" />
          </div>
          <div className="mt-4">
            <h2 className="text-5xl font-black text-slate-900">~{estimatedTimeSaved.toFixed(1)}h</h2>
            <p className="text-sm font-bold text-slate-500 mt-2">Estimated manual grading time</p>
          </div>
        </div>
      </div>

      {/* PENDING QUEUE */}
      <div className="bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
        <div className="p-6 border-b-4 border-slate-900 bg-amber-400 flex items-center justify-between">
          <h2 className="text-2xl font-black text-indigo-950 flex items-center gap-2">
            <FileText className="text-indigo-950" /> Review Queue
          </h2>
          <button className="text-sm font-bold bg-indigo-950 text-white px-4 py-2 border-2 border-black hover:bg-indigo-800 transition-colors">
            Approve All
          </button>
        </div>

        <div className="divide-y-2 divide-slate-200">
          {pendingGrades.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-bold">
              No pending reviews. Good job!
            </div>
          ) : (
            pendingGrades.map((grade: any) => (
              <GradingRow key={grade.id} grade={grade} />
            ))
          )}
        </div>
      </div>

    </div>
  )
}
