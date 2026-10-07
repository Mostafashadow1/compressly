"use client";

import React, { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const commands: Record<PackageManager, string> = {
  pnpm: "pnpm add compressly",
  npm: "npm install compressly",
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
    <div className="inline-flex flex-col items-center w-full max-w-lg mx-auto">
      {/* Shell Box */}
      <div className="w-full rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-md p-2 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 px-2">
          {/* Package Manager Tabs */}
          <div className="flex items-center gap-1">
            <Terminal className="size-3.5 text-gray-500 mr-1.5" />
            {(["pnpm", "npm", "yarn", "bun"] as PackageManager[]).map((pm) => (
              <button
                key={pm}
                type="button"
                onClick={() => setSelected(pm)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer",
                  selected === pm
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5",
                )}
              >
                {pm}
              </button>
            ))}
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            title="Copy command"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-mono text-[11px]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span className="font-mono text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Command line output */}
        <div className="px-3 py-2 flex items-center gap-3 font-mono text-sm text-gray-200">
          <span className="text-indigo-400 font-bold select-none">$</span>
          <span className="select-all">{commands[selected]}</span>
        </div>
      </div>
    </div>
  );
}
