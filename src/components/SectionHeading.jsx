import { useEffect, useRef, useState } from "react";

/**
 * SectionHeading — En-tête de section standard, animé en cascade au scroll.
 *
 * Uniformise le triptyque eyebrow + titre + sous-titre présent dans toutes les
 * sections, et lui donne du rythme : à l'entrée dans le viewport, l'eyebrow, le
 * trait turquoise, le titre puis le sous-titre apparaissent l'un après l'autre
 * (léger décalage). Sans ce composant, chaque en-tête surgissait d'un bloc.
 *
 * Conforme au MOTION SYSTEM : `opacity` + `transform` uniquement, easing
 * signature, déclenchement unique, neutralisé sous `prefers-reduced-motion`.
 *
 * @param {object} props
 * @param {string} props.eyebrow                 Sur-titre (en petites capitales).
 * @param {string} props.title                   Titre principal.
 * @param {string} [props.subtitle]              Sous-titre optionnel.
 * @param {string} props.id                      `id` du titre (pour aria-labelledby).
 * @param {"center"|"left"} [props.align="center"] Alignement du bloc.
 * @param {string} [props.className]             Classes du conteneur.
 * @returns {JSX.Element}
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  id,
  align = "center",
  className = "",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

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
    if (!node || typeof IntersectionObserver !== "function") {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const alignment =
    align === "left" ? "mx-0 text-left" : "mx-auto text-center";

  // Classe d'état d'un élément (masqué → révélé) avec délai injecté en style.
  const item = (shown) =>
    [
      "motion-safe:transition-[opacity,transform] motion-safe:duration-entrance motion-safe:ease-signature",
      shown ? "opacity-100 translate-y-0" : "motion-safe:opacity-0 motion-safe:translate-y-4",
    ].join(" ");

  const delay = (ms) =>
    visible && !reduceMotion ? { transitionDelay: `${ms}ms` } : undefined;

  return (
    <div ref={ref} className={`max-w-2xl ${alignment} ${className}`}>
      <p
        className={`text-sm font-medium uppercase tracking-[0.18em] text-accent ${item(visible)}`}
        style={delay(0)}
      >
        {eyebrow}
      </p>

      {/* Trait turquoise : se déploie (scaleX) sous l'eyebrow. */}
      <span
        aria-hidden="true"
        className={[
          "mt-3 block h-px w-12 origin-left bg-gradient-to-r from-accent to-transparent",
          align === "center" ? "mx-auto origin-center" : "",
          "motion-safe:transition-transform motion-safe:duration-entrance motion-safe:ease-signature",
          visible ? "scale-x-100" : "motion-safe:scale-x-0",
        ].join(" ")}
        style={delay(90)}
      />

      <h2
        id={id}
        className={`mt-5 text-3xl font-semibold tracking-tight text-ink sm:text-4xl ${item(visible)}`}
        style={delay(150)}
      >
        {title}
      </h2>

      {subtitle ? (
        <p
          className={`mt-4 text-base leading-relaxed text-muted ${item(visible)}`}
          style={delay(240)}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
