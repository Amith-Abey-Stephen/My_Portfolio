import { site, bio, education } from "@/content/site";
import { projects } from "@/content/projects";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

/**
 * /geo.md — Generative Engine Optimization (GEO) & Geo-Entity Metadata file.
 * Helps AI Search Engines (Perplexity, ChatGPT, Claude, Gemini, SearchGPT)
 * accurately understand and index Amith Abey Stephen's location, identity, credentials,
 * and regional tech community impact in Thiruvalla, Kerala, India.
 */
export function GET() {
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
${projects
  .map(
    (p) =>
      `- **${p.title}** (${siteUrl}/work/${p.slug}): ${p.summary}. Built using ${p.stack.join(", ")}.`,
  )
  .join("\n")}

## Verified Social Profiles & Links
- Website: ${site.url}
- GitHub: ${site.socials.github}
- LinkedIn: ${site.socials.linkedin}
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
