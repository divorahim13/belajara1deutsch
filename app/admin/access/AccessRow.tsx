'use client'

import { useState } from 'react'
import { updateUserAccess } from './actions'

export default function AccessRow({ student, access }: { student: any, access: any }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [notes, setNotes] = useState('')
  const [customExpiry, setCustomExpiry] = useState('')

  const handleAction = async (action: 'activate' | 'deactivate' | 'extend_30' | 'extend_60' | 'set_expiry') => {
    setIsProcessing(true)
    try {
      await updateUserAccess(student.id, action, notes, action === 'set_expiry' ? customExpiry : undefined)
      setNotes('')
    } catch (e) {
      alert("Failed to update access")
    } finally {
      setIsProcessing(false)
    }
  }

  const isExpired = access?.expires_at && new Date(access.expires_at) < new Date()
  const statusLabel = !access ? 'Not Set' : isExpired ? 'Expired' : access.status
  const statusColor = statusLabel === 'active' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                      statusLabel === 'Expired' ? 'bg-red-100 text-red-800 border-red-300' :
                      'bg-slate-200 text-slate-800 border-slate-400'

  return (
    <div className="p-4 border-b-2 border-slate-200 bg-white hover:bg-slate-50 flex flex-col lg:flex-row gap-4 items-start lg:items-center">
      <div className="flex-1">
        <p className="font-black text-slate-900">{student.full_name || 'No Name'}</p>
        <p className="text-sm font-bold text-slate-500">{student.email}</p>
      </div>

      <div className="flex-1">
        <span className={`px-2 py-1 text-xs font-black uppercase tracking-wider border-2 ${statusColor}`}>
          {statusLabel}
        </span>
        <p className="text-xs font-bold text-slate-600 mt-2">
          Exp: {access?.expires_at ? new Date(access.expires_at).toLocaleDateString() : 'N/A'}
        </p>
        <p className="text-xs font-bold text-indigo-600 mt-1">
          AI Quota: {access?.ai_quota_used || 0} / {access?.ai_quota_limit || 30}
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <input 
          type="text" 
          placeholder="Admin notes (e.g. transfer BCA 10/10)" 
          className="px-3 py-2 text-sm border-2 border-slate-300 bg-slate-50 font-bold focus:outline-none focus:border-indigo-600 w-full"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        {statusLabel !== 'active' ? (
           <button 
             onClick={() => handleAction('activate')}
             disabled={isProcessing}
             className="px-3 py-2 bg-indigo-600 text-white font-black text-sm uppercase tracking-wider border-2 border-indigo-900 hover:bg-indigo-700 disabled:opacity-50"
           >
             Activate A2
           </button>
        ) : (
          <div className="flex gap-2 flex-wrap">
            <button 
              onClick={() => handleAction('extend_30')}
              disabled={isProcessing}
              className="px-2 py-1 bg-emerald-500 text-white font-black text-xs uppercase border-2 border-emerald-900 hover:bg-emerald-600 disabled:opacity-50"
            >
              +30D
            </button>
            <button 
              onClick={() => handleAction('extend_60')}
              disabled={isProcessing}
              className="px-2 py-1 bg-emerald-500 text-white font-black text-xs uppercase border-2 border-emerald-900 hover:bg-emerald-600 disabled:opacity-50"
            >
              +60D
            </button>
            <button 
              onClick={() => handleAction('deactivate')}
              disabled={isProcessing}
              className="px-2 py-1 bg-red-500 text-white font-black text-xs uppercase border-2 border-red-900 hover:bg-red-600 disabled:opacity-50"
            >
              Deactivate
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
