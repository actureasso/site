'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <motion.header 
      className={`glass sticky top-0 z-50 transition-all duration-300 backdrop-blur-md border-b border-gray-200/50 ${scrolled ? 'shadow-modern-lg' : 'shadow-modern'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo.jpg" 
              alt="Acture Logo" 
              width={40} 
              height={40}
              className="rounded-md object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <motion.div whileHover={{ y: -2 }}>
              <Link 
                href="/" 
                className={`transition-smooth relative group ${
                  isActive('/') 
                    ? 'text-acture-blue font-semibold' 
                    : 'text-gray-700 hover:text-acture-blue'
                }`}
              >
                Accueil
                <span className={`absolute bottom-0 left-0 h-0.5 bg-acture-blue transition-all duration-300 ${
                  isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            </motion.div>
            <div className="relative group">
              <motion.button 
                className={`transition-smooth flex items-center ${
                  isActive('/asso') 
                    ? 'text-acture-blue font-semibold' 
                    : 'text-gray-700 hover:text-acture-blue'
                }`}
                whileHover={{ y: -2 }}
              >
                Acture Asso
                <motion.svg 
                  className="ml-1 h-4 w-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>
              <motion.div 
                className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg"
                initial={{ opacity: 0, y: -10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link 
                  href="/asso" 
                  className={`block px-4 py-2 transition-smooth ${
                    pathname === '/asso' 
                      ? 'bg-blue-50 text-acture-blue font-semibold' 
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  Présentation
                </Link>
                <Link 
                  href="/asso/projets" 
                  className={`block px-4 py-2 transition-smooth ${
                    pathname === '/asso/projets' 
                      ? 'bg-blue-50 text-acture-blue font-semibold' 
                      : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  Projets & Actions
                </Link>
              </motion.div>
            </div>
            <div className="relative group">
              <motion.button 
                className={`transition-smooth flex items-center ${
                  isActive('/academie') 
                    ? 'text-acture-green font-semibold' 
                    : 'text-gray-700 hover:text-acture-green'
                }`}
                whileHover={{ y: -2 }}
              >
                Acture Académie
                <motion.svg 
                  className="ml-1 h-4 w-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>
              <motion.div 
                className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg"
                initial={{ opacity: 0, y: -10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link 
                  href="/academie" 
                  className={`block px-4 py-2 transition-smooth ${
                    pathname === '/academie' 
                      ? 'bg-green-50 text-acture-green font-semibold' 
                      : 'text-gray-700 hover:bg-green-50'
                  }`}
                >
                  Présentation
                </Link>
                <Link 
                  href="/academie/formations" 
                  className={`block px-4 py-2 transition-smooth ${
                    pathname === '/academie/formations' 
                      ? 'bg-green-50 text-acture-green font-semibold' 
                      : 'text-gray-700 hover:bg-green-50'
                  }`}
                >
                  Formations
                </Link>
                <Link 
                  href="/academie#inscriptions" 
                  className="block px-4 py-2 text-gray-700 hover:bg-green-50 transition-smooth"
                >
                  Inscriptions
                </Link>
              </motion.div>
            </div>
            <motion.div whileHover={{ y: -2 }}>
              <Link 
                href="/actualites" 
                className={`transition-smooth relative group ${
                  isActive('/actualites') 
                    ? 'text-acture-blue font-semibold' 
                    : 'text-gray-700 hover:text-acture-blue'
                }`}
              >
                Actualités
                <span className={`absolute bottom-0 left-0 h-0.5 bg-acture-blue transition-all duration-300 ${
                  isActive('/actualites') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link 
                href="/partenaires" 
                className={`transition-smooth relative group ${
                  isActive('/partenaires') 
                    ? 'text-acture-blue font-semibold' 
                    : 'text-gray-700 hover:text-acture-blue'
                }`}
              >
                Partenaires
                <span className={`absolute bottom-0 left-0 h-0.5 bg-acture-blue transition-all duration-300 ${
                  isActive('/partenaires') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }}>
              <Link 
                href="/contact" 
                className={`transition-smooth relative group ${
                  isActive('/contact') 
                    ? 'text-acture-blue font-semibold' 
                    : 'text-gray-700 hover:text-acture-blue'
                }`}
              >
                Contact
                <span className={`absolute bottom-0 left-0 h-0.5 bg-acture-blue transition-all duration-300 ${
                  isActive('/contact') ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaTimes size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaBars size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden py-4 space-y-2"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {[
                { href: "/", label: "Accueil" },
                { href: "/asso", label: "Acture Asso" },
                { href: "/asso/projets", label: "Projets & Actions", indent: true },
                { href: "/academie", label: "Acture Académie" },
                { href: "/academie/formations", label: "Formations", indent: true },
                { href: "/actualites", label: "Actualités" },
                { href: "/partenaires", label: "Partenaires" },
                { href: "/contact", label: "Contact" },
              ].map((item, index) => {
                const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                return (
                  <motion.div
                    key={item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={item.href}
                      className={`block px-4 py-2 transition-smooth ${
                        active 
                          ? 'bg-blue-50 text-acture-blue font-semibold' 
                          : 'text-gray-700 hover:bg-blue-50'
                      } ${item.indent ? 'pl-8' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

