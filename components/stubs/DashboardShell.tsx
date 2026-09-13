import * as React from "react";
import {
  LayoutDashboard,
  Layers,
  BarChart3,
  Key,
  Settings,
  Plus,
  Search,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusPill, type ListingStatus } from "./StatusPill";

// DEV-08 screenshot-only stub — full component built in DEV-22

export interface DashboardListing {
  id: string;
  name: string;
  version: string;
  status: ListingStatus;
  category: string;
  monthlyCalls: string;
  latencyP95: string;
  lastUpdated: string;
}

interface DashboardShellProps {
  organizationName: string;
  listings: DashboardListing[];
}

export function DashboardShell({ organizationName, listings }: DashboardShellProps) {
  return (
    <div className="flex h-full w-full rounded-2xl border border-border bg-background shadow-2xl overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 shrink-0 border-r border-border bg-surface/50 p-5 flex flex-col justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold">
              NA
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground leading-none">
                {organizationName}
              </p>
              <span className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <CheckCircle2 className="size-3 text-emerald-500" />
                Verified Provider
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            <div className="flex items-center gap-2.5 rounded-xl bg-primary/10 px-3 py-2 text-sm font-medium text-primary">
              <Layers className="size-4" />
              <span>API Listings</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary">
              <LayoutDashboard className="size-4" />
              <span>Overview</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary">
              <BarChart3 className="size-4" />
              <span>Traffic & Analytics</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary">
              <Key className="size-4" />
              <span>API Keys</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary">
              <Settings className="size-4" />
              <span>Settings</span>
            </div>
          </nav>
        </div>

        <div className="rounded-xl border border-border bg-surface p-3 text-xs text-muted-foreground space-y-1">
          <p className="font-medium text-foreground">Production Gateway</p>
          <p>Managed Edge Region: FRA-1</p>
          <p className="text-emerald-500 font-medium">99.98% 30d uptime</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-surface/20">
        {/* Top Header */}
        <header className="h-16 border-b border-border px-8 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">API Listings</h1>
            <p className="text-xs text-muted-foreground">
              Manage your published and draft endpoints
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                placeholder="Filter listings..."
                className="h-9 pl-9 text-xs rounded-lg"
                defaultValue=""
                readOnly
              />
            </div>
            <Button size="sm" variant="filled" className="gap-1.5 rounded-lg text-xs">
              <Plus className="size-3.5" />
              New API Listing
            </Button>
          </div>
        </header>

        {/* Listings Table View */}
        <div className="p-8 flex-1 overflow-auto">
          <div className="rounded-xl border border-border bg-surface overflow-hidden shadow-xs">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-secondary/40 text-xs font-semibold text-muted-foreground">
                <tr>
                  <th className="px-6 py-3.5">API Name</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">30d Volume</th>
                  <th className="px-6 py-3.5">p95 Latency</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {listings.map((item) => (
                  <tr key={item.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground flex items-center gap-2">
                        {item.name}
                        <span className="text-xs font-normal text-muted-foreground font-mono bg-secondary px-1.5 py-0.5 rounded">
                          {item.version}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Updated {item.lastUpdated}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusPill status={item.status} />
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-muted-foreground">
                      {item.category}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-foreground font-medium">
                      {item.monthlyCalls}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-foreground">
                      {item.latencyP95}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
                        View
                        <ExternalLink className="size-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
