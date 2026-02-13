import type { Metadata } from 'next'
import Link from 'next/link'
import { FaHandHoldingHeart } from 'react-icons/fa'
import { prisma } from '@/lib/prisma'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Nous soutenir',
  description: 'Soutenez Acture - dons, bénévolat, mécénat. Inclusion numérique, jeunesse et formation. Paris 17e et 18e.',
  path: '/soutien',
})

export default async function Soutien() {
  const settings = await prisma.siteSetting.findMany()
  const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]))
  const helloassoUrl = settingsMap.helloasso_url?.trim() || 'https://www.helloasso.com/associations/acture'
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-acture-yellow to-acture-blue text-white pt-24 md:pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <FaHandHoldingHeart className="text-6xl mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Soutenez Acture</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Votre soutien nous permet de continuer nos actions d'inclusion numérique, 
            d'accompagnement de la jeunesse et de formation
          </p>
        </div>
      </section>

      {/* HelloAsso - Don */}
      <section id="formulaire-don" className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Faire un don</h2>
            <p className="text-gray-700 mb-6 text-center">
              Les dons sont sécurisés et traités par HelloAsso. Vous recevrez un reçu fiscal (déductible à 66% des impôts).
            </p>
            <a
              href={helloassoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-acture-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition text-center text-lg"
            >
              Faire un don via HelloAsso →
            </a>
            <p className="mt-6 text-sm text-gray-600 text-center">
              Pour toute question, <Link href="/contact" className="text-acture-blue hover:underline">contactez-nous</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

