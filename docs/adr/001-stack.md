# ADR 001: Web Framework and Core Architecture Stack

- **Status:** Accepted
- **Date:** 13 September 2026
- **Deciders:** Shahad (Coordinator), Claude (Senior Engineer / PM / QA), agy (Implementing Engineer)
- **Ticket:** DEV-01, DEV-02
- **Consulted:** `Shahad-web-dev-plan.md` (§1, §9–§12)

---

## Context

The governing specification (`Shahad-web-dev-plan.md`, §12.1) specifies Next.js App Router, PostgreSQL via Drizzle ORM, and route handlers under `/app/api` as a locked decision confirmed by the Coordinator on 7 September 2026.

However, the working repository inherited an initial codebase exported from an earlier Lovable prototype that was built on TanStack Start with Vite and React 19 (`@tanstack/react-start`, `@tanstack/react-router`, Nitro server bundle). While the project contained 46 reusable Radix UI primitives and several product components, the routing, bundling, and server execution model directly conflicted with the specification.

This conflict was formally tracked as Conflict #1 in `AGENTS.md` during DEV-00 to prevent ad-hoc divergence.

## Decision

Migrate the codebase to **Next.js 15 App Router** in place, fulfilling the original plan (§12.1), while preserving and relocating framework-agnostic UI primitives and product components.

The core technology stack is:

- **Framework:** Next.js 15 (App Router, React Server Components by default)
- **Language:** TypeScript (`strict: true`)
- **Styling:** Tailwind CSS v4 configured from design tokens via `@tailwindcss/postcss`
- **Components:** Radix UI primitives styled in-house, placed in `components/ui/`
- **Package Manager:** Bun (`bun.lock` canonical lockfile, running in CI via `oven-sh/setup-bun@v2`)
- **Testing:** Vitest for unit tests, Playwright for e2e journeys
- **Deployment & Hosting:** Vercel for the web application, managed PostgreSQL for data

## Alternatives Considered

### Retaining TanStack Start (on Vite / Nitro)

We evaluated keeping TanStack Start and adjusting the plan's architectural requirements to match the inherited repository. This was **rejected** for the following reasons:

1. **SEO & AEO Requirements (Plan §9–§11):** The site's primary user acquisition and distribution engine depends on search and answer engine optimization. Next.js provides native, tested capabilities for:
   - Dynamic OpenGraph and Twitter social card generation (`next/og` / `@vercel/og`)
   - Fine-grained incremental static regeneration (`revalidatePath`, `revalidateTag`)
   - Route-level sitemap generation conventions (`sitemap.ts` / `sitemap-[type]/route.ts`)
   - Streaming server components without client hydration overhead
     Re-implementing and maintaining equivalent guarantees on TanStack Start would introduce ongoing engineering overhead and testing friction.
2. **Hosting Platform Alignment:** The plan specifies Vercel as the host platform. Vercel maintains first-party, zero-configuration support, edge caching, and build optimizations specifically for Next.js App Router.
3. **Ecosystem Maturity:** Next.js App Router provides stable ecosystem integrations for authentication (Auth.js / NextAuth), metadata resolution (`generateMetadata`), and structured data insertion that align directly with the project plan.

## Consequences

- **Component Migration (Completed in DEV-01):**
  - Router-specific TanStack code (`router.tsx`, `routeTree.gen.ts`, `server.ts`, `start.ts`, `vite.config.ts`, `src/routes/*`) was removed.
  - 46 UI primitives were relocated to `components/ui/` and adapted with `"use client"` where interactivity is required.
  - Product components (`SiteHeader`, `MobileNavigation`, `ApiCard`, `HeroSearch`, `SiteFooter`, etc.) were relocated to `components/product/` and refactored from TanStack navigation (`Link`, `useNavigate`) to Next.js idioms (`next/link`, `useRouter` from `next/navigation`).
- **Future Implementation Guidelines:**
  - All subsequent feature work must be authored directly against Next.js App Router idioms (Server Components by default, Client Components only when browser APIs or state are required).
  - No TanStack Start or Vite conventions may be reintroduced.
- **CI / Tooling:**
  - GitHub Actions runs on Bun across all five required stages: install, lint (`eslint .`), typecheck (`tsc --noEmit`), test (`vitest run --passWithNoTests`), and build (`next build`).
