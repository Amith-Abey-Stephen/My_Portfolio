import { redirect } from "next/navigation";
import { site } from "@/content/site";

export default function WritingPage() {
  redirect(site.blogUrl);
}
