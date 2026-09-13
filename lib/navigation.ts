/**
 * Navigation Configuration per Section 4.1 & 9.5 of Shahad-web-dev-plan.md
 * Conflict #3 resolved: exactly 5 top-level items with 2 mega panels.
 */

export interface MegaPanelItem {
  label: string;
  href: string;
  description?: string;
  iconName?: string;
}

export interface NavItem {
  label: string;
  href: string;
  isMegaPanel?: boolean;
  megaItems?: MegaPanelItem[];
  footerAction?: {
    label: string;
    href: string;
  };
}

export const exploreCategories: MegaPanelItem[] = [
  {
    label: "AI & Machine Learning",
    href: "/apis/ai-machine-learning",
    description: "LLMs, embeddings, document intelligence, and OCR models.",
  },
  {
    label: "Business Data",
    href: "/apis/business-data",
    description: "Company registries, tax validation, and firmographics.",
  },
  {
    label: "Communications",
    href: "/apis/communications",
    description: "SMS delivery, voice verification, and email relays.",
  },
  {
    label: "Financial Data",
    href: "/apis/financial-data",
    description: "FX currency rates, market quotes, and payment feeds.",
  },
  {
    label: "Travel & Airlines",
    href: "/apis/travel-airlines",
    description: "Flight status radar, airport schedules, and fare search.",
  },
  {
    label: "Maps & Location",
    href: "/apis/maps-location",
    description: "Weather radar tiles, geocoding, and routing geometry.",
  },
  {
    label: "Media & Files",
    href: "/apis/media-files",
    description: "Image transformation, video transcoding, and storage.",
  },
  {
    label: "Developer Tools",
    href: "/apis/developer-tools",
    description: "IoT telemetry, webhooks, and build infrastructure.",
  },
];

export const developerResources: MegaPanelItem[] = [
  {
    label: "Quickstart",
    href: "/developers/quickstart",
    description: "Integrate and authenticate your first API in five minutes.",
  },
  {
    label: "Documentation",
    href: "/docs",
    description: "Comprehensive guides, OpenAPI schemas, and SDK libraries.",
  },
  {
    label: "Guides",
    href: "/guides",
    description: "Architectural blueprints, comparison articles, and tutorials.",
  },
  {
    label: "Playground",
    href: "/developers#playground",
    description: "Interactive mock console to test requests against sample datasets.",
  },
  {
    label: "Status",
    href: "/status",
    description: "Real-time provider uptime, latency metrics, and incident history.",
  },
];

/**
 * Primary navigation items: exactly five items per Section 4.1
 */
export const primaryNav: NavItem[] = [
  {
    label: "Explore APIs",
    href: "/apis",
    isMegaPanel: true,
    megaItems: exploreCategories,
    footerAction: {
      label: "Browse all APIs →",
      href: "/apis",
    },
  },
  {
    label: "Host your API",
    href: "/host",
  },
  {
    label: "Sell your API",
    href: "/providers",
  },
  {
    label: "Developers",
    href: "/developers",
    isMegaPanel: true,
    megaItems: developerResources,
    footerAction: {
      label: "View Developer Hub →",
      href: "/developers",
    },
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
];

/**
 * Retain legacy navLinks export for backward compatibility
 */
export const navLinks = primaryNav;

/**
 * Four-column footer structure per Section 4.1 and Section 9.5
 */
export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export const footerColumns: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Explore APIs", href: "/apis" },
      { label: "Host your API (APIaaS)", href: "/host" },
      { label: "Sell your API", href: "/providers" },
      { label: "Free API Directory", href: "/directory" },
      { label: "Pricing & Terms", href: "/pricing" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "Quickstart Guide", href: "/developers/quickstart" },
      { label: "Documentation", href: "/docs" },
      { label: "Guides & Tutorials", href: "/guides" },
      { label: "API Playground", href: "/developers#playground" },
      { label: "Platform Status", href: "/status" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About API Lighthouse", href: "/about" },
      { label: "Contact & Support", href: "/contact" },
      { label: "Trust & Security", href: "/trust" },
      { label: "RapidAPI Alternative", href: "/compare/rapidapi" },
    ],
  },
  {
    heading: "Legal & Frameworks",
    links: [
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Data Processing (DPA)", href: "/legal/dpa" },
      { label: "FastAPI Hosting", href: "/host/frameworks/fastapi" },
      { label: "ASP.NET Core Hosting", href: "/host/frameworks/aspnet" },
      { label: "Next.js Hosting", href: "/host/frameworks/nextjs" },
    ],
  },
];
