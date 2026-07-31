import { useState } from "react";
import { IconArrowRight } from "./icons";
import Reveal from "./Reveal";
import useMagnetic from "../hooks/useMagnetic";
import PaymentWizard from "./PaymentWizard";

/**
 * CtaBanner — Bandeau de conversion final, adossé à la mission d'accessibilité.
 *
 * Grand panneau contrasté (dégradé turquoise) qui reprend le message de Farid :
 * rendre l'IA accessible à tous, peu importe le pays ou les moyens.
 *
 * Deux CTA magnétiques, aux rôles distincts (on évite le doublon) :
 *   - Principal « Démarrer maintenant » → ouvre directement le tunnel de paiement
 *     ({@link PaymentWizard}) pré-rempli sur le forfait Pro, comme le font Pricing
 *     et GuideSection. C'est l'action de conversion la plus forte.
 *   - Secondaire « Voir les tarifs » → scrolle vers la grille de prix (`#pricing`)
 *     via `onNavigate` (même moteur Lenis), pour qui veut d'abord comparer.
 *
 * Placé entre le guide et la FAQ pour offrir un point de conversion clair avant
 * la fin de page. Conforme au design system (tokens, easing signature, Reveal).
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

  // Forfait Pro pré-sélectionné pour l'ouverture directe du tunnel (même schéma
  // que Pricing / GuideSection). `null` = modale fermée.
  const pro = t("pricing.pro");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const magneticPrimary = useMagnetic({ strength: 0.4, max: 12 });
  const magneticSecondary = useMagnetic({ strength: 0.3, max: 10 });

  return (
    <section
      aria-labelledby="cta-banner-title"
      className="relative scroll-mt-24 px-6 py-20 sm:py-24"
    >
      <Reveal direction="scale" className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-accent/30 bg-gradient-to-br from-accent to-accent-strong px-8 py-14 text-center shadow-accent-md sm:px-14 sm:py-16">
          {/* Halo décoratif interne, pur ornement. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-black/10 blur-3xl"
          />

          <p className="relative text-sm font-semibold uppercase tracking-[0.2em] text-on-accent/80">
            {eyebrow}
          </p>
          <h2
            id="cta-banner-title"
            className="relative mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-on-accent sm:text-4xl"
          >
            {title}
          </h2>
          <p className="relative mx-auto mt-5 max-w-2xl text-base leading-relaxed text-on-accent/90 sm:text-lg">
            {text}
          </p>

          <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                setSelectedPlan({ name: pro.name, price: pro.price })
              }
              onPointerMove={magneticPrimary.onPointerMove}
              onPointerLeave={magneticPrimary.onPointerLeave}
              className="group inline-flex items-center gap-2 rounded-full bg-on-accent px-7 py-3.5 text-sm font-semibold text-accent shadow-elevation-md transition-[transform,box-shadow] duration-interaction ease-signature hover:shadow-elevation-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-accent"
            >
              {primary}
              <IconArrowRight
                size={18}
                className="transition-transform duration-interaction ease-signature group-hover:translate-x-0.5"
              />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("pricing")}
              onPointerMove={magneticSecondary.onPointerMove}
              onPointerLeave={magneticSecondary.onPointerLeave}
              className="inline-flex items-center gap-2 rounded-full border border-on-accent/40 px-7 py-3.5 text-sm font-semibold text-on-accent transition-[transform,border-color,background-color] duration-interaction ease-signature hover:border-on-accent/70 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-accent"
            >
              {secondary}
            </button>
          </div>
        </div>
      </Reveal>

      {/* Tunnel de paiement (monté à la demande, forfait Pro pré-sélectionné). */}
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
