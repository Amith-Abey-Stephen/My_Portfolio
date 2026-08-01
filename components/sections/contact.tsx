import { site } from "@/content/site";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { ContactForm } from "@/components/forms/contact-form";
import { ContactChannels } from "@/components/sections/contact-channels";
import { StatusDot } from "@/components/ui/status-dot";
import { Reveal } from "@/components/motion/reveal";

/**
 * The quiet ending (docs 03/04): heading, an availability signal, the Resend
 * form (with inline validation), and copyable social links. A soft burgundy
 * bloom up top bookends the hero's ambient light so the page closes warm rather
 * than flat.
 */
export function Contact() {
  return (
    <Section
      id="contact"
      container={false}
      className="relative overflow-hidden scroll-mt-24 border-t border-border"
    >
      {/* Quiet closing bloom — a whisper of the hero's ambient light */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-burgundy/10 blur-[130px]"
      />

      <Container className="relative">
        <Reveal className="mb-14">
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something worth remembering."
            lede="I'm always up for a good problem and good company. If you're building something interesting, say hello."
            className="mb-6"
          />
          <span className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs text-secondary">
            <StatusDot />
            Available for work
          </span>
        </Reveal>

        {/* min-w-0 on the items: grid tracks default to min-content sizing,
            and the email row's intrinsic width would otherwise stretch the
            track past the container on narrow phones (right margin bug) —
            with it, the row's `truncate` can actually engage. */}
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
    </Section>
  );
}
