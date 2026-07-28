import type { JourneyMilestone } from "@/types";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** Vertical timeline; the current milestone is highlighted (docs 03). */
export function Timeline({ items }: { items: JourneyMilestone[] }) {
  return (
    <ol className="relative border-l border-border pl-8 md:pl-10">
      {items.map((item, i) => (
        <Reveal as="li" key={`${item.organization}-${item.period}`} delay={i * 0.05}>
          <div className="relative pb-12 last:pb-0">
            {/* Node */}
            <span
              className={cn(
                "absolute -left-[41px] top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 md:-left-[49px]",
                item.current
                  ? "border-burgundy bg-burgundy"
                  : "border-border-strong bg-background",
              )}
              aria-hidden
            >
              {item.current && (
                <span className="absolute h-3.5 w-3.5 animate-ping rounded-full bg-burgundy/40" />
              )}
            </span>

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="font-mono text-xs text-muted">{item.period}</p>
              {item.current && (
                <span className="rounded-full border border-burgundy/30 bg-burgundy/10 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-burgundy-soft">
                  Now
                </span>
              )}
            </div>

            <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
              {item.role}
            </h3>
            <p className="text-sm font-medium text-burgundy-soft">
              {item.organization}
            </p>
            <p className="mt-3 max-w-2xl leading-relaxed text-secondary">
              {item.description}
            </p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
