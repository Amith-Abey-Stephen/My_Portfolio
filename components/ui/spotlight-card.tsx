"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * A card whose surface catches a soft burgundy spotlight that follows the
 * cursor. Pure CSS radial gradient tracked via custom properties — no JS
 * animation, so it stays calm and reduced-motion friendly. Takes rendered
 * children (so the icon component is resolved on the server, not passed here).
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface p-8 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-border-strong",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--mx, 50%) var(--my, 30%), rgba(122,36,53,0.20), transparent 68%)",
        }}
      />
      {children}
    </div>
  );
}
