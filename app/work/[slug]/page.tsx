import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects, getProjectBySlug } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/container";
import { StatusBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ContactCTA } from "@/components/sections/contact-cta";
import { Reveal } from "@/components/motion/reveal";
import type { ProjectCaseStudy } from "@/types";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

// Ordered case-study sections (docs 04: Problem → Lessons).
const sections: { key: keyof ProjectCaseStudy; label: string }[] = [
  { key: "problem", label: "The Problem" },
  { key: "solution", label: "The Solution" },
  { key: "research", label: "Research" },
  { key: "design", label: "Design" },
  { key: "development", label: "Development" },
  { key: "challenges", label: "Challenges" },
  { key: "outcome", label: "Outcome" },
  { key: "lessons", label: "Lessons" },
];

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const Icon = project.icon;

  return (
    <>
      <header className="pt-32 pb-14 md:pt-40 md:pb-16">
        <Container>
          <Reveal>
            <Link
              href="/work"
              className="link-underline inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All work
            </Link>
          </Reveal>

          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Reveal>
                <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-card border border-border bg-surface text-burgundy-light">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
                  {project.title}
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-secondary md:text-xl">
                  {project.summary}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="shrink-0">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={project.status} />
                <span className="font-mono text-xs text-muted">
                  {project.year}
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </Reveal>

          {(project.link || project.repo) && (
            <Reveal delay={0.25} className="mt-8 flex flex-wrap gap-3">
              {project.link && (
                <ButtonLink href={project.link} variant="primary" size="sm">
                  Visit <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
              )}
              {project.repo && (
                <ButtonLink href={project.repo} variant="secondary" size="sm">
                  Source <ArrowUpRight className="h-4 w-4" />
                </ButtonLink>
              )}
            </Reveal>
          )}
        </Container>
      </header>

      <Container className="pb-24">
        <div className="mx-auto max-w-3xl border-t border-border">
          {sections.map(({ key, label }) => {
            const body = project.caseStudy[key];
            if (!body) return null;
            return (
              <Reveal
                key={key}
                className="grid gap-3 border-b border-border py-10 md:grid-cols-[180px_1fr] md:gap-10"
              >
                <p className="eyebrow pt-1">{label}</p>
                <p className="text-lg leading-relaxed text-secondary">{body}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>

      <ContactCTA />
    </>
  );
}
