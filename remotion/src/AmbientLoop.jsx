import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * AmbientLoop — Boucle d'ambiance « réseau neuronal IA » pour le fond du Hero.
 *
 * Esthétique alignée sur la charte du site (Linear/Apple, accent turquoise) :
 *  - fond nuit #030712 ;
 *  - un maillage de nœuds turquoise reliés par des liens fins (métaphore IA) ;
 *  - deux halos diffus qui dérivent lentement ;
 *  - grain très léger pour casser l'aplat « généré ».
 *
 * BOUCLAGE PARFAIT : tout le mouvement est piloté par des sinusoïdes dont la
 * période divise exactement la durée totale (`durationInFrames`). Ainsi la
 * dernière frame rejoint la première sans saut — la vidéo peut être lue en
 * boucle (`loop`) de façon invisible.
 *
 * Déterminisme : les positions de base des nœuds sont calculées par une petite
 * fonction pseudo-aléatoire à graine fixe (pas de `Math.random()` au rendu), ce
 * qui garantit un rendu identique à chaque export.
 */

/** Palette (identique aux tokens du site, thème sombre). */
const BG = "#030712";
const ACCENT = "56, 189, 248"; // --color-accent-rgb
const ACCENT_STRONG = "14, 165, 233"; // --color-accent-strong (0ea5e9)

/** Générateur pseudo-aléatoire déterministe (mulberry32) à graine fixe. */
function makeRng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Nombre de nœuds du maillage. */
const NODE_COUNT = 42;
/** Distance max (en px, sur base 1920×1080) pour relier deux nœuds. */
const LINK_DIST = 260;

/**
 * Pré-calcule les nœuds : position de base + paramètres d'oscillation.
 * Chaque nœud oscille avec une amplitude et une phase propres, mais sur un
 * nombre ENTIER de cycles sur la durée totale → bouclage parfait.
 */
function buildNodes(width, height) {
  const rng = makeRng(20260719);
  const nodes = [];
  for (let i = 0; i < NODE_COUNT; i += 1) {
    nodes.push({
      x: rng() * width,
      y: rng() * height,
      // 1 ou 2 cycles complets sur la boucle (entier → périodique).
      cyclesX: 1 + Math.floor(rng() * 2),
      cyclesY: 1 + Math.floor(rng() * 2),
      phaseX: rng() * Math.PI * 2,
      phaseY: rng() * Math.PI * 2,
      ampX: 18 + rng() * 46,
      ampY: 18 + rng() * 46,
      radius: 1.6 + rng() * 2.8,
      twinkleCycles: 2 + Math.floor(rng() * 3),
      twinklePhase: rng() * Math.PI * 2,
    });
  }
  return nodes;
}

export default function AmbientLoop() {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  // Progression normalisée [0,1) de la boucle.
  const p = frame / durationInFrames;
  const TAU = Math.PI * 2;

  // Positions courantes des nœuds (oscillation sinusoïdale périodique).
  const nodes = buildNodes(width, height);
  const pts = nodes.map((n) => {
    const x = n.x + Math.sin(TAU * n.cyclesX * p + n.phaseX) * n.ampX;
    const y = n.y + Math.cos(TAU * n.cyclesY * p + n.phaseY) * n.ampY;
    const twinkle =
      0.55 + 0.45 * Math.sin(TAU * n.twinkleCycles * p + n.twinklePhase);
    return { x, y, r: n.radius, twinkle };
  });

  // Liens : segments entre nœuds proches, opacité selon la distance.
  const links = [];
  for (let i = 0; i < pts.length; i += 1) {
    for (let j = i + 1; j < pts.length; j += 1) {
      const dx = pts[i].x - pts[j].x;
      const dy = pts[i].y - pts[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < LINK_DIST) {
        links.push({
          x1: pts[i].x,
          y1: pts[i].y,
          x2: pts[j].x,
          y2: pts[j].y,
          o: (1 - dist / LINK_DIST) * 0.5,
        });
      }
    }
  }

  // Halos diffus : deux orbes qui dérivent en cercle (périodique).
  const orb1x = width * 0.28 + Math.sin(TAU * p) * width * 0.05;
  const orb1y = height * 0.32 + Math.cos(TAU * p) * height * 0.06;
  const orb2x = width * 0.74 + Math.cos(TAU * p) * width * 0.04;
  const orb2y = height * 0.7 + Math.sin(TAU * p) * height * 0.05;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {/* Halos diffus (dérive lente) */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${orb1x}px ${orb1y}px, rgba(${ACCENT}, 0.20), transparent 45%), radial-gradient(circle at ${orb2x}px ${orb2y}px, rgba(${ACCENT_STRONG}, 0.16), transparent 48%)`,
        }}
      />

      {/* Maillage de nœuds + liens */}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: "absolute", inset: 0 }}
      >
        <g>
          {links.map((l, idx) => (
            <line
              key={`l${idx}`}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke={`rgba(${ACCENT}, ${l.o.toFixed(3)})`}
              strokeWidth={1}
            />
          ))}
        </g>
        <g>
          {pts.map((pt, idx) => (
            <circle
              key={`n${idx}`}
              cx={pt.x}
              cy={pt.y}
              r={pt.r}
              fill={`rgba(${ACCENT}, ${pt.twinkle.toFixed(3)})`}
            />
          ))}
        </g>
      </svg>

      {/* Vignette douce pour recentrer le regard (comme sur le site) */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 40%, transparent 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </AbsoluteFill>
  );
}
