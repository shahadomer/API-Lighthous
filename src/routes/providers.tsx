import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/providers")({
  head: () => ({
    meta: [
      { title: "For Providers — API Lighthouse" },
      {
        name: "description",
        content:
          "List, meter and monetize your API. Billing, keys and analytics handled for you.",
      },
      { property: "og:title", content: "For Providers — API Lighthouse" },
      {
        property: "og:description",
        content: "List, meter and monetize your API on API Lighthouse.",
      },
    ],
  }),
  component: ProvidersPage,
});

const benefits = [
  {
    title: "Launch in a day",
    body: "Import an OpenAPI spec and we generate docs, a sandbox and a pricing page.",
  },
  {
    title: "Metered billing",
    body: "Per-request, tiered or seat-based plans with invoicing and tax handled.",
  },
  {
    title: "Buyer-grade trust",
    body: "Public uptime history, changelogs and review moderation build confidence.",
  },
];

function ProvidersPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight text-navy">
          Turn your API into a product
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Distribution, billing and developer experience in one place — you keep shipping
          the endpoints.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {benefits.map((b) => (
            <section
              key={b.title}
              className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]"
            >
              <h2 className="text-lg font-semibold text-navy">{b.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-12">
          <Link to="/signup" search={{ intent: "provider" }}>
            <Button className="rounded-xl">Publish your API</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
