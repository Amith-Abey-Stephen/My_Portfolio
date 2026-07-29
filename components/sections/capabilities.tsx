import { capabilities } from "@/content/capabilities";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { RepelCard } from "@/components/ui/repel-card";

/** Capabilities — grouped by intent, not skill bars (docs 04). A landing section. */
export function Capabilities() {
  return (
    <Section id="capabilities" className="scroll-mt-24 border-t border-border">
      <SectionHeading
        eyebrow="Capabilities"
        title="How I work, and what with."
        lede="Grouped by intent, not proficiency — the description matters more than the logo list."
        className="mb-14"
      />

      <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((group) => {
          const Icon = group.icon;
          return (
            <RevealItem key={group.title} className="h-full">
              <RepelCard>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-input border border-border bg-elevated text-burgundy-light transition-transform duration-300 ease-out group-hover:scale-110">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="relative mt-6 text-xl font-semibold tracking-tight text-foreground">
                  {group.title}
                </h3>
                <p className="relative mt-3 flex-1 leading-relaxed text-secondary">
                  {group.summary}
                </p>
                <ul className="relative mt-6 flex flex-wrap gap-2">
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
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
