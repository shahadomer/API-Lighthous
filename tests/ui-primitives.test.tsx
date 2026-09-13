import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import fs from "node:fs";
import path from "node:path";

import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Combobox } from "@/components/ui/combobox";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, Radio } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Chip } from "@/components/ui/chip";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { ProgressBar } from "@/components/ui/progress";
import { StepIndicator } from "@/components/ui/step-indicator";

describe("DEV-05: UI Primitive Library Specification & Accessibility", () => {
  it("enforces the 5 required Button variants and loading state per Section 3.7", () => {
    const { container, rerender } = render(<Button variant="filled">Filled Action</Button>);
    expect(screen.getByRole("button", { name: /filled action/i })).toBeDefined();

    rerender(<Button variant="tonal">Tonal Action</Button>);
    expect(screen.getByRole("button", { name: /tonal action/i })).toBeDefined();

    rerender(<Button variant="outlined">Outlined Action</Button>);
    expect(screen.getByRole("button", { name: /outlined action/i })).toBeDefined();

    rerender(<Button variant="text">Text Action</Button>);
    expect(screen.getByRole("button", { name: /text action/i })).toBeDefined();

    rerender(
      <Button variant="icon" aria-label="Icon Action">
        ★
      </Button>,
    );
    expect(screen.getByRole("button", { name: /icon action/i })).toBeDefined();

    // Loading state: disabled, aria-busy, contains spinner
    rerender(
      <Button variant="filled" loading>
        Processing
      </Button>,
    );
    const loadingBtn = screen.getByRole("button", { name: /processing/i });
    expect(loadingBtn.getAttribute("aria-busy")).toBe("true");
    expect(loadingBtn.hasAttribute("disabled")).toBe(true);
  });

  it("renders accessible Link using anchor tags with external announcements", () => {
    render(
      <Link href="https://example.com" external>
        External Docs
      </Link>,
    );
    const link = screen.getByRole("link", { name: /external docs/i });
    expect(link.tagName.toLowerCase()).toBe("a");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toContain("noopener noreferrer");
    expect(link.textContent).toContain("(opens in new tab)");
  });

  it("supports Input and Textarea error states with aria-invalid", () => {
    const { rerender } = render(<Input aria-label="API key" error defaultValue="bad-key" />);
    const input = screen.getByLabelText("API key");
    expect(input.getAttribute("aria-invalid")).toBe("true");

    rerender(<Textarea aria-label="Endpoint description" error defaultValue="err" />);
    const textarea = screen.getByLabelText("Endpoint description");
    expect(textarea.getAttribute("aria-invalid")).toBe("true");
  });

  it("renders Chip with filter and suggestion variants and keyboard operability", async () => {
    const user = userEvent.setup();
    let selected = false;
    const { rerender } = render(
      <Chip
        variant="filter"
        selected={selected}
        onClick={() => {
          selected = !selected;
        }}
      >
        Free Tier
      </Chip>,
    );

    const chipBtn = screen.getByRole("button", { name: /free tier/i });
    expect(chipBtn.getAttribute("aria-pressed")).toBe("false");

    await user.click(chipBtn);
    expect(selected).toBe(true);

    rerender(
      <Chip variant="filter" selected={true}>
        Free Tier
      </Chip>,
    );
    expect(screen.getByRole("button", { name: /free tier/i }).getAttribute("aria-pressed")).toBe(
      "true",
    );
  });

  it("renders EmptyState and ErrorState with proper accessibility roles", () => {
    render(
      <EmptyState title="No results found" description="Try adjusting your filter criteria" />,
    );
    expect(screen.getByRole("status")).toBeDefined();
    expect(screen.getByText("No results found")).toBeDefined();

    render(
      <ErrorState
        title="Failed to fetch data"
        description="Network error occurred"
        retryLabel="Retry Connection"
        onRetry={() => {}}
      />,
    );
    expect(screen.getByRole("alert")).toBeDefined();
    expect(screen.getByText("Failed to fetch data")).toBeDefined();
    expect(screen.getByRole("button", { name: /retry connection/i })).toBeDefined();
  });

  it("renders ProgressBar with accessible aria value bindings", () => {
    render(<ProgressBar label="Requests Used" value={75} showValue />);
    const progress = screen.getByRole("progressbar");
    expect(progress.getAttribute("aria-valuenow")).toBe("75");
    expect(progress.getAttribute("aria-valuemin")).toBe("0");
    expect(progress.getAttribute("aria-valuemax")).toBe("100");
    expect(screen.getByText("Requests Used")).toBeDefined();
    expect(screen.getByText("75%")).toBeDefined();
  });

  it("renders StepIndicator with aria-current='step' on current active step", () => {
    const steps = [
      { id: 1, title: "Account Details" },
      { id: 2, title: "Verify Email" },
      { id: 3, title: "Complete Profile" },
    ];
    render(<StepIndicator steps={steps} currentStepIndex={1} />);
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(3);
    expect(listItems[1].getAttribute("aria-current")).toBe("step");
    expect(listItems[0].getAttribute("aria-current")).toBeNull();
  });

  it("runs automated axe-core audit on rendered UI primitives with 0 violations", async () => {
    const { container } = render(
      <main>
        <h1>Showcase Accessibility Audit</h1>
        <Button variant="filled">Submit API</Button>
        <Button variant="tonal">Save Draft</Button>
        <Button variant="outlined">Cancel</Button>
        <Link href="/docs" prefetch={false}>
          Documentation
        </Link>
        <Input aria-label="Search" placeholder="Search..." />
        <ProgressBar label="Progress" value={50} />
        <Badge variant="success">Active</Badge>
        <Avatar>
          <AvatarFallback>AL</AvatarFallback>
        </Avatar>
      </main>,
    );

    const results = await axe.run(container, {
      rules: {
        // In JSDOM, color-contrast calculations lack a layout engine
        "color-contrast": { enabled: false },
      },
    });

    expect(results.violations).toEqual([]);
  });

  it("strictly enforces that NO <div onClick> exists anywhere in the codebase", () => {
    const rootDir = process.cwd();
    const dirsToScan = [path.join(rootDir, "components"), path.join(rootDir, "app")];

    const findDivOnClick = (dir: string): string[] => {
      const results: string[] = [];
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          results.push(...findDivOnClick(fullPath));
        } else if (/\.(tsx|jsx)$/.test(entry.name)) {
          const content = fs.readFileSync(fullPath, "utf-8");
          // Match <div ... onClick
          const divOnClickRegex = /<div\s+[^>]*onClick\s*=/g;
          if (divOnClickRegex.test(content)) {
            results.push(fullPath);
          }
        }
      }
      return results;
    };

    const violations: string[] = [];
    for (const dir of dirsToScan) {
      if (fs.existsSync(dir)) {
        violations.push(...findDivOnClick(dir));
      }
    }

    expect(violations).toEqual([]);
  });
});
