import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "blog.inovuslabs.org" },
      { protocol: "https", hostname: "**.r2.dev" },
      { protocol: "https", hostname: "**.amith.site" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // The /work index page was removed — bounce it (and any old or external
      // links) to the Selected Work section on the homepage. Project detail
      // pages at /work/<slug> are unaffected.
      { source: "/work", destination: "/#work", permanent: false },
      // Likewise, /journey was folded into the homepage Journey section.
      { source: "/journey", destination: "/#journey", permanent: false },
    ];
  },
  allowedDevOrigins: ['10.183.253.123'],
};

export default nextConfig;
