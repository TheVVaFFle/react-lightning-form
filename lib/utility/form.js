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
var form_1 = require("../components/form/form");
var validation_1 = require("./validation");
var GeneralUtility = __importStar(require("./"));
exports.FormUtility = {
  state: {
    create: function(formState, children) {
      var updatedFormState = formState;
      if (exports.FormUtility.validate.children(children)) {
        react_1.default.Children.forEach(children, function(child) {
          var type = exports.FormUtility.get.childType(child);
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
          } else if (type === form_1.FormComponentType.Section) {
            if (child.props.children) {
              var section = child.type(child.props),
                fields = section.props.children.find(function(c) {
                  return c && c.props.className === "fields";
                });
              exports.FormUtility.state.create(
                formState,
                fields.props.children
              );
            } else {
              exports.FormUtility.state.create(formState, child.props.data);
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
  },
  validate: {
    section: {
      submission: function(
        formState,
        sectionState,
        setFormState,
        setErrorCount
      ) {
        var nErrors = 0,
          updatedFormState = formState;
        Object.entries(sectionState).map(function(entry) {
          var key = entry[0],
            prop = entry[1];
          var validationFn = null;
          if (prop.validate !== undefined) {
            if (
              !Object.values(validation_1.ValidationType).includes(
                prop.validate
              )
            ) {
              validationFn = eval(prop.validate);
            } else {
              validationFn = validation_1.Validate[prop.validate];
            }
          }
          if (
            validation_1.Validate.determineIfError(prop.value, validationFn)
          ) {
            updatedFormState[key].error = true;
            nErrors++;
          } else {
            updatedFormState[key].error = false;
          }
        });
        setFormState(updatedFormState);
        setErrorCount(nErrors);
        return nErrors === 0;
      }
    },
    submission: function(formState, setFormState, setErrorCount) {
      var nErrors = 0,
        updatedFormState = formState;
      Object.entries(formState).map(function(entry) {
        var key = entry[0],
          prop = entry[1];
        var validationFn = null;
        if (prop.validate !== undefined) {
          if (
            !Object.values(validation_1.ValidationType).includes(prop.validate)
          ) {
            validationFn = eval(prop.validate);
          } else {
            validationFn = validation_1.Validate[prop.validate];
          }
        }
        if (validation_1.Validate.determineIfError(prop.value, validationFn)) {
          updatedFormState[key].error = true;
          nErrors++;
        } else {
          updatedFormState[key].error = false;
        }
      });
      setFormState(updatedFormState);
      setErrorCount(nErrors);
      return nErrors === 0;
    },
    children: function(children) {
      if (Array.isArray(children)) {
        var invalidCount_1 = 0;
        children.forEach(function(child) {
          if (!react_1.default.isValidElement(child)) {
            invalidCount_1++;
          }
        });
        return invalidCount_1 === 0;
      } else {
        return react_1.default.isValidElement(children);
      }
    }
  },
  get: {
    title: function(title) {
      if (title !== undefined) {
        return react_1.default.createElement(
          "div",
          { className: "title" },
          react_1.default.createElement("h1", null, title)
        );
      }
      return null;
    },
    classes: function(loading) {
      return classnames_1.default("form", { loading: loading });
    },
    childType: function(child) {
      return typeof child.type === "string"
        ? child.type
        : child.type(child.props).props.className.split(" ")[0];
    },
    errorMessage: function(errorCount) {
      var classes = classnames_1.default("error-message", {
        show: errorCount > 0
      });
      var errorVerb = errorCount > 1 ? "are" : "is",
        errorText = errorCount > 1 ? "errors" : "error";
      return react_1.default.createElement(
        "h1",
        { className: classes },
        "There ",
        errorVerb,
        " currently ",
        errorCount,
        " ",
        errorText,
        ". Please correct before submitting."
      );
    },
    number: {
      of: {
        columns: function(sm, md, lg) {
          sm = sm || 1;
          md = md || sm;
          lg = lg || md;
          if (window.innerWidth >= 1400) {
            return lg;
          } else if (window.innerWidth >= 800) {
            return md;
          } else {
            return sm;
          }
        }
      }
    }
  },
  input: {
    mapAllFromData: function(data) {
      var getValue = function(v) {
        if (typeof v === "string") {
          return v;
        } else {
          return v.value ? v.value.toString() : "";
        }
      };
      var getInputForDataProperty = function(key, v) {
        var id = GeneralUtility.camelCaseToKebab(key),
          label = v.label || GeneralUtility.camelCaseToNormal(key);
        if (v.type !== undefined) {
          if (v.type === form_1.FormComponentType.Checkbox) {
            return react_1.default.createElement("input", {
              id: id,
              key: key,
              type: "checkbox",
              className: "checkbox",
              label: label
            });
          } else if (v.type === form_1.FormComponentType.Dropdown) {
            var options = v.options.map(function(option) {
              return react_1.default.createElement(
                "option",
                { key: option, value: option },
                option
              );
            });
            options.unshift(
              react_1.default.createElement(
                "option",
                { key: -1, value: "" },
                "Select an option"
              )
            );
            return react_1.default.createElement(
              "select",
              {
                id: id,
                key: key,
                type: "dropdown",
                defaultValue: getValue(v),
                label: label,
                validate: v.validate.toString(),
                errormessage: v.errormessage || "Error, invalid selection."
              },
              options
            );
          } else if (v.type === form_1.FormComponentType.TextArea) {
            return react_1.default.createElement("textarea", {
              id: id,
              key: key,
              defaultValue: getValue(v),
              label: label,
              placeholder: "Enter " + label.toLowerCase(),
              validate: v.validate.toString(),
              errormessage: v.errormessage || "Error, invalid input."
            });
          }
        }
        return react_1.default.createElement("input", {
          id: GeneralUtility.camelCaseToKebab(key),
          key: key,
          type: "text",
          className: "text-input",
          defaultValue: getValue(v),
          placeholder: "Enter " + label.toLowerCase(),
          label: label,
          validate: validation_1.ValidationType.Required
        });
      };
      return Object.entries(data).map(function(entry) {
        var key = entry[0],
          value = entry[1];
        return getInputForDataProperty(key, value);
      });
    },
    handleChildren: function(fields) {
      var isRadioGroup = exports.FormUtility.input.is.radioGroup(
        fields.props.children
      );
      if (isRadioGroup) {
        return [
          exports.FormUtility.input.convert.to.radioGroup(fields.props.children)
        ];
      } else {
        return fields.props.children;
      }
    },
    enhance: function(
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
      var className = exports.FormUtility.input.get.classes(child, formState),
        onChange = exports.FormUtility.input.get.onChange(
          child,
          formState,
          updateCount,
          setUpdateCount,
          setFormState
        ),
        style = exports.FormUtility.input.get.styles(index, columns, alone),
        label = exports.FormUtility.input.get.label(child),
        validate = exports.FormUtility.input.get.validationFn(
          child.props.validate
        ),
        errorMessage = exports.FormUtility.input.get.errorMessage(
          child,
          formState
        );
      var onKeyUp = null;
      if (
        child.type !== form_1.FormComponentType.TextArea &&
        child.props.type !== form_1.FormComponentType.TextArea
      ) {
        onKeyUp = function(e) {
          if (e.key === "Enter") handleOnSubmit();
        };
      }
      if (child.props.type === form_1.FormComponentType.Checkbox) {
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
            react_1.default.createElement("div", {
              className: "checkbox-toggle"
            })
          ),
          errorMessage
        );
      } else if (child.props.type === form_1.FormComponentType.Radio) {
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
      } else if (child.props.type === form_1.FormComponentType.RadioGroup) {
        var radios = child.props.children.map(function(c, i) {
          return exports.FormUtility.input.enhance(
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
          { id: child.props.id, className: "radio-group", type: "radio-group" },
          label,
          radios
        );
      } else if (child.props.type === form_1.FormComponentType.Dropdown) {
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
      } else if (child.props.type === form_1.FormComponentType.Text) {
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
        child.type === form_1.FormComponentType.TextArea ||
        child.props.type === form_1.FormComponentType.TextArea
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
    },
    is: {
      radioGroup: function(children) {
        var nRadios = children.filter(function(c) {
          return c.props.type === form_1.FormComponentType.Radio;
        }).length;
        return nRadios === children.length;
      }
    },
    convert: {
      to: {
        radioGroup: function(children) {
          return react_1.default.createElement(
            "div",
            {
              id: children[0].props.name,
              className: "radio-group",
              type: "radio-group"
            },
            children
          );
        }
      }
    },
    get: {
      onChange: function(
        child,
        formState,
        updateCount,
        setUpdateCount,
        setFormState
      ) {
        var onChange = function(e) {
          var getValue = function() {
            if (child.props.type === form_1.FormComponentType.Checkbox) {
              return e.target.checked;
            } else {
              return e.target.value;
            }
          };
          var updatedFormState = formState,
            key = "";
          if (child.props.type === form_1.FormComponentType.Radio) {
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
        var key = GeneralUtility.kebabToCamelCase(child.props.id);
        var classes = classnames_1.default(
          child.props.className,
          {
            error: formState[key] && formState[key].error
          },
          { "scroll-bar": child.type === form_1.FormComponentType.TextArea }
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
          child.props.type === form_1.FormComponentType.Radio &&
          child.props.value
        ) {
          return react_1.default.createElement(
            "h1",
            { className: "label" },
            child.props.value
          );
        } else if (child.props.type === form_1.FormComponentType.RadioGroup) {
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
        } else if (
          !Object.values(validation_1.ValidationType).includes(validate)
        ) {
          return validate;
        } else {
          return null;
        }
      },
      errorMessage: function(child, formState) {
        var key = GeneralUtility.kebabToCamelCase(child.props.id),
          error = formState[key] && formState[key].error,
          input = formState[key] ? formState[key].value : "",
          type = formState[key] ? formState[key].validate : "";
        var classes = classnames_1.default("error-message", { show: error });
        return react_1.default.createElement(
          "h1",
          { className: classes },
          validation_1.Validate.getErrorMessage(type, input, child)
        );
      }
    }
  }
};
