"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { featuredProjects, projects } from "@/content/projects";
import type { Project } from "@/types";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { ProjectCard } from "@/components/cards/project-card";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

// Deck timing, in scroll-progress units (0 → 1).
const SLIDE = 0.34;
const LAST_LAND = 0.9;
const FADE = 0.05;
const ENTER_X = "210%";

function pitchFor(stage: number) {
  if (stage <= 3) return 108;
  if (stage === 4) return 85;
  if (stage <= 6) return 64;
  return 48;
}

function slotX(i: number, stage: number) {
  return (i - (stage - 1) / 2) * pitchFor(stage);
}

function Header() {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <SectionHeading
        eyebrow="Selected Work"
        title="A few things I've built."
        lede="Most started as a small problem I couldn't stop thinking about."
      />
      <div className="flex-shrink-0">
        <Link
          href="/works"
          className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs text-foreground transition-all duration-200 hover:border-foreground hover:bg-elevated active:scale-[0.98]"
        >
          <span>View all works</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

/**
 * Final card in the deck: invites the user to explore the full catalog at /works.
 */
export function ViewAllWorksCard({ className }: { className?: string }) {
  return (
    <Link
      href="/works"
      aria-label="View all works — Explore complete archive of projects and systems"
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-card border border-border bg-gradient-to-b from-surface via-surface to-elevated/40 p-6 sm:p-7 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-foreground/30 active:-translate-y-1",
        className,
      )}
    >
      {/* Subtle ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/5 blur-3xl transition-opacity duration-500 group-hover:opacity-100 group-hover:bg-accent/10"
      />

      <div className="relative z-10">
        <div className="mb-5 flex items-start justify-between gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-input border border-border bg-elevated text-secondary transition-all duration-300 group-hover:border-foreground/40 group-hover:text-foreground">
            <Layers className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-elevated/80 px-2.5 py-0.5 font-mono text-[0.7rem] text-muted transition-colors group-hover:text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Full Catalog
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-muted">
          <span>{projects.length}+ Projects</span>
          <span aria-hidden>·</span>
          <span>Archive</span>
        </div>

        <h3 className="mt-2.5 flex items-center gap-1.5 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          <span>View all works now</span>
          <ArrowRight
            className="h-4 w-4 -translate-y-0.5 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground"
            aria-hidden
          />
        </h3>

        <p className="mt-2.5 text-sm leading-relaxed text-secondary">
          Explore the complete portfolio of SaaS platforms, custom client portfolios, developer tools, and IoT automation systems.
        </p>
      </div>

      <div className="relative z-10 mt-auto pt-6">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {["All Projects", "SaaS", "Portfolios", "IoT", "DevTools"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-surface/60 px-2.5 py-0.5 font-mono text-[0.72rem] text-muted transition-colors group-hover:border-border-strong group-hover:text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-input border border-border bg-elevated/70 px-4 py-3 text-sm font-medium text-foreground transition-all duration-300 group-hover:border-foreground/30 group-hover:bg-elevated">
          <span className="font-mono text-xs tracking-wide">Explore all {projects.length} projects</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

/**
 * Mobile: the deck reimagined for touch. Cards pile up beneath the nav as you
 * scroll — each newcomer slides over the last while the pile recedes, shrinking
 * and dimming under it. Sticky + scrubbed transforms only: native scroll, zero
 * touch trapping, fully reversible on the way back up.
 */
function StackCard({
  project,
  isViewAll,
  index,
  count,
  progress,
}: {
  project?: Project;
  isViewAll?: boolean;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  // From the moment the next card starts arriving, this one recedes into the
  // pile — deeper cards end smaller and darker.
  const depth = count - 1 - index;
  const scale = useTransform(progress, [index / count, 1], [1, 1 - depth * 0.045]);
  const dim = useTransform(
    progress,
    [index / count, 1],
    [0, Math.min(depth * 0.22, 0.6)],
  );

  return (
    <div
      className="sticky mb-[10vh] last:mb-0"
      style={{ top: `calc(5.5rem + ${index * 0.85}rem)` }}
    >
      <motion.div
        style={{ scale }}
        className="relative origin-top will-change-transform"
      >
        {isViewAll ? (
          <ViewAllWorksCard className="border-border/80 bg-surface shadow-[0_24px_60px_-28px_rgba(0,0,0,0.75)]" />
        ) : project ? (
          <ProjectCard
            project={project}
            className="border-border/80 bg-surface shadow-[0_24px_60px_-28px_rgba(0,0,0,0.75)]"
          />
        ) : null}
        <motion.div
          aria-hidden
          style={{ opacity: dim }}
          className="pointer-events-none absolute inset-0 rounded-card bg-background"
        />
      </motion.div>
    </div>
  );
}

function MobileDeck() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });
  const count = featuredProjects.length + 1;

  return (
    <div ref={ref} className="relative mt-10">
      {featuredProjects.map((project, i) => (
        <StackCard
          key={project.slug}
          project={project}
          index={i}
          count={count}
          progress={progress}
        />
      ))}
      <StackCard
        key="view-all-card"
        isViewAll
        index={featuredProjects.length}
        count={count}
        progress={progress}
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
  isViewAll,
}: {
  progress: MotionValue<number>;
  index: number;
  count: number;
  enters: number[];
  lands: number[];
  project?: Project;
  isViewAll?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
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
      style={{ x, opacity, zIndex: isHovered ? 40 : index }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="absolute inset-0 cursor-pointer"
    >
      {isViewAll ? (
        <ViewAllWorksCard className="h-full shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)] hover:border-border-strong hover:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.95)]" />
      ) : project ? (
        <ProjectCard
          project={project}
          className="h-full shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)] hover:border-border-strong hover:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.95)]"
        />
      ) : null}
    </motion.div>
  );
}

export function SelectedWork() {
  const reduceMotion = useReducedMotion();
  // Deck contains featured projects + 1 final card for "View all works"
  const count = featuredProjects.length + 1;

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
  const enters = Array.from({ length: count }, (_, k) => k * step);
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
            <div className="relative mx-auto mt-12 h-[28.5rem] w-[22.5rem] xl:h-[29.5rem] xl:w-[25.5rem]">
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
              <DeckCard
                key="view-all-works-card"
                progress={progress}
                index={featuredProjects.length}
                count={count}
                enters={enters}
                lands={lands}
                isViewAll
              />
            </div>
          </Container>
        </div>
      </section>

      {/* Mobile: sticky pile-up deck on native scroll (zero touch trapping);
          reduced-motion falls back to the plain revealed stack. */}
      <section className="py-12 lg:hidden">
        <Container>
          <Header />
          {reduceMotion ? (
            <div className="mt-10 flex flex-col gap-6">
              {featuredProjects.map((project, i) => (
                <Reveal key={project.slug} delay={i * 0.06}>
                  <ProjectCard
                    project={project}
                    className="h-full border-border/80 bg-surface/90 shadow-xl"
                  />
                </Reveal>
              ))}
              <Reveal delay={featuredProjects.length * 0.06}>
                <ViewAllWorksCard className="h-full border-border/80 bg-surface/90 shadow-xl" />
              </Reveal>
            </div>
          ) : (
            <MobileDeck />
          )}
        </Container>
      </section>
    </div>
  );
}
