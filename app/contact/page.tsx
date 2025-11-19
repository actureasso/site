import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock } from 'react-icons/fa'

export default function Contact() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-acture-blue to-acture-green text-white py-16 px-4">
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
            {/* Formulaire de contact */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Envoyez-nous un message</h2>
              
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acture-blue focus:border-transparent"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acture-blue focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="sujet" className="block text-gray-700 font-medium mb-2">
                    Sujet *
                  </label>
                  <select
                    id="sujet"
                    name="sujet"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acture-blue focus:border-transparent"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="asso">Acture Asso - Projets et actions</option>
                    <option value="academie">Acture Académie - Formations</option>
                    <option value="partenariat">Partenariat</option>
                    <option value="soutien">Soutien / Don</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acture-blue focus:border-transparent"
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
                    J'accepte que mes données soient utilisées pour traiter ma demande 
                    (conformément à la politique de confidentialité) *
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-acture-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Envoyer le message
                </button>
              </form>
            </div>

            {/* Informations de contact */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Nos coordonnées</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-2xl text-acture-blue mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Adresse</h3>
                    <p className="text-gray-700">
                      [Adresse du local à compléter]
                      <br />
                      Paris, France
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaEnvelope className="text-2xl text-acture-blue mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-gray-700">
                      <a href="mailto:contact@acture.fr" className="hover:text-acture-blue">
                        contact@acture.fr
                      </a>
                    </p>
                    <p className="text-gray-700 mt-2">
                      <a href="mailto:asso@acture.fr" className="hover:text-acture-blue">
                        asso@acture.fr
                      </a>
                      <span className="text-sm text-gray-500"> (Acture Asso)</span>
                    </p>
                    <p className="text-gray-700">
                      <a href="mailto:academie@acture.fr" className="hover:text-acture-blue">
                        academie@acture.fr
                      </a>
                      <span className="text-sm text-gray-500"> (Acture Académie)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaPhone className="text-2xl text-acture-blue mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Téléphone</h3>
                    <p className="text-gray-700">
                      <a href="tel:+33123456789" className="hover:text-acture-blue">
                        [Numéro à compléter]
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaClock className="text-2xl text-acture-blue mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Horaires</h3>
                    <p className="text-gray-700">
                      Lundi - Vendredi : 9h - 18h
                      <br />
                      [Horaires à compléter selon vos disponibilités]
                    </p>
                  </div>
                </div>
              </div>

              {/* Plan d'accès */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Plan d'accès</h3>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Carte à intégrer (Google Maps, OpenStreetMap, etc.)</p>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-4">Suivez-nous</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-2xl text-gray-600 hover:text-acture-blue transition">
                    <span className="sr-only">Facebook</span>
                    FB
                  </a>
                  <a href="#" className="text-2xl text-gray-600 hover:text-acture-blue transition">
                    <span className="sr-only">Twitter</span>
                    TW
                  </a>
                  <a href="#" className="text-2xl text-gray-600 hover:text-acture-blue transition">
                    <span className="sr-only">LinkedIn</span>
                    LI
                  </a>
                  <a href="#" className="text-2xl text-gray-600 hover:text-acture-blue transition">
                    <span className="sr-only">Instagram</span>
                    IG
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

