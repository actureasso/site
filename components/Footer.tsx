import Link from 'next/link'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Acture Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Acture</h3>
            <p className="text-gray-300 mb-4">
              Deviens acteur de ton aventure
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Acture Asso */}
          <div>
            <h4 className="font-semibold mb-4">Acture Asso</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/asso" className="hover:text-white transition">
                  Présentation
                </Link>
              </li>
              <li>
                <Link href="/asso/projets" className="hover:text-white transition">
                  Projets & Actions
                </Link>
              </li>
            </ul>
          </div>

          {/* Acture Académie */}
          <div>
            <h4 className="font-semibold mb-4">Acture Académie</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/academie" className="hover:text-white transition">
                  Présentation
                </Link>
              </li>
              <li>
                <Link href="/academie/formations" className="hover:text-white transition">
                  Formations
                </Link>
              </li>
              <li>
                <Link href="/academie#inscriptions" className="hover:text-white transition">
                  Inscriptions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="font-semibold mb-4">Contact & Informations</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/soutien" className="hover:text-white transition">
                  Nous soutenir
                </Link>
              </li>
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

