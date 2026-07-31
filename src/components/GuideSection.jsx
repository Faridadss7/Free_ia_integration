import { useState } from "react";
import { IconCheck, IconArrowRight } from "./icons";
import Reveal from "./Reveal";
import useTilt from "../hooks/useTilt";
import PaymentWizard from "./PaymentWizard";

/**
 * GuideSection — Guide gratuit à télécharger + deux packs d'accompagnement.
 *
 * Placée entre Pricing et la FAQ. Deux blocs :
 *   1. Guide PDF gratuit — carte simple avec bouton de téléchargement réel
 *      (attribut `download`, pas un simple nouvel onglet).
 *   2. Deux packs (Standard / Pro) réutilisant EXACTEMENT le style des cartes
 *      de la section Pricing, et redirigeant vers le même tunnel de paiement
 *      ({@link PaymentWizard}) avec le forfait pré-sélectionné.
 *
 * Aucune autre section n'est modifiée ; ce composant est autonome et monte sa
 * propre modale à la demande, comme le fait Pricing.
 *
 * Tous les textes proviennent de `translations.js` via `t` (langue globale).
 *
 * @param {object} props
 * @param {(key: string) => any} props.t   Fonction de traduction (chemin pointé).
 * @param {"fr"|"en"} props.lang           Langue active (transmise au wizard).
 * @returns {JSX.Element}
 */
export default function GuideSection({ t, lang }) {
  const freeTitle = t("guide.freeTitle");
  const freeText = t("guide.freeText");
  const freeCta = t("guide.freeCta");
  const freeFileName = t("guide.freeFileName");
  const packsIntro = t("guide.packsIntro");
  const currency = t("pricing.currency");
  const mostChosen = t("pricing.mostChosen");
  const standard = t("guide.standard");
  const pro = t("guide.pro");

  // Lien de téléchargement direct (Google Drive `uc?export=download`).
  const guideUrl =
    "https://drive.google.com/uc?export=download&id=1eDWY-eEPT0N4PB8M4DYeKpWrpkX7L6tj";

  /**
   * Forfait sélectionné → pilote l'ouverture du wizard (même schéma que Pricing).
   * `null` = modale fermée.
   * @type {[{ name: string, price: string } | null, Function]}
   */
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <section
      id="guide"
      aria-labelledby="guide-title"
      className="relative scroll-mt-24 px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        {/* ---- Bloc 1 : Guide gratuit ---- */}
        <Reveal direction="scale" className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            {t("guide.freeCta")}
          </p>
          <h2
            id="guide-title"
            className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            {freeTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {freeText}
          </p>

          <a
            href={guideUrl}
            download={freeFileName}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-on-accent shadow-accent-sm transition-[transform,box-shadow,background-color] duration-interaction ease-signature hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-accent-md"
          >
            {freeCta}
            <IconArrowRight size={18} />
          </a>
        </Reveal>

        {/* ---- Bloc 2 : Packs d'accompagnement ---- */}
        {/* Texte d'accroche au-dessus des deux packs. */}
        <Reveal>
          <p className="mx-auto mt-20 max-w-3xl text-center text-base leading-relaxed text-muted">
            {packsIntro}
          </p>
        </Reveal>

        <Reveal
          stagger
          direction="up"
          staggerGap={120}
          className="mt-14 grid grid-cols-1 items-start gap-6 md:grid-cols-2"
        >
          {/* Pack Standard (sobre) */}
          <PackCard
            name={standard.name}
            price={standard.price}
            cta={standard.cta}
            currency={currency}
            features={standard.features}
            featured={false}
            onSelect={() =>
              setSelectedPlan({ name: standard.name, price: standard.price })
            }
          />

          {/* Pack Pro (mis en avant, comme l'offre Pro de Pricing) */}
          <PackCard
            name={pro.name}
            price={pro.price}
            cta={pro.cta}
            currency={currency}
            features={pro.features}
            featured
            badge={mostChosen}
            onSelect={() =>
              setSelectedPlan({ name: pro.name, price: pro.price })
            }
          >
            {/* Détail des outils supportés (spécifique au Pack Pro). */}
            <div className="mt-6 space-y-4 border-t border-border pt-6 text-sm">
              <p className="text-ink/80">{pro.toolsLead}</p>
              <ToolGroup label={pro.ideLabel} items={pro.ide} />
              <ToolGroup label={pro.agentsLabel} items={pro.agents} />
            </div>
          </PackCard>
        </Reveal>
      </div>

      {/* --- Modale de paiement (montée à la demande, tunnel existant) --- */}
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
 * PackCard — Carte d'un pack, calquée sur `PlanCard` de la section Pricing
 * (mêmes classes, mêmes états) pour une intégration visuelle sans rupture.
 *
 * @param {object} props
 * @param {string} props.name
 * @param {string} props.price
 * @param {string} props.cta
 * @param {string} props.currency
 * @param {string[]} props.features
 * @param {boolean} props.featured             Style « mis en avant » (Pro) ?
 * @param {string} [props.badge]               Libellé du badge (si `featured`).
 * @param {() => void} props.onSelect          Ouvre le wizard sur ce pack.
 * @param {import('react').ReactNode} [props.children]  Contenu additionnel.
 * @returns {JSX.Element}
 */
function PackCard({
  name,
  price,
  cta,
  currency,
  features,
  featured,
  badge,
  onSelect,
  children,
  className = "",
  style,
}) {
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
        <h3 className="text-lg font-semibold text-ink">{name}</h3>
      </header>

      {/* Prix */}
      <div className="relative mt-6 flex items-baseline gap-2">
        <span className="text-4xl font-bold tracking-tight text-ink">
          {price}
        </span>
        <span className="text-sm font-medium text-muted">{currency}</span>
      </div>

      {/* Liste des avantages (flex-1 : pousse le CTA en bas de carte) */}
      <ul className="relative mt-6 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <IconCheck size={18} className="mt-0.5 shrink-0 text-accent" />
            <span className="text-ink/80">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Détail additionnel optionnel (outils du Pack Pro) */}
      {children ? <div className="relative">{children}</div> : null}

      {/* CTA — même style que la carte Pricing correspondante. */}
      <button
        type="button"
        onClick={onSelect}
        className={[
          "relative mt-8 w-full rounded-xl px-5 py-3 text-sm font-semibold transition-[transform,box-shadow,background-color,border-color] duration-interaction ease-signature",
          featured
            ? "shimmer-line bg-accent text-on-accent shadow-accent-sm hover:-translate-y-0.5 hover:bg-accent-strong hover:shadow-accent-md"
            : "border border-border-strong text-ink hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/5",
        ].join(" ")}
      >
        {cta}
      </button>
    </article>
  );
}

/**
 * ToolGroup — Étiquette + liste de puces d'outils (IDE / agents terminal).
 *
 * @param {{ label: string, items: string[] }} props
 * @returns {JSX.Element}
 */
function ToolGroup({ label, items }) {
  return (
    <div>
      <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
        {label}
      </span>
      <ul className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-md border border-border bg-accent/[0.04] px-2.5 py-1 text-xs text-ink/80"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
