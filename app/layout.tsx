import type { Metadata, Viewport } from "next";
import { fontVariables } from "./fonts";
import "./globals.css";
import { site, seoKeywords } from "@/content/site";
import { Nav } from "@/components/navigation/nav";
import { Footer } from "@/components/footer/footer";
import { Cursor } from "@/components/ui/cursor";
import { LoadingScreen } from "@/components/loading-screen";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SkipLink } from "@/components/layout/skip-link";
import { PersonJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.author} — Building products with purpose`,
    template: `%s — ${site.author}`,
  },
  description:
    "amith.site — Amith Abey Stephen, a Product Engineer from Kerala building software that solves real problems and creates meaningful impact.",
  keywords: seoKeywords,
  authors: [{ name: site.author, url: site.url }],
  creator: site.author,
  publisher: site.author,
  applicationName: site.name,
  category: "Technology",
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, email: false, address: false },
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: "black-translucent",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : {},
  },
  alternates: {
    canonical: "/",
    languages: { "en-US": "/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.author} — Building products with purpose`,
    description:
      "Product Engineer from Kerala building software that solves real problems and creates meaningful impact.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.author} — Building products with purpose`,
    description:
      "Product Engineer building software that solves real problems and creates meaningful impact.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={fontVariables}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* Runs before paint: on a repeat visit this session, flag <html> so the
            intro overlay is hidden via CSS instantly — no flash, no hydration
            mismatch (the React tree renders identically on server and client). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('amith:entered'))document.documentElement.dataset.entered='1'}catch(e){}`,
          }}
        />
        <PersonJsonLd />
        <WebsiteJsonLd />
        <MotionProvider>
          <Cursor />
          <LoadingScreen />
          <SkipLink />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
