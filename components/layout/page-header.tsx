import { Container } from "./container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** Standard header for interior pages — large editorial title. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  className?: string;
}) {
  return (
    <header className={cn("pt-32 pb-12 md:pt-40 md:pb-16", className)}>
      <Container>
        <div className="max-w-3xl">
          {eyebrow && (
            <Reveal>
              <p className="eyebrow mb-5 flex items-center gap-2">
                <span className="accent-rule" aria-hidden />
                {eyebrow}
              </p>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              {title}
            </h1>
          </Reveal>
          {lede && (
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary md:text-xl">
                {lede}
              </p>
            </Reveal>
          )}
        </div>
      </Container>
    </header>
  );
}
