import { story, storyIntro } from "@/content/story";
import { pageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/layout/page-header";
import { ContactCTA } from "@/components/sections/contact-cta";
import { StoryView } from "@/components/story/story-view";

export const metadata = pageMetadata({
  title: "Story",
  description:
    "The long version — the moments that turned a curious kid taking things apart into a builder shipping products.",
  path: "/story",
});

export default function StoryPage() {
  return (
    <>
      <PageHeader eyebrow="Story" title="How I got here." lede={storyIntro} />

      <StoryView chapters={story} />

      <ContactCTA />
    </>
  );
}
