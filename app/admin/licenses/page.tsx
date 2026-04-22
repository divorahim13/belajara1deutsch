import { createServerClient } from '@supabase/ssr'
import { cookies } from "next/headers";
import { KeyRound } from "lucide-react";
import CopyKeyButton from '../components/CopyKeyButton';

export const metadata = {
  title: "License Keys - Client Portal",
}

export default async function LicensesPage() {
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

  let keys: any[] = [];

  if (companyId) {
    // Get all batches for this company, then their keys
    const { data: batches } = await supabase
      .from('license_batches')
      .select('id, level')
      .eq('company_id', companyId);

    if (batches && batches.length > 0) {
      const batchIds = batches.map(b => b.id);
      
      const { data: licenseKeys } = await supabase
        .from('license_keys')
        .select(`
          *,
          used_by_profile:profiles!used_by(full_name)
        `)
        .in('batch_id', batchIds)
        .order('created_at', { ascending: false });
        
      if (licenseKeys) {
        // Map level from batches into keys for display
        keys = licenseKeys.map(key => {
          const batch = batches.find(b => b.id === key.batch_id);
          return {
            ...key,
            level: batch?.level || 'Unknown'
          };
        });
      }
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">License Keys</h2>
          <p className="text-gray-500 mt-1">Copy and distribute these keys to your students.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden text-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500">
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs whitespace-nowrap">License Code</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Level</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs whitespace-nowrap">Used By</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs whitespace-nowrap">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {keys?.map((key, index) => (
                <tr key={key.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-900 flex items-center gap-2 font-semibold">
                    {key.code}
                    {key.status === 'available' && <CopyKeyButton code={key.code} />}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                      {key.level}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {key.status === 'available' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        Available
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                        Used
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {key.status === 'used' && key.used_by_profile ? (
                      <span className="text-gray-900 font-medium">{key.used_by_profile.full_name}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(key.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                </tr>
              ))}
              {(!keys || keys.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <KeyRound size={32} className="mx-auto text-gray-300 mb-3" />
                    <p className="font-medium text-gray-900">No license keys found</p>
                    <p className="text-sm mt-1">Contact your administrator to allocate a new batch.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
