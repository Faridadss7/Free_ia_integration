import { WHY_ICONS } from "./icons";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

/**
 * WhySection — « Pourquoi collaborer avec Farid ADISSO ? ».
 *
 * Section sobre et impactante valorisant l'expertise sans ton académique.
 * Chaque point clé est accompagné d'une icône subtile résolue depuis son `id`
 * via {@link WHY_ICONS}. Le premier point occupe une carte plus large pour un
 * rythme visuel non monotone (grille asymétrique).
 *
 * Tous les textes proviennent de `translations.js` via `t` (langue globale).
 *
 * @param {object} props
 * @param {(key: string) => any} props.t  Fonction de traduction (chemin pointé).
 * @returns {JSX.Element}
 */
export default function WhySection({ t }) {
  const eyebrow = t("why.eyebrow");
  const title = t("why.title");
  /** @type {Array<{id: string, title: string, description: string}>} */
  const points = t("why.points");

  /** Positionne le projecteur de la carte sous le curseur (variables CSS). */
  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className="relative scroll-mt-24 px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        {/* --- En-tête de section (entrée en cascade) --- */}
        <SectionHeading id="why-title" eyebrow={eyebrow} title={title} />

        {/* --- Points clés (entrée en cascade + spotlight au survol) --- */}
        <Reveal
          stagger
          direction="up"
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {points.map((point, index) => {
            const Icon = WHY_ICONS[point.id];
            // Le premier point s'étale sur deux colonnes en desktop.
            const wide = index === 0;
            return (
              <article
                key={point.id}
                onPointerMove={handleCardMove}
                className={[
                  "spotlight-host group relative flex h-full items-start gap-4 overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-elevation-md transition-[transform,border-color,box-shadow] duration-transition ease-signature hover:-translate-y-1 hover:border-accent/30 hover:shadow-accent-sm",
                  wide ? "lg:col-span-2" : "",
                ].join(" ")}
              >
                <span aria-hidden="true" className="spotlight" />
                <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-accent/[0.06] text-accent transition-[color,transform] duration-interaction ease-signature group-hover:text-accent-strong motion-safe:group-hover:animate-float">
                  {Icon ? <Icon size={22} /> : null}
                </span>
                <div className="relative">
                  <h3 className="text-base font-semibold text-ink">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {point.description}
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
