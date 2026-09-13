# API Lighthouse: front-end development plan

Project: apilh.com (API Lighthouse)
Version: 1.0
Date: 7 September 2026
Author: Claude (senior engineer / PM / QA, Extreme Solutions)
Coordinator: Shahad (Extreme Solutions)
Implementing agent: agy (Antigravity)
Supersedes: `Business Plans/web1-dev-plan.md`
Source material: `Business Plans/API Lighthouse.docx`, `Business Plans/API Lighthouse.pdf`, `Website/apilh`, `lovable+builder projects/*`, `Logo/*`

---

## 0. How to use this document

This is the build brief. agy reads it start to finish before writing code, then works the backlog in section 15 in order.

Three rules govern everything below.

First, no invented facts on any public page. The business plan contains projections and targets, not achievements. "25,000+ APIs", "99.95% uptime", "4M developers", "SOC 2 certified" are goals. None of them go on the website until they are true and evidenced. Every number that appears in the UI comes from either a real database count or a labelled sample dataset.

Second, sample data must be visibly labelled as sample data, and it must never reach a production index.

Third, when this document and the older `web1-dev-plan.md` disagree, this document wins. When something is genuinely unspecified, agy asks the Coordinator rather than choosing.

### 0.1 Roles and how we work

Three people work this project, and the chain below is how a decision or a status update actually moves.

Shahad is the Coordinator. Every product decision, every unconfirmed fact in section 18, and every choice this document marks as open belongs to Shahad. Nobody downstream fills a gap with a guess.

Claude acts as senior engineer, project manager and QA. Claude turns Shahad's direction into this specification and the backlog in section 15, reviews agy's pull requests against it, verifies agy's reported test results rather than taking them on faith, and is the one who brings an open question or a finished milestone back to Shahad.

agy (Antigravity) is the implementing engineer: it reads this document, builds the backlog in section 15 in order, writes and runs the tests in section 16, commits and pushes every ticket to the git repository set up in DEV-01, and reports completion or a blocker back to Claude per section 16.4.

The reporting chain is agy to Claude, Claude to Shahad. agy does not message Shahad directly, and Claude does not invent an answer on Shahad's behalf; an open question travels the same chain in reverse until it reaches whoever can actually decide it.

---

## 1. Decisions locked in this round

These were confirmed by the Coordinator on 7 September 2026 and are no longer open.

| Decision                     | Answer                                                                                                                                                                                                          |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Launch scope                 | Public marketing site and directory, plus working signup, email verification, provider dashboard shell, and the API listing submission form. No payments in v1.                                                 |
| Homepage emphasis            | All three pillars in one hero with three clear entry paths: hosting, marketplace, directory.                                                                                                                    |
| Design direction             | Apple-led surface, Material 3 underneath. Apple spacing, typography, restraint and motion are what people see. M3 supplies the token architecture, state layers, elevation and accessibility behaviour in code. |
| Language                     | English only at launch, every component built RTL-ready. Arabic is a later content job, not a rebuild.                                                                                                          |
| Backend                      | Next.js route handlers plus PostgreSQL. One codebase, one deploy.                                                                                                                                               |
| Imagery                      | Nothing usable exists. Everything gets produced as part of this build, per section 6.                                                                                                                           |
| Repository                   | New folder, fresh Next.js project, new GitHub repo. Old versions stay untouched as reference.                                                                                                                   |
| Meaning of "upload your API" | Listing only. Providers publish endpoint details, OpenAPI documents and pricing. The API runs on the provider's own infrastructure. Site copy says publish and list, never host, for provider-supplied APIs.    |

The hosting pillar (APIaaS) is still presented on the homepage as a product, because it is API Lighthouse's own service. What is not promised in v1 is provider code deployment through the marketplace.

---

## 2. What we are building

### Product in one line

API Lighthouse is where teams find APIs they can trust, and where API owners turn an API into a product other teams can buy.

### Three pillars, one site

| Pillar               | What the visitor does                                                           | Primary conversion                    |
| -------------------- | ------------------------------------------------------------------------------- | ------------------------------------- |
| API hosting (APIaaS) | Deploys and manages their own API on API Lighthouse infrastructure              | Sign up, create first project         |
| Marketplace          | Discovers a paid API, evaluates it, subscribes; or lists their own API for sale | Sign up as buyer or provider          |
| Free directory       | Searches public and free APIs, reads comparisons and guides                     | Sign up to save, track and get alerts |

The directory is the traffic engine. The marketplace is the network effect. Hosting is the revenue engine in year one. The homepage has to serve all three without becoming a menu.

### Audiences

Developer building something, evaluating an API. Wants documentation, a sample response, pricing and limits in under a minute.

Technical decision maker at a small company. Wants coverage, reliability evidence, support terms and total cost.

API owner with something to sell. Wants to know the commission, the payout schedule, the listing requirements and how long review takes.

### The competitive moment

Nokia acquired Rapid (RapidAPI) in November 2024, and "RapidAPI alternatives" has since become an active, heavily written-about search topic with dozens of competing listicles. That is the single clearest opening for a new entrant: people are actively looking for somewhere else to go. The site should be built to be findable and citable in exactly that moment.

### What "better branding than competitors" means concretely

Most API marketplace sites look like documentation portals with a marketing layer bolted on: dense grids, weak typography, stock developer photography, generic gradient heroes. The differentiation is not more decoration. It is restraint, real product imagery, honest numbers, and typography that holds up at 64px. Apple's design site is the reference precisely because it is calm and content-led.

---

## 3. Brand and design system

### 3.1 Identity, taken from the existing logo

The logo already establishes the palette. Colours below were sampled directly from `Logo/Logo.png`.

| Role        | Hex       | Source                   | Verified contrast                                          |
| ----------- | --------- | ------------------------ | ---------------------------------------------------------- |
| Brand navy  | `#17314D` | Logo braces and wordmark | 13.27:1 on white                                           |
| Brand amber | `#FEBD21` | Logo signal arc          | 7.91:1 on brand navy, 11.2:1 on `#021226`, 1.68:1 on white |

The amber is the lighthouse beam. It carries meaning, so it is used sparingly: the active state, the beam motif, the primary action on dark surfaces, the "new" and "verified" markers. It is never used for text on white, because the contrast fails.

The mark itself is `{ }` braces containing three stacked dots with a signal arc above. Read it as a lighthouse and as a code block at the same time. That double reading is the whole visual system: signal, guidance, code.

### 3.2 Colour tokens

Generated as an OKLCH tonal ramp from the two brand colours, which gives M3-style tone steps with perceptually even spacing.

Primary (navy, hue 252):

```
primary-10  #021226    primary-60  #738FAE
primary-20  #152A41    primary-70  #8FABC9
primary-30  #2A415C    primary-80  #ADC7E5
primary-40  #405A77    primary-90  #C7E1FE
primary-50  #587494    primary-95  #E3F0FF
                       primary-99  #F7FBFF
```

Accent (amber, hue 82):

```
accent-20  #372600    accent-70  #D69D05
accent-30  #533B00    accent-80  #F1BA49
accent-40  #725200    accent-90  #FFD890
accent-50  #926A00    accent-95  #FFECCA
accent-60  #B38300    accent-99  #FFF9EF
```

Neutral (hue 254, low chroma, so surfaces stay slightly cool rather than dead grey):

```
neutral-10  #08121E    neutral-70  #9AA9BD
neutral-20  #1E2A38    neutral-80  #B7C6D9
neutral-30  #344151    neutral-90  #D1E0F2
neutral-40  #4B596C    neutral-95  #E4F0FF
neutral-50  #637387    neutral-99  #F7FAFF
neutral-60  #7E8EA2
```

Semantic roles, M3 naming, light theme:

| Token                           | Value     | Notes                                         |
| ------------------------------- | --------- | --------------------------------------------- |
| `--color-primary`               | `#17314D` | Buttons, headings, mark                       |
| `--color-on-primary`            | `#FFFFFF` | 13.27:1                                       |
| `--color-primary-container`     | `#E3F0FF` | Quiet emphasis blocks                         |
| `--color-on-primary-container`  | `#152A41` |                                               |
| `--color-interactive`           | `#0B57D0` | Links and in-text actions, 6.39:1 on white    |
| `--color-accent`                | `#FEBD21` | Beam, active state, dark-surface CTA          |
| `--color-on-accent`             | `#17314D` | 7.91:1                                        |
| `--color-accent-text`           | `#725200` | The only amber safe for text on white, 7.19:1 |
| `--color-surface`               | `#FFFFFF` |                                               |
| `--color-surface-container-low` | `#F7FAFF` | Page background                               |
| `--color-surface-container`     | `#E4F0FF` | Cards on tinted sections                      |
| `--color-surface-inverse`       | `#021226` | Hero, footer, code panels                     |
| `--color-on-surface`            | `#17314D` | Headings                                      |
| `--color-on-surface-variant`    | `#4B596C` | Body text, 7.13:1                             |
| `--color-on-surface-muted`      | `#637387` | Captions at 16px and above only, 4.85:1       |
| `--color-outline`               | `#B7C6D9` | Card borders                                  |
| `--color-outline-variant`       | `#D1E0F2` | Dividers                                      |
| `--color-success`               | `#0F6E4A` | Status up, verified                           |
| `--color-warning`               | `#8A5A00` | Degraded, deprecated                          |
| `--color-error`                 | `#B3261E` | Down, validation failure                      |

Dark theme swaps surface and on-surface roles and lifts the ramp by roughly 40 tone steps. White on `#021226` is 18.8:1, amber on `#021226` is 11.2:1. Dark theme is built from day one because developers expect it and because building it later means retrofitting every component.

Every colour in the product comes from a token. No hex values in component files. agy adds a lint rule that fails the build on a raw hex outside `styles/tokens.css`.

### 3.3 Typography

Apple's own faces (SF Pro, New York) are not licensed for general web use, so the site uses open faces chosen to sit in the same register.

| Use                  | Family                    | Fallback stack                                                    |
| -------------------- | ------------------------- | ----------------------------------------------------------------- |
| Display and headings | Inter Display (variable)  | `ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif` |
| Body and UI          | Inter (variable)          | same                                                              |
| Code and API values  | JetBrains Mono (variable) | `ui-monospace, SFMono-Regular, Menlo, monospace`                  |

Self-host both as WOFF2, subset to Latin plus the punctuation the site actually uses. Two files maximum in the initial render. Both are SIL Open Font License, which agy confirms and records in `docs/licences.md` before shipping.

Scale, in rem against a 16px root:

| Step                        | Desktop | Mobile | Weight | Tracking | Line height |
| --------------------------- | ------- | ------ | ------ | -------- | ----------- |
| Display XL (hero H1)        | 72px    | 40px   | 600    | -0.03em  | 1.05        |
| Display L (section H2)      | 48px    | 32px   | 600    | -0.02em  | 1.12        |
| Heading M (H3)              | 30px    | 24px   | 600    | -0.015em | 1.25        |
| Heading S (H4, card title)  | 20px    | 18px   | 600    | -0.01em  | 1.35        |
| Body L (hero support, lede) | 20px    | 17px   | 400    | 0        | 1.55        |
| Body M (default)            | 17px    | 16px   | 400    | 0        | 1.6         |
| Body S (captions, meta)     | 15px    | 14px   | 400    | 0        | 1.5         |
| Label (buttons, chips)      | 15px    | 15px   | 550    | 0.01em   | 1.2         |
| Code                        | 14px    | 13px   | 450    | 0        | 1.65        |

Negative tracking on large sizes is the single most Apple-like typographic move and the one most often missed. Body text at 17px rather than 16px is also deliberate, and matches Apple's reading size.

Measure is capped at 68 characters for prose. Headlines cap at 18 words. Never justify. Never centre a paragraph longer than two lines.

### 3.4 Layout and space

Content max width 1200px, with a 1360px "wide" variant for the catalog grid and a 720px "reading" variant for guides. Twelve columns on desktop, 24px gutters, 6 columns at tablet, 4 at mobile with 20px gutters.

Spacing scale, 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128, 160.

Section rhythm: 128px vertical padding on desktop, 96px for tighter sections, 64px on mobile. Apple's pages breathe. Sections that touch each other read as one undifferentiated block, which is the main reason the old apilh homepage felt like a wall.

Every component uses logical properties: `padding-inline`, `margin-inline-start`, `inset-inline-end`, `text-align: start`. No `left`, `right`, `margin-left`, `padding-right` anywhere. Icons that indicate direction get `[dir="rtl"] &{ transform: scaleX(-1) }`. This is what makes Arabic a content job later.

### 3.5 Shape, elevation and state, from Material 3

Shape scale: none 0, xs 4px, sm 8px, md 12px, lg 16px, xl 24px, full 999px. Cards are lg. Buttons are full for primary actions and md for secondary. Input fields are md. Modals are xl.

Elevation, expressed as shadow rather than M3's tonal overlays, because the site is content-led and tonal elevation reads as muddy on a light editorial page:

```
level-0  none
level-1  0 1px 2px rgb(23 49 77 / .06), 0 1px 3px rgb(23 49 77 / .04)
level-2  0 2px 6px rgb(23 49 77 / .07), 0 6px 16px rgb(23 49 77 / .05)
level-3  0 8px 24px rgb(23 49 77 / .09), 0 2px 6px rgb(23 49 77 / .06)
level-4  0 16px 48px rgb(23 49 77 / .12)
```

Level 3 and above only for overlays, popovers, sticky bars and drag states. Resting cards get level 1 plus a `--color-outline` border. Shadows stacked on every card is the fastest way to look cheap.

State layers follow M3 opacities, applied as an overlay of the element's `on-` colour:

| State              | Opacity |
| ------------------ | ------- |
| Hover              | 8%      |
| Focus              | 10%     |
| Pressed            | 10%     |
| Dragged            | 16%     |
| Disabled container | 12%     |
| Disabled content   | 38%     |

Focus rings are a 2px `--color-interactive` outline with a 2px offset, plus a 1px white inner ring on dark surfaces so the ring survives on both. Focus is never removed. `:focus-visible` only, so mouse users do not see it on click.

### 3.6 Motion

Apple's motion is short, spatial and almost never decorative. M3 supplies the easing tokens.

| Token               | Curve                    | Duration |
| ------------------- | ------------------------ | -------- |
| `motion-standard`   | `cubic-bezier(.2,0,0,1)` | 200ms    |
| `motion-emphasized` | `cubic-bezier(.2,0,0,1)` | 400ms    |
| `motion-decelerate` | `cubic-bezier(0,0,0,1)`  | 300ms    |
| `motion-accelerate` | `cubic-bezier(.3,0,1,1)` | 150ms    |

Rules: hover and press feedback at 120 to 200ms. Entrance animations at 400ms maximum, once, on first scroll into view, never on re-entry. Translate distance maximum 16px. Opacity from 0 to 1, never a scale bounce. No parallax. No scroll-jacking. No looping background animation.

One exception, used once per page at most: the beam sweep. A slow amber gradient sweep across the hero mark, 3 seconds, opacity capped at 0.25, paused when off-screen. It is the brand moment and it earns its place because the product is called Lighthouse.

Everything above is wrapped in `@media (prefers-reduced-motion: reduce)`, which disables transforms and the beam entirely and leaves opacity changes at 0ms.

### 3.7 Component inventory

agy builds these as the shared library before building any page. Each one ships with default, hover, focus-visible, pressed, disabled, loading, error and empty states where applicable, and each one gets a story or demo route at `/dev/components` that is excluded from production builds.

Primitives: `Button` (filled, tonal, outlined, text, icon), `Link`, `Input`, `Textarea`, `Select`, `Combobox`, `Checkbox`, `Radio`, `Switch`, `Chip`, `Badge`, `Avatar`, `Tooltip`, `Popover`, `Dialog`, `Drawer`, `Tabs`, `Accordion`, `Table`, `Pagination`, `Breadcrumb`, `Toast`, `Skeleton`, `EmptyState`, `ErrorState`, `ProgressBar`, `StepIndicator`.

Product components: `SiteHeader`, `MobileNav`, `SiteFooter`, `HeroSearch`, `PillarCard`, `ApiCard`, `CategoryCard`, `ProviderBadge`, `CatalogFilters`, `FilterChipRow`, `ApiFactsTable`, `EndpointList`, `CodeExample` (with language tabs and copy), `ResponsePreview`, `PlanCard`, `PricingTable`, `ComparisonTable`, `QuestionAnswer`, `GuideCard`, `AuthorByline`, `StatusPill`, `MetricTile`, `ListingPreview`, `SubmissionStepper`, `DashboardShell`, `SignupPanel`, `CTASection`.

Navigation uses `<a>`. Actions use `<button>`. A `<div onClick>` anywhere in the codebase fails review.
---

## 4. Information architecture

### 4.1 Navigation

Primary navigation, five items, no more:

`Explore APIs` · `Host your API` · `Sell your API` · `Developers` · `Pricing`

Right side: `Log in` and a filled `Sign up free` button. The signup button is visible on every page, at every breakpoint, including inside the mobile drawer at the top rather than buried at the bottom.

Two of the five items open a lightweight mega panel on hover and on keyboard focus. Explore APIs shows the top eight categories plus "Browse all". Developers shows Quickstart, Documentation, Guides, Playground, Status. The other three are direct links. Panels close on Escape, trap nothing, and are plain links inside.

The header is sticky, 64px tall, with a translucent background (`backdrop-filter: saturate(180%) blur(20px)`) over a `--color-surface` at 72% opacity, and a 1px bottom hairline that only appears once the page has scrolled past 8px. That transition is the Apple header, and it is one of the cheapest ways to make a site feel considered.

### 4.2 Routes

| Route                                          | Purpose                                            | Rendering                           | Indexed            |
| ---------------------------------------------- | -------------------------------------------------- | ----------------------------------- | ------------------ |
| `/`                                            | Homepage, three entry paths, signup                | Static, revalidated hourly          | Yes                |
| `/apis`                                        | Catalog search and browse                          | Server rendered, URL-driven filters | Yes, base URL only |
| `/apis/[category]`                             | Category landing with editorial intro              | Static per category                 | Yes                |
| `/apis/[provider]/[api]`                       | API detail                                         | Static, revalidated                 | Yes                |
| `/providers`                                   | Why and how to list an API                         | Static                              | Yes                |
| `/providers/[provider]`                        | Provider profile and portfolio                     | Static, revalidated                 | Yes                |
| `/host`                                        | APIaaS product page                                | Static                              | Yes                |
| `/host/frameworks/[framework]`                 | ASP.NET, FastAPI, Next.js, Express, Django, Spring | Static                              | Yes                |
| `/directory`                                   | Free and public API directory                      | Server rendered                     | Yes, base only     |
| `/directory/[slug]`                            | Free API entry                                     | Static                              | Yes                |
| `/pricing`                                     | Plans for hosting, terms for marketplace           | Static                              | Yes                |
| `/developers`                                  | Developer hub                                      | Static                              | Yes                |
| `/developers/quickstart`                       | First API in five minutes                          | Static                              | Yes                |
| `/docs/[...slug]`                              | Documentation                                      | Static from MDX                     | Yes                |
| `/guides/[slug]`                               | Editorial guides and tutorials                     | Static from MDX                     | Yes                |
| `/compare/[slug]`                              | Comparison pages                                   | Static from MDX                     | Yes                |
| `/about`, `/contact`, `/trust`, `/status`      | Company, support, security, uptime                 | Static                              | Yes                |
| `/legal/terms`, `/legal/privacy`, `/legal/dpa` | Policies                                           | Static                              | Yes                |
| `/signup`, `/login`, `/verify`, `/reset`       | Authentication                                     | Client interactive                  | No, `noindex`      |
| `/dashboard`                                   | Account home                                       | Auth required                       | No                 |
| `/dashboard/apis`                              | Provider listings                                  | Auth required                       | No                 |
| `/dashboard/apis/new`                          | Submission wizard                                  | Auth required                       | No                 |
| `/dashboard/settings`                          | Profile, team, keys                                | Auth required                       | No                 |

Catalog filter combinations (`/apis?category=x&pricing=free`) render fine and are usable, but carry `noindex, follow` and stay out of the sitemap. Where a filter combination has real demand, it gets promoted to a curated route under `/apis/[category]` with its own editorial content. That is the difference between a landing page and a crawl trap.

### 4.3 Categories at launch

Launch only the categories that have real entries. From the business plan and the older site the plausible set is: AI and machine learning, business and company data, communication (SMS, email, voice), financial and payments, travel and airline, maps and location, media and files, developer tools and utilities.

agy does not create a category page with fewer than five real or clearly-labelled sample entries. An empty category is worse than no category, for users and for crawl budget.

---

## 5. Homepage specification

The homepage has one job: make a visitor understand what API Lighthouse is within eight seconds, and give them a reason to create an account on the same screen. Everything below serves that.

### 5.1 Above the fold

Layout: single column, centred, on a `--color-surface-inverse` (`#021226`) panel that ends with a soft radius at the bottom, so the light content below reads as a separate surface. This is the one dark area on the page.

H1, Display XL: **Find the API you need. Publish the one you built.**

Sub, Body L, max 60 characters per line, `--color-primary-80`:
**API Lighthouse is a marketplace, a hosting platform and a free directory for APIs. Discover services, compare them honestly, and start using them in minutes.**

Search field, full width up to 640px, 56px tall, radius full, with a leading search icon and a trailing `⌘K` hint. Placeholder: _Search APIs by name, use case or provider_. Below it, four suggestion chips, each a real link: Airline data, SMS delivery, Company lookup, AI models.

Two buttons under the search, side by side on desktop, stacked at mobile:

- Filled amber, `--color-on-accent` text: **Create free account** → `/signup`
- Outlined, white border at 40% opacity: **Explore APIs** → `/apis`

Under that, one line of Body S in `--color-primary-70`: _Free tier included. No card required._ Only if that is true of the actual free plan, which it is per the business plan pricing table.

Visual, occupying the lower third of the hero panel and bleeding off both edges: a wide, slightly perspective-tilted composition of three product surfaces overlapping, back to front. Behind it, the beam sweep at 0.2 opacity, tracking slowly from the mark.

No full-viewport hero. The next section's heading must be partly visible at 1080px height so people know to scroll.

### 5.2 Section order

| #   | Section                                    | What it contains                                                                                                                                                                                                                                                  |
| --- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Hero                                       | As above                                                                                                                                                                                                                                                          |
| 2   | Trust strip                                | Four short factual statements, not logos, until real logos are permitted. Example: "Built in Jeddah", "Framework agnostic", "15% marketplace commission", "OpenAPI native". Quiet, single line, `--color-on-surface-muted`.                                       |
| 3   | Three doors                                | The core section. Three large cards, one per pillar, each with an image, a heading, two lines, a bulleted three-item capability list and a text link. Cards are equal height, generous padding (48px), level-1 elevation.                                         |
| 4   | Explore by use case                        | Eight category cards in a 4x2 grid, each with a small illustration, the category name, a one-line description and a live count when a real count exists. Crawlable links to `/apis/[category]`.                                                                   |
| 5   | Featured APIs                              | Six `ApiCard`s in a 3x2 grid. Each shows name, provider, one-line use case, pricing basis, category chip and a link. If any placement is paid, the card says "Sponsored".                                                                                         |
| 6   | See it before you sign up                  | The evaluation section. A tabbed panel: Documentation, Sample response, Pricing, Limits. Real content in each tab for one representative API. This is the section that converts skeptical developers, because it proves the detail pages are worth visiting.      |
| 7   | Publish your API in four steps             | Horizontal stepper with a screenshot per step: create profile, describe the API, add endpoints and auth, preview and submit. Ends with a CTA to `/signup?intent=provider`.                                                                                        |
| 8   | Host it with us                            | The APIaaS pillar in detail. Framework logos as links to `/host/frameworks/[framework]`, a terminal snippet showing a deploy, and the free tier limits stated plainly.                                                                                            |
| 9   | Built for the way developers actually work | Four small feature tiles: one API key across services, code snippets in 15+ languages, consolidated billing, an in-browser playground. Each tile has a small screenshot, not an icon.                                                                             |
| 10  | Numbers we can stand behind                | Only real metrics. If the only true numbers at launch are "3 hosting regions" and "6 supported frameworks", show those two. An honest small number beats a fabricated large one, and it is the single strongest differentiator against every competitor listicle. |
| 11  | Questions people ask before signing up     | Six `QuestionAnswer` blocks, real answers, each 40 to 60 words, each with a link onward. This section is written for answer engines as much as for users. See section 10.                                                                                         |
| 12  | Final invitation                           | Full-width dark panel. Heading: **Start free, publish when you are ready.** Both CTAs repeated. Email field for the developer newsletter, with the actual sending frequency stated.                                                                               |
| 13  | Footer                                     | Four columns plus a legal row: Product, Developers, Company, Legal. Framework and category links live here for internal linking depth.                                                                                                                            |

Sections 2 through 12 alternate between `--color-surface` and `--color-surface-container-low` so the page has rhythm without borders everywhere. Sections 3, 6 and 12 are the three that must be excellent. If time is short, 9 and 10 can ship thinner.

### 5.3 Copy rules for the homepage

Verbs, not adjectives. "Publish your API" beats "Powerful publishing capabilities". No "revolutionary", "seamless", "cutting-edge", "unleash", "empower", "world-class". No exclamation marks. No countdown timers, no exit-intent popup, no "47 developers signed up today". The old `Website/apilh` build had an `ExitIntentPopup.tsx`. It is not carried forward.

Sentence case for every heading. Numerals for every number.

---

## 6. Image and asset plan

The Coordinator confirmed nothing usable exists yet, and the homepage needs a lot of imagery. This section is the production brief. agy treats it as a deliverable equal to the code.

### 6.1 Principle

Three quarters of the homepage imagery is rendered from real UI, not drawn. Building the actual component, populating it with clearly-labelled sample data, and screenshotting it at 2x produces images that are accurate, easy to update, and impossible for a competitor to buy from a stock library. It also means the images stay true as the product changes.

### 6.2 Production method

agy builds a route at `/dev/shots` (dev-only, blocked from production builds and from robots) that renders each required composition at a fixed viewport. A Playwright script in `scripts/capture-shots.ts` walks the list, screenshots each at device scale factor 2, and writes to `public/images/generated/`. The script is committed and rerunnable, so refreshing every homepage image after a design change is one command.

```
npm run shots          # capture all
npm run shots -- hero  # capture one group
```

Output rules: AVIF primary, WebP fallback, both generated at 1x and 2x by `next/image`. Every image has an explicit width and height. Every decorative image is `aria-hidden` with an empty alt. Every meaningful image gets alt text that describes the information, not the picture: "API detail page showing endpoints, authentication method and sample JSON response" rather than "screenshot".

### 6.3 The image inventory

Hero group, three overlapping surfaces:

1. `hero-catalog.png`: catalog grid at 1280px wide, 12 sample API cards visible, filter rail on the left, search populated with "flight status".
2. `hero-detail.png`: API detail page, endpoint list and a JSON response panel visible.
3. `hero-dashboard.png`: provider dashboard, three listings with status pills reading Published, In review, Draft.

Three doors group, one image each:

4. `door-marketplace.png`: catalog with a plan panel open.
5. `door-host.png`: a terminal beside a deploy status panel showing build, deploy, live.
6. `door-directory.png`: directory list view with free and public badges.

Category group, eight illustrations:

7. `cat-*.svg`: flat geometric illustrations in navy, `primary-40`, `primary-80` and one amber highlight each. 400x300 viewBox, no gradients beyond a single linear step, no photographic elements. Drawn as SVG so they scale, theme and weigh almost nothing.

Evaluation group:

8. `eval-docs.png`, `eval-response.png`, `eval-pricing.png`, `eval-limits.png`: the four tab states of section 6.

Publishing group, four step screenshots:

9. `step-1-profile.png` through `step-4-preview.png`: the actual submission wizard.

Hosting group:

10. `host-terminal.png`: a real terminal session, monospace, dark, showing a deploy.
11. `framework-*.svg`: six framework marks. These are third-party logos. agy checks each project's trademark or brand policy before use and records the result in `docs/licences.md`. If a policy is unclear, the framework gets a text label instead of a mark.

Feature tiles:

12. `tile-keys.png`, `tile-snippets.png`, `tile-billing.png`, `tile-playground.png`: small, cropped tight to the relevant UI, 640x400.

Brand:

13. `og-default.png` (1200x630), plus per-template OG images generated at request time via `next/og` for API detail, category and guide pages, using the page's own title and provider name. Dynamic OG images are one of the highest-return small features for social and chat sharing.
14. Favicon set and app icons, regenerated from `Logo/logo-only.png`. The existing `Logo/IconKitchen-Web` folder already has a set; agy checks it before regenerating.

Illustrations that cannot come from UI (the abstract category art and any explanatory diagrams) are produced as SVG by hand or generated and then hand-corrected. No stock photography of people at laptops anywhere on the site.

### 6.4 Sample data

All screenshot content comes from `content/fixtures/`, a single typed dataset of providers, APIs, plans and responses. Provider names in fixtures are obviously fictional (Northwind Aviation, Meridian Data, Halcyon SMS). No real company's name, logo or pricing appears in a fixture. Where a screenshot shows a catalog, the UI in that screenshot includes the visible "Sample data" marker that the real app shows in fixture mode, so no screenshot can be mistaken for a live count.

### 6.5 Budget

Hero composition total, all three images combined, under 220KB after AVIF encoding. Any single below-fold image under 120KB. Category SVGs under 6KB each. Only the hero images and the header logo are eager. Everything else is `loading="lazy"` with `fetchpriority="low"`.

---

## 7. Signup conversion architecture

The Coordinator's requirement is that the homepage invites signup. That is an architecture problem, not a copy problem.

### 7.1 Where signup is offered

Seven places, each with a different reason to click: header button (always), hero primary CTA, each of the three door cards, the publishing stepper, the free-tier line on the hosting section, the final panel. Plus contextual entry from `/apis/[provider]/[api]` on the plan panel and from the directory on "save this API".

### 7.2 Intent is carried through

Every signup link carries intent, and the signup page adapts to it.

```
/signup                          → generic
/signup?intent=provider          → "Publish your API"
/signup?intent=host              → "Deploy your first API"
/signup?intent=subscribe&api=... → "Subscribe to Northwind Flight Status"
/signup?from=directory&save=...  → "Save this API to your list"
```

The intent survives the whole flow: form → email verification → verification click → landing. A user who clicked "Publish your API" and then verified their email lands on `/dashboard/apis/new`, not a generic dashboard. Losing intent at the verification step is the most common signup leak and it is worth a dedicated test.

Implementation: intent is stored server-side against the pending signup record, not only in a query string, because the verification link is often opened in a different browser.

### 7.3 The signup form

Three fields: email, password, and a single choice of "I want to use APIs" or "I want to publish APIs" (pre-selected from intent, changeable, and not binding, since one account can do both). Nothing else. No company size, no phone, no "how did you hear about us".

Password rules stated before typing, not after failure. Minimum 12 characters, no composition rules, checked against a common-password list server-side. Show-password toggle. `autocomplete="new-password"`.

Social sign-in with GitHub and Google, above the email form, because the audience is developers and GitHub sign-in materially lifts developer signup rates.

Every error message says what to do. "That email is already registered. Log in instead, or reset your password." with both as links.

### 7.4 What happens after signup

Verification email arrives within 30 seconds, with a resend that is enabled after 30 seconds and rate-limited. Expired links get a page that offers a new one rather than an error.

First dashboard visit shows a three-item checklist matched to intent, and the first item is completable in under two minutes. For providers: create your provider profile. For consumers: pick an API and generate a key. The activation metric in section 15 is defined against completing item one.

### 7.5 Signup anti-patterns that are out of scope

No modal on page load. No exit intent. No scroll-triggered overlay. No "continue reading" gate on guides. No mandatory signup to see documentation or pricing. Gating the evaluation content is the single fastest way to lose a developer audience, and the whole SEO strategy in section 9 depends on that content being public.
---

## 8. Keyword strategy: the ten targets

### 8.1 A note on the numbers

Semrush is connected to this workspace but the account is out of API units, so search volumes and difficulty scores could not be pulled for this version of the plan. The ten targets below were selected on search intent, competitor evidence and business fit. Volume and difficulty must be validated before content is commissioned. Section 8.4 says how.

Nothing in this table should be treated as a measured figure.

### 8.2 The ten

| #   | Keyword                                   | Intent                              | Owning page                            | Why it is the right target                                                                                                                                                                  |
| --- | ----------------------------------------- | ----------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | api marketplace                           | Commercial investigation            | `/`                                    | The category term. Hardest of the ten and a long game, but the homepage has to be built around it or the whole site has no centre.                                                          |
| 2   | rapidapi alternative                      | Commercial, high purchase intent    | `/compare/rapidapi-alternative`        | Nokia acquired Rapid in November 2024 and the alternatives topic is now heavily contested by listicles. Buyers searching this are actively switching. Highest short-term return of the ten. |
| 3   | sell your api                             | Transactional, provider side        | `/providers`                           | Directly matches the marketplace supply problem. Low competition relative to value, because most competitors write for buyers and neglect sellers.                                          |
| 4   | api monetization platform                 | Commercial, provider side           | `/providers` supporting cluster        | Same audience as 3, phrased the way a founder or product manager searches. Supports 3 rather than competing with it.                                                                        |
| 5   | api hosting platform                      | Commercial, hosting pillar          | `/host`                                | The APIaaS pillar, which is 78% of year-one revenue in the business plan. Must be owned or the revenue pillar has no organic entry point.                                                   |
| 6   | host fastapi api / deploy asp.net web api | Transactional, framework specific   | `/host/frameworks/[framework]`         | Six framework pages, each winnable individually, each with clear implementation intent. This is where hosting signups actually come from.                                                   |
| 7   | free api directory                        | Informational, high volume          | `/directory`                           | The traffic engine. Weakest signup intent of the ten, strongest volume and strongest internal-link value into everything else.                                                              |
| 8   | free apis for developers                  | Informational, top of funnel        | `/directory` and guide cluster         | The phrasing developers actually use. Feeds the directory and earns links, which is what lifts the harder terms.                                                                            |
| 9   | flight status api / airline api           | Commercial, category                | `/apis/travel-airline`                 | The category the Coordinator has flagged as a launch example. Specific, high commercial value, and a category where honest coverage documentation beats every competitor's marketing.       |
| 10  | best api for [use case]                   | Commercial investigation, templated | `/guides/[slug]` and `/compare/[slug]` | A repeatable pattern, not one keyword: best SMS API, best company data API, best AI model API. Each is individually winnable and each is exactly the phrasing that answer engines resolve.  |

Targets 2, 3, 6, 9 and 10 are the fast ones. Targets 1, 5 and 7 are the twelve-month ones. Build the fast ones first and let them earn the authority that the head terms need.

### 8.3 Supporting clusters

Around each of the ten, agy and the content owner build a cluster of three to eight supporting pages that link up to the owning page. Examples:

Around `rapidapi alternative`: rapidapi vs api lighthouse, rapidapi pricing explained, migrating from rapidapi, api marketplace comparison.

Around `sell your api`: how to price an API, API monetization models compared, what a good API listing includes, how much marketplaces charge.

Around `flight status api`: flight status vs flight booking APIs, how flight data coverage works, what airline API documentation should tell you, IATA and ICAO codes explained for developers.

Around `free api directory`: free APIs by category pages, what "free" means in API pricing, rate limits explained.

One page owns one intent. Two pages competing for the same phrase is the most common self-inflicted SEO wound and the old project had several.

### 8.4 Validating the numbers

Before any content is commissioned, run this in Semrush once units are available:

1. `keyword_overview` for all ten seeds, US and GB databases, plus SA for the regional terms.
2. `related_keywords` and `phrase_questions` on seeds 2, 3, 5, 7 and 9, minimum 100 rows each.
3. `domain_organic` on `rapidapi.com`, `apilayer.com`, `zylalabs.com`, `apyhub.com` and `publicapis.dev` to see what actually ranks.
4. `keyword_gap` between those domains to find terms all competitors rank for and none defend well.

Record the output in `docs/seo/keyword-research.md` with the pull date. Re-run quarterly. Any keyword whose volume comes back under 50 per month gets replaced from the gap analysis rather than kept for symmetry.

Top-up page for Semrush units: https://www.semrush.com/mcp-access

---

## 9. SEO implementation

### 9.1 Rendering

Every public page is server-rendered or statically generated with the full content in the initial HTML. The test agy runs on every public template: `curl` the URL, and the headline, body copy, prices and links must all be in the response. If a page needs JavaScript to show its content, it does not ship.

Catalog and directory pages read filters from the URL and render server-side. Client JavaScript enhances them, it does not create them.

### 9.2 Metadata

Next.js `generateMetadata` on every route. No page inherits a default title.

Title patterns:

```
/                      API Lighthouse: API marketplace, hosting and free directory
/apis                  Browse APIs by category and use case | API Lighthouse
/apis/[category]       {Category} APIs: compare {n} services | API Lighthouse
/apis/[p]/[api]        {API} by {Provider}: pricing, docs and endpoints
/host                  API hosting for FastAPI, ASP.NET and Next.js
/host/frameworks/[f]   Deploy a {Framework} API: hosting, scaling and pricing
/providers             Sell your API: publish, price and get paid
/directory             Free API directory: {n} public APIs, searchable
/guides/[slug]         {Guide title}
/compare/[slug]        {A} vs {B}: an honest comparison
```

Titles stay under 60 characters where possible, descriptions between 140 and 158, and every description contains the primary term once and a reason to click. Descriptions are written, never generated by truncating the first paragraph.

Canonical on every page, self-referencing, absolute. Filter URLs canonicalise to themselves and carry `noindex, follow`, which is correct: they should not be indexed but their links should still be followed.

### 9.3 Structured data

JSON-LD, generated from the same data that renders the page, so markup and visible content can never diverge.

| Page                    | Types                                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------------- |
| All pages               | `Organization`, `WebSite` with `SearchAction`                                                            |
| All non-home            | `BreadcrumbList`                                                                                         |
| `/apis/[p]/[api]`       | `SoftwareApplication` or `Product` with `Offer`, only where a real price exists. `WebAPI` where it fits. |
| `/providers/[provider]` | `Organization`                                                                                           |
| `/guides/[slug]`        | `Article` with `author`, `datePublished`, `dateModified`                                                 |
| `/compare/[slug]`       | `Article`                                                                                                |
| FAQ blocks              | `FAQPage`, for the machine-readable benefit only                                                         |

No `AggregateRating` and no `Review` until there are real ratings from real users. No `Offer` on an API whose price is "contact provider". Google's rich result tests run in CI on one representative page per template.

### 9.4 Crawl and index control

`robots.txt` allows everything except `/dashboard`, `/dev`, `/api/`. Nothing that carries `noindex` is also disallowed in robots, because a blocked page's `noindex` never gets read.

Three sitemaps behind an index: `sitemap-pages.xml` (static routes), `sitemap-apis.xml` (published listings and providers, generated from the database), `sitemap-content.xml` (guides, comparisons, docs). Regenerated on publish, not on a cron. `lastmod` is real.

Removed listings return 410, not a redirect to the homepage. Renamed routes get a 301 recorded in `docs/seo/redirects.md`.

### 9.5 Internal linking

Every API detail page links to its category, its provider, at least two alternatives, and at least one guide. Every guide links to at least three relevant APIs and one category. Every category links to its guides. The footer carries framework and category links so no page is more than three clicks from home.

Anchor text is descriptive. "Flight status API pricing" not "click here" and not "read more".

### 9.6 Migration

The old versions were largely prototypes and may never have been publicly indexed. Before launch agy confirms this rather than assuming it: check Search Console if a property exists, check whether `apilh.com` or any prototype URL currently resolves, and check for indexed URLs with a site: query. Whatever is found goes into `docs/seo/legacy-urls.md` with a mapping. If nothing is indexed, the file records that finding and the migration work stops there.

---

## 10. AEO: getting cited by ChatGPT, Google AI and Perplexity

### 10.1 What actually works

Google's own guidance is explicit: there are no additional requirements to appear in AI Overviews or AI Mode, no special files, no AI-specific schema. Pages need to be crawlable, indexed, snippet-eligible, and have their important content in text. Everything in section 9 is therefore also the AEO foundation.

What differentiates a page that gets cited from one that does not is structure and specificity. Answer engines extract passages. A page built as a set of clearly-bounded, self-contained answers gets extracted. A page built as a flowing essay does not.

### 10.2 The answer block pattern

Every guide, comparison and FAQ answer on the site follows this shape:

1. An H2 or H3 phrased as the question a person would actually type or ask.
2. A direct answer in the first 40 to 60 words, complete on its own, with no pronoun referring back to the heading.
3. The conditions, exceptions or limits, in the next paragraph.
4. A table, code sample or response excerpt where the answer has structure.
5. A named author and a real `dateModified`.
6. One contextual link onward.

The second point is the one that gets missed. "It depends on the provider" is not extractable. "Most flight status APIs update every 60 seconds for en-route aircraft and every 5 minutes for scheduled departures, though coverage varies by region" is.

### 10.3 The twenty questions to answer first

These map to the ten keywords and are the first content commissioned. Each becomes either a page or a block on an existing page.

What is an API marketplace, and how is it different from an API gateway. How much do API marketplaces charge providers. What happens to my RapidAPI listings now that Nokia owns Rapid. How do I sell access to an API I built. How do I price an API. What is the difference between per-call and subscription API pricing. How do I host a FastAPI application in production. How do I deploy an ASP.NET Core Web API without managing servers. What does an API free tier usually include. What is the difference between a free API and an open API. How do I find a free API for a given task. Does a flight status API let me book tickets. How accurate is flight status data. What should an API's documentation contain before I trust it. How do I compare two APIs that do the same thing. What is an OpenAPI specification and why does a marketplace ask for one. How long does it take to get an API listed. What are API rate limits and how do I plan for them. How do I rotate an API key safely. What happens to my integration if a provider retires an API.

### 10.4 Entity consistency

The same name everywhere: "API Lighthouse", never "APILighthouse", "API-Lighthouse" or "APILH" in prose. `apilh.com` is the domain, not the brand.

One canonical description, reused verbatim in the `Organization` JSON-LD, the OG description, the About page first paragraph, the footer, and every external profile (GitHub, LinkedIn, Crunchbase, Product Hunt, G2). Answer engines resolve entities by corroboration across sources, so consistency across profiles does more than any on-site tweak.

Publish an About page that states what the company is, where it operates from, when it started and who runs it. Anonymous companies do not get cited.

### 10.5 Measurement

Monthly, ask a fixed set of ten questions to ChatGPT, Google AI Mode, Perplexity and Claude, and record whether API Lighthouse appears, which URL is cited, and whether the answer is accurate. Log it in `docs/seo/aeo-log.md`.

Treat this as directional. Answers vary between runs and between users. Do not report mentions as traffic and do not equate them with revenue. The metric that matters is still qualified signups.

### 10.6 What not to do

No `llms.txt` as a substitute for indexable content. It is an unratified convention and no major engine has confirmed it as a ranking or inclusion input. If agy adds one, it is a five-minute experiment, it is documented as an experiment, and nothing depends on it.

No cloaked content for crawlers. No AI-generated bulk pages. No "best X" claims without stated criteria and a review date. No fabricated FAQ answers to farm `FAQPage` markup.

---

## 11. Content strategy

### 11.1 What makes the content user-friendly

Answer the question in the first paragraph. Show the code before explaining it. State limits and costs plainly rather than burying them. Say what the product does not do.

Reading level around grade 9 for marketing pages and grade 11 for technical guides. Short paragraphs, three sentences or fewer. Sentence case headings. One idea per section.

Every technical claim on the site is either linked to primary documentation or removed.

### 11.2 Content types and cadence

| Type                    | Purpose                                     | Volume at launch                | Owner                                                                        |
| ----------------------- | ------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------- |
| Category pages          | Rank for category terms, route to listings  | 8                               | Content owner, editorially reviewed                                          |
| API detail pages        | Rank for provider and product terms         | All published listings          | Generated from provider submissions, editorially reviewed before publication |
| Framework hosting pages | Rank for deploy intent                      | 6                               | Content owner                                                                |
| Guides                  | Answer implementation questions, earn links | 12 at launch, 4 per month after | Content owner                                                                |
| Comparisons             | Capture switching intent                    | 4 at launch, 1 per month        | Content owner, with stated criteria and review dates                         |
| Docs                    | Support the product, rank for long tail     | Full quickstart plus reference  | agy and content owner                                                        |
| Answer blocks           | AEO extraction                              | 20 per section 10.3             | Content owner                                                                |

### 11.3 Editorial rules for provider-submitted content

Provider descriptions and documentation are untrusted input. Sanitise all rendered markdown. Strip scripts, iframes, event handlers and external stylesheets. Render provider links with `rel="nofollow ugc"` until a provider is verified.

Every listing goes through review before publication. Review checks that the description matches what the API does, that pricing is stated in a real currency with a real unit, that documentation resolves, and that no unverifiable claim (uptime percentages, certifications, customer names) is present.

### 11.4 The claim register

Every factual claim that appears anywhere public goes into `docs/content/claims.md` with four columns: the claim, the evidence, who approved it, and the date. A claim without evidence does not ship. This is the direct fix for what went wrong with the previous build, where the code contained API counts, uptime figures and compliance claims that nothing supported.
---

## 12. Technical architecture

### 12.1 Stack

| Layer      | Choice                                                                                 | Reason                                                                                                                                                                                      |
| ---------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework  | Next.js, App Router, latest stable at scaffold time                                    | Server components give the SEO requirement in section 9.1 for free. Confirmed against the business plan's own stack choice.                                                                 |
| Language   | TypeScript, `strict: true`                                                             |                                                                                                                                                                                             |
| Styling    | Tailwind CSS, configured entirely from the tokens in section 3.2                       | Tailwind's theme is generated from the token file, not the reverse                                                                                                                          |
| Components | Radix primitives, styled in-house                                                      | Accessible behaviour without inheriting a visual language that fights the design system                                                                                                     |
| Data       | PostgreSQL via Drizzle ORM                                                             | Typed schema, SQL-first migrations, small runtime                                                                                                                                           |
| API layer  | Next.js route handlers under `/app/api`                                                | Confirmed decision. One codebase, one deploy.                                                                                                                                               |
| Auth       | Auth.js (NextAuth) with credentials, GitHub and Google providers, sessions in Postgres |                                                                                                                                                                                             |
| Validation | Zod, shared between client and server, one schema per contract                         |                                                                                                                                                                                             |
| Email      | Resend or SendGrid, transactional only                                                 | Choice recorded in the ADR at scaffold time                                                                                                                                                 |
| Content    | MDX in `content/`, compiled at build                                                   | Guides and docs in git, reviewable in pull requests                                                                                                                                         |
| Search     | Postgres full-text with `tsvector` and trigram fallback                                | Elasticsearch is in the business plan for later scale. It is not needed for a few thousand listings and adds an operational dependency v1 does not need. Recorded as a deliberate deferral. |
| Testing    | Vitest for units, Playwright for journeys and screenshots                              |                                                                                                                                                                                             |
| Hosting    | Vercel for the app, managed Postgres (Neon or Supabase Postgres)                       | Recorded in the ADR                                                                                                                                                                         |
| Analytics  | Self-hosted Plausible or PostHog                                                       | No third-party script that blocks the main thread                                                                                                                                           |
| Errors     | Sentry, with PII scrubbing on                                                          |

Dependencies are chosen at scaffold time at their current stable versions. agy does not copy versions out of the archived `Website/apilh/package.json`.

### 12.2 Directory structure

```
apilh-web/
  app/
    (marketing)/            # /, /host, /providers, /pricing, /about
    (catalog)/              # /apis, /apis/[category], /apis/[p]/[api]
    (directory)/            # /directory, /directory/[slug]
    (content)/              # /guides, /compare, /docs
    (auth)/                 # /signup, /login, /verify, /reset
    (dashboard)/            # /dashboard/*
    api/                    # route handlers
    sitemap-[type]/route.ts
    opengraph-image.tsx
  components/
    ui/                     # primitives from 3.7
    product/                # product components from 3.7
    marketing/              # homepage sections
  features/
    catalog/                # search, filters, cards
    listing/                # detail page composition
    publishing/             # submission wizard, validation, preview
    auth/                   # signup, intent, verification
    dashboard/
  lib/
    db/                     # drizzle schema, migrations, queries
    seo/                    # metadata builders, JSON-LD builders
    analytics/
    validation/             # zod schemas
    fixtures/               # sample data, dev only
  content/
    guides/ compare/ docs/ categories/
  styles/
    tokens.css reset.css
  scripts/
    capture-shots.ts seed.ts
  tests/
    unit/ e2e/
  docs/
    adr/ seo/ content/ licences.md
```

### 12.3 Data model

Nine tables for v1. Payments are out of scope, so `plan` stores presentational pricing only and no subscription table exists yet.

```
users            id, email, email_verified_at, password_hash, name,
                 signup_intent, created_at
accounts         oauth provider links (Auth.js)
sessions         Auth.js
providers        id, owner_user_id, slug, name, website, description,
                 logo_url, support_email, verified_at, created_at
apis             id, provider_id, slug, name, summary, description_md,
                 category_id, status, auth_type, base_url, docs_url,
                 openapi_url, coverage_notes, published_at, created_at
api_versions     id, api_id, version, changelog_md, released_at
endpoints        id, api_id, method, path, summary, sample_response_json
plans            id, api_id, name, price_amount, price_currency,
                 price_unit, included_units, overage_note, is_contact_only
categories       id, slug, name, intro_md, seo_title, seo_description
saved_apis       user_id, api_id, created_at
```

`status` on `apis` is one of `draft`, `submitted`, `changes_requested`, `published`, `suspended`, `retired`. Only `published` appears in the public catalog, the sitemap or any feed.

Every table has `created_at` and `updated_at`. Public claims on a listing carry `last_reviewed_at` so the review process in section 11.3 is enforceable in data, not just in policy.

### 12.4 Security requirements

Authorisation is checked server-side on every route handler and every server action. Hiding a button is not access control.

Provider-submitted markdown is sanitised on render with an allowlist. OpenAPI URLs are fetched server-side with a timeout, a size cap and SSRF protection: reject private IP ranges, reject redirects to private ranges, reject non-HTTPS.

Rate limits on signup, login, password reset, verification resend and search. Passwords hashed with Argon2id. Sessions in the database with rotation on privilege change. CSRF on every state-changing request. Security headers set in middleware: HSTS, `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, and a Content-Security-Policy with no `unsafe-inline` for scripts.

No secrets in the client bundle. `.env.example` lists variable names and descriptions only.

### 12.5 RTL readiness

Every layout uses logical properties. `dir` is set on `<html>` from a single locale value. A Playwright test renders the homepage, catalog and API detail with `dir="rtl"` and asserts no horizontal overflow and no visually reversed reading order. This test runs from day one even though Arabic content does not exist yet, because it is the only thing that keeps the codebase honest about RTL.

---

## 13. Performance, accessibility and quality budgets

### 13.1 Performance

Field targets at the 75th percentile: LCP 2.5s or better, INP 200ms or better, CLS 0.1 or better.

Engineering budgets, enforced in CI:

| Budget                                     | Limit   |
| ------------------------------------------ | ------- |
| Initial JS on any public route, compressed | 180KB   |
| Initial CSS, compressed                    | 40KB    |
| Fonts in the critical path                 | 2 files |
| Hero images total                          | 220KB   |
| Any single below-fold image                | 120KB   |
| Third-party scripts on public routes       | 0       |

The playground, code editors, charts and anything using a syntax highlighter are dynamically imported and never in the initial bundle. Every image has explicit dimensions. Fonts use `font-display: swap` with a metric-matched fallback so the swap does not shift layout.

Lighthouse CI runs on `/`, `/apis`, `/apis/[category]`, `/apis/[p]/[api]`, `/host` and `/guides/[slug]` on every pull request. A drop below 90 on performance or below 100 on accessibility fails the build.

### 13.2 Accessibility

Target WCAG 2.2 AA. Not aspirationally, as a merge gate.

Every journey completable by keyboard alone. Visible focus on every interactive element. Semantic landmarks, one H1 per page, headings in order. Labels associated with inputs. Errors announced through a live region and linked from a summary at the top of the form. Contrast verified against the tokens in section 3.2, which were chosen with measured ratios.

Test at 320px width, at 200% zoom and at 400% zoom with reflow. Test with a mobile keyboard open. Test with long API names and long provider names, because that is what actually breaks card layouts.

Automated axe checks in Playwright on every template. Manual screen reader pass with NVDA and VoiceOver on the homepage, catalog, API detail and signup before launch.

### 13.3 Browser support

Last two versions of Chrome, Safari, Firefox and Edge, plus iOS Safari and Chrome Android. `backdrop-filter` degrades to a solid surface. No feature that breaks the page if unsupported.

---

## 14. Analytics and measurement

### 14.1 Events

```
page_view                    path, referrer, entry_intent
hero_search_submitted        query, results_count
category_clicked             category, placement
api_viewed                   api_id, provider, category, source
plan_viewed                  api_id, plan_id
signup_cta_clicked           placement, intent
signup_started               intent
signup_completed             intent, method
email_verified               intent, minutes_since_signup
activation_completed         intent, action
provider_profile_created
api_draft_created
api_submitted
api_published
search_no_results            query
```

`placement` distinguishes the seven signup entry points in section 7.1. Without it there is no way to know which part of the homepage actually converts, which was one of the failures of the previous build.

### 14.2 What is never recorded

Passwords, API keys, tokens, uploaded documents, full request or response bodies, email addresses in event properties. Sentry runs with PII scrubbing on and a `beforeSend` that drops anything matching a key pattern.

### 14.3 The funnels

| Funnel    | Path                                                                                                                                                                 | Headline metric                           |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Provider  | `signup_cta_clicked(intent=provider)` → `signup_completed` → `email_verified` → `provider_profile_created` → `api_draft_created` → `api_submitted` → `api_published` | Published listings per provider signup    |
| Consumer  | `api_viewed` → `signup_cta_clicked` → `signup_completed` → `activation_completed`                                                                                    | Activated accounts per API detail view    |
| Discovery | `hero_search_submitted` or `category_clicked` → `api_viewed`                                                                                                         | Search to detail rate, and no-result rate |
| Organic   | organic landing → any of the above                                                                                                                                   | Activated users by landing page           |

Establish a baseline before setting any target. No conversion goals are written into this plan because there is no traffic to base them on, and a target invented now would only distort the first three months of decisions.

---

## 15. Build phases and backlog

Each ticket has an ID agy uses in commit messages and pull request titles. Dependencies are listed. A ticket is done when its acceptance criteria pass and its verification step in section 16 has been run.

### Phase 0: foundation

| ID     | Task                                                                                                                                            | Depends on | Done when                                                                                                |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------- |
| DEV-01 | Create `apilh-web` folder and GitHub repo, scaffold Next.js with TypeScript and Tailwind, set up ESLint, Prettier, commit hooks, GitHub Actions |            | `dev`, `build`, `lint`, `typecheck` and `test` all run clean, CI green on first push                     |
| DEV-02 | Write ADR 001 (stack), ADR 002 (data model), ADR 003 (rendering and indexing policy) in `docs/adr/`                                             | DEV-01     | Three ADRs committed, each stating the decision, the alternatives and the consequence                    |
| DEV-03 | Implement `styles/tokens.css` from section 3.2, wire Tailwind theme to it, add the lint rule that rejects raw hex outside the token file        | DEV-01     | A raw hex in a component fails lint                                                                      |
| DEV-04 | Self-host Inter and JetBrains Mono, subset, verify licences, record in `docs/licences.md`                                                       | DEV-03     | Two WOFF2 files in the critical path, licences documented                                                |
| DEV-05 | Build the UI primitives from section 3.7 with all states, plus `/dev/components`                                                                | DEV-03     | Every primitive keyboard operable, axe clean, dark theme correct                                         |
| DEV-06 | Postgres schema and migrations per section 12.3, plus `scripts/seed.ts` loading the fixtures from 6.4                                           | DEV-01     | `npm run db:migrate && npm run db:seed` gives a working local database with visibly-labelled sample data |

### Phase 1: public site

| ID     | Task                                                                                                                       | Depends on     | Done when                                                                            |
| ------ | -------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------ |
| DEV-07 | `SiteHeader` with sticky translucent behaviour, mega panels, mobile drawer, and `SiteFooter`                               | DEV-05         | Signup button reachable at every breakpoint, panels keyboard operable, Escape closes |
| DEV-08 | Build `/dev/shots` and `scripts/capture-shots.ts`, produce the hero and door images                                        | DEV-05, DEV-06 | `npm run shots` regenerates every homepage image                                     |
| DEV-09 | Homepage sections 1 to 5                                                                                                   | DEV-07, DEV-08 | Renders correctly with JavaScript disabled, hero LCP under 2.5s on throttled 4G      |
| DEV-10 | Homepage sections 6 to 13                                                                                                  | DEV-09         | All seven signup entry points present and instrumented                               |
| DEV-11 | Catalog at `/apis`: server-rendered search, filters in the URL, pagination, empty state, error state, mobile filter drawer | DEV-05, DEV-06 | Back button restores filter state, no-JS search works via form GET                   |
| DEV-12 | Category template `/apis/[category]` with editorial intro from `content/categories`                                        | DEV-11         | Eight categories live, none with fewer than five entries                             |
| DEV-13 | API detail `/apis/[p]/[api]`: facts, endpoints, sample response, plans, provider, alternatives                             | DEV-11         | Every field has a "Not provided" state, no invented values                           |
| DEV-14 | Provider profile `/providers/[provider]` and the `/providers` sales page                                                   | DEV-13         |                                                                                      |
| DEV-15 | `/host` and six `/host/frameworks/[framework]` pages                                                                       | DEV-05         | Framework marks cleared for use or replaced with text                                |
| DEV-16 | `/directory` and `/directory/[slug]`                                                                                       | DEV-11         |                                                                                      |
| DEV-17 | MDX pipeline, `/guides/[slug]`, `/compare/[slug]`, `/docs/[...slug]`, with author bylines and `dateModified`               | DEV-05         | Answer block pattern from 10.2 rendered as a reusable component                      |
| DEV-18 | `/pricing`, `/about`, `/contact`, `/trust`, `/status`, `/legal/*`                                                          | DEV-05         | No policy text presented as approved until the Coordinator confirms it               |

### Phase 2: accounts

| ID     | Task                                                                                                                      | Depends on | Done when                                                                                     |
| ------ | ------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------- |
| DEV-19 | Auth.js setup, credentials plus GitHub and Google, sessions in Postgres, rate limiting                                    | DEV-06     |                                                                                               |
| DEV-20 | `/signup` with intent handling per section 7.2, `/login`, `/verify`, `/reset`                                             | DEV-19     | Intent survives email verification opened in a different browser. This has its own test.      |
| DEV-21 | Transactional email: verification, resend with 30s cooldown, password reset, expired-link recovery page                   | DEV-20     |                                                                                               |
| DEV-22 | `DashboardShell` and `/dashboard` with the intent-matched activation checklist                                            | DEV-20     | First checklist item completable in under two minutes                                         |
| DEV-23 | Provider profile creation at `/dashboard/settings/provider`                                                               | DEV-22     |                                                                                               |
| DEV-24 | Submission wizard `/dashboard/apis/new`: four steps, autosave draft, resume, Zod validation, live listing preview, submit | DEV-23     | Draft survives a browser close and reopen. Preview is the real listing component, not a mock. |
| DEV-25 | `/dashboard/apis` list with status pills and edit, plus `saved_apis` for consumers                                        | DEV-24     |                                                                                               |

### Phase 3: SEO, AEO and launch readiness

| ID     | Task                                                                     | Depends on       | Done when                                                                                                      |
| ------ | ------------------------------------------------------------------------ | ---------------- | -------------------------------------------------------------------------------------------------------------- |
| DEV-26 | `generateMetadata` on every route per section 9.2, no inherited titles   | DEV-09 to DEV-18 | A script asserts every public route has a unique title and description                                         |
| DEV-27 | JSON-LD builders per 9.3, generated from page data                       | DEV-26           | Rich Results Test passes on one page per template, run in CI                                                   |
| DEV-28 | Three sitemaps plus index, `robots.txt`, 410 handling, redirect map      | DEV-26           | Only published, indexable URLs appear in a sitemap                                                             |
| DEV-29 | Dynamic OG images via `next/og` for detail, category and guide templates | DEV-26           |                                                                                                                |
| DEV-30 | Analytics implementation per section 14, with `placement` on every CTA   | DEV-10, DEV-25   | Events visible end to end in the analytics tool                                                                |
| DEV-31 | Legacy URL investigation per section 9.6                                 |                  | `docs/seo/legacy-urls.md` exists and states what was found, including "nothing indexed" if that is the finding |
| DEV-32 | Performance and accessibility pass against the budgets in section 13     | All              | Lighthouse CI gates green, axe clean, manual screen reader pass recorded                                       |
| DEV-33 | Release verification per section 17 and a handover report                | All              | Checklist complete, open limitations documented                                                                |

Phase 1 can proceed entirely on fixtures. Phase 2 needs the database. Nothing in phase 1 depends on a decision that is still open.

---

## 16. Testing and QA

### 16.1 What agy tests

Unit tests, Vitest: Zod schemas including every rejection path, URL filter serialisation and parsing, metadata builders, JSON-LD builders, price formatting including the contact-only case, slug generation.

Integration tests: catalog query with each filter combination, listing status transitions, authorisation on every dashboard route handler for the unauthenticated, wrong-owner and correct-owner cases.

End-to-end, Playwright, at 375px and 1440px:

1. Visitor lands on the homepage, searches, opens a category, opens an API, reads pricing, clicks subscribe, signs up, verifies, lands on the API they started from.
2. Visitor clicks "Publish your API", signs up, verifies, lands on the submission wizard, creates a provider profile, fills a draft, closes the browser, returns, resumes the draft, previews and submits.
3. Keyboard-only pass through the homepage, catalog and signup with no mouse.
4. RTL render check per section 12.5.
5. No-JavaScript render of the homepage, a category and an API detail, asserting content is present.

Visual regression on the homepage, catalog and API detail at both widths.

### 16.2 What the Coordinator reviews

Every pull request gets a preview deployment URL. The Coordinator reviews the homepage, one category, one API detail and the signup flow on the preview before merge to `main`. agy posts the preview URL and a two-line summary of what changed on every pull request.

### 16.3 Git workflow

Branch per ticket: `feat/DEV-09-homepage-hero`. Conventional commits with the ticket ID: `feat(home): build hero and search (DEV-09)`. agy owns every commit and push for its own tickets. Claude reviews the pull request against this document before squash merge to `main`. `main` is always deployable. Tags at each phase boundary.

Every pull request runs lint, typecheck, unit tests, Playwright, Lighthouse CI and the metadata uniqueness script. Nothing merges red.

### 16.4 Reporting back

After each ticket agy reports to Claude: what was built, what was verified and how, what was not done and why, and anything that needs a Coordinator decision. Claude checks the report against the acceptance criteria in section 15 before treating a ticket as done, then relays anything Shahad needs to decide. Short. No status theatre.

---

## 17. Release checklist

- [ ] Every public route renders complete content with JavaScript disabled
- [ ] Every public route has a unique title, description and self-referencing canonical
- [ ] JSON-LD validates and matches visible content on every template
- [ ] Sitemaps contain only published, indexable URLs; `lastmod` is real
- [ ] `robots.txt` does not block anything that carries `noindex`
- [ ] No sample or fixture data is reachable in production
- [ ] Every claim on a public page appears in `docs/content/claims.md` with evidence
- [ ] Signup intent survives verification in a different browser
- [ ] Draft submission survives a browser close and reopen
- [ ] Every dashboard route handler enforces authorisation server-side
- [ ] Provider markdown is sanitised; OpenAPI fetch has SSRF protection
- [ ] Rate limits active on signup, login, reset, resend and search
- [ ] Lighthouse: performance 90+, accessibility 100, on all six sampled routes
- [ ] Keyboard-only pass and screen reader pass recorded
- [ ] RTL test passes with no horizontal overflow
- [ ] Analytics distinguish CTA click, signup completed and activation
- [ ] Production indexing enabled; preview and staging return `noindex` and are password protected
- [ ] Error monitoring live with PII scrubbing on
- [ ] `.env.example` complete, no real secrets anywhere in git history
- [ ] README covers setup, seed, development, test, build and deploy
- [ ] Rollback procedure documented and tested once

---

## 18. Still open

These do not block phase 1. They block the tickets named beside them.

| Question                                                                                                                      | Blocks                | Why it matters                                                  |
| ----------------------------------------------------------------------------------------------------------------------------- | --------------------- | --------------------------------------------------------------- |
| Confirm `apilh.com` is the launch domain and it is under our control                                                          | DEV-28, DEV-31        | Canonical URLs, sitemaps and OG images all need the real origin |
| Hosting plan prices and free tier limits: are the business plan figures ($0 / $29 / $99 / $299 / $999+) confirmed for launch? | DEV-18                | `/pricing` cannot ship with projected prices presented as real  |
| Marketplace commission: is 15% confirmed and public?                                                                          | DEV-14, DEV-18        | It is a headline differentiator and a legal commitment          |
| Who reviews and approves listings, and what is the target turnaround?                                                         | DEV-24                | The submission UI has to state a real timeframe                 |
| Are there real launch providers and APIs, or does the catalog launch on labelled sample data?                                 | DEV-12, DEV-13        | Determines whether category pages can be indexed at launch      |
| Legal: are terms, privacy and a DPA drafted and approved?                                                                     | DEV-18                | Placeholder policy text cannot be presented as approved         |
| Email sending domain and provider account                                                                                     | DEV-21                |                                                                 |
| Vercel and Postgres accounts, or an alternative host                                                                          | DEV-01                |                                                                 |
| Semrush API units, to validate the keyword table in section 8                                                                 | Content commissioning |                                                                 |

agy asks about these rather than choosing. The Coordinator answers, and this document gets updated rather than superseded.

---

## 19. Kickoff prompt for agy

> Build the new API Lighthouse website using `web-dev-plan.md` as the brief. Read it completely first, then read any applicable AGENTS.md.
>
> Create a new project at `D:\New business ideas\API Lighthouse\apilh-web` and a new GitHub repository. Do not modify `Website/apilh` or `lovable+builder projects`; they are reference only.
>
> Work the backlog in section 15 in order, starting with DEV-01. Build the token system and component library before any page. Follow the Apple-led, Material-3-underneath design system in section 3 exactly, including the measured contrast values. Produce homepage imagery with the screenshot pipeline in section 6 rather than sourcing stock images.
>
> Nothing goes on a public page unless it is true. No API counts, uptime figures, customer logos, certifications or testimonials. Sample data is visibly labelled and never reaches production. Every public claim goes in `docs/content/claims.md` with its evidence.
>
> "Upload your API" means publishing a listing, not deploying provider code. Write all copy accordingly.
>
> Open a pull request per ticket with a preview URL and a two-line summary. Run lint, typecheck, unit tests, Playwright, and Lighthouse CI on every pull request. Report back after each ticket with what you built, how you verified it, and anything blocked.
>
> Where section 18 lists an open question that affects your ticket, ask the Coordinator. Do not choose for us, and do not invent inventory, prices, certifications or backend capabilities.
