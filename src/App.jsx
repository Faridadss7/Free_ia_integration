import { useCallback } from "react";
import GlowBackground from "./components/GlowBackground";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TechMarquee from "./components/TechMarquee";
import InteractiveBento from "./components/InteractiveBento";
import RoiCalculator from "./components/RoiCalculator";
import DemoSection from "./components/DemoSection";
import BeforeAfterSection from "./components/BeforeAfterSection";
import ScreenshotGrid from "./components/ScreenshotGrid";
import TrainingCurriculum from "./components/TrainingCurriculum";
import Pricing from "./components/Pricing";
import GuideSection from "./components/GuideSection";
import WhySection from "./components/WhySection";
import InfiniteTestimonials from "./components/InfiniteTestimonials";
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
 */
export default function App() {
  const { lang, setLang, toggleLang, t } = useTranslation();
  const { isDark, toggleTheme } = useDarkMode();

  const lenisRef = useSmoothScroll();

  /**
   * Défilement doux vers une section par identifiant.
   * Fourni aux CTA (Hero) et à la navigation (Header).
   */
  const scrollToSection = useCallback(
    (id) => {
      const el = document.getElementById(id);
      if (!el) return;
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
        {/* Le Hero détient ses propres entrées échelonnées et son cockpit interactif */}
        <Hero t={t} onNavigate={scrollToSection} />

        {/* Défilement infini de la stack technologique IA */}
        <TechMarquee t={t} />

        {/* Bento Grid nouvelle génération & Capacités interactives */}
        <InteractiveBento t={t} />

        {/* Simulateur interactif de rentabilité / économies d'abonnements */}
        <RoiCalculator t={t} onNavigate={scrollToSection} />

        {/* Fenêtre de démonstration vidéo */}
        <Reveal direction="scale">
          <DemoSection t={t} />
        </Reveal>

        {/* Comparateur interactif Sans Farid vs Avec Farid */}
        <BeforeAfterSection t={t} />

        {/* Bento Grid des captures & preuves concrètes */}
        <ScreenshotGrid t={t} />

        {/* Masterclass & Programme de Formation Payante IA & VibeCoding */}
        <TrainingCurriculum t={t} lang={lang} onNavigate={scrollToSection} />

        {/* Preuve sociale : Pourquoi Farid, Avis Clients & Stats */}
        <WhySection t={t} />
        <InfiniteTestimonials t={t} />
        <StatsBand t={t} />

        {/* Tarifs 100% interactifs avec BorderBeam */}
        <Pricing t={t} lang={lang} />

        {/* Guide gratuit & packs */}
        <GuideSection t={t} lang={lang} />

        {/* Bandeau de conversion final haute énergie */}
        <CtaBanner t={t} lang={lang} onNavigate={scrollToSection} />

        {/* FAQ interactive en console Unix */}
        <Reveal direction="up">
          <FaqTerminal t={t} />
        </Reveal>
      </main>

      <Footer t={t} onNavigate={scrollToSection} />
    </div>
  );
}
