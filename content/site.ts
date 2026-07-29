export const site = {
  name: "amith.site",
  author: "Amith Abey Stephen",
  glyph: "a.",
  role: "Product Engineer",
  // Rotating identity, cycled in the hero. `role` stays the canonical one
  // used for SEO, JSON-LD, and meta descriptions.
  roles: [
    "Product Engineer",
    "Full-Stack Developer",
    "Shopify App Developer",
    "IoT Tinkerer",
    "Community Builder",
  ],
  // Rotating accent for the hero headline — "Building products with ___".
  headlineWords: ["purpose.", "impact.", "intent.", "care."],
  purpose: "Building products with purpose.",
  positioning: "A builder who loves solving real problems.",
  tagline:
    "I enjoy building software that solves real problems and creates meaningful impact.",
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
  // Primary navbar — matches the brand board.
  nav: [
    { label: "Work", href: "/work" },
    { label: "Journey", href: "/journey" },
    { label: "Capabilities", href: "/#capabilities" },
    { label: "Writing", href: "/#writing" },
    { label: "About", href: "/about" },
  ],
  // Secondary pages, surfaced in the footer
  more: [
    { label: "Story", href: "/story" },
    { label: "Now", href: "/now" },
    { label: "Uses", href: "/uses" },
    { label: "Playground", href: "/playground" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

/** A rich, quotable bio — used for meta descriptions, JSON-LD, and llms.txt. */
export const bio =
  "Amith Abey Stephen is a full-stack developer and builder from Kerala, India. He turns ideas into products across software and hardware — scalable SaaS platforms, AI-powered tools, automation systems, and cloud-connected IoT solutions built with Next.js, React, MongoDB, and ESP32. He is a Junior Full Stack Developer at FinalApps building Shopify apps (Shop Minis and App Store) and AI-powered merchant tools, the former CEO of Inovus Labs IEDC, and a frontend technical point of contact at μLearn Foundation with 75+ commits across its platforms. His products include SyncBatch, InoMail, Mr DocGen, and AirLoo.";

export const education = {
  name: "Kristu Jyoti College of Management and Technology",
  shortName: "KJCMT",
  degree: "BCA (Bachelor of Computer Applications)",
  location: "Changanassery, Kerala, India",
};

export const seoKeywords = [
  // Identity
  "Amith Abey Stephen",
  "Amith",
  "Amith Stephen",
  "amith.site",
  // Roles
  "Product Engineer",
  "builder",
  "full-stack developer",
  "frontend developer",
  "Shopify app developer",
  "Shopify developer",
  "IoT developer",
  "hardware engineer",
  "community leader",
  // Affiliations / entities
  "FinalApps",
  "Inovus Labs IEDC",
  "CEO of Inovus Labs",
  "μLearn Foundation",
  "mulearn",
  "Foodo.AI",
  "Google Campus Ambassador",
  "Kristu Jyoti College",
  "KJCMT",
  "Kerala Startup Mission",
  // Location
  "Kerala",
  "Thiruvalla",
  "India developer",
  // Products
  "SyncBatch",
  "InoMail",
  "Mr DocGen",
  "AirLoo",
  "Smart Irrigation",
  "Smart Fire Alert",
  // Tech
  "Next.js developer",
  "React developer",
  "Vue.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "BullMQ",
  "Redis",
  "Shopify Admin API",
  "Shopify Storefront API",
  "Shop Minis",
  "Gemini API",
  "OpenRouter",
  "MERN",
  "ESP32",
  "IoT",
  "AI tools",
  "AI agents",
  "SaaS",
];
