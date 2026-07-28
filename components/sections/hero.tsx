import { ArrowRight, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

/**
 * The arrival. Calm, editorial, no information overload (docs 03).
 * Headline sets the tone; a branded monogram panel stands in for a portrait
 * until an authentic photograph replaces it.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      {/* A single, restrained burgundy wash — used sparingly. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-burgundy/10 blur-[120px]"
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-burgundy-soft/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-burgundy-soft" />
              </span>
              {site.author}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-balance text-5xl font-semibold leading-[1.03] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              A builder who loves{" "}
              <span className="text-burgundy-soft">solving real problems.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-secondary md:text-xl">
              {site.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href="/work" variant="primary">
                View Work
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/story" variant="secondary">
                Read the Story
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {site.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                Frontend POC · μLearn Foundation
              </span>
            </div>
          </Reveal>
        </div>

        {/* Monogram panel — mask reveal (docs 03). */}
        <Reveal delay={0.15} y={0} className="hidden lg:block">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-card border border-border bg-surface">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(122,36,53,0.22),transparent_60%)]"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-heading text-[9rem] font-semibold leading-none text-foreground">
                a<span className="text-burgundy-soft">.</span>
              </span>
              <span className="mt-4 font-mono text-xs uppercase tracking-[0.4em] text-muted">
                est. Kerala
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 border-t border-border bg-background/40 px-6 py-4 backdrop-blur-sm">
              <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">
                Software · Hardware · Community
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
