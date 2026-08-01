import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import { ContactCTA } from "@/components/sections/contact-cta";
import { ProjectJsonLd } from "@/components/seo/json-ld";
import { ProjectCaseStudyView } from "@/components/work/project-case-study";

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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : undefined;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : undefined;

  const sanitize = (p?: typeof project) => {
    if (!p) return undefined;
    const { icon, ...rest } = p;
    return rest;
  };

  return (
    <>
      <ProjectJsonLd project={project} />

      <ProjectCaseStudyView
        project={sanitize(project)!}
        prevProject={sanitize(prevProject)}
        nextProject={sanitize(nextProject)}
      />

      <ContactCTA />
    </>
  );
}
