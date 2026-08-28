import { useState } from "react";
import { IconCheck, IconArrowRight, IconBadgeCheck } from "./icons";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import useTilt from "../hooks/useTilt";
import BorderBeam from "./BorderBeam";
import PaymentWizard from "./PaymentWizard";

/**
 * Pricing — Table des tarifs 100% React interactive (Basic & Pro).
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

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeCurrency, setActiveCurrency] = useState(lang === "fr" ? "FCFA" : "EUR");

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="relative scroll-mt-24 px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="pricing-title"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />

        {/* Cartes de tarifs interactives 100% React */}
        <Reveal
          stagger
          direction="up"
          staggerGap={120}
          className="mt-14 grid grid-cols-1 items-stretch gap-8 md:grid-cols-2"
        >
          {/* Forfait STANDARD / BASIC */}
          <InteractivePlanCard
            plan={basic}
            currency={currency}
            featured={false}
            onSelect={() =>
              setSelectedPlan({ name: basic.name, price: basic.price })
            }
          />

          {/* Forfait PRO (Mis en avant avec BorderBeam et glow néon) */}
          <InteractivePlanCard
            plan={pro}
            currency={currency}
            featured
            badge={mostChosen}
            onSelect={() =>
              setSelectedPlan({ name: pro.name, price: pro.price })
            }
          />
        </Reveal>

        {/* Bannière de réassurance & garantie */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 rounded-xl border border-border bg-surface p-4 text-center text-xs text-muted">
          <span className="flex items-center gap-2 text-ink">
            <IconBadgeCheck size={16} className="text-accent" />
            <span><strong>Paiement sécurisé</strong> via Mobile Money (MTN / Moov) & Virement</span>
          </span>
          <span className="flex items-center gap-2 text-ink">
            <IconBadgeCheck size={16} className="text-accent" />
            <span><strong>Installation &lt; 1h</strong> assistée pas-à-pas à distance</span>
          </span>
          <span className="flex items-center gap-2 text-ink">
            <IconBadgeCheck size={16} className="text-accent" />
            <span><strong>Zéro abonnement</strong> supplémentaire requis</span>
          </span>
        </div>
      </div>

      {/* Modale de commande & paiement */}
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
 * InteractivePlanCard — Carte de forfait native avec animations et effets techniques.
 */
function InteractivePlanCard({ plan, currency, featured, badge, onSelect }) {
  const tilt = useTilt({ max: 3, scale: 1.01 });

  return (
    <article
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      className={`spotlight-host relative flex h-full flex-col justify-between overflow-hidden rounded-xl border p-8 transition-all duration-200 ${
        featured
          ? "border-accent/40 bg-surface md:-translate-y-1"
          : "border-border bg-surface hover:border-border-strong"
      }`}
    >
      {featured && (
        <BorderBeam size={280} duration={8} colorFrom="#d97706" colorTo="#b45309" />
      )}

      {/* Badge technique style étiquette */}
      {featured && badge && (
        <div className="absolute top-0 right-6 -translate-y-1/2">
          <span className="inline-flex items-center gap-1.5 rounded border border-accent bg-accent px-2.5 py-0.5 font-mono text-[11px] font-bold text-white">
            ★ {badge}
          </span>
        </div>
      )}

      <div>
        {/* En-tête de carte */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold font-display tracking-tightest text-ink">{plan.name}</h3>
            <p className="mt-1 text-xs text-muted leading-relaxed">{plan.tagline}</p>
          </div>
          <span
            className={`rounded px-2 py-0.5 text-xs font-mono font-bold ${
              featured ? "bg-accent/10 text-accent border border-accent/30" : "bg-surface-raised border border-border text-muted"
            }`}
          >
            {featured ? "[PACK COMPLET]" : "[ESSENTIEL]"}
          </span>
        </div>

        {/* Prix */}
        <div className="mt-6 flex items-baseline gap-2 border-b border-border pb-6">
          <span className="text-4xl font-bold font-display tracking-tightest text-ink sm:text-5xl">
            {plan.price}
          </span>
          <span className="text-sm font-semibold text-muted font-mono">{currency}</span>
          <span className="ml-auto text-[11px] text-accent font-mono font-bold bg-surface-raised px-2 py-0.5 rounded border border-border">
            Paiement Unique
          </span>
        </div>

        {/* Liste des fonctionnalités */}
        <ul className="mt-6 space-y-3.5 text-sm">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 text-accent">
                <IconCheck size={15} />
              </span>
              <span className="text-ink text-xs sm:text-sm leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bouton CTA */}
      <div className="mt-8 pt-4">
        <button
          type="button"
          onClick={onSelect}
          className={`group flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold transition-all active:scale-[0.98] font-mono ${
            featured
              ? "bg-accent hover:bg-accent-strong text-white border border-accent-soft/30"
              : "border border-border bg-surface-raised text-ink hover:bg-surface"
          }`}
        >
          <span>{plan.cta}</span>
          <IconArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>
      </div>
    </article>
  );
}

