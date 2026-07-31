import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { VALUE_ICONS } from "./icons";

/**
 * ValueGrid — Bento Grid 2×3 « Ce que vous obtenez », version motion-first.
 *
 * Affiche les 6 prestations issues du dictionnaire (`values.items`). Chaque
 * carte :
 *  - entre en cascade au scroll (via {@link Reveal} en mode `stagger`) ;
 *  - révèle un projecteur turquoise qui suit le curseur au survol (spotlight) ;
 *  - se soulève légèrement et fait flotter son icône.
 *
 * Le suivi du curseur passe par des variables CSS (`--mx` / `--my`) écrites sur
 * la carte : aucun état React, aucun re-render au mouvement de souris.
 *
 * Tous les textes proviennent exclusivement de `translations.js` via `t`.
 *
 * @param {object} props
 * @param {(key: string) => any} props.t  Fonction de traduction (chemin pointé).
 * @returns {JSX.Element}
 */
export default function ValueGrid({ t }) {
  const eyebrow = t("values.eyebrow");
  const title = t("values.title");
  const subtitle = t("values.subtitle");
  /** @type {Array<{id: string, title: string, description: string}>} */
  const items = t("values.items");

  /** Positionne le projecteur de la carte sous le curseur (variables CSS). */
  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="values"
      aria-labelledby="values-title"
      className="relative scroll-mt-24 px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        {/* --- En-tête de section (entrée en cascade) --- */}
        <SectionHeading
          id="values-title"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />

        {/* --- Grille Bento 2×3 (entrée en cascade au scroll) --- */}
        <Reveal
          stagger
          direction="up"
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => {
            const Icon = VALUE_ICONS[item.id];
            return (
              <article
                key={item.id}
                onPointerMove={handleCardMove}
                className="spotlight-host group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-elevation-md transition-[transform,border-color,box-shadow] duration-transition ease-signature hover:-translate-y-1 hover:border-accent/30 hover:shadow-accent-sm"
              >
                {/* Projecteur turquoise qui suit le curseur (spotlight) */}
                <span aria-hidden="true" className="spotlight" />

                {/* Lumière de bordure turquoise révélée au survol (palette unifiée) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/[0.08] via-transparent to-transparent opacity-0 transition-opacity duration-transition ease-signature group-hover:opacity-100"
                />

                <div className="relative">
                  {/* Pastille d'icône (flotte doucement au survol) */}
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-accent/[0.06] text-accent transition-[color,transform] duration-transition ease-signature group-hover:text-accent-strong motion-safe:group-hover:animate-float">
                    {Icon ? <Icon size={22} /> : null}
                  </span>

                  <h3 className="mt-5 text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
