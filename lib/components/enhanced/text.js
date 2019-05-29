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
var _ = __importStar(require("lodash"));
var classnames_1 = __importDefault(require("classnames"));
var utility_1 = require("../../utility");
exports.Text = function(props) {
  var label =
    props.label || utility_1.StringUtility.camelCaseToNormal(props.name);
  var classes = classnames_1.default("rlf-text rlf-input", {
    error: props.error
  });
  var updateData = function(value) {
    _.set(props.rawData, props.flatKey, value);
    props.updateData(props.rawData);
  };
  var getError = function() {
    if (props.error && props.errorMessage) {
      return react_1.default.createElement(
        "h1",
        { className: "error-message" },
        props.errorMessage
      );
    }
    return null;
  };
  return react_1.default.createElement(
    "div",
    { className: classes },
    react_1.default.createElement("h1", { className: "label" }, label),
    react_1.default.createElement("input", {
      id: props.flatKey,
      type: "text",
      placeholder: "Enter " + label,
      defaultValue: props.value.toString(),
      onChange: function(e) {
        return updateData(e.target.value);
      }
    }),
    getError()
  );
};
