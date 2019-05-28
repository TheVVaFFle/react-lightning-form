"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var form_1 = require("./form");
exports.FormUtility = form_1.FormUtility;
var string_1 = require("./string");
exports.StringUtility = string_1.StringUtility;
var validation_1 = require("./validation");
exports.ValidationUtility = validation_1.ValidationUtility;
exports.getRand = function(min, max) {
  return Math.floor(Math.random() * max) + min;
};
