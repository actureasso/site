# 🎨 Animations et Dynamisme - Guide

## ✨ Animations ajoutées

### 1. **Framer Motion** - Bibliothèque d'animations
- Animations fluides et performantes
- Support des animations au scroll
- Micro-interactions

### 2. **Composants animés créés**

#### `AnimatedSection.tsx`
- Animation d'apparition au scroll
- Fade-in avec translation verticale
- Utilisation : `<AnimatedSection>Votre contenu</AnimatedSection>`

#### `AnimatedCard.tsx`
- Animation de carte avec scale
- Effet hover avec élévation
- Utilisation : `<AnimatedCard delay={0.2}>Votre carte</AnimatedCard>`

### 3. **Animations CSS personnalisées**

#### Dans `globals.css` :
- **`.animate-float`** - Animation de flottement
- **`.animate-pulse-glow`** - Pulsation avec lueur
- **`.animate-gradient`** - Dégradé animé
- **`.hover-lift`** - Effet de levée au survol
- **`.transition-smooth`** - Transitions fluides

### 4. **Animations sur la page d'accueil**

#### Hero Banner :
- Titre : Animation spring depuis le haut
- Sous-titre : Fade-in avec délai
- Boutons : Scale au hover et tap

#### Cartes des entités :
- Apparition progressive au scroll
- Icônes animées (rotation subtile)
- Liste d'éléments avec stagger (apparition décalée)
- Effet hover avec élévation

#### Section valeurs :
- Grille avec animation stagger
- Icônes flottantes (animation infinie)
- Scale et translation au hover

#### Appels à action :
- Animation de dégradé en arrière-plan
- Boutons avec scale au hover

### 5. **Header animé**

#### Desktop :
- Logo avec scale au hover
- Liens avec soulignement animé
- Menus déroulants avec fade-in
- Header qui change d'ombre au scroll

#### Mobile :
- Menu hamburger avec rotation
- Menu qui s'ouvre/ferme avec animation
- Items du menu avec stagger

### 6. **Effets visuels**

- **Dégradés animés** sur les sections hero
- **Smooth scroll** activé
- **Transitions** améliorées partout
- **Shadows** dynamiques au hover

## 🚀 Installation

Pour activer les animations, installez les dépendances :

```bash
npm install
```

Cela installera `framer-motion` et toutes les autres dépendances.

## 📝 Utilisation

### Exemple basique :
```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Contenu animé
</motion.div>
```

### Avec les composants réutilisables :
```tsx
import AnimatedSection from '@/components/AnimatedSection'

<AnimatedSection delay={0.2}>
  <h2>Titre animé</h2>
</AnimatedSection>
```

## 🎯 Bonnes pratiques

1. **Performance** : Les animations utilisent `viewport={{ once: true }}` pour ne s'animer qu'une fois
2. **Accessibilité** : Respecte les préférences de mouvement réduit
3. **Mobile** : Animations optimisées pour les appareils tactiles
4. **Délais** : Utilisez des délais pour créer un effet stagger naturel

## 🔧 Personnalisation

Vous pouvez ajuster les animations dans :
- `components/AnimatedSection.tsx` - Modifier les paramètres d'apparition
- `components/AnimatedCard.tsx` - Modifier l'effet de carte
- `app/globals.css` - Modifier les animations CSS

## 📱 Compatibilité

- ✅ Chrome/Edge (dernières versions)
- ✅ Firefox (dernières versions)
- ✅ Safari (dernières versions)
- ✅ Mobile (iOS/Android)

Les animations se désactivent automatiquement si l'utilisateur préfère les mouvements réduits (respecte `prefers-reduced-motion`).

