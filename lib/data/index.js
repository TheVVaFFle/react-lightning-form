"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../utility/validation");
const suffixOptions = [
    "Sr.",
    "Jr.",
    "I",
    "II",
    "III"
];
exports.Test = {
    data: {
        name: {
            firstName: { value: "Billy", validate: validation_1.ValidationType.Required },
            middleName: { value: "Bob" },
            lastName: { value: "Smith", validate: validation_1.ValidationType.Required },
            suffix: { value: "", type: validation_1.InputType.Dropdown, options: suffixOptions, validate: validation_1.ValidationType.Required }
        },
        contact: {
            phoneNumber: { value: "(314) 780-5555", validate: validation_1.ValidationType.Phone },
            emailAddress: { value: "my-email@gmail.com", validate: validation_1.ValidationType.Email },
            primaryContact: { value: false, type: validation_1.InputType.Checkbox }
        }
    }
};
