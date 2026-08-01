import { Cpu, Code2, Armchair, BookOpen } from "lucide-react";
import type { UsesGroup } from "@/types";

export const uses: UsesGroup[] = [
  {
    title: "Software",
    icon: Code2,
    items: [
      { name: "VS Code", note: "Everyday editor, kept close to default" },
      { name: "Next.js + TypeScript", note: "Default stack for the web" },
      { name: "Tailwind CSS", note: "Styling without leaving the markup" },
      { name: "Figma", note: "Where interfaces start" },
      { name: "Vercel", note: "Ship and forget" },
    ],
  },
  {
    title: "Hardware",
    icon: Cpu,
    items: [
      { name: "ESP32", note: "The workhorse of every IoT build" },
      { name: "Arduino", note: "For quick sketches in the physical world" },
      { name: "Raspberry Pi", note: "When a project needs a real brain" },
      { name: "A pile of sensors", note: "Moisture, smoke, flame, motion" },
    ],
  },
  {
    title: "Workspace",
    icon: Armchair,
    items: [
      { name: "A quiet desk", note: "Kerala, usually early morning" },
      { name: "One monitor, few tabs", note: "Focus over surface area" },
      { name: "A notebook", note: "Ideas start on paper" },
    ],
  },
  {
    title: "Reading & Gear",
    icon: BookOpen,
    items: [
      { name: "Essays on craft", note: "Product, design, engineering" },
      { name: "Source code", note: "The most honest documentation" },
      { name: "Changelogs", note: "How I keep up" },
    ],
  },
];
