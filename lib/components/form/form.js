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
var react_2 = require("react");
var lodash_1 = require("lodash");
var loading_1 = require("../loading/loading");
var form_1 = require("../../utility/form");
var FormComponentType;
(function(FormComponentType) {
  FormComponentType["Input"] = "input";
  FormComponentType["TextArea"] = "textarea";
  FormComponentType["Section"] = "section";
  FormComponentType["Text"] = "text";
  FormComponentType["Checkbox"] = "checkbox";
  FormComponentType["Dropdown"] = "dropdown";
})(
  (FormComponentType =
    exports.FormComponentType || (exports.FormComponentType = {}))
);
exports.Form = function(props) {
  var defaultFormState = {},
    _a = react_2.useState(defaultFormState),
    formState = _a[0],
    setFormState = _a[1],
    _b = react_2.useState(0),
    updateCount = _b[0],
    setUpdateCount = _b[1],
    _c = react_2.useState(0),
    errorCount = _c[0],
    setErrorCount = _c[1],
    _d = react_2.useState(0),
    windowWidth = _d[0],
    setWindowWidth = _d[1];
  react_2.useEffect(function() {
    setFormState(form_1.FormUtility.state.create(formState, props.children));
  }, []);
  react_2.useEffect(
    function() {
      var handleResize = function() {
          return setWindowWidth(window.innerWidth);
        },
        forms = document.getElementsByClassName("form");
      if (forms[0].id === props.id) {
        window.addEventListener("resize", lodash_1.throttle(handleResize, 100));
      }
    },
    [windowWidth]
  );
  var handleFormChildren = function(children) {
    var altIndex = 0;
    return react_1.default.Children.map(children, function(child) {
      var type = form_1.FormUtility.get.childType(child);
      if (type === FormComponentType.Section) {
        altIndex = 0;
        var section = child.type(child.props),
          fields = section.props.children.find(function(c) {
            return c && c.props.className === "fields";
          }),
          columns_1 = form_1.FormUtility.get.number.of.columns(
            child.props.sm || props.sm,
            child.props.md || props.md,
            child.props.lg || props.lg
          );
        var mappedChildren = [];
        if (child.props.data) {
          mappedChildren = form_1.FormUtility.input.mapAllFromData(
            child.props.data
          );
        } else {
          mappedChildren = fields.props.children;
        }
        mappedChildren = react_1.default.Children.map(mappedChildren, function(
          mappedChild,
          index
        ) {
          var type = form_1.FormUtility.get.childType(mappedChild);
          if (type === FormComponentType.Section) {
            return handleFormChildren([mappedChild]);
          } else {
            return form_1.FormUtility.input.enhance(
              mappedChild,
              formState,
              columns_1,
              index,
              updateCount,
              setUpdateCount,
              setFormState,
              handleOnSubmit
            );
          }
        });
        return react_1.default.cloneElement(
          child,
          __assign({}, child.props, {
            children: mappedChildren,
            formState: formState,
            errorCount: errorCount,
            setFormState: setFormState,
            setErrorCount: setErrorCount
          })
        );
      } else {
        return form_1.FormUtility.input.enhance(
          child,
          formState,
          props.lg,
          altIndex++,
          updateCount,
          setUpdateCount,
          setFormState,
          handleOnSubmit,
          true
        );
      }
    });
  };
  var handleOnSubmit = function() {
    if (
      !props.loading &&
      form_1.FormUtility.validate.submission(
        formState,
        setFormState,
        setErrorCount
      )
    ) {
      props.onSubmit(form_1.FormUtility.state.format(formState));
    }
  };
  return react_1.default.createElement(
    "div",
    {
      id: props.id || undefined,
      className: form_1.FormUtility.get.classes(props.loading)
    },
    form_1.FormUtility.get.title(props.title),
    react_1.default.createElement(
      "div",
      { className: "form-contents" },
      handleFormChildren(props.children),
      react_1.default.createElement(
        "div",
        { className: "submit-button-wrapper" },
        react_1.default.createElement(
          "button",
          {
            type: "button",
            className: "submit-button",
            onClick: handleOnSubmit
          },
          props.submitLabel || "Submit"
        ),
        form_1.FormUtility.get.errorMessage(errorCount)
      )
    ),
    react_1.default.createElement(loading_1.Loading, null)
  );
};
