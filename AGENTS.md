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

`Shahad-web-dev-plan.md` in the repo root is the governing spec. Where this
file and the plan conflict, the plan wins, and any conflict is raised rather
than resolved silently.

## Stack — as of 13 Sep 2026

- **TanStack Start** (this Lovable scaffold). Not Next.js.
- **Vite** dev server on port 8080.
- **npm** as package manager. `bunfig.toml.bak` is a leftover; ignore it.
- The DEV-01 through DEV-09 Next.js rebuild is abandoned. Branch
  `archive/nextjs-work` exists in git as reference only. Do not merge from it,
  do not copy from it, do not build on it.

## Known conflicts

1. **Plan section 12.1 / 12.2 describe Next.js.** That is superseded. The stack
   is TanStack Start. Section 12.3 (data model) is still the shape to implement,
   on TanStack Start's own terms. Claude is rewriting 12.1 and 12.2 to match.
   Do not follow 12.1/12.2. Do not migrate to Next.js.

## Non-negotiables

- No invented facts on any public page. Any number shown must come from the
  database, or be visibly labelled as example/sample data.
- "Upload your API" means publishing a listing. Never host, never imply API
  Lighthouse runs anyone's code.
- Sample data is visibly labelled in the UI and never reaches a production index.
- If a ticket depends on an open question in plan section 18, stop and ask.

## Workflow

Branch per ticket, ticket ID in the branch name and every commit. Report back
after each ticket: what was built, how it was verified, what was not done and
why, anything needing a Coordinator decision.