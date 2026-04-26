import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { GraduationCap, Users, Plus, Search, MoreVertical } from 'lucide-react'

export const metadata = {
  title: 'All Classes | Admin Dashboard',
}

export default async function AdminClassesPage() {
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

  let query = supabase.from('classes').select(`
    id,
    name,
    created_at,
    class_memberships(count)
  `)

  if (profile?.institution_id && user.role !== 'super_admin') {
    query = query.eq('institution_id', profile.institution_id)
  }

  const { data: classes } = await query.order('created_at', { ascending: false })

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">All Classes</h1>
          <p className="text-slate-600 mt-2 text-lg">Manage classes, assign teachers, and monitor capacity.</p>
        </div>
        <button className="clay-card-sm bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-6 border-2 border-black transition-transform active:scale-95 flex items-center gap-2">
          <Plus size={20} />
          Add New Class
        </button>
      </div>

      {/* DATA GRID */}
      <div className="bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] overflow-hidden flex flex-col">
        <div className="p-6 border-b-4 border-slate-900 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <GraduationCap className="text-indigo-600" /> Institution Classes
          </h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search classes..." 
              className="w-full pl-10 pr-4 py-2 border-2 border-slate-300 focus:border-rose-500 focus:ring-0 font-medium outline-none transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b-2 border-slate-300">
                <th className="p-4 font-black text-slate-700 uppercase tracking-wider text-sm">Class Name</th>
                <th className="p-4 font-black text-slate-700 uppercase tracking-wider text-sm">Members</th>
                <th className="p-4 font-black text-slate-700 uppercase tracking-wider text-sm">Created</th>
                <th className="p-4 font-black text-slate-700 uppercase tracking-wider text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!classes || classes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500 font-bold">
                    No classes found. Create one to get started.
                  </td>
                </tr>
              ) : (
                classes.map((cls: any) => (
                  <tr key={cls.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded border border-indigo-200 text-indigo-700">
                          <GraduationCap size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-lg">{cls.name}</p>
                          <p className="text-xs text-slate-500 font-mono mt-1">ID: {cls.id.split('-')[0]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-slate-400" />
                        <span className="font-black text-slate-700">
                          {cls.class_memberships?.[0]?.count || 0}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-bold text-slate-600">
                        {new Date(cls.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-2 hover:bg-slate-200 rounded transition-colors inline-flex text-slate-500">
                        <MoreVertical size={20} />
                      </button>
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
