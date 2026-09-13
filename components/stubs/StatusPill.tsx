import * as React from "react";
import { cn } from "@/lib/utils";

// DEV-08 screenshot-only stub — full component built in DEV-22

export type ListingStatus = "published" | "in_review" | "draft" | "suspended" | "changes_requested";

interface StatusPillProps {
  status: ListingStatus;
  className?: string;
}

export function StatusPill({ status, className }: StatusPillProps) {
  const config = {
    published: {
      label: "Published",
      classes: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      dot: "bg-emerald-500",
    },
    in_review: {
      label: "In review",
      classes: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      dot: "bg-amber-500",
    },
    draft: {
      label: "Draft",
      classes: "bg-secondary text-muted-foreground border-border",
      dot: "bg-muted-foreground/60",
    },
    suspended: {
      label: "Suspended",
      classes: "bg-destructive/10 text-destructive border-destructive/20",
      dot: "bg-destructive",
    },
    changes_requested: {
      label: "Changes requested",
      classes: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
      dot: "bg-blue-500",
    },
  }[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.classes,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", config.dot)} aria-hidden="true" />
      {config.label}
    </span>
  );
}
