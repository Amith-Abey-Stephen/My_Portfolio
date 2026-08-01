import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[80vh] flex-col items-center justify-center py-32 text-center">
      <p className="font-heading text-7xl font-semibold text-elevated md:text-8xl">
        4<span className="text-burgundy-light">0</span>4
      </p>
      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        Looks like this page hasn&rsquo;t been built yet.
      </h1>
      <p className="mt-4 max-w-md text-secondary">
        The link may be old, or the page is still in the workshop. Let&rsquo;s
        get you back to solid ground.
      </p>
      <ButtonLink href="/" variant="primary" className="mt-9">
        <ArrowLeft className="h-4 w-4" /> Return home
      </ButtonLink>
    </Container>
  );
}
