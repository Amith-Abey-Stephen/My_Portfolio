import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Post } from "@/types";
import { formatDate } from "@/lib/utils";

/** A writing card — typography-first, reading time shown (docs 03/04). */
export function ArticleCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-border bg-surface transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-border-strong"
    >
      {post.featureImage && (
        <div className="relative aspect-[16/9] overflow-hidden bg-elevated">
          <Image
            src={post.featureImage}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            // Blog feature images come from arbitrary CDNs; skip the optimizer
            // so a new image host can never break the page.
            unoptimized
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-8">
        <div className="mb-5 flex items-center gap-3 font-mono text-xs text-muted">
          <span>{formatDate(post.publishedAt)}</span>
          {post.readingTime && (
            <>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" /> {post.readingTime}
              </span>
            </>
          )}
        </div>

        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {post.title}
        </h3>

        <p className="mt-3 line-clamp-2 flex-1 leading-relaxed text-secondary">
          {post.excerpt}
        </p>

        <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground">
          Read article
          <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
        </span>
      </div>
    </Link>
  );
}
