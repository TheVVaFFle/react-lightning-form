import React from "react";
export declare enum FormComponentType {
  Input = "input",
  TextArea = "textarea",
  Section = "section",
  Text = "text",
  Checkbox = "checkbox",
  Dropdown = "dropdown"
}
export interface FormProps {
  id: string;
  title?: string;
  children: any;
  sm?: number;
  md?: number;
  lg?: number;
  submitLabel?: string;
  loading: boolean;
  onSubmit: (formState: any) => void;
}
export declare const Form: React.SFC<FormProps>;
