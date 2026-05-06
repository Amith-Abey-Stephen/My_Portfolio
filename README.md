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

This will generate the production-ready assets in the `dist/public` directory.

### Tech Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Package Manager**: [pnpm](https://pnpm.io/)
