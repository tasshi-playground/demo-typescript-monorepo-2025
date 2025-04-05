import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/index.browser.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
});
