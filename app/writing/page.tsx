import { redirect } from "next/navigation";

// The writing index now lives in the landing page's Writing section.
export default function WritingPage() {
  redirect("/#writing");
}
