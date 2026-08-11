import { redirect } from "next/navigation";
import { site } from "@/content/site";
import { getTags } from "@/lib/api";

export const revalidate = 3600;

export async function generateStaticParams() {
  const tags = await getTags();
  return tags.map((t) => ({ slug: t.slug }));
}

export default function TagPage() {
  redirect(site.blogUrl);
}
