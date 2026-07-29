"use client";

import { useState } from "react";
import { Check, Link2, Linkedin, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

/** Copy-link + social share for an article. */
export function ShareRow({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — no-op */
    }
  };

  const x = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const btn =
    "flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-border-strong hover:text-foreground";

  return (
    <div>
      <p className="eyebrow mb-3">Share</p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={copy}
          aria-label="Copy link"
          className={cn(btn, copied && "border-burgundy/40 text-burgundy-light")}
        >
          {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        </button>
        <a
          href={x}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
          className={btn}
        >
          <Twitter className="h-4 w-4" />
        </a>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className={btn}
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
