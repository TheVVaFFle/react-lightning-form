"use strict";
var __importStar =
  (this && this.__importStar) ||
  function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
  };
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __importStar(require("lodash"));
exports.StringUtility = {
  camelCaseToNormal: function(value) {
    return value.replace(/([A-Z])/g, " $1").replace(/^./, function(str) {
      return str.toUpperCase();
    });
  },
  camelCaseToKebab: function(value) {
    return _.kebabCase(exports.StringUtility.camelCaseToNormal(value));
  },
  kebabToCamelCase: function(value) {
    return _.camelCase(value.replace(/-/g, " "));
  },
  kebabToNormal: function(value) {
    return exports.StringUtility.camelCaseToNormal(
      exports.StringUtility.kebabToCamelCase(value)
    );
  }
};
