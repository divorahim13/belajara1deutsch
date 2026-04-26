import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, KeyRound, ShieldAlert } from 'lucide-react'
import AccessRow from './AccessRow'

export const metadata = {
  title: 'Access Management | Admin Dashboard',
}

export default async function AdminAccessPage({
  searchParams,
}: {
  searchParams: { filter?: string }
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, institution_id')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/dashboard')
  }

  // Fetch students in the same institution
  let studentsQuery = supabase
    .from('profiles')
    .select('id, full_name, email, role')
    .eq('role', 'student')
    
  if (profile.role === 'admin' && profile.institution_id) {
    studentsQuery = studentsQuery.eq('institution_id', profile.institution_id)
  }

  const { data: students } = await studentsQuery

  const { data: accesses } = await supabase
    .from('user_level_access')
    .select('*')
    .eq('level', 'A2')

  const filter = searchParams.filter || 'all'

  // Join students with their access records and filter
  let combinedData = students?.map((s: any) => {
    const access = accesses?.find((a: any) => a.user_id === s.id)
    return { student: s, access }
  }) || []

  if (filter === 'active') {
    combinedData = combinedData.filter((d: any) => d.access?.status === 'active' && (!d.access.expires_at || new Date(d.access.expires_at) > new Date()))
  } else if (filter === 'expired') {
    combinedData = combinedData.filter((d: any) => d.access?.expires_at && new Date(d.access.expires_at) < new Date())
  } else if (filter === 'inactive') {
    combinedData = combinedData.filter((d: any) => !d.access || d.access.status === 'inactive')
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      <div>
        <Link href="/admin" className="flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 mb-6 w-fit transition-colors">
          <ArrowLeft size={20} /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-4">
          <div className="p-4 bg-indigo-100 border-4 border-indigo-300 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <KeyRound size={32} className="text-indigo-700" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Access Management</h1>
            <p className="text-slate-600 font-bold mt-1">Manual Private Beta Activation</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-amber-50 border-4 border-amber-300 flex items-start gap-3 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
        <ShieldAlert size={24} className="text-amber-700 flex-shrink-0 mt-1" />
        <div>
          <p className="font-black text-amber-900">Private Beta Mode Active</p>
          <p className="text-sm font-bold text-amber-800 mt-1">
            Tidak ada payment gateway. Aktivasi akses dilakukan manual setelah menerima pembayaran offline. Pastikan mengisi catatan transfer.
          </p>
        </div>
      </div>

      <div className="bg-white border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex flex-col">
        <div className="p-4 border-b-4 border-slate-900 bg-slate-100 flex flex-wrap gap-2">
           <Link href="/admin/access?filter=all" className={`px-4 py-2 font-black uppercase text-sm border-2 ${filter === 'all' ? 'bg-indigo-600 text-white border-indigo-900' : 'bg-white text-slate-700 border-slate-300'}`}>All</Link>
           <Link href="/admin/access?filter=active" className={`px-4 py-2 font-black uppercase text-sm border-2 ${filter === 'active' ? 'bg-emerald-500 text-white border-emerald-900' : 'bg-white text-slate-700 border-slate-300'}`}>Active</Link>
           <Link href="/admin/access?filter=expired" className={`px-4 py-2 font-black uppercase text-sm border-2 ${filter === 'expired' ? 'bg-red-500 text-white border-red-900' : 'bg-white text-slate-700 border-slate-300'}`}>Expired</Link>
           <Link href="/admin/access?filter=inactive" className={`px-4 py-2 font-black uppercase text-sm border-2 ${filter === 'inactive' ? 'bg-slate-500 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-300'}`}>Inactive</Link>
        </div>

        <div className="flex flex-col">
          {combinedData.length > 0 ? (
            combinedData.map((d: any, i: number) => (
              <AccessRow key={i} student={d.student} access={d.access} />
            ))
          ) : (
            <div className="p-8 text-center text-slate-500 font-bold">No students found for this filter.</div>
          )}
        </div>
      </div>
    </div>
  )
}
