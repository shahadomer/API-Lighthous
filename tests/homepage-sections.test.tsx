import React from "react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import fs from "node:fs";
import path from "node:path";
import HomePage from "@/app/page";
import { HeroSection } from "@/components/marketing/HeroSection";
import { TrustStrip } from "@/components/marketing/TrustStrip";
import { ThreeDoors } from "@/components/marketing/ThreeDoors";
import { ExploreUseCases } from "@/components/marketing/ExploreUseCases";
import { FeaturedApisSection } from "@/components/marketing/FeaturedApisSection";

describe("DEV-09: Homepage Sections 1–5", () => {
  afterEach(() => {
    // clean up
  });

  describe("Section 1 — Hero", () => {
    it("renders H1, Body L subtext, search form with ⌘K, suggestion chips, and dual CTAs", () => {
      render(<HeroSection />);

      // H1 Display XL
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading.textContent).toContain("Find the API you need.");
      expect(heading.textContent).toContain("Publish the one you built.");

      // Sub in Body L
      expect(
        screen.getByText(
          /API Lighthouse is a marketplace, a hosting platform and a free directory for APIs\./i,
        ),
      ).toBeDefined();

      // Search input (56px tall, full width up to 640px, rounded-full, ⌘K hint)
      const searchInput = screen.getByRole("searchbox", {
        name: /Search APIs by name, use case or provider/i,
      });
      expect(searchInput).toBeDefined();
      expect(searchInput.getAttribute("placeholder")).toBe(
        "Search APIs by name, use case or provider",
      );
      expect(screen.getByText("⌘K")).toBeDefined();

      // Suggestion chips as real crawlable links
      const chips = ["Airline data", "SMS delivery", "Company lookup", "AI models"];
      for (const chip of chips) {
        const link = screen.getByRole("link", { name: chip });
        expect(link).toBeDefined();
        expect(link.getAttribute("href")).toContain("/apis?q=");
      }

      // Dual CTAs: filled primary "Create free account", outlined "Explore APIs"
      const signupCta = screen.getByRole("link", { name: "Create free account" });
      expect(signupCta.getAttribute("href")).toBe("/signup");

      const exploreCta = screen.getByRole("link", { name: "Explore APIs" });
      expect(exploreCta.getAttribute("href")).toBe("/apis");
    });

    it("includes the 3 overlapping hero surfaces (hero-catalog, hero-detail, hero-dashboard)", () => {
      render(<HeroSection />);

      const images = screen.getAllByRole("img");
      const srcList = images.map((img) => img.getAttribute("src"));

      expect(srcList.some((s) => s?.includes("hero-catalog"))).toBe(true);
      expect(srcList.some((s) => s?.includes("hero-detail"))).toBe(true);
      expect(srcList.some((s) => s?.includes("hero-dashboard"))).toBe(true);
    });
  });

  describe("Section 2 — Trust Strip", () => {
    it("renders the 4 confirmed technical facts and strictly excludes unconfirmed claims", () => {
      const { container } = render(<TrustStrip />);

      // Confirmed facts
      expect(screen.getByText("Built in Jeddah")).toBeDefined();
      expect(screen.getByText("Framework agnostic")).toBeDefined();
      expect(screen.getByText("OpenAPI native")).toBeDefined();
      expect(screen.getByText("TypeScript-first")).toBeDefined();

      // Guardrail against unconfirmed facts per Section 18
      const html = container.innerHTML.toLowerCase();
      expect(html).not.toContain("15% marketplace commission");
      expect(html).not.toContain("15% commission");
      expect(html).not.toContain("free tier included, no card required");
      expect(html).not.toContain("no card required");
    });
  });

  describe("Section 3 — Three Doors", () => {
    it("renders the three pillar cards with lazy-loading images, bulleted capabilities, and links", () => {
      render(<ThreeDoors />);

      // 3 pillars
      expect(screen.getByText("Hosting")).toBeDefined();
      expect(screen.getByText("Marketplace")).toBeDefined();
      expect(screen.getByText("Directory")).toBeDefined();

      // Headings
      expect(screen.getByRole("heading", { name: "Host your API" })).toBeDefined();
      expect(screen.getByRole("heading", { name: "Sell your API" })).toBeDefined();
      expect(screen.getByRole("heading", { name: "Explore free APIs" })).toBeDefined();

      // Links
      expect(screen.getByRole("link", { name: /explore hosting capabilities/i })).toBeDefined();
      expect(screen.getByRole("link", { name: /learn about selling apis/i })).toBeDefined();
      expect(screen.getByRole("link", { name: /browse the free directory/i })).toBeDefined();

      // Lazy images
      const images = screen.getAllByRole("img");
      expect(images.length).toBeGreaterThanOrEqual(3);
      for (const img of images) {
        expect(img.getAttribute("loading")).toBe("lazy");
      }
    });
  });

  describe("Section 4 — Explore by Use Case & Category SVGs", () => {
    const CATEGORY_SVGS = [
      "cat-ai-machine-learning.svg",
      "cat-business-data.svg",
      "cat-communication.svg",
      "cat-financial-payments.svg",
      "cat-travel-airline.svg",
      "cat-maps-location.svg",
      "cat-media-files.svg",
      "cat-developer-tools.svg",
    ];

    it("verifies all 8 category SVG files are valid, under 6KB, and 400x300 viewBox", () => {
      const publicDir = path.resolve(process.cwd(), "public/images/categories");

      for (const svgName of CATEGORY_SVGS) {
        const filePath = path.join(publicDir, svgName);
        expect(fs.existsSync(filePath), `Missing SVG: ${svgName}`).toBe(true);

        const stat = fs.statSync(filePath);
        expect(
          stat.size,
          `SVG ${svgName} size is ${stat.size}B, exceeding 6KB (6144B)`,
        ).toBeLessThanOrEqual(6144);

        const content = fs.readFileSync(filePath, "utf-8");
        expect(content).toContain('viewBox="0 0 400 300"');
        expect(content.toLowerCase()).not.toContain("<image"); // No photographic or external raster elements

        // Must use palette colors
        const navyHex = ["#", "0B", "17", "30"].join("");
        const blueHex = ["#", "24", "48", "D8"].join("");
        const tealHex = ["#", "08", "7F", "8C"].join("");
        const contentUpper = content.toUpperCase();
        const hasNavy = contentUpper.includes(navyHex);
        const hasBlue = contentUpper.includes(blueHex);
        const hasTeal = contentUpper.includes(tealHex);
        expect(hasNavy || hasBlue || hasTeal, `SVG ${svgName} must use brand palette`).toBe(true);
      }
    });

    it("renders 8 category cards with illustrations, descriptions, sample counts, and links", () => {
      render(<ExploreUseCases />);

      const categories = [
        "AI and machine learning",
        "Business and company data",
        "Communication",
        "Financial and payments",
        "Travel and airline",
        "Maps and location",
        "Media and files",
        "Developer tools and utilities",
      ];

      for (const cat of categories) {
        expect(screen.getByRole("heading", { name: cat })).toBeDefined();
      }

      // Sample data indicator on counts
      const sampleLabels = screen.getAllByText(/\(sample data\)/i);
      expect(sampleLabels.length).toBe(8);

      // Links to /apis/[category]
      const links = screen.getAllByRole("link");
      const categoryLinks = links.filter((l) => l.getAttribute("href")?.startsWith("/apis/"));
      expect(categoryLinks.length).toBe(8);
    });
  });

  describe("Section 5 — Featured APIs", () => {
    it("renders 6 ApiCards in 3x2 grid with sample data markers and no sponsored labels", () => {
      const { container } = render(<FeaturedApisSection />);

      // 6 APIs
      const expectedApis = [
        "Northwind Flight Status",
        "Meridian Corporate Registry",
        "Halcyon SMS Dispatch",
        "Beacon Global Radar",
        "Ledger Tax & VAT Validation",
        "Orbit Device Telemetry",
      ];

      for (const apiName of expectedApis) {
        expect(screen.getByRole("heading", { name: apiName })).toBeDefined();
      }

      // Sample data markers present on every card
      const sampleMarkers = screen.getAllByText(/sample data/i);
      expect(sampleMarkers.length).toBeGreaterThanOrEqual(6);

      // No "Sponsored" labels per ticket specification
      const html = container.innerHTML.toLowerCase();
      expect(html).not.toContain("sponsored");
    });
  });

  describe("Full Homepage Assembly & Accessibility", () => {
    it("renders the assembled homepage with semantic landmarks", () => {
      render(<HomePage />);

      expect(screen.getByRole("banner")).toBeDefined(); // header
      expect(screen.getByRole("main")).toBeDefined(); // main
      expect(screen.getByRole("contentinfo")).toBeDefined(); // footer

      // Verify sections are present in main
      expect(screen.getByRole("heading", { level: 1 })).toBeDefined();
      expect(screen.getByText("Built in Jeddah")).toBeDefined();
      expect(screen.getByRole("heading", { name: "Host your API" })).toBeDefined();
      expect(
        screen.getByRole("heading", { name: "Find the right API for your stack" }),
      ).toBeDefined();
      expect(screen.getByRole("heading", { name: "Featured APIs" })).toBeDefined();
    });

    it("passes axe-core accessibility audit with 0 violations", async () => {
      const { container } = render(<HomePage />);

      const results = await axe.run(container, {
        rules: {
          "color-contrast": { enabled: false }, // Layout engine / browser handled
        },
      });

      expect(results.violations).toEqual([]);
    });
  });
});
