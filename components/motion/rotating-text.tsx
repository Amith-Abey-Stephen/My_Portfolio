"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type RotatingTextProps = {
  /** Phrases cycled in place. The container reserves the widest one. */
  items: readonly string[];
  /** Time each phrase stays, in ms. */
  interval?: number;
  /** Classes applied to the visible phrase. */
  className?: string;
  /** Stable label read by screen readers (the animation is aria-hidden). */
  srText?: string;
};

/**
 * A single word that swaps itself on a timer — fade + subtle vertical travel,
 * same calm easing as the rest of the site (docs 02/03). Width is pinned to the
 * widest phrase via a stacked grid so surrounding text never reflows. Honours
 * reduced-motion (shows the first phrase, still) and pauses on a hidden tab.
 */
export function RotatingText({
  items,
  interval = 2600,
  className,
  srText,
}: RotatingTextProps) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || reduceMotion || items.length <= 1) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      setIndex((i) => (i + 1) % items.length);
    }, interval);
    return () => clearInterval(id);
  }, [mounted, items.length, interval, reduceMotion]);

  const active = items[index] ?? items[0];

  return (
    <span
      className={cn("relative inline-grid align-baseline", className)}
      role="text"
      aria-label={srText ?? items[0]}
    >
      {/* Invisible sizers — the grid cell grows to the widest phrase. */}
      {items.map((phrase) => (
        <span
          key={phrase}
          aria-hidden
          className="invisible whitespace-nowrap [grid-area:1/1]"
        >
          {phrase}
        </span>
      ))}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={active}
          aria-hidden
          initial={reduceMotion ? false : { opacity: 0, y: "0.22em" }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: "-0.22em" }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="whitespace-nowrap [grid-area:1/1]"
        >
          {active}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
