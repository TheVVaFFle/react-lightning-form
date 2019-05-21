import React from "react";
export interface SectionProps {
  id?: string;
  className?: string;
  title?: string;
  children?: any;
  data?: any;
  sm?: number;
  md?: number;
  lg?: number;
  loading?: boolean;
  outline?: boolean;
  styles?: React.CSSProperties;
  formState?: any;
  submitLabel?: string;
  onSubmit?: (e: any) => void;
}
export declare const Section: React.SFC<SectionProps>;
