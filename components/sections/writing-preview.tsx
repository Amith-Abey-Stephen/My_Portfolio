import { ArrowRight } from "lucide-react";
import { getPosts } from "@/lib/api";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { ArticleCard } from "@/components/cards/article-card";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

/** Latest writing — pulled from the Ghost API. Degrades gracefully to a link. */
export async function WritingPreview() {
  const posts = await getPosts(2);

  return (
    <Section id="writing" className="border-t border-border">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Writing"
          title="Notes from the build."
          lede="Honest reflections on products, lessons, and the messy middle."
        />
        <Reveal delay={0.1}>
          <ButtonLink href="/writing" variant="ghost" className="shrink-0">
            All writing
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </Reveal>
      </div>

      {posts.length > 0 ? (
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal key={post.url} delay={i * 0.08}>
              <ArticleCard post={post} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal className="mt-12">
          <div className="rounded-card border border-dashed border-border bg-surface/50 p-10 text-center">
            <p className="text-secondary">
              Fresh writing lives on the blog.
            </p>
            <ButtonLink
              href="/writing"
              variant="secondary"
              size="sm"
              className="mt-5"
            >
              Read the blog
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
