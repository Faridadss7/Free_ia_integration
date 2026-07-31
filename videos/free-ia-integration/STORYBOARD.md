---
format: 1920x1080
duration: 72s
message: "Configure ton environnement de développement IA — Claude Code, Cursor, GPT — sans abonnement, en une seule installation."
arc: Future Pacing → imagine (boot) → name product → mechanism → proof/demo → social proof → offer → CTA
audience: "Développeurs indépendants, étudiants, freelances, entrepreneurs"
mode: autonomous
music: confident minimal tech underscore, electronic, cinematic launch
language: fr
---

## Video direction

- **palette system** (from `frame.md`, never invented): ground = `ink #030712` (full-bleed, painted by a `class="clip"` background layer per frame — never on `#root`). Voltage accent = `tile-strong #38bdf8` (glow, active lines, the ONE emphasis per frame); `coral #0ea5e9` as the deeper accent-strong for CTA/press states; `tile #D0EFFD` for soft fills. Text = `cream #f8fafc`. Code/terminal surfaces = `navy #151718` body / `navy-elev #202325` chrome with JetBrains Mono; syntax accents coral (keywords) / teal `#5DB8A6` (strings) / amber `#E8A55A` (numbers). Display + body = Inter (sentence case, negative tracking); mono layer = JetBrains Mono for kickers, terminal, latencies, labels. Never more than one voltage accent lit per frame.
- **motion grammar + reveal model**: long-tail decel, `power3` default (smooth over bouncy — no `back/bounce/elastic` as a default; overshoot only where explicitly noted). Every frame is **VO-paced**: at t=0 only what the voice is saying enters; each further piece reveals on its spoken cue, weighted into the back ~50%. One virtual camera runs through the film — deliberate pushes/travels only where noted, never a lazy back-half drift. Aliveness during a hold = subtle low-amplitude jitter or a live SVG/terminal internal only; never breathing.
- **rhythm / held-frame allocation**: energy arc = boot tease (F1, taut) → build (F2 constellation) → peak motion (F3 transformation, F4 router) → settle to proof (F5 demo, **F6 held** — the human breather, near-still after the badge scintillates) → decision (F7 packs) → inevitable close (F8). F6 is the deliberate held read; F5 and F8 end on a lock. Everything else reveals to the VO.
- **negative list**: no PowerPoint/Canva look, no scrolling marquees, no brutal zoom, no bounce/overshoot-as-default, no RGB-gaming glow, no GIF texture, no floating purple-blue "AI" bokeh, no nav bars / scrollbars / real browser chrome (except the intentional terminal & router reconstructions), no generic decorative shapes standing in for a real asset. Both motion failure modes banned: **slideshow** (front-load then freeze) and **screensaver** (elements floating independently). No `repeat: -1`, no `Math.random`, no `Date.now`.

## Frame 1 — AI Boot Sequence

- scene: Écran noir profond. Un terminal s'initialise — « Initializing AI Workspace… », modules qui se cochent ✓ un par un, « System Ready », amorce du morphing vers une UI.
- voiceover: "Un écran noir. Une seule commande. Et votre machine se transforme."
- duration: 4.963s
- poster: 3.5s
- transition_in: cut
- status: outline
- src: compositions/frames/01-boot-sequence.html
- type: hook
- persuasion: Future pacing
- beat: intrigue → anticipation
- blueprint: prompt-type-submit-generate (Adapt)
- focal: (typography-only — terminal reconstruction, no captured asset)
- roles: (none — pure reconstruction on the ink ground)
- sfx: boot-hum, keystroke, soft-confirm-chime

Adapt: keep the "type into a real input → the machine answers with status theater" signature, but the input is a boot command and the answer is a self-checking module list; clip ends on "System Ready" morphing open (no product UI yet — that's F2's job).
Scene 1 (0.0–1.4s): full-bleed ink ground (background clip). A single mono caret blinks dead-center on a bare field; `> initializing ai workspace…` **types on** behind the caret (`discrete-text-sequence` + `context-sensitive-cursor`), cream on ink. Nothing else on screen — Centered, one line. Voltage accent unlit.
Scene 2 (1.4–3.4s): as the VO reaches "une seule commande", three module lines reveal **sequentially** below the prompt, each flipping from `[ ]` to a `✓` in `tile-strong` on its own beat (`dynamic-content-sequencing`; the checkmark is the only voltage) — `claude code ✓ · cursor ✓ · agentrouter ✓`. Mono, left-aligned in a centered column ~55% width, 3 depth layers (dim scanline field behind, prompt mid, checks front).
Scene 3 (3.4–4.859s): the checks lock; `SYSTEM READY` snaps in beneath on a single hard cut (`kinetic-beat-slam`, one phrase), a soft `ambient-glow-bloom` rises behind it in `tile-strong` and holds; the whole terminal begins one subtle scale-open (barely started, handed to the F1→F2 cut). Held read — jitter only.

narrativeRole: Ouvre à froid sur la promesse d'une transformation — pas une description d'entreprise, une mise en scène du « avant ». Crée l'anticipation en 3 secondes.
keyMessage: Une seule commande suffit à transformer une machine nue en studio IA.

## Frame 2 — Free-IA-Integration (le nom + le cœur)

- scene: Le logo Free-IA-Integration se construit par particules ; AgentRouter au cœur, modèles (Claude, GPT, GLM, Gemini) en orbite, reliés par des flux lumineux qui convergent vers le centre.
- voiceover: "Voici Free-IA-Integration. Claude Code, Cursor, GPT — orchestrés par AgentRouter, installés sur votre machine, sans abonnement."
- duration: 12.382s
- poster: 9s
- transition_in: zoom-through
- status: outline
- src: compositions/frames/02-logo-constellation.html
- type: product_intro
- persuasion: Show-don't-tell proof
- beat: clarity → confidence
- blueprint: constellation-hub (Reproduce)
- focal: (typography + reconstructed node graph — no captured asset)
- roles: (none — reconstructed constellation on the ink ground)
- sfx: whoosh-in, data-transfer-shimmer, low-bass-swell

Reproduce: nodes spring into a ring around a center, connectors draw, camera pushes in and resolves on the core lockup. Signature move = the ring resolving onto the hub with a push-in.
Scene 1 (0.0–2.2s): ink ground. As the VO says "Voici Free-IA-Integration", the wordmark **assembles** dead-center — glyphs tumble in from a shallow 3D depth-cloud and settle flat on a long-tail `power3`, the ✱ coral spike marking the name. Centered, ~50% width. No orbit yet.
Scene 2 (2.2–6.0s): the wordmark demotes to a small pinned label; a central **AgentRouter** hub node blooms at center (soft radial glow in `tile-strong`, peak opacity low). As the VO names "Claude Code, Cursor, GPT", three model nodes **flip into an elliptical orbit** around the hub on their spoken cues (`orbit-3d-entry`), a fourth (GLM/Gemini) joining last — mono labels under each. Layered-depth, hub sharp, orbit ring at mid-depth.
Scene 3 (6.0–9.6s): as "orchestrés par AgentRouter" lands, **connector lines self-draw** from each orbiting model inward to the hub (`svg-path-draw`), a data shimmer traveling along them toward the center — the convergence is the proof. The hub pulses once on the arrival (single voltage beat).
Scene 4 (9.6–12.617s): the camera does one slow **push-in** toward the hub (`multi-phase-camera`), a soft focus-falloff softening the outer orbit; the wordmark re-centers over the hub as a clean lockup and the mono tagline `sans abonnement` reveals beneath on its spoken cue. Settles and holds — jitter only.

narrativeRole: Nomme le produit et pose la promesse centrale dès le beat 2 — tout ce qui suit est la preuve.
keyMessage: Un seul hub — AgentRouter — connecte tous vos outils IA, sur votre machine, sans abonnement.

## Frame 3 — La transformation

- scene: `free-ai init` tapé dans le terminal → explosion de mouvement, chaos de fragments → réorganisation fluide → workspace IA complet (éditeurs, panneaux, agents) qui se cristallise. Caméra en vol continu.
- voiceover: "Une commande — free-ai init. Le désordre s'organise. En quelques minutes, un environnement complet, prêt à coder."
- duration: 9.874s
- poster: 6s
- transition_in: crossfade
- status: outline
- src: compositions/frames/03-transformation.html
- type: feature_showcase
- persuasion: Friction reduction
- beat: awe → ease
- blueprint: camera-journey (Adapt) — sub-shape B, cursorless flight
- focal: (reconstructed workspace panels — no captured asset)
- roles: (none — reconstruction on the ink ground)
- sfx: keystroke-enter, whoosh-build, crystallize-chime

Adapt: keep the cursorless motivated 3D flight (dive → beat fires → travel to consequence → landing push), but the "consequence" is a scattered field of UI fragments resolving into a laid-out workspace. Signature move = the continuous camera flight through one world. Compress to 8.7s: three tight legs, no dwell.
Scene 1 (0.0–2.0s): ink ground, a mono terminal pill low-center. `free-ai init` **types on** and the VO says it; on the Enter beat the pill flashes with a tactile press-and-release and a directional velocity streak fires outward — the command detonates. Centered → the camera starts its dive.
Scene 2 (2.0–5.2s): as "le désordre s'organise", ~9 UI fragments (editor panes, an agent card, a file tree, a chart tile) scatter in a tumbling 3D depth-cloud while the camera **flies past them** (`3d-camera-flight`, motion blur on the fast legs) — chaos with direction, not random float (index-derived positions, deterministic). Layered-depth, 3 planes.
Scene 3 (5.2–8.725s): the camera **tilts-to-flatten** and decelerates (`3d-camera-flight` landing, `power4.out`); the fragments **snap into a clean workspace grid** from their scattered positions to final layout — editor left, agent panel right, terminal strip bottom. As "prêt à coder" lands, one voltage line (`tile-strong`) underlines the composed workspace and holds. Locked — jitter only.

narrativeRole: Dramatise le mécanisme — de l'écran nu au workspace complet — comme un seul geste fluide.
keyMessage: L'installation est une seule commande ; la complexité disparaît.

## Frame 4 — Le workflow (AgentRouter)

- scene: Flux : User → Free-IA-Integration → AgentRouter → Claude / GPT / GLM → réponse qui converge. Console réelle AgentRouter avec logs, modèles, latences (2s, 3s, stream) qui apparaissent ligne par ligne.
- voiceover: "Vous demandez. Free-IA-Integration route vers le meilleur modèle. La réponse arrive en quelques secondes."
- duration: 7.706s
- poster: 5s
- transition_in: zoom-through
- status: outline
- src: compositions/frames/04-workflow-router.html
- type: feature_showcase
- persuasion: Show-don't-tell proof
- beat: confidence → control
- blueprint: agent-progress-theater (Adapt)
- asset_candidates: assets/agent-router.png — console réelle AgentRouter (logs, modèles claude-opus, latences)
- focal: assets/agent-router.png
- roles: agent-router.png = cutout (held as the real console surface, framed in a glass window; never full-bleed) · flow-chevrons = supporting
- sfx: click-send, data-transfer, row-confirm-tick

Adapt: keep the "trigger → working theater → receipt cascade" spine, but the trigger is a routing request and the receipt is real AgentRouter log rows arriving with latencies. Signature move = rows landing and confirming. Do NOT show the whole PNG flat — mount it inside a floating glass window, top ~80%, reveal region-by-region.
Scene 1 (0.0–2.0s): ink ground. A left-to-right **flow spine** builds on the VO "Vous demandez / route vers le meilleur modèle": three mono nodes — `User → Free-IA · AgentRouter → model` — reveal sequentially with a voltage chevron drawing between each (`svg-path-draw`). Full-width strip, upper third.
Scene 2 (2.0–5.0s): the `agent-router.png` console **rises into a floating glass window** center (`3d-page-scroll` tilt, soft shadow + hairline), and its log rows **cascade in one by one** (`dynamic-content-sequencing`) — Time, Model (`claude-opus-4-8`), latency. Each row's latency chip (`2s`, `3s`, `stream`) ticks and confirms in mono amber/teal as it lands. Asymmetric 60/40, console dominant.
Scene 3 (5.0–7.758s): as "en quelques secondes" lands, one hero row **highlights** — `asr-keyword-glow` pulse on the latency value in `tile-strong` — and a `depth-of-field-blur` softens the other rows so the confirmed response reads as the payoff. Holds — the console alive only via its own last row settling; jitter otherwise.

narrativeRole: Preuve concrète du routage multi-modèles — la vraie console, pas une maquette.
keyMessage: Le routage intelligent choisit le bon modèle, en quelques secondes.

## Frame 5 — Démonstration réelle

- scene: Captures du site encadrées en fenêtres « glass » (ombre, glow, hover, scroll, zoom subtil), jamais plein écran. Le hero du site flotte, la caméra dérive doucement autour.
- voiceover: "Un vrai service, un vrai site. Une méthode éprouvée — votre environnement IA prêt en moins de trente minutes."
- duration: 9.874s
- poster: 6s
- transition_in: crossfade
- status: outline
- src: compositions/frames/05-demo-real.html
- type: benefit_highlight
- persuasion: Show-don't-tell proof
- beat: trust → aspiration
- blueprint: device-surface-showcase (Adapt)
- asset_candidates: assets/hero.png — hero du site (titre « en moins de 30 minutes », réseau de nœuds turquoise)
- focal: assets/hero.png
- roles: hero.png = cutout (the hero held as the floating window subject) · backdrop = background (ink, dim)
- sfx: whoosh-soft, ui-hover-tick, number-lock

Adapt: keep the floating-window hero with a continuous but gentle camera, screens presented inside their real surface. Signature move = the held surface as hero. No cursor click-through (that was F4's theater); this is a calm confident showcase landing on the 30-min claim.
Scene 1 (0.0–2.4s): ink ground. On "Un vrai service, un vrai site", the `hero.png` **rises into a floating glass window** slightly off-center (rule-of-thirds), hairline + soft `tile` glow, one slow motivated push (`multi-phase-camera`, gentle) — the window fills ~60% and tilts a few degrees in depth (`3d-page-scroll`).
Scene 2 (2.4–6.2s): as "une méthode éprouvée" lands, the window does one subtle **internal scroll** revealing the hero's node-graph + CTA region (`3d-page-scroll` internal scroll), and a mono kicker `✱ MÉTHODE ÉPROUVÉE` reveals in the negative space beside it. Asymmetric 60/40, 3 depth layers (dim backdrop, window, floating kicker).
Scene 3 (6.2–9.796s): the camera settles the window flat; as "moins de trente minutes" lands, a **number lockup** crystallizes in the open space — `< 30 min` (`counting-dynamic-scale` on the 30, Inter figure + mono unit), one voltage glow behind it (`ambient-glow-bloom`). Locked and still — jitter only.

narrativeRole: Ancre le produit dans le réel — un service live avec une promesse chiffrée.
keyMessage: Environnement IA opérationnel en moins de 30 minutes.

## Frame 6 — Social Proof (Grâce D.)

- scene: Carte témoignage Grâce D. : ★★★★★, citation, nom, rôle « Étudiante & Créatrice de projets », badge « Vérifié » qui scintille. Fond sombre, glow discret.
- voiceover: "Le plus beau changement, c'est le temps gagné. La nuit, Claude Code avance sur le projet. Le matin, plus de page blanche."
- duration: 8.803s
- poster: 5.5s
- transition_in: crossfade
- status: outline
- src: compositions/frames/06-social-proof.html
- type: social_proof
- persuasion: Social proof
- beat: skepticism → belonging
- blueprint: titlecard-reveal (Reproduce)
- asset_candidates: assets/testimonial-grace.png — carte témoignage Grâce D., 5 étoiles, badge Vérifié
- focal: assets/testimonial-grace.png
- roles: testimonial-grace.png = cutout (the proof card, hero) · backdrop = background (ink, dim)
- sfx: soft-reveal, sparkle-verify

Reproduce: the calm landing beat — the proof card revealed with one restrained move, badge scintillates, then a still hold. Low motion IS the payload. This is the deliberate held / breather frame of the film.
Scene 1 (0.0–2.2s): ink ground, faint radial glow center. On "Le plus beau changement", the `testimonial-grace.png` card **slides up and crossfades in** (`waterfall-entry`, single element, `power3`) to dead-center, hairline + one soft shadow, ~55% of frame. Five ★ read filled on arrival (part of the asset). Centered.
Scene 2 (2.2–5.0s): held. As the VO reads "la nuit… le matin", the quote sits still and reads — no motion on the card. The `Vérifié` badge **scintillates once** — a single-pass `ambient-glow-bloom` sheen crossing it in `tile-strong` (the one voltage beat), then rests. Prefer stillness; this is the breather.
Scene 3 (5.0–8.307s): as "plus de page blanche" lands, a mono cite line `✱ GRÂCE D. — ÉTUDIANTE & CRÉATRICE` confirms beneath the card (already in the asset — reinforced only by a hairline rule drawing in). Full hold to the end — subtle jitter only, nothing else moves.

narrativeRole: Preuve humaine et vérifiée — traduit la promesse en bénéfice vécu (temps gagné, plus de page blanche).
keyMessage: De vrais utilisateurs gagnent du temps chaque jour.

## Frame 7 — Les packs

- scene: Deux cartes côte à côte — Pack Standard (1 000 FCFA) et Pack Pro (3 000 FCFA, badge « Le plus choisi », glow turquoise). Effet Apple : entrée en book-open, caméra qui tourne légèrement, curseur qui survole.
- voiceover: "Deux formules. Le Pack Standard pour tester la méthode. Le Pack Pro — configuration complète, scripts, support prioritaire. Un investissement unique, sans abonnement."
- duration: 12.617s
- poster: 8s
- transition_in: push-slide LEFT
- status: outline
- src: compositions/frames/07-pricing.html
- type: benefit_highlight
- persuasion: Value stacking
- beat: aspiration → decision
- blueprint: comparison-split (Reproduce)
- asset_candidates: assets/pricing.png — les 2 packs réels (Standard 1 000 FCFA, Pro 3 000 FCFA, badge « Le plus choisi »)
- focal: assets/pricing.png
- roles: pricing.png = supporting (source of the real card content/prices; rebuilt as two clean glass cards, not shown flat) · backdrop = background (ink)
- sfx: card-swoosh-x2, badge-pop, hover-tick

Reproduce: two paired cards enter from opposite wings with mirrored book-open tilts and hold side-by-side, then an inner-edge pill spring-pops on the Pro. Signature move = the mirrored book-open + the badge pop. 13.4s is long — pace the value lines to the VO, hold the back third.
Scene 1 (0.0–2.6s): ink ground. On "Deux formules", two card silhouettes **enter from opposite wings** with mirrored rotationY book-open tilts (`split-tilt-cards`, `power3`) and settle into a centered split. Empty cards first (titles only): `Standard` / `Pro`. Split-screen 50/50.
Scene 2 (2.6–6.4s): as "le Pack Standard pour tester la méthode" lands, the **left card fills**: price `1 000 FCFA` (mono number-lockup) + one line "tester la méthode", revealed on cue. Left card holds lit, right stays dim (`depth-of-field-blur` on the right).
Scene 3 (6.4–10.4s): as "le Pack Pro — configuration complète, scripts, support prioritaire" lands, focus **racks to the right card**; its three value lines reveal **sequentially** one per spoken item (`dynamic-content-sequencing`), price `3 000 FCFA` locks, and the `Le plus choisi` badge **spring-pops** on the inner top edge in `tile-strong` (the voltage; `spring-pop-entrance`, gentle overshoot allowed here — the one playful beat).
Scene 4 (10.4–13.401s): as "un investissement unique, sans abonnement" lands, both cards sit level and lit; a mono seal line `PAIEMENT UNIQUE · SANS ABONNEMENT` draws in centered beneath on a hairline rule. Held — jitter only.

narrativeRole: Présente l'offre comme un choix simple et sans risque — paiement unique, deux niveaux clairs.
keyMessage: Un paiement unique, deux packs, aucun abonnement.

## Frame 8 — Final / CTA

- scene: Le réseau IA converge, logo Free-IA-Integration, « AI Workspace Ready ». Terminal : prompt `> free-ai launch`, curseur qui clignote, puis fondu vers écran noir. Le lockup se dessine.
- voiceover: "Votre environnement IA vous attend. Configurez-le aujourd'hui. Free-IA-Integration."
- duration: 5.695s
- poster: 4s
- transition_in: zoom-through
- status: outline
- src: compositions/frames/08-final-cta.html
- type: cta
- persuasion: Urgency-to-act
- beat: motivation → inevitability
- blueprint: logo-assemble-lockup (Reproduce)
- asset_candidates: assets/faq-terminal.png — terminal premium (guest@shell.farid.tech, commandes .sh cliquables)
- focal: assets/faq-terminal.png
- roles: faq-terminal.png = supporting (source of the terminal look for the `> free-ai launch` pill; rebuilt clean, not shown flat) · backdrop = background (ink)
- sfx: bass-swell, keystroke, final-confirm-chime

Reproduce: elements clear, the lockup draws itself in, a push-through, resolving on the held mark + a typed command. Signature move = the mark assembling into the lockup. This is the only frame with a real exit (fade to black).
Scene 1 (0.0–2.2s): the constellation from F2 briefly **re-converges** (fast, motion-blurred inward) as the VO says "Votre environnement IA vous attend" — orbit collapses toward center (`center-outward-expansion` reversed) and blooms into the wordmark lockup (`logo-assemble-lockup`), ✱ coral spike lit. Centered.
Scene 2 (2.2–4.2s): as "Configurez-le aujourd'hui" lands, a mono **terminal pill** springs in beneath the lockup (`spring-pop-entrance`), `> free-ai launch` **types on** with a blinking caret (`discrete-text-sequence` + `context-sensitive-cursor`), one voltage glow behind it.
Scene 3 (4.2–6.165s): the VO lands "Free-IA-Integration"; the lockup holds dead-center, the caret keeps its finite blink, `ambient-glow-bloom` peaks then eases; the frame does its one real **exit** — a slow fade toward ink black on the final beat. Held, then dark.

narrativeRole: Clôt sur l'action — condense l'identité dans une commande à lancer. L'inévitabilité comme dernier beat.
keyMessage: Configurez votre environnement IA aujourd'hui.
