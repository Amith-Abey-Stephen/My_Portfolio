import { ArrowUpRight, Download } from "lucide-react";
import { journey } from "@/content/journey";
import { capabilities } from "@/content/capabilities";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Timeline } from "@/components/journey/timeline";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export const metadata = pageMetadata({
  title: "Resume",
  description:
    "The resume of Amith Abey Stephen — an interactive timeline plus a downloadable PDF.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="The condensed version."
        lede="An interactive timeline of roles and capabilities. Prefer a PDF? It lives one click away."
      />

      <Container>
        <Reveal className="flex flex-wrap gap-3">
          <ButtonLink href={site.resumeUrl} variant="primary">
            Open full resume <ArrowUpRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href={site.resumeUrl} variant="secondary">
            <Download className="h-4 w-4" /> Download PDF
          </ButtonLink>
        </Reveal>
      </Container>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <SectionHeading
            eyebrow="Experience"
            title="Where I've worked."
            className="lg:sticky lg:top-28 lg:self-start"
          />
          <div className="max-w-3xl">
            <Timeline items={journey} />
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <SectionHeading
          eyebrow="Capabilities"
          title="What I bring."
          className="mb-12"
        />
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {capabilities.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.04}>
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {group.title}
                </h3>
                <p className="mt-3 font-mono text-sm leading-relaxed text-muted">
                  {group.items.join(" · ")}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
