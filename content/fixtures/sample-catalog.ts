/**
 * Typed Sample Catalog Fixtures
 * Per Section 6.4 and 12.3:
 * - All provider names are strictly fictional (Northwind Aviation, Meridian Data, Halcyon SMS, etc.)
 * - No real company name, trademark, logo or pricing is referenced
 * - All entries carry is_sample_data: true and explicit sample labeling
 */

export interface FixtureEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  summary: string;
  sampleResponseJson: Record<string, unknown>;
}

export interface FixturePlan {
  name: string;
  priceAmount?: string;
  priceCurrency?: string;
  priceUnit?: string;
  includedUnits?: number;
  overageNote?: string;
  isContactOnly?: boolean;
}

export interface FixtureVersion {
  version: string;
  changelogMd: string;
}

export interface FixtureApi {
  slug: string;
  name: string;
  summary: string;
  descriptionMd: string;
  categorySlug: string;
  status: "published" | "draft" | "submitted";
  authType: "API key" | "OAuth 2.0" | "Bearer token";
  baseUrl: string;
  docsUrl: string;
  openapiUrl: string;
  coverageNotes: string;
  lastReviewedAt: string;
  publishedAt: string;
  versions: FixtureVersion[];
  endpoints: FixtureEndpoint[];
  plans: FixturePlan[];
}

export interface FixtureProvider {
  slug: string;
  name: string;
  website: string;
  description: string;
  logoUrl: string;
  supportEmail: string;
  verified: boolean;
  apis: FixtureApi[];
}

export interface FixtureCategory {
  slug: string;
  name: string;
  introMd: string;
  seoTitle: string;
  seoDescription: string;
}

export const fixtureCategories: FixtureCategory[] = [
  {
    slug: "airline-apis",
    name: "Airline APIs",
    introMd:
      "Global flight telemetry, airport departures, fare comparisons, and airline operational data APIs.",
    seoTitle: "Airline & Flight Data APIs | API Lighthouse",
    seoDescription:
      "Explore curated flight radar, airport schedule, and airline booking data APIs with verified uptime and latency.",
  },
  {
    slug: "business-data",
    name: "Business Data",
    introMd:
      "Corporate registries, beneficial ownership, firmographic intelligence, and tax compliance APIs.",
    seoTitle: "Corporate Registry & Business Data APIs | API Lighthouse",
    seoDescription:
      "Connect to trusted corporate directories, tax validation, and business entity intelligence APIs.",
  },
  {
    slug: "communications",
    name: "Communications",
    introMd:
      "Transactional SMS dispatch, telephony verification, voice relays, and omni-channel messaging APIs.",
    seoTitle: "SMS & Telecommunications APIs | API Lighthouse",
    seoDescription:
      "High-throughput transactional messaging, voice verification, and carrier routing APIs.",
  },
  {
    slug: "financial-data",
    name: "Financial Data",
    introMd:
      "Reference equity quotes, FX currency rates, institutional trade analytics, and commodity data.",
    seoTitle: "Financial Markets & Currency APIs | API Lighthouse",
    seoDescription:
      "Real-time and delayed equities, foreign exchange, and commodities market data feeds.",
  },
  {
    slug: "geo-mapping",
    name: "Geo & Mapping",
    introMd:
      "Doppler weather radar, spatial geocoding, topography tiles, and reverse boundary lookups.",
    seoTitle: "Geospatial & Weather Radar APIs | API Lighthouse",
    seoDescription:
      "High-performance geospatial raster tiles, geocoding endpoints, and meteorological data models.",
  },
  {
    slug: "developer-tools",
    name: "Developer Tools",
    introMd:
      "IoT edge telemetry streams, schema registries, build status webhooks, and developer infrastructure.",
    seoTitle: "Developer Infrastructure & Telemetry APIs | API Lighthouse",
    seoDescription:
      "Integrate IoT device metrics, event ingestion, and developer toolchains into your applications.",
  },
];

export const fixtureProviders: FixtureProvider[] = [
  {
    slug: "northwind-aviation",
    name: "Northwind Aviation",
    website: "https://northwind.example.com",
    description:
      "[SAMPLE DATA - FICTIONAL ENTITY] Northwind Aviation publishes global aviation radar telemetry, flight track positions, and airport timetable feeds.",
    logoUrl: "/images/providers/northwind.svg",
    supportEmail: "support@northwind.example.com",
    verified: true,
    apis: [
      {
        slug: "flight-status",
        name: "Northwind Flight Status",
        summary:
          "Live departure, arrival, gate changes, and en-route radar coordinates for global commercial flights.",
        descriptionMd:
          "## Overview\n\n[SAMPLE DATA] Northwind Flight Status streams authoritative flight positioning, schedule updates, and gate announcements across 850 international airlines.\n\n### Highlights\n- Latency under 450ms globally\n- Automatic delay notifications\n- ICAO and IATA route resolution",
        categorySlug: "airline-apis",
        status: "published",
        authType: "Bearer token",
        baseUrl: "https://api.northwind.example.com/v1",
        docsUrl: "https://docs.northwind.example.com/flight-status",
        openapiUrl: "https://api.northwind.example.com/openapi.json",
        coverageNotes:
          "Global coverage across North America, Europe, Asia-Pacific, and Middle Eastern hubs.",
        lastReviewedAt: "2026-09-10T12:00:00Z",
        publishedAt: "2026-09-01T00:00:00Z",
        versions: [
          {
            version: "v1.2.0",
            changelogMd:
              "Added real-time runway visual range (RVR) fields and gate turnaround estimates.",
          },
          {
            version: "v1.0.0",
            changelogMd: "Initial public launch of Northwind Flight Status API.",
          },
        ],
        endpoints: [
          {
            method: "GET",
            path: "/flights/{flight_iata}",
            summary: "Retrieve current positional telemetry and status for an active flight.",
            sampleResponseJson: {
              data: {
                flight_iata: "NW412",
                airline: "Northwind Express",
                origin: "LHR",
                destination: "JFK",
                status: "active",
                altitude_ft: 34000,
                ground_speed_kts: 465,
                estimated_arrival_utc: "2026-09-13T21:40:00Z",
                terminal: "4",
                gate: "B22",
              },
              meta: {
                cached: false,
                response_ms: 68,
                sample_notice: "Sample Fixture Data",
              },
            },
          },
          {
            method: "GET",
            path: "/airports/{iata}/departures",
            summary: "Fetch upcoming scheduled departures for a specific airport.",
            sampleResponseJson: {
              airport: "LHR",
              departures: [
                { flight: "NW412", dest: "JFK", sched: "17:30", est: "17:35", status: "boarding" },
                { flight: "NW880", dest: "DXB", sched: "18:00", est: "18:00", status: "on-time" },
              ],
            },
          },
        ],
        plans: [
          {
            name: "Free Sandbox",
            priceAmount: "0.0000",
            priceCurrency: "USD",
            priceUnit: "month",
            includedUnits: 500,
            overageNote: "Hard cap at 500 requests per month",
            isContactOnly: false,
          },
          {
            name: "Pro Developer",
            priceAmount: "79.0000",
            priceCurrency: "USD",
            priceUnit: "month",
            includedUnits: 25000,
            overageNote: "$0.0035 per extra request",
            isContactOnly: false,
          },
          {
            name: "Enterprise Fleet",
            priceAmount: undefined,
            priceCurrency: "USD",
            priceUnit: "month",
            includedUnits: undefined,
            overageNote: "Custom SLA, dedicated peering, and priority webhook delivery",
            isContactOnly: true,
          },
        ],
      },
      {
        slug: "airport-schedules",
        name: "Northwind Airport Schedules",
        summary:
          "Historical and seasonal timetable distributions for commercial airport terminals worldwide.",
        descriptionMd:
          "[SAMPLE DATA] Comprehensive timetable database indexing seasonal slot allocations and carrier rotations.",
        categorySlug: "airline-apis",
        status: "published",
        authType: "Bearer token",
        baseUrl: "https://api.northwind.example.com/v1",
        docsUrl: "https://docs.northwind.example.com/schedules",
        openapiUrl: "https://api.northwind.example.com/schedules-openapi.json",
        coverageNotes: "Covers 1,200 commercial passenger and cargo aerodromes.",
        lastReviewedAt: "2026-09-08T09:30:00Z",
        publishedAt: "2026-09-01T00:00:00Z",
        versions: [
          {
            version: "v1.0.0",
            changelogMd: "Initial release of seasonal timetable search endpoints.",
          },
        ],
        endpoints: [
          {
            method: "GET",
            path: "/schedules/search",
            summary: "Query seasonal route schedules between two IATA city pairs.",
            sampleResponseJson: {
              route: "LHR-JFK",
              weekly_frequencies: 84,
              operators: ["NW", "BA", "VS"],
            },
          },
        ],
        plans: [
          {
            name: "Standard",
            priceAmount: "49.0000",
            priceCurrency: "USD",
            priceUnit: "month",
            includedUnits: 10000,
            overageNote: "$0.004 per request",
            isContactOnly: false,
          },
        ],
      },
    ],
  },
  {
    slug: "meridian-data",
    name: "Meridian Data",
    website: "https://meridian.example.com",
    description:
      "[SAMPLE DATA - FICTIONAL ENTITY] Meridian Data aggregates statutory filings, corporate registries, and capital market reference indicators.",
    logoUrl: "/images/providers/meridian.svg",
    supportEmail: "data-desk@meridian.example.com",
    verified: true,
    apis: [
      {
        slug: "company-registry",
        name: "Meridian Corporate Registry",
        summary:
          "Resolve registered companies, trade licenses, officer rosters, and legal entity identifiers.",
        descriptionMd:
          "[SAMPLE DATA] Verify commercial entities across 45 national registries with unified JSON responses.",
        categorySlug: "business-data",
        status: "published",
        authType: "API key",
        baseUrl: "https://api.meridian.example.com/v2",
        docsUrl: "https://docs.meridian.example.com/registry",
        openapiUrl: "https://api.meridian.example.com/registry-openapi.json",
        coverageNotes: "Statutory registries across US, UK, EU, UAE, and Singapore.",
        lastReviewedAt: "2026-09-11T14:00:00Z",
        publishedAt: "2026-09-02T00:00:00Z",
        versions: [
          {
            version: "v2.1.0",
            changelogMd: "Added ultimate beneficial ownership (UBO) lookup tree.",
          },
        ],
        endpoints: [
          {
            method: "GET",
            path: "/companies/{registration_no}",
            summary: "Fetch verified legal registration, registered address, and active status.",
            sampleResponseJson: {
              company: {
                legal_name: "Meridian Holdings Ltd",
                registration_number: "UK-08492011",
                jurisdiction: "GB",
                status: "active",
                incorporation_date: "2018-04-12",
                registered_office: "10 Finsbury Square, London, EC2A 1AF",
              },
            },
          },
        ],
        plans: [
          {
            name: "Developer Starter",
            priceAmount: "0.0000",
            priceCurrency: "USD",
            priceUnit: "month",
            includedUnits: 250,
            overageNote: "Strict rate limit 2 rps",
            isContactOnly: false,
          },
          {
            name: "Scale Lookup",
            priceAmount: "120.0000",
            priceCurrency: "USD",
            priceUnit: "month",
            includedUnits: 10000,
            overageNote: "$0.015 per query beyond cap",
            isContactOnly: false,
          },
        ],
      },
      {
        slug: "market-quotes",
        name: "Meridian Market Feed",
        summary:
          "Delayed equities, currency exchange matrices, and commodity reference benchmarks.",
        descriptionMd:
          "[SAMPLE DATA] Financial quote feeds tailored for portfolio trackers and ERP accounting systems.",
        categorySlug: "financial-data",
        status: "published",
        authType: "Bearer token",
        baseUrl: "https://api.meridian.example.com/v1",
        docsUrl: "https://docs.meridian.example.com/quotes",
        openapiUrl: "https://api.meridian.example.com/quotes-openapi.json",
        coverageNotes: "Major global equity exchanges (15-min delay) and live Forex crosses.",
        lastReviewedAt: "2026-09-09T16:20:00Z",
        publishedAt: "2026-09-02T00:00:00Z",
        versions: [
          {
            version: "v1.4.0",
            changelogMd: "Added crypto reference price index feeds.",
          },
        ],
        endpoints: [
          {
            method: "GET",
            path: "/quotes/fx/latest",
            summary: "Retrieve foreign exchange rates against baseline USD and EUR.",
            sampleResponseJson: {
              base: "USD",
              timestamp: "2026-09-13T18:00:00Z",
              rates: { EUR: 0.918, GBP: 0.774, SAR: 3.751, JPY: 147.22 },
            },
          },
        ],
        plans: [
          {
            name: "Free FX",
            priceAmount: "0.0000",
            priceCurrency: "USD",
            priceUnit: "month",
            includedUnits: 1000,
            overageNote: "Daily rate updates",
            isContactOnly: false,
          },
          {
            name: "Trader Pro",
            priceAmount: "199.0000",
            priceCurrency: "USD",
            priceUnit: "month",
            includedUnits: 100000,
            overageNote: "$0.001 per additional call",
            isContactOnly: false,
          },
        ],
      },
    ],
  },
  {
    slug: "halcyon-sms",
    name: "Halcyon SMS",
    website: "https://halcyon.example.com",
    description:
      "[SAMPLE DATA - FICTIONAL ENTITY] Halcyon SMS supplies global carrier transit, direct SMS routes, and conversational one-time authentication channels.",
    logoUrl: "/images/providers/halcyon.svg",
    supportEmail: "ops@halcyon.example.com",
    verified: true,
    apis: [
      {
        slug: "sms-dispatch",
        name: "Halcyon SMS Dispatch",
        summary:
          "High-throughput transactional SMS delivery with carrier DLRs and smart route failover.",
        descriptionMd:
          "[SAMPLE DATA] Direct carrier interconnects reaching 210 countries with sub-second delivery receipts.",
        categorySlug: "communications",
        status: "published",
        authType: "API key",
        baseUrl: "https://api.halcyon.example.com/v1",
        docsUrl: "https://docs.halcyon.example.com/sms",
        openapiUrl: "https://api.halcyon.example.com/sms-openapi.json",
        coverageNotes: "Direct Tier 1 routes into 180+ telecommunications providers.",
        lastReviewedAt: "2026-09-12T11:00:00Z",
        publishedAt: "2026-09-03T00:00:00Z",
        versions: [
          {
            version: "v1.1.0",
            changelogMd: "Support for alphanumeric sender IDs across GCC corridors.",
          },
        ],
        endpoints: [
          {
            method: "POST",
            path: "/messages/send",
            summary: "Submit transactional SMS message for immediate transmission.",
            sampleResponseJson: {
              message_id: "msg_8941fba73c",
              status: "queued",
              destination: "+966500000000",
              cost: 0.0075,
              carrier: "STC",
            },
          },
        ],
        plans: [
          {
            name: "Pay-As-You-Go",
            priceAmount: "0.0075",
            priceCurrency: "USD",
            priceUnit: "message",
            includedUnits: 0,
            overageNote: "Direct billing per delivered SMS packet",
            isContactOnly: false,
          },
          {
            name: "High Volume",
            priceAmount: "500.0000",
            priceCurrency: "USD",
            priceUnit: "month",
            includedUnits: 100000,
            overageNote: "Volume discounted tiers from $0.005 / SMS",
            isContactOnly: false,
          },
        ],
      },
      {
        slug: "voice-verify",
        name: "Halcyon Voice Verify",
        summary: "Automated voice telephone challenge codes with localized speech synthesis.",
        descriptionMd:
          "[SAMPLE DATA] Deliver localized spoken OTP security codes when SMS channels face delivery latency.",
        categorySlug: "communications",
        status: "published",
        authType: "OAuth 2.0",
        baseUrl: "https://api.halcyon.example.com/v1",
        docsUrl: "https://docs.halcyon.example.com/voice-verify",
        openapiUrl: "https://api.halcyon.example.com/voice-verify-openapi.json",
        coverageNotes: "Supports 32 spoken languages and dual-tone multi-frequency inputs.",
        lastReviewedAt: "2026-09-12T11:30:00Z",
        publishedAt: "2026-09-03T00:00:00Z",
        versions: [
          {
            version: "v1.0.0",
            changelogMd: "Initial release of voice OTP dialer.",
          },
        ],
        endpoints: [
          {
            method: "POST",
            path: "/verify/call",
            summary: "Initiate voice call with one-time verification audio prompt.",
            sampleResponseJson: {
              call_id: "call_a9b1c2d3",
              status: "ringing",
              duration_sec: 0,
            },
          },
        ],
        plans: [
          {
            name: "Per-Call Pricing",
            priceAmount: "0.0300",
            priceCurrency: "USD",
            priceUnit: "call",
            includedUnits: 0,
            overageNote: "Billed per answered telephone verification",
            isContactOnly: false,
          },
        ],
      },
    ],
  },
  {
    slug: "beacon-weather",
    name: "Beacon Weather Systems",
    website: "https://beacon-weather.example.com",
    description:
      "[SAMPLE DATA - FICTIONAL ENTITY] Beacon Weather Systems provides calibrated Doppler radar, thunderstorm tracks, and atmospheric raster tiles.",
    logoUrl: "/images/providers/beacon.svg",
    supportEmail: "api@beacon-weather.example.com",
    verified: true,
    apis: [
      {
        slug: "radar-precipitation",
        name: "Beacon Global Radar",
        summary:
          "High-resolution weather radar tiles, precipitation accumulation, and severe storm alerts.",
        descriptionMd:
          "[SAMPLE DATA] Satellite and radar composite imagery optimized for mapping frameworks.",
        categorySlug: "geo-mapping",
        status: "published",
        authType: "API key",
        baseUrl: "https://api.beacon-weather.example.com/v1",
        docsUrl: "https://docs.beacon-weather.example.com/radar",
        openapiUrl: "https://api.beacon-weather.example.com/radar-openapi.json",
        coverageNotes: "Composite radar refreshed every 5 minutes globally.",
        lastReviewedAt: "2026-09-07T10:00:00Z",
        publishedAt: "2026-09-04T00:00:00Z",
        versions: [
          {
            version: "v2.0.0",
            changelogMd:
              "Transitioned raster imagery to WebP compression for 40% smaller tile sizes.",
          },
        ],
        endpoints: [
          {
            method: "GET",
            path: "/radar/tiles/{z}/{x}/{y}.png",
            summary: "Fetch georeferenced radar composite tile for standard web map coordinates.",
            sampleResponseJson: {
              tile: "2/1/1",
              format: "image/png",
              timestamp: "2026-09-13T18:05:00Z",
              notice: "Binary image payload returned in production",
            },
          },
        ],
        plans: [
          {
            name: "Community",
            priceAmount: "0.0000",
            priceCurrency: "USD",
            priceUnit: "month",
            includedUnits: 5000,
            overageNote: "Non-commercial attribution required",
            isContactOnly: false,
          },
          {
            name: "Pro Mapping",
            priceAmount: "89.0000",
            priceCurrency: "USD",
            priceUnit: "month",
            includedUnits: 150000,
            overageNote: "$0.0005 per tile overage",
            isContactOnly: false,
          },
        ],
      },
    ],
  },
  {
    slug: "ledger-labs",
    name: "Ledger Labs",
    website: "https://ledgerlabs.example.com",
    description:
      "[SAMPLE DATA - FICTIONAL ENTITY] Ledger Labs builds cross-border tax calculation engines, VAT validation, and digital invoice compliance endpoints.",
    logoUrl: "/images/providers/ledgerlabs.svg",
    supportEmail: "compliance@ledgerlabs.example.com",
    verified: true,
    apis: [
      {
        slug: "vat-validation",
        name: "Ledger Tax & VAT Validation",
        summary:
          "Real-time verification of European VAT, UK HMRC, and global indirect tax identifiers.",
        descriptionMd:
          "[SAMPLE DATA] Single endpoint validating statutory tax numbers against VIES and sovereign tax agencies.",
        categorySlug: "business-data",
        status: "published",
        authType: "API key",
        baseUrl: "https://api.ledgerlabs.example.com/v1",
        docsUrl: "https://docs.ledgerlabs.example.com/vat",
        openapiUrl: "https://api.ledgerlabs.example.com/vat-openapi.json",
        coverageNotes: "Full coverage for EU-27, United Kingdom, Norway, and Switzerland.",
        lastReviewedAt: "2026-09-11T15:45:00Z",
        publishedAt: "2026-09-04T00:00:00Z",
        versions: [
          {
            version: "v1.3.0",
            changelogMd: "Enhanced reverse-charge validity checks for digital services.",
          },
        ],
        endpoints: [
          {
            method: "POST",
            path: "/tax/vat/validate",
            summary: "Verify validity of a national VAT identifier and retrieve legal name.",
            sampleResponseJson: {
              valid: true,
              country_code: "DE",
              vat_number: "DE123456789",
              trader_name: "Beispiel Software GmbH",
              trader_address: "Musterstraße 12, 10115 Berlin",
              consultation_number: "WSRV-20260913-98421",
            },
          },
        ],
        plans: [
          {
            name: "Free Tier",
            priceAmount: "0.0000",
            priceCurrency: "USD",
            priceUnit: "month",
            includedUnits: 5000,
            overageNote: "Standard rate limiting applies",
            isContactOnly: false,
          },
          {
            name: "Business Compliance",
            priceAmount: "45.0000",
            priceCurrency: "USD",
            priceUnit: "month",
            includedUnits: 50000,
            overageNote: "$0.001 per additional check",
            isContactOnly: false,
          },
        ],
      },
    ],
  },
  {
    slug: "orbit-telemetry",
    name: "Orbit Telemetry",
    website: "https://orbit-telemetry.example.com",
    description:
      "[SAMPLE DATA - FICTIONAL ENTITY] Orbit Telemetry manages distributed edge telemetry buffers and device diagnostic metrics.",
    logoUrl: "/images/providers/orbit.svg",
    supportEmail: "dev@orbit-telemetry.example.com",
    verified: false,
    apis: [
      {
        slug: "device-stream",
        name: "Orbit Device Telemetry",
        summary:
          "High-frequency time-series sensor ingestion and anomaly event triggers for embedded devices.",
        descriptionMd:
          "[SAMPLE DATA] Stream MQTT or HTTP telemetry batches directly into managed time-series stores.",
        categorySlug: "developer-tools",
        status: "published",
        authType: "Bearer token",
        baseUrl: "https://api.orbit-telemetry.example.com/v1",
        docsUrl: "https://docs.orbit-telemetry.example.com/stream",
        openapiUrl: "https://api.orbit-telemetry.example.com/stream-openapi.json",
        coverageNotes: "Global ingest points with under 50ms ingestion latency.",
        lastReviewedAt: "2026-09-05T08:15:00Z",
        publishedAt: "2026-09-05T00:00:00Z",
        versions: [
          {
            version: "v1.0.0",
            changelogMd: "Public launch of device ingest telemetry gateway.",
          },
        ],
        endpoints: [
          {
            method: "POST",
            path: "/telemetry/ingest",
            summary: "Batch ingest array of device telemetry measurements.",
            sampleResponseJson: {
              accepted: 24,
              rejected: 0,
              batch_id: "batch_7718aa00",
            },
          },
        ],
        plans: [
          {
            name: "Hobbyist",
            priceAmount: "0.0000",
            priceCurrency: "USD",
            priceUnit: "month",
            includedUnits: 10000,
            overageNote: "7-day data retention",
            isContactOnly: false,
          },
          {
            name: "Industrial",
            priceAmount: "140.0000",
            priceCurrency: "USD",
            priceUnit: "month",
            includedUnits: 2500000,
            overageNote: "365-day data retention and export",
            isContactOnly: false,
          },
        ],
      },
    ],
  },
];
