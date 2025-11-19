'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaUsers, FaGraduationCap, FaHandsHelping, FaLaptop, FaChild, FaRecycle } from 'react-icons/fa'
import AnimatedSection from '@/components/AnimatedSection'
import AnimatedCard from '@/components/AnimatedCard'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="flex flex-col">
      {/* Hero Banner */}
      <section className="gradient-modern-blue text-white py-24 md:py-32 px-4 animate-gradient relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-green-100">
              Acture
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl lg:text-4xl mb-8 font-light text-white/90"
          >
            Deviens acteur de ton aventure
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-white/80 font-medium"
          >
            Inclusion numérique • Jeunesse • Fablab • Médiation • Formation • Animation
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              href="/asso" 
              className="glass-dark text-white px-8 py-4 rounded-modern-lg font-semibold hover:bg-white/20 transition-smooth shadow-modern-lg hover:shadow-modern-xl inline-block backdrop-blur-md border border-white/20"
            >
              Acture Asso
            </Link>
            <Link 
              href="/academie" 
              className="bg-white text-acture-blue px-8 py-4 rounded-modern-lg font-semibold hover:bg-white/90 transition-smooth shadow-colored-yellow hover:shadow-modern-xl inline-block"
            >
              Acture Académie
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Choix des deux pôles */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-900">
              <span className="text-gradient-blue">Nos deux entités</span>
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Acture Asso */}
            <AnimatedCard delay={0.1} className="h-full">
              <motion.div 
                className="card-modern h-full flex flex-col border border-gray-100"
                whileHover={{ y: -8 }}
              >
                <motion.div 
                  className="flex items-center mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <FaUsers className="text-4xl text-acture-blue mr-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-acture-blue">Acture Asso</h3>
                </motion.div>
                <p className="text-gray-700 mb-6">
                  Vie associative, projets, actions de quartier, insertion professionnelle
                </p>
                <ul className="space-y-2 mb-6 text-gray-600 flex-1">
                  <motion.li 
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >• Quartier Connect - Animation de l'espace public</motion.li>
                  <motion.li 
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >• Ateliers d'Inclusion Numérique (AIN)</motion.li>
                  <motion.li 
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >• CLIC - Accompagnement scolaire</motion.li>
                  <motion.li 
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >• Séjours jeunes</motion.li>
                  <motion.li 
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                  >• Accompagnement à l'insertion</motion.li>
                </ul>
                <Link 
                  href="/asso" 
                  className="inline-block bg-gradient-to-r from-acture-blue to-blue-600 text-white px-6 py-3 rounded-modern hover:shadow-colored transition-smooth mt-auto font-semibold btn-modern"
                >
                  En savoir plus →
                </Link>
              </motion.div>
            </AnimatedCard>

            {/* Acture Académie */}
            <AnimatedCard delay={0.2} className="h-full">
              <motion.div 
                className="card-modern h-full flex flex-col border border-gray-100"
                whileHover={{ y: -8 }}
              >
                <motion.div 
                  className="flex items-center mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <FaGraduationCap className="text-4xl text-acture-green mr-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-acture-green">Acture Académie</h3>
                </motion.div>
                <p className="text-gray-700 mb-6">
                  Organisme de formation - Formations certifiantes et préqualifiantes
                </p>
                <ul className="space-y-2 mb-6 text-gray-600 flex-1">
                  <motion.li 
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >• REMN - Responsable d'Espace de Médiation Numérique</motion.li>
                  <motion.li 
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >• Re Connect - Reconditionnement d'outils numériques</motion.li>
                  <motion.li 
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >• VIA - Vers l'Insertion par l'Animation</motion.li>
                </ul>
                <Link 
                  href="/academie" 
                  className="inline-block bg-gradient-to-r from-acture-green to-green-600 text-white px-6 py-3 rounded-modern hover:shadow-colored-green transition-smooth mt-auto font-semibold btn-modern"
                >
                  En savoir plus →
                </Link>
              </motion.div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Mots clés et valeurs */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-900">
              <span className="text-gradient">Nos valeurs et domaines d'action</span>
            </h2>
          </AnimatedSection>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {[
              { icon: FaLaptop, title: "Inclusion Numérique", desc: "Accompagnement vers le numérique pour tous", bgClass: "bg-gradient-to-br from-blue-50 to-blue-100", iconClass: "text-acture-blue", borderClass: "border-blue-200" },
              { icon: FaChild, title: "Jeunesse", desc: "Accompagnement scolaire et éveil numérique", bgClass: "bg-gradient-to-br from-yellow-50 to-yellow-100", iconClass: "text-acture-yellow", borderClass: "border-yellow-200" },
              { icon: FaRecycle, title: "Fablab", desc: "Création, innovation et recyclage", bgClass: "bg-gradient-to-br from-green-50 to-green-100", iconClass: "text-acture-green", borderClass: "border-green-200" },
              { icon: FaHandsHelping, title: "Médiation", desc: "Accompagnement personnalisé", bgClass: "bg-gradient-to-br from-blue-50 to-blue-100", iconClass: "text-acture-blue", borderClass: "border-blue-200" },
              { icon: FaGraduationCap, title: "Formation", desc: "Formations certifiantes et préqualifiantes", bgClass: "bg-gradient-to-br from-yellow-50 to-yellow-100", iconClass: "text-acture-yellow", borderClass: "border-yellow-200" },
              { icon: FaUsers, title: "Animation", desc: "Animation de quartier et cohésion sociale", bgClass: "bg-gradient-to-br from-green-50 to-green-100", iconClass: "text-acture-green", borderClass: "border-green-200" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className={`text-center p-6 ${item.bgClass} rounded-modern-lg hover-lift cursor-pointer border-2 ${item.borderClass} transition-all duration-300`}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  className="mb-4"
                >
                  <div className={`inline-flex p-4 ${item.bgClass} rounded-modern border ${item.borderClass}`}>
                    <item.icon className={`text-4xl ${item.iconClass}`} />
                  </div>
                </motion.div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Appels à action */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
                Rejoignez-nous !
              </h2>
              <p className="text-xl text-gray-600">
                Ensemble, construisons l'avenir
              </p>
            </div>
          </AnimatedSection>
          <motion.div 
            className="grid md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { 
                href: "/asso#ateliers", 
                text: "Participer à un atelier",
                color: "blue"
              },
              { 
                href: "/academie#inscriptions", 
                text: "S'inscrire à une formation",
                color: "green"
              },
              { 
                href: "/soutien", 
                text: "Nous soutenir",
                color: "yellow"
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <Link 
                  href={item.href}
                  className={`card-modern block text-center p-8 hover-lift border-2 ${
                    item.color === 'blue' ? 'border-blue-200 hover:border-blue-300' :
                    item.color === 'green' ? 'border-green-200 hover:border-green-300' :
                    'border-yellow-200 hover:border-yellow-300'
                  }`}
                >
                  <h3 className={`text-xl font-bold mb-2 ${
                    item.color === 'blue' ? 'text-acture-blue' :
                    item.color === 'green' ? 'text-acture-green' :
                    'text-acture-yellow'
                  }`}>
                    {item.text}
                  </h3>
                  <p className="text-gray-600 text-sm mt-4">
                    Cliquez pour en savoir plus →
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

