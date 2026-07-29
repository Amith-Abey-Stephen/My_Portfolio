"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type TypewriterTextProps = {
  /** Phrases typed out and backspaced in sequence, looping. */
  items: readonly string[];
  className?: string;
  /** ms per character while typing. */
  typeMs?: number;
  /** ms per character while deleting. */
  deleteMs?: number;
  /** ms to hold a fully-typed phrase before backspacing. */
  holdMs?: number;
  /** ms to pause on empty before the next phrase. */
  gapMs?: number;
};

/**
 * A classic typewriter: types a phrase, holds, backspaces it, then moves to the
 * next — with a blinking caret. Renders the first phrase in full on the server
 * (SSR/SEO-safe) and stays static under reduced-motion.
 */
export function TypewriterText({
  items,
  className,
  typeMs = 65,
  deleteMs = 35,
  holdMs = 1500,
  gapMs = 450,
}: TypewriterTextProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(items[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion || items.length === 0) return;
    if (document.hidden) return;
    const word = items[index % items.length];

    // Fully typed → hold, then start deleting.
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(t);
    }
    // Fully deleted → pause, then advance to the next phrase.
    if (deleting && text === "") {
      const t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % items.length);
      }, gapMs);
      return () => clearTimeout(t);
    }
    // Otherwise, type or delete one character.
    const t = setTimeout(
      () =>
        setText((prev) =>
          deleting ? word.slice(0, prev.length - 1) : word.slice(0, prev.length + 1),
        ),
      deleting ? deleteMs : typeMs,
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, items, reduceMotion, typeMs, deleteMs, holdMs, gapMs]);

  return (
    <span
      className={cn("inline-flex items-baseline whitespace-nowrap", className)}
      aria-label={items[index % items.length]}
    >
      <span aria-hidden>{text}</span>
      <span
        aria-hidden
        className="caret-blink ml-[3px] inline-block h-[1.05em] w-[2px] translate-y-[0.14em] bg-current"
      />
    </span>
  );
}
