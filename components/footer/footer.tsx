import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";

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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Signature */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="font-heading text-2xl font-semibold tracking-tight"
            >
              amith<span className="text-burgundy-soft">.site</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Built with curiosity. Made in Kerala. Always learning.
            </p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer — explore">
            <p className="eyebrow mb-4">Explore</p>
            <ul className="space-y-2.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-sm text-secondary hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* More */}
          <nav aria-label="Footer — more">
            <p className="eyebrow mb-4">More</p>
            <ul className="space-y-2.5">
              {site.more.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-sm text-secondary hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
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
