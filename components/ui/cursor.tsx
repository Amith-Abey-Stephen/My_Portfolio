"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type Mode = "default" | "hover" | "text";

// Elements that make the ring swell + fill (clickable), and text fields that
// hand back the native I-beam. Kept in sync with the CSS in globals.css.
const INTERACTIVE =
  'a, button, [role="button"], label, summary, select, [data-cursor="hover"]';
const TEXT_FIELD =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]';

/**
 * A custom pointer: a precise ivory dot at the exact cursor position, plus a
 * larger ring that trails behind on a spring and swells + fills burgundy over
 * interactive elements. The native cursor is hidden while active (see
 * globals.css), and text fields keep their I-beam. Fine-pointer (mouse) only
 * and off for reduced-motion — touch and keyboard users get the normal cursor.
 * (docs 03: motion has purpose.)
 */
export function Cursor() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  // Exact pointer position drives the dot; the ring lags via a spring.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 180, damping: 20, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 180, damping: 20, mass: 0.5 });

  // Enable only on a fine pointer (mouse) with motion allowed.
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setActive(mq.matches && !reduceMotion);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduceMotion]);

  useEffect(() => {
    if (!active) return;
    const root = document.documentElement;
    root.dataset.customCursor = "";

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t?.closest) return;
      if (t.closest(TEXT_FIELD)) setMode("text");
      else if (t.closest(INTERACTIVE)) setMode("hover");
      else setMode("default");
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      delete root.dataset.customCursor;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [active, x, y]);

  if (!active) return null;

  const hidden = mode === "text" || !visible;

  return (
    <>
      {/* Trailing ring — spring-lagged position, swells + fills on hover */}
      <motion.div
        aria-hidden
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
      >
        <motion.div
          className="-ml-4 -mt-4 h-8 w-8 rounded-full border"
          initial={false}
          animate={{
            scale: hidden ? 0.5 : mode === "hover" ? 2.2 : pressed ? 0.85 : 1,
            opacity: hidden ? 0 : 1,
            backgroundColor:
              mode === "hover" ? "rgba(122,36,53,0.18)" : "rgba(122,36,53,0)",
            borderColor:
              mode === "hover"
                ? "rgba(131,93,115,0.9)"
                : "rgba(248,248,247,0.35)",
          }}
          transition={{
            scale: { type: "spring", stiffness: 260, damping: 20 },
            default: { duration: 0.2, ease: "easeOut" },
          }}
        />
      </motion.div>

      {/* Exact dot — sits at the true pointer position */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
      >
        <motion.div
          className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-foreground"
          initial={false}
          animate={{ opacity: hidden ? 0 : 1, scale: pressed ? 0.7 : 1 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      </motion.div>
    </>
  );
}
