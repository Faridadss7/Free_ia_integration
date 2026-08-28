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
        // Tokens de base thémés
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-translucent': 'var(--color-surface-translucent)',
        'surface-raised': 'var(--color-surface-raised)',
        ink: 'var(--color-text)',
        muted: 'var(--color-text-muted)',
        // Bordures fines et précises
        border: 'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
        // Palette Dev / Tech Corporate
        accent: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
        'accent-strong': 'var(--color-accent-strong)',
        'accent-soft': 'var(--color-accent-soft)',
        'accent-copper': '#d97706',
        secondary: 'var(--color-secondary)',
        'on-accent': 'var(--color-on-accent)',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      maxWidth: {
        container: '1200px',
      },
      boxShadow: {
        'elevation-sm': 'var(--shadow-elevation-sm)',
        'elevation-md': 'var(--shadow-elevation-md)',
        'elevation-lg': 'var(--shadow-elevation-lg)',
        'elevation-xl': 'var(--shadow-elevation-xl)',
        'accent-sm': 'var(--shadow-accent-sm)',
        'accent-md': 'var(--shadow-accent-md)',
        card: 'none',
      },
      letterSpacing: {
        tightest: '-0.02em',
      },
      transitionTimingFunction: {
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
        'step-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'success-in': {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-150% 0' },
          '100%': { backgroundPosition: '250% 0' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.94) translateY(12px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        aurora: {
          '0%': { transform: 'translate3d(-8%, -4%, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(6%, 5%, 0) rotate(8deg)' },
          '100%': { transform: 'translate3d(-8%, -4%, 0) rotate(0deg)' },
        },
        'nudge-x': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(4px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.44s cubic-bezier(0.16, 1, 0.3, 1) both',
        'step-in': 'step-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
        blink: 'blink 1s steps(1, end) infinite',
        'success-in': 'success-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
        spin: 'spin 0.7s linear infinite',
        float: 'float 6s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'float-slow': 'float 9s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        shimmer: 'shimmer 3.5s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'gradient-pan': 'gradient-pan 8s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'scale-in': 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'glow-pulse': 'glow-pulse 4s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        aurora: 'aurora 24s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'nudge-x': 'nudge-x 1.4s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
      },
    },
  },
  plugins: [],
};
