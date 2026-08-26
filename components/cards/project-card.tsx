import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { StatusBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * A project card. Hover: slight lift + title highlight + arrow (docs 03).
 * No stock imagery — the cover is a quiet typographic/icon treatment.
 */
export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const Icon = project.icon;
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`View ${project.title} case study — ${project.summary}`}
      className={cn(
        "group flex flex-col rounded-card border border-border bg-surface p-8 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-border-strong active:-translate-y-1 active:border-border-strong",
        className,
      )}
      data-testid={`project-${project.slug}`}
    >
      <div className="mb-8 flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-input border border-border bg-elevated text-secondary transition-colors group-hover:text-foreground group-active:text-foreground">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <StatusBadge status={project.status} />
      </div>

      <div className="flex items-center gap-2 font-mono text-xs text-muted">
        <span>{project.year}</span>
        <span aria-hidden>·</span>
        <span>{project.category}</span>
      </div>

      <h3 className="mt-3 flex items-center gap-1.5 text-2xl font-semibold tracking-tight text-foreground">
        {project.title}
        <ArrowUpRight
          className="h-4 w-4 -translate-y-0.5 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 group-active:translate-x-0.5 group-active:opacity-100"
          aria-hidden
        />
      </h3>

      <p className="mt-3 flex-1 leading-relaxed text-secondary">
        {project.summary}
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}
