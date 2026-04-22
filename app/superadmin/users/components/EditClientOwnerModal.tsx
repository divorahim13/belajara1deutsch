'use client';

import { useState } from 'react';
import { Edit2, X, Loader2 } from 'lucide-react';
import { updateClientOwnerAccount } from '../actions';

type Company = {
  id: string;
  name: string;
};

type ClientOwner = {
  id: string;
  full_name: string | null;
  company_id: string | null;
};

export default function EditClientOwnerModal({ 
  clientOwner, 
  companies 
}: { 
  clientOwner: ClientOwner; 
  companies: Company[] 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append('userId', clientOwner.id);
    
    try {
      const result = await updateClientOwnerAccount(formData);
      
      if (result.error) {
        setError(result.error);
      } else {
        setIsOpen(false);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="text-indigo-600 hover:text-indigo-900 font-medium transition-colors"
      >
        Edit
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 text-left">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Edit Client Owner</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 hover:bg-gray-100 p-2 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                defaultValue={clientOwner.full_name || ''}
                required
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 focus:bg-white transition-all text-sm text-gray-900"
                placeholder="e.g. Budi Santoso"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Assign to Company</label>
              <select 
                name="companyId"
                defaultValue={clientOwner.company_id || ''}
                required
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 focus:bg-white transition-all text-sm font-medium text-gray-900"
              >
                <option value="">Select a company...</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Change Password (Optional)</label>
              <input 
                type="password" 
                name="password"
                minLength={6}
                className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 focus:bg-white transition-all text-sm text-gray-900"
                placeholder="Leave blank to keep current password"
              />
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-gray-100 flex justify-end gap-3">
            <button 
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2.5 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            >
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
