import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { Wordmark } from "@/components/brand/wordmark";

type FooterLink = { label: string; href: string; external?: boolean };

const groups: { title: string; links: FooterLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Work", href: "/#work" },
      { label: "About", href: "/about" },
      { label: "Story", href: "/story" },
      { label: "Writing", href: "/#writing" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Journey", href: "/#journey" },
      { label: "Capabilities", href: "/#capabilities" },
      { label: "Now", href: "/now" },
      { label: "Uses", href: "/uses" },
      { label: "Playground", href: "/playground" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: "/#contact" },
      { label: "Resume", href: "/resume" },
      { label: "PDF Resume", href: site.resumeUrl, external: true },
      { label: "RSS", href: "/writing/rss.xml", external: true },
    ],
  },
];

const socialLinks = [
  { label: "GitHub", href: site.socials.github, icon: Github, external: true },
  {
    label: "LinkedIn",
    href: site.socials.linkedin,
    icon: Linkedin,
    external: true,
  },
  { label: "Email", href: site.socials.email, icon: Mail, external: false },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
  const className =
    "link-underline inline-flex items-center gap-1 text-sm text-secondary hover:text-foreground";
  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {link.label}
        <ArrowUpRight className="h-3 w-3 text-muted" />
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:gap-12">
          {/* Signature — full width on phones, first column from md up */}
          <div className="col-span-2 max-w-xs md:col-span-1">
            <Link href="/" aria-label={`${site.author} — home`}>
              <Wordmark className="text-2xl" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Built with curiosity. Made in Kerala. Always learning.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs text-secondary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-burgundy-light/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-burgundy-light" />
              </span>
              Available for work
            </span>
          </div>

          {/* Link groups */}
          {groups.map((group) => (
            <nav key={group.title} aria-label={`Footer — ${group.title}`}>
              <p className="eyebrow mb-4">{group.title}</p>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <FooterLinkItem link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-border pt-8 md:flex-row md:items-center">
          <p className="font-mono text-xs text-muted">
            © {year} {site.author}. Built with intention.
          </p>
          <div className="flex items-center gap-1">
            {socialLinks.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-elevated hover:text-foreground"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
