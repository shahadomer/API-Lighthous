import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ApiCard } from "@/components/product/ApiCard";
import type { ApiListing } from "@/lib/api-catalog";

/**
 * Section 5: Featured APIs
 * 3x2 grid of 6 featured ApiCards populated from DEV-06 fixtures
 * (Northwind Aviation, Meridian Data, Halcyon SMS, Beacon Weather, Ledger Labs, Orbit Telemetry).
 * All data carries the visible sample data marker per Section 6.4.
 * No "Sponsored" labels per ticket prompt.
 */
const FEATURED_APIS: ApiListing[] = [
  {
    slug: "flight-status",
    providerSlug: "northwind-aviation",
    name: "Northwind Flight Status",
    provider: "Northwind Aviation",
    summary:
      "Live departure, arrival, gate changes, and en-route radar coordinates for global commercial flights.",
    category: "Airline APIs",
    pricingModel: "Paid",
    priceLabel: "From $79 / mo",
    trial: true,
    auth: "Bearer token",
    isSampleData: true,
  },
  {
    slug: "company-registry",
    providerSlug: "meridian-data",
    name: "Meridian Corporate Registry",
    provider: "Meridian Data",
    summary:
      "Resolve registered companies, trade licenses, officer rosters, and legal entity identifiers.",
    category: "Business Data",
    pricingModel: "Paid",
    priceLabel: "From $120 / mo",
    trial: true,
    auth: "API key",
    isSampleData: true,
  },
  {
    slug: "sms-dispatch",
    providerSlug: "halcyon-sms",
    name: "Halcyon SMS Dispatch",
    provider: "Halcyon SMS",
    summary:
      "High-throughput transactional SMS delivery with carrier DLRs and smart route failover.",
    category: "Communications",
    pricingModel: "Pay-per-request",
    priceLabel: "$0.0075 / msg",
    trial: true,
    auth: "API key",
    isSampleData: true,
  },
  {
    slug: "radar-precipitation",
    providerSlug: "beacon-weather",
    name: "Beacon Global Radar",
    provider: "Beacon Weather Systems",
    summary:
      "High-resolution weather radar tiles, precipitation accumulation, and severe storm alerts.",
    category: "Geo & Mapping",
    pricingModel: "Paid",
    priceLabel: "From $89 / mo",
    trial: true,
    auth: "API key",
    isSampleData: true,
  },
  {
    slug: "vat-validation",
    providerSlug: "ledger-labs",
    name: "Ledger Tax & VAT Validation",
    provider: "Ledger Labs",
    summary:
      "Real-time verification of European VAT, UK HMRC, and global indirect tax identifiers.",
    category: "Business Data",
    pricingModel: "Paid",
    priceLabel: "From $45 / mo",
    trial: true,
    auth: "API key",
    isSampleData: true,
  },
  {
    slug: "device-stream",
    providerSlug: "orbit-telemetry",
    name: "Orbit Device Telemetry",
    provider: "Orbit Telemetry",
    summary:
      "High-frequency time-series sensor ingestion and anomaly event triggers for embedded devices.",
    category: "Developer Tools",
    pricingModel: "Paid",
    priceLabel: "From $140 / mo",
    trial: true,
    auth: "Bearer token",
    isSampleData: true,
  },
];

export function FeaturedApisSection() {
  return (
    <section
      id="featured-apis"
      aria-labelledby="featured-heading"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border/40"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-interactive">
              Curated Catalog
            </span>
            <span className="rounded bg-muted px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Sample data
            </span>
          </div>
          <h2
            id="featured-heading"
            className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground"
          >
            Featured APIs
          </h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
            Production-grade services with OpenAPI schemas, verified telemetry, and transparent
            pricing structures.
          </p>
        </div>

        <Link
          href="/apis"
          className="inline-flex items-center gap-1 text-sm font-semibold text-interactive hover:underline shrink-0"
        >
          <span>Explore all APIs</span>
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      {/* 3x2 Grid of 6 ApiCards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURED_APIS.map((api) => (
          <ApiCard key={`${api.providerSlug}/${api.slug}`} api={api} />
        ))}
      </div>
    </section>
  );
}
