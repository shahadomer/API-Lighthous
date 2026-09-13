"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interactive focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default:
          "border border-outline bg-surface text-foreground hover:bg-muted active:bg-muted/80",
        filter:
          "border border-outline bg-surface text-foreground hover:bg-muted data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground data-[selected=true]:border-primary",
        suggestion:
          "border border-outline bg-surface/80 text-foreground hover:bg-muted hover:border-interactive",
        inverse:
          "border border-navy-foreground/20 bg-navy-foreground/10 text-navy-foreground hover:bg-navy-foreground/20",
      },
      size: {
        default: "h-7 px-3 py-1",
        sm: "h-6 px-2.5 text-[11px]",
        lg: "h-8 px-3.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof chipVariants> {
  asChild?: boolean;
  selected?: boolean;
  onRemove?: () => void;
  removeAriaLabel?: string;
  icon?: React.ReactNode;
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      selected = false,
      onRemove,
      removeAriaLabel = "Remove option",
      icon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(chipVariants({ variant, size, className }))}
          data-selected={selected ? "true" : undefined}
          aria-pressed={variant === "filter" ? selected : undefined}
          aria-disabled={disabled ? "true" : undefined}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        type="button"
        ref={ref}
        disabled={disabled}
        className={cn(chipVariants({ variant, size, className }))}
        data-selected={selected ? "true" : undefined}
        aria-pressed={variant === "filter" ? selected : undefined}
        {...props}
      >
        {variant === "filter" && selected && (
          <Check className="size-3 shrink-0 stroke-[2.5]" aria-hidden="true" />
        )}
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {onRemove ? (
          <button
            type="button"
            aria-label={removeAriaLabel}
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="ml-0.5 -mr-1 rounded-full p-0.5 hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-interactive"
          >
            <X className="size-3" aria-hidden="true" />
          </button>
        ) : null}
      </button>
    );
  },
);
Chip.displayName = "Chip";

export { Chip, chipVariants };
