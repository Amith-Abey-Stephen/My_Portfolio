import type { NowData } from "@/types";

/**
 * A /now page — what I'm focused on at the moment.
 * Inspired by nownownow.com. Updated roughly monthly.
 */
export const now: NowData = {
  updated: "July 2026",
  sections: [
    {
      label: "Working on",
      items: [
        "Building Shopify apps and AI merchant tools as a full-stack dev at FinalApps",
        "Refining InoMail's queue and deliverability",
        "Rebuilding this site as a calmer, more editorial home",
      ],
    },
    {
      label: "Learning",
      items: [
        "Deeper systems design for reliable background work",
        "Writing that reflects instead of impresses",
        "Getting better at saying no to keep scope small",
      ],
    },
    {
      label: "Reading",
      items: ["Essays on craft and product", "Docs, changelogs, and source code"],
    },
    {
      label: "Thinking about",
      items: [
        "How to document building in public without the noise",
        "Where AI genuinely earns a place in the tools I make",
      ],
    },
  ],
};
