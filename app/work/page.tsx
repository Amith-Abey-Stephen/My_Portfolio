import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/layout/page-header";
import { ContactCTA } from "@/components/sections/contact-cta";
import { AllWorksView } from "@/components/work/all-works-view";
import { CollectionPageJsonLd } from "@/components/seo/json-ld";

export const metadata = pageMetadata({
  title: "Works",
  description:
    "Explore the complete portfolio of software products, client platforms, offline mobile applications, and IoT systems engineered by Amith Abey Stephen.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <CollectionPageJsonLd />

      <PageHeader
        eyebrow="Works"
        title="Everything I've built."
        lede="From offline-first Android apps and high-performance client platforms to bulk communication engines and connected IoT systems."
      />

      <AllWorksView />

      <ContactCTA />
    </>
  );
}
