"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.browser.ts
var index_browser_exports = {};
__export(index_browser_exports, {
  default: () => index_browser_default,
  fn: () => fn,
  subFn: () => subFn
});
module.exports = __toCommonJS(index_browser_exports);

// src/sub.ts
var subFn = () => false;

// src/index.browser.ts
var fn = () => true;
var index_browser_default = fn;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fn,
  subFn
});
//# sourceMappingURL=index.browser.cjs.map