import { redirect } from "next/navigation";
import { getPost, getPosts } from "@/lib/api";
import { site } from "@/content/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (post?.url) {
    redirect(post.url);
  } else {
    redirect(site.blogUrl);
  }
}
