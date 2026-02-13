'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaPlus, FaEdit } from 'react-icons/fa'
export default function AdminActualitesClient({ articles }: { articles: Array<{ id: string; title: string; date: Date; category: string; published: boolean }> }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Actualités</h1>
          <p className="mt-1 text-slate-600">Gérez les articles et actualités du site.</p>
        </div>
        <Link
          href="/admin/actualites/nouveau"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-acture-blue to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:shadow-xl hover:from-blue-700 hover:to-indigo-700"
        >
          <FaPlus className="h-4 w-4" />
          Nouvel article
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-200/50 border border-slate-100"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50/80">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Titre
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Catégorie
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Statut
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {articles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <p className="text-slate-500">Aucun article. Créez-en un pour commencer !</p>
                    <Link
                      href="/admin/actualites/nouveau"
                      className="mt-4 inline-flex items-center gap-2 text-acture-blue font-medium hover:underline"
                    >
                      <FaPlus className="h-4 w-4" />
                      Créer un article
                    </Link>
                  </td>
                </tr>
              ) : (
                articles.map((article, i) => (
                  <motion.tr
                    key={article.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="transition-colors hover:bg-slate-50/50"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-900">{article.title}</span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                      {new Date(article.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                      {article.category}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          article.published
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {article.published ? 'Publié' : 'Brouillon'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <Link
                        href={`/admin/actualites/${article.id}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-acture-blue/10 px-3 py-2 text-sm font-medium text-acture-blue transition hover:bg-acture-blue/20"
                      >
                        <FaEdit className="h-4 w-4" />
                        Modifier
                      </Link>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
