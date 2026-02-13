'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import WelcomeModal from './WelcomeModal'

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[200] -translate-y-20 rounded-lg bg-acture-blue px-4 py-2 text-sm font-medium text-white shadow-lg transition focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-acture-blue focus:ring-offset-2"
      >
        Aller au contenu
      </a>
      <Header />
      <main id="main-content" className="min-h-screen" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <WelcomeModal />
    </>
  )
}
