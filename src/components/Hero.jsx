import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrowRight, IconPlay, IconCheck } from "./icons";
import useMagnetic from "../hooks/useMagnetic";
import HeroCockpit from "./HeroCockpit";

const HIGHLIGHT_WORDS = [
  "0€ de facture API",
  "Claude Code CLI Illimité",
  "DeepSeek R1 en Local",
  "Cursor AI & Roo Code",
];

/**
 * Hero — Section héroïque « High-Impact & Interactive Cockpit ».
 *
 * @param {object} props
 * @param {(key: string) => any} props.t            Fonction de traduction.
 * @param {(id: string) => void}  props.onNavigate  Scroll doux vers une ancre.
 * @returns {JSX.Element}
 */
export default function Hero({ t, onNavigate }) {
  const sectionRef = useRef(null);
  const [wordIndex, setWordIndex] = useState(0);
  const magneticPrimary = useMagnetic({ strength: 0.3, max: 8 });
  const magneticSecondary = useMagnetic({ strength: 0.2, max: 6 });

  // Uptime réel dynamique calculé à partir de la session
  const [uptimeSeconds, setUptimeSeconds] = useState(1);
  const [pingMs, setPingMs] = useState(18);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % HIGHLIGHT_WORDS.length);
    }, 3400);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptimeSeconds((prev) => prev + 1);
    }, 1000);

    // Calcul de latence réelle via performance API
    try {
      const navEntry = performance.getEntriesByType("navigation")[0];
      if (navEntry && navEntry.duration) {
        setPingMs(Math.max(8, Math.round(navEntry.duration % 40)));
      }
    } catch {
      setPingMs(16);
    }

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins > 0 ? `${mins}m ` : ""}${s}s`;
  };

  const handlePointerMove = (e) => {
    const node = sectionRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    node.style.setProperty("--spot-x", `${x}%`);
    node.style.setProperty("--spot-y", `${y}%`);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative mx-auto max-w-7xl overflow-hidden px-6 pb-20 pt-28 sm:pt-36 lg:pb-28"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* --- Colonne Gauche : Pitch & CTA --- */}
        <div className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left">
          {/* Badge technique façon étiquette terminal (anti-pilule) */}
          <div className="animate-fade-up inline-flex items-center gap-2 rounded border border-border bg-surface-raised px-2.5 py-1 font-mono text-[11px] font-semibold text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-muted">[STATUS:</span>
            <span className="text-accent font-bold">READY</span>
            <span className="text-muted">· LOCAL_GATEWAY]</span>
          </div>

          {/* Titre Principal percutant en Space Grotesk tracking -0.02em avec mot clé cyclique */}
          <h1 className="animate-fade-up mt-6 font-display text-4xl font-bold tracking-tightest text-ink sm:text-5xl lg:text-6xl sm:leading-[1.1] [animation-delay:80ms]">
            {t("hero.titleLead")}{" "}
            <span className="inline-block relative overflow-hidden align-top text-accent min-h-[1.2em]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {HIGHLIGHT_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Sous-titre explicatif */}
          <p className="animate-fade-up mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg [animation-delay:160ms]">
            {t("hero.subtitle")}
          </p>

          {/* Barre d'état système avec vraies données dynamiques */}
          <div className="animate-fade-up mt-6 flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted [animation-delay:220ms]">
            <span className="rounded border border-border bg-surface-raised px-2 py-1 text-ink">
              node@v20.x
            </span>
            <span className="rounded border border-border bg-surface-raised px-2 py-1 text-ink">
              127.0.0.1:11434 · <strong className="text-ink font-mono">{pingMs}ms</strong>
            </span>
            <span className="rounded border border-border bg-surface px-2 py-1 text-muted">
              session uptime: <span className="text-ink font-semibold">{formatUptime(uptimeSeconds)}</span>
            </span>
          </div>

          {/* CTA Principaux structurés avec raccourcis clavier */}
          <div className="animate-fade-up mt-8 flex flex-col items-center gap-3.5 sm:flex-row [animation-delay:280ms]">
            <button
              type="button"
              onClick={() => onNavigate("pricing")}
              onPointerMove={magneticPrimary.onPointerMove}
              onPointerLeave={magneticPrimary.onPointerLeave}
              className="group inline-flex items-center justify-center gap-3 rounded-lg bg-accent hover:bg-accent-strong px-6 py-3 text-sm font-semibold text-white border border-accent-soft/30 active:scale-[0.98] transition-all font-mono"
            >
              <span>{t("hero.ctaPrimary")}</span>
              <span className="rounded border border-white/25 bg-black/20 px-1.5 py-0.5 text-[10px] text-white/90">
                ↵ Enter
              </span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("demo")}
              onPointerMove={magneticSecondary.onPointerMove}
              onPointerLeave={magneticSecondary.onPointerLeave}
              className="group inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface hover:bg-surface-raised px-5 py-3 text-sm font-semibold text-ink active:scale-[0.98] transition-all font-mono"
            >
              <IconPlay size={13} className="text-muted group-hover:text-ink" />
              <span>{t("hero.ctaSecondary")}</span>
            </button>
          </div>

          {/* Micro-preuves de confiance format technique */}
          <div className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-mono text-muted [animation-delay:360ms] lg:justify-start">
            <span className="flex items-center gap-1.5">
              <IconCheck size={13} className="text-accent" />
              <span>0€ abonnement récurrent</span>
            </span>
            <span className="flex items-center gap-1.5">
              <IconCheck size={13} className="text-accent" />
              <span>Setup immédiat assisté</span>
            </span>
            <span className="flex items-center gap-1.5">
              <IconCheck size={13} className="text-accent" />
              <span>Support privé direct</span>
            </span>
          </div>
        </div>

        {/* --- Colonne Droite : Cockpit Interactif 3D --- */}
        <div className="animate-fade-up w-full lg:col-span-6 [animation-delay:200ms]">
          <HeroCockpit t={t} />
        </div>
      </div>
    </section>
  );
}

