import { ArrowRight } from "lucide-react";
import { featuredProjects } from "@/content/projects";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { ProjectCard } from "@/components/cards/project-card";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function SelectedWork() {
  return (
    <Section id="work">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Selected Work"
          title="A few things I've built."
          lede="Most started as a small problem I couldn't stop thinking about."
        />
        <Reveal delay={0.1}>
          <ButtonLink href="/work" variant="ghost" className="shrink-0">
            All work
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08}>
            <ProjectCard project={project} className="h-full" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
