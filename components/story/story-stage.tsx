"use client";

import { useRef, useState, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  Sparkles,
  Terminal,
  Cpu,
  Globe,
  Rocket,
  Users,
  Boxes,
  Wrench,
  Compass,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { StoryChapter } from "@/types";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

const CHAPTER_METADATA: Record<
  string,
  { icon: React.ElementType; tag: string; glow: string }
> = {
  "01": {
    icon: Sparkles,
    tag: "Kristu Jyoti",
    glow: "radial-gradient(circle at 50% 40%,rgba(217,119,6,0.15),transparent_60%)",
  },
  "02": {
    icon: Terminal,
    tag: "Figma & Design",
    glow: "radial-gradient(circle at 50% 40%,rgba(14,165,233,0.15),transparent_60%)",
  },
  "03": {
    icon: Globe,
    tag: "The Open Web",
    glow: "radial-gradient(circle at 50% 40%,rgba(99,102,241,0.15),transparent_60%)",
  },
  "04": {
    icon: Cpu,
    tag: "IoT Tinkering",
    glow: "radial-gradient(circle at 50% 40%,rgba(16,185,129,0.15),transparent_60%)",
  },
  "05": {
    icon: Rocket,
    tag: "Inovus CEO",
    glow: "radial-gradient(circle at 50% 40%,rgba(122,36,53,0.22),transparent_60%)",
  },
  "06": {
    icon: Users,
    tag: "Mentors & Growth",
    glow: "radial-gradient(circle at 50% 40%,rgba(249,115,22,0.15),transparent_60%)",
  },
  "07": {
    icon: Boxes,
    tag: "μLearn Foundation",
    glow: "radial-gradient(circle at 50% 40%,rgba(6,182,212,0.15),transparent_60%)",
  },
  "08": {
    icon: Wrench,
    tag: "Google & AI",
    glow: "radial-gradient(circle at 50% 40%,rgba(168,85,247,0.15),transparent_60%)",
  },
  "09": {
    icon: Compass,
    tag: "Full-Stack Craft",
    glow: "radial-gradient(circle at 50% 40%,rgba(122,36,53,0.22),transparent_60%)",
  },
  "10": {
    icon: Sparkles,
    tag: "What's Next",
    glow: "radial-gradient(circle at 50% 40%,rgba(236,72,153,0.15),transparent_60%)",
  },
};

/**
  * Single Stage Card:
  * Arrives from below (tilted + offset), locks into center stage for reading,
  * then lifts up and away as the user scrolls past.
  */
function StageCard({
  chapter,
  index,
  count,
  progress,
}: {
  chapter: StoryChapter;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const meta = CHAPTER_METADATA[chapter.index] || {
    icon: BookOpen,
    tag: "Chapter",
    glow: "",
  };
  const Icon = meta.icon;

  // Keyframes for physical card stack depth:
  // 1. Entry: card slides up from below to dock on top of the stack.
  // 2. Active: card rests at scale 1, y: 0.
  // 3. Recede: as subsequent cards land on top, this card recedes into stack depth (y: -18px, scale: 0.95).
  // 4. Reverse scroll: as cards slide off, this card steps forward out of stack depth.
  const step = 1 / count;
  const start = index === 0 ? 0 : (index - 0.75) * step;
  const land = index === 0 ? 0 : index * step;
  const recede1 = (index + 0.75) * step;
  const recede2 = (index + 1.5) * step;

  const inputs =
    index === 0 ? [0, recede1, recede2] : [start, land, recede1, recede2];

  const y = useTransform(
    progress,
    inputs,
    index === 0 ? [0, -18, -36] : [180, 0, -18, -36],
  );

  const rotate = useTransform(
    progress,
    inputs,
    index === 0 ? [0, -2, -4] : [7, 0, -2, -4],
  );

  const scale = useTransform(
    progress,
    inputs,
    index === 0 ? [1, 0.95, 0.9] : [0.94, 1, 0.95, 0.9],
  );

  const opacity = useTransform(
    progress,
    inputs,
    index === 0 ? [1, 0.65, 0] : [0, 1, 0.65, 0],
  );

  return (
    <motion.div
      style={{ y, rotate, scale, opacity, zIndex: index + 1 }}
      className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-card border border-border/90 bg-surface/95 p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl md:p-12">
        {/* Top Accent Light Bar */}
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-burgundy/60 to-transparent"
        />

        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-input border border-burgundy/40 bg-burgundy/10 text-burgundy-light">
              <Icon className="h-5 w-5" />
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-muted">
              Chapter {chapter.index} of {String(count).padStart(2, "0")}
            </span>
          </div>

          <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs uppercase tracking-wider text-burgundy-light shadow-xs">
            {meta.tag}
          </span>
        </div>

        {/* Chapter Title */}
        <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {chapter.title}
        </h2>

        {/* Body Content */}
        <div className="mt-6 space-y-4">
          {chapter.body.map((para, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-secondary md:text-lg"
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function StoryStage({ chapters }: { chapters: StoryChapter[] }) {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  // Which way the mobile card animates (1 = forward, -1 = back).
  const [direction, setDirection] = useState(1);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const pinRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001,
  });

  // Track active chapter for the timeline indicator. Desktop only: on mobile
  // the pinned deck is display:none, so its scroll progress is meaningless and
  // would clobber the carousel's manually chosen chapter.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const unsubscribe = progress.on("change", (latest) => {
      if (!desktop.matches) return;
      const idx = Math.min(
        chapters.length - 1,
        Math.max(0, Math.floor(latest * chapters.length)),
      );
      setActiveChapterIndex(idx);
    });
    return () => unsubscribe();
  }, [progress, chapters.length]);

  const activeChapter = chapters[activeChapterIndex] || chapters[0];
  const activeMeta = CHAPTER_METADATA[activeChapter.index] || {
    icon: BookOpen,
    glow: "",
    tag: "",
  };
  const ActiveIcon = activeMeta.icon ?? BookOpen;

  // Mobile carousel navigation — remembers travel direction for the animation.
  const goToChapter = (idx: number) => {
    const clamped = Math.min(chapters.length - 1, Math.max(0, idx));
    if (clamped === activeChapterIndex) return;
    setDirection(clamped > activeChapterIndex ? 1 : -1);
    setActiveChapterIndex(clamped);
  };

  const scrollToSectionIndex = (idx: number) => {
    if (!pinRef.current) return;
    const rect = pinRef.current.getBoundingClientRect();
    const scrollY = window.scrollY + rect.top;
    const targetScroll = scrollY + (idx / chapters.length) * rect.height;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  // Mobile or Reduced Motion Fallback
  if (!mounted || reduceMotion) {
    return (
      <Container className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-12">
          {chapters.map((ch) => (
            <article
              key={ch.index}
              className="rounded-card border border-border bg-surface p-8 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-burgundy-light">
                  {ch.index}
                </span>
                <h2 className="text-2xl font-bold text-foreground">
                  {ch.title}
                </h2>
              </div>
              <div className="mt-4 space-y-3">
                {ch.body.map((p, j) => (
                  <p key={j} className="text-secondary">
                    {p}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    );
  }

  return (
    <div className="relative">
      {/* Desktop Pinned Interactive Story Deck */}
      <div ref={pinRef} className="relative hidden h-[520vh] lg:block">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Dynamic Background Glow */}
          <div
            aria-hidden
            style={{ background: activeMeta.glow }}
            className="pointer-events-none absolute inset-0 transition-all duration-700"
          />

          <Container className="relative h-full">
            {/* Top Interactive Progress Control Rail — top-24 clears the fixed site nav */}
            <div className="absolute top-24 left-0 right-0 z-30 flex items-center justify-between px-4">
              <div className="flex items-center gap-3 rounded-full border border-border/80 bg-background/80 px-4 py-2 text-xs font-mono backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-burgundy animate-pulse" />
                <span>
                  CHAPTER {activeChapter.index} /{" "}
                  {String(chapters.length).padStart(2, "0")}
                </span>
                <span className="text-muted">• {activeChapter.title}</span>
              </div>

              {/* Step Navigation Dots */}
              <div className="flex items-center gap-1.5 rounded-full border border-border/80 bg-background/80 p-1.5 backdrop-blur-md">
                {chapters.map((c, i) => (
                  <button
                    key={c.index}
                    onClick={() => scrollToSectionIndex(i)}
                    title={`Chapter ${c.index}: ${c.title}`}
                    className={cn(
                      "h-2.5 rounded-full transition-all duration-300",
                      i === activeChapterIndex
                        ? "w-7 bg-burgundy-light"
                        : "w-2.5 bg-border hover:bg-muted",
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Pinned Card Deck Stage */}
            <div className="relative h-full w-full">
              {chapters.map((chapter, i) => (
                <StageCard
                  key={chapter.index}
                  chapter={chapter}
                  index={i}
                  count={chapters.length}
                  progress={progress}
                />
              ))}
            </div>
          </Container>
        </div>
      </div>

      {/* Mobile: swipeable chapter deck — same card language as the desktop stage */}
      <div className="py-16 lg:hidden">
        <Container>
          {/* Chapter Carousel Navigator */}
          <div className="mb-8 flex items-center justify-between gap-3 rounded-card border border-border bg-surface p-4">
            <button
              disabled={activeChapterIndex === 0}
              onClick={() => goToChapter(activeChapterIndex - 1)}
              aria-label="Previous chapter"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-input border border-border text-secondary disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Tappable progress dots */}
            <div className="flex items-center justify-center gap-1.5 overflow-hidden">
              {chapters.map((c, i) => (
                <button
                  key={c.index}
                  onClick={() => goToChapter(i)}
                  aria-label={`Chapter ${c.index}: ${c.title}`}
                  className="flex h-8 items-center"
                >
                  <span
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      i === activeChapterIndex
                        ? "w-6 bg-burgundy-light"
                        : "w-2 bg-border",
                    )}
                  />
                </button>
              ))}
            </div>

            <button
              disabled={activeChapterIndex === chapters.length - 1}
              onClick={() => goToChapter(activeChapterIndex + 1)}
              aria-label="Next chapter"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-input border border-border text-secondary disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Active Mobile Chapter Card — slides in the direction of travel; swipe to navigate */}
          <div className="relative">
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.article
                key={activeChapter.index}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ x: d > 0 ? 72 : -72, opacity: 0, rotate: d > 0 ? 1.5 : -1.5 }),
                  center: { x: 0, opacity: 1, rotate: 0 },
                  exit: (d: number) => ({ x: d > 0 ? -72 : 72, opacity: 0, rotate: d > 0 ? -1.5 : 1.5 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -56) goToChapter(activeChapterIndex + 1);
                  else if (info.offset.x > 56) goToChapter(activeChapterIndex - 1);
                }}
                className="relative touch-pan-y overflow-hidden rounded-card border border-border/90 bg-surface/95 p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]"
              >
                {/* Per-chapter ambient glow + accent bar, as on the desktop stage */}
                <div
                  aria-hidden
                  style={{ background: activeMeta.glow }}
                  className="pointer-events-none absolute inset-0"
                />
                <div
                  aria-hidden
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-burgundy/60 to-transparent"
                />

                <div className="relative flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-input border border-burgundy/40 bg-burgundy/10 text-burgundy-light">
                      <ActiveIcon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted">
                      Chapter {activeChapter.index} of{" "}
                      {String(chapters.length).padStart(2, "0")}
                    </span>
                  </div>
                  {activeMeta.tag && (
                    <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs uppercase tracking-wider text-burgundy-light">
                      {activeMeta.tag}
                    </span>
                  )}
                </div>

                <h2 className="relative mt-5 text-2xl font-extrabold tracking-tight text-foreground">
                  {activeChapter.title}
                </h2>
                <div className="relative mt-4 space-y-4 text-secondary">
                  {activeChapter.body.map((p, j) => (
                    <p key={j} className="leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </Container>
      </div>
    </div>
  );
}
