/**
 * icons.jsx — Bibliothèque d'icônes SVG inline.
 *
 * Aucune dépendance externe (pas de react-icons / lucide) : chaque icône est un
 * composant React renvoyant un <svg> vectoriel, ce qui garantit un rendu net à
 * toute taille, un poids nul côté réseau et un contrôle total sur la couleur.
 *
 * Convention :
 *  - La couleur suit `currentColor` (hérite de la couleur de texte du parent).
 *  - Toutes les icônes acceptent `size` (nombre de px, défaut 20) et propagent
 *    les autres props (`className`, `aria-hidden`, etc.) sur le <svg>.
 *  - Décoratives par défaut (`aria-hidden`) : le libellé accessible est porté
 *    par l'élément parent (lien / bouton).
 */

/**
 * @typedef {object} IconProps
 * @property {number} [size=20]        Largeur/hauteur en pixels.
 * @property {string} [className]      Classe CSS optionnelle.
 */

/** Icône GitHub. @param {IconProps} props */
export function IconGitHub({ size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.575.106.785-.25.785-.556 0-.274-.01-1.002-.015-1.967-3.196.695-3.87-1.54-3.87-1.54-.523-1.328-1.277-1.682-1.277-1.682-1.043-.713.08-.699.08-.699 1.153.081 1.76 1.184 1.76 1.184 1.026 1.758 2.692 1.25 3.348.956.104-.743.402-1.25.73-1.538-2.552-.29-5.236-1.276-5.236-5.679 0-1.254.448-2.28 1.183-3.084-.119-.29-.513-1.46.112-3.043 0 0 .965-.309 3.163 1.178a10.98 10.98 0 0 1 2.88-.388c.977.004 1.962.132 2.882.388 2.196-1.487 3.16-1.178 3.16-1.178.626 1.583.232 2.753.114 3.043.737.804 1.18 1.83 1.18 3.084 0 4.414-2.688 5.386-5.25 5.67.413.356.78 1.057.78 2.13 0 1.538-.014 2.778-.014 3.156 0 .309.208.668.79.555A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

/** Icône LinkedIn. @param {IconProps} props */
export function IconLinkedIn({ size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

/** Icône Soleil (mode clair). @param {IconProps} props */
export function IconSun({ size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

/** Icône Lune (mode sombre). @param {IconProps} props */
export function IconMoon({ size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

/* =============================================================================
   Icônes fonctionnelles — CTA du Hero et cartes de la Value Grid.
   Style « line » cohérent : stroke = currentColor, épaisseur 1.6.
   ========================================================================== */

/**
 * Base commune pour les icônes « line ».
 * @param {IconProps & { children: React.ReactNode }} props
 */
function LineIcon({ size = 24, children, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Flèche vers la droite (CTA primaire). @param {IconProps} props */
export function IconArrowRight(props) {
  return (
    <LineIcon {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </LineIcon>
  );
}

/**
 * Spinner d'attente — arc de cercle ouvert (à faire tourner via `animate-spin`).
 * Sobre : simple trait, hérite de `currentColor`. Utilisé pendant l'envoi de la
 * commande (état transitoire), jamais en décoration permanente. @param {IconProps} props
 */
export function IconSpinner(props) {
  return (
    <LineIcon {...props}>
      <path d="M12 3a9 9 0 1 0 9 9" />
    </LineIcon>
  );
}

/** Bouton lecture (CTA démonstration). @param {IconProps} props */
export function IconPlay(props) {
  return (
    <LineIcon {...props}>
      <path d="M8 5.14v13.72a.5.5 0 0 0 .77.42l10.29-6.86a.5.5 0 0 0 0-.84L8.77 4.72A.5.5 0 0 0 8 5.14Z" />
    </LineIcon>
  );
}

/** Terminal — « Installation complète ». @param {IconProps} props */
export function IconTerminal(props) {
  return (
    <LineIcon {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="m7 9 3 3-3 3M13 15h4" />
    </LineIcon>
  );
}

/** Bouclier — « Configuration sécurisée ». @param {IconProps} props */
export function IconShield(props) {
  return (
    <LineIcon {...props}>
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9.5 12 1.7 1.7 3.3-3.4" />
    </LineIcon>
  );
}

/** Chevrons/variable — « Variables d'environnement ». @param {IconProps} props */
export function IconVariable(props) {
  return (
    <LineIcon {...props}>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 6l-3 12" />
    </LineIcon>
  );
}

/** Calques — « IDE optimisés ». @param {IconProps} props */
export function IconLayers(props) {
  return (
    <LineIcon {...props}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
    </LineIcon>
  );
}

/** Éclair — « Scripts d'automatisation ». @param {IconProps} props */
export function IconBolt(props) {
  return (
    <LineIcon {...props}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </LineIcon>
  );
}

/** Groupe — « Support privé ». @param {IconProps} props */
export function IconUsers(props) {
  return (
    <LineIcon {...props}>
      <path d="M16 19v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="3.5" />
      <path d="M22 19v-2a4 4 0 0 0-3-3.87M16 3.5a4 4 0 0 1 0 7" />
    </LineIcon>
  );
}

/** Coche « check » — badges de confiance. @param {IconProps} props */
export function IconCheck(props) {
  return (
    <LineIcon {...props}>
      <path d="m4 12 5 5L20 6" />
    </LineIcon>
  );
}

/** Croix — fermeture de modale. @param {IconProps} props */
export function IconClose(props) {
  return (
    <LineIcon {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </LineIcon>
  );
}

/** Menu — hamburger (trois traits) pour la navigation mobile. @param {IconProps} props */
export function IconMenu(props) {
  return (
    <LineIcon {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </LineIcon>
  );
}

/** Copier — duplique deux feuillets superposés. @param {IconProps} props */
export function IconCopy(props) {
  return (
    <LineIcon {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </LineIcon>
  );
}

/** Upload — flèche montante depuis un socle. @param {IconProps} props */
export function IconUpload(props) {
  return (
    <LineIcon {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M12 3v13M7 8l5-5 5 5" />
    </LineIcon>
  );
}

/** Code — chevrons de programmation. @param {IconProps} props */
export function IconCode(props) {
  return (
    <LineIcon {...props}>
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </LineIcon>
  );
}

/** Fusée — performance / mise en orbite. @param {IconProps} props */
export function IconRocket(props) {
  return (
    <LineIcon {...props}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </LineIcon>
  );
}

/** Casque support — assistance directe. @param {IconProps} props */
export function IconHeadset(props) {
  return (
    <LineIcon {...props}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2ZM20 14a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2Z" />
      <path d="M17 18v1a3 3 0 0 1-3 3h-2" />
    </LineIcon>
  );
}

/** Éclair de réactivité — réutilise l'esthétique bolt à trait fin. @param {IconProps} props */
export function IconSpark(props) {
  return (
    <LineIcon {...props}>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" />
    </LineIcon>
  );
}

/**
 * Icône Étoile — note d'avis. Remplie par défaut (`filled`), ou contour seul
 * pour représenter la portion non atteinte d'une note.
 * @param {IconProps & { filled?: boolean }} props
 */
export function IconStar({ size = 20, filled = true, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? "0" : "1.6"}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.11-6.46-4.7-4.58 6.49-.94L12 2.5z" />
    </svg>
  );
}

/**
 * Icône Guillemet — ornement de citation dans les cartes de témoignage.
 * @param {IconProps} props
 */
export function IconQuote({ size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M9.5 5C6.46 5 4 7.46 4 10.5c0 2.9 2.24 5.28 5.09 5.48-.53 1.66-1.86 2.86-3.59 3.52a.6.6 0 0 0 .3 1.15c3.9-.6 6.7-3.8 6.7-8.15V10.5C12.5 7.46 11.04 5 9.5 5zm10 0C16.46 5 14 7.46 14 10.5c0 2.9 2.24 5.28 5.09 5.48-.53 1.66-1.86 2.86-3.59 3.52a.6.6 0 0 0 .3 1.15c3.9-.6 6.7-3.8 6.7-8.15V10.5C22.5 7.46 21.04 5 19.5 5z" />
    </svg>
  );
}

/**
 * Icône Coche à badge — pastille « Vérifié » des témoignages.
 * @param {IconProps} props
 */
export function IconBadgeCheck({ size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 2.5l2.35 1.7 2.9-.05 1.05 2.7 2.35 1.7-.9 2.75.9 2.75-2.35 1.7-1.05 2.7-2.9-.05L12 21.5l-2.35-1.7-2.9.05-1.05-2.7L3.35 15.4l.9-2.75-.9-2.75 2.35-1.7 1.05-2.7 2.9.05L12 2.5z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/**
 * Table de correspondance id de service → composant d'icône.
 * Permet à la Value Grid de résoudre l'icône depuis l'`id` du dictionnaire.
 * @type {Record<string, (props: IconProps) => JSX.Element>}
 */
export const VALUE_ICONS = {
  install: IconTerminal,
  secure: IconShield,
  env: IconVariable,
  ide: IconLayers,
  scripts: IconBolt,
  support: IconUsers,
};

/**
 * Table de correspondance id de point « Pourquoi moi ? » → composant d'icône.
 * @type {Record<string, (props: IconProps) => JSX.Element>}
 */
export const WHY_ICONS = {
  fullstack: IconCode,
  ai: IconRocket,
  secure: IconShield,
  assist: IconHeadset,
  reactive: IconSpark,
};

/* =============================================================================
   Logos Officiels des Outils & Modèles IA (Vectoriels & Fidèles aux Marques)
   ============================================================================= */

/** Logo Officiel OpenAI / ChatGPT */
export function IconLogoOpenAI({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.08 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.493zm-9.66-4.32a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.84zm-1.63-8.818a4.464 4.464 0 0 1 2.338-1.972V13.1a.78.78 0 0 0 .387.68l5.84 3.37-2.02 1.166a.07.07 0 0 1-.07 0l-4.83-2.79A4.508 4.508 0 0 1 1.97 9.292zm16.108 3.843l-5.844-3.37 2.02-1.166a.07.07 0 0 1 .07 0l4.83 2.79a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.4-.681zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L8.889 10.45V8.118a.08.08 0 0 1 .033-.062l4.84-2.793a4.5 4.5 0 0 1 6.326 4.035zm-11.458-2.54l2.02-1.167a.07.07 0 0 1 .07 0l4.83 2.79a4.504 4.504 0 0 1-1.8 8.497v-5.678a.79.79 0 0 0-.39-.681L9.74 10.45zM10.865 13.91l2.585-1.492 2.585 1.492v2.985l-2.585 1.493-2.585-1.493z" />
    </svg>
  );
}

/** Logo Officiel Anthropic / Claude */
export function IconLogoClaude({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M13.827 2.5h3.913l6.26 18.995h-3.914l-1.378-4.22H12.87l-1.379 4.22H7.577L13.827 2.5zm3.705 11.666L15.783 7.85l-1.75 6.316h3.499zM0 21.495L6.26 2.5h3.913L3.913 21.495H0z" />
    </svg>
  );
}

/** Logo Officiel Cursor AI */
export function IconLogoCursor({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M11.23 2.19a1.5 1.5 0 0 1 1.54 0l8.5 5.09a1.5 1.5 0 0 1 .73 1.29v9.86a1.5 1.5 0 0 1-.73 1.29l-8.5 5.09a1.5 1.5 0 0 1-1.54 0l-8.5-5.09a1.5 1.5 0 0 1-.73-1.29V8.57a1.5 1.5 0 0 1 .73-1.29l8.5-5.09zM12 4.14 4.5 8.63 12 13.12l7.5-4.49L12 4.14zm-8 6.22v7.27l7 4.19v-7.27l-7-4.19zm9 11.46 7-4.19v-7.27l-7 4.19v7.27z" />
    </svg>
  );
}

/** Logo Officiel GitHub Copilot */
export function IconLogoCopilot({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

/** Logo Tokens API / Puce & Infrastructure */
export function IconLogoTokensApi({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  );
}

/** Logo Officiel Google AI / Gemini */
export function IconLogoGoogleAI({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
    </svg>
  );
}

/** Logo Officiel Antigravity IDE */
export function IconLogoAntigravity({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 4-4 4 4" />
      <path d="M12 8v8" />
    </svg>
  );
}

/** Logo Officiel Suno AI */
export function IconLogoSuno({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 10v4M6 6v12M10 3v18M14 8v8M18 5v14M22 10v4" />
    </svg>
  );
}

/** Logo Officiel VS Code */
export function IconLogoVSCode({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.583.063a1.5 1.5 0 0 0-.974.341l-9.87 8.358-4.42-3.35a1.125 1.125 0 0 0-1.572.247L.18 6.467a1.125 1.125 0 0 0 .247 1.572L4.35 11.05.427 15.96a1.125 1.125 0 0 0-.247 1.573l.567.808a1.125 1.125 0 0 0 1.572.247l4.42-3.35 9.87 8.358a1.5 1.5 0 0 0 2.456-1.144V1.207A1.5 1.5 0 0 0 17.583.063zm-.083 4.294v15.286l-7.795-6.602 7.795-8.684z" />
    </svg>
  );
}

/** Logo Officiel DeepSeek */
export function IconLogoDeepSeek({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-3.62 2.4-6.68 5.75-7.64.44.75 1.05 1.76 1.75 3.01.21.37.52.88.9 1.48-1.42 1.02-2.4 2.65-2.4 4.5 0 3.03 2.47 5.5 5.5 5.5 1.85 0 3.48-.98 4.5-2.4.6.38 1.11.69 1.48.9 1.25.7 2.26 1.31 3.01 1.75C22.68 17.6 19.62 20 16 20h-4zm3-8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
    </svg>
  );
}

/** Logo Officiel Ollama */
export function IconLogoOllama({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 3a2 2 0 0 0-2 2v2H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3h-1V5a2 2 0 0 0-2-2H9zm0 2h6v2H9V5zm-1 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-5 4h2a1 1 0 0 1 1 1v1H10v-1a1 1 0 0 1 1-1z" />
    </svg>
  );
}

/** Logo Officiel Qwen / Alibaba Cloud */
export function IconLogoQwen({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zm0 8.5L4.5 7 12 3.5 19.5 7 12 10.5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Logo Officiel Roo Code / Agent */
export function IconLogoRooCode({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

/** Logo Officiel Open-WebUI */
export function IconLogoOpenWebUI({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}
