/**
 * translations.js
 * -----------------------------------------------------------------------------
 * Dictionnaire de traduction bilingue (FR / EN) — source unique de vérité pour
 * TOUS les textes du site. Aucune dépendance i18n externe : on lit simplement
 * `translations[lang].<section>.<clé>` depuis les composants.
 *
 * Convention :
 *  - Structuré par section (nav, hero, values, demo, pricing, wizard, faq...).
 *  - Les deux langues partagent EXACTEMENT la même forme d'objet (mêmes clés),
 *    ce qui garantit qu'aucune traduction ne manque à l'exécution.
 *  - Les listes (features, questions...) sont des tableaux d'objets stables.
 */

export const LANGUAGES = /** @type {const} */ (["fr", "en"]);

/** @typedef {"fr" | "en"} Lang */

export const translations = {
  /* =========================================================================
     FR — Français
     ====================================================================== */
  fr: {
    meta: {
      brand: "Farid ADISSO",
      brandSuffix: "Tech Integration",
      langLabel: "FR",
    },

    intro: {
      brand: "IT Network Community",
      tagline: "Prêt pour découvrir",
      skip: "Passer",
      skipAria: "Passer l'introduction",
    },

    nav: {
      links: [
        { id: "values", label: "Prestations" },
        { id: "training", label: "Formation" },
        { id: "demo", label: "Démo" },
        { id: "pricing", label: "Tarifs" },
        { id: "testimonials", label: "Avis" },
        { id: "faq", label: "FAQ" },
      ],
      github: "GitHub",
      linkedin: "LinkedIn",
      cta: "Démarrer",
      aria: "Navigation principale",
      toggleThemeDark: "Passer en mode clair",
      toggleThemeLight: "Passer en mode sombre",
      toggleLang: "Switch to English",
      menuOpen: "Ouvrir le menu",
      menuClose: "Fermer le menu",
    },

    hero: {
      trustedBy:
        "Approuvé par des développeurs indépendants • Claude • GPT-5 • Cursor • VS Code • Roo Code",
      titleLead: "Configurez votre environnement IA en",
      titleHighlight: "moins de 30 minutes",
      subtitle:
        "Déployez une architecture IA locale ultra-rapide. Connectez vos IDE préférés, optimisez vos requêtes et boostez votre productivité sans friction.",
      ctaPrimary: "Démarrer la configuration",
      ctaSecondary: "Voir la démonstration",
    },

    values: {
      eyebrow: "Ce que vous obtenez",
      title: "Une intégration complète, clé en main",
      subtitle:
        "Chaque étape est prise en charge pour que vous codiez, pas que vous configuriez.",
      items: [
        {
          id: "install",
          title: "Installation complète",
          description:
            "Déploiement propre et rapide d'outils comme Claude Code directement dans votre terminal.",
        },
        {
          id: "secure",
          title: "Configuration sécurisée",
          description:
            "Paramétrage sécurisé de vos clés de test et des passerelles d'accès.",
        },
        {
          id: "env",
          title: "Variables d'environnement",
          description:
            "Optimisation système globale (Bash, Zsh, Windows Path) pour un accès direct en ligne de commande.",
        },
        {
          id: "ide",
          title: "IDE optimisés",
          description:
            "Liaison parfaite avec Cursor Desktop, VS Code et Roo Code.",
        },
        {
          id: "scripts",
          title: "Scripts d'automatisation",
          description:
            "Des scripts de démarrage rapide en 1 clic (.bat / .sh) fournis pour éviter toute saisie manuelle.",
        },
        {
          id: "support",
          title: "Support privé",
          description:
            "Accès à un groupe d'accompagnement exclusif dirigé par Farid pour débloquer chaque situation.",
        },
      ],
    },

    demo: {
      eyebrow: "Démonstration",
      title: "Une configuration réelle, filmée sans montage",
      subtitle:
        "Regardez l'environnement se déployer et répondre en temps réel.",
      terminalTitle: "gateway-demo — bash",
      badges: [
        { id: "real", label: "Configuration réelle" },
        { id: "untampered", label: "Capture non simulée" },
        { id: "realtime", label: "Exécution en temps réel" },
      ],
    },

    proof: {
      eyebrow: "Preuves visuelles",
      title: "Ce que vous verrez sur votre machine",
      captions: [
        "L'invite Claude Code répondant en quelques millisecondes.",
        "L'interface Cursor intégrant les requêtes locales d'IA.",
        "Les scripts automatisés de Farid s'exécutant sans erreur.",
        "L'extension Roo Code dans VS Code pleinement configurée.",
        "Le panneau de contrôle montrant la stabilité du flux de requêtes.",
      ],
    },

    pricing: {
      eyebrow: "Tarifs",
      title: "Un investissement unique, un gain quotidien",
      subtitle:
        "Choisissez l'accompagnement qui correspond à votre niveau d'autonomie.",
      currency: "FCFA",
      mostChosen: "Le plus choisi",
      basic: {
        name: "Basic",
        price: "1 000",
        tagline: "Idéal pour tester la méthode.",
        cta: "Choisir Basic",
        features: [
          "Guide écrit d'installation standard",
          "Accès au groupe WhatsApp",
        ],
      },
      pro: {
        name: "Pro",
        price: "3 000",
        tagline: "Le choix de référence.",
        cta: "Choisir Pro",
        features: [
          "Configuration complète assistée (Terminal, Cursor, Roo Code)",
          "Pack de scripts d'installation en 1 clic",
          "Configuration des 20 plugins / compétences",
          "Accès prioritaire au groupe d'accompagnement",
        ],
      },
    },

    guide: {
      freeTitle: 'Téléchargez le Guide "Free Claude Code and GPT"',
      freeText:
        "Ce guide est gratuit et conçu pour celles et ceux qui refusent que la barrière de l'accessibilité aux modèles d'intelligence artificielle les limite. Il vous aide à configurer Claude Code en local, en ligne de commande, étape par étape. Merci de le lire attentivement, ainsi que la FAQ plus bas sur cette page.",
      freeCta: "Télécharger le PDF",
      freeFileName: "guide-free-claude-code-and-gpt.pdf",
      packsIntro:
        "À l'ère de l'IA, ne pas saisir ces opportunités est une erreur pour celles et ceux qui ont de grandes ambitions. Quand je parle d'accompagnement, il s'agit de l'installation complète d'outils comme Claude Code, ChatGPT ou GLM dans l'IDE ou l'environnement de votre choix.",
      standard: {
        name: "Pack Standard",
        price: "1 000",
        cta: "Choisir le Pack Standard",
        features: [
          "Installation assistée par moi-même, configuration le jour même après vérification du paiement",
          "Accès au groupe dédié à la configuration",
          "N'inclut pas les plugins / skills",
        ],
      },
      pro: {
        name: "Pack Pro",
        price: "3 000",
        cta: "Choisir le Pack Pro",
        toolsLead:
          "Configuration complète dans l'IDE ou l'agent terminal de votre choix, parmi :",
        ideLabel: "IDE",
        ide: [
          "Claude Code",
          "Claude Desktop / Claude App",
          "Cursor",
          "GitHub Copilot",
          "Cline (VS Code)",
          "Roo Code",
          "Kilo Code",
          "Trae",
        ],
        agentsLabel: "Agents terminal",
        agents: [
          "Claude Code CLI",
          "Qwen Code",
          "OpenCode",
          "OpenClaw",
          "Hermes",
          "Pi",
        ],
        features: [
          "Plus de 20 plugins et skills prêts à l'emploi (exemple : concevoir des designs juste en le demandant à l'IA)",
          "Inclut tout ce qui est dans le pack Standard",
        ],
      },
    },

    training: {
      eyebrow: "PROGRAMME DE FORMATION PAYANTE",
      title: "Masterclass IA & VibeCoding Mastery",
      subtitle:
        "Devenez un ingénieur IA d'élite. Maîtrisez les modèles sans abonnement, réduisez vos tokens de 90%, dominez l'écosystème Google IA, Antigravity et la création multimédia.",
      badge: "Formation Complète Clé en Main",
      stats: [
        { label: "Modules immersifs", value: "6" },
        { label: "Économie de tokens", value: "Jusqu'à -90%" },
        { label: "Outils & Modèles", value: "100% Maîtrisés" },
        { label: "Accès & Mises à jour", value: "À vie" },
      ],
      cta: "Rejoindre la Formation",
      ctaSub: "Accès immédiat + Groupe VIP + Mises à jour incluses",
      price: "5 000",
      priceOld: "15 000",
      currency: "FCFA",
      planName: "Formation Complète IA & VibeCoding",
      modules: [
        {
          id: "m1",
          number: "01",
          title: "Intégration des Modèles IA Sans Abonnement",
          tag: "Architecture & Routing",
          duration: "Module Pratique",
          description:
            "Déployez Claude Code, Cursor, Cline, Roo Code et Trae connectés à AgentRouter, OpenRouter et APIs tierces. Utilisez Claude Opus 5, DeepSeek V4, GPT-5.6 et GLM-5.3 sans payer 20$/mois par outil.",
          highlights: [
            "Configuration illimitée 0€",
            "Multi-modèles (DeepSeek V4, Claude Opus 5, GPT-5.6, GLM-5.3)",
            "Prompt engineering & VibeCoding",
          ],
        },
        {
          id: "m2",
          number: "02",
          title: "Marmouth IA & Systèmes d'Automatisation",
          tag: "Workflows & No-Code",
          duration: "Module Stratégique",
          description:
            "Automatisez vos opérations et concevez des agents IA autonomes connectés à n8n, Make et vos pipelines de code pour créer des services monétisables pour vos clients.",
          skills: [
            "Architecture d'agents autonomes & micro-services",
            "Workflows n8n & Make connectés aux APIs de code",
            "Création de templates d'automatisation rentables",
            "Industrialisation et monitoring des pipelines",
          ],
        },
        {
          id: "m3",
          number: "03",
          title: "L'Art du VibeCoding & Économie Radicale de Tokens (-90%)",
          tag: "Productivité & Token Economy",
          duration: "Module Méthodologique",
          description:
            "Apprenez à coder à la vitesse de la pensée sans gaspiller vos tokens. Structurez vos projets, utilisez le Context Caching, les règles chirurgicales et évitez la réécriture intégrale de fichiers.",
          skills: [
            "Règles d'or du VibeCoding (Architecte vs Exécuteur)",
            "Économie de tokens jusqu'à -90% (Diff chirurgical, micro-fichiers)",
            "Configuration avancée de .cursorrules et AGENTS.md",
            "Prompt engineering modulaire & context caching",
          ],
        },
        {
          id: "m4",
          number: "04",
          title: "Écosystème Google IA Avancé (Studio, Stitch, Flow, IA Plus)",
          tag: "Google Cloud & AI Studio",
          duration: "Module Technique",
          description:
            "Exploitez toute la suite Google : activation Google IA Plus (2M tokens de contexte), Google AI Studio (JSON Schema, Function Calling, Cache), Google Stitch et Google Flow pour le traitement de données.",
          skills: [
            "Activation et rentabilisation de Google IA Plus",
            "Google AI Studio : Clés gratuites, System Instructions, JSON Schema",
            "Function Calling / Tool Use autonome dans vos applications",
            "Google Flow & Cloud Dataflow pour pipelines IA massifs",
          ],
        },
        {
          id: "m5",
          number: "05",
          title: "Maîtrise de Google DeepMind Antigravity",
          tag: "Agentic Engineering",
          duration: "Module Expert",
          description:
            "Dominez l'environnement de développement pair-programming autonome de Google. Exploitez les Skills, serveurs MCP, Subagents de recherche web et le mode Planning pour bâtir des projets complexes.",
          skills: [
            "Planning Mode vs Execution Mode (Architecture & Walkthrough)",
            "Création et intégration de serveurs MCP personnalisés",
            "Subagents autonomes & automation du navigateur",
            "Création de custom skills et règles de pair-programming",
          ],
        },
        {
          id: "m6",
          number: "06",
          title: "Création Audio & Musique Publicitaire avec SUNO",
          tag: "Production Multimédia",
          duration: "Module Créatif",
          description:
            "Concevez des bandes-son professionnelles, génériques tech et pistes audio percutantes pour vos vidéos SaaS, réseaux sociaux et publicités sans compétences musicales préalables.",
          skills: [
            "Prompt engineering musical (styles Cyberpunk, SaaS, Synthwave)",
            "Structure avancée de morceaux ([Intro], [Drop], [Climax], [Outro])",
            "Mixage & intégration avec voix off IA (ElevenLabs / Kokoro)",
            "Production de sound design pour vidéos de lancement",
          ],
        },
      ],
      guarantees: [
        "Accès immédiat à l'ensemble des 6 modules",
        "Scripts prêts à l'emploi et templates de configuration",
        "Accès au groupe privé VIP d'entraide et de support",
        "Mises à jour gratuites de tous les nouveaux modules",
      ],
    },

    why: {
      eyebrow: "Pourquoi moi ?",
      title: "Pourquoi collaborer avec Farid ADISSO ?",
      points: [
        {
          id: "fullstack",
          title: "Data Analyst Associate & Développeur",
          description:
            "Une maîtrise concrète du terminal, des IDE et des chaînes d'outils modernes.",
        },
        {
          id: "ai",
          title: "Intégrateur d'IA spécialisé",
          description:
            "Architectures IA locales performantes, pensées pour la vitesse et la stabilité.",
        },
        {
          id: "secure",
          title: "Configuration ultra-sécurisée",
          description:
            "Paramétrage personnalisé et respectueux de vos clés et de votre système.",
        },
        {
          id: "assist",
          title: "Assistance post-installation",
          description:
            "Un accompagnement direct après la mise en place, pas seulement pendant.",
        },
        {
          id: "reactive",
          title: "Support privé et réactif",
          description:
            "Un canal privé où vos blocages trouvent une réponse rapide.",
        },
      ],
    },

    /* -----------------------------------------------------------------------
       BANDEAU CTA — Conversion finale, adossée à la mission d'accessibilité.
       ----------------------------------------------------------------------- */
    ctaBanner: {
      eyebrow: "L'IA pour tous",
      title: "Faites partie de ce vivier de talents",
      text: "Innover, créer et prouver que l'accès à l'IA est possible pour tous, peu importe le pays ou les moyens. Le numérique paye : donnez-vous les outils pour en vivre.",
      primary: "Démarrer maintenant",
      secondary: "Voir les tarifs",
    },

    /* -----------------------------------------------------------------------
       STATISTIQUES — Chiffres clés (compteurs animés au scroll).
       Chiffres RÉELS fournis par Farid. `value` est le nombre animé ; `prefix`
       et `suffix` encadrent l'affichage ; `sub` = 0 décimale par défaut.
       ----------------------------------------------------------------------- */
    stats: {
      since: "Au service de la communauté IA depuis le 17 juillet 2026",
      items: [
        {
          id: "clients",
          value: 10,
          prefix: "",
          suffix: "+",
          label: "Clients accompagnés",
        },
        {
          id: "setup",
          value: 30,
          prefix: "≈ ",
          suffix: " min",
          label: "Temps moyen de configuration",
        },
        {
          id: "satisfaction",
          value: 100,
          prefix: "",
          suffix: " %",
          label: "Clients satisfaits",
        },
      ],
    },

    /* -----------------------------------------------------------------------
       TÉMOIGNAGES — Preuve sociale.
       ⚠️ CONTENU À REMPLACER : les entrées ci-dessous sont des EXEMPLES de
       structure, PAS de vrais avis. Remplacer `items` par les vrais retours
       clients (mêmes clés). Ne jamais publier ces exemples tels quels comme
       s'ils étaient réels. N'affiche aucune donnée de contact (RGPD).
       ----------------------------------------------------------------------- */
    testimonials: {
      eyebrow: "Ils m'ont fait confiance",
      title: "Ce qu'en disent les développeurs",
      subtitle:
        "Des retours concrets de personnes accompagnées dans la mise en place de leur environnement IA local.",
      verified: "Vérifié",
      prev: "Témoignage précédent",
      next: "Témoignage suivant",
      pick: "Sélection du témoignage",
      items: [
        {
          id: "aissatou",
          quote:
            "Avant Free Integration, je pensais que l'IA était réservée aux personnes qui avaient les moyens de payer plusieurs abonnements. J'ai été accompagnée de A à Z pour configurer Claude Code et tout mon environnement de développement. Aujourd'hui, je peux apprendre, coder et progresser sans que mon budget soit un frein. Ce n'est pas juste une installation technique, c'est une porte qui s'est ouverte sur un monde que je pensais inaccessible.",
          name: "Aïssatou H.",
          role: "Étudiante en Génie Logiciel",
          location: "",
          rating: 5,
        },
        {
          id: "rodrigue",
          quote:
            "Ce qui m'a le plus marqué, c'est l'accompagnement. La configuration de Claude Code a été faite entièrement avec moi, et j'ai appris à déléguer les tâches répétitives à l'IA. Pendant que je suis en rendez-vous avec un client ou que je travaille sur le design, Claude prépare du code, de la documentation et des tests. Aujourd'hui, je livre mes projets plus vite sans avoir recruté une équipe.",
          name: "Rodrigue A.",
          role: "Développeur Freelance",
          location: "",
          rating: 5,
        },
        {
          id: "gildas",
          quote:
            "Je n'avais pas besoin d'une nouvelle IA. J'avais besoin de quelqu'un qui m'aide à transformer toutes ces IA en un véritable outil de travail. Free Integration a configuré mon environnement de façon professionnelle. Désormais, chaque idée que j'ai peut être testée rapidement. Je passe moins de temps à chercher comment configurer les outils et beaucoup plus de temps à construire mon entreprise.",
          name: "Gildas S.",
          role: "Entrepreneur",
          location: "",
          rating: 5,
        },
        {
          id: "grace",
          quote:
            "Le plus beau changement, c'est le temps gagné. Chaque soir, je prépare mes consignes avant de dormir. Pendant la nuit, Claude Code avance sur mon projet. Le matin, je n'ouvre plus mon ordinateur avec une page blanche : j'inspecte le travail réalisé, je corrige, j'améliore et je continue. J'ai enfin l'impression de travailler avec un véritable coéquipier, alors qu'avant je pensais que ce genre de productivité était réservé aux grandes entreprises.",
          name: "Grâce D.",
          role: "Étudiante & Créatrice de projets",
          location: "",
          rating: 5,
        },
      ],
    },

    faq: {
      eyebrow: "FAQ",
      title: "La console des réponses",
      shellPrompt: "guest@shell.farid.tech:~$",
      loadingLabel: "Loading",
      hint: "Cliquez sur une commande pour exécuter la réponse.",
      skip: "Tout afficher",
      commands: [
        {
          id: "requirements",
          command: "./requirements.sh",
          label: "Prérequis",
          answer: [
            "Prérequis : un compte GitHub actif de plus de 7 mois (créé au plus tard le 03/12/2025).",
            "Cette règle soutient les informaticiens investis dans l'open source et évite",
            "la création en pagaille de comptes uniquement pour accéder au service.",
            "",
            "Votre compte GitHub est trop récent ? Pas de souci : il existe une autre",
            "méthode pour profiter quand même de Claude Code et ChatGPT en gratuit.",
            "Écrivez-moi et je vous guide.",
          ],
          cta: {
            label: "Contacte-moi sur WhatsApp",
            message:
              "Bonjour Farid, mon compte GitHub est récent. Je souhaite l'autre méthode pour accéder à Claude Code et ChatGPT en gratuit.",
          },
        },
        {
          id: "duration",
          command: "./duration.sh",
          label: "Durée de la méthode",
          answer: [
            "Transparence totale : la méthode évolue avec l'écosystème.",
            "Comparée à des abonnements officiels ~24 000 FCFA/mois, l'approche reste",
            "pragmatique et largement rentable dès le premier mois.",
          ],
        },
        {
          id: "latency",
          command: "./latency.sh",
          label: "Latence & réseau",
          answer: [
            "Honnêteté sur le réseau : le trafic mondial influence la latence.",
            "Créneaux les plus stables : 20h-9h et 15h-17h.",
            "En dehors, ça peut fonctionner par moments, mais sans garantie de stabilité.",
            "",
            "C'est disponible chaque jour, à toute heure.",
            "Parfois, autour de 12h-14h, le réseau est un peu surchargé.",
          ],
        },
        {
          id: "legality",
          command: "./legality.sh",
          label: "Légalité",
          answer: [
            "L'utilisation repose sur des APIs et des passerelles d'accès ouvertes.",
            "La prestation porte sur la configuration et l'optimisation, en conformité.",
          ],
        },
      ],
    },

    wizard: {
      title: "Finaliser votre commande",
      steps: ["Informations", "Paiement", "Confirmation", "Validation"],
      selectedPlan: "Forfait sélectionné",
      step1: {
        title: "Vos informations",
        subtitle: "Pour votre invitation au groupe d'accompagnement.",
        name: "Nom complet",
        namePlaceholder: "Ex. Awa Koudjo",
        email: "Email",
        emailPlaceholder: "vous@exemple.com",
        whatsapp: "Numéro WhatsApp",
        whatsappPlaceholder: "+229 01xxxxxxxx",
        next: "Continuer",
      },
      step2: {
        title: "Paiement",
        subtitle: "Choisissez votre opérateur et effectuez le transfert.",
        operator: "Opérateur",
        operators: [
          { id: "mtn", label: "MTN MoMo", number: "+229 01 61 96 95 40" },
          { id: "moov", label: "Moov Money", number: "+229 01 58 17 24 31" },
        ],
        instructions:
          "Effectuez un transfert manuel du montant indiqué vers le numéro ci-dessous.",
        recipientLabel: "Bénéficiaire",
        recipientName: "Farid ADISSO",
        numberLabel: "Numéro",
        copied: "Copié",
        copyAria: "Copier le numéro",
        amountLabel: "Montant",
        back: "Retour",
        next: "J'ai payé",
      },
      step3: {
        title: "Confirmation du paiement",
        subtitle: "Renseignez la preuve de votre transfert.",
        transactionId: "ID de transaction",
        transactionIdPlaceholder: "Ex. MP240716.1032.A12345",
        uploadLabel: "Capture du SMS de paiement",
        uploadHint: "Cliquez ou déposez votre image ici (PNG, JPG).",
        uploadChosen: "Fichier sélectionné",
        back: "Retour",
        next: "Envoyer pour validation",
        submitting: "Envoi en cours…",
        submitError:
          "L'envoi a échoué. Réessayez ou contactez-moi sur WhatsApp.",
      },
      step4: {
        title: "Commande reçue",
        subtitle:
          "Notre équipe technique valide manuellement votre paiement sous 15 à 30 minutes.",
        detail:
          "Vous recevrez votre lien d'accès par WhatsApp et par Email dès validation.",
        attachmentNote:
          "Votre capture était trop volumineuse pour l'email. Merci de me l'envoyer via",
        close: "Fermer",
      },
      fallback: {
        text: "Moyen de paiement non disponible ?",
        link: "Contactez-moi sur WhatsApp Business.",
        waMessage:
          "Bonjour Farid, je souhaite finaliser ma commande d'intégration IA.",
      },
      close: "Fermer",
    },

    techMarquee: {
      title: "Environnements, Modèles & Agents IA 100% opérationnels",
    },

    roi: {
      eyebrow: "SIMULATEUR DE RENTABILITÉ",
      title: "Combien perdez-vous en abonnements chaque mois ?",
      subtitle:
        "Cochez vos outils actuels pour découvrir vos économies nettes avec notre intégration locale illimitée.",
    },

    beforeAfter: {
      eyebrow: "LA DIFFÉRENCE CONCRÈTE",
      title: "Pourquoi continuer à payer des abonnements mensuels ?",
      subtitle:
        "Comparez l'expérience classique avec notre solution d'intégration locale haute performance.",
    },

    footer: {
      title: "AI Integration & Cloud Solutions",
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "Email",
      whatsapp: "WhatsApp Business",
      linksAria: "Liens sociaux et de contact",
      whatsappPrefill:
        "Bonjour Farid, je souhaite en savoir plus sur vos prestations d'intégration IA.",
      note: "Disponible pour des intégrations IA, automatisations et accompagnements personnalisés.",
      rights: "Tous droits réservés.",
    },
  },

  /* =========================================================================
     EN — English
     ====================================================================== */
  en: {
    meta: {
      brand: "Farid ADISSO",
      brandSuffix: "Tech Integration",
      langLabel: "EN",
    },

    intro: {
      brand: "IT Network Community",
      tagline: "Ready to explore",
      skip: "Skip",
      skipAria: "Skip the introduction",
    },

    nav: {
      links: [
        { id: "values", label: "Services" },
        { id: "training", label: "Masterclass" },
        { id: "demo", label: "Demo" },
        { id: "pricing", label: "Pricing" },
        { id: "testimonials", label: "Reviews" },
        { id: "faq", label: "FAQ" },
      ],
      aria: "Main navigation",
      github: "GitHub",
      linkedin: "LinkedIn",
      cta: "Get started",
      toggleThemeDark: "Switch to light mode",
      toggleThemeLight: "Switch to dark mode",
      toggleLang: "Passer en français",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },

    hero: {
      trustedBy:
        "Trusted by independent developers • Claude • GPT-5 • Cursor • VS Code • Roo Code",
      titleLead: "Configure your local AI environment in",
      titleHighlight: "less than 30 minutes",
      subtitle:
        "Deploy an ultra-fast local AI architecture. Connect your favorite IDEs, optimize your requests and boost your productivity without friction.",
      ctaPrimary: "Start the setup",
      ctaSecondary: "Watch the demo",
    },

    values: {
      eyebrow: "What you get",
      title: "A complete, turnkey integration",
      subtitle:
        "Every step is handled so you can code instead of configuring.",
      items: [
        {
          id: "install",
          title: "Full installation",
          description:
            "Clean and fast deployment of tools like Claude Code directly in your terminal.",
        },
        {
          id: "secure",
          title: "Secure configuration",
          description:
            "Secure setup of your test keys and access gateways.",
        },
        {
          id: "env",
          title: "Environment variables",
          description:
            "Global system optimization (Bash, Zsh, Windows Path) for direct command-line access.",
        },
        {
          id: "ide",
          title: "Optimized IDEs",
          description:
            "Seamless linking with Cursor Desktop, VS Code and Roo Code.",
        },
        {
          id: "scripts",
          title: "Automation scripts",
          description:
            "One-click quick-start scripts (.bat / .sh) provided to avoid any manual typing.",
        },
        {
          id: "support",
          title: "Private support",
          description:
            "Access to an exclusive support group led by Farid to unblock every situation.",
        },
      ],
    },

    demo: {
      eyebrow: "Demonstration",
      title: "A real setup, filmed without editing",
      subtitle: "Watch the environment deploy and respond in real time.",
      terminalTitle: "gateway-demo — bash",
      badges: [
        { id: "real", label: "Real setup" },
        { id: "untampered", label: "Untampered footage" },
        { id: "realtime", label: "Real-time execution" },
      ],
    },

    proof: {
      eyebrow: "Visual proof",
      title: "What you'll see on your machine",
      captions: [
        "The Claude Code prompt responding in a few milliseconds.",
        "The Cursor interface integrating local AI requests.",
        "Farid's automated scripts running without errors.",
        "The Roo Code extension fully configured in VS Code.",
        "The control panel showing stable request flow.",
      ],
    },

    pricing: {
      eyebrow: "Pricing",
      title: "A one-time investment, a daily gain",
      subtitle: "Pick the level of support that matches your autonomy.",
      currency: "FCFA",
      mostChosen: "Most chosen",
      basic: {
        name: "Basic",
        price: "1,000",
        tagline: "Ideal to test the method.",
        cta: "Choose Basic",
        features: [
          "Standard written installation guide",
          "Access to the WhatsApp group",
        ],
      },
      pro: {
        name: "Pro",
        price: "3,000",
        tagline: "The reference choice.",
        cta: "Choose Pro",
        features: [
          "Full assisted configuration (Terminal, Cursor, Roo Code)",
          "One-click installation script pack",
          "Setup of the 20 plugins / skills",
          "Priority access to the support group",
        ],
      },
    },

    guide: {
      freeTitle: 'Download the "Free Claude Code and GPT" guide',
      freeText:
        "This guide is free and made for those who refuse to let the barrier of access to AI models hold them back. It helps you set up Claude Code locally, from the command line, step by step. Please read it carefully, along with the FAQ further down this page.",
      freeCta: "Download the PDF",
      freeFileName: "free-claude-code-and-gpt-guide.pdf",
      packsIntro:
        "In the age of AI, not seizing these opportunities is a mistake for those with big ambitions. When I talk about support, I mean the full installation of tools like Claude Code, ChatGPT or GLM in the IDE or environment of your choice.",
      standard: {
        name: "Standard Pack",
        price: "1,000",
        cta: "Choose the Standard Pack",
        features: [
          "Installation assisted by me, configured the same day after payment verification",
          "Access to the dedicated setup group",
          "Does not include plugins / skills",
        ],
      },
      pro: {
        name: "Pro Pack",
        price: "3,000",
        cta: "Choose the Pro Pack",
        toolsLead:
          "Full configuration in the IDE or terminal agent of your choice, among:",
        ideLabel: "IDE",
        ide: [
          "Claude Code",
          "Claude Desktop / Claude App",
          "Cursor",
          "GitHub Copilot",
          "Cline (VS Code)",
          "Roo Code",
          "Kilo Code",
          "Trae",
        ],
        agentsLabel: "Terminal agents",
        agents: [
          "Claude Code CLI",
          "Qwen Code",
          "OpenCode",
          "OpenClaw",
          "Hermes",
          "Pi",
        ],
        features: [
          "Over 20 ready-to-use plugins and skills (example: designing layouts just by asking the AI)",
          "Includes everything in the Standard pack",
        ],
      },
    },

    training: {
      eyebrow: "PREMIUM MASTERCLASS PROGRAM",
      title: "AI & VibeCoding Mastery Bootcamp",
      subtitle:
        "Become an elite AI engineer. Master subscription-free models, slash token usage by 90%, dominate the Google AI ecosystem, Antigravity, and multimedia generation.",
      badge: "Turnkey Masterclass & Certification",
      stats: [
        { label: "Immersive Modules", value: "6" },
        { label: "Token Savings", value: "Up to -90%" },
        { label: "Tools & Models", value: "100% Mastered" },
        { label: "Access & Updates", value: "Lifetime" },
      ],
      cta: "Enroll in Masterclass",
      ctaSub: "Instant Access + VIP Private Group + Lifetime Updates",
      price: "5,000",
      priceOld: "15,000",
      currency: "FCFA",
      planName: "AI & VibeCoding Complete Masterclass",
      modules: [
        {
          id: "m1",
          number: "01",
          title: "Subscription-Free AI Model Integration",
          tag: "Architecture & Routing",
          duration: "Hands-on Module",
          description:
            "Deploy Claude Code, Cursor, Cline, Roo Code and Trae routed via AgentRouter, OpenRouter and third-party APIs. Access Claude Opus 5, DeepSeek V4, GPT-5.6 and GLM-5.3 without monthly subscriptions.",
          skills: [
            "Claude Code CLI & Cursor terminal setup",
            "AgentRouter & global environment variables",
            "Multi-model routing (DeepSeek V4, Claude Opus 5, GPT-5.6, GLM-5.3)",
            "1-click automated startup scripts (.bat / .sh)",
          ],
        },
        {
          id: "m2",
          number: "02",
          title: "Marmouth AI & Autonomous Automations",
          tag: "Workflows & No-Code",
          duration: "Strategic Module",
          description:
            "Automate your operations and build autonomous AI agents integrated with n8n, Make and your custom code pipelines to create high-ticket monetization services.",
          skills: [
            "Autonomous AI agents & micro-services architecture",
            "n8n & Make workflows connected to code APIs",
            "Profitable automation templates creation",
            "Pipeline industrialization and observability",
          ],
        },
        {
          id: "m3",
          number: "03",
          title: "The Art of VibeCoding & Radical Token Economics (-90%)",
          tag: "Productivity & Token Economy",
          duration: "Methodology Module",
          description:
            "Learn to code at the speed of thought without burning your tokens. Structure projects, leverage Context Caching, surgical prompt rules and avoid full file rewrites.",
          skills: [
            "Golden Rules of VibeCoding (Architect vs Executor)",
            "Slash token consumption by up to -90% (Surgical diff, micro-files)",
            "Advanced .cursorrules and AGENTS.md configuration",
            "Modular prompt engineering & prompt caching",
          ],
        },
        {
          id: "m4",
          number: "04",
          title: "Advanced Google AI Ecosystem (Studio, Stitch, Flow, AI Plus)",
          tag: "Google Cloud & AI Studio",
          duration: "Technical Module",
          description:
            "Harness the entire Google stack: Google AI Plus activation (2M context window), Google AI Studio (JSON Schema, Function Calling, Cache), Google Stitch, and Google Flow data pipelines.",
          skills: [
            "Google AI Plus activation and ROI optimization",
            "Google AI Studio: Free keys, System Instructions, JSON Schema",
            "Autonomous Function Calling / Tool Use in your apps",
            "Google Flow & Cloud Dataflow for massive AI pipelines",
          ],
        },
        {
          id: "m5",
          number: "05",
          title: "Google DeepMind Antigravity Mastery",
          tag: "Agentic Engineering",
          duration: "Expert Module",
          description:
            "Master Google's autonomous pair-programming agentic environment. Use Skills, custom MCP servers, web research Subagents, and Planning mode to engineer complex codebases.",
          skills: [
            "Planning Mode vs Execution Mode (Architecture & Walkthrough)",
            "Custom MCP Servers creation and wiring",
            "Autonomous browser subagents & live web research",
            "Custom skills authoring & pair-programming rules",
          ],
        },
        {
          id: "m6",
          number: "06",
          title: "Audio & Commercial Music Generation with SUNO",
          tag: "Multimedia Production",
          duration: "Creative Module",
          description:
            "Craft studio-grade soundtracks, tech jingles, and high-converting commercial audio for your SaaS videos, social channels, and ads with zero prior music skills.",
          skills: [
            "Musical prompt engineering (Cyberpunk, SaaS, Synthwave)",
            "Advanced track structure tags ([Intro], [Drop], [Climax], [Outro])",
            "Audio mixing & voiceover layering (ElevenLabs / Kokoro)",
            "Sound design production for product launch films",
          ],
        },
      ],
      guarantees: [
        "Instant lifetime access to all 6 modules",
        "Ready-to-use production scripts and config templates",
        "Access to the VIP private support and networking group",
        "Free lifetime updates for all newly released modules",
      ],
    },

    why: {
      eyebrow: "Why me?",
      title: "Why work with Farid ADISSO?",
      points: [
        {
          id: "fullstack",
          title: "Data Analyst Associate & Developer",
          description:
            "Concrete mastery of the terminal, IDEs and modern toolchains.",
        },
        {
          id: "ai",
          title: "Specialized AI integrator",
          description:
            "High-performance local AI architectures built for speed and stability.",
        },
        {
          id: "secure",
          title: "Ultra-secure configuration",
          description:
            "Personalized setup that respects your keys and your system.",
        },
        {
          id: "assist",
          title: "Post-installation assistance",
          description:
            "Direct support after setup, not only during it.",
        },
        {
          id: "reactive",
          title: "Private, responsive support",
          description:
            "A private channel where your blockers get a fast answer.",
        },
      ],
    },

    /* CTA BANNER — final conversion, anchored on the accessibility mission. */
    ctaBanner: {
      eyebrow: "AI for everyone",
      title: "Join this pool of talent",
      text: "Innovate, create and prove that access to AI is possible for everyone, whatever the country or the means. Digital work pays: give yourself the tools to make a living from it.",
      primary: "Get started now",
      secondary: "See pricing",
    },

    /* STATS — key figures (animated counters). Real numbers provided by Farid. */
    stats: {
      since: "Serving the AI community since July 17, 2026",
      items: [
        {
          id: "clients",
          value: 10,
          prefix: "",
          suffix: "+",
          label: "Clients supported",
        },
        {
          id: "setup",
          value: 30,
          prefix: "≈ ",
          suffix: " min",
          label: "Average setup time",
        },
        {
          id: "satisfaction",
          value: 100,
          prefix: "",
          suffix: " %",
          label: "Satisfied clients",
        },
      ],
    },

    testimonials: {
      eyebrow: "Trusted by developers",
      title: "What developers say",
      subtitle:
        "Real feedback from people I helped set up their local AI environment.",
      verified: "Verified",
      prev: "Previous testimonial",
      next: "Next testimonial",
      pick: "Pick a testimonial",
      items: [
        {
          id: "aissatou",
          quote:
            "Before Free Integration, I thought AI was reserved for people who could afford several subscriptions. I was guided from A to Z to set up Claude Code and my entire development environment. Today I can learn, code and grow without my budget holding me back. It's not just a technical install, it's a door that opened onto a world I thought was out of reach.",
          name: "Aïssatou H.",
          role: "Software Engineering student",
          location: "",
          rating: 5,
        },
        {
          id: "rodrigue",
          quote:
            "What struck me most was the guidance. Setting up Claude Code was done entirely with me, and I learned to delegate repetitive tasks to the AI. While I'm in a client meeting or working on design, Claude prepares code, documentation and tests. Today I ship my projects faster without having hired a team.",
          name: "Rodrigue A.",
          role: "Freelance developer",
          location: "",
          rating: 5,
        },
        {
          id: "gildas",
          quote:
            "I didn't need a new AI. I needed someone to help me turn all these AIs into a real working tool. Free Integration configured my environment professionally. Now every idea I have can be tested quickly. I spend less time figuring out how to set up tools and far more time building my business.",
          name: "Gildas S.",
          role: "Entrepreneur",
          location: "",
          rating: 5,
        },
        {
          id: "grace",
          quote:
            "The best change is the time saved. Every evening I prepare my instructions before going to sleep. During the night, Claude Code advances my project. In the morning I no longer open my computer to a blank page: I review the work done, fix, improve and keep going. I finally feel like I'm working with a real teammate, when before I thought that kind of productivity was reserved for large companies.",
          name: "Grâce D.",
          role: "Student & project creator",
          location: "",
          rating: 5,
        },
      ],
    },

    faq: {
      eyebrow: "FAQ",
      title: "The answers console",
      shellPrompt: "guest@shell.farid.tech:~$",
      loadingLabel: "Loading",
      hint: "Click a command to run its answer.",
      skip: "Show all",
      commands: [
        {
          id: "requirements",
          command: "./requirements.sh",
          label: "Requirements",
          answer: [
            "Requirement: an active GitHub account older than 7 months (created on or before 2025-12-03).",
            "This rule supports developers invested in open source and prevents people from",
            "mass-creating accounts just to access the service.",
            "",
            "Is your GitHub account too recent? No worries: there's another method to still",
            "get Claude Code and ChatGPT for free. Message me and I'll walk you through it.",
          ],
          cta: {
            label: "Contact me on WhatsApp",
            message:
              "Hi Farid, my GitHub account is recent. I'd like the other method to access Claude Code and ChatGPT for free.",
          },
        },
        {
          id: "duration",
          command: "./duration.sh",
          label: "Method lifespan",
          answer: [
            "Full transparency: the method evolves with the ecosystem.",
            "Compared to official subscriptions ~24,000 FCFA/month, the approach stays",
            "pragmatic and largely profitable from the first month.",
          ],
        },
        {
          id: "latency",
          command: "./latency.sh",
          label: "Latency & network",
          answer: [
            "Honesty about the network: global traffic affects latency.",
            "Most stable windows: 8 PM-9 AM and 3 PM-5 PM.",
            "Outside those, it may work at times, but stability isn't guaranteed.",
            "",
            "It's available every day, at any hour.",
            "Sometimes, around 12 PM-2 PM, the network is a bit overloaded.",
          ],
        },
        {
          id: "legality",
          command: "./legality.sh",
          label: "Legality",
          answer: [
            "Usage relies on open APIs and access gateways.",
            "The service covers configuration and optimization, in full compliance.",
          ],
        },
      ],
    },

    wizard: {
      title: "Complete your order",
      steps: ["Information", "Payment", "Confirmation", "Validation"],
      selectedPlan: "Selected plan",
      step1: {
        title: "Your information",
        subtitle: "For your invitation to the support group.",
        name: "Full name",
        namePlaceholder: "e.g. Awa Koudjo",
        email: "Email",
        emailPlaceholder: "you@example.com",
        whatsapp: "WhatsApp number",
        whatsappPlaceholder: "+229 01xxxxxxxx",
        next: "Continue",
      },
      step2: {
        title: "Payment",
        subtitle: "Choose your operator and make the transfer.",
        operator: "Operator",
        operators: [
          { id: "mtn", label: "MTN MoMo", number: "+229 01 61 96 95 40" },
          { id: "moov", label: "Moov Money", number: "+229 01 58 17 24 31" },
        ],
        instructions:
          "Make a manual transfer of the shown amount to the number below.",
        recipientLabel: "Recipient",
        recipientName: "Farid ADISSO",
        numberLabel: "Number",
        copied: "Copied",
        copyAria: "Copy the number",
        amountLabel: "Amount",
        back: "Back",
        next: "I have paid",
      },
      step3: {
        title: "Payment confirmation",
        subtitle: "Provide the proof of your transfer.",
        transactionId: "Transaction ID",
        transactionIdPlaceholder: "e.g. MP240716.1032.A12345",
        uploadLabel: "Payment SMS screenshot",
        uploadHint: "Click or drop your image here (PNG, JPG).",
        uploadChosen: "Selected file",
        submitting: "Sending…",
        submitError: "Sending failed. Please try again or use WhatsApp below.",
        back: "Back",
        next: "Submit for validation",
      },
      step4: {
        title: "Order received",
        subtitle:
          "Our technical team manually validates your payment within 15 to 30 minutes.",
        detail:
          "You'll receive your access link by WhatsApp and Email once validated.",
        attachmentNote:
          "Your screenshot was too large to attach. Please send it to us on WhatsApp:",
        close: "Close",
      },
      fallback: {
        text: "Payment method not available?",
        link: "Contact me on WhatsApp Business.",
        waMessage:
          "Hello Farid, I'd like to complete my AI integration order.",
      },
      close: "Close",
    },

    techMarquee: {
      title: "Environments, Models & AI Agents 100% operational",
    },

    roi: {
      eyebrow: "AI SAVINGS CALCULATOR",
      title: "How much are you losing in monthly subscriptions?",
      subtitle:
        "Check your current tools to discover your net savings with our unlimited local integration.",
    },

    beforeAfter: {
      eyebrow: "THE CONCRETE DIFFERENCE",
      title: "Why keep paying monthly subscription fees?",
      subtitle:
        "Compare the traditional fragmented setup with our high-performance local AI integration.",
    },

    footer: {
      title: "AI Integration & Cloud Solutions",
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "Email",
      whatsapp: "WhatsApp Business",
      linksAria: "Social and contact links",
      whatsappPrefill:
        "Hello Farid, I'd like to learn more about your AI integration services.",
      note: "Available for AI integrations, automations and personalized support.",
      rights: "All rights reserved.",
    },
  },
};

/**
 * Petit helper : renvoie l'objet de traduction pour une langue donnée,
 * avec repli sur le français si la langue est inconnue.
 * @param {Lang} lang
 */
export function getTranslations(lang) {
  return translations[lang] ?? translations.fr;
}

export default translations;

/**
 * PROOF_CARDS — Légendes bilingues des 5 captures de la Bento Grid de preuves.
 *
 * Contrairement au reste du dictionnaire (piloté par la langue globale), ces
 * légendes affichent le FR et l'EN *simultanément* : au survol d'une carte, la
 * version française glisse vers le haut pour révéler la version anglaise. Les
 * deux langues sont donc nécessaires en même temps, d'où cette structure
 * `{ fr, en }` partagée plutôt qu'un split par langue.
 *
 * L'`src` pointe vers les assets servis depuis `public/assets/`.
 *
 * @type {ReadonlyArray<{
 *   id: string,
 *   src: string,
 *   title: { fr: string, en: string },
 *   description: { fr: string, en: string }
 * }>}
 */
export const PROOF_CARDS = /** @type {const} */ ([
  {
    id: "capture1",
    src: "/assets/capture1.png",
    title: { fr: "Une interface épurée", en: "A Sleek Workspace" },
    description: {
      fr: "Basculez instantanément entre le mode co-travail (Cowork) et le développement (Code).",
      en: "Seamlessly switch between Cowork mode and the Code environment.",
    },
  },
  {
    id: "capture2",
    src: "/assets/capture2.png",
    title: { fr: "IA connectée au monde réel", en: "Real-time Web Connected" },
    description: {
      fr: "Vos agents explorent le réseau pour concevoir des solutions basées sur des données à jour.",
      en: "Your agents browse the live web to build solutions on up-to-date data.",
    },
  },
  {
    id: "capture3",
    src: "/assets/capture3.png",
    title: { fr: "Gestion des compétences", en: "Skill Orchestration" },
    description: {
      fr: "Déléguez des tâches complexes de création (comme Remotion) à des sous-agents dédiés.",
      en: "Delegate complex creation pipelines (like Remotion) to dedicated sub-agents.",
    },
  },
  {
    id: "capture4",
    src: "/assets/capture4.png",
    title: { fr: "Vitesse de routage extrême", en: "Extreme Routing Speed" },
    description: {
      fr: "Accédez à Claude Opus 4.6/4.8 via Agent Router avec une latence de premier mot de 2s.",
      en: "Access Claude Opus 4.6/4.8 via Agent Router with a 2-second first-word latency.",
    },
  },
  {
    id: "capture5",
    src: "/assets/capture5.png",
    title: { fr: "Contrôle total du code", en: "Full Code Control" },
    description: {
      fr: "Suivez la pensée de vos agents pas à pas et validez chaque modification de fichier.",
      en: "Track your agents step-by-step and safely approve every single file edit.",
    },
  },
]);
