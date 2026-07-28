import {
  Compass,
  Layout,
  Server,
  Cpu,
  Sparkles,
  Users,
} from "lucide-react";
import type { CapabilityGroup } from "@/types";

/**
 * Grouped by intent, not by skill bar (docs 04: "Avoid skill bars").
 * These describe how I work, followed by the tools I reach for.
 */
export const capabilities: CapabilityGroup[] = [
  {
    title: "Product Thinking",
    icon: Compass,
    summary:
      "Start from the problem and the person, not the feature list. Ship the smallest thing that actually helps, then learn from it.",
    items: [
      "Problem framing",
      "Scoping & MVPs",
      "User research",
      "Prioritisation",
      "Iteration",
    ],
  },
  {
    title: "Frontend",
    icon: Layout,
    summary:
      "Interfaces that feel calm and considered — accessible, responsive, and fast on real devices.",
    items: [
      "React",
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Zustand",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    summary:
      "APIs and services built to be reliable and legible — queues that drain, auth that holds, data that stays consistent.",
    items: [
      "Node.js",
      "Express",
      "REST APIs",
      "JWT auth",
      "BullMQ queues",
      "MongoDB / MySQL",
    ],
  },
  {
    title: "IoT & Hardware",
    icon: Cpu,
    summary:
      "Cloud-connected devices that survive the physical world — sensing, monitoring, and automating the real environment.",
    items: [
      "ESP32 / Arduino",
      "Raspberry Pi",
      "MQTT / ESP-NOW",
      "Sensor integration",
      "Firebase realtime",
    ],
  },
  {
    title: "AI & Automation",
    icon: Sparkles,
    summary:
      "Using models where they earn their place — bounded by structure, in service of a real task, never as decoration.",
    items: [
      "AI content generation",
      "Prompt engineering",
      "Workflow automation",
      "Data personalisation",
    ],
  },
  {
    title: "Leadership & Community",
    icon: Users,
    summary:
      "Building the conditions for other people to build — mentoring, organising, and growing ecosystems that outlast any one event.",
    items: [
      "Mentoring",
      "Event organising",
      "Team leadership",
      "Open source",
      "Public speaking",
    ],
  },
];
