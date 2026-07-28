"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * The arrival moment (docs 03): a. → amith.site → Building… → the site enters.
 * Calm, quiet, and capped at ~1 second. Shown once per session.
 */
export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("amith:entered")) {
      setDone(true);
      return;
    }
    const timer = setTimeout(() => {
      sessionStorage.setItem("amith:entered", "1");
      setDone(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* No-JS guarantee: never trap the page behind the overlay. */}
      <noscript>
        <style>{`.loading-screen{display:none !important}`}</style>
      </noscript>
      <AnimatePresence>
        {!done && (
          <motion.div
            className="loading-screen fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-4"
            >
              <span className="font-heading text-5xl font-semibold text-foreground">
                a<span className="text-burgundy-soft">.</span>
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-muted">
                amith.site
              </span>
              <span className="mt-1 flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.25em] text-muted/70">
                Building
                <span className="inline-flex gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    >
                      .
                    </motion.span>
                  ))}
                </span>
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
