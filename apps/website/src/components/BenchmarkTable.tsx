import React from "react";
import { Check, X, Zap } from "lucide-react";

export function BenchmarkTable() {
  const features = [
    {
      name: "Bundle Size (Minified)",
      compressly: "< 3 KB",
      browserCompression: "~52 KB",
      compressorjs: "~25 KB",
      highlight: true,
    },
    {
      name: "Zero Runtime Dependencies",
      compressly: true,
      browserCompression: false,
      compressorjs: true,
      highlight: false,
    },
    {
      name: "Off-Thread Web Worker (No UI Lag)",
      compressly: true,
      browserCompression: true,
      compressorjs: false,
      highlight: false,
    },
    {
      name: "Smart Pass-through (Small images)",
      compressly: true,
      browserCompression: false,
      compressorjs: false,
      highlight: false,
    },
    {
      name: "Adaptive Target Size Loop",
      compressly: true,
      browserCompression: true,
      compressorjs: false,
      highlight: false,
    },
    {
      name: "Next.js / SSR Safe (Zero 'window' crashes)",
      compressly: true,
      browserCompression: false,
      compressorjs: false,
      highlight: false,
    },
    {
      name: "Auto EXIF Orientation (iOS / Android)",
      compressly: true,
      browserCompression: true,
      compressorjs: true,
      highlight: false,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              <th className="py-4 px-6 font-semibold text-gray-300">Feature / Metric</th>
              <th className="py-4 px-6 font-bold text-indigo-400 bg-indigo-500/[0.07] border-x border-indigo-500/20">
                <div className="flex items-center gap-1.5">
                  <Zap className="size-4" /> compressly
                </div>
              </th>
              <th className="py-4 px-6 font-semibold text-gray-400">browser-image-compression</th>
              <th className="py-4 px-6 font-semibold text-gray-400">compressorjs</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {features.map((item, index) => (
              <tr key={index} className="hover:bg-white/[0.01]">
                <td className="py-4 px-6 text-gray-300 font-medium">{item.name}</td>
                <td className="py-4 px-6 bg-indigo-500/[0.07] border-x border-indigo-500/20 font-bold text-white">
                  {typeof item.compressly === "boolean" ? (
                    <span className="inline-flex items-center justify-center size-6 rounded-full bg-emerald-500/20 text-emerald-400">
                      <Check className="size-4" />
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-bold">{item.compressly}</span>
                  )}
                </td>
                <td className="py-4 px-6 text-gray-400">
                  {typeof item.browserCompression === "boolean" ? (
                    item.browserCompression ? (
                      <span className="inline-flex items-center justify-center size-6 rounded-full bg-white/10 text-gray-300">
                        <Check className="size-3.5" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center size-6 rounded-full bg-rose-500/10 text-rose-400">
                        <X className="size-3.5" />
                      </span>
                    )
                  ) : (
                    item.browserCompression
                  )}
                </td>
                <td className="py-4 px-6 text-gray-400">
                  {typeof item.compressorjs === "boolean" ? (
                    item.compressorjs ? (
                      <span className="inline-flex items-center justify-center size-6 rounded-full bg-white/10 text-gray-300">
                        <Check className="size-3.5" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center size-6 rounded-full bg-rose-500/10 text-rose-400">
                        <X className="size-3.5" />
                      </span>
                    )
                  ) : (
                    item.compressorjs
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
