export type PricingModel = "Free" | "Paid" | "Pay-per-request";
export type AuthMethod = "API key" | "OAuth 2.0" | "Bearer token";

export type ApiListing = {
  slug: string;
  providerSlug: string;
  name: string;
  provider: string;
  summary: string;
  category: string;
  pricingModel: PricingModel;
  priceLabel: string;
  trial: boolean;
  auth: AuthMethod;
};

export const categories = [
  "Airline APIs",
  "Business Data",
  "Communications",
  "Financial Data",
  "AI & Documents",
] as const;

export const pricingModels: PricingModel[] = ["Free", "Paid", "Pay-per-request"];
export const authMethods: AuthMethod[] = ["API key", "OAuth 2.0", "Bearer token"];

export const apiListings: ApiListing[] = [
  {
    slug: "flight-status",
    providerSlug: "air-data",
    name: "Flight Status",
    provider: "Air Data",
    summary: "Track live departure, arrival and gate changes for scheduled flights.",
    category: "Airline APIs",
    pricingModel: "Pay-per-request",
    priceLabel: "$0.004 / request",
    trial: true,
    auth: "Bearer token",
  },
  {
    slug: "airport-schedules",
    providerSlug: "air-data",
    name: "Airport Schedules",
    provider: "Air Data",
    summary: "Retrieve full daily departure and arrival boards for any airport.",
    category: "Airline APIs",
    pricingModel: "Paid",
    priceLabel: "From $79 / month",
    trial: true,
    auth: "Bearer token",
  },
  {
    slug: "fare-search",
    providerSlug: "skyfare",
    name: "Fare Search",
    provider: "SkyFare",
    summary: "Compare cached fares across carriers before starting a booking flow.",
    category: "Airline APIs",
    pricingModel: "Paid",
    priceLabel: "From $149 / month",
    trial: false,
    auth: "OAuth 2.0",
  },
  {
    slug: "company-lookup",
    providerSlug: "ledger-labs",
    name: "Company Lookup",
    provider: "Ledger Labs",
    summary: "Resolve a company name into registry, address and officer records.",
    category: "Business Data",
    pricingModel: "Paid",
    priceLabel: "From $49 / month",
    trial: true,
    auth: "API key",
  },
  {
    slug: "vat-validation",
    providerSlug: "ledger-labs",
    name: "VAT Validation",
    provider: "Ledger Labs",
    summary: "Validate VAT and tax identifiers before issuing an invoice.",
    category: "Business Data",
    pricingModel: "Free",
    priceLabel: "Free up to 5k / month",
    trial: true,
    auth: "API key",
  },
  {
    slug: "firmographics",
    providerSlug: "northbeam",
    name: "Firmographics",
    provider: "Northbeam",
    summary: "Enrich leads with headcount, industry and revenue band signals.",
    category: "Business Data",
    pricingModel: "Pay-per-request",
    priceLabel: "$0.02 / record",
    trial: false,
    auth: "API key",
  },
  {
    slug: "sms-delivery",
    providerSlug: "sendwave",
    name: "SMS Delivery",
    provider: "Sendwave",
    summary: "Send transactional SMS with per-message delivery receipts.",
    category: "Communications",
    pricingModel: "Pay-per-request",
    priceLabel: "$0.0075 / message",
    trial: true,
    auth: "API key",
  },
  {
    slug: "email-relay",
    providerSlug: "sendwave",
    name: "Email Relay",
    provider: "Sendwave",
    summary: "Deliver product email with bounce and complaint webhooks.",
    category: "Communications",
    pricingModel: "Paid",
    priceLabel: "From $19 / month",
    trial: true,
    auth: "API key",
  },
  {
    slug: "voice-verify",
    providerSlug: "dialtone",
    name: "Voice Verify",
    provider: "Dialtone",
    summary: "Confirm phone ownership with an automated voice one-time code.",
    category: "Communications",
    pricingModel: "Pay-per-request",
    priceLabel: "$0.03 / call",
    trial: false,
    auth: "OAuth 2.0",
  },
  {
    slug: "market-quotes",
    providerSlug: "marketfeed",
    name: "Market Quotes",
    provider: "MarketFeed",
    summary: "Stream delayed equity quotes for dashboards and screeners.",
    category: "Financial Data",
    pricingModel: "Paid",
    priceLabel: "From $99 / month",
    trial: true,
    auth: "Bearer token",
  },
  {
    slug: "fx-rates",
    providerSlug: "marketfeed",
    name: "FX Rates",
    provider: "MarketFeed",
    summary: "Fetch daily and intraday currency rates for pricing pages.",
    category: "Financial Data",
    pricingModel: "Free",
    priceLabel: "Free up to 1k / day",
    trial: true,
    auth: "API key",
  },
  {
    slug: "doc-parse",
    providerSlug: "paperloop",
    name: "Doc Parse",
    provider: "Paperloop",
    summary: "Turn scanned invoices and receipts into structured line items.",
    category: "AI & Documents",
    pricingModel: "Pay-per-request",
    priceLabel: "$0.05 / page",
    trial: true,
    auth: "Bearer token",
  },
  {
    slug: "summarize",
    providerSlug: "inference-hub",
    name: "Summarize",
    provider: "Inference Hub",
    summary: "Condense long support threads into short reviewable briefs.",
    category: "AI & Documents",
    pricingModel: "Pay-per-request",
    priceLabel: "$0.001 / 1k tokens",
    trial: true,
    auth: "Bearer token",
  },
  {
    slug: "entity-tagging",
    providerSlug: "inference-hub",
    name: "Entity Tagging",
    provider: "Inference Hub",
    summary: "Extract names, places and amounts from unstructured text.",
    category: "AI & Documents",
    pricingModel: "Paid",
    priceLabel: "From $29 / month",
    trial: false,
    auth: "Bearer token",
  },
];

export function findListing(providerSlug: string, slug: string) {
  return apiListings.find((a) => a.providerSlug === providerSlug && a.slug === slug);
}
