"use client";

import type { StoryChapter } from "@/types";
import { StoryStage } from "@/components/story/story-stage";

export function StoryView({ chapters }: { chapters: StoryChapter[] }) {
  return <StoryStage chapters={chapters} />;
}
