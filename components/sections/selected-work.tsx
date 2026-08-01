"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
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
import { cn } from "@/lib/utils";

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

// The mobile card width — must stay in sync between the card class below and
// the conveyor's translate calc.
const MOBILE_CARD_W = "min(82vw,340px)";

/**
 * One card on the mobile conveyor: full opacity and scale while centred,
 * dimmed and slightly shrunk while waiting in the wings.
 */
function MobileDeckCard({
  project,
  index,
  t,
}: {
  project: Project;
  index: number;
  t: MotionValue<number>;
}) {
  const opacity = useTransform(t, [index - 1, index, index + 1], [0.45, 1, 0.45]);
  const scale = useTransform(t, [index - 1, index, index + 1], [0.94, 1, 0.94]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="w-[82vw] max-w-[340px] shrink-0"
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

  // Desktop: pinned horizontal deal.
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
  const step = count > 1 ? (LAST_LAND - SLIDE) / (count - 1) : 0;
  const enters = featuredProjects.map((_, k) => k * step);
  const lands = enters.map((e) => e + SLIDE);

  // Mobile: the same idea, adapted — the section pins and vertical scroll
  // scrubs the card row horizontally through the centre, then the page
  // continues. `t` is the fractional index of the centred card (0 → count-1).
  const mobileRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mobileScrollY } = useScroll({
    target: mobileRef,
    offset: ["start start", "end end"],
  });
  const mobileProgress = useSpring(mobileScrollY, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const t = useTransform(mobileProgress, [0.06, LAST_LAND], [0, count - 1]);
  // CSS-calc translate keeps the pitch correct at every viewport width with no
  // JS measurement: one card width + the 16px flex gap per index step.
  const rowTransform = useMotionTemplate`translateX(calc(${t} * ((${MOBILE_CARD_W} + 16px) * -1)))`;

  const [activeCard, setActiveCard] = useState(0);
  useEffect(() => {
    const unsubscribe = t.on("change", (v) => {
      setActiveCard(Math.round(Math.min(count - 1, Math.max(0, v))));
    });
    return () => unsubscribe();
  }, [t, count]);

  const scrollToCard = (idx: number) => {
    const el = mobileRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const p =
      count > 1 ? 0.06 + (idx / (count - 1)) * (LAST_LAND - 0.06) : 0;
    window.scrollTo({
      top: top + p * (el.offsetHeight - window.innerHeight),
      behavior: "smooth",
    });
  };

  // Reduced motion (any viewport): a plain swipeable snap row, no pinning.
  if (reduceMotion) {
    return (
      <Section id="work" className="scroll-mt-24">
        <Header />
        <div className="-mx-6 mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-6 pt-2">
          {featuredProjects.map((project, i) => (
            <div
              key={project.slug}
              className="w-[85vw] max-w-[320px] shrink-0 snap-center"
            >
              <Reveal delay={i * 0.05}>
                <ProjectCard
                  project={project}
                  className="h-full border-border/80 bg-surface/80 shadow-xl"
                />
              </Reveal>
            </div>
          ))}
        </div>
      </Section>
    );
  }

  return (
    // The anchor lives on this wrapper so "/#work" resolves on every viewport —
    // the pinned decks inside are display:none off their breakpoints and can't
    // be scrolled to.
    <div id="work" className="scroll-mt-24">
      {/* Desktop: pinned horizontal deal — a spaced row that tightens as cards land */}
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

      {/* Mobile: pinned conveyor — scrolling down slides the cards through, then
          the page carries on. Lede omitted so the pinned stage fits short phones. */}
      <section
        ref={mobileRef}
        data-pin="work-mobile"
        className="relative lg:hidden"
        style={{ height: `${100 + (count - 1) * 45}vh` }}
      >
        <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden">
          <Container className="w-full">
            <SectionHeading
              eyebrow="Selected Work"
              title="A few things I've built."
            />
          </Container>

          <motion.div
            style={{ transform: rowTransform }}
            className="mt-8 flex gap-4 pl-[calc((100vw-min(82vw,340px))/2)]"
          >
            {featuredProjects.map((project, i) => (
              <MobileDeckCard
                key={project.slug}
                project={project}
                index={i}
                t={t}
              />
            ))}
          </motion.div>

          {/* Tappable progress dots */}
          <div className="mt-7 flex items-center justify-center gap-1">
            {featuredProjects.map((project, i) => (
              <button
                key={project.slug}
                onClick={() => scrollToCard(i)}
                aria-label={`Go to ${project.title}`}
                className="flex h-8 w-7 items-center justify-center"
              >
                <span
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === activeCard ? "w-6 bg-burgundy-light" : "w-2 bg-border",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
