"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
exports.Button = function(props) {
  var label = props.label || "Submit",
    classes = classnames_1.default(props.className, "rlf-button");
  return react_1.default.createElement(
    "div",
    { className: classes },
    react_1.default.createElement(
      "button",
      { onClick: props.handleOnClick },
      label
    )
  );
};
