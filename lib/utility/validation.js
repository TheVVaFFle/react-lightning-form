"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = __importDefault(require("validator"));
var ValidationType;
(function(ValidationType) {
  ValidationType["Phone"] = "phone";
  ValidationType["Email"] = "email";
  ValidationType["Required"] = "required";
})((ValidationType = exports.ValidationType || (exports.ValidationType = {})));
exports.ValidationUtility = {
  phone: function(input) {
    return validator_1.default.isMobilePhone(input, "en-US");
  },
  email: function(input) {
    return validator_1.default.isEmail(input);
  },
  required: function(input) {
    return input !== undefined && input !== null && input.trim() !== "";
  },
  determine: {
    if: {
      error: function(value, validate) {
        if (validate !== undefined && validate !== null) {
          return !validate(value);
        }
        return false;
      }
    }
  },
  getErrorMessage: function(type, input, child) {
    switch (type) {
      case ValidationType.Phone:
        return "Please enter a valid phone number.";
      case ValidationType.Email:
        return "Please enter a valid email.";
      case ValidationType.Required:
        return "Field is required.";
      default:
        return child.props.errormessage || "";
    }
  }
};
