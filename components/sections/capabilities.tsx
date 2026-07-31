"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { capabilities } from "@/content/capabilities";
import type { CapabilityGroup } from "@/types";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { RepelCard } from "@/components/ui/repel-card";

// Each card's basis fills one column so full rows stay flush, but a lone last
// card centres instead of hugging the left.
const CARD_CLASS =
  "h-full basis-full md:basis-[calc(50%_-_0.75rem)] lg:basis-[calc((100%/3)_-_1rem)]";

// Where each card starts before it gathers into its grid slot — offset from the
// sides/below with a slight tilt, so they read as scattered and then assemble
// (TRIONN-style). Indexed 1:1 with the seven capability groups.
const SCATTER = [
  { x: -190, y: 70, r: -9 },
  { x: 170, y: 120, r: 8 },
  { x: 210, y: 60, r: 11 },
  { x: -150, y: 150, r: -7 },
  { x: 120, y: 170, r: 9 },
  { x: -110, y: 110, r: -11 },
  { x: 60, y: 190, r: 5 },
];

function CardBody({ group }: { group: CapabilityGroup }) {
  const Icon = group.icon;
  return (
    <RepelCard>
      <span className="relative flex h-12 w-12 items-center justify-center rounded-input border border-border bg-elevated text-burgundy-light transition-transform duration-300 ease-out group-hover:scale-110">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <h3 className="relative mt-6 text-xl font-semibold tracking-tight text-foreground">
        {group.title}
      </h3>
      <p className="relative mt-3 flex-1 leading-relaxed text-secondary">
        {group.summary}
      </p>
      <ul className="relative mt-6 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted transition-colors duration-300 group-hover:border-border-strong group-hover:text-secondary"
          >
            {item}
          </li>
        ))}
      </ul>
    </RepelCard>
  );
}

/**
 * A capability card that starts scattered (offset + tilted) and gathers into
 * its grid slot as the section scrolls in, staggered by position — so the page
 * doesn't go dead after the Journey timeline. (docs 03: motion has purpose.)
 */
function ScrollCard({
  group,
  index,
  progress,
  active,
}: {
  group: CapabilityGroup;
  index: number;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const s = SCATTER[index % SCATTER.length];
  const start = index * 0.06;
  const range = [start, start + 0.55];

  const x = useTransform(progress, range, [s.x, 0]);
  const y = useTransform(progress, range, [s.y, 0]);
  const rotate = useTransform(progress, range, [s.r, 0]);
  const scale = useTransform(progress, range, [0.85, 1]);
  const opacity = useTransform(progress, [start, start + 0.12], [0, 1]);

  return (
    <motion.div
      style={active ? { x, y, rotate, scale, opacity } : undefined}
      className={CARD_CLASS}
    >
      <CardBody group={group} />
    </motion.div>
  );
}

/** Capabilities — grouped by intent, not skill bars (docs 04). A landing section. */
export function Capabilities() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // The window the cards gather over (scroll down) and scatter/split over (scroll
    // up). Completing at "end 90%" — when the bottom card reaches near the base —
    // ensures that on reverse scroll (scrolling back up), cards start splitting right as
    // the bottom card hits or gets close to the base of the viewport.
    offset: ["start end", "end 90%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.001,
  });

  const active = mounted && !reduceMotion;

  return (
    <Section id="capabilities" className="scroll-mt-24 border-t border-border">
      <SectionHeading
        eyebrow="Capabilities"
        title="How I work, and what with."
        lede="Grouped by intent, not proficiency — the description matters more than the logo list."
        className="mb-14"
      />

      <div ref={ref} className="flex flex-wrap justify-center gap-6">
        {capabilities.map((group, i) => (
          <ScrollCard
            key={group.title}
            group={group}
            index={i}
            progress={progress}
            active={active}
          />
        ))}
      </div>
    </Section>
  );
}
