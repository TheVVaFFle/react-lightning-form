"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
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
var react_1 = __importDefault(require("react"));
var form_1 = require("../../../components/form/form");
var validation_1 = require("../../validation");
var GeneralUtility = __importStar(require("../.."));
exports.mapFromData = function(data) {
  var getValue = function(v) {
    if (typeof v === "string") {
      return v;
    } else {
      return v.value ? v.value.toString() : "";
    }
  };
  var getInputForDataProperty = function(key, v) {
    var id = GeneralUtility.camelCaseToKebab(key),
      label = v.label || GeneralUtility.camelCaseToNormal(key);
    if (v.type !== undefined) {
      if (v.type === form_1.FormComponentType.Checkbox) {
        return react_1.default.createElement("input", {
          id: id,
          key: key,
          type: "checkbox",
          className: "checkbox",
          label: label
        });
      } else if (v.type === form_1.FormComponentType.Dropdown) {
        var options = v.options.map(function(option) {
          return react_1.default.createElement(
            "option",
            { key: option, value: option },
            option
          );
        });
        options.unshift(
          react_1.default.createElement(
            "option",
            { key: -1, value: "" },
            "Select an option"
          )
        );
        return react_1.default.createElement(
          "select",
          {
            id: id,
            key: key,
            type: "dropdown",
            defaultValue: getValue(v),
            label: label,
            validate: v.validate ? v.validate.toString() : null,
            errormessage: v.errormessage || "Error, invalid selection."
          },
          options
        );
      } else if (v.type === form_1.FormComponentType.TextArea) {
        return react_1.default.createElement("textarea", {
          id: id,
          key: key,
          defaultValue: getValue(v),
          label: label,
          placeholder: "Enter " + label.toLowerCase(),
          validate: v.validate ? v.validate.toString() : null,
          errormessage: v.errormessage || "Error, invalid input."
        });
      } else if (v.type === form_1.FormComponentType.RadioGroup) {
        var options = v.options.map(function(option) {
          return react_1.default.createElement("input", {
            key: option,
            id: v.name + "-" + option.toLowerCase(),
            type: "radio",
            name: v.name,
            label: option,
            value: option
          });
        });
        return react_1.default.createElement(
          "div",
          {
            id: v.name,
            className: "radio-group",
            type: "radio-group",
            validate: v.validate ? v.validate.toString() : null
          },
          options
        );
      }
    }
    return react_1.default.createElement("input", {
      id: GeneralUtility.camelCaseToKebab(key),
      key: key,
      type: "text",
      className: "text-input",
      defaultValue: getValue(v),
      placeholder: "Enter " + label.toLowerCase(),
      label: label,
      validate: validation_1.ValidationType.Required
    });
  };
  return Object.entries(data).map(function(entry) {
    var key = entry[0],
      value = entry[1];
    return getInputForDataProperty(key, value);
  });
};
