import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface CategoryCardItem {
  slug: string;
  name: string;
  description: string;
  sampleCount: string;
  svgFile: string;
}

const CATEGORIES: CategoryCardItem[] = [
  {
    slug: "ai-and-machine-learning",
    name: "AI and machine learning",
    description:
      "Large language models, vision embedding, vector inference, and audio transcription.",
    sampleCount: "18 APIs (sample data)",
    svgFile: "cat-ai-machine-learning.svg",
  },
  {
    slug: "business-and-company-data",
    name: "Business and company data",
    description: "Corporate entity registries, beneficial ownership records, and VAT compliance.",
    sampleCount: "24 APIs (sample data)",
    svgFile: "cat-business-data.svg",
  },
  {
    slug: "communication",
    name: "Communication",
    description:
      "Transactional SMS dispatch, telephony verification, voice relays, and push alerts.",
    sampleCount: "15 APIs (sample data)",
    svgFile: "cat-communication.svg",
  },
  {
    slug: "financial-and-payments",
    name: "Financial and payments",
    description:
      "Real-time equities, delayed currency rates, payment gateways, and crypto tickers.",
    sampleCount: "20 APIs (sample data)",
    svgFile: "cat-financial-payments.svg",
  },
  {
    slug: "travel-and-airline",
    name: "Travel and airline",
    description:
      "Global radar telemetry, scheduled departures, gate changes, and multi-carrier booking.",
    sampleCount: "12 APIs (sample data)",
    svgFile: "cat-travel-airline.svg",
  },
  {
    slug: "maps-and-location",
    name: "Maps and location",
    description:
      "Doppler satellite imagery, spatial geocoding, boundary lookups, and routing matrices.",
    sampleCount: "16 APIs (sample data)",
    svgFile: "cat-maps-location.svg",
  },
  {
    slug: "media-and-files",
    name: "Media and files",
    description:
      "Transcoding pipelines, image processing, dynamic PDF generation, and object storage.",
    sampleCount: "14 APIs (sample data)",
    svgFile: "cat-media-files.svg",
  },
  {
    slug: "developer-tools-and-utilities",
    name: "Developer tools and utilities",
    description: "Schema validation, edge telemetry ingestion, webhooks, and cron orchestrators.",
    sampleCount: "22 APIs (sample data)",
    svgFile: "cat-developer-tools.svg",
  },
];

export function ExploreUseCases() {
  return (
    <section
      id="explore-use-cases"
      aria-labelledby="use-cases-heading"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-interactive">
            Explore by use case
          </span>
          <h2
            id="use-cases-heading"
            className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground"
          >
            Find the right API for your stack
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Curated categories with schema specifications and live gateway response testing.
          </p>
        </div>

        <Link
          href="/apis"
          className="inline-flex items-center gap-1 text-sm font-semibold text-interactive hover:underline shrink-0"
        >
          <span>Browse all categories</span>
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/apis/${cat.slug}`}
            className="group flex flex-col justify-between rounded-2xl border border-border bg-surface overflow-hidden shadow-xs transition-all hover:shadow-md hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interactive"
          >
            <div>
              {/* 400x300 Geometric SVG Illustration (<6KB) */}
              <div className="relative w-full aspect-[4/3] bg-surface-inverse overflow-hidden">
                <Image
                  src={`/images/categories/${cat.svgFile}`}
                  alt=""
                  aria-hidden="true"
                  width={400}
                  height={300}
                  loading="lazy"
                  fetchPriority="low"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Category Details */}
              <div className="p-5">
                <h3 className="text-base font-bold text-foreground group-hover:text-interactive transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>

            {/* Bottom Sample Count Notice */}
            <div className="px-5 pb-5 pt-1 flex items-center justify-between border-t border-border/40 text-xs">
              <span className="font-mono text-[11px] text-muted-foreground">{cat.sampleCount}</span>
              <span className="text-interactive font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 text-xs">
                Explore →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
