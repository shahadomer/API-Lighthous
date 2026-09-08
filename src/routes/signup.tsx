import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SignupSearch = { intent?: "provider" | "developer" | undefined };

export const Route = createFileRoute("/signup")({
  validateSearch: (search: Record<string, unknown>): SignupSearch => ({
    intent: search["intent"] === "provider" ? "provider" : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign up — API Lighthouse" },
      {
        name: "description",
        content: "Create an API Lighthouse account to consume or publish APIs.",
      },
      { property: "og:title", content: "Sign up — API Lighthouse" },
      {
        property: "og:description",
        content: "Create an account to consume or publish APIs.",
      },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { intent } = Route.useSearch();
  const isProvider = intent === "provider";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-md px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-[var(--shadow-card)]">
          <p className="text-xs font-semibold uppercase tracking-wide text-highlight">
            {isProvider ? "Provider account" : "Developer account"}
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-navy">
            {isProvider ? "Publish your API" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isProvider
              ? "List your API, set pricing and start earning within a day."
              : "Get a sandbox key and start calling APIs in minutes."}
          </p>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="name">{isProvider ? "Company name" : "Full name"}</Label>
              <Input id="name" autoComplete="organization" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" type="email" autoComplete="email" placeholder="you@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" autoComplete="new-password" />
            </div>
            <Button type="submit" className="w-full rounded-xl">
              {isProvider ? "Start publishing" : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-highlight hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
