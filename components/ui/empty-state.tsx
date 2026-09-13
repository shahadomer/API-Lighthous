"use client";

import * as React from "react";
import { FolderSearch } from "lucide-react";

import { cn } from "@/lib/utils";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-outline bg-surface-container-low/50 p-8 text-center md:p-12",
        className,
      )}
      {...props}
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-surface-container text-muted-foreground mb-4">
        {icon ?? <FolderSearch className="size-7" aria-hidden="true" />}
      </div>
      <h3 className="text-heading-s text-foreground font-semibold tracking-tight">{title}</h3>
      {description && (
        <p className="text-body-s text-muted-foreground mt-2 max-w-md measure-prose">
          {description}
        </p>
      )}
      {(action || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}
