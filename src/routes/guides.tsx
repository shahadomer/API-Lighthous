import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: [
      { title: "Resources & Guides — API Lighthouse" },
      {
        name: "description",
        content:
          "Guides on API pricing, versioning, rate limits and going to market as a provider.",
      },
      { property: "og:title", content: "Resources & Guides — API Lighthouse" },
      {
        property: "og:description",
        content: "Guides on API pricing, versioning, rate limits and go-to-market.",
      },
    ],
  }),
  component: GuidesPage,
});

const guides = [
  { title: "Pricing your API", minutes: "8 min", body: "Choosing between per-call, tiered and hybrid models." },
  { title: "Versioning without breaking", minutes: "6 min", body: "Deprecation windows customers actually respect." },
  { title: "Rate limits that scale", minutes: "5 min", body: "Token buckets, burst allowances and fair-use design." },
  { title: "Writing docs devs finish", minutes: "7 min", body: "Quickstarts, copy-ready snippets and error tables." },
];

function GuidesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight text-navy">Resources</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Practical guides for teams building and selling APIs.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {guides.map((g) => (
            <article
              key={g.title}
              className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-highlight">
                {g.minutes} read
              </p>
              <h2 className="mt-2 text-lg font-semibold text-navy">{g.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{g.body}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
