import { useEffect, useRef, useState } from "react";

/** Numéro WhatsApp Business (identique au Footer et au PaymentWizard). */
const WHATSAPP_NUMBER = "2290141822125";

/**
 * FaqTerminal — FAQ immersive présentée comme une console Unix réaliste.
 *
 * Séquence :
 *   1. Au premier passage dans le viewport, une barre de chargement ASCII se
 *      remplit : `Loading... [██████████████] 100%`.
 *   2. Une fois chargée, la console liste les commandes exécutables (en vert),
 *      façon `1. $ ./requirements.sh`.
 *   3. Au clic sur une commande, la console simule la frappe de la commande,
 *      saute une ligne, puis affiche la réponse ligne par ligne en effet
 *      machine à écrire, curseur clignotant à la fin.
 *
 * Accessibilité & sobriété :
 *   - `prefers-reduced-motion` : les animations sont court-circuitées (chargement
 *     instantané, réponse affichée d'un bloc) — le contenu reste identique.
 *   - La zone de sortie est un `aria-live="polite"` pour les lecteurs d'écran.
 *
 * Tous les textes proviennent de `translations.js` via `t` (langue globale).
 * Changer de langue réinitialise proprement la console (via la `key` côté App
 * n'est pas nécessaire : un effet resynchronise la liste des commandes).
 *
 * @param {object} props
 * @param {(key: string) => any} props.t  Fonction de traduction (chemin pointé).
 * @returns {JSX.Element}
 */
export default function FaqTerminal({ t }) {
  const eyebrow = t("faq.eyebrow");
  const title = t("faq.title");
  const shellPrompt = t("faq.shellPrompt");
  const loadingLabel = t("faq.loadingLabel");
  const hint = t("faq.hint");
  const skipLabel = t("faq.skip");
  /** @type {Array<{id:string, command:string, label:string, answer:string[]}>} */
  const commands = t("faq.commands");

  // Respecte la préférence système de réduction d'animation.
  const reduceMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // --- États de la console ---
  const [started, setStarted] = useState(false); // chargement enclenché ?
  const [progress, setProgress] = useState(0); // 0 → 100
  const [activeId, setActiveId] = useState(null); // commande sélectionnée
  const [typed, setTyped] = useState(""); // frappe de la commande en cours
  const [answerLines, setAnswerLines] = useState([]); // lignes de réponse révélées

  const sectionRef = useRef(null);
  const outputRef = useRef(null);
  // Court-circuite l'animation de frappe en cours (rempli par l'effet de frappe).
  const revealAllRef = useRef(null);

  const loaded = progress >= 100;
  const activeCommand = commands.find((c) => c.id === activeId) ?? null;
  // Animation en cours ? (frappe non terminée, ou réponse pas entièrement révélée)
  const isTyping =
    !!activeCommand &&
    !reduceMotion &&
    (typed.length < activeCommand.command.length ||
      answerLines.length < activeCommand.answer.length);

  /**
   * Saute l'animation de la commande active : affiche commande + réponse d'un
   * coup. Sans effet si rien n'est en cours de frappe.
   */
  const skipTyping = () => {
    if (revealAllRef.current) revealAllRef.current();
  };

  /* --- 1. Démarrage au scroll (IntersectionObserver) --------------------- */
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    // Sans IntersectionObserver (très vieux navigateurs) : démarrage immédiat.
    if (typeof IntersectionObserver !== "function") {
      setStarted(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* --- 2. Remplissage de la barre de chargement -------------------------- */
  useEffect(() => {
    if (!started) return undefined;

    if (reduceMotion) {
      setProgress(100);
      return undefined;
    }

    const interval = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          window.clearInterval(interval);
          return 100;
        }
        return Math.min(p + 4, 100);
      });
    }, 45);
    return () => window.clearInterval(interval);
  }, [started, reduceMotion]);

  /* --- 3. Frappe de la commande puis réponse ligne par ligne ------------- */
  useEffect(() => {
    if (!activeCommand) return undefined;

    const fullCommand = activeCommand.command;

    // Mode réduit : tout s'affiche immédiatement.
    if (reduceMotion) {
      setTyped(fullCommand);
      setAnswerLines(activeCommand.answer);
      return undefined;
    }

    // Réinitialise puis relance la séquence pour la commande choisie.
    setTyped("");
    setAnswerLines([]);

    let charIndex = 0;
    let lineIndex = 0;
    let answerTimer = 0;

    // (a) Frappe caractère par caractère du nom de la commande (~20 ms/car).
    const typeTimer = window.setInterval(() => {
      charIndex += 1;
      setTyped(fullCommand.slice(0, charIndex));

      if (charIndex >= fullCommand.length) {
        window.clearInterval(typeTimer);

        // (b) Révélation des lignes de réponse, l'une après l'autre.
        answerTimer = window.setInterval(() => {
          lineIndex += 1;
          setAnswerLines(activeCommand.answer.slice(0, lineIndex));
          if (lineIndex >= activeCommand.answer.length) {
            window.clearInterval(answerTimer);
          }
        }, 120);
      }
    }, 20);

    // Permet de court-circuiter l'animation : on affiche tout d'un coup.
    revealAllRef.current = () => {
      window.clearInterval(typeTimer);
      window.clearInterval(answerTimer);
      setTyped(fullCommand);
      setAnswerLines(activeCommand.answer);
    };

    return () => {
      window.clearInterval(typeTimer);
      window.clearInterval(answerTimer);
      revealAllRef.current = null;
    };
  }, [activeCommand, reduceMotion]);

  /* --- Défilement automatique vers le bas de la sortie ------------------- */
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [typed, answerLines]);

  // Barre de progression ASCII (14 segments).
  const totalBars = 14;
  const filledBars = Math.round((progress / 100) * totalBars);
  const bar = "█".repeat(filledBars) + " ".repeat(totalBars - filledBars);

  return (
    <section
      id="faq"
      ref={sectionRef}
      aria-labelledby="faq-title"
      className="relative scroll-mt-24 px-6 py-24 sm:py-28"
    >
      <div className="mx-auto max-w-3xl">
        {/* --- En-tête de section --- */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
          <h2
            id="faq-title"
            className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            {title}
          </h2>
        </div>

        {/* --- Fenêtre console Unix --- */}
        <div className="mx-auto mt-14 overflow-hidden rounded-2xl border border-border bg-slate-950 shadow-elevation-xl">
          {/* Barre de titre */}
          <div className="flex items-center gap-4 border-b border-slate-800 bg-slate-900/90 px-4 py-3">
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="mx-auto select-none font-mono text-xs text-slate-400">
              {shellPrompt}
            </span>
          </div>

          {/* Corps de la console */}
          <div
            ref={outputRef}
            className="max-h-[26rem] overflow-y-auto p-5 font-mono text-sm leading-relaxed sm:p-6 text-slate-200"
            aria-live="polite"
          >
            {/* Ligne de chargement */}
            <p className="text-slate-400">
              <span className="text-slate-300">{loadingLabel}...</span>{" "}
              <span className="text-accent">[{bar}]</span>{" "}
              <span className="text-slate-300">{progress}%</span>
            </p>

            {loaded ? (
              <>
                {/* Invite d'aide */}
                <p className="text-slate-400"># {hint}</p>

                {/* Liste des commandes exécutables */}
                <ul className="mt-3 space-y-1.5">
                  {commands.map((cmd, index) => {
                    const selected = cmd.id === activeId;
                    return (
                      <li key={cmd.id}>
                        <button
                          type="button"
                          onClick={() => setActiveId(cmd.id)}
                          aria-pressed={selected}
                          className="group flex w-full items-baseline gap-2 rounded px-2 py-1 text-left transition-colors hover:bg-slate-800/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                          <span className="text-slate-500">{index + 1}.</span>
                          <span className="text-slate-400">$</span>
                          <span
                            className={[
                              "transition-colors font-bold font-mono",
                              selected
                                ? "text-accent-soft"
                                : "text-accent group-hover:text-accent-soft",
                            ].join(" ")}
                          >
                            {cmd.command}
                          </span>
                          <span className="ml-auto pl-3 text-xs text-slate-400 font-sans">
                            {cmd.label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/* Sortie de la commande active */}
                {activeCommand ? (
                  <div className="mt-4 border-t border-slate-800 pt-4">
                    {/* Ligne de frappe simulée */}
                    <p className="flex flex-wrap items-baseline text-slate-200">
                      <span className="text-slate-400">
                        {shellPrompt.replace(/:~\$$/, "")}
                      </span>
                      <span className="text-slate-400">:~$ </span>
                      <span className="text-accent font-bold">{typed}</span>
                      {isTyping ? (
                        <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent" />
                      ) : null}
                      {/* Skip discret */}
                      {isTyping ? (
                        <button
                          type="button"
                          onClick={skipTyping}
                          className="ml-auto pl-3 text-xs text-slate-400 transition-colors duration-interaction ease-signature hover:text-accent-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                          {skipLabel}
                        </button>
                      ) : null}
                    </p>

                    {/* Réponse, ligne par ligne */}
                    <div className="mt-2 space-y-1">
                      {answerLines.map((line, i) => (
                        <p key={i} className="text-slate-300">
                          {/* Ligne vide = respiration : on préserve la hauteur */}
                          {line === "" ? " " : line}
                        </p>
                      ))}
                      {/* Curseur clignotant final */}
                      {typed.length >= activeCommand.command.length ? (
                        <span
                          aria-hidden="true"
                          className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-accent"
                        />
                      ) : null}
                    </div>

                    {/* CTA optionnel (ex. secours WhatsApp pour comptes GitHub récents).
                        N'apparaît qu'une fois la réponse entièrement révélée. */}
                    {activeCommand.cta && !isTyping ? (
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          activeCommand.cta.message
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-[#052e16] no-underline shadow-elevation transition-transform duration-interaction ease-signature hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                      >
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          fill="currentColor"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
                        </svg>
                        {activeCommand.cta.label}
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
