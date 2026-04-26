'use client'

import { Check, X, Eye, User } from 'lucide-react'
import { useState } from 'react'
import { approveGrade, rejectGrade } from './actions'

interface GradingRowProps {
  grade: {
    id: string
    studentName: string
    assignmentTitle: string
    submittedAt: string
    aiScore: number
    aiFeedback: string
    status: string
  }
}

export default function GradingRow({ grade }: GradingRowProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleApprove = async () => {
    setIsProcessing(true)
    const result = await approveGrade(grade.id)
    if (!result.success) {
      setIsProcessing(false)
      alert(result.error)
    }
  }

  const handleReject = async () => {
    setIsProcessing(true)
    const result = await rejectGrade(grade.id)
    if (!result.success) {
      setIsProcessing(false)
      alert(result.error)
    }
  }

  return (
    <div className={`p-6 hover:bg-slate-50 transition-colors ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start">
        
        {/* Meta Info */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2 bg-indigo-100 text-indigo-800 px-2 py-1 text-xs font-black uppercase tracking-wider border border-indigo-200 rounded">
              <User size={14} /> {grade.studentName}
            </div>
            <span className="text-xs font-bold text-slate-500">{grade.submittedAt}</span>
          </div>
          <h3 className="text-lg font-black text-slate-900 mb-2">{grade.assignmentTitle}</h3>
          <div 
            className="bg-slate-100 p-3 border-l-4 border-indigo-600 text-sm font-medium text-slate-700 italic"
            dangerouslySetInnerHTML={{ __html: grade.aiFeedback }}
          />
        </div>

        {/* AI Score */}
        <div className="flex flex-col items-center justify-center bg-slate-50 p-4 border-2 border-slate-200 w-full lg:w-32">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">AI Score</span>
          <span className={`text-3xl font-black ${
            grade.aiScore >= 80 ? 'text-emerald-600' :
            grade.aiScore >= 60 ? 'text-amber-600' : 'text-red-600'
          }`}>
            {grade.aiScore}
          </span>
        </div>

        {/* Actions */}
        <div className="flex lg:flex-col gap-2 w-full lg:w-auto">
          <button 
            onClick={handleApprove}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold py-2 px-4 border border-emerald-300 transition-colors"
          >
            <Check size={18} /> Approve
          </button>
          <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold py-2 px-4 border border-amber-300 transition-colors">
            <Eye size={18} /> Review
          </button>
          <button 
            onClick={handleReject}
            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-4 border border-slate-300 transition-colors"
          >
            <X size={18} /> Reject
          </button>
        </div>

      </div>
    </div>
  )
}
