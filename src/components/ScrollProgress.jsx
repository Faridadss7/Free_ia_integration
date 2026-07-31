import { useEffect, useRef } from "react";

/**
 * ScrollProgress — Fine barre de progression de lecture, fixée tout en haut.
 *
 * Sa largeur reflète la proportion de page déjà parcourue (0 → 100 %). C'est
 * un repère de mouvement PERMANENT : il vit dès qu'on scrolle, sans survol.
 *
 * Performance : on n'utilise pas d'état React (aucun re-render à chaque pixel
 * de scroll). On écrit directement `transform: scaleX(...)` sur le nœud via une
 * ref, à l'intérieur d'un `requestAnimationFrame` throttlé. `transform-origin:
 * left` transforme un scaleX en remplissage de gauche à droite — 100 % GPU.
 *
 * Accessibilité : purement décoratif (`aria-hidden`). Sous `prefers-reduced-
 * motion`, la barre reste fonctionnelle (elle ne « bouge » pas d'elle-même,
 * elle suit fidèlement le scroll de l'utilisateur), donc on la garde active.
 *
 * @returns {JSX.Element}
 */
export default function ScrollProgress() {
  const barRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return undefined;

    const update = () => {
      rafRef.current = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      // Page trop courte pour scroller : barre pleine (rien à parcourir).
      const ratio = scrollable > 0 ? doc.scrollTop / scrollable : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
    };

    const onScroll = () => {
      // Throttle via rAF : au plus une écriture par frame.
      if (!rafRef.current) rafRef.current = requestAnimationFrame(update);
    };

    update(); // Position initiale (rechargement en milieu de page).
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-accent-soft via-accent to-accent-strong shadow-[0_0_8px_rgba(var(--color-accent-rgb),0.6)]"
      />
    </div>
  );
}
