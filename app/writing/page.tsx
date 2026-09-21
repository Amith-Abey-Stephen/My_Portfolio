import { getPosts, getTags } from "@/lib/api";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/layout/page-header";
import { ContactCTA } from "@/components/sections/contact-cta";
import { BlogJsonLd } from "@/components/seo/json-ld";
import { AllWritingView } from "@/components/writing/all-writing-view";
import { ArrowUpRight } from "lucide-react";

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Writing — Notes from the build",
  description:
    "Reflections on product engineering, PostgreSQL server security, modern frontend architecture, and lessons from building software products by Amith Abey Stephen.",
  path: "/writing",
  keywords: [
    "Amith Abey Stephen blog",
    "Product engineering writing",
    "Notes from the build",
    "PostgreSQL Docker security",
    "Cloudflare R2 backup automation",
    "Self-hosted Linux server",
    "Homelab devops",
    "Reverse proxy remote access",
    "Astro web framework",
    "AI UI generation OpenCode",
    "Shopify app development",
    "Git version control tutorial",
    "IoT hardware ESP32",
    "Electronics circuit prototyping",
    "Ghost CMS blog",
    "Inovus Labs Blog",
    "Full-stack developer Kerala",
    "Software architecture notes",
    "Technical writing India",
  ],
});

export default async function WritingPage() {
  const posts = await getPosts();
  const tags = await getTags();

  return (
    <>
      <BlogJsonLd posts={posts} />

      <PageHeader
        eyebrow="Writing"
        title="Notes from the build."
        lede="Honest reflections on products, systems architecture, security, and lessons from the messy middle of product engineering."
      >
        <div className="mt-6">
          <a
            href={site.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs text-foreground transition-all duration-200 hover:border-foreground hover:bg-elevated"
          >
            <span>Read on Inovus Labs Blog</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </PageHeader>

      <AllWritingView posts={posts} tags={tags} />

      <ContactCTA />
    </>
  );
}
