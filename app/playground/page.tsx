import { experiments, playgroundIntro } from "@/content/playground";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { StatusBadge } from "@/components/ui/badge";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

export const metadata = pageMetadata({
  title: "Playground",
  description:
    "Small experiments and unfinished ideas — the workshop where things are allowed to be incomplete.",
  path: "/playground",
});

export default function PlaygroundPage() {
  return (
    <>
      <PageHeader
        eyebrow="Playground"
        title="Half-finished on purpose."
        lede={playgroundIntro}
      />

      <Container className="pb-28">
        <RevealGroup className="grid gap-6 md:grid-cols-2">
          {experiments.map((exp) => (
            <RevealItem key={exp.title}>
              <div className="flex h-full flex-col rounded-card border border-border bg-surface p-8">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    {exp.title}
                  </h2>
                  <StatusBadge status={exp.status} />
                </div>
                <p className="flex-1 leading-relaxed text-secondary">
                  {exp.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-14 text-center">
          <p className="text-secondary">
            Not everything here will become a product — and that&rsquo;s the
            point.
          </p>
        </Reveal>
      </Container>
    </>
  );
}
