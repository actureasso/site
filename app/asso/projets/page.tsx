import type { Metadata } from 'next'
import Link from 'next/link'
import { FaUsers, FaLaptop, FaChild, FaPlane, FaBriefcase, FaNetworkWired, FaArrowRight } from 'react-icons/fa'
import { prisma } from '@/lib/prisma'
import ProjetBlockRender from '@/components/ProjetBlockRender'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Projets & Actions de quartier | Acture Asso',
  description: 'Découvrez les projets d\'Acture Asso : Quartier Connect, AIN, CLIC, séjours jeunes et insertion professionnelle. Paris 17e et 18e.',
  path: '/asso/projets',
})

const ICON_MAP: Record<string, typeof FaUsers> = {
  FaUsers,
  FaLaptop,
  FaChild,
  FaPlane,
  FaBriefcase,
  FaNetworkWired,
}

export default async function Projets() {
  const projets = await prisma.projet.findMany({
    orderBy: { order: 'asc' },
    include: { blocks: { orderBy: { order: 'asc' } } },
  })

  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-r from-acture-blue to-primary-blue text-white pt-24 md:pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Projets & Actions de quartier</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Découvrez tous nos projets et actions menés dans les quartiers prioritaires
          </p>
        </div>
      </section>

      {projets.length === 0 ? (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-acture-blue/10 text-acture-blue mb-6">
                <FaUsers className="h-10 w-10" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800 mb-2">Aucun projet pour le moment</h2>
              <p className="text-slate-600 text-center max-w-md mb-6">
                Les prochains projets et actions apparaîtront ici. Revenez bientôt ou contactez-nous pour en savoir plus.
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
        projets.map((projet, idx) => {
          const Icon = (projet.icon && ICON_MAP[projet.icon]) ?? FaUsers
          const bgClass = idx % 2 === 0 ? '' : 'bg-gray-50'
          return (
            <section key={projet.id} id={projet.slug} className={`py-16 px-4 ${bgClass}`}>
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center mb-8">
                  <Icon className="text-4xl text-acture-blue mr-4" />
                  <h2 className="text-3xl font-bold text-acture-blue">{projet.title}</h2>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                  {projet.subtitle && <h3 className="text-2xl font-semibold mb-4 text-gray-800">{projet.subtitle}</h3>}
                  {projet.description && <p className="text-gray-700 mb-6">{projet.description}</p>}
                  {projet.blocks.map((block) => (
                    <ProjetBlockRender key={block.id} block={{ type: block.type, content: block.content }} />
                  ))}
                </div>
              </div>
            </section>
          )
        })
      )}

      <section className="py-16 px-4 bg-acture-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Rejoignez nos projets !</h2>
          <p className="text-xl mb-8">Vous souhaitez participer à nos actions ou bénéficier de nos services ?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-acture-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Nous contacter
            </Link>
            <Link href="/asso" className="bg-acture-yellow text-acture-blue px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition">
              Retour à Acture Asso
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
