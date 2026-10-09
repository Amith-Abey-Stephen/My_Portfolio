import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { BuyMeACoffee } from "@/components/ui/bmc-icon";

type Size = "sm" | "md";

const sizes: Record<Size, { link: string; cup: string }> = {
  sm: { link: "gap-2 px-3.5 py-1.5 text-xs", cup: "h-4 w-3" },
  md: { link: "gap-2.5 px-5 py-2.5 text-sm", cup: "h-5 w-[0.85rem]" },
};

/**
 * "Buy me a coffee" pill — the site's quiet outlined style, with the official
 * BMC cup giving it the brand cue. The cup tips slightly on hover.
 */
export function SupportButton({
  size = "md",
  label = "Buy me a coffee",
  location,
  className,
}: {
  size?: Size;
  label?: string;
  /** Where on the site this sits — reported with the analytics event. */
  location: string;
  className?: string;
}) {
  return (
    <a
      href={site.socials.coffee}
      target="_blank"
      rel="me noopener noreferrer"
      data-track="support_click"
      data-track-location={location}
      className={cn(
        "group inline-flex items-center rounded-full border border-border-strong bg-elevated font-medium text-foreground transition-[border-color,background-color,transform] duration-200 ease-out hover:border-[#FFDD00]/60 hover:bg-surface active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy",
        sizes[size].link,
        className,
      )}
    >
      <BuyMeACoffee
        className={cn(
          "shrink-0 origin-bottom transition-transform duration-300 ease-out group-hover:-rotate-12",
          sizes[size].cup,
        )}
      />
      <span>{label}</span>
      <ArrowUpRight className="h-3.5 w-3.5 text-muted transition-colors group-hover:text-foreground" />
    </a>
  );
}

/** End-of-content support panel: a short, unpushy ask plus the button. */
export function SupportCard({
  location,
  title = "Found this useful?",
  body = "Everything here is written and built in the open. If it helped you, a coffee keeps the writing, open-source work and side projects brewing.",
  className,
}: {
  location: string;
  title?: string;
  body?: string;
  className?: string;
}) {
  return (
    <aside
      aria-label="Support my work"
      className={cn(
        "relative mt-14 overflow-hidden rounded-card border border-border bg-surface/80 p-6 sm:p-8",
        className,
      )}
    >
      {/* Oversized ghost cup — decorative, sits behind the copy. */}
      <BuyMeACoffee
        mono
        className="pointer-events-none absolute -right-6 -bottom-10 h-48 w-auto rotate-12 text-foreground/[0.04] sm:h-56"
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-md">
          <p className="eyebrow mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-muted">
            <span className="h-2 w-2 rounded-[2px] bg-burgundy" aria-hidden />
            Support
          </p>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-secondary">{body}</p>
        </div>
        <SupportButton location={location} className="self-start sm:self-auto" />
      </div>
    </aside>
  );
}
