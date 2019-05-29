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
var react_dom_1 = __importDefault(require("react-dom"));
var classnames_1 = __importDefault(require("classnames"));
exports.Loading = function(props) {
  var _a = react_1.useState(false),
    loading = _a[0],
    setLoading = _a[1],
    _b = react_1.useState(false),
    showing = _b[0],
    setShowing = _b[1];
  var fullScreen = props.fullScreen === undefined ? true : props.fullScreen;
  react_1.useEffect(
    function() {
      if (props.loading === true) {
        setLoading(true);
        setTimeout(function() {
          setShowing(true);
        }, 100);
      } else if (props.loading === false) {
        setShowing(false);
        setTimeout(function() {
          setLoading(false);
        }, 500);
      }
    },
    [props.loading]
  );
  var classes = classnames_1.default("rlf-loading-indicator", {
    "full-screen": fullScreen,
    showing: showing
  });
  var getIndicator = function() {
    if (loading) {
      return react_1.default.createElement(
        "div",
        { className: classes },
        react_1.default.createElement(
          "div",
          { className: "rlf-loading-spinner" },
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
        )
      );
    }
    return null;
  };
  if (props.fullScreen) {
    return react_dom_1.default.createPortal(getIndicator(), document.body);
  } else {
    return getIndicator();
  }
};
