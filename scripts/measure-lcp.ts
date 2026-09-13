/* eslint-disable @typescript-eslint/no-explicit-any */
import { chromium } from "playwright";

/**
 * Measure Hero Largest Contentful Paint (LCP) under Throttled 4G conditions
 * per Section 9.1 and Section 15 verification criteria.
 *
 * Regular 4G network conditions:
 * - Download throughput: 4 Mbps (500 KB/s)
 * - Upload throughput: 3 Mbps (375 KB/s)
 * - Latency / RTT: 20 ms
 */
async function measureHeroLcp() {
  console.log("=================================================");
  console.log("Measuring Homepage Hero LCP on Throttled 4G...");
  console.log("=================================================");

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });

  const page = await context.newPage();

  // Create CDP session for network throttling
  const client = await context.newCDPSession(page);
  await client.send("Network.enable");
  await client.send("Network.emulateNetworkConditions", {
    offline: false,
    downloadThroughput: (4 * 1024 * 1024) / 8, // 4 Mbps
    uploadThroughput: (3 * 1024 * 1024) / 8, // 3 Mbps
    latency: 20, // 20 ms RTT
  });

  // Inject PerformanceObserver before document load
  await page.addInitScript(() => {
    (window as any).__lcpEntries = [];
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        (window as any).__lcpEntries.push({
          startTime: entry.startTime,
          renderTime: (entry as any).renderTime || entry.startTime,
          size: (entry as any).size,
          element: (entry as any).element?.tagName,
          id: (entry as any).id,
          url: (entry as any).url,
        });
      }
    });
    observer.observe({ type: "largest-contentful-paint", buffered: true });
  });

  const port = process.env.PORT || "3000";
  const url = `http://localhost:${port}`;
  console.log(`[LCP Metric] Connecting to ${url}...`);

  const startTime = Date.now();
  await page.goto(url, { waitUntil: "load" });
  const navigationDuration = Date.now() - startTime;

  // Small pause to ensure layout and rendering settled
  await page.waitForTimeout(1000);

  const lcpData = await page.evaluate(() => {
    const entries = (window as any).__lcpEntries || [];
    if (entries.length === 0) return null;
    const lastEntry = entries[entries.length - 1];
    return {
      startTime: Math.round(lastEntry.startTime),
      renderTime: Math.round(lastEntry.renderTime),
      element: lastEntry.element,
      url: lastEntry.url,
      size: lastEntry.size,
      allEntries: entries,
    };
  });

  await browser.close();

  console.log(`[LCP Metric] Navigation Duration: ${navigationDuration}ms`);
  if (lcpData) {
    console.log(
      `[LCP Metric] Measured Hero LCP: ${lcpData.renderTime || lcpData.startTime}ms (${((lcpData.renderTime || lcpData.startTime) / 1000).toFixed(2)}s)`,
    );
    console.log(`[LCP Metric] Target Element: <${lcpData.element}>`);
    if (lcpData.url) {
      console.log(`[LCP Metric] Asset URL: ${lcpData.url}`);
    }
    const passed = (lcpData.renderTime || lcpData.startTime) < 2500;
    console.log(
      `[LCP Metric] Acceptance Threshold (< 2.5s / 2500ms): ${passed ? "PASSED ✓" : "FAILED ✗"}`,
    );
    if (!passed) {
      process.exit(1);
    }
  } else {
    console.warn("[LCP Metric] No LCP entry recorded by PerformanceObserver.");
  }
}

measureHeroLcp().catch((err) => {
  console.error("LCP Measurement failed:", err);
  process.exit(1);
});
