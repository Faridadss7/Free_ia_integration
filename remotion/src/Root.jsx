import { Composition } from "remotion";
import AmbientLoop from "./AmbientLoop.jsx";

/**
 * Racine des compositions Remotion.
 *
 * Une seule composition : `AmbientLoop`, le fond d'ambiance du hero.
 * 1920×1080, 30 fps, 240 frames (8 s) — pensée pour boucler sans couture
 * (tous les mouvements sont sinusoïdaux calés sur la durée totale).
 */
export const RemotionRoot = () => {
  return (
    <Composition
      id="AmbientLoop"
      component={AmbientLoop}
      durationInFrames={240}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
