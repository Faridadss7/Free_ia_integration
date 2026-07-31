import { useState } from "react";
import { IconCheck } from "./icons";

/**
 * DemoSection — Fenêtre de terminal MacOS réaliste encadrant la vidéo de démo,
 * suivie de trois badges de confiance.
 *
 * Design :
 *  - Chrome de fenêtre façon macOS : trois pastilles (rouge/jaune/vert) et un
 *    titre d'onglet discret.
 *  - Corps ultra-sombre, bordure ultra-fine cohérente avec le design system.
 *  - Vidéo hébergée sur Cloudinary (transformations `f_auto,q_auto`) avec
 *    poster `/assets/capture1.png`. Si la vidéo est indisponible, un placeholder
 *    dégradé s'affiche (pas de contrôle cassé).
 *
 * Tous les textes proviennent de `translations.js` via `t` et suivent donc la
 * langue globale (FR/EN) et le thème (.dark / .light) sans logique dédiée.
 *
 * @param {object} props
 * @param {(key: string) => any} props.t  Fonction de traduction (chemin pointé).
 * @returns {JSX.Element}
 */
export default function DemoSection({ t }) {
  const eyebrow = t("demo.eyebrow");
  const title = t("demo.title");
  const subtitle = t("demo.subtitle");
  const terminalTitle = t("demo.terminalTitle");
  /** @type {Array<{id: string, label: string}>} */
  const badges = t("demo.badges");

  // Bascule vers le placeholder si la source vidéo est introuvable.
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section
      id="demo"
      aria-labelledby="demo-title"
      className="relative scroll-mt-24 px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        {/* --- En-tête de section --- */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
          <h2
            id="demo-title"
            className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {subtitle}
          </p>
        </div>

        {/* --- Fenêtre terminal MacOS --- */}
        <div className="mx-auto mt-14 overflow-hidden rounded-2xl border border-white/5 bg-[#05070e] shadow-elevation-xl">
          {/* Barre de titre */}
          <div className="flex items-center gap-4 border-b border-white/5 bg-white/[0.02] px-4 py-3">
            {/* Pastilles de contrôle */}
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            {/* Titre d'onglet */}
            <span className="mx-auto select-none font-mono text-xs text-slate-500">
              {terminalTitle}
            </span>
          </div>

          {/* Corps : vidéo ou placeholder */}
          <div className="relative aspect-[16/10] w-full bg-[#05070e]">
            {videoFailed ? (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-accent/10 via-transparent to-accent/[0.04]">
                <span className="font-mono text-sm text-slate-500">
                  {terminalTitle}
                </span>
                <span className="font-mono text-xs text-slate-600">
                  demo_baz2vr.mp4
                </span>
              </div>
            ) : (
              <video
                className="h-full w-full object-contain"
                src="https://res.cloudinary.com/e8pqoeq7/video/upload/f_auto,q_auto/demo_baz2vr.mp4"
                poster="/assets/capture1.png"
                controls
                playsInline
                preload="metadata"
                onError={() => setVideoFailed(true)}
              >
                {/* Repli pour les navigateurs sans support de la balise vidéo. */}
                {t("demo.title")}
              </video>
            )}
          </div>
        </div>

        {/* --- Badges de confiance --- */}
        <ul className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {badges.map((badge) => (
            <li
              key={badge.id}
              className="flex items-center gap-2 text-sm text-muted"
            >
              <IconCheck
                size={16}
                className="text-accent"
              />
              <span>{badge.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
