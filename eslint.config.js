import defaultConfig from "@tasshi-playground/eslint-config";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...defaultConfig,
  {
    ignores: ["packages", "internals"],
  },
];
