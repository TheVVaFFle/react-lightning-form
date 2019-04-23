declare module "create-react-form" {
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
}