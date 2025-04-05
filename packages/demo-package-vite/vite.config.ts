import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

import dts from "vite-plugin-dts";
import fsExtra from "fs-extra";
import fs from "node:fs/promises";
import { glob } from "glob";

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
      // fileName: "[format]/[name]",
    },
    sourcemap: "inline",
    outDir: outDir,
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
      },
      external: [/node_modules/],
    },
  },
  plugins: [
    dts({
      tsconfigPath: "tsconfig.build.json",
      // modify type files after they have been written
      // ref. https://github.com/qmhc/vite-plugin-dts/issues/267#issuecomment-2142950802
      afterBuild: async () => {
        // Fetch all .d.ts files recursively from the dist/types/cjs directory
        const files = glob.sync(`${outDir}/**/*.d.{ts,ts.map}`, {
          nodir: true,
        });
        // Since TypeScript 5.0, it has emphasized that type files (*.d.ts) are also affected by its ESM and CJS context.
        // This means that you can't share a single type file for both ESM and CJS exports of your library.
        // You need to have two type files when dual-publishing your library.
        // see https://www.typescriptlang.org/docs/handbook/modules/reference.html#node16-nodenext and
        // https://publint.dev/rules#export_types_invalid_format
        await Promise.all(
          // Ideally, this plugin will support different types in the future
          // See https://github.com/qmhc/vite-plugin-dts/issues/267
          files.map(async (file) => {
            // Generate the new files with the new .c.ts/.c.ts.map naming
            const newFilePath = file.replace(/\.d\.ts(\.map)?$/, ".d.cts$1");
            await fs.copyFile(file, newFilePath);

            // Update sourceMappingURL references
            if (newFilePath.endsWith(".d.cts")) {
              const content = await fs.readFile(newFilePath, "utf-8");
              let updatedContent = content.replace(
                /\/\/# sourceMappingURL=.*\.d\.ts\.map/g,
                (match) => match.replace(".d.ts.map", ".d.cts.map"),
              );
              // Update .js references to .cjs
              updatedContent = updatedContent.replace(
                /(from\s+['"].*?)\.js(['"])/g,
                "$1.cjs$2",
              );
              await fs.writeFile(newFilePath, updatedContent, "utf-8");
            }

            // Update source map file references
            if (newFilePath.endsWith(".d.cts.map")) {
              const content = await fsExtra.readJson(newFilePath);
              content.file = content.file.replace(".d.ts", ".d.cts");
              await fsExtra.writeJson(newFilePath, content);
            }
          }),
        );
      },
    }),
  ],
});
