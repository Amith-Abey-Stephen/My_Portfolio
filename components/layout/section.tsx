import { cn } from "@/lib/utils";
import { Container } from "./container";

/** A vertical section with generous whitespace (docs: whitespace is a feature). */
export function Section({
  children,
  className,
  id,
  container = true,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  container?: boolean;
}) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      {container ? <Container>{children}</Container> : children}
    </section>
  );
}
