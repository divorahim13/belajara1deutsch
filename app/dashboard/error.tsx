'use client'

import { useEffect } from 'react'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service securely
    console.error('Dashboard Error boundary caught an error:', error);
  }, [error])

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl border-4 border-rose-200 shadow-xl max-w-md w-full text-center">
        <div className="text-6xl mb-4">🚨</div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">Oops! Terjadi Kesalahan</h2>
        <p className="text-slate-600 mb-8 font-medium">
          Maaf, halaman atau modul materi tidak dapat dimuat dengan baik. Jangan khawatir, progres Anda tetap aman.
        </p>
        <button
          onClick={() => reset()}
          className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md active:scale-95 w-full"
        >
          Coba Muat Ulang
        </button>
      </div>
    </div>
  )
}
