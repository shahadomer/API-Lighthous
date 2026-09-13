import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroBeamSweep } from "./HeroBeamSweep";

const SUGGESTION_CHIPS = [
  { label: "Airline data", href: "/apis?q=Airline+data" },
  { label: "SMS delivery", href: "/apis?q=SMS+delivery" },
  { label: "Company lookup", href: "/apis?q=Company+lookup" },
  { label: "AI models", href: "/apis?q=AI+models" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-surface-inverse text-on-surface-inverse rounded-b-3xl md:rounded-b-[48px] pt-16 md:pt-24 pb-12 shadow-2xl">
      {/* Beam sweep motif */}
      <HeroBeamSweep />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* H1 Display XL */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface-inverse max-w-4xl leading-[1.1]">
          Find the API you need. <br className="hidden sm:inline" />
          Publish the one you built.
        </h1>

        {/* Sub Body L (max 60 characters per line) */}
        <p className="mt-6 text-lg sm:text-xl text-on-surface-inverse/80 max-w-[60ch] leading-relaxed">
          API Lighthouse is a marketplace, a hosting platform and a free directory for APIs.
          Discover services, compare them honestly, and start using them in minutes.
        </p>

        {/* Search Field (56px tall, full width up to 640px, rounded-full) */}
        <div className="mt-10 w-full max-w-[640px]">
          <form
            action="/apis"
            method="GET"
            role="search"
            className="relative flex items-center w-full"
          >
            <Search
              className="pointer-events-none absolute left-5 size-5 text-on-surface-inverse/50"
              aria-hidden="true"
            />
            <input
              type="search"
              name="q"
              placeholder="Search APIs by name, use case or provider"
              className="h-14 w-full rounded-full border border-on-surface-inverse/20 bg-surface/10 pl-14 pr-16 text-sm text-on-surface-inverse placeholder:text-on-surface-inverse/50 backdrop-blur-md transition-all focus:border-interactive focus:bg-surface/15 focus:outline-none focus:ring-2 focus:ring-interactive/40"
              aria-label="Search APIs by name, use case or provider"
            />
            <div className="pointer-events-none absolute right-4 flex items-center">
              <kbd className="hidden sm:inline-flex items-center rounded-md border border-on-surface-inverse/20 bg-surface-inverse/60 px-2 py-1 text-xs font-mono text-on-surface-inverse/60">
                ⌘K
              </kbd>
            </div>
          </form>

          {/* Suggestion chips as real crawlable links */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-on-surface-inverse/50 mr-1">Popular searches:</span>
            {SUGGESTION_CHIPS.map((chip) => (
              <Link
                key={chip.label}
                href={chip.href}
                className="inline-flex items-center rounded-full border border-on-surface-inverse/15 bg-on-surface-inverse/5 px-3 py-1 font-medium text-on-surface-inverse/80 transition-colors hover:border-interactive hover:bg-interactive/10 hover:text-on-surface-inverse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interactive"
              >
                {chip.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Dual CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Button
            asChild
            variant="filled"
            size="lg"
            className="h-12 w-full sm:w-auto px-8 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Link href="/signup">Create free account</Link>
          </Button>
          <Button
            asChild
            variant="outlined"
            size="lg"
            className="h-12 w-full sm:w-auto px-8 rounded-full text-sm font-semibold border-on-surface-inverse/40 text-on-surface-inverse hover:bg-on-surface-inverse/10 hover:text-on-surface-inverse transition-colors"
          >
            <Link href="/apis">Explore APIs</Link>
          </Button>
        </div>
      </div>

      {/* Visual Composition: 3 overlapping surfaces bleeding off edges */}
      <div className="relative mt-12 md:mt-16 w-full max-w-7xl mx-auto px-4 overflow-hidden">
        <div className="relative flex items-center justify-center min-h-[360px] sm:min-h-[440px] md:min-h-[520px]">
          {/* Left background: hero-detail */}
          <div className="absolute left-[-15%] sm:left-[-5%] md:left-[2%] top-8 w-[50%] sm:w-[45%] max-w-[600px] z-10 opacity-75 sm:opacity-90 transform -rotate-3 scale-95 transition-transform duration-500 hover:scale-100 hover:z-30 hover:opacity-100 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src="/images/generated/hero-detail.avif"
              alt="API detail page showing endpoints, authentication method, and live JSON response preview"
              width={1280}
              height={933}
              priority
              unoptimized
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right background: hero-dashboard */}
          <div className="absolute right-[-15%] sm:right-[-5%] md:right-[2%] top-12 w-[50%] sm:w-[45%] max-w-[600px] z-10 opacity-75 sm:opacity-90 transform rotate-3 scale-95 transition-transform duration-500 hover:scale-100 hover:z-30 hover:opacity-100 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src="/images/generated/hero-dashboard.avif"
              alt="Provider dashboard composition showing listings with Published, In review, and Draft status pills"
              width={1280}
              height={817}
              priority
              unoptimized
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Center foreground: hero-catalog */}
          <div className="relative z-20 w-[85%] sm:w-[75%] md:w-[68%] max-w-[840px] transform hover:scale-[1.02] transition-transform duration-500 rounded-2xl overflow-hidden shadow-2xl border border-white/15">
            <Image
              src="/images/generated/hero-catalog.avif"
              alt="API catalog grid showing verified listings, filter rail, and search populated with flight status"
              width={1280}
              height={981}
              priority
              unoptimized
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
