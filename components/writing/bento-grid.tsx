import type { Post } from "@/types";
import { Reveal } from "@/components/motion/reveal";
import { ArticleTile } from "@/components/writing/article-tile";

type Variant = "featured" | "wide" | "normal";

/** Deterministic bento rhythm: a large lead, an occasional wide tile. */
function layoutOf(i: number): { variant: Variant; span: string } {
  if (i === 0)
    return {
      variant: "featured",
      span: "row-span-2 sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2",
    };
  if (i % 5 === 2)
    return { variant: "wide", span: "sm:col-span-2 lg:col-span-2" };
  return { variant: "normal", span: "" };
}

/** The asymmetric bento of article tiles (shared by the index + tag pages). */
export function BentoGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <p className="py-16 text-center text-muted">No writing here yet.</p>
    );
  }
  return (
    <div className="grid auto-rows-[220px] grid-flow-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {posts.map((post, i) => {
        const { variant, span } = layoutOf(i);
        return (
          <Reveal
            key={post.slug}
            className={span}
            y={24}
            delay={Math.min(i * 0.04, 0.32)}
          >
            <ArticleTile post={post} variant={variant} className="h-full" />
          </Reveal>
        );
      })}
    </div>
  );
}
