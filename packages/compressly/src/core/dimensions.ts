/**
 * Proportional dimension calculator keeping strict aspect ratio.
 */
export function calculateDimensions(
  currentWidth: number,
  currentHeight: number,
  maxWidth: number,
  maxHeight: number,
): { width: number; height: number } {
  let width = currentWidth;
  let height = currentHeight;

  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    width = Math.max(1, Math.round(width * ratio));
    height = Math.max(1, Math.round(height * ratio));
  }

  return { width, height };
}
