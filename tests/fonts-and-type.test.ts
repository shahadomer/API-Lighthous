import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("DEV-04: Font self-hosting and typography scale verification", () => {
  const rootDir = process.cwd();

  it("has exactly two WOFF2 variable font files in app/fonts", () => {
    const fontsDir = path.join(rootDir, "app", "fonts");
    expect(fs.existsSync(fontsDir)).toBe(true);

    const files = fs.readdirSync(fontsDir);
    expect(files.sort()).toEqual(["Inter-Variable.woff2", "JetBrainsMono-Variable.woff2"].sort());

    for (const file of files) {
      const filePath = path.join(fontsDir, file);
      const stat = fs.statSync(filePath);
      expect(stat.isFile()).toBe(true);
      expect(stat.size).toBeGreaterThan(10000);
      const buffer = fs.readFileSync(filePath);
      const magic = buffer.toString("ascii", 0, 4);
      expect(magic).toBe("wOF2");
    }
  });

  it("documents SIL Open Font License 1.1 and both authors in docs/licences.md", () => {
    const licencePath = path.join(rootDir, "docs", "licences.md");
    expect(fs.existsSync(licencePath)).toBe(true);

    const content = fs.readFileSync(licencePath, "utf-8");
    expect(content).toContain("Inter");
    expect(content).toContain("Rasmus Andersson");
    expect(content).toContain("JetBrains Mono");
    expect(content).toContain("Philipp Nurullin");
    expect(content).toContain("SIL Open Font License, Version 1.1");
    expect(content).toContain("OFL-1.1");
  });

  it("configures next/font/local in app/layout.tsx with exact fallback stacks", () => {
    const layoutPath = path.join(rootDir, "app", "layout.tsx");
    expect(fs.existsSync(layoutPath)).toBe(true);

    const layoutContent = fs.readFileSync(layoutPath, "utf-8");
    expect(layoutContent).toContain('import localFont from "next/font/local"');
    expect(layoutContent).toContain('"./fonts/Inter-Variable.woff2"');
    expect(layoutContent).toContain('"./fonts/JetBrainsMono-Variable.woff2"');
    expect(layoutContent).toContain('variable: "--font-sans"');
    expect(layoutContent).toContain('variable: "--font-mono"');
    expect(layoutContent).toContain('display: "swap"');
    expect(layoutContent).toContain("ui-sans-serif");
    expect(layoutContent).toContain("system-ui");
    expect(layoutContent).toContain("-apple-system");
    expect(layoutContent).toContain("Segoe UI");
    expect(layoutContent).toContain("ui-monospace");
    expect(layoutContent).toContain("SFMono-Regular");
    expect(layoutContent).toContain("Menlo");
    expect(layoutContent).toContain("monospace");
  });

  it("defines full type scale table tokens in app/globals.css matching Section 3.3", () => {
    const cssPath = path.join(rootDir, "app", "globals.css");
    expect(fs.existsSync(cssPath)).toBe(true);

    const cssContent = fs.readFileSync(cssPath, "utf-8");

    // Display XL: 72px desktop / 40px mobile, weight 600, tracking -0.03em, leading 1.05
    expect(cssContent).toContain("--type-display-xl-size: 4.5rem");
    expect(cssContent).toContain("--type-display-xl-size-mobile: 2.5rem");
    expect(cssContent).toContain("--type-display-xl-weight: 600");
    expect(cssContent).toContain("--type-display-xl-tracking: -0.03em");
    expect(cssContent).toContain("--type-display-xl-leading: 1.05");

    // Display L: 48px desktop / 32px mobile, weight 600, tracking -0.02em, leading 1.12
    expect(cssContent).toContain("--type-display-l-size: 3rem");
    expect(cssContent).toContain("--type-display-l-size-mobile: 2rem");
    expect(cssContent).toContain("--type-display-l-weight: 600");
    expect(cssContent).toContain("--type-display-l-tracking: -0.02em");
    expect(cssContent).toContain("--type-display-l-leading: 1.12");

    // Heading M: 30px desktop / 24px mobile, weight 600, tracking -0.015em, leading 1.25
    expect(cssContent).toContain("--type-heading-m-size: 1.875rem");
    expect(cssContent).toContain("--type-heading-m-size-mobile: 1.5rem");
    expect(cssContent).toContain("--type-heading-m-weight: 600");
    expect(cssContent).toContain("--type-heading-m-tracking: -0.015em");
    expect(cssContent).toContain("--type-heading-m-leading: 1.25");

    // Heading S: 20px desktop / 18px mobile, weight 600, tracking -0.01em, leading 1.35
    expect(cssContent).toContain("--type-heading-s-size: 1.25rem");
    expect(cssContent).toContain("--type-heading-s-size-mobile: 1.125rem");
    expect(cssContent).toContain("--type-heading-s-weight: 600");
    expect(cssContent).toContain("--type-heading-s-tracking: -0.01em");
    expect(cssContent).toContain("--type-heading-s-leading: 1.35");

    // Body L: 20px desktop / 17px mobile, weight 400, tracking 0, leading 1.55
    expect(cssContent).toContain("--type-body-l-size: 1.25rem");
    expect(cssContent).toContain("--type-body-l-size-mobile: 1.0625rem");
    expect(cssContent).toContain("--type-body-l-weight: 400");
    expect(cssContent).toContain("--type-body-l-leading: 1.55");

    // Body M: 17px desktop / 16px mobile, weight 400, tracking 0, leading 1.6
    expect(cssContent).toContain("--type-body-m-size: 1.0625rem");
    expect(cssContent).toContain("--type-body-m-size-mobile: 1rem");
    expect(cssContent).toContain("--type-body-m-weight: 400");
    expect(cssContent).toContain("--type-body-m-leading: 1.6");

    // Body S: 15px desktop / 14px mobile, weight 400, tracking 0, leading 1.5
    expect(cssContent).toContain("--type-body-s-size: 0.9375rem");
    expect(cssContent).toContain("--type-body-s-size-mobile: 0.875rem");
    expect(cssContent).toContain("--type-body-s-weight: 400");
    expect(cssContent).toContain("--type-body-s-leading: 1.5");

    // Label: 15px desktop / 15px mobile, weight 550, tracking 0.01em, leading 1.2
    expect(cssContent).toContain("--type-label-size: 0.9375rem");
    expect(cssContent).toContain("--type-label-size-mobile: 0.9375rem");
    expect(cssContent).toContain("--type-label-weight: 550");
    expect(cssContent).toContain("--type-label-tracking: 0.01em");
    expect(cssContent).toContain("--type-label-leading: 1.2");

    // Code: 14px desktop / 13px mobile, weight 450, tracking 0, leading 1.65
    expect(cssContent).toContain("--type-code-size: 0.875rem");
    expect(cssContent).toContain("--type-code-size-mobile: 0.8125rem");
    expect(cssContent).toContain("--type-code-weight: 450");
    expect(cssContent).toContain("--type-code-leading: 1.65");

    // Utilities
    expect(cssContent).toContain(".text-display-xl");
    expect(cssContent).toContain(".type-display-xl");
    expect(cssContent).toContain(".text-display-l");
    expect(cssContent).toContain(".text-heading-m");
    expect(cssContent).toContain(".text-heading-s");
    expect(cssContent).toContain(".text-body-l");
    expect(cssContent).toContain(".text-body-m");
    expect(cssContent).toContain(".text-body-s");
    expect(cssContent).toContain(".text-label");
    expect(cssContent).toContain(".text-code");
    expect(cssContent).toContain(".font-label");
    expect(cssContent).toContain(".font-code");
    expect(cssContent).toContain(".measure-prose");
  });
});
