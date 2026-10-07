"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  compressImagesWithDetails,
  CompressResult,
  CompressionPhase,
} from "compressly";
import {
  UploadCloud,
  Download,
  Zap,
  CheckCircle2,
  RefreshCw,
  Image as ImageIcon,
  Layers,
  Sparkles,
  Trash2,
  Eye,
  SlidersHorizontal,
  ArrowRight,
  Maximize2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ComparisonSliderModal, ComparisonItem } from "./ComparisonSliderModal";

export function InteractivePlayground() {
  // Compression Settings
  const [quality, setQuality] = useState<number>(0.82);
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [targetSizeMB, setTargetSizeMB] = useState<string>("");
  const [concurrency, setConcurrency] = useState<number>(3);
  const [useWorker, setUseWorker] = useState<boolean>(true);
  const [format, setFormat] = useState<"auto" | "image/jpeg" | "image/webp" | "image/png">("auto");
  const [showSettings, setShowSettings] = useState<boolean>(true);

  // Processing & Results State
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [phase, setPhase] = useState<CompressionPhase>("idle");
  const [results, setResults] = useState<ComparisonItem[]>([]);
  const [modalItem, setModalItem] = useState<ComparisonItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;

      const rawFiles = Array.from(fileList);
      const validFiles: File[] = [];
      const invalidFiles: File[] = [];

      for (const file of rawFiles) {
        const isImage =
          file.type.startsWith("image/") ||
          /\.(jpe?g|png|webp|svg|gif|avif|bmp|ico|tiff?)$/i.test(file.name);
        if (isImage) {
          validFiles.push(file);
        } else {
          invalidFiles.push(file);
        }
      }

      if (invalidFiles.length > 0) {
        if (invalidFiles.length === 1) {
          toast.error("Unsupported file type", {
            description: `"${invalidFiles[0].name}" is not an image file. Compressly accepts PNG, JPEG, WebP, SVG, and AVIF.`,
          });
        } else {
          const sampleNames = invalidFiles.slice(0, 2).map((f) => f.name).join(", ");
          toast.error(`${invalidFiles.length} non-image files skipped`, {
            description: `Files (${sampleNames}...) were rejected. Only images are processed.`,
          });
        }
      }

      if (validFiles.length === 0) {
        return;
      }

      toast.info(`Processing ${validFiles.length} image(s)`, {
        description: `Running client-side optimization via ${useWorker ? "off-thread Web Worker" : "canvas engine"}...`,
      });

      setIsProcessing(true);
      setProgress(0);
      setPhase("reading");

      // Auto-scroll down to results so the user immediately sees the action
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);

      const options = {
        quality,
        maxWidth,
        maxHeight: maxWidth,
        targetSizeMB: targetSizeMB ? parseFloat(targetSizeMB) : undefined,
        concurrency,
        useWorker,
        mimeType: format === "auto" ? undefined : format,
      };

      try {
        const detailedResults = await compressImagesWithDetails(validFiles, {
          ...options,
          onBatchProgress: (overall) => {
            setProgress(overall);
            setPhase(overall === 100 ? "complete" : "compressing");
          },
        });

        const decorated: ComparisonItem[] = detailedResults.map((res, i) => ({
          ...res,
          originalUrl: URL.createObjectURL(validFiles[i]),
          compressedUrl: URL.createObjectURL(res.file),
        }));

        setResults((prev) => [...decorated, ...prev]);

        const totalSaved = detailedResults.reduce(
          (acc, r) => acc + (r.originalSize - r.compressedSize),
          0,
        );
        toast.success("Optimization complete!", {
          description: `Successfully compressed ${detailedResults.length} image(s). Saved ${formatBytes(totalSaved)}.`,
        });
      } catch (err) {
        console.error("Compression failed:", err);
        toast.error("Optimization error", {
          description: "An unexpected error occurred during client-side compression.",
        });
      } finally {
        setIsProcessing(false);
      }
    },
    [quality, maxWidth, targetSizeMB, concurrency, useWorker, format],
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const downloadFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    results.forEach((item, index) => {
      setTimeout(() => {
        downloadFile(item.file);
      }, index * 200);
    });
  };

  const clearResults = () => {
    results.forEach((r) => {
      URL.revokeObjectURL(r.originalUrl);
      URL.revokeObjectURL(r.compressedUrl);
    });
    setResults([]);
  };

  // Aggregated Batch Stats
  const totalOriginalBytes = results.reduce((acc, r) => acc + r.originalSize, 0);
  const totalCompressedBytes = results.reduce((acc, r) => acc + r.compressedSize, 0);
  const totalSavedBytes = totalOriginalBytes - totalCompressedBytes;
  const overallReduction =
    totalOriginalBytes > 0
      ? Math.max(0, parseFloat(((totalSavedBytes / totalOriginalBytes) * 100).toFixed(1)))
      : 0;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Settings Card */}
      <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-indigo-400" /> SDK Engine Controls
            </h3>
            <Badge variant="default" className="text-[10px] font-mono">
              Client-Side Parameters
            </Badge>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="text-xs text-gray-400 hover:text-white"
          >
            {showSettings ? "Hide Controls" : "Show Controls"}
          </Button>
        </div>

        {/* Settings Bar */}
        {showSettings && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5 mb-8 text-sm">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-300">Quality Factor</span>
                <Badge variant="default" className="font-mono text-xs">
                  {Math.round(quality * 100)}%
                </Badge>
              </div>
              <input
                type="range"
                min="0.2"
                max="1"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <span className="text-[11px] text-gray-500 mt-1 block">
                82% is visually indistinguishable from 100%.
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-300">Max Dimension</span>
                <Badge variant="secondary" className="font-mono text-xs">
                  {maxWidth}px
                </Badge>
              </div>
              <input
                type="range"
                min="640"
                max="3840"
                step="120"
                value={maxWidth}
                onChange={(e) => setMaxWidth(parseInt(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex gap-1.5 mt-2">
                {[
                  { label: "Avatar", size: 512 },
                  { label: "Card", size: 1024 },
                  { label: "FHD", size: 1920 },
                  { label: "2K", size: 2560 },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setMaxWidth(item.size)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                      maxWidth === item.size
                        ? "bg-indigo-600 text-white font-bold"
                        : "bg-white/5 text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-300">Target Size (Optional)</span>
                <span className="text-[11px] text-gray-500">Adaptive Loop</span>
              </div>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="20"
                placeholder="e.g. 0.5 (for 500 KB)"
                value={targetSizeMB}
                onChange={(e) => setTargetSizeMB(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 text-xs font-mono"
              />
              <span className="text-[11px] text-gray-500 mt-1 block">
                Iterates to strictly guarantee output &le; target size.
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={useWorker}
                    onChange={(e) => setUseWorker(e.target.checked)}
                    className="rounded accent-indigo-500"
                  />
                  <span>Web Worker (Offscreen)</span>
                </label>

                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  className="bg-black/40 border border-white/10 rounded-lg text-xs px-2 py-1 text-gray-300 focus:outline-none"
                >
                  <option value="auto">Auto Format</option>
                  <option value="image/jpeg">JPEG</option>
                  <option value="image/webp">WebP</option>
                  <option value="image/png">PNG</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>Batch Concurrency</span>
                  <span className="font-mono text-indigo-400">{concurrency} parallel</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={concurrency}
                  onChange={(e) => setConcurrency(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Dropzone Area */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-3xl p-10 sm:p-14 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center ${
            isProcessing
              ? "border-indigo-500 bg-indigo-500/10 pointer-events-none"
              : "border-white/15 bg-white/[0.015] hover:border-indigo-500/50 hover:bg-white/[0.03] group"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          <div className="size-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white mb-4 shadow-xl shadow-indigo-500/25 transition-transform group-hover:scale-105">
            {isProcessing ? <RefreshCw className="size-8 animate-spin" /> : <UploadCloud className="size-8" />}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
            {isProcessing ? `Optimizing images (${phase})...` : "Drop single or multiple images here"}
          </h3>
          <p className="text-gray-400 text-sm max-w-lg leading-relaxed">
            {isProcessing
              ? `Processing concurrently in background Web Worker threads. Your UI never stutters.`
              : "Select 1 or bulk 20+ images of any resolution or size. Watch them transform into lightweight web assets in milliseconds."}
          </p>

          {/* Real-time Progress Bar */}
          {isProcessing && (
            <div className="w-full max-w-md mt-6 space-y-2">
              <div className="flex justify-between text-xs text-gray-300">
                <span className="capitalize">{phase}...</span>
                <span className="font-mono font-semibold text-indigo-400">{progress}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Target Results Anchor Ref */}
      <div ref={resultsRef} className="scroll-mt-24" />

      {/* Multiple Images Results Pipeline */}
      {results.length > 0 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Summary Metric Ribbon */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="size-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    {results.length} {results.length === 1 ? "Image" : "Images"} Optimized
                  </h4>
                  <span className="text-xs text-emerald-400 font-medium">
                    Saved {formatBytes(totalSavedBytes)} ({overallReduction}% size reduction)
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-4 text-xs font-mono border-l border-white/10 pl-6 text-gray-400">
                <div>
                  <span className="block text-gray-500">Original Total</span>
                  <span className="text-gray-200 font-bold">{formatBytes(totalOriginalBytes)}</span>
                </div>
                <div>&rarr;</div>
                <div>
                  <span className="block text-gray-500">Compressed Total</span>
                  <span className="text-emerald-300 font-bold">{formatBytes(totalCompressedBytes)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={clearResults}
                className="text-xs text-rose-300 border-rose-500/20 hover:bg-rose-500/10"
              >
                <Trash2 className="size-3.5" /> Clear All
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={downloadAll}
                className="shadow-lg shadow-indigo-600/30"
              >
                <Download className="size-4" /> Download All ({results.length})
              </Button>
            </div>
          </div>

          {/* Transformation Pipeline Cards List */}
          <div className="space-y-4">
            {results.map((item, idx) => (
              <Card
                key={idx}
                className="border-white/10 bg-slate-900/70 p-5 hover:border-indigo-500/30 transition-all shadow-lg"
              >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  {/* Left: Original File */}
                  <div className="flex items-center gap-4 w-full lg:w-5/12">
                    <div className="size-20 rounded-xl overflow-hidden bg-black/60 border border-white/10 shrink-0 flex items-center justify-center p-1">
                      <img
                        src={item.originalUrl}
                        alt={item.file.name}
                        className="size-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Original</span>
                        <Badge variant="destructive" className="text-[10px] py-0 font-mono">
                          {formatBytes(item.originalSize)}
                        </Badge>
                      </div>
                      <h5 className="text-sm font-semibold text-white truncate mb-1">{item.file.name}</h5>
                      <span className="text-xs text-gray-400 font-mono block">Input File</span>
                    </div>
                  </div>

                  {/* Center: The Pipeline Arrow + Execution Speed */}
                  <div className="flex flex-row lg:flex-col items-center justify-center gap-2 text-center py-2 lg:py-0 w-full lg:w-2/12 border-y lg:border-y-0 lg:border-x border-white/5">
                    <div className="size-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
                      <ArrowRight className="size-4" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-emerald-400 font-bold block">
                        {item.timeTakenMs}ms
                      </span>
                      <span className="text-[10px] text-gray-400">Web Worker</span>
                    </div>
                  </div>

                  {/* Right: Optimized Result */}
                  <div className="flex items-center justify-between gap-4 w-full lg:w-5/12">
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="size-20 rounded-xl overflow-hidden bg-black/60 border border-emerald-500/30 shrink-0 flex items-center justify-center p-1">
                        <img
                          src={item.compressedUrl}
                          alt="Compressed"
                          className="size-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Optimized</span>
                          <Badge variant="success" className="text-[10px] py-0 font-mono">
                            {formatBytes(item.compressedSize)}
                          </Badge>
                        </div>
                        <span className="text-xs font-bold text-emerald-300 block mb-0.5">
                          -{item.reductionPercentage}% Smaller
                        </span>
                        <span className="text-xs text-gray-400 font-mono block">
                          {item.dimensions.width}×{item.dimensions.height}px
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setModalItem(item)}
                        className="gap-1.5 text-xs text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/10"
                        title="Inspect comparison slider"
                      >
                        <Maximize2 className="size-3.5" /> Inspect
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => downloadFile(item.file)}
                        className="gap-1.5 text-xs shadow-md shadow-indigo-600/30"
                      >
                        <Download className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Comparison Slider Modal */}
      {modalItem && (
        <ComparisonSliderModal item={modalItem} onClose={() => setModalItem(null)} />
      )}
    </div>
  );
}
