import { BatchCompressOptions, CompressResult } from "../types";
import { compressImageWithDetails } from "./compress";

/**
 * Compresses an array of image files with concurrency management and detailed results.
 */
export async function compressImagesWithDetails(
  files: File[],
  options: BatchCompressOptions = {},
): Promise<CompressResult[]> {
  const {
    concurrency = 3,
    onFileComplete,
    onBatchProgress,
    ...singleOptions
  } = options;

  const total = files.length;
  if (total === 0) return [];

  const results: CompressResult[] = new Array(total);
  let completedCount = 0;
  let currentIndex = 0;

  async function worker() {
    while (currentIndex < total) {
      const index = currentIndex++;
      const file = files[index];

      const result = await compressImageWithDetails(file, singleOptions);
      results[index] = result;
      completedCount++;

      onFileComplete?.(result, index, total);
      const overallPercent = Math.round((completedCount / total) * 100);
      onBatchProgress?.(overallPercent, completedCount, total);
    }
  }

  const workerCount = Math.min(concurrency, total);
  const workers = Array.from({ length: workerCount }, () => worker());

  await Promise.all(workers);
  return results;
}

/**
 * Standard batch compression returning an array of optimized File objects.
 */
export async function compressImages(
  files: File[],
  options: BatchCompressOptions = {},
): Promise<File[]> {
  const detailedResults = await compressImagesWithDetails(files, options);
  return detailedResults.map((r) => r.file);
}
