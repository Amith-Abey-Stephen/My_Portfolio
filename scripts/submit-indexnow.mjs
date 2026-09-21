#!/usr/bin/env node

/**
 * CLI script to submit all live portfolio URLs directly to IndexNow
 * Usage: npm run indexnow
 */

const KEY = "a3b8e91f0c2d4e5a8f7b6c5d4e3a2b1f";
// Submit for apex domain (canonical on Vercel) and www subdomain
const HOSTS = ["amith.site", "www.amith.site"];

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

async function submitForHost(host) {
  const baseUrl = `https://${host}`;
  console.log(`\n🚀 Preparing IndexNow URL submission for ${host}...`);

  const urlList = [
    ...staticRoutes.map((p) => `${baseUrl}${p}`),
    ...projectSlugs.map((s) => `${baseUrl}/work/${s}`),
  ];

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
          (p) => `${baseUrl}/writing/${p.slug}`,
        );
        urlList.push(...postUrls);
      }
    }
  } catch (err) {
    // Graceful fallback to static list
  }

  console.log(`📡 Submitting ${urlList.length} URLs to IndexNow for ${host}...`);

  const payload = {
    host,
    key: KEY,
    keyLocation: `https://amith.site/${KEY}.txt`,
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
      console.log(`✅ Success (${res.status})! ${urlList.length} URLs submitted and accepted for ${host}.`);
    } else {
      const text = await res.text();
      console.error(`⚠️ IndexNow responded with HTTP ${res.status} for ${host}:`, text);
    }
  } catch (error) {
    console.error(`❌ Failed to reach IndexNow API for ${host}:`, error.message);
  }
}

async function run() {
  for (const host of HOSTS) {
    await submitForHost(host);
  }
  console.log("\nSearch engines (Bing, Copilot, Yandex) have queued your pages for indexing.");
}

run();
