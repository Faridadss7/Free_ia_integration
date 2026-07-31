import { useEffect, useRef, useState } from "react";
import { IconGitHub, IconLinkedIn, IconSun, IconMoon, IconMenu, IconClose } from "./icons";

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
      className="sticky top-0 z-50 border-b border-white/[0.06] bg-bg/70 backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="mx-auto flex h-[var(--nav-height)] max-w-[var(--max-width)] items-center justify-between gap-4 px-6">
        {/* --- Logo minimaliste : badge dégradé "F" + wordmark --- */}
        <button
          type="button"
          onClick={() => handleNavigate("main")}
          className="group flex items-center gap-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-soft to-accent-strong text-sm font-bold text-on-accent shadow-accent-sm transition-[transform,box-shadow] duration-interaction ease-signature group-hover:-translate-y-0.5 group-hover:shadow-accent-md"
          >
            F
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-text sm:block">
            Farid ADISSO{" "}
            <span className="font-normal text-muted">| Tech Integration</span>
          </span>
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
                className="link-underline rounded-full px-3 py-2 text-sm text-muted transition-colors duration-200 hover:text-text"
              >
                {link.label}
              </button>
            ))}
        </nav>

        {/* --- Actions (droite) --- */}
        <div className="flex items-center gap-1.5">
          {/* Liens sociaux */}
          <a
            href="https://github.com/Faridadss7"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("nav.github")}
            className="hidden h-9 w-9 place-items-center rounded-lg text-muted transition-colors duration-200 hover:bg-white/[0.06] hover:text-text sm:grid"
          >
            <IconGitHub size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/farid-yelogniss%C3%A8-b-adisso-086726384"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("nav.linkedin")}
            className="hidden h-9 w-9 place-items-center rounded-lg text-muted transition-colors duration-200 hover:bg-white/[0.06] hover:text-text sm:grid"
          >
            <IconLinkedIn size={18} />
          </a>

          {/* Sélecteur de langue segmenté */}
          <div
            role="group"
            aria-label={t("nav.toggleLang")}
            className="flex items-center rounded-lg border border-white/[0.08] p-0.5"
          >
            <button
              type="button"
              aria-pressed={lang === "fr"}
              onClick={() => setLang("fr")}
              className={`rounded-md px-2 py-1 text-xs font-medium transition-colors duration-200 ${
                lang === "fr" ? "bg-white/[0.1] text-text" : "text-muted hover:text-text"
              }`}
            >
              FR
            </button>
            <button
              type="button"
              aria-pressed={lang === "en"}
              onClick={() => setLang("en")}
              className={`rounded-md px-2 py-1 text-xs font-medium transition-colors duration-200 ${
                lang === "en" ? "bg-white/[0.1] text-text" : "text-muted hover:text-text"
              }`}
            >
              EN
            </button>
          </div>

          {/* Bascule de thème */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? t("nav.toggleThemeDark") : t("nav.toggleThemeLight")}
            className="grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors duration-200 hover:bg-white/[0.06] hover:text-text"
          >
            {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
          </button>

          {/* CTA discret (desktop large) */}
          <button
            type="button"
            onClick={() => onNavigate("pricing")}
            className="ml-1 hidden rounded-lg border border-border-strong bg-white/[0.04] px-4 py-2 text-sm font-medium text-text transition-[transform,border-color,background-color] duration-interaction ease-signature hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white/[0.08] lg:block"
          >
            {t("nav.cta")}
          </button>

          {/* Bouton hamburger — mobile uniquement (symétrique de la nav desktop) */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? t("nav.menuClose") : t("nav.menuOpen")}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors duration-200 hover:bg-white/[0.06] hover:text-text md:hidden"
          >
            {menuOpen ? <IconClose size={20} /> : <IconMenu size={20} />}
          </button>
        </div>
      </div>

      {/* --- Panneau de navigation mobile --- */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label={t("nav.aria")}
          className="border-t border-white/[0.06] bg-bg/95 backdrop-blur-xl md:hidden"
        >
          <div className="mx-auto flex max-w-[var(--max-width)] flex-col gap-1 px-6 py-4">
            {Array.isArray(links) &&
              links.map((link, index) => (
                <button
                  key={link.id}
                  ref={index === 0 ? firstItemRef : null}
                  type="button"
                  onClick={() => handleNavigate(link.id)}
                  className="rounded-lg px-4 py-3 text-left text-base font-medium text-muted transition-colors duration-200 hover:bg-white/[0.06] hover:text-text"
                >
                  {link.label}
                </button>
              ))}

            {/* CTA — toujours présent dans le panneau mobile */}
            <button
              type="button"
              onClick={() => handleNavigate("pricing")}
              className="mt-2 rounded-lg border border-border-strong bg-white/[0.04] px-4 py-3 text-center text-base font-medium text-text transition-[border-color,background-color] duration-interaction ease-signature hover:border-accent/40 hover:bg-white/[0.08]"
            >
              {t("nav.cta")}
            </button>

            {/* Liens sociaux */}
            <div className="mt-2 flex items-center gap-2 border-t border-white/[0.06] pt-4">
              <a
                href="https://github.com/Faridadss7"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("nav.github")}
                className="grid h-10 w-10 place-items-center rounded-lg text-muted transition-colors duration-200 hover:bg-white/[0.06] hover:text-text"
              >
                <IconGitHub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/farid-yelogniss%C3%A8-b-adisso-086726384"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("nav.linkedin")}
                className="grid h-10 w-10 place-items-center rounded-lg text-muted transition-colors duration-200 hover:bg-white/[0.06] hover:text-text"
              >
                <IconLinkedIn size={20} />
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}