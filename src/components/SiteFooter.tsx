import { Link } from "@tanstack/react-router";
import { Lightbulb } from "lucide-react";

const columns = [
  {
    heading: "Marketplace",
    links: [
      { to: "/apis", label: "Explore APIs" },
      { to: "/apis", label: "Airline APIs" },
      { to: "/apis", label: "Business Data" },
      { to: "/apis", label: "Communications" },
    ],
  },
  {
    heading: "Providers",
    links: [
      { to: "/providers", label: "For Providers" },
      { to: "/signup", label: "Publish your API" },
      { to: "/guides", label: "Pricing guides" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { to: "/developers", label: "Quickstart" },
      { to: "/guides", label: "Resources" },
      { to: "/login", label: "Log in" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-navy text-navy-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <span className="flex size-8 items-center justify-center rounded-xl bg-navy-foreground/10">
                <Lightbulb className="size-4" aria-hidden="true" />
              </span>
              API Lighthouse
            </div>
            <p className="mt-3 max-w-xs text-sm text-navy-foreground/70">
              The marketplace where teams find production APIs and providers grow their
              distribution.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-navy-foreground/60">
                {col.heading}
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={`${col.heading}-${link.label}`}>
                    <Link
                      to={link.to}
                      className="text-navy-foreground/85 transition-colors hover:text-navy-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-navy-foreground/15 pt-6 text-sm text-navy-foreground/60">
          <p>© {new Date().getFullYear()} API Lighthouse. All rights reserved.</p>
          <p>Listings shown on this site are sample data.</p>
        </div>
      </div>
    </footer>
  );
}
