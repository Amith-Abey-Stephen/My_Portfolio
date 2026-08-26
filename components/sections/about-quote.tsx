"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

/**
 * The about pull-quote. On phones the words brighten one after another in
 * reading order, scrubbed to the scroll — so the sentence lights up as you
 * read it and dims again on the way back. Desktop and reduced-motion keep the
 * plain paragraph (the surrounding Reveal stagger already handles those).
 */
export function ScrollQuote({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 88%", "start 42%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    restDelta: 0.001,
  });

  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // ref stays attached on both branches — useScroll registers the target on
  // the first (pre-mobile-flip) render and throws on an unattached ref.
  if (!mobile || reduceMotion) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = (i / words.length) * 0.85;
        return (
          <Word
            key={`${word}-${i}`}
            progress={progress}
            range={[start, Math.min(start + 0.3, 1)]}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}
