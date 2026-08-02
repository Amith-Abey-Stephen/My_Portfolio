import type { NowData } from "@/types";

/**
 * A /now page — what I'm focused on at the moment.
 * Inspired by nownownow.com. Updated roughly monthly.
 */
export const now: NowData = {
  updated: "August 2026",
  sections: [
    {
      label: "Working on",
      items: [
        "Building Shopify apps, Shop Minis, and upcoming Reddit apps — focused on crafting products with superior user experience",
        "Diving deep into DevOps & self-hosting: managing custom servers, running cloud infrastructure, and shipping products that matter",
        "Refining queue systems, background workers, and email deliverability for InoMail",
      ],
    },
    {
      label: "Learning",
      items: [
        "Self-hosted infrastructure orchestration, server hardening, and lean Linux deployments",
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
        "Where AI and native platform apps genuinely create delightful, high-touch user experiences",
      ],
    },
  ],
};
