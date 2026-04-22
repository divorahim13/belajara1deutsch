'use client';

import { useState } from 'react';
import { TicketPlus, X } from 'lucide-react';
import { allocateBatch } from '../actions';

type Company = {
  id: string;
  name: string;
};

export default function AllocateBatchModal({ companies }: { companies: Company[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    
    const result = await allocateBatch(formData);
    
    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      setIsOpen(false);
      setIsLoading(false);
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 outline-none"
      >
        <TicketPlus size={18} strokeWidth={2} />
        Allocate Batch
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Allocate New Batch</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form action={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                  {error}
                </div>
              )}
              
              <div className="space-y-1.5">
                <label htmlFor="companyId" className="text-sm font-medium text-gray-700">Client Company</label>
                <select 
                  id="companyId" 
                  name="companyId" 
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-gray-900"
                >
                  <option value="">Select a company</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="level" className="text-sm font-medium text-gray-700">Course Level</label>
                <select 
                  id="level" 
                  name="level" 
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-gray-900"
                >
                  <option value="A1">A1 Level</option>
                  <option value="A2">A2 Level</option>
                  <option value="B1">B1 Level</option>
                  <option value="B2">B2 Level</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="totalLicenses" className="text-sm font-medium text-gray-700">Total Licenses</label>
                <input 
                  type="number" 
                  id="totalLicenses" 
                  name="totalLicenses" 
                  required 
                  min="1"
                  defaultValue="50"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900"
                  placeholder="e.g. 50"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 flex items-center gap-2"
                >
                  {isLoading ? 'Allocating...' : 'Allocate Batch'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
