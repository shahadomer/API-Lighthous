import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNavigation } from "@/components/product/MobileNavigation";
import { navLinks } from "@/lib/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-navy"
        >
          <span className="flex size-8 items-center justify-center rounded-xl bg-navy text-navy-foreground">
            <Lightbulb className="size-4" aria-hidden="true" />
          </span>
          API Lighthouse
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-navy/80 transition-colors hover:text-highlight"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-navy/80 transition-colors hover:text-highlight"
          >
            Log in
          </Link>
          <Link href="/signup">
            <Button variant="outline" className="rounded-xl">
              Sign up
            </Button>
          </Link>
          <Link href="/signup?intent=provider">
            <Button className="rounded-xl">Publish your API</Button>
          </Link>
        </div>

        <MobileNavigation />
      </div>
    </header>
  );
}
