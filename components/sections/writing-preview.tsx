import { ArrowUpRight } from "lucide-react";
import { getPosts } from "@/lib/api";
import { site } from "@/content/site";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { RotatingBento } from "@/components/writing/rotating-bento";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

/**
 * The Writing section on the landing page — a living three-row bento that
 * quietly rotates its posts, with a CTA out to the full blog.
 */
export async function WritingPreview() {
  const posts = await getPosts();

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
            <ArrowUpRight className="h-4 w-4" />
          </ButtonLink>
        </Reveal>
      </div>

      {posts.length > 0 ? (
        <RotatingBento posts={posts} />
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
              Read the blog <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
