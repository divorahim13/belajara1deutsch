import { createServerClient } from '@supabase/ssr'
import { cookies } from "next/headers";
import { Building2, TicketPlus } from 'lucide-react';
import AllocateBatchModal from '../components/AllocateBatchModal';

export const metadata = {
  title: "License Batches - Super Admin",
}

export default async function BatchesPage() {
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

  // Fetch batches
  const { data: batches, error } = await supabase
    .from('license_batches')
    .select(`
      *,
      company:companies(name)
    `)
    .order('created_at', { ascending: false });

  // Fetch companies for the modal dropdown
  const { data: companiesData } = await supabase
    .from('companies')
    .select('id, name')
    .eq('is_active', true)
    .order('name');
    
  const companies = companiesData || [];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">License Batches</h2>
          <p className="text-gray-500 mt-1">Allocate and track license distributions for clients.</p>
        </div>
        <AllocateBatchModal companies={companies} />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden text-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500">
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs whitespace-nowrap">Company</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Level</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Usage</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs whitespace-nowrap">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {batches?.map((batch, index) => {
                const usagePercent = Math.min(100, (batch.used_licenses / batch.total_licenses) * 100);
                const isNearingLimit = usagePercent > 80;
                
                return (
                  <tr key={batch.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-gray-50 border border-gray-200 text-gray-500 flex items-center justify-center shrink-0">
                        <Building2 size={16} />
                      </div>
                      {/* @ts-ignore */}
                      {batch.company?.name || 'Unknown'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                        {batch.level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5 w-40">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-medium text-gray-700">{batch.used_licenses} used</span>
                          <span className="text-gray-500">{batch.total_licenses} total</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${isNearingLimit ? 'bg-amber-500' : 'bg-indigo-500'}`}
                            style={{ width: `${usagePercent}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(batch.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                  </tr>
                );
              })}
              {(!batches || batches.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <TicketPlus size={32} className="mx-auto text-gray-300 mb-3" />
                    <p className="font-medium text-gray-900">No license batches found</p>
                    <p className="text-sm mt-1">Get started by allocating a new batch.</p>
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
