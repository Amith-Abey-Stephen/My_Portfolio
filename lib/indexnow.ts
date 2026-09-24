import { site } from "@/content/site";

export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY || "a3b8e91f0c2d4e5a8f7b6c5d4e3a2b1f";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? site.url).replace(/^https?:\/\/www\./, "https://").replace(/\/$/, "");
const parsedUrl = new URL(siteUrl);
const host = parsedUrl.host;

export interface IndexNowResponse {
  success: boolean;
  status: number;
  message: string;
  count: number;
  urls: string[];
}

/**
 * Submit one or multiple URLs to the IndexNow protocol (Bing, Yandex, Seznam, etc.)
 */
export async function submitToIndexNow(
  urls: string[],
): Promise<IndexNowResponse> {
  if (!urls || urls.length === 0) {
    return {
      success: false,
      status: 400,
      message: "No URLs provided for submission.",
      count: 0,
      urls: [],
    };
  }

  // Ensure all URLs are absolute and belong to this host
  const normalizedUrls = urls.map((u) => {
    if (u.startsWith("http://") || u.startsWith("https://")) return u;
    return `${siteUrl}${u.startsWith("/") ? "" : "/"}${u}`;
  });

  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${siteUrl}/${INDEXNOW_KEY}.txt`,
    urlList: normalizedUrls,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    // 200 = OK, 202 = Accepted
    const success = res.status === 200 || res.status === 202;
    let message = "URLs submitted to IndexNow successfully.";

    if (res.status === 202) {
      message = "URLs accepted by IndexNow and queued for indexing.";
    } else if (!success) {
      message = `IndexNow returned status ${res.status}: ${res.statusText}`;
    }

    return {
      success,
      status: res.status,
      message,
      count: normalizedUrls.length,
      urls: normalizedUrls,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Network error pinging IndexNow",
      count: normalizedUrls.length,
      urls: normalizedUrls,
    };
  }
}
