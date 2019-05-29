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
var button_1 = require("../enhanced/button");
exports.RLFSection = function(props) {
  var getTitle = function() {
    if (props.title) {
      return react_1.default.createElement(
        "div",
        { className: "title" },
        react_1.default.createElement("h1", null, props.title)
      );
    }
    return null;
  };
  var getSubmitButton = function() {
    if (props.sectionKey && props.submit && props.submit[props.sectionKey]) {
      var handleOnSubmit = function() {
        var onSubmit = props.onSubmit ? props.onSubmit : function(e) {};
        if (!props.loading) {
          onSubmit(props.sectionKey);
        }
      };
      var label = props.title ? "Submit " + props.title : "Submit";
      return react_1.default.createElement(button_1.Button, {
        className: "submit",
        label: label,
        handleOnClick: handleOnSubmit
      });
    }
    return null;
  };
  var classes = classnames_1.default(
    "rlf-section",
    { "no-title": !props.title },
    { loading: props.loading }
  );
  return react_1.default.createElement(
    "div",
    { id: props.id, className: classes },
    getTitle(),
    react_1.default.createElement(
      "div",
      { className: "children" },
      props.children
    ),
    getSubmitButton(),
    react_1.default.createElement(loading_1.Loading, {
      loading: props.loading,
      fullScreen: false
    })
  );
};
