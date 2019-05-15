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
var form_1 = require("../../components/form/form");
var _1 = require(".");
var GeneralUtility = __importStar(require(".."));
exports.state = {
  create: function(formState, children) {
    var updatedFormState = formState;
    if (_1.FormUtility.validate.children(children)) {
      react_1.default.Children.forEach(children, function(child) {
        var type = _1.FormUtility.get.childType(child);
        if (
          type === form_1.FormComponentType.Input ||
          type === form_1.FormComponentType.TextArea
        ) {
          if (child.props.id !== undefined && child.props.id !== null) {
            var key = "";
            if (child.props.type === form_1.FormComponentType.Radio) {
              key = GeneralUtility.kebabToCamelCase(child.props.name);
            } else {
              key = GeneralUtility.kebabToCamelCase(child.props.id);
            }
            updatedFormState[key] = {
              value: child.props.defaultValue || "",
              validate: child.props.validate || null,
              error: false
            };
          } else {
            throw Error("All form fields must have an id.");
          }
        } else if (type === form_1.FormComponentType.Table) {
          var formatData = function(data) {
            if (!data) return [];
            if (child.props.selectable) {
              return data.map(function(entry) {
                return __assign({}, entry, { selected: false });
              });
            }
            return data;
          };
          var id = child.props.id,
            key = GeneralUtility.kebabToCamelCase(id),
            data = formatData(child.props.data);
          updatedFormState[key] = {
            value: data,
            validate: child.props.validate || null,
            error: false
          };
        } else if (type === form_1.FormComponentType.Section) {
          if (child.props.children) {
            var section = child.type(child.props),
              fields = section.props.children.find(function(c) {
                return c && c.props.className === "fields";
              });
            exports.state.create(formState, fields.props.children);
          } else {
            exports.state.create(formState, child.props.data);
          }
        } else {
          return child;
        }
      });
    } else {
      var getValue_1 = function(v) {
        if (typeof v === "string") {
          return {
            value: v,
            validate: null,
            error: false
          };
        } else {
          return {
            value: v.value,
            validate: v.validate,
            error: false
          };
        }
      };
      Object.entries(children).map(function(entry) {
        var key = entry[0],
          value = entry[1];
        updatedFormState[key] = getValue_1(value);
      });
    }
    return updatedFormState;
  },
  format: function(formState) {
    var formattedFormState = __assign({}, formState);
    Object.entries(formState).map(function(entry) {
      var key = entry[0],
        prop = entry[1];
      formattedFormState[key] = prop.value;
    });
    return formattedFormState;
  }
};
