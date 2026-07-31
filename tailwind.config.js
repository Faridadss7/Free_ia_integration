/**
 * Tailwind CSS — configuration.
 *
 * Stratégie : Tailwind ne remplace pas nos design tokens, il s'y branche.
 * Les couleurs pointent vers les variables CSS définies dans `global.css`
 * (`--color-bg`, `--color-surface`, …), si bien que la bascule sombre/clair
 * pilotée par `useDarkMode` reste la source unique de vérité — Tailwind hérite
 * automatiquement des bonnes valeurs sans classes `dark:` à dupliquer partout.
 *
 * `darkMode: 'class'` garde malgré tout les variantes `dark:` disponibles
 * (la classe `dark` est posée sur <html> par le hook).
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Tokens de marque, adossés aux variables CSS (thème-aware).
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-translucent': 'var(--color-surface-translucent)',
        'surface-raised': 'var(--color-surface-raised)',
        ink: 'var(--color-text)',
        muted: 'var(--color-text-muted)',
        // Bordures thème-aware (ultra-fines / soutenues).
        border: 'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
        // Accent UNIQUE (turquoise) — thème-aware, décliné en 3 intensités.
        // `<alpha-value>` permet les modificateurs d'opacité (ex. accent/20).
        accent: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
        'accent-strong': 'var(--color-accent-strong)',
        'accent-soft': 'var(--color-accent-soft)',
        // Texte posé sur l'accent (boutons pleins) — theme-aware.
        'on-accent': 'var(--color-on-accent)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        container: '1200px',
      },
      boxShadow: {
        // Système lumineux unifié (voir LIGHT SYSTEM dans global.css).
        'elevation-sm': 'var(--shadow-elevation-sm)',
        'elevation-md': 'var(--shadow-elevation-md)',
        'elevation-lg': 'var(--shadow-elevation-lg)',
        'elevation-xl': 'var(--shadow-elevation-xl)',
        'accent-sm': 'var(--shadow-accent-sm)',
        'accent-md': 'var(--shadow-accent-md)',
        card: 'var(--shadow-elevation-lg)',
      },
      transitionTimingFunction: {
        // Easing signature unique pour tout le système.
        signature: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-soft': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        interaction: '160ms',
        transition: '300ms',
        entrance: '440ms',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Entrée d'étape du wizard : fondu + léger glissement vertical, discret.
        'step-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Curseur terminal : clignotement NET (on/off franc), pas une respiration.
        // C'est le comportement d'un vrai curseur Unix — le rendu `pulse` en
        // opacité douce trahit une UI générée.
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        // Confirmation premium : la coche de succès entre en douceur (léger scale).
        'success-in': {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        // Spinner de chargement (état d'envoi transitoire — jamais permanent sur
        // la page). Rotation linéaire assumée : seul cas où `linear` est correct,
        // un spinner qui accélère/décélère paraîtrait cassé.
        spin: {
          to: { transform: 'rotate(360deg)' },
        },

        // --- MOTION-FIRST (inspiration Framer) --------------------------------
        // Flottement lent et continu : donne de la vie aux éléments décoratifs
        // (badges, pastilles, glyphes). Amplitude volontairement faible.
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        // Balayage lumineux (reflet) qui traverse un élément : badge de confiance,
        // liseré de bouton. Piloté sur background-position.
        shimmer: {
          '0%': { backgroundPosition: '-150% 0' },
          '100%': { backgroundPosition: '250% 0' },
        },
        // Déplacement du dégradé du titre : le turquoise « respire » lentement.
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        // Entrée en scale + fondu (cartes, médias) — plus expressif que fade-up.
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.94) translateY(12px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        // Halo pulsé pour éléments mis en avant (CTA, points d'accent).
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        // Voile « aurora » d'arrière-plan : dégradé qui dérive lentement.
        aurora: {
          '0%': { transform: 'translate3d(-8%, -4%, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(6%, 5%, 0) rotate(8deg)' },
          '100%': { transform: 'translate3d(-8%, -4%, 0) rotate(0deg)' },
        },
        // Petit rebond de flèche horizontale (CTA « continuer »).
        'nudge-x': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(4px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.44s cubic-bezier(0.16, 1, 0.3, 1) both',
        'step-in': 'step-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
        // 1s, palier net (steps) : clignotement de curseur authentique.
        blink: 'blink 1s steps(1, end) infinite',
        'success-in': 'success-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        spin: 'spin 0.7s linear infinite',

        // --- MOTION-FIRST -----------------------------------------------------
        float: 'float 6s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'float-slow': 'float 9s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        shimmer: 'shimmer 3.5s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'gradient-pan': 'gradient-pan 8s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'glow-pulse': 'glow-pulse 4s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        aurora: 'aurora 24s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'nudge-x': 'nudge-x 1.4s cubic-bezier(0.16, 1, 0.3, 1) infinite',
      },
    },
  },
  plugins: [],
};
