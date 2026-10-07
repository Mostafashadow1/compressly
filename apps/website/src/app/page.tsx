import React from "react";
import { Header } from "@/components/Header";
import { InstallTabs } from "@/components/InstallTabs";
import { HeroPipelineWidget } from "@/components/HeroPipelineWidget";
import { SdkDemoBanner } from "@/components/SdkDemoBanner";
import { InteractivePlayground } from "@/components/InteractivePlayground";
import { CloudCostComparison } from "@/components/CloudCostComparison";
import { AIPromptCard } from "@/components/AIPromptCard";
import { BenchmarkTable } from "@/components/BenchmarkTable";
import { CodeSnippetTabs } from "@/components/CodeSnippetTabs";
import { Badge } from "@/components/ui/badge";
import { Zap, ShieldCheck, Cpu, Layers, Sparkles, ArrowRight, Bot } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#080c15] text-slate-100 selection:bg-indigo-500/30">
      {/* Background Glow Accents */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-indigo-600/15 blur-[120px]" />
        <div className="absolute top-[30%] right-[10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[150px]" />
      </div>

      {/* Header with NPM and GitHub Links */}
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6 shadow-xs">
          <Sparkles className="size-3.5" />
          <span>Zero-Dependency &bull; &lt; 3 KB &bull; Web Worker Powered</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Compress images on the client.{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            0$ Cloud Costs.
          </span>
        </h1>

        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          The fastest client-side image compression library for Next.js, React, and modern web apps.
          Downscales dimensions, fixes iPhone EXIF rotation, and runs in Web Workers with zero main-thread lag.
        </p>

        {/* Package Manager Installation Tabs (pnpm, npm, yarn, bun) */}
        <div className="mb-10">
          <InstallTabs />
        </div>

        {/* Visual Transformation Pipeline Widget (Developer Architecture) */}
        <HeroPipelineWidget />
      </section>

      {/* Interactive Multi-Image Playground */}
      <section className="px-6 pb-24">
        <SdkDemoBanner />

        <div className="text-center mb-8">
          <Badge variant="default" className="mb-2 text-xs">
            Client-Side SDK Testbed
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Test the npm package live in your browser</h2>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            Drop single or multiple images. Everything runs 100% locally on your device with zero server latency.
          </p>
        </div>

        <InteractivePlayground />
      </section>

      {/* Economics & Cloud Cost Comparison */}
      <section className="py-20 px-6 border-t border-white/5 bg-slate-950/40">
        <CloudCostComparison />
      </section>

      {/* AI Assistant Integration Prompt (Cursor, Claude, Copilot) */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="text-center mb-10">
          <Badge variant="default" className="mb-2 text-xs">
            AI-Assisted Development
          </Badge>
          <h2 className="text-3xl font-bold text-white mb-3">Copy Prompt for AI Assistants</h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Let Cursor, Claude 3.7, Copilot, or ChatGPT implement Compressly in your codebase in seconds.
          </p>
        </div>

        <AIPromptCard />
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-2 text-xs">
            High Performance Architecture
          </Badge>
          <h2 className="text-3xl font-bold text-white mb-3">Engineered for Performance & DX</h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Built from scratch to eliminate bundle bloat, SSR crashes, and lag from legacy image compression libraries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all">
            <div className="size-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
              <Zap className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Ultra-Lightweight (&lt; 3 KB)</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Zero runtime dependencies. 95% smaller bundle footprint than alternative libraries (~52 KB).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all">
            <div className="size-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
              <Cpu className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Off-Thread Web Worker</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Processes 15MB+ camera photos in background threads via OffscreenCanvas. 60 FPS buttery smooth UI even on low-end phones.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all">
            <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Adaptive Target Size Loop</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Pass <code className="text-indigo-300 font-mono text-xs">targetSizeMB: 0.5</code> and let Compressly automatically optimize quality and bounds to guarantee the output size.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all">
            <div className="size-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-4">
              <Layers className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Concurrent Batch Processing</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Upload 50 images at once with built-in concurrency pools and batch progress monitoring without blowing up browser RAM.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all">
            <div className="size-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
              <Sparkles className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Auto EXIF Orientation</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Fixes vertical iPhone photos flipping sideways using modern native browser APIs without bloating your bundle with legacy EXIF parsers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all">
            <div className="size-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <ArrowRight className="size-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">SSR-Safe (Next.js First)</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Built with ESM & CJS exports and SSR guards. No <code className="text-indigo-300 font-mono text-xs">window is not defined</code> errors in Next.js or Nuxt.
            </p>
          </div>
        </div>
      </section>

      {/* Code Examples Section */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-2 text-xs">
            Simple Developer Experience
          </Badge>
          <h2 className="text-3xl font-bold text-white mb-3">Dead-Simple API</h2>
          <p className="text-gray-400 text-sm">One function call is all it takes to handle any image upload gracefully.</p>
        </div>

        <CodeSnippetTabs />
      </section>

      {/* Benchmarks Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2 text-xs">
            Benchmarking
          </Badge>
          <h2 className="text-3xl font-bold text-white mb-3">Feature & Performance Comparison</h2>
          <p className="text-gray-400 text-sm">See how Compressly compares against existing npm alternatives.</p>
        </div>

        <BenchmarkTable />
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 text-center text-xs text-gray-500">
        <p className="mb-2">
          Created with precision by{" "}
          <a
            href="https://github.com/Mostafashadow1"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-white font-medium underline underline-offset-4"
          >
            Mostafa Mohamed Abdalla
          </a>
        </p>
        <p>Released under the MIT License.</p>
      </footer>
    </div>
  );
}
