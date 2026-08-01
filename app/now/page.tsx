import { getNow } from "@/lib/api";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/motion/reveal";

export const metadata = pageMetadata({
  title: "Now",
  description:
    "What Amith is focused on right now — working on, learning, reading, and thinking about.",
  path: "/now",
});

export default function NowPage() {
  const now = getNow();

  return (
    <>
      <PageHeader
        eyebrow="Now"
        title="What I'm focused on."
        lede="A snapshot of where my attention is, updated roughly monthly. Inspired by the /now movement."
      />

      <Container className="pb-28">
        <Reveal>
          <p className="mb-12 font-mono text-xs uppercase tracking-wider text-muted">
            Last updated · {now.updated}
          </p>
        </Reveal>

        <div className="mx-auto max-w-3xl">
          {now.sections.map((section, i) => (
            <Reveal
              key={section.label}
              delay={i * 0.05}
              className="grid gap-4 border-t border-border py-10 md:grid-cols-[200px_1fr] md:gap-10"
            >
              <h2 className="text-lg font-semibold text-foreground">
                {section.label}
              </h2>
              <ul className="space-y-3">
                {section.items.map((item, j) => (
                  <li key={j} className="flex gap-4">
                    <span
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-burgundy-light"
                      aria-hidden
                    />
                    <span className="text-lg leading-relaxed text-secondary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
