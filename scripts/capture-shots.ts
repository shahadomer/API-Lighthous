import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { spawn, type ChildProcess } from "node:child_process";
import { chromium, type Browser, type Page } from "playwright";
import sharp from "sharp";

interface ShotDefinition {
  id: string;
  group: "hero" | "door";
  width: number;
  height: number;
  alt: string;
}

const ALL_SHOTS: ShotDefinition[] = [
  {
    id: "hero-catalog",
    group: "hero",
    width: 1280,
    height: 840,
    alt: "API catalog grid showing verified listings, filter rail, and search populated with flight status",
  },
  {
    id: "hero-detail",
    group: "hero",
    width: 1280,
    height: 840,
    alt: "API detail page showing endpoints, authentication method, and live JSON response preview",
  },
  {
    id: "hero-dashboard",
    group: "hero",
    width: 1280,
    height: 800,
    alt: "Provider dashboard composition showing listings with Published, In review, and Draft status pills",
  },
  {
    id: "door-marketplace",
    group: "door",
    width: 800,
    height: 520,
    alt: "API marketplace pricing plans panel with tiered developer and enterprise options",
  },
  {
    id: "door-host",
    group: "door",
    width: 800,
    height: 520,
    alt: "Hosting terminal displaying deployment logs beside a multi-step live deployment stepper",
  },
  {
    id: "door-directory",
    group: "door",
    width: 800,
    height: 520,
    alt: "Directory list view highlighting free tier and public open API services",
  },
];

const OUTPUT_DIR = path.resolve(process.cwd(), "public/images/generated");
const HERO_BUDGET_KB = 220; // 3 hero images combined under 220KB
const DOOR_BUDGET_KB = 120; // Each door image under 120KB

function checkUrlLive(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(1500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function ensureDevServer(
  port: number,
): Promise<{ baseUrl: string; serverProcess?: ChildProcess }> {
  const baseUrl = `http://localhost:${port}`;
  const isAlreadyRunning = await checkUrlLive(`${baseUrl}/dev/shots`);
  if (isAlreadyRunning) {
    console.log(`✓ Reusing active server at ${baseUrl}`);
    return { baseUrl };
  }

  console.log(`Starting Next.js dev server on port ${port}...`);
  const bunCmd = process.platform === "win32" ? "bun.exe" : "bun";
  const child = spawn(bunCmd, ["next", "dev", "-p", String(port)], {
    env: { ...process.env, ENABLE_DEV_SHOTS: "true", NODE_ENV: "development" },
    stdio: "pipe",
    shell: true,
  });

  const maxAttempts = 40;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    await new Promise((r) => setTimeout(r, 1000));
    const live = await checkUrlLive(`${baseUrl}/dev/shots`);
    if (live) {
      console.log(`✓ Dev server ready at ${baseUrl} (after ${attempt}s)`);
      return { baseUrl, serverProcess: child };
    }
  }

  child.kill();
  throw new Error(`Server failed to start at ${baseUrl} within 40 seconds`);
}

async function captureShot(
  page: Page,
  baseUrl: string,
  shot: ShotDefinition,
): Promise<{
  id: string;
  group: "hero" | "door";
  dimensions: { width: number; height: number };
  pngPath: string;
  avif1xPath: string;
  avif2xPath: string;
  webp1xPath: string;
  webp2xPath: string;
  sizes: {
    png: number;
    avif1x: number;
    avif2x: number;
    webp1x: number;
    webp2x: number;
  };
}> {
  console.log(`\n📸 Capturing [${shot.group}] ${shot.id}...`);
  const targetUrl = `${baseUrl}/dev/shots?shot=${shot.id}`;

  await page.setViewportSize({
    width: shot.width,
    height: shot.height,
  });

  await page.goto(targetUrl, { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#shot-canvas");

  // Ensure fonts and animations settle
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 600));

  const canvas = page.locator("#shot-canvas");
  const boundingBox = await canvas.boundingBox();
  if (!boundingBox) {
    throw new Error(`Could not find bounding box for #shot-canvas on ${shot.id}`);
  }

  const rawPngBuffer = await canvas.screenshot({
    type: "png",
    animations: "disabled",
  });

  const pngPath = path.join(OUTPUT_DIR, `${shot.id}.png`);
  fs.writeFileSync(pngPath, rawPngBuffer);

  // Read metadata from 2x captured screenshot
  const imageInfo = await sharp(rawPngBuffer).metadata();
  const width2x = imageInfo.width || shot.width * 2;
  const height2x = imageInfo.height || shot.height * 2;
  const width1x = Math.round(width2x / 2);
  const height1x = Math.round(height2x / 2);

  // 1. AVIF @2x
  const avif2xPath = path.join(OUTPUT_DIR, `${shot.id}@2x.avif`);
  const avif2xBuffer = await sharp(rawPngBuffer).avif({ quality: 72, effort: 5 }).toBuffer();
  fs.writeFileSync(avif2xPath, avif2xBuffer);

  // 2. AVIF @1x
  const avif1xPath = path.join(OUTPUT_DIR, `${shot.id}.avif`);
  const avif1xBuffer = await sharp(rawPngBuffer)
    .resize(width1x, height1x, { fit: "inside" })
    .avif({ quality: 72, effort: 5 })
    .toBuffer();
  fs.writeFileSync(avif1xPath, avif1xBuffer);

  // 3. WebP @2x
  const webp2xPath = path.join(OUTPUT_DIR, `${shot.id}@2x.webp`);
  const webp2xBuffer = await sharp(rawPngBuffer).webp({ quality: 80, effort: 5 }).toBuffer();
  fs.writeFileSync(webp2xPath, webp2xBuffer);

  // 4. WebP @1x
  const webp1xPath = path.join(OUTPUT_DIR, `${shot.id}.webp`);
  const webp1xBuffer = await sharp(rawPngBuffer)
    .resize(width1x, height1x, { fit: "inside" })
    .webp({ quality: 80, effort: 5 })
    .toBuffer();
  fs.writeFileSync(webp1xPath, webp1xBuffer);

  const sizes = {
    png: rawPngBuffer.length,
    avif1x: avif1xBuffer.length,
    avif2x: avif2xBuffer.length,
    webp1x: webp1xBuffer.length,
    webp2x: webp2xBuffer.length,
  };

  console.log(`  ✓ Rendered ${width1x}x${height1x} (1x) & ${width2x}x${height2x} (2x)`);
  console.log(
    `  → AVIF 1x: ${(sizes.avif1x / 1024).toFixed(1)} KB | 2x: ${(sizes.avif2x / 1024).toFixed(1)} KB`,
  );
  console.log(
    `  → WebP 1x: ${(sizes.webp1x / 1024).toFixed(1)} KB | 2x: ${(sizes.webp2x / 1024).toFixed(1)} KB`,
  );

  return {
    id: shot.id,
    group: shot.group,
    dimensions: { width: width1x, height: height1x },
    pngPath,
    avif1xPath,
    avif2xPath,
    webp1xPath,
    webp2xPath,
    sizes,
  };
}

async function main() {
  const args = process.argv.slice(2).filter((a) => a !== "--");
  const filterArg = args[0]?.toLowerCase();

  let targetShots = ALL_SHOTS;
  if (filterArg === "hero") {
    targetShots = ALL_SHOTS.filter((s) => s.group === "hero");
  } else if (filterArg === "door") {
    targetShots = ALL_SHOTS.filter((s) => s.group === "door");
  } else if (filterArg) {
    targetShots = ALL_SHOTS.filter((s) => s.id === filterArg);
    if (targetShots.length === 0) {
      console.error(
        `Unknown shot or group '${filterArg}'. Valid choices: hero, door, ${ALL_SHOTS.map((s) => s.id).join(", ")}`,
      );
      process.exit(1);
    }
  }

  console.log("==================================================");
  console.log(`🎬 API Lighthouse Screenshot Pipeline (DEV-08)`);
  console.log(`Targeting ${targetShots.length} composition(s) [Filter: ${filterArg || "all"}]`);
  console.log("==================================================");

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const port = Number(process.env.PORT) || 3000;
  const { baseUrl, serverProcess } = await ensureDevServer(port);

  let browser: Browser | null = null;

  try {
    browser = await chromium.launch({
      headless: true,
    });

    const context = await browser.newContext({
      deviceScaleFactor: 2, // Capture high-density 2x assets
      colorScheme: "light",
    });

    const page = await context.newPage();
    const results = [];

    for (const shot of targetShots) {
      const result = await captureShot(page, baseUrl, shot);
      results.push(result);
    }

    // Report and budget checks
    console.log("\n==================================================");
    console.log("📊 Screenshot Pipeline & Budget Audit Summary");
    console.log("==================================================");

    let heroAvif1xTotal = 0;
    let heroAvif2xTotal = 0;
    let allPassed = true;

    for (const r of results) {
      const avif1xKb = r.sizes.avif1x / 1024;
      const avif2xKb = r.sizes.avif2x / 1024;
      const webp1xKb = r.sizes.webp1x / 1024;

      if (r.group === "hero") {
        heroAvif1xTotal += avif1xKb;
        heroAvif2xTotal += avif2xKb;
      }

      let budgetCheck = "PASS";
      if (r.group === "door" && avif1xKb > DOOR_BUDGET_KB) {
        budgetCheck = `FAIL (> ${DOOR_BUDGET_KB}KB)`;
        allPassed = false;
      }

      console.log(
        `- ${r.id.padEnd(18)}: AVIF 1x = ${avif1xKb.toFixed(1).padStart(5)} KB | 2x = ${avif2xKb.toFixed(1).padStart(5)} KB | WebP 1x = ${webp1xKb.toFixed(1).padStart(5)} KB [${budgetCheck}]`,
      );
    }

    if (results.some((r) => r.group === "hero")) {
      const heroBudgetCheck =
        heroAvif1xTotal < HERO_BUDGET_KB
          ? `PASS (< ${HERO_BUDGET_KB} KB)`
          : `FAIL (>= ${HERO_BUDGET_KB} KB)`;
      console.log("--------------------------------------------------");
      console.log(
        `Hero Group (3 images) Combined AVIF 1x: ${heroAvif1xTotal.toFixed(1)} KB [Budget: < ${HERO_BUDGET_KB} KB] → ${heroBudgetCheck}`,
      );
      console.log(`Hero Group (3 images) Combined AVIF 2x: ${heroAvif2xTotal.toFixed(1)} KB`);
      if (heroAvif1xTotal >= HERO_BUDGET_KB) {
        allPassed = false;
      }
    }

    // Save metadata manifest to public/images/generated/manifest.json (merging with existing)
    const manifestPath = path.join(OUTPUT_DIR, "manifest.json");
    let existingManifest: Array<{ id: string; [key: string]: unknown }> = [];
    if (fs.existsSync(manifestPath)) {
      try {
        existingManifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
      } catch {
        existingManifest = [];
      }
    }

    const manifestMap = new Map(existingManifest.map((item) => [item.id, item]));
    for (const r of results) {
      const shotDef = ALL_SHOTS.find((s) => s.id === r.id)!;
      manifestMap.set(r.id, {
        id: r.id,
        group: r.group,
        alt: shotDef.alt,
        width: r.dimensions.width,
        height: r.dimensions.height,
        files: {
          png: `${r.id}.png`,
          avif1x: `${r.id}.avif`,
          avif2x: `${r.id}@2x.avif`,
          webp1x: `${r.id}.webp`,
          webp2x: `${r.id}@2x.webp`,
        },
        sizesBytes: r.sizes,
      });
    }

    const manifest = ALL_SHOTS.map((s) => manifestMap.get(s.id)).filter(Boolean);
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`Manifest written to ${manifestPath}`);

    console.log("==================================================");
    if (!allPassed) {
      console.error("❌ Budget check failed!");
      process.exit(1);
    } else {
      console.log("✅ All screenshot budgets satisfied!");
    }
  } finally {
    if (browser) {
      await browser.close();
    }
    if (serverProcess) {
      console.log("Stopping dev server process...");
      serverProcess.kill();
    }
  }
}

main().catch((err) => {
  console.error("Screenshot capture pipeline failed:", err);
  process.exit(1);
});
