import { useCallback, useRef } from "react";

/**
 * useMagnetic — Attraction magnétique d'un élément vers le curseur.
 *
 * Renvoie des gestionnaires à brancher sur un bouton / lien : au survol, l'élément
 * est légèrement « aspiré » en direction du curseur (translation douce), puis
 * revient à sa place au départ du pointeur. Effet signature des sites primés
 * (Awwwards) qui donne une sensation de matière vivante aux CTA.
 *
 * Performance : aucune mise à jour d'état React — on écrit directement sur le
 * style du nœud dans un `requestAnimationFrame` throttlé (une écriture / frame),
 * exactement comme {@link useTilt}.
 *
 * Accessibilité : sous `prefers-reduced-motion`, l'effet est entièrement
 * neutralisé (aucune transform appliquée). Purement décoratif : ni le contenu
 * ni la navigation clavier ne sont affectés (l'élément reste focusable et
 * cliquable à sa position de repos).
 *
 * @param {object} [options]
 * @param {number} [options.strength=0.35] Fraction du déplacement curseur→centre
 *                                         répercutée (0 = immobile, 1 = colle au
 *                                         curseur). 0.3–0.4 = attraction subtile.
 * @param {number} [options.max=14]        Déplacement maximal en px (garde-fou).
 * @returns {{ onPointerMove: Function, onPointerLeave: Function }}
 */
export default function useMagnetic({ strength = 0.35, max = 14 } = {}) {
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
      // Vecteur du centre de l'élément vers le curseur.
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);

      // Déplacement proportionnel, borné pour rester discret sur les grands boutons.
      const tx = Math.max(-max, Math.min(max, dx * strength));
      const ty = Math.max(-max, Math.min(max, dy * strength));

      if (rafRef.current) return; // throttle : au plus une écriture par frame
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      });
    },
    [strength, max, reduceMotion]
  );

  const onPointerLeave = useCallback(
    (e) => {
      if (reduceMotion) return;
      const el = e.currentTarget;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0;
      }
      // Retour au repos : la transition CSS de l'élément lisse le recentrage.
      el.style.transform = "";
    },
    [reduceMotion]
  );

  return { onPointerMove, onPointerLeave };
}
