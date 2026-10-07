"use client";

import React, { useState } from "react";
import { X, Download, Sliders, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface ComparisonItem {
  file: File;
  originalSize: number;
  compressedSize: number;
  reductionPercentage: number;
  timeTakenMs: number;
  dimensions: { width: number; height: number };
  originalUrl: string;
  compressedUrl: string;
}

export function ComparisonSliderModal({
  item,
  onClose,
}: {
  item: ComparisonItem | null;
  onClose: () => void;
}) {
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  if (!item) return null;

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const downloadFile = () => {
    const a = document.createElement("a");
    a.href = item.compressedUrl;
    a.download = item.file.name;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-3xl border border-white/15 bg-slate-900/95 shadow-2xl p-6 sm:p-8 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white truncate max-w-md">{item.file.name}</h3>
              <Badge variant="success">-{item.reductionPercentage}%</Badge>
            </div>
            <span className="text-xs text-gray-400">
              Processed in {item.timeTakenMs}ms via Web Worker &bull; {item.dimensions.width}×{item.dimensions.height}px
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="default" size="sm" onClick={downloadFile} className="gap-1.5 text-xs">
              <Download className="size-3.5" /> Download
            </Button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Side-by-Side Comparison Container */}
        <div className="my-6 flex-1 overflow-hidden flex flex-col">
          {/* Split Screen Slider Container */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/70 border border-white/10 select-none flex-1">
            {/* Background Compressed Image */}
            <img
              src={item.compressedUrl}
              alt="Compressed Preview"
              className="absolute inset-0 size-full object-contain pointer-events-none"
            />

            {/* Foreground Original Image (Clipped by slider) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={item.originalUrl}
                alt="Original Preview"
                className="absolute inset-0 size-full object-contain"
              />
            </div>

            {/* Slider Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-8 rounded-full bg-indigo-600 border-2 border-white text-white flex items-center justify-center shadow-lg">
                <Sliders className="size-4" />
              </div>
            </div>

            {/* Range Input for dragging */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(parseFloat(e.target.value))}
              className="absolute inset-0 size-full opacity-0 cursor-ew-resize z-20"
            />

            {/* Labels overlay */}
            <div className="absolute top-3 left-3 pointer-events-none px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-xs text-xs font-mono text-gray-200 border border-white/10">
              Original: {formatBytes(item.originalSize)}
            </div>
            <div className="absolute top-3 right-3 pointer-events-none px-2.5 py-1 rounded-lg bg-emerald-950/80 backdrop-blur-xs text-xs font-mono text-emerald-300 border border-emerald-500/30">
              Optimized: {formatBytes(item.compressedSize)}
            </div>
          </div>

          <div className="text-center mt-3 text-xs text-gray-500">
            Drag the slider horizontally to compare pixel fidelity before and after optimization.
          </div>
        </div>
      </div>
    </div>
  );
}
