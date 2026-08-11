import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Proxy handler supporting Content Negotiation for Markdown ("Accept: text/markdown").
 * Agent discovery Link headers (RFC 8288 / RFC 9727) are set globally in next.config.ts.
 */
export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept") || "";
  const pathname = request.nextUrl.pathname;

  // Check if request explicitly requests text/markdown
  if (accept.includes("text/markdown")) {
    // Exclude static assets, API endpoints, well-known resources, auth.md, and raw text/xml files
    const isExcluded =
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api") ||
      pathname.startsWith("/.well-known") ||
      pathname === "/auth.md" ||
      /\.(png|jpg|jpeg|gif|svg|ico|css|js|xml|txt|webmanifest)$/i.test(pathname);

    if (!isExcluded) {
      const url = request.nextUrl.clone();
      url.pathname = "/api/markdown-negotiation";
      url.searchParams.set("path", pathname);
      return NextResponse.rewrite(url);
    }
  }

  const response = NextResponse.next();
  response.headers.append("Vary", "Accept");
  return response;
}

export const middleware = proxy;

export const config = {
  matcher: [
    /*
     * Match all request paths except static files (_next/static, _next/image, favicon.ico)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
