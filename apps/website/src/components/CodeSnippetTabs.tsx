"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CodeSnippetTabs() {
  const [activeTab, setActiveTab] = useState<"quick" | "react" | "batch">("quick");
  const [copied, setCopied] = useState(false);

  const snippets = {
    quick: `import { compressImage } from "compressly";

// Compress any image down to web-ready format in milliseconds
const compressedFile = await compressImage(file, {
  maxWidth: 1920,      // Keep high resolution
  quality: 0.82,       // 82% quality (indistinguishable, -85% size)
  targetSizeMB: 0.5,   // Guarantee <= 500 KB output
});

// Upload to your backend
const formData = new FormData();
formData.append("photo", compressedFile);
await fetch("/api/upload", { method: "POST", body: formData });`,

    react: `import { useImageCompressor } from "compressly/react";

export function AvatarUploader() {
  const { compress, isCompressing, progress, lastResult } = useImageCompressor({
    maxWidth: 1024,
    quality: 0.85,
  });

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await compress(file);
      console.log("Saved bytes:", result.reductionPercentage + "%");
    }
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} disabled={isCompressing} />
      {isCompressing && <span>Optimizing... {progress}%</span>}
    </div>
  );
}`,

    batch: `import { compressImages } from "compressly";

// Drop 50 images at once without crashing mobile RAM
const files = Array.from(input.files);

const optimizedFiles = await compressImages(files, {
  concurrency: 3,      // Process 3 concurrently in Web Worker
  maxWidth: 1920,
  quality: 0.82,
  onBatchProgress: (percent, completed, total) => {
    console.log(\`Batch progress: \${percent}% (\${completed}/\${total})\`);
  },
});`,
  };

  const copyCode = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-md overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("quick")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "quick" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Quickstart (Vanilla / Any Framework)
          </button>
          <button
            onClick={() => setActiveTab("react")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "react" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            React Hook (useImageCompressor)
          </button>
          <button
            onClick={() => setActiveTab("batch")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "batch" ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Batch Multi-Files
          </button>
        </div>

        <button
          onClick={copyCode}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
        >
          {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <div className="p-4 sm:p-6 overflow-x-auto text-xs sm:text-sm font-mono text-gray-300 leading-relaxed">
        <pre>{snippets[activeTab]}</pre>
      </div>
    </div>
  );
}
