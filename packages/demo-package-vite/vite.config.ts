import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

import dts from "vite-plugin-dts";
import { viteStaticCopy } from "vite-plugin-static-copy";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const outDir = "./lib";

export default defineConfig({
  build: {
    lib: {
      entry: [
        path.resolve(__dirname, "src/index.ts"),
        path.resolve(__dirname, "src/index.browser.ts"),
      ],
      formats: ["es", "cjs"],
      fileName: "[format]/[name]",
    },
    minify: false,
    sourcemap: false,
    outDir: outDir,
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[format]/[name].js",
      },
      external: [/node_modules/],
    },
  },
  plugins: [
    dts({
      outDir: [`${outDir}/es`, `${outDir}/cjs`],
      exclude: ["**/__tests__/*", "**/*.test.ts"],
    }),
    viteStaticCopy({
      targets: [
        {
          src: "src/package-json-templates/package.esm.json",
          dest: "es",
          rename: "package.json",
        },
        {
          src: "src/package-json-templates/package.cjs.json",
          dest: "cjs",
          rename: "package.json",
        },
      ],
    }),
  ],
});
