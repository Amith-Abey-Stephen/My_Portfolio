import { Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { site } from "@/content/site";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";

const channels = [
  { label: "Email", value: site.email, href: site.socials.email, icon: Mail },
  {
    label: "GitHub",
    value: "Amith-Abey-Stephen",
    href: site.socials.github,
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "Amith Abey Stephen",
    href: site.socials.linkedin,
    icon: Linkedin,
  },
];

/**
 * The quiet ending (docs 03/04): a simple heading, the Resend form, and social
 * links — a full contact section that lives on the landing page.
 */
export function Contact() {
  return (
    <Section id="contact" className="scroll-mt-24 border-t border-border">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something worth remembering."
        lede="I'm always up for a good problem and good company. If you're building something interesting, say hello."
        className="mb-14"
      />

      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1} className="space-y-8">
          <div>
            <p className="eyebrow mb-4">Elsewhere</p>
            <ul className="divide-y divide-border overflow-hidden rounded-card border border-border">
              {channels.map(({ label, value, href, icon: Icon }) => {
                const external = href.startsWith("http");
                return (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="flex items-center gap-4 bg-surface px-6 py-5 transition-colors hover:bg-elevated"
                    >
                      <Icon
                        className="h-5 w-5 shrink-0 text-burgundy-light"
                        strokeWidth={1.5}
                      />
                      <span className="min-w-0">
                        <span className="block font-mono text-xs uppercase tracking-wider text-muted">
                          {label}
                        </span>
                        <span className="block truncate text-foreground">
                          {value}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <p className="text-sm leading-relaxed text-muted">
            Based in {site.location}. I usually reply within a couple of days.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
