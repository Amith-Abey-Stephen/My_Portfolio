import { journey } from "@/content/journey";
import { communityIntro } from "@/content/community";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Timeline } from "@/components/journey/timeline";
import { Reveal } from "@/components/motion/reveal";
import { StatsGrid } from "@/components/sections/stats-grid";

export const metadata = pageMetadata({
  title: "Journey",
  description:
    "The professional journey of Amith Abey Stephen — from Inovus Labs and μLearn to product teams.",
  path: "/journey",
});

export default function JourneyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Journey"
        title="The professional path."
        lede="Roles, teams, and the communities that shaped how I build. Newest first."
      />

      <Container className="pb-8">
        <div className="mx-auto max-w-3xl">
          <Timeline items={journey} />
        </div>
      </Container>

      {/* Community leadership */}
      <Section className="border-t border-border bg-surface/40">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow={communityIntro.eyebrow}
              title={communityIntro.heading}
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary">
                {communityIntro.body}
              </p>
            </Reveal>
          </div>

          <StatsGrid />
        </div>
      </Section>
    </>
  );
}
