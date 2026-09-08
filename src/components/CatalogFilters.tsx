import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, pricingModels, authMethods } from "@/lib/api-catalog";

export type CatalogFilterState = {
  category: string;
  pricing: string;
  trial: string;
  auth: string;
};

type Props = {
  value: CatalogFilterState;
  onChange: (next: Partial<CatalogFilterState>) => void;
  onReset: () => void;
  idPrefix?: string;
};

export function CatalogFilters({ value, onChange, onReset, idPrefix = "f" }: Props) {
  const fields = [
    {
      id: `${idPrefix}-category`,
      label: "Category",
      key: "category" as const,
      allLabel: "All categories",
      options: [...categories],
    },
    {
      id: `${idPrefix}-pricing`,
      label: "Pricing model",
      key: "pricing" as const,
      allLabel: "Any pricing model",
      options: [...pricingModels],
    },
    {
      id: `${idPrefix}-trial`,
      label: "Trial availability",
      key: "trial" as const,
      allLabel: "Any trial status",
      options: ["Free trial available", "No trial"],
    },
    {
      id: `${idPrefix}-auth`,
      label: "Authentication",
      key: "auth" as const,
      allLabel: "Any authentication",
      options: [...authMethods],
    },
  ];

  return (
    <div className="space-y-5">
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label htmlFor={field.id} className="text-sm font-medium text-navy">
            {field.label}
          </Label>
          <Select
            value={value[field.key]}
            onValueChange={(v) => onChange({ [field.key]: v } as Partial<CatalogFilterState>)}
          >
            <SelectTrigger id={field.id} className="w-full rounded-xl bg-surface">
              <SelectValue placeholder={field.allLabel} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{field.allLabel}</SelectItem>
              {field.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}

      <Button variant="outline" className="w-full rounded-xl" onClick={onReset}>
        Clear filters
      </Button>
    </div>
  );
}
