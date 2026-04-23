import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import LogoutButton from './LogoutButton'
import DashboardSidebarNav from './DashboardSidebarNav'
import MobileNavDrawer from './MobileNavDrawer'

export default async function DashboardLayout({
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

  const chapters = Array.from({ length: 12 }, (_, i) => i + 1)

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--background)' }}>
      {/* ── SIDEBAR ── */}
      <aside className="w-64 bg-indigo-950 border-r-4 border-indigo-900 hidden md:flex flex-col sticky top-0 h-screen overflow-y-auto custom-scrollbar z-50">
        <div className="p-6 border-b-4 border-indigo-900">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <span className="text-3xl">🇩🇪</span> Deutsch
          </h1>
          <p className="text-indigo-400 font-bold text-xs uppercase tracking-widest mt-1">A2 Dashboard</p>
        </div>

        <DashboardSidebarNav />

        <div className="p-4 border-t-4 border-indigo-900 bg-indigo-950/80 backdrop-blur-md">
          <div className="clay-card p-4 bg-white border-2 border-indigo-200 text-slate-900 mb-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-black shadow-inner border border-indigo-500 text-white">
              {user.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="font-bold text-sm truncate">{profile?.full_name || user.email}</p>
              <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">{profile?.role?.replace('_', ' ') || 'Student'}</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>

      {/* ── MOBILE NAV BAR (Visible only on small screens) ── */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-indigo-950 border-b-4 border-indigo-900 p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <MobileNavDrawer />
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <span>🇩🇪</span> A2 Deutsch
          </h1>
        </div>
        <div className="flex gap-2">
           <LogoutButton mobile />
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 flex flex-col w-full relative pt-[72px] md:pt-0 min-h-screen">
         {children}
      </main>
    </div>
  )
}
