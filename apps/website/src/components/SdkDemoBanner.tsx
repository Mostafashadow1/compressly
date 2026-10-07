import React from "react";
import { Terminal, Code2, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function SdkDemoBanner() {
  return (
    <div className="w-full max-w-6xl mx-auto mb-6 p-4 rounded-2xl border border-indigo-500/20 bg-indigo-950/20 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="size-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
          <Terminal className="size-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Live SDK Playground</span>
            <Badge variant="default" className="text-[10px] font-mono py-0">
              In-Browser Execution
            </Badge>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            You are testing the <code className="text-indigo-300 font-mono">compressly</code> npm library executing directly on your CPU/GPU via Web Workers — not a cloud SaaS.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 text-xs">
        <span className="text-gray-400">Want this in your app?</span>
        <code className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-indigo-300 font-mono text-[11px]">
          npm i compressly
        </code>
      </div>
    </div>
  );
}
