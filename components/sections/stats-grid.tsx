"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, useReducedMotion } from "framer-motion";
import { stats } from "@/content/community";
import { cn } from "@/lib/utils";

/**
 * A number that counts up from 0 → value when it enters view (docs: motion
 * has purpose). Respects reduced motion by showing the final value at once.
 */
function CountUp({
  value,
  start,
  delay = 0,
}: {
  value: string;
  start: boolean;
  delay?: number;
}) {
  const target = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  const reduceMotion = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!start) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setN(0);
      return;
    }
    if (reduceMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setN(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [start, target, delay, reduceMotion]);

  return (
    <>
      {n}
      {suffix}
    </>
  );
}

/** The community-impact stat grid, animated on scroll. */
export function StatsGrid({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border",
        className,
      )}
    >
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{
              duration: 0.6,
              delay: i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative flex h-full flex-col justify-between gap-6 overflow-hidden bg-surface p-6 md:p-8"
          >
            {/* Calm burgundy glow that answers to the cursor */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(122,36,53,0.14),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <Icon
              className="relative h-5 w-5 text-burgundy-light transition-transform duration-500 group-hover:scale-110"
              strokeWidth={1.5}
            />
            <div className="relative">
              <div className="font-heading text-4xl font-semibold tracking-tight text-foreground tabular-nums md:text-5xl">
                <CountUp value={stat.value} start={inView} delay={i * 0.12} />
              </div>
              <div className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-muted">
                {stat.label}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
