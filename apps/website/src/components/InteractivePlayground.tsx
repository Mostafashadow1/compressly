"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  compressImageWithDetails,
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
  X,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function InteractivePlayground() {
  // Compression Settings
  const [quality, setQuality] = useState<number>(0.82);
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [targetSizeMB, setTargetSizeMB] = useState<string>("");
  const [concurrency, setConcurrency] = useState<number>(3);
  const [useWorker, setUseWorker] = useState<boolean>(true);
  const [format, setFormat] = useState<
    "auto" | "image/jpeg" | "image/webp" | "image/png"
  >("auto");
  const [showSettings, setShowSettings] = useState<boolean>(true);

  // Processing & Results State
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [phase, setPhase] = useState<CompressionPhase>("idle");
  const [results, setResults] = useState<
    Array<CompressResult & { originalUrl: string; compressedUrl: string }>
  >([]);
  const [selectedResult, setSelectedResult] = useState<
    (CompressResult & { originalUrl: string; compressedUrl: string }) | null
  >(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

      // Notify user about rejected non-image files via rich toast
      if (invalidFiles.length > 0) {
        if (invalidFiles.length === 1) {
          toast.error("Unsupported file type", {
            description: `"${invalidFiles[0].name}" is not an image file. Compressly accepts PNG, JPEG, WebP, SVG, and AVIF.`,
          });
        } else {
          const sampleNames = invalidFiles
            .slice(0, 2)
            .map((f) => f.name)
            .join(", ");
          toast.error(`${invalidFiles.length} non-image files skipped`, {
            description: `Files (${sampleNames}...) were rejected. Only images are processed.`,
          });
        }
      }

      // Stop if there are no valid images to process
      if (validFiles.length === 0) {
        return;
      }

      toast.info(`Processing ${validFiles.length} image(s)`, {
        description: `Running client-side optimization via ${useWorker ? "off-thread Web Worker" : "canvas engine"}...`,
      });

      setIsProcessing(true);
      setProgress(0);
      setPhase("reading");

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

        const decorated = detailedResults.map((res, i) => ({
          ...res,
          originalUrl: URL.createObjectURL(validFiles[i]),
          compressedUrl: URL.createObjectURL(res.file),
        }));

        setResults((prev) => [...decorated, ...prev]);
        if (decorated.length > 0) {
          setSelectedResult(decorated[0]);
        }

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
          description:
            "An unexpected error occurred during client-side compression.",
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
    setSelectedResult(null);
  };

  // Aggregated Batch Stats
  const totalOriginalBytes = results.reduce(
    (acc, r) => acc + r.originalSize,
    0,
  );
  const totalCompressedBytes = results.reduce(
    (acc, r) => acc + r.compressedSize,
    0,
  );
  const totalSavedBytes = totalOriginalBytes - totalCompressedBytes;
  const overallReduction =
    totalOriginalBytes > 0
      ? Math.max(
          0,
          parseFloat(((totalSavedBytes / totalOriginalBytes) * 100).toFixed(1)),
        )
      : 0;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Main Container Card */}
      <Card className="border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-2xl p-6 sm:p-8">
        {/* Controls Toolbar Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-indigo-400" />{" "}
              Compression Engine Settings
            </h3>
            <Badge variant="default" className="text-[10px] font-mono">
              Hardware-Accelerated
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="text-xs text-gray-400 hover:text-white"
            >
              {showSettings ? "Hide Controls" : "Show Controls"}
            </Button>
          </div>
        </div>

        {/* Settings Bar */}
        {showSettings && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/5 mb-8 text-sm">
            {/* Quality Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-300">
                  Quality Factor
                </span>
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
                82% is optimal for indistinguishable fidelity.
              </span>
            </div>

            {/* Max Dimension */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-300">
                  Max Dimension
                </span>
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

            {/* Target Size In MB */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-300">
                  Target Size (Optional)
                </span>
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
                Forces iterative optimization until target size is met.
              </span>
            </div>

            {/* Concurrency & Worker */}
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
                  <span className="font-mono text-indigo-400">
                    {concurrency} parallel
                  </span>
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
            {isProcessing ? (
              <RefreshCw className="size-8 animate-spin" />
            ) : (
              <UploadCloud className="size-8" />
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
            {isProcessing
              ? `Optimizing images (${phase})...`
              : "Drop single or multiple images here"}
          </h3>
          <p className="text-gray-400 text-sm max-w-lg leading-relaxed">
            {isProcessing
              ? `Processing concurrently across Web Worker threads. Your UI remains 100% responsive.`
              : "Drag & drop 1, 10, or 50 images of any resolution or size (even 20MB+ camera shots). Compressly handles them effortlessly."}
          </p>

          {/* Real-time Progress Bar */}
          {isProcessing && (
            <div className="w-full max-w-md mt-6 space-y-2">
              <div className="flex justify-between text-xs text-gray-300">
                <span className="capitalize">{phase}...</span>
                <span className="font-mono font-semibold text-indigo-400">
                  {progress}%
                </span>
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

      {/* Results & Batch Queue Showcase */}
      {results.length > 0 && (
        <div className="space-y-6">
          {/* Summary Metric Ribbon */}
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="size-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    {results.length} {results.length === 1 ? "Image" : "Images"}{" "}
                    Optimized
                  </h4>
                  <span className="text-xs text-emerald-400 font-medium">
                    Saved {formatBytes(totalSavedBytes)} ({overallReduction}%
                    size reduction)
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-4 text-xs font-mono border-l border-white/10 pl-6 text-gray-400">
                <div>
                  <span className="block text-gray-500">Original Total</span>
                  <span className="text-gray-200 font-bold">
                    {formatBytes(totalOriginalBytes)}
                  </span>
                </div>
                <div>→</div>
                <div>
                  <span className="block text-gray-500">Compressed Total</span>
                  <span className="text-emerald-300 font-bold">
                    {formatBytes(totalCompressedBytes)}
                  </span>
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

          {/* Side-by-Side Comparison Modal / Box */}
          {selectedResult && (
            <Card className="border-indigo-500/30 bg-slate-900/80 p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Eye className="size-4 text-indigo-400" />
                  <h4 className="font-bold text-white text-base">
                    Visual Comparison:{" "}
                    <span className="text-indigo-300">
                      {selectedResult.file.name}
                    </span>
                  </h4>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="success">
                    -{selectedResult.reductionPercentage}% &bull;{" "}
                    {selectedResult.timeTakenMs}ms
                  </Badge>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => downloadFile(selectedResult.file)}
                  >
                    <Download className="size-3.5" /> Download
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original View */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span className="font-semibold uppercase tracking-wider">
                      Original
                    </span>
                    <span className="font-mono text-gray-300">
                      {formatBytes(selectedResult.originalSize)}
                    </span>
                  </div>
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black/50 border border-white/10 flex items-center justify-center p-2">
                    <img
                      src={selectedResult.originalUrl}
                      alt="Original Preview"
                      className="size-full object-contain"
                    />
                  </div>
                </div>

                {/* Compressed View */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-emerald-400">
                    <span className="font-semibold uppercase tracking-wider">
                      Optimized Result
                    </span>
                    <span className="font-mono text-emerald-300 font-bold">
                      {formatBytes(selectedResult.compressedSize)} (
                      {selectedResult.dimensions.width}×
                      {selectedResult.dimensions.height})
                    </span>
                  </div>
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black/50 border border-emerald-500/30 flex items-center justify-center p-2">
                    <img
                      src={selectedResult.compressedUrl}
                      alt="Compressed Preview"
                      className="size-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Processed Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((item, idx) => {
              const isSelected = selectedResult?.file.name === item.file.name;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedResult(item)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                      : "border-white/10 bg-slate-900/40 hover:border-white/20 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="size-14 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0 flex items-center justify-center">
                    <img
                      src={item.compressedUrl}
                      alt={item.file.name}
                      className="size-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-semibold text-white truncate mb-0.5">
                      {item.file.name}
                    </h5>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-400 line-through">
                        {formatBytes(item.originalSize)}
                      </span>
                      <span className="text-emerald-400 font-bold">
                        {formatBytes(item.compressedSize)}
                      </span>
                    </div>
                    <span className="inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                      -{item.reductionPercentage}% &bull; {item.timeTakenMs}ms
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadFile(item.file);
                    }}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors cursor-pointer shrink-0"
                    title="Download optimized"
                  >
                    <Download className="size-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
