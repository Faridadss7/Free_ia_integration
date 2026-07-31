import { useCallback, useEffect, useRef, useState } from "react";
import { IconStar, IconQuote, IconBadgeCheck, IconArrowRight } from "./icons";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import useTilt from "../hooks/useTilt";

/**
 * Testimonials — Preuve sociale sous forme de carrousel premium.
 *
 * Chaque avis occupe une grande carte (les témoignages sont longs et narratifs :
 * une carte à la fois se lit mieux qu'une grille serrée). On navigue via les
 * flèches, les points de pagination ou le clavier ; l'auto-défilement se met en
 * pause au survol / focus et est neutralisé sous `prefers-reduced-motion`.
 *
 * Conforme au design system : tokens, easing signature, spotlight + tilt au
 * survol de la carte active, entrée révélée via {@link Reveal}. Aucune donnée de
 * contact affichée (RGPD) — seulement prénom + rôle (+ ville si fournie).
 *
 * @param {object} props
 * @param {(key: string) => any} props.t  Fonction de traduction (chemin pointé).
 * @returns {JSX.Element|null}
 */
export default function Testimonials({ t }) {
  const eyebrow = t("testimonials.eyebrow");
  const title = t("testimonials.title");
  const subtitle = t("testimonials.subtitle");
  const verifiedLabel = t("testimonials.verified");
  const prevLabel = t("testimonials.prev");
  const nextLabel = t("testimonials.next");
  const pickLabel = t("testimonials.pick");
  /** @type {Array<{id:string, quote:string, name:string, role:string, location:string, rating:number}>} */
  const items = t("testimonials.items");

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const tilt = useTilt({ max: 4, scale: 1.01 });

  const count = Array.isArray(items) ? items.length : 0;

  const reduceMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const go = useCallback(
    (next) => {
      if (count === 0) return;
      setIndex((prev) => (next + count) % count);
    },
    [count]
  );

  // Auto-défilement doux (7 s), en pause au survol/focus et sous reduced-motion.
  useEffect(() => {
    if (paused || reduceMotion || count <= 1) return undefined;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, 7000);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, count]);

  // Positionne le projecteur de la carte active sous le curseur.
  const handleCardMove = (e) => {
    tilt.onPointerMove(e);
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  if (count === 0) return null;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      aria-roledescription="carrousel"
      className="relative scroll-mt-24 px-6 py-24 sm:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          id="testimonials-title"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />

        <Reveal direction="scale" className="mt-14">
          {/* Piste : chaque avis est empilé ; seul l'actif est visible/opaque.
              On garde tout dans le DOM pour un fondu croisé fluide. */}
          <div
            className="relative"
            role="group"
            aria-live={paused ? "polite" : "off"}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") go(index - 1);
              if (e.key === "ArrowRight") go(index + 1);
            }}
          >
            {items.map((item, i) => {
              const active = i === index;
              return (
                <article
                  key={item.id}
                  aria-hidden={!active}
                  aria-roledescription="diapositive"
                  aria-label={`${i + 1} / ${count}`}
                  onPointerMove={active ? handleCardMove : undefined}
                  onPointerLeave={active ? tilt.onPointerLeave : undefined}
                  className={[
                    "spotlight-host group overflow-hidden rounded-3xl border border-border bg-surface p-8 shadow-elevation-lg transition-[opacity,transform] duration-entrance ease-signature sm:p-10",
                    active
                      ? "relative opacity-100"
                      : "pointer-events-none absolute inset-0 opacity-0 motion-safe:translate-y-4",
                  ].join(" ")}
                >
                  <span aria-hidden="true" className="spotlight" />

                  {/* Guillemet décoratif + note en étoiles. */}
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-accent/[0.06] text-accent">
                      <IconQuote size={20} />
                    </span>
                    <div
                      className="flex items-center gap-1 text-accent"
                      role="img"
                      aria-label={`${item.rating} / 5`}
                    >
                      {Array.from({ length: 5 }).map((_, s) => (
                        <IconStar
                          key={s}
                          size={16}
                          filled={s < item.rating}
                          className={s < item.rating ? "" : "opacity-30"}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Citation. */}
                  <blockquote className="relative mt-6 text-lg leading-relaxed text-ink sm:text-xl">
                    {item.quote}
                  </blockquote>

                  {/* Auteur + badge vérifié. */}
                  <figcaption className="relative mt-7 flex items-center gap-4 border-t border-border pt-6">
                    <span
                      aria-hidden="true"
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-strong text-sm font-semibold text-on-accent"
                    >
                      {getInitials(item.name)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">
                        {item.name}
                      </p>
                      <p className="truncate text-sm text-muted">
                        {item.role}
                        {item.location ? ` · ${item.location}` : ""}
                      </p>
                    </div>
                    <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/30 bg-accent/[0.06] px-3 py-1 text-xs font-medium text-accent">
                      <IconBadgeCheck size={14} />
                      {verifiedLabel}
                    </span>
                  </figcaption>
                </article>
              );
            })}
          </div>

          {/* Contrôles : flèches + points de pagination. */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={prevLabel}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-ink transition-[transform,border-color,color] duration-interaction ease-signature hover:-translate-x-0.5 hover:border-accent/40 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <IconArrowRight size={18} className="rotate-180" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label={pickLabel}>
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`${pickLabel} ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={[
                    "h-2 rounded-full transition-[width,background-color] duration-transition ease-signature focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                    i === index
                      ? "w-6 bg-accent"
                      : "w-2 bg-border-strong hover:bg-accent/50",
                  ].join(" ")}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={nextLabel}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-ink transition-[transform,border-color,color] duration-interaction ease-signature hover:translate-x-0.5 hover:border-accent/40 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <IconArrowRight size={18} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Extrait les initiales d'un nom (« Aïssatou H. » → « AH ») pour l'avatar.
 * @param {string} name
 * @returns {string}
 */
function getInitials(name) {
  return String(name ?? "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
