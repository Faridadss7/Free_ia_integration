import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import BorderBeam from "./BorderBeam";
import { getWhatsAppUrl } from "../config/contact";
import {
  IconLogoClaude,
  IconLogoCursor,
  IconLogoDeepSeek,
  IconLogoQwen,
  IconLogoVSCode,
  IconLogoTokensApi,
} from "./icons";

const MODELS = [
  { id: "deepseek", name: "DeepSeek V4", speed: "168 t/s", latency: "14ms", cost: "0.00 €", badge: "Raisonnement & Code", icon: IconLogoDeepSeek },
  { id: "claude", name: "Claude Opus 5", speed: "Instantané", latency: "20ms", cost: "0.00 €", badge: "Thinking VibeCoding", icon: IconLogoClaude },
  { id: "gpt", name: "GPT-5.6 Omni", speed: "Stream", latency: "18ms", cost: "0.00 €", badge: "Multi-Modal", icon: IconLogoTokensApi },
  { id: "glm", name: "GLM-5.3 Turbo", speed: "142 t/s", latency: "12ms", cost: "0.00 €", badge: "Flux Direct", icon: IconLogoQwen },
];

const IDES = [
  { id: "cursor", label: "Cursor", icon: IconLogoCursor },
  { id: "vscode", label: "VS Code", icon: IconLogoVSCode },
  { id: "terminal", label: "Claude CLI", icon: IconLogoClaude },
];

/**
 * InteractiveBento — Bento Grid nouvelle génération au design Dev / Tech Corporate avec Motion.
 */
export default function InteractiveBento({ t }) {
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [activeIde, setActiveIde] = useState("cursor");

  return (
    <section id="values" className="relative scroll-mt-24 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="values-title"
          eyebrow="CAPACITÉS & EXPÉRIENCE"
          title="Une architecture IA locale conçue pour les pros"
          subtitle="Explorez les modules et fonctionnalités interactives configurés sur votre machine."
        />

        {/* Grille Bento Asymétrique */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* CARTE 1 (7 cols) : Sélecteur de modèle & Radar de latence interactif */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="mesh-card group relative overflow-hidden rounded-xl border border-border bg-surface p-7 md:col-span-7 flex flex-col justify-between"
          >
            <BorderBeam size={280} duration={10} colorFrom="#d97706" colorTo="#b45309" />

            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded border border-border bg-surface-raised px-2.5 py-0.5 text-xs font-mono font-bold text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  MOTEUR MULTI-MODÈLES
                </span>
                <span className="text-[11px] font-mono text-muted">0 Quota Restreint</span>
              </div>

              <h3 className="mt-4 font-display text-xl font-bold tracking-tightest text-ink">
                Basculez de modèle local en 1 clic
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-muted leading-relaxed">
                Testez en direct la vitesse d'exécution et les temps de réponse de nos configurations :
              </p>

              {/* Boutons de sélection de modèles avec transition morphique */}
              <div className="mt-5 flex flex-wrap gap-2 relative">
                {MODELS.map((model) => {
                  const ModelIcon = model.icon;
                  return (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => setSelectedModel(model)}
                      className={`relative z-10 flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-mono font-semibold transition-colors ${
                        selectedModel.id === model.id
                          ? "text-white font-bold"
                          : "text-muted hover:text-ink"
                      }`}
                    >
                      {selectedModel.id === model.id && (
                        <motion.div
                          layoutId="bento-model-pill"
                          className="absolute inset-0 z-[-1] rounded-lg bg-accent border border-accent-soft/30"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        />
                      )}
                      <ModelIcon size={14} />
                      <span>{model.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dashboard temps réel du modèle sélectionné */}
            <div className="mt-6 rounded-lg border border-border bg-surface-raised p-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-muted flex items-center gap-2">
                  <span>Modèle actif :</span>
                  <strong className="text-accent flex items-center gap-1.5">
                    {selectedModel.name}
                  </strong>
                </span>
                <span className="rounded border border-border bg-surface px-2 py-0.5 text-accent text-[10px] font-bold">
                  {selectedModel.badge}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedModel.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="mt-3 grid grid-cols-3 gap-3 text-center"
                >
                  <div className="rounded bg-surface p-2 border border-border">
                    <span className="block text-[10px] text-muted">VITESSE</span>
                    <span className="font-bold text-accent sm:text-sm">{selectedModel.speed}</span>
                  </div>
                  <div className="rounded bg-surface p-2 border border-border">
                    <span className="block text-[10px] text-muted">LATENCE</span>
                    <span className="font-bold text-ink sm:text-sm">{selectedModel.latency}</span>
                  </div>
                  <div className="rounded bg-surface p-2 border border-border">
                    <span className="block text-[10px] text-muted">COÛT API</span>
                    <span className="font-bold text-accent sm:text-sm">{selectedModel.cost}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* CARTE 2 (5 cols) : Confidentialité 100% Locale */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="mesh-card relative overflow-hidden rounded-xl border border-border bg-surface p-7 md:col-span-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-raised text-accent border border-border">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <h3 className="mt-5 font-display text-xl font-bold tracking-tightest text-ink">
                Confidentialité & Données Privées
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                Vos clés, votre code source et vos données confidentielles ne quittent jamais votre machine. Zéro tracking ni télémétrie distante.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-lg bg-surface-raised border border-border p-3 text-xs text-ink font-mono">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span>Chiffrement local end-to-end</span>
            </div>
          </motion.div>

          {/* CARTE 3 (5 cols) : Connecteur Multi-IDE en direct */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="mesh-card relative overflow-hidden rounded-xl border border-border bg-surface p-7 md:col-span-5 flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                // CONNECTIVITÉ
              </span>
              <h3 className="mt-3 font-display text-xl font-bold tracking-tightest text-ink">
                Synchronisation Multi-IDE
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                Connectez tous vos environnements de dev simultanément au même cluster local.
              </p>

              {/* Boutons interactifs IDE avec morphing fluide */}
              <div className="mt-5 flex flex-wrap gap-2 relative">
                {IDES.map((ide) => {
                  const IdeIcon = ide.icon;
                  return (
                    <button
                      key={ide.id}
                      type="button"
                      onClick={() => setActiveIde(ide.id)}
                      className={`relative z-10 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono font-semibold transition-colors ${
                        activeIde === ide.id
                          ? "text-white font-bold"
                          : "text-muted hover:text-ink"
                      }`}
                    >
                      {activeIde === ide.id && (
                        <motion.div
                          layoutId="bento-ide-pill"
                          className="absolute inset-0 z-[-1] rounded-lg bg-accent border border-accent-soft/30"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        />
                      )}
                      <IdeIcon size={14} />
                      <span>{ide.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-border bg-surface-raised p-3 text-xs font-mono text-ink">
              <p className="text-accent font-bold">✔ Connecté à {activeIde.toUpperCase()}</p>
              <p className="text-[11px] text-muted mt-0.5">Proxy local : http://127.0.0.1:11434</p>
            </div>
          </motion.div>

          {/* CARTE 4 (7 cols) : Installation & Déploiement Assisté Réel */}
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="mesh-card group relative overflow-hidden rounded-xl border border-border bg-surface p-7 md:col-span-7 flex flex-col justify-between"
          >
            <BorderBeam size={240} duration={12} colorFrom="#d97706" colorTo="#b45309" />

            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                  // ASSISTANCE & SETUP PRIVÉ
                </span>
                <span className="rounded border border-border bg-surface-raised px-2.5 py-0.5 text-[10px] font-mono font-bold text-ink">
                  Délai moyen : 15–30 min
                </span>
              </div>

              <h3 className="mt-3 font-display text-xl font-bold tracking-tightest text-ink">
                Accompagnement & Intégration en Direct
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                Farid ADISSO configure et optimise personnellement votre stack (Claude Code, Cursor, VS Code, modèles locaux) en direct via Google Meet ou AnyDesk.
              </p>
            </div>

            {/* Canal de support et confirmation réelle */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-surface-raised p-3 font-mono text-xs text-ink">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-muted">Canal d'assistance :</span>
                <strong className="text-ink">WhatsApp & Google Meet</strong>
              </div>
              <a
                href={getWhatsAppUrl("Bonjour Farid, je souhaite réserver mon intégration IA & Masterclass.")}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-md bg-accent hover:bg-accent-strong px-3.5 py-1.5 text-xs font-mono font-bold text-white transition-all border border-accent-soft/30 active:scale-95"
              >
                <span>Contacter Farid</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
