import type { Experiment } from "@/types";

export const playgroundIntro =
  "Small experiments and unfinished ideas. Not everything here will become a product — and that's the point. This is where things are allowed to be incomplete.";

export const experiments: Experiment[] = [
  {
    title: "Contact normaliser",
    description:
      "A tiny parser that untangles messy phone numbers from spreadsheets. It grew up into part of SyncBatch.",
    status: "Released",
    tags: ["Parsing", "Utility"],
  },
  {
    title: "Usage heatmaps",
    description:
      "Rendering sensor activity over time as a heatmap. Started as an AirLoo experiment; still fun to poke at.",
    status: "In Progress",
    tags: ["IoT", "Dataviz"],
  },
  {
    title: "Prompt-to-section",
    description:
      "Constraining a model to fill a fixed document structure instead of free-writing. Feeding ideas back into Mr DocGen.",
    status: "In Progress",
    tags: ["AI", "Automation"],
  },
  {
    title: "ESP-NOW mesh notes",
    description:
      "Getting a handful of ESP32s to gossip without Wi-Fi. Half notebook, half breadboard.",
    status: "Concept",
    tags: ["Embedded", "Networking"],
  },
];
