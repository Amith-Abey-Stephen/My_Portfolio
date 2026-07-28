import { getProjects } from "@/lib/api";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCard } from "@/components/cards/project-card";
import { ContactCTA } from "@/components/sections/contact-cta";
import { Reveal } from "@/components/motion/reveal";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Selected products and experiments by Amith Abey Stephen — SyncBatch, InoMail, AirLoo, and more across software and IoT.",
  path: "/work",
});

export default function WorkPage() {
  const projects = getProjects();

  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Products and experiments."
        lede="Each of these started as a real problem. Some shipped, some are still in the workshop — all of them taught me something."
      />

      <Container className="pb-28">
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06}>
              <ProjectCard project={project} className="h-full" />
            </Reveal>
          ))}
        </div>
      </Container>

      <ContactCTA />
    </>
  );
}
