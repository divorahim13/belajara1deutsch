import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '@/app/dashboard/LogoutButton'
import TeacherSidebarNav from './TeacherSidebarNav'

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user profile for name/email/role
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Strict role check again just in case
  if (profile?.role !== 'teacher' && profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* ── SIDEBAR ── */}
      <aside className="w-64 bg-indigo-950 border-r-4 border-indigo-900 hidden md:flex flex-col sticky top-0 h-screen overflow-y-auto z-50">
        <div className="p-6 border-b-4 border-indigo-900 bg-indigo-900">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <span className="text-3xl">👨‍🏫</span> Teacher
          </h1>
          <p className="text-indigo-300 font-bold text-xs uppercase tracking-widest mt-1">B2B Dashboard</p>
        </div>

        <TeacherSidebarNav />

        <div className="p-4 border-t-4 border-indigo-900 bg-indigo-950/80 backdrop-blur-md">
          <div className="p-4 bg-white border-2 border-indigo-200 text-slate-900 mb-3 flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
            <div className="w-10 h-10 rounded-full bg-amber-400 border-2 border-black flex items-center justify-center text-xl font-black text-indigo-950">
              {user.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-sm truncate text-black">{profile?.full_name || user.email}</p>
              <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">{profile?.role?.replace('_', ' ')}</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* ── MOBILE NAV BAR (Visible only on small screens) ── */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-indigo-950 border-b-4 border-indigo-900 p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          {/* Add Mobile Drawer later if needed */}
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <span>👨‍🏫</span> Teacher Portal
          </h1>
        </div>
        <div className="flex gap-2">
           <LogoutButton mobile />
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 flex flex-col w-full relative pt-[72px] md:pt-0 min-h-screen overflow-x-hidden">
         {children}
      </main>
    </div>
  )
}
