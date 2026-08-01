import { site } from "@/content/site";
import { formatDate } from "@/lib/utils";
import { Monogram } from "@/components/brand/wordmark";

/** Author byline — monogram avatar + name + date. */
export function ArticleByline({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface">
        <Monogram className="text-lg" />
      </span>
      <div>
        <div className="text-sm font-medium text-foreground">{site.author}</div>
        <div className="font-mono text-xs text-muted">{formatDate(date)}</div>
      </div>
    </div>
  );
}
