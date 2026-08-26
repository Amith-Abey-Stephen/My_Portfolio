import { site, bio, education } from "@/content/site";
import { about } from "@/content/about";
import { projects } from "@/content/projects";
import { journey } from "@/content/journey";
import { capabilities } from "@/content/capabilities";
import { now } from "@/content/now";

export const dynamic = "force-static";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

/**
 * /llms-full.txt — a comprehensive LLM knowledge context file (llmstxt.org).
 * Provides deep entity details, products, journey milestones, capabilities,
 * design philosophy, current focus, and contact info for AI models.
 */
export function GET() {
  const productDetails = projects
    .map((p) => {
      const caseStudyText = p.caseStudy
        ? [
            `\n- **Problem**: ${p.caseStudy.problem}`,
            `- **Solution**: ${p.caseStudy.solution}`,
            p.caseStudy.outcome && `- **Outcome**: ${p.caseStudy.outcome}`,
            p.caseStudy.lessons && `- **Key Lesson**: ${p.caseStudy.lessons}`,
          ]
            .filter(Boolean)
            .join("\n")
        : "";

      return `### ${p.title} (${p.slug})
- **Summary**: ${p.summary}
- **Category**: ${p.category}
- **Year**: ${p.year}
- **Status**: ${p.status}
- **Stack**: ${p.stack.join(", ")}
- **Live Link**: ${p.link}
${p.repo ? `- **Repository**: ${p.repo}` : ""}${caseStudyText}`;
    })
    .join("\n\n");

  const journeyDetails = journey
    .map(
      (j) =>
        `- **${j.period}** | **${j.role}** at **${j.organization}**${j.current ? " (Present)" : ""}\n  ${j.description}`,
    )
    .join("\n");

  const capabilitiesDetails = capabilities
    .map((c) => `- **${c.title}**: ${c.summary}\n  Skills: ${c.items.join(", ")}`)
    .join("\n");

  const valuesDetails = about.values
    .map((v) => `- **${v.title}**: ${v.body}`)
    .join("\n");

  const nowDetails = now.sections
    .map(
      (s) =>
        `### ${s.label}\n` + s.items.map((item) => `- ${item}`).join("\n"),
    )
    .join("\n\n");

  const body = `# ${site.author} — Complete AI Knowledge Context

> ${site.purpose} ${site.tagline}

## Core Bio & Philosophy
${bio}

${about.intro.join("\n\n")}

### Current Work & Role Focus
- **Current Position**: Junior Full-Stack Developer at FinalApps (building Shopify apps, Shop Minis, iOS apps, and AI merchant tools).
- **Current Focus**: ${about.currentFocus}

### Engineering & Design Philosophy
${about.philosophy.map((p) => `- ${p}`).join("\n")}

### Core Personal Values
${valuesDetails}

---

## Entity Summary & Background
- **Full Legal Name**: ${site.author}
- **Known As**: Amith
- **Primary Role**: Product Engineer / System Architect
- **Geographic Location**: ${site.location} (Thiruvalla, Kerala, India)
- **Education**: ${education.degree} in Computer Applications, ${education.name} (${education.shortName})
- **Leadership Roles & Milestones**:
  - Junior Full-Stack Developer at FinalApps (current)
  - Former CEO of Inovus Labs IEDC
  - Former Frontend Technical Point of Contact at μLearn Foundation
  - Former Google Campus Ambassador
  - 3+ Years Hacktoberfest Open Source Maintainer & Mentor
- **Website**: ${site.url}
- **Email**: ${site.email}

---

## Technical Capabilities Matrix
${capabilitiesDetails}

---

## Detailed Project Case Studies & Products
${productDetails}

---

## Career Journey & Work History
${journeyDetails}

---

## What I'm Focused On Now (Updated ${now.updated})
${nowDetails}

---

## Verified Contact Links
- Website: ${site.url}
- Resume: ${site.resumeUrl}
- GitHub: ${site.socials.github}
- LinkedIn: ${site.socials.linkedin}
- Email: ${site.email}
- RSS Feed: ${siteUrl}/writing/rss.xml
- Geo Entity Doc: ${siteUrl}/geo.md
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
