import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/developers")({
  head: () => ({
    meta: [
      { title: "Developers — API Lighthouse" },
      {
        name: "description",
        content:
          "One key, one bill, typed SDKs and sandbox environments for every API you integrate.",
      },
      { property: "og:title", content: "Developers — API Lighthouse" },
      {
        property: "og:description",
        content: "One key, one bill and typed SDKs for every API you integrate.",
      },
    ],
  }),
  component: DevelopersPage,
});

const steps = [
  { step: "01", title: "Get a key", body: "Create a workspace and generate sandbox keys instantly." },
  { step: "02", title: "Call the API", body: "Copy a request from the docs in curl, TypeScript or Python." },
  { step: "03", title: "Ship to prod", body: "Promote the key, set spend limits and watch usage live." },
];

function DevelopersPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight text-navy">
          Built for the integration hour
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          One key, one invoice, and consistent docs across every provider in the catalog.
        </p>

        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <li
              key={s.step}
              className="rounded-2xl border border-border bg-surface p-6 shadow-[var(--shadow-card)]"
            >
              <span className="text-sm font-semibold text-highlight">{s.step}</span>
              <h2 className="mt-2 text-lg font-semibold text-navy">{s.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>

        <pre className="mt-10 overflow-x-auto rounded-2xl bg-navy p-6 text-sm text-navy-foreground">
          <code>{`curl https://api.lighthouse.dev/v1/apis \\
  -H "Authorization: Bearer $LIGHTHOUSE_KEY"`}</code>
        </pre>
      </main>
    </div>
  );
}
