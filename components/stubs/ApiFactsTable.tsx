import * as React from "react";
import { ShieldCheck, Zap, RefreshCw, Globe, FileCode } from "lucide-react";

// DEV-08 screenshot-only stub — full component built in DEV-13

interface ApiFactsTableProps {
  authType: string;
  baseUrl: string;
  openapiUrl: string;
  latencyP95: string;
  updateCadence: string;
}

export function ApiFactsTable({
  authType,
  baseUrl,
  openapiUrl,
  latencyP95,
  updateCadence,
}: ApiFactsTableProps) {
  const facts = [
    {
      label: "Authentication",
      value: authType,
      icon: ShieldCheck,
      desc: "Signed token header",
    },
    {
      label: "Gateway Latency",
      value: latencyP95,
      icon: Zap,
      desc: "Measured at edge (p95)",
    },
    {
      label: "Refresh Cadence",
      value: updateCadence,
      icon: RefreshCw,
      desc: "Radar poll interval",
    },
    {
      label: "Base Endpoint",
      value: baseUrl,
      icon: Globe,
      desc: "Global HTTPS endpoint",
      mono: true,
    },
    {
      label: "OpenAPI Spec",
      value: openapiUrl,
      icon: FileCode,
      desc: "v3.1.0 JSON Schema",
      mono: true,
    },
  ];

  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-xs">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        Specifications & Operational Signals
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {facts.map((fact) => {
          const Icon = fact.icon;
          return (
            <div
              key={fact.label}
              className="rounded-lg border border-border/70 bg-secondary/20 p-2.5 space-y-1"
            >
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon className="size-3.5 text-primary" />
                <span>{fact.label}</span>
              </div>
              <p
                className={`text-xs font-semibold text-foreground truncate ${fact.mono ? "font-mono" : ""}`}
              >
                {fact.value}
              </p>
              <p className="text-[11px] text-muted-foreground">{fact.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
