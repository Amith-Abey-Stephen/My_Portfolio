import { site, bio, education } from "@/content/site";
import { projects } from "@/content/projects";
import { capabilities } from "@/content/capabilities";
import { faqs } from "@/content/faq";
import type { Project, Post } from "@/types";

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
          "@type": ["SoftwareApplication", "CreativeWork"],
          "@id": `${url}#software`,
          name: project.title,
          headline: project.title,
          description: project.caseStudy.problem
            ? `${project.summary} ${project.caseStudy.solution}`
            : project.summary,
          abstract: project.summary,
          url,
          image: `${siteUrl}/work/${project.slug}/opengraph-image`,
          screenshot: `${siteUrl}/work/${project.slug}/opengraph-image`,
          applicationCategory: project.category,
          operatingSystem: project.category === "IoT" ? "IoT / ESP32" : "Web / Cross-Platform",
          datePublished: project.year,
          author: { "@id": personId },
          creator: { "@id": personId },
          publisher: { "@id": personId },
          keywords: project.stack.join(", "),
          programmingLanguage: project.stack,
          about: project.caseStudy.problem,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          ...(project.link
            ? {
                sameAs: [project.link],
                isRelatedTo: {
                  "@type": "WebSite",
                  name: project.title,
                  url: project.link,
                },
              }
            : {}),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Works", path: "/works" },
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

/** CollectionPage JSON-LD for the /work & /works project catalogue. */
export function CollectionPageJsonLd() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${siteUrl}/works#collection`,
          url: `${siteUrl}/works`,
          name: `Works & Engineering Products by ${site.author}`,
          description:
            "Complete catalog of software products, client platforms, offline mobile applications, and IoT systems engineered by Amith Abey Stephen.",
          isPartOf: { "@id": `${siteUrl}/#website` },
          author: { "@id": personId },
          creator: { "@id": personId },
          about: { "@id": personId },
          inLanguage: "en",
          mainEntity: {
            "@type": "ItemList",
            name: `All Works by ${site.author}`,
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
                operatingSystem: p.category === "IoT" ? "IoT / ESP32" : "Web / Cross-Platform",
                datePublished: p.year,
                keywords: p.stack.join(", "),
              },
            })),
          },
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Works", path: "/works" },
        ]}
      />
    </>
  );
}

/** AboutPage JSON-LD for /about */
export function AboutPageJsonLd() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": `${siteUrl}/about#webpage`,
          url: `${siteUrl}/about`,
          name: `About ${site.author} — Product Engineer & Systems Architect`,
          description: bio,
          isPartOf: { "@id": `${siteUrl}/#website` },
          mainEntity: { "@id": personId },
          inLanguage: "en",
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
    </>
  );
}

/** ProfilePage JSON-LD for /resume */
export function ResumePageJsonLd() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${siteUrl}/resume#webpage`,
          url: `${siteUrl}/resume`,
          name: `Interactive Track Record & Resume — ${site.author}`,
          description: `Interactive career timeline, leadership roles, education, and technical capabilities of ${site.author}.`,
          isPartOf: { "@id": `${siteUrl}/#website` },
          mainEntity: { "@id": personId },
          inLanguage: "en",
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Resume", path: "/resume" },
        ]}
      />
    </>
  );
}

/** Story Page JSON-LD for /story */
export function StoryPageJsonLd() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemPage",
          "@id": `${siteUrl}/story#webpage`,
          url: `${siteUrl}/story`,
          name: `The Story of ${site.author} — How I Got Here`,
          description:
            "The moments that turned a curious kid taking things apart into a builder shipping products.",
          isPartOf: { "@id": `${siteUrl}/#website` },
          mainEntity: { "@id": personId },
          inLanguage: "en",
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Story", path: "/story" },
        ]}
      />
    </>
  );
}

/** TechArticle / BlogPosting JSON-LD for /writing/[slug] */
export function ArticleJsonLd({ post }: { post: Post }) {
  const url = `${siteUrl}/writing/${post.slug}`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": ["TechArticle", "BlogPosting"],
          "@id": `${url}#article`,
          url,
          headline: post.title,
          description: post.excerpt,
          abstract: post.excerpt,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt || post.publishedAt,
          author: { "@id": personId },
          publisher: { "@id": personId },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
          },
          keywords: post.tags.map((t) => t.name).join(", "),
          articleSection: post.primaryTag?.name || "Technology",
          isBasedOn: post.url,
          isPartOf: {
            "@type": "Blog",
            "@id": `${siteUrl}/writing#blog`,
            name: `${site.author} — Writing`,
            url: `${siteUrl}/writing`,
          },
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Writing", path: "/writing" },
          { name: post.title, path: `/writing/${post.slug}` },
        ]}
      />
    </>
  );
}

/** Blog CollectionPage JSON-LD for /writing */
export function BlogJsonLd({ posts }: { posts: Post[] }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${siteUrl}/writing#blog`,
          url: `${siteUrl}/writing`,
          name: `Writing & Technical Notes by ${site.author}`,
          description:
            "Notes from the build: reflections on product engineering, systems architecture, lessons, and the messy middle of building.",
          author: { "@id": personId },
          publisher: { "@id": personId },
          blogPost: posts.slice(0, 30).map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            description: p.excerpt,
            url: `${siteUrl}/writing/${p.slug}`,
            datePublished: p.publishedAt,
            keywords: p.tags.map((t) => t.name).join(", "),
          })),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Writing", path: "/writing" },
        ]}
      />
    </>
  );
}
