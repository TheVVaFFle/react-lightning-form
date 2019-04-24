"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
var loading_1 = require("../loading/loading");
var form_1 = require("../../utility/form");
exports.Section = function(props) {
  var errorCount = 0;
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
      "sub-section": props.title === undefined || props.title === null,
      loading: props.loading
    });
    return classes;
  };
  var handleOnSubmit = function() {
    if (props.onSubmit && !props.loading) {
      props.onSubmit("");
    }
  };
  var getSubmitButton = function() {
    if (props.onSubmit) {
      return react_1.default.createElement(
        "div",
        { className: "submit-button" },
        react_1.default.createElement(
          "button",
          {
            type: "button",
            className: "submit-button",
            onClick: handleOnSubmit
          },
          "Submit"
        ),
        form_1.FormUtility.get.errorMessage(errorCount)
      );
    }
    return null;
  };
  return react_1.default.createElement(
    "div",
    { className: getClasses() },
    getTitle(),
    react_1.default.createElement(
      "div",
      { className: "fields" },
      getChildren()
    ),
    getSubmitButton(),
    react_1.default.createElement(loading_1.Loading, null)
  );
};
