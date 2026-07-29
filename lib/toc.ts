export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
    .replace(/^-|-$/g, "");
}

/**
 * Inject stable `id`s onto <h2>/<h3> in Ghost article HTML and return an
 * ordered table of contents. Regex-based — Ghost output is well-formed and
 * this runs server-side only.
 */
export function processArticleHtml(html: string): {
  html: string;
  toc: TocItem[];
} {
  const toc: TocItem[] = [];
  const used = new Set<string>();

  const out = html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, lvl: string, attrs: string, inner: string) => {
      const text = inner
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim();
      if (!text) return match;

      const base = slugify(text) || `section-${toc.length + 1}`;
      let id = base;
      let n = 2;
      while (used.has(id)) id = `${base}-${n++}`;
      used.add(id);

      toc.push({ id, text, level: Number(lvl) as 2 | 3 });

      const attrsWithoutId = attrs.replace(/\s*id="[^"]*"/i, "");
      return `<h${lvl}${attrsWithoutId} id="${id}">${inner}</h${lvl}>`;
    },
  );

  return { html: out, toc };
}
