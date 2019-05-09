"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_1 = require("./is");
var convert_1 = require("./convert");
exports.mapFromChildren = function(fields) {
  var isRadioGroup = is_1.is.radioGroup(fields.props.children);
  if (isRadioGroup) {
    return [convert_1.convert.to.radioGroup(fields.props.children)];
  } else {
    return fields.props.children;
  }
};
