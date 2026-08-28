import { useState } from "react";
import {
  IconCheck,
  IconArrowRight,
  IconLogoClaude,
  IconLogoCursor,
  IconLogoCopilot,
  IconLogoRooCode,
  IconLogoQwen,
} from "./icons";
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
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-accent hover:bg-accent-strong px-6 py-3 text-sm font-semibold text-white border border-accent-soft/30 active:scale-[0.98] transition-all font-mono"
          >
            <span>{freeCta}</span>
            <IconArrowRight size={16} />
          </a>
        </Reveal>

        {/* ---- Bloc 2 : Packs d'accompagnement ---- */}
        {/* Texte d'accroche au-dessus des deux packs. */}
        <Reveal>
          <p className="mx-auto mt-20 max-w-3xl text-center text-base leading-relaxed text-muted font-mono text-xs uppercase tracking-wider">
            // {packsIntro}
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
              <p className="text-ink font-mono text-xs">{pro.toolsLead}</p>
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
 * PackCard — Carte d'un pack au style Dev/Tech Corporate.
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
  const tilt = useTilt({ max: 3 });
  return (
    <article
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      style={style}
      className={[
        "spotlight-host relative flex h-full flex-col rounded-xl border p-7 transition-all duration-200",
        featured
          ? "border-accent/40 bg-surface md:-translate-y-1"
          : "border-border bg-surface hover:border-border-strong",
        className,
      ].join(" ")}
    >
      {/* Badge « Le plus choisi » */}
      {featured && badge ? (
        <span className="absolute -top-3 left-6 rounded border border-accent bg-accent px-2.5 py-0.5 font-mono text-[11px] font-bold text-white">
          ★ {badge}
        </span>
      ) : null}

      {/* En-tête de carte */}
      <header className="relative">
        <h3 className="text-lg font-bold font-display tracking-tightest text-ink">{name}</h3>
      </header>

      {/* Prix */}
      <div className="relative mt-6 flex items-baseline gap-2">
        <span className="text-4xl font-bold font-display tracking-tightest text-ink">
          {price}
        </span>
        <span className="text-sm font-semibold text-muted font-mono">{currency}</span>
      </div>

      {/* Liste des avantages */}
      <ul className="relative mt-6 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <IconCheck size={16} className="mt-0.5 shrink-0 text-accent" />
            <span className="text-ink text-xs sm:text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Détail additionnel optionnel */}
      {children ? <div className="relative">{children}</div> : null}

      {/* CTA */}
      <button
        type="button"
        onClick={onSelect}
        className={[
          "relative mt-8 w-full rounded-lg px-5 py-3 text-sm font-semibold transition-all active:scale-[0.98] font-mono",
          featured
            ? "bg-accent hover:bg-accent-strong text-white border border-accent-soft/30"
            : "border border-border bg-surface-raised text-ink hover:bg-surface",
        ].join(" ")}
      >
        {cta}
      </button>
    </article>
  );
}

function getToolIcon(name) {
  const n = name.toLowerCase();
  if (n.includes("claude")) return IconLogoClaude;
  if (n.includes("cursor")) return IconLogoCursor;
  if (n.includes("copilot")) return IconLogoCopilot;
  if (n.includes("qwen")) return IconLogoQwen;
  if (n.includes("roo") || n.includes("cline") || n.includes("kilo")) return IconLogoRooCode;
  return null;
}

/**
 * ToolGroup — Étiquette + liste de puces d'outils avec logos officiels.
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
        {items.map((item) => {
          const Icon = getToolIcon(item);
          return (
            <li
              key={item}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-raised px-2.5 py-1 text-xs text-ink/90 font-mono"
            >
              {Icon && <Icon size={13} className="text-accent shrink-0" />}
              <span>{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
