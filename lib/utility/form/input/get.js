"use strict";
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
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
var classnames_1 = __importDefault(require("classnames"));
var components_1 = require("../../../components");
var GeneralUtility = __importStar(require("../.."));
var validation_1 = require("../../validation");
exports.get = {
  onChange: function(
    child,
    formState,
    updateCount,
    setUpdateCount,
    setFormState
  ) {
    var onChange = function(e) {
      var getValue = function() {
        if (child.props.type === components_1.FormComponentType.Checkbox) {
          return e.target.checked;
        } else {
          return e.target.value;
        }
      };
      var updatedFormState = formState,
        key = "";
      if (child.props.type === components_1.FormComponentType.Radio) {
        key = GeneralUtility.kebabToCamelCase(child.props.name);
      } else {
        key = GeneralUtility.kebabToCamelCase(child.props.id);
      }
      updatedFormState[key] = __assign({}, formState[key], {
        value: getValue()
      });
      setUpdateCount(updateCount + 1);
      setFormState(updatedFormState);
    };
    return onChange;
  },
  classes: function(child, formState) {
    if (!child.props.id) return child.props.className;
    var key = GeneralUtility.kebabToCamelCase(child.props.id);
    var classes = classnames_1.default(
      child.props.className,
      {
        error:
          child.props.error === "true" ||
          (formState[key] && formState[key].error)
      },
      { "scroll-bar": child.type === components_1.FormComponentType.TextArea }
    );
    return classes;
  },
  styles: function(index, columns, alone) {
    columns = columns !== undefined && columns !== -1 ? columns : 1;
    var row = (index + 1) / columns,
      width =
        "calc(" +
        100 / columns +
        "% - " +
        ((columns - 1) * 20) / columns +
        "px)",
      marginLeft = index % columns === 0 ? "0px" : "20px",
      marginTop = row > 1 || alone ? "20px" : "0px";
    return { width: width, marginLeft: marginLeft, marginTop: marginTop };
  },
  label: function(child) {
    if (child.props.label) {
      return react_1.default.createElement(
        "h1",
        { className: "label" },
        child.props.label
      );
    } else if (
      child.props.type === components_1.FormComponentType.Radio &&
      child.props.value
    ) {
      return react_1.default.createElement(
        "h1",
        { className: "label" },
        child.props.value
      );
    } else if (child.props.type === components_1.FormComponentType.RadioGroup) {
      return react_1.default.createElement(
        "h1",
        { className: "label" },
        GeneralUtility.kebabToNormal(child.props.id)
      );
    }
    return null;
  },
  validationFn: function(validate) {
    if (typeof validate === "function") {
      return validate.toString();
    } else if (!Object.values(components_1.ValidationType).includes(validate)) {
      return validate;
    } else {
      return null;
    }
  },
  errorMessage: function(child, formState) {
    if (!child.props.id) return null;
    var key = GeneralUtility.kebabToCamelCase(child.props.id),
      error =
        child.props.error === "true" ||
        (formState[key] && formState[key].error),
      input = formState[key] ? formState[key].value : "",
      type = formState[key] ? formState[key].validate : "";
    var classes = classnames_1.default("error-message", { show: error });
    return react_1.default.createElement(
      "h1",
      { className: classes },
      validation_1.Validate.getErrorMessage(type, input, child)
    );
  }
};
