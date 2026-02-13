'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  FaTachometerAlt,
  FaNewspaper,
  FaImages,
  FaHandshake,
  FaFolderOpen,
  FaCalendarAlt,
  FaGraduationCap,
  FaCog,
  FaEnvelope,
  FaExternalLinkAlt,
  FaSignOutAlt,
  FaWindowMaximize,
} from 'react-icons/fa'

const ICON_MAP: Record<string, React.ElementType> = {
  dashboard: FaTachometerAlt,
  newspaper: FaNewspaper,
  images: FaImages,
  handshake: FaHandshake,
  folder: FaFolderOpen,
  calendar: FaCalendarAlt,
  graduation: FaGraduationCap,
  cog: FaCog,
  envelope: FaEnvelope,
  modal: FaWindowMaximize,
}

type NavItem = { href: string; label: string; iconKey: string; badge?: number }

export default function AdminSidebar({ nav }: { nav: NavItem[] }) {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-64 shrink-0 flex-col rounded-r-3xl border-r border-slate-200/80 bg-white shadow-xl">
      <div className="border-b border-slate-100 p-6">
        <Link
          href="/admin"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-acture-blue to-indigo-600 text-white shadow-lg">
            <FaTachometerAlt className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-slate-800">Admin Acture</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {nav.map((item, i) => {
          const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href))
          const Icon = ICON_MAP[item.iconKey] ?? FaTachometerAlt
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Link href={item.href}>
                <div
                  className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-acture-blue/10 to-indigo-500/10 text-acture-blue shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="relative">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isActive ? 'bg-acture-blue text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-acture-blue/20 group-hover:text-acture-blue'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    {typeof item.badge === 'number' && item.badge > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white px-1.5 animate-pulse">
                        {item.badge > 99 ? '99+' : item.badge}
                      </span>
                    )}
                  </div>
                  <span className="font-medium flex-1">{item.label}</span>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </nav>
      <div className="space-y-1 border-t border-slate-100 p-4">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
        >
          <FaExternalLinkAlt className="h-4 w-4 shrink-0" />
          <span className="font-medium">Voir le site</span>
        </Link>
        <Link
          href="/api/auth/signout"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <FaSignOutAlt className="h-4 w-4 shrink-0" />
          <span className="font-medium">Déconnexion</span>
        </Link>
      </div>
    </aside>
  )
}
