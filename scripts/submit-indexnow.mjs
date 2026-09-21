#!/usr/bin/env node

/**
 * CLI script to submit all live portfolio URLs directly to IndexNow
 * Usage: npm run indexnow
 */

const KEY = "a3b8e91f0c2d4e5a8f7b6c5d4e3a2b1f";
const HOST = "www.amith.site";
const BASE_URL = `https://${HOST}`;

// Primary static routes
const staticRoutes = [
  "",
  "/work",
  "/about",
  "/story",
  "/resume",
  "/capabilities",
  "/now",
  "/contact",
  "/writing",
];

// Project case study slugs
const projectSlugs = [
  "spendway",
  "monson-sunny-portfolio",
  "thenavaneeth",
  "abhishekd-portfolio",
  "inovus-profiles",
  "syncbatch",
  "inomail",
  "mr-docgen",
  "airloo",
  "smart-fire-alert",
  "smart-irrigation",
];

async function run() {
  console.log("🚀 Preparing IndexNow URL submission for", HOST);

  const urlList = [
    ...staticRoutes.map((p) => `${BASE_URL}${p}`),
    ...projectSlugs.map((s) => `${BASE_URL}/work/${s}`),
  ];

  // Try to fetch latest blog articles from Ghost CMS if available
  try {
    const ghostUrl = process.env.GHOST_URL || "https://blog.inovuslabs.org";
    const ghostKey = process.env.GHOST_CONTENT_KEY;
    if (ghostKey) {
      const res = await fetch(
        `${ghostUrl}/ghost/api/content/posts/?key=${ghostKey}&limit=all&fields=slug`,
      );
      if (res.ok) {
        const data = await res.json();
        const postUrls = (data.posts || []).map(
          (p) => `${BASE_URL}/writing/${p.slug}`,
        );
        urlList.push(...postUrls);
      }
    }
  } catch (err) {
    // Graceful fallback to static list
  }

  console.log(`📡 Submitting ${urlList.length} URLs to IndexNow (Bing, Yandex, etc.)...`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `${BASE_URL}/${KEY}.txt`,
    urlList,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 200 || res.status === 202) {
      console.log(`✅ Success (${res.status})! ${urlList.length} URLs submitted and accepted.`);
      console.log("Search engines (Bing, Copilot, Yandex) have queued your pages for indexing.");
    } else {
      const text = await res.text();
      console.error(`⚠️ IndexNow responded with HTTP ${res.status}:`, text);
    }
  } catch (error) {
    console.error("❌ Failed to reach IndexNow API:", error.message);
  }
}

run();
