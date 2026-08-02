"use client";

import { useEffect } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize custom smooth inertia scrolling on desktop (fine pointers)
    // Mobile touch devices preserve native 60fps touch momentum
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 768;

    if (isTouchDevice) return;

    let instance: any = null;
    let rafId: number;

    const init = () => {
      import("lenis").then(({ default: Lenis }) => {
        instance = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 0.95,
          touchMultiplier: 1.5,
        });

        function raf(time: number) {
          instance?.raf(time);
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
        instance?.destroy();
      };
    } else {
      const timerId = setTimeout(init, 100);
      return () => {
        clearTimeout(timerId);
        if (rafId) cancelAnimationFrame(rafId);
        instance?.destroy();
      };
    }
  }, []);

  return <>{children}</>;
}
