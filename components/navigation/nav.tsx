"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";

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
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
        <Link
          href="/"
          className="group flex items-baseline gap-0.5 font-heading text-lg font-semibold tracking-tight"
          aria-label={`${site.author} — home`}
        >
          <span className="text-foreground">amith</span>
          <span className="text-burgundy-soft transition-colors group-hover:text-burgundy">
            .site
          </span>
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
          <ButtonLink href="/contact" variant="primary" size="sm">
            Get in touch
          </ButtonLink>
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
              {[...site.nav, ...site.more].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-input px-3 py-2.5 text-base transition-colors",
                    isActive(item.href)
                      ? "bg-elevated text-foreground"
                      : "text-secondary hover:bg-surface hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
