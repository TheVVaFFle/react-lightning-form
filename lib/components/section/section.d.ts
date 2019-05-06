import React from "react";
export interface SectionProps {
  title?: string;
  children?: any;
  data?: any;
  sm?: number;
  md?: number;
  lg?: number;
  loading?: boolean;
  formState?: any;
}
export declare const Section: React.SFC<SectionProps>;
