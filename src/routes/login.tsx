import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — API Lighthouse" },
      { name: "description", content: "Sign in to your API Lighthouse workspace." },
      { property: "og:title", content: "Log in — API Lighthouse" },
      { property: "og:description", content: "Sign in to your API Lighthouse workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-md px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow-card)]">
          <h1 className="text-2xl font-semibold tracking-tight text-navy">Log in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Welcome back. Pick up where your integration left off.
          </p>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" type="email" autoComplete="email" placeholder="you@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" autoComplete="current-password" />
            </div>
            <Button type="submit" className="w-full rounded-xl">
              Log in
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/signup" className="font-medium text-highlight hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
