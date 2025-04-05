import presetsNodeTypescriptPrettier from "@cybozu/eslint-config/flat/presets/node-typescript-prettier.js";
import eslintPluginPackageJson from "eslint-plugin-package-json";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...presetsNodeTypescriptPrettier,
  {
    rules: {
      "n/no-unpublished-import": [
        "error",
        {
          allowModules: ["@tasshi-playground/eslint-config-internal"],
        },
      ],
    },
  },
  eslintPluginPackageJson.configs.recommended,
];
