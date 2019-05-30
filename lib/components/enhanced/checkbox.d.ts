/// <reference types="react" />
export interface CheckboxProps {
  flatKey: string;
  name: string;
  label?: string;
  value: boolean;
  rawData: any;
  error: boolean;
  errorMessage?: string;
  onChange?: Function;
  updateData: Function;
}
export declare const Checkbox: (props: CheckboxProps) => JSX.Element;
