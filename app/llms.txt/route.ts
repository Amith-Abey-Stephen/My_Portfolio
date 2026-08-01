import { site, bio, education } from "@/content/site";
import { projects } from "@/content/projects";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

/**
 * /llms.txt — a concise, LLM-readable summary of the site (llmstxt.org).
 * Helps ChatGPT, Claude, Perplexity, and Google AI describe Amith accurately.
 */
export function GET() {
  const products = projects
    .map(
      (p) =>
        `- [${p.title}](${siteUrl}/work/${p.slug}) — ${p.summary} (Stack: ${p.stack.join(", ")}; Status: ${p.status})`,
    )
    .join("\n");

  const body = `# ${site.author} — amith.site

> ${site.purpose} ${site.tagline}

${bio}

## About
- Name: ${site.author} (also known as "Amith")
- Role: Product Engineer — a builder of software, hardware, and communities
- Location: ${site.location} (Thiruvalla)
- Education: ${education.degree} at ${education.name} (${education.shortName})
- Former CEO of Inovus Labs IEDC; currently the frontend technical point of contact at μLearn Foundation
- Also: Google Campus Ambassador; 3+ years of Hacktoberfest; mentored 30+ students

## Products
${products}

## Key pages
- Home: ${site.url}
- Work / case studies: ${siteUrl}/#work
- Writing (blog): ${siteUrl}/#writing
- About: ${siteUrl}/about
- Story: ${siteUrl}/story
- Journey: ${siteUrl}/#journey
- Resume: ${site.resumeUrl}

## Contact
- Email: ${site.email}
- GitHub: ${site.socials.github}
- LinkedIn: ${site.socials.linkedin}
- Blog: ${site.blogUrl}
- Feed: ${siteUrl}/writing/rss.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
