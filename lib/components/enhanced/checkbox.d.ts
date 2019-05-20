import { ChangeEvent } from "react";
export interface CheckboxProps {
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
export declare const Checkbox: (props: CheckboxProps) => JSX.Element;
