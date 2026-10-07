export interface LoadedImageSource {
  source: ImageBitmap | HTMLImageElement;
  width: number;
  height: number;
  close: () => void;
}

/**
 * Loads an image file into an ImageBitmap or HTMLImageElement,
 * automatically applying correct EXIF orientation (e.g. portrait photos on iOS/Android).
 */
export async function loadImageWithExif(
  file: File,
  autoRotate: boolean = true,
): Promise<LoadedImageSource> {
  // Method 1: Modern browser native createImageBitmap with EXIF support
  if (typeof createImageBitmap === "function") {
    try {
      const options: ImageBitmapOptions = autoRotate ? { imageOrientation: "from-image" } : {};
      const bitmap = await createImageBitmap(file, options);
      return {
        source: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        close: () => bitmap.close(),
      };
    } catch {
      // Fallback to Image() if format is not supported by createImageBitmap
    }
  }

  // Method 2: Standard HTML Image element fallback
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      resolve({
        source: img,
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
        close: () => URL.revokeObjectURL(objectUrl),
      });
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(objectUrl);
      reject(err);
    };

    img.src = objectUrl;
  });
}
