import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

/**
 * Typography per docs/02_DESIGN_SYSTEM.md
 *  - Headings / Display → Geist
 *  - Body               → Inter
 *  - Mono               → Geist Mono
 */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const geistSans = GeistSans;
export const geistMono = GeistMono;

export const fontVariables = `${inter.variable} ${geistSans.variable} ${geistMono.variable}`;
