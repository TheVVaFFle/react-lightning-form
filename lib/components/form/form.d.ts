import React from "react";
export declare enum RLFComponentType {
  Button = "button",
  Checkbox = "checkbox",
  Textarea = "textarea",
  Dropdown = "dropdown",
  Text = "text"
}
export declare enum RLFValidationType {
  Required = "required",
  RequiredForSection = "required for section"
}
export declare enum RLFValidateOn {
  Form = "form",
  Empty = ""
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
  onChange?: any;
  loading?: boolean;
  submit?: any;
}
export declare const RLF: React.SFC<RLFProps>;
