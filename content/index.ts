/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH — ALL WEBSITE CONTENT & COPY
 * Edit everything on your website right here in this single file!
 * ============================================================================
 */

import {
  Database,
  Mail,
  FileText,
  Activity,
  Flame,
  Sprout,
  Compass,
  Layout,
  Server,
  ShoppingBag,
  Cpu,
  Sparkles,
  Users,
  HardDrive,
  Calendar,
  Globe,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import type {
  Project,
  JourneyMilestone,
  CapabilityGroup,
  StoryChapter,
  NowData,
} from "@/types";

// ============================================================================
// 1. SITE METADATA & IDENTITY
// ============================================================================

export const site = {
  name: "amith.site",
  author: "Amith Abey Stephen",
  glyph: "a.",
  role: "Product Engineer",
  roles: [
    "Product Engineer",
    "Full-Stack Developer",
    "Shopify & iOS App Developer",
    "DevOps & Self-Hosting Engineer",
    "IoT Systems Builder",
  ],
  headlineWords: ["purpose.", "impact.", "clarity.", "speed."],
  purpose: "Building software that solves real work.",
  positioning:
    "Product Engineer building web apps, developer tools, and self-hosted infrastructure.",
  tagline:
    "I build web products, Shopify apps, and self-hosted tools that simplify real work for real people.",
  location: "Kerala, India",
  email: "amithabey13@gmail.com",
  phone: "+91 9188550674",
  url: "https://www.amith.site",
  resumeUrl: "https://resume.amith.site",
  blogUrl: "https://blog.inovuslabs.org",
  socials: {
    github: "https://github.com/Amith-Abey-Stephen",
    linkedin: "https://linkedin.com/in/Amith-Abey-Stephen",
    email: "mailto:amithabey13@gmail.com",
  },
  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/about" },
    { label: "Story", href: "/story" },
    { label: "Resume", href: "/resume" },
    { label: "Writing", href: "/#writing" },
  ],
  more: [
    { label: "Journey", href: "/#journey" },
    { label: "Capabilities", href: "/#capabilities" },
    { label: "Now", href: "/now" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

export const bio =
  "Amith Abey Stephen is a Product Engineer and Full-Stack Developer based in Kerala, India. He builds Shopify apps, Shop Minis, iOS apps, self-hosted DevOps infrastructure, and IoT hardware systems using Next.js, TypeScript, React, Node.js, PostgreSQL, Docker, and ESP32. He works as a Full-Stack Developer at FinalApps, previously served as CEO of Inovus Labs IEDC, and formerly led frontend architecture at μLearn Foundation. Creator of SyncBatch, InoMail, Mr DocGen, AirLoo, and Inovus Profiles.";

export const education = {
  name: "Kristu Jyoti College of Management and Technology",
  shortName: "KJCMT",
  degree: "BCA (Bachelor of Computer Applications)",
  location: "Changanassery, Kerala, India",
};

export const seoKeywords = [
  "Amith Abey Stephen",
  "Amith",
  "amith.site",
  "Product Engineer",
  "Full-Stack Developer",
  "Shopify App Developer",
  "Shop Minis Developer",
  "iOS App Developer",
  "DevOps Engineer",
  "Self-Hosting",
  "IoT Developer",
  "Next.js Developer",
  "TypeScript Developer",
  "React Developer",
  "Node.js Developer",
  "MongoDB",
  "ESP32",
  "Kerala Developer",
  "Thiruvalla",
  "FinalApps",
  "Inovus Labs IEDC",
  "μLearn Foundation",
  "SyncBatch",
  "InoMail",
  "Mr DocGen",
  "AirLoo",
  "Inovus Profiles",
  "Smart Irrigation",
  "Smart Fire Alert",
  "Docker",
  "PostgreSQL",
  "Server Security",
];

// ============================================================================
// 2. ABOUT PAGE & PHILOSOPHY
// ============================================================================

export const about = {
  intro: [
    "I'm Amith, a Product Engineer based in Kerala, India. I build web applications, Shopify apps, self-hosted developer infrastructure, and connected IoT hardware. Software and hardware interest me for one reason: turning real problems into simple, working tools.",
    "I focus on shipping clean products rather than collecting frameworks. Most of what I build starts from a task I got tired of doing manually, like bulk contact conversion, automated email queues, or IoT sensor dashboards.",
  ],
  philosophy: [
    "Ship the leanest version that solves the problem, test it with real users, and refine based on real feedback.",
    "Great UX should feel effortless. The product should shine, not the underlying complexity or hype.",
  ],
  values: [
    {
      title: "Curiosity",
      body: "Digging deeper into systems, Linux kernels, and APIs. That is where real engineering happens.",
    },
    {
      title: "Craftsmanship",
      body: "Building reliable backends and fast user interfaces, caring about code quality and user experience.",
    },
    {
      title: "Efficiency",
      body: "Architecting software in the most cost-effective, hyper-optimized, and performant way possible.",
    },
    {
      title: "Community",
      body: "Building in the open, mentoring fellow developers, and sharing knowledge through open source.",
    },
  ],
  interests: [
    "Product Engineering",
    "Shopify & iOS Apps",
    "DevOps & Self-Hosting",
    "Embedded Systems & ESP32",
    "Developer Tools",
    "Open Source & Mentorship",
  ],
  currentFocus:
    "Building Shopify apps, Shop Minis, and iOS apps as a Full-Stack Developer at FinalApps, while setting up self-hosted Docker servers, going deep on DevOps, and keeping everything locked down securely.",
  funFacts: [
    "Most of my favourite tools started as a manual chore I refused to keep doing by hand.",
    "Self-hosting my own servers taught me more about Linux and networking than any course.",
    "Based in Kerala, India, building products and mentoring developers locally and globally.",
  ],
} as const;

// ============================================================================
// 3. PROJECTS & CASE STUDIES
// ============================================================================

export const projects: Project[] = [
  {
    slug: "inovus-profiles",
    title: "Inovus Profiles",
    summary:
      "A profile page for every Inovus Labs fellow that connects their platforms in one place and doubles as a portfolio.",
    year: "2026",
    status: "In Progress",
    category: "Product",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "PostgreSQL",
      "Docker",
    ],
    icon: Users,
    featured: true,
    link: "https://profile.inovuslabs.org",
    caseStudy: {
      problem:
        "Fellows at Inovus Labs scatter their work across GitHub, LinkedIn, and personal links, and there is no single page that shows who they are and what they have built.",
      solution:
        "Inovus Profiles gives every fellow one page that connects their platforms in a single place and doubles as a lightweight portfolio they can share anywhere.",
      development:
        "Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui on PostgreSQL, deployed with Docker.",
      outcome:
        "Work in progress. The profile system is taking shape at profile.inovuslabs.org.",
    },
  },
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

// ============================================================================
// 4. WORK JOURNEY & MILESTONES
// ============================================================================

export const journey: JourneyMilestone[] = [
  {
    role: "Junior Full Stack Developer",
    organization: "FinalApps",
    period: "2026 — Present",
    description:
      "Building Shopify apps, Shop Minis, and iOS apps: scalable full-stack e-commerce software for merchants. Integrating Shopify Admin API, Storefront API, and webhooks while building AI automation tools and managing self-hosted infrastructure.",
    current: true,
  },
  {
    role: "Junior Associate (Frontend Tech Lead)",
    organization: "μLearn Foundation",
    period: "2026",
    description:
      "Served as technical point of contact for frontend architecture across μLearn platforms, leading code reviews, mentoring junior developers, and coordinating remote feature delivery.",
  },
  {
    role: "Frontend Intern",
    organization: "Foodo.AI",
    period: "2026",
    description:
      "Built responsive, high-performance web interfaces from Figma designs for a London-based AI team, ensuring cross-device compatibility and UI consistency.",
  },
  {
    role: "Chief Executive Officer",
    organization: "Inovus Labs IEDC",
    period: "2025 — 2026",
    description:
      "Directed student innovation initiatives, hackathons, and startup incubators under the Kerala Startup Mission (KSUM). Led international technical events with participants from 6+ countries and mentored 30+ students across web development and IoT.",
  },
  {
    role: "Google Campus Ambassador",
    organization: "Google",
    period: "2025 — 2026",
    description:
      "Hosted developer workshops, Google Cloud AI sessions, and campus technical community engagement.",
  },
  {
    role: "Frontend Web Development Intern",
    organization: "μLearn Foundation",
    period: "2025",
    description:
      "Contributed to migrating mulearn.org to Next.js, TypeScript, TanStack Query, and Zustand, shipping 75+ commits across open-source education platforms.",
  },
  {
    role: "Web Development Intern",
    organization: "Zidio Development",
    period: "2024",
    description:
      "Built full-stack MERN (MongoDB, Express, React, Node.js) web applications in agile sprint environments.",
  },
  {
    role: "Stock Manager & Technical Coordinator",
    organization: "Inovus Labs IEDC",
    period: "2023 — 2025",
    description:
      "Managed IoT hardware inventories, microcontroller labs, and technical resources while contributing to web and hardware projects.",
  },
];

// ============================================================================
// 5. TECHNICAL CAPABILITIES
// ============================================================================

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
      "Server Security & Hardening",
      "Resource & Cost Optimization",
      "CI/CD Pipelines",
    ],
  },
  {
    title: "Shopify & E-Commerce",
    icon: ShoppingBag,
    summary:
      "Building full-stack Shopify App Store apps, Shop Minis, and iOS apps that automate e-commerce merchant workflows.",
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

// ============================================================================
// 6. STORY CHAPTERS
// ============================================================================

export const storyIntro =
  "This is the real version, the one that isn't formatted for a resume. A record of being dragged into a room by a classmate at Kristu Jyoti, flopping repeatedly, learning from mentors, and slowly becoming a builder.";

export const story: StoryChapter[] = [
  {
    index: "01",
    title: "The Nudge at Kristu Jyoti",
    body: [
      "Everything started at Kristu Jyoti College. Back then, I was just a regular student going through the motions, with no grand master plan or childhood dream of tech leadership.",
      "The turning point was a classmate who practically forced me to enter Inovus Labs IEDC for an event. I resisted at first, but once I walked through that door, something clicked. Afterwards, showing up became a daily habit.",
    ],
  },
  {
    index: "02",
    title: "Figma & Hard Truths",
    body: [
      "As I spent more time at Inovus Labs, I joined as an intern helping the team organize campus events. Around this time, I was pushed to learn UI design using Figma.",
      "I gave it a solid try, but as time went on, I came to an honest realization: visual design wasn't my strong suit. Instead of forcing something that wasn't landing, I stopped designing and shifted my energy toward code.",
    ],
  },
  {
    index: "03",
    title: "HTML, CSS & The Open Web",
    body: [
      "Web development felt right immediately. Armed with HTML, CSS, and JavaScript, I started making small things. Nothing massive, just small scripts and simple web pages, but making a browser respond to code was addictive.",
      "Building for the web gave me a sandbox where feedback was instantaneous and the possibilities kept expanding.",
    ],
  },
  {
    index: "04",
    title: "Tinkering with IoT (2023)",
    body: [
      "By 2023, as I got comfortable on the web, I wanted a new challenge. That's when I started tinkering with IoT and hardware microcontrollers.",
      "Making code interact with sensors, LEDs, and physical components taught me patience. Hardware is unforgiving: there is no hot-reloading when a circuit is wired wrong.",
    ],
  },
  {
    index: "05",
    title: "From Stock Manager to CEO",
    body: [
      "Transitioning from 2023 into 2024, my role inside Inovus Labs evolved rapidly. I started in the extended team, took charge as Stock Manager managing inventory and lab resources, and eventually became CEO.",
      "Every single role forced me to learn new skills, from logistics and resource management to leading technical hackathons and international events under the Kerala Startup Mission.",
    ],
  },
  {
    index: "06",
    title: "Mentors & The Art of Learning Through Code (2024)",
    body: [
      "In 2024, my web-focused journey went into overdrive with open-source contributions and real projects. I was deeply shaped by mentors like Arjun Krishna (decoded_cipher), Sane Sunil, and Nikhil T Das.",
      "My role model became Badhusha Shaji. I tried hard to replicate how he approached problems, and failed many times along the way. But iterating repeatedly was the fastest teacher, forcing me to refine my craft and make myself better every day.",
    ],
  },
  {
    index: "07",
    title: "Growing into μLearn",
    body: [
      "As my experience grew, I expanded beyond campus into statewide communities, eventually joining the μLearn Foundation.",
      "Starting as a frontend intern building reusable component libraries across μLearn platforms, I eventually rose to Junior Associate, serving as a technical point of contact and mentoring students before eventually stepping out to take on new horizons.",
    ],
  },
  {
    index: "08",
    title: "Google Ambassador & AI",
    body: [
      "Alongside community roles, I served as a Campus Ambassador for Google (Gemini program), leading AI-focused workshops and campus-wide technical engagement.",
      "Teaching others how to leverage LLMs and modern AI tools deepened my own understanding of where software is heading.",
    ],
  },
  {
    index: "09",
    title: "Today: Full-Stack Craft",
    body: [
      "Today, I'm building Shop Minis and Shopify App Store applications at FinalApps, shipping full-stack e-commerce software for merchants worldwide.",
      "Looking back at the student who had to be forced into his first event, the through-line is clear: curiosity, resilience through iteration, and great mentors.",
    ],
  },
  {
    index: "10",
    title: "What's Next",
    body: [
      "More products, built in the open. More open-source contributions, and more honest writing about the messy process of building.",
      "This story isn't finished. It's just the foundation for whatever comes next.",
    ],
  },
];

// ============================================================================
// 7. WHAT I'M DOING NOW (/now)
// ============================================================================

export const now: NowData = {
  updated: "August 2026",
  sections: [
    {
      label: "Working on",
      items: [
        "Building Shopify apps, Shop Minis, and iOS apps, focused on getting the user experience right",
        "Building Inovus Profiles (profile.inovuslabs.org), a profile page for every Inovus Labs fellow that connects their platforms and doubles as a portfolio",
        "Setting up self-hosted servers with Docker, learning DevOps hands-on, and locking everything down the secure way",
        "Refining queue systems, background workers, and email deliverability for InoMail",
      ],
    },
    {
      label: "Learning",
      items: [
        "Docker orchestration, self-hosted infrastructure, server hardening, and secure-by-default deployments",
        "Deeper systems architecture for reliable background work and low-latency APIs",
        "Writing that reflects intent instead of noise",
      ],
    },
    {
      label: "Reading",
      items: [
        "Essays on software craft and product engineering",
        "DevOps documentation, Linux server specs, and open-source changelogs",
      ],
    },
    {
      label: "Thinking about",
      items: [
        "How to architect systems in the most inexpensive, hyper-optimized, and resource-efficient way possible",
        "Where AI and native apps actually improve how products feel to use",
      ],
    },
  ],
};

// ============================================================================
// 8. COMMUNITY & STATS
// ============================================================================

export interface Stat {
  value: string;
  label: string;
  icon: LucideIcon;
}

export const communityIntro = {
  eyebrow: "Community Leadership",
  heading: "Empowering the next generation of builders.",
  body: "As CEO of Inovus Labs IEDC, I led innovation-driven technical initiatives, hackathons, and startup programs under the Kerala Startup Mission, focusing on a culture of building, mentoring students, and organising international technical events.",
};

export const stats: Stat[] = [
  { value: "3+", label: "Years of Hacktoberfest", icon: Calendar },
  { value: "75+", label: "Open source contributions", icon: Globe },
  { value: "300+", label: "Students mentored", icon: Users },
  { value: "10+", label: "Sessions Mentored", icon: Trophy },
];
