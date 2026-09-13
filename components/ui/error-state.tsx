"use client";

import * as React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  isRetrying?: boolean;
  action?: React.ReactNode;
}

export function ErrorState({
  icon,
  title = "Something went wrong",
  description = "An error occurred while loading this content. Please try again.",
  onRetry,
  retryLabel = "Try again",
  isRetrying = false,
  action,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center md:p-12",
        className,
      )}
      {...props}
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4">
        {icon ?? <AlertCircle className="size-7" aria-hidden="true" />}
      </div>
      <h3 className="text-heading-s text-foreground font-semibold tracking-tight">{title}</h3>
      {description && (
        <p className="text-body-s text-muted-foreground mt-2 max-w-md measure-prose">
          {description}
        </p>
      )}
      {(onRetry || action) && (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          {onRetry && (
            <Button
              type="button"
              variant="outline"
              onClick={onRetry}
              loading={isRetrying}
              className="border-destructive/30 hover:bg-destructive/10 text-destructive hover:text-destructive"
            >
              <RefreshCw className="size-4 mr-2" aria-hidden="true" />
              {retryLabel}
            </Button>
          )}
          {action}
        </div>
      )}
    </div>
  );
}
