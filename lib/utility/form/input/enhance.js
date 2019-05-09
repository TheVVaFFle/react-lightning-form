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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var get_1 = require("./get");
var components_1 = require("../../../components");
exports.enhance = function(
  child,
  formState,
  columns,
  index,
  updateCount,
  setUpdateCount,
  setFormState,
  handleOnSubmit,
  alone
) {
  var className = get_1.get.classes(child, formState),
    onChange = get_1.get.onChange(
      child,
      formState,
      updateCount,
      setUpdateCount,
      setFormState
    ),
    style = get_1.get.styles(index, columns, alone),
    label = get_1.get.label(child),
    validate = get_1.get.validationFn(child.props.validate),
    errorMessage = get_1.get.errorMessage(child, formState);
  var onKeyUp = null;
  if (
    child.type !== components_1.FormComponentType.TextArea &&
    child.props.type !== components_1.FormComponentType.TextArea
  ) {
    onKeyUp = function(e) {
      if (e.key === "Enter") handleOnSubmit();
    };
  }
  if (child.props.type === components_1.FormComponentType.Checkbox) {
    return react_1.default.createElement(
      "div",
      { className: "input checkbox", style: style },
      label,
      react_1.default.cloneElement(
        child,
        __assign({}, child.props, {
          className: className,
          validate: validate,
          onChange: onChange,
          onKeyUp: onKeyUp
        })
      ),
      react_1.default.createElement(
        "div",
        { className: "checkbox-toggle-track" },
        react_1.default.createElement("div", { className: "checkbox-toggle" })
      ),
      errorMessage
    );
  } else if (child.props.type === components_1.FormComponentType.Radio) {
    return react_1.default.createElement(
      "div",
      {
        key: child.props.id,
        id: child.props.id,
        className: "input radio",
        style: style
      },
      react_1.default.createElement(
        "div",
        { className: "radio-button-wrapper" },
        react_1.default.cloneElement(
          child,
          __assign({}, child.props, {
            className: className,
            validate: validate,
            onChange: onChange,
            onKeyUp: onKeyUp
          })
        ),
        react_1.default.createElement(
          "div",
          { className: "border" },
          react_1.default.createElement("div", { className: "center" })
        ),
        react_1.default.createElement("div", { className: "ring" })
      ),
      label
    );
  } else if (child.props.type === components_1.FormComponentType.RadioGroup) {
    var radios = child.props.children.map(function(c, i) {
      return exports.enhance(
        c,
        formState,
        columns,
        i,
        updateCount,
        setUpdateCount,
        setFormState,
        handleOnSubmit
      );
    });
    return react_1.default.createElement(
      "div",
      { id: child.props.id, className: className, type: "radio-group" },
      label,
      react_1.default.createElement("div", { className: "radios" }, radios),
      errorMessage
    );
  } else if (child.props.type === components_1.FormComponentType.Dropdown) {
    return react_1.default.createElement(
      "div",
      { className: "input dropdown", style: style },
      label,
      react_1.default.createElement(
        "div",
        { className: "select-wrapper" },
        react_1.default.cloneElement(
          child,
          __assign({}, child.props, {
            className: className,
            validate: validate,
            onChange: onChange,
            onKeyUp: onKeyUp
          })
        ),
        react_1.default.createElement("div", { className: "border" })
      ),
      errorMessage
    );
  } else if (child.props.type === components_1.FormComponentType.Text) {
    return react_1.default.createElement(
      "div",
      { className: "input text", style: style },
      label,
      react_1.default.cloneElement(
        child,
        __assign({}, child.props, {
          className: className,
          validate: validate,
          onChange: onChange,
          onKeyUp: onKeyUp
        })
      ),
      errorMessage
    );
  } else if (
    child.type === components_1.FormComponentType.TextArea ||
    child.props.type === components_1.FormComponentType.TextArea
  ) {
    return react_1.default.createElement(
      "div",
      { className: "input textarea", style: style },
      label,
      react_1.default.cloneElement(
        child,
        __assign({}, child.props, {
          className: className,
          validate: validate,
          onChange: onChange,
          onKeyUp: onKeyUp
        })
      ),
      errorMessage
    );
  } else {
    return child;
  }
};
