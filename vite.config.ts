import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "./",
  build: {
    outDir: "docs",
    emptyOutDir: true
  },
  test: {
    include: ["src/**/*.test.ts"]
  }
});
