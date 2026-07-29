import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/types";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Variant = "featured" | "wide" | "normal";

/**
 * A bento tile — the feature image fills the tile with a scrim, and the
 * title + meta sit overlaid at the bottom. Works at any grid span.
 */
export function ArticleTile({
  post,
  variant = "normal",
  className,
}: {
  post: Post;
  variant?: Variant;
  className?: string;
}) {
  const isFeatured = variant === "featured";
  const showExcerpt = variant !== "normal";

  return (
    <Link
      href={`/writing/${post.slug}`}
      className={cn(
        "group relative flex h-full flex-col justify-end overflow-hidden rounded-card border border-border bg-surface transition-[border-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-border-strong",
        className,
      )}
      data-testid={`article-${post.slug}`}
    >
      {/* Cover */}
      {post.featureImage ? (
        <Image
          src={post.featureImage}
          alt=""
          fill
          unoptimized
          sizes={isFeatured ? "(max-width: 1024px) 100vw, 640px" : "(max-width: 1024px) 100vw, 360px"}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(122,36,53,0.35),transparent_65%)]" />
      )}

      {/* Scrim for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10"
      />

      {/* Primary tag */}
      {post.primaryTag && (
        <span className="absolute left-5 top-5 z-10 rounded-full border border-white/10 bg-background/50 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-secondary backdrop-blur-sm">
          {post.primaryTag.name}
        </span>
      )}

      {/* Content */}
      <div className={cn("relative z-10 p-5", isFeatured && "p-6 lg:p-8")}>
        <div className="flex items-center gap-2 font-mono text-xs text-muted">
          <span>{formatDate(post.publishedAt)}</span>
          {post.readingTime && (
            <>
              <span aria-hidden>·</span>
              <span>{post.readingTime.replace(" read", "")}</span>
            </>
          )}
        </div>

        <h3
          className={cn(
            "mt-2 flex items-start gap-1.5 font-semibold tracking-tight text-foreground",
            isFeatured ? "text-2xl lg:text-3xl" : "text-lg",
          )}
        >
          <span className="[text-wrap:balance]">{post.title}</span>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
        </h3>

        {showExcerpt && post.excerpt && (
          <p
            className={cn(
              "mt-2.5 text-secondary",
              isFeatured ? "line-clamp-3 max-w-xl" : "line-clamp-2",
            )}
          >
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
