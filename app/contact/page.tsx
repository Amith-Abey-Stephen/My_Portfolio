import { pageMetadata } from "@/lib/metadata";
import { site } from "@/content/site";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/forms/contact-form";
import { ContactChannels } from "@/components/sections/contact-channels";
import { StatusDot } from "@/components/ui/status-dot";
import { Reveal } from "@/components/motion/reveal";

import { ContactPageJsonLd } from "@/components/seo/json-ld";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Amith Abey Stephen for product engineering, software development, consulting, open-source projects, and technical collaborations.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <ContactPageJsonLd />
      <PageHeader
        eyebrow="Contact"
        title="Let's build something worth remembering."
        lede="I'm always up for a good problem and good company. If you're building something interesting, say hello."
      >
        <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs text-secondary">
          <StatusDot />
          Available for work
        </span>
      </PageHeader>

      <Container className="pb-24 pt-4 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal className="min-w-0">
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="min-w-0 space-y-8">
            <div>
              <p className="eyebrow mb-4">Elsewhere</p>
              <ContactChannels />
            </div>

            <p className="text-sm leading-relaxed text-muted">
              Based in {site.location}. I usually reply within a couple of days.
            </p>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
