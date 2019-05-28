/// <reference types="react" />
export interface CheckboxProps {
  flatKey: string;
  name: string;
  label?: string;
  value: boolean;
  rawData: any;
  error: boolean;
  errorMessage?: string;
  updateData: Function;
}
export declare const Checkbox: (props: CheckboxProps) => JSX.Element;
