"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Vertical travel distance in px (default 20). */
  y?: number;
  /** Delay in seconds. */
  delay?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Render element type. */
  as?: "div" | "section" | "article" | "li" | "span";
} & Omit<HTMLMotionProps<"div">, "children">;

/**
 * A calm on-scroll reveal: fade + subtle translate, once, easeOut.
 * Motion has purpose (docs 02/03) — no bounce, no flash.
 */
export function Reveal({
  children,
  className,
  y = 20,
  delay = 0,
  duration = 0.6,
  as = "div",
  ...rest
}: RevealProps) {
  const Component = motion[as] as typeof motion.div;
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </Component>
  );
}

/** Stagger container: children with `RevealItem` fade in sequentially. */
export function RevealGroup({
  children,
  className,
  stagger = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  y = 20,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
