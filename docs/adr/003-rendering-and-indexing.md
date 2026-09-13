# ADR 003: Rendering Strategy and Search Engine Indexing Policy

- **Status:** Accepted
- **Date:** 13 September 2026
- **Deciders:** Shahad (Coordinator), Claude (Senior Engineer / PM / QA), agy (Implementing Engineer)
- **Ticket:** DEV-02
- **Consulted:** `Shahad-web-dev-plan.md` (§9.1–§9.4, §10.1, §11.2, §12.1)

---

## Context

`Shahad-web-dev-plan.md` establishes search engine optimization (SEO) and answer engine optimization (AEO for ChatGPT, Perplexity, Google AI Overviews) as the primary engine for organic user acquisition (Sections 9, 10).

Section 9.1 establishes the foundational technical invariant for all public routes:

> _"Every public page is server-rendered or statically generated with the full content in the initial HTML. The test agy runs on every public template: `curl` the URL, and the headline, body copy, prices and links must all be in the response. If a page needs JavaScript to show its content, it does not ship."_

Furthermore, the platform features multiple public page types with differing volatility:

- Long-lived editorial and marketing pages (home, about, comparisons, guides, category hubs).
- Dynamic API detail pages populated from the database.
- Deep catalog browsing and faceted filtering (by category, pricing model, trial availability, authentication protocol).

Uncontrolled indexing of arbitrary filter combinations leads to crawl budget depletion, duplicate content penalties, and thin search results.

## Decision

We establish a dual rendering and crawl indexing policy enforced across all App Router routes:

### 1. Rendering Policy

| Page Category                   | Routes                                             | Rendering Strategy                         | Revalidation / Invalidation                                 |
| ------------------------------- | -------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------- |
| **Marketing & Static**          | `/`, `/host`, `/providers`, `/pricing`, `/about`   | Static Generation (SSG) with ISR           | On deployment, or on-demand revalidation on publish         |
| **Curated Categories**          | `/apis/[category]`, `/host/frameworks/[framework]` | Static Generation (SSG) with ISR           | Incremental revalidation (`revalidate: 3600` or tag-based)  |
| **API Detail Pages**            | `/apis/[provider]/[api]`                           | Static Generation (SSG) with on-demand ISR | On-demand revalidation when listing is updated or published |
| **Content & Guides**            | `/guides/[slug]`, `/compare/[slug]`, `/docs/*`     | Static Generation from MDX                 | Rebuilt on deployment / commit                              |
| **Faceted Catalog & Directory** | `/apis`, `/directory`                              | Dynamic Server Rendering (SSR)             | Server-rendered per request from search parameters          |
| **Protected Application**       | `/dashboard/*`, `/auth/*`                          | Client-Side / Dynamic Authenticated SSR    | Not indexed (`robots.txt` disallowed)                       |

### 2. Indexing and Robots Policy

- **Canonical URLs:** Every indexable route emits a self-referencing absolute canonical link via Next.js metadata.
- **Faceted & Filtered URLs:** When users apply query parameters (e.g. `?category=airline&pricing=free`), the server renders the filtered results, but automatically emits `robots: { index: false, follow: true }`. Filter URLs canonicalize to their base URL or self-canonicalize with `noindex, follow` per Section 9.2.
- **Sitemap Inclusions:** Sitemaps (`sitemap-pages.xml`, `sitemap-apis.xml`, `sitemap-content.xml`) only contain clean, canonical, indexable URLs for published resources. Filtered permutations are strictly excluded from sitemaps unless elevated to a curated, editorially supported category route.
- **Tombstoning:** Deleted or permanently unlisted APIs return HTTP `410 Gone`, never a soft redirect to the homepage (Section 9.4).

## Alternatives Considered

### Client-Side Rendering (CSR) with Hydration-Only Shells

Using client-side data fetching (e.g. `useEffect` / TanStack Query fetching from API route handlers on mount) was **rejected outright**.

- Modern answer engines (Perplexity, ChatGPT search) and web crawlers prioritize raw HTML text extraction (Section 10.1).
- CSR pages require headless browser execution, which delays indexing, degrades Largest Contentful Paint (LCP), and frequently results in truncated or empty snippet generation.
- Client-only rendering directly violates the plan's mandatory `curl` verification rule.

### Unrestricted Indexing of Filter Permutations

Allowing search engines to index arbitrary faceted search queries was **rejected**. Permutations of multiple filter dimensions cause index bloat and fragment domain authority across low-value, duplicate-like pages.

## Consequences

- **Server Components First:** All data fetching for public routes must reside in React Server Components or generateStaticParams; client components may not fetch initial page data.
- **Progressive Enhancement:** Client components are reserved strictly for interactive state (mobile menu toggles, search input autofocus, tab switching, client-side filter synchronization). As Section 9.1 specifies: _"Client JavaScript enhances them, it does not create them."_
- **Automated Verification:**
  - Automated CI tests will execute `curl` or server-fetch checks against public route HTML responses to ensure critical copy and links exist prior to client hydration.
  - Sitemaps must be regenerated upon listing publication rather than relying on unindexed client views.
