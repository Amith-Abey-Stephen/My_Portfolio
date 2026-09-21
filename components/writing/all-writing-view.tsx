"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";
import type { Post, Tag } from "@/types";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface AllWritingViewProps {
  posts: Post[];
  tags: Tag[];
}

export function AllWritingView({ posts, tags }: AllWritingViewProps) {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const tagList = useMemo(() => {
    return ["All", ...tags.map((t) => t.name)];
  }, [tags]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag =
        selectedTag === "All" ||
        post.tags.some((t) => t.name.toLowerCase() === selectedTag.toLowerCase());

      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesTag;

      const matchesSearch =
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.name.toLowerCase().includes(q));

      return matchesTag && matchesSearch;
    });
  }, [posts, selectedTag, searchQuery]);

  return (
    <div className="pb-24 pt-4 md:pb-32">
      <Container>
        {/* Controls: Tag Filter Tabs & Live Search */}
        <div className="mb-10 flex flex-col gap-5 border-b border-border pb-8 md:flex-row md:items-center md:justify-between">
          {/* Tags */}
          <div
            role="tablist"
            aria-label="Filter writing by tag"
            className="flex flex-wrap items-center gap-1.5 sm:gap-2"
          >
            {tagList.map((tag) => {
              const count =
                tag === "All"
                  ? posts.length
                  : posts.filter((p) =>
                      p.tags.some(
                        (t) => t.name.toLowerCase() === tag.toLowerCase(),
                      ),
                    ).length;
              const isActive = selectedTag === tag;

              return (
                <button
                  key={tag}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedTag(tag)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
                    isActive
                      ? "border border-foreground bg-foreground text-background font-medium shadow-sm"
                      : "border border-border bg-surface text-secondary hover:border-border-strong hover:text-foreground",
                  )}
                >
                  <span>{tag}</span>
                  <span
                    className={cn(
                      "text-[0.65rem] tabular-nums",
                      isActive ? "text-background/75" : "text-muted",
                    )}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles & topics..."
              aria-label="Search articles by keyword or topic"
              className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-4 font-mono text-xs text-foreground placeholder:text-muted focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-8 flex items-center justify-between font-mono text-xs text-muted">
          <p>
            Showing {filteredPosts.length} of {posts.length} articles
          </p>
          {selectedTag !== "All" && (
            <button
              onClick={() => setSelectedTag("All")}
              className="hover:text-foreground underline decoration-border underline-offset-4"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* Articles Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {filteredPosts.map((post, i) => (
              <Reveal key={post.slug} delay={Math.min(i * 0.03, 0.25)}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-card border border-border bg-surface p-6 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-border-strong sm:p-7">
                  {/* Subtle hover glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-burgundy/10 opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
                  />

                  <div>
                    {/* Tag & Reading Time */}
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center rounded-full border border-burgundy/30 bg-burgundy/10 px-2.5 py-0.5 font-mono text-[0.68rem] uppercase tracking-wider text-burgundy-light">
                        {post.primaryTag?.name ?? "Article"}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[0.72rem] text-muted">
                        <Clock className="h-3 w-3" />
                        {post.readingTime || formatDate(post.publishedAt)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-foreground">
                      <Link
                        href={`/writing/${post.slug}`}
                        className="focus:outline-none"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="mt-3 text-sm leading-relaxed text-secondary line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Bottom Action Row */}
                  <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-4">
                    <Link
                      href={`/writing/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:text-burgundy-light"
                    >
                      <span>Read article</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>

                    {post.url && (
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open original ${post.title} on Inovus Labs`}
                        title="Read original publication on Inovus Labs Blog"
                        className="inline-flex items-center gap-1 font-mono text-[0.68rem] text-muted transition-colors hover:text-foreground"
                      >
                        <span>Original</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-card border border-dashed border-border py-20 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-muted" strokeWidth={1.5} />
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              No matching articles found
            </h3>
            <p className="mt-1 font-mono text-xs text-muted">
              No articles matched your criteria for "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSelectedTag("All");
                setSearchQuery("");
              }}
              className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs text-foreground hover:border-border-strong hover:bg-elevated"
            >
              Clear filters
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}
