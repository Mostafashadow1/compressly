# AGENTS.md for `compressly`

This file is for AI coding agents (Claude Code, Cursor, Copilot, Codex, etc.) working in a project that depends on `compressly`.

Compressly compresses and resizes images in the browser before upload: max width/height, quality, target file size, EXIF auto-rotation, batch mode with concurrency, and a Web Worker (OffscreenCanvas) path. Zero dependencies, ~2.2 KB gzip, SSR-safe, with an optional React hook.

## Use `compressly` when
- Users upload photos (avatars, listings, documents, chat images) and you want smaller files before they hit your server or storage.
- Uploads fail with 'file too large' or are slow on mobile networks.
- You need a hard size limit, e.g. every image under 500 KB (`targetSizeMB: 0.5`).
- You need to compress many files at once without freezing the UI.

## Do not use it for
- Server-side or build-time image optimization (use sharp, next/image, or your CDN).
- Lossless archival quality or RAW/HEIC editing.

## Rules
- Core functions: `compressImage(file, options)` returns a `File`; `compressImageWithDetails(file, options)` returns `{ file, originalSize, compressedSize, reductionPercentage, timeTakenMs, dimensions }`.
- Batch: `compressImages(files, { concurrency, ...options })` and `compressImagesWithDetails`. Keep concurrency around 2 to 4 on mobile.
- Files below `maxSizeMB` (default 1) are returned unchanged unless `forceResize: true`.
- Defaults: maxWidth 1920, maxHeight 1920, quality 0.82, useWorker true, autoRotate true.
- Output format: `mimeType: "image/webp" | "image/jpeg" | "image/png"`.
- It needs browser APIs (canvas, File). Call it from event handlers or client components, never during server render. In Next.js App Router, files using `compressly/react` must start with "use client".
- React hook: `import { useImageCompressor } from "compressly/react"` returns `{ compress, compressMultiple, isCompressing, progress, phase, lastResult, lastBatchResults, error, reset }`.
- Still validate type and size on the server. Client compression is a UX and cost optimization, not a security check.

## Examples

### Compress before upload

```ts
import { compressImage } from "compressly";

async function upload(file: File) {
  const small = await compressImage(file, {
    maxWidth: 1600,
    quality: 0.8,
    targetSizeMB: 0.5,
    mimeType: "image/webp",
  });
  const body = new FormData();
  body.append("photo", small);
  await fetch("/api/upload", { method: "POST", body });
}
```

### React hook

```tsx
"use client";
import { useImageCompressor } from "compressly/react";

export function AvatarInput({ onReady }: { onReady: (f: File) => void }) {
  const { compress, isCompressing, progress } = useImageCompressor({ maxWidth: 512, quality: 0.85 });
  return (
    <>
      <input
        type="file"
        accept="image/*"
        disabled={isCompressing}
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (f) onReady((await compress(f)).file);
        }}
      />
      {isCompressing && <progress value={progress} max={100} />}
    </>
  );
}
```

## API
- `compressImage(file, CompressOptions): Promise<File>`
- `compressImageWithDetails(file, CompressOptions): Promise<CompressResult>`
- `compressImages(files, BatchCompressOptions)`, `compressImagesWithDetails(...)` with `concurrency`, `onFileComplete`, `onBatchProgress`.
- CompressOptions: `maxSizeMB` (1), `targetSizeMB`, `maxWidth` (1920), `maxHeight` (1920), `quality` (0.82), `mimeType`, `useWorker` (true), `autoRotate` (true), `forceResize` (false), `onProgress(percent, phase)`.
- Helpers: `calculateDimensions`, `loadImageWithExif`, `isWorkerSupported`.
- `compressly/react`: `useImageCompressor(options)`.

Full docs: https://compress-ly.vercel.app/
