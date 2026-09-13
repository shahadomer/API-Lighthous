# ADR 002: Relational Data Model and Database Layer

- **Status:** Accepted
- **Date:** 13 September 2026
- **Deciders:** Shahad (Coordinator), Claude (Senior Engineer / PM / QA), agy (Implementing Engineer)
- **Ticket:** DEV-02 (implemented in DEV-06)
- **Consulted:** `Shahad-web-dev-plan.md` (§1, §11.3, §12.1, §12.3)

---

## Context

In Section 1 of `Shahad-web-dev-plan.md`, the Coordinator confirmed: "Next.js route handlers plus PostgreSQL. One codebase, one deploy."

Section 12.3 specifies a relational schema for version 1 of the platform. V1 launch scope includes the public marketing site and API directory, user registration, email verification, provider dashboard shell, and API submission/management flows. Payments and paid subscriptions are explicitly out of scope for v1 (Section 1).

The data model must support:

1. User identity and authentication via Auth.js (credentials and OAuth).
2. Provider profiles and organization metadata.
3. API catalog listings with versioning, endpoint samples, and presentational pricing tiers.
4. Categorization for catalog discovery and SEO taxonomy.
5. User bookmarks / saved APIs.
6. Rigorous editorial workflow states to prevent unverified or unapproved content from appearing publicly (Section 11.3).

## Decision

We adopt **PostgreSQL** managed on Neon or Supabase Postgres, accessed via **Drizzle ORM** with a strictly typed TypeScript schema and SQL-first migration files (`drizzle-kit`).

The v1 data model consists of nine primary tables and one junction table:

1. **`users`**: Platform user accounts (`id`, `email`, `email_verified_at`, `password_hash`, `name`, `signup_intent`, `created_at`, `updated_at`).
2. **`accounts`**: OAuth provider links managed by Auth.js (`id`, `user_id`, `type`, `provider`, `provider_account_id`, `refresh_token`, `access_token`, `expires_at`, `token_type`, `scope`, `id_token`, `session_state`).
3. **`sessions`**: Active user sessions managed by Auth.js (`id`, `session_token`, `user_id`, `expires`).
4. **`providers`**: Publisher organizations publishing APIs (`id`, `owner_user_id`, `slug`, `name`, `website`, `description`, `logo_url`, `support_email`, `verified_at`, `created_at`, `updated_at`).
5. **`apis`**: Core API catalog entity (`id`, `provider_id`, `slug`, `name`, `summary`, `description_md`, `category_id`, `status`, `auth_type`, `base_url`, `docs_url`, `openapi_url`, `coverage_notes`, `last_reviewed_at`, `published_at`, `created_at`, `updated_at`).
6. **`api_versions`**: Release versions and changelogs (`id`, `api_id`, `version`, `changelog_md`, `released_at`, `created_at`, `updated_at`).
7. **`endpoints`**: Representative endpoints and response payloads (`id`, `api_id`, `method`, `path`, `summary`, `sample_response_json`, `created_at`, `updated_at`).
8. **`plans`**: Presentational pricing tiers (`id`, `api_id`, `name`, `price_amount`, `price_currency`, `price_unit`, `included_units`, `overage_note`, `is_contact_only`, `created_at`, `updated_at`). No transactional subscriptions exist in v1.
9. **`categories`**: Discovery taxonomy and curated category landing pages (`id`, `slug`, `name`, `intro_md`, `seo_title`, `seo_description`, `created_at`, `updated_at`).
10. **`saved_apis`**: User bookmark junction table (`user_id`, `api_id`, `created_at`).

## Alternatives Considered

Because the database selection was locked in Section 1, evaluation focused on search and data access strategies within PostgreSQL rather than alternative DBMS engines:

- **Elasticsearch / Dedicated Search Cluster:**
  The business plan references Elasticsearch for future scaling across tens of thousands of listings. However, the plan explicitly defers external search clusters for v1 (Section 12.1). PostgreSQL's native full-text search (`tsvector` generated columns with GIN index) paired with `pg_trgm` (trigram similarity fallback for typo tolerance) easily satisfies search performance for thousands of API listings without introducing operational complexity or cross-service sync failure modes.
- **Prisma vs. Drizzle ORM:**
  Drizzle ORM was chosen over Prisma because of its zero-overhead SQL-like query builder, lightweight runtime footprint, direct TypeScript type inference, and clean generation of standard SQL migration files.
- **NoSQL / Document Stores:**
  Rejected due to relational integrity requirements across users, provider entities, catalog revisions, and strict editorial review states.

## Consequences

- **Timestamps:** Every persistent table maintains `created_at` and `updated_at` with default UTC timestamps.
- **Editorial State Machine:**
  The `apis.status` column is defined as an enum with explicit values:
  `'draft'`, `'submitted'`, `'changes_requested'`, `'published'`, `'suspended'`, `'retired'`.
  **Only listings with status `'published'` may ever be queried or served on public routes.**
- **Editorial Audit Trail:**
  Listings require `last_reviewed_at` to enforce the editorial review cadence stipulated in Section 11.3 (verifying documentation validity, accurate pricing labels, and absence of unsubstantiated claims).
- **No Subscriptions in V1:**
  `plans` stores descriptive pricing information displayed on marketing and listing pages. No payment processing, card tokens, or recurring billing tables are introduced until v2.
- **Implementation Scope:**
  This ADR defines architecture and schema design intent. Actual Drizzle schema files, connection setup, seed scripts, and migrations are scheduled under ticket **DEV-06**.
