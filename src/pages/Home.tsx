import { lazy, Suspense } from "react";
import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { Analytics } from "@/components/Analytics";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/CursorGlow";

const Community = lazy(() => import("@/components/Community").then(m => ({ default: m.Community })));
const Writing = lazy(() => import("@/components/Writing").then(m => ({ default: m.Writing })));
const Contact = lazy(() => import("@/components/Contact").then(m => ({ default: m.Contact })));

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none">
        Skip to main content
      </a>
      <Background />
      <CursorGlow />
      <Navbar />
      
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Suspense fallback={null}><Community /></Suspense>
        <Suspense fallback={null}><Writing /></Suspense>
        <Suspense fallback={null}><Contact /></Suspense>
      </main>

      <Footer />
      <Analytics />
    </div>
  );
}