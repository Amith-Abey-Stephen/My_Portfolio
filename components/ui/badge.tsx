import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/types";

/** A small, quiet label — used for tags and metadata. */
export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-elevated px-3 py-1 font-mono text-xs tracking-wide text-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}

const statusStyles: Record<ProjectStatus, string> = {
  Released: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  "In Progress": "border-amber-500/25 bg-amber-500/10 text-amber-300",
  Concept: "border-border bg-elevated text-muted",
};

/** Status pill for a project — colour communicates state, used sparingly. */
export function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-wider",
        statusStyles[status],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {status}
    </span>
  );
}
