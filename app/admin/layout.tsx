import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '@/app/dashboard/LogoutButton'
import AdminSidebarNav from './AdminSidebarNav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Strict role check for Admin / Super Admin
  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* ── SIDEBAR ── */}
      <aside className="w-64 bg-slate-900 border-r-4 border-slate-800 hidden md:flex flex-col sticky top-0 h-screen overflow-y-auto z-50">
        <div className="p-6 border-b-4 border-slate-800 bg-slate-950">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <span className="text-3xl">🏢</span> Admin
          </h1>
          <p className="text-rose-400 font-bold text-xs uppercase tracking-widest mt-1">Management Portal</p>
        </div>

        <AdminSidebarNav />

        <div className="p-4 border-t-4 border-slate-800 bg-slate-900/80 backdrop-blur-md">
          <div className="p-4 bg-white border-2 border-slate-300 text-slate-900 mb-3 flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
            <div className="w-10 h-10 rounded-full bg-rose-500 border-2 border-black flex items-center justify-center text-xl font-black text-white">
              {user.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-sm truncate text-black">{profile?.full_name || user.email}</p>
              <p className="text-xs text-rose-600 font-bold uppercase tracking-wider">{profile?.role?.replace('_', ' ')}</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* ── MOBILE NAV BAR ── */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-slate-900 border-b-4 border-slate-800 p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <span>🏢</span> Admin Portal
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
