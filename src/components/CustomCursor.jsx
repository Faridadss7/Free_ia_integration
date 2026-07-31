import { useEffect, useRef } from "react";
import "./CustomCursor.css";

/**
 * CustomCursor — Curseur personnalisé premium (point net + anneau à traîne).
 *
 * Deux éléments suivent le pointeur : un point qui colle au curseur et un anneau
 * qui le suit avec une légère inertie (interpolation linéaire dans une boucle
 * `requestAnimationFrame`). Au survol d'un élément interactif (a, button, [role],
 * input…), l'anneau grossit et se teinte — un repère visuel élégant.
 *
 * Activation conditionnelle : uniquement sur pointeur fin (souris) et hors
 * `prefers-reduced-motion`. Sur tactile ou mouvement réduit, le composant ne
 * rend rien et ne masque pas le curseur système (aucune régression d'usage).
 *
 * Performance : aucune mise à jour d'état React — position écrite via variables
 * CSS (`--cx/--cy`, `--rx/--ry`) sur les nœuds, une fois par frame.
 *
 * @returns {JSX.Element|null}
 */
export default function CustomCursor() {
  const rootRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const canHover =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Sans souris précise ou en mouvement réduit : pas de curseur custom.
    if (!canHover || reduceMotion) return undefined;

    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!root || !dot || !ring) return undefined;

    document.documentElement.classList.add("has-custom-cursor");

    // Position cible (curseur) et position lissée de l'anneau (traîne).
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      // Le point colle au curseur immédiatement.
      dot.style.setProperty("--cx", `${tx}px`);
      dot.style.setProperty("--cy", `${ty}px`);
      root.classList.remove("is-hidden");
    };

    // Détection d'un contexte interactif sous le curseur (délégation légère).
    const interactiveSelector = 'a, button, input, textarea, select, label, [role="button"], .spotlight-host';
    const onOver = (e) => {
      const target = e.target;
      if (target && typeof target.closest === "function" && target.closest(interactiveSelector)) {
        root.classList.add("is-active");
      } else {
        root.classList.remove("is-active");
      }
    };

    const onLeave = () => root.classList.add("is-hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    // Boucle d'interpolation de l'anneau (traîne inertielle).
    let rafId = 0;
    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.setProperty("--rx", `${rx.toFixed(2)}px`);
      ring.style.setProperty("--ry", `${ry.toFixed(2)}px`);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div ref={rootRef} className="cursor-root" aria-hidden="true">
      <span ref={ringRef} className="cursor-ring" />
      <span ref={dotRef} className="cursor-dot" />
    </div>
  );
}
