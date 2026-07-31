import { useCallback, useEffect, useState } from "react";
import GlowBackground from "./components/GlowBackground";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import IntroScene from "./components/IntroScene";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ValueGrid from "./components/ValueGrid";
import DemoSection from "./components/DemoSection";
import ScreenshotGrid from "./components/ScreenshotGrid";
import Pricing from "./components/Pricing";
import GuideSection from "./components/GuideSection";
import WhySection from "./components/WhySection";
import Testimonials from "./components/Testimonials";
import StatsBand from "./components/StatsBand";
import CtaBanner from "./components/CtaBanner";
import FaqTerminal from "./components/FaqTerminal";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import useDarkMode from "./hooks/useDarkMode";
import useTranslation from "./hooks/useTranslation";
import useSmoothScroll from "./hooks/useSmoothScroll";
import "./App.css";

/**
 * Point d'entrée applicatif.
 *
 * Détient les deux états globaux du site et les distribue aux composants :
 *  - `lang`  : langue active (FR/EN) via {@link useTranslation}.
 *  - `theme` : thème sombre/clair via {@link useDarkMode}.
 *
 * Source unique de vérité : les hooks sont appelés ici et uniquement ici.
 * Les composants enfants reçoivent `t`, `lang`, `isDark`… en props — ils ne
 * rappellent jamais les hooks eux-mêmes.
 *
 * @returns {JSX.Element}
 */
export default function App() {
  const { lang, setLang, toggleLang, t } = useTranslation();
  const { isDark, toggleTheme } = useDarkMode();

  /**
   * Scroll cinématique global (Lenis). L'instance est exposée via une ref pour
   * que la navigation par ancre délègue au même moteur (inertie cohérente).
   * Désactivé sous `prefers-reduced-motion` (ref à `null`, scroll natif).
   */
  const lenisRef = useSmoothScroll();

  /**
   * Scène d'intro : jouée une seule fois par session. On lit `sessionStorage`
   * à l'initialisation (lazy initializer) pour éviter un flash au montage.
   * `sessionStorage` peut lever (mode privé strict) → on protège la lecture.
   */
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return sessionStorage.getItem("intro-seen") !== "1";
    } catch {
      return true;
    }
  });

  const dismissIntro = useCallback(() => {
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {
      /* stockage indisponible : la scène rejouera au prochain chargement, sans casse */
    }
    setShowIntro(false);
  }, []);

  /**
   * L'intro est réservée au mode sombre. Si le visiteur démarre en clair (ou
   * bascule en clair avant de l'avoir vue), on la neutralise pour éviter qu'elle
   * ne surgisse au milieu de la navigation lors d'un passage ultérieur en sombre.
   */
  useEffect(() => {
    if (showIntro && !isDark) {
      dismissIntro();
    }
  }, [showIntro, isDark, dismissIntro]);

  /**
   * Défilement doux vers une section par identifiant.
   * Fourni aux CTA (Hero) et à la navigation (Header).
   *
   * @param {string} id Identifiant de la section cible (sans le `#`).
   */
  const scrollToSection = useCallback(
    (id) => {
      const el = document.getElementById(id);
      if (!el) return;
      // Si Lenis est actif, on délègue pour conserver l'inertie du scroll libre.
      // Sinon (reduced-motion), on retombe sur le scroll natif du navigateur.
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -8 });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [lenisRef]
  );

  return (
    <div className="app-shell">
      {/* Scène d'intro terminal — au-dessus de tout, une fois par session.
          Réservée au mode sombre : en mode clair, le fond blanc écrase la scène
          (contraste cassé), on saute donc directement à la page. */}
      {showIntro && isDark ? <IntroScene t={t} onDone={dismissIntro} /> : null}

      <GlowBackground />
      <ScrollProgress />
      {/* Curseur premium : s'auto-désactive sur tactile / mouvement réduit. */}
      <CustomCursor />

      <Header
        t={t}
        lang={lang}
        setLang={setLang}
        toggleLang={toggleLang}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onNavigate={scrollToSection}
      />

      <main id="main" className="app-main">
        {/* Le Hero détient ses propres entrées échelonnées (respiration). */}
        <Hero t={t} onNavigate={scrollToSection} />
        {/* Sections suivantes : apparition douce au scroll (opacity + translateY
            léger), désactivée sous prefers-reduced-motion. Reveal n'ajoute qu'un
            wrapper de présentation : structure et contenu restent intacts. */}
        {/* Chaque section ci-dessous gère désormais ses propres entrées
            (en-tête en cascade via SectionHeading + grilles en stagger).
            On évite un Reveal externe qui ferait double emploi. */}
        <ValueGrid t={t} />
        <Reveal direction="scale">
          <DemoSection t={t} />
        </Reveal>
        <ScreenshotGrid t={t} />
        {/* Preuve sociale AVANT le prix : on construit la confiance (Pourquoi →
            Témoignages → Stats) puis on présente les tarifs, puis le CTA final.
            Ordre pensé pour la conversion — le prix n'arrive pas « à froid ». */}
        <WhySection t={t} />
        <Testimonials t={t} />
        <StatsBand t={t} />
        <Pricing t={t} lang={lang} />
        <GuideSection t={t} lang={lang} />
        <CtaBanner t={t} lang={lang} onNavigate={scrollToSection} />
        <Reveal direction="up">
          <FaqTerminal t={t} />
        </Reveal>
      </main>

      <Footer t={t} onNavigate={scrollToSection} />
    </div>
  );
}
