import { NextRequest } from "next/server";
import { site, bio, education, about, projects, journey, capabilities, story, storyIntro, now } from "@/content/index";
import { getPosts, getPost } from "@/lib/api";
import type { StoryChapter } from "@/types";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

function simpleHtmlToMarkdown(html: string): string {
  if (!html) return "";
  return html
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "\n# $1\n")
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "\n## $1\n")
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "\n### $1\n")
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, "\n#### $1\n")
    .replace(/<p[^>]*>(.*?)<\/p>/gi, "\n$1\n")
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
    .replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
    .replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*")
    .replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`")
    .replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, "\n```\n$1\n```\n")
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")
    .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
    .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, "\n$1\n")
    .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, "\n$1\n")
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, "\n> $1\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  // Behind the proxy rewrite, request.url is still the ORIGINAL page URL
  // (e.g. /about) — the rewrite's ?path= query never reaches this handler.
  const isRewrite = url.pathname !== "/api/markdown-negotiation";
  const rawPath = isRewrite ? url.pathname : url.searchParams.get("path") || "/";
  const path = rawPath.replace(/\/$/, "") || "/";

  let title = `${site.author} — ${site.role}`;
  let content = "";
  let status = 200;

  // Route matching
  if (path === "/") {
    title = `${site.author} — Product Engineer`;
    const featuredProjects = projects
      .map((p) => `- [${p.title}](${siteUrl}/work/${p.slug}): ${p.summary} (Stack: ${p.stack.join(", ")})`)
      .join("\n");

    const recentJourney = journey
      .map((j) => `- **${j.period}** | **${j.role}** at ${j.organization}: ${j.description}`)
      .join("\n");

    content = `# ${site.author}

> ${site.purpose} ${site.tagline}

## Bio & Overview
${bio}

## Current Focus
${about.currentFocus}

## Featured Work & Products
${featuredProjects}

## Recent Career & Community Milestones
${recentJourney}

## Key Navigation & Links
- Website: ${siteUrl}
- About: ${siteUrl}/about
- Story: ${siteUrl}/story
- Resume: ${siteUrl}/resume
- Capabilities: ${siteUrl}/capabilities
- Now: ${siteUrl}/now
- Contact: ${siteUrl}/#contact
- LLM Knowledge: ${siteUrl}/llms-full.txt
`;
  } else if (path === "/about") {
    title = `About — ${site.author}`;
    const valuesList = about.values
      .map((v) => `- **${v.title}**: ${v.body}`)
      .join("\n");

    content = `# About ${site.author}

> ${site.role} based in ${site.location}

## Introduction
${about.intro.join("\n\n")}

## Current Focus
${about.currentFocus}

## Engineering & Design Philosophy
${about.philosophy.map((p) => `- ${p}`).join("\n")}

## Core Values
${valuesList}

## Background & Education
- Degree: ${education.degree} from ${education.name} (${education.shortName}), ${education.location}.
- Roles: Former CEO of Inovus Labs IEDC, Frontend Technical Lead at μLearn Foundation, Junior Full-Stack Developer at FinalApps.
`;
  } else if (path === "/story") {
    title = `Story — ${site.author}`;
    const chaptersList = (story as StoryChapter[])
      .map(
        (c: StoryChapter) => `### Chapter ${c.index}: ${c.title}
${Array.isArray(c.body) ? c.body.join("\n\n") : c.body}
`,
      )
      .join("\n");

    content = `# The Story of ${site.author}

> ${storyIntro}

${chaptersList}
`;
  } else if (path === "/now") {
    title = `Now — ${site.author}`;
    const sectionsList = now.sections
      .map((s) => `### ${s.label}\n` + s.items.map((item) => `- ${item}`).join("\n"))
      .join("\n\n");

    content = `# What ${site.author} Is Focused On Now

> Updated ${now.updated}

${sectionsList}
`;
  } else if (path === "/resume") {
    title = `Resume — ${site.author}`;
    const expList = journey
      .map(
        (j) => `### ${j.role} — ${j.organization} (${j.period})
${j.description}
`,
      )
      .join("\n");

    const projectsSummary = projects
      .map((p) => `- **${p.title}**: ${p.summary} (${p.stack.join(", ")})`)
      .join("\n");

    content = `# Resume — ${site.author}

- Email: ${site.email}
- Location: ${site.location}
- Portfolio: ${siteUrl}
- GitHub: ${site.socials.github}
- LinkedIn: ${site.socials.linkedin}

## Summary
${bio}

## Experience & Leadership
${expList}

## Education
- **${education.degree}** — ${education.name} (${education.shortName}), ${education.location}

## Key Projects
${projectsSummary}
`;
  } else if (path === "/capabilities") {
    title = `Capabilities — ${site.author}`;
    const capList = capabilities
      .map(
        (c) => `### ${c.title}
${c.summary}

- **Skills**: ${c.items.join(", ")}
`,
      )
      .join("\n");

    content = `# Technical Capabilities Matrix

${capList}
`;
  } else if (path === "/contact") {
    title = `Contact — ${site.author}`;
    content = `# Contact ${site.author}

${site.purpose}

- **Email**: ${site.email}
- **Location**: ${site.location}
- **GitHub**: ${site.socials.github}
- **LinkedIn**: ${site.socials.linkedin}
- **Website**: ${siteUrl}
`;
  } else if (path === "/work") {
    title = `Work & Case Studies — ${site.author}`;
    const allProjects = projects
      .map(
        (p) => `### [${p.title}](${siteUrl}/work/${p.slug})
- **Summary**: ${p.summary}
- **Category**: ${p.category} | **Status**: ${p.status} | **Year**: ${p.year}
- **Stack**: ${p.stack.join(", ")}
- **Link**: ${p.link}
`,
      )
      .join("\n");

    content = `# Work & Case Studies — ${site.author}

${allProjects}
`;
  } else if (path.startsWith("/work/")) {
    const slug = path.replace("/work/", "");
    const project = projects.find((p) => p.slug === slug);
    if (project) {
      title = `${project.title} — Case Study`;
      const cs = project.caseStudy;
      const csText = cs
        ? `
## Case Study
- **Problem**: ${cs.problem}
- **Solution**: ${cs.solution}
${cs.research ? `- **Research**: ${cs.research}` : ""}
${cs.design ? `- **Design**: ${cs.design}` : ""}
${cs.development ? `- **Development**: ${cs.development}` : ""}
${cs.challenges ? `- **Challenges**: ${cs.challenges}` : ""}
- **Outcome**: ${cs.outcome}
- **Key Lessons**: ${cs.lessons}
`
        : "";

      content = `# ${project.title}

> ${project.summary}

- **Category**: ${project.category}
- **Year**: ${project.year}
- **Status**: ${project.status}
- **Tech Stack**: ${project.stack.join(", ")}
- **Live URL**: ${project.link}
${project.repo ? `- **Repository**: ${project.repo}` : ""}
${csText}
`;
    } else {
      status = 404;
      content = `# Project Not Found\nThe requested project "${slug}" could not be found.`;
    }
  } else if (path === "/writing") {
    title = `Writing — ${site.author}`;
    const posts = await getPosts();
    const postsList = posts
      .map(
        (p) => `- [${p.title}](${siteUrl}/writing/${p.slug}) (${p.readingTime || "Article"})
  ${p.excerpt}`,
      )
      .join("\n\n");

    content = `# Writing & Articles by ${site.author}

${postsList || "No articles found."}
`;
  } else if (path.startsWith("/writing/tag/")) {
    const tagSlug = path.replace("/writing/tag/", "");
    title = `Writing tagged "${tagSlug}" — ${site.author}`;
    const posts = await getPosts();
    const filtered = posts.filter((p) => p.tags.some((t) => t.slug === tagSlug));
    const postsList = filtered
      .map((p) => `- [${p.title}](${siteUrl}/writing/${p.slug}): ${p.excerpt}`)
      .join("\n\n");

    content = `# Articles tagged "${tagSlug}"

${postsList || "No articles found for this tag."}
`;
  } else if (path.startsWith("/writing/")) {
    const slug = path.replace("/writing/", "");
    const post = await getPost(slug);
    if (post) {
      title = `${post.title} — ${site.author}`;
      const bodyMd = post.html ? simpleHtmlToMarkdown(post.html) : post.excerpt;

      content = `# ${post.title}

> Published: ${new Date(post.publishedAt).toLocaleDateString()} | ${post.readingTime}
> Tags: ${post.tags.map((t) => t.name).join(", ")}

${bodyMd}
`;
    } else {
      status = 404;
      content = `# Article Not Found\nThe requested article "${slug}" could not be found.`;
    }
  } else {
    status = 404;
    content = `# Page Not Found

> ${site.purpose}

The path "${path}" could not be found.

- Website: ${siteUrl}
- LLM Context: ${siteUrl}/llms-full.txt
`;
  }

  // Calculate approximate token count for x-markdown-tokens header
  const tokenCount = Math.max(1, Math.ceil(content.length / 4));

  return new Response(content, {
    status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // Rewrite responses share their URL with the HTML page; a shared cache
      // that mishandles Vary would then serve markdown to browsers.
      "Cache-Control": isRewrite
        ? "private, no-store"
        : "public, max-age=3600, s-maxage=3600",
      "Vary": "Accept",
      "x-markdown-tokens": String(tokenCount),
    },
  });
}
