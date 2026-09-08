import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Plan = {
  name: string;
  price: string;
  billingPeriod: string;
  includedUnits: string;
  overage: string;
  features: string[];
  highlighted?: boolean;
};

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border bg-surface p-6 shadow-[var(--shadow-card)] ${
        plan.highlighted ? "border-primary ring-1 ring-primary/30" : "border-border"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-navy">{plan.name}</h3>
        {plan.highlighted ? (
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            Most popular
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-2xl font-semibold text-navy">{plan.price}</p>
      <p className="text-sm text-muted-foreground">{plan.billingPeriod}</p>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Included units</dt>
          <dd className="text-right font-medium text-navy">{plan.includedUnits}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">Overage</dt>
          <dd className="text-right font-medium text-navy">{plan.overage}</dd>
        </div>
      </dl>

      <ul className="mt-4 flex-1 space-y-2 text-sm text-foreground/80">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-highlight" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        className="mt-6 rounded-xl"
        variant={plan.highlighted ? "default" : "outline"}
      >
        Choose {plan.name}
      </Button>
    </div>
  );
}
