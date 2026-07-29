"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

const RADIUS = 300; // how near the cursor must get (px from card centre)
const MAX_PUSH = 120; // how far the card blasts away (px)

/**
 * A card that recoils from the cursor — as the pointer approaches it springs
 * away in the opposite direction and lights up with a burgundy halo, then
 * settles back once the cursor leaves. Disabled for reduced-motion.
 */
export function RepelCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useSpring(0, { stiffness: 170, damping: 13, mass: 0.4 });
  const y = useSpring(0, { stiffness: 170, damping: 13, mass: 0.4 });
  const glow = useSpring(0, { stiffness: 140, damping: 22 });

  const shadowAlpha = useTransform(glow, [0, 1], [0, 0.45]);
  const boxShadow = useMotionTemplate`0 10px 44px rgba(122, 36, 53, ${shadowAlpha})`;
  // Lift the reacting card above its neighbours while it's displaced.
  const zIndex = useTransform(glow, (g) => (g > 0.01 ? 10 : 0));

  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;

    function onMove(e: MouseEvent) {
      const px = e.clientX;
      const py = e.clientY;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Rest centre = current rect minus the transform we've applied.
        const cx = rect.left + rect.width / 2 - x.get();
        const cy = rect.top + rect.height / 2 - y.get();
        const dx = px - cx;
        const dy = py - cy;
        const dist = Math.hypot(dx, dy) || 1;

        if (dist < RADIUS) {
          const force = Math.pow(1 - dist / RADIUS, 1.1);
          x.set(-(dx / dist) * force * MAX_PUSH);
          y.set(-(dy / dist) * force * MAX_PUSH);
          glow.set(force);
        } else {
          x.set(0);
          y.set(0);
          glow.set(0);
        }
      });
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion, x, y, glow]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y, boxShadow, zIndex }}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface p-8 will-change-transform",
        className,
      )}
    >
      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(122,36,53,0.20),transparent_70%)]"
      />
      {children}
    </motion.div>
  );
}
