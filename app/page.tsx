import { Hero } from "@/components/sections/hero";
import { SelectedWork } from "@/components/sections/selected-work";
import { AboutPreview } from "@/components/sections/about-preview";
import { JourneyPreview } from "@/components/sections/journey-preview";
import { WritingPreview } from "@/components/sections/writing-preview";
import { ContactCTA } from "@/components/sections/contact-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <AboutPreview />
      <JourneyPreview />
      <WritingPreview />
      <ContactCTA />
    </>
  );
}
