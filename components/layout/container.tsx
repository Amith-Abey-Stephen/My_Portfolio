import { cn } from "@/lib/utils";

/** Page container — max 1440px with responsive gutters (docs 02 layout). */
export function Container({
  children,
  className,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-[1440px] px-6 md:px-10", className)}
    >
      {children}
    </Component>
  );
}
