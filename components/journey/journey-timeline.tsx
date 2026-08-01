"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { JourneyMilestone } from "@/types";
import { cn } from "@/lib/utils";

/** The milestone visual — node, period, role, org, description. */
export function MilestoneBody({ item }: { item: JourneyMilestone }) {
  return (
    // Spacing lives on the <li> wrappers (which are actual siblings) — a
    // last:pb-0 here would match every item, since this div is always the
    // only child of its li.
    <div className="relative">
      <span
        className={cn(
          "absolute -left-[39px] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 md:-left-[47px]",
          item.current
            ? "border-burgundy bg-burgundy"
            : "border-border-strong bg-background",
        )}
        aria-hidden
      >
        {item.current && (
          <span className="absolute h-3.5 w-3.5 animate-ping rounded-full bg-burgundy/40" />
        )}
      </span>

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="font-mono text-xs text-muted">{item.period}</p>
        {item.current && (
          <span className="rounded-full border border-burgundy/30 bg-burgundy/10 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-burgundy-light">
            Now
          </span>
        )}
      </div>

      <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
        {item.role}
      </h3>
      <p className="text-sm font-medium text-burgundy-light">
        {item.organization}
      </p>
      <p className="mt-3 max-w-2xl leading-relaxed text-secondary">
        {item.description}
      </p>
    </div>
  );
}

/**
 * A milestone that slides up into place, driven by its own scroll position —
 * so as the heading stays pinned, the milestones arrive at the top one by one
 * as you scroll (and slide back on the way up). (docs 03: motion has purpose.)
 */
function ScrollMilestone({
  item,
  active,
}: {
  item: JourneyMilestone;
  active: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // From entering the bottom of the viewport to settling in the upper area.
    offset: ["start end", "start 40%"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });
  const y = useTransform(p, [0, 1], [70, 0]);
  const opacity = useTransform(p, [0, 0.55], [0, 1]);

  return (
    <motion.li
      ref={ref}
      style={active ? { y, opacity } : undefined}
      className="pb-12 last:pb-0"
    >
      <MilestoneBody item={item} />
    </motion.li>
  );
}

/** Vertical timeline whose milestones slide up one by one on scroll. */
export function JourneyTimeline({ items }: { items: JourneyMilestone[] }) {
  const reduceMotion = useReducedMotion();
  const active = !reduceMotion;

  return (
    <ol className="relative border-l border-border pl-8 md:pl-10">
      {items.map((item) => (
        <ScrollMilestone
          key={`${item.organization}-${item.period}`}
          item={item}
          active={active}
        />
      ))}
    </ol>
  );
}
