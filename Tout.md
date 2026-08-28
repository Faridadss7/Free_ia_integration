# Architecture Technique & Spécifications de Design — Free-IA-Integration

Ce document recense l'intégralité de la **stack technique**, du **système de design**, des **tokens CSS**, des **animations** et des **spécifications techniques section par section** composant le site web.

---

## 1. Stack Technique Globale

| Domaine | Technologie / Bibliothèque | Version / Rôle |
| :--- | :--- | :--- |
| **Framework UI** | React | `^18.3.1` (Architecture composant modulaire, Hooks personnalisés) |
| **Bundler & Dev Server** | Vite | `^5.4.11` (HMR ultra-rapide, build optimisé Rollup) |
| **Styling & Moteur CSS** | Tailwind CSS | `^3.4.19` (Utilitaires branchés sur Design Tokens CSS natifs) |
| **Post-traitement CSS** | PostCSS & Autoprefixer | `^8.5.19` / `^10.5.4` |
| **Moteur d'Animation** | Framer Motion | `^13.1.1` (Entrées échelonnées, transitions de layout) |
| **Défilement Doux** | Lenis | `^1.3.25` (Scroll cinématique inertiel, fallback natif) |
| **Moteur Vidéo / Motion** | Remotion | `remotion/` (Composition programmée de boucles d'ambiance) |
| **Internationalisation** | Custom i18n Hook | `translations.js` (Architecture bilingue FR/EN sans runtime lourd) |
| **Stockage & Déploiement** | Netlify & Cloudinary | Déploiement CI/CD continu, CDN pour assets lourds |

---

## 2. Système de Design & Tokens (Design System)

Le design repose sur une esthétique **"Linear / Apple / Vercel"** : sombre, minimaliste, hyper-précise avec des micro-interactions soignées.

### 2.1. Palette de Couleurs (Mode Sombre & Mode Clair)

```
                       PALETTE PRINCIPALE
 ┌─────────────────┬─────────────────┬─────────────────┐
 │   Noir Obsidian │ Émeraude Accent │  Ambre Console  │
 │     #09090b     │     #10b981     │     #f59e0b     │
 └─────────────────┴─────────────────┴─────────────────┘
```

#### Mode Sombre (Dark Theme — Défaut)
- **Fond de page (`--color-bg`)** : `#09090b` (Obsidian Deep)
- **Surfaces (`--color-surface`)** : `#121215` (Graphite)
- **Surfaces Translucides (`--color-surface-translucent`)** : `rgba(18, 18, 21, 0.85)`
- **Surfaces Surélevées (`--color-surface-raised`)** : `#18181b` (Carbon)
- **Bordures Hairline (`--color-border`)** : `#27272a` (1px subtil)
- **Bordures Fortes (`--color-border-strong`)** : `#3f3f46`
- **Texte Principal (`--color-text`)** : `#fafafa` (Blanc Albâtre)
- **Texte Atténué (`--color-text-muted`)** : `#a1a1aa` (Gris Neutre)
- **Couleur Accent Primaire (`--color-accent`)** : `#10b981` (Émeraude)
- **Accent Fort (`--color-accent-strong`)** : `#059669`
- **Accent Doux (`--color-accent-soft`)** : `#34d399`
- **Accent Ambre (`--color-amber`)** : `#f59e0b`

#### Mode Clair (Light Theme)
- **Fond de page (`--color-bg`)** : `#fafafa`
- **Surfaces (`--color-surface`)** : `#ffffff`
- **Surfaces Translucides (`--color-surface-translucent`)** : `rgba(255, 255, 255, 0.90)`
- **Surfaces Surélevées (`--color-surface-raised`)** : `#f4f4f5`
- **Bordures (`--color-border`)** : `#e4e4e7`
- **Texte Principal (`--color-text`)** : `#09090b`
- **Texte Atténué (`--color-text-muted`)** : `#71717a`
- **Accent Primaire (`--color-accent`)** : `#059669`

### 2.2. Typographie
- **Police Sans (Corps & UI)** : `"Plus Jakarta Sans"`, system-ui, sans-serif
- **Police Display (Titres & Chiffres Clés)** : `"Space Grotesk"`, sans-serif
- **Police Monospace (Code & Terminal)** : `"JetBrains Mono"`, ui-monospace, monospace

### 2.3. Rayons de Courbure (Border Radius)
- **`--radius-sm`** : `6px` (Badges, tags)
- **`--radius-md`** : `10px` (Champs de formulaire, boutons)
- **`--radius-lg`** : `14px` (Cartes, bento)
- **`--radius-xl`** : `18px` (Modales, conteneurs majeurs)
- **`--radius-full`** : `999px` (Pilules de statut)

### 2.4. Ombres & Élévations
- **`--shadow-elevation-sm`** : `0 1px 2px rgba(0, 0, 0, 0.4)`
- **`--shadow-elevation-md`** : `0 4px 12px -2px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.04)`
- **`--shadow-elevation-lg`** : `0 12px 28px -6px rgba(0, 0, 0, 0.75), 0 0 1px 1px rgba(255, 255, 255, 0.06)`
- **`--shadow-elevation-xl`** : `0 24px 48px -12px rgba(0, 0, 0, 0.85)`
- **`--shadow-accent-md`** : `0 6px 20px -4px rgba(16, 185, 129, 0.4)`
- **`--shadow-glow-emerald`** : `0 0 30px -5px rgba(16, 185, 129, 0.25)`

### 2.5. Easing & Courbes d'Animation
- **Courbe Signature** : `cubic-bezier(0.16, 1, 0.3, 1)` (Inertie rapide avec amorti progressif)
- **Durée Interaction** : `160ms`
- **Durée Transition** : `250ms` - `300ms`
- **Durée Entrée de Section** : `400ms` - `440ms`

---

## 3. Effets Spéciaux & Micro-Interactions

1. **Grain SVG & Vignette Fixes** :
   - Pseudo-éléments `body::before` et `body::after` générant un micro-bruit fractal (`feTurbulence`) à 3.5% d'opacité combiné à un dégradé radial d'assombrissement des bords.
2. **Aurora Mesh Background (`GlowBackground.jsx`)** :
   - Dégradés radiaux animés (`aurora 24s infinite`) dérivant en arrière-plan avec halos néon vert/émeraude/bleu nuit.
3. **Curseur Fluide (`CustomCursor.jsx`)** :
   - Point suiveur précis avec anneau d'inertie physique réactif aux survols de boutons et liens (désactivé sur écran tactile et sous `prefers-reduced-motion`).
4. **Effet 3D Tilt Physique (`useTilt.js`)** :
   - Calcul vectoriel de la position du pointeur par rapport au centre de la carte (`transform: perspective(1000px) rotateX(...) rotateY(...) scale(...)`).
5. **Border Beam (`BorderBeam.jsx`)** :
   - Rayon lumineux laser tournant en continu le long du périmètre des cartes mises en avant (`offset-path: rect(...)`).
6. **Spotlight Cards (`spotlight-host`)** :
   - Halo lumineux radial suivant les coordonnées du curseur de la souris à l'intérieur des conteneurs.

---

## 4. Spécifications Détaillées Section par Section

```
┌─────────────────────────────────────────────────────────────┐
│ 00. Intro Terminal Scene (sessionStorage lock)              │
├─────────────────────────────────────────────────────────────┤
│ 01. Sticky Header & Glass Navigation                        │
├─────────────────────────────────────────────────────────────┤
│ 02. Hero Section + 3D Interactive Cockpit                   │
├─────────────────────────────────────────────────────────────┤
│ 03. Tech Marquee (Double Row Infinite Loop)                 │
├─────────────────────────────────────────────────────────────┤
│ 04. Interactive Bento Grid (System Features)                │
├─────────────────────────────────────────────────────────────┤
│ 05. ROI & Subscription Savings Calculator                   │
├─────────────────────────────────────────────────────────────┤
│ 06. Demo Video Showcase                                     │
├─────────────────────────────────────────────────────────────┤
│ 07. Before / After Comparison Matrix                        │
├─────────────────────────────────────────────────────────────┤
│ 08. Visual Proofs & Screenshots Grid                        │
├─────────────────────────────────────────────────────────────┤
│ 09. Training Curriculum (Masterclass 6 Modules)             │
├─────────────────────────────────────────────────────────────┤
│ 10. Why Us / Value Proposition Grid                         │
├─────────────────────────────────────────────────────────────┤
│ 11. Infinite Testimonials Stream                            │
├─────────────────────────────────────────────────────────────┤
│ 12. Animated Stats Band                                     │
├─────────────────────────────────────────────────────────────┤
│ 13. Interactive Pricing Cards + BorderBeam                  │
├─────────────────────────────────────────────────────────────┤
│ 14. Free Guide Download & Setup Packs                       │
├─────────────────────────────────────────────────────────────┤
│ 15. High-Energy CTA Conversion Banner                       │
├─────────────────────────────────────────────────────────────┤
│ 16. Unix Terminal FAQ Console                               │
├─────────────────────────────────────────────────────────────┤
│ 17. Technical Footer                                        │
├─────────────────────────────────────────────────────────────┤
│ 18. Payment & Order Wizard Modal (4-step flow)              │
└─────────────────────────────────────────────────────────────┘
```

### 00. Scène d'Introduction (`IntroScene.jsx`)
- **Structure** : Écran plein format noir absolu avec console de boot Unix.
- **Comportement** : Séquence de démarrage automatique, chargement des modules IA, affichage ASCII art, mémorisation dans `sessionStorage` (`intro-seen = "1"`), touche "Passer" accessible.
- **Règles** : Uniquement jouée en mode sombre ; contournée automatiquement en mode clair.

### 01. En-Tête Sticky (`Header.jsx`)
- **Structure** : Barre flottante fixée en haut avec flou d'arrière-plan (`backdrop-blur-md` + `bg-surface-translucent`).
- **Éléments** : Logo textuel avec point d'état vert pulsé, liens d'ancrage avec surbrillance, bascule de thème sombre/clair avec icônes SVG Sun/Moon, sélecteur de langue bilingue FR/EN, bouton CTA, menu tiroir responsive avec piégeage de focus clavier (`Escape`).

### 02. Section Hero & Cockpit Interactif (`Hero.jsx` & `HeroCockpit.jsx`)
- **Structure** : Titre échelonné avec dégradé de texte animé (`text-gradient-animated`), sous-titre calibré, double CTA (action principale + ancre démo).
- **Cockpit 3D** : Fenêtre de terminal avec effet verre (`glass-cockpit`), tabs commutables (Claude Code, Cursor, Roo Code), simulation de frappe interactive, console de logs en streaming et indicateur de latence en direct.

### 03. Défilement Infini des Technologies (`TechMarquee.jsx`)
- **Structure** : Double rangée de badges technologiques à défilement horizontal infini (`marquee` et `marquee-reverse`).
- **Comportement** : Boucle continue accélérée matériellement (`will-change: transform`), pause au survol de la souris.

### 04. Bento Grid Interactive (`InteractiveBento.jsx`)
- **Structure** : Disposition modulaire asymétrique (grille Bento CSS).
- **Comportement** : Cartes avec effet Spotlight interactif, visualisations graphiques des flux de routage, gestion des clés d'API et agents connectés.

### 05. Simulateur de Rentabilité / ROI (`RoiCalculator.jsx`)
- **Structure** : Interface de calcul financier dynamique.
- **Comportement** : Sélecteur de cases à cocher (Cursor, Claude, GPT, Copilot), calcul automatique en temps réel des dépenses évitées par an (convertible FCFA / EUR), visualiseur de jauges graphiques comparatives.

### 06. Démonstration Vidéo (`DemoSection.jsx`)
- **Structure** : Cadre vidéo avec commandes personnalisées (lecture/pause, timeline, plein écran), enrobage stylisé et badges d'authenticité.

### 07. Comparateur Avant / Après (`BeforeAfterSection.jsx`)
- **Structure** : Matrice comparative côte-à-côte avec indicateurs visuels rouges (contraintes traditionnelles) vs verts (avantages de l'intégration locale).

### 08. Galerie de Preuves & Captures (`ScreenshotGrid.jsx`)
- **Structure** : Grille Bento de captures d'écran haute résolution dans des cadres vitrés.
- **Comportement** : Cartes avec effet de bascule bilingue au survol (`PROOF_CARDS`), zoom subtil et ombres d'élévation.

### 09. Programme de Formation Payante (`TrainingCurriculum.jsx`)
- **Structure** : Sélecteur interactif 6 modules en colonne gauche + panneau d'inspection détaillé en colonne droite.
- **Comportement** : Commutation dynamique du module actif, affichage des compétences certifiées et livrables concrets, badges de temps, bloc tarifaire de lancement avec `BorderBeam` et ouverture immédiate de la commande.

### 10. Pourquoi Nous & Valeurs (`WhySection.jsx` & `ValueGrid.jsx`)
- **Structure** : Cartes techniques avec icônes vectorielles personnalisées (`VALUE_ICONS`, `WHY_ICONS`), effet de profondeur 3D (`useTilt`) et bordures dynamiques au survol.

### 11. Témoignages en Flux Infini (`InfiniteTestimonials.jsx` & `Testimonials.jsx`)
- **Structure** : Défilement continu de cartes d'avis clients avec note 5 étoiles, citation, rôle et badge d'authenticité vérifié.

### 12. Bandeau de Statistiques Animées (`StatsBand.jsx`)
- **Structure** : Grille de métriques clés déclenchée au scroll (`IntersectionObserver`) avec animation de montée des chiffres de 0 à la valeur cible.

### 13. Grille Tarifaire Interactive (`Pricing.jsx`)
- **Structure** : Cartes forfaits avec effet de perspective 3D, faisceau lumineux laser tournant (`BorderBeam`), liste d'inclusions cochées, badge "Le plus choisi" et déclenchement de la modale d'achat.

### 14. Guide Gratuit & Packs d'Installation (`GuideSection.jsx`)
- **Structure** : Carte de téléchargement direct de document PDF + cartes des packs d'installation d'environnements (liste des IDEs et agents supportés).

### 15. Bandeau CTA de Conversion Finale (`CtaBanner.jsx`)
- **Structure** : Bloc d'action haute énergie avec aura radiale pulsante, typographie d'accroche et boutons d'ancrage rapide.

### 16. Console FAQ Unix Interactive (`FaqTerminal.jsx`)
- **Structure** : Invite de commande Unix émulée (`shellPrompt`).
- **Comportement** : Boutons sous forme de scripts exécutables (`./requirements.sh`, `./duration.sh`, etc.) avec simulation de saisie de texte lettre par lettre (effet machine à écrire) et bouton de redirection WhatsApp personnalisé.

### 17. Pied de Page Technique (`Footer.jsx`)
- **Structure** : Liens sociaux, métadonnées de copyright, mentions techniques et bouton WhatsApp prérempli.

### 18. Modale de Tunnel de Commande (`PaymentWizard.jsx`)
- **Structure** : Modale accessible avec masque de fond flouté et navigation en 4 étapes :
  1. *Étape 1* : Saisie des coordonnées client (Nom, Email, WhatsApp).
  2. *Étape 2* : Choix de l'opérateur (MTN MoMo, Moov Money, Virement) avec bouton de copie automatique du numéro bénéficiaire.
  3. *Étape 3* : Renseignement de l'ID de transaction et dépôt de capture d'écran du transfert (drag & drop d'image avec prévisualisation).
  4. *Étape 4* : Écran de confirmation de prise en charge et instructions de suivi technique.

---

## 5. Gestion de l'Accessibilité & Performance

- **`prefers-reduced-motion`** : Désactivation automatique de Lenis, du curseur personnalisé, des effets de rotation 3D et des animations continues pour les utilisateurs sensibles.
- **Zero CLS (Cumulative Layout Shift)** : Ratios d'aspect fixes pour les vidéos, images et conteneurs Bento.
- **Ressources Vectorielles Inline** : Toutes les icônes SVG sont encapsulées sans dépendance réseau externe pour un temps de chargement immédiat.
- **Gestion du Focus & Navigation Clavier** : Piégeage du focus dans les modales et navigation accessible aux lecteurs d'écran (attributs `aria-labelledby`, `aria-hidden`, rôles `button` et `dialog`).
