import Link from 'next/link'
import Image from 'next/image'
import { FaGraduationCap, FaCertificate, FaUsers, FaClock, FaBriefcase } from 'react-icons/fa'

export default function ActureAcademie() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-acture-green to-primary-blue text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Acture Académie</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Organisme de formation - Accompagnement vers les métiers du numérique, 
            de l'animation et de la transition écologique
          </p>
        </div>
      </section>

      {/* Présentation */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Présentation</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-acture-green">Notre vision</h3>
              <p className="text-gray-700 mb-4">
                Acture Académie accompagne les jeunes et adultes vers les métiers du numérique, 
                de l'animation et de la transition écologique.
              </p>
              <p className="text-gray-700 mb-6">
                Nous proposons des formations certifiantes et préqualifiantes adaptées aux besoins 
                du marché et aux parcours individuels.
              </p>
              {/* Image diplome */}
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
              <h3 className="text-2xl font-semibold mb-4 text-acture-green">Notre historique</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <FaCertificate className="text-acture-green mr-3 mt-1" />
                  <div>
                    <strong>REMN</strong> - Responsable d'Espace de Médiation Numérique (Bac +2)
                  </div>
                </li>
                <li className="flex items-start">
                  <FaCertificate className="text-acture-green mr-3 mt-1" />
                  <div>
                    <strong>Re Connect</strong> - Paris Fabrik (Reconditionnement d'outils numériques)
                  </div>
                </li>
                <li className="flex items-start">
                  <FaCertificate className="text-acture-green mr-3 mt-1" />
                  <div>
                    <strong>VIA</strong> - Paris Hospitalités (Vers l'Insertion par l'Animation)
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Formations */}
      <section id="formations" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Catalogue des Formations</h2>
          
          <div className="space-y-8">
            {/* REMN */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-start mb-6">
                <FaGraduationCap className="text-4xl text-acture-green mr-4" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-acture-green">
                    REMN - Responsable d'Espace de Médiation Numérique
                  </h3>
                  <p className="text-gray-600 mb-4">Niveau Bac +2</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="flex items-center mb-3">
                    <FaClock className="text-acture-green mr-2" />
                    <strong>Durée :</strong>
                  </div>
                  <p className="text-gray-700 ml-6">6 mois de cours + 2 mois de stage</p>
                </div>
                
                <div>
                  <div className="flex items-center mb-3">
                    <FaUsers className="text-acture-green mr-2" />
                    <strong>Public :</strong>
                  </div>
                  <p className="text-gray-700 ml-6">Jeunes 18-30 ans, personnes en reconversion</p>
                </div>
              </div>

              <div className="mb-6">
                <strong className="text-gray-800 block mb-2">Compétences visées :</strong>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Médiation numérique</li>
                  <li>Employabilité et insertion professionnelle</li>
                  <li>Gestion d'EPN (Espace Public Numérique)</li>
                  <li>Accompagnement du public</li>
                  <li>Pédagogie fablab</li>
                </ul>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <FaBriefcase className="text-acture-green mr-2" />
                  <strong className="text-gray-800">Débouchés :</strong>
                </div>
                <p className="text-gray-700 ml-6">
                  Animateur numérique, médiateur, coordinateur de fablab, responsable EPN
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Modalités :</strong> Formation initiale - Stage obligatoire
                </p>
              </div>
            </div>

            {/* Re Connect */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-start mb-6">
                <FaGraduationCap className="text-4xl text-acture-green mr-4" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-acture-green">
                    Re Connect - Formation de Reconditionnement d'outils numériques
                  </h3>
                  <p className="text-gray-600 mb-2">Paris Fabrik – Transition écologique & éco-numérique</p>
                  <p className="text-sm text-gray-500">Préqualification</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <FaClock className="text-acture-green mr-2" />
                  <strong>Durée :</strong>
                  <span className="ml-2 text-gray-700">2 mois de cours + 1 mois de stage</span>
                </div>
              </div>

              <div className="mb-6">
                <strong className="text-gray-800 block mb-2">Objectifs :</strong>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Diagnostic et réparation basique</li>
                  <li>Réinstallation systèmes</li>
                  <li>Tri, recyclage, réemploi</li>
                  <li>Éco-conception numérique</li>
                </ul>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <FaBriefcase className="text-acture-green mr-2" />
                  <strong className="text-gray-800">Débouchés :</strong>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-6">
                  <li>Entrée en titre RNCP "Agent de reconditionnement"</li>
                  <li>Missions en fablab</li>
                  <li>Emploi direct si niveau adéquat</li>
                </ul>
              </div>
            </div>

            {/* VIA */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-start mb-6">
                <FaGraduationCap className="text-4xl text-acture-green mr-4" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-acture-green">
                    VIA - Vers l'Insertion par l'Animation
                  </h3>
                  <p className="text-gray-600 mb-2">Paris Hospitalités – Préparation aux métiers de l'animation</p>
                  <p className="text-sm text-gray-500">Préqualification</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <FaClock className="text-acture-green mr-2" />
                  <strong>Durée :</strong>
                  <span className="ml-2 text-gray-700">2 mois de cours + 1 mois de stage</span>
                </div>
              </div>

              <div className="mb-6">
                <strong className="text-gray-800 block mb-2">Compétences :</strong>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Animation sportive et culturelle</li>
                  <li>Gestion de groupe</li>
                  <li>Montage de projet</li>
                  <li>Inclusion et pédagogie</li>
                </ul>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <FaBriefcase className="text-acture-green mr-2" />
                  <strong className="text-gray-800">Suite de parcours :</strong>
                </div>
                <p className="text-gray-700 ml-6">
                  BPJEPS, animation périscolaire, centres de loisirs, service civique
                </p>
              </div>
            </div>
          </div>
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
                  <option value="remn">REMN - Responsable d'Espace de Médiation Numérique</option>
                  <option value="reconnect">Re Connect - Reconditionnement d'outils numériques</option>
                  <option value="via">VIA - Vers l'Insertion par l'Animation</option>
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
                  J'accepte que mes données soient utilisées pour traiter ma candidature 
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
              <h4 className="font-semibold mb-4">Points d'information</h4>
              <p className="text-gray-700 mb-4">
                Pour plus d'informations sur les conditions d'entrée et les documents à fournir, 
                contactez-nous directement.
              </p>
              <Link 
                href="/contact" 
                className="text-acture-green hover:underline"
              >
                Nous contacter →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

