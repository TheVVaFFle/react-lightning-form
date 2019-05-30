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
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var _ = __importStar(require("lodash"));
var classnames_1 = __importDefault(require("classnames"));
var utility_1 = require("../../utility");
exports.Select = function(props) {
  var _a = react_1.useState(""),
    value = _a[0],
    setValue = _a[1];
  react_1.useEffect(
    function() {
      setValue(props.value || "");
    },
    [props.value]
  );
  var getOptions = function() {
    if (props.options && Array.isArray(props.options)) {
      return props.options.map(function(value) {
        return react_1.default.createElement(
          "option",
          { key: value, value: value },
          value
        );
      });
    }
    return [];
  };
  var label =
    props.label || utility_1.StringUtility.camelCaseToNormal(props.name);
  var classes = classnames_1.default("rlf-select rlf-input", {
    error: props.error
  });
  var updateData = function(value) {
    _.set(props.rawData, props.flatKey, value);
    props.updateData(props.rawData);
    if (props.onChange) {
      props.onChange(value);
    }
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
    react_1.default.createElement(
      "select",
      {
        id: props.flatKey,
        value: value,
        onChange: function(e) {
          return updateData(e.target.value);
        }
      },
      react_1.default.createElement("option", { value: "" }, "Select ", label),
      getOptions()
    ),
    getError()
  );
};
