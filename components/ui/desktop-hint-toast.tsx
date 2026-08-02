"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Monitor, Sparkles, X } from "lucide-react";

export function DesktopHintToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on touch/mobile screens
    const isMobile =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 768;

    if (!isMobile) return;

    try {
      if (sessionStorage.getItem("amith:desktop-hint-dismissed")) return;
    } catch {
      // Ignore storage errors
    }

    let hideTimer: NodeJS.Timeout;
    const showTimer = setTimeout(() => {
      setVisible(true);

      // Auto fade away after 5 seconds
      hideTimer = setTimeout(() => setVisible(false), 5000);
    }, 800);

    return () => {
      clearTimeout(showTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem("amith:desktop-hint-dismissed", "1");
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -30, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -25, opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-20 inset-x-4 z-50 mx-auto max-w-sm pointer-events-auto sm:hidden"
        >
          {/* Outer Glowing Gradient Border Container */}
          <div className="relative rounded-full p-[1.5px] bg-gradient-to-r from-burgundy via-burgundy-light to-burgundy shadow-[0_12px_40px_rgba(122,36,53,0.55)]">
            <div className="flex items-center justify-between gap-3 rounded-full bg-surface/95 px-4 py-2.5 backdrop-blur-2xl">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-85" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500 shadow-[0_0_10px_#f43f5e]" />
                </span>

                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-burgundy/30 text-burgundy-light border border-burgundy/50">
                    <Monitor className="h-3.5 w-3.5" />
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-[0.68rem] font-bold uppercase tracking-wider text-burgundy-light flex items-center gap-1">
                      <Sparkles className="h-3 w-3 animate-pulse" /> Desktop Experience
                    </span>
                    <span className="truncate font-sans text-xs font-semibold text-foreground">
                      Best viewed on Web↗
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss hint"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-elevated border border-border text-secondary transition-all hover:bg-border hover:text-foreground active:scale-95"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
