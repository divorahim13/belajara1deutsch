import { createServerClient } from '@supabase/ssr'
import { cookies } from "next/headers";
import { Users as UsersIcon } from "lucide-react";
import AddClientOwnerModal from './components/AddClientOwnerModal';
import EditClientOwnerModal from './components/EditClientOwnerModal';

export const metadata = {
  title: "Client Owners - Super Admin",
}

export default async function ClientOwnersPage() {
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

  // Get active companies for the modal dropdown
  const { data: companies } = await supabase
    .from('companies')
    .select('id, name')
    .order('name');

  // Get all client owners, joining with companies
  const { data: clientOwners } = await supabase
    .from('profiles')
    .select(`
      id,
      full_name,
      company_id,
      created_at,
      companies!profiles_company_id_fkey(name)
    `)
    .eq('role', 'client_owner')
    .order('created_at', { ascending: false });

  // Note: We cannot get the user's email directly from the `profiles` table unless we joined with `auth.users` 
  // via an RPC or raw SQL, or duplicated it in the profiles table. 
  // For simplicity here, we display the Name and Company.

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Client Owners</h2>
          <p className="text-gray-500 mt-1">Manage accounts for your B2B clients.</p>
        </div>
        <AddClientOwnerModal companies={companies || []} />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden text-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500">
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Name</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Company</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs">Joined Date</th>
                <th className="px-6 py-4 font-medium uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clientOwners?.map((owner) => (
                <tr key={owner.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-900 font-semibold flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                      {owner.full_name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    {owner.full_name || 'Unnamed User'}
                  </td>
                  <td className="px-6 py-4">
                    {owner.companies && Array.isArray(owner.companies) && owner.companies.length > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        {owner.companies[0]?.name}
                      </span>
                    ) : owner.companies && !Array.isArray(owner.companies) ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        {(owner.companies as any).name}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">No company assigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(owner.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <EditClientOwnerModal 
                      clientOwner={{
                        id: owner.id,
                        full_name: owner.full_name,
                        company_id: owner.company_id
                      }} 
                      companies={companies || []} 
                    />
                  </td>
                </tr>
              ))}
              {(!clientOwners || clientOwners.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <UsersIcon size={32} className="mx-auto text-gray-300 mb-3" />
                    <p className="font-medium text-gray-900">No client owners found</p>
                    <p className="text-sm mt-1">Add a client owner to grant them dashboard access.</p>
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
