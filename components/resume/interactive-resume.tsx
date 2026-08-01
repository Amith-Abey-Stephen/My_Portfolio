"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  Printer,
  Mail,
  Check,
  Building2,
  GraduationCap,
  Sparkles,
  FileText,
  X,
} from "lucide-react";
import { journey } from "@/content/journey";
import { capabilities } from "@/content/capabilities";
import { site, education } from "@/content/site";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const ROLE_STACKS: Record<string, string[]> = {
  FinalApps: [
    "Next.js",
    "TypeScript",
    "Shopify Admin API",
    "Shop Minis",
    "Node.js",
    "Webhooks",
  ],
  "μLearn Foundation": [
    "Next.js",
    "React",
    "TanStack Query",
    "Zustand",
    "Tailwind CSS",
  ],
  "Foodo.AI": ["React", "TypeScript", "Figma to Code", "Responsive UI"],
  "Inovus Labs IEDC": [
    "Leadership",
    "Event Ops",
    "IoT Tinkering",
    "Kerala Startup Mission",
  ],
  Google: ["AI Workshops", "Gemini API", "Campus Engagement"],
  "Zidio Development": ["MERN Stack", "MongoDB", "Express", "React", "Node.js"],
};

export function InteractiveResume() {
  const [copied, setCopied] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative">
      {/* Editorial Control Toolbar */}
      <Container className="pt-2 pb-12 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-3xl border border-border/80 bg-surface/50 px-4 py-3 backdrop-blur-md sm:rounded-full sm:px-6">
          <div className="flex items-center gap-2 font-mono text-xs text-muted">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{site.author}</span>
            <span className="text-border">•</span>
            <span>{site.role}</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs">
            {/* Inline PDF iframes don't render on iOS/Android — small screens
                use the "Full PDF" link instead. */}
            <button
              onClick={() => setPdfModalOpen(true)}
              className="hidden items-center gap-1.5 text-muted transition-colors hover:text-foreground sm:flex"
            >
              <FileText className="h-3.5 w-3.5" /> Preview PDF
            </button>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-burgundy-light transition-colors hover:underline"
            >
              Full PDF <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={handlePrint}
              className="hidden items-center gap-1.5 text-muted transition-colors hover:text-foreground sm:flex"
            >
              <Printer className="h-3.5 w-3.5" /> Print
            </button>
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 text-muted transition-colors hover:text-foreground"
            >
              {copied ? (
                <span className="text-emerald-500 flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" /> Copied
                </span>
              ) : (
                <>
                  <Mail className="h-3.5 w-3.5" /> Email
                </>
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Main Editorial Dual-Column Layout */}
      <Section className="py-8 md:py-12">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Left Column: Sticky Metadata & Focus */}
          <div className="lg:sticky lg:top-28 lg:self-start space-y-10">
            <div>
              <p className="eyebrow mb-3 flex items-center gap-2">
                <span className="accent-rule" aria-hidden />
                Track Record
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                Experience & Roles.
              </h2>
              <p className="mt-4 max-w-sm leading-relaxed text-secondary text-base">
                Building scalable web products, leading communities, and shipping software for real users.
              </p>
            </div>

            {/* Quick Meta Stats Box */}
            <div className="rounded-card border border-border/80 bg-surface/40 p-6 space-y-4 backdrop-blur-xs">
              <div className="flex items-center justify-between text-xs font-mono text-muted">
                <span>LOCATION</span>
                <span className="text-foreground">{site.location}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-muted">
                <span>DEGREE</span>
                <span className="text-foreground">{education.degree}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-muted">
                <span>INSTITUTION</span>
                <span className="text-foreground">{education.shortName}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Roles Stream */}
          <div className="space-y-12">
            {journey.map((item, i) => {
              const stack = ROLE_STACKS[item.organization] || [];
              return (
                <Reveal key={`${item.organization}-${item.period}`} delay={i * 0.05}>
                  <div className="group relative border-l-2 border-border pl-6 transition-colors duration-300 hover:border-burgundy">
                    {/* Period & Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs text-muted">
                        {item.period}
                      </span>
                      {item.current && (
                        <span className="rounded-full border border-burgundy/30 bg-burgundy/10 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-burgundy-light">
                          Current Role
                        </span>
                      )}
                    </div>

                    {/* Role & Org */}
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground group-hover:text-burgundy-light transition-colors">
                      {item.role}
                    </h3>
                    <p className="mt-1 flex items-center gap-2 font-medium text-secondary text-base">
                      <Building2 className="h-4 w-4 text-burgundy-light" />
                      {item.organization}
                    </p>

                    {/* Description */}
                    <p className="mt-4 leading-relaxed text-secondary text-base">
                      {item.description}
                    </p>

                    {/* Tech Chips */}
                    {stack.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-[0.7rem] text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Technical Capabilities Grid */}
      <Section className="border-t border-border py-16">
        <SectionHeading
          eyebrow="Capabilities"
          title="What I bring to a team."
          lede="Core engineering skills and operational focus areas."
          className="mb-14"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.title}
                className="group relative overflow-hidden rounded-card border border-border bg-surface/30 p-6 transition-all duration-300 hover:border-burgundy/40 hover:bg-surface/60"
              >
                {/* Subtle radial glow on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(122,36,53,0.12),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-input border border-border bg-surface text-burgundy-light transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {group.title}
                  </h3>
                </div>

                <p className="relative mt-4 leading-relaxed text-secondary text-sm">
                  {group.summary}
                </p>

                <div className="relative mt-6 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-background px-3 py-1 font-mono text-xs text-muted transition-colors group-hover:border-border-strong group-hover:text-secondary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* PDF Quick Preview Modal Overlay */}
      <AnimatePresence>
        {pdfModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPdfModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-card border border-border bg-surface shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-border p-4 px-6">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <FileText className="h-4 w-4 text-burgundy-light" />
                  <span>Resume Preview — {site.author}</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={site.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 font-mono text-xs text-burgundy-light hover:underline"
                  >
                    Open in tab <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <button
                    onClick={() => setPdfModalOpen(false)}
                    className="rounded-input p-1 text-muted hover:text-foreground"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* PDF Frame */}
              <iframe
                src={site.resumeUrl}
                title="Amith Abey Stephen Resume PDF"
                className="h-full w-full border-none"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
