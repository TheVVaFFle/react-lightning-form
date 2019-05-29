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
export interface RLFProps {
  id?: string;
  className?: string;
  title?: string;
  data?: any;
  children?: any;
  labels?: any;
  options?: any;
  types?: any;
  validation?: any;
  messages?: any;
  loading?: boolean;
  submit?: any;
}
export declare const RLF: React.SFC<RLFProps>;
