"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);
  const pathname = usePathname();
  const firstRun = useRef(true);

  useEffect(() => {
    // Only initialize custom smooth inertia scrolling on desktop (fine pointers)
    // Mobile touch devices preserve native 60fps touch momentum
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 768;

    if (isTouchDevice) return;

    let rafId: number;

    const init = () => {
      import("lenis").then(({ default: Lenis }) => {
        lenisRef.current = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 0.95,
          touchMultiplier: 1.5,
        });

        function raf(time: number) {
          lenisRef.current?.raf(time);
          rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);
      });
    };

    if ("requestIdleCallback" in window) {
      const idleId = (window as any).requestIdleCallback(init);
      return () => {
        (window as any).cancelIdleCallback(idleId);
        if (rafId) cancelAnimationFrame(rafId);
        lenisRef.current?.destroy();
        lenisRef.current = null;
      };
    } else {
      const timerId = setTimeout(init, 100);
      return () => {
        clearTimeout(timerId);
        if (rafId) cancelAnimationFrame(rafId);
        lenisRef.current?.destroy();
        lenisRef.current = null;
      };
    }
  }, []);

  // On route change, kill any in-flight inertia and sync Lenis's virtual
  // position — otherwise its stale internal offset drags the freshly opened
  // page back to wherever the previous page was scrolled (mid-page/bottom).
  useEffect(() => {
    if (firstRun.current) {
      // Initial load: leave the browser's own restoration (reload, deep hash
      // links) alone.
      firstRun.current = false;
      return;
    }
    const hash = window.location.hash;
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      return;
    }
    // Anchor navigation (e.g. /#work): the router lands the section itself —
    // just sync Lenis to wherever that ended up so inertia can't tug it away.
    const timer = setTimeout(() => {
      lenisRef.current?.scrollTo(window.scrollY, {
        immediate: true,
        force: true,
      });
    }, 120);
    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
