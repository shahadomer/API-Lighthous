import * as React from "react";
import { cn } from "@/lib/utils";

// DEV-08 screenshot-only stub — full component built in DEV-13

export interface EndpointItem {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  summary: string;
  active?: boolean;
}

interface EndpointListProps {
  endpoints: EndpointItem[];
  onSelect?: (id: string) => void;
}

export function EndpointList({ endpoints }: EndpointListProps) {
  const methodStyles = {
    GET: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    POST: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    PUT: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    DELETE: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    PATCH: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  };

  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden divide-y divide-border">
      <div className="bg-secondary/40 px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Active Endpoints ({endpoints.length})
      </div>
      <div className="divide-y divide-border">
        {endpoints.map((ep) => (
          <div
            key={ep.id}
            className={cn(
              "flex items-center justify-between p-3.5 transition-colors cursor-pointer",
              ep.active ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-secondary/40",
            )}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={cn(
                  "font-mono text-xs font-bold px-2 py-0.5 rounded border shrink-0",
                  methodStyles[ep.method],
                )}
              >
                {ep.method}
              </span>
              <span className="font-mono text-xs font-medium text-foreground truncate">
                {ep.path}
              </span>
            </div>
            <span className="text-xs text-muted-foreground truncate ml-4 hidden sm:inline">
              {ep.summary}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
