import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AmbientPointer() {
  const reduceMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const smoothX = useSpring(x, { stiffness: 120, damping: 24, mass: 0.35 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 24, mass: 0.35 });

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    const sync = () => setFinePointer(media.matches);
    sync();
    media.addEventListener?.('change', sync);

    const move = (event: PointerEvent) => {
      x.set(event.clientX - 210);
      y.set(event.clientY - 210);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      media.removeEventListener?.('change', sync);
      window.removeEventListener('pointermove', move);
    };
  }, [x, y]);

  if (!finePointer || reduceMotion) return null;

  return (
    <motion.div
      className="vg-pointer-aura"
      aria-hidden="true"
      style={{ x: smoothX, y: smoothY }}
    />
  );
}
