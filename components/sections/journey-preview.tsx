import { ArrowRight } from "lucide-react";
import { journey } from "@/content/journey";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Timeline } from "@/components/journey/timeline";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

/** Journey preview — the three most recent milestones. */
export function JourneyPreview() {
  return (
    <Section id="journey">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Journey"
            title="A path built by doing."
            lede="From student communities to product teams — the short version."
          />
          <Reveal delay={0.1}>
            <ButtonLink href="/journey" variant="ghost" className="mt-6 -ml-2">
              Full journey
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>

        <Timeline items={journey.slice(0, 4)} />
      </div>
    </Section>
  );
}
