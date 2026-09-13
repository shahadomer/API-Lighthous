import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";

interface DoorPillar {
  id: string;
  pillar: string;
  title: string;
  description: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  capabilities: string[];
  link: {
    text: string;
    href: string;
  };
}

const DOORS: DoorPillar[] = [
  {
    id: "door-host",
    pillar: "Hosting",
    title: "Host your API",
    description:
      "Deploy containerized API workloads directly to managed edge regions with sub-second propagation. Built-in SSL, telemetry, and zero operational friction.",
    image: {
      src: "/images/generated/door-host.avif",
      width: 800,
      height: 517,
      alt: "Hosting terminal displaying deployment logs beside a multi-step live deployment stepper",
    },
    capabilities: [
      "Framework-agnostic runtime: FastAPI, Next.js, Express, ASP.NET, Django, Spring",
      "Multi-region edge deployment with automated DNS & auto-renewing TLS",
      "OpenAPI 3.1 schema extraction with native health checks & telemetry",
    ],
    link: {
      text: "Explore hosting capabilities",
      href: "/host",
    },
  },
  {
    id: "door-marketplace",
    pillar: "Marketplace",
    title: "Sell your API",
    description:
      "Publish verified endpoints to thousands of active developers and engineering teams. Structured billing models, instant key provisioning, and usage metrics.",
    image: {
      src: "/images/generated/door-marketplace.avif",
      width: 800,
      height: 731,
      alt: "API marketplace pricing plans panel with tiered developer and enterprise options",
    },
    capabilities: [
      "Flexible subscription tiers, usage-based metering, and custom enterprise plans",
      "Automated developer onboarding and instant API key issuance",
      "Verified provider profile displaying gateway latency and uptime records",
    ],
    link: {
      text: "Learn about selling APIs",
      href: "/providers",
    },
  },
  {
    id: "door-directory",
    pillar: "Directory",
    title: "Explore free APIs",
    description:
      "Access a curated directory of public and free-tier web services across airline, data, and developer tooling. Rigorously tested and monitored.",
    image: {
      src: "/images/generated/door-directory.avif",
      width: 800,
      height: 583,
      alt: "Directory list view highlighting free tier and public open API services",
    },
    capabilities: [
      "Verified public listings with authentication requirements clearly labelled",
      "Complete endpoint catalogs with real sample JSON response payloads",
      "Community-tested operational signals and sub-500ms latency benchmarks",
    ],
    link: {
      text: "Browse the free directory",
      href: "/directory",
    },
  },
];

export function ThreeDoors() {
  return (
    <section
      id="three-doors"
      aria-labelledby="doors-heading"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-interactive">
          Three Equal Entry Paths
        </span>
        <h2
          id="doors-heading"
          className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground"
        >
          Everything you need to discover, build, and distribute APIs
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Whether you need a reliable production feed, a zero-config hosting edge, or a verified
          marketplace audience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {DOORS.map((door) => (
          <article
            key={door.id}
            className="flex flex-col justify-between rounded-3xl border border-border bg-surface p-8 sm:p-10 lg:p-12 shadow-xs transition-all hover:shadow-md hover:-translate-y-1"
          >
            <div>
              {/* Pillar Category Chip */}
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-interactive mb-3">
                {door.pillar}
              </span>

              {/* Card Image from DEV-08 */}
              <div className="relative mb-6 rounded-2xl overflow-hidden border border-border/80 bg-secondary/30 aspect-[4/3] flex items-center justify-center">
                <Image
                  src={door.image.src}
                  alt={door.image.alt}
                  width={door.image.width}
                  height={door.image.height}
                  loading="lazy"
                  fetchPriority="low"
                  unoptimized
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Two-line Description */}
              <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                {door.title}
              </h3>
              <p className="mt-3 text-sm text-foreground/80 leading-relaxed min-h-[3rem]">
                {door.description}
              </p>

              {/* 3-Item Bulleted Capability List */}
              <ul className="mt-6 space-y-3 text-xs text-muted-foreground" role="list">
                {door.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2.5">
                    <span className="size-4 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="size-2.5 stroke-[3]" />
                    </span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Text Link */}
            <div className="mt-8 pt-6 border-t border-border">
              <Link
                href={door.link.href}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-interactive hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interactive rounded"
              >
                <span>{door.link.text}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
