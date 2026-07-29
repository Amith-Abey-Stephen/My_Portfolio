import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import {
  getPost,
  getPosts,
  getRelatedPosts,
  getAdjacentPosts,
} from "@/lib/api";
import { processArticleHtml } from "@/lib/toc";
import { site } from "@/content/site";
import { formatDate } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { ReadingProgress } from "@/components/writing/reading-progress";
import { TableOfContents } from "@/components/writing/table-of-contents";
import { ShareRow } from "@/components/writing/share-row";
import { ArticleByline } from "@/components/writing/article-byline";
import { ArticleTile } from "@/components/writing/article-tile";
import { ContactCTA } from "@/components/sections/contact-cta";
import { Reveal } from "@/components/motion/reveal";

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
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const description = post.metaDescription ?? post.excerpt;
  const images = post.featureImage ? [post.featureImage] : [];

  return {
    title: post.metaTitle ?? post.title,
    description,
    // Canonical points to the original Inovus publication (syndication-safe).
    alternates: { canonical: post.url },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: `${siteUrl}/writing/${post.slug}`,
      images,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [site.author],
      tags: post.tags.map((t) => t.name),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { html, toc } = processArticleHtml(post.html);
  const [related, adjacent] = await Promise.all([
    getRelatedPosts(post),
    getAdjacentPosts(slug),
  ]);
  const shareUrl = `${siteUrl}/writing/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.featureImage ? [post.featureImage] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: site.author, url: site.url },
    mainEntityOfPage: shareUrl,
    url: shareUrl,
    keywords: post.tags.map((t) => t.name).join(", "),
  };

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* Header */}
        <header className="pt-28 md:pt-32">
          <Container>
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <Link
                  href="/#writing"
                  className="link-underline inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted hover:text-foreground"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> All writing
                </Link>
              </Reveal>

              <Reveal delay={0.05}>
                <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted">
                  {post.primaryTag && (
                    <Link
                      href={`/writing/tag/${post.primaryTag.slug}`}
                      className="rounded-full border border-burgundy/30 bg-burgundy/10 px-2.5 py-1 uppercase tracking-wider text-burgundy-light transition-colors hover:border-burgundy/50"
                    >
                      {post.primaryTag.name}
                    </Link>
                  )}
                  <span>{formatDate(post.publishedAt)}</span>
                  {post.readingTime && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.readingTime}
                    </span>
                  )}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-5xl">
                  {post.title}
                </h1>
              </Reveal>

              {post.excerpt && (
                <Reveal delay={0.15}>
                  <p className="mt-6 text-lg leading-relaxed text-secondary md:text-xl">
                    {post.excerpt}
                  </p>
                </Reveal>
              )}

              <Reveal delay={0.2}>
                <div className="mt-8 border-t border-border pt-6">
                  <ArticleByline date={post.publishedAt} />
                </div>
              </Reveal>
            </div>
          </Container>
        </header>

        {/* Feature image */}
        {post.featureImage && (
          <Container className="mt-12">
            <Reveal y={0}>
              <figure className="mx-auto max-w-4xl">
                <div className="relative aspect-[16/9] overflow-hidden rounded-card border border-border bg-surface">
                  <Image
                    src={post.featureImage}
                    alt={post.title}
                    fill
                    unoptimized
                    priority
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover"
                  />
                </div>
                {post.featureImageCaption && (
                  <figcaption
                    className="mt-3 text-center text-sm text-muted"
                    dangerouslySetInnerHTML={{ __html: post.featureImageCaption }}
                  />
                )}
              </figure>
            </Reveal>
          </Container>
        )}

        {/* Body: sticky rail + prose */}
        <Container className="mt-14 pb-8">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[210px_minmax(0,1fr)] lg:gap-16">
            <aside className="order-2 space-y-8 lg:order-1 lg:sticky lg:top-28 lg:self-start">
              <div className="hidden lg:block">
                <TableOfContents items={toc} />
              </div>
              <ShareRow title={post.title} url={shareUrl} />
            </aside>

            <div
              className="prose prose-lg prose-editorial order-1 max-w-none lg:order-2"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </Container>

        {/* Tags + original link */}
        <Container className="pb-4">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag.slug}
                  href={`/writing/tag/${tag.slug}`}
                  className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-border-strong hover:text-foreground"
                >
                  {tag.name}
                </Link>
              ))}
            </div>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-1 whitespace-nowrap font-mono text-xs text-muted hover:text-foreground"
            >
              Originally on the Inovus blog
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </Container>

        {/* Prev / next */}
        {(adjacent.prev || adjacent.next) && (
          <Container className="py-10">
            <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
              {adjacent.prev ? (
                <Link
                  href={`/writing/${adjacent.prev.slug}`}
                  className="group rounded-card border border-border bg-surface p-6 transition-colors hover:border-border-strong"
                >
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted">
                    <ArrowLeft className="h-3.5 w-3.5" /> Newer
                  </span>
                  <p className="mt-2 font-medium text-foreground group-hover:text-burgundy-light">
                    {adjacent.prev.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
              {adjacent.next && (
                <Link
                  href={`/writing/${adjacent.next.slug}`}
                  className="group rounded-card border border-border bg-surface p-6 text-right transition-colors hover:border-border-strong"
                >
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted">
                    Older <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <p className="mt-2 font-medium text-foreground group-hover:text-burgundy-light">
                    {adjacent.next.title}
                  </p>
                </Link>
              )}
            </div>
          </Container>
        )}

        {/* Related */}
        {related.length > 0 && (
          <Container className="py-10">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-8 text-2xl font-semibold tracking-tight text-foreground">
                Keep reading
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <ArticleTile key={r.slug} post={r} className="h-60" />
                ))}
              </div>
            </div>
          </Container>
        )}
      </article>

      <ContactCTA />
    </>
  );
}
