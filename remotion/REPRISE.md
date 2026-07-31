# Reprise — Loop d'ambiance Remotion (Hero)

État au moment de la pause (session interrompue pour limite de longueur).

## Ce qui est FAIT
- Remotion installé dans le dossier isolé `remotion/` (package.json + node_modules propres, n'affecte PAS le bundle Vite du site).
- Compositions écrites :
  - `remotion/remotion.config.js`
  - `remotion/src/index.js` (entrée)
  - `remotion/src/Root.jsx` (composition « AmbientLoop », 1920×1080, 30fps, 240 frames = 8s, bouclage parfait)
  - `remotion/src/AmbientLoop.jsx` (réseau de nœuds turquoise + halos dérivants + grain, charte exacte du site)
- Charte utilisée : fond nuit `#030712`, accent `#38bdf8` / strong `#0ea5e9` / soft `#7dd3fc`, easing `cubic-bezier(0.16,1,0.3,1)`.
- Le site principal build clean (66 modules) ; cartes Canva FR déjà intégrées dans `Pricing.jsx` (voir plus bas).

## Ce qui RESTE à faire (tâches #21, #22)
1. **Rendre la vidéo** depuis `remotion/` :
   - webm : `npx remotion render AmbientLoop out/ambient.webm --codec=vp8` (ou vp9)
   - mp4 (fallback) : `npx remotion render AmbientLoop out/ambient.mp4 --codec=h264`
   - poster (1re frame) : `npx remotion still AmbientLoop out/ambient-poster.jpg --frame=0`
   - Vérifier le nom EXACT de la composition dans Root.jsx (id="AmbientLoop") avant de lancer.
2. **Copier** les rendus vers `public/assets/` (ex. `ambient.webm`, `ambient.mp4`, `ambient-poster.jpg`).
3. **Intégrer au Hero** (`src/components/Hero.jsx`) :
   - Ajouter un `<video>` en fond, encore plus profond que le projecteur existant (qui est en `-z-10`) → mettre la vidéo en `-z-20` et le `<section>` `relative`.
   - `autoPlay muted loop playsInline`, `poster="/assets/ambient-poster.jpg"`, sources webm puis mp4.
   - Overlay dégradé (bg → transparent) au-dessus de la vidéo pour garder le texte lisible.
   - **Accessibilité** : sous `prefers-reduced-motion`, ne PAS jouer la vidéo → afficher seulement le poster (soit via JS avec matchMedia comme dans les hooks existants, soit ne monter le <video> que si mouvement autorisé). Voir le pattern déjà utilisé dans `useTilt.js` / `Reveal.jsx` / `useSmoothScroll.js`.
4. **Vérifier** : `npm run build` puis test Playwright (vidéo chargée, texte lisible, reduced-motion = poster). Nettoyer les fichiers temporaires.

## Décisions déjà prises avec l'utilisateur
- Remotion = « bannière/loop d'ambiance » pour le Hero (pas d'usage live, juste un asset rendu).
- Cartes forfaits : visuels Canva en FR, cartes React thème-aware en EN (déjà intégré et vérifié en live).
  - Assets FR : `public/assets/pricing-standard-fr.png`, `public/assets/pricing-pro-fr.png`.
  - Designs Canva : Standard `DAHPziGXcq0`, Pro `DAHPzpSbwyk` (candidat « Luxurious », feature « 20 plugins » fusionnée dans la ligne scripts, sauvegardé).
- Site = React+Vite+Tailwind, bilingue FR/EN (translations.js), thème sombre/clair, deploy Netlify. Aucune nouvelle dépendance dans le bundle site (Remotion reste isolé).

## Attention
- Le rendu Remotion peut être long (Chromium headless). Lancer en arrière-plan.
- Les cartes Canva ont un fond sombre « cuit » : en thème clair sur le site FR, elles restent sombres (accepté par l'utilisateur).
