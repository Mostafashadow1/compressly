"use client";

import React, { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const commands: Record<PackageManager, string> = {
  pnpm: "pnpm add compressly",
  npm: "npm i compressly",
  yarn: "yarn add compressly",
  bun: "bun add compressly",
};

export function InstallTabs() {
  const [selected, setSelected] = useState<PackageManager>("pnpm");
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(commands[selected]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Shell Box with elevated border glow and precision typography */}
      <div className="relative group rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-xl p-1.5 shadow-2xl transition-all hover:border-indigo-500/30">
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.06] mb-1">
          {/* Package Manager Selector Chips */}
          <div className="flex items-center gap-1">
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mr-2 uppercase tracking-wider">
              <Terminal className="size-3.5 text-indigo-400" />
              <span>Install</span>
            </span>
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
              {(["pnpm", "npm", "yarn", "bun"] as PackageManager[]).map((pm) => (
                <button
                  key={pm}
                  type="button"
                  onClick={() => setSelected(pm)}
                  className={cn(
                    "px-2.5 py-0.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer",
                    selected === pm
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5",
                  )}
                >
                  {pm}
                </button>
              ))}
            </div>
          </div>

          {/* Precision Copy Action */}
          <button
            type="button"
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/15 transition-all cursor-pointer"
            title="Copy install command"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-mono text-xs font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5 text-slate-400" />
                <span className="font-mono text-xs">Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Command Output Row */}
        <div
          onClick={copyToClipboard}
          className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-black/40 hover:bg-black/60 transition-colors cursor-pointer group/cmd"
        >
          <div className="flex items-center gap-3 font-mono text-sm text-slate-200 overflow-x-auto">
            <span className="text-indigo-400 font-bold select-none">$</span>
            <span className="select-all font-medium tracking-tight text-slate-100">
              {commands[selected]}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 group-hover/cmd:text-indigo-300 transition-colors hidden sm:inline select-none">
            click to copy
          </span>
        </div>
      </div>
    </div>
  );
}
