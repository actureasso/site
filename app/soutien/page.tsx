import Link from 'next/link'
import { FaHandHoldingHeart, FaUsers, FaHeart, FaDonate } from 'react-icons/fa'

export default function Soutien() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-acture-yellow to-acture-blue text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <FaHandHoldingHeart className="text-6xl mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Soutenez Acture</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Votre soutien nous permet de continuer nos actions d'inclusion numérique, 
            d'accompagnement de la jeunesse et de formation
          </p>
        </div>
      </section>

      {/* Modes de soutien */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Comment nous soutenir ?</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Don financier */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition">
              <FaDonate className="text-5xl text-acture-blue mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-acture-blue">Don financier</h3>
              <p className="text-gray-700 mb-6">
                Votre don nous permet de financer nos projets et d'acheter du matériel 
                pour nos ateliers et formations.
              </p>
              <ul className="text-left text-gray-600 space-y-2 mb-6">
                <li>• Déductible des impôts (66% pour les particuliers)</li>
                <li>• Reçu fiscal délivré</li>
                <li>• Impact direct sur nos actions</li>
              </ul>
              <button className="w-full bg-acture-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Faire un don
              </button>
            </div>

            {/* Mécénat */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition">
              <FaHandHoldingHeart className="text-5xl text-acture-green mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-acture-green">Mécénat d'entreprise</h3>
              <p className="text-gray-700 mb-6">
                Partenariats avec les entreprises pour soutenir nos actions et bénéficier 
                d'avantages fiscaux.
              </p>
              <ul className="text-left text-gray-600 space-y-2 mb-6">
                <li>• Réduction d'impôt de 60%</li>
                <li>• Visibilité de votre engagement</li>
                <li>• Partenariats sur mesure</li>
              </ul>
              <Link 
                href="/contact" 
                className="block w-full bg-acture-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Nous contacter
              </Link>
            </div>

            {/* Bénévolat */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition">
              <FaUsers className="text-5xl text-acture-yellow mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-acture-yellow">Bénévolat</h3>
              <p className="text-gray-700 mb-6">
                Rejoignez notre équipe de bénévoles et participez activement à nos projets 
                et actions de quartier.
              </p>
              <ul className="text-left text-gray-600 space-y-2 mb-6">
                <li>• Animation d'ateliers</li>
                <li>• Accompagnement scolaire</li>
                <li>• Organisation d'événements</li>
              </ul>
              <Link 
                href="/contact" 
                className="block w-full bg-acture-yellow text-acture-blue px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
              >
                Devenir bénévole
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">L'impact de votre soutien</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-acture-blue mb-2">20+</div>
              <p className="text-gray-700">Ateliers par an</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-acture-green mb-2">100+</div>
              <p className="text-gray-700">Personnes accompagnées</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-acture-yellow mb-2">3</div>
              <p className="text-gray-700">Formations certifiantes</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-acture-blue mb-2">2</div>
              <p className="text-gray-700">Quartiers d'intervention</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire de don */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Formulaire de don</h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="montant" className="block text-gray-700 font-medium mb-2">
                  Montant du don (€) *
                </label>
                <div className="flex gap-2 mb-2">
                  <button type="button" className="flex-1 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
                    25€
                  </button>
                  <button type="button" className="flex-1 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
                    50€
                  </button>
                  <button type="button" className="flex-1 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
                    100€
                  </button>
                  <button type="button" className="flex-1 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
                    Autre
                  </button>
                </div>
                <input
                  type="number"
                  id="montant"
                  name="montant"
                  min="1"
                  required
                  placeholder="Montant personnalisé"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-acture-blue focus:border-transparent"
                />
              </div>

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

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="rgpd"
                  name="rgpd"
                  required
                  className="mt-1 mr-2"
                />
                <label htmlFor="rgpd" className="text-sm text-gray-700">
                  J'accepte que mes données soient utilisées pour traiter mon don 
                  (conformément à la politique de confidentialité) *
                </label>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="fiscal"
                  name="fiscal"
                  className="mt-1 mr-2"
                />
                <label htmlFor="fiscal" className="text-sm text-gray-700">
                  Je souhaite recevoir un reçu fiscal (déductible à 66% des impôts)
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-acture-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Faire un don
              </button>
            </form>

            <p className="mt-6 text-sm text-gray-600 text-center">
              Les dons sont sécurisés et traités par notre partenaire de paiement.
              <br />
              Pour toute question, <Link href="/contact" className="text-acture-blue hover:underline">contactez-nous</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

