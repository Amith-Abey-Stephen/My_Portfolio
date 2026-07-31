"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import type { Post } from "@/types";
import { formatDate } from "@/lib/utils";

// How far each column drifts across the scroll: left travels up, right down.
const RANGE = 110;

/** The card visual — unchanged: tag pill + dated header, title, excerpt, CTA. */
function CardInner({ post }: { post: Post }) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      data-testid={`article-${post.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface p-8 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-border-strong md:p-9"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-burgundy/10 opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="relative flex items-center justify-between gap-4">
        <span className="inline-flex items-center rounded-full border border-burgundy/30 bg-burgundy/10 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-burgundy-light">
          {post.primaryTag?.name ?? "Article"}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted">
          <Clock className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
          {formatDate(post.publishedAt)}
        </span>
      </div>

      <h3 className="relative mt-6 text-2xl font-semibold tracking-tight text-foreground [text-wrap:balance]">
        {post.title}
      </h3>

      {post.excerpt && (
        <p className="relative mt-3 leading-relaxed text-secondary line-clamp-2">
          {post.excerpt}
        </p>
      )}

      <span className="relative mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-medium text-foreground">
        Read Article
        <ArrowRight className="h-4 w-4 text-burgundy-light transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

/**
 * A card that drifts vertically with scroll — the left column moves up while
 * the right column moves down, so the two sides pass in opposite directions.
 * Reversible; off under reduced-motion. (docs 03: motion has purpose.)
 */
function ParallaxCard({
  post,
  index,
  progress,
  active,
}: {
  post: Post;
  index: number;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const isLeft = index % 2 === 0;
  const y = useTransform(
    progress,
    [0, 1],
    isLeft ? [RANGE, -RANGE] : [-RANGE, RANGE],
  );

  return (
    <motion.div style={active ? { y } : undefined} className="h-full">
      <CardInner post={post} />
    </motion.div>
  );
}

export function WritingCards({ posts }: { posts: Post[] }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // The whole time the grid is passing through the viewport.
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  const active = !reduceMotion;

  return (
    <div ref={ref} className="grid gap-6 md:grid-cols-2">
      {posts.map((post, i) => (
        <ParallaxCard
          key={post.slug}
          post={post}
          index={i}
          progress={progress}
          active={active}
        />
      ))}
    </div>
  );
}
