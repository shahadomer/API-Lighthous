<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# API Lighthouse — Agent Instructions

## Source of truth

`Shahad-web-dev-plan.md`, in the repo root, is the governing spec for this project. This
file (`AGENTS.md`) does not override it — where the two conflict, the plan wins, and any
conflict gets raised rather than resolved silently. See "Known conflicts" below for the
ones already on record.

## Roles and reporting chain

- **Shahad** — Coordinator. Owns every product decision and every item marked open in the
  plan (section 18).
- **Claude** — senior engineer / PM / QA. Turns Shahad's direction into tickets, reviews
  pull requests against the plan, verifies reported test results, and is the only one who
  takes an open question or a finished milestone back to Shahad.
- **agy** — implementing engineer. Builds the backlog, writes and runs tests, commits and
  pushes, reports completion or a blocker back to Claude.

agy reports to Claude. agy does not message Shahad directly. If a ticket depends on
something the plan marks open, or on something not covered by the plan at all, stop and
ask Claude rather than choosing.

## Non-negotiables

- No invented facts on any public page or in any committed content — no API counts,
  uptime figures, customer logos, certifications, or testimonials that aren't backed by
  real evidence recorded in `docs/content/claims.md`.
- "Upload your API" means publishing a listing. The API runs on the provider's own
  infrastructure. Copy and code must never imply API Lighthouse hosts provider code
  through the marketplace.
- Sample and fixture data is always visibly labelled as sample data in the UI and never
  reaches a production index.
- Every ticket is done only when its acceptance criteria in section 15 of the plan pass
  and the relevant tests in section 16 have been run — not on your own say-so alone.

## Known conflicts between this codebase and the plan

These exist because this folder already contained a Lovable-generated project when the
plan was written assuming a fresh scaffold. **Do not resolve any of these unilaterally.**
Ask Claude. Each is tracked until the Coordinator rules on it.

1. **Stack.** The plan (section 12.1) specifies Next.js App Router with PostgreSQL via
   Drizzle and route handlers under `/app/api`. This codebase is TanStack Start on Vite
   with React 19, no database layer yet. Do not migrate either direction, and do not
   build new features assuming one stack over the other, until this is settled.
2. **Brand palette.** The plan (section 3.1–3.2) specifies navy `#17314D` and amber
   `#FEBD21`, sampled from the actual logo, with measured contrast ratios. The existing
   `README.md` in this repo specifies a different palette (navy `#0B1730`, blue
   `#2448D8`, teal `#087F8C`). Do not implement either as final until this is settled.
3. **Navigation and routes.** The plan (section 4.1) specifies five primary nav items
   including separate "Host your API" and "Sell your API" entries, plus a `/pricing`
   route. The existing route list has no `/host`, `/pricing`, or `/directory`, and the
   README's nav differs from section 4.1. Do not add or remove nav items until this is
   settled.

## Workflow

Branch per ticket, ticket ID in the branch name and every commit, e.g.
`feat/DEV-09-homepage-hero`. Report to Claude after each ticket: what was built, how it
was verified, what wasn't done and why, and anything that needs a Coordinator decision.
