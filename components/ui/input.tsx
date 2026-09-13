"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
  loading?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error = false, loading = false, disabled, ...props }, ref) => {
    const isEffectivelyDisabled = disabled || loading;

    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interactive focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            error &&
              "border-destructive text-destructive placeholder:text-destructive/60 focus-visible:ring-destructive",
            loading && "pr-9",
            className,
          )}
          ref={ref}
          disabled={isEffectivelyDisabled}
          aria-invalid={error ? "true" : undefined}
          aria-busy={loading ? "true" : undefined}
          {...props}
        />
        {loading && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <Loader2 className="size-4 animate-spin text-muted-foreground" aria-hidden="true" />
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
