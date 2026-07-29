"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A thin burgundy bar that fills as you read (scroll-linked). */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-burgundy"
      aria-hidden
    />
  );
}
