import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="mt-8 max-w-xl">
      <form
        role="search"
        className="flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/apis" });
        }}
      >
        <label htmlFor="hero-search" className="sr-only">
          Search APIs
        </label>
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="hero-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search APIs by service or use case..."
            className="h-12 border-navy-foreground/20 bg-surface/95 pl-9 shadow-lg backdrop-blur"
          />
        </div>
        <Button type="submit" size="lg" className="h-12 rounded-xl">
          Search
        </Button>
      </form>

      <p className="mt-3 flex items-center gap-2 text-sm text-navy-foreground/70">
        Try:
        <button
          type="button"
          onClick={() => setQuery("Airline APIs")}
          className="rounded-full border border-navy-foreground/20 bg-navy-foreground/10 px-3 py-1 text-sm font-medium text-navy-foreground transition-colors hover:bg-navy-foreground/20"
        >
          Airline APIs
        </button>
      </p>
    </div>
  );
}
