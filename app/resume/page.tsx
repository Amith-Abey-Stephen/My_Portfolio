import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/layout/page-header";
import { ContactCTA } from "@/components/sections/contact-cta";
import { InteractiveResume } from "@/components/resume/interactive-resume";

export const metadata = pageMetadata({
  title: "Resume",
  description:
    "The resume of Amith Abey Stephen — an interactive role timeline, technical capabilities matrix, and downloadable PDF.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="Interactive Track Record"
        lede="A live overview of experience, leadership roles, education, and technical capabilities — condensed for fast reading."
      />

      <InteractiveResume />

      <ContactCTA />
    </>
  );
}
