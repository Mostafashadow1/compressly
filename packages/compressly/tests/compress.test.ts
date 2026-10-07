import { describe, expect, it } from "vitest";
import { calculateDimensions } from "../src/core/dimensions";
import { compressImage } from "../src/core/compress";
import { isWorkerSupported } from "../src/core/worker";

describe("calculateDimensions", () => {
  it("keeps original dimensions when image is smaller than bounds", () => {
    const { width, height } = calculateDimensions(800, 600, 1920, 1080);
    expect(width).toBe(800);
    expect(height).toBe(600);
  });

  it("scales down proportionally when width exceeds maxWidth", () => {
    const { width, height } = calculateDimensions(3840, 2160, 1920, 1920);
    expect(width).toBe(1920);
    expect(height).toBe(1080);
  });

  it("scales down proportionally when height exceeds maxHeight", () => {
    const { width, height } = calculateDimensions(1000, 4000, 1920, 2000);
    expect(width).toBe(500);
    expect(height).toBe(2000);
  });
});

describe("compressImage guards", () => {
  it("bypasses non-image files safely", async () => {
    const textBlob = new Blob(["hello world"], { type: "text/plain" });
    const textFile = new File([textBlob], "test.txt", { type: "text/plain" });

    const result = await compressImage(textFile);
    expect(result).toBe(textFile);
  });

  it("bypasses SVG files without modifying them", async () => {
    const svgBlob = new Blob(['<svg><circle r="10"/></svg>'], { type: "image/svg+xml" });
    const svgFile = new File([svgBlob], "icon.svg", { type: "image/svg+xml" });

    const result = await compressImage(svgFile);
    expect(result).toBe(svgFile);
  });

  it("bypasses GIF files without modifying them", async () => {
    const gifBlob = new Blob(["gifcontent"], { type: "image/gif" });
    const gifFile = new File([gifBlob], "animation.gif", { type: "image/gif" });

    const result = await compressImage(gifFile);
    expect(result).toBe(gifFile);
  });
});

describe("isWorkerSupported", () => {
  it("returns boolean environment state without throwing", () => {
    expect(typeof isWorkerSupported()).toBe("boolean");
  });
});
