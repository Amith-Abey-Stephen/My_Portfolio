import {
  Database,
  Mail,
  FileText,
  Activity,
  Flame,
  Sprout,
} from "lucide-react";
import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "syncbatch",
    title: "SyncBatch",
    summary:
      "Convert spreadsheet contact lists into phone-ready VCF files and Google Contacts in seconds without manual entry.",
    year: "2025",
    status: "Released",
    category: "Product",
    stack: ["Next.js", "TypeScript", "Google People API", "VCF Parsing"],
    icon: Database,
    featured: true,
    link: "https://syncbatch.amith.site",
    repo: "https://github.com/Amith-Abey-Stephen/SyncBatch",
    caseStudy: {
      problem:
        "Event managers and community leads waste hours manually typing attendee phone numbers from spreadsheet forms into phones, leading to formatting errors and delayed communication.",
      solution:
        "SyncBatch parses Excel and CSV files client-side, maps custom column headers, cleans phone formatting, and exports ready-to-import VCF files or syncs directly via Google People API.",
      research:
        "Studying real event operations showed that inconsistent phone formatting (+91 codes, leading zeros, stray spaces) caused 90% of import failures. The parser needed smart sanitization defaults.",
      design:
        "A single-screen workflow: upload, map columns, preview cleaned records, and export. Simple, responsive, and immediate.",
      development:
        "Built with Next.js and TypeScript. All CSV parsing runs in the browser for privacy, ensuring contact data stays on the user device unless syncing through Google OAuth.",
      challenges:
        "Handling edge-case phone number formatting across different country standards and Excel auto-format truncations required building custom regex normalization logic.",
      outcome:
        "Reduced contact list processing time from 2 hours to 2 minutes for event organizers across communities in Kerala.",
      lessons:
        "Solving a specific daily bottleneck completely creates more long-term utility than building feature-heavy platforms.",
    },
  },
  {
    slug: "inomail",
    title: "InoMail",
    summary:
      "A high-deliverability bulk email platform with BullMQ queue architecture, multi-tenant workspaces, and AI assistance.",
    year: "2025",
    status: "In Progress",
    category: "Product",
    stack: ["Next.js", "MongoDB", "BullMQ", "Redis", "Node.js"],
    icon: Mail,
    featured: true,
    link: "https://inomail.amith.site",
    repo: "https://github.com/Amith-Abey-Stephen/InoMail",
    caseStudy: {
      problem:
        "Growing communities need reliable bulk email dispatch without enterprise SaaS overhead or getting blocked by rate-limit spikes.",
      solution:
        "InoMail implements multi-tenant workspace isolation, queue-managed background dispatch via BullMQ & Redis, per-campaign analytics, and AI content generation.",
      design:
        "Clean dashboard layout giving teams instant visibility into sending progress, open rates, and queue health.",
      development:
        "Built on Next.js, Node.js, and MongoDB. BullMQ handles rate-limited queue processing to ensure steady mail flow and graceful retries.",
      challenges:
        "Balancing delivery speed against SMTP provider rate limits required fine-tuning exponential backoff retry algorithms.",
      outcome:
        "Core queue infrastructure and workspace architecture are live and processing test campaigns efficiently.",
      lessons:
        "System reliability and rate-limit predictability are the foundation of any queue-based infrastructure.",
    },
  },
  {
    slug: "mr-docgen",
    title: "Mr DocGen",
    summary:
      "Automated AI report generator mapping structured inputs into formatted Markdown and PDF documents.",
    year: "2025",
    status: "In Progress",
    category: "AI Tool",
    stack: ["Next.js", "MongoDB", "Gemini API", "Tailwind CSS"],
    icon: FileText,
    featured: true,
    link: "https://docgen.amith.site",
    repo: "https://github.com/Amith-Abey-Stephen/Mr-DocGen",
    caseStudy: {
      problem:
        "Writing recurring technical and event reports requires repeatedly formatting the same document structure from scratch.",
      solution:
        "Mr DocGen uses customizable templates paired with LLM automation to transform structured notes and key metrics into clean, publication-ready reports.",
      development:
        "React frontend for template design, Node.js backend for section mapping, and Gemini API for content synthesis bounded by structural schemas.",
      challenges:
        "Enforcing strict section schemas on LLM outputs so generated reports maintain consistent structural hierarchy.",
      outcome:
        "Template engine and section automation are fully operational.",
      lessons:
        "AI generation performs best when constrained by rigid structural boundaries rather than open prompts.",
    },
  },
  {
    slug: "airloo",
    title: "AirLoo",
    summary:
      "IoT sanitation monitoring system using ESP32 microcontrollers, real-time Firestore heatmaps, and threshold alerts.",
    year: "2024",
    status: "In Progress",
    category: "IoT",
    stack: ["ESP32", "Firebase Firestore", "Vue.js", "C++"],
    icon: Activity,
    featured: true,
    link: "https://airloo.amith.site",
    repo: "https://github.com/Amith-Abey-Stephen/AirLoo",
    caseStudy: {
      problem:
        "Public sanitation maintenance operated on rigid time schedules rather than actual foot-traffic usage data, causing both inefficient cleaning cycles and unserviced surges.",
      solution:
        "AirLoo deploys ESP32 sensor hardware to stream real-time usage data to Firebase Firestore, rendering live demand heatmaps and triggering automated cleaning alerts.",
      research:
        "Analyzing foot-traffic trends over time proved more valuable for scheduling than instantaneous sensor triggers.",
      development:
        "ESP32 firmware written in C++ streaming telemetry over Wi-Fi to Cloud Firestore, consumed by a Vue.js analytics dashboard.",
      challenges:
        "Hardening hardware enclosures and power management to survive demanding real-world environments.",
      outcome:
        "Functional hardware prototype and telemetry dashboard operating in test environments.",
      lessons:
        "Hardware engineering demands strict fault-tolerant design; physical devices must self-recover from connectivity drops.",
    },
  },
  {
    slug: "smart-fire-alert",
    title: "Smart Fire Alert",
    summary:
      "IoT safety system combining ESP32 smoke and flame sensors with instant remote alerts and emergency workflows.",
    year: "2024",
    status: "In Progress",
    category: "IoT",
    stack: ["ESP32", "C++", "Sensors", "Emergency Telemetry"],
    icon: Flame,
    featured: true,
    link: "https://fire-alert.amith.site",
    repo: "https://github.com/Amith-Abey-Stephen/Smart-Fire-Alert",
    caseStudy: {
      problem:
        "Traditional fire alarms only sound locally, failing to notify remote property owners or emergency contacts when a building is unattended.",
      solution:
        "ESP32-powered sensor fusion system that detects smoke and flame signatures simultaneously, triggering immediate cloud alerts and dashboard notifications.",
      development:
        "Multi-sensor threshold logic written in C++ for ESP32 to reduce false alarms while maintaining rapid response times.",
      challenges:
        "Calibrating optical smoke and infrared flame sensor thresholds to avoid false positives from dust or sunlight.",
      outcome:
        "Working hardware prototype streaming live alerts to remote dashboard.",
      lessons:
        "In safety-critical IoT systems, false-positive filtering is just as critical as detection speed.",
    },
  },
  {
    slug: "smart-irrigation",
    title: "Smart Irrigation",
    summary:
      "Automated agricultural irrigation controller with soil moisture telemetry, NTP scheduling, and Vue dashboard.",
    year: "2023",
    status: "In Progress",
    category: "IoT",
    stack: ["ESP32", "Firebase", "Vue.js"],
    icon: Sprout,
    link: "https://irrigation.amith.site",
    repo: "https://github.com/Amith-Abey-Stephen/Smart-Irrigation",
    caseStudy: {
      problem:
        "Fixed-timer watering systems over-water soil after rainfall and underwater crops during dry spells.",
      solution:
        "ESP32 microcontroller system reading real-time soil moisture sensors, executing condition-based watering cycles, and syncing data to a Vue web dashboard.",
      development:
        "ESP32 firmware driving water pumps via relay modules, with remote threshold controls exposed in a Vue frontend.",
      challenges:
        "Calibrating capacitive moisture sensors across varying soil compositions.",
      outcome:
        "Functional irrigation prototype watering crops based on real-time soil telemetry.",
      lessons:
        "Closed-loop telemetry feedback always outperforms static open-loop timer schedules.",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
