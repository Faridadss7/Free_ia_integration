# Assets médias

Ce dossier est servi tel quel par Vite à la racine du site (ex. `public/assets/capture1.png`
est accessible via `/assets/capture1.png`).

Déposez ici les fichiers réels attendus par la landing page :

| Fichier            | Utilisé par          | Rôle                                              |
| ------------------ | -------------------- | ------------------------------------------------- |
| `capture1.png`     | `DemoSection.jsx`    | Poster d'attente de la vidéo (hébergée sur Cloudinary). |
| `capture1.png` … `capture5.png` | `ScreenshotGrid.jsx` | Les 5 captures de la Bento Grid de preuves.       |

> La vidéo de démonstration n'est plus hébergée localement : elle est servie
> depuis Cloudinary directement dans `DemoSection.jsx`.

Tant que les fichiers ne sont pas présents, les composants affichent un
placeholder dégradé élégant (aucune image cassée / 404 visible).

Formats recommandés :
- Vidéo : MP4 (H.264), < 8 Mo, muette, ~1280×800.
- Captures : PNG ou WebP, ratio 16:10, fond sombre pour rester cohérent.
