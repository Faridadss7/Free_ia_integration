# REPRISE — Film de lancement Free-IA-Integration (HyperFrames)

Session interrompue pour économiser les tokens. Tout le contexte nécessaire est ici.
**Pour reprendre : dire « reprends la vidéo Free-IA-Integration » dans une nouvelle session.**

## Comment reprendre (1re commande)
Charger le skill puis suivre le workflow product-launch-video à partir du **Step 3** :
```
/hyperframes   (puis il lira BRIEF.md et reprendra tout seul)
```
Le projet est dans `videos/free-ia-integration/`. `BRIEF.md` existe déjà → le workflow
NE re-pose AUCUNE question, il reprend directement.

## Ce qui est FAIT (Steps 0 → 2 du workflow product-launch-video)
- **Step 0 setup** : `npx hyperframes init "videos/free-ia-integration"` fait. `hyperframes.json` + `BRIEF.md` écrits.
- **BRIEF.md** verrouillé (racine du projet vidéo) : 8 scènes, charte, 2 packs, voix ElevenLabs masculine FR, 1920x1080, ~80s, mode autonomous (flow: automation, storyboard: no).
- **Step 1 capture** : assets réels du site rangés dans `capture/assets/` :
  - `agent-router.png` (1918×1078) → Scène 4 workflow (vraie console AgentRouter, logs/latences)
  - `faq-terminal.png` (1431×626) → Scène 8 final (terminal ./requirements.sh, ./duration.sh, ./latency.sh, ./legality.sh)
  - `testimonial-grace.png` (897×387) → Scène 6 (Grâce D., 5★, badge Vérifié)
  - `pricing.png` (1431×811) → Scène 7 (Pack Standard 1000 FCFA / Pack Pro 3000 FCFA)
  - `hero.png` (1025×615) → Scène 5 / branding
  - Inventaire canonique : `capture/extracted/asset-descriptions.md` (+ tokens.json, visible-text.txt)
- **Step 2 design system** : `frame.md` généré via `build-frame.mjs --preset code-editorial`, remixé sur la charte
  (ink #030712, accent #0ea5e9, tile-strong #38bdf8, JetBrains Mono pour terminal/code, Inter display).
  Caption skin dans `.hyperframes/caption-skin.html`. Préférence style_preset enregistrée.

## Ce qui RESTE (Steps 3 → 6)
- **Step 3 storyboard + script** : écrire `STORYBOARD.md` (8 frames) + `SCRIPT.md` (VO FR).
  → **MONTRER LE SCRIPT VO À FARID AVANT de générer l'audio** (coûte des crédits ElevenLabs). C'était l'étape en cours.
- **Step 3.1 audio** : `node <SKILL>/scripts/audio.mjs --provider elevenlabs --voice <id> ...` en arrière-plan.
- **Step 4** : design visuel de chaque frame dans STORYBOARD.md (shot sequences chronométrées).
- **Step 5** : fan-out — 1 sous-agent par scène (fichiers distincts, zéro conflit), écrit `compositions/frames/NN-*.html`. C'est LE moment du parallélisme voulu par Farid.
- **Step 6** : transitions, lint, check, snapshot, preview, render `renders/video.mp4`.

## AUDIO — ElevenLabs 100% opérationnel (déjà testé, 22 voix dispo)
- Clé dans `videos/free-ia-integration/.env` → `ELEVENLABS_API_KEY` (gitignored). ⚠️ Farid doit la RÉGÉNÉRER après (elle a transité par le chat).
- Python : lanceur **`py -3`** (Python 3.12.6). PAS `python`/`python3` (raccourci Store fantôme). Le pipeline gère ça via resolvePythonCommand → `py -3`.
- Paquet `elevenlabs` 2.59.0 installé (`py -m pip install elevenlabs`).
- **ffmpeg** : copié (avec ses DLLs) dans `C:\Users\Lenovo\ffmpeg-bin\` + ajouté au PATH utilisateur persistant (setx). ffmpeg n7.1 + ffprobe OK.
- Voix masculines FR candidates repérées : Charlie « Deep, Confident, Energetic » (IKne3meq5aSn9XLyUdCD), George « Warm » (JBFqnCBsd6RMkjVDRZzb), Roger (CwhRBWXzGAHq8TQ4Fs17). Choix final à confirmer avec Farid.
- Pour lancer audio.mjs : exporter `ELEVENLABS_API_KEY` (depuis .env) et `PATH=$PATH:/c/Users/Lenovo/ffmpeg-bin` dans le shell du process.

## Décisions prises avec Farid
- Logos officiels des outils tiers (Claude Code, Cursor, VS Code, Cline, Roo Code) AUTORISÉS par Farid (usage nominatif, sans sous-entendre un partenariat).
- 2 packs (pas 3) — fidèle au site réel.
- Voix : masculine, FR, pro, confiante, débit rapide (ElevenLabs).
- Parallélisme : OUI au Step 5 (1 agent/scène), PAS avant (fondation d'abord, sinon incohérence).
- Farid est pressé (« besoin tout à l'heure ») mais accepte un travail en plusieurs étapes validées.

## Charte exacte
fond #030712 · accent #38bdf8 · accent-strong #0ea5e9 · accent-soft #7dd3fc · blanc #f8fafc · surface #0B1220
Interdits : PowerPoint/Canva, texte défilant, zoom brutal, rebonds, RGB gaming, GIF, transitions génériques.
Règles : chaque seconde bouge · aucun écran statique · aucun texte sur fond neutre · caméra toujours en mouvement.

## Brief source
`brief-video-free-ia-integration.md` à la racine du repo (C:\Users\Lenovo\Downloads\Web site\).
Structure détaillée des 8 scènes aussi dans BRIEF.md § Notes.
