import { useMemo } from "react";
import { createFileRoute, useNavigate, stripSearchParams } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { SlidersHorizontal, Search } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ApiCard } from "@/components/ApiCard";
import { CatalogFilters } from "@/components/CatalogFilters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { apiListings } from "@/lib/api-catalog";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
  category: fallback(z.string(), "all").default("all"),
  pricing: fallback(z.string(), "all").default("all"),
  trial: fallback(z.string(), "all").default("all"),
  auth: fallback(z.string(), "all").default("all"),
  page: fallback(z.number().int(), 1).default(1),
});

export const Route = createFileRoute("/apis/")({
  validateSearch: zodValidator(searchSchema),
  search: {
    middlewares: [
      stripSearchParams({ q: "", category: "all", pricing: "all", trial: "all", auth: "all", page: 1 }),
    ],
  },
  head: () => ({
    meta: [
      { title: "Explore APIs — API Lighthouse" },
      {
        name: "description",
        content:
          "Search the API Lighthouse catalog and filter by category, pricing model, trial availability and authentication.",
      },
      { property: "og:title", content: "Explore APIs — API Lighthouse" },
      {
        property: "og:description",
        content: "Filter APIs by category, pricing, trial and authentication.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CatalogPage,
});

const PAGE_SIZE = 6;

function CatalogPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/apis/" });

  const setSearch = (next: Record<string, unknown>) =>
    navigate({ search: (prev) => ({ ...prev, page: 1, ...next }) });

  const filtered = useMemo(() => {
    const q = search.q.trim().toLowerCase();
    return apiListings.filter((api) => {
      const matchesQuery =
        !q ||
        [api.name, api.provider, api.summary, api.category]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesCategory = search.category === "all" || api.category === search.category;
      const matchesPricing = search.pricing === "all" || api.pricingModel === search.pricing;
      const matchesTrial =
        search.trial === "all" ||
        (search.trial === "Free trial available" ? api.trial : !api.trial);
      const matchesAuth = search.auth === "all" || api.auth === search.auth;
      return matchesQuery && matchesCategory && matchesPricing && matchesTrial && matchesAuth;
    });
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, search.page), totalPages);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const filterState = {
    category: search.category,
    pricing: search.pricing,
    trial: search.trial,
    auth: search.auth,
  };
  const resetFilters = () =>
    setSearch({ category: "all", pricing: "all", trial: "all", auth: "all" });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight text-navy">Explore APIs</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Search the catalog and narrow results by category, pricing model, trial availability
          and authentication. Listings shown are sample data.
        </p>

        <form
          role="search"
          className="mt-8 flex gap-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="catalog-search" className="sr-only">
            Search APIs
          </label>
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="catalog-search"
              value={search.q}
              onChange={(e) => setSearch({ q: e.target.value })}
              placeholder="Search APIs by service or use case..."
              className="h-12 rounded-xl bg-surface pl-9"
            />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button type="button" variant="outline" className="h-12 rounded-xl lg:hidden">
                <SlidersHorizontal className="size-4" aria-hidden="true" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filter APIs</SheetTitle>
              </SheetHeader>
              <div className="px-4 pb-6">
                <CatalogFilters
                  idPrefix="mobile"
                  value={filterState}
                  onChange={setSearch}
                  onReset={resetFilters}
                />
              </div>
            </SheetContent>
          </Sheet>
        </form>

        <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside aria-label="Filters" className="hidden lg:block">
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-card)]">
              <CatalogFilters
                idPrefix="desktop"
                value={filterState}
                onChange={setSearch}
                onReset={resetFilters}
              />
            </div>
          </aside>

          <section aria-label="API results">
            <p className="text-sm text-muted-foreground" role="status">
              {filtered.length} {filtered.length === 1 ? "API" : "APIs"} found
            </p>

            {visible.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
                <h2 className="text-lg font-semibold text-navy">No APIs match your search</h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  Try a different keyword, or clear the filters to see the full catalog.
                </p>
                <Button
                  className="mt-6 rounded-xl"
                  onClick={() =>
                    setSearch({
                      q: "",
                      category: "all",
                      pricing: "all",
                      trial: "all",
                      auth: "all",
                    })
                  }
                >
                  Clear search and filters
                </Button>
              </div>
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {visible.map((api) => (
                  <div key={`${api.providerSlug}/${api.slug}`} className="relative">
                    <ApiCard api={api} />
                  </div>
                ))}
              </div>
            )}

            {totalPages > 1 ? (
              <nav
                aria-label="Pagination"
                className="mt-10 flex items-center justify-between gap-4"
              >
                <Button
                  variant="outline"
                  className="rounded-xl"
                  disabled={page <= 1}
                  onClick={() => navigate({ search: (prev) => ({ ...prev, page: page - 1 }) })}
                >
                  Previous
                </Button>
                <p className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </p>
                <Button
                  variant="outline"
                  className="rounded-xl"
                  disabled={page >= totalPages}
                  onClick={() => navigate({ search: (prev) => ({ ...prev, page: page + 1 }) })}
                >
                  Next
                </Button>
              </nav>
            ) : null}
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
