import { useRef } from "react";
import { IconArrowRight, IconPlay } from "./icons";
import useMagnetic from "../hooks/useMagnetic";

/**
 * Hero — Section héroïque « Trusted & Concrete », version motion-first.
 *
 * Structure :
 *  - Bandeau de confiance (« Approuvé par… ») avec liseré lumineux qui balaie.
 *  - Titre principal en deux temps : partie neutre + segment en dégradé animé
 *    (le turquoise dérive lentement) via `text-gradient-animated`.
 *  - Sous-titre explicatif.
 *  - Deux CTA : primaire (scroll vers #pricing) avec halo animé et flèche
 *    qui avance, secondaire (scroll vers #demo).
 *  - Un projecteur (spotlight) suit discrètement le curseur derrière le contenu.
 *
 * Le composant ne détient pas d'état applicatif : le suivi du curseur passe par
 * des variables CSS écrites directement sur le nœud (aucun re-render React).
 * Tout est piloté par `transform`/`opacity`, et se coupe sous
 * `prefers-reduced-motion` (classes `motion-safe:` + `animate-*` neutralisés).
 *
 * @param {object} props
 * @param {(key: string) => any} props.t            Fonction de traduction.
 * @param {(id: string) => void}  props.onNavigate  Scroll doux vers une ancre.
 * @returns {JSX.Element}
 */
export default function Hero({ t, onNavigate }) {
  const sectionRef = useRef(null);
  // Attraction magnétique des deux CTA vers le curseur (subtile, décorative).
  const magneticPrimary = useMagnetic({ strength: 0.4, max: 12 });
  const magneticSecondary = useMagnetic({ strength: 0.3, max: 10 });

  // Fond d'ambiance vidéo (loop Remotion). On NE monte PAS la vidéo dans deux cas :
  //  - `prefers-reduced-motion` : respect de la préférence système ;
  //  - petit écran (mobile) : éviter de gâcher la bande passante (le fallback mp4
  //    pèse ~2MB) pour un fond purement décoratif sur connexion lente.
  // Dans ces deux cas on affiche uniquement le poster statique. Même lecture
  // synchrone de matchMedia que les autres composants (useMagnetic, Reveal…) :
  // le montage au premier rendu suffit, pas besoin d'écouter les changements.
  const supportsMatchMedia =
    typeof window !== "undefined" && typeof window.matchMedia === "function";
  const reduceMotion =
    supportsMatchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const smallScreen =
    supportsMatchMedia && window.matchMedia("(max-width: 767px)").matches;
  // Poster seul si l'un OU l'autre est vrai ; sinon vidéo (desktop, motion OK).
  const staticBackground = reduceMotion || smallScreen;

  /**
   * Suit le curseur pour positionner le projecteur d'arrière-plan. On écrit
   * `--spot-x` / `--spot-y` (en %) sur la section : pas de state, pas de rerender.
   */
  const handlePointerMove = (e) => {
    const node = sectionRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    node.style.setProperty("--spot-x", `${x}%`);
    node.style.setProperty("--spot-y", `${y}%`);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative mx-auto flex max-w-5xl flex-col items-center overflow-hidden px-6 pb-24 pt-32 text-center sm:pt-40"
    >
      {/* --- Fond d'ambiance : loop vidéo Remotion (réseau de nœuds turquoise) ---
          Sous la couche projecteur (-z-10), en -z-20. Purement décoratif.
          En mouvement réduit, la <video> n'est pas montée : seul le poster reste,
          affiché via l'image de fond ci-dessous pour couvrir les deux cas. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        {staticBackground ? (
          <img
            src="/assets/hero-ambient-poster.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/assets/hero-ambient-poster.jpg"
          >
            <source src="/assets/hero-ambient.webm" type="video/webm" />
            <source src="/assets/hero-ambient.mp4" type="video/mp4" />
          </video>
        )}
        {/* Voile dégradé : garde le texte lisible par-dessus la vidéo. */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/40 to-bg" />
      </div>

      {/* --- Projecteur qui suit le curseur (décoratif) --- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 transition-opacity duration-transition"
        style={{
          background:
            "radial-gradient(600px circle at var(--spot-x, 50%) var(--spot-y, 30%), rgba(var(--color-accent-rgb), 0.10), transparent 65%)",
        }}
      />

      {/* --- Bandeau de confiance (liseré lumineux qui balaie) --- */}
      <p className="shimmer-line animate-fade-up mb-8 inline-flex max-w-2xl items-center gap-2 rounded-full border border-border bg-surface-translucent px-4 py-1.5 text-xs font-medium leading-relaxed text-muted backdrop-blur-md sm:text-sm">
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent motion-safe:animate-glow-pulse"
          aria-hidden="true"
        />
        {t("hero.trustedBy")}
      </p>

      {/* --- Titre principal (respiration : entre après le bandeau) --- */}
      <h1 className="animate-fade-up max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-text sm:text-6xl [animation-delay:80ms]">
        {t("hero.titleLead")}{" "}
        <span className="text-gradient-animated">{t("hero.titleHighlight")}</span>
      </h1>

      {/* --- Sous-titre (léger délai après le titre) --- */}
      <p className="animate-fade-up mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted [animation-delay:180ms] sm:text-lg">
        {t("hero.subtitle")}
      </p>

      {/* --- CTA (entrent en dernier — une seule animation signature) --- */}
      <div className="animate-fade-up mt-10 flex flex-col items-center gap-4 [animation-delay:280ms] sm:flex-row">
        <button
          type="button"
          onClick={() => onNavigate("pricing")}
          onPointerMove={magneticPrimary.onPointerMove}
          onPointerLeave={magneticPrimary.onPointerLeave}
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-on-accent shadow-accent-sm transition-[transform,box-shadow,background-color] duration-interaction ease-signature hover:bg-accent-strong hover:shadow-accent-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {/* Reflet qui traverse le bouton au survol */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[900ms] ease-signature group-hover:translate-x-full"
          />
          <span className="relative">{t("hero.ctaPrimary")}</span>
          <IconArrowRight
            size={18}
            className="relative transition-transform duration-interaction ease-signature group-hover:translate-x-1"
          />
        </button>

        <button
          type="button"
          onClick={() => onNavigate("demo")}
          onPointerMove={magneticSecondary.onPointerMove}
          onPointerLeave={magneticSecondary.onPointerLeave}
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface-translucent px-7 py-3.5 text-sm font-semibold text-text backdrop-blur-md transition-[transform,border-color,background-color] duration-interaction ease-signature hover:border-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-accent/10 text-accent transition-transform duration-interaction ease-signature group-hover:scale-110">
            <IconPlay size={14} />
          </span>
          {t("hero.ctaSecondary")}
        </button>
      </div>
    </section>
  );
}
