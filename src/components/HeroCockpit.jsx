import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BorderBeam from "./BorderBeam";
import useTilt from "../hooks/useTilt";
import {
  IconCheck,
  IconPlay,
  IconLogoClaude,
  IconLogoCursor,
  IconLogoTokensApi,
} from "./icons";

const TABS = [
  { id: "claude", label: "Claude Code CLI", badge: "Illimité", icon: IconLogoClaude },
  { id: "cursor", label: "Cursor AI Rules", badge: "Pro", icon: IconLogoCursor },
  { id: "benchmarks", label: "Benchmarks LLM", badge: "Local", icon: IconLogoTokensApi },
];

const STREAM_LINES = [
  "> Analyzing project AST & dependencies...",
  "> Routing request via Local Free Proxy (0.00€)...",
  "> [DeepSeek R1] Generating architecture refactor...",
  "> 12 files patched with zero token billing. (128 tokens/s)",
];

/**
 * HeroCockpit — Interface interactive 3D du Hero présentant l'environnement IA en action.
 */
export default function HeroCockpit({ t }) {
  const [activeTab, setActiveTab] = useState("claude");
  const [isRunning, setIsRunning] = useState(false);
  const [simulatedLines, setSimulatedLines] = useState(STREAM_LINES);
  const [liveTokens, setLiveTokens] = useState(128);

  const tilt = useTilt({ maxTilt: 6 });

  // Fluctuation vivante des métriques de tokens en direct
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTokens(120 + Math.floor(Math.random() * 20));
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const handleRunDemo = () => {
    if (isRunning) return;
    setIsRunning(true);
    setSimulatedLines([]);

    STREAM_LINES.forEach((line, index) => {
      setTimeout(() => {
        setSimulatedLines((prev) => [...prev, line]);
        if (index === STREAM_LINES.length - 1) {
          setIsRunning(false);
        }
      }, (index + 1) * 350);
    });
  };

  return (
    <div
      className="relative mx-auto w-full max-w-2xl lg:max-w-none perspective-1000"
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
    >
      {/* Cadre principal style fenêtre terminal avec 3D tilt */}
      <motion.div
        style={tilt.style}
        className="glass-cockpit relative overflow-hidden rounded-xl border border-border bg-surface transition-colors"
      >
        <BorderBeam size={220} duration={10} colorFrom="#d97706" colorTo="#b45309" />

        {/* Barre de titre MacOS & Onglets */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface-raised px-4 py-2.5 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 hidden font-mono text-xs text-muted sm:inline-block">
              farid@dev-node:~
            </span>
          </div>

          {/* Onglets interactifs avec morphing fluide */}
          <div className="flex items-center gap-1 rounded-md bg-bg p-0.5 border border-border relative">
            {TABS.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-10 flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-mono font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-accent font-bold"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="cockpit-active-tab-indicator"
                      className="absolute inset-0 z-[-1] rounded bg-surface-raised border border-border"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <TabIcon size={13} />
                  <span>{tab.label}</span>
                  <span className="hidden rounded bg-surface px-1 py-0.2 text-[9px] text-muted sm:inline border border-border">
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-bold">0.00€ / API</span>
          </div>
        </div>

        {/* Corps de la console / Interface de test */}
        <div className="p-5 font-mono text-xs leading-relaxed text-ink sm:p-6 sm:text-sm min-h-[230px]">
          <AnimatePresence mode="wait">
            {activeTab === "claude" && (
              <motion.div
                key="tab-claude"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between text-muted">
                  <span className="text-accent font-bold">⚡ CLAUDE CODE CLI · SESSION LOCALE ACTIVE</span>
                  <button
                    type="button"
                    onClick={handleRunDemo}
                    disabled={isRunning}
                    className="flex items-center gap-1.5 rounded bg-surface-raised px-2.5 py-1 text-xs font-mono font-bold text-accent transition-all hover:bg-surface border border-border active:scale-95"
                  >
                    <IconPlay size={11} className={isRunning ? "animate-spin" : ""} />
                    <span>{isRunning ? "Génération en cours..." : "Rejouer le Stream"}</span>
                  </button>
                </div>

                <div className="rounded-lg border border-border bg-black/60 p-4 text-slate-100">
                  <p className="text-slate-400">
                    <span className="text-accent font-bold">$</span> claude --model auto --stream --bypass-limits
                  </p>
                  <div className="mt-2.5 space-y-1.5 text-slate-200">
                    {simulatedLines.map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={i === simulatedLines.length - 1 ? "text-accent font-semibold" : "text-slate-300"}
                      >
                        {line}
                      </motion.p>
                    ))}
                    {isRunning && (
                      <span className="inline-block h-4 w-2 translate-y-0.5 bg-accent animate-pulse" />
                    )}
                  </div>
                </div>

                {!isRunning && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-lg border border-border bg-surface-raised p-3 text-ink"
                  >
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <IconCheck size={14} className="text-accent" />
                      <span>Configuration vérifiée : 0€ débité, latence &lt; 20ms</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === "cursor" && (
              <motion.div
                key="tab-cursor"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="space-y-3"
              >
                <div className="text-muted">
                  <span className="text-accent font-bold">⚡ .cursorrules & MODÈLES PERSONNALISÉS</span>
                </div>
                <div className="rounded-lg border border-border bg-black/60 p-4 text-xs text-slate-200">
                  <p className="text-slate-400">{"// Configuration optimisée pour Cursor & Roo Code"}</p>
                  <p className="mt-1 text-slate-300">
                    <span className="text-accent font-semibold">provider:</span> <span className="text-slate-200">"local-zero-cost"</span>
                    <br />
                    <span className="text-accent font-semibold">max_tokens:</span> <span className="text-slate-200">128000</span>
                    <br />
                    <span className="text-accent font-semibold">reasoning_effort:</span> <span className="text-slate-200">"deep-thought-r1"</span>
                    <br />
                    <span className="text-accent font-semibold">auto_accept_terminal:</span> <span className="text-accent">true</span>
                  </p>
                </div>
                <p className="text-[12px] text-muted">
                  Intégration directe sans clé API payante : écriture de code instantanée.
                </p>
              </motion.div>
            )}

            {activeTab === "benchmarks" && (
              <motion.div
                key="tab-benchmarks"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="space-y-3"
              >
                <div className="text-muted">
                  <span className="text-accent font-bold">⚡ PERFORMANCES & BENCHMARKS LOCAUX</span>
                </div>
                <div className="space-y-2">
                  <BenchmarkRow label="DeepSeek R1 / Qwen 2.5 Coder" speed="64 tokens/sec" cost="0.00 €" bar="w-[96%] bg-accent" />
                  <BenchmarkRow label="Claude Code Local Tunnel" speed="Instantané" cost="0.00 €" bar="w-[92%] bg-accent-strong" />
                  <BenchmarkRow label="Abonnements Cloud Traditionnels" speed="Quotas bridés" cost="60$ - 200$/m" bar="w-[35%] bg-rose-500" isWarning />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pied du cockpit : Métriques en temps réel avec indicateur vivant */}
        <div className="grid grid-cols-3 divide-x divide-border border-t border-border bg-surface-raised px-4 py-3 text-center font-mono text-[11px] text-muted">
          <div>
            <span className="block text-[10px] text-muted uppercase">DÉBIT TOKEN</span>
            <span className="font-bold text-accent">{liveTokens} t/s</span>
          </div>
          <div>
            <span className="block text-[10px] text-muted uppercase">MÉMOIRE RAM</span>
            <span className="font-bold text-ink">4.2 GB</span>
          </div>
          <div>
            <span className="block text-[10px] text-muted uppercase">COÛT SOUHAITÉ</span>
            <span className="font-bold text-accent">0.00 €</span>
          </div>
        </div>
      </motion.div>

      {/* Badges flottants avec légère animation de flottement */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-3 -left-3 hidden rounded-lg border border-border bg-surface px-3 py-1.5 sm:flex sm:items-center sm:gap-2 z-20"
      >
        <span className="grid h-5 w-5 place-items-center rounded bg-surface-raised text-accent font-bold text-xs border border-border">
          ✓
        </span>
        <div className="text-left text-xs">
          <p className="font-bold text-ink text-[11px]">Garantie Fonctionnelle</p>
          <p className="text-[10px] text-muted">Assistance WhatsApp 24/7</p>
        </div>
      </motion.div>
    </div>
  );
}

function BenchmarkRow({ label, speed, cost, bar, isWarning = false }) {
  return (
    <div className="rounded-md bg-surface-raised p-2.5 border border-border">
      <div className="flex justify-between text-[11px]">
        <span className="text-ink font-medium">{label}</span>
        <span className={isWarning ? "text-rose-500 font-bold" : "text-accent font-bold"}>
          {speed} · {cost}
        </span>
      </div>
      <div className="mt-1.5 h-1.5 w-full rounded-full bg-border">
        <div className={`h-full rounded-full ${bar}`} />
      </div>
    </div>
  );
}
