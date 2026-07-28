import type { Metadata, Viewport } from "next";
import { fontVariables } from "./fonts";
import "./globals.css";
import { site, seoKeywords } from "@/content/site";
import { Nav } from "@/components/navigation/nav";
import { Footer } from "@/components/footer/footer";
import { LoadingScreen } from "@/components/loading-screen";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SkipLink } from "@/components/layout/skip-link";
import { PersonJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.author} — A builder who loves solving real problems`,
    template: `%s — ${site.author}`,
  },
  description:
    "amith.site is a digital home documenting the journey of a builder — turning ideas into products across software, hardware, and community.",
  keywords: seoKeywords,
  authors: [{ name: site.author, url: site.url }],
  creator: site.author,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.author} — A builder who loves solving real problems`,
    description:
      "A digital home documenting the journey of a builder — software, hardware, and the communities around them.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.author} — Builder`,
    description:
      "A digital home documenting the journey of a builder — software, hardware, and community.",
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
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <PersonJsonLd />
        <WebsiteJsonLd />
        <MotionProvider>
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
