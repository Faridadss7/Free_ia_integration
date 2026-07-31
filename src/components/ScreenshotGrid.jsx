import { PROOF_CARDS } from "../translations/translations";
import SectionHeading from "./SectionHeading";

/**
 * ScreenshotGrid — Bento asymétrique de 5 preuves visuelles.
 *
 * Chaque carte affiche une capture (`/assets/captureN.png`) avec un fondu
 * sombre, une bordure ultra-fine qui s'illumine au survol, et une légende
 * bilingue animée : la version française glisse vers le haut au survol pour
 * révéler la version anglaise de façon fluide.
 *
 * L'effet bilingue est volontairement INDÉPENDANT du toggle de langue global :
 * les deux langues sont visibles (FR au repos, EN au survol). Les légendes
 * proviennent de {@link PROOF_CARDS} (source unique et partagée).
 *
 * L'en-tête de section, lui, suit la langue active via `t`.
 *
 * @param {object} props
 * @param {(key: string) => any} props.t  Fonction de traduction (chemin pointé).
 * @returns {JSX.Element}
 */
export default function ScreenshotGrid({ t }) {
  const eyebrow = t("proof.eyebrow");
  const title = t("proof.title");

  return (
    <section
      id="proof"
      aria-labelledby="proof-title"
      className="relative scroll-mt-24 px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        {/* --- En-tête de section (entrée en cascade) --- */}
        <SectionHeading id="proof-title" eyebrow={eyebrow} title={title} />

        {/*
          Grille Bento asymétrique (12 colonnes sur desktop) :
            ┌───────────────┬───────┐
            │   Carte 1     │ C2    │   ← carte 1 large (7) + carte 2 (5)
            ├───────┬───────┴───────┤
            │  C3   │   Carte 4     │   ← carte 3 (5) + carte 4 large (7)
            ├───────┴───────────────┤
            │        Carte 5        │   ← carte 5 pleine largeur
            └───────────────────────┘
        */}
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-12">
          <ProofCard card={PROOF_CARDS[0]} index={0} className="md:col-span-7" />
          <ProofCard card={PROOF_CARDS[1]} index={1} className="md:col-span-5" />
          <ProofCard card={PROOF_CARDS[2]} index={2} className="md:col-span-5" />
          <ProofCard card={PROOF_CARDS[3]} index={3} className="md:col-span-7" />
          <ProofCard card={PROOF_CARDS[4]} index={4} className="md:col-span-12" />
        </div>
      </div>
    </section>
  );
}

/**
 * ProofCard — Carte individuelle de la grille de preuves.
 *
 * @param {object} props
 * @param {{ src: string, alt: {fr: string, en: string},
 *           title: {fr: string, en: string},
 *           description: {fr: string, en: string} }} props.card
 * @param {number} props.index      Index (0-based) — pour le chargement lazy.
 * @param {string} [props.className] Classes de placement dans la grille.
 * @returns {JSX.Element}
 */
function ProofCard({ card, index, className = "" }) {
  /** Positionne le projecteur de la carte sous le curseur (variables CSS). */
  const handleMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    card.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <article
      onPointerMove={handleMove}
      className={`spotlight-host group relative overflow-hidden rounded-2xl border border-border bg-surface shadow-elevation-md transition-[transform,border-color,box-shadow] duration-transition ease-signature hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-accent-sm ${className}`}
    >
      {/* Projecteur turquoise qui suit le curseur (au-dessus de l'image) */}
      <span aria-hidden="true" className="spotlight z-10" />

      {/* --- Image (avec fondu sombre en superposition) --- */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={card.src}
          alt={card.title.fr}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          onError={handleImageError}
          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        {/* Dégradé sombre de bas en haut pour ancrer la légende */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent"
        />
      </div>

      {/* --- Légende bilingue animée --- */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        {/* Titre : FR glisse vers le haut, EN prend sa place */}
        <CaptionSwap
          fr={card.title.fr}
          en={card.title.en}
          className="text-base font-semibold text-slate-50 sm:text-lg"
        />
        {/* Description : même mécanique, texte secondaire */}
        <CaptionSwap
          fr={card.description.fr}
          en={card.description.en}
          className="mt-1.5 text-sm leading-relaxed text-slate-300"
        />
      </div>
    </article>
  );
}

/**
 * CaptionSwap — Conteneur à hauteur fixe (overflow caché) empilant deux
 * versions linguistiques. Au survol de la carte parente (`group`), la pile
 * glisse de -100% : le FR sort par le haut, l'EN entre par le bas.
 *
 * Chaque ligne occupe exactement 50% de la hauteur du conteneur, ce qui rend
 * le glissement pixel-perfect quel que soit le nombre de lignes de texte.
 *
 * @param {object} props
 * @param {string} props.fr           Texte français (visible au repos).
 * @param {string} props.en           Texte anglais (révélé au survol).
 * @param {string} [props.className]  Classes typographiques communes.
 * @returns {JSX.Element}
 */
function CaptionSwap({ fr, en, className = "" }) {
  return (
    <div className="relative overflow-hidden">
      {/*
        La pile fait 200% de haut (2 lignes empilées) et translate de -50%
        d'elle-même au survol. `motion-reduce` désactive le glissement.
      */}
      <div className="flex flex-col transition-transform duration-500 ease-signature group-hover:-translate-y-1/2 motion-reduce:transition-none">
        <span className={`block ${className}`} lang="fr">
          {fr}
        </span>
        <span className={`block ${className}`} lang="en" aria-hidden="true">
          {en}
        </span>
      </div>
    </div>
  );
}

/**
 * Gestion gracieuse d'une capture manquante : on masque l'image cassée et on
 * laisse apparaître un fond dégradé discret (défini en style inline) au lieu
 * d'une icône « image brisée » disgracieuse.
 *
 * @param {import('react').SyntheticEvent<HTMLImageElement>} event
 */
function handleImageError(event) {
  const img = event.currentTarget;
  img.style.visibility = "hidden";
  const parent = img.parentElement;
  if (parent) {
    parent.style.background =
      "radial-gradient(120% 120% at 50% 0%, rgba(56,189,248,0.10), transparent 60%), #0B1220";
  }
}
