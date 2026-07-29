import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { AboutPreview } from "@/components/sections/about-preview";
import { JourneyPreview } from "@/components/sections/journey-preview";
import { Capabilities } from "@/components/sections/capabilities";
import { WritingPreview } from "@/components/sections/writing-preview";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/writing/rss.xml" },
  },
};

export default function HomePage() {
  return (
    <>
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
