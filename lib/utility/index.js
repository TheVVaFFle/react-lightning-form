"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __importStar(require("lodash"));
exports.getRand = function (min, max) {
    return Math.floor(Math.random() * max) + min;
};
exports.camelCaseToNormal = function (value) { return value
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, function (str) { return str.toUpperCase(); }); };
exports.camelCaseToKebab = function (value) { return _.kebabCase(exports.camelCaseToNormal(value)); };
