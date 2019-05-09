"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
exports.get = {
  title: function(title) {
    if (title !== undefined) {
      return react_1.default.createElement(
        "div",
        { className: "title" },
        react_1.default.createElement("h1", null, title)
      );
    }
    return null;
  },
  classes: function(loading) {
    return classnames_1.default("form", { loading: loading });
  },
  childType: function(child) {
    return typeof child.type === "string"
      ? child.type
      : child.type(child.props).props.className.split(" ")[0];
  },
  errorMessage: function(errorCount) {
    var classes = classnames_1.default("error-message", {
      show: errorCount > 0
    });
    var errorVerb = errorCount > 1 ? "are" : "is",
      errorText = errorCount > 1 ? "errors" : "error";
    return react_1.default.createElement(
      "h1",
      { className: classes },
      "There ",
      errorVerb,
      " currently ",
      errorCount,
      " ",
      errorText,
      ". Please correct before submitting."
    );
  },
  number: {
    of: {
      columns: function(sm, md, lg) {
        sm = sm || 1;
        md = md || sm;
        lg = lg || md;
        if (window.innerWidth >= 1400) {
          return lg;
        } else if (window.innerWidth >= 800) {
          return md;
        } else {
          return sm;
        }
      }
    }
  }
};
