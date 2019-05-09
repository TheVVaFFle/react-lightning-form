"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var components_1 = require("../../components");
var validation_1 = require("../validation");
exports.validate = {
  submission: function(formState, setFormState, setErrorCount) {
    var nErrors = 0,
      updatedFormState = formState;
    Object.entries(formState).map(function(entry) {
      var key = entry[0],
        prop = entry[1];
      var validationFn = null;
      if (prop.validate !== undefined) {
        if (
          !Object.values(components_1.ValidationType).includes(prop.validate)
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
};
