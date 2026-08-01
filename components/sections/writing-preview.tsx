import { ArrowRight } from "lucide-react";
import { getPosts } from "@/lib/api";
import { site } from "@/content/site";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { WritingCards } from "@/components/sections/writing-cards";

/**
 * The Writing section on the landing page — a roomy 2×2 of article cards that
 * slide in from the sides as you scroll (see WritingCards), in the site's card
 * language. No photo bento, no auto-rotation.
 */
export async function WritingPreview() {
  const posts = await getPosts();
  const items = posts.slice(0, 4);

  return (
    <Section id="writing" className="scroll-mt-24 border-t border-border">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Writing"
          title="Notes from the build."
          lede="Honest reflections on products, lessons, and the messy middle of building."
        />
        <Reveal delay={0.1}>
          <ButtonLink
            href={site.blogUrl}
            variant="secondary"
            className="shrink-0"
          >
            Read the full blog
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </Reveal>
      </div>

      {items.length > 0 ? (
        <WritingCards posts={items} />
      ) : (
        <Reveal>
          <div className="rounded-card border border-dashed border-border bg-surface/50 p-12 text-center">
            <p className="text-secondary">Fresh writing lives on the blog.</p>
            <ButtonLink
              href={site.blogUrl}
              variant="secondary"
              size="sm"
              className="mt-5"
            >
              Read the blog <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
