'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaClock, FaUsers, FaBriefcase, FaCheckCircle, FaArrowLeft } from 'react-icons/fa'
import AnimatedSection from '@/components/AnimatedSection'
import AnimatedCard from '@/components/AnimatedCard'

export default function Formations() {
  const formations = [
    {
      id: 'remn',
      title: 'REMN - Responsable d\'Espace de Médiation Numérique',
      level: 'Bac +2',
      duration: '6 mois de cours + 2 mois de stage',
      public: 'Jeunes 18-30 ans, personnes en reconversion',
      icon: FaGraduationCap,
      color: 'green',
      competences: [
        'Médiation numérique',
        'Employabilité et insertion professionnelle',
        'Gestion d\'EPN (Espace Public Numérique)',
        'Accompagnement du public',
        'Pédagogie fablab'
      ],
      debouches: 'Animateur numérique, médiateur, coordinateur de fablab, responsable EPN',
      modalites: 'Formation initiale - Stage obligatoire'
    },
    {
      id: 'reconnect',
      title: 'Re Connect - Formation de Reconditionnement d\'outils numériques',
      subtitle: 'Paris Fabrik – Transition écologique & éco-numérique',
      level: 'Préqualification',
      duration: '2 mois de cours + 1 mois de stage',
      public: 'Tous publics',
      icon: FaGraduationCap,
      color: 'green',
      competences: [
        'Diagnostic et réparation basique',
        'Réinstallation systèmes',
        'Tri, recyclage, réemploi',
        'Éco-conception numérique'
      ],
      debouches: 'Entrée en titre RNCP "Agent de reconditionnement", missions en fablab, emploi direct si niveau adéquat',
      modalites: 'Formation préqualifiante'
    },
    {
      id: 'via',
      title: 'VIA - Vers l\'Insertion par l\'Animation',
      subtitle: 'Paris Hospitalités – Préparation aux métiers de l\'animation',
      level: 'Préqualification',
      duration: '2 mois de cours + 1 mois de stage',
      public: 'Tous publics',
      icon: FaGraduationCap,
      color: 'green',
      competences: [
        'Animation sportive et culturelle',
        'Gestion de groupe',
        'Montage de projet',
        'Inclusion et pédagogie'
      ],
      debouches: 'BPJEPS, animation périscolaire, centres de loisirs, service civique',
      modalites: 'Formation préqualifiante'
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-acture-green to-primary-blue text-white py-16 px-4">
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

      {/* Liste des formations */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {formations.map((formation, index) => (
              <AnimatedCard key={formation.id} delay={index * 0.1}>
                <div className="bg-white rounded-lg shadow-lg p-8 hover-lift">
                  <div className="flex items-start mb-6">
                    <div className="bg-green-50 p-4 rounded-lg mr-6">
                      <formation.icon className="text-4xl text-acture-green" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2 text-acture-green">
                        {formation.title}
                      </h2>
                      {formation.subtitle && (
                        <p className="text-gray-600 mb-2">{formation.subtitle}</p>
                      )}
                      <div className="flex flex-wrap gap-4 mt-4">
                        <span className="px-3 py-1 bg-green-100 text-acture-green rounded-full text-sm font-semibold">
                          {formation.level}
                        </span>
                        <div className="flex items-center text-gray-600 text-sm">
                          <FaClock className="mr-2" />
                          {formation.duration}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <FaUsers className="mr-2" />
                          {formation.public}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-4 text-acture-green flex items-center">
                        <FaCheckCircle className="mr-2" />
                        Compétences visées
                      </h3>
                      <ul className="space-y-2">
                        {formation.competences.map((competence, idx) => (
                          <li key={idx} className="flex items-start text-gray-700">
                            <span className="text-acture-green mr-2 mt-1">•</span>
                            <span>{competence}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-4 text-acture-green flex items-center">
                        <FaBriefcase className="mr-2" />
                        Débouchés
                      </h3>
                      <p className="text-gray-700">{formation.debouches}</p>
                      
                      <div className="mt-6 p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Modalités :</strong> {formation.modalites}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <Link 
                      href="/academie#inscriptions"
                      className="inline-block bg-acture-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-smooth"
                    >
                      S'inscrire à cette formation
                    </Link>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Inscriptions */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Intéressé par une formation ?</h2>
            <p className="text-xl text-gray-700 mb-8">
              Contactez-nous pour plus d'informations ou inscrivez-vous directement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/academie#inscriptions" 
                className="bg-acture-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-smooth"
              >
                Formulaire d'inscription
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

