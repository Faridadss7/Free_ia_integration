import { useState } from "react";
import { IconCheck } from "./icons";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import useTilt from "../hooks/useTilt";
import PaymentWizard from "./PaymentWizard";

/**
 * Pricing — Table des tarifs à deux forfaits (Basic / Pro).
 *
 * Le forfait Pro éclipse volontairement le Basic : bordure lumineuse turquoise,
 * badge « Le plus choisi », CTA plus visible et légère mise en avant d'échelle.
 * Au clic sur un forfait, la {@link PaymentWizard} s'ouvre en modale plein écran.
 *
 * Tous les textes proviennent de `translations.js` via `t` (langue globale).
 *
 * @param {object} props
 * @param {(key: string) => any} props.t    Fonction de traduction (chemin pointé).
 * @param {"fr"|"en"} props.lang            Langue active (transmise au wizard).
 * @returns {JSX.Element}
 */
export default function Pricing({ t, lang }) {
  const eyebrow = t("pricing.eyebrow");
  const title = t("pricing.title");
  const subtitle = t("pricing.subtitle");
  const currency = t("pricing.currency");
  const mostChosen = t("pricing.mostChosen");
  const basic = t("pricing.basic");
  const pro = t("pricing.pro");

  /**
   * Forfait sélectionné → pilote l'ouverture du wizard.
   * `null` = modale fermée.
   * @type {[{ name: string, price: string } | null, Function]}
   */
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="relative scroll-mt-24 px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        {/* --- En-tête de section (entrée en cascade) --- */}
        <SectionHeading
          id="pricing-title"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />

        {/* --- Cartes de tarif (entrée en cascade) ---
            En français : visuels Canva sur-mesure (cliquables). En anglais :
            cartes React thème-aware (les visuels Canva ont leur texte en dur). */}
        <Reveal
          stagger
          direction="up"
          staggerGap={120}
          className="mt-14 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2"
        >
          {lang === "fr" ? (
            <>
              {/* ---- Visuel Canva — Standard ---- */}
              <PlanImageCard
                src="/assets/pricing-standard-fr.png"
                alt={`${basic.name} — ${basic.price} ${currency}`}
                cta={basic.cta}
                featured={false}
                onSelect={() =>
                  setSelectedPlan({ name: basic.name, price: basic.price })
                }
              />

              {/* ---- Visuel Canva — Pro (mis en avant) ---- */}
              <PlanImageCard
                src="/assets/pricing-pro-fr.png"
                alt={`${pro.name} — ${pro.price} ${currency}`}
                cta={pro.cta}
                featured
                onSelect={() =>
                  setSelectedPlan({ name: pro.name, price: pro.price })
                }
              />
            </>
          ) : (
            <>
              {/* ---- Forfait Basic (sobre) ---- */}
              <PlanCard
                plan={basic}
                currency={currency}
                featured={false}
                onSelect={() =>
                  setSelectedPlan({ name: basic.name, price: basic.price })
                }
              />

              {/* ---- Forfait Pro (mis en avant) ---- */}
              <PlanCard
                plan={pro}
                currency={currency}
                featured
                badge={mostChosen}
                onSelect={() =>
                  setSelectedPlan({ name: pro.name, price: pro.price })
                }
              />
            </>
          )}
        </Reveal>
      </div>

      {/* --- Modale de paiement (montée à la demande) --- */}
      {selectedPlan ? (
        <PaymentWizard
          t={t}
          lang={lang}
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      ) : null}
    </section>
  );
}

/**
 * PlanCard — Carte d'un forfait.
 *
 * @param {object} props
 * @param {{ name: string, price: string, tagline: string, cta: string,
 *           features: string[] }} props.plan  Données du forfait.
 * @param {string} props.currency              Devise (ex. « FCFA »).
 * @param {boolean} props.featured             Style « mis en avant » (Pro) ?
 * @param {string} [props.badge]               Libellé du badge (si `featured`).
 * @param {() => void} props.onSelect          Ouvre le wizard sur ce forfait.
 * @returns {JSX.Element}
 */
function PlanCard({ plan, currency, featured, badge, onSelect, className = "", style }) {
  const tilt = useTilt({ max: 5 });
  return (
    <article
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      style={style}
      className={[
        "spotlight-host relative flex h-full flex-col rounded-2xl border p-7 transition-[transform,border-color,box-shadow] duration-transition ease-signature will-change-transform",
        featured
          ? "border-accent/35 bg-surface shadow-accent-md md:-translate-y-2"
          : "border-border bg-surface shadow-elevation-md",
        className,
      ].join(" ")}
    >
      {/* Projecteur turquoise qui suit le curseur */}
      <span aria-hidden="true" className="spotlight" />

      {/* Halo turquoise diffus derrière la carte Pro (palette unifiée) */}
      {featured ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-b from-accent/15 to-transparent blur-xl"
        />
      ) : null}

      {/* Badge « Le plus choisi » */}
      {featured && badge ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-on-accent shadow-accent-sm">
          {badge}
        </span>
      ) : null}

      {/* En-tête de carte */}
      <header className="relative">
        <h3 className="text-lg font-semibold text-ink">{plan.name}</h3>
        <p className="mt-1 text-sm text-muted">{plan.tagline}</p>
      </header>

      {/* Prix */}
      <div className="relative mt-6 flex items-baseline gap-2">
        <span className="text-4xl font-bold tracking-tight text-ink">
          {plan.price}
        </span>
        <span className="text-sm font-medium text-muted">{currency}</span>
      </div>

      {/* Liste des avantages */}
      <ul className="relative mt-6 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <IconCheck
              size={18}
              className="mt-0.5 shrink-0 text-accent"
            />
            <span className="text-ink/80">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        type="button"
        onClick={onSelect}
        className={[
          "relative mt-8 w-full rounded-xl px-5 py-3 text-sm font-semibold transition-[transform,box-shadow,background-color,border-color] duration-interaction ease-signature focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          featured
            ? "shimmer-line bg-accent text-on-accent shadow-accent-sm hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-accent-md"
            : "border border-border-strong text-ink hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/5",
        ].join(" ")}
      >
        {plan.cta}
      </button>
    </article>
  );
}

/**
 * PlanImageCard — Carte de forfait basée sur un visuel Canva (français).
 *
 * Affiche l'image Canva du forfait dans un conteneur cohérent avec le reste du
 * site : inclinaison 3D au survol (`useTilt`), projecteur turquoise qui suit le
 * curseur (spotlight), halo pour la carte mise en avant. Toute la carte est un
 * bouton : au clic, elle ouvre le tunnel de paiement sur le forfait concerné.
 *
 * Le visuel Canva ayant son texte « cuit » (bilinguisme et thème gérés en amont
 * dans {@link Pricing} : images en FR, cartes React en EN), ce composant ne
 * porte aucun texte propre — l'accessibilité passe par `alt` + `aria-label`.
 *
 * @param {object} props
 * @param {string} props.src              Chemin du visuel Canva (public/assets).
 * @param {string} props.alt             Texte alternatif (nom + prix du forfait).
 * @param {string} props.cta             Libellé d'action (aria-label du bouton).
 * @param {boolean} props.featured       Style « mis en avant » (Pro) ?
 * @param {() => void} props.onSelect    Ouvre le wizard sur ce forfait.
 * @param {string} [props.className]     Classes injectées (cascade Reveal).
 * @param {object} [props.style]         Style injecté (délai de cascade Reveal).
 * @returns {JSX.Element}
 */
function PlanImageCard({ src, alt, cta, featured, onSelect, className = "", style }) {
  const tilt = useTilt({ max: 5 });
  return (
    <button
      type="button"
      onClick={onSelect}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      aria-label={cta}
      style={style}
      className={[
        "spotlight-host group relative block w-full overflow-hidden rounded-2xl border transition-[transform,border-color,box-shadow] duration-transition ease-signature will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        featured
          ? "border-accent/35 shadow-accent-md md:-translate-y-2"
          : "border-border shadow-elevation-md hover:-translate-y-0.5 hover:border-accent/40",
        className,
      ].join(" ")}
    >
      {/* Halo turquoise diffus derrière la carte Pro (palette unifiée) */}
      {featured ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-b from-accent/20 to-transparent blur-xl"
        />
      ) : null}

      {/* Visuel Canva du forfait */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block w-full"
      />

      {/* Projecteur turquoise qui suit le curseur */}
      <span aria-hidden="true" className="spotlight" />
    </button>
  );
}
