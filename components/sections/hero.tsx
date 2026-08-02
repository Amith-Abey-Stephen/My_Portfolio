import { ArrowRight, FileText, MapPin, Monitor, Sparkles } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { RotatingText } from "@/components/motion/rotating-text";
import { TypewriterText } from "@/components/motion/typewriter-text";
import { HeroAmbient } from "@/components/sections/hero-ambient";
import { HeroPortrait } from "@/components/sections/hero-portrait";

/**
 * The arrival. Calm, editorial, no information overload (docs 03).
 * A cursor-tracked burgundy light makes the dark space feel alive; the
 * headline sets the tone; the portrait parallaxes gently.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      {/* Living backdrop */}
      <HeroAmbient />
      {/* Fine film grain for depth */}
      <div
        aria-hidden
        className="grain pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-soft-light"
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

          <h1 className="text-balance text-5xl font-semibold leading-[1.03] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Building products with{" "}
            <RotatingText
              items={site.headlineWords}
              srText="purpose."
              className="text-burgundy-light"
            />
          </h1>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-secondary md:text-xl">
              {site.tagline}
            </p>
          </Reveal>

          {/* Prominent High-Visibility Mobile Notice Banner Card */}
          <Reveal delay={0.15}>
            <div className="mt-6 flex items-center justify-between gap-3.5 rounded-2xl border border-burgundy/40 bg-gradient-to-r from-burgundy/25 via-burgundy/15 to-surface p-4 shadow-xl backdrop-blur-md sm:hidden">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-burgundy/40 bg-burgundy/20 text-burgundy-light shadow-inner">
                  <Monitor className="h-5 w-5" />
                </span>
                <div className="flex flex-col">
                  <span className="font-mono text-[0.68rem] font-bold uppercase tracking-wider text-burgundy-light flex items-center gap-1">
                    <Sparkles className="h-3 w-3 animate-pulse text-burgundy-light" /> Desktop Recommended
                  </span>
                  <span className="mt-0.5 text-xs font-bold text-foreground">
                    Best viewed on Web ↗
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href="/#work" variant="primary">
                View Work
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/story" variant="secondary">
                Read the Story
              </ButtonLink>
              <ButtonLink href="/resume" variant="ghost">
                <FileText className="h-4 w-4" /> Résumé
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2.5 font-mono text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {site.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                Available for work
              </span>
              {/* basis-full: on phones the rotating role takes its own line
                  instead of wrapping mid-row; from sm it rejoins the row. */}
              <TypewriterText
                items={site.roles}
                className="basis-full text-secondary sm:basis-auto"
              />
            </div>
          </Reveal>
        </div>

        {/* Portrait — reveals naturally, parallaxes with cursor or touch. */}
        <Reveal delay={0.15} y={0} className="mt-8 flex justify-center lg:mt-0 lg:block">
          <HeroPortrait />
        </Reveal>
      </Container>
    </section>
  );
}
