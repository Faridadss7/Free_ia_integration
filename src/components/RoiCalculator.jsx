import { useState } from "react";
import BorderBeam from "./BorderBeam";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import {
  IconCheck,
  IconArrowRight,
  IconLogoOpenAI,
  IconLogoClaude,
  IconLogoCursor,
  IconLogoCopilot,
  IconLogoTokensApi,
} from "./icons";

const SUBSCRIPTIONS = [
  {
    id: "chatgpt",
    label: "ChatGPT Plus",
    costMonthlyUsd: 20,
    icon: IconLogoOpenAI,
    brandClass: "bg-[#10a37f]/10 text-[#10a37f] border-[#10a37f]/25",
  },
  {
    id: "claude",
    label: "Claude Pro (Anthropic)",
    costMonthlyUsd: 20,
    icon: IconLogoClaude,
    brandClass: "bg-[#d97706]/10 text-[#d97706] border-[#d97706]/25",
  },
  {
    id: "cursor",
    label: "Cursor Pro IDE",
    costMonthlyUsd: 20,
    icon: IconLogoCursor,
    brandClass: "bg-surface-raised text-ink border-border",
  },
  {
    id: "copilot",
    label: "GitHub Copilot",
    costMonthlyUsd: 10,
    icon: IconLogoCopilot,
    brandClass: "bg-[#8957e5]/10 text-[#8957e5] border-[#8957e5]/25",
  },
  {
    id: "api",
    label: "Consommation Tokens API",
    costMonthlyUsd: 30,
    icon: IconLogoTokensApi,
    brandClass: "bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/25",
  },
];

/**
 * RoiCalculator — Simulateur interactif de calcul d'économies & retour sur investissement.
 *
 * @param {object} props
 * @param {(key: string) => any} props.t Fonction de traduction
 * @param {(id: string) => void} props.onNavigate Navigation vers une section
 * @returns {JSX.Element}
 */
export default function RoiCalculator({ t, onNavigate }) {
  const [selected, setSelected] = useState(["chatgpt", "claude", "cursor"]);
  const [teamSize, setTeamSize] = useState(1);

  const toggleSub = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const monthlyCostPerUser = SUBSCRIPTIONS.filter((s) => selected.includes(s.id)).reduce(
    (acc, curr) => acc + curr.costMonthlyUsd,
    0
  );

  const annualTotalUsd = monthlyCostPerUser * 12 * teamSize;
  const annualTotalFcfa = annualTotalUsd * 600; // Taux approximatif USD -> FCFA

  return (
    <section id="calculator" className="relative scroll-mt-24 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="calculator-title"
          eyebrow={t("roi.eyebrow") || "CALCULATEUR D'ÉCONOMIES IA"}
          title={t("roi.title") || "Combien perdez-vous en abonnements chaque mois ?"}
          subtitle={
            t("roi.subtitle") ||
            "Cochez vos outils actuels pour découvrir vos économies nettes avec notre intégration locale illimitée."
          }
        />

        <Reveal direction="scale" className="mt-12">
          <div className="mesh-card relative overflow-hidden rounded-xl border border-border bg-surface p-6 sm:p-10">
            <BorderBeam size={300} duration={12} colorFrom="#d97706" colorTo="#b45309" />

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
              {/* Colonne gauche : Sélections d'abonnements */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-ink sm:text-lg font-display tracking-tightest">
                    1. Sélectionnez vos abonnements actuels :
                  </h3>
                  <p className="text-xs text-muted mt-1">
                    Chaque abonnement payé au mois est remplacé par l'environnement local de Farid.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {SUBSCRIPTIONS.map((sub) => {
                    const isChecked = selected.includes(sub.id);
                    const IconComponent = sub.icon;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => toggleSub(sub.id)}
                        className={`flex items-center justify-between gap-3 rounded-lg border p-3 text-left transition-all ${
                          isChecked
                            ? "border-accent bg-accent/10"
                            : "border-border bg-surface-raised/60 hover:border-border-strong"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border ${sub.brandClass}`}>
                            <IconComponent size={16} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-ink sm:text-sm">
                              {sub.label}
                            </p>
                            <p className="text-[11px] text-muted font-mono">
                              ${sub.costMonthlyUsd} / mois
                            </p>
                          </div>
                        </div>

                        <div
                          className={`grid h-5 w-5 place-items-center rounded border text-xs transition-colors ${
                            isChecked
                              ? "border-accent bg-accent text-white"
                              : "border-border bg-surface"
                          }`}
                        >
                          {isChecked && <IconCheck size={13} />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Slider pour la taille de l'équipe */}
                <div className="rounded-lg border border-border bg-surface-raised p-4">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                    <span className="text-ink">Nombre de développeurs / postes :</span>
                    <span className="font-mono text-accent font-bold">{teamSize} poste{teamSize > 1 ? "s" : ""}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="mt-3 w-full accent-accent"
                  />
                  <div className="flex justify-between text-[10px] text-muted font-mono mt-1">
                    <span>1 solo</span>
                    <span>5 dev</span>
                    <span>10 équipe</span>
                  </div>
                </div>
              </div>

              {/* Colonne droite : Résultat dynamique & Rentabilité */}
              <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-accent/40 bg-surface-raised p-6 sm:p-8 text-center">
                <div>
                  <span className="inline-block rounded border border-border bg-surface px-3 py-1 font-mono text-xs font-bold text-accent">
                    [● ÉCONOMIE GARANTIE]
                  </span>

                  <p className="mt-4 text-xs uppercase tracking-wider text-muted font-mono">
                    Économie estimée par an :
                  </p>

                  <div className="mt-2">
                    <span className="text-4xl font-extrabold tracking-tightest text-accent sm:text-5xl font-display">
                      ${annualTotalUsd}
                    </span>
                    <span className="block text-sm font-semibold text-ink font-mono mt-1">
                      ≈ {annualTotalFcfa.toLocaleString()} FCFA / an
                    </span>
                  </div>

                  <div className="mt-6 space-y-2.5 border-y border-border py-4 text-xs text-left">
                    <div className="flex items-center gap-2 text-ink font-mono">
                      <span className="text-accent">✔</span>
                      <span><strong>0 € / mois</strong> de frais récurrents</span>
                    </div>
                    <div className="flex items-center gap-2 text-ink font-mono">
                      <span className="text-accent">✔</span>
                      <span>Rentabilisé dès le <strong>1er mois</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-ink font-mono">
                      <span className="text-accent">✔</span>
                      <span>Accès illimité sans plafond de requêtes</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => onNavigate("pricing")}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent hover:bg-accent-strong px-5 py-3 text-sm font-semibold text-white border border-accent-soft/30 active:scale-[0.98] transition-all font-mono"
                  >
                    <span>Arrêter de gaspiller · Voir les offres</span>
                    <IconArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
