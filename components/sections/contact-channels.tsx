"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { site } from "@/content/site";

const channels = [
  { label: "Email", value: site.email, href: site.socials.email, icon: Mail },
  {
    label: "GitHub",
    value: "Amith-Abey-Stephen",
    href: site.socials.github,
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "Amith-Abey-Stephen",
    href: site.socials.linkedin,
    icon: Linkedin,
  },
];

/** The "Elsewhere" channel list — the email row is one-click copyable. */
export function ContactChannels() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the mailto link still works */
    }
  };

  return (
    <ul className="divide-y divide-border overflow-hidden rounded-card border border-border">
      {channels.map(({ label, value, href, icon: Icon }) => {
        const external = href.startsWith("http");
        const isEmail = label === "Email";
        return (
          <li
            key={label}
            className="flex items-center gap-2 bg-surface pr-3 transition-colors hover:bg-elevated active:bg-elevated"
          >
            <a
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex min-w-0 flex-1 items-center gap-4 px-6 py-5"
            >
              <Icon
                className="h-5 w-5 shrink-0 text-burgundy-light"
                strokeWidth={1.5}
              />
              <span className="min-w-0">
                <span className="block font-mono text-xs uppercase tracking-wider text-muted">
                  {label}
                </span>
                <span className="block truncate text-foreground">{value}</span>
              </span>
            </a>

            {isEmail && (
              <button
                type="button"
                onClick={copyEmail}
                aria-label={copied ? "Email copied" : "Copy email address"}
                className="shrink-0 rounded-input p-3 text-muted transition-colors hover:text-foreground"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-burgundy-light" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
