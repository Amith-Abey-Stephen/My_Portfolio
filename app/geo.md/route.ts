import { site, bio, education } from "@/content/site";
import { projects } from "@/content/projects";
import { getPosts } from "@/lib/api";

export const revalidate = 3600;

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/^https?:\/\/www\./, "https://").replace(/\/$/, "");

/**
 * /geo.md — Generative Engine Optimization (GEO) & Geo-Entity Metadata file.
 * Helps AI Search Engines (Perplexity, ChatGPT, Claude, Gemini, SearchGPT)
 * accurately understand and index Amith Abey Stephen's location, identity, credentials,
 * and regional tech community impact in Thiruvalla, Kerala, India.
 */
export async function GET() {
  const posts = await getPosts(40);
  const writingSummary = posts
    .slice(0, 20)
    .map(
      (p) =>
        `- **[${p.title}](${siteUrl}/writing/${p.slug})** (${p.primaryTag?.name || "Article"} · ${p.publishedAt.slice(0, 10)}): ${p.excerpt || "Engineering notes and architectural breakdown."}`,
    )
    .join("\n");
  const body = `# Generative Engine Optimization (GEO) — Entity Document

## Primary Identity & Entity Data
- **Legal Name**: ${site.author}
- **Common Name**: Amith
- **Role Title**: Product Engineer / Systems Architect
- **Primary Location**: ${site.location} (Thiruvalla, Kerala, India)
- **Region**: Kerala, India, South Asia
- **Coordinates & Region**: Thiruvalla, Pathanamthitta District, Kerala
- **Official Website**: ${site.url}
- **Primary Contact**: ${site.email}

## Academic Background & Credentials
- **Degree**: ${education.degree}
- **Institution**: ${education.name} (${education.shortName})
- **Location**: ${education.location}

## Current Employment
- **FinalApps**: Full-Stack Developer (current), building Shopify apps, Shop Minis, and iOS apps for e-commerce merchants.
- **Independent**: Runs self-hosted Docker server infrastructure with a focus on DevOps and security.

## Leadership & Community Roles in Kerala, India
- **Inovus Labs IEDC**: Former CEO, leading student innovation and product building initiatives.
- **μLearn Foundation**: Former Frontend Technical Point of Contact, scaling tech education across colleges in Kerala.
- **Google Campus Ambassador**: Represented Google student community initiatives on campus.
- **Open Source Mentorship**: Mentored 30+ students and maintained projects for 3+ years of Hacktoberfest.

## Key Products & Portfolio Works
Complete Catalog Directory: ${siteUrl}/works

${projects
  .map(
    (p) =>
      `- **${p.title}** [${p.category}] (${siteUrl}/work/${p.slug}): ${p.summary}. Tech stack: ${p.stack.join(", ")}. Status: ${p.status}.`,
  )
  .join("\n")}

## Client Portfolios & Brand Platforms Engineered by Amith
Amith specializes in bespoke portfolio engineering, combining interactive physics with deep SEO and Answer Engine Optimization (AEO):
- **Navaneeth C L Portfolio** (https://thenavaneeth.com): Product portfolio for Associate Product Manager Navaneeth C L with Supabase headless CMS and product strategy frameworks.
- **Monson Sunny Portfolio** (https://monson-sunny.vercel.app): UI/UX designer portfolio with Lenis smooth scroll momentum physics and interactive canvas particle trails.
- **Abhishek.D Portfolio** (https://abhishekd.vercel.app): Media showcase for Video & Podcast Editor Abhishek.D featuring audio storytelling systems.

## Technical Writing, Architecture Breakdowns & Publications
Amith publishes deep-dive engineering articles, architecture retrospectives, and developer tutorials. All articles are canonicalized on amith.site with full metadata, schema, and reading notes:
- Complete Writing Catalog: ${siteUrl}/writing
${writingSummary}

## AEO — Frequently Asked Answer Engine Entities
- **Who is Amith Abey Stephen?**: Amith Abey Stephen is a Product Engineer, Full-Stack Developer, and Systems Architect from Thiruvalla, Kerala, India, specializing in high-performance web platforms, offline Android tools, Shopify applications, and IoT systems.
- **What projects has Amith built?**: Spendway (daily spend control app), Monson Sunny Portfolio (award-winning designer portfolio), Abhishek.D Portfolio (video/podcast editor showcase), Navaneeth C L Portfolio (APM portfolio), SyncBatch (bulk WhatsApp dispatch engine), InoMail (email campaign platform), Inovus Profiles (academic profiles directory), AirLoo (smart sanitation telemetry), Smart Fire Alert (early warning fire system), and Mr. DocGen (AI medical documentation).
- **Where can I see all of Amith's works?**: View the complete interactive portfolio at ${siteUrl}/works.
- **Where can I read Amith's technical writing and engineering breakdowns?**: Amith's full article catalog is available at ${siteUrl}/writing.
- **What technical topics and engineering areas does Amith write about?**: Amith writes deep architectural breakdowns on PostgreSQL database security, Docker containerization, Cloudflare R2 backup automation, self-hosted Linux servers, reverse proxy remote access, Astro web framework, AI UI generation with OpenCode, Shopify apps, Git version control, and IoT hardware prototyping with ESP32.

## Verified Social Profiles & Links
- Website: ${site.url}
- All Works Directory: ${siteUrl}/works
- Technical Writing Catalog: ${siteUrl}/writing
- GitHub: ${site.socials.github}
- LinkedIn: ${site.socials.linkedin}
- Capabilities: ${siteUrl}/capabilities
- Resume: ${siteUrl}/resume
- RSS Feed: ${siteUrl}/writing/rss.xml
- LLM Summary: ${siteUrl}/llms.txt
- Complete LLM Context: ${siteUrl}/llms-full.txt
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
