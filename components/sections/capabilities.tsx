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

const CARD_CLASS =
  "h-full basis-full md:basis-[calc(50%_-_0.75rem)] lg:basis-[calc((100%/3)_-_1rem)]";

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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

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
  const isMobile = useIsMobile();
  const s = SCATTER[index % SCATTER.length];

  // Desktop assembly transforms
  const start = index * 0.06;
  const range = [start, start + 0.55];

  const x = useTransform(progress, range, [s.x, 0]);
  const y = useTransform(progress, range, [s.y, 0]);
  const rotate = useTransform(progress, range, [s.r, 0]);
  const scale = useTransform(progress, range, [0.85, 1]);
  const opacity = useTransform(progress, [start, start + 0.12], [0, 1]);

  // Mobile scatter-assembly, scrubbed by the card's own scroll position — so
  // it reads at any flick speed and plays in reverse on the way back up.
  // (Every hook stays above the branch: an early return before them unmounts
  // the whole page when isMobile flips post-mount.)
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cardScrollY } = useScroll({
    target: cardRef,
    offset: ["start 105%", "start 70%"],
  });
  const cardP = useSpring(cardScrollY, {
    stiffness: 150,
    damping: 26,
    restDelta: 0.001,
  });
  const mOpacity = useTransform(cardP, [0, 0.85], [0, 1]);
  const mX = useTransform(cardP, [0, 1], [s.x * 0.35, 0]);
  const mY = useTransform(cardP, [0, 1], [44, 0]);
  const mRotate = useTransform(cardP, [0, 1], [s.r, 0]);
  const mScale = useTransform(cardP, [0, 1], [0.92, 1]);

  if (isMobile && active) {
    return (
      <motion.div
        ref={cardRef}
        style={{ opacity: mOpacity, x: mX, y: mY, rotate: mRotate, scale: mScale }}
        className={`${CARD_CLASS} will-change-transform`}
      >
        <CardBody group={group} />
      </motion.div>
    );
  }

  return (
    // ref stays attached here too — useScroll registers the target on first
    // render (pre-isMobile flip), and an unattached ref makes it throw.
    <motion.div
      ref={cardRef}
      style={active ? { x, y, rotate, scale, opacity } : undefined}
      className={CARD_CLASS}
    >
      <CardBody group={group} />
    </motion.div>
  );
}

export function Capabilities() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end 90%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.001,
  });

  const active = mounted && !reduceMotion;

  return (
    <Section
      id="capabilities"
      className="scroll-mt-24 overflow-x-clip border-t border-border"
    >
      <SectionHeading
        eyebrow="Capabilities"
        title="How I work, and what with."
        lede="Grouped by intent, not proficiency - the description matters more than the logo list."
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
