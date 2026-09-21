import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/layout/container";
import { ContactCTA } from "@/components/sections/contact-cta";
import { capabilities } from "@/content/capabilities";
import { RepelCard } from "@/components/ui/repel-card";
import { Reveal } from "@/components/motion/reveal";

export const metadata = pageMetadata({
  title: "Capabilities",
  description:
    "Core technical capabilities, engineering stack, and systems architecture skills of Amith Abey Stephen across full-stack web, DevOps, and hardware.",
  path: "/capabilities",
});

export default function CapabilitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Capabilities"
        title="How I work, and what with."
        lede="Grouped by intent, not proficiency. The description matters more than the logo list."
      />

      <Container className="pb-24 pt-4 md:pb-32">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((group, i) => {
            const Icon = group.icon;
            return (
              <Reveal key={group.title} delay={i * 0.04} className="h-full">
                <RepelCard className="h-full">
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-input border border-border bg-elevated text-burgundy-light transition-transform duration-300 ease-out group-hover:scale-110">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="relative mt-6 text-xl font-semibold tracking-tight text-foreground">
                    {group.title}
                  </h3>
                  <p className="relative mt-3 flex-1 leading-relaxed text-secondary text-sm">
                    {group.summary}
                  </p>
                  <ul className="relative mt-6 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted transition-colors duration-300 group-hover:border-border-strong group-hover:text-secondary"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </RepelCard>
              </Reveal>
            );
          })}
        </div>
      </Container>

      <ContactCTA />
    </>
  );
}
