import { cn } from "@/lib/utils";

/**
 * The pulsing "live" dot used to signal availability (also seen in the hero and
 * footer). Pure CSS animation — quiet under reduced-motion via globals.css.
 */
export function StatusDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex h-2 w-2", className)} aria-hidden>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-burgundy-light/60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-burgundy-light" />
    </span>
  );
}
