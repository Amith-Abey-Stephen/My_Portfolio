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
      "Turn a spreadsheet of people into phone-ready contacts in one pass — no manual entry, no cleanup.",
    year: "2025",
    status: "Released",
    category: "Product",
    stack: ["Next.js", "Google People API", "VCF Export"],
    icon: Database,
    featured: true,
    link: "https://syncbatch.amith.site",
    repo: "https://github.com/Amith-Abey-Stephen/SyncBatch",
    caseStudy: {
      problem:
        "Anyone who runs events or communities knows the ritual: a form fills up with hundreds of names and numbers, and then someone has to type each one into a phone. It is slow, error-prone, and quietly demoralising.",
      solution:
        "SyncBatch takes an Excel or CSV export and converts it straight into phone-ready contacts. You map your columns once, and it produces a clean VCF file or pushes contacts directly through the Google People API.",
      research:
        "I started by watching how student coordinators actually managed their lists. The messiness was in the middle — inconsistent headers, duplicate rows, half-formatted numbers — so the tool had to be forgiving about input, not strict.",
      design:
        "The interface is deliberately boring in the best way: upload, map, preview, export. One screen, one job. Nothing to learn.",
      development:
        "Built on Next.js with client-side parsing so files never need to leave the browser unless you choose to sync. Google integration is scoped to exactly the contact permissions it needs and nothing more.",
      challenges:
        "Phone numbers are a surprisingly deep rabbit hole — country codes, leading zeros, spreadsheet auto-formatting that mangles them. Normalising them without guessing wrong took most of the effort.",
      outcome:
        "What used to be an evening of typing became a two-minute task. It quietly became the tool I reach for before every event.",
      lessons:
        "The best utilities remove a chore people had stopped noticing. Solve the boring problem completely and it earns trust for the interesting ones.",
    },
  },
  {
    slug: "inomail",
    title: "InoMail",
    summary:
      "A bulk email platform with real queues, workspaces, and AI-assisted campaigns — built to be reliable, not flashy.",
    year: "2025",
    status: "In Progress",
    category: "Product",
    stack: ["Next.js", "MongoDB", "BullMQ", "Redis", "AI"],
    icon: Mail,
    featured: true,
    link: "https://inomail.amith.site",
    repo: "https://github.com/Amith-Abey-Stephen/InoMail",
    caseStudy: {
      problem:
        "Small teams and communities need to send real email — announcements, newsletters, updates — without paying enterprise prices or fighting clunky tools built for marketers.",
      solution:
        "InoMail is a multi-tenant platform with queue-backed sending, per-workspace analytics, and an AI assistant that helps draft campaigns. It is designed to send a lot of mail without falling over.",
      design:
        "Workspaces keep teams isolated and simple. The composer stays out of the way; the analytics tell you what actually happened after you hit send.",
      development:
        "BullMQ handles the sending queue so large batches drain steadily and retry gracefully. MongoDB stores tenants, campaigns, and events. The AI layer drafts subject lines and body copy you can edit rather than accept blindly.",
      challenges:
        "Deliverability and back-pressure are the hard parts of email — sending fast enough to be useful, slow enough to stay trusted. Getting the queue pacing right is ongoing work.",
      outcome:
        "In active development. The core queue and workspace model are running; analytics and the AI assistant are being refined.",
      lessons:
        "Reliability is a feature you only notice when it's missing. For infrastructure, calm and predictable beats clever every time.",
    },
  },
  {
    slug: "mr-docgen",
    title: "Mr DocGen",
    summary:
      "AI report generation with structured templates — turn scattered inputs into a finished, well-formatted document.",
    year: "2025",
    status: "In Progress",
    category: "AI Tool",
    stack: ["Next.js", "MongoDB", "Gemini API", "Automation"],
    icon: FileText,
    featured: true,
    link: "https://docgen.amith.site",
    repo: "https://github.com/Amith-Abey-Stephen/Mr-DocGen",
    caseStudy: {
      problem:
        "Reports follow the same shape every time, yet people rewrite the scaffolding from scratch on each one. The structure is repetitive; only the content changes.",
      solution:
        "Mr DocGen pairs customisable templates with keyword-driven automation. You define the sections once, feed in the specifics, and it assembles a consistent, formatted document.",
      development:
        "A React front-end for authoring templates, a Node service that maps inputs into structured sections, and an AI pass that fills and refines the prose.",
      challenges:
        "Keeping generated content structured and on-template — not just plausible paragraphs — meant constraining the model with the section schema rather than letting it free-write.",
      outcome:
        "In progress. Template engine and section automation are working; polishing the generation quality.",
      lessons:
        "AI is most useful bounded by structure. Give it a frame and it fills it well; give it a blank page and you spend your time editing.",
    },
  },
  {
    slug: "airloo",
    title: "AirLoo",
    summary:
      "IoT sanitation monitoring — ESP32 sensors, real-time dashboards, usage heatmaps, and automated alerts.",
    year: "2024",
    status: "In Progress",
    category: "IoT",
    stack: ["ESP32", "Firebase Firestore", "Vue.js"],
    icon: Activity,
    featured: true,
    link: "https://airloo.amith.site",
    repo: "https://github.com/Amith-Abey-Stephen/AirLoo",
    caseStudy: {
      problem:
        "Public restrooms are maintained on guesswork — cleaned on a fixed schedule whether they need it or not. That means both wasted effort and missed messes.",
      solution:
        "AirLoo instruments the space with ESP32-based sensors that report usage in real time, surface heatmaps of demand, and fire alerts when thresholds are crossed so cleaning follows reality instead of a clock.",
      research:
        "The interesting signal is usage over time, not a single reading. Modelling patterns — peaks, lulls, buildup — mattered more than raw accuracy on any one sensor.",
      development:
        "ESP32 devices stream to Firebase; a realtime dashboard renders live status and historical heatmaps. Alerts trigger from usage thresholds rather than fixed timers.",
      challenges:
        "Hardware in the real world is unforgiving — power, connectivity, and grubby conditions. Making the devices resilient and self-recovering was harder than the software.",
      outcome:
        "Prototype stage. Sensor pipeline and dashboard are functional; hardening for a real deployment.",
      lessons:
        "Software forgives; hardware does not. Building for the physical world taught me to design for failure from the first line.",
    },
  },
  {
    slug: "smart-fire-alert",
    title: "Smart Fire Alert",
    summary:
      "IoT fire detection with real-time smoke and flame sensing plus remote dashboard monitoring.",
    year: "2024",
    status: "In Progress",
    category: "IoT",
    stack: ["ESP32", "Sensors", "Emergency Workflows"],
    icon: Flame,
    featured: true,
    link: "https://fire-alert.amith.site",
    repo: "https://github.com/Amith-Abey-Stephen/Smart-Fire-Alert",
    caseStudy: {
      problem:
        "A fire alarm that only screams in an empty room helps no one. Detection needs to reach a person, wherever they are, immediately.",
      solution:
        "An ESP32 system with smoke and flame sensors that raises real-time alerts and streams status to a remote dashboard, so the warning travels with you.",
      development:
        "Sensor fusion for smoke and flame to reduce false positives, with an emergency workflow that escalates through remote notifications.",
      challenges:
        "The whole design lives or dies on trust — too many false alarms and people stop listening. Tuning sensitivity to be alert but not paranoid was the core work.",
      outcome:
        "Working prototype with live remote monitoring.",
      lessons:
        "For safety systems, a false alarm and a missed alarm are both failures. The right threshold is a design decision, not a default.",
    },
  },
  {
    slug: "smart-irrigation",
    title: "Smart Irrigation",
    summary:
      "Automated irrigation with moisture sensing, NTP scheduling, and a cloud-connected Vue dashboard.",
    year: "2023",
    status: "In Progress",
    category: "IoT",
    stack: ["ESP32", "Firebase", "Vue.js"],
    icon: Sprout,
    link: "https://irrigation.amith.site",
    repo: "https://github.com/Amith-Abey-Stephen/Smart-Irrigation",
    caseStudy: {
      problem:
        "Watering on a fixed timer ignores what plants actually need — it drowns them after rain and starves them in heat.",
      solution:
        "Moisture sensors decide when to water; NTP-based scheduling handles the rhythm; a Vue dashboard makes the whole system visible and adjustable from anywhere.",
      development:
        "ESP32 reads soil moisture and drives the pump, syncing state to Firebase. A Vue front-end shows readings and lets you tune thresholds remotely.",
      challenges:
        "Sensor drift and calibration across different soils — a number that means 'dry' in one bed means 'fine' in another.",
      outcome:
        "Functional prototype watering on real conditions instead of a clock.",
      lessons:
        "Feedback beats scheduling. A system that senses and responds will always beat one that just assumes.",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);
