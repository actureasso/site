import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FaHandshake, FaBuilding, FaSchool, FaUsers, FaIndustry, FaArrowRight } from 'react-icons/fa'
import { prisma } from '@/lib/prisma'
import { isValidImageSrc } from '@/lib/image'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Partenaires',
  description: 'Nos partenaires : institutions, éducation, insertion professionnelle et entreprises. Acture Paris 17e et 18e.',
  path: '/partenaires',
})

const CATEGORY_ICONS: Record<string, typeof FaBuilding> = {
  institutions: FaBuilding,
  institution: FaBuilding,
  education: FaSchool,
  'éducation': FaSchool,
  qpv: FaUsers,
  insertion: FaUsers,
  entreprises: FaIndustry,
  entreprise: FaIndustry,
}

function getIcon(name: string) {
  const key = name.toLowerCase().split(/[\s&]+/)[0]
  return CATEGORY_ICONS[key] ?? FaHandshake
}

export default async function Partenaires() {
  const categories = await prisma.partenaireCategory.findMany({
    orderBy: { order: 'asc' },
    include: { partenaires: { orderBy: { order: 'asc' } } },
  })

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-r from-acture-blue to-acture-green text-white pt-24 md:pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <FaHandshake className="text-6xl mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Partenaires</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Acture travaille en collaboration avec de nombreux partenaires pour mener
            à bien ses missions d&apos;inclusion numérique et de formation
          </p>
        </div>
      </section>

      {categories.length === 0 ? (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-acture-blue/10 text-acture-blue mb-6">
                <FaHandshake className="h-10 w-10" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800 mb-2">Aucun partenaire pour le moment</h2>
              <p className="text-slate-600 text-center max-w-md mb-6">
                Les partenaires apparaîtront ici. Revenez bientôt ou contactez-nous pour en savoir plus.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-acture-blue px-6 py-3 font-medium text-white hover:bg-blue-700 transition"
              >
                Nous contacter
                <FaArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      ) : (
        categories.map((cat, idx) => {
          const Icon = getIcon(cat.name)
          const bgClass = idx % 2 === 0 ? '' : 'bg-gray-50'
          return (
            <section key={cat.id} className={`py-16 px-4 ${bgClass}`}>
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center mb-8">
                  <Icon className="text-3xl text-acture-blue mr-4" />
                  <h2 className="text-3xl font-bold text-acture-blue">{cat.name}</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.partenaires.map((p) => (
                    <div key={p.id} className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition">
                      <div className="h-24 rounded-lg flex items-center justify-center mb-4 overflow-hidden bg-gray-50">
                        {isValidImageSrc(p.logoUrl) ? (
                          <Image src={p.logoUrl} alt={p.name} width={96} height={96} className="object-contain" />
                        ) : (
                          <span className="text-gray-400 text-sm">Logo {p.name}</span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-800">
                        {p.url ? (
                          <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-acture-blue transition">
                            {p.name}
                          </a>
                        ) : (
                          p.name
                        )}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )
        })
      )}

      <section className="py-16 px-4 bg-gradient-to-r from-acture-blue to-acture-green text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Devenir partenaire</h2>
          <p className="text-xl mb-8">
            Vous souhaitez devenir partenaire d&apos;Acture ? Contactez-nous pour discuter
            des possibilités de collaboration.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-acture-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </div>
  )
}
