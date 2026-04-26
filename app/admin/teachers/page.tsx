import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Users, Mail, Shield, CheckCircle, Clock, MoreVertical, Plus } from 'lucide-react'

export const metadata = {
  title: 'Manage Teachers | Admin Dashboard',
}

export default async function AdminTeachersPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch admin profile to get institution_id
  const { data: profile } = await supabase
    .from('profiles')
    .select('institution_id')
    .eq('id', user.id)
    .single()

  let query = supabase.from('profiles').select('*').eq('role', 'teacher')

  if (profile?.institution_id && user.role !== 'super_admin') {
    query = query.eq('institution_id', profile.institution_id)
  }

  const { data: teachers } = await query

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manage Teachers</h1>
          <p className="text-slate-600 mt-2 text-lg">Invite, assign, and manage teaching staff.</p>
        </div>
        <button className="clay-card-sm bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-6 border-2 border-black transition-transform active:scale-95 flex items-center gap-2">
          <Plus size={20} />
          Invite Teacher
        </button>
      </div>

      {/* TEACHERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!teachers || teachers.length === 0 ? (
          <div className="col-span-full bg-white border-4 border-slate-900 p-12 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] text-center">
            <Users size={48} className="mx-auto text-slate-300 mb-4" />
            <h2 className="text-2xl font-black text-slate-900 mb-2">No Teachers Found</h2>
            <p className="text-slate-500">Invite your first teacher to start assigning classes.</p>
          </div>
        ) : (
          teachers.map((teacher: any) => (
            <div key={teacher.id} className="bg-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col relative group">
              <button className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors">
                <MoreVertical size={20} />
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-rose-100 border-2 border-rose-300 flex items-center justify-center text-rose-700 font-black text-2xl">
                  {teacher.full_name?.charAt(0) || teacher.email?.charAt(0) || 'T'}
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-xl truncate pr-6">{teacher.full_name || 'Pending Registration'}</h3>
                  <div className="flex items-center gap-1 text-sm font-bold text-slate-500 mt-1">
                    <Mail size={14} />
                    <span className="truncate w-32">{teacher.email}</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto space-y-3 border-t-2 border-slate-100 pt-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-500">Status</span>
                  {teacher.full_name ? (
                    <span className="flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                      <CheckCircle size={14} /> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                      <Clock size={14} /> Pending
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-500">Role</span>
                  <span className="flex items-center gap-1 font-bold text-indigo-600">
                    <Shield size={14} /> Teacher
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-500">Assigned Classes</span>
                  <span className="font-black text-slate-900">
                    {/* Dummy count, real app would fetch this */}
                    {Math.floor(Math.random() * 3) + 1}
                  </span>
                </div>
              </div>

              <button className="mt-6 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold border-2 border-slate-300 transition-colors">
                View Profile
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  )
}
