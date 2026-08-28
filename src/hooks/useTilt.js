import { useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * useTilt — Hook d'inclinaison 3D réactive au curseur style Aceternity / Stripe.
 */
export default function useTilt({ maxTilt = 8 } = {}) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { stiffness: 350, damping: 25 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [0, 1], [-maxTilt, maxTilt]);

  const onPointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
  };

  const onPointerLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return {
    style: {
      rotateX,
      rotateY,
      transformStyle: "preserve-3d",
    },
    onPointerMove,
    onPointerLeave,
  };
}
