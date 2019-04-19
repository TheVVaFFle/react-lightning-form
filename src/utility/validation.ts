import Validator from "validator"

export enum ValidationType {
  Phone = "phone",
  Email = "email",
  Required = "required"
}

export const Validate: any = {
  phone: (input: string): boolean => {
    return Validator.isMobilePhone(input, "en-US");
  },
  email: (input: string): boolean => {
    return Validator.isEmail(input);
  },
  required: (input: string): boolean => {
    return input !== undefined && input !== null && input.trim() !== "";
  },
  determineIfError: (value: any, validate: Function) => {
    if(validate !== undefined && validate !== null){
      return !validate(value)
    }

    return false;
  },
  getErrorMessage: (type: ValidationType, input: string): string => {    
    switch(type){
      case ValidationType.Phone:
        return "Please enter a valid phone number.";
      case ValidationType.Email:
        return "Please enter a valid email.";
      case ValidationType.Required:
        return "Field is required.";
      default:
        return "";
    }
  }
}