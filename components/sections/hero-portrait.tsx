"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { site } from "@/content/site";

/** The portrait with a gentle cursor parallax — the figure and its glow drift
 * on opposite axes for depth. Scrolling adds the same depth cue on touch
 * devices (no cursor): the figure lags the scroll while the glow sinks the
 * other way. Reduced-motion renders it static. */
export function HeroPortrait() {
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.5 });

  const px = useTransform(sx, [-1, 1], [-16, 16]);
  const py = useTransform(sy, [-1, 1], [-12, 12]);
  const gx = useTransform(sx, [-1, 1], [24, -24]);
  const gy = useTransform(sy, [-1, 1], [20, -20]);

  // Scroll parallax, scrubbed — composes with the cursor drift instead of
  // fighting it (the two sums live on the same y).
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 75%", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -44]);
  const glowDrift = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 40]);
  const figY = useTransform([py, drift], ([a, b]: number[]) => a + b);
  const glowY = useTransform([gy, glowDrift], ([a, b]: number[]) => a + b);

  useEffect(() => {
    if (reduceMotion) return;
    function onMove(e: MouseEvent) {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion, mx, my]);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto flex h-[400px] w-full max-w-md items-end justify-center sm:h-[480px] lg:h-[560px]"
    >
      {/* Ambient burgundy glow behind the figure (parallaxes opposite) */}
      <motion.div
        aria-hidden
        style={{ x: gx, y: glowY }}
        className="absolute left-1/2 top-4 ml-[-200px] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(122,36,53,0.4),transparent_65%)] blur-2xl"
      />
      <motion.div
        style={{ x: px, y: figY }}
        className="relative z-10 h-full will-change-transform"
      >
        {/* The PNG is a clean cut-out (transparent sides) but its bottom row is
            a hard, opaque slice through the torso. We feather that edge with a
            mask so the figure dissolves into the REAL background — whatever the
            cursor-lit ambient is doing behind it — instead of into a fixed
            colour, which would seam against the live glow. */}
        <Image
          src="/portrait.png"
          alt={`${site.author} — ${site.role}`}
          width={1065}
          height={1600}
          priority
          quality={75}
          sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 373px"
          className="h-full w-auto object-contain object-bottom [-webkit-mask-image:linear-gradient(to_top,transparent_0%,#000_28%)] [mask-image:linear-gradient(to_top,transparent_0%,#000_28%)]"
        />
      </motion.div>
    </div>
  );
}
