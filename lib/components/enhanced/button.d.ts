import React from "react";
export interface ButtonProps {
  className?: string;
  label?: string;
  handleOnClick: () => void;
}
export declare const Button: React.SFC<ButtonProps>;
