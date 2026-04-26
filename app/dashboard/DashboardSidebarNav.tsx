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
        const isKap3 = chap === 3;
        const isKap4 = chap === 4;
        const isKap5 = chap === 5;
        const isKap6 = chap === 6;
        const isKap7 = chap === 7;
        const isKap8 = chap === 8;
        const isKap9 = chap === 9;
        const isKap10 = chap === 10;
        const isKap11 = chap === 11;
        const isKap12 = chap === 12;
        const href = isKap1 ? "/dashboard" : isKap2 ? "/dashboard/kapitel-2" : isKap3 ? "/dashboard/kapitel-3" : isKap4 ? "/dashboard/kapitel-4" : isKap5 ? "/dashboard/kapitel-5" : isKap6 ? "/dashboard/kapitel-6" : isKap7 ? "/dashboard/kapitel-7" : isKap8 ? "/dashboard/kapitel-8" : isKap9 ? "/dashboard/kapitel-9" : isKap10 ? "/dashboard/kapitel-10" : isKap11 ? "/dashboard/kapitel-11" : isKap12 ? "/dashboard/kapitel-12" : "#";
        const isActive = (isKap1 && pathname === '/dashboard') || (isKap2 && pathname === '/dashboard/kapitel-2') || (isKap3 && pathname === '/dashboard/kapitel-3') || (isKap4 && pathname === '/dashboard/kapitel-4') || (isKap5 && pathname === '/dashboard/kapitel-5') || (isKap6 && pathname === '/dashboard/kapitel-6') || (isKap7 && pathname === '/dashboard/kapitel-7') || (isKap8 && pathname === '/dashboard/kapitel-8') || (isKap9 && pathname === '/dashboard/kapitel-9') || (isKap10 && pathname === '/dashboard/kapitel-10') || (isKap11 && pathname === '/dashboard/kapitel-11') || (isKap12 && pathname === '/dashboard/kapitel-12');
        const isEnabled = isKap1 || isKap2 || isKap3 || isKap4 || isKap5 || isKap6 || isKap7 || isKap8 || isKap9 || isKap10 || isKap11 || isKap12;

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
            {isEnabled && !isActive && <span className="text-indigo-600 text-xs">READY</span>}
            {isActive && <span className="text-emerald-400">●</span>}
          </Link>
        )
      })}
    </nav>
  )
}

