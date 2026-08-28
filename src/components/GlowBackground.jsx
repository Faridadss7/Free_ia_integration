import { memo, useEffect, useRef } from "react";
import "./GlowBackground.css";

/**
 * Arrière-plan décoratif à lueurs diffuses (mono-teinte turquoise).
 *
 * Rendu purement esthétique : deux à trois halos très flous animés
 * extrêmement lentement pour donner une profondeur "vivante" sans distraire.
 *
 * Caractéristiques :
 * - `aria-hidden` + `pointer-events: none` : totalement transparent pour
 *   l'accessibilité et les interactions.
 * - Positionné en `fixed` derrière tout le contenu (z-index négatif).
 * - Respecte `prefers-reduced-motion` (les animations sont neutralisées en CSS).
 * - Parallax léger : le calque entier dérive verticalement à ~15 % de la vitesse
 *   de scroll, ce qui creuse la profondeur sans concurrencer le contenu. Le suivi
 *   passe par une variable CSS (`--parallax`) écrite dans une boucle rAF throttlée,
 *   et se raccroche au scroll natif comme au scroll Lenis. Neutralisé sous
 *   `prefers-reduced-motion`.
 *
 * @returns {JSX.Element}
 */
function GlowBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const reduceMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    let rafId = 0;
    let queued = false;

    const update = () => {
      queued = false;
      // 15 % de la position de scroll : dérive douce, plafonnée pour éviter que
      // les halos ne quittent complètement le cadre sur les longues pages.
      const offset = Math.min(window.scrollY * 0.15, 240);
      node.style.setProperty("--parallax", `${offset}px`);
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="glow-bg" aria-hidden="true" ref={ref}>
      {/* Voile « aurora » : large dégradé conique qui dérive lentement, très
          diffus, sous les halos. Donne un mouvement d'ensemble vivant. */}
      <span className="glow-aurora" />
      {/* Halo turquoise principal — coin supérieur gauche, flou 140px. */}
      <span className="glow-orb glow-orb--cyan" />
      {/* Halo turquoise profond — coin inférieur droit, flou 180px.
          (Nom de classe `--violet` conservé pour l'historique ; teinte turquoise.) */}
      <span className="glow-orb glow-orb--violet" />
      {/* Grille technique et faisceaux laser animés */}
      <div className="glow-grid">
        <span className="glow-beam glow-beam--1" />
        <span className="glow-beam glow-beam--2" />
        <span className="glow-beam glow-beam--3" />
      </div>
    </div>
  );
}

export default memo(GlowBackground);
