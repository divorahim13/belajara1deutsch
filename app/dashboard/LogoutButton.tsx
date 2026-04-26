'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LogoutButton({ mobile = false }: { mobile?: boolean }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const handleLogout = async () => {
    setIsLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  if (mobile) {
    return (
      <button 
        onClick={handleLogout}
        disabled={isLoading}
        className="bg-rose-500 hover:bg-rose-600 text-white p-2 rounded-xl font-bold border-b-4 border-rose-700 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
      >
        {isLoading ? '...' : 'Keluar'}
      </button>
    )
  }

  return (
    <button 
      onClick={handleLogout}
      disabled={isLoading}
      className="w-full bg-rose-500 hover:bg-rose-400 text-white font-black py-3 rounded-xl border-b-4 border-rose-700 active:border-b-0 active:translate-y-1 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
    >
      <span>{isLoading ? '...' : '🚪 Logout'}</span>
    </button>
  )
}
