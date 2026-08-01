import { redirect } from "next/navigation";

// Contact now lives in the landing page's Contact section.
export default function ContactPage() {
  redirect("/#contact");
}
