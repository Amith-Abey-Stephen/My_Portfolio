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
import { featuredProjects } from "@/content/projects";
import type { Project } from "@/types";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { ProjectCard } from "@/components/cards/project-card";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

function Header() {
  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <SectionHeading
        eyebrow="Selected Work"
        title="A few things I've built."
        lede="Most started as a small problem I couldn't stop thinking about."
      />
      <ButtonLink href="/work" variant="ghost" className="shrink-0">
        All work
        <ArrowRight className="h-4 w-4" />
      </ButtonLink>
    </div>
  );
}

/**
 * One card that slides in from off-screen-right into its placed position,
 * driven by scroll progress. Cards are staggered so they land in sequence.
 */
function SlideInCard({
  progress,
  index,
  count,
  project,
  active,
}: {
  progress: MotionValue<number>;
  index: number;
  count: number;
  project: Project;
  active: boolean;
}) {
  // Each card animates within its own slice of the scroll, but they overlap
  // so the motion feels continuous (deal-the-cards cascade). The last card
  // lands around 90% so there's only a brief hold before the pin releases.
  const start = index * (0.6 / count);
  const end = start + 0.5;
  // Left-most cards begin further right so every card enters from the edge.
  const startX = 108 - index * (72 / count);

  const x = useTransform(progress, [start, end], [`${startX}vw`, "0vw"]);
  const opacity = useTransform(progress, [start, start + 0.08], [0, 1]);

  // Before mount (SSR / no-JS), render placed so the section is never empty.
  return (
    <motion.div style={active ? { x, opacity } : undefined} className="flex-1">
      <ProjectCard project={project} className="h-full" />
    </motion.div>
  );
}

export function SelectedWork() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Smooth the raw scroll for buttery, calm motion (docs: motion has purpose).
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Static fallback — reduced motion and small screens get the plain grid.
  const staticGrid = (
    <Section id="work" className={reduceMotion ? undefined : "lg:hidden"}>
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
      {/* Desktop: pinned, scroll-driven slide-in */}
      <section
        ref={ref}
        data-pin="work"
        className="relative hidden h-[240vh] lg:block"
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <Container className="w-full">
            <Header />
            <div className="mt-14 flex gap-6">
              {featuredProjects.map((project, i) => (
                <SlideInCard
                  key={project.slug}
                  progress={progress}
                  index={i}
                  count={featuredProjects.length}
                  project={project}
                  active={mounted}
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
