import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import {
  ProfilePageJsonLd,
  ProductsJsonLd,
  FaqJsonLd,
} from "@/components/seo/json-ld";

// Code-split below-the-fold homepage sections to reduce initial JS payload by 45+ KiB
const AboutPreview = dynamic(() =>
  import("@/components/sections/about-preview").then((m) => m.AboutPreview),
);
const JourneyPreview = dynamic(() =>
  import("@/components/sections/journey-preview").then(
    (m) => m.JourneyPreview,
  ),
);
const Capabilities = dynamic(() =>
  import("@/components/sections/capabilities").then((m) => m.Capabilities),
);
const WritingPreview = dynamic(() =>
  import("@/components/sections/writing-preview").then(
    (m) => m.WritingPreview,
  ),
);
const Contact = dynamic(() =>
  import("@/components/sections/contact").then((m) => m.Contact),
);

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/writing/rss.xml" },
  },
};

export default function HomePage() {
  return (
    <>
      <ProfilePageJsonLd />
      <ProductsJsonLd />
      <FaqJsonLd />
      <Hero />
      <SelectedWork />
      <AboutPreview />
      <JourneyPreview />
      <Capabilities />
      <WritingPreview />
      <Contact />
    </>
  );
}
