"use client";

import React, { useState } from "react";
import { ArrowRight, Cpu, Zap, Code2, Eye, ShieldCheck, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroPipelineWidget() {
  const [activeTab, setActiveTab] = useState<"visual" | "code">("visual");

  return (
    <div className="w-full max-w-5xl mx-auto my-12 text-left" id="how-it-works">
      <div className="relative rounded-3xl border border-indigo-500/25 bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-[#070b14] p-5 sm:p-8 md:p-10 shadow-2xl shadow-indigo-950/40 overflow-hidden backdrop-blur-2xl">
        {/* Subtle Ambient Top Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-36 bg-gradient-to-b from-indigo-500/15 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

        {/* Header Ribbon & Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-sm shadow-indigo-500/20">
              <Zap className="size-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-tight">
                  Client-Side Transformation Pipeline
                </span>
                <span className="hidden sm:inline-flex items-center text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Off-Thread Worker
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Intercept raw media in the browser before network transmission.
              </p>
            </div>
          </div>

          {/* Interactive Toggle Pills */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/50 border border-white/10 text-xs self-stretch sm:self-auto justify-center">
            <button
              onClick={() => setActiveTab("visual")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === "visual"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/40"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Eye className="size-3.5" />
              <span>Interactive Pipeline</span>
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === "code"
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/40"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Code2 className="size-3.5" />
              <span>SDK Code Snippet</span>
            </button>
          </div>
        </div>

        {activeTab === "visual" ? (
          /* Visual Pipeline Flow */
          <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
            {/* Step 1: Raw Original Image */}
            <div className="md:col-span-4 relative rounded-2xl border border-rose-500/20 bg-slate-950/80 p-4 shadow-xl group hover:border-rose-500/35 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-rose-500 animate-pulse" />
                  Raw User Upload
                </span>
                <Badge variant="destructive" className="font-mono text-[11px] bg-rose-500/15 text-rose-300 border-rose-500/30">
                  21.4 MB
                </Badge>
              </div>

              {/* Photo Representation */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center mb-3">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80"
                  alt="Uncompressed high-resolution camera RAW image preview before client-side optimization"
                  width={800}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-[10px] font-mono text-white border border-white/10">
                  4032 × 3024 px
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Source Format:</span>
                  <span className="text-slate-200 font-medium">iPhone HEIC / Camera RAW</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Traditional Cloud Upload:</span>
                  <span className="text-rose-400 font-semibold">~45s delay & high S3 fee</span>
                </div>
              </div>
            </div>

            {/* Step 2: The Transformation Bridge (Engine) */}
            <div className="md:col-span-3 flex flex-col items-center justify-center text-center py-2 sm:py-4">
              <div className="relative size-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 mb-3 group">
                <Cpu className="size-8 transition-transform group-hover:scale-110" />
                <div className="absolute -inset-1 rounded-2xl bg-indigo-500/20 blur-md -z-10 animate-pulse" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold mb-1 shadow-sm">
                <span>compressly</span>
                <ArrowRight className="size-3.5" />
              </div>

              <span className="text-[11px] font-mono text-emerald-400 font-semibold block">
                ~110ms • Web Worker
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                Zero Main-Thread Lag (60 FPS)
              </span>

              {/* Connecting Desktop Arrow */}
              <div className="hidden md:flex items-center gap-1 mt-3 text-indigo-400/50">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-indigo-500" />
                <ArrowRight className="size-4 text-indigo-400 animate-pulse" />
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-indigo-500" />
              </div>
            </div>

            {/* Step 3: The Optimized Result */}
            <div className="md:col-span-4 relative rounded-2xl border border-emerald-500/30 bg-slate-950/80 p-4 shadow-xl shadow-emerald-500/5 group hover:border-emerald-500/50 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  Client Optimized
                </span>
                <Badge variant="success" className="font-mono text-[11px] bg-emerald-500/15 text-emerald-300 border-emerald-500/30">
                  ~285 KB (-98.6%)
                </Badge>
              </div>

              {/* Photo Representation */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-emerald-500/30 flex items-center justify-center mb-3">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80"
                  alt="Optimized WebP image compressed client-side using Compressly Web Worker pipeline"
                  width={800}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-emerald-950/90 backdrop-blur-sm text-[10px] font-mono text-emerald-300 border border-emerald-500/30">
                  1920 × 1440 px
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Output Encoding:</span>
                  <span className="text-emerald-300 font-medium">Lossless WebP / JPEG</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Server Upload Duration:</span>
                  <span className="text-emerald-400 font-semibold">Instant (&lt; 0.4s)</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Code Execution View */
          <div className="p-4 sm:p-6 rounded-2xl bg-black/90 border border-white/10 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto shadow-inner">
            <pre className="text-slate-300">{`// 1. User picks raw 20MB photo from file input or drag-and-drop
const rawFile = event.target.files[0];

// 2. Compressly compresses directly in the browser via Web Workers
const optimizedFile = await compressImage(rawFile, {
  maxWidth: 1920,      // Scale down to crisp web dimensions
  quality: 0.82,       // Visually lossless 82% quality ratio
  useWorker: true,     // Off-thread OffscreenCanvas (Guarantees 60 FPS)
  targetSizeMB: 0.5,   // Intelligent adaptive quality loop
});

// 3. Upload only 285 KB to your server, S3, or Supabase Storage:
const formData = new FormData();
formData.append("photo", optimizedFile);
await fetch("/api/upload", { method: "POST", body: formData });`}</pre>
          </div>
        )}

        {/* Footer Metrics Ribbon */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <span className="block text-xl font-extrabold text-white tracking-tight">$0</span>
            <span className="text-[11px] text-slate-400">Cloud Transcoding Fees</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <span className="block text-xl font-extrabold text-emerald-400 tracking-tight">98.6%</span>
            <span className="text-[11px] text-slate-400">Bandwidth Saved</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <span className="block text-xl font-extrabold text-indigo-400 tracking-tight">&lt; 3 KB</span>
            <span className="text-[11px] text-slate-400">Zero Dependencies</span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <span className="block text-xl font-extrabold text-purple-400 tracking-tight">60 FPS</span>
            <span className="text-[11px] text-slate-400">UI Responsiveness</span>
          </div>
        </div>
      </div>
    </div>
  );
}
