'use client'

import { Download } from 'lucide-react'
import { exportToCsv } from '@/lib/exportUtils'

interface ExportButtonProps {
  data: any[]
  filename: string
  label?: string
}

export default function ExportButton({ data, filename, label = 'Export CSV' }: ExportButtonProps) {
  return (
    <button
      onClick={() => exportToCsv(filename, data)}
      className="flex items-center gap-2 bg-indigo-950 text-white font-bold py-2 px-4 border-2 border-slate-900 hover:bg-indigo-800 transition-colors"
    >
      <Download size={18} />
      {label}
    </button>
  )
}
