# Guide de déploiement - Acture Website

## Option 1 : Vercel (Recommandé - Gratuit)

Vercel est la plateforme recommandée pour Next.js. Déploiement en quelques minutes.

### Étape 1 : Préparer votre code

1. Assurez-vous que votre code est sur GitHub, GitLab ou Bitbucket :
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <votre-url-repo>
   git push -u origin main
   ```

### Étape 2 : Déployer sur Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Créez un compte (ou connectez-vous avec GitHub)
3. Cliquez sur "New Project"
4. Importez votre repository GitHub/GitLab/Bitbucket
5. Vercel détecte automatiquement Next.js
6. Cliquez sur "Deploy"
7. Votre site sera déployé en quelques secondes !

### Configuration automatique
- Framework Preset: Next.js (détecté automatiquement)
- Build Command: `npm run build` (automatique)
- Output Directory: `.next` (automatique)
- Install Command: `npm install` (automatique)

Votre site sera disponible à une URL comme : `https://acture-website.vercel.app`

## Option 2 : Netlify (Alternative)

1. Allez sur [netlify.com](https://netlify.com)
2. Créez un compte
3. Cliquez sur "New site from Git"
4. Choisissez votre repository
5. Configuration :
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Cliquez sur "Deploy site"

## Option 3 : Déploiement manuel (VPS/Serveur)

Si vous avez un serveur VPS (comme DigitalOcean, AWS, etc.) :

1. Sur votre serveur, installez Node.js (version 18 ou supérieure)
2. Clonez votre repository
3. Installez les dépendances : `npm install`
4. Build l'application : `npm run build`
5. Démarrez le serveur : `npm start`

Pour la production, utilisez un process manager comme PM2 :
```bash
npm install -g pm2
pm2 start npm --name "acture" -- start
pm2 save
pm2 startup
```

## Configuration recommandée pour production

Assurez-vous d'avoir ces variables d'environnement (Vercel/Netlify : Settings → Environment Variables, ou fichier `.env.production` en déploiement manuel) :

```
NODE_ENV=production
# Obligatoire pour l'authentification admin (NextAuth)
NEXTAUTH_SECRET=<une-chaîne-aléatoire-longue-et-secrète>
# Optionnel : URL du site (ex. https://acture.org) pour les liens dans les emails
NEXTAUTH_URL=https://votre-domaine.com
# URL publique du site (obligatoire pour un bon SEO : sitemap, Open Graph, JSON-LD)
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
# Si vous utilisez une base autre que SQLite (ex. PostgreSQL en prod)
DATABASE_URL=file:./dev.db
# Compte admin créé au premier seed (à changer après première connexion)
ADMIN_EMAIL=admin@acture.org
ADMIN_PASSWORD=changeme
```

**Important :** Sans `NEXTAUTH_SECRET`, la connexion à l’espace admin ne fonctionnera pas en production. Générez une valeur avec par exemple : `openssl rand -base64 32`.

## Notes importantes

- Les fichiers dans le dossier `public/` sont automatiquement servis
- Le build de production optimise automatiquement les images
- Le déploiement sur Vercel/Netlify met à jour automatiquement votre site à chaque push sur GitHub

