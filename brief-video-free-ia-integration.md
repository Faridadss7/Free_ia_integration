# FREE-IA-INTEGRATION — OFFICIAL LAUNCH FILM
Brief vidéo v2, pour Claude Code + HyperFrames

## Mission
Créer une vidéo de lancement premium digne d'une startup internationale (OpenAI, Vercel, Linear, Stripe, Notion, Cursor). Le résultat ne doit jamais ressembler à une publicité locale ni à un simple montage de captures d'écran. Le spectateur doit avoir l'impression de regarder l'annonce officielle d'un nouveau produit SaaS mondial.

Règles non négociables :
- Chaque seconde doit contenir du mouvement.
- Aucun écran statique.
- Aucun texte posé sur un fond neutre — tout doit être intégré dans une interface vivante (terminal, fenêtre, carte, dashboard, connexion réseau).

## Infos clés du projet
- **Projet** : Free-IA-Integration
- **Ce que c'est** : service d'accompagnement qui configure un environnement de développement assisté par IA (Claude Code, Cursor, Cline, Roo Code...) directement sur la machine du client, connecté aux modèles via AgentRouter, avec scripts d'automatisation et support privé après installation.
L'utilisateur possède maintenat des modèles sans abonnements 
- **Pour qui** : développeurs indépendants, étudiants, freelances, entrepreneurs.
- **Porteur** : Farid ADISSO — Data Analyst Associate & Développeur, intégrateur IA.
- **Durée cible** : 75-90 secondes — ne pas dépasser.
- **Public** : grand public réseaux sociaux.

## Style général
Inspirations : OpenAI Launch, Cursor AI, Vercel, Linear, Stripe Sessions, Apple WWDC, Arc Browser, Raycast, Framer.
Univers : premium, minimaliste, technologique, élégant, rapide, ultra fluide.
Palette : fond noir profond, dégradés gris anthracite, accents cyan/violet/bleu électrique, blanc pur, glow discret, beaucoup d'espace négatif.

## Animation — toujours privilégier
Motion UI, morphing, parallax, depth, particles, blur, glow, glassmorphism discret, data flow, curseur réel, micro-interactions, transitions organiques.

## Caméra
Aucune caméra fixe. Toujours : zoom lent, rotation légère, travelling, perspective, profondeur. Chaque scène doit respirer.

## Animations interdites
❌ PowerPoint / Canva ❌ Texte qui défile ❌ Zoom brutal ❌ Rotation excessive ❌ Icônes qui rebondissent ❌ Transitions génériques ❌ GIF ❌ Effets gaming RGB

## Structure des scènes (total ~80s, ajustable proportionnellement entre 75 et 90s)

**Scène 1 — AI Boot Sequence (0-8s)**
Écran noir. Une ligne de terminal apparaît : "Initializing AI Workspace...". Boot sequence, scan système, connexion des modules un par un avec animation lumineuse : ✓ Claude Code, ✓ Cursor, ✓ VS Code, ✓ Roo Code, ✓ Cline, ✓ AgentRouter. Particules qui circulent, flux de données. Puis "System Ready." Transition morphing : le terminal devient une interface.

**Scène 2 — Logo Free-IA-Integration (8-18s)**
Le logo n'apparaît pas en simple fade : il est construit, des particules convergent. Le réseau IA prend forme. AgentRouter est représenté comme le cœur du système, les modèles IA (Claude, GPT, GLM, Gemini...) gravitent autour et communiquent via des flux lumineux. Le logo devient vivant.  

**Scène 3 — Transformation (18-40s)**
L'utilisateur tape `free-ai init`. Entrée. Explosion de mouvement : les lignes de code deviennent VS Code, Cursor, Claude Code, dashboard, terminal, configuration, secrets, variables, extensions — tout s'installe automatiquement, les fenêtres apparaissent, les agents deviennent actifs. Progression sans coupure, uniquement des morphings : Chaos → Organisation → Productivité → Workspace IA complet.

**Scène 4 — Workflow (40-48s)**
Montrer le vrai workflow, matérialisé par des flux lumineux : Utilisateur → Free-IA-Integration → AgentRouter → Claude → GPT → GLM → Réponse. Chaque modèle répond, les réponses convergent, le résultat revient vers l'utilisateur.

**Scène 5 — Démonstration réelle (48-58s)**
Insérer les vraies captures d'écran (voir section Assets ci-dessous), jamais en plein écran — toujours encadrées dans une fenêtre moderne avec effets glass, shadow, glow, mouse hover, scrolling, zoom subtil. La capture devient une vraie interface, pas un simple screenshot posé.On va juste utiliser les captures d'écrans sur le site

**Scène 6 — Social Proof (58-66s)**
Carte premium : avatar, nom, métier, ★★★★★. Le témoignage apparaît progressivement, l'interface réagit, le badge "Vérifié" scintille légèrement.

**Scène 7 — Packs (66-75s)**
Trois cartes : Pack Gratuit / Pack Standard / Pack Pro. Effet Apple : la caméra tourne légèrement, le curseur survole les cartes, les boutons réagissent.

**Scène 8 — Final (75-85s)**
Retour sur le réseau IA, toutes les connexions convergent, le logo apparaît, puis "AI Workspace Ready", puis "Configurez votre environnement IA aujourd'hui." Le terminal affiche `> free-ai launch`, ENTER, le curseur clignote, écran noir.

## Voix off
Français, masculine, professionnelle, confiante, débit rapide, naturelle — aucune voix robotique. Le rythme doit suivre les animations, pas l'inverse.

## Sous-titres
Style Apple : très peu de texte, synchronisation parfaite, animation mot par mot, jamais plus de deux lignes à l'écran.

## Sound design
Boot informatique, whoosh, clavier, clics, notification, transfert de données, basse douce, ambiance électronique. Le son participe à l'histoire, pas juste un habillage.

## Note technique — HyperFrames gère nativement voix, sous-titres et audio-réactif
Pas besoin d'assemblage manuel en post-traitement : HyperFrames intègre tout dans la composition HTML directement.
- **Voix off (TTS)** : trois fournisseurs possibles — HeyGen (voix Starfish, nécessite `npx hyperframes auth`), ElevenLabs (nécessite clé API, déjà connectée via MCP), ou **Kokoro** (gratuit, tourne en local, aucune clé API requise — bonne option pour un premier test rapide sans friction).
- **Sous-titres** : générés automatiquement via transcription Whisper avec timestamps mot par mot (style karaoké), ou import direct d'un SRT/VTT existant.
- **Audio-réactif** : les visuels peuvent réagir au volume/rythme de la voix ou de la musique (glow, pulse) — garder l'intensité subtile sur le texte (3-6%), plus marquée sur les fonds (10-30%).
- Toujours préfixer les prompts par `/hyperframes` pour charger le contexte du skill correctement.

## Assets réels disponibles (captures d'écran déjà fournies)
Ces captures viennent du site free-ia-integration.netlify.app, à intégrer dans des fenêtres stylisées (jamais en plein écran, cf. Scène 5) :
- **Capture "Sleek Workspace / Real-time Web Connected / Skill Orchestration"** → Scène 5 (démonstration).
- **Capture Agent Router (console, logs, latence "Extreme Routing Speed", "Full Code Control")** → Scène 4 (workflow) ou Scène 5.
- **Capture témoignage Grâce D.** (5 étoiles, badge "Vérifié") → Scène 6 (social proof), telle quelle.
- **Capture terminal (./requirements.sh, ./duration.sh, ./latency.sh, ./legality.sh) + bloc contact** → Scène 8 (final/CTA).

Vérifier la netteté de chaque capture en plein écran vidéo avant intégration.

## Niveau de qualité attendu
Cette vidéo doit pouvoir être diffusée : sur la chaîne YouTube officielle d'une startup IA internationale, lors d'une keynote de lancement, sur LinkedIn par un CEO de startup, en publicité sponsorisée Meta/X/LinkedIn, sur la page d'accueil du site sans paraître amateur.
Objectif final : dans les 10 premières secondes, le spectateur doit spontanément penser "cette entreprise semble déjà jouer dans la cour des grands."

## Consigne explicite à donner à Claude Code
> "Crée un film de lancement premium pour Free-IA-Integration avec HyperFrames, style OpenAI/Vercel/Linear/Cursor — pas une vidéo SaaS locale. Utilise le brief complet ci-joint. Génère la voix off et les sous-titres nativement via HyperFrames (teste d'abord Kokoro pour un rendu gratuit sans friction). Chaque seconde doit contenir du mouvement, aucun texte posé sur fond statique."

## Méthode de production recommandée
Générer scène par scène, valider chaque rendu avant d'assembler — surtout les scènes 1, 2 et 3 qui sont les plus ambitieuses techniquement. Vérifier les chartes d'usage de marque des logos tiers (Claude Code, Cursor, VS Code, Cline, Roo Code) avant publication finale.
