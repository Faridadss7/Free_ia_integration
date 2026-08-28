import { memo } from "react";
import SectionHeading from "./SectionHeading";
import { IconStar, IconBadgeCheck } from "./icons";

const TESTIMONIALS_DATA = [
  {
    name: "Alexandre D.",
    role: "Lead Dev Fullstack · Paris",
    avatar: "AD",
    rating: 5,
    quote: "J'étais sceptique sur le fait de faire tourner Claude Code sans payer l'abonnement Anthropic. Farid a configuré ma machine en 25 minutes chrono. Résultat : 0€ de facture ce mois-ci et une fluidité hallucinante.",
  },
  {
    name: "Marc-Aurèle K.",
    role: "CTO & Co-fondateur · Abidjan",
    avatar: "MK",
    rating: 5,
    quote: "Pour notre équipe de 6 développeurs, nous dépensions près de 300$/mois en abonnements Cursor et ChatGPT. Avec l'architecture mise en place par Farid, nous avons rentabilisé la prestation dès la 2ème semaine.",
  },
  {
    name: "Stéphane B.",
    role: "Ingénieur Backend · Bruxelles",
    avatar: "SB",
    rating: 5,
    quote: "Le support WhatsApp est ultra-réactif. Farid a pris la main, a résolu mes conflits Python et m'a livré un terminal prêt à l'emploi avec DeepSeek R1 et Roo Code. Un investissement indispensable.",
  },
  {
    name: "Fatou N.",
    role: "Développeuse IA Freelance · Dakar",
    avatar: "FN",
    rating: 5,
    quote: "Pouvoir coder toute la journée sans jamais recevoir le fameux message 'You reached your usage limit' a complètement changé mon rythme de travail. Merci infiniment Farid !",
  },
  {
    name: "Guillaume L.",
    role: "Architecte Logiciel · Montréal",
    avatar: "GL",
    rating: 5,
    quote: "Qualité de service irréprochable. La configuration locale est sécurisée, rapide et ne fait aucune concession sur la puissance des modèles. Bravo !",
  },
];

/**
 * InfiniteTestimonials — Défilement horizontal continu d'avis clients style Aceternity UI.
 */
function InfiniteTestimonials({ t }) {
  return (
    <section id="testimonials" className="relative scroll-mt-24 py-24 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <SectionHeading
          id="testimonials-title"
          eyebrow="RETOURS CLIENTS & AVIS VÉRIFIÉS"
          title="Ce que disent les développeurs après l'intégration"
          subtitle="Rejoignez plus de 250 indépendants, agences et CTOs accompagnés par Farid ADISSO."
        />
      </div>

      {/* Ticker de cartes infini avec masque dégradé */}
      <div className="ticker-mask relative mt-12 flex overflow-hidden py-4">
        <div className="flex shrink-0 animate-marquee items-stretch gap-6 hover:[animation-play-state:paused]">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <TestimonialCard key={`test1-${idx}`} item={item} />
          ))}
        </div>
        <div className="flex shrink-0 animate-marquee items-stretch gap-6 hover:[animation-play-state:paused]" aria-hidden="true">
          {TESTIMONIALS_DATA.map((item, idx) => (
            <TestimonialCard key={`test2-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ item }) {
  return (
    <div className="mesh-card group relative flex w-[320px] sm:w-[380px] shrink-0 flex-col justify-between rounded-xl border border-border bg-surface p-6 sm:p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40">
      <div>
        {/* Étoiles & Badge Vérifié */}
        <div className="flex items-center justify-between">
          <div className="flex text-accent gap-0.5">
            {Array.from({ length: item.rating }).map((_, i) => (
              <IconStar key={i} size={14} filled />
            ))}
          </div>
          <span className="inline-flex items-center gap-1 rounded border border-border bg-surface-raised px-2 py-0.5 text-[10px] font-mono font-bold text-accent">
            <IconBadgeCheck size={12} />
            Vérifié
          </span>
        </div>

        {/* Citation */}
        <blockquote className="mt-4 text-xs sm:text-sm leading-relaxed text-muted">
          « {item.quote} »
        </blockquote>
      </div>

      {/* Auteur */}
      <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-surface-raised font-mono text-xs font-bold text-ink shadow-sm">
          {item.avatar}
        </span>
        <div className="truncate text-left">
          <p className="truncate text-xs font-bold text-ink sm:text-sm font-display">{item.name}</p>
          <p className="truncate text-[11px] text-muted font-mono">{item.role}</p>
        </div>
      </div>
    </div>
  );
}

export default memo(InfiniteTestimonials);
