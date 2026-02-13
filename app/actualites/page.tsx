import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FaCalendarAlt, FaUser, FaArrowRight, FaNewspaper } from 'react-icons/fa'
import { prisma } from '@/lib/prisma'
import { isValidImageSrc } from '@/lib/image'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Actualités & Événements',
  description: 'Suivez les dernières actualités, projets et événements d\'Acture Asso et Acture Académie. Paris 17e et 18e.',
  path: '/actualites',
})

export default async function Actualites() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { date: 'desc' },
  })

  type ArticleItem = (typeof articles)[number]
  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-acture-blue to-acture-green text-white pt-24 md:pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Actualités & Événements</h1>
          <p className="text-xl md:text-2xl">
            Suivez nos dernières actualités, projets et événements
          </p>
        </div>
      </section>

      {/* Liste des articles */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-acture-blue/10 text-acture-blue mb-6">
                  <FaNewspaper className="h-10 w-10" />
                </div>
                <h2 className="text-xl font-semibold text-slate-800 mb-2">Aucune actualité pour le moment</h2>
                <p className="text-slate-600 text-center max-w-md mb-6">
                  Les prochaines actualités et événements apparaîtront ici. Revenez bientôt ou contactez-nous pour en savoir plus.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-acture-blue px-6 py-3 font-medium text-white hover:bg-blue-700 transition"
                >
                  Nous contacter
                  <FaArrowRight className="h-4 w-4" />
                </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article: ArticleItem) => (
                <article key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                  <div className="relative h-48 bg-gradient-to-r from-acture-blue to-acture-green">
                    {isValidImageSrc(article.imageUrl) ? (
                      <Image
                        src={article.imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-white text-sm">
                        Image à ajouter
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <FaCalendarAlt className="mr-2" />
                      <span>{formatDate(article.date)}</span>
                      <span className="mx-2">•</span>
                      <span className="px-2 py-1 bg-blue-100 text-acture-blue rounded text-xs">
                        {article.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold mb-3 text-gray-800">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <FaUser className="mr-2" />
                        <span>{article.author}</span>
                      </div>
                      <Link 
                        href={`/actualites/${article.slug}`}
                        className="text-acture-blue hover:text-acture-green transition flex items-center"
                      >
                        Lire la suite
                        <FaArrowRight className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

