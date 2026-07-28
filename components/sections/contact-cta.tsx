import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { Section } from "@/components/layout/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

/** A quiet ending (docs 03/04): simple heading, one clear invitation. */
export function ContactCTA() {
  return (
    <Section className="border-t border-border">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-6 flex items-center justify-center gap-2">
          <span className="accent-rule" aria-hidden />
          Contact
        </p>
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Let&rsquo;s build something worth remembering.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-secondary">
          I&rsquo;m always up for a good problem and good company. If you&rsquo;re
          building something interesting, say hello.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/contact" variant="primary">
            Start a conversation
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href={site.socials.email} variant="secondary">
            {site.email}
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
