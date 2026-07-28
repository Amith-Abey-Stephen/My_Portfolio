import { ArrowUpRight } from "lucide-react";
import { getPosts } from "@/lib/api";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ArticleCard } from "@/components/cards/article-card";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export const metadata = pageMetadata({
  title: "Writing",
  description:
    "Essays and notes by Amith Abey Stephen on products, engineering, design, and the craft of building.",
  path: "/writing",
});

// Refresh from the Ghost API hourly.
export const revalidate = 3600;

export default async function WritingPage() {
  const posts = await getPosts(12);

  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Notes from the build."
        lede="Honest, reflective, and a little unfinished — thoughts on products, lessons, and the messy middle of building."
      />

      <Container className="pb-28">
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.url} delay={i * 0.05}>
                <ArticleCard post={post} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="rounded-card border border-dashed border-border bg-surface/50 p-12 text-center">
              <h2 className="text-xl font-semibold text-foreground">
                The writing lives on the blog.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-secondary">
                Articles are published on the Inovus Labs blog. Set{" "}
                <code className="font-mono text-cream">BLOG_API_KEY</code> to pull
                them in here automatically.
              </p>
              <ButtonLink
                href={site.blogUrl}
                variant="primary"
                size="sm"
                className="mt-6"
              >
                Visit the blog <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>
        )}

        {posts.length > 0 && (
          <Reveal className="mt-14 text-center">
            <ButtonLink href={site.blogUrl} variant="secondary">
              Read the full blog <ArrowUpRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        )}
      </Container>
    </>
  );
}
