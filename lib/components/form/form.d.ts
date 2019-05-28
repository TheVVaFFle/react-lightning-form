import React from "react";
export declare enum RLFComponentType {
  Button = "button",
  Checkbox = "checkbox",
  Textarea = "textarea",
  Dropdown = "dropdown",
  Text = "text"
}
export declare enum RLFValidationType {
  Required = "required"
}
export declare enum RLFValidateOn {
  Form = "form"
}
export interface FormProps {
  id?: string;
  title?: string;
  data?: any;
  children?: any;
  options?: any;
  types?: any;
  validation?: any;
  messages?: any;
  submit?: any;
}
export declare const Form: React.SFC<FormProps>;
