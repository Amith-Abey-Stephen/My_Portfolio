# amith.site

> A digital home documenting the journey of a builder.

An editorial, magazine-style personal site for **Amith Abey Stephen** — built to
feel calm, timeless, and story-first. Neutrals dominate; burgundy is reserved for
emphasis. The work is the hero.

Built from the specification in [`/docs`](./docs), which remains the single source
of truth for brand, design, experience, content, and architecture.

## Tech Stack

- **Framework** — [Next.js](https://nextjs.org) (App Router) + TypeScript
- **Styling** — [Tailwind CSS v4](https://tailwindcss.com)
- **Animation** — [Framer Motion](https://www.framer.com/motion/) (reduced-motion aware)
- **Icons** — [Lucide](https://lucide.dev)
- **Fonts** — Geist (headings), Inter (body), Geist Mono (mono) via `next/font`
- **Email** — [Resend](https://resend.com) for the contact form
- **Writing** — Ghost Content API (`blog.inovuslabs.org`)
- **Deploy** — [Vercel](https://vercel.com)

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in the values you need
npm run dev                  # http://localhost:3000
```

### Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the dev server                 |
| `npm run build`     | Production build                     |
| `npm run start`     | Serve the production build           |
| `npm run lint`      | ESLint                               |
| `npm run typecheck` | TypeScript, no emit                  |

## Environment Variables

| Variable               | Purpose                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap, OpenGraph                 |
| `RESEND_API_KEY`       | Resend key. If empty, the contact form logs instead of sending |
| `CONTACT_FROM_EMAIL`   | Verified Resend "from" address                                 |
| `CONTACT_TO_EMAIL`     | Where contact submissions are delivered                        |
| `BLOG_API_URL`         | Ghost blog base URL                                            |
| `BLOG_API_KEY`         | Ghost Content API key (writing is hidden if unset)             |
| `BLOG_AUTHOR`          | Ghost author slug to filter posts by                           |

The contact form degrades gracefully: with no `RESEND_API_KEY` it validates and
logs submissions so the UX still works in development.

## Structure

```
app/            App Router — pages, layout, api, sitemap, robots, OG image
components/
  cards/        Project & article cards
  forms/        Contact form
  footer/       Footer signature
  journey/      Timeline
  layout/       Container, Section, PageHeader, headings, skip link
  motion/       Reveal primitives + MotionConfig (reduced-motion)
  navigation/   Sticky nav (transparent → blur)
  sections/     Homepage sections
  seo/          JSON-LD structured data
  ui/           Button, Badge, Card
content/        Typed content — site, projects, journey, capabilities, about,
                story, community, now, uses, playground
lib/            api.ts (data seam), utils, metadata helper
types/          Shared TypeScript types
public/         Favicons, manifest, static assets
docs/           The specification — the source of truth
```

## Pages

Home · About · Story · Work (+ case studies) · Journey · Capabilities · Writing ·
Resume · Now · Uses · Playground · Contact — plus a friendly 404, dynamic sitemap,
robots, and a generated OpenGraph image.

## Accessibility & Performance

- Respects `prefers-reduced-motion` globally (CSS + Framer `MotionConfig`)
- Keyboard navigable with a skip link and visible focus states
- Semantic HTML, AA+ contrast, static generation, `next/font`, code splitting

## Deployment

Push to GitHub and import into Vercel. Set the environment variables above.
Production deploys from `main`; pull requests get preview deployments.
