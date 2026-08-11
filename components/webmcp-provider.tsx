"use client";

import { useEffect } from "react";

// WebMCP API TypeScript interface definitions
declare global {
  interface Navigator {
    modelContext?: {
      registerTool: (
        tool: {
          name: string;
          description: string;
          inputSchema: Record<string, unknown>;
          execute: (params: any) => Promise<any> | any;
        },
        options?: { signal?: AbortSignal }
      ) => void;
    };
  }
}

/**
 * WebMCP Provider Component
 * Registers WebMCP tools on navigator.modelContext for browser-based AI agents
 * per the WebMCP specification (https://webmachinelearning.github.io/webmcp/).
 */
export function WebMCPProvider() {
  useEffect(() => {
    if (!("modelContext" in navigator) || !navigator.modelContext) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    try {
      // 1. Search tool
      navigator.modelContext.registerTool(
        {
          name: "search_portfolio",
          description: "Search projects, writing, case studies, and bio for Amith Abey Stephen.",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Search query or keyword (e.g. SyncBatch, Shopify, InoMail)",
              },
            },
            required: ["query"],
          },
          execute: async ({ query }: { query: string }) => {
            const q = query.trim().toLowerCase();
            const paths = ["/work", "/writing", "/about"];
            const pages = await Promise.all(
              paths.map(async (path) => {
                const res = await fetch(`/api/markdown-negotiation?path=${encodeURIComponent(path)}`);
                return { path, text: await res.text() };
              })
            );
            const results = pages.flatMap(({ path, text }) =>
              text
                .split(/\n(?=#{1,3} )/)
                .filter((section) => section.toLowerCase().includes(q))
                .map((section) => ({ path, excerpt: section.trim().slice(0, 600) }))
            );
            return { query, results };
          },
        },
        { signal }
      );

      // 2. Fetch page markdown content tool
      navigator.modelContext.registerTool(
        {
          name: "get_page_content",
          description: "Fetch clean Markdown content for any page on amith.site (e.g. /about, /story, /now, /resume).",
          inputSchema: {
            type: "object",
            properties: {
              path: {
                type: "string",
                description: "Page path (e.g. /about, /story, /now, /work/syncbatch)",
              },
            },
            required: ["path"],
          },
          execute: async ({ path }: { path: string }) => {
            const res = await fetch(`/api/markdown-negotiation?path=${encodeURIComponent(path)}`);
            const text = await res.text();
            return { path, content: text };
          },
        },
        { signal }
      );

      // 3. Send contact message tool
      navigator.modelContext.registerTool(
        {
          name: "send_contact_message",
          description: "Send a contact form inquiry to Amith Abey Stephen.",
          inputSchema: {
            type: "object",
            properties: {
              name: { type: "string", description: "Sender name" },
              email: { type: "string", description: "Sender email" },
              message: { type: "string", description: "Message body" },
            },
            required: ["name", "email", "message"],
          },
          execute: async (payload: { name: string; email: string; message: string }) => {
            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            return await res.json();
          },
        },
        { signal }
      );
    } catch (err) {
      console.warn("[WebMCP] Tool registration notice:", err);
    }

    return () => {
      controller.abort();
    };
  }, []);

  return null;
}
