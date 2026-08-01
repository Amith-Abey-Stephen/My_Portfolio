/** Keyboard users can jump straight to content (docs: keyboard navigable). */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-input focus:bg-burgundy focus:px-4 focus:py-2 focus:text-sm focus:text-burgundy-foreground"
    >
      Skip to content
    </a>
  );
}
