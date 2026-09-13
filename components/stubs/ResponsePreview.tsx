"use client";

import * as React from "react";
import { Copy, Check, Terminal } from "lucide-react";

// DEV-08 screenshot-only stub — full component built in DEV-13

interface ResponsePreviewProps {
  status: number;
  statusText?: string;
  latencyMs: number;
  data: Record<string, unknown>;
}

export function ResponsePreview({
  status = 200,
  statusText = "OK",
  latencyMs = 68,
  data,
}: ResponsePreviewProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-border bg-surface-inverse text-on-surface-inverse overflow-hidden shadow-xl">
      {/* Code Header */}
      <div className="flex items-center justify-between border-b border-on-surface-inverse/10 px-4 py-2.5 bg-surface-inverse/80">
        <div className="flex items-center gap-2">
          <Terminal className="size-4 text-emerald-400" />
          <span className="text-xs font-mono font-medium text-on-surface-inverse/90">
            Sample Response Payload
          </span>
          <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-mono font-semibold text-emerald-400">
            {status} {statusText}
          </span>
          <span className="text-xs font-mono text-on-surface-inverse/50">{latencyMs}ms</span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-on-surface-inverse/70 hover:bg-on-surface-inverse/10 hover:text-on-surface-inverse transition-colors"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>Copy JSON</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <pre className="p-4 font-mono text-xs leading-relaxed overflow-x-auto max-h-[380px] text-on-surface-inverse/90 scrollbar-thin">
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>

      {/* Notice Banner */}
      <div className="border-t border-on-surface-inverse/10 px-4 py-1.5 text-[11px] font-mono text-on-surface-inverse/40 flex justify-between">
        <span>Content-Type: application/json; charset=utf-8</span>
        <span className="text-amber-300/80">Sample data · Fictional route</span>
      </div>
    </div>
  );
}
