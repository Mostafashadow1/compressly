import { CompressOptions, CompressResult } from "../types";
import { calculateDimensions } from "./dimensions";
import { loadImageWithExif } from "./loader";
import { compressInWorker, isWorkerSupported } from "./worker";

/**
 * Compresses an image with full details (sizes, percentage, timing, dimensions).
 */
export async function compressImageWithDetails(
  file: File,
  options: CompressOptions = {},
): Promise<CompressResult> {
  const startTime = performance.now();

  const originalSize = file.size;
  const {
    maxSizeMB = 1,
    targetSizeMB,
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 0.82,
    autoRotate = true,
    useWorker = true,
    forceResize = false,
    onProgress,
  } = options;

  onProgress?.(5, "reading");

  // SSR or invalid file check
  if (typeof window === "undefined" || !file.type || !file.type.startsWith("image/")) {
    onProgress?.(100, "complete");
    return {
      file,
      originalSize,
      compressedSize: originalSize,
      reductionPercentage: 0,
      timeTakenMs: Math.round(performance.now() - startTime),
      dimensions: { width: 0, height: 0 },
    };
  }

  const isSvg = file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg");
  const isGif = file.type === "image/gif" || file.name.toLowerCase().endsWith(".gif");

  if (isSvg || isGif) {
    onProgress?.(100, "complete");
    return {
      file,
      originalSize,
      compressedSize: originalSize,
      reductionPercentage: 0,
      timeTakenMs: Math.round(performance.now() - startTime),
      dimensions: { width: 0, height: 0 },
    };
  }

  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  const targetSizeBytes = targetSizeMB ? targetSizeMB * 1024 * 1024 : undefined;

  try {
    onProgress?.(20, "orienting");
    const imageInfo = await loadImageWithExif(file, autoRotate);
    const { width: origWidth, height: origHeight } = imageInfo;

    // Check pass-through: if already under max size and within dimensions, skip
    const isWithinBounds = origWidth <= maxWidth && origHeight <= maxHeight;
    if (!forceResize && !targetSizeBytes && originalSize <= maxSizeBytes && isWithinBounds) {
      imageInfo.close();
      onProgress?.(100, "complete");
      return {
        file,
        originalSize,
        compressedSize: originalSize,
        reductionPercentage: 0,
        timeTakenMs: Math.round(performance.now() - startTime),
        dimensions: { width: origWidth, height: origHeight },
      };
    }

    onProgress?.(40, "resizing");
    const initialDims = calculateDimensions(origWidth, origHeight, maxWidth, maxHeight);

    const isPng = file.type === "image/png" || file.name.toLowerCase().endsWith(".png");
    const targetMime: string = options.mimeType || (isPng ? "image/png" : "image/jpeg");

    onProgress?.(60, "compressing");

    let currentQuality = quality;
    let currentWidth = initialDims.width;
    let currentHeight = initialDims.height;
    let bestBlob: Blob | null = null;
    const maxIterations = targetSizeBytes ? 4 : 1;

    for (let iter = 0; iter < maxIterations; iter++) {
      let candidateBlob: Blob | null = null;

      // Try worker if allowed and available
      if (useWorker && isWorkerSupported()) {
        candidateBlob = await compressInWorker(
          file,
          currentWidth,
          currentHeight,
          currentQuality,
          targetMime,
        );
      }

      // Fallback to Main Thread Canvas if worker returned null
      if (!candidateBlob) {
        candidateBlob = await compressOnCanvas(
          imageInfo.source,
          currentWidth,
          currentHeight,
          currentQuality,
          targetMime,
        );
      }

      if (candidateBlob) {
        bestBlob = candidateBlob;

        // If target size is met or not specified, break
        if (!targetSizeBytes || candidateBlob.size <= targetSizeBytes) {
          break;
        }

        // Adaptive adjustment for target size
        currentQuality = Math.max(0.3, currentQuality * 0.75);
        if (iter >= 1) {
          currentWidth = Math.max(200, Math.round(currentWidth * 0.85));
          currentHeight = Math.max(200, Math.round(currentHeight * 0.85));
        }
      }
    }

    imageInfo.close();

    if (!bestBlob || (bestBlob.size >= originalSize && isWithinBounds && !targetSizeBytes)) {
      onProgress?.(100, "complete");
      return {
        file,
        originalSize,
        compressedSize: originalSize,
        reductionPercentage: 0,
        timeTakenMs: Math.round(performance.now() - startTime),
        dimensions: { width: origWidth, height: origHeight },
      };
    }

    onProgress?.(95, "complete");

    let extension = targetMime.split("/")[1] || "jpg";
    if (extension === "jpeg") extension = "jpg";

    const baseName = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
    const newFileName = `${baseName}.${extension}`;

    const compressedFile = new File([bestBlob], newFileName, {
      type: targetMime,
      lastModified: Date.now(),
    });

    const compressedSize = compressedFile.size;
    const reductionPercentage = Math.max(
      0,
      parseFloat((((originalSize - compressedSize) / originalSize) * 100).toFixed(1)),
    );

    onProgress?.(100, "complete");

    return {
      file: compressedFile,
      originalSize,
      compressedSize,
      reductionPercentage,
      timeTakenMs: Math.round(performance.now() - startTime),
      dimensions: { width: currentWidth, height: currentHeight },
    };
  } catch (error) {
    console.warn("compressly compression fallback:", error);
    onProgress?.(100, "complete");
    return {
      file,
      originalSize,
      compressedSize: originalSize,
      reductionPercentage: 0,
      timeTakenMs: Math.round(performance.now() - startTime),
      dimensions: { width: 0, height: 0 },
    };
  }
}

/**
 * Standard single image compression returning directly the optimized File.
 */
export async function compressImage(
  file: File,
  options: CompressOptions = {},
): Promise<File> {
  const result = await compressImageWithDetails(file, options);
  return result.file;
}

function compressOnCanvas(
  source: ImageBitmap | HTMLImageElement,
  width: number,
  height: number,
  quality: number,
  targetMime: string,
): Promise<Blob | null> {
  return new Promise((resolve) => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) {
        resolve(null);
        return;
      }

      if (targetMime === "image/jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(source, 0, 0, width, height);

      canvas.toBlob(
        (blob) => resolve(blob),
        targetMime,
        targetMime === "image/png" ? undefined : quality,
      );
    } catch {
      resolve(null);
    }
  });
}
