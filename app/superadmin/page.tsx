import { createServerClient } from '@supabase/ssr'
import { cookies } from "next/headers";
import Link from 'next/link';

export const metadata = {
  title: "Overview - Super Admin",
}

export default async function SuperAdminOverview() {
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

  // Fetch counts
  const { count: companiesCount } = await supabase
    .from('companies')
    .select('*', { count: 'exact', head: true });

  const { count: batchesCount } = await supabase
    .from('license_batches')
    .select('*', { count: 'exact', head: true });

  const { data: batchesData } = await supabase
    .from('license_batches')
    .select('total_licenses, used_licenses');

  let totalLicenses = 0;
  let totalUsed = 0;
  if (batchesData) {
    batchesData.forEach(b => {
      totalLicenses += b.total_licenses;
      totalUsed += b.used_licenses;
    });
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Overview</h2>
        <p className="text-gray-500 mt-1">Monitor platform metrics and manage your clients.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Card 1 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="font-medium text-sm text-gray-500 mb-1">Total Companies</h3>
          <p className="text-4xl font-bold text-gray-900">{companiesCount || 0}</p>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="font-medium text-sm text-gray-500 mb-1">Licenses Allocated</h3>
          <p className="text-4xl font-bold text-gray-900">{totalLicenses}</p>
          <p className="text-sm text-gray-400 mt-1">Total across all batches</p>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="font-medium text-sm text-gray-500 mb-1">Active Licenses</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-bold text-indigo-600">{totalUsed}</p>
            <p className="text-sm text-gray-400">/ {totalLicenses}</p>
          </div>
          <p className="text-sm text-gray-400 mt-1">Currently in use</p>
        </div>
      </div>

      <div className="mt-8 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link href="/superadmin/companies" className="px-5 py-2.5 rounded-lg font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm">
            Manage Companies
          </Link>
          <Link href="/superadmin/batches" className="px-5 py-2.5 rounded-lg font-medium border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm">
            Allocate Licenses
          </Link>
        </div>
      </div>
    </div>
  );
}
