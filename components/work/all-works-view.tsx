"use client";

import { useState, useMemo } from "react";
import { Search, Sparkles, Filter, ArrowUpRight, FolderGit2 } from "lucide-react";
import { projects as allProjects } from "@/content/projects";
import type { Project } from "@/types";
import { Container } from "@/components/layout/container";
import { ProjectCard } from "@/components/cards/project-card";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

interface AllWorksViewProps {
  projects?: Project[];
}

export function AllWorksView({ projects = allProjects }: AllWorksViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...cats];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCategory;

      const matchesSearch =
        project.title.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        project.stack.some((tech) => tech.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="pb-24 pt-4 md:pb-32">
      <Container>
        {/* Controls: Category Filter Tabs & Live Search */}
        <div className="mb-10 flex flex-col gap-5 border-b border-border pb-8 md:flex-row md:items-center md:justify-between">
          {/* Categories */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1.5 sm:gap-2"
          >
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length;
              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
                    isActive
                      ? "border border-foreground bg-foreground text-background font-medium shadow-sm"
                      : "border border-border bg-surface text-secondary hover:border-border-strong hover:text-foreground",
                  )}
                >
                  <span>{cat}</span>
                  <span
                    className={cn(
                      "text-[0.65rem] tabular-nums",
                      isActive ? "text-background/75" : "text-muted",
                    )}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or title..."
              aria-label="Search projects by keyword, technology, or title"
              className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-4 font-mono text-xs text-foreground placeholder:text-muted focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-8 flex items-center justify-between font-mono text-xs text-muted">
          <p>
            Showing {filteredProjects.length} of {projects.length} works
          </p>
          {selectedCategory !== "All" && (
            <button
              onClick={() => setSelectedCategory("All")}
              className="hover:text-foreground underline decoration-border underline-offset-4"
            >
              Reset filter
            </button>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {filteredProjects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.04}>
                <ProjectCard
                  project={project}
                  className="h-full border-border bg-surface transition-all duration-300 hover:border-border-strong hover:bg-elevated/40 hover:shadow-xl"
                />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="rounded-card border border-dashed border-border py-20 text-center">
            <FolderGit2 className="mx-auto h-10 w-10 text-muted" strokeWidth={1.5} />
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              No matching works found
            </h3>
            <p className="mt-1 font-mono text-xs text-muted">
              No projects matched your search criteria for "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs text-foreground hover:border-border-strong hover:bg-elevated"
            >
              Clear filters
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}
