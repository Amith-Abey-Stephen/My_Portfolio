import {
  Compass,
  Layout,
  Server,
  ShoppingBag,
  Cpu,
  Sparkles,
  Users,
  HardDrive,
} from "lucide-react";
import type { CapabilityGroup } from "@/types";

export const capabilities: CapabilityGroup[] = [
  {
    title: "Product Engineering",
    icon: Compass,
    summary:
      "Framing real user bottlenecks and building lean, reliable web products that deliver immediate value without unnecessary complexity.",
    items: [
      "Problem Framing",
      "MVP Scoping",
      "User Experience",
      "Feature Prioritization",
      "Iterative Shipping",
    ],
  },
  {
    title: "Frontend Engineering",
    icon: Layout,
    summary:
      "Crafting responsive, high-performance web user interfaces with clean accessibility standards, instant load times, and fluid 60FPS motion.",
    items: [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vue.js",
      "TanStack Query",
      "Zustand",
    ],
  },
  {
    title: "Backend & Systems Architecture",
    icon: Server,
    summary:
      "Architecting reliable backend APIs, data pipelines, queue workers, and multi-tenant database infrastructure.",
    items: [
      "Node.js",
      "Express",
      "REST APIs",
      "BullMQ & Redis Queues",
      "MongoDB",
      "PostgreSQL / MySQL",
      "JWT & Auth Workflows",
    ],
  },
  {
    title: "DevOps & Self-Hosting",
    icon: HardDrive,
    summary:
      "Configuring custom server infrastructure, self-hosting web services, and optimizing workloads for maximum speed at minimal cost.",
    items: [
      "Docker & Containers",
      "Linux Server Administration",
      "Nginx & Reverse Proxies",
      "Self-Hosted Infrastructure",
      "Resource & Cost Optimization",
      "CI/CD Pipelines",
    ],
  },
  {
    title: "Shopify & E-Commerce",
    icon: ShoppingBag,
    summary:
      "Building full-stack Shopify App Store apps, Shop Minis, and upcoming Reddit apps — automating e-commerce merchant workflows.",
    items: [
      "Shopify Admin API",
      "Storefront API",
      "Shop Minis",
      "Shopify App Store Apps",
      "App Extensions",
      "Webhooks",
    ],
  },
  {
    title: "IoT & Embedded Hardware",
    icon: Cpu,
    summary:
      "Designing fault-tolerant microcontroller hardware and telemetry pipelines that bridge physical sensors to cloud web dashboards.",
    items: [
      "ESP32 & C++ Firmware",
      "Arduino Microcontrollers",
      "Raspberry Pi",
      "Sensor Telemetry Fusion",
      "Firebase Realtime Database",
    ],
  },
  {
    title: "AI & Automation",
    icon: Sparkles,
    summary:
      "Integrating LLM models and automated section schemas to solve bounded text generation and data synthesis tasks.",
    items: [
      "AI Content Automation",
      "Gemini API & OpenRouter",
      "Structured Output Schemas",
      "AI Merchant Tools",
      "Prompt Engineering",
    ],
  },
  {
    title: "Leadership & Community",
    icon: Users,
    summary:
      "Fostering developer communities, organizing international tech hackathons under KSUM, and mentoring 30+ open-source developers.",
    items: [
      "Developer Mentorship",
      "Hackathon Organization",
      "Open Source Leadership",
      "Team Management",
      "Public Speaking",
    ],
  },
];
