# Site Web Acture

Site internet pour Acture Asso et Acture Académie - Inclusion numérique, jeunesse, insertion, formation.

## 🚀 Technologies utilisées

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **React Icons** - Bibliothèque d'icônes

## 📦 Installation

1. Installer les dépendances :
```bash
npm install
```

2. Lancer le serveur de développement :
```bash
npm run dev
```

3. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

## 🏗️ Structure du projet

```
new_acture/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Page d'accueil
│   ├── layout.tsx         # Layout principal
│   ├── globals.css        # Styles globaux
│   ├── asso/              # Pages Acture Asso
│   ├── academie/          # Pages Acture Académie
│   ├── actualites/        # Actualités et événements
│   ├── partenaires/       # Partenaires
│   ├── contact/           # Contact
│   ├── soutien/           # Dons et soutien
│   ├── mentions-legales/  # Mentions légales
│   └── confidentialite/   # Politique de confidentialité
├── components/            # Composants réutilisables
│   ├── Header.tsx        # En-tête avec navigation
│   └── Footer.tsx        # Pied de page
├── public/               # Fichiers statiques (images, etc.)
└── package.json          # Dépendances du projet
```

## 🎨 Design

Le site utilise une palette de couleurs inspirée des actions de quartier :
- **Bleu** (`acture-blue`) : #1e40af
- **Jaune** (`acture-yellow`) : #f59e0b
- **Vert** (`acture-green`) : #059669

## 📝 Pages principales

1. **Accueil** - Présentation des deux entités
2. **Acture Asso** - Vie associative, projets, actions
3. **Acture Académie** - Formations certifiantes et préqualifiantes
4. **Actualités** - Articles et événements
5. **Partenaires** - Liste des partenaires
6. **Contact** - Formulaire de contact
7. **Soutien** - Dons, mécénat, bénévolat

## 🔧 Fonctionnalités

- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Navigation claire avec double arborescence (Asso / Académie)
- ✅ Formulaires de contact et d'inscription
- ✅ Pages conformes RGPD (mentions légales, confidentialité)
- ✅ SEO optimisé (metadata, structure sémantique)

## 📋 À compléter

- [ ] Ajouter les vraies adresses email et téléphone
- [ ] Ajouter l'adresse du local
- [ ] Intégrer les logos des partenaires
- [ ] Ajouter les photos des activités
- [ ] Configurer le système de paiement pour les dons
- [ ] Intégrer un calendrier interactif
- [ ] Ajouter un système de blog/actualités dynamique
- [ ] Configurer l'hébergement (Vercel recommandé)

## 🚀 Déploiement

### Vercel (recommandé)

1. Pousser le code sur GitHub
2. Connecter le repository à Vercel
3. Le déploiement se fait automatiquement

### Autres plateformes

Le site peut être déployé sur n'importe quelle plateforme supportant Next.js :
- Netlify
- AWS Amplify
- Votre propre serveur Node.js

## 📄 Licence

© 2025 Acture. Tous droits réservés.

