"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
exports.Checkbox = function(props) {
  return react_1.default.createElement(
    "div",
    { className: "input checkbox" },
    react_1.default.createElement("input", {
      type: "checkbox",
      onChange: props.handleOnChange
    }),
    react_1.default.createElement(
      "div",
      { className: "checkbox-toggle-track" },
      react_1.default.createElement("div", { className: "checkbox-toggle" })
    )
  );
};
