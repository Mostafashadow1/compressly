/**
 * Compression phase indicator reported to onProgress callbacks.
 */
export type CompressionPhase = "idle" | "reading" | "orienting" | "resizing" | "compressing" | "complete";

/**
 * Options for single image compression.
 */
export interface CompressOptions {
  /**
   * Maximum file size in MB below which compression is skipped.
   * If the input file is already below this and dimensions are acceptable, it passes through untouched.
   * @default 1
   */
  maxSizeMB?: number;

  /**
   * Maximum target file size in MB.
   * If specified, the compression engine executes an adaptive feedback loop
   * to guarantee the output file size is under this threshold without losing undue quality.
   */
  targetSizeMB?: number;

  /**
   * Maximum width allowed in pixels. Aspect ratio is always preserved.
   * @default 1920
   */
  maxWidth?: number;

  /**
   * Maximum height allowed in pixels. Aspect ratio is always preserved.
   * @default 1920
   */
  maxHeight?: number;

  /**
   * Compression quality (0.1 to 1.0) for JPEG and WebP.
   * @default 0.82
   */
  quality?: number;

  /**
   * Target MIME type.
   * If omitted, keeps PNG if source has potential transparency; otherwise outputs image/jpeg.
   */
  mimeType?: "image/jpeg" | "image/webp" | "image/png";

  /**
   * Automatically detect and correct EXIF orientation (e.g. iPhone portrait photos).
   * @default true
   */
  autoRotate?: boolean;

  /**
   * Run compression off the main thread in a Web Worker using OffscreenCanvas where supported.
   * Prevents UI stuttering and frame drops on low-end devices.
   * @default true
   */
  useWorker?: boolean;

  /**
   * Force compression & resize even if file is already smaller than maxSizeMB.
   * @default false
   */
  forceResize?: boolean;

  /**
   * Progress callback reporting current progress percentage (0 to 100) and current phase.
   */
  onProgress?: (progress: number, phase: CompressionPhase) => void;
}

/**
 * Result details returned by compression operations.
 */
export interface CompressResult {
  /** The resulting compressed File object. */
  file: File;
  /** Size of original file in bytes. */
  originalSize: number;
  /** Size of compressed file in bytes. */
  compressedSize: number;
  /** Compression reduction percentage (e.g. 85.5 means 85.5% smaller). */
  reductionPercentage: number;
  /** Total processing duration in milliseconds. */
  timeTakenMs: number;
  /** Resulting image dimensions. */
  dimensions: {
    width: number;
    height: number;
  };
}

/**
 * Options for batch image compression.
 */
export interface BatchCompressOptions extends CompressOptions {
  /**
   * Maximum number of concurrent compression tasks.
   * Prevents memory exhaustion on mobile devices when compressing multiple large photos.
   * @default 3
   */
  concurrency?: number;

  /**
   * Callback fired each time a single file in the batch completes.
   */
  onFileComplete?: (result: CompressResult, index: number, total: number) => void;

  /**
   * Overall batch progress callback (0 to 100).
   */
  onBatchProgress?: (overallPercentage: number, completedCount: number, totalCount: number) => void;
}
