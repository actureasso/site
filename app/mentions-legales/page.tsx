export default function MentionsLegales() {
  return (
    <div className="flex flex-col">
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Mentions Légales</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Éditeur du site</h2>
              <p className="text-gray-700 mb-2">
                <strong>Acture</strong>
              </p>
              <p className="text-gray-700 mb-2">
                Association loi 1901
              </p>
              <p className="text-gray-700 mb-2">
                Siège social : [Adresse à compléter]
              </p>
              <p className="text-gray-700 mb-2">
                SIRET : [Numéro à compléter]
              </p>
              <p className="text-gray-700">
                Directeur de publication : [Nom à compléter]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Hébergement</h2>
              <p className="text-gray-700">
                Ce site est hébergé par :
              </p>
              <p className="text-gray-700 mt-2">
                [Informations hébergeur à compléter]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Propriété intellectuelle</h2>
              <p className="text-gray-700 mb-4">
                L'ensemble de ce site relève de la législation française et internationale 
                sur le droit d'auteur et la propriété intellectuelle. Tous les droits de 
                reproduction sont réservés, y compris pour les documents téléchargeables 
                et les représentations iconographiques et photographiques.
              </p>
              <p className="text-gray-700">
                La reproduction de tout ou partie de ce site sur un support électronique 
                quel qu'il soit est formellement interdite sauf autorisation expresse 
                de l'éditeur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Protection des données personnelles</h2>
              <p className="text-gray-700 mb-4">
                Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée 
                et au Règlement Général sur la Protection des Données (RGPD), vous disposez 
                d'un droit d'accès, de rectification, de suppression et d'opposition aux 
                données personnelles vous concernant.
              </p>
              <p className="text-gray-700">
                Pour exercer ce droit, vous pouvez nous contacter à l'adresse suivante : 
                <a href="mailto:contact@acture.fr" className="text-acture-blue hover:underline ml-1">
                  contact@acture.fr
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
              <p className="text-gray-700">
                Ce site utilise des cookies pour améliorer l'expérience utilisateur. 
                En continuant à naviguer sur ce site, vous acceptez l'utilisation de cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Responsabilité</h2>
              <p className="text-gray-700 mb-4">
                Les informations contenues sur ce site sont aussi précises que possible 
                et le site est périodiquement remis à jour, mais peut toutefois contenir 
                des inexactitudes, des omissions ou des lacunes.
              </p>
              <p className="text-gray-700">
                Acture ne pourra être tenu responsable des dommages directs et indirects 
                causés au matériel de l'utilisateur, lors de l'accès au site, et résultant 
                soit de l'utilisation d'un matériel ne répondant pas aux spécifications, 
                soit de l'apparition d'un bug ou d'une incompatibilité.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Liens hypertextes</h2>
              <p className="text-gray-700">
                Le site peut contenir des liens hypertextes vers d'autres sites présents 
                sur le réseau Internet. Les liens vers ces autres ressources vous font 
                quitter le site. Il est possible de créer un lien vers la page de 
                présentation de ce site sans autorisation expresse de l'éditeur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
              <p className="text-gray-700">
                Pour toute question concernant ces mentions légales, vous pouvez nous 
                contacter à l'adresse suivante : 
                <a href="mailto:contact@acture.fr" className="text-acture-blue hover:underline ml-1">
                  contact@acture.fr
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}

