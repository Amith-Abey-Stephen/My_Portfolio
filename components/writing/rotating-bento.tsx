"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Post } from "@/types";
import { ArticleTile } from "@/components/writing/article-tile";

type Variant = "featured" | "wide" | "normal";

/**
 * A fixed 4-tile layout that fills exactly two rows on a 4-column desktop
 * grid (dense flow packs it):
 *
 *   [ BIG 2x2 ][ card ][ card ]
 *   [ BIG 2x2 ][  long card  ]
 */
const LAYOUT: { span: string; variant: Variant }[] = [
  {
    span: "row-span-2 sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2",
    variant: "featured",
  },
  { span: "", variant: "normal" }, // top-right 1
  { span: "", variant: "normal" }, // top-right 2
  { span: "sm:col-span-2 lg:col-span-2", variant: "wide" }, // long card (mid-right)
];

const SLOTS = LAYOUT.length;
const INTERVAL = 5000;

/**
 * A living bento: the first three rows of writing, where every 5s one random
 * tile fades out and a fresh post fades in. Paused for reduced-motion and
 * when the tab is hidden.
 */
export function RotatingBento({ posts }: { posts: Post[] }) {
  const reduceMotion = useReducedMotion();
  const count = Math.min(SLOTS, posts.length);
  const [slots, setSlots] = useState<Post[]>(() => posts.slice(0, count));

  useEffect(() => {
    if (reduceMotion || posts.length <= count) return;

    const id = setInterval(() => {
      if (document.hidden) return;
      setSlots((prev) => {
        const shown = new Set(prev.map((p) => p.slug));
        const pool = posts.filter((p) => !shown.has(p.slug));
        if (pool.length === 0) return prev;
        const slotIndex = Math.floor(Math.random() * prev.length);
        const incoming = pool[Math.floor(Math.random() * pool.length)];
        const next = [...prev];
        next[slotIndex] = incoming;
        return next;
      });
    }, INTERVAL);

    return () => clearInterval(id);
  }, [posts, count, reduceMotion]);

  return (
    <div className="grid auto-rows-[220px] grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {slots.map((post, i) => {
        const { span, variant } = LAYOUT[i];
        return (
          <div key={i} className={span}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <ArticleTile post={post} variant={variant} className="h-full" />
              </motion.div>
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
