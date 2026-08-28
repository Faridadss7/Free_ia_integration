import { useState } from "react";
import { IconArrowRight, IconBadgeCheck } from "./icons";
import Reveal from "./Reveal";
import useMagnetic from "../hooks/useMagnetic";
import BorderBeam from "./BorderBeam";
import PaymentWizard from "./PaymentWizard";

/**
 * CtaBanner — Bandeau de conversion final haute intensité.
 *
 * @param {object} props
 * @param {(key: string) => any} props.t             Traduction (chemin pointé).
 * @param {"fr"|"en"} props.lang                     Langue active (transmise au wizard).
 * @param {(id: string) => void} props.onNavigate    Navigation par ancre (scroll).
 * @returns {JSX.Element}
 */
export default function CtaBanner({ t, lang, onNavigate }) {
  const eyebrow = t("ctaBanner.eyebrow");
  const title = t("ctaBanner.title");
  const text = t("ctaBanner.text");
  const primary = t("ctaBanner.primary");
  const secondary = t("ctaBanner.secondary");

  const pro = t("pricing.pro");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const magneticPrimary = useMagnetic({ strength: 0.4, max: 12 });
  const magneticSecondary = useMagnetic({ strength: 0.3, max: 10 });

  return (
    <section
      aria-labelledby="cta-banner-title"
      className="relative scroll-mt-24 px-6 py-20 sm:py-28"
    >
      <Reveal direction="scale" className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-2xl border border-accent/40 bg-surface px-8 py-14 text-center sm:px-14 sm:py-18">
          <BorderBeam size={320} duration={9} colorFrom="#d97706" colorTo="#b45309" />

          <span className="inline-block rounded border border-border bg-surface-raised px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-accent">
            [● {eyebrow}]
          </span>

          <h2
            id="cta-banner-title"
            className="relative mx-auto mt-6 max-w-3xl font-display text-3xl font-bold tracking-tightest text-ink sm:text-5xl sm:leading-[1.15]"
          >
            {title}
          </h2>

          <p className="relative mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {text}
          </p>

          <div className="relative mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                setSelectedPlan({ name: pro.name, price: pro.price })
              }
              onPointerMove={magneticPrimary.onPointerMove}
              onPointerLeave={magneticPrimary.onPointerLeave}
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent hover:bg-accent-strong px-8 py-3.5 text-sm font-semibold text-white border border-accent-soft/30 active:scale-[0.98] transition-all font-mono"
            >
              <span>{primary}</span>
              <IconArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>

            <button
              type="button"
              onClick={() => onNavigate("pricing")}
              onPointerMove={magneticSecondary.onPointerMove}
              onPointerLeave={magneticSecondary.onPointerLeave}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface-raised hover:bg-surface px-7 py-3.5 text-sm font-semibold text-ink active:scale-[0.98] transition-all font-mono"
            >
              <span>{secondary}</span>
            </button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted font-mono">
            <span className="flex items-center gap-1.5">
              <IconBadgeCheck size={16} className="text-accent" />
              <span>Garantie 100% Fonctionnel</span>
            </span>
            <span className="flex items-center gap-1.5">
              <IconBadgeCheck size={16} className="text-accent" />
              <span>Livraison clé en main rapide</span>
            </span>
          </div>
        </div>
      </Reveal>

      {/* Tunnel de paiement */}
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

