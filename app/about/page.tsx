import { about } from "@/content/about";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/layout/page-header";
import { ContactCTA } from "@/components/sections/contact-cta";
import { AboutView } from "@/components/about/about-view";

import { AboutPageJsonLd } from "@/components/seo/json-ld";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Explore the background of Amith Abey Stephen, a Product Engineer from Kerala building software tools, hardware systems, and open developer communities.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <AboutPageJsonLd />
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
