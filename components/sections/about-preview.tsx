import { ArrowRight } from "lucide-react";
import { about } from "@/content/about";
import { stats } from "@/content/community";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

/** About preview — staggered typography; text and stats never compete (docs 03). */
export function AboutPreview() {
  return (
    <Section className="border-y border-border bg-surface/40">
      <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-2">
              <span className="accent-rule" aria-hidden />
              About
            </p>
          </Reveal>
          <RevealGroup className="space-y-6">
            <RevealItem>
              <p className="text-2xl font-medium leading-snug tracking-tight text-foreground md:text-[1.75rem]">
                I care less about frameworks and titles than about the thing
                being built — and whether it genuinely helps someone.
              </p>
            </RevealItem>
            <RevealItem>
              <p className="max-w-xl leading-relaxed text-secondary">
                {about.intro[0]}
              </p>
            </RevealItem>
            <RevealItem>
              <ButtonLink href="/about" variant="ghost" className="-ml-2">
                More about me
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </RevealItem>
          </RevealGroup>
        </div>

        {/* Community impact — quiet numbers, not skill bars. */}
        <RevealGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <RevealItem key={stat.label}>
                <div className="flex h-full flex-col justify-between gap-6 bg-surface p-6 md:p-8">
                  <Icon className="h-5 w-5 text-burgundy-soft" strokeWidth={1.5} />
                  <div>
                    <div className="font-heading text-4xl font-semibold tracking-tight text-foreground">
                      {stat.value}
                    </div>
                    <div className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-muted">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}
