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
var _ = __importStar(require("lodash"));
var section_1 = require("../components/section/section");
var text_1 = require("../components/enhanced/text");
var select_1 = require("../components/enhanced/select");
var checkbox_1 = require("../components/enhanced/checkbox");
var textarea_1 = require("../components/enhanced/textarea");
var _1 = require(".");
var form_1 = require("../components/form/form");
var ObjectType;
(function(ObjectType) {
  ObjectType["Null"] = "null";
  ObjectType["Undefined"] = "undefined";
  ObjectType["String"] = "string";
  ObjectType["Number"] = "number";
  ObjectType["Boolean"] = "boolean";
  ObjectType["Array"] = "array";
  ObjectType["Object"] = "object";
  ObjectType["Function"] = "function";
})((ObjectType = exports.ObjectType || (exports.ObjectType = {})));
exports.RLFUtility = {
  get: {
    obj: {
      type: function(obj) {
        if (obj === undefined) {
          return ObjectType.Undefined;
        } else if (obj === null) {
          return ObjectType.Null;
        } else if (Array.isArray(obj)) {
          return ObjectType.Array;
        } else {
          return typeof obj;
        }
      }
    },
    title: function(key, formattedKey, labels) {
      var potential = _.get(labels, formattedKey);
      if (potential && potential.this !== undefined) {
        return potential.this;
      }
      return key;
    },
    error: {
      message: function(item, validation, messages) {
        var flatKey = exports.RLFUtility.format.flatKey(item.flatKey),
          validationType = _.get(validation, flatKey) || null;
        if (validationType === form_1.RLFValidationType.Required) {
          var field = _1.StringUtility.camelCaseToNormal(item.key);
          if (item.type === ObjectType.Boolean) {
            return field + " must be selected.";
          }
          return field + " is a required field.";
        } else if (typeof validationType === ObjectType.Function) {
          var message = _.get(messages, item.flatKey || "");
          if (message) {
            return message;
          }
        }
        return "Error. Please enter a valid value.";
      },
      positions: function(errors) {
        return errors.map(function(error) {
          var element = document.getElementById(error.flatKey);
          if (element) {
            var rect = element.getBoundingClientRect(),
              top_1 = rect.top + window.pageYOffset,
              height = document.body.offsetHeight,
              position = (top_1 / height) * 100;
            error.position = position;
            error.top = top_1;
          }
          return error;
        });
      }
    },
    errors: function(tree) {
      var mappedTree = exports.RLFUtility.map.raw.data(tree);
      var errors = new Array();
      var check = function(item) {
        if (item.type === ObjectType.Boolean && item.value === true) {
          errors.push({ key: item.key, flatKey: item.flatKey });
        } else {
          flatten(item.children || []);
        }
      };
      var flatten = function(tree) {
        if (tree !== null) {
          if (Array.isArray(tree)) {
            tree.forEach(function(item) {
              if (!Array.isArray(item)) {
                check(item);
              } else {
                item.forEach(function(i) {
                  return flatten(i);
                });
              }
            });
          } else {
            check(tree);
          }
        }
      };
      flatten(mappedTree);
      return errors;
    },
    rlfComponentType: function(item, types) {
      var type = _.get(
        types,
        exports.RLFUtility.format.flatKey(item.flatKey) || ""
      );
      return type || null;
    }
  },
  map: {
    raw: {
      data: function(data, parent) {
        if (parent === void 0) {
          parent = "";
        }
        if (data === undefined || data === null) {
          return null;
        }
        return Object.entries(data).map(function(entry) {
          entry = {
            key: entry[0],
            value: entry[1],
            type: exports.RLFUtility.get.obj.type(entry[1]),
            flatKey: entry[0]
          };
          if (parent) {
            entry = __assign({}, entry, {
              flatKey: parent + "." + entry.flatKey
            });
          }
          if (entry.type === ObjectType.Object) {
            entry = __assign({}, entry, {
              children: exports.RLFUtility.map.raw.data(entry.value, entry.key)
            });
          } else if (entry.type === ObjectType.Array) {
            if (typeof entry.value[0] === ObjectType.Object) {
              var children = entry.value.map(function(v, i) {
                return exports.RLFUtility.map.raw.data(
                  v,
                  entry.flatKey + "." + i
                );
              });
              entry.children = children;
            }
            entry = __assign({}, entry, {
              arrayType: exports.RLFUtility.get.obj.type(entry.value[0])
            });
          }
          return entry;
        });
      }
    },
    section: {
      data: function(children) {
        var data = {},
          loading = {},
          id = {},
          className = {};
        react_1.default.Children.map(children, function(child) {
          var key = Object.keys(child.props.data)[0];
          data = __assign({}, data, child.props.data);
          _.set(loading, key, child.props.loading || false);
          _.set(id, key, child.props.id);
          _.set(className, key, child.props.className);
        });
        return {
          data: data,
          loading: loading,
          id: id,
          className: className
        };
      }
    },
    data: {
      to: {
        components: function(
          rawData,
          mappedData,
          labels,
          options,
          types,
          validation,
          submit,
          id,
          className,
          loading,
          errors,
          messages,
          updateData,
          onSubmit
        ) {
          if (mappedData === undefined || mappedData === null) {
            return null;
          }
          return mappedData.map(function(item) {
            var itemOptions = options
              ? _.get(
                  options,
                  exports.RLFUtility.format.flatKey(item.flatKey) || ""
                )
              : undefined;
            var rlfComponentType = exports.RLFUtility.get.rlfComponentType(
              item,
              types
            );
            console.log(item.flatKey, item.type, rlfComponentType);
            var error = _.get(errors, item.flatKey || "") || false,
              errorMessage = exports.RLFUtility.get.error.message(
                item,
                validation,
                messages
              );
            if (
              rlfComponentType &&
              typeof rlfComponentType === ObjectType.String
            ) {
              return exports.RLFUtility.handle.rlfComponent(
                item,
                rlfComponentType,
                rawData,
                labels,
                error,
                errorMessage,
                updateData
              );
            } else if (item.type === ObjectType.Object) {
              return exports.RLFUtility.handle.object(
                item,
                rawData,
                labels,
                options,
                types,
                validation,
                submit,
                id,
                className,
                loading,
                errors,
                messages,
                updateData,
                onSubmit
              );
            } else if (
              item.type === ObjectType.Array ||
              itemOptions !== undefined
            ) {
              return exports.RLFUtility.handle.array(
                item,
                rawData,
                labels,
                options,
                types,
                itemOptions,
                validation,
                submit,
                id,
                className,
                loading,
                errors,
                messages,
                updateData,
                onSubmit
              );
            } else if (
              item.type === ObjectType.String ||
              item.type === ObjectType.Number
            ) {
              return exports.RLFUtility.handle.alphaNumeric(
                item,
                rawData,
                labels,
                error,
                errorMessage,
                updateData
              );
            } else if (item.type === ObjectType.Boolean) {
              return exports.RLFUtility.handle.boolean(
                item,
                rawData,
                labels,
                error,
                errorMessage,
                updateData
              );
            } else if (Array.isArray(item)) {
              return exports.RLFUtility.handle.mappedArray(
                item,
                rawData,
                labels,
                options,
                types,
                validation,
                submit,
                id,
                className,
                loading,
                errors,
                messages,
                updateData,
                onSubmit
              );
            } else {
              return react_1.default.createElement("div", { key: item.key });
            }
          });
        }
      }
    }
  },
  handle: {
    object: function(
      item,
      rawData,
      labels,
      options,
      types,
      validation,
      submit,
      id,
      className,
      loading,
      errors,
      messages,
      updateData,
      onSubmit
    ) {
      var key = isNaN(parseInt(item.key))
        ? _1.StringUtility.camelCaseToNormal(item.key)
        : undefined;
      var formattedFlatKey =
          exports.RLFUtility.format.flatKey(item.flatKey) || "",
        title = exports.RLFUtility.get.title(key, formattedFlatKey, labels),
        sectionLoading = _.get(loading, formattedFlatKey) || false;
      id = _.get(id, formattedFlatKey);
      className = _.get(className, formattedFlatKey);
      return react_1.default.createElement(
        section_1.RLFSection,
        {
          key: item.key,
          sectionKey: item.key,
          id: id,
          className: className,
          title: title,
          data: item.value,
          loading: sectionLoading,
          submit: submit,
          onSubmit: onSubmit
        },
        exports.RLFUtility.map.data.to.components(
          rawData,
          item.children,
          labels,
          options,
          types,
          validation,
          submit,
          id,
          className,
          loading,
          errors,
          messages,
          updateData,
          onSubmit
        )
      );
    },
    array: function(
      item,
      rawData,
      labels,
      options,
      types,
      itemOptions,
      validation,
      submit,
      id,
      className,
      loading,
      errors,
      messages,
      updateData,
      onSubmit
    ) {
      if (
        item.arrayType === ObjectType.String ||
        item.arrayType === ObjectType.Number ||
        (item.type === ObjectType.String && itemOptions !== undefined)
      ) {
        var flatKey = item.flatKey || Math.random().toString(),
          formattedFlatKey =
            exports.RLFUtility.format.flatKey(item.flatKey) || "",
          label = _.get(labels, formattedFlatKey) || null,
          error = _.get(errors, formattedFlatKey) || false,
          errorMessage = exports.RLFUtility.get.error.message(
            item,
            validation,
            messages
          );
        itemOptions = itemOptions || item.value;
        return react_1.default.createElement(select_1.Select, {
          key: item.key,
          flatKey: flatKey,
          name: item.key,
          label: label,
          value: item.value,
          options: itemOptions,
          rawData: rawData,
          error: error,
          errorMessage: errorMessage,
          updateData: updateData
        });
      } else {
        var key = isNaN(parseInt(item.key))
          ? _1.StringUtility.camelCaseToNormal(item.key)
          : undefined;
        var formattedFlatKey =
            exports.RLFUtility.format.flatKey(item.flatKey) || "",
          title = exports.RLFUtility.get.title(key, formattedFlatKey, labels),
          sectionLoading = _.get(loading, formattedFlatKey) || false;
        id = _.get(id, formattedFlatKey);
        className = _.get(className, formattedFlatKey);
        return react_1.default.createElement(
          section_1.RLFSection,
          {
            key: item.key,
            sectionKey: item.key,
            id: id,
            className: className,
            title: title,
            data: item.value,
            loading: sectionLoading,
            submit: submit,
            onSubmit: onSubmit
          },
          exports.RLFUtility.map.data.to.components(
            rawData,
            item.children,
            labels,
            options,
            types,
            validation,
            submit,
            id,
            className,
            loading,
            errors,
            messages,
            updateData,
            onSubmit
          )
        );
      }
    },
    mappedArray: function(
      item,
      rawData,
      labels,
      options,
      types,
      validation,
      submit,
      id,
      className,
      loading,
      errors,
      messages,
      updateData,
      onSubmit
    ) {
      var arrayKey = parseInt(item[0].flatKey.replace(/^\D+/g, ""));
      return react_1.default.createElement(
        section_1.RLFSection,
        { key: arrayKey, sectionKey: arrayKey.toString() },
        exports.RLFUtility.map.data.to.components(
          rawData,
          item,
          labels,
          options,
          types,
          validation,
          submit,
          id,
          className,
          loading,
          errors,
          messages,
          updateData,
          onSubmit
        )
      );
    },
    alphaNumeric: function(
      item,
      rawData,
      labels,
      error,
      errorMessage,
      updateData
    ) {
      var flatKey = item.flatKey || Math.random().toString(),
        formattedFlatKey =
          exports.RLFUtility.format.flatKey(item.flatKey) || "",
        label = _.get(labels, formattedFlatKey) || null;
      return react_1.default.createElement(text_1.Text, {
        key: item.key,
        flatKey: flatKey,
        name: item.key,
        label: label,
        value: item.value,
        rawData: rawData,
        error: error,
        errorMessage: errorMessage,
        updateData: updateData
      });
    },
    boolean: function(item, rawData, labels, error, errorMessage, updateData) {
      var flatKey = item.flatKey || Math.random().toString(),
        formattedFlatKey =
          exports.RLFUtility.format.flatKey(item.flatKey) || "",
        label = _.get(labels, formattedFlatKey) || null;
      return react_1.default.createElement(checkbox_1.Checkbox, {
        key: item.key,
        flatKey: flatKey,
        name: item.key,
        label: label,
        value: item.value,
        rawData: rawData,
        error: error,
        errorMessage: errorMessage,
        updateData: updateData
      });
    },
    rlfComponent: function(
      item,
      rlfComponentType,
      rawData,
      labels,
      error,
      errorMessage,
      updateData
    ) {
      var flatKey = item.flatKey || Math.random().toString(),
        formattedFlatKey =
          exports.RLFUtility.format.flatKey(item.flatKey) || "",
        label = _.get(labels, formattedFlatKey) || null;
      if (rlfComponentType === form_1.RLFComponentType.Textarea) {
        return react_1.default.createElement(textarea_1.TextArea, {
          key: item.key,
          flatKey: flatKey,
          name: item.key,
          label: label,
          value: item.value,
          rawData: rawData,
          error: error,
          errorMessage: errorMessage,
          updateData: updateData
        });
      }
      return null;
    }
  },
  validate: {
    data: function(rawData, mappedData, validation, errors, updateErrors) {
      if (validation === undefined || validation === null) {
        return true;
      }
      var invalidCount = 0;
      mappedData.forEach(function(item) {
        var items = Array.isArray(item) ? item : [],
          children = !Array.isArray(item) ? item.children || [] : [];
        if (items.length > 0 || children.length > 0) {
          items = items.length > 0 ? items : children;
          var validated = exports.RLFUtility.validate.data(
            rawData,
            items,
            validation,
            errors,
            updateErrors
          );
          if (!validated) {
            invalidCount++;
          }
        } else if (!Array.isArray(item)) {
          var flatKey = exports.RLFUtility.format.flatKey(item.flatKey),
            validationFn = _.get(validation, flatKey);
          if (validationFn !== undefined) {
            var validated = exports.RLFUtility.run.validation(
              validationFn,
              _.get(rawData, item.flatKey || "")
            );
            if (!validated) {
              invalidCount++;
            }
            _.set(errors, item.flatKey || "", !validated);
            updateErrors(errors);
          }
        }
      });
      return invalidCount === 0;
    }
  },
  format: {
    flatKey: function(key) {
      return key
        ? key
            .split(".")
            .filter(function(k) {
              return isNaN(parseInt(k));
            })
            .join(".")
        : "";
    }
  },
  run: {
    validation: function(fn, value) {
      if (typeof fn === ObjectType.String) {
        if (fn === form_1.RLFValidationType.Required) {
          if (typeof value === ObjectType.Boolean) {
            return value === true;
          }
          return value !== undefined && value !== null && value.trim() !== "";
        } else {
          return true;
        }
      } else {
        return fn(value);
      }
    }
  }
};
