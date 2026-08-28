import { useEffect, useRef, useState } from "react";

/**
 * IntroScene — Scène d'ouverture façon terminal, jouée une seule fois par
 * session avant la landing page.
 *
 * Séquence (≈ 4 s au total) :
 *   1. « IT Network Community » s'écrit lettre par lettre (~70 ms/car).
 *   2. Pause courte (~450 ms).
 *   3. « Prêt pour découvrir » apparaît en fondu (~700 ms).
 *   4. Pause de lecture (~600 ms).
 *   5. Fondu de la scène vers la page (~800 ms), puis démontage.
 *
 * Sobriété & accessibilité :
 *   - Bouton « Passer » discret (coin bas droit), visible dès la 1re seconde.
 *   - `prefers-reduced-motion` : la scène est court-circuitée (aucune frappe,
 *     démontage immédiat) — le visiteur arrive directement sur la page.
 *   - Ne s'affiche qu'une fois par session (`sessionStorage`), pour ne pas
 *     ralentir la navigation interne.
 *   - `role="dialog"` + `aria-label`, verrouille le défilement pendant le jeu.
 *
 * Tout est piloté par des `transform`/`opacity` (60 FPS), easing signature.
 *
 * @param {object} props
 * @param {(key: string) => string} props.t  Fonction de traduction.
 * @param {() => void} props.onDone           Appelé à la fin (ou au skip).
 * @returns {JSX.Element | null}
 */
export default function IntroScene({ t, onDone }) {
  const brand = t("intro.brand");

  // Réduction d'animation : on saute intégralement la scène.
  const reduceMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [typed, setTyped] = useState("");
  const [showTagline, setShowTagline] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // Empêche un double-appel de `onDone` (skip + fin naturelle).
  const doneRef = useRef(false);
  // Conserve tous les timers pour un nettoyage intégral au démontage.
  const timers = useRef([]);

  /** Termine la scène (fondu puis `onDone`), une seule fois. */
  const finish = useRef(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLeaving(true);
    const id = window.setTimeout(onDone, 820); // durée du fondu de sortie
    timers.current.push(id);
  }).current;

  // Verrouille le défilement de l'arrière-plan pendant la scène.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Orchestration de la séquence.
  useEffect(() => {
    if (reduceMotion) {
      onDone();
      return undefined;
    }

    const push = (fn, delay) => {
      const id = window.setTimeout(fn, delay);
      timers.current.push(id);
      return id;
    };

    // 1. Frappe lettre par lettre (~70 ms/caractère).
    let charIndex = 0;
    const typeTimer = window.setInterval(() => {
      charIndex += 1;
      setTyped(brand.slice(0, charIndex));
      if (charIndex >= brand.length) {
        window.clearInterval(typeTimer);
      }
    }, 70);
    timers.current.push(typeTimer);

    const typingDuration = brand.length * 70;

    // 3. Tagline en fondu, après une courte pause (~450 ms).
    push(() => setShowTagline(true), typingDuration + 450);

    // 5. Fondu de sortie, après la lecture de la tagline.
    push(finish, typingDuration + 450 + 700 + 600);

    return () => {
      window.clearInterval(typeTimer);
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };
  }, [brand, reduceMotion, onDone, finish]);

  // En mode réduit, rien n'est rendu (la page s'affiche directement).
  if (reduceMotion) return null;

  return (
    <div
      role="dialog"
      aria-label={brand}
      className={[
        "fixed inset-0 z-[100] flex items-center justify-center bg-bg px-6",
        "transition-opacity duration-[820ms] ease-signature",
        leaving ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
    >
      {/* Fenêtre terminal minimaliste */}
      <div className="w-full max-w-xl">
        <div className="overflow-hidden rounded-xl border border-border bg-surface/60 shadow-elevation-lg backdrop-blur-sm">
          {/* Barre de titre */}
          <div className="flex items-center gap-2 border-b border-border px-4 py-3" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          {/* Corps */}
          <div className="px-6 py-8 font-mono sm:px-8 sm:py-10">
            <p className="text-lg font-semibold tracking-tightest text-ink sm:text-2xl font-display">
              <span className="mr-1 text-accent">$</span>
              {typed}
              {/* Curseur clignotant tant que la scène joue (blink net, façon Unix) */}
              <span className="ml-0.5 inline-block h-5 w-2 translate-y-0.5 animate-blink bg-accent align-middle sm:h-6" />
            </p>
            {/* Tagline en fondu + légère translation */}
            <p
              className={[
                "mt-4 text-sm text-muted transition-all duration-[700ms] ease-signature sm:text-base",
                showTagline ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
              ].join(" ")}
            >
              {t("intro.tagline")}
            </p>
          </div>
        </div>
      </div>

      {/* Bouton « Passer » discret */}
      <button
        type="button"
        onClick={finish}
        aria-label={t("intro.skipAria")}
        className="absolute bottom-6 right-6 rounded-lg px-3 py-1.5 text-xs font-medium text-muted transition-colors duration-interaction ease-signature hover:text-ink"
      >
        {t("intro.skip")}
      </button>
    </div>
  );
}
