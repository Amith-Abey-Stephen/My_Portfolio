import { redirect } from "next/navigation";

// Capabilities now lives in the landing page's Capabilities section.
export default function CapabilitiesPage() {
  redirect("/#capabilities");
}
