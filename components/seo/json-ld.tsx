import { site, bio, education } from "@/content/site";
import { projects } from "@/content/projects";
import { capabilities } from "@/content/capabilities";
import { faqs } from "@/content/faq";
import type { Project } from "@/types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
const personId = `${siteUrl}/#person`;

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** The canonical entity for the whole site — a rich Person (docs 05: JSON-LD). */
export function PersonJsonLd() {
  const knowsAbout = [
    ...new Set([
      "Product engineering",
      "Full-stack development",
      "Frontend development",
      "IoT",
      "Embedded systems",
      "AI tools",
      "SaaS",
      "Community building",
      ...capabilities.flatMap((c) => c.items),
      ...projects.map((p) => p.title),
    ]),
  ];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": personId,
        name: site.author,
        alternateName: ["Amith", "Amith Stephen"],
        url: site.url,
        image: `${siteUrl}/portrait.png`,
        email: site.email,
        jobTitle: "Product Engineer",
        description: bio,
        nationality: "Indian",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Thiruvalla",
          addressRegion: "Kerala",
          addressCountry: "IN",
        },
        homeLocation: { "@type": "Place", name: site.location },
        worksFor: { "@type": "Organization", name: "FinalApps" },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: education.name,
          address: education.location,
        },
        affiliation: [
          {
            "@type": "Organization",
            name: "Inovus Labs IEDC",
            url: "https://inovuslabs.org",
          },
          { "@type": "Organization", 
            name: "μLearn Foundation",
            url: "https://mulearn.org",
           },
        ],
        hasOccupation: {
          "@type": "Occupation",
          name: "Product Engineer",
          occupationalCategory: "15-1252.00 Software Developers",
        },
        knowsAbout,
        knowsLanguage: ["English", "Malayalam"],
        sameAs: [
          site.socials.github,
          site.socials.linkedin,
          site.resumeUrl,
          site.blogUrl,
        ],
      }}
    />
  );
}

/** WebSite entity, tied to its author. */
export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: site.name,
        url: site.url,
        description: bio,
        inLanguage: "en",
        author: { "@id": personId },
        publisher: { "@id": personId },
      }}
    />
  );
}

/** ProfilePage wrapper — signals to engines this is a person's profile. */
export function ProfilePageJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: site.url,
        name: `${site.author} — Product Engineer`,
        mainEntity: { "@id": personId },
        about: { "@id": personId },
        inLanguage: "en",
      }}
    />
  );
}

/** The product catalogue as an ItemList of SoftwareApplications. */
export function ProductsJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `Products by ${site.author}`,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: projects.length,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "SoftwareApplication",
            name: p.title,
            description: p.summary,
            url: `${siteUrl}/work/${p.slug}`,
            applicationCategory: p.category,
            operatingSystem: p.category === "IoT" ? "IoT / ESP32" : "Web",
            datePublished: p.year,
            author: { "@id": personId },
            creator: { "@id": personId },
            keywords: p.stack.join(", "),
          },
        })),
      }}
    />
  );
}

/** FAQ — the primary structured signal for answer engines (AEO / AI SEO). */
export function FaqJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

/** A single product / case study, with breadcrumbs. */
export function ProjectJsonLd({ project }: { project: Project }) {
  const url = `${siteUrl}/work/${project.slug}`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "@id": `${url}#software`,
          name: project.title,
          description: project.caseStudy.problem
            ? `${project.summary} ${project.caseStudy.solution}`
            : project.summary,
          abstract: project.summary,
          url,
          applicationCategory: project.category,
          operatingSystem: project.category === "IoT" ? "IoT / ESP32" : "Web",
          datePublished: project.year,
          author: { "@id": personId },
          creator: { "@id": personId },
          keywords: project.stack.join(", "),
          about: project.caseStudy.problem,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/#work" },
          { name: project.title, path: `/work/${project.slug}` },
        ]}
      />
    </>
  );
}

/** Breadcrumbs for interior pages. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: `${siteUrl}${it.path}`,
        })),
      }}
    />
  );
}
