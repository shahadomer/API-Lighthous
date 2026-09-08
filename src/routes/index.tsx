import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Plane,
  Building2,
  MessageSquare,
  UserPlus,
  FileCode2,
  Send,
  KeyRound,
  Gauge,
  Braces,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HeroSearch } from "@/components/HeroSearch";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "API Lighthouse — The home for your next API connection" },
      {
        name: "description",
        content:
          "Discover APIs for airlines, business data and communications, or publish your own for teams to find and subscribe.",
      },
      {
        property: "og:title",
        content: "API Lighthouse — The home for your next API connection",
      },
      {
        property: "og:description",
        content: "Discover APIs for your next product, or publish your own.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      },
    ],
  }),
  component: Index,
});

const categories = [
  {
    icon: Plane,
    title: "Airline APIs",
    body: "Flight status, schedules, fares and booking flows for travel products.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=85",
    alt: "Passenger airplane flying above the clouds",
  },
  {
    icon: Building2,
    title: "Business Data",
    body: "Company records, KYB checks, firmographics and enrichment feeds.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=85",
    alt: "Digital payment card and financial data",
  },
  {
    icon: MessageSquare,
    title: "Communications",
    body: "SMS, email, voice and push delivery with global reach.",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=900&q=85",
    alt: "Communication applications on a phone screen",
  },
];

const featured = [
  {
    title: "SkyStatus",
    provider: "Northwind Air Data",
    useCase: "Track live flight status and gate changes across 900 airports.",
    category: "Airline APIs",
    price: "From $29/mo",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=85",
    alt: "Airplane wing in flight",
  },
  {
    title: "FareLink Booking",
    provider: "Meridian Travel Tech",
    useCase: "Search fares and issue tickets from a single booking endpoint.",
    category: "Airline APIs",
    price: "Usage based",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=85",
    alt: "Online payment experience",
  },
  {
    title: "RegistryIQ",
    provider: "Atlas Business Data",
    useCase: "Verify a company's legal identity before onboarding it.",
    category: "Business Data",
    price: "From $79/mo",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=85",
    alt: "Map showing geographic location data",
  },
  {
    title: "FirmoGraph",
    provider: "Cobalt Insights",
    useCase: "Enrich a domain with size, industry and funding signals.",
    category: "Business Data",
    price: "From $49/mo",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
    alt: "Analytics dashboard with business charts",
  },
  {
    title: "Sendwave SMS",
    provider: "Wavelength Comms",
    useCase: "Deliver one-time codes and alerts to 180 countries.",
    category: "Communications",
    price: "$0.004 / message",
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=900&q=85",
    alt: "Communication applications on a phone screen",
  },
  {
    title: "InboxRelay",
    provider: "Postmark Labs",
    useCase: "Send transactional email with per-message delivery events.",
    category: "Communications",
    price: "Free tier",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85",
    alt: "Artificial intelligence network visualization",
  },
];

const steps = [
  {
    icon: UserPlus,
    step: "Step 1",
    title: "Create profile",
    body: "Add your company, support contact and verification details.",
  },
  {
    icon: FileCode2,
    step: "Step 2",
    title: "Add API details",
    body: "Import an OpenAPI spec, set plans, rate limits and auth method.",
  },
  {
    icon: Send,
    step: "Step 3",
    title: "Submit listing",
    body: "We review docs and reliability, then your API goes live in the catalog.",
  },
];

const faqs = [
  {
    q: "How do I publish an API on API Lighthouse?",
    a: "Create a provider profile, add your API details and pricing plans, then submit the listing for review. Most listings are reviewed within two business days.",
  },
  {
    q: "What does it cost to list an API?",
    a: "Listing is free. API Lighthouse takes a revenue share only on paid subscriptions processed through the marketplace.",
  },
  {
    q: "How does subscribing work for developers?",
    a: "Pick a plan, get an instant sandbox key, then promote it to production. All usage across providers appears on one consolidated invoice.",
  },
  {
    q: "Can I test an API before I subscribe?",
    a: "Yes. Every listing shows the response schema, authentication method and plan limits, and most offer a sandbox environment with sample data.",
  },
  {
    q: "How are rate limits and overages handled?",
    a: "Each plan states its request ceiling. You can set spend caps so overage traffic is throttled instead of billed.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative isolate min-h-[680px] overflow-hidden py-16 lg:py-24">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=90"
            alt="Earth viewed from space with illuminated global connections"
            className="absolute inset-0 -z-20 size-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 -z-10 bg-navy/80" aria-hidden="true" />
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-navy-foreground/70">
                API marketplace
              </p>
              <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-navy-foreground sm:text-5xl">
                The home for your next API connection.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy-foreground/75">
                Discover APIs for your next product, or publish your own for teams to find
                and subscribe. Explore services for airlines, business data, communications,
                and more.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/signup" search={{ intent: "provider" }}>
                  <Button size="lg" className="rounded-xl">
                    Publish your API
                    <ArrowRight aria-hidden="true" />
                  </Button>
                </Link>
                <Link to="/apis">
                  <Button size="lg" variant="outline" className="border-navy-foreground/30 bg-navy-foreground/10 text-navy-foreground hover:bg-navy-foreground/20 hover:text-navy-foreground">
                    Explore APIs
                  </Button>
                </Link>
              </div>

              <HeroSearch />
            </div>

            {/* Hero visual */}
            <div className="grid gap-5">
              <article className="rounded-2xl border border-navy-foreground/20 bg-surface/95 p-6 shadow-[var(--shadow-card)] backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-highlight">
                    Airline APIs
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Sample Data
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-semibold text-navy">SkyStatus</h2>
                <p className="text-sm text-muted-foreground">by Northwind Air Data</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Track live flight status and gate changes across 900 airports.
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-sm">
                  <span className="text-muted-foreground">99.99% uptime</span>
                  <span className="font-semibold text-navy">From $29/mo</span>
                </div>
              </article>

              <div className="overflow-hidden rounded-2xl border border-navy-foreground/15 bg-navy/95 shadow-[var(--shadow-card)] backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-navy-foreground/15 px-5 py-3">
                  <p className="font-mono text-xs text-navy-foreground/70">
                    GET /v1/flights/AA118/status
                  </p>
                  <span className="rounded-full bg-navy-foreground/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-navy-foreground/80">
                    Sample Data
                  </span>
                </div>
                <pre className="overflow-x-auto px-5 py-4 text-xs leading-relaxed text-navy-foreground/90">
                  <code>{`{
  "flight": "AA118",
  "status": "in_air",
  "departure": { "airport": "JFK", "gate": "B41" },
  "arrival":   { "airport": "LHR", "eta": "07:12Z" },
  "updated_at": "2026-09-06T05:41:00Z"
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Browse by use case */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-navy">
            Browse by use case
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Start from the problem you're solving, not the vendor list.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {categories.map(({ icon: Icon, title, body, image, alt }) => (
              <Link
                key={title}
                to="/apis"
                className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:border-highlight/50"
              >
                <img
                  src={image}
                  alt={alt}
                  className="h-40 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="p-6">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-highlight">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-navy">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{body}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured APIs */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-navy">Featured APIs</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Sample listings showing what a live catalog entry looks like.
              </p>
            </div>
            <Link to="/apis" className="text-sm font-medium text-highlight hover:underline">
              View all APIs
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((api) => (
              <article
                key={api.title}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1"
              >
                <img
                  src={api.image}
                  alt={api.alt}
                  className="h-36 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="flex flex-1 flex-col p-6">
                  <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-highlight">
                    {api.category}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-navy">{api.title}</h3>
                  <p className="text-sm text-muted-foreground">by {api.provider}</p>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{api.useCase}</p>
                  <p className="mt-5 border-t border-border pt-4 text-sm font-semibold text-navy">
                    {api.price}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Airline spotlight */}
        <section className="bg-secondary/60 py-16">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-highlight">
              Spotlight
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy">
              Airline APIs: status vs. booking
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Travel products usually need both, but they behave very differently. Know
              which one you're buying.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-border bg-surface p-7 shadow-[var(--shadow-card)]">
                <h3 className="text-lg font-semibold text-navy">Flight status</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Read-only feeds updated every 30–60 seconds</li>
                  <li>Gate, delay, diversion and baggage-belt events</li>
                  <li>Webhook push or polling, no ticketing agreement needed</li>
                  <li>Priced per lookup or by monitored flight</li>
                </ul>
              </article>
              <article className="rounded-2xl border border-border bg-surface p-7 shadow-[var(--shadow-card)]">
                <h3 className="text-lg font-semibold text-navy">Booking</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Transactional: search, hold, price and issue tickets</li>
                  <li>Requires accreditation and settlement setup</li>
                  <li>Stateful sessions with strict timeouts on fare holds</li>
                  <li>Priced per segment or per issued ticket</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* For providers */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-navy">For API providers</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Three steps from endpoint to listing.
          </p>

          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {steps.map(({ icon: Icon, step, title, body }) => (
              <li
                key={title}
                className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-highlight">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-highlight">
                  {step}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-navy">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8">
            <Link to="/signup" search={{ intent: "provider" }}>
              <Button className="rounded-xl">Publish your API</Button>
            </Link>
          </div>
        </section>

        {/* Evaluate before subscribing */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-navy">
                Evaluate before subscribing
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Every listing shows the shape of the response, how auth works and what each
                plan allows — before you enter a card.
              </p>
            </div>
            <span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Sample Data
            </span>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <article className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
              <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-highlight">
                <Braces className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-navy">Response schema</h3>
              <pre className="mt-3 overflow-x-auto rounded-xl bg-navy p-4 text-xs leading-relaxed text-navy-foreground/90">
                <code>{`flight: string
status: "scheduled" | "in_air" | "landed"
departure.gate: string | null
arrival.eta: string (ISO 8601)`}</code>
              </pre>
            </article>

            <article className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
              <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-highlight">
                <KeyRound className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-navy">Authentication</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Method</dt>
                  <dd className="font-medium text-navy">Bearer token</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Scopes</dt>
                  <dd className="font-medium text-navy">flights.read</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Sandbox key</dt>
                  <dd className="font-medium text-navy">Instant</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Rotation</dt>
                  <dd className="font-medium text-navy">Self-serve</dd>
                </div>
              </dl>
            </article>

            <article className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]">
              <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-highlight">
                <Gauge className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-navy">Plan limits</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Free</dt>
                  <dd className="font-medium text-navy">1k calls / mo</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Growth</dt>
                  <dd className="font-medium text-navy">250k calls / mo</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Burst</dt>
                  <dd className="font-medium text-navy">50 req / sec</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Overage</dt>
                  <dd className="font-medium text-navy">Capped or billed</dd>
                </div>
              </dl>
            </article>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-navy">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-navy">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
