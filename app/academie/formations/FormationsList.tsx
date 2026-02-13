'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaClock, FaArrowLeft, FaFilePdf } from 'react-icons/fa'
import AnimatedCard from '@/components/AnimatedCard'
import AnimatedSection from '@/components/AnimatedSection'
import { isValidImageSrc } from '@/lib/image'

type FormationItem = {
  id: string
  title: string
  slug: string
  description: string | null
  duree: string | null
  prerequis: string | null
  link: string | null
  pdfLinks: string | null
  imageUrl: string | null
  order: number
}

function getPdfUrls(f: FormationItem): string[] {
  if (f.pdfLinks) {
    try {
      const arr = JSON.parse(f.pdfLinks)
      return Array.isArray(arr) ? arr.filter((u: unknown) => typeof u === 'string' && u) : []
    } catch {
      return []
    }
  }
  return f.link ? [f.link] : []
}

export default function FormationsList({ formations }: { formations: FormationItem[] }) {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-r from-acture-green to-primary-blue text-white pt-24 md:pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/academie"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-smooth"
            >
              <FaArrowLeft className="mr-2" />
              Retour à Acture Académie
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Formations</h1>
            <p className="text-xl md:text-2xl max-w-3xl">
              Découvrez notre catalogue complet de formations certifiantes et préqualifiantes
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {formations.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              Aucune formation enregistrée pour le moment.
            </p>
          ) : (
            <div className="space-y-12">
              {formations.map((formation, index) => (
                <AnimatedCard key={formation.id} delay={index * 0.1}>
                  <div className="bg-white rounded-lg shadow-lg p-8 hover-lift">
                    <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
                      {isValidImageSrc(formation.imageUrl) && (
                        <div className="relative w-full sm:w-56 h-44 rounded-lg overflow-hidden shrink-0">
                          <Image src={formation.imageUrl!} alt="" fill className="object-cover" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="bg-green-50 p-4 rounded-lg inline-block mb-4">
                          <FaGraduationCap className="text-4xl text-acture-green" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-acture-green">
                          {formation.title}
                        </h2>
                        {formation.prerequis && (
                          <p className="text-gray-600 mb-2">{formation.prerequis}</p>
                        )}
                        {formation.duree && (
                          <div className="flex items-center text-gray-600 text-sm mt-2">
                            <FaClock className="mr-2 text-acture-green" />
                            {formation.duree}
                          </div>
                        )}
                      </div>
                    </div>

                    {formation.description && (
                      <div className="mb-6">
                        <div className="text-gray-700 whitespace-pre-line">{formation.description}</div>
                      </div>
                    )}

                    <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-4 flex-wrap">
                      <Link
                        href="/academie#inscriptions"
                        className="inline-block bg-acture-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-smooth text-center"
                      >
                        S&apos;inscrire à cette formation
                      </Link>
                      {getPdfUrls(formation).map((url, i) => (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-smooth"
                        >
                          <FaFilePdf className="mr-2" />
                          {getPdfUrls(formation).length > 1 ? `PDF ${i + 1}` : 'Télécharger (PDF)'}
                        </a>
                      ))}
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Intéressé par une formation ?</h2>
            <p className="text-xl text-gray-700 mb-8">
              Contactez-nous pour plus d&apos;informations ou inscrivez-vous directement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/academie#inscriptions"
                className="bg-acture-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-smooth"
              >
                Formulaire d&apos;inscription
              </Link>
              <Link
                href="/contact"
                className="bg-white text-acture-green border-2 border-acture-green px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-smooth"
              >
                Nous contacter
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
