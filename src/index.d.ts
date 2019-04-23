declare module "react-lightning-form" {
  import * as React from "react";

  export interface FormProps {
    id?: string;
    title?: string;
    children: any;
    columns?: number;
    loading: boolean;
    onSubmit: (formState: any) => void;
  }

  export const Form: (props: FormProps) => React.SFC<FormProps>

  export interface SectionProps {
    title?: string;
    children?: any;
    data?: any;
    columns?: number;
  }

  export const Section: (props: SectionProps) => React.SFC<SectionProps>

  export enum FormComponentType {
    Input = "input",
    TextArea = "textarea",
    Section = "section"
  }
    
  export enum InputType {
    Checkbox = "checkbox",
    Dropdown = "dropdown",
    TextArea = "textarea"
  }  

  export enum ValidationType {
    Phone = "phone",
    Email = "email",
    Required = "required"
  }
}