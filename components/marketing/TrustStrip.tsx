import * as React from "react";

/**
 * Section 2 — Trust strip
 * Four short factual statements, strictly avoiding unconfirmed business claims
 * (no unconfirmed 15% commission or free-tier terms per Section 18).
 * Quiet, single line, --color-on-surface-muted.
 */
export function TrustStrip() {
  const statements = [
    "Built in Jeddah",
    "Framework agnostic",
    "OpenAPI native",
    "TypeScript-first",
  ];

  return (
    <section
      aria-label="Platform facts"
      className="py-6 px-4 border-b border-border/60 bg-surface text-center"
    >
      <div className="mx-auto max-w-5xl flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {statements.map((stmt, idx) => (
          <React.Fragment key={stmt}>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary/40" aria-hidden="true" />
              <span>{stmt}</span>
            </span>
            {idx < statements.length - 1 && (
              <span className="hidden sm:inline text-border" aria-hidden="true">
                ·
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
