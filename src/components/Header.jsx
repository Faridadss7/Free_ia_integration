import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  IconGitHub,
  IconLinkedIn,
  IconSun,
  IconMoon,
  IconMenu,
  IconClose,
  IconBrandLogoFull,
} from "./icons";

/**
 * Header — En-tête sticky ultra-premium (style Linear / Vercel).
 *
 * Repose entièrement sur le dictionnaire de traduction (aucun texte en dur) et
 * sur les tokens de design exposés en variables CSS (couleurs pilotées par le
 * thème). Tailwind gère la mise en page ; les couleurs de marque passent par
 * les classes utilitaires mappées sur nos variables (`bg-surface`, `text-muted`…).
 *
 * En dessous de `md`, la navigation desktop est masquée : un bouton hamburger
 * ouvre alors un panneau déroulant accessible (liens de section + CTA + liens
 * sociaux). Le panneau se ferme au clic sur un lien, sur Échap (le focus revient
 * au bouton) et verrouille le scroll du body tant qu'il est ouvert. Les
 * transitions respectent `prefers-reduced-motion` via le CSS global.
 *
 * @param {object} props
 * @param {(path: string) => any} props.t            Fonction de traduction (chemin pointé).
 * @param {"fr"|"en"} props.lang                      Langue active.
 * @param {(lang: "fr"|"en") => void} props.setLang   Définit la langue.
 * @param {() => void} props.toggleLang               Bascule FR <-> EN.
 * @param {boolean} props.isDark                       Thème sombre actif ?
 * @param {() => void} props.toggleTheme               Bascule le thème.
 * @param {(id: string) => void} props.onNavigate      Scroll doux vers une section.
 * @returns {JSX.Element}
 */
export default function Header({
  t,
  lang,
  setLang,
  toggleLang,
  isDark,
  toggleTheme,
  onNavigate,
}) {
  /** Liens de navigation issus du dictionnaire ([{ id, label }]). */
  const links = t("nav.links");

  /** Ouverture du panneau de navigation mobile. */
  const [menuOpen, setMenuOpen] = useState(false);

  /** Références pour la gestion du focus (bouton déclencheur + premier lien). */
  const toggleRef = useRef(null);
  const firstItemRef = useRef(null);

  /** Ferme le menu puis exécute la navigation vers la section demandée. */
  const handleNavigate = (id) => {
    setMenuOpen(false);
    onNavigate(id);
  };

  // Fermeture au clavier (Échap) + verrou du scroll du body quand le menu est ouvert.
  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Déplace le focus sur le premier lien du panneau à l'ouverture.
    firstItemRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <header
      className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl backdrop-saturate-150 transition-colors"
    >
      <div className="mx-auto flex h-[var(--nav-height)] max-w-[var(--max-width)] items-center justify-between gap-4 px-6">
        {/* --- Logo Officiel freeIA INTEGRATION --- */}
        <button
          type="button"
          onClick={() => handleNavigate("main")}
          className="group flex items-center rounded-md outline-none transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          <IconBrandLogoFull />
        </button>

        {/* --- Liens de section (centre, desktop) --- */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label={t("nav.aria")}
        >
          {Array.isArray(links) &&
            links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => onNavigate(link.id)}
                className="rounded-md px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:text-ink hover:bg-surface-raised"
              >
                {link.label}
              </button>
            ))}
        </nav>

        {/* --- Actions (droite) --- */}
        <div className="flex items-center gap-2">
          {/* Liens sociaux */}
          <a
            href="https://github.com/Faridadss7"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("nav.github")}
            className="hidden h-8 w-8 place-items-center rounded-md border border-border bg-surface text-muted transition-colors hover:bg-surface-raised hover:text-ink sm:grid"
          >
            <IconGitHub size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/farid-yelogniss%C3%A8-b-adisso-086726384"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("nav.linkedin")}
            className="hidden h-8 w-8 place-items-center rounded-md border border-border bg-surface text-muted transition-colors hover:bg-surface-raised hover:text-ink sm:grid"
          >
            <IconLinkedIn size={16} />
          </a>

          {/* Sélecteur de langue segmenté avec morphing */}
          <div
            role="group"
            aria-label={t("nav.toggleLang")}
            className="flex items-center rounded-md border border-border bg-surface p-0.5 relative"
          >
            <button
              type="button"
              aria-pressed={lang === "fr"}
              onClick={() => setLang("fr")}
              className={`relative z-10 rounded px-2.5 py-1 text-xs font-mono font-bold transition-colors ${
                lang === "fr" ? "text-accent" : "text-muted hover:text-ink"
              }`}
            >
              {lang === "fr" && (
                <motion.span
                  layoutId="active-lang-pill"
                  className="absolute inset-0 z-[-1] rounded bg-surface-raised border border-border"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              FR
            </button>
            <button
              type="button"
              aria-pressed={lang === "en"}
              onClick={() => setLang("en")}
              className={`relative z-10 rounded px-2.5 py-1 text-xs font-mono font-bold transition-colors ${
                lang === "en" ? "text-accent" : "text-muted hover:text-ink"
              }`}
            >
              {lang === "en" && (
                <motion.span
                  layoutId="active-lang-pill"
                  className="absolute inset-0 z-[-1] rounded bg-surface-raised border border-border"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              EN
            </button>
          </div>

          {/* Bascule de thème */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? t("nav.toggleThemeDark") : t("nav.toggleThemeLight")}
            className="grid h-8 w-8 place-items-center rounded-md border border-border bg-surface text-muted transition-colors hover:bg-surface-raised hover:text-ink"
          >
            {isDark ? <IconSun size={16} /> : <IconMoon size={16} />}
          </button>

          {/* CTA technique structuré (desktop large) */}
          <button
            type="button"
            onClick={() => onNavigate("pricing")}
            className="ml-1 hidden rounded-md bg-accent hover:bg-accent-strong text-white text-xs font-semibold px-4 py-2 border border-accent-soft/30 active:scale-[0.98] transition-all lg:block font-mono"
          >
            {t("nav.cta")}
          </button>

          {/* Bouton hamburger */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? t("nav.menuClose") : t("nav.menuOpen")}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="grid h-8 w-8 place-items-center rounded-md border border-border bg-surface text-muted transition-colors hover:bg-surface-raised hover:text-ink md:hidden"
          >
            {menuOpen ? <IconClose size={18} /> : <IconMenu size={18} />}
          </button>
        </div>
      </div>

      {/* --- Panneau de navigation mobile --- */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label={t("nav.aria")}
          className="border-t border-border bg-bg/95 backdrop-blur-xl md:hidden"
        >
          <div className="mx-auto flex max-w-[var(--max-width)] flex-col gap-1 px-6 py-4">
            {Array.isArray(links) &&
              links.map((link, index) => (
                <button
                  key={link.id}
                  ref={index === 0 ? firstItemRef : null}
                  type="button"
                  onClick={() => handleNavigate(link.id)}
                  className="rounded-lg px-4 py-3 text-left text-sm font-semibold text-muted transition-colors hover:bg-surface-raised hover:text-ink"
                >
                  {link.label}
                </button>
              ))}

            <button
              type="button"
              onClick={() => handleNavigate("pricing")}
              className="mt-2 rounded-lg bg-accent hover:bg-accent-strong px-4 py-3 text-center text-sm font-semibold text-white font-mono border border-accent-soft/30"
            >
              {t("nav.cta")}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}