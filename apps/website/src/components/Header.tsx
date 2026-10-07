import React from "react";
import { Zap, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="border-b border-white/10 backdrop-blur-md sticky top-0 z-50 bg-[#080c15]/80 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl overflow-hidden bg-black/40 border border-white/10 shadow-lg shadow-indigo-500/25 shrink-0 flex items-center justify-center">
            <img src="/logo.png" alt="Compressly Logo" className="size-full w-20 h-20 object-cover " />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-white tracking-tight">compressly</span>
            <Badge variant="default" className="text-[10px] font-mono uppercase px-2 py-0.5">
              v0.1.0
            </Badge>
          </div>
        </div>

        {/* Links & External Badges */}
        <div className="flex items-center gap-3">
          {/* NPM Official Link & Icon */}
          <a
            href="https://www.npmjs.com/package/compressly"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/15 text-rose-300 hover:text-white transition-all shadow-xs group"
            title="View on npm"
          >
            {/* NPM SVG Icon */}
            <svg className="size-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.13h13.74v13.74h-3.435V8.565h-3.435v10.305H5.13z" />
            </svg>
            <span className="hidden sm:inline">npm</span>
          </a>

          {/* GitHub Link */}
          <a
            href="https://github.com/Mostafashadow1/compressly"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] text-gray-300 hover:text-white transition-all shadow-xs group"
          >
            <Github className="size-4 transition-transform group-hover:scale-110" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
