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

  // Mobile: Buttery smooth GPU-accelerated viewport entrance (zero JS scroll-loop overhead)
  if (isMobile && active) {
    return (
      <motion.div
        initial={{ opacity: 0, x: s.x * 0.3, y: 35, rotate: s.r, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
        viewport={{ once: false, margin: "-40px" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`${CARD_CLASS} will-change-transform`}
      >
        <CardBody group={group} />
      </motion.div>
    );
  }

  return (
    <motion.div
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
