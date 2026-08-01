import type { LucideIcon } from "lucide-react";

export type ProjectStatus = "Released" | "In Progress" | "Concept";

export interface ProjectCaseStudy {
  problem: string;
  solution: string;
  research?: string;
  design?: string;
  development?: string;
  challenges?: string;
  outcome?: string;
  lessons?: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  year: string;
  status: ProjectStatus;
  category: string;
  stack: string[];
  icon: LucideIcon;
  featured?: boolean;
  link?: string;
  repo?: string;
  caseStudy: ProjectCaseStudy;
}

export interface JourneyMilestone {
  role: string;
  organization: string;
  period: string;
  description: string;
  current?: boolean;
}

export interface CapabilityGroup {
  title: string;
  icon: LucideIcon;
  summary: string;
  items: string[];
}

export interface StoryChapter {
  index: string;
  title: string;
  body: string[];
}

export interface PostTag {
  name: string;
  slug: string;
}

export interface Tag extends PostTag {
  count: number;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  /** Rendered article HTML — populated for single posts, "" in list views. */
  html: string;
  publishedAt: string;
  updatedAt: string;
  /** The original Ghost URL (used for canonical + "originally published"). */
  url: string;
  featureImage: string | null;
  featureImageCaption: string | null;
  readingTime: string;
  tags: PostTag[];
  primaryTag: PostTag | null;
  metaTitle: string | null;
  metaDescription: string | null;
}

export interface NowData {
  updated: string;
  sections: { label: string; items: string[] }[];
}

export interface UsesGroup {
  title: string;
  icon: LucideIcon;
  items: { name: string; note?: string }[];
}

export interface Experiment {
  title: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
}
