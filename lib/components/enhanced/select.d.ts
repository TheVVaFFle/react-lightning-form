import React from "react";
export interface SelectProps {
  flatKey: string;
  name: string;
  label?: string;
  value?: string;
  options: string[];
  rawData: any;
  error: boolean;
  errorMessage?: string;
  onChange?: Function;
  updateData: Function;
}
export declare const Select: React.SFC<SelectProps>;
