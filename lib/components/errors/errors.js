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
var react_2 = require("react");
var react_dom_1 = __importDefault(require("react-dom"));
var classnames_1 = __importDefault(require("classnames"));
var _ = __importStar(require("lodash"));
var utility_1 = require("../../utility");
exports.Errors = function(props) {
  var _a = react_2.useState(true),
    trackToggled = _a[0],
    toggleTrack = _a[1];
  var errors = utility_1.FormUtility.get.errors(props.tree);
  errors = utility_1.FormUtility.get.error.positions(errors);
  var getErrorTrack = function() {
    if (errors.length > 0) {
      var items = Object.entries(_.groupBy(errors, "position"))
        .map(function(entry) {
          return { position: entry[0], errors: entry[1] };
        })
        .map(function(item) {
          var handleOnClick = null,
            style = {},
            label = "",
            elements = new Array();
          item.errors.forEach(function(error) {
            var element = document.getElementById(error.flatKey);
            style.top = error.position + "%";
            elements.push({
              node: element,
              position: error.position,
              top: error.top
            });
            label =
              item.errors.length === 1
                ? utility_1.StringUtility.camelCaseToNormal(error.key)
                : "Multiple Errors";
          });
          handleOnClick = function() {
            if (elements.length > 0) {
              window.scrollTo(0, elements[0].top - 30);
              elements[0].node.focus();
              elements.forEach(function(element) {
                if (!element.node.classList.contains("flash-error")) {
                  element.node.classList.add("flash-error");
                  setTimeout(function() {
                    element.node.classList.remove("flash-error");
                  }, 3100);
                }
              });
            }
          };
          return react_1.default.createElement(
            "div",
            {
              key: Math.random(),
              className: "error",
              style: style,
              onClick: handleOnClick
            },
            react_1.default.createElement("h1", null, label)
          );
        });
      return react_1.default.createElement(
        "div",
        {
          className: classnames_1.default("error-track", {
            toggled: trackToggled
          })
        },
        items,
        react_1.default.createElement("div", {
          className: "track-toggle",
          onClick: function() {
            return toggleTrack(!trackToggled);
          }
        })
      );
    }
    return null;
  };
  var mapErrors = function() {
    if (errors.length > 0) {
      var errorVerb = "is",
        errorText = "error",
        errorPronoun = "it";
      if (errors.length > 1) {
        errorVerb = "are";
        errorText = "errors";
        errorPronoun = "them";
      }
      return react_1.default.createElement(
        "div",
        { className: "error-box" },
        react_1.default.createElement(
          "div",
          { className: "label" },
          react_1.default.createElement(
            "h1",
            null,
            "There ",
            errorVerb,
            " currently",
            " ",
            react_1.default.createElement(
              "span",
              {
                className: "underline",
                onClick: function() {
                  return toggleTrack(!trackToggled);
                }
              },
              errors.length,
              " ",
              errorText
            ),
            " ",
            "on the form. Please correct ",
            errorPronoun,
            " and try again."
          )
        ),
        react_dom_1.default.createPortal(getErrorTrack(), document.body)
      );
    }
    return null;
  };
  return react_dom_1.default.createPortal(mapErrors(), document.body);
};
