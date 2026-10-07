/**
 * Check if the current browser environment supports OffscreenCanvas and Web Workers.
 */
export function isWorkerSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof Worker !== "undefined" &&
    typeof OffscreenCanvas !== "undefined" &&
    typeof URL !== "undefined" &&
    typeof URL.createObjectURL === "function"
  );
}

const workerCode = `
self.onmessage = async function(e) {
  const { file, width, height, quality, targetMime } = e.data;
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    if (targetMime === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
    }
    
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();
    
    const blob = await canvas.convertToBlob({
      type: targetMime,
      quality: targetMime === 'image/png' ? undefined : quality,
    });
    
    self.postMessage({ success: true, blob });
  } catch (err) {
    self.postMessage({ success: false, error: String(err) });
  }
};
`;

/**
 * Executes image compression inside a background Web Worker using OffscreenCanvas.
 * Ensures the main UI thread never stutters or drops frames on low-end devices.
 */
export async function compressInWorker(
  file: File,
  width: number,
  height: number,
  quality: number,
  targetMime: string,
): Promise<Blob | null> {
  if (!isWorkerSupported()) {
    return null;
  }

  return new Promise((resolve) => {
    let worker: Worker | null = null;
    let blobUrl: string | null = null;

    try {
      const workerBlob = new Blob([workerCode], { type: "application/javascript" });
      blobUrl = URL.createObjectURL(workerBlob);
      worker = new Worker(blobUrl);

      worker.onmessage = (e) => {
        if (e.data?.success && e.data?.blob) {
          resolve(e.data.blob);
        } else {
          resolve(null);
        }
        cleanup();
      };

      worker.onerror = () => {
        resolve(null);
        cleanup();
      };

      worker.postMessage({ file, width, height, quality, targetMime });
    } catch {
      resolve(null);
      cleanup();
    }

    function cleanup() {
      if (worker) {
        worker.terminate();
        worker = null;
      }
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
        blobUrl = null;
      }
    }
  });
}
