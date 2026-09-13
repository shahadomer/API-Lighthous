"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export interface Step {
  id: string | number;
  title: string;
  description?: string;
}

export interface StepIndicatorProps extends React.HTMLAttributes<HTMLElement> {
  steps: Step[];
  currentStepIndex: number;
  onStepClick?: (index: number) => void;
  orientation?: "horizontal" | "vertical";
}

export function StepIndicator({
  steps,
  currentStepIndex,
  onStepClick,
  orientation = "horizontal",
  className,
  ...props
}: StepIndicatorProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <nav aria-label="Progress" className={cn("w-full", className)} {...props}>
      <ol
        className={cn(
          "flex",
          isHorizontal ? "flex-row items-center justify-between gap-2" : "flex-col space-y-4",
        )}
      >
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isUpcoming = index > currentStepIndex;
          const isClickable = Boolean(onStepClick && !isUpcoming);

          const stepContent = (
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  isCompleted && "bg-primary text-primary-foreground",
                  isCurrent &&
                    "border-2 border-primary bg-background text-primary ring-4 ring-primary/10",
                  isUpcoming && "border border-outline bg-muted text-muted-foreground",
                )}
                aria-hidden="true"
              >
                {isCompleted ? <Check className="size-4 stroke-[2.5]" /> : <span>{index + 1}</span>}
              </div>
              <div className="flex flex-col text-left">
                <span
                  className={cn(
                    "text-xs font-medium",
                    isCurrent ? "text-primary font-semibold" : "text-foreground",
                    isUpcoming && "text-muted-foreground",
                  )}
                >
                  {step.title}
                </span>
                {step.description && (
                  <span className="text-[11px] text-muted-foreground">{step.description}</span>
                )}
              </div>
            </div>
          );

          return (
            <li
              key={step.id}
              className={cn("flex-1", isHorizontal && "relative")}
              aria-current={isCurrent ? "step" : undefined}
            >
              {isClickable ? (
                <button
                  type="button"
                  onClick={() => onStepClick?.(index)}
                  className="w-full rounded-md p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-interactive text-left cursor-pointer"
                >
                  {stepContent}
                </button>
              ) : (
                <div className="p-1">{stepContent}</div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
