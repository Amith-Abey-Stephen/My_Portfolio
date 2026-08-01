import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

/** Shared editorial section heading: eyebrow + title + optional lede. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "eyebrow mb-4 flex items-center gap-2",
            align === "center" && "justify-center",
          )}
        >
          <span className="accent-rule" aria-hidden />
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {lede && (
        <p className="mt-4 text-lg leading-relaxed text-secondary">{lede}</p>
      )}
    </Reveal>
  );
}
