import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FileText, Plus, Clock, CheckCircle, ChevronRight, XCircle } from 'lucide-react'
import ExportButton from '@/components/ui/ExportButton'

export const metadata = {
  title: 'Assignments | Teacher Dashboard',
}

export default async function AssignmentsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch assignments created by this teacher
  const { data: assignments } = await supabase
    .from('assignments')
    .select(`
      id,
      title,
      description,
      due_date,
      created_at,
      classes ( name )
    `)
    .eq('teacher_id', user.id)
    .order('created_at', { ascending: false })

  // Dummy data if empty for demonstration
  const displayAssignments = assignments && assignments.length > 0 ? assignments : [
    {
      id: 'dummy-1',
      title: 'Schreiben: Brief an einen Freund',
      description: 'Write a letter to a friend inviting them to a party.',
      due_date: new Date(Date.now() + 86400000 * 2).toISOString(),
      classes: { name: 'A2 Weekend Intensive' },
      status: 'Active',
      submitted: 12,
      total: 15
    },
    {
      id: 'dummy-2',
      title: 'Grammatik: Perfekt vs Präteritum',
      description: 'Complete the story using the correct past tense forms.',
      due_date: new Date(Date.now() - 86400000 * 1).toISOString(),
      classes: { name: 'A2 Evening Class' },
      status: 'Past Due',
      submitted: 18,
      total: 20
    }
  ]

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Assignments</h1>
          <p className="text-slate-600 mt-2 text-lg">Manage homework, essays, and reading tasks.</p>
        </div>
        <div className="flex gap-3">
          <ExportButton 
            data={displayAssignments.map((a: any) => ({
              ID: a.id,
              Title: a.title,
              Class: a.classes?.name || 'All Classes',
              DueDate: new Date(a.due_date).toLocaleDateString(),
              Status: a.status || (new Date(a.due_date) < new Date() ? 'Past Due' : 'Active'),
              Submitted: a.submitted || 0,
              Total: a.total || 0
            }))}
            filename="Assignments_Report"
          />
          <button className="clay-card-sm bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 border-2 border-indigo-900 transition-transform active:scale-95 flex items-center gap-2">
            <Plus size={20} />
            Create New Assignment
          </button>
        </div>
      </div>

      {/* ASSIGNMENTS LIST */}
      <div className="bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
        <div className="p-6 border-b-4 border-slate-900 bg-slate-50">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <FileText className="text-indigo-600" /> Active & Past Assignments
          </h2>
        </div>

        <div className="divide-y-2 divide-slate-200">
          {displayAssignments.map((assignment: any) => {
             const isPastDue = assignment.status === 'Past Due' || new Date(assignment.due_date) < new Date()
             
             return (
              <div key={assignment.id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row gap-6 justify-between items-start md:items-center group">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 text-xs font-black uppercase tracking-wider border-2 ${
                      isPastDue ? 'bg-red-100 text-red-700 border-red-300' : 'bg-emerald-100 text-emerald-700 border-emerald-300'
                    }`}>
                      {isPastDue ? 'Past Due' : 'Active'}
                    </span>
                    <span className="text-sm font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {assignment.classes?.name || 'All Classes'}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-1">{assignment.title}</h3>
                  <p className="text-slate-600 text-sm line-clamp-1">{assignment.description}</p>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1 text-sm font-bold text-slate-500">
                      <Clock size={16} />
                      Due: {new Date(assignment.due_date).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8 w-full md:w-auto">
                  <div className="text-center">
                    <p className="text-2xl font-black text-indigo-600">
                      {assignment.submitted || 0}<span className="text-lg text-slate-400">/{assignment.total || 0}</span>
                    </p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Submitted</p>
                  </div>
                  <button className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full transition-colors border-2 border-transparent group-hover:border-indigo-200">
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
