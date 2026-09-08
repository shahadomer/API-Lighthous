import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { AlertTriangle, Clock, Globe2, Terminal } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProviderIdentity } from "@/components/ProviderIdentity";
import { CodeExample } from "@/components/CodeExample";
import { PlanCard, type Plan } from "@/components/PlanCard";
import { Button } from "@/components/ui/button";
import { findListing } from "@/lib/api-catalog";

export const Route = createFileRoute("/apis/$provider/$api")({
  loader: ({ params }) => {
    const listing = findListing(params.provider, params.api);
    if (!listing) throw notFound();
    return { listing };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Unavailable — API Lighthouse" }, { name: "robots", content: "noindex" }],
      };
    }
    const { listing } = loaderData;
    const title = `${listing.name} by ${listing.provider} — API Lighthouse`;
    return {
      meta: [
        { title },
        { name: "description", content: listing.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: listing.summary },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ApiNotFound,
  component: ApiDetailPage,
});

const operations = [
  { method: "GET", path: "/v1/flights/{flightNumber}", description: "Live status for a single flight." },
  { method: "GET", path: "/v1/flights", description: "Search flights by route and date." },
  { method: "GET", path: "/v1/airports/{iata}/departures", description: "Departure board for an airport." },
  { method: "POST", path: "/v1/webhooks", description: "Subscribe to status change events." },
];

const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    billingPeriod: "Billed monthly",
    includedUnits: "1,000 requests / month",
    overage: "Requests blocked at limit",
    features: ["Sandbox key", "Flight status endpoint", "Community support"],
  },
  {
    name: "Pro",
    price: "$99",
    billingPeriod: "Billed monthly",
    includedUnits: "250,000 requests / month",
    overage: "$0.004 per extra request",
    features: ["All read endpoints", "Webhooks", "99.9% uptime target", "Email support"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    billingPeriod: "Billed annually",
    includedUnits: "Negotiated volume",
    overage: "Committed-use discounts",
    features: ["Dedicated capacity", "Custom SLA", "SSO and audit logs", "Named support engineer"],
  },
];

const jsSnippet = `const res = await fetch(
  "https://api.airdata.example/v1/flights/BA117",
  { headers: { Authorization: \`Bearer \${process.env.AIR_DATA_KEY}\` } }
);

const flight = await res.json();
console.log(flight.status, flight.estimatedArrival);`;

const pySnippet = `import os, requests

res = requests.get(
    "https://api.airdata.example/v1/flights/BA117",
    headers={"Authorization": f"Bearer {os.environ['AIR_DATA_KEY']}"},
)

flight = res.json()
print(flight["status"], flight["estimatedArrival"])`;

const jsonResponse = `{
  "flightNumber": "BA117",
  "carrier": "British Airways",
  "status": "in_air",
  "origin": { "iata": "LHR", "gate": "A12" },
  "destination": { "iata": "JFK", "gate": "7" },
  "scheduledArrival": "2026-09-06T17:45:00Z",
  "estimatedArrival": "2026-09-06T17:31:00Z",
  "updatedAt": "2026-09-06T15:02:11Z"
}`;

function ApiNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-3xl font-semibold text-navy">API not found</h1>
        <p className="mt-3 text-muted-foreground">
          This listing may have been unpublished. Browse the catalog to find another API.
        </p>
        <Link to="/apis" className="mt-8 inline-block">
          <Button className="rounded-xl">Back to catalog</Button>
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}

function ApiDetailPage() {
  const { listing } = Route.useLoaderData();
  const isAirline = listing.category === "Airline APIs";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/apis" className="hover:text-highlight hover:underline">
            Explore APIs
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-navy">{listing.name}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-highlight">
              {listing.category}
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-navy">
              {listing.name}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{listing.summary}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/signup">
                <Button className="rounded-xl">Subscribe</Button>
              </Link>
              <Link to="/developers">
                <Button variant="outline" className="rounded-xl">
                  Read the docs
                </Button>
              </Link>
            </div>

            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
                <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe2 className="size-4" aria-hidden="true" /> Coverage
                </dt>
                <dd className="mt-1 font-medium text-navy">
                  190+ countries, 4,800 airports
                </dd>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
                <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-4" aria-hidden="true" /> Freshness
                </dt>
                <dd className="mt-1 font-medium text-navy">Updated every 60 seconds</dd>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
                <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Terminal className="size-4" aria-hidden="true" /> Authentication
                </dt>
                <dd className="mt-1 font-medium text-navy">{listing.auth}</dd>
              </div>
            </dl>
          </div>

          <div className="space-y-4">
            <ProviderIdentity
              provider={listing.provider}
              tagline="Aviation data infrastructure for product teams."
              since="2019"
            />
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
              <h2 className="text-sm font-semibold text-navy">At a glance</h2>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Pricing model</dt>
                  <dd className="font-medium text-navy">{listing.pricingModel}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Starting price</dt>
                  <dd className="font-medium text-navy">{listing.priceLabel}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Trial</dt>
                  <dd className="font-medium text-navy">
                    {listing.trial ? "Free trial available" : "No trial"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {isAirline ? (
          <section
            aria-labelledby="airline-notice"
            className="mt-12 flex gap-3 rounded-2xl border border-highlight/30 bg-highlight/5 p-5"
          >
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-highlight" aria-hidden="true" />
            <div>
              <h2 id="airline-notice" className="font-semibold text-navy">
                Flight data, not ticket booking
              </h2>
              <p className="mt-1 text-sm text-foreground/80">
                This API returns flight status and schedule information only. It cannot search
                fares, hold inventory, issue tickets, or take payment. Booking and ticketing
                require a separate reservation system agreement with the airline or a GDS.
              </p>
            </div>
          </section>
        ) : null}

        <section aria-labelledby="operations" className="mt-12">
          <h2 id="operations" className="text-2xl font-semibold text-navy">
            Supported operations
          </h2>
          <ul className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)]">
            {operations.map((op) => (
              <li key={op.path} className="flex flex-wrap items-center gap-3 p-4">
                <span className="rounded-md bg-navy px-2 py-1 font-mono text-xs text-navy-foreground">
                  {op.method}
                </span>
                <code className="font-mono text-sm text-navy">{op.path}</code>
                <span className="text-sm text-muted-foreground">{op.description}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="code" className="mt-12">
          <h2 id="code" className="text-2xl font-semibold text-navy">
            Try a request
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sample data shown for illustration.
          </p>
          <div className="mt-5">
            <CodeExample javascript={jsSnippet} python={pySnippet} response={jsonResponse} />
          </div>
        </section>

        <section aria-labelledby="pricing" className="mt-12">
          <h2 id="pricing" className="text-2xl font-semibold text-navy">
            Pricing plans
          </h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
