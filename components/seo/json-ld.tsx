import { site } from "@/content/site";

/** Person structured data (docs 04/05: JSON-LD). */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.author,
    alternateName: "Amith",
    url: site.url,
    email: site.email,
    jobTitle: "Builder — Product & IoT Engineer",
    description:
      "A builder who loves solving real problems and turning ideas into products.",
    homeLocation: {
      "@type": "Place",
      name: site.location,
    },
    sameAs: [site.socials.github, site.socials.linkedin],
    knowsAbout: [
      "Product engineering",
      "Full-stack development",
      "IoT",
      "Community building",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** WebSite structured data with search-action-free sitelinks hint. */
export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    author: { "@type": "Person", name: site.author },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
