"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
exports.getRand = (min, max) => {
    return Math.floor(Math.random() * max) + min;
};
exports.camelCaseToNormal = (value) => value
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
exports.camelCaseToKebab = (value) => _.kebabCase(exports.camelCaseToNormal(value));
