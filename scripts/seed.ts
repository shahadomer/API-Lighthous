import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";
import {
  users,
  categories,
  providers,
  apis,
  apiVersions,
  endpoints,
  plans,
  savedApis,
} from "../db/schema";
import { fixtureCategories, fixtureProviders } from "../content/fixtures/sample-catalog";

async function runSeed() {
  const connectionString =
    process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/api_lighthouse_dev";

  console.log(
    `[db:seed] Connecting to database at ${connectionString.replace(/:[^:@]+@/, ":***@")}...`,
  );
  const sql = postgres(connectionString, { max: 1 });
  const db = drizzle(sql);

  console.log(`[db:seed] Seeding categories...`);
  const categoryIdMap = new Map<string, string>();

  for (const cat of fixtureCategories) {
    const existing = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.slug, cat.slug))
      .limit(1);

    if (existing.length > 0) {
      categoryIdMap.set(cat.slug, existing[0].id);
      await db
        .update(categories)
        .set({
          name: cat.name,
          introMd: cat.introMd,
          seoTitle: cat.seoTitle,
          seoDescription: cat.seoDescription,
          updatedAt: new Date(),
        })
        .where(eq(categories.id, existing[0].id));
    } else {
      const inserted = await db
        .insert(categories)
        .values({
          slug: cat.slug,
          name: cat.name,
          introMd: cat.introMd,
          seoTitle: cat.seoTitle,
          seoDescription: cat.seoDescription,
        })
        .returning({ id: categories.id });
      categoryIdMap.set(cat.slug, inserted[0].id);
    }
  }

  console.log(`[db:seed] Seeding sample provider owner user...`);
  let sampleOwnerId: string;
  const existingOwner = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, "sample-publisher@apilh.example.com"))
    .limit(1);

  if (existingOwner.length > 0) {
    sampleOwnerId = existingOwner[0].id;
  } else {
    const insertedUser = await db
      .insert(users)
      .values({
        email: "sample-publisher@apilh.example.com",
        name: "Sample Publisher (Fictional)",
        signupIntent: "provider",
        emailVerifiedAt: new Date(),
      })
      .returning({ id: users.id });
    sampleOwnerId = insertedUser[0].id;
  }

  console.log(`[db:seed] Seeding providers, APIs, versions, endpoints, and plans...`);
  let totalApis = 0;
  let totalEndpoints = 0;
  let totalPlans = 0;
  let firstApiId: string | undefined;

  for (const prov of fixtureProviders) {
    let providerId: string;
    const existingProv = await db
      .select({ id: providers.id })
      .from(providers)
      .where(eq(providers.slug, prov.slug))
      .limit(1);

    if (existingProv.length > 0) {
      providerId = existingProv[0].id;
      await db
        .update(providers)
        .set({
          name: prov.name,
          website: prov.website,
          description: prov.description,
          logoUrl: prov.logoUrl,
          supportEmail: prov.supportEmail,
          verifiedAt: prov.verified ? new Date() : null,
          isSampleData: true,
          updatedAt: new Date(),
        })
        .where(eq(providers.id, providerId));
    } else {
      const insertedProv = await db
        .insert(providers)
        .values({
          ownerUserId: sampleOwnerId,
          slug: prov.slug,
          name: prov.name,
          website: prov.website,
          description: prov.description,
          logoUrl: prov.logoUrl,
          supportEmail: prov.supportEmail,
          verifiedAt: prov.verified ? new Date() : null,
          isSampleData: true,
        })
        .returning({ id: providers.id });
      providerId = insertedProv[0].id;
    }

    for (const api of prov.apis) {
      totalApis++;
      const catId = categoryIdMap.get(api.categorySlug);

      let apiId: string;
      const existingApi = await db
        .select({ id: apis.id })
        .from(apis)
        .where(eq(apis.slug, api.slug))
        .limit(1);

      if (existingApi.length > 0) {
        apiId = existingApi[0].id;
        await db
          .update(apis)
          .set({
            providerId,
            name: api.name,
            summary: api.summary,
            descriptionMd: api.descriptionMd,
            categoryId: catId,
            status: api.status,
            authType: api.authType,
            baseUrl: api.baseUrl,
            docsUrl: api.docsUrl,
            openapiUrl: api.openapiUrl,
            coverageNotes: api.coverageNotes,
            isSampleData: true,
            lastReviewedAt: new Date(api.lastReviewedAt),
            publishedAt: new Date(api.publishedAt),
            updatedAt: new Date(),
          })
          .where(eq(apis.id, apiId));
      } else {
        const insertedApi = await db
          .insert(apis)
          .values({
            providerId,
            slug: api.slug,
            name: api.name,
            summary: api.summary,
            descriptionMd: api.descriptionMd,
            categoryId: catId,
            status: api.status,
            authType: api.authType,
            baseUrl: api.baseUrl,
            docsUrl: api.docsUrl,
            openapiUrl: api.openapiUrl,
            coverageNotes: api.coverageNotes,
            isSampleData: true,
            lastReviewedAt: new Date(api.lastReviewedAt),
            publishedAt: new Date(api.publishedAt),
          })
          .returning({ id: apis.id });
        apiId = insertedApi[0].id;
      }

      if (!firstApiId) {
        firstApiId = apiId;
      }

      // Re-seed versions, endpoints and plans for this API
      await db.delete(apiVersions).where(eq(apiVersions.apiId, apiId));
      for (const ver of api.versions) {
        await db.insert(apiVersions).values({
          apiId,
          version: ver.version,
          changelogMd: ver.changelogMd,
          releasedAt: new Date(),
        });
      }

      await db.delete(endpoints).where(eq(endpoints.apiId, apiId));
      for (const ep of api.endpoints) {
        totalEndpoints++;
        await db.insert(endpoints).values({
          apiId,
          method: ep.method,
          path: ep.path,
          summary: ep.summary,
          sampleResponseJson: ep.sampleResponseJson,
        });
      }

      await db.delete(plans).where(eq(plans.apiId, apiId));
      for (const pl of api.plans) {
        totalPlans++;
        await db.insert(plans).values({
          apiId,
          name: pl.name,
          priceAmount: pl.priceAmount,
          priceCurrency: pl.priceCurrency ?? "USD",
          priceUnit: pl.priceUnit,
          includedUnits: pl.includedUnits,
          overageNote: pl.overageNote,
          isContactOnly: pl.isContactOnly ?? false,
        });
      }
    }
  }

  // Seed sample developer user and bookmark
  console.log(`[db:seed] Seeding sample developer user & bookmark...`);
  let devUserId: string;
  const existingDev = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, "developer@apilh.example.com"))
    .limit(1);

  if (existingDev.length > 0) {
    devUserId = existingDev[0].id;
  } else {
    const insertedDev = await db
      .insert(users)
      .values({
        email: "developer@apilh.example.com",
        name: "Jane Developer (Sample)",
        signupIntent: "subscribe",
        emailVerifiedAt: new Date(),
      })
      .returning({ id: users.id });
    devUserId = insertedDev[0].id;
  }

  if (firstApiId) {
    await db
      .insert(savedApis)
      .values({
        userId: devUserId,
        apiId: firstApiId,
      })
      .onConflictDoNothing();
  }

  console.log(`\n======================================================`);
  console.log(`✓ Database seed finished successfully!`);
  console.log(`- Categories seeded: ${fixtureCategories.length}`);
  console.log(`- Fictional Providers seeded: ${fixtureProviders.length}`);
  console.log(`- APIs seeded: ${totalApis} (all marked is_sample_data: true)`);
  console.log(`- Endpoints seeded: ${totalEndpoints}`);
  console.log(`- Pricing Plans seeded: ${totalPlans}`);
  console.log(`- Sample Users & Saved APIs junction seeded`);
  console.log(`======================================================\n`);

  await sql.end();
}

runSeed().catch((err) => {
  console.error(`[db:seed] Seeding failed:`, err);
  process.exit(1);
});
