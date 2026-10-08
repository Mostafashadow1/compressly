import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Sparkles, Terminal, FileCode2, BarChart3, HelpCircle } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#080c15]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl py-1 px-1.5 -ml-1.5 transition-all"
        >
          <div className="flex items-center gap-2">
            <span className="font-bold text-base sm:text-lg text-white tracking-tight group-hover:text-indigo-200 transition-colors">compressly</span>
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 tracking-wide">
              v0.1.0
            </span>
          </div>
        </Link>

        {/* Desktop Anchor Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
          <a
            href="#playground"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all"
          >
            <Sparkles className="size-3.5 text-indigo-400" />
            <span>Playground</span>
          </a>
          <a
            href="#how-it-works"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all"
          >
            <Terminal className="size-3.5 text-purple-400" />
            <span>Architecture</span>
          </a>
          <a
            href="#docs"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all"
          >
            <FileCode2 className="size-3.5 text-cyan-400" />
            <span>API Docs</span>
          </a>
          <a
            href="#benchmarks"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all"
          >
            <BarChart3 className="size-3.5 text-emerald-400" />
            <span>Benchmarks</span>
          </a>
          <a
            href="#faq"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all"
          >
            <HelpCircle className="size-3.5 text-amber-400" />
            <span>FAQ</span>
          </a>
        </nav>

        {/* Action Badges / External Repositories */}
        <div className="flex items-center gap-2.5">
          {/* NPM Badge */}
          <a
            href="https://www.npmjs.com/package/compressly"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-white transition-all shadow-xs group"
            title="View Compressly on npm"
          >
            <svg
              className="size-3.5 fill-current transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.13h13.74v13.74h-3.435V8.565h-3.435v10.305H5.13z" />
            </svg>
            <span className="hidden sm:inline">npm</span>
          </a>

          {/* GitHub Star / Link */}
          <a
            href="https://github.com/Mostafashadow1/compressly"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-medium px-3.5 py-1.5 rounded-xl border border-white/10 hover:border-white/25 bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white transition-all shadow-xs group"
            title="Star on GitHub"
          >
            <Github className="size-3.5 text-slate-400 group-hover:text-white transition-transform group-hover:scale-110" />
            <span className="hidden sm:inline">Star on GitHub</span>
            <span className="sm:hidden">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
