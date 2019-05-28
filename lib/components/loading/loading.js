"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
exports.Loading = function(props) {
  var classes = classnames_1.default("loading-indicator", {
    "full-screen": props.fullScreen
  });
  return react_1.default.createElement(
    "div",
    { className: classes },
    react_1.default.createElement(
      "svg",
      {
        version: "1.1",
        x: "0px",
        y: "0px",
        width: "100px",
        height: "100px",
        viewBox: "0 0 50 50"
      },
      react_1.default.createElement(
        "path",
        {
          fill: "rgb(3, 169, 244)",
          d:
            "M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
        },
        react_1.default.createElement("animateTransform", {
          attributeType: "xml",
          attributeName: "transform",
          type: "rotate",
          from: "0 25 25",
          to: "360 25 25",
          dur: "0.6s",
          repeatCount: "indefinite"
        })
      )
    )
  );
};
