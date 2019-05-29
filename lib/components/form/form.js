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
var react_2 = require("react");
var _ = __importStar(require("lodash"));
var classnames_1 = __importDefault(require("classnames"));
var button_1 = require("../enhanced/button");
var loading_1 = require("../loading/loading");
var errors_1 = require("../errors/errors");
var utility_1 = require("../../utility");
var RLFComponentType;
(function(RLFComponentType) {
  RLFComponentType["Button"] = "button";
  RLFComponentType["Checkbox"] = "checkbox";
  RLFComponentType["Textarea"] = "textarea";
  RLFComponentType["Dropdown"] = "dropdown";
  RLFComponentType["Text"] = "text";
})(
  (RLFComponentType =
    exports.RLFComponentType || (exports.RLFComponentType = {}))
);
var RLFValidationType;
(function(RLFValidationType) {
  RLFValidationType["Required"] = "required";
})(
  (RLFValidationType =
    exports.RLFValidationType || (exports.RLFValidationType = {}))
);
var RLFValidateOn;
(function(RLFValidateOn) {
  RLFValidateOn["Form"] = "form";
})((RLFValidateOn = exports.RLFValidateOn || (exports.RLFValidateOn = {})));
exports.RLF = function(props) {
  var _a = react_2.useState(null),
    originalData = _a[0],
    setOriginalData = _a[1],
    _b = react_2.useState(new Array()),
    mappedData = _b[0],
    setMappedData = _b[1],
    _c = react_2.useState(0),
    editCount = _c[0],
    setEditCount = _c[1],
    _d = react_2.useState(0),
    submitCount = _d[0],
    setSubmitCount = _d[1],
    _e = react_2.useState(0),
    errorCount = _e[0],
    setErrorCount = _e[1],
    _f = react_2.useState({}),
    errors = _f[0],
    setErrors = _f[1],
    _g = react_2.useState(false),
    submitting = _g[0],
    setSubmitting = _g[1],
    _h = react_2.useState(""),
    validateOn = _h[0],
    setValidateOn = _h[1];
  react_2.useEffect(
    function() {
      if (props.data) {
        setOriginalData(props.data);
        setMappedData(utility_1.RLFUtility.map.raw.data(props.data) || []);
      } else if (props.children) {
        var section_1 = utility_1.RLFUtility.map.section.data(props.children),
          merged = _.merge(
            __assign({}, section_1.data),
            __assign({}, originalData)
          );
        setOriginalData(merged);
        setMappedData(utility_1.RLFUtility.map.raw.data(merged) || []);
      }
    },
    [props.data, props.children, props.options, errors]
  );
  react_2.useEffect(
    function() {
      if (errorCount > 0 || validateOn !== "") {
        validate();
      }
      if (validateOn !== "") {
        var data =
          validateOn === RLFValidateOn.Form
            ? originalData
            : _.get(originalData, validateOn);
        if (validate() && props.submit[validateOn] && submitting) {
          props.submit[validateOn](data);
          setValidateOn("");
        }
      }
    },
    [editCount, validateOn]
  );
  react_2.useEffect(
    function() {
      if (errorCount === 0) setValidateOn("");
    },
    [errorCount]
  );
  react_2.useEffect(
    function() {
      if (submitting === true) setSubmitting(false);
    },
    [submitting]
  );
  var validate = function() {
    var updateErrors = function(errors) {
      var flatErrors = utility_1.RLFUtility.get.errors(errors);
      setErrorCount(flatErrors.length);
      setErrors(errors);
    };
    var validation = {},
      errors = {};
    if (validateOn === RLFValidateOn.Form) {
      validation = props.validation;
    } else {
      _.set(validation, validateOn, _.get(props.validation, validateOn));
      errors = {};
    }
    return utility_1.RLFUtility.validate.data(
      originalData,
      mappedData,
      validation,
      errors,
      updateErrors
    );
  };
  var updateData = function(data) {
    setOriginalData(data);
    setEditCount(editCount + 1);
  };
  var handleOnSubmit = function(key) {
    if (!props.loading) {
      setSubmitCount(submitCount + 1);
      setValidateOn(key);
      setSubmitting(true);
    }
  };
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
    if (props.submit && props.submit.form) {
      return react_1.default.createElement(button_1.Button, {
        className: "submit",
        label: "Submit Form",
        handleOnClick: function() {
          return handleOnSubmit(RLFValidateOn.Form);
        }
      });
    }
    return null;
  };
  var classes = classnames_1.default("rlf-form", props.className, {
    "rlf-loading": props.loading
  });
  var section = utility_1.RLFUtility.map.section.data(props.children);
  var components = utility_1.RLFUtility.map.data.to.components(
    originalData,
    mappedData,
    props.labels,
    props.options,
    props.types,
    props.validation,
    props.submit,
    section.id,
    section.className,
    section.loading,
    errors,
    props.messages,
    updateData,
    handleOnSubmit
  );
  return react_1.default.createElement(
    "div",
    { id: props.id || undefined, className: classes },
    getTitle(),
    components,
    getSubmitButton(),
    react_1.default.createElement(loading_1.Loading, {
      loading: props.loading
    }),
    react_1.default.createElement(errors_1.Errors, {
      tree: errors,
      labels: props.labels
    })
  );
};
