import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FaGraduationCap, FaCertificate, FaClock, FaFilePdf, FaArrowRight } from 'react-icons/fa'
import { prisma } from '@/lib/prisma'
import { isValidImageSrc } from '@/lib/image'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Acture Académie',
  description: 'Organisme de formation - Formations certifiantes et préqualifiantes : médiation numérique, animation, transition écologique. Paris.',
  path: '/academie',
})

export default async function ActureAcademie() {
  const [settingsRows, formations] = await Promise.all([
    prisma.siteSetting.findMany(),
    prisma.formation.findMany({ orderBy: { order: 'asc' } }),
  ])
  type FormationItem = (typeof formations)[number]
  function getPdfUrls(f: FormationItem): string[] {
    const pdfLinks = (f as { pdfLinks?: string | null }).pdfLinks
    if (pdfLinks) {
      try {
        const arr = JSON.parse(pdfLinks)
        return Array.isArray(arr) ? arr.filter((u: unknown) => typeof u === 'string' && u) : []
      } catch {
        return []
      }
    }
    return f.link ? [f.link] : []
  }
  const settings: Record<string, string> = Object.fromEntries(
    settingsRows.map((s: { key: string; value: string }) => [s.key, s.value])
  )

  const heroTitle = settings.academie_hero_title?.trim() || 'Acture Académie'
  const heroSubtitle =
    settings.academie_hero_subtitle?.trim() ||
    "Organisme de formation - Accompagnement vers les métiers du numérique, de l'animation et de la transition écologique"
  const ofNumber = settings.academie_of_number?.trim() || '11757186775'
  const visionText = settings.academie_vision?.trim() || ''

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-acture-green to-primary-blue text-white pt-24 md:pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{heroTitle}</h1>
          <p className="text-xl md:text-2xl max-w-3xl">{heroSubtitle}</p>
        </div>
      </section>

      {/* Présentation */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Présentation</h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 text-center">
            <p className="text-gray-700">
              <strong>N° de déclaration d&apos;activité (OF) :</strong> {ofNumber}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-acture-green">Notre vision</h3>
              {visionText ? (
                <div className="text-gray-700 mb-6 whitespace-pre-line">{visionText}</div>
              ) : (
                <>
                  <p className="text-gray-700 mb-4">
                    Acture Académie accompagne les jeunes et adultes vers les métiers du numérique, de
                    l&apos;animation et de la transition écologique.
                  </p>
                  <p className="text-gray-700 mb-6">
                    Nous proposons des formations certifiantes et préqualifiantes adaptées aux besoins du
                    marché et aux parcours individuels.
                  </p>
                </>
              )}
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image
                  src="/diplome.jpg"
                  alt="Diplôme Acture Académie"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-acture-green">Nos formations</h3>
              {formations.length === 0 ? (
                <p className="text-gray-600">Le catalogue des formations sera prochainement disponible.</p>
              ) : (
                <ul className="space-y-3 text-gray-700">
                  {formations.map((f: FormationItem) => (
                    <li key={f.id} className="flex items-start">
                      <FaCertificate className="text-acture-green mr-3 mt-1 shrink-0" />
                      <Link
                        href="/academie/formations"
                        className="hover:text-acture-green hover:underline"
                      >
                        {f.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue des Formations */}
      <section id="formations" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Catalogue des Formations</h2>

          {formations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-acture-blue/10 text-acture-blue mb-6">
                <FaGraduationCap className="h-10 w-10" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800 mb-2">Aucune formation pour le moment</h2>
              <p className="text-slate-600 text-center max-w-md mb-6">
                Les prochaines formations apparaîtront ici. Revenez bientôt ou contactez-nous pour en savoir plus.
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
            <div className="space-y-8">
              {formations.map((f: FormationItem) => (
                <div key={f.id} className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    {isValidImageSrc(f.imageUrl) && (
                      <div className="relative w-full sm:w-48 h-40 rounded-lg overflow-hidden shrink-0">
                        <Image src={f.imageUrl} alt="" fill className="object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 text-acture-green">{f.title}</h3>
                      {f.prerequis && (
                        <p className="text-gray-600 mb-2">{f.prerequis}</p>
                      )}
                      {f.duree && (
                        <div className="flex items-center mb-3 text-gray-700">
                          <FaClock className="text-acture-green mr-2" />
                          <span>{f.duree}</span>
                        </div>
                      )}
                      {f.description && (
                        <p className="text-gray-700 mb-4 line-clamp-3">{f.description}</p>
                      )}
                      <div className="flex flex-wrap gap-3">
                        <Link
                          href="/academie/formations"
                          className="inline-flex items-center bg-acture-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                          Voir la fiche
                          <FaArrowRight className="ml-2" />
                        </Link>
                        {getPdfUrls(f).map((url, i) => (
                          <a
                            key={i}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                          >
                            <FaFilePdf className="mr-2" />
                            {getPdfUrls(f).length > 1 ? `PDF ${i + 1}` : 'Documentation (PDF)'}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modalités pédagogiques */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Modalités pédagogiques</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-acture-green">Approche par projet</h3>
              <p className="text-gray-700">
                Apprentissage basé sur des projets concrets et pratiques
              </p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-acture-green">Alternance pratique</h3>
              <p className="text-gray-700">
                Alternance entre ateliers théoriques et pratique terrain
              </p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-acture-green">Pédagogie active</h3>
              <p className="text-gray-700">
                Utilisation du fablab et de projets concrets pour apprendre
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inscriptions */}
      <section id="inscriptions" className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Inscriptions</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-6 text-acture-green">Formulaire de candidature</h3>

            <form className="space-y-6">
              <div>
                <label htmlFor="nom" className="block text-gray-700 font-medium mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acture-green focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="prenom" className="block text-gray-700 font-medium mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acture-green focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acture-green focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="telephone" className="block text-gray-700 font-medium mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acture-green focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="formation" className="block text-gray-700 font-medium mb-2">
                  Formation souhaitée *
                </label>
                <select
                  id="formation"
                  name="formation"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acture-green focus:border-transparent"
                >
                  <option value="">Sélectionnez une formation</option>
                  {formations.map((f: FormationItem) => (
                    <option key={f.id} value={f.slug}>
                      {f.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Message (optionnel)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acture-green focus:border-transparent"
                />
              </div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="rgpd"
                  name="rgpd"
                  required
                  className="mt-1 mr-2"
                />
                <label htmlFor="rgpd" className="text-sm text-gray-700">
                  J&apos;accepte que mes données soient utilisées pour traiter ma candidature
                  (conformément à la politique de confidentialité) *
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-acture-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Envoyer ma candidature
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="font-semibold mb-4">Points d&apos;information</h4>
              <p className="text-gray-700 mb-4">
                Pour plus d&apos;informations sur les conditions d&apos;entrée et les documents à
                fournir, contactez-nous directement.
              </p>
              <Link href="/contact" className="text-acture-green hover:underline">
                Nous contacter →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
