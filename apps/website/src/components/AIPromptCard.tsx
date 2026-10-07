"use client";

import React, { useState } from "react";
import { Sparkles, Copy, Check, Bot, Terminal, FileCode2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function AIPromptCard() {
  const [activeTab, setActiveTab] = useState<"cursor" | "react" | "next">("cursor");
  const [copied, setCopied] = useState<boolean>(false);

  const prompts = {
    cursor: `I want to integrate client-side image compression in this project using the \`compressly\` npm package.

Please do the following:
1. Install the package:
   \`pnpm add compressly\` (or npm i compressly)
2. In my image upload handler, before appending the selected File to FormData or state:
   - Import \`compressImage\` from "compressly".
   - Validate that the file is an image.
   - Run \`const optimizedFile = await compressImage(file, { maxWidth: 1920, quality: 0.82, targetSizeMB: 1 });\`
   - Send \`optimizedFile\` to the backend endpoint.
3. If handling multiple images, use \`compressImages(files, { concurrency: 3 })\`.
4. Add a subtle loading or progress indicator while optimizing.`,

    react: `Please build a React profile photo uploader component using \`compressly\`:
1. Use the hook: \`import { useImageCompressor } from "compressly/react";\`
2. Initialize it with \`maxWidth: 1024, quality: 0.85\`.
3. Provide an accessible file input and drag-and-drop area.
4. Display a reactive progress bar using the hook's \`progress\` state and \`phase\` indicator.
5. On completion, display a preview of the compressed image and its reduction percentage.`,

    next: `Update our Next.js App Router form to compress user-uploaded images in the browser before invoking our Server Action:
1. Ensure the file input component has "use client".
2. Import \`compressImage\` from "compressly".
3. When the user selects or drops an image:
   - Automatically compress it client-side (\`maxWidth: 1920, quality: 0.82\`).
   - Create a FormData instance with the compressed File.
   - Pass the FormData to our Server Action.
4. Ensure zero 'window is not defined' SSR errors.`,
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompts[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/30 via-slate-900/60 to-slate-950/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
            <Bot className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">Copy AI Prompt for Cursor & Claude</h3>
              <Badge variant="default" className="text-[10px] font-mono">
                1-Click Prompt
              </Badge>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Paste this prompt into Cursor, Claude 3.7, Copilot, or ChatGPT to implement Compressly automatically.
            </p>
          </div>
        </div>

        <Button
          onClick={copyPrompt}
          variant="default"
          size="sm"
          className="shadow-lg shadow-indigo-600/30 font-medium text-xs gap-1.5"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-400" />
              <span>Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>Copy AI Prompt</span>
            </>
          )}
        </Button>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("cursor")}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            activeTab === "cursor"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-white/5 text-gray-400 hover:text-white"
          }`}
        >
          Cursor / Claude (Full Flow)
        </button>
        <button
          onClick={() => setActiveTab("react")}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            activeTab === "react"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-white/5 text-gray-400 hover:text-white"
          }`}
        >
          React Component (useImageCompressor)
        </button>
        <button
          onClick={() => setActiveTab("next")}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            activeTab === "next"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-white/5 text-gray-400 hover:text-white"
          }`}
        >
          Next.js App Router & Server Action
        </button>
      </div>

      {/* Code / Prompt Terminal Box */}
      <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs sm:text-sm text-gray-300 leading-relaxed overflow-x-auto selection:bg-purple-500/30">
        <pre className="whitespace-pre-wrap">{prompts[activeTab]}</pre>
      </div>
    </div>
  );
}
