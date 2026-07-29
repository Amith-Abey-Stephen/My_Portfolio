export const site = {
  name: "amith.site",
  author: "Amith Abey Stephen",
  glyph: "a.",
  role: "Product Engineer",
  purpose: "Building products with purpose.",
  positioning: "A builder who loves solving real problems.",
  tagline:
    "I enjoy building software that solves real problems and creates meaningful impact.",
  location: "Kerala, India",
  email: "amithabey13@gmail.com",
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
  "Amith Abey Stephen is a Product Engineer and builder from Kerala, India. He turns ideas into products across software and hardware — scalable SaaS platforms, AI-powered tools, and cloud-connected IoT systems. He is the former CEO of Inovus Labs IEDC and currently the frontend technical point of contact at μLearn Foundation. His products include SyncBatch, InoMail, Mr DocGen, AirLoo, and several IoT systems.";

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
  "IoT developer",
  "hardware engineer",
  "community leader",
  // Affiliations / entities
  "Inovus Labs IEDC",
  "CEO of Inovus Labs",
  "μLearn Foundation",
  "mulearn",
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
  "TypeScript",
  "Node.js",
  "ESP32",
  "IoT",
  "AI tools",
  "SaaS",
];
