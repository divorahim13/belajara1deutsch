'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardSidebarNav() {
  const pathname = usePathname()
  const chapters = Array.from({ length: 12 }, (_, i) => i + 1)

  return (
    <nav className="flex-1 p-4 space-y-2">
      {chapters.map((chap) => {
        const isKap1 = chap === 1;
        const isKap2 = chap === 2;
        const href = isKap1 ? "/dashboard" : isKap2 ? "/dashboard/kapitel-2" : "#";
        const isActive = (isKap1 && pathname === '/dashboard') || (isKap2 && pathname === '/dashboard/kapitel-2');
        const isEnabled = isKap1 || isKap2;

        return (
          <Link 
            key={chap} 
            href={href} 
            className={`flex items-center justify-between px-4 py-3 rounded-2xl font-extrabold transition-all border-b-4 ${
              isActive 
                ? 'bg-indigo-600 text-white border-indigo-800 translate-y-1' 
                : isEnabled
                  ? 'bg-indigo-900 text-indigo-100 border-indigo-950 hover:bg-indigo-800 hover:text-white hover:-translate-y-0.5'
                  : 'bg-indigo-900/50 text-indigo-300 border-indigo-900/80 cursor-not-allowed'
            }`}
            onClick={(e) => {
              if (!isEnabled) {
                e.preventDefault();
                alert('Kapitel ' + chap + ' masih dalam tahap pengembangan (Coming Soon).');
              }
            }}
          >
            <span>Kapitel {chap}</span>
            {isEnabled && !isActive && <span className="text-indigo-400 text-xs">READY</span>}
            {isActive && <span className="text-emerald-400">●</span>}
          </Link>
        )
      })}
    </nav>
  )
}

