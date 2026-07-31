import { useEffect, useRef, useState } from "react";

/**
 * useCountUp — Compteur qui s'incrémente de 0 jusqu'à une valeur cible, déclenché
 * la première fois que l'élément entre dans le viewport.
 *
 * Pensé pour les bandes de statistiques (« chiffres clés ») : le nombre défile
 * en douceur, une seule fois, avec un easing qui décélère (out-expo) pour un
 * rendu premium plutôt que linéaire.
 *
 * Accessibilité / performance :
 *  - Sous `prefers-reduced-motion`, ou sans IntersectionObserver, la valeur
 *    finale est affichée immédiatement (aucune animation).
 *  - L'animation est pilotée par `requestAnimationFrame` et se fige à la fin.
 *  - Le déclenchement est unique (l'observer se déconnecte au premier passage).
 *
 * @param {number} target                Valeur cible à atteindre.
 * @param {object} [options]
 * @param {number} [options.duration=1600] Durée de l'animation en ms.
 * @param {number} [options.decimals=0]    Nombre de décimales à conserver.
 * @returns {{ ref: import('react').RefObject<HTMLElement>, value: number }}
 *          `ref` à poser sur l'élément observé, `value` le nombre courant.
 */
export default function useCountUp(target, { duration = 1600, decimals = 0 } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  const reduceMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const node = ref.current;
    const factor = 10 ** decimals;
    const round = (n) => Math.round(n * factor) / factor;

    // Cas dégradés : on affiche directement la valeur finale.
    if (reduceMotion || !node || typeof IntersectionObserver !== "function") {
      setValue(round(target));
      return undefined;
    }

    let rafId = 0;
    let startTs = 0;
    // Easing out-expo : démarre vite, décélère nettement en fin de course.
    const easeOutExpo = (x) => (x >= 1 ? 1 : 1 - 2 ** (-10 * x));

    const tick = (ts) => {
      if (!startTs) startTs = ts;
      const progress = Math.min(1, (ts - startTs) / duration);
      setValue(round(target * easeOutExpo(progress)));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          rafId = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [target, duration, decimals, reduceMotion]);

  return { ref, value };
}
