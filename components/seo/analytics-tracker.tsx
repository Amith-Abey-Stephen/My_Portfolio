"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    clarity?: (...args: any[]) => void;
  }
}

interface TrackerProps {
  gaId?: string;
  clarityId?: string;
}

export function AnalyticsTracker({
  gaId,
  clarityId,
}: TrackerProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId) {
      console.error(
        "[Analytics] Missing NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable. Google Analytics client navigation tracking is disabled."
      );
    }
    if (!clarityId) {
      console.error(
        "[Analytics] Missing NEXT_PUBLIC_CLARITY_PROJECT_ID environment variable. Microsoft Clarity client navigation tracking is disabled."
      );
    }
  }, [gaId, clarityId]);

  useEffect(() => {
    if (!pathname) return;
    const search = searchParams?.toString();
    const url = search ? `${pathname}?${search}` : pathname;

    if (typeof window !== "undefined") {
      // Notify Google Analytics (GA4) of client-side route navigation
      if (typeof window.gtag === "function" && gaId) {
        window.gtag("config", gaId, {
          page_path: url,
          page_title: document.title,
        });
      }

      // Notify Microsoft Clarity of client-side route navigation
      if (typeof window.clarity === "function" && clarityId) {
        try {
          window.clarity("set", "page", url);
        } catch {
          // ignore
        }
      }
    }
  }, [pathname, searchParams, gaId, clarityId]);

  return null;
}
