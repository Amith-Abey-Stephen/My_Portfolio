import { ArrowRight } from "lucide-react";
import { about } from "@/content/about";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { StatsGrid } from "@/components/sections/stats-grid";
import { ScrollQuote } from "@/components/sections/about-quote";

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
              <ScrollQuote
                text="I care less about frameworks and titles than about the thing being built, and whether it actually helps someone."
                className="text-2xl font-medium leading-snug tracking-tight text-foreground md:text-[1.75rem]"
              />
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

        {/* Community impact — quiet numbers that count up on scroll. */}
        <StatsGrid />
      </div>
    </Section>
  );
}
