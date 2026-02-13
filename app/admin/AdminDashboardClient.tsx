'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FaNewspaper,
  FaHandshake,
  FaFolderOpen,
  FaCalendarAlt,
  FaImages,
  FaGraduationCap,
  FaArrowRight,
  FaSmile,
  FaRocket,
} from 'react-icons/fa'

type Card = {
  href: string
  label: string
  count?: number
  sub?: string
  icon: React.ElementType
  gradient: string
  delay: number
}

const ADMIN_ONLY_HREFS = ['/admin/partenaires', '/admin/projets', '/admin/evenements', '/admin/formations']

export default function AdminDashboardClient({
  stats,
  userName,
  isAdmin: isAdminUser,
}: {
  stats: { articles: number; published: number; media: number; formations: number; evenements: number; projets: number; partenaires: number }
  userName?: string | null
  isAdmin?: boolean
}) {
  const allCards: Card[] = [
    {
      href: '/admin/actualites',
      label: 'Actualités',
      count: stats.articles,
      sub: `${stats.published} publiés`,
      icon: FaNewspaper,
      gradient: 'from-blue-500 to-indigo-600',
      delay: 0,
    },
    {
      href: '/admin/media',
      label: 'Média',
      count: stats.media,
      sub: 'fichiers',
      icon: FaImages,
      gradient: 'from-emerald-500 to-teal-600',
      delay: 0.05,
    },
    {
      href: '/admin/partenaires',
      label: 'Partenaires',
      icon: FaHandshake,
      gradient: 'from-amber-500 to-orange-600',
      delay: 0.1,
    },
    {
      href: '/admin/projets',
      label: 'Projets',
      count: stats.projets,
      icon: FaFolderOpen,
      gradient: 'from-violet-500 to-purple-600',
      delay: 0.15,
    },
    {
      href: '/admin/evenements',
      label: 'Événements',
      count: stats.evenements,
      icon: FaCalendarAlt,
      gradient: 'from-rose-500 to-pink-600',
      delay: 0.2,
    },
    {
      href: '/admin/formations',
      label: 'Formations',
      count: stats.formations,
      icon: FaGraduationCap,
      gradient: 'from-cyan-500 to-blue-600',
      delay: 0.25,
    },
  ]
  const cards = isAdminUser ? allCards : allCards.filter((c) => !ADMIN_ONLY_HREFS.includes(c.href))

  return (
    <div className="space-y-10">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-acture-blue via-blue-600 to-indigo-700 p-8 text-white shadow-2xl"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
            >
              <FaSmile className="text-acture-yellow" />
              Bienvenue !
            </motion.div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {userName ? `Salut ${userName},` : 'Tableau de bord'}
            </h1>
            <p className="mt-2 text-lg text-blue-100">
              Gérez le contenu du site Acture en toute simplicité. Tout est à portée de clic.
            </p>
          </div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden sm:block"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <FaRocket className="h-12 w-12 text-acture-yellow" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Quick access */}
      <div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 text-xl font-bold text-slate-800"
        >
          Accès rapide
        </motion.h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: card.delay }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={card.href}>
                <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-slate-300/50 border border-slate-100">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                  />
                  <div className="relative flex items-start gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <card.icon className="h-7 w-7" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-slate-800 transition-colors group-hover:text-acture-blue">
                        {card.label}
                      </h3>
                      {card.count != null && (
                        <p className="mt-0.5 text-sm text-slate-500">
                          {card.count} {card.sub ?? ''}
                        </p>
                      )}
                    </div>
                    <FaArrowRight className="h-5 w-5 shrink-0 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-acture-blue" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
