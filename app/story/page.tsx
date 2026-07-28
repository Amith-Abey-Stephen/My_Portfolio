import { story, storyIntro } from "@/content/story";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ContactCTA } from "@/components/sections/contact-cta";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Story",
  description:
    "The long version — the moments that turned a curious kid taking things apart into a builder shipping products.",
  path: "/story",
});

export default function StoryPage() {
  return (
    <>
      <PageHeader eyebrow="Story" title="How I got here." lede={storyIntro} />

      <Container className="pb-28">
        <div className="mx-auto max-w-4xl">
          {story.map((chapter, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={chapter.index}
                className="border-t border-border py-16 first:border-t-0 md:py-20"
              >
                <div
                  className={cn(
                    "grid gap-8 md:grid-cols-[auto_1fr] md:gap-12",
                    flip && "md:grid-cols-[1fr_auto]",
                  )}
                >
                  {/* Chapter marker — the visual weight, in place of a photo */}
                  <Reveal
                    className={cn(
                      "flex items-start gap-4",
                      flip && "md:order-2 md:justify-end",
                    )}
                  >
                    <span
                      className="font-heading text-6xl font-semibold leading-none text-elevated md:text-7xl"
                      aria-hidden
                    >
                      {chapter.index}
                    </span>
                  </Reveal>

                  <div className={cn(flip && "md:order-1")}>
                    <Reveal>
                      <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                        {chapter.title}
                      </h2>
                    </Reveal>
                    <div className="mt-5 space-y-4">
                      {chapter.body.map((para, j) => (
                        <Reveal key={j} delay={0.05 + j * 0.05}>
                          <p className="text-lg leading-relaxed text-secondary">
                            {para}
                          </p>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>

      <ContactCTA />
    </>
  );
}
