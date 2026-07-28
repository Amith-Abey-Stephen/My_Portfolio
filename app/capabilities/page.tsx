import { capabilities } from "@/content/capabilities";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ContactCTA } from "@/components/sections/contact-cta";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

export const metadata = pageMetadata({
  title: "Capabilities",
  description:
    "How Amith works and the tools he reaches for — product thinking, frontend, backend, IoT, AI, and community.",
  path: "/capabilities",
});

export default function CapabilitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Capabilities"
        title="How I work, and what with."
        lede="Grouped by intent, not proficiency. The description matters more than the logo list — no skill bars here."
      />

      <Container className="pb-24">
        <RevealGroup className="grid gap-6 md:grid-cols-2">
          {capabilities.map((group) => {
            const Icon = group.icon;
            return (
              <RevealItem key={group.title}>
                <div className="flex h-full flex-col rounded-card border border-border bg-surface p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-input border border-border bg-elevated text-burgundy-soft">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <h2 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
                    {group.title}
                  </h2>
                  <p className="mt-3 flex-1 leading-relaxed text-secondary">
                    {group.summary}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>

      <ContactCTA />
    </>
  );
}
