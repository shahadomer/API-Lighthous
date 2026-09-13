import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  numeric,
  jsonb,
  pgEnum,
  uniqueIndex,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/**
 * Section 12.3: apis.status enum definition
 * Only 'published' listings appear on public catalog pages or feeds.
 */
export const apiStatusEnum = pgEnum("api_status", [
  "draft",
  "submitted",
  "changes_requested",
  "published",
  "suspended",
  "retired",
]);

/**
 * 1. users: Platform user accounts
 */
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),
  passwordHash: text("password_hash"),
  name: varchar("name", { length: 255 }),
  signupIntent: varchar("signup_intent", { length: 50 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * 2. accounts: OAuth provider links managed by Auth.js
 */
export const accounts = pgTable("accounts", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 255 }).notNull(),
  provider: varchar("provider", { length: 255 }).notNull(),
  providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
  refreshToken: text("refresh_token"),
  accessToken: text("access_token"),
  expiresAt: integer("expires_at"),
  tokenType: varchar("token_type", { length: 255 }),
  scope: varchar("scope", { length: 255 }),
  idToken: text("id_token"),
  sessionState: varchar("session_state", { length: 255 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * 3. sessions: Active user sessions managed by Auth.js
 */
export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionToken: varchar("session_token", { length: 255 }).notNull().unique(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * 4. categories: Discovery taxonomy and SEO category landing pages
 */
export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  introMd: text("intro_md"),
  seoTitle: varchar("seo_title", { length: 255 }),
  seoDescription: text("seo_description"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * 5. providers: Publisher organizations publishing APIs
 */
export const providers = pgTable("providers", {
  id: uuid("id").defaultRandom().primaryKey(),
  ownerUserId: uuid("owner_user_id").references(() => users.id, { onDelete: "set null" }),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  website: varchar("website", { length: 255 }),
  description: text("description"),
  logoUrl: text("logo_url"),
  supportEmail: varchar("support_email", { length: 255 }),
  verifiedAt: timestamp("verified_at", { withTimezone: true }),
  isSampleData: boolean("is_sample_data").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * 6. apis: Core API catalog entity
 * Includes last_reviewed_at for Section 11.3 editorial audit compliance,
 * and is_sample_data for Section 6.4 sample data banner rendering.
 */
export const apis = pgTable(
  "apis",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    providerId: uuid("provider_id")
      .notNull()
      .references(() => providers.id, { onDelete: "cascade" }),
    slug: varchar("slug", { length: 100 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    summary: text("summary").notNull(),
    descriptionMd: text("description_md"),
    categoryId: uuid("category_id").references(() => categories.id, { onDelete: "set null" }),
    status: apiStatusEnum("status").default("draft").notNull(),
    authType: varchar("auth_type", { length: 50 }),
    baseUrl: varchar("base_url", { length: 500 }),
    docsUrl: varchar("docs_url", { length: 500 }),
    openapiUrl: varchar("openapi_url", { length: 500 }),
    coverageNotes: text("coverage_notes"),
    isSampleData: boolean("is_sample_data").default(false).notNull(),
    lastReviewedAt: timestamp("last_reviewed_at", { withTimezone: true }),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [uniqueIndex("apis_provider_slug_idx").on(table.providerId, table.slug)],
);

/**
 * 7. api_versions: Release versions and changelogs
 */
export const apiVersions = pgTable("api_versions", {
  id: uuid("id").defaultRandom().primaryKey(),
  apiId: uuid("api_id")
    .notNull()
    .references(() => apis.id, { onDelete: "cascade" }),
  version: varchar("version", { length: 50 }).notNull(),
  changelogMd: text("changelog_md"),
  releasedAt: timestamp("released_at", { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * 8. endpoints: Representative endpoints and response payloads
 */
export const endpoints = pgTable("endpoints", {
  id: uuid("id").defaultRandom().primaryKey(),
  apiId: uuid("api_id")
    .notNull()
    .references(() => apis.id, { onDelete: "cascade" }),
  method: varchar("method", { length: 10 }).notNull(),
  path: varchar("path", { length: 500 }).notNull(),
  summary: text("summary").notNull(),
  sampleResponseJson: jsonb("sample_response_json"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * 9. plans: Presentational pricing tiers (Section 12.3: no subscriptions in v1)
 */
export const plans = pgTable("plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  apiId: uuid("api_id")
    .notNull()
    .references(() => apis.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  priceAmount: numeric("price_amount", { precision: 10, scale: 4 }),
  priceCurrency: varchar("price_currency", { length: 3 }).default("USD"),
  priceUnit: varchar("price_unit", { length: 50 }),
  includedUnits: integer("included_units"),
  overageNote: varchar("overage_note", { length: 255 }),
  isContactOnly: boolean("is_contact_only").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * 10. saved_apis: User bookmark junction table
 */
export const savedApis = pgTable(
  "saved_apis",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    apiId: uuid("api_id")
      .notNull()
      .references(() => apis.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.apiId] })],
);

/**
 * Relational Definitions
 */
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  providers: many(providers),
  savedApis: many(savedApis),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  apis: many(apis),
}));

export const providersRelations = relations(providers, ({ one, many }) => ({
  owner: one(users, {
    fields: [providers.ownerUserId],
    references: [users.id],
  }),
  apis: many(apis),
}));

export const apisRelations = relations(apis, ({ one, many }) => ({
  provider: one(providers, {
    fields: [apis.providerId],
    references: [providers.id],
  }),
  category: one(categories, {
    fields: [apis.categoryId],
    references: [categories.id],
  }),
  versions: many(apiVersions),
  endpoints: many(endpoints),
  plans: many(plans),
  savedBy: many(savedApis),
}));

export const apiVersionsRelations = relations(apiVersions, ({ one }) => ({
  api: one(apis, {
    fields: [apiVersions.apiId],
    references: [apis.id],
  }),
}));

export const endpointsRelations = relations(endpoints, ({ one }) => ({
  api: one(apis, {
    fields: [endpoints.apiId],
    references: [apis.id],
  }),
}));

export const plansRelations = relations(plans, ({ one }) => ({
  api: one(apis, {
    fields: [plans.apiId],
    references: [apis.id],
  }),
}));

export const savedApisRelations = relations(savedApis, ({ one }) => ({
  user: one(users, {
    fields: [savedApis.userId],
    references: [users.id],
  }),
  api: one(apis, {
    fields: [savedApis.apiId],
    references: [apis.id],
  }),
}));
