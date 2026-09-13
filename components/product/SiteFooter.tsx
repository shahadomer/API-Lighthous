import * as React from "react";
import Link from "next/link";
import { Sparkles, Activity } from "lucide-react";
import { footerColumns } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-inverse text-on-surface-inverse">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Main Grid: Brand summary + 4 Columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 lg:gap-12">
          {/* Brand Info Column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-on-surface-inverse transition-opacity hover:opacity-90"
            >
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
                <Sparkles className="size-3.5" aria-hidden="true" />
              </span>
              API Lighthouse
            </Link>
            <p className="mt-3.5 text-sm text-on-surface-variant">
              The marketplace, hosting platform, and directory where engineering teams find
              production APIs and providers grow distribution.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-on-surface-muted">
              <span className="inline-block size-2 rounded-full bg-emerald-500" />
              <span>All platform systems operational</span>
            </div>
          </div>

          {/* Four Structured Columns per Section 4.1 & 9.5 */}
          {footerColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="col-span-1">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                {col.heading}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={`${col.heading}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-on-surface-muted transition-colors hover:text-on-surface-inverse"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Legal and Disclaimer Row */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-on-surface-inverse/10 pt-8 text-xs text-on-surface-muted sm:flex-row">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p>© {new Date().getFullYear()} API Lighthouse. All rights reserved.</p>
            <span className="hidden text-on-surface-inverse/20 sm:inline">·</span>
            <p className="text-amber-300/80">
              Notice: All listings and metric counts currently displayed are labelled sample data.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/status"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-on-surface-inverse"
            >
              <Activity className="size-3.5" aria-hidden="true" />
              <span>System Status</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
