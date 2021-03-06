import React from "react";
export interface TextProps {
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
export declare const Text: React.SFC<TextProps>;
