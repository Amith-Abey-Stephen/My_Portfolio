import { about } from "@/content/about";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/layout/page-header";
import { ContactCTA } from "@/components/sections/contact-cta";
import { AboutView } from "@/components/about/about-view";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Who Amith is today: a builder from Kerala who turns ideas into products across software, hardware, and community.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A builder, in his own words."
        lede={about.intro[0]}
      />

      <AboutView />

      <ContactCTA />
    </>
  );
}
