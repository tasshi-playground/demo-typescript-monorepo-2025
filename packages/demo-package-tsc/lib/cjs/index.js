"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subFn = exports.fn = void 0;
const fn = () => true;
exports.fn = fn;
var sub_js_1 = require("./sub.js");
Object.defineProperty(exports, "subFn", { enumerable: true, get: function () { return sub_js_1.subFn; } });
exports.default = exports.fn;
