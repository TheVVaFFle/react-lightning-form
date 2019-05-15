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
var GeneralUtility = __importStar(require("../.."));
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
  var onSelect = function(id) {
    var updatedFormState = formState,
      key = GeneralUtility.kebabToCamelCase(child.props.id);
    var updateValue = function(value) {
      return value.map(function(entry) {
        if (entry.id.toString() === id.toString()) {
          entry.selected = !entry.selected;
        }
        return entry;
      });
    };
    updatedFormState[key] = __assign({}, updatedFormState[key], {
      value: updateValue(updatedFormState[key].value)
    });
    setUpdateCount(updateCount + 1);
    setFormState(updatedFormState);
  };
  return react_1.default.cloneElement(
    child,
    __assign({}, child.props, { onSelect: onSelect })
  );
};
