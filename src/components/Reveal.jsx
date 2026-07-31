import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";

/**
 * Reveal — Apparition au défilement (opacity + transform).
 *
 * Enveloppe un bloc et le révèle la première fois qu'il entre dans le viewport,
 * puis se fige (une seule fois). Conforme au MOTION SYSTEM :
 *  - uniquement `opacity` + `transform` (jamais width/height/top/left) → 60 FPS ;
 *  - easing signature unique (cubic-bezier(0.16, 1, 0.3, 1)) ;
 *  - `prefers-reduced-motion` : état final affiché immédiatement, aucune animation ;
 *  - `delay` optionnel pour un léger décalage entre blocs voisins.
 *
 * Deux nouveautés motion-first :
 *  - `direction` : sens d'entrée du bloc ("up" | "down" | "left" | "right" | "scale").
 *  - `stagger` : lorsqu'il est activé, les enfants directs entrent en cascade
 *    (chacun avec un délai croissant), idéal pour une grille de cartes.
 *
 * @param {object} props
 * @param {import('react').ReactNode} props.children  Contenu à révéler.
 * @param {number} [props.delay=0]                    Délai d'entrée en ms.
 * @param {"up"|"down"|"left"|"right"|"scale"} [props.direction="up"] Sens d'entrée.
 * @param {boolean} [props.stagger=false]             Cascade sur les enfants directs.
 * @param {number} [props.staggerGap=90]              Écart (ms) entre enfants en cascade.
 * @param {string} [props.className]                  Classes supplémentaires.
 * @returns {JSX.Element}
 */
export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  stagger = false,
  staggerGap = 90,
  className = "",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  // `settled` : l'entrée (avec ses délais de cascade) est terminée. On retire
  // alors les `transition-delay` pour que les survols ultérieurs (hover) soient
  // instantanés et non retardés par le délai de cascade initial.
  const [settled, setSettled] = useState(false);

  // Préférence système : si le mouvement est réduit, on affiche directement.
  const reduceMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduceMotion) {
      setVisible(true);
      return undefined;
    }

    const node = ref.current;
    if (!node) return undefined;

    // Sans IntersectionObserver (très vieux navigateurs) : affichage immédiat.
    if (typeof IntersectionObserver !== "function") {
      setVisible(true);
      return undefined;
    }

    let settleTimer = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
          // Après l'entrée (durée + délai de cascade cumulé + marge), on retire
          // les délais pour libérer les transitions de survol.
          const childCount = Children.count(children);
          const totalMs = 700 + delay + Math.max(0, childCount - 1) * staggerGap;
          settleTimer = window.setTimeout(() => setSettled(true), totalMs);
        }
      },
      // Se déclenche un peu avant que le bloc soit pleinement visible.
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      if (settleTimer) window.clearTimeout(settleTimer);
    };
  }, [reduceMotion, children, delay, staggerGap]);

  // Transform de départ selon la direction demandée (état masqué).
  const hiddenTransform = {
    up: "motion-safe:translate-y-6",
    down: "motion-safe:-translate-y-6",
    left: "motion-safe:translate-x-6",
    right: "motion-safe:-translate-x-6",
    scale: "motion-safe:scale-95",
  }[direction] ?? "motion-safe:translate-y-6";

  const base =
    "motion-safe:transition-[opacity,transform] motion-safe:duration-entrance motion-safe:ease-signature";

  // --- Mode cascade : chaque enfant direct hérite d'un délai croissant. -----
  // On clone les enfants (au lieu de les envelopper) pour préserver les layouts
  // grid/flex : les enfants restent des enfants DIRECTS du conteneur `ref`.
  if (stagger) {
    let i = -1;
    const staggered = Children.map(children, (child) => {
      if (!isValidElement(child)) return child;
      i += 1;
      const stateClass = visible
        ? "opacity-100 translate-x-0 translate-y-0 scale-100"
        : `motion-safe:opacity-0 ${hiddenTransform}`;
      // Le délai de cascade est conservé PENDANT l'entrée (jusqu'à `settled`),
      // ce qui produit l'effet d'escalier, puis retiré pour ne pas retarder les
      // survols. Sous reduced-motion, aucun délai.
      const staggerDelay =
        reduceMotion || settled
          ? null
          : { transitionDelay: `${delay + i * staggerGap}ms` };
      return cloneElement(child, {
        className: [child.props.className, base, stateClass]
          .filter(Boolean)
          .join(" "),
        style: {
          ...(child.props.style || {}),
          ...staggerDelay,
        },
      });
    });
    return (
      <div ref={ref} className={className}>
        {staggered}
      </div>
    );
  }

  // --- Mode simple : le bloc entier est révélé d'un tenant. -----------------
  return (
    <div
      ref={ref}
      className={[
        base,
        visible
          ? "opacity-100 translate-x-0 translate-y-0 scale-100"
          : `motion-safe:opacity-0 ${hiddenTransform}`,
        className,
      ].join(" ")}
      style={visible || reduceMotion ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
