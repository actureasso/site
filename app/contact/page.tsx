import type { Metadata } from 'next'
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock, FaHeart } from 'react-icons/fa'
import ContactForm from './ContactForm'
import { prisma } from '@/lib/prisma'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description: 'Contactez Acture - Une question, un projet ? Écrivez-nous. Paris 17e et 18e.',
  path: '/contact',
})

export default async function Contact() {
  const settings = await prisma.siteSetting.findMany()
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]))

  const adresse = map.contact_adresse || '[Adresse du local à compléter]'
  const ville = map.contact_ville || 'Paris, France'
  const email = map.contact_email || 'contact@acture.fr'
  const emailAsso = map.contact_email_asso || 'asso@acture.fr'
  const emailAcademie = map.contact_email_academie || 'academie@acture.fr'
  const telephone = map.contact_telephone || '[Numéro à compléter]'
  const horaires = map.contact_horaires || 'Lundi - Vendredi : 9h - 18h'
  const helloassoUrl = map.helloasso_url || ''

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-acture-blue to-acture-green text-white pt-24 md:pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contactez-nous</h1>
          <p className="text-xl md:text-2xl">
            Une question ? Un projet ? N'hésitez pas à nous écrire
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Envoyez-nous un message</h2>
              <ContactForm />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-8">Nos coordonnées</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-2xl text-acture-blue mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Adresse</h3>
                    <p className="text-gray-700">
                      {adresse}
                      <br />
                      {ville}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaEnvelope className="text-2xl text-acture-blue mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-gray-700">
                      <a href={`mailto:${email}`} className="hover:text-acture-blue">
                        {email}
                      </a>
                    </p>
                    <p className="text-gray-700 mt-2">
                      <a href={`mailto:${emailAsso}`} className="hover:text-acture-blue">
                        {emailAsso}
                      </a>
                      <span className="text-sm text-gray-500"> (Acture Asso)</span>
                    </p>
                    <p className="text-gray-700">
                      <a href={`mailto:${emailAcademie}`} className="hover:text-acture-blue">
                        {emailAcademie}
                      </a>
                      <span className="text-sm text-gray-500"> (Acture Académie)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaPhone className="text-2xl text-acture-blue mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Téléphone</h3>
                    <p className="text-gray-700">
                      <a href={`tel:${telephone.replace(/\s/g, '')}`} className="hover:text-acture-blue">
                        {telephone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaClock className="text-2xl text-acture-blue mr-4 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Horaires</h3>
                    <p className="text-gray-700">{horaires}</p>
                  </div>
                </div>

                {helloassoUrl && (
                  <div className="flex items-start">
                    <FaHeart className="text-2xl text-acture-blue mr-4 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">HelloAsso</h3>
                      <a
                        href={helloassoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-acture-blue hover:underline"
                      >
                        Faire un don
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
