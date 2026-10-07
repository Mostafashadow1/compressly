"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles, Cpu, Zap, CheckCircle2, ShieldCheck, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroPipelineWidget() {
  const [activeTab, setActiveTab] = useState<"visual" | "code">("visual");

  return (
    <div className="w-full max-w-5xl mx-auto my-10">
      <div className="relative rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 via-slate-900/80 to-slate-950 p-6 sm:p-10 shadow-2xl overflow-hidden backdrop-blur-xl">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-indigo-500/15 blur-3xl pointer-events-none" />

        {/* Header Tabs */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Zap className="size-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-white block">How the SDK Works in Your Codebase</span>
              <span className="text-xs text-gray-400">Client-Side Pipeline Architecture</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab("visual")}
              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === "visual" ? "bg-indigo-600 text-white shadow-xs" : "text-gray-400 hover:text-white"
              }`}
            >
              Visual Flow
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                activeTab === "code" ? "bg-indigo-600 text-white shadow-xs" : "text-gray-400 hover:text-white"
              }`}
            >
              Code Execution
            </button>
          </div>
        </div>

        {activeTab === "visual" ? (
          /* Visual Pipeline Flow (Matching the Official Cover) */
          <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center">
            {/* Step 1: Raw Original Image */}
            <div className="md:col-span-4 relative rounded-2xl border border-white/10 bg-slate-950/70 p-4 shadow-xl group hover:border-white/20 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">User's Input</span>
                <Badge variant="destructive" className="font-mono text-[11px] bg-rose-500/20 text-rose-300 border-rose-500/30">
                  21.4 MB
                </Badge>
              </div>

              {/* Photo Representation */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center mb-3">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80"
                  alt="High-resolution sample"
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[10px] font-mono text-white">
                  4032 × 3024 px
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Source:</span>
                  <span className="text-gray-200">iPhone / Camera RAW</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Network Upload:</span>
                  <span className="text-rose-400 font-semibold">~45 seconds delay</span>
                </div>
              </div>
            </div>

            {/* Step 2: The Transformation Bridge (Arrow + Web Worker Engine) */}
            <div className="md:col-span-3 flex flex-col items-center justify-center text-center py-4">
              <div className="relative size-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 mb-3 animate-pulse">
                <Cpu className="size-8" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold mb-1">
                <span>compressly</span>
                <ArrowRight className="size-3.5" />
              </div>

              <span className="text-[11px] font-mono text-emerald-400 font-semibold block">
                ~110ms • Web Worker
              </span>
              <span className="text-[10px] text-gray-400 mt-1">
                Zero Main-Thread Lag (60 FPS)
              </span>

              {/* Glowing connecting line on desktop */}
              <div className="hidden md:flex items-center gap-1 mt-3 text-indigo-400/40">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-indigo-500" />
                <ArrowRight className="size-4 text-indigo-400 animate-bounce" />
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-indigo-500" />
              </div>
            </div>

            {/* Step 3: The Optimized Result */}
            <div className="md:col-span-4 relative rounded-2xl border border-emerald-500/30 bg-slate-950/70 p-4 shadow-xl shadow-emerald-500/5 group hover:border-emerald-500/50 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Optimized File</span>
                <Badge variant="success" className="font-mono text-[11px]">
                  ~285 KB (-98.6%)
                </Badge>
              </div>

              {/* Photo Representation */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-emerald-500/30 flex items-center justify-center mb-3">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80"
                  alt="Optimized sample"
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-emerald-950/80 backdrop-blur-xs text-[10px] font-mono text-emerald-300 border border-emerald-500/30">
                  1920 × 1440 px
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Output:</span>
                  <span className="text-emerald-300 font-semibold">Web-Ready WebP / JPEG</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Network Upload:</span>
                  <span className="text-emerald-400 font-semibold">Instant (&lt; 0.4s)</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Code Execution View */
          <div className="p-4 sm:p-6 rounded-2xl bg-black/80 border border-white/10 font-mono text-xs sm:text-sm text-gray-300 leading-relaxed overflow-x-auto">
            <pre>{`// 1. User picks raw 20MB file from <input type="file">
const rawFile = event.target.files[0];

// 2. Compressly intercepts in the browser before sending:
const optimizedFile = await compressImage(rawFile, {
  maxWidth: 1920,      // Scale down to web dimensions
  quality: 0.82,       // Visually lossless 82% quality
  useWorker: true,     // Off-thread OffscreenCanvas (60 FPS)
});

// 3. Send 285 KB instead of 21.4 MB to your server or S3 bucket:
const formData = new FormData();
formData.append("photo", optimizedFile);
await fetch("/api/upload", { method: "POST", body: formData });`}</pre>
          </div>
        )}

        {/* Footer Metrics Ribbon */}
        <div className="mt-8 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <span className="block text-lg font-extrabold text-white">0$</span>
            <span className="text-[11px] text-gray-400">Cloud Transcoding Fees</span>
          </div>
          <div>
            <span className="block text-lg font-extrabold text-emerald-400">98%</span>
            <span className="text-[11px] text-gray-400">Bandwidth Saved</span>
          </div>
          <div>
            <span className="block text-lg font-extrabold text-indigo-400">&lt; 3 KB</span>
            <span className="text-[11px] text-gray-400">NPM Package Size</span>
          </div>
          <div>
            <span className="block text-lg font-extrabold text-purple-400">60 FPS</span>
            <span className="text-[11px] text-gray-400">UI Responsiveness</span>
          </div>
        </div>
      </div>
    </div>
  );
}
