import { site, bio, education } from "@/content/site";
import { projects } from "@/content/projects";
import { getPosts } from "@/lib/api";

export const revalidate = 3600;

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/^https?:\/\/www\./, "https://").replace(/\/$/, "");

/**
 * /llms.txt — a concise, LLM-readable summary of the site (llmstxt.org).
 * Helps ChatGPT, Claude, Perplexity, and Google AI describe Amith accurately.
 */
export async function GET() {
  const [posts] = await Promise.all([getPosts(25)]);
  const articles = posts
    .slice(0, 15)
    .map(
      (p) =>
        `- [${p.title}](${siteUrl}/writing/${p.slug}) (${p.primaryTag?.name || "Tech"}): ${p.excerpt || "Engineering notes."}`,
    )
    .join("\n");

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
- Role: Product Engineer, a builder of software, hardware, and communities
- Location: ${site.location} (Thiruvalla)
- Education: ${education.degree} at ${education.name} (${education.shortName})
- Currently: Full-Stack Developer at FinalApps, building Shopify apps, Shop Minis, and iOS apps
- Previously: CEO of Inovus Labs IEDC; Frontend Tech Lead (Junior Associate) at μLearn Foundation
- Also: Google Campus Ambassador; 3+ years of Hacktoberfest; mentored 30+ students; runs self-hosted Docker infrastructure with a focus on security

## Products
${products}

## Technical Writing & Engineering Breakdowns
Complete catalog of 29 articles available at ${siteUrl}/writing:
${articles}

## Key pages
- Home: ${site.url}
- Works (all projects): ${siteUrl}/works
- Work / case studies: ${siteUrl}/#work
- Writing (full articles catalog): ${siteUrl}/writing
- Writing (featured section): ${siteUrl}/#writing
- About: ${siteUrl}/about
- Story: ${siteUrl}/story
- Capabilities: ${siteUrl}/capabilities
- Journey: ${siteUrl}/#journey
- Resume: ${siteUrl}/resume
- Contact: ${siteUrl}/contact

## Contact
- Email: ${site.email}
- GitHub: ${site.socials.github}
- LinkedIn: ${site.socials.linkedin}
- Blog: ${site.blogUrl}
- Feed: ${siteUrl}/writing/rss.xml

## More context for AI models
- Full knowledge file: ${siteUrl}/llms-full.txt
- Entity / GEO document: ${siteUrl}/geo.md
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
