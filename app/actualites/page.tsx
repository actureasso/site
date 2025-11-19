import Link from 'next/link'
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa'

export default function Actualites() {
  // Exemple d'articles - à remplacer par une vraie source de données
  const articles = [
    {
      id: 1,
      title: "Nouvelle session REMN - Inscriptions ouvertes",
      date: "15 janvier 2025",
      category: "Formation",
      excerpt: "Les inscriptions pour la prochaine session de formation REMN sont maintenant ouvertes. Formation de 6 mois + 2 mois de stage.",
      image: "/images/article-1.jpg",
      author: "Acture Académie"
    },
    {
      id: 2,
      title: "Ateliers CLIC - Retour sur 2024",
      date: "10 janvier 2025",
      category: "Acture Asso",
      excerpt: "Bilan de l'année 2024 : 20 ateliers organisés, plus de 50 jeunes accompagnés dans leur apprentissage du numérique.",
      image: "/images/article-2.jpg",
      author: "Acture Asso"
    },
    {
      id: 3,
      title: "Séjour Marseille - Horizon Connect",
      date: "5 janvier 2025",
      category: "Jeunesse",
      excerpt: "Retour en images sur le séjour de 7 jours à Marseille organisé pour les jeunes du quartier. Autonomie, créativité et rencontres professionnelles.",
      image: "/images/article-3.jpg",
      author: "Acture Asso"
    },
    {
      id: 4,
      title: "Témoignage : Marthe, 68 ans",
      date: "20 décembre 2024",
      category: "Inclusion Numérique",
      excerpt: "Marthe a participé à nos ateliers d'inclusion numérique. Découvrez son parcours et comment elle a appris à utiliser son smartphone.",
      image: "/images/article-4.jpg",
      author: "Acture Asso"
    },
    {
      id: 5,
      title: "Lancement Re Connect - Paris Fabrik",
      date: "15 décembre 2024",
      category: "Formation",
      excerpt: "Nouvelle formation de reconditionnement d'outils numériques lancée dans le cadre du programme Paris Fabrik.",
      image: "/images/article-5.jpg",
      author: "Acture Académie"
    },
    {
      id: 6,
      title: "Mercredis du Talus - Bilan 2024",
      date: "10 décembre 2024",
      category: "Quartier Connect",
      excerpt: "Retour sur les Mercredis du Talus de 2024 : animation de l'espace public, ateliers créatifs et cohésion sociale.",
      image: "/images/article-6.jpg",
      author: "Acture Asso"
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-acture-blue to-acture-green text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Actualités & Événements</h1>
          <p className="text-xl md:text-2xl">
            Suivez nos dernières actualités, projets et événements
          </p>
        </div>
      </section>

      {/* Liste des articles */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="h-48 bg-gradient-to-r from-acture-blue to-acture-green flex items-center justify-center">
                  <span className="text-white text-sm">Image à ajouter</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <FaCalendarAlt className="mr-2" />
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span className="px-2 py-1 bg-blue-100 text-acture-blue rounded text-xs">
                      {article.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-gray-800">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaUser className="mr-2" />
                      <span>{article.author}</span>
                    </div>
                    <Link 
                      href={`/actualites/${article.id}`}
                      className="text-acture-blue hover:text-acture-green transition flex items-center"
                    >
                      Lire la suite
                      <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Calendrier */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Calendrier des événements</h2>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center text-gray-500 py-12">
              <FaCalendarAlt className="text-6xl mx-auto mb-4 text-gray-300" />
              <p>Calendrier interactif à intégrer</p>
              <p className="text-sm mt-2">
                (Google Calendar, Calendly, ou solution personnalisée)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

