import { getUses } from "@/lib/api";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

export const metadata = pageMetadata({
  title: "Uses",
  description:
    "The hardware, software, and gear Amith reaches for — a living /uses page.",
  path: "/uses",
});

export default function UsesPage() {
  const uses = getUses();

  return (
    <>
      <PageHeader
        eyebrow="Uses"
        title="The tools I reach for."
        lede="Deliberately small. I'd rather know a few things well than collect everything."
      />

      <Container className="pb-28">
        <RevealGroup className="grid gap-6 md:grid-cols-2">
          {uses.map((group) => {
            const Icon = group.icon;
            return (
              <RevealItem key={group.title}>
                <div className="h-full rounded-card border border-border bg-surface p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-input border border-border bg-elevated text-burgundy-soft">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <h2 className="text-lg font-semibold text-foreground">
                      {group.title}
                    </h2>
                  </div>
                  <ul className="mt-6 divide-y divide-border">
                    {group.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex flex-col gap-0.5 py-3.5 first:pt-0 last:pb-0"
                      >
                        <span className="font-medium text-foreground">
                          {item.name}
                        </span>
                        {item.note && (
                          <span className="text-sm text-muted">{item.note}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </>
  );
}
