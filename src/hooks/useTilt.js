import { useCallback, useRef } from "react";

/**
 * useTilt — Inclinaison 3D d'une carte vers le curseur (effet « wow » léger).
 *
 * Renvoie des gestionnaires à brancher sur l'élément : au survol, la carte
 * s'incline sur les axes X/Y en fonction de la position du curseur (perspective
 * 3D), et double le mouvement d'un léger déplacement du projecteur (`--mx/--my`)
 * pour rester cohérent avec les cartes à spotlight.
 *
 * Performance : aucune mise à jour d'état React — on écrit directement sur le
 * style du nœud dans un `requestAnimationFrame` throttlé (une écriture / frame).
 *
 * Accessibilité : sous `prefers-reduced-motion`, l'effet est entièrement
 * neutralisé (aucune transform appliquée). L'inclinaison est purement
 * décorative et n'affecte ni le contenu ni la navigation clavier.
 *
 * @param {object} [options]
 * @param {number} [options.max=6]      Inclinaison maximale en degrés.
 * @param {number} [options.scale=1.02] Échelle appliquée au survol.
 * @returns {{ onPointerMove: Function, onPointerLeave: Function }}
 */
export default function useTilt({ max = 6, scale = 1.02 } = {}) {
  const rafRef = useRef(0);

  const reduceMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onPointerMove = useCallback(
    (e) => {
      if (reduceMotion) return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const px = e.clientX - rect.left; // position curseur dans la carte
      const py = e.clientY - rect.top;

      // Normalisation [-0.5, 0.5] → inclinaison proportionnelle depuis le centre.
      const rx = (0.5 - py / rect.height) * (max * 2);
      const ry = (px / rect.width - 0.5) * (max * 2);

      if (rafRef.current) return; // throttle : au plus une écriture par frame
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        el.style.setProperty("--mx", `${px}px`);
        el.style.setProperty("--my", `${py}px`);
        el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`;
      });
    },
    [max, scale, reduceMotion]
  );

  const onPointerLeave = useCallback(
    (e) => {
      if (reduceMotion) return;
      const el = e.currentTarget;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
      // Retour à plat : la transition CSS de la carte lisse le redressement.
      el.style.transform = "";
    },
    [reduceMotion]
  );

  return { onPointerMove, onPointerLeave };
}
