"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
exports.Section = function(props) {
  var getTitle = function() {
    if (props.title !== undefined && props.title !== null) {
      return react_1.default.createElement(
        "div",
        { className: "title" },
        react_1.default.createElement("h1", null, props.title)
      );
    }
    return null;
  };
  var getChildren = function() {
    return props.children || null;
  };
  var getClasses = function() {
    var classes = classnames_1.default("section", {
      outline: props.outline || false,
      loading: props.loading
    });
    return classes;
  };
  return react_1.default.createElement(
    "div",
    { className: getClasses(), style: props.styles },
    getTitle(),
    react_1.default.createElement("div", { className: "fields" }, getChildren())
  );
};
