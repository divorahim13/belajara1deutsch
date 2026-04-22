import Link from "next/link";
import { LayoutDashboard, Building2, Ticket, LogOut, Users } from "lucide-react";
import { createServerClient } from '@supabase/ssr'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'super_admin') {
    redirect('/dashboard');
  }

  return (
    <>
      <style>{`
        /* Force ERP Theme to override global Baloo 2 heading fonts */
        .erp-theme h1, .erp-theme h2, .erp-theme h3, .erp-theme h4, .erp-theme h5, .erp-theme h6 {
          font-family: 'Inter', 'Plus Jakarta Sans', sans-serif !important;
        }
      `}</style>
      <div className="erp-theme min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col md:flex-row">
        {/* Sleek ERP Sidebar */}
        <aside className="w-full md:w-72 bg-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-between shadow-sm">
          <div className="p-6">
            <div className="mb-10 flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold tracking-tighter">
                dp
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-gray-900 leading-tight">
                  Deutsch Pintar
                </h1>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Super Admin</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              <Link 
                href="/superadmin"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
              >
                <LayoutDashboard size={20} strokeWidth={2} />
                Overview
              </Link>
              
              <Link 
                href="/superadmin/companies"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
              >
                <Building2 size={20} strokeWidth={2} />
                Companies
              </Link>

              <Link 
                href="/superadmin/batches"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
              >
                <Ticket size={20} strokeWidth={2} />
                License Batches
              </Link>

              <Link 
                href="/superadmin/users"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
              >
                <Users size={20} strokeWidth={2} />
                Client Owners
              </Link>
            </nav>
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="mb-4">
              <p className="font-semibold text-sm text-gray-900 truncate">{profile?.full_name || 'Admin User'}</p>
              <p className="text-xs font-medium text-gray-500 mt-0.5">Administrator</p>
            </div>
            <form action="/api/auth/signout" method="post">
              <button className="w-full flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg font-medium border border-gray-200 bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors shadow-sm text-sm">
                <LogOut size={16} strokeWidth={2} />
                Log out
              </button>
            </form>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
