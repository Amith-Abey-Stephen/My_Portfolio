"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { featuredProjects } from "@/content/projects";
import type { Project } from "@/types";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { ProjectCard } from "@/components/cards/project-card";
import { Reveal } from "@/components/motion/reveal";

// Deck timing, in scroll-progress units (0 → 1).
const SLIDE = 0.34; // how long a card spends sliding in from the right
const LAST_LAND = 0.9; // last card is settled by here, then the row holds
const FADE = 0.05; // fade-in span as a card enters
const ENTER_X = "210%"; // parked off-screen to the right (% of card width)

// Centre-to-centre gap between cards, as a % of one card's width, for a row of
// `stage` cards. ≥100% leaves a visible gap; <100% overlaps. The first three
// read as a normal spaced row; each extra card tightens the row into a small
// overlap so all of them still fit the screen.
function pitchFor(stage: number) {
  if (stage <= 3) return 108; // spaced row — no overlap
  if (stage === 4) return 80; // 4th arrives: gaps close into a small overlap
  return 60; // 5th: row compresses so the outer cards keep the page margin
}

// Horizontal position (in % of card width) of card `i` when `stage` cards are
// on screen. The whole row stays centred, so adding a card nudges the earlier
// ones inward.
function slotX(i: number, stage: number) {
  return (i - (stage - 1) / 2) * pitchFor(stage);
}

function Header() {
  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <SectionHeading
        eyebrow="Selected Work"
        title="A few things I've built."
        lede="Most started as a small problem I couldn't stop thinking about."
      />
    </div>
  );
}

/**
 * One card in the horizontal row. It slides in from the right to its slot; then
 * each time a later card lands, the whole row re-centres a touch tighter, so
 * this card glides inward and the row goes from spaced (3 cards) to slightly
 * overlapping (5 cards). (docs 03: motion has purpose.)
 */
function DeckCard({
  progress,
  index,
  count,
  enters,
  lands,
  project,
}: {
  progress: MotionValue<number>;
  index: number;
  count: number;
  enters: number[];
  lands: number[];
  project: Project;
}) {
  // Keyframes: [enter] then a re-settle at every later card's landing.
  const inputs = [enters[index], ...lands.slice(index)];
  const positions = [
    ENTER_X,
    ...Array.from(
      { length: count - index },
      (_, k) => `${slotX(index, index + 1 + k)}%`,
    ),
  ];

  const x = useTransform(progress, inputs, positions);
  const opacity = useTransform(
    progress,
    [enters[index], enters[index] + FADE],
    [0, 1],
  );

  return (
    <motion.div
      style={{ x, opacity, zIndex: index }}
      className="absolute inset-0"
    >
      <ProjectCard
        project={project}
        className="h-full shadow-[0_24px_60px_-28px_rgba(0,0,0,0.75)]"
      />
    </motion.div>
  );
}

export function SelectedWork() {
  const reduceMotion = useReducedMotion();

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Smooth the raw scroll so the deal glides rather than snaps.
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Stagger the cards so they deal in one after another and overlap in motion.
  const count = featuredProjects.length;
  const step = count > 1 ? (LAST_LAND - SLIDE) / (count - 1) : 0;
  const enters = featuredProjects.map((_, k) => k * step);
  const lands = enters.map((e) => e + SLIDE);

  // Static fallback — reduced motion and small screens get the plain grid.
  const staticGrid = (
    <Section
      id={reduceMotion ? "work" : undefined}
      className={reduceMotion ? "scroll-mt-24" : "lg:hidden"}
    >
      <Header />
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08}>
            <ProjectCard project={project} className="h-full" />
          </Reveal>
        ))}
      </div>
    </Section>
  );

  if (reduceMotion) return staticGrid;

  return (
    <>
      {/* Desktop: pinned horizontal deal — a spaced row that tightens as cards land */}
      <section
        ref={ref}
        id="work"
        data-pin="work"
        className="relative hidden h-[260vh] scroll-mt-24 lg:block"
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <Container className="w-full">
            <Header />
            <div className="relative mx-auto mt-12 h-[26rem] w-[22rem] xl:w-[25rem]">
              {featuredProjects.map((project, i) => (
                <DeckCard
                  key={project.slug}
                  progress={progress}
                  index={i}
                  count={count}
                  enters={enters}
                  lands={lands}
                  project={project}
                />
              ))}
            </div>
          </Container>
        </div>
      </section>

      {/* Mobile: static grid */}
      {staticGrid}
    </>
  );
}
