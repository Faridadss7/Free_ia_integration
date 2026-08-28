import Reveal from "./Reveal";
import useCountUp from "../hooks/useCountUp";

/**
 * StatsBand — Bande de chiffres clés avec compteurs animés au scroll.
 *
 * Trois statistiques réelles (clients accompagnés, temps moyen de configuration,
 * taux de satisfaction) défilent de 0 à leur valeur cible la première fois que la
 * bande entre dans le viewport, puis une ligne « depuis le … » ancre la preuve
 * dans le temps. Sous `prefers-reduced-motion`, les valeurs finales s'affichent
 * directement (cf. {@link useCountUp}).
 *
 * Conforme au design system : tokens, carte translucide, easing signature via le
 * hook, entrée révélée par {@link Reveal}. Placée juste sous les témoignages pour
 * renforcer la preuve sociale par des chiffres.
 *
 * @param {object} props
 * @param {(key: string) => any} props.t  Fonction de traduction (chemin pointé).
 * @returns {JSX.Element|null}
 */
export default function StatsBand({ t }) {
  const since = t("stats.since");
  /** @type {Array<{id:string, value:number, prefix:string, suffix:string, label:string}>} */
  const items = t("stats.items");

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section
      aria-label={since}
      className="relative px-6 pb-8 pt-4 sm:pb-12"
    >
      <Reveal direction="up" className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-md">
          <dl className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {items.map((item) => (
              <StatItem key={item.id} item={item} />
            ))}
          </dl>
          <p className="border-t border-border px-6 py-3.5 text-center text-xs font-mono text-muted">
            // {since}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/**
 * StatItem — Une cellule de la bande.
 */
function StatItem({ item }) {
  const { ref, value } = useCountUp(item.value, { duration: 1600 });

  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5 px-6 py-7 text-center">
      <dd className="font-display text-4xl font-bold tracking-tightest text-accent sm:text-5xl">
        {item.prefix}
        {value}
        {item.suffix}
      </dd>
      <dt className="text-xs font-medium text-muted">{item.label}</dt>
    </div>
  );
}
