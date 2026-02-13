'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'

const LEFT_ITEMS = [
  { href: '/', label: 'Accueil', key: 'page_accueil_enabled' },
  { href: '/asso', label: 'Acture Asso', key: 'page_asso_enabled', children: [
    { href: '/asso', label: 'Présentation' },
    { href: '/asso/projets', label: 'Projets & Actions' },
  ]},
  { href: '/academie', label: 'Acture Académie', key: 'page_academie_enabled', children: [
    { href: '/academie', label: 'Présentation' },
    { href: '/academie/formations', label: 'Formations' },
    { href: '/academie#inscriptions', label: 'Inscriptions' },
  ]},
]

const RIGHT_ITEMS = [
  { href: '/actualites', label: 'Actualités', key: 'page_actualites_enabled' },
  { href: '/partenaires', label: 'Partenaires', key: 'page_partenaires_enabled' },
  { href: '/soutien', label: 'Nous soutenir', key: 'page_soutien_enabled' },
  { href: '/contact', label: 'Contact', key: 'page_contact_enabled' },
]

const MOBILE_ITEMS: { href: string; label: string; indent?: boolean; key: string }[] = [
  { href: '/', label: 'Accueil', key: 'page_accueil_enabled' },
  { href: '/asso', label: 'Acture Asso', key: 'page_asso_enabled' },
  { href: '/asso/projets', label: 'Projets & Actions', indent: true, key: 'page_asso_enabled' },
  { href: '/academie', label: 'Acture Académie', key: 'page_academie_enabled' },
  { href: '/academie/formations', label: 'Formations', indent: true, key: 'page_academie_enabled' },
  { href: '/academie#inscriptions', label: 'Inscriptions', indent: true, key: 'page_academie_enabled' },
  ...RIGHT_ITEMS.map((r) => ({ href: r.href, label: r.label, key: r.key })),
]

function isPageEnabled(settings: Record<string, string>, key: string): boolean {
  const val = settings[key]
  return val !== '0' && val !== 'false'
}

type NavItemType = (typeof LEFT_ITEMS)[0] | (typeof RIGHT_ITEMS)[0]

function NavItem({ item, pathname, isActive }: { item: NavItemType; pathname: string; isActive: (p: string) => boolean }) {
  const hasChildren = 'children' in item && item.children
  const isLinkActive = isActive(item.href)

  if (hasChildren && item.children) {
    return (
      <div className="relative group">
        <span className="inline-flex items-center gap-1.5 cursor-default text-slate-800 tracking-wide text-[15px] font-medium transition-colors duration-200 group-hover:text-acture-blue">
          {item.label}
          <svg className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:text-acture-blue group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible"
        >
          <div className="rounded-2xl py-1.5 min-w-[200px] bg-white/95 backdrop-blur-md border border-slate-100 shadow-lg shadow-slate-200/50">
            {item.children.map((child) => {
              const childActive = pathname === child.href || pathname.startsWith(child.href + '/')
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className={`block px-5 py-2.5 text-sm font-medium tracking-wide transition-colors duration-150 rounded-xl mx-1.5 ${childActive ? 'text-acture-blue bg-acture-blue/5' : 'text-slate-700 hover:bg-slate-50 hover:text-acture-blue'}`}
                >
                  {child.label}
                </Link>
              )
            })}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      className={`relative py-1 text-[15px] font-medium tracking-wide no-underline transition-colors duration-200 group ${isLinkActive ? 'text-acture-blue' : 'text-slate-800 hover:text-acture-blue'}`}
    >
      {item.label}
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-acture-blue rounded-full transition-[width] duration-300 ease-out ${isLinkActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
      />
    </Link>
  )
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [pageSettings, setPageSettings] = useState<Record<string, string>>({})
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json().catch(() => ({})))
      .then((data: Record<string, string>) => setPageSettings(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  const leftFiltered = LEFT_ITEMS.filter((item) => isPageEnabled(pageSettings, item.key))
  const rightFiltered = RIGHT_ITEMS.filter((item) => isPageEnabled(pageSettings, item.key))
  const mobileFiltered = MOBILE_ITEMS.filter((item) => isPageEnabled(pageSettings, item.key))

  // Badge Central : logo 120px, cercle avec padding, dépasse sur le Hero
  const logoSize = 120
  const logoPadding = 12
  const circleSize = logoSize + logoPadding * 2

  return (
    <header
      className={`sticky top-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm shadow-slate-200/50 border-b border-slate-100/80' : 'bg-white'}`}
      style={{ marginBottom: -48 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop: Grid 3 colonnes (1fr auto 1fr), symétrique */}
        <div
          className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-x-14"
          style={{ minHeight: 64 }}
        >
          {/* Colonne 1 - Gauche */}
          <div className="flex items-center justify-end gap-8">
            {leftFiltered.map((item) => (
              <NavItem key={item.href} item={item} pathname={pathname} isActive={isActive} />
            ))}
          </div>

          {/* Colonne 2 - Logo centré, dépasse sur le Hero, sans bordure visible */}
          <div className="flex justify-center items-center px-4">
            <Link href="/" className="block relative transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]" style={{ transform: 'translateY(30%)' }}>
              <div
                className="rounded-full flex items-center justify-center overflow-hidden ring-2 ring-slate-100 ring-offset-2 shadow-lg shadow-slate-200/40"
                style={{
                  width: circleSize,
                  height: circleSize,
                  padding: logoPadding,
                  backgroundColor: '#fff',
                }}
              >
                <Image
                  src="/logo.jpg"
                  alt="Acture Logo"
                  width={logoSize}
                  height={logoSize}
                  className="rounded-full object-cover"
                  sizes="120px"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Colonne 3 - Droite */}
          <div className="flex items-center justify-start gap-8">
            {rightFiltered.map((item) => (
              <NavItem key={item.href} item={item} pathname={pathname} isActive={isActive} />
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex justify-between items-center" style={{ minHeight: 60 }}>
          <Link href="/" className="flex items-center">
            <div className="rounded-full overflow-hidden" style={{ width: 44, height: 44 }}>
              <Image src="/logo.jpg" alt="Acture Logo" width={44} height={44} className="rounded-full object-cover" sizes="44px" />
            </div>
          </Link>
          <button
            type="button"
            className="p-3 -mr-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <FaTimes size={20} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <FaBars size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <div className="py-4 space-y-0.5 border-t border-slate-100">
                {mobileFiltered.map((item, index) => {
                  const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                  return (
                    <motion.div
                      key={`${item.href}-${index}`}
                      initial={{ x: -12, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        className={`block px-5 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-colors duration-150 ${active ? 'text-acture-blue bg-acture-blue/10' : 'text-slate-800 hover:bg-slate-50'} ${item.indent ? 'pl-8' : ''}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
