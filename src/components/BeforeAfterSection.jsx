import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import BorderBeam from "./BorderBeam";
import { IconCheck, IconClose } from "./icons";

/**
 * BeforeAfterSection — Comparateur interactif "Sans Farid vs Avec Farid".
 *
 * @param {object} props
 * @param {(key: string) => any} props.t Fonction de traduction
 * @returns {JSX.Element}
 */
export default function BeforeAfterSection({ t }) {
  const [activeTab, setActiveTab] = useState("after");

  const BEFORE_ITEMS = [
    { title: "Factures mensuelles récurrentes", desc: "Entre 40$ et 120$/mois cumulés (ChatGPT Plus, Claude, Cursor, API tokens)." },
    { title: "Blocage de quotas en pleine session", desc: "Limites atteintes à 15h : votre travail s'arrête net jusqu'au lendemain." },
    { title: "Configuration complexe & fragile", desc: "Erreurs de permissions, conflits Python/Node, clés API expirées ou révoquées." },
    { title: "Confidentialité compromise", desc: "Votre code source et vos données privées transitent constamment sur des serveurs distants." },
  ];

  const AFTER_ITEMS = [
    { title: "Zéro euro d'abonnement mensuel", desc: "Paiement unique pour l'intégration : environnement opérationnel et gratuit à vie." },
    { title: "Claude Code & Cursor illimités", desc: "Travaillez sans interruption 24h/24 sans aucun message de restriction de tokens." },
    { title: "Configuration clé en main en 1 heure", desc: "Farid configure votre machine à distance ou vous guide pas-à-pas avec support WhatsApp." },
    { title: "Confidentialité & contrôle total", desc: "Exécution locale et routages chiffrés : vos données restent sur votre propre PC." },
  ];

  return (
    <section id="comparison" className="relative scroll-mt-24 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="comparison-title"
          eyebrow={t("beforeAfter.eyebrow") || "LA DIFFÉRENCE CONCRÈTE"}
          title={t("beforeAfter.title") || "Pourquoi continuer à payer des abonnements mensuels ?"}
          subtitle={
            t("beforeAfter.subtitle") ||
            "Comparez l'expérience classique avec notre solution d'intégration locale haute performance."
          }
        />

        {/* Toggle mobile / sélecteur avec morphing */}
        <div className="mt-8 flex justify-center sm:hidden">
          <div className="inline-flex rounded-lg bg-surface p-1 border border-border relative">
            <button
              type="button"
              onClick={() => setActiveTab("before")}
              className={`relative z-10 rounded-md px-4 py-2 text-xs font-mono font-bold transition-colors ${
                activeTab === "before" ? "text-rose-400" : "text-muted"
              }`}
            >
              {activeTab === "before" && (
                <motion.div
                  layoutId="comparison-tab-pill"
                  className="absolute inset-0 z-[-1] rounded-md bg-rose-500/20 border border-rose-500/30"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              Sans Farid
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("after")}
              className={`relative z-10 rounded-md px-4 py-2 text-xs font-mono font-bold transition-colors ${
                activeTab === "after" ? "text-accent" : "text-muted"
              }`}
            >
              {activeTab === "after" && (
                <motion.div
                  layoutId="comparison-tab-pill"
                  className="absolute inset-0 z-[-1] rounded-md bg-accent/20 border border-accent/30"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              Avec Farid
            </button>
          </div>
        </div>

        {/* Grille comparative Desktop / Tablette */}
        <Reveal direction="up" className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Colonne SANS FARID */}
          <div
            className={`rounded-xl border border-border bg-surface p-6 sm:p-8 transition-all ${
              activeTab === "after" ? "hidden sm:block" : "block"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="grid h-7 w-7 place-items-center rounded bg-rose-500/10 text-rose-500 font-bold text-xs border border-rose-500/20">
                ✕
              </span>
              <div>
                <h3 className="font-bold text-ink text-base font-display tracking-tightest">Sans Farid</h3>
                <p className="text-xs text-muted font-mono">Abonnements SaaS récurrents</p>
              </div>
            </div>

            <ul className="mt-8 space-y-5">
              {BEFORE_ITEMS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 shrink-0 text-rose-500">
                    <IconClose size={15} />
                  </span>
                  <div>
                    <strong className="block text-ink font-semibold">{item.title}</strong>
                    <span className="text-xs text-muted mt-0.5 block leading-relaxed">
                      {item.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne AVEC FARID (Mise en avant avec BorderBeam) */}
          <div
            className={`relative rounded-xl border border-accent/40 bg-surface p-6 sm:p-8 transition-all ${
              activeTab === "before" ? "hidden sm:block" : "block"
            }`}
          >
            <BorderBeam size={260} duration={9} colorFrom="#d97706" colorTo="#b45309" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded bg-surface-raised text-accent font-bold text-xs border border-border">
                  ✓
                </span>
                <div>
                  <h3 className="font-bold text-ink text-base font-display tracking-tightest">Avec Farid ADISSO</h3>
                  <p className="text-xs text-accent font-mono font-bold">Architecture IA Locale & 0€</p>
                </div>
              </div>

              <span className="rounded border border-border bg-surface-raised px-2.5 py-0.5 font-mono text-[10px] font-bold text-accent">
                [● RECOMMANDÉ]
              </span>
            </div>

            <ul className="mt-8 space-y-5">
              {AFTER_ITEMS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 shrink-0 text-accent">
                    <IconCheck size={15} />
                  </span>
                  <div>
                    <strong className="block text-ink font-semibold">{item.title}</strong>
                    <span className="text-xs text-muted mt-0.5 block leading-relaxed">
                      {item.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
