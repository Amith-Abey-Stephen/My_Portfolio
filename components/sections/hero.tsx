import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

/**
 * The arrival. Calm, editorial, no information overload (docs 03).
 * Headline sets the tone; the portrait reveals naturally on a burgundy wash.
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
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-burgundy-light/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-burgundy-light" />
              </span>
              {site.author}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="text-balance text-5xl font-semibold leading-[1.03] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Building products with{" "}
              <span className="text-burgundy-light">purpose.</span>
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
                {site.role} · Available for work
              </span>
            </div>
          </Reveal>
        </div>

        {/* Portrait — reveals naturally on a burgundy wash (docs 03). */}
        <Reveal delay={0.15} y={0} className="hidden lg:block">
          <div className="relative mx-auto flex h-[560px] w-full max-w-md items-end justify-center">
            {/* Ambient burgundy glow behind the figure */}
            <div
              aria-hidden
              className="absolute left-1/2 top-4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(122,36,53,0.38),transparent_65%)] blur-2xl"
            />
            <Image
              src="/portrait.png"
              alt={`${site.author} — ${site.role}`}
              width={1065}
              height={1600}
              priority
              className="relative z-10 h-full w-auto object-contain object-bottom"
            />
            {/* Fade the shoulders into the dark hero */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-background via-background/70 to-transparent"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
