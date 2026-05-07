# Amith Abey Stephen - Portfolio

A cinematic, futuristic portfolio built with React, Vite, TailwindCSS, and TypeScript.

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Environment Variables

Create a `.env` file in the root of your project based on the provided `.env.example`:

```bash
cp .env.example .env
```

Available environment variables:
- `PORT` (optional): The port the development server will run on (defaults to 5173).
- `BASE_PATH` (optional): The base path for the application (defaults to `/`).
- `VITE_GHOST_API_KEY`: Your Ghost Content API key for fetching dynamic blog posts.

### Running Locally

Start the development server:

```bash
pnpm run dev
```

The application will be available at `http://localhost:5173` (or the port specified in your `.env` file).

### Building for Production

Create a production build:

```bash
pnpm run build
```

This will generate the production-ready assets in the `dist` directory.

### Tech Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Blog Integration**: [Ghost Content API](https://ghost.org/docs/content-api/)
- **Package Manager**: [pnpm](https://pnpm.io/)

### Features

- **Cinematic Design**: High-end, developer-focused aesthetic with glassmorphism and ambient glows.
- **Dynamic Writing Section**: Fetches latest blog posts directly from your Ghost CMS.
- **Interactive Community Section**: Animated counters and playful hover interactions for impact metrics.
- **Fully Responsive**: Optimized for all devices from mobile to large desktops.
- **Resume Integration**: Easy access to your hosted resume via multiple touchpoints.
