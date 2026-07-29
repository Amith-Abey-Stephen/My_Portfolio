import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPosts, getTags } from "@/lib/api";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { BentoGrid } from "@/components/writing/bento-grid";
import { Reveal } from "@/components/motion/reveal";

export const revalidate = 3600;

export async function generateStaticParams() {
  const tags = await getTags();
  return tags.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tags = await getTags();
  const tag = tags.find((t) => t.slug === slug);
  if (!tag) return {};
  return pageMetadata({
    title: `Writing on ${tag.name}`,
    description: `Articles by Amith Abey Stephen tagged ${tag.name}.`,
    path: `/writing/tag/${tag.slug}`,
  });
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [posts, tags] = await Promise.all([getPosts(), getTags()]);
  const tag = tags.find((t) => t.slug === slug);
  if (!tag) notFound();

  const tagged = posts.filter((p) => p.tags.some((t) => t.slug === slug));

  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title={`On ${tag.name}.`}
        lede={`${tagged.length} ${tagged.length === 1 ? "piece" : "pieces"} tagged ${tag.name}.`}
      />

      <Container className="pb-28">
        <Reveal className="mb-10">
          <Link
            href="/#writing"
            className="link-underline inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All writing
          </Link>
        </Reveal>
        <BentoGrid posts={tagged} />
      </Container>
    </>
  );
}
