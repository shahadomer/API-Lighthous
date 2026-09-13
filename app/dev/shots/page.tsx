import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  Terminal,
  Zap,
  Globe,
  Lock,
  ExternalLink,
  ShieldCheck,
  Server,
  ArrowRight,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Chip } from "@/components/ui/chip";
import { StatusPill } from "@/components/stubs/StatusPill";
import { DashboardShell, type DashboardListing } from "@/components/stubs/DashboardShell";
import { EndpointList } from "@/components/stubs/EndpointList";
import { ResponsePreview } from "@/components/stubs/ResponsePreview";
import { ApiFactsTable } from "@/components/stubs/ApiFactsTable";
import { PlanCard } from "@/components/product/PlanCard";
import { apiListings } from "@/lib/api-catalog";
import { fixtureProviders } from "@/content/fixtures/sample-catalog";

interface PageProps {
  searchParams: Promise<{ shot?: string }>;
}

export default async function DevShotsPage({ searchParams }: PageProps) {
  // Production security: exclude dev shots route from public production builds unless explicitly enabled
  if (process.env.NODE_ENV === "production" && process.env.ENABLE_DEV_SHOTS !== "true") {
    notFound();
  }

  const { shot } = await searchParams;

  // Sample data banner component required on every composition per Section 6.4
  const SampleDataMarker = () => (
    <div className="flex items-center justify-between border-b border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-mono font-medium text-amber-700 dark:text-amber-300">
      <span className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
        SAMPLE DATA · FICTIONAL ENTRIES FOR SCREENSHOT COMPOSITION
      </span>
      <span>API LIGHTHOUSE §6.4</span>
    </div>
  );

  // 1. HERO CATALOG: 1280px wide, 12 sample API cards, filter rail on left, search with "flight status"
  if (shot === "hero-catalog") {
    const twelveApis = [
      ...apiListings.slice(0, 10),
      {
        slug: "radar-precipitation",
        providerSlug: "beacon-weather",
        name: "Global Weather Radar",
        provider: "Beacon Weather",
        summary: "High-resolution Doppler radar imagery tiles and precipitation tracking.",
        category: "Maps & Location",
        pricingModel: "Paid" as const,
        priceLabel: "From $89 / month",
        trial: true,
        auth: "API key" as const,
      },
      {
        slug: "device-stream",
        providerSlug: "orbit-telemetry",
        name: "Device Sensor Stream",
        provider: "Orbit Telemetry",
        summary: "Ingest and aggregate high-frequency telemetry from edge sensor devices.",
        category: "Developer Tools",
        pricingModel: "Free" as const,
        priceLabel: "Free up to 10k / month",
        trial: true,
        auth: "Bearer token" as const,
      },
    ];

    return (
      <div
        id="shot-canvas"
        className="w-[1280px] bg-background text-foreground overflow-hidden font-sans"
      >
        <SampleDataMarker />
        <div className="p-8 space-y-6">
          {/* Header & Search Bar */}
          <div className="flex items-center justify-between gap-6 border-b border-border pb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">API Directory</h1>
              <p className="text-sm text-muted-foreground">
                Showing 12 verified services across airline, data, and communication categories
              </p>
            </div>
            <div className="relative w-[480px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                defaultValue="flight status"
                className="h-11 pl-10 pr-4 text-sm font-medium rounded-xl border-border bg-surface"
                readOnly
              />
            </div>
          </div>

          {/* Main Layout: Filter Rail + 12 Cards Grid */}
          <div className="flex gap-8">
            {/* Left Filter Rail */}
            <aside className="w-64 shrink-0 space-y-6 rounded-2xl border border-border bg-surface/50 p-5">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Filter className="size-3.5" /> Filters
                </span>
                <span className="text-xs text-interactive font-medium">Reset</span>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold text-foreground">Categories</p>
                <div className="space-y-1.5">
                  {[
                    { label: "Airline APIs (4)", active: true },
                    { label: "Business Data (6)", active: false },
                    { label: "Communications (5)", active: false },
                    { label: "Financial Data (4)", active: false },
                    { label: "Developer Tools (3)", active: false },
                  ].map((cat) => (
                    <div
                      key={cat.label}
                      className={`text-xs px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                        cat.active
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      <span>{cat.label}</span>
                      {cat.active && <CheckCircle2 className="size-3 text-primary" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-border">
                <p className="text-xs font-semibold text-foreground">Pricing Model</p>
                <div className="flex flex-wrap gap-1.5">
                  <Chip variant="filter" selected={true}>
                    All
                  </Chip>
                  <Chip variant="filter" selected={false}>
                    Free tier
                  </Chip>
                  <Chip variant="filter" selected={false}>
                    Pay per req
                  </Chip>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-border">
                <p className="text-xs font-semibold text-foreground">Authentication</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded text-primary"
                      readOnly
                    />
                    Bearer Token
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded text-primary"
                      readOnly
                    />
                    API Key
                  </label>
                </div>
              </div>
            </aside>

            {/* 12 Cards Grid */}
            <div className="flex-1 grid grid-cols-3 gap-4">
              {twelveApis.map((api) => (
                <div
                  key={api.name}
                  className="rounded-xl border border-border bg-surface p-4 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-interactive">
                        {api.category}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                        {api.auth}
                      </span>
                    </div>
                    <h3 className="mt-2 text-sm font-bold text-foreground">{api.name}</h3>
                    <p className="text-xs text-muted-foreground">by {api.provider}</p>
                    <p className="mt-2 text-xs text-foreground/80 line-clamp-2">{api.summary}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">{api.priceLabel}</span>
                    <span className="text-interactive font-medium flex items-center gap-0.5">
                      Explore →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. HERO DETAIL: API detail composition with endpoint list and JSON response panel
  if (shot === "hero-detail") {
    const endpoints = [
      {
        id: "1",
        method: "GET" as const,
        path: "/v1/flights/{flight_iata}",
        summary: "Real-time positional radar telemetry, altitude, and gate estimate",
        active: true,
      },
      {
        id: "2",
        method: "GET" as const,
        path: "/v1/airports/{iata}/departures",
        summary: "Scheduled passenger departures with gate changes",
        active: false,
      },
      {
        id: "3",
        method: "POST" as const,
        path: "/v1/webhooks/gate-delay",
        summary: "Subscribe to instant push notifications for route delay events",
        active: false,
      },
      {
        id: "4",
        method: "GET" as const,
        path: "/v1/routes/{origin}/{destination}",
        summary: "Carrier distribution and daily frequency analysis",
        active: false,
      },
    ];

    const sampleResponse = {
      flight: {
        iata: "NW412",
        icao: "NWA412",
        carrier: "Northwind Aviation",
        route: {
          origin: "LHR",
          destination: "JFK",
          distance_nm: 3451,
        },
        telemetry: {
          status: "active",
          altitude_ft: 34000,
          ground_speed_kts: 468,
          coordinates: { lat: 51.47, lon: -0.454 },
          heading_deg: 268,
        },
        arrival: {
          terminal: "4",
          gate: "B22",
          scheduled_utc: "2026-09-13T21:30:00Z",
          estimated_utc: "2026-09-13T21:38:00Z",
          delay_minutes: 8,
        },
      },
      meta: {
        query_time_ms: 54,
        cache_status: "MISS",
        data_source: "Sample Aviation Radar Feed",
      },
    };

    return (
      <div
        id="shot-canvas"
        className="w-[1280px] bg-background text-foreground overflow-hidden font-sans"
      >
        <SampleDataMarker />
        <div className="p-8 space-y-6">
          {/* Top API Header */}
          <div className="flex items-start justify-between border-b border-border pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
                  NW
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-foreground">Northwind Flight Status</h1>
                    <Badge variant="success">Production Verified</Badge>
                    <span className="text-xs font-mono text-muted-foreground">v1.2.0</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    by Northwind Aviation · Airline APIs
                  </p>
                </div>
              </div>
              <p className="text-sm text-foreground/80 max-w-3xl">
                Global departure, arrival, and gate changes across 850 international airlines with
                sub-450ms telemetry.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                Documentation
              </Button>
              <Button variant="filled" size="sm">
                Get API Key
              </Button>
            </div>
          </div>

          {/* Operational Facts Grid */}
          <ApiFactsTable
            authType="Bearer token (JWT)"
            baseUrl="https://api.northwind.example.com/v1"
            openapiUrl="https://api.northwind.example.com/openapi.json"
            latencyP95="420ms"
            updateCadence="5 seconds"
          />

          {/* Split View: Endpoints on Left, JSON on Right */}
          <div className="grid grid-cols-5 gap-6">
            <div className="col-span-2 space-y-4">
              <EndpointList endpoints={endpoints} />
            </div>
            <div className="col-span-3">
              <ResponsePreview status={200} statusText="OK" latencyMs={54} data={sampleResponse} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. HERO DASHBOARD: Provider dashboard with three listings (Published, In review, Draft)
  if (shot === "hero-dashboard") {
    const dashboardListings: DashboardListing[] = [
      {
        id: "1",
        name: "Northwind Flight Status",
        version: "v1.2.0",
        status: "published",
        category: "Airline APIs",
        monthlyCalls: "1,420,800",
        latencyP95: "420ms",
        lastUpdated: "2 hours ago",
      },
      {
        id: "2",
        name: "Northwind Crew Scheduling",
        version: "v2.0.0-rc1",
        status: "in_review",
        category: "Aviation Operations",
        monthlyCalls: "— (Pre-release)",
        latencyP95: "380ms",
        lastUpdated: "Yesterday",
      },
      {
        id: "3",
        name: "Northwind Baggage Radar",
        version: "v0.9.0",
        status: "draft",
        category: "Logistics & Cargo",
        monthlyCalls: "— (Draft)",
        latencyP95: "—",
        lastUpdated: "3 days ago",
      },
    ];

    return (
      <div
        id="shot-canvas"
        className="w-[1280px] bg-background text-foreground overflow-hidden font-sans p-6"
      >
        <SampleDataMarker />
        <div className="h-[740px]">
          <DashboardShell organizationName="Northwind Aviation" listings={dashboardListings} />
        </div>
      </div>
    );
  }

  // 4. DOOR MARKETPLACE: Catalog with an open pricing plan panel
  if (shot === "door-marketplace") {
    const plansData = [
      {
        name: "Free Sandbox",
        price: "$0",
        billingPeriod: "Free forever",
        includedUnits: "1,000 reqs / mo",
        overage: "Hard cap at 1k",
        features: ["Standard SLA", "Sandbox API key", "Community support"],
        highlighted: false,
      },
      {
        name: "Pro Developer",
        price: "$79",
        billingPeriod: "per month",
        includedUnits: "25,000 reqs / mo",
        overage: "$0.0035 / extra req",
        features: [
          "99.9% Uptime SLA",
          "Live webhooks",
          "Email ticket support",
          "Unlimited rate bursts",
        ],
        highlighted: true,
      },
      {
        name: "Enterprise Fleet",
        price: "Custom",
        billingPeriod: "tailored billing",
        includedUnits: "1,000,000+ reqs",
        overage: "Custom SLA overage",
        features: ["Dedicated edge proxy", "24/7 pager on-call", "Custom billing agreement"],
        highlighted: false,
      },
    ];

    return (
      <div
        id="shot-canvas"
        className="w-[800px] bg-background text-foreground overflow-hidden font-sans p-6"
      >
        <SampleDataMarker />
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-interactive">
                Pricing & Subscription Tiers
              </span>
              <h2 className="text-xl font-bold text-foreground">Northwind Flight Status</h2>
            </div>
            <Badge variant="neutral">Verified Tier Pricing</Badge>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {plansData.map((p) => (
              <PlanCard key={p.name} plan={p} />
            ))}
          </div>

          <div className="border-t border-border pt-3 text-xs text-muted-foreground flex justify-between">
            <span>No long-term contracts · Instant API key generation</span>
            <span className="text-interactive font-medium">View full comparison table →</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. DOOR HOST: Terminal beside a deploy status panel showing build, deploy, live
  if (shot === "door-host") {
    return (
      <div
        id="shot-canvas"
        className="w-[800px] bg-background text-foreground overflow-hidden font-sans p-6"
      >
        <SampleDataMarker />
        <div className="grid grid-cols-2 gap-4 h-[440px]">
          {/* Terminal View */}
          <div className="rounded-2xl border border-border bg-surface-inverse text-on-surface-inverse p-5 font-mono text-xs shadow-xl flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 pb-3 border-b border-on-surface-inverse/10 text-on-surface-inverse/60">
                <span className="size-2.5 rounded-full bg-rose-500/80" />
                <span className="size-2.5 rounded-full bg-amber-500/80" />
                <span className="size-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-[11px]">apilh-cli — bash — 80x24</span>
              </div>
              <p className="text-emerald-400">$ apilh host deploy --framework nextjs</p>
              <p className="text-on-surface-inverse/80">⠋ Analyzing route handlers...</p>
              <p className="text-on-surface-inverse/80">✓ Compiled 14 endpoints (FastAPI engine)</p>
              <p className="text-on-surface-inverse/80">✓ Generated OpenAPI 3.1.0 specification</p>
              <p className="text-on-surface-inverse/80">
                ⠙ Packaging container image: nw-flight-telemetry:v1.2
              </p>
              <p className="text-on-surface-inverse/80">
                ✓ Edge bundle size: 18.4 MB (Alpine base)
              </p>
              <p className="text-emerald-400">✓ Deployed to 34 edge regions worldwide</p>
              <p className="text-on-surface-inverse/90 font-bold">
                🔗 https://nw-flights.apilh.app
              </p>
            </div>
            <div className="pt-3 border-t border-on-surface-inverse/10 text-[11px] text-on-surface-inverse/50">
              Process exited with code 0 (21.4s)
            </div>
          </div>

          {/* Deployment Status Stepper */}
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="text-sm font-bold text-foreground">Deployment Pipeline</h3>
                  <p className="text-xs text-muted-foreground">Commit 73d25c5 · production</p>
                </div>
                <Badge variant="success">Active Live</Badge>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  {
                    title: "Build & Typecheck",
                    desc: "Next.js 15 route tree verified",
                    time: "14.2s",
                    status: "completed",
                  },
                  {
                    title: "Container Packaging",
                    desc: "Minimal Alpine container image",
                    time: "5.1s",
                    status: "completed",
                  },
                  {
                    title: "Global Edge Deploy",
                    desc: "Propagated to all global edge locations",
                    time: "2.1s",
                    status: "completed",
                  },
                ].map((step, idx) => (
                  <div key={step.title} className="flex items-start gap-3">
                    <div className="size-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground">{step.title}</span>
                        <span className="text-[11px] font-mono text-muted-foreground">
                          {step.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-secondary/60 p-3 text-xs space-y-1">
              <div className="flex justify-between text-muted-foreground">
                <span>Observed Latency (p95):</span>
                <span className="font-mono font-semibold text-foreground">12ms</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>SSL Certificate:</span>
                <span className="text-emerald-600 font-medium">Active (Auto-renewing)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 6. DOOR DIRECTORY: Directory list view with free and public badges
  if (shot === "door-directory") {
    const directoryItems = [
      {
        name: "Global Airport Schedules",
        provider: "Northwind Aviation",
        category: "Airline APIs",
        freeTier: "1,000 reqs/mo free",
        auth: "Bearer token",
        status: "99.98% uptime",
      },
      {
        name: "Corporate Registry Lookup",
        provider: "Meridian Data",
        category: "Business Data",
        freeTier: "250 queries free",
        auth: "API Key",
        status: "99.95% uptime",
      },
      {
        name: "Tax & VAT Validation Service",
        provider: "Ledger Labs",
        category: "Business Data",
        freeTier: "5,000 checks free",
        auth: "API Key",
        status: "100% uptime",
      },
      {
        name: "Global FX Exchange Rates",
        provider: "Meridian Data",
        category: "Financial Data",
        freeTier: "1,000 calls/day free",
        auth: "Public / No auth",
        status: "99.99% uptime",
      },
      {
        name: "Doppler Satellite Weather Tiles",
        provider: "Beacon Weather",
        category: "Geo & Mapping",
        freeTier: "5,000 tiles free",
        auth: "API Key",
        status: "99.92% uptime",
      },
    ];

    return (
      <div
        id="shot-canvas"
        className="w-[800px] bg-background text-foreground overflow-hidden font-sans p-6"
      >
        <SampleDataMarker />
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-interactive">
                Free & Open Directory
              </span>
              <h2 className="text-lg font-bold text-foreground">Public API Listings</h2>
            </div>
            <Badge variant="neutral">Curated & Tested</Badge>
          </div>

          <div className="divide-y divide-border">
            {directoryItems.map((item) => (
              <div key={item.name} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-foreground truncate">{item.name}</h4>
                    <Badge variant="success" className="text-[10px] py-0 px-1.5">
                      Free Tier
                    </Badge>
                    <Badge variant="neutral" className="text-[10px] py-0 px-1.5">
                      Public API
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    by {item.provider} · {item.category}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-semibold text-foreground">{item.freeTier}</p>
                  <p className="text-[11px] text-muted-foreground font-mono">{item.status}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-3 text-xs text-muted-foreground flex justify-between items-center">
            <span>Browse 450+ verified community entries</span>
            <span className="text-interactive font-medium">Explore full directory →</span>
          </div>
        </div>
      </div>
    );
  }

  // Default: Index of available shot compositions
  const shotsList = [
    {
      id: "hero-catalog",
      title: "Hero: Catalog Grid (1280px, 12 cards, filter rail)",
      group: "hero",
    },
    { id: "hero-detail", title: "Hero: API Detail (1280px, endpoints & response)", group: "hero" },
    {
      id: "hero-dashboard",
      title: "Hero: Provider Dashboard (1280px, 3 status pills)",
      group: "hero",
    },
    { id: "door-marketplace", title: "Door: Marketplace Plan Panel", group: "door" },
    { id: "door-host", title: "Door: Hosting Terminal & Deploy Stepper", group: "door" },
    { id: "door-directory", title: "Door: Free & Public Directory List", group: "door" },
  ];

  return (
    <main className="mx-auto max-w-4xl p-8 space-y-6">
      <SampleDataMarker />
      <div>
        <h1 className="text-2xl font-bold text-foreground">DEV-08 Screenshot Compositions</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Development-only preview canvases for automated Playwright screenshots.
        </p>
      </div>

      <div className="grid gap-3">
        {shotsList.map((s) => (
          <Link
            key={s.id}
            href={`/dev/shots?shot=${s.id}`}
            className="flex items-center justify-between rounded-xl border border-border bg-surface p-4 hover:bg-secondary/50 transition-colors"
          >
            <div>
              <span className="text-xs uppercase font-semibold text-interactive tracking-wide">
                {s.group}
              </span>
              <p className="text-sm font-semibold text-foreground">{s.title}</p>
              <code className="text-xs text-muted-foreground">?shot={s.id}</code>
            </div>
            <ArrowRight className="size-4 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </main>
  );
}
