import React from "react";
export interface TextAreaProps {
  flatKey: string;
  name: string;
  label?: string;
  value: string | number;
  rawData: any;
  error?: boolean;
  errorMessage?: string;
  onChange?: Function;
  updateData: Function;
}
export declare const TextArea: React.SFC<TextAreaProps>;
