import { FaHandshake, FaBuilding, FaSchool, FaUsers, FaIndustry } from 'react-icons/fa'

export default function Partenaires() {
  const partenaires = {
    institutions: [
      { name: "Mairie de Paris", logo: "/logos/mairie-paris.png" },
      { name: "Région Île-de-France", logo: "/logos/region-idf.png" },
      { name: "État - Services publics", logo: "/logos/etat.png" }
    ],
    education: [
      { name: "Écoles primaires du 17e et 18e", logo: "/logos/ecoles.png" },
      { name: "Collèges du quartier", logo: "/logos/colleges.png" },
      { name: "Centres sociaux", logo: "/logos/centres-sociaux.png" }
    ],
    qpv: [
      { name: "Réseau QPV 17-18", logo: "/logos/qpv.png" },
      { name: "Porte de St-Ouen", logo: "/logos/porte-st-ouen.png" },
      { name: "Pouchet", logo: "/logos/pouchet.png" }
    ],
    insertion: [
      { name: "Missions locales", logo: "/logos/missions-locales.png" },
      { name: "Pôle Emploi", logo: "/logos/pole-emploi.png" }
    ],
    entreprises: [
      { name: "Entreprises locales", logo: "/logos/entreprises.png" },
      { name: "Mécènes", logo: "/logos/mecenes.png" }
    ]
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-acture-blue to-acture-green text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <FaHandshake className="text-6xl mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Partenaires</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Acture travaille en collaboration avec de nombreux partenaires pour mener 
            à bien ses missions d'inclusion numérique et de formation
          </p>
        </div>
      </section>

      {/* Institutions */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <FaBuilding className="text-3xl text-acture-blue mr-4" />
            <h2 className="text-3xl font-bold text-acture-blue">Institutions</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {partenaires.institutions.map((partenaire, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition">
                <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-400 text-sm">Logo {partenaire.name}</span>
                </div>
                <h3 className="font-semibold text-gray-800">{partenaire.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Éducation */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <FaSchool className="text-3xl text-acture-green mr-4" />
            <h2 className="text-3xl font-bold text-acture-green">Éducation & Centres sociaux</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {partenaires.education.map((partenaire, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition">
                <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-400 text-sm">Logo {partenaire.name}</span>
                </div>
                <h3 className="font-semibold text-gray-800">{partenaire.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QPV */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <FaUsers className="text-3xl text-acture-yellow mr-4" />
            <h2 className="text-3xl font-bold text-acture-yellow">Réseau QPV 17-18</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {partenaires.qpv.map((partenaire, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition">
                <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-400 text-sm">Logo {partenaire.name}</span>
                </div>
                <h3 className="font-semibold text-gray-800">{partenaire.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insertion */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <FaUsers className="text-3xl text-acture-blue mr-4" />
            <h2 className="text-3xl font-bold text-acture-blue">Insertion professionnelle</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {partenaires.insertion.map((partenaire, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition">
                <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-400 text-sm">Logo {partenaire.name}</span>
                </div>
                <h3 className="font-semibold text-gray-800">{partenaire.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entreprises */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <FaIndustry className="text-3xl text-acture-green mr-4" />
            <h2 className="text-3xl font-bold text-acture-green">Entreprises & Mécènes</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {partenaires.entreprises.map((partenaire, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition">
                <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-gray-400 text-sm">Logo {partenaire.name}</span>
                </div>
                <h3 className="font-semibold text-gray-800">{partenaire.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Partenariat */}
      <section className="py-16 px-4 bg-gradient-to-r from-acture-blue to-acture-green text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Devenir partenaire</h2>
          <p className="text-xl mb-8">
            Vous souhaitez devenir partenaire d'Acture ? Contactez-nous pour discuter 
            des possibilités de collaboration.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-white text-acture-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Nous contacter
          </a>
        </div>
      </section>
    </div>
  )
}

