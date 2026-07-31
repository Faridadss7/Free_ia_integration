import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * useSmoothScroll — Scroll cinématique global via Lenis.
 *
 * Lenis interpole le défilement natif pour un rendu « inertiel » fluide, signature
 * des sites primés (Awwwards). On l'initialise une seule fois au montage de l'app
 * et on l'anime dans une boucle `requestAnimationFrame`.
 *
 * Le hook expose l'instance via une ref pour que la navigation par ancre
 * (`scrollToSection`) puisse déléguer à `lenis.scrollTo(...)` et garder la même
 * inertie que le scroll libre (sinon on aurait deux comportements incohérents).
 *
 * Accessibilité : sous `prefers-reduced-motion`, Lenis n'est pas instancié — le
 * scroll natif du navigateur est conservé tel quel. On coupe aussi proprement au
 * démontage (annulation de la RAF + destruction de l'instance).
 *
 * @returns {import('react').MutableRefObject<import('lenis').default | null>}
 *          Ref vers l'instance Lenis (ou `null` si non actif).
 */
export default function useSmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mouvement réduit : on laisse le scroll natif, aucune instance Lenis.
    if (reduceMotion) return undefined;

    const lenis = new Lenis({
      // Durée d'amortissement : assez ample pour l'effet inertiel, sans traîner.
      duration: 1.1,
      // Easing signature du système (out-expo) → cohérent avec le reste des motions.
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      // On laisse le tactile en natif : le smooth-touch gêne plus qu'il n'aide.
      smoothTouch: false,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
