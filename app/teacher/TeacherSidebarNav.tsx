"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  FileText, 
  BrainCircuit,
  MessageSquare,
  Settings
} from 'lucide-react'

export default function TeacherSidebarNav() {
  const pathname = usePathname()

  const links = [
    { name: 'Overview', href: '/teacher', icon: <LayoutDashboard size={20} /> },
    { name: 'My Classes', href: '/teacher/classes', icon: <Users size={20} /> },
    { name: 'Weakness Tracker', href: '/teacher/weakness', icon: <Target size={20} /> },
    { name: 'Assignments', href: '/teacher/assignments', icon: <FileText size={20} /> },
    { name: 'AI Grading Center', href: '/teacher/ai-grading', icon: <BrainCircuit size={20} /> },
  ]

  return (
    <nav className="flex-1 p-4 space-y-2">
      {links.map((link) => {
        const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/teacher')
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 font-bold transition-all duration-200 shadow-sm border-2 ${
              isActive
                ? 'bg-amber-400 text-indigo-950 border-black translate-x-2'
                : 'bg-white/10 text-white border-transparent hover:bg-white/20 hover:border-white/30'
            }`}
          >
            {link.icon}
            {link.name}
          </Link>
        )
      })}
    </nav>
  )
}
