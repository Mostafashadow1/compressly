import { useCallback, useState } from "react";
import { compressImageWithDetails } from "../core/compress";
import { compressImagesWithDetails } from "../core/batch";
import { BatchCompressOptions, CompressionPhase, CompressOptions, CompressResult } from "../types";

export interface UseImageCompressorReturn {
  compress: (file: File, overrideOptions?: CompressOptions) => Promise<CompressResult>;
  compressMultiple: (files: File[], overrideOptions?: BatchCompressOptions) => Promise<CompressResult[]>;
  isCompressing: boolean;
  progress: number;
  phase: CompressionPhase;
  lastResult: CompressResult | null;
  lastBatchResults: CompressResult[];
  error: Error | null;
  reset: () => void;
}

/**
 * React hook for seamless image compression with reactive loading, progress and error states.
 */
export function useImageCompressor(defaultOptions: CompressOptions = {}): UseImageCompressorReturn {
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [phase, setPhase] = useState<CompressionPhase>("idle");
  const [lastResult, setLastResult] = useState<CompressResult | null>(null);
  const [lastBatchResults, setLastBatchResults] = useState<CompressResult[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const reset = useCallback(() => {
    setIsCompressing(false);
    setProgress(0);
    setPhase("idle");
    setLastResult(null);
    setLastBatchResults([]);
    setError(null);
  }, []);

  const compress = useCallback(
    async (file: File, overrideOptions?: CompressOptions): Promise<CompressResult> => {
      try {
        setIsCompressing(true);
        setError(null);
        setProgress(0);
        setPhase("reading");

        const mergedOptions: CompressOptions = {
          ...defaultOptions,
          ...overrideOptions,
          onProgress: (p, ph) => {
            setProgress(p);
            setPhase(ph);
            overrideOptions?.onProgress?.(p, ph);
            defaultOptions?.onProgress?.(p, ph);
          },
        };

        const result = await compressImageWithDetails(file, mergedOptions);
        setLastResult(result);
        return result;
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);
        throw errorObj;
      } finally {
        setIsCompressing(false);
      }
    },
    [defaultOptions],
  );

  const compressMultiple = useCallback(
    async (files: File[], overrideOptions?: BatchCompressOptions): Promise<CompressResult[]> => {
      try {
        setIsCompressing(true);
        setError(null);
        setProgress(0);
        setPhase("compressing");

        const mergedOptions: BatchCompressOptions = {
          ...defaultOptions,
          ...overrideOptions,
          onBatchProgress: (overallPercent, count, total) => {
            setProgress(overallPercent);
            overrideOptions?.onBatchProgress?.(overallPercent, count, total);
            defaultOptions?.onProgress?.(overallPercent, "compressing");
          },
        };

        const results = await compressImagesWithDetails(files, mergedOptions);
        setLastBatchResults(results);
        return results;
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);
        throw errorObj;
      } finally {
        setIsCompressing(false);
        setPhase("complete");
      }
    },
    [defaultOptions],
  );

  return {
    compress,
    compressMultiple,
    isCompressing,
    progress,
    phase,
    lastResult,
    lastBatchResults,
    error,
    reset,
  };
}
