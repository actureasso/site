# Mise en place de l’administration du site Acture

## Options possibles

| Option | Description | Avantages | Inconvénients |
|--------|-------------|-----------|---------------|
| **A. Headless CMS (Strapi, Sanity, Directus)** | CMS externe + Next.js en front | Admin prêt, média intégré | Hébergement séparé, coût possible |
| **B. Admin intégré (Next.js + Prisma + DB)** | Back-office dans le même projet | Un seul repo, plein contrôle | Plus de développement |
| **C. Payload CMS** | CMS qui tourne dans Next.js | Admin inclus, TypeScript | Migration possible si besoin |

**Recommandation : Option B (admin intégré)** — un seul déploiement, pas de service tiers, modèle de données adapté à vos besoins.

---

## Stack retenue (Option B)

- **Next.js 14** (déjà en place)
- **Prisma** — ORM + schéma (SQLite en dev, PostgreSQL en prod possible)
- **NextAuth.js** — authentification admin (email/mot de passe ou magic link)
- **Zone admin** — `app/admin/` avec layout protégé
- **API** — `app/api/` pour CRUD (actualités, projets, partenaires, etc.)
- **Fichiers** — upload dans `public/uploads/` ou stockage externe (S3/Cloudinary) plus tard

---

## Modèle de données (Prisma)

### Entités principales

```
User           → utilisateurs admin (email, role: admin | redacteur)
Article        → actualités (titre, date, catégorie, extrait, auteur, image, published)
Partenaire     → partenaires (nom, logo, url, category)
PartenaireCategory → catégories de partenaires (nom, ordre)

Projet         → une section de la page Projets (slug, titre, ordre, ...)
ProjetSection  → blocs à l’intérieur d’un projet (type: texte | liste | témoignage | images | lien)
Media          → fichiers uploadés (url, alt, projetId ou articleId, etc.)

Formation      → formations Académie (titre, description, durée, prérequis, lien)
Evenement      → événements (titre, date, lieu, description)
EvenementImage → images liées à un événement

SiteSetting    → contenu global (clé/valeur : hero_home, contact_adresse, etc.)
```

### Détail du schéma (voir `prisma/schema.prisma`)

Le fichier `prisma/schema.prisma` définit toutes les tables. On part sur :

1. **Actualités** : Article (titre, slug, date, category, excerpt, body, author, imageUrl, published)
2. **Partenaires** : Partenaire + PartenaireCategory
3. **Projets** : Projet + ProjetBlock (texte, listes, témoignages, images, liens) avec ordre
4. **Média** : Media (filename, url, alt, type)
5. **Formations** : Formation
6. **Événements** : Evenement + EvenementImage
7. **Paramètres site** : SiteSetting (key, value) pour contact, hero, légal

---

## Structure des dossiers

```
app/
  admin/                    # Zone admin (protégée)
    layout.tsx              # Layout avec vérification auth + menu
    page.tsx                # Dashboard
    actualites/
      page.tsx              # Liste articles
      nouveau/page.tsx      # Créer article
      [id]/page.tsx         # Modifier article
    partenaires/
    projets/
    evenements/
    formations/
    media/
    parametres/
  api/
    auth/[...nextauth]/     # NextAuth
    articles/
      route.ts              # GET liste, POST créer
      [id]/route.ts         # GET one, PATCH, DELETE
    upload/                 # Upload fichier
    ...
lib/
  prisma.ts                 # Client Prisma singleton
  auth.ts                   # Config NextAuth
prisma/
  schema.prisma
  migrations/
public/
  uploads/                  # Fichiers uploadés (à créer, gitignore partiel si besoin)
```

---

## Étapes d’implémentation (phases)

### Phase 1 — Fondations (priorité immédiate)
- [ ] Installer Prisma + SQLite, définir le schéma complet
- [ ] Installer NextAuth, configurer (Credentials ou magic link)
- [ ] Créer `app/admin/layout.tsx` (protégé) + page dashboard
- [ ] CRUD **Actualités** : API + pages admin (liste, créer, modifier)
- [ ] Adapter la page publique `/actualites` pour lire depuis l’API / Prisma

### Phase 2 — Contenu prioritaire
- [ ] CRUD **Partenaires** + catégories
- [ ] Adapter `/partenaires` pour utiliser les données
- [ ] CRUD **Projets** (sections + blocs : texte, listes, témoignages, images)
- [ ] Adapter `/asso/projets` pour afficher les projets depuis la BDD

### Phase 3 — Média et reste
- [ ] Route d’upload + table Media, liaison aux projets/articles/événements
- [ ] CRUD **Événements** + galeries
- [ ] CRUD **Formations** + texte de présentation Académie
- [ ] Page **Paramètres site** (contact, hero, légal) avec SiteSetting

### Phase 4 — Finalisation
- [ ] Rôles (admin / rédacteur) et permissions
- [ ] SEO (meta titre/description par page ou par entité)
- [ ] Menu éditable (optionnel)

---

## Sécurité

- Toutes les routes sous `/admin/*` et `/api/*` (sauf `/api/auth`) vérifient la session NextAuth.
- Les mots de passe sont hashés (bcrypt ou équivalent via NextAuth).
- Upload : vérifier type MIME et taille max ; stocker hors de `public` si besoin et servir via route API.

---

## Déploiement

- **SQLite** : possible pour petit trafic (fichier sur le serveur).
- **PostgreSQL** : recommandé en production (Vercel Postgres, Supabase, Railway, etc.) — changer `provider` dans Prisma et `DATABASE_URL` en prod.
- **Fichiers** : en prod, privilégier S3 ou Cloudinary pour les uploads.

---

## Ordre de travail recommandé

1. Lire ce plan et valider l’option B (admin intégré).
2. Implémenter la **Phase 1** (Prisma, NextAuth, admin Actualités).
3. Tester en local : créer/modifier un article, affichage sur `/actualites`.
4. Enchaîner Phase 2 puis 3 selon les priorités client.

Le code de la Phase 1 (schéma Prisma, auth, CRUD Actualités) est posé dans le projet pour servir de base.

---

## Upload d'images

- **API** : `POST /api/upload` (FormData, champ `file`). Fichiers enregistrés dans `public/uploads/`, entrée créée dans la table `Media`. Réponse : `{ url, id }`.
- **Composant** : `components/admin/ImageUpload.tsx` — zone glisser-déposer ou clic, champ URL éditable. Utilisé dans les formulaires article (nouveau + édition).
- **Validation** : `lib/image.ts` — `isValidImageSrc(url)` pour n’afficher une image `next/image` que si l’URL commence par `/` ou `http(s)://`, afin d’éviter l’erreur "Failed to parse src".

## Démarrage (Phase 1)

1. **Variables d’environnement**
   - Copier `.env.example` vers `.env`
   - Renseigner `DATABASE_URL`, `NEXTAUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`

2. **Base de données**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

3. **Lancer l’app**
   ```bash
   npm run dev
   ```

4. **Accès admin**
   - Aller sur `http://localhost:3000/admin`
   - Redirection vers `/admin/login` si non connecté
   - Se connecter avec `ADMIN_EMAIL` / `ADMIN_PASSWORD` (ex. admin@acture.org / changeme)
   - Créer un article dans Actualités, le publier, puis vérifier sur `/actualites`
