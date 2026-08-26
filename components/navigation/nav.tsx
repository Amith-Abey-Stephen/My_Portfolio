"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Monitor, X } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";
import { Wordmark } from "@/components/brand/wordmark";
import { useGenZ } from "@/components/genz/genz-mode";

/**
 * Language switch for "english (chronically online)" — a mono, segmented
 * en / gen z pill with a sliding burgundy thumb, in the site's badge language.
 */
function GenZToggle({ className }: { className?: string }) {
  const { enabled, toggle } = useGenZ();
  return (
    <button
      type="button"
      onClick={toggle}
      data-genz-skip
      role="switch"
      aria-checked={enabled}
      aria-label={enabled ? "Switch back to english" : "Switch to gen z mode"}
      title="english (chronically online)"
      className={cn(
        "relative flex h-9 items-center rounded-full border p-1 font-mono text-[0.62rem] uppercase tracking-wider transition-all duration-300",
        enabled
          ? "border-burgundy/60 bg-burgundy/10 shadow-[0_0_14px_rgba(122,36,53,0.35)]"
          : "border-border bg-surface hover:border-burgundy/40",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-burgundy transition-transform duration-300 ease-out",
          enabled && "translate-x-full",
        )}
      />
      <span
        className={cn(
          "relative z-10 w-12 text-center transition-colors duration-300",
          enabled ? "text-muted" : "text-burgundy-foreground",
        )}
      >
        en
      </span>
      <span
        className={cn(
          "relative z-10 w-12 text-center transition-colors duration-300",
          enabled ? "text-burgundy-foreground" : "text-muted",
        )}
      >
        gen z
      </span>
    </button>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    // Hash links (e.g. "/#writing") stay active on their detail routes.
    if (href.startsWith("/#")) return pathname.startsWith(`/${href.slice(2)}`);
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/80 bg-background/70 py-3 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent py-5",
      )}
    >
      <Container className="flex items-center justify-between">
        <Link href="/" aria-label={`${site.author} — home`}>
          <Wordmark className="text-lg" />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 md:flex"
        >
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "link-underline text-sm transition-colors",
                isActive(item.href)
                  ? "text-foreground"
                  : "text-muted hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-2">
            <GenZToggle />
            <ButtonLink href="/resume" variant="secondary" size="sm">
              Resume
            </ButtonLink>
            <ButtonLink href="/#contact" variant="primary" size="sm">
              Get in touch
            </ButtonLink>
          </div>
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-input text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-input px-3.5 py-2.5 text-base font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-elevated text-foreground"
                      : "text-secondary hover:bg-surface hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}

              <div
                data-genz-skip
                className="mt-3 flex items-center justify-between rounded-input border border-border bg-surface py-2.5 pl-3.5 pr-2.5"
              >
                <span className="text-base font-medium text-secondary">
                  Language
                </span>
                <GenZToggle />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2.5 border-t border-border pt-4">
                <ButtonLink href="/resume" variant="secondary" size="md" className="w-full justify-center">
                  Resume
                </ButtonLink>
                <ButtonLink href="/#contact" variant="primary" size="md" className="w-full justify-center">
                  Get in touch
                </ButtonLink>
              </div>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
