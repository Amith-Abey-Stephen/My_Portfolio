"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Layers,
  Code2,
  CheckCircle2,
  Compass,
} from "lucide-react";
import {
  Database,
  Mail,
  FileText,
  Activity,
  Flame,
  Sprout,
  FolderGit2,
} from "lucide-react";
import type { Project, ProjectCaseStudy } from "@/types";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { StatusBadge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const PROJECT_ICONS: Record<string, React.ElementType> = {
  syncbatch: Database,
  inomail: Mail,
  "mr-docgen": FileText,
  airloo: Activity,
  "smart-fire-alert": Flame,
  "smart-irrigation": Sprout,
};

const SECTIONS: { key: keyof ProjectCaseStudy; label: string }[] = [
  { key: "problem", label: "The Problem" },
  { key: "solution", label: "The Solution" },
  { key: "research", label: "Research" },
  { key: "design", label: "Design" },
  { key: "development", label: "Development" },
  { key: "challenges", label: "Challenges" },
  { key: "outcome", label: "Outcome" },
  { key: "lessons", label: "Lessons" },
];

export function ProjectCaseStudyView({
  project,
  prevProject,
  nextProject,
}: {
  project: Omit<Project, "icon"> & { icon?: React.ElementType };
  prevProject?: Omit<Project, "icon"> & { icon?: React.ElementType };
  nextProject?: Omit<Project, "icon"> & { icon?: React.ElementType };
}) {
  const [activeSection, setActiveSection] = useState<string>("problem");
  const railRef = useRef<HTMLDivElement>(null);

  const Icon = PROJECT_ICONS[project.slug] || FolderGit2;

  const availableSections = SECTIONS.filter(
    (s) => project.caseStudy[s.key] !== undefined,
  );

  const scrollToSection = (key: string) => {
    const el = document.getElementById(`case-study-${key}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of availableSections) {
        const el = document.getElementById(`case-study-${section.key}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.key);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [availableSections]);

  // Keep the active pill visible in the mobile rail as the reader scrolls.
  // Horizontal-only scroll — scrollIntoView would also drag the page vertically.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const pill = rail.querySelector<HTMLElement>(
      `[data-section="${activeSection}"]`,
    );
    if (!pill) return;
    rail.scrollTo({
      left: pill.offsetLeft - (rail.clientWidth - pill.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [activeSection]);

  return (
    <article className="relative">
      {/* Editorial Header */}
      <header className="pt-28 pb-14 md:pt-36 md:pb-20 border-b border-border bg-surface/30">
        <Container>
          <Reveal>
            <Link
              href="/#work"
              className="link-underline inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Selected Work
            </Link>
          </Reveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px] lg:gap-16 lg:items-end">
            <div>
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-card border border-border/80 bg-surface text-burgundy-light shadow-md">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-muted">
                    {project.category}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl">
                  {project.title}
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-secondary md:text-xl">
                  {project.summary}
                </p>
              </Reveal>

              <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border/80 bg-background/60 px-3.5 py-1 font-mono text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </Reveal>

              {(Boolean(project.link) || Boolean(project.repo)) && (
                <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-3">
                  {Boolean(project.link) && (
                    <ButtonLink
                      href={project.link!}
                      target="_blank"
                      rel="noreferrer"
                      variant="primary"
                    >
                      Open Now <ArrowUpRight className="h-4 w-4" />
                    </ButtonLink>
                  )}
                  {Boolean(project.repo) && (
                    <ButtonLink
                      href={project.repo!}
                      target="_blank"
                      rel="noreferrer"
                      variant="secondary"
                    >
                      Source Code <ArrowUpRight className="h-4 w-4" />
                    </ButtonLink>
                  )}
                </Reveal>
              )}
            </div>

            {/* Quick Details Sidebar Box */}
            <Reveal delay={0.25} className="shrink-0">
              <div className="rounded-card border border-border/80 bg-surface/60 p-6 space-y-4 backdrop-blur-md">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-muted">STATUS</span>
                  <StatusBadge status={project.status} />
                </div>

                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-muted">YEAR</span>
                  <span className="text-foreground">{project.year}</span>
                </div>

                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-muted">CATEGORY</span>
                  <span className="text-foreground">{project.category}</span>
                </div>

                {(Boolean(project.link) || Boolean(project.repo)) && (
                  <div className="pt-3 border-t border-border/40 flex flex-col gap-2">
                    {Boolean(project.link) && (
                      <ButtonLink
                        href={project.link!}
                        target="_blank"
                        rel="noreferrer"
                        variant="primary"
                        size="sm"
                        className="w-full justify-center"
                      >
                        Open Now <ArrowUpRight className="h-4 w-4" />
                      </ButtonLink>
                    )}
                    {Boolean(project.repo) && (
                      <ButtonLink
                        href={project.repo!}
                        target="_blank"
                        rel="noreferrer"
                        variant="secondary"
                        size="sm"
                        className="w-full justify-center"
                      >
                        Source Code <ArrowUpRight className="h-4 w-4" />
                      </ButtonLink>
                    )}
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </header>

      {/* Main Dual-Column Case Study Reader */}
      <Container className="py-12 md:py-24">
        {/* Mobile Sticky Section Navigation Rail */}
        <div
          ref={railRef}
          className="sticky top-16 z-30 mb-8 block lg:hidden rounded-full border border-border/80 bg-background/90 p-1.5 backdrop-blur-md overflow-x-auto shadow-md"
        >
          <div className="flex items-center gap-1.5 min-w-max">
            {availableSections.map((s) => {
              const isActive = activeSection === s.key;
              return (
                <button
                  key={s.key}
                  data-section={s.key}
                  onClick={() => scrollToSection(s.key)}
                  className={cn(
                    "rounded-full px-3 py-1 font-mono text-[0.7rem] font-medium transition-all duration-300",
                    isActive
                      ? "bg-burgundy text-white shadow-xs"
                      : "text-muted hover:text-foreground bg-surface/40",
                  )}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* Sticky Table of Contents Navigation (Desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <p className="font-mono text-[0.7rem] uppercase tracking-wider text-muted">
                Case Study Index
              </p>
              <nav className="space-y-1.5 border-l border-border pl-4">
                {availableSections.map((s) => {
                  const isActive = activeSection === s.key;
                  return (
                    <button
                      key={s.key}
                      onClick={() => scrollToSection(s.key)}
                      className={cn(
                        "flex w-full items-center gap-2 text-left font-mono text-xs transition-colors py-1",
                        isActive
                          ? "font-semibold text-burgundy-light"
                          : "text-muted hover:text-foreground",
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-all",
                          isActive
                            ? "bg-burgundy scale-125"
                            : "bg-border group-hover:bg-muted",
                        )}
                      />
                      {s.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Case Study Content Sections */}
          <div className="space-y-12 max-w-3xl">
            {availableSections.map(({ key, label }) => {
              const text = project.caseStudy[key];
              if (!text) return null;
              const isSolution = key === "solution";

              return (
                <section
                  key={key}
                  id={`case-study-${key}`}
                  className="scroll-mt-32"
                >
                  <Reveal>
                    <div
                      className={cn(
                        "rounded-card border p-8 md:p-10 transition-all duration-300",
                        isSolution
                          ? "border-burgundy/40 bg-surface/80 shadow-[0_16px_40px_-16px_rgba(122,36,53,0.15)]"
                          : "border-border/80 bg-surface/40 hover:border-border-strong",
                      )}
                    >
                      <p className="eyebrow mb-3 flex items-center gap-2">
                        <span className="accent-rule" aria-hidden />
                        {label}
                      </p>

                      <p className="text-lg leading-relaxed text-secondary md:text-xl">
                        {text}
                      </p>
                    </div>
                  </Reveal>
                </section>
              );
            })}
          </div>
        </div>
      </Container>

      {/* Project Footer Navigation: Previous & Next Project */}
      {(prevProject || nextProject) && (
        <Section className="border-t border-border py-16 bg-surface/20">
          <Container>
            <div className="grid gap-6 md:grid-cols-2">
              {prevProject ? (
                <Link
                  href={`/work/${prevProject.slug}`}
                  className="group rounded-card border border-border bg-surface/40 p-6 transition-all duration-300 hover:border-burgundy/40 hover:bg-surface/70"
                >
                  <span className="font-mono text-xs text-muted">
                    ← PREVIOUS PROJECT
                  </span>
                  <h4 className="mt-2 text-xl font-bold text-foreground group-hover:text-burgundy-light transition-colors">
                    {prevProject.title}
                  </h4>
                  <p className="mt-1 text-sm text-secondary line-clamp-2">
                    {prevProject.summary}
                  </p>
                </Link>
              ) : (
                <div />
              )}

              {nextProject && (
                <Link
                  href={`/work/${nextProject.slug}`}
                  className="group text-right rounded-card border border-border bg-surface/40 p-6 transition-all duration-300 hover:border-burgundy/40 hover:bg-surface/70"
                >
                  <span className="font-mono text-xs text-muted">
                    NEXT PROJECT →
                  </span>
                  <h4 className="mt-2 text-xl font-bold text-foreground group-hover:text-burgundy-light transition-colors">
                    {nextProject.title}
                  </h4>
                  <p className="mt-1 text-sm text-secondary line-clamp-2">
                    {nextProject.summary}
                  </p>
                </Link>
              )}
            </div>
          </Container>
        </Section>
      )}
    </article>
  );
}
