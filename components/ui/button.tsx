"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interactive focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        filled: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        tonal: "bg-primary-container text-on-primary-container hover:bg-primary-container/80",
        outline:
          "border border-outline bg-background shadow-xs hover:bg-muted hover:text-foreground",
        outlined:
          "border border-outline bg-background shadow-xs hover:bg-muted hover:text-foreground",
        text: "text-foreground hover:bg-muted hover:text-foreground",
        ghost: "hover:bg-muted hover:text-foreground",
        icon: "size-9 p-0 rounded-full hover:bg-muted text-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        link: "text-interactive underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8 text-base",
        icon: "size-9 p-0",
      },
      shape: {
        default: "",
        full: "rounded-full",
        md: "rounded-md",
        lg: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isEffectivelyDisabled = disabled || loading;

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, shape, className }))}
          ref={ref}
          aria-busy={loading ? "true" : undefined}
          aria-disabled={isEffectivelyDisabled ? "true" : undefined}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        type="button"
        className={cn(buttonVariants({ variant, size, shape, className }))}
        ref={ref}
        disabled={isEffectivelyDisabled}
        aria-busy={loading ? "true" : undefined}
        {...props}
      >
        {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
