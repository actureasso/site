import Link from 'next/link'
import Image from 'next/image'
import { FaUsers, FaLaptop, FaChild, FaPlane, FaBriefcase, FaNetworkWired } from 'react-icons/fa'

export default function Projets() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-acture-blue to-primary-blue text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Projets & Actions de quartier</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Découvrez tous nos projets et actions menés dans les quartiers prioritaires
          </p>
        </div>
      </section>

      {/* Quartier Connect */}
      <section id="quartier-connect" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <FaUsers className="text-4xl text-acture-blue mr-4" />
            <h2 className="text-3xl font-bold text-acture-blue">Quartier Connect</h2>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-4">Animation de l'espace public</h3>
            <p className="text-gray-700 mb-6">
              Quartier Connect vise à créer du lien entre habitants et favoriser la participation 
              citoyenne à travers des animations régulières dans l'espace public.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-acture-blue">Actions principales :</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-acture-blue mr-2">•</span>
                    <span><strong>Mercredis du Talus</strong> - Animations hebdomadaires</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-acture-blue mr-2">•</span>
                    <span><strong>Fêtes de quartier</strong> - Événements festifs et conviviaux</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-acture-blue mr-2">•</span>
                    <span><strong>Ateliers créatifs et numériques</strong> - En pied d'immeuble</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-acture-blue mr-2">•</span>
                    <span><strong>Fablab mobile</strong> - Ateliers de fabrication numérique itinérants</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-acture-blue mr-2">•</span>
                    <span><strong>Jeu & cohésion sociale</strong> - Activités ludiques pour tous</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-acture-blue">Objectifs :</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Créer du lien entre habitants</li>
                  <li>• Favoriser la participation citoyenne</li>
                  <li>• Démocratiser l'accès au numérique</li>
                  <li>• Animer l'espace public</li>
                  <li>• Renforcer la cohésion sociale</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AIN */}
      <section id="ain" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <FaLaptop className="text-4xl text-acture-blue mr-4" />
            <h2 className="text-3xl font-bold text-acture-blue">AIN - Ateliers d'Inclusion Numérique</h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-4">Accompagnement vers le numérique</h3>
            <p className="text-gray-700 mb-6">
              Les Ateliers d'Inclusion Numérique s'adressent aux adultes, seniors et personnes 
              éloignées du numérique pour les accompagner dans leur découverte et maîtrise des 
              outils numériques.
            </p>
            
            {/* Images des ateliers seniors (partage avec section AIN) */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Sénior inclusion numérique/atelier_senior_2024.jpeg" 
                  alt="Atelier senior 2024" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Sénior inclusion numérique/atelier_senior_chez_passerelles_17_18.jpeg" 
                  alt="Atelier senior chez Passerelles 17-18" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Sénior inclusion numérique/atelier_senior_dans_nos_nouveau_locaux.jpeg" 
                  alt="Atelier senior dans nos nouveaux locaux" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-acture-blue">Public cible :</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Adultes</li>
                  <li>• Seniors</li>
                  <li>• Personnes éloignées du numérique</li>
                  <li>• Débutants en informatique</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-acture-blue">Modules proposés :</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Smartphone et tablettes</strong> - Prise en main</li>
                  <li>• <strong>Sécurité en ligne</strong> - Protection des données</li>
                  <li>• <strong>Démarches administratives</strong> - Services en ligne</li>
                  <li>• <strong>Bureautique de base</strong> - Word, Excel, etc.</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2 text-acture-blue">Témoignage</h4>
              <p className="text-gray-700 italic">
                "Marthe, 68 ans : Grâce aux ateliers d'Acture, j'ai appris à utiliser mon 
                smartphone pour communiquer avec ma famille et faire mes démarches en ligne. 
                C'est un vrai soulagement !"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLIC */}
      <section id="clic" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <FaChild className="text-4xl text-acture-blue mr-4" />
            <h2 className="text-3xl font-bold text-acture-blue">CLIC - Accompagnement scolaire & éveil à la culture numérique</h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-4">Soutien scolaire et numérique</h3>
            <p className="text-gray-700 mb-6">
              CLIC combine soutien scolaire traditionnel et éveil à la culture numérique pour 
              les jeunes de 7 à 14 ans. Plus de 20 ateliers par an sont organisés.
            </p>
            
            {/* Images du projet CLIC */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Jeunesse Projet CLIC/1er_jour_rentree_du_projet_clic.jpeg" 
                  alt="Premier jour de rentrée du projet CLIC" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Jeunesse Projet CLIC/atelier_creativite_numerique_stop_motion.jpeg" 
                  alt="Atelier créativité numérique stop motion" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Jeunesse Projet CLIC/consignes_pour_l_atelier_stop_motion.jpeg" 
                  alt="Consignes pour l'atelier stop motion" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="font-semibold mb-3 text-acture-blue">Soutien scolaire :</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Primaire (CP au CM2)</li>
                  <li>• Collège (6e à 3e)</li>
                  <li>• Aide aux devoirs</li>
                  <li>• Renforcement des acquis</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-acture-blue">Éveil numérique :</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Robotique</strong> - Programmation de robots</li>
                  <li>• <strong>Impression 3D</strong> - Modélisation et création</li>
                  <li>• <strong>Création de stickers</strong> - Design graphique</li>
                  <li>• <strong>Flocage textile</strong> - Personnalisation de vêtements</li>
                  <li>• <strong>Fablab jeunes</strong> - Ateliers créatifs 7-14 ans</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg">
              <p className="text-gray-700">
                <strong>Chiffre clé :</strong> Plus de 20 ateliers organisés par an, touchant 
                des dizaines de jeunes du quartier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sénior inclusion numérique */}
      <section id="senior" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <FaLaptop className="text-4xl text-acture-blue mr-4" />
            <h2 className="text-3xl font-bold text-acture-blue">Sénior inclusion numérique</h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-4">Accompagnement des seniors vers le numérique</h3>
            <p className="text-gray-700 mb-6">
              Des ateliers spécialement conçus pour accompagner les seniors dans leur découverte 
              et maîtrise des outils numériques dans un cadre bienveillant et adapté.
            </p>
            
            {/* Images du projet Sénior */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Sénior inclusion numérique/atelier_senior_2024.jpeg" 
                  alt="Atelier senior 2024" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Sénior inclusion numérique/atelier_senior_chez_passerelles_17_18.jpeg" 
                  alt="Atelier senior chez Passerelles 17-18" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Sénior inclusion numérique/atelier_senior_dans_nos_nouveau_locaux.jpeg" 
                  alt="Atelier senior dans nos nouveaux locaux" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evènements */}
      <section id="evenements" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <FaUsers className="text-4xl text-acture-blue mr-4" />
            <h2 className="text-3xl font-bold text-acture-blue">Évènements</h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-4">Nos événements et fêtes de quartier</h3>
            <p className="text-gray-700 mb-6">
              Acture organise régulièrement des événements festifs et des animations de quartier 
              pour créer du lien social et favoriser la participation citoyenne.
            </p>
            
            {/* Images des événements */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Evènements/fete_de_quartier_2024.jpeg" 
                  alt="Fête de quartier 2024" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Evènements/fete_de_l_environnement_2024.jpeg" 
                  alt="Fête de l'environnement 2024" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Evènements/fete_environnement_2024.jpeg" 
                  alt="Fête environnement 2024" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Evènements/jo_2024.jpeg" 
                  alt="Jeux Olympiques 2024" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Evènements/bal_du_17e_ete2025.jpeg" 
                  alt="Bal du 17e été 2025" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Evènements/collectif_qpv_17_18.jpeg" 
                  alt="Collectif QPV 17-18" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Evènements/forum_des_asso_du_17_2025.jpeg" 
                  alt="Forum des associations du 17e 2025" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Evènements/sejour_marseille_2025.jpeg" 
                  alt="Séjour Marseille 2025" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Séjours jeunes */}
      <section id="sejours" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <FaPlane className="text-4xl text-acture-blue mr-4" />
            <h2 className="text-3xl font-bold text-acture-blue">Séjours jeunes - Loisir & Numérique</h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-4">Séjours combinant loisir et numérique</h3>
            <p className="text-gray-700 mb-6">
              Des séjours de plusieurs jours qui allient découverte, créativité numérique et 
              rencontres professionnelles pour développer l'autonomie des jeunes.
            </p>
            
            {/* Images des séjours */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="relative w-full h-80 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Evènements/sejour_marseille_2025.jpeg" 
                  alt="Séjour Marseille 2025" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-80 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Jeunesse Projet CLIC/1er_jour_rentree_du_projet_clic.jpeg" 
                  alt="Projet CLIC" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-acture-blue">Exemples de séjours :</h4>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Marseille (7 jours)</strong>
                    <br />
                    <span className="text-sm">Découverte de la ville, ateliers numériques, 
                    rencontres avec des professionnels locaux</span>
                  </li>
                  <li>
                    <strong>Projets Horizon Connect</strong>
                    <br />
                    <span className="text-sm">Séjours thématiques autour du numérique et 
                    de l'insertion professionnelle</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-acture-blue">Objectifs :</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Développer l'autonomie</li>
                  <li>• Stimuler la créativité</li>
                  <li>• Organiser des rencontres professionnelles</li>
                  <li>• Immersion numérique</li>
                  <li>• Découverte de nouveaux horizons</li>
                  <li>• Renforcer la confiance en soi</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <p className="text-gray-700">
                <strong>Retours d'expérience :</strong> Les jeunes participants témoignent 
                de l'impact positif de ces séjours sur leur parcours et leur vision de l'avenir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Insertion professionnelle */}
      <section id="insertion" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <FaBriefcase className="text-4xl text-acture-blue mr-4" />
            <h2 className="text-3xl font-bold text-acture-blue">Accompagnement à l'insertion professionnelle</h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-4">Programme "Réussite Connect"</h3>
            <p className="text-gray-700 mb-6">
              Un accompagnement personnalisé pour aider les jeunes et adultes à s'insérer 
              professionnellement, avec des ateliers pratiques et un suivi individualisé.
            </p>
            
            {/* Images du projet Insertion Pro */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Projet Insertion Pro/remise_de_diplomes_2025.jpeg" 
                  alt="Remise de diplômes 2025" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Projet Insertion Pro/remise_de_diplomes_mai_2025.jpeg" 
                  alt="Remise de diplômes mai 2025" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Projet Insertion Pro/rencontres_professionnelles_mediation_numerique_2024.jpeg" 
                  alt="Rencontres professionnelles médiation numérique 2024" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Projet Insertion Pro/seance_de_formation_mediation_numerique_2025.jpeg" 
                  alt="Séance de formation médiation numérique 2025" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Projet Insertion Pro/suivi_individuel_conseils_pour_le_maintien_dans_l_emploi_2024.jpeg" 
                  alt="Suivi individuel conseils pour le maintien dans l'emploi 2024" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image 
                  src="/folder/Projet Insertion Pro/preparations_aux_examens_avril_2025.jpeg" 
                  alt="Préparations aux examens avril 2025" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h4 className="font-semibold mb-3 text-acture-blue">Ateliers proposés :</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>CV et lettre de motivation</strong> - Rédaction et mise en forme</li>
                  <li>• <strong>Coaching professionnel</strong> - Développement personnel</li>
                  <li>• <strong>Simulation d'entretiens</strong> - Préparation aux entretiens</li>
                  <li>• <strong>Orientation professionnelle</strong> - Découverte des métiers</li>
                  <li>• <strong>Mise en réseau</strong> - Rencontres avec entreprises</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-acture-blue">Résultats :</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• CDD et CDI obtenus</li>
                  <li>• Services civiques</li>
                  <li>• Poursuite d'études</li>
                  <li>• Stages en entreprise</li>
                  <li>• Formation qualifiante</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <p className="text-gray-700">
                <strong>Statistiques :</strong> [À compléter avec les données du bilan 2025]
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-acture-blue rounded-lg p-6">
              <h4 className="font-semibold mb-3 text-acture-blue text-lg">Formations complémentaires</h4>
              <p className="text-gray-700 mb-4">
                Souhaitez-vous approfondir vos compétences avec une formation certifiante ou préqualifiante ? 
                Découvrez les formations proposées par Acture Académie.
              </p>
              <Link 
                href="/academie"
                className="inline-block bg-acture-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Découvrir Acture Académie →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Réseau Numérique Parisien */}
      <section id="reseau" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-8">
            <FaNetworkWired className="text-4xl text-acture-blue mr-4" />
            <h2 className="text-3xl font-bold text-acture-blue">Réseau Numérique Parisien</h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-4">Coopération inter-association</h3>
            <p className="text-gray-700 mb-6">
              Acture participe activement au Réseau Numérique Parisien, un réseau de coopération 
              entre associations pour mutualiser les ressources et organiser des événements communs.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-3 text-acture-blue">Coopération</h4>
                <p className="text-gray-700 text-sm">
                  Échanges de bonnes pratiques et collaboration sur des projets communs
                </p>
              </div>
              
              <div className="p-6 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-3 text-acture-blue">Mutualisation</h4>
                <p className="text-gray-700 text-sm">
                  Partage de matériel numérique et de ressources entre associations
                </p>
              </div>
              
              <div className="p-6 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-3 text-acture-blue">Événements</h4>
                <p className="text-gray-700 text-sm">
                  Organisation d'événements communs pour promouvoir l'inclusion numérique
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-acture-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Rejoignez nos projets !</h2>
          <p className="text-xl mb-8">
            Vous souhaitez participer à nos actions ou bénéficier de nos services ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-acture-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Nous contacter
            </Link>
            <Link 
              href="/asso" 
              className="bg-acture-yellow text-acture-blue px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              Retour à Acture Asso
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

