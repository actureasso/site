export default function Confidentialite() {
  return (
    <div className="flex flex-col">
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-gray-700">
                Acture s'engage à protéger la confidentialité des informations personnelles 
                que vous nous fournissez. Cette politique de confidentialité explique comment 
                nous collectons, utilisons, stockons et protégeons vos données personnelles 
                conformément au Règlement Général sur la Protection des Données (RGPD).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Données collectées</h2>
              <p className="text-gray-700 mb-4">
                Nous collectons les données personnelles suivantes :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Adresse postale (si nécessaire)</li>
                <li>Informations relatives à votre demande (formation, projet, etc.)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Finalités du traitement</h2>
              <p className="text-gray-700 mb-4">
                Vos données personnelles sont collectées et traitées pour les finalités suivantes :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Répondre à vos demandes d'information</li>
                <li>Traiter vos candidatures aux formations</li>
                <li>Gérer vos inscriptions aux ateliers et événements</li>
                <li>Traiter vos dons et vous envoyer les reçus fiscaux</li>
                <li>Vous envoyer des informations sur nos activités (avec votre consentement)</li>
                <li>Améliorer nos services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Base légale du traitement</h2>
              <p className="text-gray-700">
                Le traitement de vos données personnelles est basé sur :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-2">
                <li>Votre consentement (pour les newsletters et communications marketing)</li>
                <li>L'exécution d'un contrat ou de mesures précontractuelles (candidatures, inscriptions)</li>
                <li>L'intérêt légitime d'Acture (amélioration des services)</li>
                <li>Le respect d'obligations légales (reçus fiscaux pour les dons)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Conservation des données</h2>
              <p className="text-gray-700">
                Vos données personnelles sont conservées uniquement pendant la durée nécessaire 
                aux finalités pour lesquelles elles ont été collectées, conformément aux 
                obligations légales applicables. Les données relatives aux dons sont conservées 
                conformément aux obligations fiscales (10 ans).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Partage des données</h2>
              <p className="text-gray-700 mb-4">
                Vos données personnelles ne sont pas vendues, louées ou partagées avec des 
                tiers à des fins commerciales. Elles peuvent être partagées avec :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Nos prestataires techniques (hébergement, outils de communication)</li>
                <li>Nos partenaires institutionnels (dans le cadre de nos projets)</li>
                <li>Les autorités compétentes si la loi l'exige</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Vos droits</h2>
              <p className="text-gray-700 mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Droit d'accès :</strong> Vous pouvez demander l'accès à vos données personnelles</li>
                <li><strong>Droit de rectification :</strong> Vous pouvez demander la correction de vos données</li>
                <li><strong>Droit à l'effacement :</strong> Vous pouvez demander la suppression de vos données</li>
                <li><strong>Droit à la limitation :</strong> Vous pouvez demander la limitation du traitement</li>
                <li><strong>Droit à la portabilité :</strong> Vous pouvez demander la récupération de vos données</li>
                <li><strong>Droit d'opposition :</strong> Vous pouvez vous opposer au traitement de vos données</li>
                <li><strong>Droit de retrait du consentement :</strong> Vous pouvez retirer votre consentement à tout moment</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Exercice de vos droits</h2>
              <p className="text-gray-700 mb-4">
                Pour exercer vos droits, vous pouvez nous contacter :
              </p>
              <p className="text-gray-700 mb-2">
                Par email : 
                <a href="mailto:contact@acture.fr" className="text-acture-blue hover:underline ml-1">
                  contact@acture.fr
                </a>
              </p>
              <p className="text-gray-700">
                Par courrier : Acture - [Adresse à compléter]
              </p>
              <p className="text-gray-700 mt-4">
                Vous avez également le droit d'introduire une réclamation auprès de la CNIL 
                (Commission Nationale de l'Informatique et des Libertés) si vous estimez que 
                le traitement de vos données personnelles constitue une violation du RGPD.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Sécurité</h2>
              <p className="text-gray-700">
                Acture met en œuvre des mesures techniques et organisationnelles appropriées 
                pour protéger vos données personnelles contre tout accès non autorisé, 
                perte, destruction ou altération.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Cookies</h2>
              <p className="text-gray-700 mb-4">
                Ce site utilise des cookies pour améliorer votre expérience de navigation. 
                Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela 
                peut affecter certaines fonctionnalités du site.
              </p>
              <p className="text-gray-700">
                Types de cookies utilisés :
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-2">
                <li>Cookies techniques (nécessaires au fonctionnement du site)</li>
                <li>Cookies analytiques (pour comprendre l'utilisation du site)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Modifications</h2>
              <p className="text-gray-700">
                Cette politique de confidentialité peut être modifiée à tout moment. 
                La version en vigueur est celle publiée sur cette page. Nous vous 
                encourageons à consulter régulièrement cette page pour prendre 
                connaissance des éventuelles modifications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Contact</h2>
              <p className="text-gray-700">
                Pour toute question concernant cette politique de confidentialité, 
                vous pouvez nous contacter à l'adresse suivante : 
                <a href="mailto:contact@acture.fr" className="text-acture-blue hover:underline ml-1">
                  contact@acture.fr
                </a>
              </p>
            </section>

            <section className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}

