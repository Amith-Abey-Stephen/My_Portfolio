import { Suspense } from "react";
import { AnalyticsTracker } from "./analytics-tracker";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

/**
 * Server-rendered analytics script tags that load directly in <head>
 * for instantaneous tracking without waiting for React hydration.
 */
export function Analytics() {
  if (process.env.NODE_ENV !== "production") {
    if (!GA_ID) {
      console.error(
        "[Analytics] Missing NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable. Google Analytics will not be loaded."
      );
    }
    if (!CLARITY_ID) {
      console.error(
        "[Analytics] Missing NEXT_PUBLIC_CLARITY_PROJECT_ID environment variable. Microsoft Clarity will not be loaded."
      );
    }
  }
  return (
    <>
      {/* Google Analytics (GA4) */}
      {GA_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <script
            id="google-analytics-init"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `,
            }}
          />
        </>
      )}

      {/* Microsoft Clarity */}
      {CLARITY_ID && (
        <script
          id="microsoft-clarity-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");
            `,
          }}
        />
      )}

      {/* Client-side App Router SPA Navigation Tracker */}
      <Suspense fallback={null}>
        <AnalyticsTracker gaId={GA_ID} clarityId={CLARITY_ID} />
      </Suspense>
    </>
  );
}
