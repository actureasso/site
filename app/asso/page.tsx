import type { Metadata } from 'next'
import Link from 'next/link'
import { FaTrophy, FaMapMarkerAlt, FaUsers, FaHandshake } from 'react-icons/fa'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Acture Asso',
  description: 'Vie associative, projets et actions de quartier, insertion professionnelle. Acture - Paris 17e et 18e.',
  path: '/asso',
})

export default function ActureAsso() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-acture-blue to-primary-blue text-white pt-24 md:pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Acture Asso</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Vie associative, projets, actions de quartier, insertion professionnelle
          </p>
        </div>
      </section>

      {/* Présentation */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Présentation de l'association</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-acture-blue">Notre histoire</h3>
              <p className="text-gray-700 mb-4">
                Acture Asso est une association dédiée à l'inclusion numérique, à l'accompagnement 
                de la jeunesse et à l'insertion professionnelle dans les quartiers prioritaires 
                de Paris.
              </p>
              <p className="text-gray-700">
                Nous intervenons principalement dans les QPV du 17e et 18e arrondissement, 
                notamment à Porte de St-Ouen et Pouchet, pour créer du lien social et favoriser 
                la participation citoyenne.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-acture-blue">Nos valeurs</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-acture-blue mr-2">•</span>
                  <span>Inclusion numérique pour tous</span>
                </li>
                <li className="flex items-start">
                  <span className="text-acture-blue mr-2">•</span>
                  <span>Accompagnement de la jeunesse</span>
                </li>
                <li className="flex items-start">
                  <span className="text-acture-blue mr-2">•</span>
                  <span>Insertion professionnelle</span>
                </li>
                <li className="flex items-start">
                  <span className="text-acture-blue mr-2">•</span>
                  <span>Création de lien social</span>
                </li>
                <li className="flex items-start">
                  <span className="text-acture-blue mr-2">•</span>
                  <span>Innovation et créativité</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Zones d'intervention */}
          <div className="bg-blue-50 rounded-lg p-8 mb-12">
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-3xl text-acture-blue mr-4" />
              <h3 className="text-2xl font-semibold text-acture-blue">Zones d'intervention</h3>
            </div>
            <p className="text-gray-700 mb-4">
              <strong>Quartiers Prioritaires de la Ville (QPV) :</strong>
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>17e arrondissement : Porte de St-Ouen</li>
              <li>18e arrondissement : Pouchet</li>
            </ul>
          </div>

          {/* Récompenses */}
          <div className="bg-yellow-50 rounded-lg p-8 mb-12">
            <div className="flex items-center mb-4">
              <FaTrophy className="text-3xl text-acture-yellow mr-4" />
              <h3 className="text-2xl font-semibold text-acture-yellow">Nos reconnaissances</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Paris Fabrik</h4>
                <p className="text-sm text-gray-600">Lauréat - Projet Re Connect</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Paris Hospitalités</h4>
                <p className="text-sm text-gray-600">Lauréat - Projet VIA</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Budget Participatif</h4>
                <p className="text-sm text-gray-600">Projet lauréat</p>
              </div>
            </div>
          </div>

          {/* Partenaires */}
          <div className="bg-green-50 rounded-lg p-8">
            <div className="flex items-center mb-4">
              <FaHandshake className="text-3xl text-acture-green mr-4" />
              <h3 className="text-2xl font-semibold text-acture-green">Nos partenaires</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <ul className="space-y-2">
                <li>• Mairie de Paris</li>
                <li>• Centres sociaux</li>
                <li>• Réseau QPV 17-18</li>
                <li>• Écoles et établissements scolaires</li>
              </ul>
              <ul className="space-y-2">
                <li>• Missions locales</li>
                <li>• Associations partenaires</li>
                <li>• Entreprises locales</li>
                <li>• Institutions publiques</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projets & Actions */}
      <section id="projets" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Projets & Actions de quartier</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Quartier Connect */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-4 text-acture-blue">Quartier Connect</h3>
              <p className="text-gray-700 mb-4">
                Animation de l'espace public pour créer du lien entre habitants et favoriser 
                la participation citoyenne.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>• Mercredis du Talus</li>
                <li>• Fêtes de quartier</li>
                <li>• Ateliers créatifs et numériques</li>
                <li>• Fablab mobile</li>
                <li>• Jeu & cohésion sociale</li>
              </ul>
              <Link href="/asso/projets#quartier-connect" className="text-acture-blue hover:underline">
                En savoir plus →
              </Link>
            </div>

            {/* AIN */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-4 text-acture-blue">AIN - Ateliers d'Inclusion Numérique</h3>
              <p className="text-gray-700 mb-4">
                Accompagnement des adultes, seniors et personnes éloignées du numérique.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>• Smartphone et tablettes</li>
                <li>• Sécurité en ligne</li>
                <li>• Démarches administratives</li>
                <li>• Bureautique de base</li>
              </ul>
              <Link href="/asso/projets#ain" className="text-acture-blue hover:underline">
                En savoir plus →
              </Link>
            </div>

            {/* CLIC */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-4 text-acture-blue">CLIC - Accompagnement scolaire</h3>
              <p className="text-gray-700 mb-4">
                Soutien scolaire et éveil à la culture numérique pour les jeunes.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>• Soutien scolaire primaire/collège</li>
                <li>• Robotique et impression 3D</li>
                <li>• Création de stickers</li>
                <li>• Flocage textile</li>
                <li>• Fablab jeunes 7-14 ans</li>
              </ul>
              <Link href="/asso/projets#clic" className="text-acture-blue hover:underline">
                En savoir plus →
              </Link>
            </div>

            {/* Séjours jeunes */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-4 text-acture-blue">Séjours jeunes</h3>
              <p className="text-gray-700 mb-4">
                Séjours combinant loisir et numérique pour développer l'autonomie et la créativité.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>• Séjours à Marseille (7 jours)</li>
                <li>• Projets Horizon Connect</li>
                <li>• Rencontres professionnelles</li>
                <li>• Immersion numérique</li>
              </ul>
              <Link href="/asso/projets#sejours" className="text-acture-blue hover:underline">
                En savoir plus →
              </Link>
            </div>

            {/* Insertion professionnelle */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-4 text-acture-blue">Accompagnement à l&apos;insertion</h3>
              <p className="text-gray-700 mb-4">
                Programme &quot;Réussite Connect&quot; pour accompagner vers l&apos;emploi.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>• Ateliers CV et coaching</li>
                <li>• Simulation d&apos;entretiens</li>
                <li>• Orientation professionnelle</li>
                <li>• Mise en réseau avec entreprises</li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link href="/asso/projets#insertion" className="text-acture-blue hover:underline">
                  En savoir plus →
                </Link>
                <Link 
                  href="/academie" 
                  className="inline-flex items-center bg-acture-green text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
                >
                  Formations certifiantes (Acture Académie) →
                </Link>
              </div>
            </div>

            {/* Réseau Numérique Parisien */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-4 text-acture-blue">Réseau Numérique Parisien</h3>
              <p className="text-gray-700 mb-4">
                Coopération inter-association et mutualisation de matériel numérique.
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-4">
                <li>• Coopération inter-association</li>
                <li>• Mutualisation de matériel</li>
                <li>• Organisation d'événements</li>
              </ul>
              <Link href="/asso/projets#reseau" className="text-acture-blue hover:underline">
                En savoir plus →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-acture-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Rejoignez nos projets !</h2>
          <p className="text-xl mb-8">
            Participez à nos ateliers, bénévolat ou soutenez nos actions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/asso/projets" 
              className="bg-white text-acture-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Découvrir nos projets
            </Link>
            <Link 
              href="/contact" 
              className="bg-acture-yellow text-acture-blue px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

