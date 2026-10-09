"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { site } from "@/content/site";
import { BuyMeACoffee } from "@/components/ui/bmc-icon";

const BMC_YELLOW = "#FFDD00";
const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

// Official animated stickers from Buy Me a Coffee's GIPHY channel, self-hosted.
const STICKER_HERO = "/brand/bmc/im-on-bmc.webp";
const STICKER_THANKS = "/brand/bmc/cups-burst.webp";

// Session keys — the teaser shows once, "Hide for now" lasts the session.
const DISMISS_KEY = "coffee-widget-dismissed";
const TEASED_KEY = "coffee-widget-teased";
const ENGAGED_KEY = "coffee-widget-engaged";

// Stay out of the way of the hero — only surface once the visitor is reading.
const REVEAL_AFTER_PX = 600;
// Teaser fires after this long on screen, or at this much of the page read.
const TEASE_AFTER_MS = 12_000;
const TEASE_AT_PROGRESS = 0.55;
const TEASE_DURATION_MS = 7_000;
// Immersive routes with their own full-screen chrome.
const HIDDEN_ON = ["/story"];

type Copy = { teaser: string; title: string; body: string };

/** Speak to what the visitor is actually looking at. */
function copyFor(pathname: string): Copy {
  if (pathname.startsWith("/writing/"))
    return {
      teaser: "Enjoying the read?",
      title: "Liked this article?",
      body: "Every post here is written in the open. A coffee helps me keep writing the next one.",
    };
  if (pathname.startsWith("/work"))
    return {
      teaser: "Like what I build?",
      title: "Like what I build?",
      body: "Most of this started as a late-night side project. A coffee keeps the next one brewing.",
    };
  return {
    teaser: "Enjoying the site?",
    title: "Enjoying the site?",
    body: "A coffee keeps the writing, open-source work and side projects brewing.",
  };
}

const session = {
  get: (k: string) =>
    typeof window !== "undefined" && sessionStorage.getItem(k) === "1",
  set: (k: string) => sessionStorage.setItem(k, "1"),
};

/** Three wisps of steam drifting up off the cup. */
function Steam({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <svg
      viewBox="0 0 24 16"
      fill="none"
      aria-hidden
      className={className}
    >
      {[5, 12, 19].map((x, i) => (
        <motion.path
          key={x}
          d={`M${x} 15 C${x - 3} 11 ${x + 3} 8 ${x} 4`}
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: [0, 0.7, 0], y: [4, -2, -6] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut",
          }}
        />
      ))}
    </svg>
  );
}

/** A small one-shot burst of burgundy + yellow squares. */
function Confetti() {
  const pieces = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2;
    const dist = 70 + (i % 3) * 22;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 20,
      rotate: (i % 2 ? 1 : -1) * (90 + i * 25),
      color: i % 3 === 0 ? BMC_YELLOW : i % 3 === 1 ? "#7A2435" : "#F4F1EC",
    };
  });
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-14 left-1/2 h-0 w-0"
    >
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute h-2 w-2 rounded-[2px]"
          style={{ backgroundColor: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0.6, rotate: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 1, rotate: p.rotate }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/**
 * Floating "Buy me a coffee" launcher, bottom-right. A labelled pill with
 * steam + a periodic nudge until the visitor engages; a one-time contextual
 * teaser bubble; a panel where the cup brews; and a thank-you burst.
 */
export function CoffeeWidget() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const copy = copyFor(pathname);

  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [thanked, setThanked] = useState(false);
  const [teasing, setTeasing] = useState(false);
  // Safe to read eagerly: nothing renders until `visible` flips client-side.
  const [dismissed, setDismissed] = useState(() => session.get(DISMISS_KEY));
  const [engaged, setEngaged] = useState(() => session.get(ENGAGED_KEY));
  const rootRef = useRef<HTMLDivElement>(null);

  const markEngaged = useCallback(() => {
    session.set(ENGAGED_KEY);
    session.set(TEASED_KEY);
    setEngaged(true);
    setTeasing(false);
  }, []);

  const tease = useCallback(() => {
    if (session.get(TEASED_KEY) || session.get(ENGAGED_KEY)) return;
    session.set(TEASED_KEY);
    setTeasing(true);
  }, []);

  // Reveal on scroll; also fire the teaser once enough of the page is read.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > REVEAL_AFTER_PX);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && y / max > TEASE_AT_PROGRESS) tease();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [tease]);

  // …or after a while of the launcher being on screen.
  useEffect(() => {
    if (!visible) return;
    const t = window.setTimeout(tease, TEASE_AFTER_MS);
    return () => window.clearTimeout(t);
  }, [visible, tease]);

  // The teaser tucks itself away again.
  useEffect(() => {
    if (!teasing) return;
    const t = window.setTimeout(() => setTeasing(false), TEASE_DURATION_MS);
    return () => window.clearTimeout(t);
  }, [teasing]);

  // Warm the thank-you sticker so it's ready the moment they click.
  useEffect(() => {
    if (open) new window.Image().src = STICKER_THANKS;
  }, [open]);

  // Close on Escape or a click outside the widget.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  // Let the thank-you breathe, then fold the panel away. The clock only starts
  // once the visitor is back from the BMC tab, so they actually see it.
  useEffect(() => {
    if (!thanked) return;
    let t: number | undefined;
    const start = () => {
      if (document.hidden || t !== undefined) return;
      t = window.setTimeout(() => {
        setOpen(false);
        setThanked(false);
      }, 4_500);
    };
    start();
    document.addEventListener("visibilitychange", start);
    return () => {
      document.removeEventListener("visibilitychange", start);
      window.clearTimeout(t);
    };
  }, [thanked]);

  const toggle = () => {
    markEngaged();
    setOpen((o) => !o);
  };

  const dismiss = () => {
    session.set(DISMISS_KEY);
    setOpen(false);
    setDismissed(true);
  };

  const show =
    visible && !dismissed && !HIDDEN_ON.some((p) => pathname.startsWith(p));
  const nudge = !engaged && !open && !reduce;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={rootRef}
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6"
        >
          {/* ---------- Panel ---------- */}
          <AnimatePresence mode="wait">
            {open && (
              <motion.div
                key={thanked ? "thanks" : "ask"}
                id="coffee-widget-panel"
                role="dialog"
                aria-label="Support my work"
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="relative w-[min(21rem,calc(100vw-2rem))] origin-bottom-right overflow-hidden rounded-card border border-border bg-surface shadow-2xl shadow-black/60"
              >
                {/* Warm glow behind the cup */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-16 left-1/2 h-48 w-64 -translate-x-1/2 rounded-full opacity-60 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(255,221,0,0.22), rgba(122,36,53,0.25), transparent)",
                  }}
                />

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="absolute top-3 right-3 z-10 rounded-full p-1.5 text-muted transition-colors hover:bg-elevated hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>

                {thanked ? (
                  <div className="relative px-6 pt-8 pb-7 text-center">
                    <Confetti />
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 16 }}
                      className="mx-auto -mt-2 h-32 w-32"
                    >
                      <Image
                        src={STICKER_THANKS}
                        alt=""
                        width={128}
                        height={128}
                        unoptimized
                        className="h-full w-full object-contain"
                      />
                    </motion.div>
                    <p className="mt-1 text-lg font-semibold text-foreground">
                      Thank you, truly.
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-secondary">
                      One coffee or just the thought, it genuinely makes my
                      day.
                    </p>
                  </div>
                ) : (
                  <div className="relative px-5 pt-6 pb-5">
                    <div className="flex flex-col items-center text-center">
                      {/* The sticker's art sits mid-frame in a square canvas —
                          crop to a banner so it doesn't push the copy down. */}
                      <div className="-mt-2 h-28 w-56 overflow-hidden">
                        <Image
                          src={STICKER_HERO}
                          alt="I'm on Buy Me a Coffee"
                          width={224}
                          height={224}
                          unoptimized
                          className="h-56 w-56 -translate-y-14 object-contain"
                        />
                      </div>
                      <p className="mt-2 text-lg font-semibold text-foreground">
                        {copy.title}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-secondary">
                        {copy.body}
                      </p>
                    </div>

                    <motion.a
                      href={site.socials.coffee}
                      target="_blank"
                      rel="me noopener noreferrer"
                      data-track="support_click"
                      data-track-location="widget"
                      onClick={() => setThanked(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-btn px-5 py-3 text-sm font-semibold text-[#0D0C22] shadow-[0_8px_24px_-8px_rgba(255,221,0,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
                      style={{ backgroundColor: BMC_YELLOW }}
                    >
                      <BuyMeACoffee mono className="h-4 w-auto" />
                      Buy me a coffee
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.a>

                    <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-muted">
                      <span>Opens in a new tab</span>
                      <button
                        type="button"
                        onClick={dismiss}
                        className="transition-colors hover:text-foreground"
                      >
                        Hide for now
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ---------- Teaser bubble ---------- */}
          <AnimatePresence>
            {teasing && !open && (
              <motion.button
                type="button"
                onClick={toggle}
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="relative origin-bottom-right rounded-2xl rounded-br-md border border-border-strong bg-elevated px-4 py-2.5 text-left text-sm text-foreground shadow-xl shadow-black/50"
              >
                <span className="font-medium">{copy.teaser}</span>{" "}
                <span className="text-secondary">Fuel my next build ☕</span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* ---------- Launcher pill ---------- */}
          <div className="relative">
            {/* Attention ring — pulses until the visitor engages */}
            {nudge && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full border-2"
                style={{ borderColor: BMC_YELLOW }}
                initial={{ opacity: 0.6, scale: 1 }}
                animate={{ opacity: 0, scale: 1.35 }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  repeatDelay: 2.4,
                  ease: "easeOut",
                }}
              />
            )}

            <motion.button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="coffee-widget-panel"
              aria-label={open ? "Close support panel" : "Buy me a coffee"}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative flex items-center gap-2.5 rounded-full border border-border-strong bg-elevated py-2.5 pr-5 pl-3.5 text-sm font-medium text-foreground shadow-lg shadow-black/50 transition-colors duration-200 hover:border-[#FFDD00]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
            >
              <span className="relative flex h-7 w-6 items-end justify-center">
                {!open && (
                  <Steam className="absolute -top-3 left-1/2 h-3 w-5 -translate-x-1/2 text-muted" />
                )}
                <AnimatePresence mode="wait" initial={false}>
                  {open ? (
                    <motion.span
                      key="x"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex h-full items-center"
                    >
                      <X className="h-5 w-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="cup"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={
                        nudge
                          ? { scale: 1, opacity: 1, rotate: [0, -14, 10, -6, 0] }
                          : { scale: 1, opacity: 1, rotate: 0 }
                      }
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={
                        nudge
                          ? {
                              rotate: {
                                duration: 0.8,
                                repeat: Infinity,
                                repeatDelay: 5,
                                delay: 1.5,
                              },
                            }
                          : { duration: 0.2 }
                      }
                      className="origin-bottom"
                    >
                      <BuyMeACoffee className="h-6 w-auto" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span>{open ? "Close" : "Buy me a coffee"}</span>

              {/* Unread-style dot until first interaction */}
              {!engaged && (
                <span
                  aria-hidden
                  className="absolute -top-0.5 -right-0.5 flex h-3 w-3"
                >
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-burgundy-light/60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-background bg-burgundy" />
                </span>
              )}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
