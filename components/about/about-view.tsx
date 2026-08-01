"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Compass,
  Lightbulb,
  Users,
  Code2,
  MapPin,
  Flame,
} from "lucide-react";
import { about } from "@/content/about";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VALUE_ICONS: Record<string, React.ElementType> = {
  Curiosity: Compass,
  Craftsmanship: Sparkles,
  Purpose: Lightbulb,
  Community: Users,
};

// 3D Magnetic Portrait Card Component
function TiltPortrait() {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    const xPct = clientX / width - 0.5;
    const yPct = clientY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-1000 relative mx-auto w-full max-w-sm"
    >
      {/* Floating 3D Badges */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -left-4 z-20 hidden rounded-full border border-border/80 bg-background/80 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-burgundy-light backdrop-blur-md shadow-lg sm:flex items-center gap-1.5"
      >
        <Code2 className="h-3.5 w-3.5" /> Product Engineer
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-4 -right-4 z-20 hidden rounded-full border border-border/80 bg-background/80 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-muted backdrop-blur-md shadow-lg sm:flex items-center gap-1.5"
      >
        <MapPin className="h-3.5 w-3.5 text-burgundy" /> {site.location}
      </motion.div>

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative flex aspect-[4/5] w-full items-end justify-center overflow-hidden rounded-card border border-border/90 bg-surface shadow-2xl transition-all duration-300 hover:border-burgundy/50"
      >
        {/* Radial Ambient Glow */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(122,36,53,0.4),transparent_65%)] transition-opacity duration-500 group-hover:opacity-100 opacity-80"
        />

        {/* Dynamic Glass Reflection */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <Image
          src="/portrait.png"
          alt={`${site.author} — ${site.role}`}
          width={1065}
          height={1600}
          className="relative z-10 h-[112%] w-auto object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </motion.div>
    </motion.div>
  );
}

// Repel Spotlight Value Card Component
function SpotlightValueCard({
  title,
  body,
  index,
}: {
  title: string;
  body: string;
  index: number;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const Icon = VALUE_ICONS[title] || Sparkles;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-card border border-border/80 bg-surface/40 p-8 shadow-md backdrop-blur-md transition-all duration-500 hover:border-burgundy/50 hover:bg-surface/80 hover:shadow-2xl"
    >
      {/* Mouse Tracking Radial Spotlight */}
      {isHovered && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(122, 36, 53, 0.22), transparent 80%)`,
          }}
        />
      )}

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-input border border-border bg-background text-burgundy-light transition-transform duration-500 group-hover:scale-110 group-hover:bg-burgundy group-hover:text-white">
            <Icon className="h-5 w-5" />
          </span>
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            {title}
          </h3>
        </div>

        <span className="font-mono text-xs text-muted opacity-60 group-hover:opacity-100 transition-opacity">
          0{index + 1}
        </span>
      </div>

      <p className="relative z-10 mt-5 leading-relaxed text-secondary text-base">
        {body}
      </p>
    </motion.div>
  );
}

export function AboutView() {
  return (
    <div className="relative">
      {/* Intro & 3D Magnetic Portrait */}
      <Container className="pb-16 pt-4 md:pb-24">
        <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-16">
          <TiltPortrait />

          {/* Intro Text Stream */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl font-medium leading-relaxed tracking-tight text-foreground md:text-2xl"
            >
              {about.intro[0]}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-base leading-relaxed text-secondary md:text-lg"
            >
              {about.intro[1]}
            </motion.p>
          </div>
        </div>
      </Container>

      {/* Philosophy 3D Perspective Stage */}
      <Section className="border-y border-border bg-surface/40 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <SectionHeading eyebrow="Philosophy" title="How I think about work." />
          <div className="max-w-2xl space-y-8">
            {about.philosophy.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -25, rotateX: 10 }}
                whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative border-l-2 border-border/80 pl-6 transition-colors duration-300 hover:border-burgundy"
              >
                <p className="text-xl leading-relaxed text-foreground transition-colors group-hover:text-burgundy-light md:text-2xl">
                  {line}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Values Spotlight Section */}
      <Section className="py-16 md:py-24">
        <SectionHeading
          eyebrow="Values"
          title="What I try to hold onto."
          className="mb-14"
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {about.values.map((value, i) => (
            <SpotlightValueCard
              key={value.title}
              title={value.title}
              body={value.body}
              index={i}
            />
          ))}
        </div>
      </Section>

      {/* Interests & Fun Facts Interactive Grid */}
      <Section className="border-t border-border py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left Column: Interests & Current Focus */}
          <div>
            <SectionHeading
              eyebrow="Interests"
              title="Things that pull my attention."
              className="mb-8"
            />
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-2.5"
            >
              {about.interests.map((interest) => (
                <Badge
                  key={interest}
                  className="transition-transform duration-300 hover:scale-110 hover:border-burgundy/40"
                >
                  {interest}
                </Badge>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-12 rounded-card border border-border/80 bg-surface/40 p-6 md:p-8 backdrop-blur-xs"
            >
              <p className="eyebrow mb-3 flex items-center gap-2">
                <span className="accent-rule" aria-hidden />
                Current Focus
              </p>
              <p className="text-lg leading-relaxed text-secondary">
                {about.currentFocus}
              </p>
              <ButtonLink href="/now" variant="ghost" className="mt-5 -ml-2">
                What I&rsquo;m doing now
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </motion.div>
          </div>

          {/* Right Column: Fun Facts */}
          <div>
            <SectionHeading
              eyebrow="Fun facts"
              title="A few true things."
              className="mb-8"
            />
            <ul className="space-y-6">
              {about.funFacts.map((fact, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex gap-4 rounded-card border border-border/60 bg-surface/30 p-5 backdrop-blur-xs transition-all duration-300 hover:border-burgundy/40 hover:bg-surface/60"
                >
                  <span
                    className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-burgundy transition-transform duration-300 group-hover:scale-150 animate-pulse"
                    aria-hidden
                  />
                  <span className="text-lg leading-relaxed text-secondary transition-colors group-hover:text-foreground">
                    {fact}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
