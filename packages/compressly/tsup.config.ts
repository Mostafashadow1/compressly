import { defineConfig, type Options } from "tsup";

const shared: Options = {
  format: ["esm", "cjs"],
  dts: true,
  minify: true,
  treeshake: true,
  splitting: false,
  sourcemap: true,
  target: "es2022",
  external: ["react"],
};

export default defineConfig([
  {
    ...shared,
    entry: { index: "src/index.ts" },
  },
  {
    // React entry is marked as a client module so it can be imported
    // from Next.js App Router files without a "use client" wrapper.
    // Rollup tree-shaking strips module directives, so it stays off here.
    ...shared,
    entry: { "react/index": "src/react/index.ts" },
    treeshake: false,
    banner: { js: '"use client";' },
  },
]);
