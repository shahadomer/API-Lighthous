import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ApiListing } from "@/lib/api-catalog";

export function ApiCard({
  api,
  showSampleBadge = true,
}: {
  api: ApiListing;
  showSampleBadge?: boolean;
}) {
  const href = `/apis/${api.providerSlug}/${api.slug}`;

  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-highlight">
          {api.category}
        </p>
        {(showSampleBadge || api.isSampleData) && (
          <span className="rounded bg-secondary/80 px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            Sample data
          </span>
        )}
      </div>
      <h3 className="mt-2 text-lg font-semibold text-navy">
        <Link href={href} className="after:absolute after:inset-0 focus-visible:underline">
          {api.name}
        </Link>
      </h3>
      <p className="text-sm text-muted-foreground">by {api.provider}</p>
      <p className="mt-3 flex-1 text-sm text-foreground/80">{api.summary}</p>

      <dl className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <div>
          <dt className="sr-only">Pricing</dt>
          <dd className="font-medium text-navy">{api.priceLabel}</dd>
        </div>
        <div>
          <dt className="sr-only">Pricing model</dt>
          <dd className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
            {api.pricingModel}
          </dd>
        </div>
        {api.trial ? (
          <div>
            <dt className="sr-only">Trial</dt>
            <dd className="rounded-full bg-accent px-2.5 py-1 text-xs text-accent-foreground">
              Free trial
            </dd>
          </div>
        ) : null}
      </dl>

      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-highlight hover:underline"
      >
        View details
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
