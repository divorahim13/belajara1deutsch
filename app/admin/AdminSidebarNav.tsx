"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Building2, 
  Users, 
  GraduationCap, 
  Settings
} from 'lucide-react'

export default function AdminSidebarNav() {
  const pathname = usePathname()

  const links = [
    { name: 'Institution Overview', href: '/admin', icon: <Building2 size={20} /> },
    { name: 'All Classes', href: '/admin/classes', icon: <GraduationCap size={20} /> },
    { name: 'Manage Teachers', href: '/admin/teachers', icon: <Users size={20} /> },
    { name: 'Settings', href: '/admin/settings', icon: <Settings size={20} /> },
  ]

  return (
    <nav className="flex-1 p-4 space-y-2">
      {links.map((link) => {
        const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/admin')
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 font-bold transition-all duration-200 shadow-sm border-2 ${
              isActive
                ? 'bg-rose-500 text-white border-black translate-x-2'
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
