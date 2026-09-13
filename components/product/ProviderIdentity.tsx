import { BadgeCheck } from "lucide-react";

type Props = {
  provider: string;
  tagline: string;
  since: string;
  verified?: boolean;
};

export function ProviderIdentity({ provider, tagline, since, verified = true }: Props) {
  const initials = provider
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
      <div
        aria-hidden="true"
        className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy text-sm font-semibold text-navy-foreground"
      >
        {initials}
      </div>
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 font-semibold text-navy">
          {provider}
          {verified ? (
            <>
              <BadgeCheck className="size-4 text-highlight" aria-hidden="true" />
              <span className="sr-only">Verified provider</span>
            </>
          ) : null}
        </p>
        <p className="text-sm text-muted-foreground">{tagline}</p>
        <p className="text-xs text-muted-foreground">Publishing since {since}</p>
      </div>
    </div>
  );
}
