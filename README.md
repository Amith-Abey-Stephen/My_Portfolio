# amith.site

> A digital home documenting the journey of a builder — Amith Abey Stephen.

An editorial, magazine-style personal site for **Amith Abey Stephen** — built to feel calm, timeless, and story-first. Neutrals dominate; burgundy is reserved for emphasis. The work is the hero.

Built from the specification in [`/docs`](./docs), which remains the single source of truth for brand, design, experience, content, and architecture.

---

## Technical Stack & Architecture

- **Framework** — [Next.js](https://nextjs.org) 16 (App Router) + TypeScript
- **Styling** — [Tailwind CSS v4](https://tailwindcss.com) + Custom Design System
- **Desktop Smooth Inertia Scroll** — [Lenis](https://lenis.darkroom.engineering) (gated to fine pointer devices; deferred to idle time via `requestIdleCallback`)
- **Mobile Touch Momentum** — Uninterrupted native 60FPS vertical momentum touch flow (zero horizontal touch traps or scroll locking)
- **Animation** — [Framer Motion](https://www.framer.com/motion/) (reduced-motion aware & hydration safe)
- **Icons** — [Lucide React](https://lucide.dev)
- **Fonts** — Geist (headings), Inter (body), Geist Mono (mono) via `next/font`
- **Email** — [Resend](https://resend.com) for contact submissions
- **Writing** — Ghost Content API (`blog.inovuslabs.org`)
- **AI Knowledge & GEO Protocol** — [`/llms.txt`](./app/llms.txt/route.ts), [`/llms-full.txt`](./app/llms-full.txt/route.ts), [`/geo.md`](./app/geo.md/route.ts)
- **Deploy** — [Vercel](https://vercel.com)

---

## Key Features & Optimizations

### 1. Uninterrupted 60FPS Mobile Flow
- Refactored project cards & capabilities grids to clean vertical card streams (`flex flex-col gap-6`) on mobile screens, removing all horizontal scroll-snap containers (`overflow-x-auto`) that trap touch gestures.
- Gated continuous progress bar repaints and Lenis smooth inertia scrolling strictly to `(pointer: fine)` desktop environments.

### 2. High-Performance Core Web Vitals
- **0ms LCP Render Delay**: Un-wrapped initial `<h1>` paint from opacity delay animations, painting main hero headings instantly on first byte.
- **23+ KiB Payload Reduction**: Configured Next.js AVIF and WebP image optimization with responsive device sizes (`360`, `480`, `640`).
- **45+ KiB Dynamic Code-Splitting**: Code-split below-the-fold homepage sections (`AboutPreview`, `JourneyPreview`, `Capabilities`, `WritingPreview`, `Contact`) using `next/dynamic`, eliminating initial main-thread blocking tasks.

### 3. Generative Engine Optimization (GEO) & AI Discovery
- **`https://amith.site/llms.txt`**: Standard llmstxt.org concise summary.
- **`https://amith.site/llms-full.txt`**: Comprehensive AI knowledge context file covering all 6 product case studies (SyncBatch, InoMail, Mr DocGen, AirLoo, Smart Fire Alert, Smart Irrigation), journey milestones, capabilities, and personal philosophy.
- **`https://amith.site/geo.md`**: Structured entity and location metadata file (Thiruvalla, Kerala, India) for AI search engines (Perplexity, ChatGPT, Claude, Gemini, SearchGPT).
- **Robots.txt AI Crawlers**: Explicitly permits 20+ AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `Meta-ExternalAgent`).

### 4. Hardened Security Headers & Accessibility
- **Security Headers**: HSTS (`includeSubDomains; preload`), CSP (Content Security Policy), COOP (`same-origin`), and CORP (`same-origin`).
- **Accessibility Tree Compliance**: Full `role="text"` attributes on dynamic text spans to ensure ARIA tree compliance.

---

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in the values you need
npm run dev                  # http://localhost:3000
```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check (no emit) |

---

## Project Structure

```
app/            App Router — pages, layout, api, sitemap, robots, llms.txt, llms-full.txt, geo.md
components/
  cards/        Project & article cards
  forms/        Contact form
  footer/       Footer signature
  journey/      Timeline
  layout/       Container, Section, PageHeader, headings, skip link
  motion/       Reveal primitives, SmoothScroll (Lenis), TypewriterText, RotatingText
  navigation/   Streamlined mobile & desktop navigation
  sections/     Homepage sections & Hero
  seo/          JSON-LD structured data
  ui/           Button, Badge, Card, DesktopHintToast
content/        Typed content — site, projects, journey, capabilities, about, story, community, now
lib/            api.ts (data seam), utils, metadata helper
types/          Shared TypeScript types
public/         Favicons, manifest, static assets
docs/           The specification — single source of truth
```

---

## License & Author

Crafted with purpose by **Amith Abey Stephen** in Kerala, India.
