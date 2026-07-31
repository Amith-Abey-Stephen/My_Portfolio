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
import { journey } from "@/content/journey";
import type { JourneyMilestone } from "@/types";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { JourneyTimeline } from "@/components/journey/journey-timeline";

function Heading() {
  return (
    <SectionHeading
      eyebrow="Journey"
      title="A path built by doing."
      lede="Roles, teams, and the communities that shaped how I build — newest first."
    />
  );
}

/**
 * One role on the conveyor: it rises from below to the centre, holds, then
 * lifts up and out — so roles arrive one at a time rather than all piling in.
 * Position/opacity are derived from the section's scroll progress.
 */
function ConveyorRole({
  item,
  index,
  count,
  progress,
  vp,
}: {
  item: JourneyMilestone;
  index: number;
  count: number;
  progress: MotionValue<number>;
  vp: number;
}) {
  const c = (index + 0.5) / count; // progress at which this role is centred
  const span = 1 / count; // how much scroll it owns

  const y = useTransform(
    progress,
    [c - span, c, c + span],
    [vp * 0.42, 0, -vp * 0.42],
  );
  const opacity = useTransform(
    progress,
    [c - span * 0.85, c - span * 0.3, c + span * 0.3, c + span * 0.85],
    [0, 1, 1, 0],
  );

  return (
    <motion.div
      style={{ y, opacity }}
      className="absolute inset-0 flex items-center"
    >
      <div className="w-full max-w-xl">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="font-mono text-xs text-muted">{item.period}</p>
          {item.current && (
            <span className="rounded-full border border-burgundy/30 bg-burgundy/10 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-burgundy-light">
              Now
            </span>
          )}
        </div>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          {item.role}
        </h3>
        <p className="mt-1 text-base font-medium text-burgundy-light">
          {item.organization}
        </p>
        <p className="mt-4 max-w-lg leading-relaxed text-secondary">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

/**
 * Journey. Desktop: the section pins; the heading sits to the left (and sinks
 * a little as you go) while the roles rise through the centre one at a time.
 * Mobile / reduced-motion: a plain stacked timeline. The standalone /journey
 * page was folded into this section.
 */
export function JourneyPreview() {
  const reduceMotion = useReducedMotion();

  const pinRef = useRef<HTMLDivElement>(null);
  const [vp, setVp] = useState(0);

  useEffect(() => {
    const measure = () => setVp(window.innerHeight);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 34,
    restDelta: 0.001,
  });
  const headingY = useTransform(progress, [0, 1], [0, vp * 0.32]);

  // Mobile / reduced-motion: a normal stacked layout.
  const stacked = (
    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Heading />
      </div>
      <JourneyTimeline items={journey} />
    </div>
  );

  if (reduceMotion) {
    return (
      <Section id="journey" className="scroll-mt-24">
        {stacked}
      </Section>
    );
  }

  return (
    <section id="journey" className="scroll-mt-24">
      {/* Desktop: pinned — roles rise through the centre one at a time */}
      <div ref={pinRef} className="relative hidden h-[360vh] lg:block">
        <div className="sticky top-0 h-screen overflow-hidden">
          <Container className="h-full">
            <div className="grid h-full grid-cols-[0.8fr_1.2fr] gap-16">
              <div className="flex h-full items-start pt-24 lg:pt-32">
                <motion.div style={{ y: headingY }}>
                  <Heading />
                </motion.div>
              </div>

              <div className="relative h-full">
                {journey.map((item, i) => (
                  <ConveyorRole
                    key={`${item.organization}-${item.period}`}
                    item={item}
                    index={i}
                    count={journey.length}
                    progress={progress}
                    vp={vp}
                  />
                ))}
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Mobile: static stacked timeline */}
      <div className="py-20 md:py-28 lg:hidden">
        <Container>{stacked}</Container>
      </div>
    </section>
  );
}
