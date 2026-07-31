# Inventaire des assets — Free-IA-Integration

Assets réels capturés depuis free-ia-integration.netlify.app (haute résolution, device scale).
Inventaire canonique : choisir les `asset_candidates` du storyboard ici, ne pas parcourir `capture/assets/` en aveugle.

| Fichier | Dimensions | Contenu | Scène cible |
|---|---|---|---|
| `agent-router.png` | 1918×1078 | Console réelle AgentRouter (agentrouter.org/console/log) : tableau de logs — Time, Tokens, Group, Type, Model (claude-opus-4-6/4-8), Time/first word, Prompt, Completion. Latences visibles (2s, 3s, stream). Sidebar Dashboard/API Token/Usage log/Wallet. Preuve concrète du routage multi-modèles. | Scène 4 (workflow) |
| `faq-terminal.png` | 1431×626 | Terminal « La console des réponses », prompt `guest@shell.farid.tech:~$`, barre Loading 100%, 4 commandes cliquables : `./requirements.sh` (Prérequis), `./duration.sh` (Durée), `./latency.sh` (Latence & réseau), `./legality.sh` (Légalité). Look terminal sombre premium. | Scène 8 (final/CTA) |
| `testimonial-grace.png` | 897×387 | Carte témoignage recadrée serré : ★★★★★, citation Grâce D., nom « Grâce D. », rôle « Étudiante & Créatrice de projets », badge « Vérifié ». Fond carte sombre, glow discret. | Scène 6 (social proof) |
| `pricing.png` | 1431×811 | Section tarifs « Un investissement unique, un gain quotidien » : 2 cartes — Pack Standard (1 000 FCFA, « Idéal pour tester la méthode », bouton « Choisir le Pack Standard ») et Pack Pro (3 000 FCFA, badge « Le plus choisi », « Le choix de référence », glow turquoise marqué, bouton « Choisir Pro »). | Scène 7 (packs) |
| `hero.png` | 1025×615 | Hero du site : titre « Configurez votre environnement IA en moins de 30 minutes », sous-titre, CTA, fond réseau de nœuds turquoise. | Scène 5 (démo) / branding |

Note : la capture `demo.png` (lecteur vidéo) n'a pas été retenue — la vidéo Cloudinary ne s'était pas chargée (lecteur noir).
