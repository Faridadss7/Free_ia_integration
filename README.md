# Free-IA-Integration — Site Web & Assets Multimédia

Landing page premium bilingue (FR/EN) pour le service d'intégration d'environnements IA locaux de Farid ADISSO. Ce projet inclut un site web React moderne, une boucle d'ambiance Remotion pour le Hero, et une vidéo de lancement HyperFrames de qualité professionnelle.

## 🎯 Projet

**Free-IA-Integration** est un service d'accompagnement qui configure un environnement de développement assisté par IA (Claude Code, Cursor, Cline, Roo Code...) directement sur la machine du client, connecté aux modèles via AgentRouter, avec scripts d'automatisation et support privé après installation.

**Porteur :** Farid ADISSO — Data Analyst Associate & Développeur, intégrateur IA spécialisé

## 🌐 Site Web Principal

### Stack Technique

- **Framework :** React 18.3.1
- **Build Tool :** Vite 5.4.11
- **Styling :** Tailwind CSS 3.4.19
- **Animation :** Lenis (scroll cinématique), GSAP (animations avancées)
- **Déploiement :** Netlify
- **Langues :** Français / Anglais (bilingue)

### Structure du Projet

```
├── src/
│   ├── components/       # Composants React (24 composants)
│   │   ├── Hero.jsx      # Section principale avec boucle d'ambiance
│   │   ├── Pricing.jsx   # Section tarifs (cartes Canva FR + React EN)
│   │   ├── FaqTerminal.jsx # FAQ style terminal interactif
│   │   └── ...
│   ├── hooks/            # Hooks personnalisés (useDarkMode, useTranslation, useSmoothScroll)
│   ├── translations/     # Dictionnaire bilingue FR/EN
│   └── styles/           # Styles globaux
├── public/              # Assets statiques
├── remotion/            # Projet Remotion isolé (boucle d'ambiance)
└── videos/              # Projet HyperFrames (vidéo de lancement)
```

### Fonctionnalités Clés

- **Bilingue FR/EN** : Système de traduction intégré avec hook `useTranslation`
- **Thème Sombre/Clair** : Bascule de thème avec persistance
- **Scroll Cinématique** : Lenis pour un défilement fluide et premium
- **Animations Premium** : Easing signature `cubic-bezier(0.16, 1, 0.3, 1)`, motion-first
- **Intro Terminal** : Scène d'intro style boot sequence (une fois par session)
- **FAQ Interactive** : Terminal Unix avec commandes cliquables
- **Wizard de Paiement** : Formulaire multi-étapes pour MTN MoMo / Moov Money
- **Accessibilité** : Respect de `prefers-reduced-motion`, ARIA labels

### Installation & Développement

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Build pour production
npm run build

# Preview du build
npm run preview

# Déploiement Netlify
npm run deploy
```

### Configuration

- **Variables d'environnement** : Copier `.env.example` vers `.env`
- **Cloudinary** : Pour l'onboarding des assets (optionnel)
- **Netlify** : Configuration automatique via `netlify.toml`

## 🎬 Boucle d'Ambiance Remotion

Projet Remotion isolé dans `remotion/` pour générer la boucle d'ambiance du Hero.

### Spécifications

- **Composition :** `AmbientLoop`
- **Dimensions :** 1920×1080
- **FPS :** 30
- **Durée :** 240 frames (8 secondes)
- **Bouclage :** Parfait (animations sinusoïdales périodiques)

### Design

- **Fond :** Nuit profond `#030712`
- **Accent :** Turquoise `#38bdf8` / Strong `#0ea5e9` / Soft `#7dd3fc`
- **Effet :** Réseau de nœuds turquoise reliés par des liens fins
- **Animation :** Halos diffus qui dérivent lentement, grain léger
- **Déterminisme :** Générateur pseudo-aléatoire à graine fixe (reproductible)

### Rendu

```bash
cd remotion

# Rendu WebM
npx remotion render AmbientLoop out/ambient.webm --codec=vp8

# Rendu MP4 (fallback)
npx remotion render AmbientLoop out/ambient.mp4 --codec=h264

# Poster image
npx remotion still AmbientLoop out/ambient-poster.jpg --frame=0
```

### Intégration

Les rendus doivent être copiés dans `public/assets/` et intégrés dans `Hero.jsx` avec :
- `<video>` en fond `-z-20`
- `autoPlay muted loop playsInline`
- Poster pour fallback
- Accessibilité : désactivation sous `prefers-reduced-motion`

## 🎥 Vidéo de Lancement HyperFrames

Vidéo premium de lancement créée avec HyperFrames, style OpenAI/Vercel/Linear/Cursor.

### Spécifications

- **Format :** 1920×1080, 30fps
- **Durée :** 72 secondes
- **Langue :** Français
- **Voix off :** ElevenLabs Charlie (masculin FR, deep/confident/energetic)
- **Scènes :** 8 scènes (Boot Sequence → Logo → Transformation → Workflow → Demo → Social Proof → Pricing → CTA)

### Structure des Scènes

1. **AI Boot Sequence** (0-5s) : Terminal boot, modules qui se cochent ✓
2. **Free-IA-Integration** (5-17s) : Logo construit par particules, constellation IA
3. **La Transformation** (17-27s) : `free-ai init` → chaos → workspace complet
4. **Le Workflow** (27-35s) : Flux User → AgentRouter → Modèles → Réponse
5. **Démonstration Réelle** (35-45s) : Captures du site en fenêtres glass
6. **Social Proof** (45-54s) : Témoignage Grâce D., badge Vérifié
7. **Les Packs** (54-67s) : Standard (1 000 FCFA) / Pro (3 000 FCFA)
8. **Final / CTA** (67-72s) : Réseau converge, `> free-ai launch`

### Rendu

```bash
cd videos/free-ia-integration

# Rendu HyperFrames
npx hyperframes render
```

### Note Technique

Le rendu a nécessité un contournement FFmpeg (problème de normalisation audio sur Windows) :
1. Rendu vidéo sans audio
2. Conversion des fichiers audio .wav → .aac
3. Assemblage manuel avec FFmpeg

**Fichier final :** `renders/free-ia-integration_final.mp4` (12.2 MB, 1m 11.9s)

## 🎨 Design System

### Palette de Couleurs

- **Fond nuit :** `#030712`
- **Accent :** `#38bdf8` (turquoise)
- **Accent Strong :** `#0ea5e9` (coral)
- **Accent Soft :** `#7dd3fc` (tile)
- **Texte :** `#f8fafc` (cream)
- **Surface :** `#0B1220` (navy)

### Typographie

- **Sans-serif :** Inter (display, body)
- **Monospace :** JetBrains Mono (terminal, code, labels)

### Animation

- **Easing signature :** `cubic-bezier(0.16, 1, 0.3, 1)`
- **Durées :** 160ms (interaction), 300ms (transition), 440ms (entrance)
- **Keyframes :** fade-up, scale-in, shimmer, glow-pulse, aurora, float

## 📦 Déploiement

### Netlify

Le projet est configuré pour le déploiement automatique sur Netlify :

```bash
npm run deploy
```

Configuration dans `netlify.toml` :
- Build command : `npm run build`
- Publish directory : `dist`
- Redirects pour SPA

### Variables d'Environnement

- `ELEVENLABS_API_KEY` : Pour la génération audio HyperFrames
- `CLOUDINARY_URL` : Pour l'onboarding des assets (optionnel)

## 📁 Assets

### Images

- `public/assets/pricing-standard-fr.png` : Carte Canva Pack Standard (FR)
- `public/assets/pricing-pro-fr.png` : Carte Canva Pack Pro (FR)

### Vidéo HyperFrames

- `videos/free-ia-integration/renders/free-ia-integration_final.mp4` : Vidéo finale avec audio

## 🤝 Contribution

Ce projet est principalement un portfolio personnel. Les contributions sont bienvenues pour :

- Corrections de bugs
- Améliorations de performance
- Traductions supplémentaires
- Accessibilité

## 📄 Licence

Propriété de Farid ADISSO. Tous droits réservés.

## 📞 Contact

- **Email** : faridadss1234@gmail.com
- **WhatsApp** : +229 01 58 17 24 31 
- **LinkedIn** : Farid ADISSO
- **GitHub** : https://github.com/Faridadss7/Free_ia_integration

## 🙏 Remerciements

- **Claude Code** : Assistant de développement IA pour la video 
- **HyperFrames** : Framework de création vidéo
- **Remotion** : Framework de vidéo React
- **ElevenLabs** : Synthèse vocale premium
- **Tailwind CSS** : Framework CSS utility-first

---

**Développé avec ❤️ par Farid ADISSO**
