import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Tag as TagIcon } from "lucide-react";
import { getPosts, getTags } from "@/lib/api";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/layout/page-header";
import { ContactCTA } from "@/components/sections/contact-cta";
import { AllWritingView } from "@/components/writing/all-writing-view";
import { BreadcrumbJsonLd, BlogJsonLd } from "@/components/seo/json-ld";

export const revalidate = 3600;

export async function generateStaticParams() {
  const tags = await getTags();
  return tags.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tags = await getTags();
  const tag = tags.find((t) => t.slug === slug);
  const tagName = tag?.name ?? slug;

  return pageMetadata({
    title: `Writing tagged "${tagName}"`,
    description: `Articles and engineering reflections tagged "${tagName}" by ${site.author}.`,
    path: `/writing/tag/${slug}`,
    keywords: [
      tagName,
      `${tagName} articles`,
      `${tagName} engineering`,
      `${tagName} tutorials`,
      `${tagName} guides`,
      `${tagName} best practices`,
      `${site.author} ${tagName}`,
      `${site.author} writing`,
      `Inovus Labs Blog ${tagName}`,
    ],
  });
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [allPosts, allTags] = await Promise.all([getPosts(), getTags()]);
  const tag = allTags.find((t) => t.slug === slug);

  if (!tag) notFound();

  const filteredPosts = allPosts.filter((p) =>
    p.tags.some((t) => t.slug === slug),
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Writing", path: "/writing" },
          { name: `Tag: ${tag.name}`, path: `/writing/tag/${slug}` },
        ]}
      />
      <BlogJsonLd
        posts={filteredPosts}
        url={`${site.url}/writing/tag/${slug}`}
        name={`Articles Tagged "${tag.name}" — Amith Abey Stephen`}
        description={`Curated technical articles and engineering notes tagged "${tag.name}" by Amith Abey Stephen.`}
      />

      <PageHeader
        eyebrow="Writing Tag"
        title={`Tagged: ${tag.name}`}
        lede={`Showing ${filteredPosts.length} article${filteredPosts.length === 1 ? "" : "s"} discussing ${tag.name.toLowerCase()}.`}
      >
        <div className="mt-4">
          <Link
            href="/writing"
            className="group inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>View all articles</span>
          </Link>
        </div>
      </PageHeader>

      <AllWritingView posts={filteredPosts} tags={allTags} />

      <ContactCTA />
    </>
  );
}
