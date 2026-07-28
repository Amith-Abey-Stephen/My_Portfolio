import { cn } from "@/lib/utils";

/**
 * Card — large padding, soft border, minimal shadow (docs 02).
 * `interactive` adds the calm 4px lift on hover.
 */
export function Card({
  children,
  className,
  interactive = false,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-card border border-border bg-surface p-8",
        interactive &&
          "transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-border-strong",
        className,
      )}
    >
      {children}
    </div>
  );
}
