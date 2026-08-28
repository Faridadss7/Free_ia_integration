import { memo } from "react";
import {
  IconLogoClaude,
  IconLogoCursor,
  IconLogoRooCode,
  IconLogoDeepSeek,
  IconLogoVSCode,
  IconLogoOllama,
  IconLogoQwen,
  IconLogoOpenWebUI,
  IconLogoTokensApi,
} from "./icons";

const TECH_ITEMS = [
  { name: "Claude Opus 5", category: "Thinking CLI", highlight: "Illimité", icon: IconLogoClaude, color: "text-[#d97706]" },
  { name: "DeepSeek V4", category: "Raisonnement Pur", highlight: "168 t/s / 0€", icon: IconLogoDeepSeek, color: "text-[#0ea5e9]" },
  { name: "GPT-5.6", category: "Omni Multimodal", highlight: "Flux Direct", icon: IconLogoTokensApi, color: "text-[#10b981]" },
  { name: "GLM-5.3", category: "Turbo Stream", highlight: "Instant", icon: IconLogoQwen, color: "text-[#f59e0b]" },
  { name: "Cursor AI", category: "IDE Next-Gen", highlight: "Pro Mode", icon: IconLogoCursor, color: "text-ink" },
  { name: "Roo Code", category: "Agent VS Code", highlight: "Autonome", icon: IconLogoRooCode, color: "text-[#3b82f6]" },
  { name: "Qwen 2.5 Coder", category: "Spécialisé Code", highlight: "Top Bench", icon: IconLogoQwen, color: "text-[#f59e0b]" },
  { name: "Ollama", category: "Moteur Local", highlight: "100% Hors-ligne", icon: IconLogoOllama, color: "text-ink" },
  { name: "Open-WebUI", category: "Interface Web", highlight: "Multi-Modèles", icon: IconLogoOpenWebUI, color: "text-accent" },
];

/**
 * TechMarquee — Défilement infini et sobre de la stack technique avec logos officiels.
 */
function TechMarquee({ t }) {
  const title = t("techMarquee.title") || "Environnements & Modèles configurés avec zéro friction";

  return (
    <section aria-label="Technologies & Outils IA" className="relative overflow-hidden py-10 border-y border-border bg-surface/40">
      <div className="mx-auto mb-5 max-w-5xl px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          // {title}
        </p>
      </div>

      {/* Bandeau de défilement */}
      <div className="ticker-mask relative flex overflow-hidden py-2">
        <div className="flex shrink-0 animate-marquee items-center gap-3">
          {TECH_ITEMS.map((item, idx) => (
            <TechBadge key={`t1-${idx}`} item={item} />
          ))}
        </div>
        <div className="flex shrink-0 animate-marquee items-center gap-3" aria-hidden="true">
          {TECH_ITEMS.map((item, idx) => (
            <TechBadge key={`t2-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechBadge({ item }) {
  const IconComponent = item.icon;
  return (
    <div className="group relative flex items-center gap-2.5 rounded-lg border border-border bg-surface px-3.5 py-2 text-xs transition-all duration-150 hover:border-accent/40 hover:bg-surface-raised">
      <div className={`shrink-0 ${item.color}`}>
        <IconComponent size={16} />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-mono font-bold tracking-tight text-ink">
          {item.name}
        </span>
        <span className="text-[11px] text-muted font-sans">{item.category}</span>
      </div>
      <span className="ml-1 rounded border border-border bg-surface-raised px-1.5 py-0.5 font-mono text-[10px] text-accent font-bold">
        {item.highlight}
      </span>
    </div>
  );
}

export default memo(TechMarquee);
