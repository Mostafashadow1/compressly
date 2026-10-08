import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { InstallTabs } from "@/components/InstallTabs";
import { HeroPipelineWidget } from "@/components/HeroPipelineWidget";
import { SdkDemoBanner } from "@/components/SdkDemoBanner";
import { InteractivePlayground } from "@/components/InteractivePlayground";
import { CloudCostComparison } from "@/components/CloudCostComparison";
import { AIPromptCard } from "@/components/AIPromptCard";
import { BenchmarkTable } from "@/components/BenchmarkTable";
import { CodeSnippetTabs } from "@/components/CodeSnippetTabs";
import { FAQSection } from "@/components/FAQSection";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Play,
  Github,
  CheckCircle2,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#080c15] text-slate-100 selection:bg-indigo-500/30">
      {/* Background Glow Accents & Subtle Grid Mesh */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-15%] left-[20%] w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute top-[25%] right-[5%] w-[650px] h-[650px] rounded-full bg-purple-600/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Header with NPM and GitHub Links */}
      <Header />

      <main id="main-content">
        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-28 pb-16 px-4 sm:px-6 text-center max-w-5xl mx-auto">
          {/* Release / Feature Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-8 shadow-sm backdrop-blur-md hover:border-indigo-500/40 transition-colors">
            <span className="flex size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-slate-200">v0.1.0 Ready</span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-slate-300">Off-Thread Web Worker Engine</span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-indigo-400 font-mono">&lt; 3 KB</span>
          </div>

          {/* Primary Punchy Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] max-w-4xl mx-auto">
            Compress images on the client.{" "}
            <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              $0 Cloud Server Costs.
            </span>
          </h1>

          {/* Subheading / Value Proposition */}
          <p className="text-slate-300/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            The ultra-fast client-side compression library for Next.js, React, and modern web apps.
            Downscales large files, fixes iPhone EXIF rotation, and runs in background Web Workers with zero main-thread lag.
          </p>

          {/* Dual Primary Call-To-Actions (CTAs) */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
            <a
              href="#playground"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 cursor-pointer group"
            >
              <Play className="size-4 fill-current group-hover:scale-110 transition-transform" />
              <span>Try Live Playground</span>
            </a>

            <a
              href="https://github.com/Mostafashadow1/compressly"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-slate-200 hover:text-white font-medium text-sm transition-all shadow-xs cursor-pointer group"
            >
              <Github className="size-4 text-slate-400 group-hover:text-white transition-colors" />
              <span>View on GitHub</span>
              <ArrowRight className="size-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Quick Value Proof Trust Ribbon */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-400 mb-10 font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-400" />
              Zero Dependencies
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-400" />
              Next.js 15 SSR Safe
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-400" />
              60 FPS Guaranteed
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-400" />
              MIT Licensed
            </span>
          </div>

          {/* Package Manager Installation Tabs (pnpm, npm, yarn, bun) */}
          <div className="mb-12">
            <InstallTabs />
          </div>

          {/* Visual Transformation Pipeline Widget (Developer Architecture) */}
          <HeroPipelineWidget />
        </section>

        {/* Interactive Multi-Image Playground */}
        <section id="playground" className="px-6 pb-24 scroll-mt-20">
          <SdkDemoBanner />

          <div className="text-center mb-8">
            <Badge variant="default" className="mb-2 text-xs">
              Client-Side SDK Testbed
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Test the npm package live in your browser
            </h2>
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
        <section id="docs" className="py-20 px-6 border-t border-white/5 scroll-mt-20">
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
        <section id="benchmarks" className="py-20 px-6 max-w-6xl mx-auto border-t border-white/5 scroll-mt-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2 text-xs">
              Benchmarking
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-3">Feature & Performance Comparison</h2>
            <p className="text-gray-400 text-sm">See how Compressly compares against existing npm alternatives.</p>
          </div>

          <BenchmarkTable />
        </section>

        {/* Semantic FAQ Section for SEO Rich Results */}
        <FAQSection />
      </main>

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
