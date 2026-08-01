"use client";

import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * The hero's living backdrop: a soft burgundy light that follows the cursor
 * across the dark space, plus a slow idle bloom so it breathes even when
 * still. On touch devices there's no cursor to follow, so the light wanders
 * on its own instead. Calm, not flashy (docs 03) — and off for reduced-motion.
 */
export function HeroAmbient() {
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(72);
  const my = useMotionValue(28);
  const sx = useSpring(mx, { stiffness: 40, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 40, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (reduceMotion) return;

    // No hover means no cursor to track — let the light wander instead.
    if (window.matchMedia("(hover: none)").matches) {
      const opts = { duration: 26, repeat: Infinity, ease: "easeInOut" as const };
      const ax = animate(mx, [72, 26, 58, 18, 72], opts);
      const ay = animate(my, [28, 58, 78, 36, 28], opts);
      return () => {
        ax.stop();
        ay.stop();
      };
    }

    function onMove(e: MouseEvent) {
      mx.set((e.clientX / window.innerWidth) * 100);
      my.set((e.clientY / window.innerHeight) * 100);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion, mx, my]);

  const glow = useMotionTemplate`radial-gradient(700px circle at ${sx}% ${sy}%, rgba(122,36,53,0.24), rgba(122,36,53,0.08) 32%, transparent 60%)`;

  return (
    <>
      {/* Cursor-tracked ambient light */}
      <motion.div
        aria-hidden
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0"
      />
      {/* Idle drifting bloom */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-8%] h-[520px] w-[520px] rounded-full bg-burgundy/10 blur-[130px]"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 40, -20, 0],
                y: [0, 30, 55, 0],
                opacity: [0.7, 1, 0.82, 0.7],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}
