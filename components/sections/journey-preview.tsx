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
import { ArrowRight } from "lucide-react";
import { journey } from "@/content/journey";
import type { JourneyMilestone } from "@/types";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Timeline } from "@/components/journey/timeline";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const items = journey.slice(0, 4);

function Header() {
  return (
    <div>
      <SectionHeading
        eyebrow="Journey"
        title="A path built by doing."
        lede="From student communities to product teams — the short version."
      />
      <Reveal delay={0.1}>
        <ButtonLink href="/journey" variant="ghost" className="mt-6 -ml-2">
          Full journey
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </Reveal>
    </div>
  );
}

/** The inner markup of a milestone (shared shape with the static Timeline). */
function MilestoneBody({ item }: { item: JourneyMilestone }) {
  return (
    <div className="relative pb-10 last:pb-0">
      <span
        className={cn(
          "absolute -left-[41px] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 md:-left-[49px]",
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

/** A milestone that rises from below into its slot, driven by scroll. */
function ScrollMilestone({
  item,
  index,
  count,
  progress,
  active,
}: {
  item: JourneyMilestone;
  index: number;
  count: number;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const start = index * (0.55 / count);
  const end = start + 0.42;
  const y = useTransform(progress, [start, end], [110, 0]);
  const opacity = useTransform(progress, [start, start + 0.12], [0, 1]);

  return (
    <motion.li style={active ? { y, opacity } : undefined}>
      <MilestoneBody item={item} />
    </motion.li>
  );
}

export function JourneyPreview() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  // The connecting line draws down as the milestones land.
  const lineScale = useTransform(progress, [0, 0.85], [0, 1]);

  const staticVersion = (
    <Section id="journey" className={reduceMotion ? undefined : "lg:hidden"}>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Header />
        </div>
        <Timeline items={items} />
      </div>
    </Section>
  );

  if (reduceMotion) return staticVersion;

  return (
    <>
      {/* Desktop: pinned, scroll-driven rise-in */}
      <section
        ref={ref}
        data-pin="journey"
        className="relative hidden h-[220vh] lg:block"
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <Container className="w-full">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <Header />
              </div>
              <ol className="relative pl-8 md:pl-10">
                <motion.span
                  aria-hidden
                  style={{ scaleY: mounted ? lineScale : 1 }}
                  className="absolute inset-y-1 left-0 w-px origin-top bg-border"
                />
                {items.map((item, i) => (
                  <ScrollMilestone
                    key={`${item.organization}-${item.period}`}
                    item={item}
                    index={i}
                    count={items.length}
                    progress={progress}
                    active={mounted}
                  />
                ))}
              </ol>
            </div>
          </Container>
        </div>
      </section>

      {/* Mobile: static timeline */}
      {staticVersion}
    </>
  );
}
