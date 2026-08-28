/**
 * BorderBeam — Faisceau lumineux néon rotatif qui longe les bordures d'un conteneur.
 *
 * @param {object} props
 * @param {string} [props.className] Classes supplémentaires
 * @param {number} [props.size=200] Taille du faisceau en pixels
 * @param {number} [props.duration=12] Durée de la rotation en secondes
 * @param {number} [props.borderWidth=1.5] Épaisseur de la bordure
 * @param {string} [props.colorFrom="#06b6d4"] Couleur de départ du dégradé
 * @param {string} [props.colorTo="#a855f7"] Couleur d'arrivée du dégradé
 * @param {number} [props.delay=0] Délai d'animation
 */
export default function BorderBeam({
  className = "",
  size = 220,
  duration = 10,
  borderWidth = 1.5,
  colorFrom = "#06b6d4",
  colorTo = "#a855f7",
  delay = 0,
}) {
  return (
    <div
      style={{
        "--size": size,
        "--duration": duration,
        "--delay": -delay,
        "--color-from": colorFrom,
        "--color-to": colorTo,
        "--border-width": borderWidth,
      }}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)] after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:calc(var(--delay)*1s)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--size)*0.5px)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))] ${className}`}
    />
  );
}
