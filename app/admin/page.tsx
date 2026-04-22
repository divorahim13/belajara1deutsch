import { createServerClient } from '@supabase/ssr'
import { cookies } from "next/headers";
import { Key, Users, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Dashboard - Client Portal",
}

export default async function ClientAdminDashboard() {
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

  if (!user) return null;

  // Get user's company_id
  const { data: profile } = await supabase
    .from('profiles')
    .select('company_id')
    .eq('id', user.id)
    .single();

  const companyId = profile?.company_id;

  let totalLicenses = 0;
  let usedLicenses = 0;
  let activeStudentsCount = 0;

  if (companyId) {
    // Get batches
    const { data: batches } = await supabase
      .from('license_batches')
      .select('total_licenses, used_licenses')
      .eq('company_id', companyId);

    if (batches) {
      totalLicenses = batches.reduce((sum, b) => sum + b.total_licenses, 0);
      usedLicenses = batches.reduce((sum, b) => sum + b.used_licenses, 0);
    }
    
    // In a real scenario we'd query active_licenses or profiles for exact active students
    activeStudentsCount = usedLicenses; // For now they mirror each other
  }

  const availableLicenses = totalLicenses - usedLicenses;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-500 mt-1">Monitor your license usage and active students.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Licenses Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 text-indigo-600 mb-4">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <Key size={20} strokeWidth={2} />
            </div>
            <h3 className="font-semibold text-gray-900">Total Licenses</h3>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">{totalLicenses}</p>
            <p className="text-sm font-medium text-gray-500 mt-1">Purchased quota</p>
          </div>
        </div>

        {/* Used Licenses Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 text-emerald-600 mb-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <CheckCircle2 size={20} strokeWidth={2} />
            </div>
            <h3 className="font-semibold text-gray-900">Available Licenses</h3>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">{availableLicenses}</p>
            <p className="text-sm font-medium text-gray-500 mt-1">Ready to distribute</p>
          </div>
        </div>

        {/* Active Students Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 text-purple-600 mb-4">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Users size={20} strokeWidth={2} />
            </div>
            <h3 className="font-semibold text-gray-900">Active Students</h3>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">{activeStudentsCount}</p>
            <p className="text-sm font-medium text-gray-500 mt-1">Currently enrolled</p>
          </div>
        </div>
      </div>
      
      {!companyId && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-amber-800">
          <h3 className="font-bold mb-2">No Company Assigned</h3>
          <p className="text-sm">Your account has not been assigned to a client company yet. Please contact the system administrator.</p>
        </div>
      )}
    </div>
  );
}
