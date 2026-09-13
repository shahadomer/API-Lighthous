"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNavigation } from "@/components/product/MobileNavigation";
import { primaryNav, type NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activePanel, setActivePanel] = React.useState<string | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const navRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mega panel on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePanel(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActivePanel(label);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActivePanel(null);
    }, 150);
  };

  const handleFocus = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActivePanel(label);
  };

  const handleBlur = (e: React.FocusEvent) => {
    // If next focused element is not inside nav, close panel
    if (!navRef.current?.contains(e.relatedTarget as Node)) {
      setActivePanel(null);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-16 w-full transition-[border-color,background-color] duration-200",
        "bg-surface/72 backdrop-blur-[20px] backdrop-saturate-[180%]",
        isScrolled ? "border-b border-border/80 shadow-xs" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-90"
        >
          <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          <span className="font-medium">API Lighthouse</span>
        </Link>

        {/* Desktop Navigation (5 items per Section 4.1) */}
        <nav
          ref={navRef}
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
          onBlur={handleBlur}
        >
          {primaryNav.map((item) => {
            if (item.isMegaPanel && item.megaItems) {
              const isOpen = activePanel === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => setActivePanel(isOpen ? null : item.label)}
                    onFocus={() => handleFocus(item.label)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      "text-foreground/80 hover:bg-secondary/60 hover:text-foreground",
                      isOpen && "bg-secondary/80 text-foreground",
                    )}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "size-3.5 opacity-60 transition-transform duration-200",
                        isOpen && "rotate-180 opacity-100",
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Mega Panel */}
                  {isOpen && (
                    <div
                      className={cn(
                        "absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-2xl border border-border/80 bg-surface p-4 shadow-xl",
                        "animate-in fade-in-50 zoom-in-95 duration-150",
                        item.label === "Explore APIs" ? "w-[640px]" : "w-[480px]",
                      )}
                    >
                      <div
                        className={cn(
                          "grid gap-2",
                          item.label === "Explore APIs" ? "grid-cols-2" : "grid-cols-1",
                        )}
                      >
                        {item.megaItems.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setActivePanel(null)}
                            className="group flex flex-col rounded-xl p-2.5 transition-colors hover:bg-secondary/80"
                          >
                            <span className="text-sm font-medium text-foreground group-hover:text-interactive">
                              {sub.label}
                            </span>
                            {sub.description && (
                              <span className="line-clamp-1 text-xs text-muted-foreground">
                                {sub.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>

                      {item.footerAction && (
                        <div className="mt-3 border-t border-border/60 pt-3 text-right">
                          <Link
                            href={item.footerAction.href}
                            onClick={() => setActivePanel(null)}
                            className="text-xs font-semibold text-interactive hover:underline"
                          >
                            {item.footerAction.label}
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary/60 hover:text-foreground"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Log in & Sign up free (Visible on every page & breakpoint) */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground sm:inline-block"
          >
            Log in
          </Link>

          {/* Filled Sign up free button: Visible at all breakpoints */}
          <Button variant="filled" size="sm" asChild className="shrink-0 font-medium">
            <Link href="/signup">Sign up free</Link>
          </Button>

          {/* Mobile Navigation Drawer Trigger */}
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
