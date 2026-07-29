import { cn } from "@/lib/utils";

/**
 * The brand mark (per the brand board): the accent is a small burgundy
 * square — a "micro mark" — not a coloured word. Scales with font-size.
 */

/** Full wordmark: `amith.site` in white + trailing burgundy square. */
export function Wordmark({
  className,
  dotClassName,
}: {
  className?: string;
  dotClassName?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-end font-heading font-semibold tracking-tight text-foreground",
        className,
      )}
    >
      amith.site
      <span
        className={cn(
          "mb-[0.18em] ml-[0.16em] inline-block h-[0.28em] w-[0.28em] rounded-[2px] bg-burgundy",
          dotClassName,
        )}
        aria-hidden
      />
    </span>
  );
}

/** Compact mark: `a` + burgundy square. Used for favicon-scale spots. */
export function Monogram({
  className,
  dotClassName,
}: {
  className?: string;
  dotClassName?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-end font-heading font-semibold leading-none text-foreground",
        className,
      )}
    >
      a
      <span
        className={cn(
          "mb-[0.12em] ml-[0.04em] inline-block h-[0.2em] w-[0.2em] rounded-[2px] bg-burgundy",
          dotClassName,
        )}
        aria-hidden
      />
    </span>
  );
}
