"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    aria-label={props["aria-label"] ?? (props["aria-labelledby"] ? undefined : "Progress")}
    className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
    value={value}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all duration-300 ease-out"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export interface ProgressBarProps extends React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> {
  label?: string;
  showValue?: boolean;
}

const ProgressBar = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressBarProps
>(({ className, value = 0, label, showValue = false, id, ...props }, ref) => {
  const generatedId = React.useId();
  const safeValue = Math.min(100, Math.max(0, value ?? 0));
  const baseId = id ?? generatedId;
  const labelId = label ? `${baseId}-label` : undefined;

  return (
    <div className="w-full space-y-1.5">
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs font-medium text-foreground">
          {label && <span id={labelId}>{label}</span>}
          {showValue && <span className="font-mono text-muted-foreground">{safeValue}%</span>}
        </div>
      )}
      <Progress
        ref={ref}
        id={id}
        value={safeValue}
        aria-labelledby={label ? labelId : props["aria-labelledby"]}
        aria-label={label ? undefined : (props["aria-label"] ?? "Progress")}
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={100}
        className={className}
        {...props}
      />
    </div>
  );
});
ProgressBar.displayName = "ProgressBar";

export { Progress, ProgressBar };
