import { useState } from "react";
import {
  IconCheck,
  IconArrowRight,
  IconBadgeCheck,
  IconSpark,
  IconTerminal,
  IconLayers,
  IconLogoClaude,
  IconLogoCursor,
  IconLogoGoogleAI,
  IconLogoAntigravity,
  IconLogoSuno,
} from "./icons";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import BorderBeam from "./BorderBeam";
import PaymentWizard from "./PaymentWizard";

/**
 * Icône spécifique par module pour l'affichage visuel du curriculum (Logos Officiels).
 */
const MODULE_ICONS = {
  m1: IconLogoClaude,
  m2: IconLogoCursor,
  m3: IconLogoGoogleAI,
  m4: IconLayers,
  m5: IconLogoAntigravity,
  m6: IconLogoSuno,
};

/**
 * TrainingCurriculum — Programme complet de formation payante IA & VibeCoding.
 *
 * @param {object} props
 * @param {(key: string) => any} props.t    Fonction de traduction.
 * @param {"fr"|"en"} props.lang            Langue active.
 * @param {(id: string) => void} [props.onNavigate]
 * @returns {JSX.Element}
 */
export default function TrainingCurriculum({ t, lang, onNavigate }) {
  const eyebrow = t("training.eyebrow");
  const title = t("training.title");
  const subtitle = t("training.subtitle");
  const badge = t("training.badge");
  const stats = t("training.stats") || [];
  const modules = t("training.modules") || [];
  const guarantees = t("training.guarantees") || [];
  const cta = t("training.cta");
  const ctaSub = t("training.ctaSub");
  const price = t("training.price");
  const priceOld = t("training.priceOld");
  const currency = t("training.currency");
  const planName = t("training.planName");

  const [activeModuleId, setActiveModuleId] = useState(modules[0]?.id || "m1");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const activeModule = modules.find((m) => m.id === activeModuleId) || modules[0];

  return (
    <section
      id="training"
      aria-labelledby="training-title"
      className="relative scroll-mt-24 px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        {/* En-tête de section */}
        <SectionHeading
          id="training-title"
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
        />

        {/* Badge Masterclass & Stats Highlights */}
        <Reveal direction="scale" className="mt-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded border border-border bg-surface-raised px-3 py-1 font-mono text-xs font-semibold text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span>[{badge}]</span>
            </span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((st, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border bg-surface p-4 text-center"
              >
                <div className="text-xl font-bold font-display tracking-tightest text-accent sm:text-2xl">
                  {st.value}
                </div>
                <div className="mt-1 text-xs font-mono text-muted uppercase tracking-wider">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Grille Interactive du Programme : Liste des Modules + Vue Détaillée */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Colonne Gauche : Sélecteur de Modules (5 cols) */}
          <div className="space-y-3 lg:col-span-5">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-muted mb-2 px-1">
              // Modules de la formation
            </div>
            {modules.map((mod) => {
              const isSelected = mod.id === activeModuleId;

              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => setActiveModuleId(mod.id)}
                  className={`w-full text-left rounded-xl p-4 transition-all duration-200 border flex items-start gap-4 ${
                    isSelected
                      ? "border-accent/40 bg-surface -translate-y-0.5"
                      : "border-border bg-surface/60 hover:bg-surface hover:border-border-strong text-muted"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border font-mono text-xs font-bold ${
                      isSelected
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : "border-border bg-surface-raised text-muted"
                    }`}
                  >
                    {mod.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-accent">
                        {mod.tag}
                      </span>
                      <span className="text-[10px] font-mono text-muted">
                        {mod.duration}
                      </span>
                    </div>
                    <h4
                      className={`text-sm font-bold mt-1 line-clamp-1 font-display tracking-tightest ${
                        isSelected ? "text-ink" : "text-ink/80"
                      }`}
                    >
                      {mod.title}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Colonne Droite : Vue Détaillée du Module Actif (7 cols) */}
          <div className="lg:col-span-7">
            {activeModule && (
              <ModuleDetailCard
                module={activeModule}
                onEnroll={() =>
                  setSelectedPlan({ name: planName, price: price })
                }
                ctaLabel={cta}
              />
            )}
          </div>
        </div>

        {/* Bloc Tarif & Inscription Directe (Call to Action) */}
        <Reveal direction="up" className="mt-16">
          <div className="relative overflow-hidden rounded-2xl border border-accent/40 bg-surface p-8 sm:p-10">
            <BorderBeam size={340} duration={9} colorFrom="#d97706" colorTo="#b45309" />

            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              {/* Détail de l'offre */}
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 rounded border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-xs font-bold text-accent">
                  ★ OFFRE DE LANCEMENT LIMITÉE
                </div>
                <h3 className="text-2xl font-bold font-display tracking-tightest text-ink sm:text-3xl">
                  {planName}
                </h3>
                <p className="text-sm text-muted leading-relaxed max-w-2xl">
                  Accédez immédiatement aux 6 modules intensifs, à l'ensemble des scripts d'installation, à nos modèles de configuration et intégrez notre groupe privé VIP d'entraide pour passer au niveau supérieur.
                </p>

                {/* Garanties */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {guarantees.map((g, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-ink font-mono">
                      <IconCheck size={14} className="text-accent shrink-0" />
                      <span>{g}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prix & Bouton d'action */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-8">
                <div className="text-center lg:text-right">
                  <div className="text-xs font-mono line-through text-muted">
                    {priceOld} {currency}
                  </div>
                  <div className="flex items-baseline gap-2 justify-center lg:justify-end mt-1">
                    <span className="text-4xl sm:text-5xl font-bold font-display tracking-tightest text-ink">
                      {price}
                    </span>
                    <span className="text-sm font-semibold text-muted font-mono">
                      {currency}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-accent font-bold mt-1">
                    Accès à vie • Paiement Unique
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedPlan({ name: planName, price: price })
                  }
                  className="mt-6 group flex w-full items-center justify-center gap-2 rounded-lg bg-accent hover:bg-accent-strong px-6 py-3.5 text-sm font-bold text-white transition-all active:scale-[0.98] border border-accent-soft/30 font-mono"
                >
                  <span>{cta}</span>
                  <IconArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
                <p className="mt-2 text-[11px] text-muted text-center lg:text-right font-mono">
                  {ctaSub}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Modale de Paiement Wizard */}
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
 * ModuleDetailCard — Fiche descriptive du module sélectionné.
 */
function ModuleDetailCard({ module, onEnroll, ctaLabel }) {
  const IconComponent = MODULE_ICONS[module.id] || IconCode;

  return (
    <article className="relative rounded-2xl border border-border bg-surface p-7 sm:p-8 transition-all duration-300">
      {/* Header du module */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-raised border border-border text-accent">
            <IconComponent size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-accent">
                MODULE {module.number}
              </span>
              <span className="text-muted">•</span>
              <span className="font-mono text-xs text-muted">
                {module.tag}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-display tracking-tightest text-ink mt-0.5">
              {module.title}
            </h3>
          </div>
        </div>

        <span className="rounded border border-border bg-surface-raised px-2.5 py-1 font-mono text-xs font-semibold text-muted">
          {module.duration}
        </span>
      </div>

      {/* Description */}
      <p className="mt-6 text-sm sm:text-base leading-relaxed text-muted">
        {module.description}
      </p>

      {/* Compétences & Connaissances Pratiques Clés */}
      <div className="mt-6 border-t border-border pt-6">
        <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-ink mb-4">
          // Compétences & Livrables pratiques
        </h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {module.skills?.map((skill, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 rounded-lg border border-border bg-surface-raised/50 p-3 text-xs text-ink leading-relaxed"
            >
              <IconBadgeCheck
                size={16}
                className="text-accent shrink-0 mt-0.5"
              />
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA secondaire dans le module */}
      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        <span className="text-xs font-mono text-muted">
          Inclus dans le pack complet
        </span>
        <button
          type="button"
          onClick={onEnroll}
          className="inline-flex items-center gap-2 rounded-lg bg-accent hover:bg-accent-strong px-4 py-2.5 text-xs font-semibold text-white transition-all active:scale-[0.98] font-mono border border-accent-soft/30"
        >
          <span>{ctaLabel}</span>
          <IconArrowRight size={14} />
        </button>
      </div>
    </article>
  );
}
