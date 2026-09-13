import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";

const GENERATED_DIR = path.resolve(process.cwd(), "public/images/generated");
const MANIFEST_PATH = path.join(GENERATED_DIR, "manifest.json");

const SHOT_IDS = [
  { id: "hero-catalog", group: "hero" },
  { id: "hero-detail", group: "hero" },
  { id: "hero-dashboard", group: "hero" },
  { id: "door-marketplace", group: "door" },
  { id: "door-host", group: "door" },
  { id: "door-directory", group: "door" },
] as const;

describe("DEV-08 Screenshot Pipeline & Assets", () => {
  it("generates the manifest.json with all 6 compositions", () => {
    expect(fs.existsSync(MANIFEST_PATH)).toBe(true);
    const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
    expect(Array.isArray(manifest)).toBe(true);
    expect(manifest).toHaveLength(6);

    for (const item of manifest) {
      expect(item.id).toBeDefined();
      expect(item.group).toMatch(/^(hero|door)$/);
      expect(item.alt).toBeTruthy();
      expect(item.width).toBeGreaterThan(0);
      expect(item.height).toBeGreaterThan(0);
      expect(item.files.avif1x).toBeDefined();
      expect(item.files.avif2x).toBeDefined();
      expect(item.files.webp1x).toBeDefined();
      expect(item.files.webp2x).toBeDefined();
      expect(item.files.png).toBeDefined();
    }
  });

  describe("File existence for all required formats and densities", () => {
    for (const shot of SHOT_IDS) {
      it(`includes all asset variants for [${shot.group}] ${shot.id}`, () => {
        const files = [
          `${shot.id}.png`,
          `${shot.id}.avif`,
          `${shot.id}@2x.avif`,
          `${shot.id}.webp`,
          `${shot.id}@2x.webp`,
        ];

        for (const file of files) {
          const filePath = path.join(GENERATED_DIR, file);
          expect(fs.existsSync(filePath), `Missing ${file}`).toBe(true);
          const stat = fs.statSync(filePath);
          expect(stat.size).toBeGreaterThan(500); // Must not be empty or truncated
        }
      });
    }
  });

  describe("Budget constraints compliance (Section 6.3 & Section 15)", () => {
    it("satisfies the hero group combined AVIF budget (< 220 KB)", () => {
      const heroShots = ["hero-catalog", "hero-detail", "hero-dashboard"];
      let combinedBytes = 0;

      for (const id of heroShots) {
        const filePath = path.join(GENERATED_DIR, `${id}.avif`);
        const stat = fs.statSync(filePath);
        combinedBytes += stat.size;
      }

      const combinedKb = combinedBytes / 1024;
      // Section 15 acceptance criteria: all three hero images combined, under 220KB after AVIF encoding
      expect(combinedKb).toBeLessThan(220);
    });

    it("satisfies the door group individual AVIF budget (< 120 KB each)", () => {
      const doorShots = ["door-marketplace", "door-host", "door-directory"];

      for (const id of doorShots) {
        const filePath = path.join(GENERATED_DIR, `${id}.avif`);
        const stat = fs.statSync(filePath);
        const kb = stat.size / 1024;
        // Section 15 acceptance criteria: each door image (below-fold) under 120KB
        expect(kb).toBeLessThan(120);
      }
    });
  });

  describe("Accessible alternative text metadata", () => {
    it("provides informative, meaningful alt text for each screenshot", () => {
      const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
      for (const item of manifest) {
        // Must describe content, not just say "screenshot"
        expect(item.alt.length).toBeGreaterThan(15);
        expect(item.alt.toLowerCase()).not.toBe("screenshot");
      }
    });
  });
});
