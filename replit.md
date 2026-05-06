# Amith Abey Stephen — Portfolio

A premium, cinematic, immersive personal portfolio website for Amith Abey Stephen — developer, IoT innovator, startup builder, and innovation ecosystem leader.

## Run & Operate

- `pnpm --filter @workspace/portfolio run dev` — run the portfolio (served at `/`)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port served at `/api`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, Framer Motion, shadcn/ui
- Fonts: Space Grotesk (headings), Inter (body), JetBrains Mono (labels)
- API: Express 5 (shared api-server artifact)
- DB: PostgreSQL + Drizzle ORM (not used by portfolio — static site)

## Where things live

- `artifacts/portfolio/src/` — main portfolio frontend
- `artifacts/portfolio/src/components/` — all section components (Hero, About, Projects, Experience, Skills, Community, Writing, Contact, Footer, Navbar, Background, CursorGlow)
- `artifacts/portfolio/src/pages/Home.tsx` — single page assembling all sections
- `artifacts/portfolio/src/index.css` — global theme, fonts, glassmorphism utilities
- `artifacts/api-server/src/` — shared Express API server

## Architecture decisions

- Single-page scroll architecture — all sections on one page, no routing needed
- No backend — purely static frontend, no API calls
- Dark mode hardcoded — `class="dark"` on `<html>`, no toggle
- Framer Motion for all animations — scroll-triggered reveals, floating cards, parallax
- Lucide React for all icons (replaced react-icons/si which had export name issues)

## Product

8-section cinematic portfolio: Hero → About → Projects (bento grid) → Experience (timeline) → Skills (capability cards) → Community/INOVUS showcase → Blogs & Writing → Contact. Deep navy/charcoal background with blue/cyan/violet accent glows, glassmorphism cards, floating particles, ambient cursor glow.

## User preferences

- Color palette: #0B0F19, #111827, #0F172A (backgrounds), #3B82F6, #06B6D4, #8B5CF6 (accents)
- No emojis in UI
- No terminal/hacker aesthetics — premium, cinematic, startup quality

## Gotchas

- Google Font `@import url(...)` must be the FIRST line in `index.css` before all other imports
- Use Lucide React icons — `react-icons/si` has inconsistent export names in v5
- CSS variables ship as `red` placeholders — must be rewritten before any components

## Pointers

- See the `pnpm-workspace` skill for workspace structure
- See the `react-vite` skill for frontend conventions
