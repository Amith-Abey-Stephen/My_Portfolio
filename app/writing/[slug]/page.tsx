import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Clock, Tag as TagIcon } from "lucide-react";
import { getPost, getPosts, getAdjacentPosts } from "@/lib/api";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/container";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { ReadingProgress } from "@/components/writing/reading-progress";
import { TableOfContents } from "@/components/writing/table-of-contents";
import { ShareRow } from "@/components/writing/share-row";
import { ArticleByline } from "@/components/writing/article-byline";
import { ContactCTA } from "@/components/sections/contact-cta";
import { processArticleHtml } from "@/lib/toc";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const articleKeywords = [
    post.title,
    `${post.title} article`,
    `${post.title} Amith Abey Stephen`,
    ...post.tags.map((t) => t.name),
    ...post.tags.map((t) => `${t.name} tutorial`),
    "Amith Abey Stephen writing",
    "Product Engineer Kerala",
    "Inovus Labs Blog",
  ];

  return pageMetadata({
    title: post.title,
    description: post.excerpt || `Read ${post.title} by ${site.author}.`,
    path: `/writing/${post.slug}`,
    keywords: articleKeywords,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt || post.publishedAt,
    authors: [site.author],
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const { prev, next } = await getAdjacentPosts(slug);
  const { html: processedHtml, toc } = processArticleHtml(post.html || "");
  const canonicalArticleUrl = `${siteUrl}/writing/${post.slug}`;

  return (
    <>
      <ReadingProgress />
      <ArticleJsonLd post={post} />

      <article className="pb-24 pt-28 md:pt-36">
        <Container className="max-w-4xl">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/writing"
              className="group inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>Back to all writing</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="border-b border-border pb-10">
            <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
              {post.primaryTag && (
                <span className="inline-flex items-center gap-1 rounded-full border border-burgundy/30 bg-burgundy/10 px-2.5 py-0.5 text-[0.7rem] uppercase tracking-wider text-burgundy-light">
                  <TagIcon className="h-3 w-3" />
                  {post.primaryTag.name}
                </span>
              )}
              <span>{formatDate(post.publishedAt)}</span>
              {post.readingTime && (
                <>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readingTime}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl [text-wrap:balance]">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="mt-5 text-lg leading-relaxed text-secondary sm:text-xl">
                {post.excerpt}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-6 border-t border-border/60 pt-6">
              <ArticleByline date={post.publishedAt} />
              <ShareRow title={post.title} url={canonicalArticleUrl} />
            </div>
          </header>

          {/* Feature Image */}
          {post.featureImage && (
            <div className="my-10 overflow-hidden rounded-card border border-border">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={post.featureImage}
                  alt={post.title}
                  fill
                  unoptimized
                  className="object-cover"
                  priority
                />
              </div>
              {post.featureImageCaption && (
                <p className="border-t border-border bg-surface/50 p-3 text-center font-mono text-xs text-muted">
                  {post.featureImageCaption}
                </p>
              )}
            </div>
          )}

          {/* Outbound Authority CTA Banner */}
          {post.url && (
            <div className="my-10 flex flex-col gap-4 rounded-card border border-burgundy/30 bg-gradient-to-r from-burgundy/10 via-surface to-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-burgundy-light">
                  Original Publication · Inovus Labs
                </div>
                <p className="mt-1 text-sm text-secondary">
                  Published and syndicated from the Inovus Labs engineering publication by {site.author}.
                </p>
              </div>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-burgundy/40 bg-burgundy/20 px-5 py-2.5 font-mono text-xs text-foreground transition-all duration-200 hover:border-foreground hover:bg-burgundy/40 active:scale-[0.98]"
              >
                <span>Read on Inovus Labs</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          )}

          {/* Layout: Sidebar TOC + Main Content */}
          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_240px]">
            {/* Article Body */}
            <div className="min-w-0">
              {processedHtml ? (
                <div
                  className="prose prose-invert prose-burgundy max-w-none font-sans text-base leading-relaxed text-secondary prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground prose-a:text-burgundy-light prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-elevated prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-pre:rounded-card prose-pre:border prose-pre:border-border prose-pre:bg-surface prose-img:rounded-card prose-img:border prose-img:border-border"
                  dangerouslySetInnerHTML={{ __html: processedHtml }}
                />
              ) : (
                <div className="rounded-card border border-border bg-surface p-8 text-center">
                  <p className="text-secondary">
                    {post.excerpt || "Full article text is available on the original publication."}
                  </p>
                  {post.url && (
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-elevated px-5 py-2.5 font-mono text-xs text-foreground hover:border-foreground"
                    >
                      <span>Read full story on Inovus Labs</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}

              {/* End of article discussion CTA */}
              {post.url && (
                <div className="mt-14 rounded-card border border-border bg-surface/80 p-6 text-center sm:p-8">
                  <h3 className="text-lg font-semibold text-foreground">
                    Enjoyed this reflection?
                  </h3>
                  <p className="mt-2 text-sm text-secondary">
                    Read community comments, responses, and join the discussion directly on Inovus Labs.
                  </p>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-foreground px-5 py-2.5 font-mono text-xs font-medium text-background transition-all duration-200 hover:bg-foreground/90 active:scale-[0.98]"
                  >
                    <span>Discuss on Inovus Labs Blog</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              )}
            </div>

            {/* Sidebar: Table of Contents & Tags */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 flex flex-col gap-8">
                {toc.length > 1 && <TableOfContents items={toc} />}

                {post.tags.length > 0 && (
                  <div>
                    <p className="eyebrow mb-3">Tags</p>
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((t) => (
                        <Link
                          key={t.slug}
                          href={`/writing/tag/${t.slug}`}
                          className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[0.7rem] text-muted transition-colors hover:border-border-strong hover:text-foreground"
                        >
                          {t.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* Adjacent Posts Navigation */}
          {(prev || next) && (
            <nav
              aria-label="Adjacent articles"
              className="mt-16 grid grid-cols-1 gap-6 border-t border-border pt-10 sm:grid-cols-2"
            >
              {prev ? (
                <Link
                  href={`/writing/${prev.slug}`}
                  className="group flex flex-col rounded-card border border-border bg-surface p-5 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-border-strong"
                >
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider text-muted">
                    ← Newer Post
                  </span>
                  <span className="mt-2 font-medium text-foreground transition-colors group-hover:text-burgundy-light">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {next ? (
                <Link
                  href={`/writing/${next.slug}`}
                  className="group flex flex-col text-right rounded-card border border-border bg-surface p-5 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-border-strong"
                >
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider text-muted">
                    Older Post →
                  </span>
                  <span className="mt-2 font-medium text-foreground transition-colors group-hover:text-burgundy-light">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          )}
        </Container>
      </article>

      <ContactCTA />
    </>
  );
}
