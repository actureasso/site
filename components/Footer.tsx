'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaLinkedin, FaInstagram, FaTiktok } from 'react-icons/fa'

// Mêmes clés que le Header et les paramètres admin (ParametresPagesForm)
const ASSO_LINKS = [
  { href: '/asso', label: 'Présentation' },
  { href: '/asso/projets', label: 'Projets & Actions' },
]
const ACADEMIE_LINKS = [
  { href: '/academie', label: 'Présentation' },
  { href: '/academie/formations', label: 'Formations' },
  { href: '/academie#inscriptions', label: 'Inscriptions' },
]
// Liens "Contact & Informations" : mêmes clés que la nav (paramètres admin)
const CONTACT_ITEMS = [
  { href: '/actualites', label: 'Actualités', key: 'page_actualites_enabled' },
  { href: '/partenaires', label: 'Partenaires', key: 'page_partenaires_enabled' },
  { href: '/contact', label: 'Contact', key: 'page_contact_enabled' },
  { href: '/soutien', label: 'Nous soutenir', key: 'page_soutien_enabled' },
]

function isPageEnabled(settings: Record<string, string>, key: string): boolean {
  const val = settings[key]
  return val !== '0' && val !== 'false'
}

export default function Footer() {
  const [pageSettings, setPageSettings] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json().catch(() => ({})))
      .then((data: Record<string, string>) => setPageSettings(data))
      .catch(() => {})
  }, [])

  const assoEnabled = isPageEnabled(pageSettings, 'page_asso_enabled')
  const academieEnabled = isPageEnabled(pageSettings, 'page_academie_enabled')
  const contactLinksFiltered = CONTACT_ITEMS.filter((item) => isPageEnabled(pageSettings, item.key))

  const columnCount = 2 + (assoEnabled ? 1 : 0) + (academieEnabled ? 1 : 0)
  const gridColsClass =
    columnCount === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : columnCount === 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'

  return (
    <footer className="bg-gray-800 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className={`grid gap-8 ${gridColsClass}`}>
          {/* Acture Info - toujours affiché */}
          <div>
            <h3 className="text-xl font-bold mb-4">Acture</h3>
            <p className="text-gray-300 mb-4">
              Deviens acteur de ton aventure
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/acture.asso/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition" aria-label="Instagram Acture">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/acture-asso/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition" aria-label="LinkedIn Acture">
                <FaLinkedin size={20} />
              </a>
              <a href="https://www.tiktok.com/@acture.asso" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition" aria-label="TikTok Acture">
                <FaTiktok size={20} />
              </a>
            </div>
          </div>

          {/* Acture Asso - uniquement si activé dans les paramètres */}
          {assoEnabled && (
            <div>
              <h4 className="font-semibold mb-4">Acture Asso</h4>
              <ul className="space-y-2 text-gray-300">
                {ASSO_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-white transition">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Acture Académie - uniquement si activé */}
          {academieEnabled && (
            <div>
              <h4 className="font-semibold mb-4">Acture Académie</h4>
              <ul className="space-y-2 text-gray-300">
                {ACADEMIE_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-white transition">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact & Informations - mêmes liens que la nav (selon paramètres), légal toujours */}
          <div>
            <h4 className="font-semibold mb-4">Contact & Informations</h4>
            <ul className="space-y-2 text-gray-300">
              {contactLinksFiltered.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/mentions-legales" className="hover:text-white transition">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-white transition">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Acture. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
