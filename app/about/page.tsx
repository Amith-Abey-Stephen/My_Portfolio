import { about } from "@/content/about";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Who Amith is today — a builder from Kerala who turns ideas into products across software, hardware, and community.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A builder, in his own words."
        lede={about.intro[0]}
      />

      <Container className="pb-8">
        <Reveal className="max-w-2xl">
          <p className="text-lg leading-relaxed text-secondary">
            {about.intro[1]}
          </p>
        </Reveal>
      </Container>

      {/* Philosophy */}
      <Section className="border-y border-border bg-surface/40">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <SectionHeading eyebrow="Philosophy" title="How I think about work." />
          <div className="max-w-2xl space-y-6">
            {about.philosophy.map((line, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-xl leading-relaxed text-foreground md:text-2xl">
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <SectionHeading
          eyebrow="Values"
          title="What I try to hold onto."
          className="mb-14"
        />
        <RevealGroup className="grid gap-6 sm:grid-cols-2">
          {about.values.map((value) => (
            <RevealItem key={value.title}>
              <div className="h-full rounded-card border border-border bg-surface p-8">
                <h3 className="text-lg font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-3 leading-relaxed text-secondary">
                  {value.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Interests + current focus + fun facts */}
      <Section className="border-t border-border">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Interests"
              title="Things that pull my attention."
              className="mb-8"
            />
            <Reveal className="flex flex-wrap gap-2.5">
              {about.interests.map((interest) => (
                <Badge key={interest}>{interest}</Badge>
              ))}
            </Reveal>

            <Reveal className="mt-12">
              <p className="eyebrow mb-4">Current focus</p>
              <p className="max-w-xl text-lg leading-relaxed text-secondary">
                {about.currentFocus}
              </p>
              <ButtonLink href="/now" variant="ghost" className="mt-5 -ml-2">
                What I&rsquo;m doing now
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </Reveal>
          </div>

          <div>
            <SectionHeading
              eyebrow="Fun facts"
              title="A few true things."
              className="mb-8"
            />
            <ul className="space-y-4">
              {about.funFacts.map((fact, i) => (
                <Reveal as="li" key={i} delay={i * 0.05} className="flex gap-4">
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-burgundy-soft"
                    aria-hidden
                  />
                  <span className="text-lg leading-relaxed text-secondary">
                    {fact}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
