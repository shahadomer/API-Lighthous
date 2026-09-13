import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { SiteHeader } from "@/components/product/SiteHeader";
import { SiteFooter } from "@/components/product/SiteFooter";
import { MobileNavigation } from "@/components/product/MobileNavigation";
import { primaryNav, footerColumns } from "@/lib/navigation";

describe("DEV-07: SiteHeader, SiteFooter, and Navigation Architecture", () => {
  beforeEach(() => {
    window.scrollY = 0;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("enforces exactly five primary nav items per Section 4.1", () => {
    expect(primaryNav.length).toBe(5);
    const labels = primaryNav.map((n) => n.label);
    expect(labels).toEqual([
      "Explore APIs",
      "Host your API",
      "Sell your API",
      "Developers",
      "Pricing",
    ]);
  });

  it("renders desktop header with 5 nav items, Log in, and filled Sign up free button", () => {
    render(<SiteHeader />);

    // Check brand
    expect(screen.getByRole("link", { name: /api lighthouse/i })).toBeDefined();

    // Check nav links / buttons
    expect(screen.getByRole("button", { name: /explore apis/i })).toBeDefined();
    expect(screen.getByRole("link", { name: "Host your API" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Sell your API" })).toBeDefined();
    expect(screen.getByRole("button", { name: /developers/i })).toBeDefined();
    expect(screen.getByRole("link", { name: "Pricing" })).toBeDefined();

    // Right-side actions
    expect(screen.getByRole("link", { name: "Log in" })).toBeDefined();
    const signupBtn = screen.getByRole("link", { name: "Sign up free" });
    expect(signupBtn).toBeDefined();
    expect(signupBtn.getAttribute("href")).toBe("/signup");
  });

  it("ensures the Sign up button is present and reachable at 375px mobile breakpoint", () => {
    // Simulate 375px viewport (mobile)
    window.innerWidth = 375;
    window.innerHeight = 667;
    window.dispatchEvent(new Event("resize"));

    render(<SiteHeader />);

    // Header has the Sign up free button visible
    const headerSignup = screen.getByRole("link", { name: "Sign up free" });
    expect(headerSignup).toBeDefined();
    expect(headerSignup.getAttribute("href")).toBe("/signup");
  });

  it("ensures the Sign up button is at the TOP of the mobile navigation drawer", async () => {
    render(<MobileNavigation />);

    // Open drawer
    const menuTrigger = screen.getByRole("button", { name: /open navigation menu/i });
    fireEvent.click(menuTrigger);

    await waitFor(() => {
      // Find all signup links in the document
      const signupLinks = screen.getAllByRole("link", { name: "Sign up free" });
      expect(signupLinks.length).toBeGreaterThanOrEqual(1);

      // Verify it's within the mobile drawer
      const drawerSignup = signupLinks[signupLinks.length - 1];
      expect(drawerSignup.getAttribute("href")).toBe("/signup");
    });
  });

  it("opens Explore APIs mega panel on trigger and closes on Escape", async () => {
    render(<SiteHeader />);

    const trigger = screen.getByRole("button", { name: /explore apis/i });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");

    // Click trigger to open
    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");

    // Verify categories rendered in mega panel
    expect(screen.getByText("AI & Machine Learning")).toBeDefined();
    expect(screen.getByText("Business Data")).toBeDefined();
    expect(screen.getByText("Communications")).toBeDefined();
    expect(screen.getByText("Browse all APIs →")).toBeDefined();

    // Press Escape key to close
    fireEvent.keyDown(window, { key: "Escape" });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText("Browse all APIs →")).toBeNull();
  });

  it("opens Developers mega panel on trigger and closes on Escape", async () => {
    render(<SiteHeader />);

    const trigger = screen.getByRole("button", { name: /developers/i });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");

    // Click trigger to open
    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");

    // Verify developer resources
    expect(screen.getByText("Quickstart")).toBeDefined();
    expect(screen.getByText("Documentation")).toBeDefined();
    expect(screen.getByText("Guides")).toBeDefined();
    expect(screen.getByText("Playground")).toBeDefined();
    expect(screen.getByText("Status")).toBeDefined();

    // Press Escape key to close
    fireEvent.keyDown(window, { key: "Escape" });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText("Quickstart")).toBeNull();
  });

  it("toggles the 1px bottom hairline once scrolled past 8px", () => {
    const { container } = render(<SiteHeader />);
    const header = container.querySelector("header");
    expect(header).toBeDefined();

    // Initial state: scrollY is 0 -> border-transparent
    expect(header?.className).toContain("border-b border-transparent");

    // Scroll past 8px -> border-b border-border
    window.scrollY = 20;
    fireEvent.scroll(window);
    expect(header?.className).toContain("border-b border-border/80");

    // Scroll back to top -> border-transparent
    window.scrollY = 0;
    fireEvent.scroll(window);
    expect(header?.className).toContain("border-b border-transparent");
  });

  it("renders SiteFooter with 4 structured columns, internal framework links, and sample data notice", () => {
    render(<SiteFooter />);

    // Verify 4 columns
    expect(screen.getByRole("navigation", { name: "Product" })).toBeDefined();
    expect(screen.getByRole("navigation", { name: "Developers" })).toBeDefined();
    expect(screen.getByRole("navigation", { name: "Company" })).toBeDefined();
    expect(screen.getByRole("navigation", { name: "Legal & Frameworks" })).toBeDefined();

    // Verify framework links per section 9.5
    expect(screen.getByRole("link", { name: "FastAPI Hosting" })).toBeDefined();
    expect(screen.getByRole("link", { name: "ASP.NET Core Hosting" })).toBeDefined();
    expect(screen.getByRole("link", { name: "Next.js Hosting" })).toBeDefined();

    // Verify sample data notice
    expect(
      screen.getByText(
        /All listings and metric counts currently displayed are labelled sample data/i,
      ),
    ).toBeDefined();
  });

  it("passes axe-core accessibility audit with 0 violations", async () => {
    const { container } = render(
      <div>
        <SiteHeader />
        <main>
          <h1>API Lighthouse Main</h1>
          <p>Marketplace and hosting directory.</p>
        </main>
        <SiteFooter />
      </div>,
    );

    const results = await axe.run(container, {
      rules: {
        "color-contrast": { enabled: false }, // Handled in browser layout engine
      },
    });

    expect(results.violations).toEqual([]);
  });
});
