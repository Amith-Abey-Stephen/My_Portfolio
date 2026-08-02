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
const SLIDE = 0.34;
const LAST_LAND = 0.9;
const FADE = 0.05;
const ENTER_X = "210%";

function pitchFor(stage: number) {
  if (stage <= 3) return 108;
  if (stage === 4) return 80;
  return 60;
}

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
  const count = featuredProjects.length;

  // Desktop: pinned 3D horizontal deal stage
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

  const step = count > 1 ? (LAST_LAND - SLIDE) / (count - 1) : 0;
  const enters = featuredProjects.map((_, k) => k * step);
  const lands = enters.map((e) => e + SLIDE);

  return (
    <div id="work" className="scroll-mt-24">
      {/* Desktop: pinned 3D horizontal deal stage */}
      <section
        ref={ref}
        data-pin="work"
        className="relative hidden h-[260vh] lg:block"
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

      {/* Mobile: Uninterrupted Natural Vertical Scroll Flow (Zero Touch Trapping) */}
      <section className="py-12 lg:hidden">
        <Container>
          <Header />
          <div className="mt-10 flex flex-col gap-6">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.06}>
                <ProjectCard
                  project={project}
                  className="h-full border-border/80 bg-surface/90 shadow-xl"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
