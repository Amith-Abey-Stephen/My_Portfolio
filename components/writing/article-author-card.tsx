import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { site } from "@/content/site";

/**
 * ArticleAuthorCard — E-E-A-T & AEO author card rendered at the end of article bodies.
 * Encodes Schema.org Person microdata to empower search engines and AI answer engines.
 */
export function ArticleAuthorCard() {
  return (
    <aside
      aria-label="About the author"
      itemScope
      itemType="https://schema.org/Person"
      className="mt-14 rounded-card border border-border bg-surface/60 p-6 backdrop-blur-sm sm:p-8"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <Link
          href="/about"
          className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-border bg-surface ring-1 ring-border/50 transition-all duration-300 hover:scale-105 hover:ring-burgundy/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy sm:h-24 sm:w-24"
          aria-label={`About ${site.author}`}
        >
          <Image
            src="/portrait.png"
            alt={`${site.author} — ${site.role}`}
            itemProp="image"
            fill
            sizes="96px"
            quality={90}
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="eyebrow text-xs uppercase tracking-wider text-muted">
                Written by
              </p>
              <h3 className="text-lg font-semibold text-foreground">
                <Link
                  href="/about"
                  rel="author"
                  itemProp="url"
                  className="transition-colors hover:text-burgundy-light"
                >
                  <span itemProp="name">{site.author}</span>
                </Link>
              </h3>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors hover:text-foreground"
            >
              <span>More about Amith</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <p
            itemProp="description"
            className="mt-3 text-sm leading-relaxed text-secondary"
          >
            Product Engineer &amp; Full-Stack Developer building high-performance web platforms,
            Shopify apps, and self-hosted infrastructure. Writing about engineering craft, devops,
            and building systems in public.
          </p>

          <div className="mt-4 flex items-center gap-4 text-xs">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="inline-flex items-center gap-1.5 font-mono text-muted transition-colors hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="inline-flex items-center gap-1.5 font-mono text-muted transition-colors hover:text-foreground"
            >
              <Linkedin className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={site.socials.email}
              aria-label="Email Amith"
              className="inline-flex items-center gap-1.5 font-mono text-muted transition-colors hover:text-foreground"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
