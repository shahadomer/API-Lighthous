import { describe, it, expect, beforeAll, afterAll } from "vitest";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq, sql } from "drizzle-orm";
import * as schema from "@/db/schema";

const connectionString =
  process.env.DATABASE_URL || "postgresql://apilh:apilh_dev@localhost:5433/api_lighthouse_dev";

describe("DEV-06: Database Schema, Migrations, and Seeded Fixtures", () => {
  let client: postgres.Sql;
  let db: ReturnType<typeof drizzle>;
  let isDbAvailable = false;

  beforeAll(async () => {
    try {
      client = postgres(connectionString, { max: 1, connect_timeout: 3 });
      await client`SELECT 1`;
      db = drizzle(client, { schema });
      isDbAvailable = true;
    } catch {
      isDbAvailable = false;
    }
  });

  afterAll(async () => {
    if (client) {
      await client.end();
    }
  });

  it("verifies local PostgreSQL connection and active status", () => {
    expect(isDbAvailable).toBe(true);
  });

  it("verifies all 10 required tables exist per Section 12.3 and ADR 002", async () => {
    if (!isDbAvailable) return;

    const tablesResult = await client`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;

    const tableNames = tablesResult.map((r) => r.table_name);
    const expectedTables = [
      "users",
      "accounts",
      "sessions",
      "categories",
      "providers",
      "apis",
      "api_versions",
      "endpoints",
      "plans",
      "saved_apis",
    ];

    for (const expected of expectedTables) {
      expect(tableNames).toContain(expected);
    }
  });

  it("verifies created_at and updated_at exist across all persistent tables", async () => {
    if (!isDbAvailable) return;

    const columnsResult = await client`
      SELECT table_name, column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
        AND column_name IN ('created_at', 'updated_at')
    `;

    const expectedTables = [
      "users",
      "accounts",
      "sessions",
      "categories",
      "providers",
      "apis",
      "api_versions",
      "endpoints",
      "plans",
      "saved_apis",
    ];

    for (const table of expectedTables) {
      const tableCols = columnsResult
        .filter((r) => r.table_name === table)
        .map((r) => r.column_name);
      expect(tableCols).toContain("created_at");
      expect(tableCols).toContain("updated_at");
    }
  });

  it("enforces api_status enum values per Section 12.3", async () => {
    if (!isDbAvailable) return;

    const enumResult = await client`
      SELECT enumlabel 
      FROM pg_enum e 
      JOIN pg_type t ON e.enumtypid = t.oid 
      WHERE t.typname = 'api_status'
      ORDER BY e.enumsortorder
    `;

    const labels = enumResult.map((r) => r.enumlabel);
    expect(labels).toEqual([
      "draft",
      "submitted",
      "changes_requested",
      "published",
      "suspended",
      "retired",
    ]);
  });

  it("verifies apis table contains last_reviewed_at per Section 11.3", async () => {
    if (!isDbAvailable) return;

    const colResult = await client`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'public' 
        AND table_name = 'apis' 
        AND column_name = 'last_reviewed_at'
    `;

    expect(colResult.length).toBe(1);
    expect(colResult[0].column_name).toBe("last_reviewed_at");
  });

  it("verifies all seeded fixtures are labelled as sample data (is_sample_data: true)", async () => {
    if (!isDbAvailable) return;

    const seededApis = await db.select().from(schema.apis);
    expect(seededApis.length).toBeGreaterThanOrEqual(9);

    for (const api of seededApis) {
      expect(api.isSampleData).toBe(true);
      expect(api.status).toBe("published");
      expect(api.lastReviewedAt).not.toBeNull();
    }
  });

  it("verifies provider names in fixtures are strictly fictional per Section 6.4", async () => {
    if (!isDbAvailable) return;

    const seededProviders = await db.select().from(schema.providers);
    const providerNames = seededProviders.map((p) => p.name);

    expect(providerNames).toContain("Northwind Aviation");
    expect(providerNames).toContain("Meridian Data");
    expect(providerNames).toContain("Halcyon SMS");
    expect(providerNames).toContain("Beacon Weather Systems");
    expect(providerNames).toContain("Ledger Labs");
    expect(providerNames).toContain("Orbit Telemetry");

    for (const provider of seededProviders) {
      expect(provider.isSampleData).toBe(true);
      expect(provider.description).toContain("[SAMPLE DATA");
    }
  });

  it("verifies relational integrity across APIs, endpoints, and plans", async () => {
    if (!isDbAvailable) return;

    const flightStatus = await db
      .select()
      .from(schema.apis)
      .where(eq(schema.apis.slug, "flight-status"))
      .limit(1);

    expect(flightStatus.length).toBe(1);
    const apiId = flightStatus[0].id;

    // Verify endpoints
    const epList = await db
      .select()
      .from(schema.endpoints)
      .where(eq(schema.endpoints.apiId, apiId));
    expect(epList.length).toBeGreaterThanOrEqual(2);
    expect(epList[0].sampleResponseJson).toBeDefined();

    // Verify plans
    const planList = await db.select().from(schema.plans).where(eq(schema.plans.apiId, apiId));
    expect(planList.length).toBeGreaterThanOrEqual(3);

    // Verify versions
    const verList = await db
      .select()
      .from(schema.apiVersions)
      .where(eq(schema.apiVersions.apiId, apiId));
    expect(verList.length).toBeGreaterThanOrEqual(2);
  });
});
